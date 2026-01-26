#!/usr/bin/env python3
"""Daily arXiv paper discovery for LLM reasoning research."""

import json
import os
import re
from dataclasses import dataclass
from datetime import datetime, timedelta
from pathlib import Path

import arxiv
import httpx

DAYS_LOOKBACK = 3

SEARCH_QUERIES = [
    'cat:cs.CL AND abs:"reasoning"',
    'cat:cs.CL AND abs:"chain of thought"',
    'cat:cs.CL AND abs:"chain-of-thought"',
    'cat:cs.AI AND abs:"LLM" AND abs:"reasoning"',
    'cat:cs.LG AND abs:"language model" AND abs:"reasoning"',
]

THESIS = """LLM reasoning is practical but fundamentally predictive (pattern matching from 
training distributions), not genuinely generative. RL and test-time compute surface 
pre-existing capabilities rather than creating new reasoning abilities."""

CLASSIFICATION_PROMPT = """You are classifying academic papers for a literature review.

THESIS: {thesis}

Given this paper's title and abstract, provide a JSON response with:
- "relevant": boolean - Is this paper relevant to studying LLM reasoning capabilities?
- "stance": "SUPPORTS" | "CHALLENGES" | "BALANCED" - Does evidence support or challenge the thesis?
- "priority": 1-10 - How important is this paper for the literature review?
- "why_read": string - One sentence explaining why this paper matters (or doesn't)

PAPER TITLE: {title}

ABSTRACT: {abstract}

Respond with only valid JSON, no markdown."""


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


@dataclass(frozen=True)
class Classification:
    relevant: bool
    stance: str
    priority: int
    why_read: str


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


def classify_with_llm(title: str, abstract: str, token: str) -> Classification | None:
    prompt = CLASSIFICATION_PROMPT.format(thesis=THESIS, title=title, abstract=abstract)

    try:
        response = httpx.post(
            "https://models.github.ai/inference/chat/completions",
            headers={
                "Authorization": f"Bearer {token}",
                "Content-Type": "application/json",
            },
            json={
                "model": "openai/gpt-4.1-nano",
                "messages": [{"role": "user", "content": prompt}],
                "temperature": 0.1,
            },
            timeout=30.0,
        )
        response.raise_for_status()
        content = response.json()["choices"][0]["message"]["content"]
        content = content.strip().removeprefix("```json").removesuffix("```").strip()
        data = json.loads(content)

        return Classification(
            relevant=data.get("relevant", False),
            stance=data.get("stance", "BALANCED"),
            priority=min(max(data.get("priority", 5), 1), 10),
            why_read=data.get("why_read", ""),
        )
    except Exception as e:
        print(f"      LLM classification failed: {e}")
        return None


def classify_with_keywords(title: str, abstract: str) -> Classification:
    text = f"{title} {abstract}".lower()

    reasoning_kw = ["reasoning", "chain of thought", "cot", "thinking", "inference"]
    llm_kw = ["llm", "large language model", "language model", "gpt", "transformer"]
    support_kw = [
        "limitation",
        "failure",
        "illusion",
        "pattern matching",
        "memorization",
    ]
    challenge_kw = ["genuine reasoning", "emergence", "breakthrough", "capability"]

    has_reasoning = any(kw in text for kw in reasoning_kw)
    has_llm = any(kw in text for kw in llm_kw)
    relevant = has_reasoning and has_llm

    supports = sum(1 for kw in support_kw if kw in text)
    challenges = sum(1 for kw in challenge_kw if kw in text)

    if supports > challenges:
        stance = "SUPPORTS"
    elif challenges > supports:
        stance = "CHALLENGES"
    else:
        stance = "BALANCED"

    priority = min(supports + challenges + (2 if relevant else 0), 10)
    why_read = "General reasoning paper (keyword match)"

    return Classification(
        relevant=relevant, stance=stance, priority=priority, why_read=why_read
    )


def find_connections(abstract: str, known_ids: set[str]) -> tuple[str, ...]:
    return tuple(pid for pid in known_ids if pid in abstract.lower())


def process_paper(
    result: arxiv.Result, known_ids: set[str], token: str | None
) -> Paper | None:
    arxiv_id = result.get_short_id()
    title = result.title
    abstract = result.summary.replace("\n", " ").strip()

    if token:
        classification = classify_with_llm(title, abstract, token)
    else:
        classification = None

    if classification is None:
        classification = classify_with_keywords(title, abstract)

    if not classification.relevant:
        return None

    connections = find_connections(abstract, known_ids)
    priority = classification.priority
    if connections:
        priority = min(priority + 2, 10)

    return Paper(
        arxiv_id=arxiv_id,
        title=title,
        abstract=abstract,
        published=result.published.strftime("%Y-%m-%d"),
        stance=classification.stance,
        priority=priority,
        why_read=classification.why_read,
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

    token = os.environ.get("GITHUB_TOKEN")
    if token:
        print("[info] Using GitHub Models for classification")
    else:
        print("[info] No GITHUB_TOKEN, using keyword fallback")

    print(f"[1/4] Searching arXiv (last {DAYS_LOOKBACK} days)...")
    raw_papers = search_arxiv(DAYS_LOOKBACK)
    print(f"      Found {len(raw_papers)} papers")

    if not raw_papers:
        return

    print("[2/4] Loading known papers...")
    known_ids = load_known_ids(paper_list) | load_known_ids(toread)
    print(f"      {len(known_ids)} known IDs")

    print("[3/4] Classifying papers...")
    new_papers: list[Paper] = []
    for arxiv_id, result in raw_papers.items():
        if arxiv_id in known_ids:
            continue
        paper = process_paper(result, known_ids, token)
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
