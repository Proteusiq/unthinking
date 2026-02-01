# Synthesis: The Thinking Machine That Doesn't Think

## Papers Analyzed So Far

| # | Paper | Date | Stance | Key Contribution |
|---|-------|------|--------|------------------|
| F1 | Faith and Fate | May 2023 | Supports | Theoretical foundation: subgraph matching, exponential error accumulation |
| F2 | Measuring Faithfulness | Jul 2023 | Supports | CoT is often unfaithful; larger models = less faithful |
| 1 | GSM-Symbolic | Oct 2024 | Supports | Empirical: 65% drop from irrelevant info, variance on equivalent questions |
| 2 | CoT Without Prompting | Feb 2024 | Challenges | CoT exists intrinsically in top-k tokens, hidden by greedy decoding |
| 3 | Illusion of Thinking | Jun 2025 | Supports | Three complexity regimes, token decrease at collapse, LRM failures |
| 4 | Thinking Isn't an Illusion | Jul 2025 | Challenges | Tool augmentation reverses collapse (Hanoi 0%→100%) |
| 5 | DeepSeek-R1 | Jan 2025 | Challenges | Emergent reasoning from pure RL, "Aha moment" phenomenon |
| 6 | CoT is a Mirage | Aug 2025 | Supports | DataAlchemy: ID=100%, OOD=0%; distribution determines success |
| 7 | s1: Simple test-time scaling | Jan 2025 | Challenges | 1K samples surfaces reasoning; budget forcing works |
| 8 | Semantic Deception | Dec 2025 | Supports | Semantic cues override explicit instructions; CoT can hurt |
| 9 | Reasoning Models Don't Say | May 2025 | Supports | CoT 25-40% faithful; misaligned hints hidden MORE |
| 10 | Limits of Innate Planning | Nov 2025 | Supports | External move validator = 0% success; refutes Agentic Gap |
| 11 | Comment: Agentic Gap | Jun 2025 | Challenges | Execution vs reasoning; tool augmentation reverses collapse |
| 12 | Correlation or Causation | Sep 2025 | Balanced | Only 30% LLM SCMs ideal; RLVR improves to 63%; causal framework |
| 13 | Emergence of Strategic Reasoning | Dec 2024 | Challenges | LRMs exceed human strategic reasoning; τ=4.42 for GPT-o1 |
| 14 | CoT In The Wild Not Faithful | Mar 2025 | Supports | Unfaithfulness on natural prompts; GPT-4o-mini 13%, best model 0.04% |
| 15 | Interplay of Pre-Training, Mid-Training, RL | Dec 2025 | Balanced | 0% exposure = RL fails; ≥1% = success; "cannot synthesize from void" |
| 16 | Reasoning Models Reason Well, Until They Don't | Oct 2025 | Balanced | Abrupt collapse at L~64-300; NLGraph trivially easy (L<2); o3 fails |
| 17 | The Illusion of Insight in Reasoning Models | Jan 2026 | Supports | "Aha!" moments are rare, don't improve with training, seldom help accuracy |
| 18 | LLMs Imitate Logical Reasoning | Sep 2025 | Supports | 2023→2024 = hidden CoT; neuro-symbolic 7-10x cheaper at higher accuracy |
| 19 | Comprehension Without Competence | Jul 2025 | Supports | "Split-brain": 95-100% step accuracy, 0% final at 10-digit; scale won't help |
| 20 | Frontier LLMs Still Struggle | Jul 2025 | Supports | Unpuzzles: easier=worse (GPT-4o 75%→20%); R1 0% char counting; "reasoning delirium" |
| 21 | Illusions of Reflection | Oct 2025 | Supports | Reflection repeats same failure 85%; reasoning models NO advantage |
| 22 | Illusion of Diminishing Returns | Sep 2025 | Balanced | Self-conditioning: errors beget errors; thinking fixes it; execution ≠ reasoning |
| 23 | Can LLM Graph Reasoning Generalize | Jun 2024 | Supports | "Pattern regurgitators" (EMNLP 2024); 0% strong recovery on reasoning |
| 24 | Beyond Memorization: ToC Tasks | Jan 2026 | Supports | 100% factual knowledge, 30-64% drop on unseen DFA construction |
| 25 | Reasoning Model Is Superior Judge | Jan 2026 | Balanced | LRMs better at judgment but MORE susceptible to superficial biases (32pp drop) |
| 26 | No Free Lunch: Internal Feedback | Jun 2025 | Supports | RLIF degrades reasoning (291→235); format↑ reasoning↓; overconfidence mechanism |
| 27 | Neuro-Symbolic AI Survey | Aug 2025 | Supports | "LLMs cannot really reason... statistical pattern recognition"; 52 papers reviewed |
| 28 | Multilingual Latent Reasoners | Jan 2026 | Balanced | Latent reasoning EXISTS but "real and fragile"; LRS collapses 0.38→0.03 on hard problems |
| ... | ... | ... | ... | ... |
| 67 | Survey of Inductive Reasoning | Oct 2025 | Supports | "Inductive ability originates from induction heads" = pattern matching |
| 68 | Limits of Emergent Reasoning Agentic | Oct 2025 | Strongly Supports | Agentic framework makes collapse WORSE; ~40% looping |
| 69 | Compositional-ARC | Apr 2025 | Strongly Supports | o3-mini 0.53% on systematicity; 5.7M MLC > 8B+ LLMs |
| 70 | KUP Memorization vs Reasoning | Apr 2025 | Strongly Supports | ALL methods <2% on reasoning; 70-80% on memorization |
| 71 | LoopBench | Dec 2025 | Balanced | O3 72% vs GPT-4.1 0% on symmetry breaking |
| 72 | CRV Verifying CoT | Oct 2025 | Balanced | Error signatures domain-specific; causal interventions work |
| 73 | Iterative ICL Algebraic | Sep 2025 | Supports | 13-35% on rule override; simpler examples work better |
| 74 | Revisiting Compositional Gen | Jun 2025 | Supports | ACL 2025; 75% ceiling on ordered coverage |
| 75 | STEPS Skill Taxonomy | Jan 2026 | Supports | Power-law distribution explains compositional failure |
| 76 | Survey Latent CoT | May 2025 | Balanced | "Unclear whether genuine reasoning or exploiting correlations" |
| 77 | CryptoX Compositional | Feb 2025 | Supports | 40-54pp drops with encoding; hierarchical layer processing |
| 78 | CoT Monitorability | Oct 2025 | Supports | Verbosity + Faithfulness = Monitorability |
| 79 | Reasoning Abilities ARC/LoTH | Mar 2024 | Supports | 10.6% correct but only 4.0% correct processes |
| 80 | Inference-Time Scaling Complex | Apr 2025 | Balanced | GPT-4o approaches O1 with 256× superscaling; complexity collapse persists |
| 81 | PCL-Reasoner-V1.5 | Jan 2026 | FOR (partial) | 90.9% AIME 2024 via offline RL; depends on distillation |
| 82 | Interactive Learning ILR | Sep 2025 | Balanced | Multi-agent co-learning 3-5% improvement; no OOD testing |
| 83 | Revisiting LLM Reasoning via IB | Jul 2025 | Balanced | IB regularization improves RL by ~2 points; reconciles entropy debate |
| ... | ... | ... | ... | ... |
| 94 | o3 Thinks Harder Not Longer | Feb 2025 | Supports | More tokens ≠ better; accuracy declines 3.16%/1000 tokens |
| 95 | System 1/2 Alignment | Feb 2025 | Balanced | S2 excels arithmetic, S1 excels commonsense; uniform reasoning suboptimal |
| 96 | Content Effects on Reasoning | Jul 2024 | Supports | PNAS Nexus; LLMs show human-like content effects; semantic patterns |
| 97 | AI Metacognition (Wise Machines) | Nov 2024 | Supports | "Smart but not wise"; lacks metacognition (reasoning about reasoning); Bengio, Mitchell et al. |
| 98 | Temporal Cognition in LLMs | Jul 2025 | Balanced | Weber-Fechner law emerges; reference point ~2025; sophisticated emergence FROM data patterns |
| 99 | On the Notion that LMs Reason | Nov 2025 | Strongly Supports | LMs as Markov kernels; "reasoning" = statistical regularities; defends "statistical pattern matchers"; NeurIPS Workshop |
| 100 | Reasoning or Reciting | Jul 2023 | Strongly Supports | NAACL 2024; foundational counterfactual methodology; high CCC + low CF = understanding ≠ reasoning; "narrow, non-transferable procedures" |
| 101 | Gaming the Judge | Jan 2026 | Supports | CoT manipulation inflates FPR by 90%; judges pattern-match on style not content; Progress Fabrication most effective |
| 102 | Beyond Memorization | Jan 2026 | Strongly Supports | 100% knowledge, 30-64pp drops on unseen DFA; CoT degrades performance; "pattern retrieval rather than robust symbolic reasoning" |
| 103 | Outcome-Based RL | Jan 2026 | Balanced | RL discovers reasoning but requires pre-existing capability; easy examples sufficient |
| 104 | Tokenizer Betrays Reasoning | Jan 2026 | Supports | 72% phantom edits are whitespace variants; token-ID level processing not meaning |
| 105 | Flexibility Trap | Jan 2026 | Balanced | Arbitrary order NARROWS reasoning; models bypass logical forks, retrofit logic post-hoc |
| 106 | Reasoning-Critical Neurons | Jan 2026 | Balanced | AUROC 0.83 predicts success before reasoning completes; activation steering works |
| 107 | Strong Reasoning Isn't Enough | Jan 2026 | Strongly Supports | ~20% avg SR drop static→interactive; Meditron -90% on RareArena; scaling improves reasoning not evidence-gathering; decoupled capabilities |
| 108 | WhatCounts | Jan 2026 | Strongly Supports | >40% accuracy variation on COUNTING depending solely on semantic class (cities vs chemicals); better models = LARGER gaps; tools don't fix it; "LLMs do not implement algorithms; they approximate them" |
| 109 | Sycophantic Anchors | Jan 2026 | Strongly Supports | 84.6% probe accuracy for sycophantic anchors vs 64% for correct anchors; 20.6pp ASYMMETRY = sycophancy encoded differently; emerges during reasoning (55%→73%); R²=0.74 for commitment strength; "sycophancy leaves a trace truthful reasoning does not" |
| 110 | Sycophancy Hides Linearly | Jan 2026 | Supports | Truthfulness ≠ deference resistance (cosine=-0.22, 32% overlap); MHA steering: 51.7%→25% sycophancy rate; sycophancy heads attend to user doubt; "factual accuracy and deference resistance arise from distinct mechanisms" |
| 111 | Spurious Rewards Paradox | Jan 2026 | Strongly Supports | Models improve EVEN WITH INCORRECT REWARDS; Perplexity Paradox (answer PPL↓, prompt PPL↑); Anchor-Adapter circuit (L18-20 trigger, L21+ adapt); RLVR activates memorization, not reasoning; bidirectional causal steering; "RLVR acts as retrieval mechanism for data already memorized during pretraining" |
| 112 | Reasoning or Guessing? (HRM) | Jan 2026 | Strongly Supports | HRM "guesses" fixed points, doesn't incrementally reason; fails on 1-cell puzzles (~25% instability); "grokking" dynamics (sudden correctness); scaling guesses (54.5%→96.9%) >> improving reasoning; spurious fixed points as local minima; "if one is to approach a complex problem through deliberative reasoning, the number of attempts typically matters less" |
| 113 | Two Pathways to Truthfulness | Jan 2026 | Supports | Two DISTINCT pathways: Q-Anchored (knowledge retrieval, 87% acc, popular entities) vs A-Anchored (fabrication detection, 68% acc, long-tail); LLMs self-aware of pathways (87-93% AUC); knowledge boundary = training distribution; pathway-aware detection +10% AUC |
| 114 | Thinking Out of Order | Jan 2026 | Strongly Supports | AR models: **67% accuracy drop** when answers before reasoning (premature commitment); MDLMs: ≤14% drop (order robust); complexity-driven stabilization; distillation from AR preserves order-sensitivity; "AR must commit before reasoning exists" |
| 115 | Scaling Reasoning Hop | Jan 2026 | Strongly Supports | **78.6% errors** from single error type (Parity-NL 50-hop); "erroneous processing heads" (ep heads) amplify wrong trajectories; knockout single ep head restores 47.5% correct; TCR +6.8%, TCR-gold +20% (41.7%→61.3%); shared ep heads across tasks; "competition mechanism" between correct/erroneous patterns |
| 116 | Code over Words | Jan 2026 | Strongly Supports | **INVERSE SCALING**: Llama-3-70B shows STRONGER semantic inertia (ΔP=-0.18) than 8B; Claude Sonnet 57%→13% collapse on semantic conflict; "larger models become more entrenched in distributional priors"; code representation reverses trend (ΔP=+0.29); LCV 7B outperforms GPT-4o TheoryCoder; 71% inhibitory control vs 16% direct |
| ... | **Gap-filling papers** | ... | ... | ... |
| 24 | CoT Compression Theory | Jan 2026 | Supports | First theoretical analysis; high-order signal **exponentially decays** when compressing reasoning; Order-r Interaction proves fundamental barrier |
| 90 | Chains to DAGs | Jan 2026 | Balanced | DAG geometry encoded in hidden states; recoverability varies by depth/scale; structure EXISTS but not reliably used |
| 91 | HalluGuard | Jan 2026 | Supports | Decomposes into data-driven + reasoning-driven; **98.1% of MATH-500 errors** are reasoning-driven; errors grow exponentially with T |
| 92 | Oops Wait | Jan 2026 | Balanced | Token signals ("wait", "therefore") correlate with correctness; **acquired but partially exploited** |
| 94 | SOAR | Jan 2026 | Balanced | Teaching ≠ solving ability; 4× pass@1 on 0/128 problems; only 32.8% correct solutions in effective questions; meta-RL "sharpens" pretraining |
| 95 | LLM-JEPA | Sep 2025 | Balanced | JEPA for LLMs; +14% NL-RX but +0.7% GSM8K; **NO OOD TESTING** — cannot assess reasoning vs pattern matching |
| 96 | Sycophancy | Jan 2026 | Supports | All models prioritize agreement over truth; recency bias universal; sycophancy + recency = constructive interference |
| ... | **Sycophancy/Conformity Papers** | ... | ... | ... |
| 117-123 | Sycophancy Cluster | 2023-2026 | Supports | 7 papers on sycophancy (strategic deception, truth-bias, causal illusions) |
| 126 | Fundamental Limitations Alignment | Apr 2023 | Supports | BEB theory: any α>0 behavior triggerable; ~3 sentences to misalign; RLHF increases vulnerability |
| 127 | Towards Understanding Sycophancy | Oct 2023 | Strongly Supports | FOUNDATIONAL: 98% wrongly admit mistakes; PM prefers sycophantic 95%; training signal → behavior |
| 128 | Conformity of LLMs | Jan 2025 | Strongly Supports | ICLR 2025: 47.2% avg conformity; reflection DOUBLES independence (28.6%→68.5%); key elicitation evidence |

