#!/usr/bin/env python3
"""Daily arXiv paper discovery for LLM reasoning research."""

import re
from dataclasses import dataclass
from datetime import datetime, timedelta
from pathlib import Path

import arxiv

DAYS_LOOKBACK = 3

SEARCH_QUERIES = [
    'cat:cs.CL AND abs:"reasoning"',
    'cat:cs.CL AND abs:"chain of thought"',
    'cat:cs.CL AND abs:"chain-of-thought"',
    'cat:cs.AI AND abs:"LLM" AND abs:"reasoning"',
    'cat:cs.LG AND abs:"language model" AND abs:"reasoning"',
]

REASONING_KEYWORDS = frozenset(
    [
        "reasoning",
        "chain of thought",
        "chain-of-thought",
        "cot",
        "thinking",
        "thought",
        "inference",
    ]
)

LLM_KEYWORDS = frozenset(
    [
        "llm",
        "large language model",
        "language model",
        "gpt",
        "transformer",
    ]
)

THESIS_SUPPORT_KEYWORDS = frozenset(
    [
        "limitation",
        "failure",
        "collapse",
        "illusion",
        "mirage",
        "pattern matching",
        "memorization",
        "unfaithful",
        "superficial",
    ]
)

THESIS_CHALLENGE_KEYWORDS = frozenset(
    [
        "genuine reasoning",
        "true reasoning",
        "reasoning capability",
        "emergence",
        "breakthrough",
        "improvement",
    ]
)


@dataclass(frozen=True)
class Paper:
    arxiv_id: str
    title: str
    abstract: str
    published: str
    stance: str
    priority: int
    why_read: str
    connections: tuple[str, ...]


def search_arxiv(days_back: int) -> dict[str, arxiv.Result]:
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


def load_known_ids(path: Path) -> set[str]:
    if not path.exists():
        return set()
    content = path.read_text()
    return set(re.findall(r"\b(\d{4}\.\d{4,5})\b", content))


def is_reasoning_paper(title: str, abstract: str) -> bool:
    text = f"{title} {abstract}".lower()
    has_reasoning = any(kw in text for kw in REASONING_KEYWORDS)
    has_llm = any(kw in text for kw in LLM_KEYWORDS)
    return has_reasoning and has_llm


def assess_stance(title: str, abstract: str) -> str:
    text = f"{title} {abstract}".lower()
    supports = sum(1 for kw in THESIS_SUPPORT_KEYWORDS if kw in text)
    challenges = sum(1 for kw in THESIS_CHALLENGE_KEYWORDS if kw in text)

    if supports > challenges:
        return "SUPPORTS"
    if challenges > supports:
        return "CHALLENGES"
    return "BALANCED"


def calculate_priority(title: str, abstract: str) -> int:
    text = f"{title} {abstract}".lower()
    score = sum(
        2 for kw in THESIS_SUPPORT_KEYWORDS | THESIS_CHALLENGE_KEYWORDS if kw in text
    )
    return min(score, 10)


def build_why_read(title: str, abstract: str) -> str:
    text = f"{title} {abstract}".lower()
    matches = [
        kw for kw in THESIS_SUPPORT_KEYWORDS | THESIS_CHALLENGE_KEYWORDS if kw in text
    ]
    if matches:
        return f"Thesis-relevant: {', '.join(matches[:3])}"
    return "General reasoning paper"


def find_connections(abstract: str, known_ids: set[str]) -> tuple[str, ...]:
    return tuple(pid for pid in known_ids if pid in abstract.lower())


def process_paper(result: arxiv.Result, known_ids: set[str]) -> Paper | None:
    arxiv_id = result.get_short_id()
    title = result.title
    abstract = result.summary.replace("\n", " ").strip()

    if not is_reasoning_paper(title, abstract):
        return None

    connections = find_connections(abstract, known_ids)
    priority = calculate_priority(title, abstract)
    if connections:
        priority = min(priority + 2, 10)

    return Paper(
        arxiv_id=arxiv_id,
        title=title,
        abstract=abstract,
        published=result.published.strftime("%Y-%m-%d"),
        stance=assess_stance(title, abstract),
        priority=priority,
        why_read=build_why_read(title, abstract),
        connections=connections,
    )


def format_paper(paper: Paper) -> str:
    lines = [
        f"### [{paper.title}](https://arxiv.org/abs/{paper.arxiv_id})",
        f"- **arXiv**: {paper.arxiv_id}",
        f"- **Published**: {paper.published}",
        f"- **Stance**: {paper.stance}",
        f"- **Priority**: {paper.priority}/10",
        f"- **Why read**: {paper.why_read}",
    ]

    if paper.connections:
        lines.append(f"- **Cites our papers**: {', '.join(paper.connections)}")

    lines.extend(
        [
            "",
            "<details>",
            "<summary>Abstract</summary>",
            "",
            paper.abstract,
            "",
            "</details>",
            "",
        ]
    )

    return "\n".join(lines)


def prepend_to_toread(papers: list[Paper], path: Path) -> None:
    today = datetime.now().strftime("%Y-%m-%d")

    section_lines = [f"## New Papers ({today})", ""]
    for paper in sorted(papers, key=lambda p: p.priority, reverse=True):
        section_lines.append(format_paper(paper))
    new_section = "\n".join(section_lines)

    if path.exists():
        existing = path.read_text()
        existing = re.sub(
            r"\*\*Last updated\*\*: \d{4}-\d{2}-\d{2}",
            f"**Last updated**: {today}",
            existing,
        )
        parts = existing.split("\n---\n", 1)
        if len(parts) == 2:
            content = f"{parts[0]}\n---\n\n{new_section}{parts[1]}"
        else:
            content = f"{existing}\n\n{new_section}"
    else:
        content = f"""# Papers to Read

Curated list of papers relevant to the thesis. Auto-discovered papers are prepended.

**Last updated**: {today}

---

{new_section}"""

    path.write_text(content)


def main() -> None:
    repo_root = Path(__file__).parent.parent
    paper_list = repo_root / "papers" / "paper_list.md"
    toread = repo_root / "papers" / "toread.md"

    print(f"[1/4] Searching arXiv (last {DAYS_LOOKBACK} days)...")
    raw_papers = search_arxiv(DAYS_LOOKBACK)
    print(f"      Found {len(raw_papers)} papers")

    if not raw_papers:
        return

    print("[2/4] Loading known papers...")
    known_ids = load_known_ids(paper_list) | load_known_ids(toread)
    print(f"      {len(known_ids)} known IDs")

    print("[3/4] Processing papers...")
    new_papers: list[Paper] = []
    for arxiv_id, result in raw_papers.items():
        if arxiv_id in known_ids:
            continue
        paper = process_paper(result, known_ids)
        if paper:
            new_papers.append(paper)

    print(f"      {len(new_papers)} qualified")

    if not new_papers:
        print("      No new papers to add")
        return

    print("[4/4] Updating toread.md...")
    prepend_to_toread(new_papers, toread)

    supports = sum(1 for p in new_papers if p.stance == "SUPPORTS")
    challenges = sum(1 for p in new_papers if p.stance == "CHALLENGES")
    balanced = len(new_papers) - supports - challenges
    print(
        f"      Added {len(new_papers)} papers ({supports} support, {challenges} challenge, {balanced} balanced)"
    )


if __name__ == "__main__":
    main()
