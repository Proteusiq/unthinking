import re
from dataclasses import dataclass
from datetime import datetime, timedelta
from pathlib import Path

import arxiv
import httpx

SEARCH_QUERIES = [
    'cat:cs.CL AND abs:"reasoning"',
    'cat:cs.CL AND abs:"chain of thought"',
    'cat:cs.CL AND abs:"chain-of-thought"',
    'cat:cs.AI AND abs:"LLM" AND abs:"reasoning"',
    'cat:cs.LG AND abs:"language model" AND abs:"reasoning"',
]

PWC_API = "https://paperswithcode.co/api/v1/papers"
LESSWRONG_API = "https://www.lesswrong.com/graphql"
_ARXIV_RE = re.compile(r"arxiv\.org/(?:abs|pdf|html)/(\d{4}\.\d{4,5})")


def search_recent_papers(days_back: int) -> dict[str, arxiv.Result]:
    client = arxiv.Client()
    cutoff = datetime.now() - timedelta(days=days_back)
    papers: dict[str, arxiv.Result] = {}

    for query in SEARCH_QUERIES:
        search = arxiv.Search(
            query=query,
            max_results=100,
            sort_by=arxiv.SortCriterion.SubmittedDate,
            sort_order=arxiv.SortOrder.Descending,
        )
        for result in client.results(search):
            if result.published.replace(tzinfo=None) >= cutoff:
                papers[result.get_short_id()] = result

    return papers


@dataclass(frozen=True)
class _ExternalResult:
    """Duck-types the arxiv.Result fields that process_paper reads."""

    _short_id: str
    title: str
    summary: str
    published: datetime

    def get_short_id(self) -> str:
        return self._short_id


def search_paperswithcode(
    days_back: int, max_pages: int = 5
) -> dict[str, _ExternalResult]:
    """Fetch recent arXiv-sourced papers from the paperswithcode.co feed.

    The feed is ranked by trending, not date, so we scan a fixed page budget
    and keep anything published within the cutoff. Relevance filtering is left
    to the downstream classifier.
    """
    cutoff = datetime.now() - timedelta(days=days_back)
    papers: dict[str, _ExternalResult] = {}

    with httpx.Client(timeout=30.0, headers={"Accept": "application/json"}) as client:
        for page in range(1, max_pages + 1):
            resp = client.get(PWC_API, params={"limit": 100, "page": page})
            resp.raise_for_status()
            results = resp.json().get("results", [])
            if not results:
                break

            for r in results:
                arxiv_id = r.get("arxiv_id")
                published = r.get("published")
                if not arxiv_id or not published:
                    continue
                pub = datetime.strptime(published, "%Y-%m-%d")
                if pub < cutoff:
                    continue
                papers[arxiv_id] = _ExternalResult(
                    _short_id=arxiv_id,
                    title=r.get("title", "").strip(),
                    summary=(r.get("abstract") or "").replace("\n", " ").strip(),
                    published=pub,
                )

    return papers


def _fetch_arxiv_metadata(ids: set[str]) -> dict[str, _ExternalResult]:
    """Look up title/abstract/date for a set of arXiv IDs."""
    if not ids:
        return {}
    client = arxiv.Client()
    papers: dict[str, _ExternalResult] = {}
    for result in client.results(arxiv.Search(id_list=sorted(ids))):
        short_id = normalize_arxiv_id(result.get_short_id())
        papers[short_id] = _ExternalResult(
            _short_id=short_id,
            title=result.title,
            summary=result.summary.replace("\n", " ").strip(),
            published=result.published.replace(tzinfo=None),
        )
    return papers


def search_lesswrong(post_limit: int = 40) -> dict[str, _ExternalResult]:
    """Mine recent LessWrong posts for cited arXiv papers.

    Posts are essays, not corpus items; we extract the arXiv IDs they link to
    and resolve those to papers. Relevance filtering is left to the classifier.
    """
    query = (
        '{posts(input:{terms:{view:"new",limit:%d}}){results{htmlBody}}}' % post_limit
    )
    with httpx.Client(timeout=30.0) as client:
        resp = client.post(LESSWRONG_API, json={"query": query})
        resp.raise_for_status()
        results = resp.json().get("data", {}).get("posts", {}).get("results", [])

    ids: set[str] = set()
    for post in results:
        ids.update(_ARXIV_RE.findall(post.get("htmlBody") or ""))

    return _fetch_arxiv_metadata(ids)


def normalize_arxiv_id(arxiv_id: str) -> str:
    """Strip version suffix from arxiv ID (e.g., 2601.16823v1 -> 2601.16823)"""
    return re.sub(r"v\d+$", "", arxiv_id)


def load_known_ids(path: Path) -> set[str]:
    if not path.exists():
        return set()
    # Extract base IDs without version suffix
    return set(re.findall(r"\b(\d{4}\.\d{4,5})(?:v\d+)?\b", path.read_text()))
