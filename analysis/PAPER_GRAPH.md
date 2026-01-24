# Paper Interaction Graph

## Overview
This document tracks how papers interact with each other — rebuttals, counter-rebuttals, extensions, and supporting evidence.

---

## Visual Graph

```
                              REBUTTALS & COUNTER-REBUTTALS
                              =============================

┌───────────────────────┐          rebuts           ┌───────────────────────┐
│  Limits of Innate     │ ─────────────────────────>│  Comment: Agentic Gap │
│  Planning (2511.21591)│                           │  (2506.18957)         │
└───────────────────────┘                           └───────────────────────┘
                                                              │
                                                              │ rebuts
                                                              v
                                                    ┌───────────────────────┐
                                                    │  Illusion of Thinking │
                                                    │  (2506.06941)         │
                                                    └───────────────────────┘
                                                              ^
                                                              │ rebuts
                                                              │
┌───────────────────────┐          rebuts           ┌────────┴──────────────┐
│  Thinking Isn't       │ ─────────────────────────>│                       │
│  Illusion (2507.17699)│                           │                       │
└───────────────────────┘                           └───────────────────────┘


                              SUPPORTS / CONFIRMS
                              ===================

┌───────────────────────┐         supports          ┌───────────────────────┐
│  Interplay Paper      │ ─────────────────────────>│  s1 (2501.19393)      │
│  (2512.07783)         │   (controlled evidence)   │  (surfacing hyp.)     │
└───────────────────────┘                           └───────────────────────┘
         │
         │ supports
         v
┌───────────────────────┐
│  DeepSeek-R1          │
│  (2501.12948)         │
└───────────────────────┘


┌───────────────────────┐         confirms          ┌───────────────────────┐
│  Reasoning Models     │ ─────────────────────────>│  Illusion of Thinking │
│  Until They Don't     │   (abrupt collapse)       │  (2506.06941)         │
│  (2510.22371)         │                           └───────────────────────┘
└───────────────────────┘
         │
         │ confirms
         v
┌───────────────────────┐
│  Faith and Fate       │
│  (2305.18654)         │
│  (propagation error)  │
└───────────────────────┘


                              EXTENDS / BUILDS ON
                              ===================

┌───────────────────────┐         extends           ┌───────────────────────┐
│  CoT In The Wild      │ ─────────────────────────>│  Measuring            │
│  (2503.08679)         │   (natural prompts)       │  Faithfulness         │
└───────────────────────┘                           │  (2307.13702)         │
                                                    └───────────────────────┘

┌───────────────────────┐         extends           ┌───────────────────────┐
│  Reasoning Models     │ ─────────────────────────>│  Measuring            │
│  Don't Say (2505.05410│   (reasoning models)      │  Faithfulness         │
└───────────────────────┘                           │  (2307.13702)         │
                                                    └───────────────────────┘
```

---

## Detailed Interactions

### Direct Rebuttals

| Paper A | --rebuts--> | Paper B | Evidence |
|---------|-------------|---------|----------|
| Limits of Innate Planning (2511.21591) | rebuts | Comment: Agentic Gap (2506.18957) | Move validator = 0% success; execution isn't the bottleneck |
| Limits of Innate Planning (2511.21591) | rebuts | Thinking Isn't Illusion (2507.17699) | Tool augmentation doesn't always work (8-puzzle) |
| Thinking Isn't Illusion (2507.17699) | rebuts | Illusion of Thinking (2506.06941) | Tool augmentation restores performance (Hanoi) |
| Comment: Agentic Gap (2506.18957) | rebuts | Illusion of Thinking (2506.06941) | Execution gap, not reasoning gap |
| **Illusion of Insight (2601.00514)** | **rebuts** | **DeepSeek-R1 (2501.12948)** | **"Aha!" moments are rare, don't improve with training, seldom help accuracy** |

### Counter-Rebuttals (Rebuttals of Rebuttals)

| Paper A | --counter-rebuts--> | Paper B's rebuttal of | Paper C |
|---------|---------------------|----------------------|---------|
| Limits of Innate Planning (2511.21591) | counter-rebuts | Comment: Agentic Gap's (2506.18957) rebuttal of | Illusion of Thinking (2506.06941) |

**Chain**: Illusion of Thinking → [rebutted by] Agentic Gap → [counter-rebutted by] Limits of Innate Planning

### Supports / Confirms

