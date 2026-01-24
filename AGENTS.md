# Literature Review Methodology

## Overview
Rules and methodology for conducting systematic literature reviews on AI/ML research papers.

---

## Core Principles

### 1. Read the FULL Paper, Not Just the Abstract
- **ALWAYS** fetch and read the complete HTML version of papers (arxiv.org/html/)
- Abstracts can be misleading or incomplete
- Key evidence, methodology details, and limitations are often in the body
- Look for actual numbers, experimental setups, and edge cases

### 2. Independent Critical Assessment
- **Do not automatically agree with the researcher's interpretation** — form your own view from the paper first
- Read the paper carefully BEFORE accepting any characterization (rebuttal, confirmation, etc.)
- If the researcher suggests a classification, VERIFY it against the actual paper content
- Apply critical thinking independently — the researcher can be wrong
- When in doubt, re-read key sections of the paper to form your own judgment
- You MAY defer to the researcher after independent verification confirms their view
- State your assessment clearly, noting agreement or disagreement with the researcher

### 3. Rebuttal Analysis is MANDATORY
For EVERY paper analyzed, you MUST:
1. **Search for direct arXiv rebuttals** — check if other papers cite/challenge this work
2. **Check for counter-evidence from other analyzed papers** in the corpus
3. **Document rebuttals in BOTH directions** — papers can be challenged AND can challenge others
4. **Include a REBUTTALS section** in each analysis file
5. **Update the paper interaction graph** (see below)

### 4. Evidence Must Have Numbers
- Extract specific quantitative results (percentages, metrics, sample sizes)
- Document experimental conditions (models tested, datasets used)
- Note statistical significance where provided
- Flag when papers make claims without quantitative support

### 5. Track Paper Interactions (MANDATORY)
For EVERY paper analyzed, you MUST update the paper interaction graph:
1. **Document relationships**: supports, challenges, extends, provides mechanism for
2. **Track rebuttal chains**: A rebuts B, C rebuts A's rebuttal, etc.
3. **Update `analysis/PAPER_GRAPH.md`** with new interactions
4. **Identify papers with NO rebuttals** — these are stronger evidence

---

## Paper Interaction Graph

### Purpose
Track how papers relate to each other — who rebuts whom, who builds on whom, chains of rebuttals.

### Format
Maintain in `analysis/PAPER_GRAPH.md`:

```
## Paper Interaction Graph

### Direct Rebuttals
Paper A (arXiv) --rebuts--> Paper B (arXiv)
Paper C (arXiv) --rebuts--> Paper A (arXiv)  [counter-rebuttal]

### Builds On / Extends
Paper D --extends--> Paper E
Paper F --provides mechanism for--> Paper G

### Supports
Paper H --supports--> Paper I (same finding, different method)
```

### Visual Representation
```
┌─────────────┐     rebuts      ┌─────────────┐
│  Paper A    │ ───────────────>│  Paper B    │
└─────────────┘                 └─────────────┘
       ^
       │ rebuts (counter)
       │
┌─────────────┐
│  Paper C    │
└─────────────┘
```

---

## Analysis File Template

Each paper analysis should follow this structure:

```markdown
# Paper Analysis: [Title]

## Metadata
- **arXiv ID**: 
- **Title**: 
- **Authors**: 
- **Date**: 
- **Venue**: 

---

## Core Claims
[Numbered list of main claims]

---

## Methodology
[How they tested their claims]

---

## Key Evidence
[Tables with actual numbers, key experimental results]

---

## Relationship to Other Papers
### Supports
### Challenges
### Extends
### Challenged By

---

## REBUTTALS TO THIS PAPER
### Search for Direct Rebuttals
### Potential Counter-Arguments
### Limitations (Authors Acknowledge)

---

## Key Quotes
[Direct quotes with context]

---

## Status
- [ ] Read complete (HTML version)
- [ ] Core claims extracted
- [ ] Methodology documented
- [ ] Key evidence with numbers
- [ ] Cross-references identified
- [ ] **Rebuttals checked**
- [ ] **Paper graph updated**
```

