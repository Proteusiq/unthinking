"""Output formatting and file writing."""

import re
from datetime import datetime
from pathlib import Path

from discovery.models import Paper


def format_paper(paper: Paper) -> str:
    """Format a paper as markdown."""
    lines = [
        f"### [{paper.title}](https://arxiv.org/abs/{paper.arxiv_id})",
        f"- **arXiv**: {paper.arxiv_id}",
        f"- **Published**: {paper.published}",
        f"- **Stance**: {paper.stance}",
        f"- **Priority**: {paper.priority}/10",
        f"- **Why read**: {paper.why_read}",
    ]

    if paper.connections:
        lines.append(f"- **Cites our papers**: {', '.join(paper.connections)}")

    lines.extend(
        [
            "",
            "<details>",
            "<summary>Abstract</summary>",
            "",
            paper.abstract,
            "",
            "</details>",
            "",
        ]
    )

    return "\n".join(lines)


def prepend_to_toread(papers: list[Paper], path: Path) -> None:
    """Prepend new papers to toread.md (after header)."""
    today = datetime.now().strftime("%Y-%m-%d")

    section_lines = [f"## New Papers ({today})", ""]
    for paper in sorted(papers, key=lambda p: p.priority, reverse=True):
        section_lines.append(format_paper(paper))
    new_section = "\n".join(section_lines)

    if path.exists():
        existing = path.read_text()
        existing = re.sub(
            r"\*\*Last updated\*\*: \d{4}-\d{2}-\d{2}",
            f"**Last updated**: {today}",
            existing,
        )
        parts = existing.split("\n---\n", 1)
        if len(parts) == 2:
            content = f"{parts[0]}\n---\n\n{new_section}{parts[1]}"
        else:
            content = f"{existing}\n\n{new_section}"
    else:
        content = f"""# Papers to Read

Curated list of papers relevant to the thesis. Auto-discovered papers are prepended.

**Last updated**: {today}

---

{new_section}"""

    path.write_text(content)
