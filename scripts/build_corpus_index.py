"""Build a structured JSON index of all paper analyses.

Reads every markdown file under analysis/explored/ and extracts:
  - paper id (from filename prefix)
  - arxiv id
  - title
  - date
  - stance (from papers/paper_list.md)
  - core finding (from the first ASCII box after the heading, or the first paragraph)
  - top key quotes
  - smoking gun flag
  - analysis path

Output: analysis/index/corpus.json
"""

from __future__ import annotations

import json
import re
from dataclasses import asdict, dataclass, field
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ANALYSIS_DIR = ROOT / "analysis" / "explored"
PAPER_LIST = ROOT / "papers" / "paper_list.md"
OUTPUT_DIR = ROOT / "analysis" / "index"
OUTPUT_FILE = OUTPUT_DIR / "corpus.json"


ARXIV_RX = re.compile(r"\b(\d{4}\.\d{4,5})\b")
PAPER_ID_RX = re.compile(r"^(\d+)_")
# Match quotes in any of the patterns the analyses use:
#   > "..."                      (markdown blockquote)
#   1. *"..."*                   (numbered list, italic)
#   - *"..."*                    (bullet list, italic)
#   *"..."*                      (bare italic line)
# All catch straight ASCII quotes; the second alternation handles
# curly quotes that occasionally creep in.
QUOTE_RX = re.compile(
    r'(?:^>\s*|^[\s\-*]*\d*\.?\s*\*)["\u201c]([^"\u201d]+)["\u201d](?:\*)?',
    re.MULTILINE,
)
SMOKING_RX = re.compile(r"smoking[\s_-]?gun", re.IGNORECASE)
ASCII_BOX_RX = re.compile(r"┌[─]+┐(.*?)└[─]+┘", re.DOTALL)
BOX_LINE_RX = re.compile(r"│\s*(.*?)\s*│")
BULLET_RX = re.compile(r"^\s*[-*]\s+(.+)$", re.MULTILINE)


@dataclass
class PaperEntry:
    id: int
    arxiv: str
    title: str
    date: str
    stance: str
    cluster: str
    core_finding: str
    smoking_gun: bool
    quotes: list[str] = field(default_factory=list)
    analysis_path: str = ""
    word_count: int = 0


def load_paper_list_stances() -> dict[str, tuple[str, str, str]]:
    """Return mapping arxiv_id -> (title, date, stance) from paper_list.md."""
    text = PAPER_LIST.read_text()
    rows: dict[str, tuple[str, str, str]] = {}
    for line in text.splitlines():
        if not line.startswith("| ") or "| #" in line or "|---" in line:
            continue
        cols = [c.strip() for c in line.strip("|").split("|")]
        if len(cols) < 5:
            continue
        _id, arxiv, date, title, stance = cols[:5]
        if not arxiv or arxiv == "arXiv ID":
            continue
        rows[arxiv] = (title, date, stance)
    return rows


def extract_arxiv_id(text: str) -> str:
    metadata_block = text.split("---", 1)[0] if "---" in text else text[:2000]
    if match := ARXIV_RX.search(metadata_block):
        return match.group(1)
    if match := ARXIV_RX.search(text):
        return match.group(1)
    return ""


def extract_title(text: str) -> str:
    for line in text.splitlines():
        if line.startswith("# "):
            title = line[2:].strip()
            for prefix in ("Paper Analysis: ", "Analysis: "):
                if title.startswith(prefix):
                    title = title[len(prefix) :]
            return title
    return ""


def extract_date(text: str, fallback: str) -> str:
    for line in text.splitlines()[:30]:
        if "**Date**:" in line:
            return line.split("**Date**:", 1)[1].strip()
        if "- **Date**:" in line:
            return line.split("- **Date**:", 1)[1].strip()
    return fallback


