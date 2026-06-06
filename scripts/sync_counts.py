"""Rewrite hardcoded paper counts across the repo from corpus.json.

The canonical source of truth is analysis/index/corpus.json — produced by
build_corpus_index.py from analysis/explored/*.md.

Without --check, this script rewrites:
  - README.md (badge, prose, file-tree, network counts)
  - docs/index.html (filter badge fallbacks)
  - docs/pages/findings.html (footer count)
  - apps/galaxy/index.html (meta description)
  - apps/galaxy/src/App.tsx (splash + sidebar copy)
  - apps/galaxy/README.md (first line and synthesis count)

With --check, the script READS the same files and exits non-zero if any
hardcoded number doesn't match corpus reality. Use in CI to catch drift.

Run:
    uv run python scripts/sync_counts.py            # rewrite
    uv run python scripts/sync_counts.py --check    # CI mode
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from dataclasses import dataclass
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CORPUS_PATH = ROOT / "analysis" / "index" / "corpus.json"
LINKS_PATH = ROOT / "docs" / "js" / "links.js"


@dataclass(frozen=True)
class Counts:
    total: int
    supports: int
    balanced: int
    challenges: int
    smoking_guns: int
    links: int


def load_counts() -> Counts:
    entries = json.loads(CORPUS_PATH.read_text())
    total = len(entries)
    supports = sum(1 for e in entries if e["stance"] == "supports")
    balanced = sum(1 for e in entries if e["stance"] == "balanced")
    challenges = sum(1 for e in entries if e["stance"] == "challenges")
    smoking_guns = sum(1 for e in entries if e["smoking_gun"])

    # Links are defined in docs/js/links.js as a JS array. We count
    # entries by looking for `source: '...'` occurrences — same pattern
    # used by the existing validator. Avoids parsing JS for one number.
    links = len(re.findall(r"source:\s*['\"]", LINKS_PATH.read_text()))

    return Counts(total, supports, balanced, challenges, smoking_guns, links)


@dataclass
class Replacement:
    path: Path
    pattern: re.Pattern[str]
    template: str  # uses {total}, {supports}, etc.


def replacements(c: Counts) -> list[Replacement]:
    """All hardcoded-count sites to keep in sync."""
    return [
        # README.md
        Replacement(
            ROOT / "README.md",
            re.compile(r"img\.shields\.io/badge/papers-\d+-blue"),
            f"img.shields.io/badge/papers-{c.total}-blue",
        ),
        Replacement(
            ROOT / "README.md",
            re.compile(r"surveys \d+\+? papers"),
            f"surveys {c.total} papers",
        ),
        Replacement(
            ROOT / "README.md",
            re.compile(r"interactive graph of \d+\+? papers and \d+\+? relationships"),
            f"interactive graph of {c.total} papers and {c.links} relationships",
        ),
        Replacement(
            ROOT / "README.md",
            re.compile(r"\d+ papers as nodes, \d+ relationships as edges"),
            f"{c.total} papers as nodes, {c.links} relationships as edges",
        ),
        Replacement(
            ROOT / "README.md",
            re.compile(r"supports \(\d+\), challenges \(\d+\), balanced \(\d+\)"),
            f"supports ({c.supports}), challenges ({c.challenges}), balanced ({c.balanced})",
        ),
        Replacement(
            ROOT / "README.md",
            re.compile(r"\d+-paper synthesis"),
            f"{c.total}-paper synthesis",
        ),
        Replacement(
            ROOT / "README.md",
            re.compile(r"Individual paper analyses \(\d+ papers\)"),
            f"Individual paper analyses ({c.total} papers)",
        ),
        Replacement(
            ROOT / "README.md",
            re.compile(r"Relationship links \(\d+\)"),
            f"Relationship links ({c.links})",
        ),
        # docs/index.html — fallbacks for filter badges before JS hydrates.
        Replacement(
            ROOT / "docs" / "index.html",
            re.compile(r'id="supports-count">\d+</span>'),
            f'id="supports-count">{c.supports}</span>',
        ),
        Replacement(
            ROOT / "docs" / "index.html",
            re.compile(r'id="challenges-count">\d+</span>'),
            f'id="challenges-count">{c.challenges}</span>',
        ),
        Replacement(
            ROOT / "docs" / "index.html",
            re.compile(r'id="balanced-count">\d+</span>'),
            f'id="balanced-count">{c.balanced}</span>',
        ),
        # docs/pages/findings.html
        Replacement(
            ROOT / "docs" / "pages" / "findings.html",
            re.compile(r"· \d+ papers analyzed"),
            f"· {c.total} papers analyzed",
        ),
        # apps/galaxy/index.html — meta tags
        Replacement(
            ROOT / "apps" / "galaxy" / "index.html",
            re.compile(r"\d+ papers\. \d+ smoking guns"),
            f"{c.total} papers. {c.smoking_guns} smoking guns",
        ),
        Replacement(
            ROOT / "apps" / "galaxy" / "index.html",
            re.compile(r"\d+ papers, projected in 3D"),
            f"{c.total} papers, projected in 3D",
        ),
        # AGENTS.md, workflow.md — file tree comments mentioning the
        # findings page paper count.
        Replacement(
            ROOT / "AGENTS.md",
            re.compile(r"# \d+-paper synthesis"),
            f"# {c.total}-paper synthesis",
        ),
        Replacement(
            ROOT / "workflow.md",
            re.compile(r"\| \d+-paper synthesis"),
            f"| {c.total}-paper synthesis",
        ),
        # analysis/synthesis.md and analysis/rebuttals.md — only the
        # blockquote header ("> **Papers analyzed**: N") is auto-
        # synced. Internal session-summary lines like "Papers
        # analyzed: 254-258" are hand-curated and intentionally not
        # touched.
        Replacement(
            ROOT / "analysis" / "synthesis.md",
            re.compile(r"^> \*\*Papers analyzed\*\*: \d+", re.MULTILINE),
            f"> **Papers analyzed**: {c.total}",
        ),
        Replacement(
            ROOT / "analysis" / "rebuttals.md",
            re.compile(r"^> \*\*Papers analyzed\*\*: \d+", re.MULTILINE),
            f"> **Papers analyzed**: {c.total}",
        ),
        # NOTE: apps/galaxy/src/App.tsx now reads counts from
        # corpus.json at runtime via the corpusStats memo. No static
        # replacements needed there.
        # apps/galaxy/README.md
        Replacement(
            ROOT / "apps" / "galaxy" / "README.md",
            re.compile(r"\d+ paper analyses"),
            f"{c.total} paper analyses",
        ),
    ]


def apply(check: bool) -> int:
    counts = load_counts()
    print(
        f"Corpus: {counts.total} papers "
        f"({counts.supports} supports / {counts.balanced} balanced / "
        f"{counts.challenges} challenges, {counts.smoking_guns} smoking guns, "
        f"{counts.links} links)\n",
    )

    drift: list[str] = []
    changed: list[str] = []

    for rep in replacements(counts):
        if not rep.path.exists():
            print(f"  skip (missing): {rep.path.relative_to(ROOT)}")
            continue
        original = rep.path.read_text()
        updated, n = rep.pattern.subn(rep.template, original)
        if n == 0:
            print(
                f"  miss: {rep.path.relative_to(ROOT)} — no match for "
                f"/{rep.pattern.pattern}/",
            )
            continue
        if updated == original:
            continue
        if check:
            drift.append(
                f"  drift: {rep.path.relative_to(ROOT)} (would write '{rep.template}')"
            )
        else:
            rep.path.write_text(updated)
            changed.append(
                f"  wrote: {rep.path.relative_to(ROOT)} ({n} replacement{'s' if n != 1 else ''})"
            )

    if changed:
        print("Updates applied:")
        for line in changed:
            print(line)
    if drift:
        print("Drift detected (run without --check to fix):")
        for line in drift:
            print(line)
        return 1
    if not changed and not drift:
        print("All counts already in sync.")
    return 0


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--check",
        action="store_true",
        help="read-only mode: report drift, exit 1 if any.",
    )
    args = parser.parse_args()
    sys.exit(apply(args.check))


if __name__ == "__main__":
    main()
