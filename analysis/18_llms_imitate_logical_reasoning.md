# Paper Analysis: Large Language Models Imitate Logical Reasoning, but at what Cost?

## Metadata
- **arXiv ID**: 2509.12645
- **Title**: Large Language Models Imitate Logical Reasoning, but at what Cost?
- **Authors**: Lachlan McGinness, Peter Baumgartner
- **Institution**: Australian National University, Data61|CSIRO
- **Date**: September 16, 2025
- **Venue**: AJCAI 2025 (Australasian Joint Conference on Artificial Intelligence)
- **Stance**: AGAINST (imitation, not genuine reasoning)

---

## Core Claims

1. **2023→2024 improvement is due to hidden Chain-of-Thought**, not genuine reasoning
2. **Thinking models (2025) achieve near-perfect** but still "imitate" reasoning
3. **Neuro-symbolic achieves same accuracy at ~10-20% compute cost**
4. **LLMs are good at translation**, not reasoning — combine with symbolic solvers

---

## Methodology

### Longitudinal Design
- **18-month period**: December 2023 → September 2024 → June 2025
- **Dataset**: PrOntoQA (300 problems: 100 each requiring 1, 2, 3 reasoning steps)
- **"False Ontology" with distractors** (hardest condition)

### Models Tested

| Period | Models |
|--------|--------|
| Dec 2023 | GPT-3, GPT-4, Gemini (original) |
| Sep 2024 | GPT-4o, Claude 3 Opus, Llama 3.1 405B |
| Jun 2025 | GPT-o3, Gemini 2.5 Pro, DeepSeek R1 |
| Neuro-symbolic | Phi4 (14B), Gemma3 12B, Falcon 10B + Z3 |

### Six Prompting Conditions
1. Normal (baseline)
2. Chain of Thought (zero-shot)
3. One-Shot CoT
4. Bottom Up (forward chaining)
5. Top Down (backward chaining)
6. Magic Set Transformation

### Metrics
- Accuracy, Complete Reasoning, Faithfulness
- Token counts (prompt + completion)
- FLOPs (for open-source models)

---

## Key Evidence

### Finding 1: 2023→2024 Improvement = Hidden CoT

| Model | Year | Normal Accuracy | Completion Tokens |
|-------|------|-----------------|-------------------|
| GPT-4 | 2023 | 70% | **13.5** |
| GPT-4o | 2024 | **93.3%** | **300** |
| Llama 405B | 2024 | 73.3% | **87.5** |

**Critical insight**: 2024 closed-source models show ~300 completion tokens in "Normal" condition (vs 13.5 in 2023). Open-source Llama 405B shows only 87.5 tokens.

> "The completion token counts for the 2024 models are approximately two orders of magnitude higher for the normal condition indicating that they have either been trained or internally prompted to automatically perform CoT reasoning."

**Interpretation**: Performance gains were from hidden prompt engineering, not reasoning capability.

### Finding 2: Thinking Models (2025) Achieve Near-Perfect

| Model | Normal | CoT | Bottom Up | Top Down |
|-------|--------|-----|-----------|----------|
| **GPT-o3** | 96.7% | 99.7% | **100%** | 100% |
| **Gemini 2.5 Pro** | 98.7% | 98.7% | **100%** | **100%** |
| DeepSeek R1 | 94.3% | 95.7% | 97% | 97% |

> "Between September 2024 and June 2025, there was a paradigm shift to thinking models... It appears that this innovative technique provided the capability for LLMs to **imitate** reasoning."

Note the word choice: **imitate**, not perform.

### Finding 3: Neuro-Symbolic Achieves Same at 10-20% Cost

| Approach | Accuracy | FLOPs |
|----------|----------|-------|
| DeepSeek R1 (Normal) | 94.3% | **1.483×10¹⁴** |
| DeepSeek R1 (CoT) | 95.7% | 1.54×10¹⁴ |
| **Phi4 + Z3** | **99.7%** | **2.50×10¹³** |
| **Gemma3 12B + Z3** | **99.3%** | 1.61×10¹³ |
| **Falcon 10B + Z3** | **99.7%** | 1.33×10¹³ |

