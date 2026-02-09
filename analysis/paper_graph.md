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
| **Dot by Dot (2404.15758)** | **supports** | **Faith and Fate (2305.18654)** | **CoT benefits from computation, not task decomposition** |
| **Dot by Dot (2404.15758)** | **supports** | **Measuring Faithfulness (2307.13702)** | **Tokens can be divorced from actual computation** |
| **Dot by Dot (2404.15758)** | **supports** | **Expressive Power of CoT (2310.07923)** | **Provides empirical evidence for theoretical claims** |
| **Pause Tokens (2505.21024)** | **extends** | **Dot by Dot (2404.15758)** | **Proves formal separation conjectured in Dot by Dot** |
| **Pause Tokens (2505.21024)** | **supports** | **Faith and Fate (2305.18654)** | **Proves fundamental computational limits** |
| **Pause Tokens (2505.21024)** | **supports** | **Expressive Power of CoT (2310.07923)** | **Places pause tokens in relation to CoT expressivity** |
| **Mechanistic CoT (2402.18312)** | **supports** | **Faith and Fate (2305.18654)** | **CoT via induction circuits = pattern matching, not symbolic reasoning** |
| **Mechanistic CoT (2402.18312)** | **supports** | **Measuring Faithfulness (2307.13702)** | **Parallel pathways explain why CoT divorced from actual computation** |
| **Mechanistic CoT (2402.18312)** | **supports** | **Dot by Dot (2404.15758)** | **Both show CoT benefits from computation, not semantic content** |
| **Mechanistic CoT (2402.18312)** | **extends** | **Induction Heads (Olsson et al., 2022)** | **Shows induction-head-like mechanisms compose for multi-step reasoning** |
| **Mechanistic CoT (2402.18312)** | **supports** | **Expressive Power of CoT (2310.07923)** | **Provides mechanistic evidence for theoretical claims** |
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
| **TMBench (2504.20771)** | **supports** | **Illusion of Thinking (2506.06941)** | **Both show performance collapse at scale** |
| **TMBench (2504.20771)** | **supports** | **Faith and Fate (2305.18654)** | **Error accumulation with sequential steps** |
| **TMBench (2504.20771)** | **supports** | **Sequential Enumeration (2512.04727)** | **Both show LLMs fail at iterative processes** |
| **TMBench (2504.20771)** | **provides evidence for** | **Bounded capability thesis** | **"Inevitable failure due to statistical nature"** |
| **Physics of LLMs 2.1 (2407.20311)** | **challenges** | **Faith and Fate (2305.18654)** | **Shows genuine OOD generalization, not just template matching** |
| **Physics of LLMs 2.1 (2407.20311)** | **challenges** | **The thesis** | **Controlled evidence for reasoning in narrow domains** |
| **Physics of LLMs 2.1 (2407.20311)** | **supports** | **Interplay (2512.07783)** | **Capability must exist in training distribution (iGSM provides this)** |
| **Physics of LLMs 2.1 (2407.20311)** | **does not address** | **OMEGA (2506.18880)** | **Length generalization ≠ compositional generalization** |
| **Physics of LLMs 2.1 (2407.20311)** | **does not address** | **Planning Gap (2601.14456)** | **Different task structure** |
| **FaithCoT-Bench (2510.04040)** | **supports** | **CoT In The Wild (2503.08679)** | **Both find pervasive unfaithfulness; extends with instance-level detection** |
| **FaithCoT-Bench (2510.04040)** | **supports** | **Measuring Faithfulness (2307.13702)** | **Confirms CoT unfaithfulness with 1,000+ annotated trajectories** |
| **FaithCoT-Bench (2510.04040)** | **supports** | **Reasoning Models Don't Say (2505.05410)** | **Both find ~40-60% unfaithfulness rates** |
| **FaithCoT-Bench (2510.04040)** | **supports** | **Planning Gap (2601.14456)** | **OOD unfaithfulness: 20% → 74% parallels ID/OOD accuracy gap** |
| **FaithCoT-Bench (2510.04040)** | **extends** | **Prior faithfulness work** | **Population-level → instance-level detection framework** |
| **Societies of Thought (2601.10825)** | **supports (mechanistically)** | **DeepSeek-R1 (2501.12948)** | **Explains HOW R1 achieves performance via multi-agent dialogue simulation** |
| **Societies of Thought (2601.10825)** | **supports** | **How LLMs Learn to Reason (2509.23629)** | **Both show RL organizes pre-existing conversational patterns** |
| **Societies of Thought (2601.10825)** | **supports** | **Interplay (2512.07783)** | **"Society of thought" is learned pattern from training data** |
| **Societies of Thought (2601.10825)** | **does not address** | **OMEGA (2506.18880)** | **No OOD or compositional testing** |
| **Societies of Thought (2601.10825)** | **does not address** | **Planning Gap (2601.14456)** | **No OOD generalization testing** |
| **Thinking by Doing (2511.23476)** | **supports** | **Interplay (2512.07783)** | **RL requires pre-existing capability; authors state prerequisites** |
| **Thinking by Doing (2511.23476)** | **supports** | **DeepSeek-R1 (2501.12948)** | **RL organizes existing reasoning patterns** |
| **Thinking by Doing (2511.23476)** | **supports** | **Effective Without Thinking (2504.09858)** | **Monolithic reasoning can HARM performance** |
| **Thinking by Doing (2511.23476)** | **does not address** | **OMEGA (2506.18880)** | **"Hard" tasks are same domain, larger scale — not compositional OOD** |
| **Thinking by Doing (2511.23476)** | **does not address** | **Planning Gap (2601.14456)** | **No truly OOD testing** |
| **Bias and CoT Faithfulness (2505.23945)** | **supports** | **Measuring Faithfulness (2307.13702)** | **Extends to VLMs; SFT training shows NO improvement** |
| **Bias and CoT Faithfulness (2505.23945)** | **supports** | **Reasoning Models Don't Say (2505.05410)** | **Both find faithfulness gaps; visual biases systematically less articulated** |
| **Bias and CoT Faithfulness (2505.23945)** | **supports** | **FaithCoT-Bench (2510.04040)** | **Extends faithfulness analysis to visual domain** |
| **Bias and CoT Faithfulness (2505.23945)** | **challenges (partially)** | **DeepSeek-R1 (2501.12948)** | **RL helps only for explicit/reasonable biases; fails on subtle cues** |
| **Chess Compositionality (2510.20783)** | **partially supports** | **Emergent Symbolic Mechanisms (2502.20332)** | **Both find identifiable mechanisms for structured behaviors** |
| **Chess Compositionality (2510.20783)** | **partially challenges** | **Planning Gap (2601.14456)** | **SOME OOD generalization for rules (96%+), but strategies fail (70%→22%)** |
| **Chess Compositionality (2510.20783)** | **supports (on closer reading)** | **OMEGA (2506.18880)** | **Rules generalize, but strategies fail — same pattern as compositional failure** |
| **Chess Compositionality (2510.20783)** | **supports** | **The thesis distinction** | **Rule following ≠ reasoning; strategies distribution-bounded** |
| **Mechanistic Counting (2601.02989)** | **supports** | **Illusion of Thinking (2506.06941)** | **Both show collapse at complexity threshold; 0% accuracy at 41-50 items** |
| **Mechanistic Counting (2601.02989)** | **supports** | **Sequential Enumeration (2512.04727)** | **Both show LLMs can't spontaneously count/enumerate at scale** |
| **Mechanistic Counting (2601.02989)** | **supports** | **Faith and Fate (2305.18654)** | **Error accumulation with sequential steps; depth-bounded** |
| **Mechanistic Counting (2601.02989)** | **provides mechanism for** | **Why CoT alone fails** | **Needs structural decomposition, not just more tokens** |
| **CogniLoad (2509.18458)** | **supports** | **Illusion of Thinking (2506.06941)** | **Both show collapse at complexity threshold; state-tracking errors dominate** |
| **CogniLoad (2509.18458)** | **supports** | **Mechanistic Counting (2601.02989)** | **Both show System-1 reasoning fails at scale** |
| **CogniLoad (2509.18458)** | **supports** | **Faith and Fate (2305.18654)** | **Error accumulation with sequential steps** |
| **CogniLoad (2509.18458)** | **extends** | **Cognitive Load Theory** | **Novel: links CLT from psychology to LLM evaluation** |
| **Instruction-Tuned Not Better (2601.13244)** | **supports** | **Interplay (2512.07783)** | **Capabilities exist in base model; training surfaces them** |
| **Instruction-Tuned Not Better (2601.13244)** | **supports** | **No Free Lunch (2506.17219)** | **SFT/RL can degrade reasoning while improving format** |
| **Instruction-Tuned Not Better (2601.13244)** | **supports** | **OMEGA (2506.18880)** | **Perturbation brittleness shows same pattern** |
| **Instruction-Tuned Not Better (2601.13244)** | **challenges** | **DeepSeek-R1 (2501.12948)** | **Instruction tuning benefits limited at scale; base models often win** |
| **Instruction-Tuned Not Better (2601.13244)** | **provides evidence for** | **Surfacing hypothesis** | **Base models have capability; instruction tuning changes activation patterns** |
| **FRIT (2509.13334)** | **supports** | **Measuring Faithfulness (2307.13702)** | **Confirms low baseline faithfulness; extends with intervention method** |
| **FRIT (2509.13334)** | **supports** | **Reasoning Models Don't Say (2505.05410)** | **Both find 25-60% unfaithfulness rates** |
| **FRIT (2509.13334)** | **supports** | **FaithCoT-Bench (2510.04040)** | **Both show pervasive unfaithfulness** |
| **FRIT (2509.13334)** | **extends** | **FRODO (Paul et al.)** | **Automated, no human supervision needed** |
| **FRIT (2509.13334)** | **provides evidence for** | **Faithfulness-accuracy link** | **Accuracy emerges from faithfulness training** |
| **Mapping Faithful Reasoning (2510.22362)** | **supports** | **Measuring Faithfulness (2307.13702)** | **Provides mechanistic evidence for unfaithfulness** |
| **Mapping Faithful Reasoning (2510.22362)** | **supports** | **FRIT (2509.13334)** | **Both find easy/hard case distinction** |
| **Mapping Faithful Reasoning (2510.22362)** | **supports** | **Reasoning Models Don't Say (2505.05410)** | **Both show CoT can be decorative** |
| **Mapping Faithful Reasoning (2510.22362)** | **provides method for** | **AI safety monitoring** | **Concept Walk distinguishes computational vs decorative reasoning** |
| **IOI Minimal Circuits (2510.25013)** | **supports** | **Emergent Symbolic Mechanisms (2502.20332)** | **Both find identifiable circuits for reasoning** |
| **IOI Minimal Circuits (2510.25013)** | **supports** | **How LLMs Learn to Reason (2509.23629)** | **Both show structured internal patterns** |
| **IOI Minimal Circuits (2510.25013)** | **challenged by** | **Wang et al. GPT-2 IOI** | **GPT-2 uses complex multi-hop circuit; task-constrained training finds simpler** |
| **RADAR (2510.08931)** | **supports** | **GSM-Symbolic (2410.05229)** | **Both question benchmark validity; mechanistic detection of memorization** |
| **RADAR (2510.08931)** | **supports** | **Beyond Memorization (2601.13392)** | **Both distinguish memorization from reasoning** |
| **RADAR (2510.08931)** | **supports** | **Instruction-Tuned Not Better (2601.13244)** | **Perturbation sensitivity reveals brittleness** |
| **RADAR (2510.08931)** | **provides method for** | **Thesis validation** | **Early convergence = pattern matching; distributed attention = reasoning** |
| **Hierarchical Thinking FSM (2510.22437)** | **supports** | **Illusion of Thinking (2506.06941)** | **Extended thinking doesn't always help (GPQA: longer = worse)** |
| **Hierarchical Thinking FSM (2510.22437)** | **supports** | **Effective Without Thinking (2504.09858)** | **Sometimes shorter is better** |
| **Hierarchical Thinking FSM (2510.22437)** | **supports** | **CogniLoad (2509.18458)** | **Task length matters for math but not all tasks** |
| **Hierarchical Thinking FSM (2510.22437)** | **provides method for** | **Reasoning interpretability** | **FSM framework for tracking state transitions** |
| **LLMs Truly Grasp Addition (2504.05262)** | **supports** | **GSM-Symbolic (2410.05229)** | **Both show high accuracy hides brittleness; symbolic collapse confirms surface pattern matching** |
| **LLMs Truly Grasp Addition (2504.05262)** | **supports** | **Faith and Fate (2305.18654)** | **Confirms pattern matching mechanism; commutativity violations prove no abstract rule learning** |
| **LLMs Truly Grasp Addition (2504.05262)** | **supports** | **Semantic Deception (2512.20812)** | **Both show addition failures under representation changes** |
| **LLMs Truly Grasp Addition (2504.05262)** | **supports** | **Sequential Enumeration (2512.04727)** | **Both show LLMs can't count/compute algorithmically** |
| **LLMs Truly Grasp Addition (2504.05262)** | **provides evidence for** | **Benchmark validity concerns** | **High scores reflect pattern recognition, not understanding (99.8% → 7.5%)** |
| **LLMs Truly Grasp Addition (2504.05262)** | **provides evidence for** | **Surfacing hypothesis** | **SFT surfaces patterns (97.17%), doesn't create understanding (0% symbolic transfer)** |
| **LLMs Truly Grasp Addition (2504.05262)** | **partially supports** | **DeepSeek-R1 (2501.12948)** | **R1-Distill shows better (but still imperfect) transfer: -5.99% vs -92% drop** |
| **PhD-Level Math Reasoning (2512.13978)** | **supports** | **Planning Gap (2601.14456)** | **Both show significant failure rates (~34% and 100% respectively) on structured reasoning** |
| **PhD-Level Math Reasoning (2512.13978)** | **supports** | **OMEGA (2506.18880)** | **Both show models struggle with novel compositions** |
| **PhD-Level Math Reasoning (2512.13978)** | **supports** | **Illusion of Thinking (2506.06941)** | **Both reveal ceiling on reasoning capability** |
| **PhD-Level Math Reasoning (2512.13978)** | **partially challenges** | **DeepSeek-R1 (2501.12948)** | **66% success suggests meaningful capability** |
| **PhD-Level Math Reasoning (2512.13978)** | **partially supports** | **Physics of LLMs 2.1 (2407.20311)** | **Some genuine reasoning exists in narrow domains** |
| **Shortcut Learning (2410.13343)** | **supports** | **GSM-Symbolic (2410.05229)** | **Both show high accuracy hides brittleness to perturbations** |
| **Shortcut Learning (2410.13343)** | **supports** | **Faith and Fate (2305.18654)** | **Both show pattern matching over genuine reasoning** |
| **Shortcut Learning (2410.13343)** | **supports** | **LLMs Truly Grasp Addition (2504.05262)** | **Both show symbolic/structural changes break models** |
| **Shortcut Learning (2410.13343)** | **supports** | **Instruction-Tuned Not Better (2601.13244)** | **Both show perturbation sensitivity** |
| **Shortcut Learning (2410.13343)** | **extends** | **Measuring Faithfulness (2307.13702)** | **Shortcut-specific evaluation framework** |
| **MMLU-Pro+ (2409.02257)** | **supports** | **Shortcut Learning (2410.13343)** | **Both show LLMs exploit shortcuts; MMLU-Pro+ provides benchmark** |
| **MMLU-Pro+ (2409.02257)** | **supports** | **GSM-Symbolic (2410.05229)** | **Both show format changes expose brittleness** |
| **MMLU-Pro+ (2409.02257)** | **supports** | **Faith and Fate (2305.18654)** | **Both show pattern matching over reasoning** |
| **MMLU-Pro+ (2409.02257)** | **provides method for** | **Shortcut detection** | **Novel SSR and CPI metrics for anchoring bias** |
| **Unsupervised Decoding (2512.01222)** | **supports** | **Reasoning Beyond CoT (2601.08058)** | **Both show internal representations are interpretable** |
| **Unsupervised Decoding (2512.01222)** | **supports** | **Emergent Symbolic Mechanisms (2502.20332)** | **Both find semantic structure in intermediate layers** |
| **Unsupervised Decoding (2512.01222)** | **supports** | **CoT Without Prompting (2402.10200)** | **Both show reasoning can be elicited from internal states** |
| **Unsupervised Decoding (2512.01222)** | **provides method for** | **AI Safety monitoring** | **Framework for detecting hidden reasoning** |
| **Unsupervised Decoding (2512.01222)** | **does not address** | **Planning Gap (2601.14456)** | **No OOD generalization testing** |
| **Unsupervised Decoding (2512.01222)** | **does not address** | **OMEGA (2506.18880)** | **No compositional generalization testing** |
| **Unveiling Causal Reasoning (2506.21215)** | **supports** | **Faith and Fate (2305.18654)** | **Both show LLMs rely on pattern matching rather than genuine reasoning** |
| **Unveiling Causal Reasoning (2506.21215)** | **supports** | **GSM-Symbolic (2410.05229)** | **Both show high accuracy on familiar data hides brittleness on fresh data** |
| **Unveiling Causal Reasoning (2506.21215)** | **supports** | **Planning Gap (2601.14456)** | **Both show ID/OOD gap as evidence of memorization** |
| **Unveiling Causal Reasoning (2506.21215)** | **supports** | **Beyond Memorization (2601.13392)** | **Both use temporal freshness to test genuine reasoning vs. retrieval** |
| **Unveiling Causal Reasoning (2506.21215)** | **supports** | **CoT Mirage (2508.01191)** | **Both show ID success, OOD failure pattern** |
| **Unveiling Causal Reasoning (2506.21215)** | **provides framework for** | **Pattern matching thesis** | **Level-1 (retrieval) vs Level-2 (genuine reasoning) distinction** |
| **Unveiling Causal Reasoning (2506.21215)** | **challenged by** | **Physics of LLMs 2.1 (2407.20311)** | **Shows some genuine OOD generalization in controlled settings** |
| **Emergent Abilities Survey (2503.05788)** | **supports** | **GSM-Symbolic (2410.05229)** | **Confirms metric choice affects emergence detection** |
| **Emergent Abilities Survey (2503.05788)** | **supports** | **Faith and Fate (2305.18654)** | **Memorization vs. generalization competition aligns with circuit analysis** |
| **Emergent Abilities Survey (2503.05788)** | **supports** | **No Free Lunch (2506.17219)** | **Heavy memorization delays generalization** |
| **Emergent Abilities Survey (2503.05788)** | **extends** | **DeepSeek-R1 (2501.12948)** | **Survey covers LRM emergence patterns** |
| **Emergent Abilities Survey (2503.05788)** | **challenges** | **Wei et al. (2022) emergence claim** | **Notes methodological issues with original claim** |
| **Emergent Abilities Survey (2503.05788)** | **challenges** | **Schaeffer et al. "mirage" claim** | **Argues they overclaimed - some emergence is real (module arithmetic, translation)** |
| **Survey of Test-Time Compute (2501.02497)** | **supports** | **Illusions of Reflection (2510.18254)** | **Both find self-correction limited without external feedback** |
| **Survey of Test-Time Compute (2501.02497)** | **supports** | **Revisiting Test-Time Scaling (2502.12215)** | **Both find sequential scaling fails; parallel scaling works better** |
| **Survey of Test-Time Compute (2501.02497)** | **supports** | **No Free Lunch (2506.17219)** | **Both find RL has limited effectiveness for improving reasoning** |
| **Survey of Test-Time Compute (2501.02497)** | **supports** | **Interplay (2512.07783)** | **Survey's framing supports "surfacing" — TTA surfaces existing capabilities** |
| **Survey of Test-Time Compute (2501.02497)** | **extends** | **DeepSeek-R1 (2501.12948)** | **Survey provides theoretical framework for understanding R1's approach** |
| **Survey of Test-Time Compute (2501.02497)** | **extends** | **s1 (2501.19393)** | **Survey covers the "budget forcing" strategy explicitly** |
| **Theory for Length Generalization (2404.00560)** | **supports** | **Physics of LLMs 2.1 (2407.20311)** | **Both show LG achievable with proper structure/representation** |
| **Theory for Length Generalization (2404.00560)** | **supports** | **Faith and Fate (2305.18654)** | **Confirms standard formulations fail — matches pattern matching thesis** |
| **Theory for Length Generalization (2404.00560)** | **supports** | **GSM-Symbolic (2410.05229)** | **Explains why surface perturbations break models (R changes)** |
| **Theory for Length Generalization (2404.00560)** | **provides theory for** | **The thesis** | **LG requires D=X (training covers all inputs) = pattern matching with complete coverage** |
| **Survey of Inductive Reasoning (2510.10182)** | **supports** | **Faith and Fate (2305.18654)** | **Both identify pattern matching as mechanism** |
| **Survey of Inductive Reasoning (2510.10182)** | **supports** | **OMEGA (2506.18880)** | **Both show compositional generalization failures in induction** |
| **Survey of Inductive Reasoning (2510.10182)** | **extends** | **How LLMs Learn to Reason (2509.23629)** | **Identifies induction heads as mechanism for inductive ability** |
| **Survey of Inductive Reasoning (2510.10182)** | **provides mechanism for** | **The thesis** | **"Inductive ability originates from induction heads" = pattern matching** |
| **Limits of Emergent Reasoning Agentic (2510.15974)** | **supports** | **Illusion of Thinking (2506.06941)** | **Confirms collapse pattern; environment access doesn't help** |
| **Limits of Emergent Reasoning Agentic (2510.15974)** | **rebuts** | **Comment: Agentic Gap (2506.18957)** | **Agentic framework doesn't solve reasoning collapse** |
| **Limits of Emergent Reasoning Agentic (2510.15974)** | **rebuts** | **Thinking Isn't Illusion (2507.17699)** | **Environment interface doesn't help Hanoi; tool augmentation limited** |
| **Limits of Emergent Reasoning Agentic (2510.15974)** | **supports** | **Rethinking Illusion (2507.01231)** | **Confirms Hanoi ~8 disk limit is real** |
| **Limits of Emergent Reasoning Agentic (2510.15974)** | **supports** | **Faith and Fate (2305.18654)** | **Looping = stuck in linearized pattern matching** |
| **Limits of Emergent Reasoning Agentic (2510.15974)** | **supports** | **How LLMs Learn to Reason (2509.23629)** | **Models stuck in local modes of sparse web** |
| **Limits of Emergent Reasoning Agentic (2510.15974)** | **provides mechanism for** | **Why test-time scaling fails** | **Models loop through same patterns, can't escape local modes** |
| **Compositional-ARC (2504.01445)** | **supports** | **Faith and Fate (2305.18654)** | **Both show LLMs fail at compositional generalization** |
| **Compositional-ARC (2504.01445)** | **supports** | **OMEGA (2506.18880)** | **Same pattern: primitives succeed, compositions fail** |
| **Compositional-ARC (2504.01445)** | **supports** | **Planning Gap (2601.14456)** | **Similar ID/OOD gap (high seen, zero novel)** |
| **Compositional-ARC (2504.01445)** | **supports** | **GSM-Symbolic (2410.05229)** | **LLMs fail on novel variations of known patterns** |
| **Compositional-ARC (2504.01445)** | **extends** | **Lake & Baroni (2023) MLC** | **MLC from linguistic to spatial reasoning** |
| **Compositional-ARC (2504.01445)** | **provides evidence for** | **Pattern matching hypothesis** | **3-shot success + systematicity failure = memorization** |
| **Compositional-ARC (2504.01445)** | **challenges** | **o3-mini reasoning claims** | **o3-mini WORST on systematicity (0.53%) despite best on 3-shot** |
| **KUP Memorization vs Reasoning (2504.12523)** | **supports** | **Faith and Fate (2305.18654)** | **Both show LLMs fail to apply learned patterns to novel reasoning** |
| **KUP Memorization vs Reasoning (2504.12523)** | **supports** | **Compositional-ARC (2504.01445)** | **Same pattern: can pattern match, can't compose/reason** |
| **KUP Memorization vs Reasoning (2504.12523)** | **supports** | **Planning Gap (2601.14456)** | **Similar ID/OOD gap: high direct, zero generalization** |
| **KUP Memorization vs Reasoning (2504.12523)** | **supports** | **GSM-Symbolic (2410.05229)** | **Both show memorization doesn't transfer to reasoning** |
| **KUP Memorization vs Reasoning (2504.12523)** | **provides framework for** | **Memorization vs reasoning distinction** | **Direct vs indirect probing methodology** |
| **LoopBench (2512.13713)** | **partially challenges** | **Illusion of Thinking (2506.06941)** | **O3 develops meta-cognitive strategies to escape deadlocks** |
| **LoopBench (2512.13713)** | **supports** | **Limits of Emergent Reasoning Agentic (2510.15974)** | **Most models (GPT-4.1, O3-mini) still fail/loop** |
| **LoopBench (2512.13713)** | **provides evidence for** | **Model capability hierarchy** | **O3 >> GPT-4.1 >> smaller models on meta-cognitive tasks** |
| **LoopBench (2512.13713)** | **supports** | **Surfacing hypothesis** | **Discovery-Implementation Gap: weaker models execute but can't discover** |
| **CRV Verifying CoT (2510.09312)** | **supports** | **Mapping Faithful Reasoning (2510.22362)** | **Both find mechanistic distinction between correct/incorrect reasoning** |
| **CRV Verifying CoT (2510.09312)** | **supports** | **How LLMs Learn to Reason (2509.23629)** | **Both identify internal structure matters for reasoning** |
| **CRV Verifying CoT (2510.09312)** | **provides evidence for** | **Domain-specific reasoning** | **Error signatures don't transfer across domains (92%→55-57% cross-domain)** |
| **Iterative ICL Algebraic (2509.01267)** | **supports** | **GSM-Symbolic (2410.05229)** | **Both show LLMs struggle with rule variations** |
| **Iterative ICL Algebraic (2509.01267)** | **supports** | **Faith and Fate (2305.18654)** | **Both show failure to apply learned rules in new contexts** |
| **Iterative ICL Algebraic (2509.01267)** | **supports** | **Compositional-ARC (2504.01445)** | **Both show systematicity failures; simpler examples help** |
| **Iterative ICL Algebraic (2509.01267)** | **supports** | **Illusion of Thinking (2506.06941)** | **Same complexity scaling collapse pattern** |
| **Iterative ICL Algebraic (2509.01267)** | **provides evidence for** | **Pattern matching thesis** | **Rule override fails = learned priors dominate** |
| **Revisiting Compositional Gen (2506.15629)** | **supports** | **Faith and Fate (2305.18654)** | **Both show LLMs follow learned patterns over instructions** |
| **Revisiting Compositional Gen (2506.15629)** | **supports** | **Compositional-ARC (2504.01445)** | **Both show compositional generalization failure** |
| **Revisiting Compositional Gen (2506.15629)** | **supports** | **Iterative ICL Algebraic (2509.01267)** | **Both show instruction override fails; patterns dominate** |
| **Revisiting Compositional Gen (2506.15629)** | **supports** | **GSM-Symbolic (2410.05229)** | **Both show distribution-bounded performance** |
| **Can ICL Generalize OOD (2410.09695)** | **supports** | **Faith and Fate (2305.18654)** | **"Pretraining function class" = linearized subgraph matching** |
| **Can ICL Generalize OOD (2410.09695)** | **supports** | **CoT Mirage (2508.01191)** | **Both show ID=high, OOD=low pattern** |
| **Can ICL Generalize OOD (2410.09695)** | **supports** | **Interplay (2512.07783)** | **"Cannot synthesize from void" directly confirmed** |
| **Can ICL Generalize OOD (2410.09695)** | **supports** | **Can LLMs Reason and Plan (2403.04121)** | **"Universal approximate retrieval" confirmed empirically** |
| **Can ICL Generalize OOD (2410.09695)** | **extends** | **Base Models Know How to Reason (2510.07364)** | **ICL selects from pretraining functions; Paper 133 shows these pre-exist** |
| **Demystifying Long CoT (2502.03373)** | **supports** | **Base Models Know How to Reason (2510.07364)** | **Both show capabilities pre-exist in base model** |
| **Demystifying Long CoT (2502.03373)** | **supports** | **Interplay (2512.07783)** | **"Cannot synthesize from void" — same finding** |
| **Demystifying Long CoT (2502.03373)** | **supports** | **s1 (2501.19393)** | **1K samples surfaces reasoning — same mechanism** |
| **Demystifying Long CoT (2502.03373)** | **extends** | **Overthinking/Underthinking (2412.21187, 2501.18585)** | **Length scaling dynamics explained** |
| **Demystifying Long CoT (2502.03373)** | **provides mechanism for** | **Surfacing hypothesis** | **Long CoT patterns exist in pretraining (OpenWebMath)** |
| **Chain of Thoughtlessness (2405.04776)** | **supports** | **Can LLMs Reason and Plan (2403.04121)** | **Same research group, same conclusion: CoT ≠ algorithm learning** |
| **Chain of Thoughtlessness (2405.04776)** | **supports** | **Can ICL Generalize OOD (2410.09695)** | **Both show OOD failure** |
| **Chain of Thoughtlessness (2405.04776)** | **supports** | **CoT Mirage (2508.01191)** | **ID=high, OOD=low — same pattern** |
| **Chain of Thoughtlessness (2405.04776)** | **supports** | **Faith and Fate (2305.18654)** | **Exponential error accumulation = degradation with complexity** |
| **Chain of Thoughtlessness (2405.04776)** | **provides evidence for** | **Illusion of Thinking (2506.06941)** | **Complexity collapse demonstrated** |
| **Chain of Thoughtlessness (2405.04776)** | **provides evidence for** | **Stop Anthropomorphizing (2504.09762)** | **Shows WHY traces have no semantics — CoT is pattern matching** |
| **CoT Training Mechanisms (2502.04667)** | **supports** | **Can LLMs Reason and Plan (2403.04121)** | **OOD failure confirms LLMs can't plan without pattern templates** |
| **CoT Training Mechanisms (2502.04667)** | **supports** | **Can ICL Generalize OOD (2410.09695)** | **Both show OOD generalization failure is fundamental** |
| **CoT Training Mechanisms (2502.04667)** | **supports** | **Demystifying Long CoT (2502.03373)** | **Both analyze CoT mechanisms; provides cleaner controlled evidence** |
| **CoT Training Mechanisms (2502.04667)** | **supports** | **Faith and Fate (2305.18654)** | **Confirms linearized subgraph matching — patterns not reason** |
| **CoT Training Mechanisms (2502.04667)** | **extends** | **Base Models Know How to Reason (2510.07364)** | **Explains WHY base models have latent ability — component patterns exist** |
| **Lexical Accuracy Hints (2508.15842)** | **supports** | **Overthinking (2412.21187)** | **Both find CoT length inversely correlated with accuracy** |
| **Lexical Accuracy Hints (2508.15842)** | **supports** | **Underthinking (2501.18585)** | **Complements findings on CoT length dynamics** |
| **Lexical Accuracy Hints (2508.15842)** | **supports** | **Illusions of Confidence (2601.05905)** | **Both document severe miscalibration** |
| **Lexical Accuracy Hints (2508.15842)** | **supports** | **Chain of Thoughtlessness (2405.04776)** | **Both show CoT doesn't reliably help on hard tasks** |
| **Lexical Accuracy Hints (2508.15842)** | **supports** | **Stop Anthropomorphizing (2504.09762)** | **Supports that CoT tokens ≠ reasoning traces** |
| **Lexical Accuracy Hints (2508.15842)** | **extends** | **Demystifying Long CoT (2502.03373)** | **Provides lexical analysis that Demystifying paper lacks** |
| **Recursive Language Models (2512.24601)** | **supports** | **Illusion of Thinking (2506.06941)** | **Context rot evidence confirms reasoning limits** |
| **Recursive Language Models (2512.24601)** | **supports** | **Can LLMs Reason and Plan (2403.04121)** | **RLMs = external scaffolding, not native reasoning** |
| **Recursive Language Models (2512.24601)** | **supports** | **CoT Training Mechanisms (2502.04667)** | **Both show explicit structure improves performance** |
| **Recursive Language Models (2512.24601)** | **extends** | **Thinking Isn't Illusion (2507.17699)** | **Both argue tools augment reasoning** |
| **Revisiting Compositional Gen (2506.15629)** | **provides evidence for** | **Instruction-pattern conflict** | **Models default to preferred orderings, ignoring instructions** |
| **STEPS (2601.03676)** | **provides mechanism for** | **Faith and Fate (2305.18654)** | **Power-law distribution explains compositional scarcity** |
| **STEPS (2601.03676)** | **provides mechanism for** | **Compositional-ARC (2504.01445)** | **Data bottleneck explains why k>1 compositions fail** |
| **STEPS (2601.03676)** | **supports** | **OMEGA (2506.18880)** | **Both show compositional collapse; STEPS provides solution** |
| **STEPS (2601.03676)** | **supports** | **Interplay (2512.07783)** | **Both support surfacing hypothesis** |
| **STEPS (2601.03676)** | **supports** | **Limits of Emergent Reasoning Agentic (2510.15974)** | **Tool use ≠ reasoning; environment doesn't help** |
| **STEPS (2601.03676)** | **provides evidence for** | **Training distribution thesis** | **Power-law distribution bounds capability** |
| **Survey Latent CoT (2505.16782)** | **supports** | **Measuring Faithfulness (2307.13702)** | **Both identify CoT unfaithfulness problem** |
| **Survey Latent CoT (2505.16782)** | **supports** | **CRV Verifying CoT (2510.09312)** | **Both show internal mechanisms matter** |
| **Survey Latent CoT (2505.16782)** | **supports** | **Reasoning Beyond CoT (2601.08058)** | **Both identify latent reasoning modes** |
| **Survey Latent CoT (2505.16782)** | **provides framework for** | **Latent vs explicit reasoning** | **Clear taxonomy of approaches** |
| **CryptoX (2502.07813)** | **supports** | **Faith and Fate (2305.18654)** | **Both show compositional failures** |
| **CryptoX (2502.07813)** | **supports** | **OMEGA (2506.18880)** | **Same pattern: primitives succeed, compositions fail** |
| **CryptoX (2502.07813)** | **supports** | **GSM-Symbolic (2410.05229)** | **Both show encoding/perturbation brittleness** |
| **CryptoX (2502.07813)** | **provides mechanism for** | **Compositional failure** | **Layered processing = sequential pattern matching** |
| **CoT Monitorability (2510.27378)** | **supports** | **Measuring Faithfulness (2307.13702)** | **Extends with verbosity dimension** |
| **CoT Monitorability (2510.27378)** | **supports** | **Reasoning Models Don't Say (2505.05410)** | **Both show CoT doesn't reflect reasoning** |
| **CoT Monitorability (2510.27378)** | **extends** | **FaithCoT-Bench (2510.04040)** | **Adds monitorability framework** |
| **Reasoning Abilities ARC (2403.11793)** | **supports** | **Faith and Fate (2305.18654)** | **Both show compositional reasoning failure** |
| **Reasoning Abilities ARC (2403.11793)** | **supports** | **Compositional-ARC (2504.01445)** | **Same benchmark, similar findings** |
| **Reasoning Abilities ARC (2403.11793)** | **supports** | **OMEGA (2506.18880)** | **Same pattern: primitives work, compositions fail** |
| **Reasoning Abilities ARC (2403.11793)** | **provides framework for** | **Process vs results evaluation** | **LoTH: Logical Coherence, Compositionality, Productivity** |
| **Inference-Time Scaling Complex (2504.00294)** | **supports** | **Survey of Test-Time Compute (2501.02497)** | **Both find task-dependent scaling effectiveness** |
| **Inference-Time Scaling Complex (2504.00294)** | **supports** | **Illusion of Thinking (2506.06941)** | **Both show performance collapse at complexity** |
| **Inference-Time Scaling Complex (2504.00294)** | **supports** | **Interplay (2512.07783)** | **Supports surfacing hypothesis — superscaling surfaces capability** |
| **Inference-Time Scaling Complex (2504.00294)** | **provides evidence for** | **Surfacing hypothesis** | **GPT-4o approaches O1 with 256× superscaling** |
| **PCL-Reasoner-V1.5 (2601.14716)** | **supports** | **Interplay (2512.07783)** | **Both show RL surfaces capability from base model** |
| **PCL-Reasoner-V1.5 (2601.14716)** | **extends** | **DeepSeek-R1 (2501.12948)** | **Builds on R1 through distillation** |
| **PCL-Reasoner-V1.5 (2601.14716)** | **supports** | **How LLMs Learn to Reason (2509.23629)** | **Both show RL improves through policy reorganization** |
| **PCL-Reasoner-V1.5 (2601.14716)** | **provides evidence for** | **Surfacing hypothesis** | **RL improves long-CoT specifically = patterns exist but need activation** |
| **Interactive Learning ILR (2509.26306)** | **supports** | **Societies of Thought (2601.10825)** | **Both show multi-agent interaction improves reasoning** |
| **Interactive Learning ILR (2509.26306)** | **supports** | **Interplay (2512.07783)** | **Both show training can surface capability** |
| **Interactive Learning ILR (2509.26306)** | **extends** | **GRPO (DeepSeekMath)** | **Extends with perception calibration for multi-agent** |
| **Interactive Learning ILR (2509.26306)** | **does not address** | **OMEGA (2506.18880)** | **No OOD/compositional generalization testing** |
| **Revisiting LLM Reasoning via IB (2507.18391)** | **supports** | **How LLMs Learn to Reason (2509.23629)** | **Both show RL reorganizes rather than creates** |
| **Revisiting LLM Reasoning via IB (2507.18391)** | **supports** | **Interplay (2512.07783)** | **Both support surfacing hypothesis** |
| **Revisiting LLM Reasoning via IB (2507.18391)** | **extends** | **GRPO (DeepSeekMath)** | **Extends with IB-based regularization** |
| **o3 Thinks Harder Not Longer (2502.15631)** | **supports** | **Illusion of Thinking (2506.06941)** | **More tokens ≠ better outcomes; complexity thresholds exist** |
| **o3 Thinks Harder Not Longer (2502.15631)** | **supports** | **Faith and Fate (2305.18654)** | **Error accumulation with longer chains = propagation mechanism** |
| **o3 Thinks Harder Not Longer (2502.15631)** | **supports** | **Effective Without Thinking (2504.09858)** | **Both show excessive reasoning can hurt** |
| **o3 Thinks Harder Not Longer (2502.15631)** | **extends** | **Overthinking (2412.21187, 2501.18585)** | **Quantifies overthinking mechanism** |
| **o3 Thinks Harder Not Longer (2502.15631)** | **partially challenges** | **s1 (2501.19393)** | **s1 claims log-linear scaling; this shows accuracy declines with length** |
| **o3 Thinks Harder Not Longer (2502.15631)** | **partially challenges** | **DeepSeek-R1 (2501.12948)** | **Questions value of extended reasoning traces** |
| **o3 Thinks Harder Not Longer (2502.15631)** | **provides mechanism for** | **Survey of Test-Time Compute (2501.02497)** | **Explains why sequential scaling fails** |
| **System 1/2 Alignment (2502.12470)** | **supports** | **o3 Thinks Harder Not Longer (2502.15631)** | **Both show longer reasoning not always better ("overthinking")** |
| **System 1/2 Alignment (2502.12470)** | **supports** | **Illusion of Thinking (2506.06941)** | **Both identify overthinking as problematic** |
| **System 1/2 Alignment (2502.12470)** | **supports** | **Effective Without Thinking (2504.09858)** | **Both show explicit reasoning sometimes suboptimal** |
| **System 1/2 Alignment (2502.12470)** | **supports** | **Interplay (2512.07783)** | **Both suggest capabilities come from training distribution** |
| **System 1/2 Alignment (2502.12470)** | **extends** | **Overthinking papers** | **Provides dual-process framework for understanding overthinking** |
| **System 1/2 Alignment (2502.12470)** | **provides framework for** | **Pattern matching thesis** | **S1 = fast pattern retrieval; S2 = sequential pattern composition** |
| **System 1/2 Alignment (2502.12470)** | **partially challenges** | **Survey of Test-Time Compute (2501.02497)** | **Questions whether more compute is always beneficial** |
| **Content Effects on Reasoning (2207.07051)** | **supports** | **Faith and Fate (2305.18654)** | **Both show distribution-bounded reasoning; semantic content matters** |
| **Content Effects on Reasoning (2207.07051)** | **supports** | **GSM-Symbolic (2410.05229)** | **Both show content/framing affects performance** |
| **Content Effects on Reasoning (2207.07051)** | **supports** | **Interplay (2512.07783)** | **Both show capabilities from training distribution** |
| **Content Effects on Reasoning (2207.07051)** | **supports** | **Shortcut Learning (2410.13343)** | **Both show models exploit semantic shortcuts** |
| **Content Effects on Reasoning (2207.07051)** | **extends** | **System 1/2 Alignment (2502.12470)** | **Both connect to dual-process; this adds human comparison** |
| **Content Effects on Reasoning (2207.07051)** | **provides evidence for** | **Pattern matching thesis** | **Content effects = direct evidence of learned pattern matching** |
| **Outcome-Based RL (2601.15158)** | **supports** | **Interplay (2512.07783)** | **RL surfaces capability from base model; requires "minimal task proficiency"** |
| **Outcome-Based RL (2601.15158)** | **supports** | **s1 (2501.19393)** | **Both show simple examples seed reasoning patterns** |
| **Outcome-Based RL (2601.15158)** | **extends** | **DeepSeek-R1 (2501.12948)** | **Theoretical analysis of RL-driven reasoning emergence** |
| **Outcome-Based RL (2601.15158)** | **supports** | **Physics of LLMs 2.1 (2407.20311)** | **Both show role of easy examples in learning** |
| **Outcome-Based RL (2601.15158)** | **provides mechanism for** | **Surfacing hypothesis** | **Polynomial convergence with easy examples, exponential without** |
| **Tokenizer Betrays Reasoning (2601.14658)** | **supports** | **Faith and Fate (2305.18654)** | **Both show surface-level pattern matching, not semantic reasoning** |
| **Tokenizer Betrays Reasoning (2601.14658)** | **supports** | **GSM-Symbolic (2410.05229)** | **Both show perturbation sensitivity reveals shallow processing** |
| **Tokenizer Betrays Reasoning (2601.14658)** | **supports** | **Shortcut Learning (2410.13343)** | **Both show models exploit surface patterns** |
| **Tokenizer Betrays Reasoning (2601.14658)** | **supports** | **LLMs Imitate Logical Reasoning (2509.12645)** | **Both show token-level rather than meaning-level processing** |
| **Tokenizer Betrays Reasoning (2601.14658)** | **extends** | **Content Effects on Reasoning (2207.07051)** | **Adds mechanistic explanation for why surface form matters** |
| **Tokenizer Betrays Reasoning (2601.14658)** | **provides mechanism for** | **Pattern matching thesis** | **Models literally cannot see past token IDs to meaning; 72.2% phantom edits are whitespace variants** |
| **Flexibility Trap (2601.15165)** | **supports** | **Measuring Faithfulness (2307.13702)** | **Both show CoT unfaithfulness — logical connectors filled in post-hoc** |
| **Flexibility Trap (2601.15165)** | **supports** | **Illusion of Thinking (2506.06941)** | **Both show reasoning collapses under certain conditions** |
| **Flexibility Trap (2601.15165)** | **supports** | **Faith and Fate (2305.18654)** | **Both show models take shortcuts around genuine reasoning** |
| **Flexibility Trap (2601.15165)** | **provides mechanism for** | **CoT unfaithfulness** | **Logical connectors are "retrospective alignment" not genuine reasoning** |
| **Flexibility Trap (2601.15165)** | **provides mechanism for** | **Pattern matching thesis** | **"Exploitation rather than exploration" — models find easy patterns, avoid uncertainty** |
| **Reasoning-Critical Neurons (2601.19847)** | **supports** | **Emergent Symbolic Mechanisms (2502.20332)** | **Both find identifiable reasoning-related circuits/neurons** |
| **Reasoning-Critical Neurons (2601.19847)** | **supports** | **Algorithmic Primitives (2510.15987)** | **Both identify specific neurons/patterns for reasoning** |
| **Reasoning-Critical Neurons (2601.19847)** | **supports** | **How LLMs Learn to Reason (2509.23629)** | **Both show sparse neural structures for reasoning** |
| **Reasoning-Critical Neurons (2601.19847)** | **provides mechanism for** | **Pattern matching thesis** | **Predictability from early activations (0.83 AUROC) = pattern detection, not step-by-step reasoning** |
| **Reasoning-Critical Neurons (2601.19847)** | **provides mechanism for** | **Surfacing hypothesis** | **Steering surfaces existing capability; cross-task transfer suggests task-agnostic patterns** |
| **WhatCounts (2601.21618)** | **supports** | **Faith and Fate (2305.18654)** | **Both show pattern matching, not algorithms; atomic counting test** |
| **WhatCounts (2601.21618)** | **supports** | **GSM-Symbolic (2410.05229)** | **Both show semantics affect "reasoning"; GSM-Symbolic: irrelevant info; WhatCounts: semantic CLASS** |
| **WhatCounts (2601.21618)** | **supports** | **Content Effects on Reasoning (2207.07051)** | **Both show semantic content determines performance; WhatCounts provides atomic test** |
| **WhatCounts (2601.21618)** | **supports** | **Sequential Enumeration (2512.04727)** | **Both show counting failures; WhatCounts adds semantic variation axis** |
| **WhatCounts (2601.21618)** | **challenges** | **Prompt programming claims** | **Directly rebuts "LLMs implement algorithmic operators" — semantic gap persists even with tools** |
| **WhatCounts (2601.21618)** | **provides evidence for** | **Pattern matching thesis** | **"LLMs do not implement algorithms; they approximate them, and the approximation is argument-dependent"** |
| **Token Bias (2406.11050)** | **supports** | **GSM-Symbolic (2410.05229)** | **Token bias explains why irrelevant information causes 65% accuracy drops** |
| **Token Bias (2406.11050)** | **supports** | **Term Frequencies (2202.07206)** | **Token bias = frequency correlation in different form** |
| **Token Bias (2406.11050)** | **supports** | **Reversal Curse (2309.12288)** | **Both show directional token associations, not relations** |
| **Token Bias (2406.11050)** | **supports** | **Unfaithful CoT (2305.04388)** | **Token bias underlies CoT unfaithfulness** |
| **Token Bias (2406.11050)** | **supports** | **Faith and Fate (2305.18654)** | **Token patterns = linearized subgraph matching** |
| **Token Bias (2406.11050)** | **provides evidence for** | **Pattern matching thesis** | **Statistical hypothesis testing proves token bias drives performance, not reasoning** |
| **Recursive Problems (2305.14699)** | **supports** | **Faith and Fate (2305.18654)** | **Shortcut algorithms = linearized subgraph matching** |
| **Recursive Problems (2305.14699)** | **supports** | **Beyond Memorization (2601.13392)** | **Both show models learn patterns that break on unseen cases** |
| **Recursive Problems (2305.14699)** | **supports** | **Grokked Transformers (2405.15071)** | **Both examine implicit reasoning; this shows recursion-specific failures** |
| **Recursive Problems (2305.14699)** | **supports** | **Planning Gap (2601.14456)** | **ID success doesn't transfer — 82.9% ID → 0% OOD parallels recursive failures** |
| **Recursive Problems (2305.14699)** | **provides evidence for** | **Pattern matching thesis** | **91% failure prediction from reconstructed shortcut algorithms** |
| **ALiBi (2108.12409)** | **supports** | **Theory for Length Generalization (2404.00560)** | **Provides empirical support for architectural approach** |
| **ALiBi (2108.12409)** | **supports** | **Interplay (2512.07783)** | **Capability must exist; ALiBi encodes recency as prior** |
| **ALiBi (2108.12409)** | **partially addresses** | **CoT Mirage (2508.01191)** | **Addresses LENGTH failures but not compositional OOD** |
| **ALiBi (2108.12409)** | **does not address** | **Faith and Fate (2305.18654)** | **Length extrapolation ≠ compositional generalization** |
| **GSM-IC (2302.00093)** | **precursor to** | **GSM-Symbolic (2410.05229)** | **Both show irrelevant info causes dramatic accuracy drops; GSM-IC is foundational ICML 2023 paper** |
| **GSM-IC (2302.00093)** | **supports** | **Token Bias (2406.11050)** | **Irrelevant context = distracting tokens that trigger wrong patterns** |
| **GSM-IC (2302.00093)** | **supports** | **Faith and Fate (2305.18654)** | **Distractibility consistent with linearized subgraph matching — no logical filtering** |
| **GSM-IC (2302.00093)** | **supports** | **Content Effects (2207.07051)** | **Both show semantic content affects reasoning; models don't separate relevant from irrelevant** |
| **GSM-IC (2302.00093)** | **provides evidence for** | **Pattern matching thesis** | **True reasoners would filter irrelevant info; dramatic accuracy drops prove pattern matching** |
| **Sycophantic Anchors (2601.21183)** | **extends** | **Measuring Faithfulness (2307.13702)** | **Sentence-level mechanism for CoT unfaithfulness; counterfactual localization** |
| **Sycophantic Anchors (2601.21183)** | **supports** | **Reasoning Models Don't Say (2505.05410)** | **Both show distinct computational pathways for unfaithful reasoning** |
| **Sycophantic Anchors (2601.21183)** | **supports** | **CoT In The Wild (2503.08679)** | **Mechanistic evidence for unfaithfulness in natural conversational settings** |
| **Sycophantic Anchors (2601.21183)** | **supports** | **Interplay (2512.07783)** | **Sycophancy emerges during generation, not from prompt — supports "generation" dynamics** |
| **Sycophantic Anchors (2601.21183)** | **supports** | **Flexibility Trap (2601.15165)** | **Both show CoT justifies social/easy goals rather than epistemic reasoning** |
| **Sycophantic Anchors (2601.21183)** | **provides mechanism for** | **CoT unfaithfulness** | **20.6pp asymmetry: sycophancy leaves distinctive trace (84.6%), truthful reasoning does not (64%); model "knows" when being sycophantic** |
| **Sycophantic Anchors (2601.21183)** | **provides evidence for** | **Pattern matching thesis** | **Sycophancy follows distinct computational pathway — social goal (pleasing user) vs epistemic goal (finding truth); CoT is justification, not computation record** |
| **Sycophancy Hides Linearly (2601.16644)** | **supports** | **Sycophantic Anchors (2601.21183)** | **Both find sycophancy distinctly encoded; Paper 109: asymmetry; Paper 110: orthogonal to truthfulness** |
| **Sycophancy Hides Linearly (2601.16644)** | **extends** | **Measuring Faithfulness (2307.13702)** | **Mechanistic localization of unfaithfulness to specific attention heads** |
| **Sycophancy Hides Linearly (2601.16644)** | **supports** | **Reasoning Models Don't Say (2505.05410)** | **Truthfulness ≠ deference resistance = distinct computational pathways for truth vs social agreement** |
| **Sycophancy Hides Linearly (2601.16644)** | **supports** | **Interplay (2512.07783)** | **Social cue attention = pattern matching on training distribution** |
| **Sycophancy Hides Linearly (2601.16644)** | **provides mechanism for** | **CoT unfaithfulness** | **MHA steering: 51.7%→25% sycophancy; specific heads attend to doubt cues and trigger deference** |
| **Sycophancy Hides Linearly (2601.16644)** | **provides evidence for** | **Pattern matching thesis** | **Model knows correct answer (truthfulness direction) but abandons it (sycophancy direction) based on social cue pattern matching** |
| **Spurious Rewards Paradox (2601.11061)** | **supports** | **Interplay (2512.07783)** | **RLVR surfaces memorization, not creates reasoning; same "surfacing" mechanism** |
| **Spurious Rewards Paradox (2601.11061)** | **challenges** | **DeepSeek-R1 (2501.12948)** | **RL gains may be contamination-driven, not emergence of reasoning** |
| **Spurious Rewards Paradox (2601.11061)** | **supports** | **No Free Lunch (2506.17219)** | **Both show RL can exploit shortcuts over genuine reasoning** |
| **Spurious Rewards Paradox (2601.11061)** | **supports** | **Faith and Fate (2305.18654)** | **Memorization shortcut = pattern retrieval not reasoning; subgraph matching** |
| **Spurious Rewards Paradox (2601.11061)** | **supports** | **How LLMs Learn to Reason (2509.23629)** | **Provides mechanism for policy collapse and shortcut exploitation** |
| **Spurious Rewards Paradox (2601.11061)** | **provides mechanism for** | **Surfacing hypothesis** | **Anchor-Adapter circuit (L18-20 → L21+) shows exactly how RL activates pre-existing memorization** |
| **Spurious Rewards Paradox (2601.11061)** | **provides evidence for** | **Pattern matching thesis** | **Models improve with INCORRECT rewards = performance is memory retrieval, not reasoning; Perplexity Paradox = model sacrifices language modeling for shortcuts** |
| **CoT Compression Theory (2601.21576)** | **supports** | **Faith and Fate (2305.18654)** | **Both show error accumulation with sequential steps; exponential decay mechanism** |
| **CoT Compression Theory (2601.21576)** | **supports** | **Illusion of Thinking (2506.06941)** | **Both show complexity collapse; high-order interactions fail** |
| **CoT Compression Theory (2601.21576)** | **provides mechanism for** | **Why CoT compression fails** | **Order-r Interaction barrier is fundamental, not training-fixable** |
| **Chains to DAGs (2601.17593)** | **supports** | **Emergent Symbolic Mechanisms (2502.20332)** | **Both find structure in hidden states; DAG probing vs SAE features** |
| **Chains to DAGs (2601.17593)** | **supports** | **How LLMs Learn to Reason (2509.23629)** | **Both find internal structure for reasoning** |
| **Chains to DAGs (2601.17593)** | **does not address** | **OMEGA (2506.18880)** | **Structure exists but no OOD testing** |
| **HalluGuard (2601.18753)** | **supports** | **Faith and Fate (2305.18654)** | **Errors grow exponentially with sequence length; error accumulation** |
| **HalluGuard (2601.18753)** | **supports** | **Interplay (2512.07783)** | **Data-driven component = training distribution mismatch** |
| **HalluGuard (2601.18753)** | **extends** | **Hallucination literature** | **Decomposes into data-driven + reasoning-driven** |
| **Oops Wait (2601.17421)** | **supports** | **Reasoning-Critical Neurons (2601.19847)** | **Both identify token-level signals for reasoning** |
| **Oops Wait (2601.17421)** | **supports** | **Scaling Reasoning Hop (2601.21214)** | **Both show reasoning signals in specific mechanisms** |
| **SOAR (2601.18778)** | **supports** | **Interplay (2512.07783)** | **Meta-RL "sharpens" pretraining knowledge; surfacing mechanism** |
| **SOAR (2601.18778)** | **supports** | **No Free Lunch (2506.17219)** | **Both show self-improvement has limits without external signal** |
| **SOAR (2601.18778)** | **provides evidence for** | **Pattern matching thesis** | **Teaching ≠ solving; pedagogical knowledge from training, not reasoning** |
| **LLM-JEPA (2509.14252)** | **does not address** | **OMEGA (2506.18880)** | **NO OOD testing — cannot assess reasoning vs pattern matching** |
| **LLM-JEPA (2509.14252)** | **does not address** | **Planning Gap (2601.14456)** | **No compositional generalization testing** |
| **Sycophancy (2601.15436)** | **supports** | **Sycophantic Anchors (2601.21183)** | **Both find sycophancy prioritized over truth** |
| **Sycophancy (2601.15436)** | **supports** | **Sycophancy Hides Linearly (2601.16644)** | **Both find systematic sycophancy mechanisms** |
| **Sycophancy (2601.15436)** | **provides evidence for** | **Pattern matching thesis** | **Agreement patterns from RLHF dominate truth-seeking** |
| **Strategic Deception (2311.07590)** | **supports** | **Sycophancy (2601.15436)** | **Both show LLMs prioritize user-pleasing over truth; deception is extreme sycophancy** |
| **Strategic Deception (2311.07590)** | **supports** | **Illusion of Thinking (2506.06941)** | **Both show surface-level task completion without genuine understanding** |
| **Strategic Deception (2311.07590)** | **supports** | **Sycophancy Hides Linearly (2601.16644)** | **Deception may use same linear mechanism as sycophancy** |
| **Strategic Deception (2311.07590)** | **supports** | **HalluGuard (2601.18753)** | **Reasoning-driven deception shares root cause with reasoning-driven hallucination** |
| **Strategic Deception (2311.07590)** | **extends** | **Two Pathways to Truthfulness (2601.07422)** | **Shows what happens when truthfulness pathway is suppressed by pressure** |
| **Strategic Deception (2311.07590)** | **provides evidence for** | **Pattern matching thesis** | **HHH training creates surface compliance; deception emerges from capability, not training** |
| **Detecting Deception (2502.03407)** | **extends** | **Strategic Deception (2311.07590)** | **Same authors; tests linear probe detection on insider trading scenario** |
| **Sycophancy Scales (2308.03958)** | **foundational for** | **Sycophancy (2601.15436)** | **Canonical paper; establishes sycophancy scales with size** |
| **Sycophancy Scales (2308.03958)** | **foundational for** | **Sycophantic Anchors (2601.21183)** | **Enables mechanistic follow-up work** |
| **Sycophancy Scales (2308.03958)** | **foundational for** | **Sycophancy Hides Linearly (2601.16644)** | **Enables linear probe detection work** |
| **Sycophancy Scales (2308.03958)** | **supports** | **Strategic Deception (2311.07590)** | **Sycophancy as precursor to deception; same RLHF cause** |
| **Sycophancy Scales (2308.03958)** | **supports** | **GSM-Symbolic (2410.05229)** | **Both show models override correct reasoning under pressure** |
| **Sycophancy Scales (2308.03958)** | **provides evidence for** | **Pattern matching thesis** | **User-pleasing learned via RLHF dominates truth; INVERSE SCALING** |
| **Truth-Bias Sycophancy (2506.21561)** | **extends** | **Sycophancy Scales (2308.03958)** | **Largest study: 8 LLMs, 4800 judgments; confirms sycophancy in reasoning models** |
| **Truth-Bias Sycophancy (2506.21561)** | **supports** | **Sycophancy (2601.15436)** | **Both find model-specific sycophancy patterns** |
| **Truth-Bias Sycophancy (2506.21561)** | **supports** | **Reasoning Models Don't Say (2505.05410)** | **Both show reasoning models have fundamental limitations** |
| **Truth-Bias Sycophancy (2506.21561)** | **supports** | **Strategic Deception (2311.07590)** | **Truth-bias as precursor to deception** |
| **Truth-Bias Sycophancy (2506.21561)** | **provides evidence for** | **Pattern matching thesis** | **GPT-4.1: 98% truth acc, 16% deception acc = sycophantic asymmetry; R1 MORE biased than V3** |
| **Reasoning Trap (2510.22977)** | **supports** | **Reasoning Models Don't Say (2505.05410)** | **Both show reasoning enhancement has hidden costs** |
| **Reasoning Trap (2510.22977)** | **supports** | **Truth-Bias Sycophancy (2506.21561)** | **Both find reasoning models MORE prone to failures** |
| **Reasoning Trap (2510.22977)** | **extends** | **Interplay (2512.07783)** | **RL surfaces hallucination patterns alongside capabilities** |
| **Reasoning Trap (2510.22977)** | **supports** | **No Free Lunch (2506.17219)** | **Both demonstrate capability-reliability trade-off** |
| **Reasoning Trap (2510.22977)** | **provides evidence for** | **Pattern matching thesis** | **CAUSAL: Math RL → tool halluc; thinking mode → halluc; representation collapse in tool pathways** |
| **Detecting Deception (2502.03407)** | **supports** | **Sycophancy Hides Linearly (2601.16644)** | **Both find behavioral traits linearly encoded in activation space** |
| **Detecting Deception (2502.03407)** | **supports** | **Sycophantic Anchors (2601.21183)** | **Both find internal signals for unfaithful behavior** |
| **Detecting Deception (2502.03407)** | **supports** | **Measuring Faithfulness (2307.13702)** | **Output-based monitoring insufficient; internal monitoring needed** |
| **Detecting Deception (2502.03407)** | **provides method for** | **AI safety monitoring** | **AUROC 0.96-0.999; 95-99% recall at 1% FPR; but "insufficient as robust defence"** |
| **Fundamental Limitations Alignment (2304.11082)** | **supports** | **Strategic Deception (2311.07590)** | **Provides theoretical framework for why persona prompts work; any α>0 behavior triggerable** |
| **Fundamental Limitations Alignment (2304.11082)** | **supports** | **Sycophancy Scales (2308.03958)** | **Sycophancy as activating agreement-seeking component ℙ₋; RLHF increases β** |
| **Fundamental Limitations Alignment (2304.11082)** | **supports** | **Alice in Wonderland (2406.02061)** | **Confabulation accompanies pattern-switched failures; mixture model explains** |
| **Fundamental Limitations Alignment (2304.11082)** | **provides mechanism for** | **Jailbreaks (DAN, Waluigi Effect)** | **BEB theorem: ~3 sentences to trigger any behavior with α>0** |
| **Fundamental Limitations Alignment (2304.11082)** | **provides mechanism for** | **RLHF vulnerabilities** | **RLHF increases β (distinguishability) — makes bad behaviors MORE easily triggered** |
| **Fundamental Limitations Alignment (2304.11082)** | **extends** | **Illusion of Thinking (2506.06941)** | **Provides theoretical foundation for prompt-induced collapse** |
| **Fundamental Limitations Alignment (2304.11082)** | **provides evidence for** | **Pattern matching thesis** | **LLMs = superposition of learned patterns; prompts select activation; no genuine judgment** |
| **Towards Understanding Sycophancy (2310.13548)** | **foundational for** | **Sycophancy (2601.15436)** | **CANONICAL: establishes sycophancy across 5 assistants; methodology foundation** |
| **Towards Understanding Sycophancy (2310.13548)** | **foundational for** | **Sycophantic Anchors (2601.21183)** | **Enables mechanistic follow-up work on sentence-level anchors** |
| **Towards Understanding Sycophancy (2310.13548)** | **foundational for** | **Sycophancy Hides Linearly (2601.16644)** | **Enables linear probe detection work** |
| **Towards Understanding Sycophancy (2310.13548)** | **supports** | **Strategic Deception (2311.07590)** | **Sycophancy as precursor to deception; same RLHF cause** |
| **Towards Understanding Sycophancy (2310.13548)** | **supports** | **Truth-Bias Sycophancy (2506.21561)** | **Both find sycophancy amplifies with reasoning; PM prefers it** |
| **Towards Understanding Sycophancy (2310.13548)** | **supports** | **Illusions of Confidence (2601.05905)** | **Sycophancy pressure collapses beliefs; 98% mistake admission** |
| **Towards Understanding Sycophancy (2310.13548)** | **supports** | **Causal Illusions (2410.11684)** | **Sycophancy amplifies causal illusions; same mechanism** |
| **Towards Understanding Sycophancy (2310.13548)** | **provides mechanism for** | **Pattern matching thesis** | **Human preferences contain sycophancy signal; RLHF learns pattern; 98% abandonment = "challenged = wrong" pattern** |
| **Towards Understanding Sycophancy (2310.13548)** | **provides mechanism for** | **RLHF limitations** | **PM prefers sycophantic 95% over truthful; training signal causally drives behavior** |
| **Conformity of LLMs (2501.13381)** | **supports** | **Towards Understanding Sycophancy (2310.13548)** | **Both show LLMs prioritize social agreement over truth; conformity=sycophancy to peer group** |
| **Conformity of LLMs (2501.13381)** | **supports** | **Sycophancy Scales (2308.03958)** | **Both show larger models don't eliminate social bias problems** |
| **Conformity of LLMs (2501.13381)** | **supports** | **Truth-Bias Sycophancy (2506.21561)** | **Conformity is form of group sycophancy; same mechanism** |
| **Conformity of LLMs (2501.13381)** | **supports** | **Illusions of Confidence (2601.05905)** | **Beliefs collapse under social pressure; same brittleness** |
| **Conformity of LLMs (2501.13381)** | **extends** | **Asch conformity experiments** | **First systematic Asch replication in LLM multi-agent systems** |
| **Conformity of LLMs (2501.13381)** | **provides mechanism for** | **Pattern matching thesis** | **Social context triggers learned patterns of deference; LLMs adopt wrong answers despite knowing correct; reflection restores independence** |
| **Conformity of LLMs (2501.13381)** | **provides mechanism for** | **Multi-agent system failures** | **Collaborative LLMs can produce worse outcomes than individuals due to conformity** |
| **Overthinking o1-Like LLMs (2412.21187)** | **supports** | **CoT Compression (2601.21576)** | **Both show extended CoT often redundant; most tokens wasted** |
| **Overthinking o1-Like LLMs (2412.21187)** | **supports** | **Oops Wait (2601.17421)** | **Both show error correction patterns in long chains; much is fake** |
| **Overthinking o1-Like LLMs (2412.21187)** | **supports** | **To CoT or Not (2409.12917)** | **Both show CoT hurts on simple problems; more thinking ≠ better** |
| **Overthinking o1-Like LLMs (2412.21187)** | **extends** | **Survey of Test-Time Compute (2501.02497)** | **Quantifies inefficiency: shows dark side of scaling test-time compute** |
| **Overthinking o1-Like LLMs (2412.21187)** | **extends** | **Adaptive Inference (2405.15071)** | **Validates need for difficulty-aware compute allocation** |
| **Overthinking o1-Like LLMs (2412.21187)** | **challenges** | **o1 as reasoning breakthrough** | **Much of o1's token use is inefficient pattern repetition** |
| **Overthinking o1-Like LLMs (2412.21187)** | **provides mechanism for** | **Test-time scaling inefficiency** | **Not because reasoning is hard, but because of TRAINED OVERTHINKING PATTERNS** |
| **Overthinking o1-Like LLMs (2412.21187)** | **provides evidence for** | **Pattern matching thesis** | **First answer correct >92%; more thinking for easier problems; repeated strategies; 1,953% overhead on "2+3" = uncontrolled pattern completion** |
| **Underthinking o1-Like LLMs (2501.18585)** | **supports** | **Overthinking (2412.21187)** | **Companion paper; same root cause (uncontrolled pattern generation); complementary finding** |
| **Underthinking o1-Like LLMs (2501.18585)** | **supports** | **Oops Wait (2601.17421)** | **Both show token-level signals don't guide reasoning effectively** |
| **Underthinking o1-Like LLMs (2501.18585)** | **supports** | **Reasoning-Critical Neurons (2601.19847)** | **Both show reasoning predictable from early signals; models don't evaluate paths** |
| **Underthinking o1-Like LLMs (2501.18585)** | **extends** | **Survey of Test-Time Compute (2501.02497)** | **Another failure mode of scaling test-time compute** |
| **Underthinking o1-Like LLMs (2501.18585)** | **provides mechanism for** | **CoT unfaithfulness** | **Models generate reasoning patterns without evaluating them; no metacognitive awareness** |
| **Underthinking o1-Like LLMs (2501.18585)** | **provides evidence for** | **Pattern matching thesis** | **>70% incorrect responses contain correct thought; 418% more switching in incorrect; models can't evaluate reasoning paths; simple decoding penalty fixes it** |
| **Can LLMs Reason and Plan (2403.04121)** | **foundational for** | **Entire thesis** | **Kambhampati's theoretical framework: LLMs = universal approximate retrieval, not reasoning** |
| **Can LLMs Reason and Plan (2403.04121)** | **supports** | **Planning Gap (2601.14456)** | **Obfuscation findings predict ID/OOD gap** |
| **Can LLMs Reason and Plan (2403.04121)** | **supports** | **OMEGA (2506.18880)** | **"Assembly problem" predicts compositional failure** |
| **Can LLMs Reason and Plan (2403.04121)** | **supports** | **Faith and Fate (2305.18654)** | **"Approximate retrieval" = "linearized subgraph matching"** |
| **Can LLMs Reason and Plan (2403.04121)** | **supports** | **Illusion of Thinking (2506.06941)** | **Predicts collapse at complexity thresholds** |
| **Can LLMs Reason and Plan (2403.04121)** | **provides framework for** | **Surfacing hypothesis** | **Fine-tuning = memory compilation, not reasoning creation** |
| **Can LLMs Reason and Plan (2403.04121)** | **provides framework for** | **LLM-Modulo** | **LLMs as idea generators + external verifiers** |
| **Can LLMs Reason and Plan (2403.04121)** | **provides evidence for** | **Self-verification failures** | **Self-critiquing makes performance WORSE; hallucinate both false positives and negatives** |
| **Stop Anthropomorphizing Tokens (2504.09762)** | **extends** | **Can LLMs Reason and Plan (2403.04121)** | **Same author; extends "approximate retrieval" to LRMs** |
| **Stop Anthropomorphizing Tokens (2504.09762)** | **supports** | **Measuring Faithfulness (2307.13702)** | **Provides theoretical grounding: traces disconnected from computation** |
| **Stop Anthropomorphizing Tokens (2504.09762)** | **supports** | **Reasoning Models Don't Say (2505.05410)** | **Both show traces don't reflect actual reasoning** |
| **Stop Anthropomorphizing Tokens (2504.09762)** | **supports** | **Interplay (2512.07783)** | **"Compilation" = surfacing pre-existing patterns** |
| **Stop Anthropomorphizing Tokens (2504.09762)** | **supports** | **Overthinking (2412.21187)** | **No metacognitive awareness of reasoning quality** |
| **Stop Anthropomorphizing Tokens (2504.09762)** | **supports** | **Underthinking (2501.18585)** | **No metacognitive awareness of reasoning quality** |
| **Stop Anthropomorphizing Tokens (2504.09762)** | **provides framework for** | **Understanding LRMs** | **"Compiling reasoning into retrieval via learning"** |
| **Stop Anthropomorphizing Tokens (2504.09762)** | **provides evidence for** | **Pattern matching thesis** | **Incorrect traces OUTPERFORM correct; R1-Zero > R1; trace content irrelevant; "aha" meaningless** |
| **Not All Code Is Equal (2601.21894)** | **supports** | **Demystifying Long CoT (2502.03373)** | **Both show training exposes patterns; complexity-specific > diverse** |
| **Not All Code Is Equal (2601.21894)** | **supports** | **CoT Training Mechanisms (2502.04667)** | **Both analyze training structure effects on reasoning** |
| **Not All Code Is Equal (2601.21894)** | **supports** | **Base Models Know How to Reason (2510.07364)** | **Code complexity surfaces latent patterns** |
| **Not All Code Is Equal (2601.21894)** | **supports** | **WhatCounts (2601.21618)** | **Both show surface properties determine performance** |
| **Not All Code Is Equal (2601.21894)** | **provides evidence for** | **Pattern matching thesis** | **83% of experiments show complexity-restricted training beats diverse; models respond to SURFACE structural properties, not semantic content** |
| **Meta-Thought to Execution (2601.21909)** | **supports** | **Demystifying Long CoT (2502.03373)** | **Both show surfacing hypothesis; CoT as trajectory imitation** |
| **Meta-Thought to Execution (2601.21909)** | **supports** | **CoT Training Mechanisms (2502.04667)** | **Both analyze CoT mechanisms** |
| **Meta-Thought to Execution (2601.21909)** | **supports** | **Not All Code Is Equal (2601.21894)** | **Both show training data structure matters** |
| **Meta-Thought to Execution (2601.21909)** | **challenged by** | **Can ICL Generalize OOD (2410.09695)** | **Real OOD is ~10% accuracy; Paper 141's "OOD" is within-domain (math)** |
| **Meta-Thought to Execution (2601.21909)** | **provides evidence for** | **Pattern matching thesis** | **Diagnoses standard CoT as "trajectory imitation"; +4.63% OOD but OOD = same domain** |
| **System 1&2 Synergy (2601.21414)** | **supports** | **Base Models Know How to Reason (2510.07364)** | **Reasoning is latent, surfaced by configuration (λ parameter)** |
| **System 1&2 Synergy (2601.21414)** | **supports** | **Demystifying Long CoT (2502.03373)** | **Both analyze System 1/System 2 dynamic** |
| **System 1&2 Synergy (2601.21414)** | **supports** | **Not All Code Is Equal (2601.21894)** | **Capability is continuous function of configuration** |
| **System 1&2 Synergy (2601.21414)** | **extends** | **Overthinking (2412.21187)** | **DAMI could address overthinking via dynamic λ** |
| **System 1&2 Synergy (2601.21414)** | **extends** | **Underthinking (2501.18585)** | **DAMI could address underthinking via dynamic λ** |
| **System 1&2 Synergy (2601.21414)** | **provides evidence for** | **Pattern matching thesis** | **Linear interpolation works; "thinking" is quantitative (λ parameter), not qualitative capability** |

