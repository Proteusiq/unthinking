#!/usr/bin/env python3
"""
Daily Paper Discovery Script (v2)

Improved pipeline:
1. SEARCH: Find papers from last 7 days on arXiv
2. QUALIFY: Filter to LLM reasoning/thinking papers only
3. DEDUPE: Check against paper_list.md to skip existing
4. CONNECT: Check if paper cites/references papers we already have
5. OUTPUT: Add qualified papers to toread.md

"""

import arxiv
import re
import os
from datetime import datetime, timedelta
from pathlib import Path


# =============================================================================
# CONFIGURATION
# =============================================================================

# Search papers from last 3 days (arXiv doesn't update on weekends)
DAYS_LOOKBACK = 3

# Core search - broad net for reasoning papers
SEARCH_QUERIES = [
    'cat:cs.CL AND abs:"reasoning"',
    'cat:cs.CL AND abs:"chain of thought"', 
    'cat:cs.CL AND abs:"chain-of-thought"',
    'cat:cs.AI AND abs:"LLM" AND abs:"reasoning"',
    'cat:cs.LG AND abs:"language model" AND abs:"reasoning"',
]

# QUALIFICATION: Paper must contain at least one of these in title/abstract
MUST_HAVE_KEYWORDS = [
    # Core reasoning terms
    'reasoning', 'chain of thought', 'chain-of-thought', 'cot',
    'thinking', 'thought', 'inference',
    # LLM terms
    'llm', 'large language model', 'language model', 'gpt', 'transformer',
    # Specific phenomena we care about
    'faithfulness', 'faithful', 'unfaithful',
    'compositional', 'generalization', 'out-of-distribution', 'ood',
    'pattern matching', 'memorization', 'emergence', 'emergent',
    'test-time', 'scaling', 'reinforcement learning',
]

# Papers mentioning these get higher priority
THESIS_RELEVANT_KEYWORDS = [
    'pattern matching', 'distribution shift', 'out-of-distribution',
    'faithfulness', 'unfaithful', 'compositional generalization',
    'reasoning collapse', 'reasoning limitation', 'reasoning failure',
    'illusion', 'mirage', 'surface', 'superficial',
    'memorization vs reasoning', 'genuine reasoning',
]

# Known paper titles/IDs we have (will be loaded from paper_list.md)
KNOWN_PAPERS = set()
KNOWN_TITLES = set()


# =============================================================================
# STEP 1: SEARCH
# =============================================================================

def search_recent_papers(days_back: int = 7) -> dict:
    """Search arXiv for recent papers matching our queries."""
    
    client = arxiv.Client()
    cutoff_date = datetime.now() - timedelta(days=days_back)
    all_papers = {}
    
    for query in SEARCH_QUERIES:
        print(f"  Searching: {query[:60]}...")
        
        search = arxiv.Search(
            query=query,
            max_results=100,
            sort_by=arxiv.SortCriterion.SubmittedDate,
            sort_order=arxiv.SortOrder.Descending
        )
        
        try:
            for paper in client.results(search):
                # Only recent papers
                if paper.published.replace(tzinfo=None) < cutoff_date:
                    continue
                    
                arxiv_id = paper.get_short_id()
                if arxiv_id not in all_papers:
                    all_papers[arxiv_id] = paper
        except Exception as e:
            print(f"    Error: {e}")
    
    return all_papers


# =============================================================================
# STEP 2: QUALIFY
# =============================================================================

def qualifies_as_reasoning_paper(paper) -> tuple[bool, list]:
    """
    Check if paper is actually about LLM reasoning.
    Returns (qualifies, matched_keywords)
    """
    text = f"{paper.title} {paper.summary}".lower()
    
    # Must have at least one core keyword
    matched = []
    for kw in MUST_HAVE_KEYWORDS:
        if kw.lower() in text:
            matched.append(kw)
    
    # Must have both: reasoning-related AND LLM-related
    has_reasoning = any(kw in matched for kw in [
        'reasoning', 'chain of thought', 'chain-of-thought', 'cot', 
        'thinking', 'thought', 'inference'
    ])
    has_llm = any(kw in matched for kw in [
        'llm', 'large language model', 'language model', 'gpt', 'transformer'
    ])
    
    qualifies = has_reasoning and has_llm
    
    return qualifies, matched


