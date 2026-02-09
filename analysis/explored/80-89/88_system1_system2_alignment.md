# Paper Analysis: Reasoning on a Spectrum - System 1 and System 2 Alignment

## Metadata
- **arXiv ID**: 2502.12470
- **Title**: Reasoning on a Spectrum: Aligning LLMs to System 1 and System 2 Thinking
- **Authors**: Alireza S. Ziabari, Nona Ghazizadeh, Zhivar Sourati, Farzan Karimi-Malekabadi, Payam Piray, Morteza Dehghani
- **Date**: February 2025
- **Venue**: Preprint (University of Southern California)
- **Source**: Reddit recommendation (GitHub issue #16)

---

## Core Claims

1. **Uniform reasoning style is NOT optimal** — System 2 (deliberative) excels at arithmetic/symbolic reasoning, while System 1 (intuitive) performs better on commonsense reasoning
2. **LLMs can be explicitly aligned to either reasoning style** — Using curated datasets with dual responses, preference optimization aligns models to distinct cognitive modes
3. **Accuracy-efficiency trade-off mirrors human cognition** — S2 is more accurate but token-heavy; S1 is faster but makes systematic errors in formal domains
4. **System 1 models are more confident; System 2 models express more uncertainty** — Mechanistic analysis shows S1 uses higher log-probabilities and fewer hedge words
5. **Entropy-based arbitration achieves best of both** — Training-free dynamic selection based on output entropy outperforms either system alone

---

## Methodology

### Dataset Construction (2,000 questions)
- Expert cognitive scientists created seed examples for 10 well-known cognitive heuristics (Kahneman, 2011)
- GPT-4o expanded to 2,000 questions, each with BOTH S1 (heuristic) and S2 (deliberative) responses
- **Critical**: Length-matched responses to prevent length bias (82.19 vs 83.93 tokens after adjustment)
- ~20% manually revised by domain experts

### Alignment Method
- DPO and SimPO for preference optimization
- For S1: intuitive response = winner, analytical = loser
- For S2: analytical response = winner, intuitive = loser
- Interpolation experiments: 0%, 14%, 29%, 43%, 57%, 71%, 86%, 100% S2 ratio

### Models Tested
- Llama-3-8B-Instruct (primary)
- Mistral-7B-Instruct-v0.1

### Benchmarks (13 total)
- **Arithmetic (6)**: MultiArith, GSM8K, AddSub, AQuA, SingleEq, SVAMP
- **Commonsense (5)**: CSQA, StrategyQA, PIQA, SIQA, COM2SENSE
- **Symbolic (2)**: Coin Flip, Last Letter Concatenation

---

## Key Evidence

### System 2 Superior on Arithmetic/Symbolic

| Benchmark | S1 (DPO) | S2 (DPO) | Baseline | Gap |
|-----------|----------|----------|----------|-----|
| AddSub | 80.76 (-1.71) | **89.87 (+7.4)** | 82.47 | **+9.11pp** |
| SingleEq | 77.24 (-13.48) | **94.37 (+3.65)** | 90.72 | **+17.13pp** |
| GSM8K | 77.01 (-1.48) | **79.37 (+0.88)** | 78.49 | +2.36pp |
| SVAMP | 78 (-2.5) | **85.4 (+4.9)** | 80.5 | +7.4pp |

### System 1 Superior on Commonsense

| Benchmark | S1 (DPO) | S2 (DPO) | Baseline | Gap |
|-----------|----------|----------|----------|-----|
| CSQA | **72.81 (+1.39)** | 71.42 (0) | 71.42 | +1.39pp |
| StrategyQA | **68.21 (+0.66)** | 60.87 (-6.68) | 67.55 | +7.34pp |
| PIQA | **83.94 (+0.78)** | 81.15 (-2.01) | 83.16 | +2.79pp |
| SIQA | **72.16 (+1.04)** | 67.93 (-3.19) | 71.12 | +4.23pp |
| COM2SENSE | **79.99 (+0.97)** | 76.42 (-2.6) | 79.02 | +3.57pp |

### Length Differences
- S2 models generate **significantly longer** responses in Stage 2 (finalization)
- DPO: t(8836) = 57.14, p < .001
- SimPO: t(8586) = 9.833, p < .001
- This emerges despite training on length-matched data

### Uncertainty Analysis
- **Token-level uncertainty**: S2 consistently lower confidence (higher entropy)
  - Arithmetic: t(4075) = 54.53, p < .001
  - Symbolic: t(999) = 42.53, p < .001  
  - Commonsense: t(3510) = 106.86, p < .001
- **Hedge word ratio**: S2 uses significantly more hedge words
- **Definitive responses**: S1 provides more definitive answers earlier (McNemar's χ²(1,400) = 20.0, p < .001)

### Interpolation Results (S1 → S2 Spectrum)
- **Monotonic transition** in accuracy as S2 ratio increases
- Arithmetic: accuracy increases monotonically with S2%
- Commonsense: accuracy DECREASES monotonically with S2%
- This confirms the trade-off is not just endpoint differences but a true spectrum

### Dynamic Entropy-Based Selection
- Training-free method: select between S1/S2 based on entropy of outputs
- Reliability score: R = w × Ĥ + (1-w) × σ²
- **Outperforms both pure S1 and pure S2 on nearly all benchmarks**
- 87.5% selection accuracy (matches oracle on which system would succeed)

---

## Relationship to Thesis

### Supports the Thesis (Partially)

**The thesis**: "LLM reasoning is practical but fundamentally predictive—pattern matching from training distributions, not genuinely generative reasoning"

1. **Task-specific pattern matching** — S1 and S2 represent different pattern matching modes; neither is "genuine reasoning" but rather different retrieval strategies
2. **S1 excels where heuristics work** — Commonsense tasks have patterns from human intuitive reasoning in training data
3. **S2 excels where step-by-step templates exist** — Arithmetic/symbolic tasks have explicit reasoning chains in training data

### Provides Nuance

1. **Not all reasoning is equal** — Different tasks need different "reasoning" (really: retrieval) strategies
2. **Confidence ≠ correctness** — S1 is more confident but wrong on formal tasks; S2 is uncertain but more accurate
3. **Longer chains not always better** — S2's verbosity can hurt commonsense tasks ("overthinking")

### Challenges the Thesis (Slightly)

The entropy-based arbitration suggesting models can "know" which reasoning style to use implies some meta-cognitive capability. However, this is likely also pattern matching on surface features (entropy patterns correlate with task types seen in training).

---

## Relationship to Other Papers

### Supports

| Paper | How |
|-------|-----|
| **o3 Thinks Harder (2502.15631)** | Both show longer reasoning chains don't always help; overthinking harms some tasks |
| **Illusion of Thinking (2506.06941)** | Both identify "overthinking" as problematic for certain task types |
| **Effective Without Thinking (2504.09858)** | Both show explicit reasoning is sometimes suboptimal |
| **Interplay (2512.07783)** | Both suggest capabilities come from training distribution, not emergent reasoning |

### Extends

| Paper | How |
|-------|-----|
| **Overthinking papers (2412.21187, 2501.18585)** | Provides mechanistic explanation via dual-process framework |
| **CoT prompting literature** | Challenges assumption that CoT is universally superior |

### Provides Framework For

| Concept | How |
|---------|-----|
| **Pattern matching thesis** | S1 = fast pattern retrieval; S2 = sequential pattern composition |
| **Task-capability matching** | Different tasks need different retrieval strategies |

### Partially Challenges

| Paper | How |
|-------|-----|
| **Survey of Test-Time Compute (2501.02497)** | Questions whether more compute is always beneficial |
| **DeepSeek-R1 (2501.12948)** | Questions whether extended reasoning traces are universally good |

---

## REBUTTALS TO THIS PAPER

### Potential Limitations

1. **Single model family** — Primarily Llama-3-8B; may not generalize to larger models or different architectures
2. **Synthetic dataset** — GPT-4o generated S1/S2 responses may not capture true human dual-process distinction
3. **Length control may not be perfect** — Some systematic differences may remain despite length matching
4. **Selection of heuristics** — Only 10 cognitive heuristics from Kahneman; may not cover all S1 behaviors
5. **Benchmark selection** — Specific benchmarks may favor certain reasoning styles

### Author Acknowledgments (from Limitations section)

- "Our experiments are limited to English and may not directly generalize to multilingual settings"
- "Evaluated on two base models (Llama-3-8B and Mistral-7B); larger models may already exhibit dual-process-like behaviors"
- "Our curated dataset, though grounded in cognitive science, is relatively small (2,000 examples)"
- "Entropy-based arbitration assumes uncertainty signals are reliable"

### Papers That Could Challenge This

1. **DeepSeek-R1 (2501.12948)** — Claims extended reasoning benefits across tasks
   - **Resolution**: R1 may have learned task-adaptive reasoning internally

2. **Physics of LLMs 2.1 (2407.20311)** — Shows CoT helps even simple tasks
   - **Resolution**: Different task domains may have different optimal strategies

---

## Key Quotes

> "This difference between human cognitive flexibility and LLMs' reliance on a single reasoning style raises a critical question: while human fast heuristic reasoning evolved for its efficiency and adaptability, is a uniform reasoning approach truly optimal for LLMs?"

> "Our results reveal an accuracy-efficiency trade-off: System 2-aligned models excel in arithmetic and symbolic reasoning, while System 1-aligned models perform better in commonsense reasoning tasks."

> "𝒮2 models consistently generate tokens with lower confidence than 𝒮1 models, based on token-level uncertainty from logits."

> "This work challenges the assumption that step-by-step reasoning is always optimal and highlights the need for adapting reasoning strategies based on task demands."

> "While 𝒮2 reasoning is correct, its more deliberate nature can often lead to overthinking, producing overly cautious or extensively interpretive responses that diverge from typical human reactions in rapid, intuitive situations."

> "Extended reasoning is not universally beneficial, and reasoning strategies must be evaluated in relation to the task."

---

## Assessment

### Independent Assessment

This paper provides **strong evidence** for task-dependent reasoning effectiveness:

1. **Controlled experimental design** — Length-matched data, multiple alignment methods, interpolation experiments
2. **Clear mechanistic findings** — Entropy, hedge words, and response patterns distinguish S1/S2
3. **Practical implications** — Entropy-based selection works without additional training

The dual-process framing is compelling, though the underlying mechanism is still pattern matching from different training distributions (heuristic patterns vs. explicit reasoning chains).

### Stance Classification: **BALANCED**

The paper is balanced because:
- Supports thesis: Both S1 and S2 are forms of pattern matching, not genuine reasoning
- Provides nuance: Different tasks benefit from different retrieval strategies
- Challenges naive assumptions: Longer reasoning is not always better

### Implications for the Thesis

1. **"Reasoning" is heterogeneous** — What we call reasoning is actually multiple retrieval/matching strategies
2. **Task-pattern alignment matters** — Performance depends on match between task structure and training patterns
3. **Meta-cognitive selection possible** — Models can learn when to use which strategy (but this is also pattern matching)

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [x] Paper graph updated
- [x] nodes.js updated