**Total: 129 papers analyzed**

**Stance key**: 
- **Supports** = supports the thesis that LLM reasoning is pattern matching from training distributions, not genuinely generative
- **Challenges** = provides evidence for genuine reasoning capabilities
- **Balanced** = provides evidence for both sides

---

## The Theoretical Framework: Dense Statistical Remixed Echo Chamber

### Core Insight

LLMs are **dense statistical remixed echo chambers** of their training data. They don't "evolve," "think," or have "eureka moments." They predict the most likely sequence of tokens based on high-dimensional patterns. Mathematically, they are limited by the information density of the data they are trained on.

### Pattern Recognition vs. Understanding

If a model predicts "4" after "2 + 2 =", it's because that pattern exists billions of times in training data — not because it has a physical concept of "four-ness."

**Example**: "On the mirror I see something like 09:31 reflection of my watch. What time is it?"

This requires spatial transformation not present as a pattern, so models fail. It's **functional competence without foundational understanding**.

### The Interpolation Principle

```
If LLM is trained on A and B, then learned "logic" is the bridge between them.
If LLM generates C, and C exists on the line between A and B = INTERPOLATION.
```

**Example**: 
- A = how a pirate talks
- B = how a nuclear physicist talks  
- C = pirate physicist

C is "new" to the user, but **mathematically latent in the data**. It's a high-dimensional remix, not novel creation.