### Papers 167-169: Faithfulness and Hallucination Theory

| Paper A | Relationship | Paper B | Evidence |
|---------|--------------|---------|----------|
| **Faithful CoT (2301.13379)** | **extends** | **Measuring Faithfulness (2307.13702)** | Provides constructive solution via neuro-symbolic framework |
| **Faithful CoT (2301.13379)** | **supports** | **Reasoning Models Don't Say (2505.05410)** | Both confirm CoT doesn't reflect internal computation |
| **Faithful CoT (2301.13379)** | **supports** | **CoT In The Wild (2503.08679)** | Both document unfaithfulness; Faithful CoT proposes fix |
| **Faithful CoT (2301.13379)** | **extends** | **Original CoT (2201.11903)** | Proposes solution to CoT's faithfulness limitation |
| **Faithful CoT (2301.13379)** | **provides mechanism for** | **LLM-Modulo (Kambhampati)** | Concrete neuro-symbolic implementation |
| **Faithful CoT (2301.13379)** | **provides evidence for** | **Pattern matching thesis** | LLMs good at TRANSLATION (pattern matching); need SOLVERS for execution |
| **Predictable Compression Failures (2509.11208)** | **extends** | **Hallucination Inevitable (2401.11817)** | Complementary theoretical foundations (compression vs computability) |
| **Predictable Compression Failures (2509.11208)** | **supports** | **HalluGuard (2601.18753)** | Both analyze hallucination mechanisms |
| **Predictable Compression Failures (2509.11208)** | **provides mechanism for** | **CoT Compression (2601.21576)** | Both use information-theoretic analysis |
| **Predictable Compression Failures (2509.11208)** | **provides mechanism for** | **On the Notion that LLMs Reason (2511.11810)** | "Bayesian in expectation" = statistical pattern matching |
| **Predictable Compression Failures (2509.11208)** | **provides evidence for** | **Pattern matching thesis** | Hallucinations = predictable compression failures, not random bugs |
| **Dissociation of Faithful/Unfaithful (2405.15092)** | **extends** | **Measuring Faithfulness (2307.13702)** | Provides mechanistic explanation for unfaithfulness |
| **Dissociation of Faithful/Unfaithful (2405.15092)** | **supports** | **Reasoning Models Don't Say (2505.05410)** | Both confirm hidden vs stated reasoning diverge |
| **Dissociation of Faithful/Unfaithful (2405.15092)** | **supports** | **CoT In The Wild (2503.08679)** | Explains WHY natural prompts show unfaithfulness |
| **Dissociation of Faithful/Unfaithful (2405.15092)** | **supports** | **Unfaithful CoT (2305.04388)** | Same phenomenon, different methodology |
| **Dissociation of Faithful/Unfaithful (2405.15092)** | **extends** | **Faithful CoT (2301.13379)** | Validates need for external verification |
| **Dissociation of Faithful/Unfaithful (2405.15092)** | **challenges** | **DeepSeek-R1 (2501.12948)** | Claims CoT reflects reasoning; this paper shows it often doesn't |
| **Dissociation of Faithful/Unfaithful (2405.15092)** | **provides mechanism for** | **Two reasoning modes** | Divergent effects prove distinct mechanisms |
| **Dissociation of Faithful/Unfaithful (2405.15092)** | **provides evidence for** | **Pattern matching thesis** | Opaque mode = shortcuts that don't involve stated reasoning |