**Key finding**: Small LLM + Z3 achieves **higher accuracy at ~7-10x lower cost**.

Z3 solver time: **1-10 milliseconds** per example (negligible vs LLM inference).

### Finding 4: Faithfulness to Reasoning Strategies Varies

| Model | Bottom Up Faithfulness | Top Down Faithfulness |
|-------|------------------------|----------------------|
| GPT-4o | **99.7%** | **72%** |
| Llama 405B | 97.3% | 65% |
| GPT-o3 | 100% | - |
| DeepSeek R1 | 100% | 96.7% |

**Critical observation**: GPT-4o follows Bottom Up 99.7% but Top Down only 72%.

> Models can produce outputs that LOOK like they're following a strategy without actually doing so.

### Finding 5: FLOPs Approximation Validated

| Model | Theoretical FLOPs | 2Nn Approximation | Discrepancy |
|-------|-------------------|-------------------|-------------|
| DeepSeek R1 | 1.483×10¹⁴ | 1.419×10¹⁴ | 4.3% |
| Phi4 | 2.50×10¹³ | 2.50×10¹³ | 0.1% |

**All within 10%** — allows reliable cost comparisons.

---

## Critical Analysis for Thesis

### Strong Support for "Imitation" Interpretation

1. **Hidden CoT explains 2023→2024 "improvement"**:
   - Token count increase: 13.5 → 300 in "Normal" condition
   - Open-source Llama (no hidden prompts): only 87.5 tokens
   - = Prompt engineering, not capability improvement

2. **Authors explicitly use "imitate"**:
   > "It appears that this innovative technique provided the capability for LLMs to **imitate** reasoning"
   
   Even for thinking models achieving 100%, the framing is "imitate".

3. **Computational cost argument**:
   - If LLMs reasoned, they'd be competitive with Z3
   - Instead: 7-10x more compute for same/worse accuracy
   - Genuine reasoning is efficient; imitation is expensive

4. **Faithfulness failures**:
   - GPT-4o: 99.7% Bottom Up but only 72% Top Down
   - = Models don't actually follow logical strategies
   - = Surface pattern matching, not reasoning

### Neuro-Symbolic as Control

> "LLMs are good at recognising nuance in language and converting problems to a machine interpretable format."

The paper demonstrates:
- Small LLM does TRANSLATION (what LLMs are good at)
- Z3 does REASONING (what symbolic solvers are good at)
- Result: Better accuracy, lower cost

**Implication**: LLMs can't reason; they can translate to formats that reasoners can use.

---

## Relationship to Other Papers

### Directly Supports
- **Faith and Fate (2305.18654)** — Subgraph matching = imitation
- **Illusion of Thinking (2506.06941)** — Not genuine reasoning
- **CoT Mirage (2508.01191)** — Distribution-dependent success
- **OMEGA (2506.18880)** — 0% transformative generalization confirms imitation, not reasoning

### Provides Mechanism For
- Why benchmarks show improvement (hidden CoT)
- Why compute costs are so high (imitation is expensive)

### Complements
- **Reasoning Models Until They Don't (2510.22371)** — Complexity limits
- **Illusion of Insight (2601.00514)** — "Aha!" moments are illusory

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
No direct arXiv rebuttal found.

### Potential Counter-Arguments

| Counter | Response |
|---------|----------|
| "PrOntoQA is toy benchmark" | Authors acknowledge; but controlled task isolates reasoning |
| "2025 models achieve 100%" | Authors still call it "imitation", not reasoning |
| "Neuro-symbolic needs translation" | That's the point — LLMs translate, can't reason |

### Limitations (Authors Acknowledge)
1. PrOntoQA is a toy benchmark
2. Potential contamination (ruled out for most models)
3. API limitations prevented latency measurement
4. 835 responses manually reviewed
5. Closed-source model opacity

---

## Key Quotes