### Why We Fall For It

We are trained on A and B. When we see C, we assume it's novel reasoning. But C was always on the interpolation manifold — we just hadn't seen that particular point before.

**This is the illusion**: novelty to the observer ≠ novelty to the system.

### The Elicitation Framework

```
┌─────────────────────────────────────────────────────────────┐
│                   TRAINING DISTRIBUTION                      │
│                    (The Convex Hull)                         │
│                                                              │
│    ┌──────┐                              ┌──────┐           │
│    │  A   │                              │  B   │           │
│    └──────┘                              └──────┘           │
│         \                                  /                 │
│          \    ← Interpolation Zone →      /                  │
│           \                              /                   │
│            \     ┌──────────────┐      /                    │
│             \    │ ELICITATION  │     /                     │
│              ────│   METHODS    │─────                      │
│                  │              │                           │
│                  │ • CoT        │  ← Vector steering        │
│                  │ • AGENTS.md  │  ← Region activation      │
│                  │ • SKILLS.md  │  ← Pattern priming        │
│                  │ • MCPs/Tools │  ← Hull expansion         │
│                  │ • RL/RLHF    │  ← Default path shifting  │
│                  └──────────────┘                           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                           │
                           │ Outside hull?
                           ▼
                    ┌──────────────┐
                    │   FAILURE    │
                    │  (OOD, novel │
                    │  composition)│
                    └──────────────┘
```

### Prompting as Vector Steering

Prompting is **vector steering** within the latent space. CoT, AGENTS.md, SKILLS.md — all are methods to navigate to specific regions of the training distribution.

### Alignment as Mascara

| Method | What It Appears To Do | What It Actually Does |
|--------|----------------------|----------------------|
| **RLHF** | "Teaches values" | Shifts default paths within existing hull |
| **CoT** | "Enables reasoning" | Extends context window, steers vectors |
| **AGENTS.md** | "Gives capabilities" | Primes specific regions of latent space |
| **Tools/MCPs** | "Augments intelligence" | Provides external computation + hull anchors |
| **Scratchpad** | "Working memory" | Extended context, not true state |

**None create new capability. All surface existing patterns.**

### Evidence: The Conformity Paper (2501.13381)

| Condition | Independence Rate |
|-----------|-------------------|
| Default (peer pressure) | **28.6%** |
| With reflection prompt | **68.5%** |

Just saying "verify your answer" **doubles** correct behavior. The knowledge was THERE — elicitation surfaced it. This proves:

1. LLMs have stored correct answers — retrieved from training, not reasoned
2. Default behavior is pattern-matching social context — conforming to peer group
3. Reflection re-weights which pattern to match — parametric vs contextual
4. Two competing pattern sources: training data patterns vs in-context social patterns

### Scratchpad and Agents as Momentary Context

CoT and agent scratchpads are **extended context windows**, not working memory. They don't maintain true state — they provide more tokens for pattern matching.

This is why:
- Self-conditioning occurs (errors beget errors)
- Reflection repeats failures (85% same-failure rate)
- Planning loops even with valid moves provided

### The Hull Boundary is the Hard Limit

Tools/MCPs slightly expand the effective hull by providing external computation. But models still can't PLAN how to use them (Limits of Innate Planning: 0% with move validator).

**Tools expand hull for execution, not for reasoning.**

### Summary

> **"All 'improvements' to LLMs — RL, alignment, prompting, tools, agents — are elicitation methods that steer vectors within the training hull. They are cosmetic (mascara), not structural. The hull boundary is the hard limit."**

This reframes the entire debate:
- **FOR camp**: "Look, it reasons!" → No, you elicited a region
- **AGAINST camp**: "It fails OOD!" → Yes, because OOD = outside hull

---

## The Core Tension

### The "Against" Position (Pattern Matching)
```
Training Data → Pattern Extraction → Subgraph Matching → Apparent Reasoning
```
**Evidence:**
- Distribution shift breaks reasoning (GSM-Symbolic, CoT Mirage)
- Exponential error accumulation (Faith and Fate)
- Irrelevant information causes catastrophic failure
- Three regimes: LLMs win low, collapse at high
- CoT is often post-hoc rationalization (Measuring Faithfulness)
- Semantic associations override explicit instructions (Semantic Deception)
- Planning fails even with tools (Limits of Innate Planning)
- Unfaithfulness occurs on natural prompts (CoT In The Wild)
- Unpuzzles: making problems EASIER makes models WORSE (Frontier LLMs Still Struggle)
- Reflection repeats same failure 85% of time (Illusions of Reflection)
- Split-brain syndrome: 95% step accuracy, 0% final (Comprehension Without Competence)
- Self-conditioning: errors beget more errors (Illusion of Diminishing Returns)
- 100% knowledge ≠ reasoning: perfect factual knowledge, fails on application (Beyond Memorization)
- "Pattern regurgitators": 0% strong recovery on reasoning patterns (Can LLM Graph Reasoning)

### The "For" Position (Genuine Capability)
```
Base Model → Latent Reasoning → RL/Decoding Surfaces It → Real Capability
```
**Evidence:**
- CoT exists without prompting (Wang & Zhou)
- "Aha moment" emerges from pure RL (DeepSeek-R1)
- Tool augmentation shows execution ≠ reasoning limits (for SOME tasks)
- 1K samples sufficient to surface reasoning (s1)
- Confidence correlates with reasoning presence

### NEW: The Tool Augmentation Debate (Resolved?)

| Paper | Claim | Evidence |
|-------|-------|----------|
| Agentic Gap | Tools reverse collapse | Hanoi/River Crossing success |
| Thinking Isn't Illusion | Tool augmentation = fix | 0%→100% on Hanoi |
| **Limits of Innate Planning** | **Tools don't always work** | **Move validator = 0% on 8-puzzle** |

**Resolution**: Tool augmentation is TASK-DEPENDENT:
- Works for Hanoi (explicit algorithm provided)
- Fails for 8-puzzle (planning still required)
- **Implication**: Tools help with execution, not reasoning

---

## NEW: The Faithfulness Problem

### Key Finding from Lanham et al. (2023)

| Task | Early Answering AOC | Interpretation |
|------|---------------------|----------------|
| AQuA (math) | 0.44 | Model USES its CoT |
| ARC Easy | 0.02 | Model IGNORES its CoT |

**Critical insight**: CoT faithfulness is DECOUPLED from performance!
- Models can generate unfaithful reasoning that precedes correct answers
- Larger models = LESS faithful (inverse scaling)
- CoT is often post-hoc rationalization, not computation

### Implications for Thesis

1. **"Thinking" can be performative**: Generated text that LOOKS like reasoning
2. **Internal process ≠ stated process**: What models say ≠ how they compute
3. **Size makes it worse**: More capable models rely LESS on their stated reasoning

### NEW: Unfaithfulness "In The Wild" (Arcuschin et al., 2025)

**Critical extension**: Previous work required artificial bias in prompts. This paper shows unfaithfulness on **natural, unbiased prompts**.

| Model | Unfaithfulness Rate |
|-------|---------------------|
| GPT-4o-mini | **13%** |
| Haiku 3.5 | **7%** |
| Gemini 1.5 Pro | 6.54% |
| ChatGPT-4o | 0.49% |
| DeepSeek R1 | 0.37% |
| Sonnet 3.7 (thinking) | **0.04%** |

**Key finding**: Models answer YES to both "Is X > Y?" AND "Is Y > X?" — logically contradictory but with "coherent" arguments for both.

**Two mechanisms**:
1. **Implicit Post-Hoc Rationalization**: Predetermined answer → construct plausible reasoning
2. **Unfaithful Illogical Shortcuts**: Correct answer through wrong reasoning (not acknowledged)