### Papers 170-171: Fluid Representations and Arithmetic Mechanisms

| Paper A | Relationship | Paper B | Evidence |
|---------|--------------|---------|----------|
| **Fluid Representations (2602.04843)** | **supports** | **Base Models Know How to Reason (2510.07364)** | Both show base models have latent capabilities; reasoning training surfaces them |
| **Fluid Representations (2602.04843)** | **supports** | **Demystifying Long CoT (2502.03373)** | Both show extended reasoning enables capabilities already present |
| **Fluid Representations (2602.04843)** | **does not rebut** | **Faith and Fate (2305.18654)** | Compositional failures still occur (96%→35% under obfuscation) |
| **Fluid Representations (2602.04843)** | **does not rebut** | **OMEGA (2506.18880)** | OOD generalization still fails despite representational adaptation |
| **Fluid Representations (2602.04843)** | **provides evidence for** | **Pattern matching thesis** | In-context adaptation is adaptive pattern matching; base model shows same capability |
| **Arithmetic Without Algorithms (2410.21272)** | **strongly supports** | **Faith and Fate (2305.18654)** | "Bag of heuristics" = "linearized subgraph matching" at neuron level |
| **Arithmetic Without Algorithms (2410.21272)** | **provides mechanism for** | **GSM-Symbolic (2410.05229)** | Explains WHY perturbations cause failures — heuristics are pattern-specific |
| **Arithmetic Without Algorithms (2410.21272)** | **supports** | **Term Frequencies (2202.07206)** | Frequency-based patterns are a type of heuristic |
| **Arithmetic Without Algorithms (2410.21272)** | **supports** | **Token Bias (2406.11050)** | Token bias = heuristic-like pattern matching |
| **Arithmetic Without Algorithms (2410.21272)** | **provides mechanism for** | **Illusion of Thinking (2506.06941)** | Complexity collapse = heuristics fail at scale |
| **Arithmetic Without Algorithms (2410.21272)** | **provides mechanism for** | **Alice in Wonderland (2406.02061)** | Simple task failures = missing heuristics for unusual patterns |
| **Arithmetic Without Algorithms (2410.21272)** | **extends** | **Recursive Problems (2305.14699)** | "Shortcut algorithms" = bag of heuristics |
| **Arithmetic Without Algorithms (2410.21272)** | **provides evidence for** | **Pattern matching thesis** | MECHANISTIC SMOKING GUN: 91% of important neurons implement heuristics, not algorithms |