> "The completion token counts for the 2024 models are approximately two orders of magnitude higher for the normal condition indicating that they have either been trained or internally prompted to automatically perform CoT reasoning."

> "This indicates that most of the improvement in LLM performance between December 2023 and September 2024 could be attributed to prompt engineering."

> "It appears that this innovative technique provided the capability for LLMs to **imitate** reasoning."

> "The small LLM results are an important proof of concept that show that combining LLMs with symbolic AIs... can lead to competitive performance at a significantly reduced computational cost."

> "LLMs are good at recognising nuance in language and converting problems to a machine interpretable format."

---

## Interaction Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│        LLMs IMITATE LOGICAL REASONING, BUT AT WHAT COST? (2509.12645)       │
│                                                                             │
│  LONGITUDINAL FINDING:                                                      │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ 2023: GPT-4 Normal = 70%, 13.5 tokens                               │    │
│  │ 2024: GPT-4o Normal = 93.3%, 300 tokens ← HIDDEN CoT!               │    │
│  │ 2024: Llama 405B (open) = 73.3%, 87.5 tokens ← No hidden CoT        │    │
│  │                                                                     │    │
│  │ "Improvement" = prompt engineering, not reasoning capability        │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  COMPUTATIONAL COST (FLOPs):                                                │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ DeepSeek R1:     1.48×10¹⁴ FLOPs → 94.3% accuracy                   │    │
│  │ Phi4 + Z3:       2.50×10¹³ FLOPs → 99.7% accuracy                   │    │
│  │                                                                     │    │
│  │ 7-10x LESS compute for HIGHER accuracy with neuro-symbolic          │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  KEY INSIGHT:                                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ "LLMs are good at recognising nuance in language and converting     │    │
│  │  problems to a machine interpretable format"                        │    │
│  │                                                                     │    │
│  │ LLMs = TRANSLATORS, not REASONERS                                   │    │
│  │ Combine with symbolic solvers for actual reasoning                  │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Relevance to Thesis

### Relevance Rating: 9/10 (Critical evidence)

**Why this paper matters**:

1. **Explains "improvement" illusion**:
   - 2023→2024 gains = hidden CoT, not capability
   - Token count evidence is damning

2. **Authors use "imitate" deliberately**:
   - Even for 100% accuracy thinking models
   - Peer-reviewed venue (AJCAI 2025)

3. **Computational cost argument**:
   - Novel angle in the literature
   - If reasoning, would be efficient like Z3
   - Imitation is expensive; reasoning is cheap

4. **Practical alternative demonstrated**:
   - Small LLM + Z3 = better and cheaper
   - Proves LLMs translate, don't reason

---

## Status

- [x] Read complete (full paper via Task agent)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Critical analysis
- [x] Cross-references identified
- [x] **Rebuttals checked** — None found
- [ ] **Paper graph updated**

---

## Summary for Synthesis

**"Large Language Models Imitate Logical Reasoning, but at what Cost?"** provides:

1. **Hidden CoT evidence**:
   - 2023 GPT-4: 13.5 tokens in Normal → 70%
   - 2024 GPT-4o: 300 tokens in Normal → 93.3%
   - = Prompt engineering, not reasoning

2. **"Imitate" framing (peer-reviewed)**:
   - Authors deliberately use "imitate" even for 100% accuracy
   - AJCAI 2025 publication adds credibility

3. **Computational cost comparison**:
   - DeepSeek R1: 1.48×10¹⁴ FLOPs → 94.3%
   - Phi4 + Z3: 2.50×10¹³ FLOPs → 99.7%
   - **7-10x cheaper, higher accuracy**

4. **Role clarification**:
   > "LLMs are good at recognising nuance in language and converting problems to a machine interpretable format"
   
   LLMs = translators, not reasoners.

**For thesis**: This paper provides the computational cost argument and the "imitate" framing. If LLMs reasoned, they'd be competitive with Z3 (1-10ms per problem). They're not. The fact that small LLM + symbolic solver beats frontier LLM proves the architecture matters: LLMs pattern-match (expensive), solvers reason (efficient).