def assess_thesis_relevance(paper, matched_keywords: list) -> tuple[str, int, str]:
    """
    Assess how relevant paper is to our thesis.
    Returns (stance, priority_score, explanation)
    """
    text = f"{paper.title} {paper.summary}".lower()
    
    # Check for thesis-relevant keywords
    thesis_matches = []
    for kw in THESIS_RELEVANT_KEYWORDS:
        if kw.lower() in text:
            thesis_matches.append(kw)
    
    # Determine likely stance
    supports_indicators = [
        'limitation', 'failure', 'collapse', 'illusion', 'mirage',
        'pattern matching', 'memorization', 'unfaithful', 'superficial'
    ]
    challenges_indicators = [
        'genuine reasoning', 'true reasoning', 'reasoning capability',
        'emergence', 'breakthrough', 'improvement'
    ]
    
    supports_count = sum(1 for kw in supports_indicators if kw in text)
    challenges_count = sum(1 for kw in challenges_indicators if kw in text)
    
    if supports_count > challenges_count:
        stance = "SUPPORTS"
    elif challenges_count > supports_count:
        stance = "CHALLENGES"
    else:
        stance = "BALANCED"
    
    # Priority score (higher = more relevant)
    priority = len(thesis_matches) * 2 + len(matched_keywords)
    
    # Build explanation
    if thesis_matches:
        explanation = f"Thesis-relevant: {', '.join(thesis_matches[:3])}"
    else:
        explanation = f"General reasoning paper. Keywords: {', '.join(matched_keywords[:3])}"
    
    return stance, priority, explanation


# =============================================================================
# STEP 3: DEDUPE
# =============================================================================

def load_existing_papers(paper_list_path: Path) -> tuple[set, set]:
    """Load existing paper IDs and titles from paper_list.md."""
    
    paper_ids = set()
    paper_titles = set()
    
    if not paper_list_path.exists():
        return paper_ids, paper_titles
    
    content = paper_list_path.read_text()
    
    # Extract arXiv IDs (format: XXXX.XXXXX)
    ids = re.findall(r'\b(\d{4}\.\d{4,5})\b', content)
    paper_ids.update(ids)
    
    # Extract titles (rough - lines that look like titles)
    for line in content.split('\n'):
        # Look for markdown links or title-like patterns
        title_match = re.search(r'\[([^\]]+)\]', line)
        if title_match:
            title = title_match.group(1).lower().strip()
            if len(title) > 20:  # Skip short non-titles
                paper_titles.add(title)
    
    return paper_ids, paper_titles


def is_duplicate(paper, known_ids: set, known_titles: set) -> bool:
    """Check if we already have this paper."""
    
    arxiv_id = paper.get_short_id()
    
    # Check ID
    if arxiv_id in known_ids:
        return True
    
    # Check title similarity (fuzzy)
    title_lower = paper.title.lower().strip()
    if title_lower in known_titles:
        return True
    
    # Check partial title match (first 50 chars)
    title_prefix = title_lower[:50]
    for known in known_titles:
        if title_prefix in known or known[:50] in title_lower:
            return True
    
    return False


# =============================================================================
# STEP 4: CHECK CONNECTIONS
# =============================================================================

def check_connections(paper, known_ids: set) -> list:
    """
    Check if paper mentions any papers we already have.
    Returns list of referenced paper IDs.
    """
    text = f"{paper.title} {paper.summary}".lower()
    
    connections = []
    for known_id in known_ids:
        if known_id in text:
            connections.append(known_id)
    
    return connections


# =============================================================================
# STEP 5: OUTPUT
# =============================================================================

def format_paper_entry(paper, stance: str, priority: int, explanation: str, connections: list) -> str:
    """Format a paper as a markdown entry."""
    
    arxiv_id = paper.get_short_id()
    date = paper.published.strftime("%Y-%m-%d")
    
    entry = f"""### [{paper.title}](https://arxiv.org/abs/{arxiv_id})
- **arXiv**: {arxiv_id}
- **Published**: {date}
- **Stance**: {stance}
- **Priority**: {priority}/10
- **Why read**: {explanation}
"""
    
    if connections:
        entry += f"- **Cites our papers**: {', '.join(connections)}\n"
    
    # Collapsible abstract (full text, not truncated)
    abstract = paper.summary.replace('\n', ' ').strip()
    entry += f"""
<details>
<summary>Abstract</summary>

{abstract}

</details>

"""
    
    return entry