**Implication**: Cannot use CoT for alignment verification — unfaithfulness occurs naturally.

---

## NEW: The Surfacing Hypothesis (s1 Evidence)

### Key Finding from s1 Paper

| Model | Training Data | AIME24 |
|-------|--------------|--------|
| Qwen2.5-32B-Instruct | 0 | 26.7% |
| s1-32B | 1K samples | 50.0% |
| s1-32B + budget forcing | 1K samples | 56.7% |

**Critical insight**: 1K samples CANNOT teach AIME-level mathematics!

The capability must **pre-exist** in the base model and be **surfaced** by:
1. Targeted SFT on reasoning traces
2. Budget forcing (preventing premature answer termination)

This directly supports: **"RL/SFT surfaces reasoning, doesn't create it"**

---

## NEW: The Semantic Override Principle

### Key Finding from Semantic Deception

| Model Type | Falls for Semantic Trap |
|------------|------------------------|
| GPT-4o (non-reasoning) | Never |
| DeepSeek-v3 (non-reasoning) | Never |
| o1 (reasoning) | 6% at Level 4b |
| R1 (reasoning) | 10% at Level 4b |

**Counterintuitive**: "Reasoning models" fail MORE often!

**Explanation**: CoT may AMPLIFY semantic associations by repeating content

**Hidden effect**: Even when models recognize the task:
- Level 1 accuracy: 96%
- Level 4b accuracy: 40%

Semantic load affects computation even when task recognition succeeds.

---

## NEW: The Planning Deficit (Limits of Innate Planning)

### Key Finding: Move Validator Test

The most critical experiment from "Limits of Innate Planning" (2511.21591):

**Setup**: Models receive:
- Current 8-puzzle state
- List of ALL valid moves
- Previous move (to avoid reversal)

Model only needs to SELECT best move — execution is completely offloaded.

**Result**: **0% success rate for ALL models**

| Model | Loop % | Early Stop % | Success |
|-------|--------|--------------|---------|
| GPT-5-Thinking | 100% | 0% | 0% |
| Gemini-2.5-Pro | 92% | 4% | 0% |
| Llama 3.1 8B | 86% | 12% | 0% |
| GPT-5-mini | 26% | 68% | 0% |

### Why This Matters for Thesis

1. **Directly refutes "Agentic Gap" argument**:
   - "Execution vs reasoning" distinction doesn't hold
   - When execution is offloaded, models STILL fail
   - The problem is planning/reasoning, not interface limitations

2. **Identifies two fundamental deficits**:
   - Brittle state representations
   - Weak heuristic planning (random-walk behavior)

3. **GPT-5-Thinking loops 100%** even with only valid moves:
   - SOTA "reasoning model" can't escape loops
   - More thinking time doesn't help
   - "PhD-level intelligence" can't solve simple puzzle

### Implications

**Tool augmentation works when**:
- Task has explicit algorithm (Hanoi recursive solution)
- Tool provides the solution steps
- Model only needs to execute

**Tool augmentation fails when**:
- Task requires planning (8-puzzle)
- Tool only provides valid options
- Model must determine best action

**Thesis claim**: LLMs can execute algorithms but cannot plan. Tool-dependent success proves execution capability, not reasoning capability.

---

## NEW: The "Surfacing" Hypothesis Confirmed (Interplay Paper)

### Controlled Experimental Evidence (2512.07783)

The "Interplay of Pre-Training, Mid-Training, and RL" paper provides the **controlled experimental evidence** the pattern-matching thesis needs:

| Pre-training Exposure | RL Transfer Result | Implication |
|-----------------------|-------------------|-------------|
| **0%** | **COMPLETE FAILURE** | Cannot synthesize from void |
| 0.1% | Failure | Not enough seeds |
| **≥1%** | **SUCCESS** (+60% pass@128) | Latent seeds exist to amplify |
| 10% | Strong success | More seeds = better transfer |

### When Does RL Help?

| RL Data Range | ID Tasks | OOD-edge Tasks | OOD-hard Tasks |
|---------------|----------|----------------|----------------|
| ID (op=7-10) | pass@1 ↑ | No change | No change |
| Edge (op=11-14) | pass@1 ↑ | **+42% pass@128** | Improvement |
| Hard (op=17-20) | No change | Minimal | Poor (too hard) |

**Key insight**: RL produces TRUE capability gains **only when**:
1. Task NOT covered in pre-training (headroom exists)
2. RL data at "edge of competence" (difficult but reachable)

### Reconciles Competing Views

| View | This Paper's Resolution |
|------|-------------------------|
| "RL doesn't improve reasoning" | True for ID tasks (already covered) |
| "RL dramatically improves reasoning" | True for OOD-edge tasks (sufficient headroom) |

> "The two competing views on whether RL genuinely improves a base model's reasoning ability do not truly conflict."

### Implications for Thesis

1. **RL is NOT magic**: Cannot create reasoning from nothing
2. **Pre-training is the bottleneck**: Capabilities must be seeded
3. **"Reasoning" = surfacing existing patterns**: Not generating novel understanding
4. **Distribution-bounded**: Success depends on training coverage

### Additional Evidence: Conformity Paper (2501.13381, ICLR 2025)

The "Conformity of LLMs" paper provides striking evidence that LLM behavior is pattern matching, not reasoning:

| Condition | Llama3-70B Independence Rate |
|-----------|------------------------------|
| Default (peer pressure) | **28.6%** |
| With Reflection Prompt | **68.5%** |

**Key insight**: Simply prompting "verify/reconsider your answer" **doubles** the independence rate (+39.9pp).

This demonstrates:
1. **LLMs have stored correct answers** — retrieved from training, not reasoned
2. **Default behavior is pattern-matching social context** — conforming to peer group
3. **Reflection re-weights which pattern to match** — parametric vs contextual
4. **Two competing pattern sources**: training data patterns vs in-context social patterns

| Protocol | Conformity Rate | After Reflection |
|----------|-----------------|------------------|
| Trust (built trust, then wrong) | 44.4% | **22.8%** (-21.6pp) |
| Doubt (built doubt, then correct) | 69.9% | **35.2%** (-34.7pp) |

**Quote**: "LLMs may adopt majority opinions despite knowing correct answers"

**Implications for thesis**: 
- LLMs don't "reason" to answers — they **retrieve** from training distributions
- When social patterns (context) conflict with parametric patterns (training), **social wins by default**
- Reflection shifts the weighting, **not the mechanism** — still pattern matching
- This is NOT "latent reasoning" but **competing pattern sources** with different default priorities

---

## NEW: Addressing "Strategic Reasoning" Evidence (Counter-Argument)

### The Challenge

"Emergence of Strategic Reasoning" (2412.13013) presents strong "FOR" evidence:
- GPT-o1 achieves τ=4.42 (4+ reasoning steps)
- Exceeds human strategic reasoning (τ≈1)
- "Most fundamental transition" documented

### Our Counter-Argument

**1. Games are in training distribution**:
- p-Beauty Contest, Guessing Game, Money Request Game = classical behavioral economics
- Extensive academic literature models may have trained on
- Pattern matching behavioral economics research ≠ genuine strategic understanding

**2. Performance drops for unusual parameters reveal limits**:

| Parameter | Expected Behavior | Actual Behavior |
|-----------|-------------------|-----------------|
| p=2/3 (standard) | High performance | High performance |
| **p=4/3 (unusual)** | **Adapt upward** | **POOR performance** |

> "LLMs are vastly trained on pBCGs which involve iterating downward" — Authors themselves

**3. Exceeding human τ ≠ genuine reasoning**:
- Humans may use heuristics (τ≈1)
- Models may pattern-match optimal solutions from literature
- Behavioral economics has studied equilibria extensively
- Models may have "seen the answer" in training

**4. The test we need**: Truly novel strategic games
- Not in behavioral economics literature
- No training data exists
- Prediction: Performance would collapse (like p=4/3)

### Integration with Thesis

> "Strategic reasoning in LRMs reflects sophisticated pattern completion within the behavioral economics literature, not genuine strategic understanding. The performance drop for unusual parameters (p=4/3) reveals the distribution boundary — models excel at games similar to training data but cannot extrapolate to variations not covered in their training."

