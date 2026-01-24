#!/usr/bin/env python3
"""
Daily Paper Discovery Script

Searches arXiv for new papers relevant to:
- LLM reasoning capabilities and limitations
- Chain-of-thought faithfulness
- Compositional generalization
- RL for reasoning
- Test-time compute scaling

Adds new papers to papers/toread.md with explanation of relevance.
"""

import arxiv
import os
from datetime import datetime, timedelta
from pathlib import Path


# Search queries for relevant papers
QUERIES = [
    # Core reasoning topics
    'cat:cs.CL AND (abs:"LLM reasoning" OR abs:"language model reasoning")',
    'cat:cs.CL AND abs:"chain of thought" AND (abs:"faithful" OR abs:"unfaithful")',
    'cat:cs.CL AND abs:"compositional generalization" AND abs:"language model"',
    'cat:cs.CL AND (abs:"reasoning" AND abs:"out-of-distribution")',
    
    # RL and reasoning
    'cat:cs.CL AND abs:"reinforcement learning" AND abs:"reasoning"',
    'cat:cs.CL AND abs:"test-time" AND (abs:"scaling" OR abs:"compute")',
    
    # Specific phenomena
    'cat:cs.CL AND abs:"pattern matching" AND abs:"language model"',
    'cat:cs.CL AND (abs:"emergent" AND abs:"reasoning" AND abs:"LLM")',
    'cat:cs.CL AND abs:"reasoning" AND abs:"illusion"',
    'cat:cs.CL AND abs:"CoT" AND (abs:"mirage" OR abs:"limitation")',
]

# Keywords that indicate high relevance to thesis
HIGH_RELEVANCE_KEYWORDS = [
    'pattern matching', 'distribution shift', 'out-of-distribution',
    'faithfulness', 'unfaithful', 'compositional', 'generalization failure',
    'reasoning collapse', 'reasoning limitation', 'reasoning boundary',
    'RL reasoning', 'test-time compute', 'chain-of-thought faithful',
    'emergent reasoning', 'reasoning emergence', 'reasoning illusion',
]

# Keywords that indicate challenges to thesis (also interesting!)
CHALLENGE_KEYWORDS = [
    'genuine reasoning', 'reasoning capability', 'reasoning emergence',
    'reasoning improvement', 'scaling reasoning', 'reasoning breakthrough',
]


def load_existing_papers(paper_list_path: Path, toread_path: Path) -> set:
    """Load arXiv IDs of papers we already have."""
    existing = set()
    
    for path in [paper_list_path, toread_path]:
        if path.exists():
            content = path.read_text()
            # Extract arXiv IDs (format: XXXX.XXXXX)
            import re
            ids = re.findall(r'\b(\d{4}\.\d{4,5})\b', content)
            existing.update(ids)
    
    return existing


def search_arxiv(query: str, max_results: int = 50) -> list:
    """Search arXiv with a query."""
    client = arxiv.Client()
    search = arxiv.Search(
        query=query,
        max_results=max_results,
        sort_by=arxiv.SortCriterion.SubmittedDate,
        sort_order=arxiv.SortOrder.Descending
    )
    
    results = []
    try:
        for paper in client.results(search):
            results.append(paper)
    except Exception as e:
        print(f"Error searching for '{query}': {e}")
    
    return results


def assess_relevance(paper) -> tuple[str, str]:
    """
    Assess paper relevance and generate explanation.
    Returns (stance, explanation).
    """
    text = f"{paper.title} {paper.summary}".lower()
    
    # Check for high relevance keywords
    high_matches = [kw for kw in HIGH_RELEVANCE_KEYWORDS if kw.lower() in text]
    challenge_matches = [kw for kw in CHALLENGE_KEYWORDS if kw.lower() in text]
    
    # Determine likely stance
    if len(challenge_matches) > len(high_matches):
        stance = "CHALLENGES"
        explanation = f"May challenge thesis. Keywords: {', '.join(challenge_matches[:3])}"
    elif high_matches:
        stance = "SUPPORTS"
        explanation = f"Likely supports thesis. Keywords: {', '.join(high_matches[:3])}"
    else:
        stance = "BALANCED"
        explanation = "Relevance unclear - needs review"
    
    # Add specific reasons based on content
    reasons = []
    
    if 'faithful' in text or 'unfaithful' in text:
        reasons.append("CoT faithfulness analysis")
    if 'compositional' in text:
        reasons.append("Compositional generalization")
    if 'out-of-distribution' in text or 'ood' in text:
        reasons.append("OOD generalization")
    if 'reinforcement learning' in text or ' rl ' in text:
        reasons.append("RL for reasoning")
    if 'test-time' in text:
        reasons.append("Test-time scaling")
    if 'pattern' in text and 'match' in text:
        reasons.append("Pattern matching analysis")
    if 'emergent' in text:
        reasons.append("Emergence claims")
    
    if reasons:
        explanation = f"{explanation}. Topics: {', '.join(reasons)}"
    
    return stance, explanation


def format_paper_entry(paper, stance: str, explanation: str) -> str:
    """Format a paper as a markdown entry."""
    arxiv_id = paper.get_short_id()
    date = paper.published.strftime("%Y-%m-%d")
    
    return f"""### [{paper.title}](https://arxiv.org/abs/{arxiv_id})
- **arXiv**: {arxiv_id}
- **Date**: {date}
- **Stance**: {stance}
- **Why read**: {explanation}
- **Abstract**: {paper.summary[:500]}{'...' if len(paper.summary) > 500 else ''}

"""


def main():
    # Paths
    repo_root = Path(__file__).parent.parent
    paper_list = repo_root / "papers" / "paper_list.md"
    toread = repo_root / "papers" / "toread.md"
    
    # Load existing papers
    existing = load_existing_papers(paper_list, toread)
    print(f"Found {len(existing)} existing papers")
    
    # Search for new papers
    all_papers = {}
    for query in QUERIES:
        print(f"Searching: {query[:50]}...")
        papers = search_arxiv(query)
        for paper in papers:
            arxiv_id = paper.get_short_id()
            if arxiv_id not in existing and arxiv_id not in all_papers:
                all_papers[arxiv_id] = paper
    
    print(f"Found {len(all_papers)} new papers")
    
    if not all_papers:
        print("No new papers found")
        # Create empty toread.md if it doesn't exist
        if not toread.exists():
            toread.write_text("# Papers to Read\n\nNo new papers found yet.\n")
        return
    
    # Assess and format papers
    today = datetime.now().strftime("%Y-%m-%d")
    entries = []
    
    for arxiv_id, paper in sorted(all_papers.items(), 
                                   key=lambda x: x[1].published, 
                                   reverse=True):
        stance, explanation = assess_relevance(paper)
        entry = format_paper_entry(paper, stance, explanation)
        entries.append(entry)
    
    # Read existing toread.md or create new
    if toread.exists():
        content = toread.read_text()
    else:
        content = """# Papers to Read

New papers discovered by automated search, pending review for literature survey.

---

"""
    
    # Add new section for today
    new_section = f"""## {today} - {len(entries)} new papers

{chr(10).join(entries)}

---

"""
    
    # Insert after header
    if "---\n\n##" in content:
        # Insert before first date section
        parts = content.split("---\n\n##", 1)
        content = parts[0] + "---\n\n" + new_section + "##" + parts[1]
    else:
        content = content.rstrip() + "\n\n" + new_section
    
    # Write updated file
    toread.write_text(content)
    print(f"Added {len(entries)} papers to {toread}")


if __name__ == "__main__":
    main()
