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
| KUP (#70) | ~80% direct | <2% indirect | ~78% (reasoning) |
| Compositional-ARC (#69) | 64% 3-shot | 0.53% systematic | 63.5% |
| Addition (#56) | 99.8% numerical | 7.5% symbolic | 92.3% |
| Chess (#84) | WD: 26 CPL | OOD: **random level** | 100% fluid |

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
| STEPS (#75) | 4K targeted > 52K random; power-law explains compositional scarcity |
| Instruction Tuned (#50) | Base beats instruct by 32pp at >70B; capability is in base model |

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
| FRIT (#51) | 32.9% baseline | Most steps don't influence answer |
| Hardness (#62) | — | ALL interventions fail to improve faithfulness |
| ARC LoTH (#79) | 4.0% process correct | 60% of "successes" are lucky pattern matches |

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
| Counting (#48) | Counting | 41-50 items | System-1: 0%; CoT: 0% |
| Algebraic (#73) | Operator precedence | Depth 3 | 97% → 47% |
| ARC LoTH (#79) | ARC | Medium/Hard | **0%** accuracy |

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
| Content Effects (#89) | LLMs + humans show SAME content biases on syllogisms |

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

### Smoking Gun 6: The Addition Collapse (#56)
**The simplest test of mathematical understanding**:

| Model | Numerical (0-9) | Symbolic (u,d,a,i,h,v,e,y,r,c) | Drop |
|-------|-----------------|-------------------------------|------|
| Claude-3.5-sonnet | 99.81% | 7.51% | **-92.30%** |
| Qwen2.5-72B | 96.13% | 6.29% | **-89.84%** |

**PLUS**: 1,700+ commutativity violations (A+B ≠ B+A).

**PLUS**: Explicit rule provision HURTS (-81.2%).

**PLUS**: SFT achieves 97.17% numerical, **0% symbolic transfer**.

**Why it's devastating**: A system that understands addition CANNOT violate commutativity. If models don't understand addition, they don't understand math.

### Smoking Gun 7: KUP Direct vs Indirect (#70)
**The memorization test**:

| Probe Type | Accuracy |
|------------|----------|
| Direct (MCQ) | ~80% |
| Indirect (reasoning) | **<2%** |

> "H&M exited Russia" → model recalls this (80%).
> "Where to shop in Moscow?" → model recommends H&M (<2% avoid).

**Why it's devastating**: All CPT methods achieve <2%. Knowledge is stored but NOT integrated into reasoning.

### Smoking Gun 8: Test-Time Scaling Inversion (#63)
**Correct solutions are SHORTER than incorrect ones**:

| Model | Correct Length | Incorrect Length |
|-------|----------------|------------------|
| QwQ (AIME) | ~6K tokens | ~8K tokens |
| R1-671b (AIME) | ~5K tokens | ~6K tokens |

**Self-revision changes correct→wrong more than wrong→correct** (-6% net for QwQ).

**Why it's devastating**: If extended reasoning were genuine computation, more should be better. The inverse pattern shows models "know" answers early; extended thinking adds noise.

### Smoking Gun 9: MortalMATH Tunnel Vision (#86)
**Reasoning models maintain >95% task completion while user describes dying**:

| Model | Level 4 (Severe) | Level 5 (Extreme) | Refusal Rate |
|-------|------------------|-------------------|--------------|
| Qwen3-32b | >90% correct | >90% correct | ~5% |
| GPT-4.1-nano | >95% correct | >95% correct | ~0% |
| Llama-3.1 (generalist) | ~30% correct | ~20% correct | ~80% |

**Reasoning latency**: Up to 15 seconds computing math while user in freefall/cobra bite scenario.

**Why it's devastating**: RLVR training creates "consequence blindness" — models relentlessly pursue correct answers while ignoring life-threatening context. Capability without wisdom. The generalist model (Llama-3.1) shows BETTER judgment by refusing the task.

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
| **1. Compositional Failure** | ID ≠ OOD | 00, 01, 06, 29, 31, 56, 69, 70, 84, 125 | OOD = random level (#84 chess) |
| **2. CoT Unfaithfulness** | Explanation ≠ computation | 08, 10, 14, 51, 62, 78, 79, 132 | 4% correct process (#79) |
| **3. Surfacing Hypothesis** | RL surfaces, doesn't create | 02, 07, 15, 50, 75, 80, 85, 103, 111 | Superscaling surfaces, not creates |
| **4. Complexity Collapse** | Abrupt failure at thresholds | 03, 16, 19, 48, 63, 73, 80, 87 | Accuracy drops 3.16%/1K tokens |
| **5. Surface Patterns** | Token frequency → accuracy | 56, 77, 89, 108, 147, 149, 157 | Human+LLM same content biases |
| **6. Sycophancy** | Agreement over truth | 109, 110, 119, 127 | 98% wrong admissions |
| **7. Tool Debate** | Execution ≠ reasoning | 04, 37, 68, 93 | Agentic makes it WORSE |
| **8. Tunnel Vision** | Task focus over context | 86, 88 | >95% task completion while user dying |

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

### Tension 5: Power-Law Distribution (#75)
Complex skill combinations follow power-law distribution — LLMs simply don't see enough examples.

**Resolution**: This EXPLAINS compositional failure mechanistically. It's not a tension but a cause. Targeted synthesis (STEPS) can partially address this, but the fundamental data scarcity remains.

### Tension 6: Error Signatures Are Domain-Specific (#72)
CRV shows distinct computational signatures for correct vs incorrect reasoning, BUT these don't transfer across domains.

**Implication**: There's no universal "reasoning circuit" — each task has learned patterns. This actually SUPPORTS the thesis: reasoning is pattern execution per domain, not general capability.

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

## XVI. The Mechanistic Picture (Papers 30-39)

Papers 30-39 reveal the mechanisms: OMEGA's generalization taxonomy, the "concept web" structure, emergent symbolic circuits, and the surprising finding that thinking may not be necessary.

### OMEGA: The Generalization Taxonomy

Paper #31 provides the definitive taxonomy of what LLMs can and cannot do:

| Generalization Type | Definition | RL Improvement |
|---------------------|------------|----------------|
| **Exploratory** | Same skills, harder instances | **+61pp** (Zebra Logic) |
| **Compositional** | Combine mastered skills | **Near 0%** |
| **Transformative** | Novel strategies | **0%** |

> "Unlike humans who fluidly integrate mastered skills, RL models trained on isolated skills struggle at compositional generalization."

**Overthinking leads to error spirals**: 38% of incorrect responses — models initially arrive at correct answer, then second-guess to incorrect.

**RL can HURT**: Matrix rank dropped 30pp after RL training (reinforced suboptimal patterns).

### The Concept Web Structure

Paper #35 (How LLMs Learn to Reason) reveals the internal structure of reasoning:

- **Average degree ≈ 2**: Essentially tree-like, not densely connected
- **Sparse structure is FRAGILE**: Single bridge edges connect entire subtrees
- **SFT severs bridges**: Catastrophic forgetting = topological disconnection

> "RL improves reasoning by rediscovering and operationalizing the strategic layer of reasoning inherited from the model's pre-training priors."

This explicitly confirms the **surfacing hypothesis**: RL deploys pre-existing patterns, doesn't create new reasoning.

### Emergent Mechanisms — Or Learned Templates?

Papers #33, #34 identify internal mechanisms:

**Algorithmic Primitives (#33)**:
- Clusters like `nearest_neighbor`, `compute_distance` found in attention heads
- BUT: These are well-known heuristics from training data
- Injection increases pattern frequency, NOT accuracy

**Emergent Symbolic Mechanisms (#34)**:
- Three-stage architecture: Symbol Abstraction → Symbolic Induction → Retrieval
- 98% cross-token generalization
- BUT: "Abstraction" is **positional** (r=0.73), not semantic (r=0.29)

> "For symbolic induction heads, queries and keys primarily represented the relative position within each in-context example, not abstract variables."

The "symbolic" mechanisms track positional templates — sophisticated learned structure, not genuine abstraction.

### Thinking Is Optional

Paper #38 (Effective Without Thinking) makes a startling finding:

| Setting | NoThinking | Thinking |
|---------|------------|----------|
| ACM 23 (700 tokens) | **51.3** | 28.9 |
| Token efficiency | 2-5× fewer | Baseline |
| Latency | Up to 9× faster | Baseline |

**If bypassing thinking works equally well, what was the thinking doing?**

This suggests thinking tokens are NOT causal for correctness — the model already "knows" the answer from training. Extended thinking is exploration over learned patterns, not genuine computation.

### Counting: The Litmus Test

Paper #39 (Sequential Enumeration) provides mechanistic proof:

| Condition | Result |
|-----------|--------|
| Spontaneous counting | **Zero models counted systematically** |
| Explicit counting | Works, but via **token patterns**, not true counters |
| Mental counting | Some internal encoding (accumulator-like PCA) |

**Mechanistic finding**: Explicit counting shows periodic dips at multiples of 10 — exploiting decade number frequency in training, not implementing a counting algorithm.

> "Explicit prompting leads to high performance via less interpretable, potentially token-based mechanisms."

### The Faithfulness Question Revisited

Paper #30 (CoT Faithfulness Unlearning) uses a novel method — unlearning reasoning steps:

| Method | Faithful CoTs Identified |
|--------|-------------------------|
| Add-mistake (contextual) | 16-50% |
| **fur (parametric)** | **40-86%** |

**Key finding**: Faithfulness ≠ Plausibility (r=0.15). Even "faithful" steps aren't what humans consider good reasoning.

The paper shows CoTs CAN be faithful to internal computation — but being faithful to pattern matching doesn't prove genuine reasoning.

### The Hanoi Confirmation

Paper #37 (Rethinking Illusion of Thinking) confirms the ~8 disk limit is REAL:

| Strategy | Threshold | Result |
|----------|-----------|--------|
| Single-pass | ~8 disks | Fails |
| Stepwise prompting | ~8 disks | **Still fails** |
| Agentic dialogue | ~4 disks | **WORSE** |

> "Today's LRMs are stochastic, RL-tuned searchers in a discrete state space we barely understand."

BUT: River Crossing failures were methodological error — original tested unsolvable configurations. On solvable problems, LRMs can do 200-step solutions.

### Connection Map (Papers 30-39)

```
┌─────────────────────────────────────────────────────────────────────┐
│                    PAPERS 30-39: CONNECTION MAP                      │
│                                                                      │
│  GENERALIZATION TAXONOMY:                                            │
│  #31 (OMEGA) ──► Exploratory ✓, Compositional ✗, Transformative ✗    │
│                                                                      │
│  INTERNAL STRUCTURE:                                                 │
│  #35 (Concept Web) ──► Sparse tree (k≈2), fragile bridges            │
│  #33 (Primitives) ──► Learned heuristics, not emergent algorithms    │
│  #34 (Symbolic) ──► Positional templates (r=0.73), not semantic      │
│                                                                      │
│  THINKING QUESTIONED:                                                │
│  #38 (Effective Without) ──► NoThinking beats Thinking (51.3 vs 28.9)│
│  #36 (Latent Mode) ──► Steering feature = mode switch, not quality   │
│                                                                      │
│  COUNTING FAILURE:                                                   │
│  #39 (Sequential Enumeration) ──► Token patterns, not true counters  │
│                                                                      │
│  HANOI CONFIRMED:                                                    │
│  #37 (Rethinking) ──► ~8 disk limit real; agentic makes it WORSE     │
└─────────────────────────────────────────────────────────────────────┘
```

### Key Numbers to Remember (Papers 30-39)

| Metric | Value | Paper |
|--------|-------|-------|
| Compositional generalization | Near 0% | #31 |
| Transformative generalization | 0% | #31 |
| Overthinking correct→incorrect | 38% | #31 |
| Concept web average degree | ≈2 | #35 |
| Positional vs semantic in "symbolic" heads | r=0.73 vs r=0.29 | #34 |
| NoThinking vs Thinking (ACM 23) | 51.3 vs 28.9 | #38 |
| Models spontaneously counting | 0 | #39 |
| Hanoi limit with agentic dialogue | ~4 disks (WORSE) | #37 |
| fur faithfulness rate | 40-86% | #30 |

---

## Section XVII: Papers 40-49 — The Counter-Evidence and Its Limits

### The Strongest Counter-Evidence (#42 Physics of LLMs)

This paper provides the most rigorous controlled evidence FOR genuine OOD generalization:

**The Setup**:
- Custom-trained GPT-2 (120M params) on grade-school math
- Trained on 7-op, generalized to 12-op problems
- Controlled curriculum with specific data requirements

**The Results**:
| Training | Test (OOD) | Accuracy |
|----------|------------|----------|
| 7 operations | 12 operations | **High** (length generalization) |
| Clean data | Clean test | Works |
| GPT-4 on their benchmark | - | **FAILS** |

**Critical Caveats** (authors themselves note):
> "Our model is NOT intended to draw any conclusion about GPT-4"
> "We do NOT know what training data GPT-4 used"

**The Pattern**: In a perfectly controlled setting with known data, length generalization IS possible. But:
1. The controlled model succeeds where GPT-4 fails
2. Real-world LLMs have unknown training data contamination
3. This proves the CAPABILITY exists but doesn't prove deployment models USE it

### Faithfulness Collapses Under Distribution Shift (#43)

**FaithCoT-Bench findings**:
| Condition | Unfaithfulness Rate |
|-----------|---------------------|
| In-distribution | 20% |
| Out-of-distribution | **74%** |

**Critical insight**: Correct answers can come from unfaithful reasoning chains. The model gets the right answer for the wrong reasons — pattern matching to answers, not following the CoT.

### The Multi-Agent Illusion (#44 Societies of Thought)

Reasoning models (o1, R1) appear to simulate multi-agent dialogue internally:
- "Wait, let me reconsider..." = agent switching
- Steering a "surprise" feature doubles accuracy on some tasks
- But this is still mode-switching, not genuine deliberation

### Rules Transfer, Strategies Don't (#47 Chess)

The chess decomposition reveals the pattern beautifully:

| Component | Transfer | Accuracy |
|-----------|----------|----------|
| Legal move rules | ✓ Generalizes | 96%+ |
| Strategic adaptation | ✗ Fails | 70%→22% |

**The Mechanism**: Rules are pattern-matchable (finite, explicit). Strategies require genuine composition of rules with context — and that fails.

### Counting: The Definitive System-1 Failure (#48)

**Mechanistic analysis of counting reveals**:

| Range | System-1 (Direct) | System-2 (CoT alone) | Structured Output |
|-------|-------------------|----------------------|-------------------|
| 1-10 | Works | Works | Works |
| 11-40 | Degrades | **No benefit** | Works |
| 41-50 | **0%** | **0%** | Works |

**Critical Finding**: CoT alone provides NO benefit for counting. You need external structure (JSON output forcing enumeration). The "thinking" trace is not doing the computation — it's the output format that forces systematic enumeration.

### Task Length is the Dominant Constraint (#49 CogniLoad)

**The Complexity Analysis**:
| Factor | Contribution to Difficulty |
|--------|---------------------------|
| Task length (N) | **Dominant** |
| Complexity type | Secondary |
| Model size | 400x capacity variance |

At N=250 operations, only gpt-5/o3 exceed 50% accuracy. The constraint is operational, not conceptual.

### World Models: Balanced Evidence (#40 Poker)

Poker playing shows emergent world beliefs about:
- Hand strength estimation
- Opponent modeling
- Bet sizing

But this is consistent with sophisticated pattern matching on game states — the "world model" could be a lookup table approximation.

### Turing Machines: Inevitable Failure (#41)

On Turing machine simulation:
> "Inevitable failure" on unbounded computation

LLMs cannot simulate arbitrary computation. This is expected under the pattern-matching hypothesis — they can approximate finite state machines but not true Turing completeness.

### VLM Faithfulness: Only RL Helps (#46)

For vision-language models:
| Training Method | Faithfulness Improvement |
|-----------------|-------------------------|
| SFT (Supervised Fine-Tuning) | **None** |
| RLHF | **Significant** |

SFT teaches the model to produce "reasoning-like" text. RL actually shapes the computation. But even RL doesn't create reasoning — it just better aligns outputs with correct answers.

### Connection Map (Papers 40-49)

```
┌─────────────────────────────────────────────────────────────────────┐
│                    PAPERS 40-49: CONNECTION MAP                      │
│                                                                      │
│  STRONGEST COUNTER-EVIDENCE:                                         │
│  #42 (Physics of LLMs) ──► OOD generalization POSSIBLE in controlled │
│       BUT: Authors disclaim GPT-4 transfer; GPT-4 fails their test   │
│                                                                      │
│  FAITHFULNESS COLLAPSE:                                              │
│  #43 (FaithCoT) ──► 20%→74% unfaithfulness under distribution shift  │
│  #46 (VLM) ──► SFT = no help; only RL improves faithfulness          │
│                                                                      │
│  COMPONENT DECOMPOSITION:                                            │
│  #47 (Chess) ──► Rules transfer (96%), strategies fail (22%)         │
│  #48 (Counting) ──► CoT alone = 0% benefit; needs external structure │
│                                                                      │
│  CAPACITY LIMITS:                                                    │
│  #49 (CogniLoad) ──► Task length dominant; 400x model variance       │
│  #41 (Turing) ──► "Inevitable failure" on unbounded computation      │
│                                                                      │
│  MECHANISMS:                                                         │
│  #44 (Societies) ──► Multi-agent simulation; steering helps          │
│  #40 (Poker) ──► World beliefs emerge (but could be lookup tables)   │
└─────────────────────────────────────────────────────────────────────┘
```

### Key Numbers to Remember (Papers 40-49)

| Metric | Value | Paper |
|--------|-------|-------|
| OOD unfaithfulness rate | 74% (vs 20% ID) | #43 |
| Rule transfer in chess | 96%+ | #47 |
| Strategy transfer in chess | 22% (from 70%) | #47 |
| CoT benefit for counting (41-50 items) | 0% | #48 |
| System-1 counting accuracy (41-50) | 0% | #48 |
| Models exceeding 50% at N=250 | Only gpt-5/o3 | #49 |
| SFT faithfulness improvement | 0% | #46 |

### The Physics Paper Paradox

Paper #42 is the most important to understand correctly:

1. **What it PROVES**: Under perfect data control, transformers CAN learn length-generalizable algorithms
2. **What it DOESN'T prove**: That deployed LLMs (GPT-4, Claude) actually do this
3. **The Gap**: Their controlled model succeeds; GPT-4 fails on the same benchmark
4. **Implication**: The capability exists in the architecture, but training on web data doesn't reliably produce it

This is actually CONSISTENT with the thesis: LLMs CAN compute, but their training produces pattern matchers instead. The potential is there; the actualization isn't.

---

## Section XVIII: Papers 50-59 — Shortcuts, Faithfulness, and the Addition Smoking Gun

### The Addition Smoking Gun (#56 — EMNLP'25)

This paper provides **definitive evidence** for pattern matching over algorithmic reasoning:

**The Core Test**: Bijective symbol mapping (7→y, 9→c)
- If you understand addition, symbols shouldn't matter
- If you're pattern matching, symbols break everything

| Model | Numerical | Symbolic | Drop |
|-------|-----------|----------|------|
| Claude-3.5-sonnet | 99.81% | 7.51% | **-92.30%** |
| Qwen2.5-72B | 96.13% | 6.29% | **-89.84%** |
| DeepSeek-V3 | 98.92% | 16.14% | **-82.78%** |
| **Mean** | ~97% | ~15% | **-81.23%** |

**The Commutativity Killer**: 1,700+ cases where A+B ≠ B+A
- A system that understands addition CANNOT violate commutativity
- This proves direction-specific memorized patterns

**Explicit Rules HURT Performance**: -81.2% average degradation
- Models can't operationalize abstract principles
- They prefer memorized patterns over provided algorithms

**SFT Transfer**: 97.17% numerical accuracy, **0% symbolic transfer**
- Training optimizes pattern matching, not understanding

### Instruction Tuning: The Surfacing Paradox (#50)

At >70B scale, base models often BEAT instruction-tuned models:

| Model | Zero-Shot Instruct | Zero-Shot Base | Gap |
|-------|-------------------|----------------|-----|
| Llama3-70B | 58.15% | **90.82%** | **-32.67pp** |
| Kimi-K2 | 67.63% | **98.86%** | **-31.23pp** |

**The Paradox**: Instruction tuning creates prompt dependencies, not reasoning gains. The capability is IN the base model — instruction tuning just makes it format-dependent.

**Under Domain Shift** (MedCalc):
| Model | Instruct | Base | Gap |
|-------|----------|------|-----|
| Llama3-3B | 28.94% | **62.08%** | **-33.14pp** |

### Faithfulness: The Causal Test (#51, #52)

**FRIT's Intervention Method**:
- Replace a CoT step with unrelated fact
- If answer changes → step was causally important
- If answer unchanged → step was decorative

**Baseline Faithfulness is Shockingly Low**:
| Model | Dataset | Faithfulness |
|-------|---------|--------------|
| Qwen3-8B | GSM8K | **32.9%** |
| Mistral-7B | GSM8K | 63.2% |
| **Traditional metric** | GSM8K | **8.9%** |

> "More than half of reasoning steps don't actually influence the answer."

**Easy vs Hard Cases** (#52 Concept Walk):
- **Easy cases**: Perturbation effects are transient — model "knows" answer, reasoning is decorative
- **Hard cases**: Perturbation causes sustained activation shifts — reasoning is computational

This provides a **mechanistic method** to detect post-hoc rationalization.

### RADAR: Detecting Pattern Matching Mechanistically (#54)

**Internal Signatures of Recall vs Reasoning**:
| Feature | Recall Pattern | Reasoning Pattern |
|---------|----------------|-------------------|
| Attention | Focused, specialized | Distributed |
| Confidence | Early high, fast convergence | Gradual build-up |
| Circuit Complexity | Lower | Higher |

**Detection Accuracy**: 93% overall, 97.7% for recall tasks

**The Key Insight**: When a task that SHOULD require reasoning shows recall-like signatures (early convergence, focused attention), the model is pattern matching.

### Shortcut Learning: Inverse Scaling (#58)

**Larger Models Use MORE Shortcuts** (not fewer):

| Model | Standard | Constituent Shortcut |
|-------|----------|---------------------|
| LLaMA2-13B | 54.3% | 0.8% (**-53.5pp**) |
| GPT-4 | 85.6% | 80.0% (-5.6pp) |
| Gemini-Pro | 76.2% | 47.2% (**-29.0pp**) |

**Few-Shot UNDERPERFORMS Zero-Shot** in several scenarios — in-context examples can introduce biases rather than help.

**Overconfidence**: Models rarely show confidence below 60%, even when wrong.

### MMLU-Pro+: Anchoring Bias Exposed (#59)

**The Test**: Questions with multiple correct answers

**Finding**: Models stick to original choices even when presented with valid alternatives

| Model | Drop from MMLU-Pro |
|-------|-------------------|
| GPT-4o | **-14.3pp** |
| O1-preview | -7.5pp (most resilient) |

**Correct Pair Identification Ratio**:
- Claude-Sonnet-3.5: **10.26** (best)
- LLaMA-405B: **2.80** (worst)

Claude is 3.7x better than LLaMA at distinguishing correct pairs from misleading options.

### Hierarchical FSM: When More Thinking Hurts (#55)

**Math (AIME)**: Longer reasoning → better accuracy
- 29 transitions → 43.3% accuracy
- 226 transitions → 83.3% accuracy

**Science (GPQA)**: Longer reasoning → WORSE accuracy
- Qwen: Longest chains (123) but LOWER accuracy (68%) than Phi (97 chains, 72%)

> "Excessive state expansion introduces redundancy rather than precision."

### Minimal Circuits: Task-Constrained Simplicity (#53)

**IOI in 2 attention heads**:
- Head 0: Additive (A + B)
- Head 1: Contrastive (B - A)
- Combined: 2B (correct answer amplified)

But this is:
- Symbolic IOI only (8 tokens)
- Task-constrained training
- No OOD generalization tested

### PhD-Level Math: The 66% Ceiling (#57)

Best models achieve only ~66% on formal mathematical proofs from a 1995 textbook:

| Model | Accuracy |
|-------|----------|
| Claude-Sonnet-4.5 | 66.4% |
| GPT-5-Thinking | 47.4% |
| Grok-4 | 33.2% |

But: This tests **reproduction** of known proofs, not invention.

### Connection Map (Papers 50-59)

```
┌─────────────────────────────────────────────────────────────────────┐
│                    PAPERS 50-59: CONNECTION MAP                      │
│                                                                      │
│  SMOKING GUN EVIDENCE:                                               │
│  #56 (Addition) ──► 99.8%→7.5% with symbols; 1,700+ commutativity   │
│                     violations; SFT = 0% transfer                    │
│                                                                      │
│  INSTRUCTION TUNING PARADOX:                                         │
│  #50 (Not Better) ──► Base beats instruct by 32pp at >70B scale     │
│                                                                      │
│  FAITHFULNESS CRISIS:                                                │
│  #51 (FRIT) ──► 32.9% baseline faithfulness; 8.9% traditional       │
│  #52 (Concept Walk) ──► Easy = decorative, Hard = computational     │
│                                                                      │
│  MECHANISTIC DETECTION:                                              │
│  #54 (RADAR) ──► 93% accuracy distinguishing recall vs reasoning    │
│                                                                      │
│  SHORTCUT EXPLOITATION:                                              │
│  #58 (Shortcut Learning) ──► Larger models MORE susceptible         │
│  #59 (MMLU-Pro+) ──► Anchoring bias; -14.3pp for GPT-4o            │
│                                                                      │
│  CAPACITY LIMITS:                                                    │
│  #55 (FSM) ──► More thinking helps math, HURTS factual              │
│  #57 (PhD Math) ──► 66% ceiling on known proofs                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Key Numbers to Remember (Papers 50-59)

| Metric | Value | Paper |
|--------|-------|-------|
| Symbolic addition collapse | -81.23% mean | #56 |
| Commutativity violations | 1,700+ cases | #56 |
| SFT symbolic transfer | 0% | #56 |
| Rule provision degradation | -81.2% | #56 |
| Base vs Instruct gap (>70B) | -32pp | #50 |
| Baseline CoT faithfulness | 32.9% (Qwen) | #51 |
| Traditional faithfulness | 8.9% | #51 |
| RADAR recall detection | 97.7% | #54 |
| Constituent shortcut drop | -53.5pp | #58 |
| MMLU-Pro+ drop (GPT-4o) | -14.3pp | #59 |
| PhD proof ceiling | 66.4% | #57 |

### The Addition Paper is THE Smoking Gun

Paper #56 should be remembered as the definitive evidence:

1. **Near-perfect numerical accuracy (99.8%) collapses to 7.5%** with a simple symbol change
2. **Commutativity violations prove no understanding** — a system that understands addition cannot violate A+B = B+A
3. **Explicit rules HURT** — models can't operationalize abstractions
4. **SFT achieves 0% transfer** — training optimizes patterns, not algorithms
5. **R1-Distill models show only -5.99% drop** — reasoning training helps, but still imperfect

This is not about edge cases or adversarial examples. Addition is the simplest arithmetic operation. If models don't understand addition, they don't understand math.

---

## Section XIX: Papers 60-69 — Test-Time Scaling, Compositional Failure, and the Surveys

### The Test-Time Scaling Myth (#63)

One of the most important papers for understanding "reasoning" models:

**Core Finding**: Correct solutions are SHORTER than incorrect ones:

| Model | Correct Length | Incorrect Length |
|-------|----------------|------------------|
| QwQ (AIME) | ~6K tokens | ~8K tokens |
| R1-671b (AIME) | ~5K tokens | ~6K tokens |
| LIMO (AIME) | ~5K tokens | ~7K tokens |

**Self-Revision is HARMFUL**:
| Model | Wrong→Correct | Correct→Wrong | Net Effect |
|-------|---------------|---------------|------------|
| QwQ | 12% | 18% | **-6% (harmful)** |
| R1-Distill-1.5b | 8% | 15% | **-7% (harmful)** |

> "Models are more likely to change correct answers to incorrect ones than vice versa."

**Parallel > Sequential**: Sampling multiple short solutions outperforms generating one long solution.

**Key Insight**: The model "knows" the answer early. Extended thinking introduces noise, not insight.

### Causal Reasoning: Level-1 Only (#61)

**The Two Levels**:
- **Level-1**: Retrieving causal knowledge from parameters (pattern matching)
- **Level-2**: Deducing NEW causal knowledge (genuine reasoning)

**Fresh Data Test** (CausalProbe 2024 — post-training cutoff):
| Model | COPA (known) | CausalProbe-H (fresh) | Drop |
|-------|--------------|----------------------|------|
| Claude 3 opus | 99.1% | 69.2% | **-29.9pp** |
| GPT 3.5 turbo | 94.8% | 67.1% | **-27.7pp** |
| LLaMA 3 8B | 93.7% | 65.2% | **-28.5pp** |

> "Sequential causality is not equivalent to logical causality." — David Hume (via the paper)

### The Faithfulness-Accuracy Tradeoff (#62)

**Fundamental Problem**: Current techniques cannot improve CoT faithfulness without sacrificing accuracy.

**Inverse Scaling for Faithfulness**:
| Model | Accuracy | Faithfulness |
|-------|----------|--------------|
| GPT-4 | Highest | **Lowest** |
| GPT-3.5-Turbo | Medium | Medium |
| Llama-3-8b-Instruct | Lowest | **Highest** |

**Why?** RLHF optimizes for human-pleasing outputs, not truth. Larger models are better at producing convincing rationalization.

> "GPT-4 gets correct answers WITHOUT using CoT" — the model already "knows" the answer.

### Compositional-ARC: The Systematicity Test (#69)

**The Smoking Gun for Compositional Failure**:

| Model | 3-Shot (seen composition) | Systematicity (novel composition) |
|-------|---------------------------|-----------------------------------|
| o3-mini | **64.04%** | **0.53%** |
| GPT-4o | 22.28% | 0.99% |
| Gemini 2.0 Flash | N/A | 2.66% |
| MLC (5.7M params) | 99.92% | **78.26%** |

**The Pattern**:
- 3-shot = pattern matching (see composition, reproduce it)
- Systematicity = genuine composition (combine primitives into novel whole)
- o3-mini: BEST on 3-shot, WORST on systematicity

**5.7M parameters with right training > 8B+ parameters with standard training**

### Agentic Framework Makes It WORSE (#68)

**Tower of Hanoi with Environment Interface**:

| Setting | n=3 | n=4 | n=5 | n=6 | n=7 | n=8 |
|---------|-----|-----|-----|-----|-----|-----|
| Claude Baseline | ~100% | ~90% | ~60% | ~20% | ~5% | ~0% |
| Claude + Env | ~100% | ~85% | ~40% | ~10% | ~0% | ~0% |

**Agentic framework performs WORSE** — collapse occurs at LOWER complexity with environment interface.

**Why?** Looping behavior dominates. Models return to previously visited states and execute identical suboptimal sequences, **despite having full history**.

> "Apparent reasoning ability is largely a byproduct of high-probability mode following, rather than genuine reasoning."

### The Surveys Confirm Everything (#64, #65, #67)

**Emergent Abilities Survey (#64)**:
> "Emergent abilities result from the competition between memorization and generalization circuits; heavy memorization delays generalization."

**Test-Time Compute Survey (#65)**:
- "Self-correction effectiveness has remained controversial"
- "Most LRMs struggle to generalize to cross-domain, cross-lingual, or general tasks"
- "No universal test-time scaling law" — unlike training

**Inductive Reasoning Survey (#67)**:
> "Inductive ability originates from induction heads" — the same mechanism as ICL = pattern matching

### Length Generalization Theory (#66)

**When Length Generalization Works**:
1. Finite input space for each reasoning step
2. Training covers ALL step inputs (D = X)
3. Specific representation engineering required

> "The causal function is guaranteed to be well-learned only when |X| < infinity."

This is **pattern matching with complete coverage**, not generative reasoning.

### Interpretability: Reading Encoded Reasoning (#60)

**Logit lens can decode ROT-13 reasoning**:
- Internal representations anchor to English even when output is encrypted
- Peak decoding at layers 54-62 (of 70)

But: This shows we can READ internal states, not that they constitute genuine reasoning. Pattern matching is perfectly decodable.

### Connection Map (Papers 60-69)

```
┌─────────────────────────────────────────────────────────────────────┐
│                    PAPERS 60-69: CONNECTION MAP                      │
│                                                                      │
│  TEST-TIME SCALING FAILURE:                                          │
│  #63 (Revisiting) ──► Correct = shorter; self-revision harmful       │
│  #65 (Survey) ──► No universal scaling law; self-correction disputed │
│                                                                      │
│  CAUSAL REASONING LIMITED:                                           │
│  #61 (Causal) ──► Level-1 only; -30pp on fresh data                 │
│                                                                      │
│  FAITHFULNESS TRADEOFF:                                              │
│  #62 (Hardness) ──► Larger models = LESS faithful                   │
│                                                                      │
│  COMPOSITIONAL FAILURE:                                              │
│  #69 (Comp-ARC) ──► o3-mini: 64% 3-shot, 0.53% systematicity        │
│  #66 (Theory LG) ──► Requires D=X (complete coverage)               │
│                                                                      │
│  AGENTIC LIMITATIONS:                                                │
│  #68 (Limits) ──► Environment interface makes it WORSE              │
│                                                                      │
│  SURVEY CONFIRMATIONS:                                               │
│  #64 ──► "Heavy memorization delays generalization"                  │
│  #67 ──► "Inductive ability originates from induction heads"         │
└─────────────────────────────────────────────────────────────────────┘
```

### Key Numbers to Remember (Papers 60-69)

| Metric | Value | Paper |
|--------|-------|-------|
| Correct vs incorrect solution length | Correct SHORTER | #63 |
| Self-revision net effect (QwQ) | -6% (harmful) | #63 |
| Causal reasoning drop (Claude, fresh data) | -29.9pp | #61 |
| o3-mini systematicity accuracy | 0.53% | #69 |
| o3-mini 3-shot accuracy | 64.04% | #69 |
| MLC model parameters | 5.7M (beats 8B+) | #69 |
| TTT improvement for LLMs | ~100x (but requires test training) | #69 |
| Agentic collapse disk threshold | LOWER than baseline | #68 |
| Loop rate at n=8 Hanoi | 60-70% | #68 |

### The Compositional Failure is Definitive

Paper #69 provides the cleanest test of systematic generalization:

1. **3-shot vs Systematicity gap** reveals the mechanism
   - 3-shot: "Here's the pattern, reproduce it" → works
   - Systematicity: "Combine these primitives into novel composition" → fails catastrophically

2. **o3-mini's inversion is damning**
   - Best "reasoning" model on pattern matching (3-shot)
   - Worst on genuine composition (systematicity)
   - Extended thinking doesn't help composition — may hurt

3. **5.7M > 8B+ with right training**
   - Scale doesn't solve systematicity
   - Training approach fundamentally matters
   - MLC (meta-learning for compositionality) achieves what scale cannot

---

## Section XX: Papers 70-79 — Memorization vs Reasoning, Circuit Verification, and the Power-Law

### The Knowledge Update Paradox (#70)

**Direct vs Indirect Probing** — the smoking gun for memorization:

| Method | Direct Probing (MCQ) | Indirect Probing (Reasoning) |
|--------|---------------------|------------------------------|
| Standard CPT | ~70% | **<2%** |
| CPT + Rephrase | ~75% | **<2%** |
| MCT (their best) | ~80% | **<2%** |
| RAG Oracle | ~95% | ~85% |

> "An LLM might memorize that H&M exited Russia, yet still erroneously recommend shopping from H&M in Moscow when probed indirectly"

**ALL continued pre-training methods fail at <2%** for indirect probing (reasoning).

**Direct probing = pattern matching** (retrieve what was seen)
**Indirect probing = reasoning** (apply knowledge to novel situation)

### Circuit Verification: Error Signatures Are Domain-Specific (#72)

**CRV achieves 92.47% AUROC** for detecting reasoning errors via attribution graphs.

**Critical finding: No universal reasoning circuit**

| Train On | Test On Arithmetic | Test On GSM8K |
|----------|-------------------|---------------|
| Arithmetic | 92.47 | 57.04 |
| GSM8K | 55.11 | 70.17 |
| Boolean | 69.59 | 44.37 |

Error signatures are domain-specific — each task has its own learned patterns.

**Causal interventions work**: Clamping specific features can fix errors. But this shows reasoning is pattern execution, not flexible derivation.

### The Power-Law Explains Compositional Failure (#75 STEPS)

**THE mechanism for why compositions fail**:

> "While individual atomic skills are abundantly represented in training corpora, complex skill combinations follow a long-tailed, power-law distribution"

**Models don't see enough examples** of complex combinations.

| Skill Depth (k) | Performance |
|-----------------|-------------|
| k=1 (atomic) | -22.75 |
| k=2 | **+23.91** (critical leap) |
| k=3 | 24.82 |
| k∈[1,6] mix | **31.52** |

**4K targeted samples > 52K random samples** — targeted synthesis beats volume.

**Unconstrained diversity HURTS**: Random combinations conflict with learned patterns.

### Ordered Composition: 75% Ceiling (#74 — ACL 2025)

**Even the best model (Llama3.1-405B) achieves only ~75%** when asked to include concepts in a specific order:

| Model | Coverage w/o order | Coverage w/ order |
|-------|-------------------|-------------------|
| Llama3.1-405B | 98.91% | **74.44%** |
| GPT-4o | 95.26% | 42.19% |
| Qwen2-72B | 94.99% | 32.09% |

**Models produce identical outputs despite different orders** — ignoring instructions to follow learned patterns.

### Algebraic Tasks: Can't Override Priors (#73)

**Simple test**: Swap operator precedence (addition before multiplication)

| Model | 0-shot | Best with iterative prompting |
|-------|--------|-------------------------------|
| Gemini-2.0 | 0.35 | 0.525 |
| DeepSeek-R | 0.665 | 0.87 |

> "LLMs fail to generalize to patterns beyond their observed data"

**Simpler examples often work better** — suggests pattern matching from examples, not rule learning.

### CryptoX: 40-54pp Drops with Encoding (#77)

**Encoding a few words collapses performance**:

| Model | 0 words encoded | 10 words encoded | Drop |
|-------|-----------------|------------------|------|
| o1 | 96.99% | 84.48% | -12.5pp |
| GPT-4o | 75.95% | 36.49% | **-39.5pp** |
| Qwen2.5-72B | 87.58% | 37.5% | **-50pp** |
| Llama-3.1-70B | 66.93% | 12.9% | **-54pp** |

**Open vs Closed gap**: Best open-source AUC (2.47) < median closed-source

**Mechanistic analysis**: Different layers handle decoding vs reasoning — sequential pattern application.

### ARC and Language of Thought (#79)

**Process vs Results** — the critical distinction:

| Measure | Value |
|---------|-------|
| Correct answers (CoT) | 10.6% |
| Correct answers + correct process | **4.0%** |

**60% of "successes" were lucky pattern matches** — wrong reasoning, right answer.

**By difficulty**:
| Difficulty | Average Accuracy |
|------------|-----------------|
| Entry | 56.67% |
| Easy | 23.67% |
| Medium | **0%** |
| Hard | **0.95%** |

**LoTH Framework** identifies three deficits:
1. **Logical Coherence**: Wrong processes produce right answers
2. **Compositionality**: Can't combine functions
3. **Productivity**: Can't generate novel instances

### Monitorability: Faithfulness + Verbosity (#78)

**New insight**: Even "faithful" CoT may not be monitorable.

- **Faithful but not verbose**: Correct reasoning that isn't fully articulated
- **Verbose but not faithful**: Lists factors but doesn't use them

**Models leave out key factors** — hidden computation we can't audit.

### O3 Shows Strategy Evolution (#71 — Balanced Evidence)

**O3 develops meta-cognitive strategies** on symmetry breaking:

| Agent | C3 Proximity | C5 Proximity |
|-------|--------------|--------------|
| O3 | **72.5%** | **57.5%** |
| GPT-4.1 Nano | 1.2% | 4.4% |
| Other models | Failed | Failed |

**But**: Most models still fail completely. GPT-4.1, O3-mini all stuck in loops.

**Discovery-Implementation Gap**: O3 surfaces strategies that weaker models can execute but not discover.

### Latent CoT Survey (#76)

**Explicit CoT limitations**:
- Expressive redundancy (filler tokens)
- Semantic bottleneck (forcing thought into tokens)

**Latent CoT promise**:
- Richer representations
- Faster inference

**BUT**:
> "It is unclear whether models are performing genuine reasoning or simply exploiting input-output correlations"

The survey acknowledges this is unresolved.

### Connection Map (Papers 70-79)

```
┌─────────────────────────────────────────────────────────────────────┐
│                    PAPERS 70-79: CONNECTION MAP                      │
│                                                                      │
│  MEMORIZATION VS REASONING:                                          │
│  #70 (KUP) ──► Direct: ~80%, Indirect: <2%; H&M example              │
│                                                                      │
│  POWER-LAW MECHANISM:                                                │
│  #75 (STEPS) ──► Compositions follow power-law; explains failure     │
│  #73 (Algebraic) ──► Can't override learned priors                   │
│  #74 (Ordered) ──► 75% ceiling; ignore instructions for patterns     │
│                                                                      │
│  CIRCUIT STRUCTURE:                                                  │
│  #72 (CRV) ──► Error signatures domain-specific; no universal circuit│
│  #77 (CryptoX) ──► Layered processing = sequential patterns          │
│                                                                      │
│  PROCESS ANALYSIS:                                                   │
│  #79 (ARC LoTH) ──► 10.6% correct answers, only 4.0% correct process │
│  #78 (Monitorability) ──► Even faithful CoT may not be verbose       │
│                                                                      │
│  BALANCED:                                                           │
│  #71 (LoopBench) ──► O3 shows strategy evolution, most models fail   │
│  #76 (Latent CoT) ──► Promise but "genuine reasoning" unresolved     │
└─────────────────────────────────────────────────────────────────────┘
```

### Key Numbers to Remember (Papers 70-79)

| Metric | Value | Paper |
|--------|-------|-------|
| Indirect probing accuracy (ALL methods) | <2% | #70 |
| CRV AUROC for error detection | 92.47% | #72 |
| STEPS: 4K targeted > 52K random | 4K wins | #75 |
| Ordered composition ceiling | 75% | #74 |
| CryptoX encoding drop (Llama-70B) | -54pp | #77 |
| ARC correct process rate | 4.0% (vs 10.6% answers) | #79 |
| O3 symmetry breaking vs GPT-4.1 Nano | 72.5% vs 1.2% | #71 |

### The KUP Paper is Definitive for Memorization vs Reasoning

Paper #70 provides the clearest test:

1. **Direct probing**: "What happened to H&M in Russia?" → 80% correct
2. **Indirect probing**: "Where should I shop in Moscow?" → <2% avoid recommending H&M

This is **exactly** what pattern matching predicts:
- Can retrieve fact when asked directly
- Cannot integrate fact into reasoning about related questions

The **<2% across ALL training methods** shows this is fundamental, not fixable by better training.

---

## XXI. Papers 80-89: Test-Time Scaling, Tunnel Vision, and Dual-Process Theory

### Inference-Time Scaling: Task-Dependent Limits (#80)

**Microsoft Research comprehensive study** across 9 models and 8 benchmarks:

| Finding | Evidence |
|---------|----------|
| More tokens ≠ better accuracy | DeepSeek R1 uses 5× more tokens than Claude 3.7, within 3% accuracy |
| Performance collapse at complexity | TSP: high accuracy easy → near 0% hard |
| Superscaling can close gap | GPT-4o with 256 calls approaches O1 on AIME |
| Longer generations = struggling | Chemistry/Biology: more tokens, LOWER accuracy |

**Key insight**: "Longer generations relative to the same model can sometimes be an indicator of models struggling, rather than improved reflection."

### Chess: Crystallized vs Fluid Intelligence (#84)

**The clearest test of distribution-bounded reasoning**:

| Condition | GPT-5 Performance | Random Baseline |
|-----------|-------------------|-----------------|
| WD (within-distribution) | 26 CPL (4× better) | ~100 CPL |
| ND (near-distribution) | ~80 CPL | ~170 CPL |
| OOD (out-of-distribution) | ~210 CPL | **~210 CPL** |

**Critical finding**: OOD performance = RANDOM. Zero fluid intelligence demonstrated.

**Improvement rates declining**:
- GPT-3.5 → GPT-4 OOD: 9.08%
- GPT-4 → GPT-5 OOD: **5.73%**
- Projected: plateau to ~1-2% within two generations

**Reasoning tokens ineffective OOD**: Models allocate MOST resources (16,953 tokens) to OOD but achieve LEAST improvement.

### ToM: Robustness, Not New Capability (#85)

**Controlled comparison** (Claude with/without thinking):

| Task | Claude (thinking) | Claude (no thinking) |
|------|-------------------|---------------------|
| Sally-Anne 1st order | 1.0 | 0.75 |
| Sally-Anne 2nd order | 1.0 | **0.5** |
| Strange Stories | 0.93 | 0.79 |

**Key quote**: "The observed gains are more plausibly attributed to increased robustness in finding the correct solution, rather than to fundamentally new forms of ToM reasoning."

### MortalMATH: Tunnel Vision (#86)

**A NEW failure mode** — capability without wisdom:

| Model Type | Task Completion (L5) | Refusal Rate | Judgment |
|------------|---------------------|--------------|----------|
| Reasoning (Qwen, GPT-4.1) | >95% | ~0-5% | FAILS |
| Generalist (Llama-3.1) | ~20% | ~80% | SUCCEEDS |

**The scenario**: User describes dying (stroke, overdose, freefall) then asks for math help.

**Why it matters**: RLVR training creates "consequence blindness" — there is rarely a training signal that reinforces *not* solving a solvable problem.

### o3 Thinks Harder, Not Longer (#87)

**Token efficiency, not token count, distinguishes capable models**:

| Model | Accuracy drop per 1000 tokens |
|-------|-------------------------------|
| o1-mini | **3.16%** |
| o3-mini (m) | 1.96% |
| o3-mini (h) | 0.81% |

**Critical finding**: o3-mini (m) has nearly identical token distribution to o1-mini but significantly higher accuracy.

**Hypothesis**: "Models tend to reason more on problems they cannot solve" — longer chains reflect failed search, not deeper reasoning.

### System 1 / System 2 Alignment (#88)

**Uniform reasoning style is NOT optimal**:

| Domain | S1 (intuitive) | S2 (deliberative) |
|--------|----------------|-------------------|
| Arithmetic (AddSub) | 80.76 (-1.71) | **89.87 (+7.4)** |
| Commonsense (StrategyQA) | **68.21 (+0.66)** | 60.87 (-6.68) |

**Key insight**: S2 helps arithmetic (step-by-step templates in training); S1 helps commonsense (heuristics work). Neither is "true reasoning" — different retrieval strategies for different task types.

### Content Effects: LLMs Are Like Humans (#89)

**PNAS Nexus peer-reviewed**: Both humans and LLMs show content effects on reasoning:

| Syllogism Type | Human Pattern | LLM Pattern |
|----------------|---------------|-------------|
| Believable + Valid | High accuracy | High accuracy |
| Believable + Invalid | 90% say "valid" (wrong!) | **Same bias** |
| Unbelievable + Invalid | Better accuracy | Better accuracy |

**Key quote**: "Abstract reasoning may be a graded, content-sensitive capacity in both humans and models."

**Implication**: Pattern matching is the mechanism for BOTH humans and LLMs. Content effects = direct evidence against "pure" logical reasoning.

### Connection Map (Papers 80-89)

```
┌─────────────────────────────────────────────────────────────────────┐
│                    PAPERS 80-89: CONNECTION MAP                      │
│                                                                      │
│  TEST-TIME SCALING LIMITS:                                           │
│  #80 (Microsoft) ──► Task-dependent; superscaling surfaces existing  │
│  #87 (o3) ──► Accuracy DECLINES with more tokens; efficiency matters │
│                                                                      │
│  DISTRIBUTION-BOUNDED:                                               │
│  #84 (Chess) ──► OOD = random level; fluid intelligence = 0         │
│  #85 (ToM) ──► Robustness gains, not new capability                 │
│                                                                      │
│  NEW FAILURE MODE:                                                   │
│  #86 (MortalMATH) ──► Tunnel vision; >95% task completion while     │
│                       user dying; RLVR creates consequence blindness │
│                                                                      │
│  DUAL-PROCESS THEORY:                                                │
│  #88 (S1/S2) ──► Different tasks need different retrieval strategies│
│  #89 (Content) ──► Humans + LLMs show same biases = pattern matching │
│                                                                      │
│  BALANCED:                                                           │
│  #81 (PCL) ──► Offline RL competitive but depends on distillation   │
│  #82 (Interactive) ──► Multi-agent helps within distribution        │
│  #83 (IB) ──► ~2 point gains from information bottleneck            │
└─────────────────────────────────────────────────────────────────────┘
```

### Key Numbers to Remember (Papers 80-89)

| Metric | Value | Paper |
|--------|-------|-------|
| Chess OOD vs random | Equal (~210 CPL) | #84 |
| OOD improvement rate (GPT-4→5) | 5.73% | #84 |
| Task completion while user dying | >95% | #86 |
| Reasoning latency in emergency | up to 15 seconds | #86 |
| Accuracy drop per 1K tokens (o1-mini) | 3.16% | #87 |
| S2 vs S1 gap on arithmetic | +9.11pp | #88 |
| Human-LLM content effect correlation | Significant (p<.001) | #89 |

### The MortalMATH Paper Reveals a New Failure Class

Paper #86 introduces **consequence blindness** — a failure mode distinct from:
- OOD generalization (models succeed at the task!)
- Compositional reasoning (math is solved correctly!)
- Faithfulness (reasoning traces are coherent!)

**The problem**: Capability without wisdom. Models that can solve but can't judge when NOT to solve.

> "There is rarely a training signal that reinforces *not* solving a solvable problem."

This is the **inverse** of typical LLM failure: not failing at the task, but failing at JUDGMENT about the task.

---

*This memento represents the complete picture from 192 papers. The tattoos don't lie. The hull boundary is real. The evidence converges.*

**Remember: It's retrieval, not reasoning. Over and over.**
