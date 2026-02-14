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

*This memento represents the complete picture from 192 papers. The tattoos don't lie. The hull boundary is real. The evidence converges.*

**Remember: It's retrieval, not reasoning. Over and over.**