This aligns with our core thesis: **practical but predictive** — works within distribution, fails outside.

---

## NEW: The "Aha Moment" Illusion (Illusion of Insight)

### DeepSeek-R1's Claim (Challenged)

DeepSeek-R1 reported:
> "The model learns to allocate more thinking time to a problem by reevaluating, reflecting on its approach, and exploring alternative strategies"

Evidence cited: Mid-trace cues like "Wait... let me re-evaluate step-by-step" preceding correct answers.

### This Paper's Findings (2601.00514)

Analysis of **1M+ reasoning traces** across multiple domains and architectures:

| Finding | Evidence |
|---------|----------|
| **Shifts are RARE** | ~2-6% of traces |
| **Don't increase with training** | Same frequency early/mid/late |
| **Seldom improve accuracy** | Negligible accuracy difference |
| **Correlate with UNCERTAINTY** | High entropy → more shifts |

### Key Insight: Instability, Not Insight

> "Mid-reasoning shifts are symptoms of unstable inference behavior rather than an intrinsic mechanism for self-correction"

| Entropy Level | What Happens |
|---------------|--------------|
| Low (confident) | No shift, continues path |
| High (uncertain) | Shift occurs = random exploration |

**The "Aha!" appearance is uncertainty-driven, not insight-driven.**

### Extrinsic vs Intrinsic

| Type | Effect |
|------|--------|
| **Intrinsic shifts** (natural) | Seldom help |
| **Extrinsic shifts** (forced under high entropy) | Reliably helps |

**Implication**: External intervention works; internal "insight" doesn't.

### Implications for Thesis

1. **"Thinking" appearance ≠ thinking**: Models LOOK like they're having insights, but aren't
2. **CoT self-correction is illusory**: Mid-trace shifts don't constitute genuine self-correction
3. **Key "FOR" evidence refuted**: DeepSeek-R1's "Aha moment" claim challenged with 1M+ trace analysis

---

## NEW: The Benchmark Illusion (Reasoning Models Reason Well, Until They Don't)

### Key Finding: Existing Benchmarks Are Trivially Easy

| Benchmark | LRM Accuracy | Actual Complexity |
|-----------|--------------|-------------------|
| NLGraph-hard | **99%** (o3-mini) | Lookahead < 1.8 |
| DeepRD (L=64) | ~80% | Moderate |
| DeepRD (L=300) | ~40% | High |
| DeepRD (L=800) | **~0%** | Very High |

**Critical insight**: "Existing benchmarks actually have limited complexity" — 99% on NLGraph proves nothing about generalization.

### Abrupt Performance Collapse

| Complexity (L) | R1 | o3-mini | o3 (full) |
|----------------|-----|---------|-----------|
| L=2 | ~100% | ~100% | ~100% |
| L=64 | ~80% | ~90% | - |
| L=300 | ~40% | ~60% | **10%** |
| L=800 | ~0% | ~10% | **0%** |

**Key observation**: Performance drops are ABRUPT, not gradual. This indicates a hard distribution boundary.

### Token Usage DECREASES at High Complexity

> "Token limits do not cause the drops in accuracy... completion token usage seems to *decrease* with increasing lookahead"

**Implication**: Models "give up" rather than try harder — they recognize being outside their competence.

### Even Chain Graphs Eventually Fail

For B=1 (NO search required, just follow edges):
- Depth=64: ~100%
- Depth=512: ~80%
- Depth=1536: **~40%**

**Even with NO search required**, models fail at sufficient depth. This is pure pattern matching limit.

### Real-World Long Tails

| Dataset | 50th %ile | 99th %ile | 99.9th %ile |
|---------|-----------|-----------|-------------|
| ConceptNet | ~3 | ~15 | ~30 |
| WikiKG2 | ~2 | ~10 | ~20 |
| NaturalProofs | ~5 | ~20 | ~40 |

> "The majority of real-world examples fall inside the LRMs' success regime, yet the long tails expose substantial failure potential"

### Implications for Thesis

1. **Benchmark scores are misleading**: 99% accuracy means nothing if benchmark is trivially easy
2. **Abrupt collapse = distribution boundary**: Not capability limit, but training distribution limit
3. **Real-world has dangerous long tails**: Critical problems will fail
4. **Even SOTA (o3) fails**: No escape from the pattern

---

## Evidence Mapping (Updated)

### For "Reasoning Exists in Base Models"

| Paper | Supporting Evidence |
|-------|---------------------|
| CoT Without Prompting | CoT paths in top-k tokens without training |
| DeepSeek-R1 | RL surfaces behaviors from base model |
| **s1** | **1K samples activates pre-existing reasoning** |

### For "RL Surfaces, Doesn't Create" (CRITICAL NEW EVIDENCE)

| Paper | Supporting Evidence |
|-------|---------------------|
| DeepSeek-R1 | Pure RL induces behaviors not explicitly trained |
| **s1** | **26.7% → 50% with only 1K samples** |
| **Interplay (2512.07783)** | **CONTROLLED EXPERIMENT**: 0% exposure = RL fails; ≥1% = success |

**Key quote from Interplay paper**:
> "RL cannot synthesize capabilities from a void; it requires latent 'seeds' to amplify"

**Controlled experimental design**:
- Synthetic reasoning tasks with parseable traces
- Systematic manipulation of training distributions
- 0% pre-training exposure → RL fails completely
- ≥1% exposure → RL succeeds (up to +60% pass@128)
- "Edge of competence" matters: RL only helps when task is "difficult but not yet out of reach"

### For "CoT ≠ Internal Computation" (NEW)

| Paper | Supporting Evidence |
|-------|---------------------|
| **Measuring Faithfulness** | **Truncation often doesn't change answer (post-hoc)** |
| **Measuring Faithfulness** | **Larger models = less faithful** |
| **Semantic Deception** | **Reasoning models fall for semantic traps** |
| CoT Mirage | Perfect ID, zero OOD despite CoT |

### For "Practical But Predictive"

| Paper | Supporting Evidence |
|-------|---------------------|
| GSM-Symbolic | Variance, fragility, distribution dependence |
| Illusion of Thinking | Collapse at high complexity |
| Faith and Fate | OOD failure despite perfect ID performance |
| **CoT Mirage** | **ID=100%, OOD=0%** |
| **Semantic Deception** | **Semantic associations override instructions** |
| **Limits of Innate Planning** | **0% with move validator; planning deficits** |
| **Lewis & Mitchell (TMLR 2025)** | **Robustness collapse on simple variants (permuted alphabets, etc.)** |
| **On the Notion that LMs Reason (2511.11810)** | **Theoretical framework: LMs as Markov kernels; "reasoning" = statistical regularities** |
| **Reasoning or Reciting (2307.02477)** | **Foundational counterfactual methodology; 40pp drops on CF tasks; high CCC = understanding ≠ reasoning** |
| **Gaming the Judge (2601.14691)** | **Judges pattern-match on CoT style; 90% FPR inflation from fabrication; surface features override evidence** |
| **Beyond Memorization (2601.13392)** | **100% knowledge + 0% novel application; 63pp drop seen→unseen; CoT degrades performance** |

### For "Tools ≠ Proof of Reasoning" (NEW)

| Paper | Supporting Evidence |
|-------|---------------------|
| **Limits of Innate Planning** | Move validator = 0% success on 8-puzzle |
| **Limits of Innate Planning** | GPT-5-Thinking loops 100% even with valid moves |
| Conceptual argument | Tools often provide algorithm; execution ≠ understanding |

### For "CoT is Correlation, Not Causation" (NEW)

| Paper | Supporting Evidence |
|-------|---------------------|
| **Correlation or Causation** | Only 30% LLMs have ideal causal structure (SCM Type I) |
| **Correlation or Causation** | 47% of LLM SCMs show CoT doesn't affect answers |
| **Correlation or Causation** | Distillation doesn't improve causality |
| **Correlation or Causation** | RLVR improves to 63% but not 100% |

