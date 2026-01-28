import re
from datetime import datetime
from pathlib import Path

from discovery.models import Paper


def format_paper(paper: Paper) -> str:
    classifier_label = "LLM" if paper.classified_by == "llm" else "Keyword"
    lines = [
        f"### [{paper.title}](https://arxiv.org/abs/{paper.arxiv_id})",
        f"- **arXiv**: {paper.arxiv_id}",
        f"- **Published**: {paper.published}",
        f"- **Stance**: {paper.stance}",
        f"- **Priority**: {paper.priority}/10",
        f"- **Classified by**: {classifier_label}",
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


def prepend_to_toevaluate(papers: list[Paper], path: Path) -> None:
    """Write discovered papers to toevaluate.md for triage."""
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
        # Insert after the triage criteria section
        parts = existing.split("\n---\n", 2)
        if len(parts) >= 3:
            # Header, triage criteria, rest
            content = f"{parts[0]}\n---\n{parts[1]}\n---\n\n{new_section}{parts[2]}"
        elif len(parts) == 2:
            content = f"{parts[0]}\n---\n\n{new_section}{parts[1]}"
        else:
            content = f"{existing}\n\n{new_section}"
    else:
        content = f"""# Papers to Evaluate

Raw auto-discovered papers awaiting triage. Review and promote relevant ones to `toread.md`.

**Last updated**: {today}

---

## Triage Criteria

Promote to `toread.md` if paper:
- Directly tests reasoning claims with controlled experiments
- Provides new quantitative evidence (not just benchmarks)
- Challenges OR strongly supports the thesis with data
- High-impact venue or award-winning

Discard if paper:
- Tangentially related (mentions reasoning but doesn't test it)
- Overlaps significantly with already-analyzed papers
- Domain-specific application without generalizable insights
- No empirical evidence (opinion/position papers)

---

{new_section}

---

## Triage Log

| Date | Paper | Decision | Reason |
|------|-------|----------|--------|
| | | | |
"""

    path.write_text(content)
