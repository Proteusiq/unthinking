import re
from datetime import datetime, timedelta
from pathlib import Path

import arxiv

SEARCH_QUERIES = [
    'cat:cs.CL AND abs:"reasoning"',
    'cat:cs.CL AND abs:"chain of thought"',
    'cat:cs.CL AND abs:"chain-of-thought"',
    'cat:cs.AI AND abs:"LLM" AND abs:"reasoning"',
    'cat:cs.LG AND abs:"language model" AND abs:"reasoning"',
]


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


def normalize_arxiv_id(arxiv_id: str) -> str:
    """Strip version suffix from arxiv ID (e.g., 2601.16823v1 -> 2601.16823)"""
    return re.sub(r"v\d+$", "", arxiv_id)


def load_known_ids(path: Path) -> set[str]:
    if not path.exists():
        return set()
    # Extract base IDs without version suffix
    return set(re.findall(r"\b(\d{4}\.\d{4,5})(?:v\d+)?\b", path.read_text()))