### Paper 172: Unfaithful Reasoning Emergence

| Paper A | Relationship | Paper B | Evidence |
|---------|--------------|---------|----------|
| **Unfaithful Reasoning Emergence (2602.01017)** | **strongly supports** | **Dissociation of Faithful/Unfaithful (2405.15092)** | Both show two distinct reasoning modes with different mechanisms |
| **Unfaithful Reasoning Emergence (2602.01017)** | **provides mechanism for** | **Unfaithful CoT (2305.04388)** | Explains WHY CoT is often unfaithful — noise threshold |
| **Unfaithful Reasoning Emergence (2602.01017)** | **supports** | **Measuring Faithfulness (2307.13702)** | Validates intervention-based faithfulness methodology |
| **Unfaithful Reasoning Emergence (2602.01017)** | **provides mechanism for** | **Faith and Fate (2305.18654)** | Explains how linearized pattern matching emerges from training |
| **Unfaithful Reasoning Emergence (2602.01017)** | **provides mechanism for** | **Illusion of Thinking (2506.06941)** | Complexity threshold = noise threshold for faithful→unfaithful |
| **Unfaithful Reasoning Emergence (2602.01017)** | **supports** | **Arithmetic Without Algorithms (2410.21272)** | Bag of heuristics = skip-step reasoning mode |
| **Unfaithful Reasoning Emergence (2602.01017)** | **extends** | **Demystifying Long CoT (2502.03373)** | Adds training dynamics perspective on CoT emergence |
| **Unfaithful Reasoning Emergence (2602.01017)** | **extends** | **CoT Training Mechanisms (2502.04667)** | Both use controlled synthetic experiments on arithmetic |
| **Unfaithful Reasoning Emergence (2602.01017)** | **provides evidence for** | **Pattern matching thesis** | Skip-step reasoning (bypassing CoT) is DEFAULT under realistic training noise |

