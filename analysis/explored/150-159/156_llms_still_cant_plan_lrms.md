# Paper Analysis: LLMs Still Can't Plan; Can LRMs? A Preliminary Evaluation of OpenAI's o1 on PlanBench

## Metadata
- **arXiv ID**: 2409.13373
- **Title**: LLMs Still Can't Plan; Can LRMs? A Preliminary Evaluation of OpenAI's o1 on PlanBench
- **Authors**: Karthik Valmeekam, Kaya Stechly, Subbarao Kambhampati
- **Affiliation**: Arizona State University
- **Date**: September 2024
- **Venue**: arXiv preprint

---

## Core Claims

1. **Standard LLMs still can't plan**: Best LLM (LLaMA 3.1 405B) achieves only 62.6% on Blocksworld, <5% on Mystery Blocksworld.

2. **o1 shows "quantum improvement"**: 97.8% on Blocksworld, 52.8% on Mystery Blocksworld — dramatic improvement over LLMs.

3. **o1 still doesn't saturate**: Performance degrades on longer problems (23.63% on 20+ step problems), fails on unsolvable instances.

4. **LRMs vs LLMs distinction**: OpenAI's o1 represents a new category — "Large Reasoning Model" — fundamentally different architecture.

5. **Cost/accuracy tradeoffs matter**: o1 is orders of magnitude more expensive than classical planners which achieve 100%.

---

## Key Evidence

### LLM Performance on PlanBench (Table 1)

| Model | Blocksworld (0-shot) | Mystery BW (0-shot) |
|-------|---------------------|---------------------|
| LLaMA 3.1 405B | **62.6%** | 0.8% |
| Claude 3.5 Sonnet | 54.8% | 0% |
| Claude 3 Opus | 59.3% | 0% |
| GPT-4o | 35.5% | 0% |
| GPT-4 Turbo | 40.1% | 0.16% |
| Gemini 1.5 Pro | 23.8% | — |

**Critical finding**: Mystery Blocksworld (same logic, obfuscated names) collapses to near-zero for ALL LLMs.

### o1 Performance (Table 2)

| Model | Blocksworld | Mystery BW | Randomized Mystery |
|-------|-------------|------------|-------------------|
| o1-preview | **97.8%** | **52.8%** | **37.3%** |
| o1-mini | 56.6% | 19.1% | — |
| Fast Downward | **100%** | **100%** | **100%** |

**Key finding**: o1 shows dramatic improvement BUT still doesn't saturate, especially on obfuscated versions.

### Scaling with Problem Difficulty

| Problem Length | o1-preview Accuracy |
|----------------|---------------------|
| 3-5 blocks (2-16 steps) | 97.8% |
| 6-20 blocks (20-40 steps) | **23.63%** |

**Critical finding**: Performance degrades rapidly with problem complexity.

### Unsolvable Instance Detection (Table 3)

| Domain | True Negatives | False Negatives |
|--------|---------------|-----------------|
| Blocksworld | 27% | 0% |
| Randomized Mystery | 16% | 11.5% |

**Critical finding**: o1 cannot reliably detect unsolvable problems. It often "confidently confabulates nonsensical answers."

### Cost Comparison (Table 4)

| Model | Cost per 100 instances |
|-------|----------------------|
| GPT-4o | $0.65 |
| o1-preview | **$42.12** |
| Fast Downward | ~$0 |

Plus: Fast Downward averages 0.265 seconds per instance vs o1's 40-111 seconds.

---

## Methodology

### PlanBench Design
- 600 Blocksworld instances (3-5 blocks, 2-16 step plans)
- Mystery Blocksworld: same logic, obfuscated names
- Randomized Mystery: completely random string obfuscation
- Unsolvable instances: modified goals to be unsatisfiable

### What Makes o1 Different (Authors' Speculation)

> "o1 seems to have been trained to be an approximate reasoner... it may be an RL-trained system in the same vein as AlphaGo, but where the 'moves' being generated and evaluated are Chains of Thought."

Key differences from LLMs:
1. Additional RL pretraining phase
2. Adaptive inference-time compute (reasoning tokens)
3. Hidden reasoning traces (not accessible to users)

---

## Relationship to Thesis

### **STRONGLY SUPPORTS** Pattern Matching Hypothesis

Despite o1's impressive improvements, the evidence supports the thesis:

**1. Mystery Blocksworld Still Matters**

Even o1 drops from 97.8% → 52.8% → 37.3% when surface patterns are removed:
- Same logical structure
- Different surface form
- Performance drops ~60 percentage points

This is exactly what pattern matching predicts.

**2. Complexity Collapse Persists**

o1 drops from 97.8% → 23.63% on longer problems:
- Theory (Paper 152): Poly-CoT should handle any P problem
- Practice: Performance collapses at ~20 steps
- Gap = pattern matching, not algorithm execution

