# Literature Review Methodology: "The Thinking Machine That Doesn't Think"

## Project Overview
This document defines the methodology and rules for conducting a systematic literature review for the research paper "The Thinking Machine That Doesn't Think", which argues that LLM reasoning is practical but predictive (interpolation within training distribution), not genuinely generative (extrapolation beyond training).

---

## Core Principles

### 1. Read the FULL Paper, Not Just the Abstract
- **ALWAYS** fetch and read the complete HTML version of papers (arxiv.org/html/)
- Abstracts can be misleading or incomplete
- Key evidence, methodology details, and limitations are often in the body
- Look for actual numbers, experimental setups, and edge cases

### 2. Rebuttal Analysis is MANDATORY
For EVERY paper analyzed, you MUST:
1. **Search for direct arXiv rebuttals** — check if other papers cite/challenge this work
2. **Check for counter-evidence from other analyzed papers** in our corpus
3. **Document rebuttals in BOTH directions** — papers can be challenged AND can challenge others
4. **Include a REBUTTALS section** in each analysis file
5. **Update REBUTTALS.md** with cross-paper interactions

### 3. Evidence Must Have Numbers
- Extract specific quantitative results (percentages, metrics, sample sizes)
- Document experimental conditions (models tested, datasets used)
- Note statistical significance where provided
- Flag when papers make claims without quantitative support

### 4. Maintain Thesis Direction
- Classify papers as: **FOR**, **AGAINST**, or **BALANCED**
- Track how each paper relates to our core thesis
- Identify which of our thesis claims each paper supports or challenges
- Update SYNTHESIS.md with evidence mapping

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
- **Stance**: FOR / AGAINST / BALANCED

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

## Critical Analysis for Thesis
[How this relates to our argument]

---

## Relationship to Other Papers
### Supports
### Challenged By
### Provides Mechanism For

---

## REBUTTALS TO THIS PAPER
### Search for Direct Rebuttals
### Potential Counter-Arguments
### Limitations (Authors Acknowledge)

---

## Key Quotes for Thesis
[Direct quotes with context]

---

## Relevance to "The Thinking Machine That Doesn't Think"
### Relevance Rating: X/10
[Why this paper matters for our thesis]

---

## Status
- [ ] Read complete (HTML version)
- [ ] Core claims extracted
- [ ] Methodology documented
- [ ] Key evidence with numbers
- [ ] Critical analysis for thesis
- [ ] Cross-references identified
- [ ] **Rebuttals checked**
- [ ] **Counter-evidence noted**
```

---

## Key Files and Their Purpose

| File | Purpose |
|------|---------|
| `papers/paper_list.md` | Master list of all papers to analyze with status |
| `analysis/SYNTHESIS.md` | Integrated synthesis of all evidence, thesis position |
| `analysis/REBUTTALS.md` | Cross-paper rebuttal matrix, counter-evidence tracking |
| `analysis/XX_paper_name.md` | Individual paper analysis files |

---

## Thesis Claims to Track

### Confident Claims (Unrebutted)
- CoT is often unfaithful (7-13% on natural prompts, 25-40% overall)
- Success is distribution-dependent (ID=100%, OOD=0%)
- Semantic associations override explicit instructions
- Planning fails even with tools (0% with move validator)
- RL surfaces, doesn't create ("cannot synthesize from void")
- Only 30% of LLM SCMs are ideal causal chains

### Qualified Claims (With Caveats)
- Tool augmentation works FOR SOME TASKS (Hanoi yes, 8-puzzle no)
- RLVR improves causality (30% → 63%, but not 100%)
- Strategic reasoning exists but bounded by training distribution

### Claims Needing More Evidence
- Whether "Aha moments" are reasoning or pattern recognition
- Whether unfaithful CoT is compatible with genuine internal reasoning

---

## Workflow

### When Analyzing a New Paper:
1. Fetch the full HTML version from arXiv
2. Read completely, not just abstract
3. Extract core claims with supporting evidence
4. Document methodology and limitations
5. Search for rebuttals on arXiv
6. Cross-reference with papers already analyzed
7. Update SYNTHESIS.md with new evidence
8. Update REBUTTALS.md if cross-paper interactions found
9. Mark paper as done in paper_list.md
10. **COMMIT changes to git**

### When Updating Synthesis:
1. Add paper to the analysis table
2. Update relevant evidence mapping sections
3. Revise thesis position if new evidence warrants
4. Update "Next Steps" section
5. **COMMIT changes to git**

---

## Important Lessons Learned

### 1. Rebuttals Can Be Rebutted
- "Agentic Gap" (2506.18957) was rebutted by "Limits of Innate Planning" (2511.21591)
- Always check for counter-counter evidence
- Track the full rebuttal chain

### 2. Performance on Benchmarks Can Be Misleading
- NLGraph-hard: 99% accuracy but lookahead < 2 (trivially easy)
- Always examine what the benchmark actually tests
- Look for complexity analysis of benchmarks

### 3. "Controlled" Evidence is Stronger
- Observational: s1, DeepSeek-R1 (correlation)
- Controlled: Interplay paper (0% vs ≥1% exposure experiment)
- Prioritize controlled experiments for causal claims

### 4. Authors Often Acknowledge Limitations
- Check the paper's own limitations section
- Authors' admissions can support our thesis
- Example: "LLMs are vastly trained on pBCGs which involve iterating downward"

### 5. Token Decrease at Failure is Revealing
- Models "give up" rather than try harder
- Token usage DECREASES at high complexity
- Suggests recognition of being outside competence

### 6. Distribution Boundaries Are Sharp, Not Gradual
- Performance drops are ABRUPT (cliff, not slope)
- This indicates hard limits, not gradual capability degradation
- Consistent across multiple papers (Illusion of Thinking, Reasoning Models)

---

## Git Commit Guidelines

- Commit after each paper analysis
- Commit after significant SYNTHESIS.md updates
- Use descriptive commit messages with paper arXiv IDs
- Include key findings in commit message

Example:
```
Add analysis: Reasoning Models Reason Well (2510.22371)

- Abrupt collapse at L~64-300 for LRMs
- NLGraph-hard trivially easy (L<2)
- Even o3 fails at sufficient complexity
- Token usage DECREASES at high complexity
```

---

## Version
- Created: Session 2026-01-24
- Papers Analyzed: 18
- Last Updated: 2026-01-24