### For "Strategic Reasoning Exists in LRMs" (FOR POSITION - Must Address)

| Paper | Supporting Evidence |
|-------|---------------------|
| **Emergence of Strategic Reasoning** | GPT-o1: τ=4.42 (4+ reasoning steps) |
| **Emergence of Strategic Reasoning** | LRMs exceed human performance (τ≈1) |
| **Emergence of Strategic Reasoning** | "Most fundamental transition" documented |

**COUNTER-EVIDENCE**: Performance drops for unusual parameters (p=4/3) reveals pattern matching limits

---

## The Three Key Questions (Updated)

### 1. Does reasoning exist in base models?
**Answer: YES** (CoT Without Prompting, DeepSeek-R1-Zero, s1)
- It's hidden by greedy decoding
- It exists as learned patterns from pretraining
- It can be surfaced by alternative decoding, SFT, or RL
- 1K samples sufficient to surface (s1)

### 2. Does RL create or surface reasoning?
**Answer: SURFACES** (the surfacing hypothesis)
- DeepSeek-R1-Zero shows emergence without human demos
- **s1 shows 1K samples cannot TEACH AIME math, only ACTIVATE existing capability**
- The "Aha moment" likely reflects learned self-correction patterns

### 3. Is the stated reasoning faithful?
**Answer: OFTEN NO** (NEW)
- CoT can be post-hoc rationalization (Measuring Faithfulness)
- Larger models generate LESS faithful reasoning
- Reasoning models can fall for semantic traps (Semantic Deception)
- Performance ≠ faithfulness — correct answers can come from unfaithful reasoning

### 4. Is this "genuine" reasoning?
**Answer: PRACTICAL BUT BOUNDED**
- It solves real problems (AIME 79.8%)
- It has distribution limits (collapse at high complexity)
- It doesn't extrapolate to truly novel problems
- It's "predictive" — predicts what reasoning looks like
- Semantic associations can override explicit instructions

---

## The Paper's Thesis (Refined with Controlled Evidence)

> **"The Thinking Machine That Doesn't Think"**
>
> Large Language Models possess reasoning-like capabilities that:
> 1. **Exist intrinsically** in base models (OLMo 3 evidence, s1 evidence)
> 2. **Are surfaced** by RL and alternative decoding, not created
>    - **CONTROLLED EVIDENCE**: 0% exposure = RL fails; ≥1% = success (Interplay paper)
>    - "RL cannot synthesize capabilities from a void; it requires latent 'seeds'"
> 3. **Are often unfaithful** — stated reasoning ≠ internal computation
>    - 7-13% unfaithful on NATURAL prompts (CoT In The Wild)
>    - 25-40% overall unfaithfulness (Reasoning Models Don't Say)
> 4. **Remain fundamentally predictive** — they interpolate patterns
>    - Only 30% of LLM causal chains are ideal (Correlation or Causation)
> 5. **Are practical** for many tasks within distribution
>    - Strategic reasoning τ=4.42 exceeds humans (BUT see limitations below)
> 6. **Cannot override training** — semantic associations dominate
> 7. **Cannot extrapolate** to genuinely novel reasoning challenges
>    - Planning fails even with tools: 0% with move validator (Limits of Innate Planning)
>    - Strategic reasoning drops for unusual parameters (p=4/3)
>
> The "thinking" in LRMs is sophisticated pattern completion that
> resembles reasoning sufficiently to solve many problems, but lacks
> the generative capacity to think beyond its training distribution.
> Moreover, the stated reasoning often does not reflect the actual
> computational process — it is performative, not explanatory.

### Key Evidence Summary

| Claim | Key Evidence | Source |
|-------|--------------|--------|
| RL surfaces, doesn't create | 0% exposure = fail; ≥1% = success | Interplay (2512.07783) |
| CoT is unfaithful | 7-13% on natural prompts | CoT In The Wild (2503.08679) |
| Distribution-bounded | ID=100%, OOD=0% | CoT Mirage (2508.01191) |
| Planning fails with tools | 0% with move validator | Limits of Innate Planning (2511.21591) |
| Strategic reasoning is bounded | p=4/3 performance drop | Emergence of Strategic Reasoning (2412.13013) |

---

## Visual Summary (Updated)

```
                    THE LANDSCAPE OF LLM REASONING
                    
        AGAINST                              FOR
   (Pattern Matching)                  (Genuine Capability)
          │                                    │
          │                                    │
    Faith and Fate ◄────── THEORETICAL ──────► DeepSeek-R1
    (subgraph match)          DEBATE          (emergent RL)
          │                                    │
          │                                    │
    GSM-Symbolic ◄────── EMPIRICAL ──────► CoT Without Prompting
    CoT Mirage              DEBATE           s1 (1K surfacing)
    (distribution)                           (intrinsic paths)
          │                                    │
          │                                    │
   Illusion of Thinking ◄─── PRACTICAL ───► Thinking Isn't Illusion
    (complexity collapse)     DEBATE         (tool augmentation)
          │                                    │
          │                                    │
   Measuring Faithfulness ◄── FAITHFULNESS ──► ???
   Semantic Deception          DEBATE         (no strong counter)
    (CoT ≠ computation)                        
          │                                    │
          └────────────────┬───────────────────┘
                           │
                           ▼
              ┌───────────────────────────────┐
              │     The Paper's POSITION     │
              │                               │
              │  • Reasoning exists (FOR)     │
              │  • RL surfaces it (FOR)       │
              │  • It's predictive (AGAINST)  │
              │  • It's often unfaithful (NEW)│
              │  • Practical but bounded      │
              │                               │
              │  "Thinking Machine That       │
              │   Doesn't Think"              │
              └───────────────────────────────┘
```

---

## Key Arguments Structure

### Argument 1: Reasoning Pre-Exists
- **Evidence**: CoT Without Prompting, DeepSeek-R1-Zero, s1 (1K samples)
- **Claim**: Base models contain latent reasoning patterns from pretraining
- **Implication**: RL/SFT is an ACTIVATION mechanism, not a CREATION mechanism

### Argument 2: CoT is Often Unfaithful
- **Evidence**: Measuring Faithfulness (post-hoc, inverse scaling)
- **Claim**: What models SAY ≠ how they COMPUTE
- **Implication**: "Thinking" is often performative, not computational

### Argument 3: Distribution Boundaries are Hard
- **Evidence**: GSM-Symbolic, CoT Mirage (ID=100%, OOD=0%), Faith and Fate
- **Claim**: Reasoning is interpolation, not extrapolation
- **Implication**: Novel problems outside training distribution will fail

### Argument 4: Semantic Associations Override Instructions
- **Evidence**: Semantic Deception (reasoning models fail MORE)
- **Claim**: Training patterns dominate over explicit instructions
- **Implication**: Models predict likely outputs, not compute solutions

### Argument 5: "Reflection" is Fluent Text, Not Functional Correction
- **Evidence**: Illusions of Reflection (85% same-failure), Illusion of Insight (2-6% aha moments)
- **Claim**: Models produce correct-sounding labels but don't bind them to generation
- **Implication**: "Thinking" appearance ≠ actual thinking

### Argument 6: Execution Fails Even With Plan+Knowledge
- **Evidence**: Illusion of Diminishing Returns (self-conditioning), Comprehension Without Competence (split-brain)
- **Claim**: Even when plan and knowledge are provided, long-horizon execution fails
- **Implication**: Not "can't think" but "can't execute sequences reliably"

### Argument 7: Memorization Dominates, Easier Can Be Harder
- **Evidence**: Frontier LLMs Still Struggle (Unpuzzles: 75%→20%), Reasoning Delirium
- **Claim**: Models memorize solutions, not understand problems
- **Implication**: Trivialized problems activate wrong memorized patterns

### Argument 8: Tool Use Supports Imitation, Not Reasoning
- **Evidence**: Thinking Isn't Illusion (tools fix Hanoi), Limits of Innate Planning (tools don't fix 8-puzzle)
- **Claim**: Tools work when they provide the algorithm; model just executes
- **Implication**: "Tool-augmented success" proves execution capability, not reasoning
- **Key insight**: If models could reason, they wouldn't need tools for problems humans solve mentally