| Paper A | --supports--> | Paper B | How |
|---------|---------------|---------|-----|
| Interplay (2512.07783) | supports | s1 (2501.19393) | Controlled evidence for surfacing hypothesis |
| Interplay (2512.07783) | supports | DeepSeek-R1 (2501.12948) | RL surfaces, doesn't create |
| Reasoning Models (2510.22371) | confirms | Illusion of Thinking (2506.06941) | Same abrupt collapse pattern |
| Reasoning Models (2510.22371) | confirms | Faith and Fate (2305.18654) | Propagation error mechanism |
| CoT Mirage (2508.01191) | supports | Faith and Fate (2305.18654) | ID=100%, OOD=0% |
| GSM-Symbolic (2410.05229) | supports | Faith and Fate (2305.18654) | Distribution-dependent failure |
| **Illusion of Insight (2601.00514)** | **supports** | **Measuring Faithfulness (2307.13702)** | **Shifts are unfaithful — don't reflect actual improvement** |
| **Illusion of Insight (2601.00514)** | **supports** | **Reasoning Models Don't Say (2505.05410)** | **CoT doesn't reflect computation** |
| **LLMs Imitate Logical Reasoning (2509.12645)** | **supports** | **Faith and Fate (2305.18654)** | **Imitation = pattern matching** |
| **LLMs Imitate Logical Reasoning (2509.12645)** | **supports** | **Illusion of Thinking (2506.06941)** | **Not genuine reasoning** |
| **Frontier LLMs Still Struggle (2507.07313)** | **supports** | **Illusion of Thinking (2506.06941)** | **Same abrupt collapse; thinking models fail too** |
| **Frontier LLMs Still Struggle (2507.07313)** | **supports** | **Faith and Fate (2305.18654)** | **Error accumulation mechanism** |
| **Frontier LLMs Still Struggle (2507.07313)** | **supports** | **GSM-Symbolic (2410.05229)** | **Distribution-dependent failures** |
| **Frontier LLMs Still Struggle (2507.07313)** | **challenges** | **DeepSeek-R1 (2501.12948)** | **R1 at 0% character counting!** |
| **Illusions of Reflection (2510.18254)** | **supports** | **Illusion of Insight (2601.00514)** | **Reflection = fluent text, not correction** |
| **Illusions of Reflection (2510.18254)** | **supports** | **Measuring Faithfulness (2307.13702)** | **CoT text ≠ internal computation** |
| **Illusions of Reflection (2510.18254)** | **challenges** | **DeepSeek-R1 (2501.12948)** | **Reasoning models no better; may be WORSE** |
| **Illusions of Reflection (2510.18254)** | **challenges** | **s1 (2501.19393)** | **Test-time compute doesn't guarantee improvement** |
| **Illusion of Diminishing Returns (2509.09677)** | **supports** | **Illusion of Thinking (2506.06941)** | **Same collapse; execution failures** |
| **Illusion of Diminishing Returns (2509.09677)** | **extends** | **Faith and Fate (2305.18654)** | **Error accumulation mechanism** |
| **Illusion of Diminishing Returns (2509.09677)** | **partially supports** | **DeepSeek-R1 (2501.12948)** | **Thinking models fix self-conditioning** |
| **Illusion of Diminishing Returns (2509.09677)** | **reframes** | **Illusion of Thinking (2506.06941)** | **Execution failure, not reasoning inability** |
| **Beyond Memorization (2601.13392)** | **supports** | **Can LLM Graph Reasoning (2406.15992)** | **"Pattern regurgitators" — same finding (100% knowledge, fails on unseen)** |
| **Beyond Memorization (2601.13392)** | **supports** | **Faith and Fate (2305.18654)** | **Distribution-bounded failures; compositional failures** |
| **Beyond Memorization (2601.13392)** | **supports** | **CoT Mirage (2508.01191)** | **ID success (84-90%), OOD failure (20-59%)** |
| **Beyond Memorization (2601.13392)** | **supports** | **GSM-Symbolic (2410.05229)** | **Brittleness to variations; seen/unseen gap** |
| **Reasoning Model Superior Judge (2601.03630)** | **partially supports** | **DeepSeek-R1 (2501.12948)** | **LRMs better at judgment accuracy** |
| **Reasoning Model Superior Judge (2601.03630)** | **challenges** | **Illusions of Reflection (2510.18254)** | **LRMs better at instruction-following in evaluation** |
| **Reasoning Model Superior Judge (2601.03630)** | **supports (pattern matching)** | **Semantic Deception (2512.20812)** | **LRMs MORE susceptible to superficial features** |
| **No Free Lunch (2506.17219)** | **supports** | **Interplay (2512.07783)** | **RL requires pre-existing capability; RLIF eventually degrades** |
| **No Free Lunch (2506.17219)** | **supports** | **Illusion of Insight (2601.00514)** | **Internal signals (entropy) don't improve reasoning** |
| **No Free Lunch (2506.17219)** | **supports** | **Illusions of Reflection (2510.18254)** | **Self-correction without external feedback fails** |
| **No Free Lunch (2506.17219)** | **provides mechanism for** | **Faith and Fate (2305.18654)** | **Transitional word loss = exploration loss** |
| **Neuro-Symbolic AI (2508.13678)** | **supports** | **Faith and Fate (2305.18654)** | **"Errors propagate and amplify" — same mechanism** |
| **Neuro-Symbolic AI (2508.13678)** | **supports** | **LLMs Imitate Logical Reasoning (2509.12645)** | **"Replicate reasoning steps... cannot really reason"** |
| **Neuro-Symbolic AI (2508.13678)** | **provides framework for** | **Thinking Isn't Illusion (2507.17699)** | **Tool augmentation = symbolic assistance** |
| **Neuro-Symbolic AI (2508.13678)** | **provides framework for** | **Limits of Innate Planning (2511.21591)** | **Planning requires symbolic methods** |
| **Multilingual Latent Reasoners (2601.02996)** | **partially supports** | **CoT Without Prompting (2402.10200)** | **Latent reasoning exists in hidden states** |
| **Multilingual Latent Reasoners (2601.02996)** | **supports** | **Interplay (2512.07783)** | **English-centric = distribution-bounded** |
| **Multilingual Latent Reasoners (2601.02996)** | **supports** | **Illusion of Thinking (2506.06941)** | **Collapses on hard problems (LRS: 0.38→0.03)** |
| **Planning Generalization Gap (2601.14456)** | **supports** | **Faith and Fate (2305.18654)** | **ID/OOD gap (82.9%→0%); surface pattern matching** |
| **Planning Generalization Gap (2601.14456)** | **supports** | **Interplay (2512.07783)** | **RL doesn't improve OOD; only surfaces ID patterns** |
| **Planning Generalization Gap (2601.14456)** | **supports** | **Beyond Memorization (2601.13392)** | **Same pattern: high ID, zero OOD** |
| **Planning Generalization Gap (2601.14456)** | **supports** | **GSM-Symbolic (2410.05229)** | **Surface form sensitivity (11.5pp drop from anonymization)** |
| **Planning Generalization Gap (2601.14456)** | **extends** | **Valmeekam et al. (2022) "LLMs Can't Plan"** | **Adds controlled generalization tests** |
| **CoT Faithfulness Unlearning (2502.14829)** | **extends** | **Measuring Faithfulness (2307.13702)** | **Parametric (vs contextual) intervention for faithfulness** |
| **CoT Faithfulness Unlearning (2502.14829)** | **supports** | **Reasoning Models Don't Say (2505.05410)** | **CoT ≠ internal computation; faithfulness ≠ plausibility** |
| **CoT Faithfulness Unlearning (2502.14829)** | **challenges** | **Add-mistake baseline (Lanham et al.)** | **Contextual methods underestimate faithfulness** |