def write_toread(papers: list, output_path: Path):
    """Append new papers to toread.md, preserving existing content."""
    
    today = datetime.now().strftime("%Y-%m-%d")
    
    # Sort by priority (highest first)
    papers.sort(key=lambda x: x['priority'], reverse=True)
    
    # Build new papers section
    new_section = f"\n## New Papers ({today})\n\n"
    
    for p in papers:
        new_section += format_paper_entry(
            p['paper'], 
            p['stance'], 
            p['priority'], 
            p['explanation'],
            p['connections']
        )
    
    new_section += "---\n"
    
    # Read existing content or create new file
    if output_path.exists():
        existing = output_path.read_text()
        
        # Update the "Last updated" date in header
        if "**Last updated**:" in existing:
            existing = re.sub(
                r'\*\*Last updated\*\*: \d{4}-\d{2}-\d{2}',
                f'**Last updated**: {today}',
                existing
            )
        
        # Find insertion point (after the header section, before first ## section)
        # Look for the first "## " that's not in the header
        lines = existing.split('\n')
        insert_idx = None
        in_header = True
        
        for i, line in enumerate(lines):
            if line.startswith('---') and in_header:
                in_header = False
                insert_idx = i + 1
                break
        
        if insert_idx is None:
            # No proper structure, append at end
            content = existing.rstrip() + "\n" + new_section
        else:
            # Insert new papers after header
            lines.insert(insert_idx, new_section)
            content = '\n'.join(lines)
    else:
        # Create new file with header
        content = f"""# Papers to Read

Curated list of papers relevant to the thesis. Auto-discovered papers are appended with dates.

**Last updated**: {today}

---
{new_section}"""
    
    output_path.write_text(content)
    print(f"Appended {len(papers)} papers to {output_path}")


# =============================================================================
# MAIN
# =============================================================================

def main():
    print("=" * 60)
    print("Paper Discovery Pipeline")
    print("=" * 60)
    
    # Paths
    repo_root = Path(__file__).parent.parent
    paper_list = repo_root / "papers" / "paper_list.md"
    toread = repo_root / "papers" / "toread.md"
    
    # Step 1: Search
    print("\n[1/5] Searching arXiv for recent papers...")
    all_papers = search_recent_papers(DAYS_LOOKBACK)
    print(f"  Found {len(all_papers)} papers from last {DAYS_LOOKBACK} days")
    
    if not all_papers:
        print("No papers found. Exiting.")
        return
    
    # Step 2 & 3: Load existing papers for deduplication
    print("\n[2/5] Loading existing papers...")
    known_ids, known_titles = load_existing_papers(paper_list)
    
    # Also check toread.md to avoid duplicates across runs
    toread_ids, toread_titles = load_existing_papers(toread)
    known_ids.update(toread_ids)
    known_titles.update(toread_titles)
    
    print(f"  Known: {len(known_ids)} IDs, {len(known_titles)} titles (includes toread.md)")
    
    # Step 3: Qualify and dedupe
    print("\n[3/5] Qualifying papers...")
    qualified = []
    
    for arxiv_id, paper in all_papers.items():
        # Skip duplicates
        if is_duplicate(paper, known_ids, known_titles):
            continue
        
        # Check if it's actually about LLM reasoning
        qualifies, matched = qualifies_as_reasoning_paper(paper)
        if not qualifies:
            continue
        
        # Assess relevance
        stance, priority, explanation = assess_thesis_relevance(paper, matched)
        
        qualified.append({
            'paper': paper,
            'matched_keywords': matched,
            'stance': stance,
            'priority': min(priority, 10),  # Cap at 10
            'explanation': explanation,
            'connections': [],
        })
    
    print(f"  Qualified: {len(qualified)} papers")
    
    if not qualified:
        print("No new qualified papers. Exiting.")
        # Don't overwrite existing toread.md - just exit
        return
    
    # Step 4: Check connections
    print("\n[4/5] Checking connections to existing papers...")
    for item in qualified:
        connections = check_connections(item['paper'], known_ids)
        item['connections'] = connections
        if connections:
            item['priority'] += 2  # Boost priority if cites our papers
            print(f"  {item['paper'].get_short_id()} cites: {connections}")
    
    # Step 5: Output
    print("\n[5/5] Writing to toread.md...")
    write_toread(qualified, toread)
    
    # Summary
    print("\n" + "=" * 60)
    print("Summary")
    print("=" * 60)
    print(f"Total searched: {len(all_papers)}")
    print(f"Qualified: {len(qualified)}")
    print(f"Supports thesis: {sum(1 for p in qualified if p['stance'] == 'SUPPORTS')}")
    print(f"Challenges thesis: {sum(1 for p in qualified if p['stance'] == 'CHALLENGES')}")
    print(f"Balanced: {sum(1 for p in qualified if p['stance'] == 'BALANCED')}")
    

if __name__ == "__main__":
    main()