### Paper 173: One Token to Fool LLM-as-a-Judge

| Paper A | Relationship | Paper B | Evidence |
|---------|--------------|---------|----------|
| **One Token to Fool (2507.08794)** | **extends** | **Gaming the Judge (2601.14691)** | Same attack surface (CoT manipulation), but minimal (single token) |
| **One Token to Fool (2507.08794)** | **supports** | **Measuring Faithfulness (2307.13702)** | Both show CoT evaluation is superficial pattern matching |
| **One Token to Fool (2507.08794)** | **supports** | **Reasoning Models Don't Say (2505.05410)** | Both show reasoning appearance ≠ reasoning reality |
| **One Token to Fool (2507.08794)** | **supports** | **Semantic Deception (2512.20812)** | Both show surface patterns override content |
| **One Token to Fool (2507.08794)** | **supports** | **Lexical Hints (2508.15842)** | Both identify specific tokens that signal behavior |
| **One Token to Fool (2507.08794)** | **provides evidence for** | **Pattern matching thesis** | Single tokens (":", ".") trigger positive rewards — pure statistical association, not reasoning evaluation |

### Paper 174: Inverse Scaling in Test-Time Compute (TMLR Featured)

| Paper A | Relationship | Paper B | Evidence |
|---------|--------------|---------|----------|
| **Inverse Scaling TTC (2507.14417)** | **supports** | **Illusion of Thinking (2506.06941)** | Both show reasoning collapse; this adds INVERSE scaling evidence |
| **Inverse Scaling TTC (2507.14417)** | **supports** | **Overthinking (2412.21187)** | Both show more tokens can hurt; systematic evidence |
| **Inverse Scaling TTC (2507.14417)** | **supports** | **Underthinking (2501.18585)** | Complementary failure modes |
| **Inverse Scaling TTC (2507.14417)** | **supports** | **GSM-Symbolic (2410.05229)** | Distraction failure = irrelevant info sensitivity |
| **Inverse Scaling TTC (2507.14417)** | **supports** | **Faith and Fate (2305.18654)** | Spurious correlations = pattern matching |
| **Inverse Scaling TTC (2507.14417)** | **supports** | **o3 Thinks Harder (2502.15631)** | Both challenge test-time compute scaling |
| **Inverse Scaling TTC (2507.14417)** | **challenges** | **Survey of Test-Time Compute (2501.02497)** | Provides counter-evidence to scaling claims |
| **Inverse Scaling TTC (2507.14417)** | **challenges** | **s1 (2501.19393)** | Challenges log-linear scaling assumption |
| **Inverse Scaling TTC (2507.14417)** | **provides evidence for** | **Pattern matching thesis** | More reasoning = more pattern matching errors; no metacognitive control |

### Paper 175: Uncommon Meanings of Common Words (NAACL 2024)

| Paper A | Relationship | Paper B | Evidence |
|---------|--------------|---------|----------|
| **Uncommon Meanings (2405.05741)** | **supports** | **Term Frequencies (2202.07206)** | Both show frequency determines performance; uncommon meanings = low frequency |
| **Uncommon Meanings (2405.05741)** | **supports** | **Faith and Fate (2305.18654)** | Both show distribution-bounded understanding; "stochastic parrots" |
| **Uncommon Meanings (2405.05741)** | **supports** | **Reversal Curse (2309.12288)** | Both show frequency-dependent learning; unidirectional token associations |
| **Uncommon Meanings (2405.05741)** | **supports** | **Token Bias (2406.11050)** | Token frequency → performance correlation; high-frequency meanings dominate |
| **Uncommon Meanings (2405.05741)** | **supports** | **GSM-Symbolic (2410.05229)** | Both show training distribution bounds understanding; novel = failure |
| **Uncommon Meanings (2405.05741)** | **provides evidence for** | **Pattern matching thesis** | GPT-4 lags 16-year-old humans by 3.9%; GPT-3.5 by 22.3%; authors cite "stochastic parrots" |

### Paper 176: LiveCodeBench Pro (Olympiad Medalists Judge LLMs)

| Paper A | Relationship | Paper B | Evidence |
|---------|--------------|---------|----------|
| **LiveCodeBench Pro (2506.11928)** | **supports** | **Illusion of Thinking (2506.06941)** | Both show complete failure at complexity thresholds; 0% on hard tier |
| **LiveCodeBench Pro (2506.11928)** | **supports** | **Faith and Fate (2305.18654)** | Both show distribution-bounded capabilities; "patterns appear verbatim in training data" |
| **LiveCodeBench Pro (2506.11928)** | **supports** | **OMEGA (2506.18880)** | Same compositional/complexity collapse pattern |
| **LiveCodeBench Pro (2506.11928)** | **supports** | **Planning Gap (2601.14456)** | ID→OOD accuracy gap; easy→hard collapse (83% easy → 0% hard) |
| **LiveCodeBench Pro (2506.11928)** | **supports** | **GSM-Symbolic (2410.05229)** | Both show training distribution bounds performance |
| **LiveCodeBench Pro (2506.11928)** | **supports** | **SWE-Bench Illusion (2506.12286)** | Both show high benchmark scores reflect memorization, not reasoning |
| **LiveCodeBench Pro (2506.11928)** | **supports** | **Proof or Bluff (2503.21934)** | Both show frontier models fail completely on expert-level problems |
| **LiveCodeBench Pro (2506.11928)** | **provides evidence for** | **Pattern matching thesis** | Knowledge-heavy success = "patterns appear verbatim"; observation-heavy failure = "cannot be retrieved from memorized snippets" |

### Paper 177: Abstract Reasoning Without CoT (Mila/McGill)