### Extends / Builds On

| Paper A | --extends--> | Paper B | How |
|---------|--------------|---------|-----|
| CoT In The Wild (2503.08679) | extends | Measuring Faithfulness (2307.13702) | Tests on natural prompts (not artificial) |
| Reasoning Models Don't Say (2505.05410) | extends | Measuring Faithfulness (2307.13702) | Tests reasoning models specifically |
| Correlation or Causation (2509.17380) | extends | Measuring Faithfulness (2307.13702) | Causal framework for CoT |

### Provides Mechanism For

| Paper A | --mechanism for--> | Paper B's finding |
|---------|-------------------|-------------------|
| Faith and Fate (2305.18654) | mechanism for | GSM-Symbolic's fragility |
| Faith and Fate (2305.18654) | mechanism for | Illusion of Thinking's collapse |
| Interplay (2512.07783) | mechanism for | s1's surfacing with 1K samples |

---

## Rebuttal Chains

### Chain 1: Tool Augmentation Debate
```
Illusion of Thinking (2506.06941)
    "LRMs fail at high complexity"
           │
           │ rebutted by
           v
Comment: Agentic Gap (2506.18957) + Thinking Isn't Illusion (2507.17699)
    "It's execution, not reasoning; tools fix it"
           │
           │ counter-rebutted by
           v
Limits of Innate Planning (2511.21591)
    "Tools don't always work (8-puzzle = 0%)"
```