def extract_core_finding(text: str) -> str:
    """Pull the most informative one-paragraph summary.

    Strategy:
      1. First ASCII box labelled KEY FINDING / CORE / SMOKING GUN
      2. First paragraph under '## Core Claims' or '## Summary' or '## Why This Paper Matters'
      3. First non-empty paragraph after the metadata block
    """
    if match := ASCII_BOX_RX.search(text):
        box_content = match.group(1)
        lines = []
        for raw_line in box_content.splitlines():
            inner_matches = BOX_LINE_RX.findall(raw_line)
            for snippet in inner_matches:
                snippet = snippet.strip()
                if not snippet or set(snippet) <= {"─", "═", "┴", "┬", "├", "┤"}:
                    continue
                lines.append(snippet)
        cleaned = " ".join(lines).strip()
        cleaned = re.sub(r"\s+", " ", cleaned)
        if len(cleaned) > 40:
            return cleaned[:1200]

    for header in (
        "## Core Claims",
        "## Summary",
        "## Why This Paper Matters",
        "## Core Argument",
    ):
        if header in text:
            section = text.split(header, 1)[1]
            section = section.split("\n## ", 1)[0]
            bullets = BULLET_RX.findall(section)
            if bullets:
                first = re.sub(r"\*\*", "", bullets[0]).strip()
                first = re.sub(r"\s+", " ", first)
                return first[:1200]
            paragraphs = [p.strip() for p in section.split("\n\n") if p.strip()]
            if paragraphs:
                cleaned = re.sub(r"\s+", " ", paragraphs[0])
                cleaned = re.sub(r"\*\*", "", cleaned)
                return cleaned[:1200]

    body = text.split("---", 2)[-1] if text.count("---") >= 2 else text
    for para in body.split("\n\n"):
        para = para.strip()
        if not para or para.startswith("#") or para.startswith("|"):
            continue
        cleaned = re.sub(r"\s+", " ", para)
        cleaned = re.sub(r"\*\*", "", cleaned)
        if len(cleaned) > 60:
            return cleaned[:1200]

    return ""


def extract_quotes(text: str, limit: int = 3) -> list[str]:
    quotes = QUOTE_RX.findall(text)
    cleaned = []
    seen = set()
    for q in quotes:
        q = re.sub(r"\s+", " ", q).strip()
        if not q or q in seen:
            continue
        seen.add(q)
        cleaned.append(q[:600])
        if len(cleaned) >= limit:
            break
    return cleaned


def has_smoking_gun(text: str) -> bool:
    return bool(SMOKING_RX.search(text))


def normalize_stance(raw: str) -> str:
    lowered = raw.lower()
    if "challenge" in lowered or lowered.startswith("against"):
        return "challenges"
    if "balanced" in lowered or "neutral" in lowered or "mixed" in lowered:
        return "balanced"
    if (
        "support" in lowered
        or lowered.startswith("for")
        or lowered.startswith("strongly")
    ):
        return "supports"
    return "balanced"


def stance_from_text(text: str, fallback: str) -> str:
    for line in text.splitlines()[:25]:
        if "**Stance**:" in line:
            value = line.split("**Stance**:", 1)[1].strip()
            value = re.sub(r"[\(\[].*?[\)\]]", "", value).strip()
            return normalize_stance(value)
    return normalize_stance(fallback)


def cluster_for_arxiv(arxiv: str, text: str) -> str:
    lowered = text.lower()
    score = {
        "faithfulness": 0,
        "memorization": 0,
        "reasoning": 0,
        "mechanistic": 0,
        "cot": 0,
        "agent": 0,
        "safety": 0,
        "theoretical": 0,
    }
    for word, weight in (
        ("faithful", 4),
        ("post-hoc", 3),
        ("chain-of-thought", 1),
        ("memoriz", 4),
        ("generaliz", 2),
        ("noise", 1),
        ("reason", 1),
        ("compositional", 2),
        ("circuit", 3),
        ("interpretab", 3),
        ("activation", 2),
        ("fourier", 3),
        ("cot ", 3),
        ("chain of thought", 3),
        ("agent", 4),
        ("tool", 1),
        ("refusal", 3),
        ("safety", 3),
        ("jailbreak", 3),
        ("steering", 2),
        ("pac-bayes", 4),
        ("bound", 2),
        ("theorem", 2),
        ("complexity", 2),
    ):
        count = lowered.count(word)
        if "faithful" in word or "post-hoc" in word:
            score["faithfulness"] += weight * count
        elif "memoriz" in word or "generaliz" in word or "noise" in word:
            score["memorization"] += weight * count
        elif "reason" in word or "composit" in word:
            score["reasoning"] += weight * count
        elif (
            "circuit" in word
            or "interpret" in word
            or "activation" in word
            or "fourier" in word
        ):
            score["mechanistic"] += weight * count
        elif "cot" in word or "chain" in word:
            score["cot"] += weight * count
        elif "agent" in word or "tool" in word:
            score["agent"] += weight * count
        elif (
            "refusal" in word
            or "safety" in word
            or "jailbreak" in word
            or "steering" in word
        ):
            score["safety"] += weight * count
        else:
            score["theoretical"] += weight * count

    return (
        max(score, key=lambda k: score[k]) if max(score.values()) > 0 else "reasoning"
    )


