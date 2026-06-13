#!/usr/bin/env python3
"""Build a DuckDB database from corpus.json for easy paper lookup and duplicate detection."""

import json
from pathlib import Path

import duckdb


def build_db():
    """Build papers.duckdb from corpus.json."""
    repo_root = Path(__file__).parent.parent
    corpus_path = repo_root / "analysis/index/corpus.json"
    db_path = repo_root / "analysis/index/papers.duckdb"

    # Load corpus
    with open(corpus_path) as f:
        papers = json.load(f)

    # Connect to DuckDB (creates file if not exists)
    con = duckdb.connect(str(db_path))

    # Drop and recreate table
    con.execute("DROP TABLE IF EXISTS papers")
    con.execute("""
        CREATE TABLE papers (
            id INTEGER PRIMARY KEY,
            arxiv VARCHAR,
            title VARCHAR,
            date VARCHAR,
            stance VARCHAR,
            cluster VARCHAR,
            core_finding VARCHAR,
            smoking_gun BOOLEAN,
            analysis_path VARCHAR,
            word_count INTEGER
        )
    """)

    # Insert papers
    for p in papers:
        con.execute(
            """
            INSERT INTO papers VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
            [
                p["id"],
                p.get("arxiv", ""),
                p["title"],
                p.get("date", ""),
                p["stance"],
                p.get("cluster", ""),
                p.get("core_finding", ""),
                p.get("smoking_gun", False),
                p.get("analysis_path", ""),
                p.get("word_count", 0),
            ],
        )

    con.close()
    print(f"Built {db_path} with {len(papers)} papers")


if __name__ == "__main__":
    build_db()