**Resolution**: Tool augmentation is TASK-DEPENDENT. Works for Hanoi (algorithm provided), fails for 8-puzzle (planning required).

### Chain 2: Surfacing Hypothesis
```
s1 (2501.19393) + DeepSeek-R1 (2501.12948)
    "RL surfaces reasoning from base models"
           │
           │ observational evidence
           v
Interplay (2512.07783)
    "CONTROLLED proof: 0% exposure = fail; ≥1% = success"
```

**Resolution**: Surfacing hypothesis CONFIRMED with controlled experiments.

### Chain 3: Benchmark Validity
```
NLGraph (Wang et al.)
    "LRMs achieve 99% on graph reasoning"
           │
           │ challenged by
           v
Reasoning Models Until They Don't (2510.22371)
    "NLGraph has L < 2 (trivially easy)"
```

**Resolution**: Benchmark success is misleading; true complexity reveals limits.

---

## Papers Without Direct Rebuttals (Strong Evidence)

These papers have NO direct rebuttals found:

| Paper | Key Finding |
|-------|-------------|
| Faith and Fate (2305.18654) | Linearized subgraph matching; exponential error |
| CoT Mirage (2508.01191) | ID=100%, OOD=0% |
| Measuring Faithfulness (2307.13702) | CoT unfaithfulness; larger = less faithful |
| Semantic Deception (2512.20812) | Semantic override; reasoning models fail MORE |
| Reasoning Models Don't Say (2505.05410) | 25-40% faithfulness |
| **Frontier LLMs Still Struggle (2507.07313)** | **Unpuzzles: easier=worse; R1 0% char counting** |
| **Illusions of Reflection (2510.18254)** | **85% same-failure; reasoning models no advantage** |
| **Beyond Memorization (2601.13392)** | **100% knowledge + 30-64% drop on unseen; prompting doesn't help** |
| **Reasoning Model Superior Judge (2601.03630)** | **LRMs MORE susceptible to superficial bias (32pp drop); pattern matching metrics** |
| **No Free Lunch (2506.17219)** | **RLIF degrades reasoning (291→235 correct); format up, reasoning down** |
| **Neuro-Symbolic AI Survey (2508.13678)** | **"LLMs cannot really reason... statistical pattern recognition" (52 papers reviewed)** |
| **Multilingual Latent Reasoners (2601.02996)** | **"Real but fragile"; LRS collapses 0.38→0.03 on hard benchmarks; English-centric** |
| **Planning Generalization Gap (2601.14456)** | **82.9% ID → 0% OOD; 11.5pp drop from symbol anonymization; loops without goal progress** |

---

## Update Log

| Date | Update |
|------|--------|
| 2026-01-24 | Initial creation with 18 papers |
| 2026-01-24 | Added Frontier LLMs Still Struggle (2507.07313) |
| 2026-01-24 | Added Illusions of Reflection (2510.18254) |
| 2026-01-24 | Added Illusion of Diminishing Returns (2509.09677) |
| 2026-01-24 | Added Beyond Memorization (2601.13392) — 100% knowledge, fails on unseen |
| 2026-01-24 | Added Reasoning Model Superior Judge (2601.03630) — LRMs MORE biased on superficial features |
| 2026-01-24 | Added No Free Lunch (2506.17219) — RLIF degrades reasoning; format↑ reasoning↓ |
| 2026-01-24 | Added Neuro-Symbolic AI Survey (2508.13678) — "LLMs cannot really reason" |
| 2026-01-24 | Added Multilingual Latent Reasoners (2601.02996) — "Real but fragile" latent reasoning |
| 2026-01-24 | Added Planning Generalization Gap (2601.14456) — 82.9% ID → 0% OOD; strongest ID/OOD evidence |
| 2026-01-24 | Added CoT Faithfulness Unlearning (2502.14829) — EMNLP Outstanding; faithfulness ≠ plausibility (r=0.15) |
