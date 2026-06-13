#!/usr/bin/env python3
"""Look up papers in the corpus by arXiv ID or title search.

Usage:
    uvx --with duckdb python scripts/lookup_paper.py 2309.12288
    uvx --with duckdb python scripts/lookup_paper.py "reversal curse"
    uvx --with duckdb python scripts/lookup_paper.py --all  # list all
    uvx --with duckdb python scripts/lookup_paper.py --stats  # show stats
"""

import sys
from pathlib import Path

import duckdb


def main():
    repo_root = Path(__file__).parent.parent
    db_path = repo_root / "analysis/index/papers.duckdb"

    if not db_path.exists():
        print("Database not found. Run: uvx --with duckdb python scripts/build_papers_db.py")
        sys.exit(1)

    con = duckdb.connect(str(db_path), read_only=True)

    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(0)

    query = sys.argv[1]

    if query == "--all":
        # List all papers
        results = con.execute("""
            SELECT id, arxiv, title, stance 
            FROM papers 
            ORDER BY id
        """).fetchall()
        print(f"{'ID':>4} {'arXiv':<12} {'Stance':<10} Title")
        print("-" * 80)
        for r in results:
            title = r[2][:50] + "..." if len(r[2]) > 50 else r[2]
            print(f"{r[0]:>4} {r[1]:<12} {r[3]:<10} {title}")
        print(f"\nTotal: {len(results)} papers")

    elif query == "--stats":
        # Show statistics
        print("=== Corpus Statistics ===\n")

        total = con.execute("SELECT COUNT(*) FROM papers").fetchone()[0]
        print(f"Total papers: {total}\n")

        print("By stance:")
        for row in con.execute("""
            SELECT stance, COUNT(*) as cnt 
            FROM papers 
            GROUP BY stance 
            ORDER BY cnt DESC
        """).fetchall():
            print(f"  {row[0]:<12} {row[1]:>3}")

        print("\nBy cluster:")
        for row in con.execute("""
            SELECT cluster, COUNT(*) as cnt 
            FROM papers 
            GROUP BY cluster 
            ORDER BY cnt DESC
        """).fetchall():
            print(f"  {row[0]:<15} {row[1]:>3}")

        print("\nSmoking guns:")
        smoking = con.execute("SELECT COUNT(*) FROM papers WHERE smoking_gun").fetchone()[0]
        print(f"  {smoking} papers marked as smoking gun evidence")

    elif query.replace(".", "").replace("-", "").isdigit():
        # Looks like an arXiv ID
        results = con.execute("""
            SELECT id, arxiv, title, date, stance, cluster, analysis_path
            FROM papers 
            WHERE arxiv = ? OR arxiv LIKE ?
        """, [query, f"%{query}%"]).fetchall()

        if not results:
            print(f"No paper found with arXiv ID matching '{query}'")
            print("\nThis paper is NOT in the corpus - safe to analyze.")
        else:
            print(f"Found {len(results)} match(es):\n")
            for r in results:
                print(f"  ID: {r[0]}")
                print(f"  arXiv: {r[1]}")
                print(f"  Title: {r[2]}")
                print(f"  Date: {r[3]}")
                print(f"  Stance: {r[4]}")
                print(f"  Cluster: {r[5]}")
                print(f"  Analysis: {r[6]}")
                print()
            print("WARNING: Paper already in corpus!")

    else:
        # Title/keyword search
        results = con.execute("""
            SELECT id, arxiv, title, stance, cluster
            FROM papers 
            WHERE LOWER(title) LIKE LOWER(?)
            ORDER BY id
        """, [f"%{query}%"]).fetchall()

        if not results:
            print(f"No papers found matching '{query}'")
        else:
            print(f"Found {len(results)} match(es) for '{query}':\n")
            print(f"{'ID':>4} {'arXiv':<12} {'Stance':<10} Title")
            print("-" * 80)
            for r in results:
                title = r[2][:50] + "..." if len(r[2]) > 50 else r[2]
                print(f"{r[0]:>4} {r[1]:<12} {r[3]:<10} {title}")

    con.close()


if __name__ == "__main__":
    main()
