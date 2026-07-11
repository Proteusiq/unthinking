import re
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


def discover_paperswithcode(days_back: int, max_pages: int = 5) -> set[str]:
    """Return recent arXiv IDs surfaced by the paperswithcode.co feed.

    The feed is ranked by trending, not date, so we scan a fixed page budget
    and keep anything published within the cutoff.
    """
    cutoff = datetime.now() - timedelta(days=days_back)
    ids: set[str] = set()

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
                if datetime.strptime(published, "%Y-%m-%d") >= cutoff:
                    ids.add(normalize_arxiv_id(arxiv_id))

    return ids


def discover_lesswrong(post_limit: int = 40) -> set[str]:
    """Return arXiv IDs cited by recent LessWrong posts.

    Posts are essays, not corpus items; we only extract the arXiv links.
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

    return {normalize_arxiv_id(i) for i in ids}


def fetch_arxiv(ids: set[str]) -> dict[str, arxiv.Result]:
    """Resolve arXiv IDs to full arXiv papers (the canonical source)."""
    if not ids:
        return {}
    client = arxiv.Client()
    results = client.results(arxiv.Search(id_list=sorted(ids)))
    return {r.get_short_id(): r for r in results}


def normalize_arxiv_id(arxiv_id: str) -> str:
    """Strip version suffix from arxiv ID (e.g., 2601.16823v1 -> 2601.16823)"""
    return re.sub(r"v\d+$", "", arxiv_id)


def load_known_ids(path: Path) -> set[str]:
    if not path.exists():
        return set()
    # Extract base IDs without version suffix
    return set(re.findall(r"\b(\d{4}\.\d{4,5})(?:v\d+)?\b", path.read_text()))
