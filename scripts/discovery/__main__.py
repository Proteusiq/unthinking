#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.12"
# dependencies = ["arxiv", "httpx"]
# ///

import os
from pathlib import Path

import arxiv
import httpx

from discovery.search import (
    discover_lesswrong,
    discover_paperswithcode,
    fetch_arxiv,
    load_known_ids,
    normalize_arxiv_id,
    search_recent_papers,
)
from discovery.classify import classify_paper
from discovery.models import Paper
from discovery.output import prepend_to_toevaluate

DAYS_LOOKBACK = 3
# The PwC feed is ranked by trending, not date, so give it a wider window.
PWC_DAYS_LOOKBACK = 30


def find_connections(abstract: str, known_ids: set[str]) -> tuple[str, ...]:
    return tuple(pid for pid in known_ids if pid in abstract.lower())


def process_paper(
    result: arxiv.Result,
    known_ids: set[str],
    token: str | None,
    client: httpx.Client | None,
) -> Paper | None:
    arxiv_id = result.get_short_id()
    title = result.title
    abstract = result.summary.replace("\n", " ").strip()

    classification = classify_paper(title, abstract, token, client)

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
        classified_by=classification.classified_by,
    )


def main() -> None:
    repo_root = Path(__file__).parent.parent.parent
    paper_list = repo_root / "papers" / "paper_list.md"
    toevaluate = repo_root / "papers" / "toevaluate.md"

    token = os.environ.get("GITHUB_TOKEN")
    if token:
        print("[info] Using GitHub Models for classification")
    else:
        print("[info] No GITHUB_TOKEN, using keyword fallback")

    print("[1/4] Searching sources...")
    # arXiv keyword sweep returns full papers directly.
    raw_papers = search_recent_papers(DAYS_LOOKBACK)
    print(f"      arXiv (last {DAYS_LOOKBACK}d): {len(raw_papers)}")

    # Discovery feeds only surface arXiv IDs; arXiv remains the paper source.
    pwc_ids = discover_paperswithcode(PWC_DAYS_LOOKBACK)
    print(f"      Papers with Code (last {PWC_DAYS_LOOKBACK}d): {len(pwc_ids)}")

    lw_ids = discover_lesswrong()
    print(f"      LessWrong arXiv links: {len(lw_ids)}")

    print("[2/4] Loading known papers...")
    known_ids = load_known_ids(paper_list) | load_known_ids(toevaluate)
    print(f"      {len(known_ids)} known IDs")

    # Resolve unseen discovery IDs to full arXiv papers.
    discovered = (
        (pwc_ids | lw_ids) - known_ids - {normalize_arxiv_id(i) for i in raw_papers}
    )
    raw_papers.update(fetch_arxiv(discovered))
    print(f"      Merged unique: {len(raw_papers)}")

    if not raw_papers:
        return

    print("[3/4] Classifying papers...")
    new_papers: list[Paper] = []

    with httpx.Client(timeout=30.0) as client:
        for arxiv_id, result in raw_papers.items():
            if normalize_arxiv_id(arxiv_id) in known_ids:
                continue
            paper = process_paper(result, known_ids, token, client if token else None)
            if paper:
                new_papers.append(paper)

    print(f"      {len(new_papers)} qualified")

    if not new_papers:
        print("      No new papers to add")
        return

    print("[4/4] Updating toevaluate.md...")
    prepend_to_toevaluate(new_papers, toevaluate)

    supports = sum(1 for p in new_papers if p.stance == "SUPPORTS")
    challenges = sum(1 for p in new_papers if p.stance == "CHALLENGES")
    balanced = len(new_papers) - supports - challenges
    print(
        f"      Added {len(new_papers)} papers "
        f"({supports} support, {challenges} challenge, {balanced} balanced)"
    )


if __name__ == "__main__":
    main()
