#!/usr/bin/env python3
"""Verify analysis file structure matches required template."""

import sys
from pathlib import Path

REQUIRED_SECTIONS = [
    "# Paper Analysis:",
    "## Metadata",
    "## Core Claims",
    "## Methodology",
    "## Key Evidence",
    "## Relationship to Other Papers",
    "## REBUTTALS",
    "## Key Quotes",
    "## Status",
]

METADATA_FIELDS = [
    "**arXiv ID**:",
    "**Title**:",
    "**Authors**:",
    "**Date**:",
]

def verify_file(filepath: Path) -> list[str]:
    """Return list of errors for file."""
    errors = []
    content = filepath.read_text()
    
    # Check required sections
    for section in REQUIRED_SECTIONS:
        if section not in content:
            errors.append(f"Missing section: {section}")
    
    # Check metadata fields (if Metadata section exists)
    if "## Metadata" in content:
        for field in METADATA_FIELDS:
            if field not in content:
                errors.append(f"Missing metadata field: {field}")
    
    # Check doesn't start with ## Summary (wrong format)
    if content.strip().startswith("## Summary"):
        errors.append("Starts with '## Summary' (wrong format)")
    
    return errors

def main():
    if len(sys.argv) < 2:
        print("Usage: verify_analysis_structure.py <file_or_dir>")
        sys.exit(1)
    
    path = Path(sys.argv[1])
    files = [path] if path.is_file() else list(path.glob("**/*.md"))
    
    total_errors = 0
    for f in sorted(files):
        if f.name.startswith("_"):
            continue
        errors = verify_file(f)
        if errors:
            print(f"\n{f.name}:")
            for e in errors:
                print(f"  - {e}")
            total_errors += len(errors)
    
    if total_errors == 0:
        print("All files pass structure check!")
    else:
        print(f"\nTotal errors: {total_errors}")
    
    sys.exit(0 if total_errors == 0 else 1)

if __name__ == "__main__":
    main()