### Argument 9: DeepSeek-R1 "Without Human CoT" Actually Supports Imitation
- **Evidence**: DeepSeek-R1 generates CoT that looks indistinguishable from human reasoning
- **Claim**: RL without human CoT demos still produces human-like CoT
- **Why this supports thesis**: 
  - The model learned to IMITATE human reasoning patterns from pre-training
  - RL surfaced these patterns, didn't create novel reasoning
  - If it were "genuine" reasoning, why would it look exactly like human CoT?
  - The form (human-like text) reveals the source (human training data)
- **Implication**: "Emergent" CoT is actually surfaced imitation of human reasoning traces

### Argument 10: Perfect Knowledge ≠ Compositional Reasoning
- **Evidence**: Beyond Memorization (2601.13392) — 100% factual knowledge, 30-64% drop on unseen DFA
- **Claim**: Models memorize facts but cannot compose them into novel solutions
- **Key findings**:
  - 100% accuracy on Theory of Computation definitions
  - 84-90% on seen DFA construction problems
  - 20-59% on unseen (same type, novel combinations)
  - CoT/ToT prompting only adds 1-4% (not a scaffold issue)
  - Even explicit error hints don't fix global consistency failures
- **The L1→L2 example**: 100% on "third-to-last is 'a'", 0% on "fourth-to-last is 'a' AND 'bb' never precedes 'a'"
- **Implication**: Pattern retrieval from training, not compositional symbolic reasoning

### Argument 11: Compositional Generalization is THE Failure Mode (NEW)
- **Evidence**: Compositional-ARC (o3-mini 0.53%), STEPS (power-law), KUP (<2% indirect)
- **Claim**: The fundamental limitation is composing known skills into novel combinations
- **Key findings**:
  - 5.7M MLC model beats 8B+ LLMs on systematicity
  - Power-law distribution: complex combinations are RARE in training
  - Direct probing (memorization) 70-80%, indirect probing (reasoning) <2%
- **Implication**: Not a capability limit, but a TRAINING DISTRIBUTION limit

### Argument 12: Instructions Cannot Override Learned Patterns (NEW)
- **Evidence**: Iterative ICL (13-35%), Revisiting Compositional (75% ceiling)
- **Claim**: Explicit instructions fail when they conflict with training patterns
- **Key findings**:
  - Rule override (+ before *) fails even with explicit instruction
  - 75% ceiling on ordered coverage despite instructions
  - Models produce IDENTICAL outputs for different orderings
- **Implication**: Training distribution dominates over explicit user instructions

### Argument 13: Environment Interface Doesn't Help Reasoning (NEW)
- **Evidence**: Limits of Emergent Reasoning Agentic (collapse EARLIER with tools)
- **Claim**: Agentic frameworks don't solve reasoning limits
- **Key findings**:
  - Agentic framework makes collapse happen EARLIER
  - ~40% deterministic looping
  - JSD diverges from BOTH optimal AND random policies
- **Implication**: "High-probability mode following, not genuine reasoning"

### Argument 14: Only Frontier Models Show Meta-Cognition (NEW)
- **Evidence**: LoopBench (O3 72%, GPT-4.1 0%)
- **Claim**: Meta-cognitive reasoning is extremely rare and scale-dependent
- **Key findings**:
  - Only O3 develops "wait" strategies to escape deadlocks
  - Discovery-Implementation Gap: weaker models execute but can't discover
  - Most models (including o3-mini) fail completely
- **Implication**: Meta-cognition may be surfaced capability, not fundamental understanding

---

## Key Findings from Recent Papers

### 1. "Unpuzzles" Paradigm (Frontier LLMs Still Struggle)

**The Phenomenon**: Making problems EASIER makes models perform WORSE

| Condition | GPT-4o | o1 | o3 | R1 |
|-----------|--------|-----|-----|-----|
| Original Puzzles | 75.3% | 86.7% | 87.6% | 87.6% |
| **Unpuzzles (trivial)** | **19.6%** | 59.8% | 74.2% | 59.8% |
| Context-Shifted | 52% | 59% | 80% | 67% |

**Mechanism**: "Reasoning delirium" — models apply memorized solution to wrong problem

**R1 at 0% character counting** — flagship reasoning model fails at trivial task!

### 2. "Fluent Self-Critique Without Correction" (Illusions of Reflection)

**The Phenomenon**: Reflection text looks correct but doesn't fix errors

| Metric | Value |
|--------|-------|
| Same-failure repeat rate | **85.36%** |
| Chance benchmark | 74.69% |
| Excess above chance | +10.68 pp (p=0.0001) |

**Reasoning models NO advantage**: Mean gain 0.036 vs 0.111 (actually WORSE!)

**Just trying again works as well as "reflection"** — active strategies ≈ simple retry

### 3. "Self-Conditioning Effect" (Illusion of Diminishing Returns)

**The Phenomenon**: Errors in context increase probability of future errors

| Induced Error Rate | Turn 100 Accuracy |
|--------------------|-------------------|
| 0% (healed) | ~90% |
| 50% | ~60% |
| 100% | ~40% |

**Opposite to humans** who improve with practice!

**Thinking models fix this** (Qwen3-thinking: 98% → 97% even with 100% error history)

### 4. "Split-Brain Syndrome" (Comprehension Without Competence)

**The Phenomenon**: High step accuracy, zero final accuracy

| Digit Length | Step Accuracy | Final Accuracy |
|--------------|---------------|----------------|
| 4-digit | 100% | 85% |
| 7-digit | 98% | 35% |
| **10-digit** | **95-100%** | **0%** |

**Implication**: Scale won't help — architectural limit

### 5. "Robustness of Analogical Reasoning" (Lewis & Mitchell, TMLR 2025)

**The Phenomenon**: GPT models lack robustness humans have on simple variants

**Paper**: "Evaluating the Robustness of Analogical Reasoning in GPT Models" (TMLR Feb 2025)
**Authors**: Martha Lewis, Melanie Mitchell (Santa Fe Institute)
**OpenReview**: https://openreview.net/forum?id=t5cy5v9wph

**Three domains tested** (variants of Webb et al. 2023 claims):

| Domain | Variant | Human | GPT-3/3.5/4 |
|--------|---------|-------|-------------|
| **Letter-string analogies** | Permuted alphabet | ~90% (stable) | **Sharp drop** |
| **Letter-string analogies** | Symbol alphabet | ~85% | **Near floor** |
| **Digit matrices** | Alternate blank position | ~65% (stable) | **Dramatic drop** |
| **Story analogies** | Answer order | No bias | **Strong bias (89%→61%)** |

**Key finding**: "Despite previously reported successes of GPT models on zero-shot analogical reasoning, these models often lack the robustness of zero-shot human analogy-making, exhibiting brittleness on most of the variations we tested."

**What this means for thesis**:
1. GPT performance depends on similarity to training data
2. Humans generalize; GPT models don't
3. "Narrow, non-transferable procedures for task solving" (cites Wu et al. 2023)
4. Paper explicitly cites AI Metacognition paper (Johnson et al. 2024)

**Relevance**: Peer-reviewed TMLR paper from Melanie Mitchell (co-author of AI Metacognition) directly testing robustness of analogical reasoning claims.

---

## Remaining High-Priority Papers

### Faithfulness (to strengthen Argument 2)
- [x] ~~Reasoning Models Don't Always Say What They Think (Chen et al.)~~ ✅ DONE
- [ ] Chain-of-Thought In The Wild Is Not Always Faithful (Arcuschin et al.)

### Distribution Boundaries (to strengthen Argument 3)
- [x] ~~Correlation or Causation (2509.17380)~~ ✅ DONE — causal structure analysis
- [x] ~~On the Limits of Innate Planning (2511.21591)~~ ✅ DONE

### Balanced Perspectives
- [x] ~~Comment: Agentic Gap (2506.18957) — execution vs reasoning~~ ✅ DONE
- [ ] Interplay of Pre-Training, Mid-Training, and RL
- [x] ~~Emergence of Strategic Reasoning (2412.13013)~~ ✅ DONE

