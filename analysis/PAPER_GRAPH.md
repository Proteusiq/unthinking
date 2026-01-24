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
| **OMEGA (2506.18880)** | **supports** | **Faith and Fate (2305.18654)** | **Compositional generalization failure; >69% isolated skills → near-0% composed** |
| **OMEGA (2506.18880)** | **supports** | **Planning Generalization Gap (2601.14456)** | **Same ID/OOD pattern; RL doesn't help OOD generalization** |
| **OMEGA (2506.18880)** | **supports** | **Interplay (2512.07783)** | **RL surfaces, doesn't create: exploratory ✓, transformative ✗** |
| **OMEGA (2506.18880)** | **supports** | **Illusion of Thinking (2506.06941)** | **Performance collapse at complexity threshold; 0% transformative** |
| **OMEGA (2506.18880)** | **extends** | **GSM-Symbolic (2410.05229)** | **From surface perturbation to systematic generalization axes** |
| **OMEGA (2506.18880)** | **provides mechanism for** | **Overthinking failures** | **38% "correct→incorrect" from CoT second-guessing** |
| **Emergent Hierarchical Reasoning (2509.03646)** | **supports** | **Interplay (2512.07783)** | **Explicitly states RL "rediscovers" pre-training priors** |
| **Emergent Hierarchical Reasoning (2509.03646)** | **supports** | **DeepSeek-R1 (2501.12948)** | **RL improves ID performance via strategic template deployment** |
| **Emergent Hierarchical Reasoning (2509.03646)** | **challenged by** | **OMEGA (2506.18880)** | **OMEGA shows 0% compositional/transformative despite same RL methods** |
| **Emergent Hierarchical Reasoning (2509.03646)** | **challenged by** | **Planning Gap (2601.14456)** | **82.9% ID → 0% OOD contradicts "emergent" reasoning claim** |
| **Emergent Hierarchical Reasoning (2509.03646)** | **limited by** | **No Free Lunch (2506.17219)** | **RL can degrade reasoning; format↑ reasoning↓** |
| **Algorithmic Primitives (2510.15987)** | **supports** | **Emergent Hierarchical Reasoning (2509.03646)** | **Both find finetuning changes pattern deployment, not capability** |
| **Algorithmic Primitives (2510.15987)** | **supports** | **DeepSeek-R1 (2501.12948)** | **Reasoning models show different behavioral patterns** |
| **Algorithmic Primitives (2510.15987)** | **supports** | **Interplay (2512.07783)** | **"Primitives" depend on pre-existing learned patterns** |
| **Algorithmic Primitives (2510.15987)** | **challenged by** | **OMEGA (2506.18880)** | **0% transformative generalization despite identifiable patterns** |
| **Algorithmic Primitives (2510.15987)** | **challenged by** | **Planning Gap (2601.14456)** | **82.9% ID → 0% OOD shows learned patterns don't generalize** |
| **Algorithmic Primitives (2510.15987)** | **challenged by** | **Faith and Fate (2305.18654)** | **Learned patterns don't compose for novel reasoning** |
| **Emergent Symbolic Mechanisms (2502.20332)** | **supports** | **Algorithmic Primitives (2510.15987)** | **Both find identifiable reasoning mechanisms in attention heads** |
| **Emergent Symbolic Mechanisms (2502.20332)** | **supports** | **DeepSeek-R1 (2501.12948)** | **LLMs develop structured reasoning patterns** |
| **Emergent Symbolic Mechanisms (2502.20332)** | **supports** | **CoT Without Prompting (2402.10200)** | **Latent reasoning capabilities exist** |
| **Emergent Symbolic Mechanisms (2502.20332)** | **challenged by** | **OMEGA (2506.18880)** | **0% transformative generalization despite similar mechanisms** |
| **Emergent Symbolic Mechanisms (2502.20332)** | **challenged by** | **Planning Gap (2601.14456)** | **82.9% ID → 0% OOD shows mechanisms don't generalize** |
| **Emergent Symbolic Mechanisms (2502.20332)** | **challenged by** | **Faith and Fate (2305.18654)** | **Compositional generalization failure** |
| **Emergent Symbolic Mechanisms (2502.20332)** | **does not address** | **Illusion of Thinking (2506.06941)** | **No complexity scaling tested** |
| **How LLMs Learn to Reason (2509.23629)** | **supports** | **Interplay (2512.07783)** | **RL integrates pre-existing learned patterns** |
| **How LLMs Learn to Reason (2509.23629)** | **supports** | **DeepSeek-R1 (2501.12948)** | **RLVR training dynamics; policy changes** |
| **How LLMs Learn to Reason (2509.23629)** | **supports** | **No Free Lunch (2506.17219)** | **Policy collapse mechanism** |
| **How LLMs Learn to Reason (2509.23629)** | **supports** | **OMEGA (2506.18880)** | **Policy collapse; convergence on specific patterns** |
| **How LLMs Learn to Reason (2509.23629)** | **provides mechanism for** | **Illusion of Thinking (2506.06941)** | **Sparse web has limited paths → collapse at complexity** |
| **How LLMs Learn to Reason (2509.23629)** | **provides mechanism for** | **Catastrophic forgetting** | **Bridge-severing in sparse tree structure** |
| **Reasoning Beyond CoT (2601.08058)** | **supports** | **CoT Without Prompting (2402.10200)** | **Both show reasoning elicitable without explicit CoT** |
| **Reasoning Beyond CoT (2601.08058)** | **supports** | **Emergent Symbolic Mechanisms (2502.20332)** | **Both identify specific mechanisms for reasoning** |
| **Reasoning Beyond CoT (2601.08058)** | **supports** | **Interplay (2512.07783)** | **Explains how pre-training provides capability that can be surfaced** |
| **Reasoning Beyond CoT (2601.08058)** | **does not address** | **OMEGA (2506.18880)** | **No OOD generalization testing** |
| **Reasoning Beyond CoT (2601.08058)** | **does not address** | **Planning Gap (2601.14456)** | **No OOD generalization testing** |
| **Rethinking Illusion of Thinking (2507.01231)** | **confirms** | **Illusion of Thinking (2506.06941)** | **Hanoi: ~8 disk limit is real cognitive limitation** |
| **Rethinking Illusion of Thinking (2507.01231)** | **partially rebuts** | **Illusion of Thinking (2506.06941)** | **River Crossing: tested unsolvable configs; LRMs succeed on solvable (200 steps)** |
| **Rethinking Illusion of Thinking (2507.01231)** | **confirms** | **Lawsen (2506.09250)** | **Stepwise prompting doesn't fix Hanoi; output window NOT the issue** |
| **Rethinking Illusion of Thinking (2507.01231)** | **challenges** | **Agentic Gap (2506.18957)** | **Agentic dialogue makes Hanoi WORSE, not better** |
| **Rethinking Illusion of Thinking (2507.01231)** | **challenges** | **Thinking Isn't Illusion (2507.17699)** | **Base reasoning genuinely limited; tools may help but problem is real** |
| **Rethinking Illusion of Thinking (2507.01231)** | **supports** | **OMEGA (2506.18880)** | **Same phase transition / complexity threshold patterns** |
| **Effective Without Thinking (2504.09858)** | **supports** | **Illusion of Insight (2601.00514)** | **Extended thinking not necessary for correctness** |
| **Effective Without Thinking (2504.09858)** | **supports** | **Reasoning Beyond CoT (2601.08058)** | **Reasoning can be elicited without explicit CoT** |
| **Effective Without Thinking (2504.09858)** | **supports** | **CoT Faithfulness papers** | **If thinking skippable, tokens not causal for correctness** |
| **Effective Without Thinking (2504.09858)** | **challenges** | **DeepSeek-R1 (2501.12948)** | **Questions value of extended thinking traces** |
| **Effective Without Thinking (2504.09858)** | **challenges** | **How LLMs Learn to Reason (2509.23629)** | **"Concept web" traversal may not require explicit thinking** |
| **Rethinking Illusion of Thinking (2507.01231)** | **supports** | **Faith and Fate (2305.18654)** | **Failures at constrained solution spaces; "stochastic searchers"** |
| **Reasoning Beyond CoT (2601.08058)** | **supports** | **How LLMs Learn to Reason (2509.23629)** | **Both identify internal mechanisms for reasoning mode activation** |
| **Reasoning Beyond CoT (2601.08058)** | **supports** | **Algorithmic Primitives (2510.15987)** | **Both find identifiable internal patterns for reasoning** |
| **Emergent Symbolic Mechanisms (2502.20332)** | **supports** | **Reasoning Beyond CoT (2601.08058)** | **Both identify latent mechanisms; SAE features vs attention heads** |
| **How LLMs Learn to Reason (2509.23629)** | **supports** | **Emergent Symbolic Mechanisms (2502.20332)** | **Both show structured internal organization emerges** |
| **Sequential Enumeration (2512.04727)** | **supports** | **Faith and Fate (2305.18654)** | **Counting uses token patterns, not true algorithms** |
| **Sequential Enumeration (2512.04727)** | **supports** | **OMEGA (2506.18880)** | **Counting = compositional skill that fails OOD** |
| **Sequential Enumeration (2512.04727)** | **supports** | **Planning Gap (2601.14456)** | **Counting only works when trained patterns apply** |
| **Sequential Enumeration (2512.04727)** | **supports** | **Illusion of Thinking (2506.06941)** | **Systematic failure on counting; no spontaneous counting** |
| **Sequential Enumeration (2512.04727)** | **supports** | **GSM-Symbolic (2410.05229)** | **Surface pattern exploitation vs. genuine computation** |
| **Sequential Enumeration (2512.04727)** | **challenged by** | **Emergent Symbolic Mechanisms (2502.20332)** | **Claims symbolic circuits exist; but this paper shows they don't support counting** |
| **Emergent World Beliefs (2512.23722)** | **supports** | **Othello/Chess world model papers** | **Extends paradigm to POMDP** |
| **Emergent World Beliefs (2512.23722)** | **supports** | **Emergent Symbolic Mechanisms (2502.20332)** | **Evidence for internal representations** |
| **Emergent World Beliefs (2512.23722)** | **challenged by** | **Planning Gap (2601.14456)** | **World models don't transfer OOD** |
| **Emergent World Beliefs (2512.23722)** | **challenged by** | **OMEGA (2506.18880)** | **Compositional generalization fails** |
| **Emergent World Beliefs (2512.23722)** | **challenged by** | **Faith and Fate (2305.18654)** | **Probed features may not be causally used** |

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
| **OMEGA (2506.18880)** | **0% transformative generalization; >69% isolated → near-0% composed; 38% overthinking errors** |
| **Emergent Hierarchical Reasoning (2509.03646)** | **RL improves ID via "strategic template deployment" but requires pre-existing capability; fails on Llama** |
| **Algorithmic Primitives (2510.15987)** | **"Primitives" are learned patterns (nearest_neighbor from training); no accuracy testing; no OOD testing** |
| **Emergent Symbolic Mechanisms (2502.20332)** | **98% cross-token generalization; but "abstraction" = positional invariance; no OOD/complexity testing; all tasks in-distribution** |
| **How LLMs Learn to Reason (2509.23629)** | **Sparse concept web (⟨k⟩≈2) theory for RLVR; but "integration" = organizing existing patterns; policy collapse = overfitting** |
| **Reasoning Beyond CoT (2601.08058)** | **Latent reasoning mode identifiable via SAE; but feature is mode SWITCH not quality indicator; no OOD testing** |
| **Rethinking Illusion of Thinking (2507.01231)** | **Replication confirms Hanoi ~8 disk limit; River Crossing methodology fixed; LRMs = "stochastic searchers"** |
| **Sequential Enumeration (2512.04727)** | **LLMs can't spontaneously count; 0 models counted systematically; explicit counting = token patterns (decade dips)** |
| **Emergent World Beliefs (2512.23722)** | **r=0.59 equity correlation (moderate); but equity was in training data; no OOD/compositional testing** |

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
| 2026-01-24 | Added OMEGA (2506.18880) — 0% transformative; compositional failure; RL can hurt (30pp drop) |
| 2026-01-24 | Added Emergent Hierarchical Reasoning (2509.03646) — Explicitly supports surfacing hypothesis; requires pre-existing capability |
| 2026-01-24 | Added Algorithmic Primitives (2510.15987) — "Primitives" are learned patterns; no accuracy/OOD testing |
| 2026-01-24 | Added Emergent Symbolic Mechanisms (2502.20332) — "Abstraction" = positional invariance; 98% cross-token but no OOD testing |
| 2026-01-24 | Added How LLMs Learn to Reason (2509.23629) — Sparse web theory; supports surfacing hypothesis on close reading |
| 2026-01-24 | Added Reasoning Beyond CoT (2601.08058) — Latent mode switch; feature triggers reasoning but doesn't improve quality |
| 2026-01-24 | Added Rethinking Illusion of Thinking (2507.01231) — Replication confirms Hanoi limits; corrects River Crossing methodology |
| 2026-01-24 | Added Reasoning Models Effective Without Thinking (2504.09858) — NoThinking outperforms Thinking under token constraints |
| 2026-01-24 | Added Sequential Enumeration (2512.04727) — LLMs can't spontaneously count; explicit counting = token patterns |
| 2026-01-24 | Added Emergent World Beliefs (2512.23722) — r=0.59 equity correlation; equity was in training signal; no OOD testing |
