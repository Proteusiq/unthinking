#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.12"
# dependencies = ["arxiv", "httpx"]
# ///
"""Main entry point for paper discovery."""

import os
import sys
from pathlib import Path

# Add scripts to path for local imports
sys.path.insert(0, str(Path(__file__).parent.parent))

import arxiv

from discovery.search import load_known_ids, search_recent_papers
from discovery.classify import classify_paper
from discovery.models import Paper
from discovery.output import prepend_to_toread

DAYS_LOOKBACK = 3


def find_connections(abstract: str, known_ids: set[str]) -> tuple[str, ...]:
    """Find references to known papers in abstract."""
    return tuple(pid for pid in known_ids if pid in abstract.lower())


def process_paper(
    result: arxiv.Result, known_ids: set[str], token: str | None
) -> Paper | None:
    """Process a single arXiv result into a Paper."""
    arxiv_id = result.get_short_id()
    title = result.title
    abstract = result.summary.replace("\n", " ").strip()

    classification = classify_paper(title, abstract, token)

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


def main() -> None:
    """Run paper discovery pipeline."""
    repo_root = Path(__file__).parent.parent.parent
    paper_list = repo_root / "papers" / "paper_list.md"
    toread = repo_root / "papers" / "toread.md"

    token = os.environ.get("GITHUB_TOKEN")
    if token:
        print("[info] Using GitHub Models for classification")
    else:
        print("[info] No GITHUB_TOKEN, using keyword fallback")

    print(f"[1/4] Searching arXiv (last {DAYS_LOOKBACK} days)...")
    raw_papers = search_recent_papers(DAYS_LOOKBACK)
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
        f"      Added {len(new_papers)} papers "
        f"({supports} support, {challenges} challenge, {balanced} balanced)"
    )


if __name__ == "__main__":
    main()