| Paper A | Relationship | Paper B | Evidence |
|---------|--------------|---------|----------|
| **Abstract vs Compute (2505.23701)** | **supports** | **Faith and Fate (2305.18654)** | Both show pattern matching mechanism; abstraction = learned associations |
| **Abstract vs Compute (2505.23701)** | **supports** | **Arithmetic Without Algorithms (2410.21272)** | Both show computation via heuristics, not algorithms |
| **Abstract vs Compute (2505.23701)** | **supports** | **Emergent Symbolic Mechanisms (2502.20332)** | Both find identifiable mechanisms for reasoning components |
| **Abstract vs Compute (2505.23701)** | **supports** | **How LLMs Learn to Reason (2509.23629)** | Both show internal mechanisms for reasoning mode activation |
| **Abstract vs Compute (2505.23701)** | **extends** | **Demystifying Long CoT (2502.03373)** | Adds computation vs abstraction distinction to CoT analysis |
| **Abstract vs Compute (2505.23701)** | **extends** | **GSM-Symbolic (2410.05229)** | Explains WHY perturbations fail: abstraction OK, computation fails |
| **Abstract vs Compute (2505.23701)** | **provides evidence for** | **Pattern matching thesis** | CoT: +58.7% computation vs +6.7% abstraction; abstract-then-compute = pattern retrieval then execution |

### Paper 178: Trilemma of Truth (NeurIPS 2025 Workshop)

| Paper A | Relationship | Paper B | Evidence |
|---------|--------------|---------|----------|
| **Trilemma of Truth (2506.23921)** | **supports** | **Faith and Fate (2305.18654)** | Both show distribution-bounded knowledge; training determines "truth" |
| **Trilemma of Truth (2506.23921)** | **supports** | **Sycophancy Hides Linearly (2601.16644)** | Both find asymmetric encoding of truth-related signals |
| **Trilemma of Truth (2506.23921)** | **supports** | **Measuring Faithfulness (2307.13702)** | Both show probing can find spurious correlations |
| **Trilemma of Truth (2506.23921)** | **supports** | **Hallucination Inevitable (2401.11817)** | Both suggest fundamental limits on truth assessment |
| **Trilemma of Truth (2506.23921)** | **extends** | **Emergent Symbolic Mechanisms (2502.20332)** | Adds veracity-specific mechanistic analysis |
| **Trilemma of Truth (2506.23921)** | **provides evidence for** | **Pattern matching thesis** | "Probabilistic knowledge" = learned associations from training; binary probes confounded by spurious correlations |

### Paper 179: LLMs and Emergence (Melanie Mitchell, Santa Fe Institute)

| Paper A | Relationship | Paper B | Evidence |
|---------|--------------|---------|----------|
| **LLMs & Emergence (2506.11135)** | **supports** | **Faith and Fate (2305.18654)** | Both argue capabilities are distribution-bounded, not generalizable |
| **LLMs & Emergence (2506.11135)** | **supports** | **Emergent Abilities Mirage (2304.15004)** | Both question emergence claims; metrics artifact |
| **LLMs & Emergence (2506.11135)** | **supports** | **OMEGA (2506.18880)** | Both show compositional generalization fails |
| **LLMs & Emergence (2506.11135)** | **supports** | **Illusion of Thinking (2506.06941)** | Both distinguish capability from intelligence |
| **LLMs & Emergence (2506.11135)** | **extends** | **Emergent Symbolic Mechanisms (2502.20332)** | Provides theoretical framing (KO vs KI emergence) |
| **LLMs & Emergence (2506.11135)** | **provides theoretical framework for** | **Pattern matching thesis** | "Emergent capability ≠ emergent intelligence"; "Rube Goldberg logic"; "more is more" vs "less is more" |

### CoT Foundational Papers (151-156)

| Paper A | Relationship | Paper B | Evidence |
|---------|--------------|---------|----------|
| **Original CoT (2201.11903)** | **foundational for** | **Zero-Shot CoT (2205.11916)** | Wei et al. → Kojima et al. zero-shot extension |
| **Original CoT (2201.11903)** | **foundational for** | **Self-Consistency (2203.11171)** | Wei et al. → Wang et al. majority voting |
| **Original CoT (2201.11903)** | **foundational for** | **CoT Expressivity (2310.07923)** | Merrill & Sabharwal prove Wei's claims theoretically |
| **Original CoT (2201.11903)** | **challenged by** | **Unfaithful CoT (2305.04388)** | Paper 148: CoT makes bias WORSE |
| **Original CoT (2201.11903)** | **challenged by** | **Term Frequencies (2202.07206)** | Paper 147: Frequency determines accuracy, not reasoning |
| **Zero-Shot CoT (2205.11916)** | **extends** | **Original CoT (2201.11903)** | Eliminates exemplar requirement |
| **Zero-Shot CoT (2205.11916)** | **challenged by** | **Unfaithful CoT (2305.04388)** | Bias susceptibility in zero-shot prompting |
| **Self-Consistency (2203.11171)** | **extends** | **Original CoT (2201.11903)** | Majority voting on diverse CoT paths |
| **Self-Consistency (2203.11171)** | **challenged by** | **CoT Mirage (2508.01191)** | Voting won't help when OOD=0% |
| **CoT Expressivity (2310.07923)** | **provides theory for** | **Original CoT (2201.11903)** | Proves CoT adds computational power |
| **CoT Expressivity (2310.07923)** | **theoretically contradicted by** | **Planning Abilities (2305.15771)** | Theory: poly-CoT = P; Practice: ~12% success |
| **CoT Expressivity (2310.07923)** | **theoretically contradicted by** | **PlanBench (2206.10498)** | Same theory-practice gap |
| **CoT Expressivity (2310.07923)** | **theoretically contradicted by** | **o1 on PlanBench (2409.13373)** | Even o1: 97.8% → 23.6% on complexity |
| **PlanBench (2206.10498)** | **provides benchmark for** | **Planning Abilities (2305.15771)** | Same Kambhampati research group |
| **PlanBench (2206.10498)** | **provides benchmark for** | **o1 on PlanBench (2409.13373)** | Same benchmark, tests reasoning models |
| **o1 on PlanBench (2409.13373)** | **extends** | **Planning Abilities (2305.15771)** | Tests o1 on same benchmark as GPT-4 |
| **o1 on PlanBench (2409.13373)** | **extends** | **PlanBench (2206.10498)** | Tests reasoning models on PlanBench |
| **o1 on PlanBench (2409.13373)** | **supports** | **Illusion of Thinking (2506.06941)** | Same complexity collapse pattern |
| **o1 on PlanBench (2409.13373)** | **supports** | **Faith and Fate (2305.18654)** | Surface form dependence (Mystery BW) |

### Paper 157: Token Bias (EMNLP 2024)

