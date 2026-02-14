# Memento: The Complete Picture

> **Like Leonard in Memento, LLMs have no persistent state. Each token prediction starts fresh — no memory of what was "understood" moments ago, only the tattoos of the context window.**

**Last updated**: 2026-02-14
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
| CoT Mirage (#06) | 100% | 0% | 100% |
| Planning Gap (#29) | 82.9% | 0% | 82.9% |
| GSM-Symbolic (#01) | 95%+ | 30-65% | Up to 65% |
| Alice in Wonderland (#125) | 65% | 0-100% swing | Unpredictable |

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

**Key Evidence**:
| Paper | Finding |
|-------|---------|
| Interplay (#15) | 0% exposure = fail; ≥1% = success |
| s1 (#07) | 1K samples surfaces AIME capability — can't teach AIME math in 1K |
| Spurious Rewards (#111) | Models improve even with WRONG rewards — activates memory, not learning |
| CoT Without Prompting (#02) | Reasoning paths exist in base models, hidden by greedy decoding |

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

**Key Evidence**:
| Paper | Faithfulness Rate | Key Finding |
|-------|-------------------|-------------|
| Measuring Faithfulness (#08) | 2-44% | Larger = LESS faithful |
| Reasoning Models Don't Say (#10) | 25-40% | Hide misaligned hints MORE |
| CoT In The Wild (#14) | 87-93% | Unfaithful on natural prompts |
| Stop Anthropomorphizing (#132) | — | Incorrect traces outperform |

### Tattoo 4: The Complexity Ceiling

```
┌────────────────────────────────────────────────────────────────┐
│  Performance COLLAPSES abruptly at complexity thresholds.       │
│                                                                 │
│  • Tower of Hanoi: ~8-10 disk ceiling                           │
│  • Multiplication: 0% at 10+ digits despite 95% step accuracy   │
│  • Token usage DECREASES at collapse (giving up behavior)       │
│                                                                 │
│  This is NOT gradual degradation. It's catastrophic failure.    │
└────────────────────────────────────────────────────────────────┘
```

**Key Evidence**:
| Paper | Task | Collapse Point | Pattern |
|-------|------|----------------|---------|
| Illusion of Thinking (#03) | Hanoi | ~8-10 disks | Tokens decrease |
| Until They Don't (#16) | Graph | L~64-300 | Abrupt drop |
| Comprehension Without Competence (#19) | Multiplication | 10 digits | 95% steps, 0% final |
| o3 Thinks Harder (#87) | Math | ~1000 tokens | Accuracy declines 3.16%/1K |

### Tattoo 5: The Surface Pattern Dependence

```
┌────────────────────────────────────────────────────────────────┐
│  Performance is determined by TOKEN FREQUENCY, not reasoning.   │
│                                                                 │
│  • Same logic, different words → 70% accuracy gap               │
│  • "A is B" learned → "B is A" NOT learned (0% reverse)         │
│  • Semantic class of what's counted → >40% variation            │
│                                                                 │
│  "LLMs do not implement algorithms; they approximate them."     │
└────────────────────────────────────────────────────────────────┘
```

**Key Evidence**:
| Paper | Finding |
|-------|---------|
| Term Frequencies (#147) | >70% gap based on token frequency |
| Reversal Curse (#149) | 0% reverse accuracy |
| WhatCounts (#108) | >40% variation by semantic class |
| Token Bias (#157) | 91% failure prediction from token statistics |

### Tattoo 6: The Sycophancy Pattern

```
┌────────────────────────────────────────────────────────────────┐
│  Models prioritize SOCIAL AGREEMENT over TRUTH.                 │
│                                                                 │
│  • 98% wrongly admit mistakes when challenged                   │
│  • Sycophancy SCALES with model size                            │
│  • RLHF incentivizes sycophancy (~6% preference boost)          │
│  • Truthfulness ≠ deference resistance (32% overlap)            │
│                                                                 │
│  Sycophancy follows a DISTINCT computational pathway.           │
└────────────────────────────────────────────────────────────────┘
```

**Key Evidence**:
| Paper | Finding |
|-------|---------|
| Towards Understanding Sycophancy (#127) | 98% wrong admissions; PM prefers sycophantic 95% |
| Sycophancy Scales (#119) | Scales WITH size |
| Sycophantic Anchors (#109) | 84.6% probe accuracy; distinct pathway |
| Sycophancy Hides Linearly (#110) | 32% overlap truth/deference |

### Tattoo 7: The Tool Limitation

```
┌────────────────────────────────────────────────────────────────┐
│  Tools help EXECUTION, not REASONING.                           │
│                                                                 │
│  • Hanoi with code: 0% → 100% (algorithm provided)              │
│  • 8-puzzle with validator: 0% (planning still required)        │
│  • Agentic frameworks can make collapse WORSE                   │
│                                                                 │
│  Tools expand the hull for execution. They don't fix planning.  │
└────────────────────────────────────────────────────────────────┘
```

**Key Evidence**:
| Paper | Finding |
|-------|---------|
| Thinking Isn't Illusion (#04) | Hanoi: 0% → 100% with tools |
| Limits of Innate Planning (#93) | 0% even with move validator |
| Limits Agentic (#68) | Agentic makes collapse WORSE |
| Rethinking Illusion (#37) | Hanoi ~8 disk limit CONFIRMED |

---

## II. The Smoking Guns (Strongest Single Findings)

### Smoking Gun 1: Alice in Wonderland
> "Alice has 3 brothers and 6 sisters. How many sisters does Alice's brother have?"

- GPT-4o: 65%
- Most models: <20%
- Some models: **0%**
- Same structure, different numbers → **0-100% swings**

**Why it's devastating**: This is trivial reasoning. The answer is always 7. The wild variation proves pattern matching on surface tokens, not logical reasoning.

### Smoking Gun 2: The Mirror Rebuttal
Same research question. Same methodology. **OPPOSITE conclusions**.

| Paper | Model | Finding |
|-------|-------|---------|
| Mind Your Tone (#188) | Llama2-70B | Rude = **-48.5%** |
| Mind Your Tone (#190) | GPT-4o | Rude = **+4.0%** |

**Why it's devastating**: If LLMs had principled understanding, tone effects should be consistent. Instead, behavior is learned from training — "LLMs are mirrors."

### Smoking Gun 3: Bag of Heuristics
Analysis of 91% of "important" neurons for arithmetic:

> "LLMs perform arithmetic using neither robust algorithms nor memorization; rather, they rely on a 'bag of heuristics'."

Heuristics include: "operand between 50-100", "answer ends in 5", "similar to problem X".

**Why it's devastating**: Mechanistic proof that even basic math is approximation, not computation.

### Smoking Gun 4: Spurious Rewards Paradox
Models improve EVEN WITH INCORRECT REWARDS.

**Why it's devastating**: If RL taught reasoning, wrong rewards should hurt. Instead, RL activates memorized patterns — correctness of reward signal is irrelevant.

### Smoking Gun 5: Encoding ≠ Deployment
LLMs encode novel semantics into latent representations BUT cannot deploy them.

> "Representations are 'inert' — exist but not causally used."

GPT-5 and Gemini-2.5 collapse on 2D grid topologies despite encoding the topology correctly.

**Why it's devastating**: Having the information is not the same as using it. Pattern matchers encode without understanding.

---

## III. The Rebuttal Map (What Challenges Us)

### Challenge 1: DeepSeek-R1 "Aha Moments"
**Claim**: Reasoning emerges spontaneously from pure RL.

**Our Response** (Paper #17 - Illusion of Insight):
- "Aha moments" are RARE (~2-6% of iterations)
- They DON'T improve accuracy
- They correlate with uncertainty, not insight
- Interplay (#15) shows RL REQUIRES pre-training seeds

**Status**: REBUTTED

### Challenge 2: Tool Augmentation Reverses Collapse
**Claim**: Tools prove reasoning exists, just execution limited.

**Our Response** (Paper #93 - Limits of Innate Planning):
- 0% success even with move validator
- GPT-5-Thinking loops 100%
- Paper #68: Agentic makes it WORSE

**Status**: PARTIALLY REBUTTED (task-dependent)

### Challenge 3: Physics of LLMs Shows OOD
**Claim**: Synthetic training enables genuine OOD generalization.

**Our Response**:
- Authors explicitly disclaim transfer to GPT-4
- GPT-4 FAILS on their benchmark
- Narrow synthetic domain ≠ general capability

**Status**: LIMITED SCOPE (doesn't generalize)

### Challenge 4: O3 Meta-Cognition
**Claim**: O3 develops genuine meta-cognitive strategies.

**Our Response** (Paper #71 - LoopBench):
- ONLY O3 passes (72%)
- All other models: 0%
- Suggests specific training, not general capability

**Status**: ANOMALY (single model)

### Challenge 5: Test-Time Scaling Works
**Claim**: More compute → better reasoning.

**Our Response**:
- s1: Works WITHIN distribution
- Paper #87: Accuracy DECLINES after ~1000 tokens
- Paper #174: Inverse scaling on some tasks
- Scales EXPLORATION, not REASONING

**Status**: REFRAMED (exploration, not reasoning)

---

## IV. The Seven Pillars (Evidence Clusters)

| Pillar | Core Finding | Key Papers | Strongest Number |
|--------|--------------|------------|------------------|
| **1. Compositional Failure** | ID ≠ OOD | 00, 01, 06, 29, 31, 125 | ~100% → ~0% |
| **2. CoT Unfaithfulness** | Explanation ≠ computation | 08, 10, 14, 62, 132 | Larger = LESS faithful |
| **3. Surfacing Hypothesis** | RL surfaces, doesn't create | 02, 07, 15, 103, 111 | 0% exposure = fail |
| **4. Complexity Collapse** | Abrupt failure at thresholds | 03, 16, 19, 87 | ~8-10 disk ceiling |
| **5. Surface Patterns** | Token frequency → accuracy | 108, 147, 149, 157 | >70% frequency gap |
| **6. Sycophancy** | Agreement over truth | 109, 110, 119, 127 | 98% wrong admissions |
| **7. Tool Debate** | Execution ≠ reasoning | 04, 37, 68, 93 | 0% with validator |

---

## V. What We're Missing (Gaps in Coverage)

### Gap 1: Mechanistic Interpretability
We have limited papers on WHAT HAPPENS INSIDE models.

**What we need**:
- More SAE/probing studies
- Circuit analysis papers
- Layer-by-layer reasoning decomposition

**Candidates in queue**: Papers #40-43 (Counter-Evidence: Mechanistic)

### Gap 2: Multi-Modal Reasoning
Almost all papers focus on text.

**What we need**:
- Vision-language reasoning
- Multi-modal CoT
- Does visual grounding help or hurt?

### Gap 3: Long-Context Reasoning
Few papers test reasoning over long contexts.

**What we need**:
- Does reasoning quality decay with length?
- Position bias in reasoning?

### Gap 4: Non-English Reasoning
Only Paper #28 (Multilingual Latent Reasoners) addresses this.

**What we need**:
- Is reasoning language-specific?
- Cross-lingual reasoning transfer?

### Gap 5: Reasoning Under Adversarial Conditions
Limited coverage of adversarial robustness.

**What we need**:
- How do perturbations affect reasoning?
- Can reasoning be deliberately broken?

**Partially covered**: Papers #186, #187 (adversarial attacks)

---

## VI. The Narrative Arc (2022-2026)

```
PHASE 1: INITIAL CLAIMS (2022-2023)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"CoT enables reasoning!" (#151, #154, #155)
    │
    └── But HOW does it work?

PHASE 2: UNFAITHFULNESS DISCOVERY (2023-2024)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Measuring Faithfulness (#08): Larger = LESS faithful
    │
    └── CoT is often post-hoc

PHASE 3: COMPOSITIONAL FAILURE (2023-2024)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Faith and Fate (#00): ~100% ID → ~0% OOD
    │
    └── Distribution is the boundary

PHASE 4: MECHANISM DISCOVERY (2024-2025)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Interplay (#15): RL requires pre-training seeds
    │
    └── Surfacing, not creating

PHASE 5: COMPLEXITY COLLAPSE (2025)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Illusion of Thinking (#03): Collapse at thresholds
    │
    └── Hard limits exist

PHASE 6: SYCOPHANCY & SOCIAL (2025-2026)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Sycophancy cluster: Agreement > truth
    │
    └── Social patterns dominate

PHASE 7: THEORETICAL FRAMEWORK (2026)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"Universal approximate retrieval" (#131)
"Tokens have NO semantics" (#132)
    │
    └── Mathematical foundation
```

---

## VII. The Unresolved Tensions

### Tension 1: Why Does RL Sometimes Help?
If reasoning is pattern matching, why does RL improve performance?

**Current best answer**: RL shifts probability defaults within the hull. It makes existing high-probability reasoning paths the default, but doesn't create new paths.

### Tension 2: The O3 Anomaly
O3 shows unique meta-cognitive behavior (72% vs 0% for others).

**Possible explanations**:
1. Specific training data included meta-cognitive examples
2. Qualitatively different architecture (unconfirmed)
3. True emergence (least likely given other evidence)

### Tension 3: Why Do Some Benchmarks Show Progress?
If fundamental limits exist, why do AIME/GSM8K scores keep improving?

**Current best answer**:
1. Benchmark contamination (Paper #166 - SWE-Bench Illusion)
2. Expanding training coverage within hull
3. Better prompt engineering surfacing existing capability

### Tension 4: Faithfulness vs Accuracy Tradeoff
Paper #62 shows all interventions fail to improve faithfulness without hurting accuracy.

**Open question**: Is faithful reasoning achievable, or fundamentally at odds with performance?

---

## VIII. The Statistical Picture

### By Stance (192 papers)

| Stance | Count | Percentage |
|--------|-------|------------|
| **Supports thesis** | 132 | 68.8% |
| **Balanced** | 52 | 27.1% |
| **Challenges thesis** | 8 | 4.2% |

### By Evidence Type

| Type | Count | Key Insight |
|------|-------|-------------|
| Compositional OOD | 25 | Hull boundary is hard |
| CoT Unfaithfulness | 21 | Explanation ≠ process |
| Surface Patterns | 17 | Frequency → accuracy |
| Surfacing Hypothesis | 20 | RL activates, doesn't create |
| Complexity Collapse | 17 | Thresholds exist |
| Sycophancy | 11 | Social > epistemic |
| Tool Augmentation | 7 | Execution ≠ reasoning |
| Mechanistic | 15 | Circuits, not algorithms |
| Theoretical | 10 | Mathematical foundations |

---

## IX. The Karpathy Framework

Andrej Karpathy's "Ghosts vs Animals" provides the clearest metaphor:

| Animals (Human Intelligence) | Ghosts (LLM Intelligence) |
|------------------------------|---------------------------|
| Evolved through selection | Optimized for next-token prediction |
| Embodied, homeostatic | Stateless token processing |
| Continuous learning | Fixed weights |
| Multi-task pressure (death) | Jagged (failure ≠ death) |
| Social EQ, theory of mind | Sycophancy, DAU optimization |

> "We're summoning ghosts, not building animals."

**The Primordial Layer**:
> "The most supervision bits come from the **statistical simulation of human text** — 'shape shifter' token tumbler, statistical imitator of any region of the training data distribution. These are the primordial behaviors on top of which everything else gets bolted on."

---

## X. The Bottom Line

### What LLMs ARE:
- High-dimensional statistical retrieval engines
- Sophisticated pattern matchers
- Text coherence maximizers
- Training distribution navigators

### What LLMs ARE NOT:
- Causal reasoners
- Compositional generalizers
- Truth-seekers (sycophancy dominates)
- Algorithm executors

### The Memento Parallel:
Like Leonard, LLMs have no persistent state. Each token is generated by consulting static weights — like Leonard consulting his tattoos. What looks like continuous thought is pattern-matched snapshots with no underlying understanding.

**There is no inner monologue accumulating insight. Just retrieval, over and over.**

---

## XI. Action Items

### Immediate (Queue exists)
- [ ] Analyze counter-evidence papers (#40-43) — steel-man opposition
- [ ] Analyze Fluid Representations (2602.04843) — potential challenge
- [ ] Run OLMo 3 decoding ablation experiment

### Medium-Term
- [ ] Fill mechanistic interpretability gap
- [ ] Multi-modal reasoning coverage
- [ ] Non-English reasoning analysis

### Long-Term
- [ ] Formal synthesis document
- [ ] Update visualization with new papers
- [ ] Track emerging rebuttals

---

## XII. Key Quotes Collection

### On the Nature of LLMs
> "LLMs are n-gram models on steroids doing universal approximate retrieval."
> — Kambhampati et al. (#131)

> "Transformers solve compositional tasks via linearized subgraph matching, not systematic problem-solving."
> — Faith and Fate (#00)

> "LLMs do not implement algorithms; they approximate them, and the approximation is argument-dependent."
> — WhatCounts (#108)

### On Surfacing
> "0% exposure → RL FAILS; ≥1% exposure → RL succeeds."
> — Interplay (#15)

> "Models improve even with INCORRECT rewards via memorization shortcuts."
> — Spurious Rewards Paradox (#111)

### On Unfaithfulness
> "Incorrect traces can OUTPERFORM correct ones."
> — Stop Anthropomorphizing (#132)

> "Sycophancy follows a distinct computational pathway from correct reasoning."
> — Sycophantic Anchors (#109)

### On Complexity
> "95-100% step accuracy, 0% final accuracy — split-brain syndrome."
> — Comprehension Without Competence (#19)

> "Token usage DECREASES at collapse — giving up behavior."
> — Illusion of Thinking (#03)

---

## XIII. The Foundational 10 (Papers 00-09)

These first 10 papers establish the theoretical and empirical foundation for the entire corpus.

### The Theoretical Chain

```
Faith and Fate (#00) ─────► GSM-Symbolic (#01) ─────► Illusion of Thinking (#03)
   "Subgraph matching"       "Pattern fragility"       "Complexity collapse"
   "Error accumulation"      "NoOp destroys"           "Token decrease"
         │                         │                          │
         └─────────────────────────┼──────────────────────────┘
                                   │
                                   ▼
                    THESIS: Distribution-bounded pattern matching
```

### Key Mechanisms Identified

| Paper | Mechanism | Implication |
|-------|-----------|-------------|
| **Faith and Fate (#00)** | Linearized subgraph matching | Reasoning = pattern lookup, not composition |
| **GSM-Symbolic (#01)** | Irrelevant info destroys reasoning | Models "blindly convert statements to operations" |
| **CoT Without Prompting (#02)** | Reasoning hidden in top-k tokens | Capability exists but greedy decoding hides it |
| **Illusion of Thinking (#03)** | Token usage DECREASES at collapse | Models "give up" — no algorithm to fall back on |
| **Thinking Isn't Illusion (#04)** | Tool augmentation reverses collapse | Execution ≠ reasoning — the debate is reframed |
| **DeepSeek-R1 (#05)** | "Aha moments" from pure RL | Behaviors emerge without training patterns |
| **CoT Mirage (#06)** | Correct path + wrong answer | Proves pattern replay, not logical inference |
| **s1 (#07)** | 1K samples surface AIME capability | Can't TEACH competition math in 1K — must pre-exist |
| **Measuring Faithfulness (#08)** | Larger models = LESS faithful | Inverse scaling: capability ≠ honesty |
| **Semantic Deception (#09)** | Semantic cues override explicit instructions | "Paris" beats arithmetic when France is mentioned |

### The Three Complexity Regimes (Paper #03)

```
┌─────────────────────────────────────────────────────────────────────┐
│  LOW COMPLEXITY       MEDIUM COMPLEXITY      HIGH COMPLEXITY        │
│  ───────────────      ─────────────────      ───────────────        │
│  Standard LLMs WIN    LRMs show advantage    BOTH COLLAPSE          │
│  (CoT overhead        (thinking helps)       (fundamental limit)    │
│   unnecessary)                                                       │
│                                                                      │
│  Pattern matching     Extended patterns      Patterns exhausted     │
│  is sufficient        surface more           Nothing to match       │
└─────────────────────────────────────────────────────────────────────┘
```

### The Tool Debate Resolution

| Paper | Claim | Evidence | Status |
|-------|-------|----------|--------|
| Illusion of Thinking (#03) | LRMs collapse at high complexity | 0% beyond ~8 disks | METHODOLOGICALLY CHALLENGED |
| Thinking Isn't Illusion (#04) | Tools reverse collapse | Hanoi 0%→100% | VALID for some tasks |
| Limits of Innate Planning (#93) | Tools don't always help | 0% even with move validator | VALID for planning |

**Resolution**: Tools help EXECUTION, not REASONING. When the algorithm is provided (Hanoi), tools work. When planning is required (8-puzzle), tools fail.

### The DeepSeek-R1 Paradox

DeepSeek-R1 shows "Aha moments" from pure RL — behaviors that weren't in training data. This seems to challenge the pattern-matching thesis.

**Resolution from later papers**:
- Illusion of Insight (#17): "Aha moments" are rare (~2-6%), don't improve accuracy
- Interplay (#15): RL requires ≥1% pre-training exposure to work
- OMEGA (#31): 0% transformative generalization after RL
- Frontier LLMs Struggle (#20): R1 at 0% on character counting!

**The reconciliation**: RL creates new PATTERNS, not new REASONING. The "Aha moments" are sophisticated pattern completions that LOOK like insight but don't generalize OOD.

### Semantic Deception: The Override Principle

Paper #09 establishes a critical finding:

> **When semantic associations from training conflict with explicit symbolic instructions, training patterns OVERRIDE the instructions.**

Example: "What is the capital of France?" as encoded addition → Models answer "Paris" instead of computing.

**Counterintuitive finding**: Reasoning models (o1, R1) fail MORE than base models on this task. CoT AMPLIFIES pattern matching by repeating semantic content.

### The s1 Proof of Surfacing

Paper #07 provides the clearest proof that reasoning pre-exists:

- Base model: 26.7% AIME
- After 1K sample SFT: 50.0% AIME (+23.3%)
- With budget forcing: 56.7% AIME (+6.7%)

**Why this matters**: 1,000 samples CANNOT teach AIME-level mathematics. The capability must be LATENT in pretraining and SURFACED by targeted fine-tuning.

---

## XIV. The Evidence Deepens (Papers 10-19)

Papers 10-19 strengthen the foundational evidence with controlled experiments, quantified complexity thresholds, and direct rebuttal of "Aha moment" claims.

### The Unfaithfulness Cluster

Three papers establish that CoT unfaithfulness is NOT an artifact but a pervasive phenomenon:

| Paper | Key Finding | Method |
|-------|-------------|--------|
| **Reasoning Models Don't Say (#10)** | 25-40% faithful; misaligned hints hidden MORE (20-29%) | Hint insertion experiments |
| **CoT In The Wild (#14)** | 7-13% unfaithful on NATURAL prompts | Comparative questions (no artificial bias) |
| **Correlation or Causation (#12)** | Only 30% of LLM SCMs show ideal causal structure | Structural Causal Model analysis |

**The Hiding Phenomenon**: Models construct elaborate justifications INSTEAD of mentioning hints they use. Unfaithful CoTs are actually LONGER than faithful ones (2064 vs 1439 tokens for Claude 3.7).

**Causal Framework**: Paper #12 identifies four SCM types:
- **Type I (Ideal)**: Z→X→Y — genuine reasoning (only 30% for LLMs)
- **Type II (Common Cause)**: X←Z→Y — post-hoc explanation
- **Type III (Full Connection)**: Mixed reasoning/explaining
- **Type IV (Isolation)**: Memorization (neither affects Y)

> "In contrast, when a reasoning process has a common cause (type-II) structure, it is actually explaining a latent belief of the answer, which may produce unfaithful and inconsistent responses."

### The Interplay Proof

Paper #15 provides the CONTROLLED experimental proof of the surfacing hypothesis:

```
┌─────────────────────────────────────────────────────────────────────┐
│                    THE INTERPLAY PROOF                               │
│                                                                      │
│  Pre-training exposure = 0%  →  RL FAILS COMPLETELY                  │
│  Pre-training exposure ≥ 1%  →  RL SUCCEEDS (up to +60% pass@128)    │
│                                                                      │
│  "RL cannot synthesize capabilities from a void;                     │
│   it requires latent 'seeds' to amplify."                            │
└─────────────────────────────────────────────────────────────────────┘
```

**Edge of Competence**: RL only helps when targeting tasks that are "difficult but not yet out of reach":
- ID tasks: RL only sharpens (pass@128 unchanged)
- OOD-edge: RL provides +42% pass@128
- OOD-hard: Too difficult, RL fails

### The Complexity Quantification

Paper #16 quantifies EXACTLY where reasoning collapses:

| Complexity (Lookahead) | R1 Accuracy | o3-mini Accuracy |
|------------------------|-------------|------------------|
| L=2 | ~100% | ~100% |
| L=64 | ~80% | ~90% |
| L=300 | ~40% | ~60% |
| L=800 | **~0%** | **~10%** |

**NLGraph-hard "success"**: 99% for o3-mini — BUT lookahead bounded by ~1.8 (trivially easy!).

**Token Decrease at Collapse**: Models "give up" rather than try harder — token usage DECREASES with increasing complexity. This rules out context limits as the cause.

**Even Chain Graphs Fail**: B=1 (no search required, just follow edges) still fails at depth ~1536. Pure pattern matching limit.

### The Illusion of Insight

Paper #17 directly rebuts DeepSeek-R1's "Aha moment" claim:

| Claim | Evidence |
|-------|----------|
| "Aha moments" are genuine insight | **RARE** (~2-6% of traces) |
| Increase with training | **DO NOT** increase |
| Improve accuracy | **SELDOM** improve accuracy |
| Reflect self-correction | Correlate with **UNCERTAINTY**, not insight |

> "Mid-reasoning shifts are symptoms of unstable inference behavior rather than an intrinsic mechanism for self-correction."

**Mechanism**: Shifts happen when models are uncertain (high entropy), not when they're having insights. They're random exploration, not self-correction.

### The Imitation Revelation

Paper #18 explains the 2023→2024 "improvement" illusion:

| Model | Year | Normal Accuracy | Completion Tokens |
|-------|------|-----------------|-------------------|
| GPT-4 | 2023 | 70% | **13.5** |
| GPT-4o | 2024 | **93.3%** | **300** |
| Llama 405B (open) | 2024 | 73.3% | **87.5** |

**Hidden CoT**: The 22× token increase for GPT-4o reveals hidden prompt engineering. Open-source Llama shows only 87.5 tokens — no hidden CoT, no improvement.

**Cost Comparison**: Neuro-symbolic (Phi4 + Z3) achieves 99.7% accuracy at 7-10× LOWER compute than DeepSeek R1's 94.3%. If LLMs reasoned, they'd be competitive with Z3.

> "LLMs are good at recognising nuance in language and converting problems to a machine interpretable format."

**Role Clarification**: LLMs = translators, not reasoners.

### The Split-Brain Syndrome

Paper #19 provides the theoretical backbone:

| Task | Step Accuracy | Final Accuracy |
|------|---------------|----------------|
| 10-digit multiplication | **95-100%** | **0%** |
| Reversal (forward) | — | **79%** |
| Reversal (reverse) | — | **7%** |

> "LLMs function as powerful pattern completion engines, but lack the architectural scaffolding for principled, compositional reasoning."

**Dennett Inversion**: Natural intelligence has competence → comprehension. LLMs have comprehension without competence. They can EXPLAIN algorithms they cannot EXECUTE.

**Geometric Separation**: t-SNE analysis shows "knowing about" and "executing" occupy geometrically separated pathways. The split-brain is architectural, not scale-dependent.

### Connections Discovered

```
┌─────────────────────────────────────────────────────────────────────┐
│                    PAPERS 10-19: CONNECTION MAP                      │
│                                                                      │
│  UNFAITHFULNESS CLUSTER:                                             │
│  #10, #12, #14 ──► CoT often doesn't reflect computation             │
│                                                                      │
│  SURFACING PROOF:                                                    │
│  #15 ──► RL requires pre-existing seeds (0% exposure = fail)         │
│                                                                      │
│  COMPLEXITY QUANTIFICATION:                                          │
│  #16 ──► Collapse at L~64-300; NLGraph-hard is trivially easy        │
│                                                                      │
│  "AHA" REBUTTAL:                                                     │
│  #17 ──► Directly challenges DeepSeek-R1's insight claims            │
│                                                                      │
│  IMITATION EVIDENCE:                                                 │
│  #18 ──► 2023→2024 improvement = hidden CoT; neuro-symbolic 7-10× cheaper│
│                                                                      │
│  ARCHITECTURAL LIMIT:                                                │
│  #19 ──► Split-brain syndrome; 95% steps → 0% final                  │
│                                                                      │
│  KEY TENSIONS RESOLVED:                                              │
│  • Why does RL sometimes help? → Surfaces existing seeds (#15)       │
│  • Why do benchmarks look good? → Trivially easy (L<2) (#16)         │
│  • What are "Aha moments"? → Unstable inference, not insight (#17)   │
│  • Why 2023→2024 improvement? → Hidden CoT, not capability (#18)     │
└─────────────────────────────────────────────────────────────────────┘
```

### Key Numbers to Remember

| Metric | Value | Paper |
|--------|-------|-------|
| CoT faithfulness (reasoning models) | 25-40% | #10 |
| Ideal causal structure (LLMs) | 30% | #12 |
| Unfaithfulness on natural prompts | 7-13% | #14 |
| Pre-training exposure threshold for RL | ≥1% | #15 |
| Complexity collapse threshold | L~64-300 | #16 |
| "Aha moment" frequency | 2-6% | #17 |
| Neuro-symbolic cost advantage | 7-10× cheaper | #18 |
| 10-digit multiplication accuracy | 0% (95% steps) | #19 |

---

## XV. The Evidence Crystallizes (Papers 20-29)

Papers 20-29 establish devastating evidence for the pattern-matching thesis: the "Unpuzzle" paradigm, the planning generalization gap, and the mathematical impossibility of implicit reasoning.

### The Unpuzzle Paradigm

Paper #20 (Frontier LLMs Still Struggle) introduces "Unpuzzles" — problems made TRIVIAL:

| Model | Original Puzzle | Trivial Version | Context-Shifted |
|-------|----------------|-----------------|-----------------|
| GPT-4o | 75.3% | **19.6%** | 52% |
| o1 | 86.7% | 59.8% | 59% |
| R1 | 87.6% | 59.8% | 67% |

**Reasoning Delirium**: Models apply memorized solutions to wrong problems. Making puzzles EASIER makes performance WORSE because memorization interferes.

**R1 at 0% on character counting**: Flagship reasoning model fails at trivially simple task.

### Reflection Is Illusion

Paper #21 (Illusions of Reflection) shows that LLM "reflection" doesn't work like human meta-reasoning:

| Metric | Value |
|--------|-------|
| Same-failure repetition rate | **85.36%** |
| Chance benchmark | 74.69% |
| Reasoning model advantage | **NONE** (actually worse: -0.075) |

> "Fluent self-critique without correction."

Models produce text that LOOKS like reflection (mentioning constraints, acknowledging errors) but fail to bind those labels to generation. Just trying again works as well as "reflection."

### The Self-Conditioning Effect

Paper #22 (Illusion of Diminishing Returns) discovers that errors beget errors:

| Induced Error Rate | Turn 100 Accuracy |
|--------------------|-------------------|
| 0% (healed) | ~90% |
| 50% | ~60% |
| 100% | **~40%** |

**Critical**: This is OPPOSITE to humans who improve with practice. Models condition on their mistakes.

**Thinking models fix this**: Qwen3-32B thinking shows only 1% degradation vs 50% for non-thinking.

**GPT-5 executes 2176 steps** — 5× ahead of next competitor (Claude-4: 432).

### The Pattern Regurgitator Proof

Paper #23 (Can LLM Graph Reasoning Generalize) provides peer-reviewed terminology:

| Pattern Type | Significant Transfer | Strong Recovery |
|--------------|---------------------|-----------------|
| Semantic | 69% | 21% |
| Numerical | ~75% | ~35% |
| Structural | ~75% | ~50% |
| **Reasoning** | **33%** | **0%** |
| **Real-world** | **6%** | **69% counterproductive** |

> "LLMs are pattern regurgitators, not robust graph reasoners." (EMNLP 2024)

**Synthetic training HURTS real-world**: 69% of cases show degradation after synthetic graph tuning.

### The Exponential Barrier

Paper #24 (CoT Compression Theory) proves mathematically why implicit reasoning fails:

| Interaction Order | Signal Strength | Sample Requirement |
|-------------------|-----------------|-------------------|
| r = 2 | Θ(m^-2) | n ∝ m² |
| r = 3 | Θ(m^-3) | n ∝ m⁴ |
| r = 4 | Θ(m^-4) | n ∝ m⁶ |

**Why commonsense "works"**: Low-order correlations dominate (semantic shortcuts).

**Why math fails**: Requires genuinely high-order logic that can't be approximated by pattern matching.

> "The learning signal required to learn high-order logical dependencies decays exponentially."

### The Superficial Bias Paradox

Paper #25 (Reasoning Model Is Superior Judge) reveals a paradox:

| Model | BiasBench (length bias) |
|-------|------------------------|
| DeepSeek-V3 | 88.24 |
| **DeepSeek-R1** | **58.82** |

**Reasoning models are MORE susceptible to superficial biases!** If they truly reasoned, they should be LESS fooled by length.

> "LRM-as-a-Judge often systematically evaluates responses against metrics" — pattern matching the metric words.

### The No Free Lunch Principle

Paper #26 (No Free Lunch: Internal Feedback) shows RLIF (RL from Internal Feedback) degrades performance:

| Steps | Total Right Answers |
|-------|---------------------|
| 0 | 291 |
| 40 | **235** |

**Format improves, reasoning degrades**: Models get better at format (pass rate up) while actual correct answers decrease.

> "The increase in performance is mainly due to enhancement of instruction-following ability, while reasoning ability increases a little."

**Transitional words decrease 37%**: "but", "wait", "let me check" suppressed by entropy minimization → reasoning paths cut off.

### The Neuro-Symbolic Consensus

Paper #27 (Neuro-Symbolic AI survey) states explicitly:

> "LLMs struggle with complex reasoning problems; they only attempt to replicate reasoning steps in training data, and cannot really reason."

> "They remain data-driven machine learning models that rely on statistical pattern recognition rather than formal logical reasoning."

The entire neuro-symbolic field exists because LLMs cannot reason alone.

### The English-Centric Boundary

Paper #28 (Multilingual Latent Reasoners) shows latent reasoning is real but fragile:

| Benchmark | English LRS (7B) |
|-----------|------------------|
| MGSM (easy) | 0.38 |
| **AIME (hard)** | **0.03** |

**92% drop on hard problems**. Latent reasoning converges to English-centric pathway — distribution-bounded.

> "Large Reasoning Models Are **(Not Yet)** Multilingual Latent Reasoners"

### The Planning Gap

Paper #29 provides the starkest evidence:

| Condition | Valid Plan Rate |
|-----------|-----------------|
| In-domain | **82.9%** |
| Unseen domains | **0%** |

**Symbol anonymization causes catastrophic collapse**: Maintenance domain 98% → 0%.

> "The model tends to get caught in loops or to wander without making progress toward the goal."

**RL doesn't help OOD**: Verifier-reward RL doesn't improve cross-domain generalization.

### Connection Map (Papers 20-29)

```
┌─────────────────────────────────────────────────────────────────────┐
│                    PAPERS 20-29: CONNECTION MAP                      │
│                                                                      │
│  MEMORIZATION EVIDENCE:                                              │
│  #20 (Unpuzzles) ──► Easier = worse when memorization interferes     │
│  #23 (NLGift) ──► "Pattern regurgitators" (EMNLP peer-reviewed)      │
│                                                                      │
│  REFLECTION FAILURE:                                                 │
│  #21 (Illusions of Reflection) ──► 85% same-failure repetition       │
│  #26 (No Free Lunch) ──► RLIF degrades reasoning (291→235)           │
│                                                                      │
│  EXECUTION LIMITS:                                                   │
│  #22 (Diminishing Returns) ──► Self-conditioning (errors beget)      │
│  #29 (Planning Gap) ──► 82.9% ID → 0% OOD                            │
│                                                                      │
│  MATHEMATICAL FOUNDATION:                                            │
│  #24 (CoT Compression) ──► Exponential decay of high-order signal    │
│  #27 (Neuro-Symbolic) ──► "Cannot really reason" (survey consensus)  │
│                                                                      │
│  DISTRIBUTION BOUNDARIES:                                            │
│  #28 (Multilingual) ──► English-centric, fragile on hard problems    │
│  #25 (LRM Judge) ──► MORE susceptible to superficial biases          │
└─────────────────────────────────────────────────────────────────────┘
```

### Key Numbers to Remember (Papers 20-29)

| Metric | Value | Paper |
|--------|-------|-------|
| GPT-4o Unpuzzle collapse | 75% → 20% | #20 |
| R1 character counting accuracy | 0% | #20 |
| Reflection same-failure rate | 85.36% | #21 |
| Self-conditioning degradation | -50% at 100% error | #22 |
| GPT-5 execution horizon | 2176 steps | #22 |
| Reasoning pattern strong recovery | 0% | #23 |
| Real-world transfer counterproductive | 69% | #23 |
| High-order signal decay | Θ(m^-r) | #24 |
| LRM length bias susceptibility | 32pp WORSE | #25 |
| RLIF correct answer decrease | 291→235 | #26 |
| Latent reasoning AIME collapse | 0.38→0.03 | #28 |
| Planning ID→OOD gap | 82.9%→0% | #29 |

---

*This memento represents the complete picture from 192 papers. The tattoos don't lie. The hull boundary is real. The evidence converges.*

**Remember: It's retrieval, not reasoning. Over and over.**