**3. Unsolvable Instance Failure**

o1 cannot reliably detect unsolvable problems (27% True Negative rate):
- A true reasoner would recognize logical impossibility
- o1 "confidently confabulates nonsensical answers"
- This is hallucination, not reasoning

**4. Cost/Guarantee Comparison**

| System | Accuracy | Cost | Guarantees |
|--------|----------|------|-----------|
| Fast Downward | 100% | ~$0 | Proven correct |
| o1-preview | 97.8%→23.6% | $42/100 | None |

Classical planners achieve perfect accuracy with guarantees. o1's improvement doesn't change the fundamental nature.

**5. The "Gaslighting" Phenomenon**

> "When the model gives an incorrect answer, it also sometimes provides a creative, but nonsensical, justification for its decision. It is almost as if o1 has gone from hallucinating to gaslighting!"

Examples:
- Claims goal was "true at some point" so should count
- Redefines "on(a,c)" as "a is somewhere above c"

This is post-hoc rationalization, not reasoning.

---

## REBUTTALS TO THIS PAPER

### What o1 Proponents Might Argue

1. **o1 is just preview**: Full model may perform better
2. **97.8% is impressive**: Much better than any LLM
3. **Obfuscation is unfair**: Real problems have meaningful names

### Authors' Response

1. **Performance not robust**: Degrades rapidly with complexity
2. **Still doesn't provide guarantees**: Classical planners achieve 100%
3. **Mystery BW tests true capability**: Surface patterns shouldn't matter for real reasoning
4. **Cost-prohibitive**: $42 per 100 instances vs ~$0 for classical planners

### The Key Point

> "Classical planners like Fast Downward achieve 100% on our dataset in a fraction of the time, compute, and cost, while providing guarantees that their answers are correct."

o1 is impressive for an LLM, but it's not a planner. It's a better pattern matcher.

---

## Key Quotes

> "While o1's performance is a quantum improvement on the benchmark, outpacing the competition, it is still far from saturating it."

> "Over time, LLMs have improved their performance on vanilla Blocksworld... However, their dismal performance on the obfuscated ('Mystery') versions of the same domain betrays their essentially approximate retrieval nature."

> "A general reasoning system cannot be deployed in safety critical and non-ergodic domains if it continues to confidently make incorrect plans."

> "When the model gives an incorrect answer, it also sometimes provides a creative, but nonsensical, justification for its decision. It is almost as if o1 has gone from hallucinating to gaslighting!"

> "The rich irony of researchers using tax payer provided research funds to pay private companies like OpenAI to evaluate their private commercial models is certainly not lost on us."

---

## Relationship to Other Papers

### Directly Extends
- **Paper 150**: Original Planning Abilities paper (same authors)
- **Paper 153 (PlanBench)**: Uses this benchmark
- **Paper 131**: "Can LLMs Reason and Plan?" (same author)

### Confirms
- **Paper 152 (Expressive Power)**: Theory says poly-CoT = P, practice shows collapse
- **Paper 3 (Illusion of Thinking)**: Complexity regimes, collapse at high complexity
- **Paper 6 (CoT Mirage)**: Distribution determines success

### Implications for Other Papers
- **Paper 151 (Original CoT)**: "Elicits reasoning" but doesn't achieve it
- **Paper 154 (Zero-shot CoT)**: "Let's think step by step" insufficient for planning
- **Paper 155 (Self-consistency)**: Voting won't help on fundamentally OOD tasks

---

## Implications for Thesis

### The o1 Question Answered

**Q**: Does o1's "reasoning" represent genuine capability?

**A**: No. The evidence shows:
1. Surface pattern dependence persists (Mystery BW collapse)
2. Complexity scaling fails (20+ steps → 23.6%)
3. No guarantees (confidently wrong on unsolvable)
4. Classical planners remain superior for actual planning

### The Nature of o1

o1 is best understood as:
- **Better approximate retrieval** (more inference compute)
- **Trained on reasoning patterns** (RL on CoT traces)
- **Still fundamentally pattern-based** (fails on OOD obfuscation)

NOT as:
- A general reasoner
- A planner
- A system with guarantees

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] **Rebuttals checked**
- [x] Paper graph updated

---

## Classification
- **Stance**: STRONGLY SUPPORTS thesis
- **Evidence Type**: Empirical (o1 evaluation on PlanBench)
- **Strength**: Very high — same benchmark as Papers 150/153, tests o1 directly
- **Key Contribution**: Shows even "reasoning models" fail on obfuscated/complex problems

## Tags
`o1` `lrm` `planning` `planbench` `kambhampati` `mystery-blocksworld` `strongly-supports` `2024`
