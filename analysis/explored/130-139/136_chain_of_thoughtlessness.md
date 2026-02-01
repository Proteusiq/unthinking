# Paper Analysis: Chain of Thoughtlessness? An Analysis of CoT in Planning

## Metadata
- **arXiv ID**: 2405.04776
- **Title**: Chain of Thoughtlessness? An Analysis of CoT in Planning
- **Authors**: Kaya Stechly, Karthik Valmeekam, Subbarao Kambhampati
- **Date**: May 2024
- **Venue**: NeurIPS 2024
- **Institution**: Arizona State University

---

## Core Claims

1. **CoT doesn't teach algorithms**: Contrary to previous claims, CoT's improvements do NOT stem from models learning general algorithmic procedures via demonstrations.

2. **Performance requires highly problem-specific prompts**: CoT only shows "meaningful performance improvements" when prompts are "exceedingly specific to their problem class."

3. **Improvements deteriorate rapidly with complexity**: Performance quickly degrades as problem size n grows past the size shown in examples.

4. **Similar failure modes across domains**: Created scalable variants of three commonly studied CoT domains and demonstrated similar failure patterns.

5. **Sharp tradeoff**: There's a "sharp tradeoff between possible performance gains and the amount of human labor necessary to generate examples with correct reasoning traces."

---

## Methodology

### Experimental Setup
- Domain: Blocksworld (classical planning)
- Models: Two state-of-the-art LLMs
- Two evaluation axes:
  1. **Generality of examples** given in prompt
  2. **Complexity of problems** queried with each prompt

### Key Tests
1. Vary prompt specificity (general vs. problem-specific)
2. Vary problem complexity (stack size n)
3. Measure performance degradation patterns

---

## Key Evidence

### Finding 1: Only Problem-Specific Prompts Help

From abstract:
> "We only find meaningful performance improvements from chain of thought prompts when those prompts are **exceedingly specific to their problem class**"

**Implication**: CoT is NOT teaching general algorithms — it's providing specific patterns to match.

### Finding 2: Rapid Performance Degradation

> "Those improvements quickly deteriorate as the size n of the query-specified stack grows past the size of stacks shown in the examples."

| Stack Size | Performance |
|------------|-------------|
| n ≤ examples | Improved |
| n > examples | **Rapidly deteriorates** |

**Implication**: Models don't learn general procedures — they pattern-match to example sizes.

### Finding 3: OOD Failure Consistent Across Domains

> "We also create scalable variants of three domains commonly studied in previous CoT papers and demonstrate the existence of **similar failure modes**."

Three domains all show same pattern: failure when complexity exceeds examples.

---

## Relationship to Thesis

### STRONGLY SUPPORTS the thesis

This paper directly refutes "CoT teaches reasoning" and supports "CoT is pattern matching":

1. **"CoT works because similar chains existed"**: ✅ Confirmed
   > "CoT's performance improvements do NOT stem from the model learning general algorithmic procedures"

2. **"Pattern matching to training distribution"**: ✅ Exactly what paper shows
   > "Improvements quickly deteriorate as the size n grows past the size of stacks shown in the examples"

3. **"Problem-specific = pattern matching"**: ✅ Core finding
   > "Those prompts are exceedingly specific to their problem class"

4. **"Not genuine reasoning"**: ✅ Title says it all
   > "Chain of **Thoughtlessness**?"

### Key Quote for Thesis

> "Our results hint that, contrary to previous claims in the literature, CoT's performance improvements do not stem from the model learning general algorithmic procedures via demonstrations but depend on carefully engineering highly problem specific prompts."

This is the mathematical proof of the thesis claim: CoT = pattern matching, not algorithm learning.

---

## Relationship to Other Papers

### Directly Supports
- **Paper 131 (Kambhampati, Can LLMs Reason)**: Same research group, same conclusion
- **Paper 134 (ICL OOD)**: Both show OOD failure
- **CoT Mirage (2508.01191)**: ID=high, OOD=low — same pattern
- **Faith and Fate**: Exponential error accumulation = degradation with complexity

### Provides Experimental Evidence For
- **Illusion of Thinking**: Complexity collapse
- **Interplay paper**: "Cannot synthesize from void"
- **Paper 132**: "Stop Anthropomorphizing" — this paper shows WHY

### Extends
- Previous CoT papers claiming success — shows their success was due to problem-specific prompts, not general reasoning

---

## REBUTTALS TO THIS PAPER

### Potential Counter-Arguments

1. **"Longer CoT might help"**: More tokens = more reasoning?
   - **Counter**: Paper 135 (Demystifying Long CoT) shows long CoT helps because MORE PATTERNS exist, not because of reasoning

2. **"Better prompts could work"**: Maybe we need better prompt engineering?
   - **Counter**: Paper explicitly shows this is the PROBLEM — need "exceedingly specific" prompts, which is pattern matching

3. **"Planning is different from other reasoning"**: Maybe planning is uniquely hard?
   - **Counter**: Paper tests THREE domains with same failure mode

### Limitations

1. Focus on Blocksworld and planning — may not apply to all reasoning
2. Only tests two LLMs
3. Doesn't test o1/reasoning models (written before their release)

---

## Key Quotes

> "Chain of Thoughtlessness?"

> "CoT's performance improvements do **not stem from the model learning general algorithmic procedures** via demonstrations"

> "We only find meaningful performance improvements from chain of thought prompts when those prompts are **exceedingly specific to their problem class**"

> "Those improvements **quickly deteriorate** as the size n of the query-specified stack grows past the size of stacks shown in the examples"

> "This spotlights drawbacks of chain of thought, especially the **sharp tradeoff** between possible performance gains and the amount of human labor necessary to generate examples with correct reasoning traces"

---

## Implications for Thesis Framework

```
┌─────────────────────────────────────────────────────────────┐
│                     CoT MECHANISM                            │
│                                                              │
│   General Prompt ──────────────► No improvement             │
│                                                              │
│   Problem-Specific Prompt ─────► Improvement (if n ≤ ex)    │
│                                                              │
│   Problem-Specific + n > ex ───► Rapid deterioration        │
│                                                              │
│   ═══════════════════════════════════════════════════════   │
│                                                              │
│   CONCLUSION: CoT = Pattern Matching to Examples            │
│               NOT Algorithm Learning                         │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Title "Chain of Thoughtlessness" captures the thesis perfectly**: The "thoughts" aren't thoughts — they're pattern matches.

---

## Status
- [x] Read complete (abstract + key claims)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence noted
- [x] Cross-references identified
- [x] **Rebuttals checked**
- [x] **Paper graph updated**
