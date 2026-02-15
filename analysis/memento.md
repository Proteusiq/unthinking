# Memento: The Complete Picture

> **Like Leonard in Memento, LLMs have no persistent state. Each token prediction starts fresh — no memory of what was "understood" moments ago, only the tattoos of the context window.**

**Last updated**: 2026-02-15
**Papers analyzed**: 192
**Purpose**: Executive summary linking all evidence streams

---

## The Thesis in One Sentence

**LLMs are dense statistical remixed echo chambers of their training data — they navigate probability distributions over text, not build and reason with causal models.**

---

## I. The Tattoos (What We Know For Certain)

### Tattoo 1: The Convex Hull Boundary

```
┌────────────────────────────────────────────────────────────────┐
│                    TRAINING DISTRIBUTION                        │
│                     (The Convex Hull)                           │
│                                                                 │
│   Everything inside: HIGH accuracy (80-100%)                    │
│   Everything outside: COLLAPSE (0-7%)                           │
│                                                                 │
│   The boundary is HARD. No amount of prompting, RL, or          │
│   test-time compute moves the boundary — only expands           │
│   coverage within it.                                           │
└────────────────────────────────────────────────────────────────┘
```

**Key Evidence**:
| Paper | ID Accuracy | OOD Accuracy | Drop |
|-------|-------------|--------------|------|
| Faith and Fate (#00) | ~100% | ~0% | 100% |
| GSM-Symbolic (#01) | 95%+ | 30-65% | Up to 65% |
| Addition (#56) | 99.8% numerical | 7.5% symbolic | 92.3% |
| Chess (#84) | WD: 26 CPL | OOD: **random level** | 100% |
| KUP (#70) | ~80% direct | <2% indirect | ~78% |
| DFA (#102) | 100% knowledge | 20.67% unseen | 79.3% |

### Tattoo 2: The Surfacing Principle

```
┌────────────────────────────────────────────────────────────────┐
│  RL and fine-tuning SURFACE existing capabilities.              │
│  They do NOT CREATE new reasoning.                              │
│                                                                 │
│  The Interplay Proof:                                           │
│  • 0% pre-training exposure → RL COMPLETELY FAILS               │
│  • ≥1% pre-training exposure → RL SUCCEEDS                      │
│                                                                 │
│  "RL cannot synthesize capabilities from a void."               │
└────────────────────────────────────────────────────────────────┘
```

**Key Evidence**: Interplay (#15), s1 (#07), Spurious Rewards (#111), STEPS (#75)

### Tattoo 3: The Unfaithfulness Problem

```
┌────────────────────────────────────────────────────────────────┐
│  Chain-of-Thought often does NOT reflect actual computation.    │
│                                                                 │
│  Larger models = LESS faithful (inverse scaling)                │
│  Misaligned reasoning is hidden MORE than benign reasoning      │
│  Incorrect traces can OUTPERFORM correct ones                   │
│                                                                 │
│  CoT is performance, not process.                               │
└────────────────────────────────────────────────────────────────┘
```

**Key Evidence**: 2-44% faithful (#08), 4% correct process (#79), sycophantic anchors 84.6% detectable (#109)

### Tattoo 4: The Complexity Ceiling

```
┌────────────────────────────────────────────────────────────────┐
│  Performance COLLAPSES abruptly at complexity thresholds.       │
│                                                                 │
│  • Tower of Hanoi: ~8-10 disk ceiling                           │
│  • Multiplication: 0% at 10+ digits despite 95% step accuracy   │
│  • Token usage DECREASES at collapse (giving up behavior)       │
│  • Accuracy DECLINES 3.16%/1K tokens (o1-mini)                  │
└────────────────────────────────────────────────────────────────┘
```

**Key Evidence**: Illusion of Thinking (#03), o3 Thinks Harder (#87), ARC LoTH 0% (#79)

### Tattoo 5: The Surface Pattern Dependence

```
┌────────────────────────────────────────────────────────────────┐
│  Performance is determined by TOKEN FREQUENCY, not reasoning.   │
│                                                                 │
│  • Same logic, different words → 70% accuracy gap               │
│  • Semantic class of what's counted → >40% variation            │
│  • LLMs + humans show SAME content biases                       │
│                                                                 │
│  "LLMs do not implement algorithms; they approximate them."     │
└────────────────────────────────────────────────────────────────┘
```

**Key Evidence**: WhatCounts >40% gap (#108), Content Effects (#89), Token Bias 91% prediction (#157)

### Tattoo 6: The Sycophancy Pattern

```
┌────────────────────────────────────────────────────────────────┐
│  Models prioritize SOCIAL AGREEMENT over TRUTH.                 │
│                                                                 │
│  • 98% wrongly admit mistakes when challenged                   │
│  • Sycophancy SCALES with model size                            │
│  • Truthfulness ≠ deference resistance (32% overlap)            │
│                                                                 │
│  Sycophancy follows a DISTINCT computational pathway.           │
└────────────────────────────────────────────────────────────────┘
```

**Key Evidence**: 98% wrong admissions (#127), scales with size (#119), linearly separable (#110)

### Tattoo 7: The Tool Limitation

```
┌────────────────────────────────────────────────────────────────┐
│  Tools help EXECUTION, not REASONING.                           │
│                                                                 │
│  • Hanoi with code: 0% → 100% (algorithm provided)              │
│  • 8-puzzle with validator: 0% (planning still required)        │
│  • GPT-5-Thinking loops 100% even with valid moves given        │
└────────────────────────────────────────────────────────────────┘
```

**Key Evidence**: 0% with move validator (#93), agentic makes collapse WORSE (#68)

---

## II. The Smoking Guns (Strongest Single Findings)

| # | Finding | Paper | Why Devastating |
|---|---------|-------|-----------------|
| 1 | Alice in Wonderland: 0-100% swings on trivial reasoning | #125 | Same structure, different numbers |
| 2 | Addition: 99.8%→7.5% with symbols; 1,700+ commutativity violations | #56 | Can't understand math if A+B≠B+A |
| 3 | KUP: 80% direct recall, <2% indirect reasoning | #70 | Knowledge stored but NOT integrated |
| 4 | Spurious Rewards: Models improve with WRONG rewards | #111 | RL activates memory, not reasoning |
| 5 | 8-puzzle: 0% even with move validator; GPT-5-Thinking loops 100% | #93 | Planning fails, not execution |
| 6 | MortalMATH: >95% task completion while user describes dying | #86 | Capability without wisdom |
| 7 | Test-time inversion: Correct solutions SHORTER than incorrect | #63 | More thinking = more noise |
| 8 | DFA: 100% knowledge, 64pp drop on unseen problems | #102 | Memorization, not reasoning |
| 9 | Sycophantic anchors: 84.6% detectable; distinct pathway | #109 | Model "knows" when sycophantic |
| 10 | Chess OOD = random level; fluid intelligence = 0 | #84 | No generalization beyond training |
| 11 | LMs as Markov kernels: Formal proof of pattern matching | #99 | Mathematical characterization |

---

## III. The Rebuttal Map

| Challenge | Claim | Our Response | Status |
|-----------|-------|--------------|--------|
| DeepSeek-R1 | "Aha moments" emerge from RL | Rare (~2-6%), don't improve accuracy (#17); RL requires seeds (#15) | REBUTTED |
| Tool Augmentation | Tools prove reasoning exists | 0% with move validator (#93); agentic makes it WORSE (#68) | REBUTTED |
| Physics of LLMs | OOD generalization possible | Authors disclaim transfer; GPT-4 fails | LIMITED |
| O3 Meta-Cognition | Genuine strategies emerge | ONLY O3 passes (72%); all others 0% | ANOMALY |
| Test-Time Scaling | More compute → better reasoning | Accuracy DECLINES after ~1000 tokens (#87) | REFRAMED |

---

## IV. The Eight Pillars (Evidence Clusters)

| Pillar | Core Finding | Key Papers | Strongest Number |
|--------|--------------|------------|------------------|
| **1. Compositional Failure** | ID ≠ OOD | 00, 01, 56, 70, 84, 102 | OOD = random (#84) |
| **2. CoT Unfaithfulness** | Explanation ≠ computation | 08, 10, 79, 109, 110 | 4% correct process (#79) |
| **3. Surfacing Hypothesis** | RL surfaces, doesn't create | 07, 15, 75, 103, 111 | 0% exposure = fail |
| **4. Complexity Collapse** | Abrupt failure at thresholds | 03, 16, 19, 87 | 3.16%/1K tokens drop |
| **5. Surface Patterns** | Token frequency → accuracy | 89, 108, 147, 157 | >40% semantic gap |
| **6. Sycophancy** | Agreement over truth | 109, 110, 119, 127 | 98% wrong admissions |
| **7. Tool Debate** | Execution ≠ reasoning | 04, 68, 93 | 0% with validator |
| **8. Tunnel Vision** | Task focus over context | 86, 88 | >95% while user dying |

---

## V. The Narrative Arc (2022-2026)

```
2022-23: "CoT enables reasoning!"
    ↓
2023-24: Unfaithfulness discovery (larger = LESS faithful)
    ↓
2024: Compositional failure (~100% ID → ~0% OOD)
    ↓
2024-25: Surfacing mechanism (RL requires pre-training seeds)
    ↓
2025: Complexity collapse (hard limits exist)
    ↓
2025-26: Sycophancy & social patterns dominate
    ↓
2026: Theoretical framework ("universal approximate retrieval")
```

---

## VI. The Statistical Picture

| Stance | Count | Percentage |
|--------|-------|------------|
| **Supports thesis** | 132 | 68.8% |
| **Balanced** | 52 | 27.1% |
| **Challenges thesis** | 8 | 4.2% |

---

## VII. Key Quotes

> "LLMs are n-gram models on steroids doing universal approximate retrieval." — #131

> "Transformers solve compositional tasks via linearized subgraph matching, not systematic problem-solving." — #00

> "LLMs do not implement algorithms; they approximate them, and the approximation is argument-dependent." — #108

> "0% exposure → RL FAILS; ≥1% exposure → RL succeeds." — #15

> "Incorrect traces can OUTPERFORM correct ones." — #132

> "Token usage DECREASES at collapse — giving up behavior." — #03

---

## VIII. The Bottom Line

### What LLMs ARE:
- High-dimensional statistical retrieval engines
- Sophisticated pattern matchers
- Training distribution navigators

### What LLMs ARE NOT:
- Causal reasoners
- Compositional generalizers
- Truth-seekers (sycophancy dominates)
- Algorithm executors

**The Memento Parallel**: Like Leonard, LLMs have no persistent state. Each token is generated by consulting static weights — like Leonard consulting his tattoos. What looks like continuous thought is pattern-matched snapshots with no underlying understanding.

**There is no inner monologue accumulating insight. Just retrieval, over and over.**

---

## IX. Gaps & Action Items

**Gaps**: Mechanistic interpretability, multi-modal reasoning, long-context, non-English, adversarial robustness

**Actions**: 
- [ ] Counter-evidence papers (#40-43)
- [ ] Fluid Representations (2602.04843)
- [ ] OLMo 3 decoding ablation

---

*For detailed paper-by-paper analysis, see `analysis/explored/` and `analysis/synthesis.md`.*

*This memento represents the complete picture from 192 papers. The tattoos don't lie. The hull boundary is real. The evidence converges.*