def process_file(
    path: Path, stance_lookup: dict[str, tuple[str, str, str]]
) -> PaperEntry | None:
    match = PAPER_ID_RX.match(path.name)
    if not match:
        return None
    paper_id = int(match.group(1))
    text = path.read_text(encoding="utf-8", errors="ignore")

    arxiv = extract_arxiv_id(text)
    title_from_file = extract_title(text)
    list_meta = stance_lookup.get(arxiv)

    title = title_from_file or (list_meta[0] if list_meta else "")
    date = extract_date(text, list_meta[1] if list_meta else "")
    stance_default = list_meta[2] if list_meta else ""
    stance = stance_from_text(text, stance_default).lower()

    core = extract_core_finding(text)
    quotes = extract_quotes(text)
    cluster = cluster_for_arxiv(arxiv, text)

    rel_path = path.relative_to(ROOT).as_posix()

    return PaperEntry(
        id=paper_id,
        arxiv=arxiv,
        title=title,
        date=date,
        stance=stance,
        cluster=cluster,
        core_finding=core,
        smoking_gun=has_smoking_gun(text),
        quotes=quotes,
        analysis_path=rel_path,
        word_count=len(text.split()),
    )


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    stance_lookup = load_paper_list_stances()
    paths = sorted(ANALYSIS_DIR.rglob("*.md"))
    entries: list[PaperEntry] = []
    for path in paths:
        if entry := process_file(path, stance_lookup):
            entries.append(entry)

    entries.sort(key=lambda e: e.id)

    OUTPUT_FILE.write_text(
        json.dumps([asdict(e) for e in entries], indent=2, ensure_ascii=False),
        encoding="utf-8",
    )

    print(f"Wrote {len(entries)} entries to {OUTPUT_FILE.relative_to(ROOT)}")
    print()
    print(f"  with arxiv id      : {sum(1 for e in entries if e.arxiv)}/{len(entries)}")
    print(f"  with title         : {sum(1 for e in entries if e.title)}/{len(entries)}")
    print(
        f"  with core finding  : {sum(1 for e in entries if e.core_finding)}/{len(entries)}"
    )
    print(
        f"  with quotes        : {sum(1 for e in entries if e.quotes)}/{len(entries)}"
    )
    print(
        f"  with stance        : {sum(1 for e in entries if e.stance)}/{len(entries)}"
    )
    print(
        f"  with smoking gun   : {sum(1 for e in entries if e.smoking_gun)}/{len(entries)}"
    )
    print()
    print("Stance distribution:")
    stances: dict[str, int] = {}
    for e in entries:
        key = e.stance or "(missing)"
        stances[key] = stances.get(key, 0) + 1
    for stance, count in sorted(stances.items(), key=lambda x: -x[1]):
        print(f"  {stance:<30} {count}")
    print()
    print("Cluster distribution:")
    clusters: dict[str, int] = {}
    for e in entries:
        clusters[e.cluster] = clusters.get(e.cluster, 0) + 1
    for cluster, count in sorted(clusters.items(), key=lambda x: -x[1]):
        print(f"  {cluster:<30} {count}")


if __name__ == "__main__":
    main()
