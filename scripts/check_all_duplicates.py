#!/usr/bin/env python3
"""Check toread.md and GitHub issues for papers already in corpus.

Usage:
    uvx --with duckdb python scripts/check_all_duplicates.py
"""

import json
import re
import subprocess
from pathlib import Path

import duckdb


def get_corpus_ids(db_path: Path) -> dict[str, tuple[int, str, str]]:
    """Get all arxiv IDs from corpus with their info."""
    con = duckdb.connect(str(db_path), read_only=True)
    results = con.execute("SELECT arxiv, id, title, stance FROM papers").fetchall()
    con.close()
    return {row[0]: (row[1], row[2], row[3]) for row in results}


def extract_arxiv_ids(text: str) -> set[str]:
    """Extract arXiv IDs from text, excluding struck-through ones."""
    # Find all arXiv IDs
    all_ids = set(re.findall(r"(\d{4}\.\d{4,5})", text))
    # Find struck-through ones
    struck = set(re.findall(r"~~.*?(\d{4}\.\d{4,5}).*?~~", text))
    return all_ids - struck


def check_toread(repo_root: Path, corpus: dict) -> tuple[set, set]:
    """Check toread.md for duplicates."""
    toread_path = repo_root / "papers/toread.md"
    content = toread_path.read_text()
    
    toread_ids = extract_arxiv_ids(content)
    duplicates = {aid for aid in toread_ids if aid in corpus}
    remaining = toread_ids - duplicates
    
    return duplicates, remaining


def get_github_issues() -> list[dict]:
    """Fetch open GitHub issues."""
    result = subprocess.run(
        ["gh", "issue", "list", "--state", "open", "--limit", "100", "--json", "number,title,body"],
        capture_output=True, text=True
    )
    if result.returncode != 0:
        print(f"Warning: Could not fetch GitHub issues: {result.stderr}")
        return []
    return json.loads(result.stdout)


def check_issues(issues: list[dict], corpus: dict) -> dict[int, tuple[str, set, set]]:
    """Check GitHub issues for duplicates."""
    issue_results = {}
    
    for issue in issues:
        num = issue["number"]
        title = issue["title"]
        body = issue.get("body", "") or ""
        
        # Only check survey/paper tracking issues
        if not any(kw in title.lower() for kw in ["survey", "paper", "reasoning"]):
            continue
        
        ids = extract_arxiv_ids(body)
        if not ids:
            continue
            
        duplicates = {aid for aid in ids if aid in corpus}
        remaining = ids - duplicates
        
        if duplicates or remaining:
            issue_results[num] = (title, duplicates, remaining)
    
    return issue_results


def main():
    repo_root = Path(__file__).parent.parent
    db_path = repo_root / "analysis/index/papers.duckdb"

    if not db_path.exists():
        print("Database not found. Run: make db")
        return

    corpus = get_corpus_ids(db_path)
    print(f"Papers in corpus: {len(corpus)}\n")

    # Check toread.md
    print("=" * 70)
    print("TOREAD.MD")
    print("=" * 70)
    
    toread_dups, toread_remaining = check_toread(repo_root, corpus)
    
    if toread_dups:
        print(f"\nDUPLICATES ({len(toread_dups)}):\n")
        for aid in sorted(toread_dups):
            pid, title, stance = corpus[aid]
            short_title = title[:50] + "..." if len(title) > 50 else title
            print(f"  {aid}: #{pid} - {short_title}")
    
    print(f"\nRemaining to read: {len(toread_remaining)}")

    # Check GitHub issues
    print("\n" + "=" * 70)
    print("GITHUB ISSUES")
    print("=" * 70)
    
    issues = get_github_issues()
    issue_results = check_issues(issues, corpus)
    
    total_issue_dups = 0
    total_issue_remaining = 0
    
    for num, (title, dups, remaining) in sorted(issue_results.items()):
        total_issue_dups += len(dups)
        total_issue_remaining += len(remaining)
        
        print(f"\n#{num}: {title}")
        print(f"  Duplicates: {len(dups)}, Remaining: {len(remaining)}")
        
        if dups:
            print("  Already analyzed:")
            for aid in sorted(dups):
                pid, ptitle, stance = corpus[aid]
                short = ptitle[:40] + "..." if len(ptitle) > 40 else ptitle
                print(f"    - {aid}: #{pid} {short}")

    # Summary
    print("\n" + "=" * 70)
    print("SUMMARY")
    print("=" * 70)
    print(f"  Corpus size:           {len(corpus)}")
    print(f"  toread.md duplicates:  {len(toread_dups)}")
    print(f"  toread.md remaining:   {len(toread_remaining)}")
    print(f"  Issues duplicates:     {total_issue_dups}")
    print(f"  Issues remaining:      {total_issue_remaining}")
    
    # Unique remaining across both
    all_remaining = toread_remaining
    for _, (_, _, remaining) in issue_results.items():
        all_remaining |= remaining
    all_remaining -= set(corpus.keys())
    
    print(f"  Total unique to read:  {len(all_remaining)}")


if __name__ == "__main__":
    main()
