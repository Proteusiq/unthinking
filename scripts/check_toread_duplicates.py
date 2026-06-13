#!/usr/bin/env python3
"""Check papers/toread.md for papers already in the corpus.

Usage:
    uvx --with duckdb python scripts/check_toread_duplicates.py
"""

import re
from pathlib import Path

import duckdb


def main():
    repo_root = Path(__file__).parent.parent
    db_path = repo_root / "analysis/index/papers.duckdb"
    toread_path = repo_root / "papers/toread.md"

    if not db_path.exists():
        print("Database not found. Run: make db")
        return

    con = duckdb.connect(str(db_path), read_only=True)

    # Get all arxiv IDs from corpus
    corpus_ids = {row[0] for row in con.execute("SELECT arxiv FROM papers").fetchall()}

    # Read toread.md
    content = toread_path.read_text()

    # Find all arXiv IDs in toread.md (not struck through)
    # Pattern: [2xxx.xxxxx] not preceded by ~~
    arxiv_pattern = r"(?<!~~)\[(\d{4}\.\d{4,5})\]"
    toread_ids = set(re.findall(arxiv_pattern, content))

    # Also find struck-through ones to exclude
    struck_pattern = r"~~\[(\d{4}\.\d{4,5})\]"
    struck_ids = set(re.findall(struck_pattern, content))

    # Remove struck-through from toread
    toread_ids = toread_ids - struck_ids

    print(f"Papers in corpus: {len(corpus_ids)}")
    print(f"Papers in toread.md (not struck): {len(toread_ids)}")
    print(f"Papers struck through: {len(struck_ids)}")
    print()

    # Find duplicates
    duplicates = toread_ids & corpus_ids

    if duplicates:
        print(f"=== DUPLICATES FOUND: {len(duplicates)} ===\n")
        for arxiv_id in sorted(duplicates):
            result = con.execute(
                "SELECT id, title, stance FROM papers WHERE arxiv = ?", [arxiv_id]
            ).fetchone()
            if result:
                print(f"  {arxiv_id}: #{result[0]} - {result[1]} ({result[2]})")
        print()
        print("These papers are ALREADY ANALYZED. Mark them as DONE in toread.md.")
    else:
        print("No duplicates found. All papers in toread.md are new.")

    # Summary of what's left
    remaining = toread_ids - corpus_ids
    print(f"\nRemaining to read: {len(remaining)} papers")

    con.close()


if __name__ == "__main__":
    main()