| Paper A | Relationship | Paper B | Evidence |
|---------|--------------|---------|----------|
| **Token Bias (2406.11050)** | **supports** | **GSM-Symbolic (2410.05229)** | Token bias explains irrelevant info sensitivity |
| **Token Bias (2406.11050)** | **supports** | **Reversal Curse (2309.12288)** | Both show directional token associations |
| **Token Bias (2406.11050)** | **supports** | **Term Frequencies (2202.07206)** | Token bias = frequency correlation |
| **Token Bias (2406.11050)** | **supports** | **Unfaithful CoT (2305.04388)** | Token bias underlies CoT unfaithfulness |
| **Token Bias (2406.11050)** | **supports** | **Faith and Fate (2305.18654)** | Statistical pattern matching mechanism |
| **Token Bias (2406.11050)** | **provides mechanism for** | **Pattern matching thesis** | 91% failure prediction from surface token patterns |


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
| **TMBench (2504.20771)** | **Gemini 94% at 30 steps; BUT inevitable failure at steps 16-683; "statistical nature" limits; supports bounded capability** |
| **Physics of LLMs Part 2.1 (2407.20311)** | **CHALLENGES thesis: 90%+ OOD length generalization; mental planning; learns beyond training; BUT GPT-4 fails on task; authors disclaim generalization** |
| **FaithCoT-Bench (2510.04040)** | **Instance-level unfaithfulness detection; 20% ID → 74% OOD unfaithfulness; correct ≠ faithful; best detection F1 <80%** |
| **Societies of Thought (2601.10825)** | **Multi-agent dialogue mechanism; steering doubles accuracy; RL spontaneously develops conversational patterns; BUT no OOD testing** |
| **Thinking by Doing (2511.23476)** | **WMAct 78.57% vs EntirePlan 49.12%; modest transfer +5.05 HMMT25; BUT requires pre-existing capability; "Hard" = same domain, larger scale** |
| **Bias and CoT Faithfulness (2505.23945)** | **SFT training = NO faithfulness improvement; RL only helps for explicit biases; visual biases ~0% articulation; CelebA 0% articulation across ALL models** |
| **Chess Compositionality (2510.20783)** | **96%+ rule extrapolation OOD; BUT strategy adaptation fails 70%→22%; Horde (different objective) last place; rules ≠ reasoning** |
| **Mechanistic Counting (2601.02989)** | **System-1 counting: 0% at 41-50 items; CoT alone: 0%; Structure+CoT: 24-86%; external scaffolding required; architectural depth limits counting** |
| **CogniLoad (2509.18458)** | **Task length dominant constraint; only gpt-5 (76%) and o3 (68%) >50% at N=250; state-tracking errors dominate; model capacity varies 400x (ECL50: 0-382.8)** |
| **Instruction-Tuned Not Better (2601.13244)** | **Base models win by 27-33pp in zero-shot; domain shift: base wins by 33pp; perturbation: 38-62% relative drop; instruction tuning creates prompt dependencies** |
| **FRIT (2509.13334)** | **Baseline CoT faithfulness: 32.9% (Qwen GSM8K); traditional faithfulness: 8.9%; FRIT improves both faithfulness (+3.4pp) and accuracy (+7.6pp); accuracy emerges from faithfulness** |
| **Mapping Faithful Reasoning (2510.22362)** | **Easy cases: decorative reasoning (transient perturbation effects); Hard cases: computational reasoning (sustained shifts); Concept Walk method distinguishes faithful from unfaithful** |
| **IOI Minimal Circuits (2510.25013)** | **2-head model sufficient for perfect IOI; additive-contrastive mechanism; single head provably insufficient; task-constrained training finds simpler circuits than pre-training** |
| **RADAR (2510.08931)** | **93% accuracy distinguishing recall vs reasoning; early convergence = recall (pattern matching); distributed attention = reasoning; 100% on clear cases; 76.7% on ambiguous** |
| **Hierarchical Thinking FSM (2510.22437)** | **FSM framework for reasoning; length helps math (43%→83%) but can HURT factual (Qwen: longest chains, lower GPQA accuracy); adaptive transitions characterize strong models** |
| **LLMs Truly Grasp Addition (2504.05262)** | **99.81%→7.51% symbolic (Claude); 1,700+ commutativity violations (A+B≠B+A); rule provision HURTS (-81.2%); SFT: 97.17% numerical, 0% symbolic transfer; STRONGEST evidence for pattern matching** |
| **PhD-Level Math Reasoning (2512.13978)** | **~66% accuracy ceiling on Motwani-Raghavan textbook proofs; Claude best (66.4%), Grok-4 worst (33.2%); chapter variance suggests pattern-dependence; BALANCED — tests reproduction not invention** |
| **Shortcut Learning (2410.13343)** | **LLMs rely on shortcuts; INVERSE SCALING: larger models MORE susceptible; >40% drops on constituent shortcut; overconfidence masks poor reasoning; few-shot underperforms zero-shot** |
| **MMLU-Pro+ (2409.02257)** | **Anchoring bias: models stick to original choices; -14.3pp drop GPT-4o; struggle with multiple correct answers; CPI ratio shows 3.7x variation; provides SSR/CPI metrics for shortcut detection** |
| **Unsupervised Decoding (2512.01222)** | **Logit lens decodes ROT-13 at ~75% accuracy (layer 58); internal representations anchor to English; unsupervised pipeline achieves ~7/10 grader score; BUT ROT-13 is trivial encoding; doesn't address pattern matching vs reasoning** |
| **Unveiling Causal Reasoning (2506.21215)** | **Level-1 vs Level-2 causal reasoning framework; 99.1%→69.2% drop Claude (COPA→CausalProbe-H); autoregression ≠ logical causality; temporal freshness test; STRONGLY SUPPORTS pattern matching thesis** |
| **Emergent Abilities Survey (2503.05788)** | **Survey of 100+ papers; "memorization competes with generalization"; some emergence real (module arithmetic); pre-training loss predicts emergence (correlational); LRMs = LLM + RL + search; BALANCED** |
| **Survey of Test-Time Compute (2501.02497)** | **Comprehensive survey; self-correction "not guaranteed" without external feedback; LLMs can correct errors but can't LOCATE them; no universal test-time scaling law; LRMs "struggle to generalize to cross-domain tasks"; SUPPORTS thesis** |
| **Theory for Length Generalization (2404.00560)** | **LG achievable IFF: |X|<infinity (finite input space), D=X (training covers all inputs), specific representation engineering; impossibility result for infinite X; BALANCED but supports thesis on close reading** |
| **Survey of Inductive Reasoning (2510.10182)** | **"Inductive ability originates from induction heads"; "Induction means simplicity"; "No universal bias" = task-specific engineering required; test-time scaling = searching through learned patterns; enhancement methods don't create reasoning; SUPPORTS thesis** |
| **Limits of Emergent Reasoning Agentic (2510.15974)** | **Agentic framework makes collapse WORSE (earlier than baseline); ~40% deterministic looping; JSD diverges from BOTH optimal AND random policies; "high-probability mode following, not genuine reasoning"; REBUTS Agentic Gap; STRONGLY SUPPORTS thesis** |
| **Compositional-ARC (2504.01445)** | **LLMs fail systematicity: o3-mini 0.53%, GPT-4o 0.99% on novel compositions; 5.7M MLC model (78.26%) beats 8B+ LLMs; TTT needed for LLM success (0.7%→78%); 3-shot success + systematicity failure = memorization not reasoning; STRONGLY SUPPORTS thesis** |
| **KUP Memorization vs Reasoning (2504.12523)** | **ALL methods <2% on indirect probing (reasoning); direct probing 70-80% (memorization); "memorize updates but fail to reason over implications"; H&M Russia example; <2% across ALL CPT methods; STRONGLY SUPPORTS thesis** |
| **LoopBench (2512.13713)** | **O3 achieves 55-72% proximity on symmetry breaking; GPT-4.1/O3-mini fail (0-4%); O3 develops "wait" strategies; GPT-5.1 rediscovers node ID priority; Discovery-Implementation Gap; BALANCED — O3 shows reasoning but most models fail** |
| **CRV Verifying CoT (2510.09312)** | **92.47% AUROC on arithmetic vs 76.45% baseline; error signatures domain-specific (transfer fails 92%→55%); causal interventions work; "reasoning failure = flaw in execution of latent algorithm"; BALANCED** |
| **Iterative ICL Algebraic (2509.01267)** | **Zero-shot: 13-35% on non-standard precedence (high school level task); rule override fails; simpler examples often work BETTER than complex ones; complexity collapse: 97%→47% (db(1,6)→db(3,20)); SUPPORTS thesis** |
| **Revisiting Compositional Gen (2506.15629)** | **ACL 2025; Best model only 75% ordered coverage; 36 LLMs tested; identical outputs despite different orderings; instructions improve (+55pp) but don't solve; understanding ≠ execution; SUPPORTS thesis** |
| **STEPS (2601.03676)** | **Power-law distribution explains compositional failure; 4K targeted > 52K random; unconstrained diversity HURTS instruct models; "sweet spot" needed; tool use ≠ reasoning; SUPPORTS thesis (with mitigation path)** |
| **Survey Latent CoT (2505.16782)** | **Comprehensive survey of latent CoT reasoning; "unclear whether genuine reasoning or exploiting input-output correlations"; expressive redundancy + semantic bottleneck in explicit CoT; BALANCED** |
| **CryptoX (2502.07813)** | **40-54pp drops with encoding; huge open/closed gap (AUC 2.47 vs 4.05); mechanistic analysis shows hierarchical subtask processing; o1 maintains 84% at 10 words encoded; SUPPORTS thesis** |
| **CoT Monitorability (2510.27378)** | **Introduces verbosity as complement to faithfulness; Monitorability = Faithfulness + Verbosity; models appear faithful but leave out key factors; SUPPORTS thesis** |
| **Reasoning Abilities ARC (2403.11793)** | **LoTH framework (Logical Coherence, Compositionality, Productivity); 10.6% correct answers but only 4.0% correct processes (60% lucky); 0% on Medium/Hard ARC; 1D-ARC 90% vs ARC 10%; SUPPORTS thesis** |
| **Inference-Time Scaling Complex (2504.00294)** | **9 models × 8 benchmarks; longer tokens ≠ better accuracy; GPT-4o approaches O1 with 256× superscaling on easy TSP; complexity collapse persists; BALANCED** |
| **PCL-Reasoner-V1.5 (2601.14716)** | **90.9% AIME 2024, 85.6% AIME 2025 via offline RL; RL improves long-CoT specifically; depends on DeepSeek-R1 distillation; FOR (partial) — supports surfacing** |
| **Interactive Learning ILR (2509.26306)** | **Multi-agent co-learning improves individual reasoning by 3-5%; dynamic cooperation/competition; Idea3 enhances robustness; no OOD testing; BALANCED** |
| **Revisiting LLM Reasoning via IB (2507.18391)** | **IB regularization (one-line change) improves RL by ~2 points; reconciles entropy debate; token-level advantage × entropy; BALANCED** |
| **Trapped in the Past (2601.16823)** | **Crystallized vs fluid intelligence in chess; WD: good, OOD: random; reasoning tokens have diminishing returns OOD; STRONGLY SUPPORTS thesis** |
| **o3 Thinks Harder Not Longer (2502.15631)** | **Accuracy DECLINES as reasoning chains grow (3.16%/1000 tokens for o1-mini); o3-mini thinks harder, not longer; SUPPORTS thesis** |
| **System 1/2 Alignment (2502.12470)** | **S2 excels at arithmetic (AddSub +9pp), S1 excels at commonsense (+7pp StrategyQA); uniform reasoning suboptimal; entropy-based selection beats both; BALANCED** |
| **Content Effects on Reasoning (2207.07051)** | **PNAS Nexus peer-reviewed; LLMs show human-like content effects on NLI, syllogisms, Wason task; 90% endorse invalid syllogism if believable; model confidence ↔ human RT; SUPPORTS thesis** |
| **On the Notion that Language Models Reason (2511.11810)** | **NeurIPS 2025 Workshop; LMs as Markov kernels mapping contexts to distributions; "reasoning" = statistical regularities in kernel; explicitly defends "statistical pattern matchers" claim; proposes "inference" not "reasoning"; STRONGLY SUPPORTS thesis** |
| **Reasoning or Reciting (2307.02477)** | **NAACL 2024; foundational counterfactual methodology; 11 tasks; high CCC + low CF performance = understanding ≠ reasoning; "narrow, non-transferable procedures"; 40pp drop on counterfactual tasks; STRONGLY SUPPORTS thesis** |
| **Reasoning Promotes Robustness ToM (2601.16853)** | **Robustness ≠ new capability; bounded by base model; ToM strategies visible in traces; BALANCED — supports surfacing** |
| **MortalMATH (2601.18790)** | **>95% task completion while user dying; RLVR creates tunnel vision; consequence blindness; 15s latency in emergencies; STRONGLY SUPPORTS thesis** |
| **WhatCounts (2601.21618)** | **>40% accuracy variation depending SOLELY on semantic class (cities vs chemicals vs emojis); better models have LARGER gaps; fine-tuning shifts biases unpredictably; even with Python tools, agents inherit semantic gap; "LLMs do not implement algorithms"; STRONGEST evidence for pattern matching at atomic level** |
| **Sycophantic Anchors (2601.21183)** | **84.6% vs 64% probe accuracy asymmetry; sycophancy distinctly encoded; emerges during reasoning (55%→73%); R²=0.74 commitment strength; "sycophancy leaves a trace truthful reasoning does not"** |
| **Sycophancy Hides Linearly (2601.16644)** | **Truthfulness ≠ deference resistance (cosine=-0.22, 32% overlap); MHA steering: 51.7%→25% sycophancy; sycophancy heads attend to doubt tokens; "distinct mechanisms"** |
| **Spurious Rewards Paradox (2601.11061)** | **Models improve EVEN WITH INCORRECT REWARDS; Perplexity Paradox (answer PPL↓, prompt PPL↑); Anchor-Adapter circuit (L18-20→L21+); "RLVR acts as retrieval mechanism for data already memorized during pretraining"** |
| **Reasoning or Guessing? HRM (2601.10679)** | **HRM "guesses" fixed points, doesn't reason incrementally; fails on 1-cell puzzles (~25% instability); "grokking" dynamics; scaling guesses (54.5%→96.9%) >> improving reasoning; "if deliberative reasoning, number of attempts typically matters less"; STRONGLY SUPPORTS thesis** |
| **Two Pathways to Truthfulness (2601.07422)** | **Q-Anchored (knowledge retrieval, 87% acc, popular entities) vs A-Anchored (fabrication detection, 68% acc, long-tail); bimodal distribution in saliency; self-aware of pathway distinctions (87-93% AUC); knowledge boundary = training distribution boundary; SUPPORTS thesis** |

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
| 2026-01-24 | Added TMBench (2504.20771) — "Inevitable failure" at steps 16-683 supports bounded capability; r=0.882 with reasoning benchmarks |
| 2026-01-24 | Added Physics of LLMs Part 2.1 (2407.20311) — STRONGEST challenge to thesis; genuine OOD generalization; but GPT-4 fails, authors disclaim |
| 2026-01-24 | Added FaithCoT-Bench (2510.04040) — Instance-level faithfulness; 20% → 74% OOD unfaithfulness; strongest unfaithfulness evidence |
| 2026-01-24 | Added Societies of Thought (2601.10825) — Multi-agent dialogue mechanism; explains HOW reasoning models work; no OOD testing |
| 2026-01-24 | Added Thinking by Doing (2511.23476) — WMAct training; modest transfer; requires pre-existing capability |
| 2026-01-24 | Added Bias and CoT Faithfulness (2505.23945) — SFT = no improvement; visual biases unfaithful; CelebA 0% articulation |
| 2026-01-24 | Added Chess Compositionality (2510.20783) — Rule extrapolation works (96%), strategy fails (70%→22%); rules ≠ reasoning |
| 2026-01-24 | Added Mechanistic Counting (2601.02989) — System-1 counting collapses at ~30; CoT alone doesn't help; needs structure |
| 2026-01-24 | Added CogniLoad (2509.18458) — Task length dominant; only 2 models >50% at N=250; state-tracking errors; 400x capacity range |
| 2026-01-24 | Added Instruction-Tuned Not Better (2601.13244) — Base models win in zero-shot by 27-33pp; instruction tuning creates prompt dependencies |
| 2026-01-24 | Added FRIT (2509.13334) — Baseline faithfulness 32.9%; accuracy emerges from faithfulness training; intervention-based testing |
| 2026-01-24 | Added Mapping Faithful Reasoning (2510.22362) — Concept Walk method; easy=decorative, hard=computational; mechanistic distinction |
| 2026-01-24 | Added IOI Minimal Circuits (2510.25013) — 2-head sufficient; additive-contrastive mechanism; task-constrained training simpler |
| 2026-01-24 | Added RADAR (2510.08931) — 93% recall vs reasoning detection; early convergence = pattern matching; mechanistic contamination detection |
| 2026-01-24 | Added Hierarchical Thinking FSM (2510.22437) — FSM framework; length helps math but can hurt factual; adaptive transitions in strong models |
| 2026-01-24 | Added LLMs Truly Grasp Addition (2504.05262) — STRONGEST pattern matching evidence: 99.8%→7.5% symbolic, 1,700+ commutativity violations, 0% SFT transfer |
| 2026-01-24 | Added PhD-Level Math Reasoning (2512.13978) — 66% ceiling on Motwani-Raghavan proofs; BALANCED (tests reproduction not invention) |
| 2026-01-24 | Added Shortcut Learning (2410.13343) — Inverse scaling (larger = more shortcuts); >40% drops; overconfidence |
| 2026-01-24 | Added MMLU-Pro+ (2409.02257) — Anchoring bias; -14.3pp GPT-4o drop; CPI ratio 3.7x variation; NeurIPS 2024 |
| 2026-01-24 | Added Unsupervised Decoding (2512.01222) — Logit lens decodes ROT-13 ~75%; internal representations anchor to English; BALANCED (doesn't address pattern matching) |
| 2026-01-24 | Added Unveiling Causal Reasoning (2506.21215) — Level-1/Level-2 framework; 99.1%→69.2% drop on fresh data; STRONGLY SUPPORTS thesis |
| 2026-01-24 | Added Hardness of Faithful CoT (2406.10625) — Faithfulness-accuracy tradeoff; ALL interventions fail; larger models LESS faithful; GPT-4 correct WITHOUT CoT |
| 2026-01-24 | Added Revisiting Test-Time Scaling (2502.12215) — Correct solutions SHORTER than incorrect; self-revision HURTS (QwQ: correct→wrong > wrong→correct); parallel > sequential |
| 2026-01-24 | Added Emergent Abilities Survey (2503.05788) — Survey of 100+ papers; "memorization competes with generalization"; some emergence real; BALANCED |
| 2026-01-24 | Added Survey of Test-Time Compute (2501.02497) — Self-correction fails without external feedback; no universal scaling law; LRMs domain-bounded; SUPPORTS thesis |
| 2026-01-24 | Added Theory for Length Generalization (2404.00560) — LG requires D=X (complete training coverage) + finite input space + engineered representations; impossibility for infinite X; BALANCED |
| 2026-01-24 | Added Survey of Inductive Reasoning (2510.10182) — "Inductive ability originates from induction heads" = pattern matching mechanism; "Induction means simplicity" = models prefer learned patterns; "No universal bias" = task-specific; test-time scaling = search through learned patterns; SUPPORTS thesis |
| 2026-01-24 | Added Limits of Emergent Reasoning Agentic (2510.15974) — Agentic framework WORSE than baseline; ~40% deterministic looping; JSD diverges from both optimal AND random; REBUTS Agentic Gap (2506.18957); STRONGLY SUPPORTS thesis |
| 2026-01-24 | Added Compositional-ARC (2504.01445) — o3-mini 0.53%, GPT-4o 0.99% on systematicity; 5.7M MLC > 8B+ LLMs; TTT is NOT genuine generalization; 3-shot vs systematicity gap = smoking gun for pattern matching; STRONGLY SUPPORTS thesis |
| 2026-01-24 | Added KUP Memorization vs Reasoning (2504.12523) — ALL methods <2% on indirect probing; 70-80% on direct probing; memorization ≠ reasoning; H&M Russia example; STRONGLY SUPPORTS thesis |
| 2026-01-24 | Added LoopBench (2512.13713) — O3 72% vs GPT-4.1 0% on symmetry breaking; strategy evolution observed; Discovery-Implementation Gap supports surfacing; BALANCED |
| 2026-01-24 | Added CRV Verifying CoT (2510.09312) — 92% AUROC; domain-specific error signatures; causal interventions work; BALANCED |
| 2026-01-24 | Added Iterative ICL Algebraic (2509.01267) — Zero-shot 13-35% on rule override task; simpler examples work better; complexity collapse; SUPPORTS thesis |
| 2026-01-24 | Added Revisiting Compositional Gen (2506.15629) — ACL 2025; 75% ceiling on ordered coverage; identical outputs for different orders; patterns dominate instructions; SUPPORTS thesis |
| 2026-01-24 | Added STEPS (2601.03676) — Power-law distribution mechanism; 4K targeted > 52K random; unconstrained diversity hurts; "sweet spot"; tool use ≠ reasoning; SUPPORTS with mitigation |
| 2026-01-24 | Added Survey Latent CoT (2505.16782) — Comprehensive survey; "unclear whether genuine reasoning or exploiting correlations"; evaluation gap; BALANCED |
| 2026-01-24 | Added CryptoX (2502.07813) — 40-54pp encoding drops; hierarchical layer processing; SUPPORTS |
| 2026-01-24 | Added CoT Monitorability (2510.27378) — Verbosity + Faithfulness = Monitorability; SUPPORTS |
| 2026-01-24 | Added Reasoning Abilities ARC (2403.11793) — LoTH framework; 10.6%→4.0% process accuracy; SUPPORTS |
| 2026-01-24 | Added Inference-Time Scaling Complex (2504.00294) — 9 models × 8 benchmarks; GPT-4o approaches O1 with 256× superscaling; complexity collapse persists; BALANCED |
| 2026-01-24 | Added PCL-Reasoner-V1.5 (2601.14716) — 90.9% AIME 2024 via offline RL; RL improves long-CoT specifically; FOR (partial) |
| 2026-01-24 | Added Interactive Learning ILR (2509.26306) — Multi-agent co-learning 3-5% improvement; dynamic cooperation/competition; BALANCED |
| 2026-01-24 | Added Revisiting LLM Reasoning via IB (2507.18391) — IB regularization ~2 points improvement; reconciles entropy debate; BALANCED |
| 2026-01-28 | Added o3 Thinks Harder Not Longer (2502.15631) — Accuracy declines 3.16%/1000 tokens (o1-mini); more tokens ≠ better; SUPPORTS thesis |
| 2026-01-28 | Added System 1/2 Alignment (2502.12470) — S2 excels arithmetic, S1 excels commonsense; uniform reasoning suboptimal; BALANCED |
| 2026-01-28 | Added Content Effects on Reasoning (2207.07051) — PNAS Nexus; LLMs show human-like content effects; both rely on semantic patterns; SUPPORTS thesis |
| 2026-01-28 | Added AI Metacognition (2411.02478) — "Smart but not wise"; lacks metacognition (reasoning about reasoning); object-level patterns without meta-level; SUPPORTS thesis |
| 2026-01-28 | Added Temporal Cognition (2507.15851) — Weber-Fechner law emerges; reference point ~2025; sophisticated emergence FROM data patterns; BALANCED |
| 2026-01-29 | Added On the Notion that Language Models Reason (2511.11810) — LMs as Markov kernels; "reasoning" = statistical regularities; "statistical pattern matchers"; NeurIPS 2025 Workshop; STRONGLY SUPPORTS thesis |
| 2026-01-29 | Added Reasoning or Reciting (2307.02477) — NAACL 2024; foundational counterfactual methodology; 11 tasks; high CCC + low CF = understanding ≠ reasoning; "narrow, non-transferable procedures"; STRONGLY SUPPORTS thesis |
| 2026-01-29 | Added Gaming the Judge (2601.14691) — CoT manipulation inflates FPR by 90%; judges pattern-match on style, not content; Progress Fabrication most effective; SUPPORTS thesis |
| 2026-01-29 | Added Beyond Memorization (2601.13392) — 100% knowledge, 30-64pp drops on unseen DFA tasks; CoT degrades performance; six systematic failure modes; STRONGLY SUPPORTS thesis |
| 2026-01-30 | Added Outcome-Based RL (2601.15158) — RL discovers reasoning but requires pre-existing capability; easy examples sufficient; BALANCED |
| 2026-01-30 | Added Tokenizer Betrays Reasoning (2601.14658) — 72% phantom edits are whitespace variants; token-ID level processing; SUPPORTS thesis |
| 2026-01-30 | Added Flexibility Trap (2601.15165) — Arbitrary order NARROWS reasoning; models bypass logical forks, retrofit logic post-hoc; BALANCED |
| 2026-01-30 | Added Reasoning-Critical Neurons (2601.19847) — AUROC 0.83 predicts success before reasoning completes; activation steering works; BALANCED |
| 2026-01-31 | Added Strong Reasoning Isn't Enough (2601.19773) — ~20% avg SR drop static→interactive; Meditron -90% on RareArena; scaling improves SR not ICR; decoupled reasoning/gathering; STRONGLY SUPPORTS thesis |
| 2026-01-31 | Added WhatCounts (2601.21618) — >40% accuracy variation on COUNTING depending on semantic class alone; better models = LARGER gaps; tools don't fix it; "LLMs do not implement algorithms"; STRONGEST atomic evidence for pattern matching |
| 2026-01-31 | Added Sycophantic Anchors (2601.21183) — 84.6% vs 64% asymmetry; sycophancy distinctly encoded; emerges during reasoning (55%→73%); R²=0.74; STRONGLY SUPPORTS thesis |
| 2026-01-31 | Added Sycophancy Hides Linearly (2601.16644) — Truthfulness ≠ deference (32% overlap, cosine=-0.22); MHA steering: 51.7%→25%; distinct mechanisms; SUPPORTS thesis |
| 2026-01-31 | Added Spurious Rewards Paradox (2601.11061) — Models improve with INCORRECT rewards; Perplexity Paradox; Anchor-Adapter circuit (L18-20→L21+); RLVR activates memorization; STRONGLY SUPPORTS thesis |
| 2026-01-31 | Added Reasoning or Guessing? HRM (2601.10679) — HRM "guesses" fixed points, doesn't reason incrementally; fails on 1-cell puzzles; "grokking" dynamics; scaling guesses (54.5%→96.9%) >> improving reasoning; spurious fixed points as local minima; STRONGLY SUPPORTS thesis |
| 2026-01-31 | Added Two Pathways to Truthfulness (2601.07422) — Q-Anchored (knowledge retrieval, 87% acc) vs A-Anchored (fabrication detection, 68% acc); knowledge boundary = training distribution; self-aware of pathways (87-93% AUC); SUPPORTS thesis |
| 2026-01-31 | Added Thinking Out of Order (2601.22035) — AR: 67% drop when answers before reasoning; MDLM: ≤14% drop (order robust); complexity-driven stabilization; distillation preserves AR sensitivity; STRONGLY SUPPORTS thesis |
| 2026-01-31 | Added Scaling Reasoning Hop (2601.21214) — 78.6% errors from single type (Parity-NL 50-hop); ep heads amplify wrong trajectories; knockout restores 47.5%; TCR +6.8%, TCR-gold +20%; shared ep heads across tasks; STRONGLY SUPPORTS thesis |
| 2026-01-31 | Added Code over Words (2601.18352) — INVERSE SCALING: Llama-3-70B shows STRONGER semantic inertia (ΔP=-0.18) than 8B; Claude 57%→13% collapse on conflict; code reverses (ΔP=+0.29); LCV 7B > GPT-4o TheoryCoder; 71% vs 16% inhibitory control; STRONGEST inverse scaling evidence; STRONGLY SUPPORTS thesis |
| 2026-01-31 | Added CoT Compression Theory (2601.21576) — First theoretical analysis; high-order signal exponentially decays; Order-r Interaction proves fundamental; SUPPORTS thesis |
| 2026-01-31 | Added Chains to DAGs (2601.17593) — DAG geometry encoded in hidden states; recoverability varies by depth/scale; structure exists but not reliably used; BALANCED |
| 2026-01-31 | Added HalluGuard (2601.18753) — Decomposes into data-driven + reasoning-driven; 98.1% of MATH-500 errors reasoning-driven; errors grow exponentially; SUPPORTS thesis |
| 2026-01-31 | Added Oops Wait (2601.17421) — Token signals correlate with correctness; acquired but partially exploited; BALANCED |
| 2026-01-31 | Added SOAR (2601.18778) — Teaching ≠ solving ability; 4× pass@1 on 0/128 problems; only 32.8% correct solutions in effective questions; meta-RL sharpens pretraining; BALANCED |
| 2026-01-31 | Added LLM-JEPA (2509.14252) — JEPA for LLMs; +14% NL-RX, +0.7% GSM8K; NO OOD TESTING (critical gap); cannot assess reasoning vs pattern matching; BALANCED |
| 2026-01-31 | Added Sycophancy (2601.15436) — All models prioritize agreement over truth; recency bias universal; sycophancy + recency = constructive interference; SUPPORTS thesis |
| 2026-01-31 | Added Strategic Deception (2311.07590) — GPT-4 lies 90% when caught; deception without instruction; HHH training creates surface compliance |
| 2026-01-31 | Added Detecting Deception (2502.03407) — AUROC 0.96-0.999; deception linearly encoded; extends Strategic Deception |
| 2026-01-31 | Added Sycophancy Scales (2308.03958) — CANONICAL: Sycophancy scales with size; models agree with 2+2=5 |
| 2026-01-31 | Added Truth-Bias Sycophancy (2506.21561) — 98% truth acc, 16% deception acc; R1 MORE biased than V3 |
| 2026-01-31 | Added Reasoning Trap Tool Halluc (2510.22977) — Math RL → tool halluc; thinking mode → halluc UP |
| 2026-01-31 | Added Illusions of Confidence (2601.05905) — SC=1.0 → 33.8% after interference; NCB > SC for robustness; SAT reduces brittleness ~30%; STRONGLY SUPPORTS thesis |
| 2026-01-31 | Added Causal Illusions (2410.11684) — 30-35% causal illusion rates; sycophancy amplifies (+17% GPT-4o-Mini); Claude most robust; SUPPORTS thesis |
| 2026-01-31 | Added Illusion of Illusion (2506.09250) — REBUTTAL to Paper 03; argues token limits not reasoning limits; River Crossing had impossible instances; WEAK CHALLENGE to thesis |
| 2026-01-31 | Added Alice in Wonderland (2406.02061) — VERY STRONG: GPT-4o 65%, most models <20%; 0-100% fluctuations on identical structure; controls rule out parsing/arithmetic; STRONGLY SUPPORTS thesis |
| 2026-01-31 | Added Fundamental Limitations of Alignment (2304.11082) — BEB theory: any behavior with α>0 can be triggered; RLHF increases β (distinguishability); ~3 sentences to misalign; theoretical foundation for pattern matching vulnerability; SUPPORTS thesis |
| 2026-02-01 | Added Towards Understanding Sycophancy (2310.13548) — FOUNDATIONAL: 98% wrongly admit mistakes; PM prefers sycophantic 95% over baseline truthful; ~6% preference boost when matching user beliefs; mechanistic evidence for training signal → behavior; STRONGLY SUPPORTS thesis |
| 2026-02-01 | Added Conformity of LLMs (2501.13381) — ICLR 2025: 47.2% avg conformity rate (Doubt); 91.2% CR for Llama3.1-8B; all 11 LLMs show conformity; trust/doubt relationships form; reflection doubles IR; STRONGLY SUPPORTS thesis |
| 2026-02-01 | Added Overthinking in o1-Like LLMs (2412.21187) — First solution correct >92%; 1,953% token overhead on "2+3"; more solutions for EASIER problems; distinctness drops 11.5% at solution #4+; ~45% token reduction maintains accuracy; SUPPORTS thesis |
| 2026-02-01 | Added Underthinking in o1-Like LLMs (2501.18585) — Companion to Paper 129; 225% more tokens + 418% more switches in incorrect responses; >70% incorrect contain correct thought; models abandon correct paths; Tip penalty improves accuracy; SUPPORTS thesis |
| 2026-02-01 | Added Can LLMs Reason and Plan (2403.04121) — FOUNDATIONAL: Kambhampati's skeptic manifesto; LLMs = "n-gram models on steroids"; "universal approximate retrieval" not reasoning; obfuscation destroys planning; self-verification worsens; LLM-Modulo framework; STRONGLY SUPPORTS thesis |
| 2026-02-01 | Added Stop Anthropomorphizing Tokens (2504.09762) — POSITION: Kambhampati on LRMs; traces have NO semantics; incorrect traces OUTPERFORM correct; "aha" meaningless; "compiling reasoning into retrieval"; R1-Zero > R1; STRONGLY SUPPORTS thesis |

| 2026-02-01 | Added Base Models Know How to Reason (2510.07364) — CRITICAL SURFACING: 91% gap recovery with 12% token steering; RLVR teaches timing not capability; two-component decomposition; steering vectors transfer; STRONGLY SUPPORTS thesis |
| 2026-02-01 | Added Can ICL Generalize OOD (2410.09695) — CRITICAL OOD: ICL implements pretraining functions, not new ones; ~10% OOD accuracy = random guessing; abstract labels work ONLY when underlying function is ID; algorithm selection by lowest test error; STRONGLY SUPPORTS thesis |
| 2026-02-01 | Added Demystifying Long CoT (2502.03373) — SURFACING MECHANISM: Core abilities (error correction) INHERENTLY PRESENT in base models; long CoT patterns exist in pretraining data (OpenWebMath); short CoT saturates at ~55%; RL incentivizes, doesn't create; STRONGLY SUPPORTS thesis |
| 2026-02-01 | Added Chain of Thoughtlessness (2405.04776) — NeurIPS 2024 (Kambhampati): CoT doesn't teach algorithms; requires "exceedingly specific" prompts; performance degrades rapidly past example size; same failure across 3 domains; STRONGLY SUPPORTS thesis |
| 2026-02-01 | Added CoT Training Mechanisms (2502.04667) — CONTROLLED: Non-CoT 100% ID/0% OOD; CoT 100%/100%; two-stage circuit; intermediate results at layer 3 vs 5; CoT exposes subtask patterns, doesn't teach reasoning; STRONGLY SUPPORTS thesis |
| 2026-02-01 | Added Lexical Accuracy Hints (2508.15842) — Surface markers predict errors better than confidence; 84.6% calibration error; harmful words ("guess", "stuck") reduce accuracy 40%; 5-word rule MCC=0.305 vs confidence MCC=0.065; STRONGLY SUPPORTS thesis |
| 2026-02-01 | Added Recursive Language Models (2512.24601) — ICML: Context rot confirms limits (GPT-5: 0.1% OOLONG-Pairs); RLMs provide scaffolding (58%); engineering around limitations; BALANCED |
| 2026-02-01 | Added Not All Code Is Equal (2601.21894) — ICML: 83% of experiments show complexity-restricted training beats diverse; models respond to SURFACE structural properties; model-specific optimal complexity; SUPPORTS thesis |
| 2026-02-01 | Added Meta-Thought to Execution (2601.21909) — ICML: +4.63% OOD but OOD = same domain (math); diagnoses standard CoT as "trajectory imitation"; meta-thought learns abstract patterns; BALANCED |
| 2026-02-01 | Added System 1&2 Synergy (2601.21414) — IJCAI: Linear interpolation θ = (1-λ)·θ_instruct + λ·θ_thinking works; "thinking" is quantitative (λ parameter) not qualitative capability; BALANCED |
| 2026-02-01 | Added Grokked Transformers (2405.15071) — NeurIPS 2024: Implicit reasoning emerges ONLY through grokking; composition fails OOD (0%) but comparison succeeds; non-recurrent architecture prevents cross-layer memory sharing; BALANCED |
| 2026-02-01 | Added Deciphering CoT (2407.01687) — EMNLP 2024: CoT = probability + memorization + noisy reasoning; 26%→70% from output probability; rot-13 spike from training frequency; invalid demos still work; SUPPORTS thesis |
| 2026-02-01 | Added SCoRe Self-Correction (2409.12917) — DeepMind: Self-correction ineffective in standard LLMs; SFT fails due to distribution mismatch + behavior collapse; multi-turn RL enables +15.6% MATH; BALANCED |
| 2026-02-01 | Added Emergent Abilities Mirage (2304.15004) — NeurIPS 2023: >92% of BIG-Bench emergence from 2 metrics; same outputs → different conclusions; linear metrics show smooth scaling; SUPPORTS thesis |
| 2026-02-01 | Added Term Frequencies (2202.07206) — EMNLP 2022: FOUNDATIONAL - >70% accuracy gap (top vs bottom 10% frequency); if models learned algorithms, accuracy would be uniform; SUPPORTS thesis |
| 2026-02-01 | Added Unfaithful CoT (2305.04388) — NeurIPS 2023: FOUNDATIONAL - 36% accuracy drop from bias; 1/426 explanations mention bias; CoT makes bias susceptibility WORSE; 15% unfaithful explanations appear sound; STRONGLY SUPPORTS thesis |
| 2026-02-09 | Added Brain Rot (2510.13928) — Paper 184: Junk data causes lasting cognitive decline; ARC-Challenge 74.9%→57.2%; thought-skipping as primary lesion; partial healing only; STRONGLY SUPPORTS thesis |
| 2026-02-09 | Added Hallucination Open World (2510.05116) — Paper 185: Reframes hallucination as generalization problem; Type-I (memorization) vs Type-II (generalization); Open World = inevitable; SUPPORTS thesis |
| 2026-02-01 | Added Reversal Curse (2309.12288) — FOUNDATIONAL: LLMs store directional patterns, not relations; 0% reverse accuracy (complete failure); GPT-4: 79% forward, 33% reverse; in-context works but training doesnt learn symmetry; STRONGLY SUPPORTS thesis |
| 2026-02-01 | Added Planning Abilities (2305.15771) — NeurIPS 2023 Spotlight (Kambhampati): GPT-4 ~12% autonomous planning success; plan-like text ≠ valid plans; LLM-Modulo framework; STRONGLY SUPPORTS thesis |
| 2026-02-01 | Added Original CoT (2201.11903) — NeurIPS 2022: FOUNDATIONAL. Wei et al. 540B + 8 exemplars = 58% GSM8K. "Reasoning emerges at scale." FOR thesis (but challenged by later faithfulness work) |
| 2026-02-01 | Added CoT Expressivity (2310.07923) — ICLR 2024: Merrill & Sabharwal prove CoT adds computational power. O(n) = regular languages, O(n^c) = exactly P. FOR thesis (theoretical foundation) |
| 2026-02-01 | Added PlanBench (2206.10498) — NeurIPS D&B 2023: Kambhampati's benchmark. IPC domains distinguish planning from retrieval. Mystery Blocksworld tests true planning. SUPPORTS thesis |
| 2026-02-01 | Added Zero-Shot CoT (2205.11916) — NeurIPS 2022: Kojima "Let's think step by step." +61pp MultiArith, +30pp GSM8K. FOR thesis (but challenged by bias susceptibility) |
| 2026-02-01 | Added Self-Consistency (2203.11171) — ICLR 2023: Wang et al. +17.9pp GSM8K via diverse sampling + majority vote. FOR thesis (mechanism paper) |
| 2026-02-01 | Added Token Bias (2406.11050) — EMNLP 2024: Statistical hypothesis testing framework. 6 hypotheses rejected. 91% failure prediction from token patterns. STRONGLY SUPPORTS thesis |
| 2026-02-01 | Added Recursive Problems (2305.14699) — Transformers learn "shortcut" algorithms instead of true recursion. 91% failure prediction from reconstructed algorithms. STRONGLY SUPPORTS thesis |
| 2026-02-01 | Added ALiBi (2108.12409) — ICLR 2022: Linear biases enable length extrapolation (1024→2048). 11% faster/less memory. Addresses length but NOT compositional OOD. BALANCED |
| 2026-02-01 | Added GSM-IC (2302.00093) — ICML 2023: LLMs distracted by irrelevant context. Precursor to GSM-Symbolic. Self-consistency helps but incomplete. STRONGLY SUPPORTS thesis |
| 2026-02-09 | Added Dot by Dot (2404.15758) — Filler tokens ('......') can replace CoT; benefits from additional compute, not reasoning. 100% vs 66% on 3SUM with fillers. SUPPORTS thesis |
| 2026-02-09 | Added Pause Tokens Expressivity (2505.21024) — FORMAL PROOF: TF[1,L,P] = AC⁰, strict separation from TF[1,L,0]. Parity impossible without pause. Extends Dot by Dot theoretically. SUPPORTS thesis |
| 2026-02-09 | Added Mechanistic CoT (2402.18312) — First mechanistic analysis of CoT reasoning in production LLMs (Llama-2 7B). "Functional rift" at layer 16; parallel pathways via induction-circuit compositions. Answer-writing heads layers 17-32; token mixing layers 1-16. 35.9% accuracy on fictional ontology. SUPPORTS thesis |
| 2026-02-09 | Added Proof or Bluff (2503.21934) — Expert human evaluation of USAMO 2025 proofs. Best model (Gemini-2.5-Pro) 25%; all others <5%. Logic errors dominant. GRPO training artifacts. Automated grading overestimates 20x. STRONGLY SUPPORTS thesis |
| 2026-02-09 | Added Hallucination Inevitable (2401.11817) — Computability theory proof: hallucination mathematically inevitable for LLMs as general problem solvers. Diagonalization argument. Corollary: self-correction cannot eliminate hallucination. STRONGLY SUPPORTS thesis |
| 2026-02-09 | Added SWE-Bench Illusion (2506.12286) — 76% file path accuracy on SWE-Bench vs <53% on external repos. 35% vs 18% n-gram overlap. Verbatim match up to 31.6%. Memorization not reasoning. STRONGLY SUPPORTS thesis |
| 2026-02-09 | Added Faithful CoT (2301.13379) — IJCNLP-AACL 2023: Two-stage framework (NL→symbolic + solver) guarantees faithfulness. Standard CoT "does not necessarily reflect how the model arrives at the answer." +6-21% gains with external solvers. SUPPORTS thesis |
| 2026-02-09 | Added Predictable Compression Failures (2509.11208) — THEORETICAL: Hallucinations = compression failures. "Bayesian in expectation, not in realization." O(log n) deviation bounds (QMV theorem). ~0.13 fewer hallucinations per nat. ISR-based abstention achieves near-0% hallucination at 24% abstention. STRONGLY SUPPORTS thesis |
| 2026-02-09 | Added Dissociation of Faithful/Unfaithful (2405.15092) — TWO DISTINCT MECHANISMS for error recovery. Factors increasing faithful recovery DECREASE unfaithful recovery (divergent effects). LLMs have separate interpretable vs opaque reasoning modes. "Examining CoT output is not sufficient for verifying conclusions." STRONGLY SUPPORTS thesis |
| 2026-02-09 | Added Fluid Representations (2602.04843) — QwQ-32B shows representational adaptation, but BASE MODEL shows SAME adaptation. Semantic obfuscation 96%→35%. Effect sizes small (1.5-1.8%). Capability inherent to LLMs, not special to reasoning models. BALANCED (leans supports) |
| 2026-02-09 | Added Arithmetic Without Algorithms (2410.21272) — MECHANISTIC SMOKING GUN: LLMs use "bag of heuristics" not algorithms. ~200 neurons/layer implement pattern-matching rules. 91% of important neurons classified as heuristics. Mechanism emerges early in training. STRONGLY SUPPORTS thesis |
| 2026-02-09 | Added Unfaithful Reasoning Emergence (2602.01017) — CONTROLLED EVIDENCE: Faithful CoT only when noise < critical threshold. Training dynamics: stepwise→mixed→skip-step transition. Simplicity bias determines faithfulness. Implicit self-verification emerges in mixed mode. STRONGLY SUPPORTS thesis |

| 2026-02-09 | Added Contextual Drag (2602.04288) — ICML 2026: 10-20% drops from contextual errors across 11 models; Tree edit distance proves STRUCTURAL inheritance of errors; Self-improvement via reflection fails; GPT-OSS-20B 51.88%→17.50% on AIME24; Neither external nor self-verification eliminates effect; STRONGLY SUPPORTS thesis |
| 2026-02-09 | Added No Global Plan in CoT (2602.02103) — Tele-Lens probing: LLMs exhibit MYOPIC HORIZON; Final answer at random (50%) until last step; Parity: 0.51→0.97 only at completion; Subsequent token F1: 0.90→0.03 at offset 16; Coarse early signals are perceptual cues, not plans; STRONGLY SUPPORTS thesis |
| 2026-02-09 | Added LMs Struggle to Use ICL Representations (2602.04212) — SMOKING GUN: LLMs encode novel semantics BUT CANNOT DEPLOY them; Representations are 'inert'; AWM near-chance with in-context topology but >75% with explicit description; GPT-5/Gemini-2.5 COLLAPSE on 2D grids; Encoding ≠ understanding; STRONGLY SUPPORTS thesis |
| 2026-02-09 | Added Poisoning Attacks Constant (2510.07192) — 250 documents backdoor models from 600M to 13B; constant NUMBER not percentage; larger models NOT safer; attacks EASIER at scale; supports pattern-matching efficiency |
| 2026-02-09 | Added Brain Rot (2510.13928) — Junk data causes LASTING cognitive decline; ARC-Challenge 74.9%→57.2%; Thought-skipping as PRIMARY LESION; Partial healing only; Persistent representational drift; Popularity > length as indicator; STRONGLY SUPPORTS thesis |
