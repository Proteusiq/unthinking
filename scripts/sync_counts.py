"""Rewrite hardcoded paper counts across the repo from corpus.json.

The canonical source of truth is analysis/index/corpus.json - produced by
build_corpus_index.py from analysis/explored/*.md.

Without --check, this script rewrites:
  - README.md (badge, prose, file-tree, constellation and network counts)
  - docs/pages/findings.html (footer count, stance cards, batch distribution)
  - apps/galaxy/index.html (meta description)
  - apps/galaxy/src/App.tsx (splash + sidebar copy)
  - apps/galaxy/README.md (first line and synthesis count)
  - papers/paper_list.md (header: total and stance counts)

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
    nodes: int
    internal_links: int


def load_counts() -> Counts:
    entries = json.loads(CORPUS_PATH.read_text())
    total = len(entries)
    supports = sum(1 for e in entries if e["stance"] == "supports")
    balanced = sum(1 for e in entries if e["stance"] == "balanced")
    challenges = sum(1 for e in entries if e["stance"] == "challenges")
    smoking_guns = sum(1 for e in entries if e["smoking_gun"])

    # The graph is defined in JS, not in the corpus. nodes.js holds one
    # `id:` per paper and links.js one `source:`/`target:` pair per edge.
    # The README quotes the in-graph numbers, so they need the same
    # drift check as the corpus counts.
    nodes_text = (ROOT / "docs" / "js" / "nodes.js").read_text()
    links_text = LINKS_PATH.read_text()
    node_ids = set(re.findall(r"\n    id: '([^']+)'", nodes_text))
    edges = re.findall(r"source: '([^']+)',\s*\n\s*target: '([^']+)'", links_text)
    internal_links = sum(
        1 for source, target in edges if source in node_ids and target in node_ids
    )

    return Counts(
        total,
        supports,
        balanced,
        challenges,
        smoking_guns,
        len(edges),
        len(node_ids),
        internal_links,
    )


@dataclass
class Replacement:
    path: Path
    pattern: re.Pattern[str]
    template: str  # uses {total}, {supports}, etc.


STANCE_ORDER = ("supports", "balanced", "challenges")
STANCE_LABEL = {
    "supports": "Supports",
    "balanced": "Balanced",
    "challenges": "Challenges",
}


def stance_cards_html(c: Counts) -> str:
    cards = []
    for stance in STANCE_ORDER:
        count = getattr(c, stance)
        percent = round(100 * count / c.total) if c.total else 0
        cards.append(
            f'        <div class="stance-card {stance}">\n'
            f'          <div class="stance-number">{count}</div>\n'
            f'          <div class="stance-label">{STANCE_LABEL[stance]}</div>\n'
            f'          <div class="stance-percent">{percent}%</div>\n'
            f"        </div>"
        )
    body = "\n".join(cards)
    return (
        '<section class="stance-section">\n'
        '      <div class="stance-grid">\n'
        f"{body}\n"
        "      </div>\n"
        "    </section>"
    )


def batch_distribution() -> list[tuple[str, dict[str, int]]]:
    """Stance counts per 10-paper analysis folder, newest folder last."""
    entries = json.loads(CORPUS_PATH.read_text())
    batches: dict[int, dict[str, int]] = {}
    for entry in entries:
        start = (int(entry["id"]) // 10) * 10
        bucket = batches.setdefault(start, dict.fromkeys(STANCE_ORDER, 0))
        if entry["stance"] in bucket:
            bucket[entry["stance"]] += 1
    return [
        (f"{start:02d}-{start + 9:02d}", batches[start]) for start in sorted(batches)
    ]


def bar_widths(values: list[int]) -> list[int]:
    """Integer widths summing to 100, distributed by largest remainder."""
    total = sum(values)
    if total == 0:
        return [0 for _ in values]
    exact = [100 * value / total for value in values]
    widths = [int(value) for value in exact]
    order = sorted(range(len(values)), key=lambda i: exact[i] - widths[i], reverse=True)
    for index in order[: 100 - sum(widths)]:
        widths[index] += 1
    return widths


def distribution_html() -> str:
    lines = ['<div class="distribution">']
    for label, counts in batch_distribution():
        values = [counts[stance] for stance in STANCE_ORDER]
        widths = bar_widths(values)
        lines.append('      <div class="dist-row">')
        lines.append(f'        <span class="dist-label">{label}</span>')
        lines.append('        <div class="dist-bar-container">')
        for stance, value, width in zip(STANCE_ORDER, values, widths, strict=True):
            if value == 0:
                continue
            lines.append(
                f'          <div class="dist-bar {stance}" '
                f'style="width: {width}%">{value}</div>'
            )
        lines.append("        </div>")
        lines.append(f'        <span class="dist-count">{sum(values)}</span>')
        lines.append("      </div>")
    lines.append("    </div>")
    return "\n".join(lines)


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
            re.compile(r"img\.shields\.io/badge/relationships-\d+-orange"),
            f"img.shields.io/badge/relationships-{c.links}-orange",
        ),
        Replacement(
            ROOT / "README.md",
            re.compile(r"alt=\"The citation constellation: \d+ papers"),
            f'alt="The citation constellation: {c.nodes} papers',
        ),
        Replacement(
            ROOT / "README.md",
            re.compile(r"\*\*Citation constellation\*\*: \d+ papers"),
            f"**Citation constellation**: {c.nodes} papers",
        ),
        Replacement(
            ROOT / "README.md",
            re.compile(r"\*\*\d+ papers\*\* on a twisted ring"),
            f"**{c.nodes} papers** on a twisted ring",
        ),
        Replacement(
            ROOT / "README.md",
            re.compile(r"\*\*[\d,]+ tracked\s+relationships\*\*"),
            f"**{c.internal_links:,} tracked\n  relationships**",
        ),
        Replacement(
            ROOT / "README.md",
            re.compile(r"cross-analysis of \d+ papers"),
            f"cross-analysis of {c.total} papers",
        ),
        Replacement(
            ROOT / "README.md",
            re.compile(r"surveys \d+\+? papers"),
            f"surveys {c.total} papers",
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
        # docs/pages/findings.html
        Replacement(
            ROOT / "docs" / "pages" / "findings.html",
            re.compile(r"· \d+ papers analyzed"),
            f"· {c.total} papers analyzed",
        ),
        # The stance cards and the batch distribution are derived, not
        # hand-maintained: both sections are rewritten wholesale so a new
        # analysis cannot leave them behind.
        Replacement(
            ROOT / "docs" / "pages" / "findings.html",
            re.compile(r'<section class="stance-section">.*?</section>', re.DOTALL),
            stance_cards_html(c),
        ),
        Replacement(
            ROOT / "docs" / "pages" / "findings.html",
            re.compile(
                r'<div class="distribution">.*?(?=<!-- Fundamental Equation -->)',
                re.DOTALL,
            ),
            distribution_html() + "\n\n    ",
        ),
        # apps/galaxy/index.html - meta tags
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
        # AGENTS.md, workflow.md - file tree comments mentioning the
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
        # analysis/synthesis.md and analysis/rebuttals.md - only the
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
        Replacement(
            ROOT / "papers" / "paper_list.md",
            re.compile(
                r"^> \d+ papers analyzed \| \d+ supports thesis \| "
                r"\d+ challenges \| \d+ balanced",
                re.MULTILINE,
            ),
            f"> {c.total} papers analyzed | {c.supports} supports thesis | "
            f"{c.challenges} challenges | {c.balanced} balanced",
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
                f"  miss: {rep.path.relative_to(ROOT)} - no match for "
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