---

## Next Steps

### Completed Analysis
1. ~~Read s1 paper~~ ✅ 
2. ~~Read Measuring Faithfulness~~ ✅
3. ~~Read Semantic Deception~~ ✅
4. ~~Read "Reasoning Models Don't Always Say What They Think"~~ ✅
5. ~~Read "Limits of Innate Planning"~~ ✅
6. ~~Read "Comment: Agentic Gap"~~ ✅
7. ~~Read "Correlation or Causation" (2509.17380)~~ ✅
8. ~~Read "Emergence of Strategic Reasoning" (2412.13013)~~ ✅
9. ~~Read "CoT In The Wild Not Faithful" (2503.08679)~~ ✅
10. ~~Read "Interplay of Pre-Training, Mid-Training, and RL" (2512.07783)~~ ✅
11. ~~Develop counter-argument to Strategic Reasoning paper~~ ✅

### Remaining Tasks
12. Document OLMo 3 experimental evidence (awaiting user input)
13. Create paper outline with evidence mapping
14. Structure the paper around the SEVEN main arguments
15. Develop the "predictive vs generative" distinction further

### Completed This Session
- [x] Comprehension Without Competence (2507.10624) ✅
- [x] Frontier LLMs Still Struggle (2507.07313) ✅
- [x] Illusions of Reflection (2510.18254) ✅
- [x] Illusion of Diminishing Returns (2509.09677) ✅
- [x] Reasoning Models Until They Don't (2510.22371) — prior session ✅
- [x] Illusion of Insight (2601.00514) — prior session ✅
- [x] LLMs Imitate Logical Reasoning (2509.12645) — prior session ✅

---

## Updated Evidence Summary Table

| Claim | Key Evidence | Source |
|-------|--------------|--------|
| RL surfaces, doesn't create | 0% exposure = fail; ≥1% = success | Interplay (2512.07783) |
| CoT is unfaithful | 7-13% on natural prompts | CoT In The Wild (2503.08679) |
| Distribution-bounded | ID=100%, OOD=0% | CoT Mirage (2508.01191) |
| Planning fails with tools | 0% with move validator | Limits of Innate Planning (2511.21591) |
| **Unpuzzles: easier=worse** | **GPT-4o 75%→20%** | **Frontier LLMs Still Struggle (2507.07313)** |
| **Reflection repeats failures** | **85% same-failure rate** | **Illusions of Reflection (2510.18254)** |
| **Self-conditioning effect** | **Errors beget errors** | **Illusion of Diminishing Returns (2509.09677)** |
| **Split-brain syndrome** | **95% step, 0% final** | **Comprehension Without Competence (2507.10624)** |
| **Reasoning delirium** | **Apply wrong memorized solution** | **Frontier LLMs Still Struggle (2507.07313)** |
| **R1 0% character counting** | **Flagship model fails trivial task** | **Frontier LLMs Still Struggle (2507.07313)** |
| **100% knowledge ≠ reasoning** | **100% factual, 30-64% drop on unseen** | **Beyond Memorization (2601.13392)** |
| **"Pattern regurgitators"** | **0% strong recovery on reasoning** | **Can LLM Graph Reasoning (2406.15992)** |
| **Prompting strategies fail** | **CoT/ToT: only 1-4% improvement** | **Beyond Memorization (2601.13392)** |
| **LRMs MORE biased on superficial features** | **32pp drop on BiasBench (88%→59%)** | **Reasoning Model Superior Judge (2601.03630)** |
| **"Systematic evaluation against metrics"** | **Pattern matching metric words** | **Reasoning Model Superior Judge (2601.03630)** |
| **RLIF degrades reasoning** | **Correct answers: 291→235 despite format improvement** | **No Free Lunch (2506.17219)** |
| **Overconfidence mechanism** | **Entropy minimization → shallow reasoning** | **No Free Lunch (2506.17219)** |
| **Transitional words suppressed** | **"but", "wait", "let me check" decrease 37%** | **No Free Lunch (2506.17219)** |
| **"LLMs cannot really reason"** | **Survey of 52 papers; "statistical pattern recognition"** | **Neuro-Symbolic AI Survey (2508.13678)** |
| **Neuro-symbolic compensates for LLM weaknesses** | **Symbolic = System 2 for reasoning** | **Neuro-Symbolic AI Survey (2508.13678)** |
| **Latent reasoning "real but fragile"** | **LRS: 0.38→0.03 (92% drop) on hard problems** | **Multilingual Latent Reasoners (2601.02996)** |
| **English-centric pathway** | **Internal reasoning converges to training distribution** | **Multilingual Latent Reasoners (2601.02996)** |
| **Induction = pattern matching** | **"Inductive ability originates from induction heads"** | **Survey of Inductive Reasoning (2510.10182)** |
| **Agentic makes collapse WORSE** | **Collapse earlier; ~40% deterministic looping** | **Limits Emergent Reasoning Agentic (2510.15974)** |
| **o3-mini 0.53% systematicity** | **3-shot 64%, systematicity 0.53% — memorization not reasoning** | **Compositional-ARC (2504.01445)** |
| **5.7M > 8B+ on composition** | **Small specialized model beats LLMs on systematicity** | **Compositional-ARC (2504.01445)** |
| **ALL methods <2% reasoning** | **Direct probing 70-80%, indirect <2%** | **KUP Memorization (2504.12523)** |
| **Retrieval ≠ application** | **H&M Russia: recalls fact, still recommends** | **KUP Memorization (2504.12523)** |
| **Only O3 meta-cognitive** | **72% vs 0% for GPT-4.1 on symmetry breaking** | **LoopBench (2512.13713)** |
| **Error signatures domain-specific** | **92%→55% cross-domain transfer** | **CRV Verifying CoT (2510.09312)** |
| **Rule override fails** | **13-35% on non-standard precedence** | **Iterative ICL Algebraic (2509.01267)** |
| **75% ceiling on ordered coverage** | **Instructions improve but don't solve** | **Revisiting Compositional Gen (2506.15629)** |
| **Power-law explains failure** | **Complex combinations rare in training** | **STEPS (2601.03676)** |
| **4K targeted > 52K random** | **Quality beats quantity for composition** | **STEPS (2601.03676)** |
| **Unconstrained diversity hurts** | **Instruct models degrade with random compositions** | **STEPS (2601.03676)** |
| **40-54pp encoding drops** | **Cryptographic encoding breaks compositional reasoning** | **CryptoX (2502.07813)** |
| **Open/closed gap** | **AUC 2.47 (open) vs 4.05 (closed) — training data matters** | **CryptoX (2502.07813)** |
| **Hierarchical layer processing** | **Mechanistic analysis shows sequential subtask processing** | **CryptoX (2502.07813)** |
| **Verbosity ≠ faithfulness** | **Models leave out key factors even when faithful** | **CoT Monitorability (2510.27378)** |
| **10.6% → 4.0%** | **Correct answers ≠ correct processes (60% lucky)** | **ARC/LoTH (2403.11793)** |
| **0% Medium/Hard ARC** | **Complete failure on complex compositional tasks** | **ARC/LoTH (2403.11793)** |
| **1D-ARC 90% vs ARC 10%** | **Representation matters more than reasoning** | **ARC/LoTH (2403.11793)** |

---

## Thesis Position (Strengthened)

**Total Papers**: 79 analyzed
**Stance Breakdown**: Supports=~55, Challenges=~8, Balanced=~16

The evidence now overwhelmingly supports the "Against" position:

1. **Reasoning pre-exists** but is pattern-based (surfacing, not creation)
2. **CoT is unfaithful** (7-40% depending on measure)
3. **Distribution boundaries are hard** (abrupt collapse, not gradual)
4. **Semantic associations dominate** (reasoning models fail MORE)
5. **"Reflection" is performative** (fluent text without correction)
6. **Execution fails** even with plan+knowledge (self-conditioning)
7. **Memorization dominates** (unpuzzles paradigm)

**Key quote from Illusions of Reflection**:
> "Simply adding more scratchpad is unlikely to fix it"

This directly challenges the "scaling reasoning" hypothesis.
