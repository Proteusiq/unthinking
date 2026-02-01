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