---

## Expanding the Paper Corpus

### Systematic arXiv Search
When the initial paper list needs expansion, conduct systematic searches:

1. **Search Strategy**:
   - Use arXiv search with date filters (e.g., 2024-2026)
   - Search multiple query terms covering different angles:
     - Core topic: "LLM reasoning", "chain of thought"
     - Skeptical: "reasoning limitations", "reasoning failure"
     - Mechanistic: "interpretability reasoning", "reasoning circuits"
     - Emergent: "emergent reasoning", "reasoning generalization"
   - Include venue filters when possible (ICLR, NeurIPS, EMNLP, ACL)

2. **Categorization**:
   - Group papers by sub-topic (CoT faithfulness, compositional generalization, etc.)
   - Mark expected stance (FOR/AGAINST thesis, BALANCED)
   - Note venue and any awards (Outstanding Paper, Best Paper)
   - Prioritize papers that directly test the thesis

3. **Priority Assignment**:
   - HIGH: Directly tests thesis claims with controlled experiments
   - HIGH: Award-winning papers (signal quality)
   - HIGH: Papers that challenge our thesis (steel-man the opposition)
   - MEDIUM: Extends existing findings with new evidence
   - LOW: Tangentially related or overlaps with analyzed papers

4. **Update paper_list.md**:
   - Add new papers with arXiv ID, title, expected stance
   - Mark as NOT_STARTED
   - Group logically (by topic or by stance)

### Example Search Session
```
Query: "LLM reasoning" + date:2024-2026 + category:cs.CL
→ Found 150 results
→ Filtered to 25 high-relevance papers
→ Categorized: 8 CoT, 5 compositional, 4 emergent, 4 mechanistic, 4 other
→ Added to paper_list.md with expected stance
```

---

## Workflow

### When Analyzing a New Paper:
1. Fetch the full HTML version from arXiv
2. Read completely, not just abstract
3. Extract core claims with supporting evidence
4. Document methodology and limitations
5. Search for rebuttals on arXiv
6. Cross-reference with papers already analyzed
7. Update the paper interaction graph
8. Mark paper as done in paper_list.md
9. **COMMIT changes to git**

---

## Key Lessons

### 1. Rebuttals Can Be Rebutted
- Always check for counter-counter evidence
- Track the full rebuttal chain
- Example: Paper A rebuts Paper B, then Paper C rebuts Paper A

### 2. Performance on Benchmarks Can Be Misleading
- Always examine what the benchmark actually tests
- Look for complexity analysis of benchmarks
- High accuracy on easy benchmarks proves little

### 3. "Controlled" Evidence is Stronger
- Observational studies show correlation
- Controlled experiments show causation
- Prioritize controlled experiments for causal claims

### 4. Authors Often Acknowledge Limitations
- Check the paper's own limitations section
- Authors' admissions are valuable evidence
- Look for qualifications in the discussion

### 5. Look for Patterns Across Papers
- Same finding from different methods = stronger
- Contradictory findings = needs investigation
- Track which claims are replicated vs. contested

---

## Git Commit Guidelines

- Commit after each paper analysis
- Commit after significant updates
- Use descriptive commit messages with paper arXiv IDs
- Include key findings in commit message

Example:
```
Add analysis: [Paper Title] (arXiv ID)

- Key finding 1
- Key finding 2
- Rebuts/Supports: [other paper]
```

---

## File Structure

```
/project
├── AGENTS.md                    # This file (methodology)
├── papers/
│   └── paper_list.md           # Master list with status
└── analysis/
    ├── SYNTHESIS.md            # Main thesis synthesis
    ├── PAPER_GRAPH.md          # Paper interaction graph
    ├── REBUTTALS.md            # Rebuttal matrix
    └── explored/               # Individual paper analyses
        ├── 00_paper_name.md
        ├── 01_paper_name.md
        └── ...
```

**Note**: Individual paper analyses go in `analysis/explored/`. Meta-analysis files (SYNTHESIS, PAPER_GRAPH, REBUTTALS) stay in `analysis/`.
