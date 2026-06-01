#!/usr/bin/env python3
"""Verify analysis file structure matches the project conventions.

Two tiers of expectation:

REQUIRED (every file must have these): the spine of an analysis —
without these the file is unparseable by build_corpus_index.py.

PREFERRED (most files have these; older bins may not): the full
template. Reported as warnings, not errors.

REBUTTALS comes in two flavors over the corpus history:
  ## REBUTTALS                 (107 files, earlier convention)
  ## REBUTTALS TO THIS PAPER   (217 files, current convention)
Either satisfies the rebuttals requirement.

Run:
    uv run python scripts/verify_analysis_structure.py analysis/explored
    # exit 1 if any required section missing
    uv run python scripts/verify_analysis_structure.py analysis/explored --strict
    # exit 1 if preferred sections missing too
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

# Must be present or the file can't be machine-parsed.
# arXiv ID has two label conventions in the corpus history; either works.
REQUIRED = [
    re.compile(r"^# (?:Paper Analysis:|.+)$", re.MULTILINE),  # title line
    re.compile(r"\*\*arXiv(?: ID)?\*\*:", re.MULTILINE),
]

# Strongly recommended but historically inconsistent.
PREFERRED = [
    ("Metadata block", re.compile(r"^## Metadata$", re.MULTILINE)),
    (
        "Core Claims or equivalent",
        re.compile(r"^## (?:Core (?:Claims|Argument|Finding)|Summary)$", re.MULTILINE),
    ),
    ("Methodology", re.compile(r"^## Methodology$", re.MULTILINE)),
    ("Key Quotes", re.compile(r"^## Key (?:Quotes|Findings)$", re.MULTILINE)),
    (
        "Rebuttals (any variant)",
        re.compile(r"^## REBUTTALS(?: TO THIS PAPER)?$", re.MULTILINE),
    ),
    (
        "Relationship to other papers",
        re.compile(
            r"^## (?:Relationship to|Connections to|Relevance to|Interaction)",
            re.MULTILINE,
        ),
    ),
]


def verify(text: str) -> tuple[list[str], list[str]]:
    """Return (required_errors, preferred_warnings)."""
    required_errors: list[str] = []
    preferred_warnings: list[str] = []

    for rx in REQUIRED:
        if not rx.search(text):
            required_errors.append(f"missing required: /{rx.pattern}/")

    for label, rx in PREFERRED:
        if not rx.search(text):
            preferred_warnings.append(f"missing preferred: {label}")

    return required_errors, preferred_warnings


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("path", help="file or directory")
    parser.add_argument(
        "--strict",
        action="store_true",
        help="treat preferred-section warnings as errors",
    )
    args = parser.parse_args()

    path = Path(args.path)
    files = [path] if path.is_file() else sorted(path.rglob("*.md"))

    total_errors = 0
    total_warnings = 0
    bad_files = 0

    for f in files:
        if f.name.startswith("_"):
            continue
        text = f.read_text(encoding="utf-8", errors="ignore")
        errors, warnings = verify(text)
        if errors or (args.strict and warnings):
            bad_files += 1
            print(f"\n{f.relative_to(Path.cwd()) if f.is_absolute() else f}:")
            for e in errors:
                print(f"  ERROR   {e}")
            if args.strict:
                for w in warnings:
                    print(f"  ERROR   {w}")
        total_errors += len(errors)
        total_warnings += len(warnings)

    print()
    print(f"Scanned: {len(files)} files")
    print(f"Required errors: {total_errors}")
    print(f"Preferred-section warnings: {total_warnings}")

    if args.strict:
        sys.exit(1 if total_errors + total_warnings > 0 else 0)
    sys.exit(1 if total_errors > 0 else 0)


if __name__ == "__main__":
    main()
