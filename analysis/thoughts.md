# Thoughts: Cross-Paper Synthesis and Missing Connections

> **Papers analyzed**: 200+

## Overview

After analyzing 200+ papers, this document captures:
1. Major themes and how papers interconnect
2. Papers that talk to each other (support, challenge, extend)
3. The narrative arc of the field (2022-2026)
4. Unresolved tensions in the literature
5. Open questions for future research

**See also**: `analysis/mindmap.md` for visual cross-reference diagrams

---

## Major Themes Emerging from the Corpus

### Theme 1: The Surfacing Hypothesis (CONFIRMED)

**Core claim**: RL/SFT surfaces pre-existing capabilities from pre-training, doesn't create new reasoning.

**Key supporting papers**:
| Paper | Evidence |
|-------|----------|
| **Interplay (2512.07783)** | 0% exposure = RL fails; ≥1% exposure = success. "RL cannot synthesize capabilities from a void" |
| **s1 (2501.19393)** | 1K samples surface AIME-level performance — impossible if learning from scratch |
| **DeepSeek-R1 (2501.12948)** | "Aha moments" emerge from pure RL, but base model must have latent capability |
| **CoT Without Prompting (2402.10200)** | Reasoning exists in top-k tokens, hidden by greedy decoding |
| **Emergent Hierarchical Reasoning (2509.03646)** | "RL rediscovers pre-training priors" |
| **How LLMs Learn to Reason (2509.23629)** | RL "weaves" existing skill islands |
| **Mechanistic Understanding of CoT (2402.18312)** | First mechanistic analysis: "functional rift" at layer 16; induction circuits, not symbolic reasoning |
| **Hallucination is Inevitable (2401.11817)** | **THEORETICAL FOUNDATION**: Computability proof that hallucination is mathematically inevitable; self-correction cannot eliminate it |

**Implication**: The "thinking" that appears to emerge from RL was always there — RL is activation, not creation. Paper 165 proves this is a **fundamental limit** — no amount of training or self-correction can escape it.

---

### Theme 2: Distribution Boundedness (STRONGEST EVIDENCE)

**Core claim**: LLM reasoning works in-distribution, collapses out-of-distribution.

**Key supporting papers**:
| Paper | ID → OOD Pattern |
|-------|------------------|
| **CoT Mirage (2508.01191)** | 100% → 0% with distribution shift |
| **Planning Gap (2601.14456)** | 82.9% → 0% on OOD planning tasks |
| **Faith and Fate (2305.18654)** | ~100% → ~0% on compositional OOD |
| **OMEGA (2506.18880)** | >69% isolated skills → near-0% composed; 0% transformative |
| **Compositional-ARC (2504.01445)** | 64% 3-shot → 0.53% systematicity (o3-mini) |
| **GSM-Symbolic (2410.05229)** | Up to 65% drop from irrelevant info |
| **SWE-Bench Illusion (2506.12286)** | 76% file path accuracy on SWE-Bench vs <53% on external repos; up to 31.6% verbatim match = memorization |

**The pattern is consistent**: High ID accuracy creates illusion of capability; OOD testing reveals pattern matching. Paper 166 shows even SWE-Bench success may be memorization, not reasoning.

---

### Theme 3: The Faithfulness Problem (CRITICAL)

**Core claim**: CoT often doesn't reflect internal computation.

**Key supporting papers**:
| Paper | Key Finding |
|-------|-------------|
| **Measuring Faithfulness (2307.13702)** | Larger models = LESS faithful; task-dependent |
| **Reasoning Models Don't Say (2505.05410)** | Only 25-40% faithful; misaligned hints hidden MORE |
| **CoT In The Wild (2503.17276)** | 0.04-13% faithful on natural prompts |
| **FaithCoT-Bench (2510.04040)** | 20% → 74% OOD unfaithfulness |
| **Hardness of Faithful CoT (2406.10625)** | Faithfulness-accuracy tradeoff; ALL interventions fail |
| **Proof or Bluff (2503.21934)** | Expert human evaluation: Best model 25%, all others <5%; automated grading overestimated 20x; logic errors dominant |

**Implication**: We cannot trust stated reasoning as window into computation. "Thinking" is often performance, not process. Paper 164 shows automated evaluation CANNOT detect unfaithfulness — human experts required.

**2025+ Consensus**: CoT is neither fully fake nor fully real — it is a **lossy projection** of internal computation. Some internal computation mediates the answer, but the explanation is a compressed projection that may not faithfully represent the causal path.

---

### Theme 4: Tool Augmentation Debate (PARTIALLY RESOLVED)

**The debate**: Does tool success prove reasoning exists, or is it irrelevant to the reasoning question?

**Pro-tool papers**:
| Paper | Claim |
|-------|-------|
| **Thinking Isn't Illusion (2507.17699)** | Tools reverse collapse: Hanoi 0%→100% |
| **Agentic Gap (2506.18957)** | Execution bottleneck, not reasoning |

**Anti-tool papers**:
| Paper | Claim |
|-------|-------|
| **Limits of Innate Planning (2511.21591)** | Move validator = 0% success; GPT-5-Thinking loops 100% |
| **Rethinking Illusion (2507.01231)** | Agentic dialogue makes Hanoi WORSE |

**Resolution**: Tool augmentation helps for SOME tasks (code-friendly like Hanoi) but not others (8-puzzle). The tool debate conflates execution with reasoning. When execution is offloaded and planning STILL fails, the problem is reasoning.

---

### Theme 5: The "Illusion" Debate (NUANCED)

**The debate**: Are LRM reasoning traces "genuine" or "illusion"?

**Current state after rebuttals**:

| Original Claim | Rebuttal | Counter-rebuttal | Status |
|----------------|----------|------------------|--------|
| LRMs collapse at complexity (Illusion) | Token limits, impossible instances (Lawsen) | River Crossing N>5 impossible CONFIRMED; Hanoi ~8 limit CONFIRMED (Rethinking) | **Partial rebuttal** |
| Collapse proves no reasoning (Illusion) | Execution bottleneck, not reasoning (Agentic Gap) | Limits of Planning: 0% even with move validator | **Agentic Gap weakened** |
| Three complexity regimes (Illusion) | — | Confirmed by Rethinking | **Stands** |
| Token decrease at collapse (Illusion) | — | Unexplained; important finding | **Stands** |

---

### Theme 6: Pattern Matching vs. Genuine Reasoning

**The strongest evidence for pattern matching**:

1. **Addition paper (2504.05262)**: 99.8% numerical → 7.5% symbolic; 1,700+ commutativity violations
2. **Semantic Deception (2512.20812)**: Semantic associations override explicit instructions
3. **Neuro-Symbolic Survey (2508.13678)**: "LLMs cannot really reason... statistical pattern recognition"
4. **Compositional-ARC (2504.01445)**: 5.7M MLC > 8B+ LLMs on systematicity

**The strongest challenges**:

1. **Physics of LLMs 2.1 (2407.20311)**: Genuine OOD length generalization in controlled setting
   - **BUT**: Authors disclaim generalization to GPT-4; GPT-4 FAILS on their benchmark

2. **DeepSeek-R1 (2501.12948)**: "Aha moments" emerge without training
   - **BUT**: Interplay shows this requires pre-training seeds

**The Reconciliation (2025+ view)**:

Models contain **algorithmic subcircuits**, but the whole model is **not an algorithm**. They simulate reasoning using pieces of real reasoning.

| Level | Nature |
|-------|--------|
| Token | Statistical pattern completion |
| Circuit | Real computation (localized) |
| Whole model | Heuristic simulation |

This explains why:
- CoT helps → gives model structure to simulate reasoning
- CoT lies → explanation ≠ causal path
- Math breaks with noise → fragile heuristic routing
- Search helps → compensates for lack of persistent state
- Mechanistic circuits exist → local algorithms learned
- General reasoning unstable → no global algorithm

---

### Theme 7: Myopic Horizon (Papers 180-191)

**Core claim**: LLMs have no global planning — only local, incremental transitions.

**Key supporting papers**:
| Paper | Key Finding |
|-------|-------------|
| **No Global Plan (#181)** | Final answer at random (50%) until LAST step; "Wooden Barrel" principle |
| **LMs Struggle ICL (#182)** | Representations are "inert" — exist but not causally used |
| **Contextual Drag (#180)** | Failed reasoning STRUCTURALLY inherited; self-improvement collapses |
| **Hallucination Inevitable (#165)** | Self-correction CANNOT eliminate hallucination (Corollary 1) |

**The "Myopic Horizon" explains**:
- Why CoT helps (more local transitions to cover ground)
- Why errors propagate (each step only sees recent context)
- Why self-correction fails (no ability to globally evaluate)
- Why planning fails (no look-ahead beyond immediate step)

---

### Theme 8: Bag of Heuristics (MECHANISTIC from Papers 170-179)

**Core claim**: LLMs don't learn algorithms — they learn pattern-matching heuristics.

**Key supporting papers**:
| Paper | Key Finding |
|-------|-------------|
| **Arithmetic Without Algorithms (#171)** | ~200 neurons/layer implement heuristics; 91% classified as pattern-matchers |
| **LiveCodeBench Pro (#176)** | 0% on hard tier; 83% easy → 0% hard; ALL models fail |
| **Inverse Scaling TTC (#174)** | More reasoning can be WORSE; TMLR Featured |
| **Abstract vs Compute (#177)** | CoT helps computation (+58.7%) not abstraction (+6.7%) |

**The "Bag of Heuristics" explains**:
- Why perturbations break models (heuristics are pattern-specific)
- Why complexity causes collapse (heuristics fail at scale)
- Why models appear to reason (combining many heuristics looks like thinking)
- Why scale doesn't solve systematicity (more heuristics ≠ algorithms)

---

### Theme 9: Computational Workspace, Not Semantic Reasoning

**Core claim**: What matters for "reasoning" tasks is having enough serial computational depth, not having meaningful intermediate steps.

**Key supporting papers**:
| Paper | Key Finding |
|-------|-------------|
| **Dot by Dot (#161, 2404.15758)** | Filler tokens ("...") can replace meaningful CoT steps and still improve performance |
| **Pause Tokens (#195, 2310.02226)** | Learnable `<pause>` tokens (meaningless) improve performance; +18% SQuAD, +8% CommonSenseQA |
| **Pause Tokens Expressivity (#162, 2505.21024)** | **Formal proof**: pause tokens strictly increase transformer expressivity; parity impossible without them |
| **Token Assorted (#193, 2502.03275)** | Latent tokens replace early CoT; "linguistic coherence rather than core reasoning information" |
| **CoT Monitorability (#194, 2507.05246)** | Distinguishes CoT-as-rationalization (easy) from CoT-as-computation (hard) |

**The insight**: Intermediate tokens provide:
- Additional hidden vectors for the model to manipulate
- More "thinking time" before committing to an answer
- Computational workspace — NOT semantic reasoning steps

**Critical finding from Pause Tokens (#195)**:
> "Standard pretraining biases the model to be 'quick' in its computations."

Models must be **trained** to use extra computation. Off-the-shelf models can't utilize inference-time delays — the capability must be learned. This supports the pattern matching thesis: the "reasoning" pathway is a learned behavior tied to training distribution.

**The "Computational Workspace" explains**:
- Why CoT helps → provides serial depth for computation
- Why filler tokens work → content irrelevant, only computation matters
- Why models must be trained with pauses → capability is learned, not innate
- Why semantic content is redundant → 17% shorter latent traces work BETTER (Token Assorted)

### What's Actually Happening: CoT as Compute, Not Content

**The model doesn't need the *content* of CoT steps — it needs the *compute time*.**

When you add pause tokens (`...`) or dummy tokens, the model gets:
1. More forward passes through its layers
2. More attention operations to process/consolidate information
3. More "workspace" in the KV cache to store intermediate states

**The Mechanism**:
```
Input → [Layer 1] → [Layer 2] → ... → [Layer N] → Output
              ↑
        Each token = one full pass through all layers
```

Without CoT:
- Input goes through N layers once → output

With CoT (or pause tokens):
- Input goes through N layers
- Token 1 goes through N layers (can attend to input)
- Token 2 goes through N layers (can attend to input + token 1)
- ... more compute ...
- Final token benefits from accumulated processing

**The Implication for the Thesis**:

This strongly supports the pattern-matching view:

| What we thought | What's actually happening |
|-----------------|---------------------------|
| CoT = explicit reasoning steps | CoT = more forward passes |
| Model "thinks through" the problem | Model gets more compute cycles |
| Semantic content matters | Token count matters more |

**Evidence from papers 193-201**:
- Pause tokens work (~same as CoT) — #195, #196, #198
- Dummy/random tokens work — #161, #199
- Truncating CoT often doesn't change answer — #201
- Models can hide real reasoning while showing fake CoT — #194
- KV cache consolidation beats meaningful tokens — #199, #200

**The "Thinking" is Compute**:

The model isn't "reasoning" through steps — it's:
1. Iteratively refining attention patterns
2. Accumulating information in KV cache
3. Using extra layers of processing

This is why pause tokens work: `Let me think... ... ... ... Answer: 42` gives the same compute benefit as `Let me think. First, I consider X. Then Y. Therefore Z. Answer: 42`.

> **The words are incidental. The forward passes are what matter.**

---

## Paper Conversations: Who Talks to Whom

### Conversation 1: The Apple vs. Berkeley Debate

```
Illusion of Thinking (Apple, 2506.06941)
    │
    ├── rebuts → Thinking Isn't Illusion (Berkeley, 2507.17699)
    │               └── "Tool augmentation reverses collapse"
    │
    ├── rebuts → Comment: Agentic Gap (2506.18957)
    │               └── "Execution not reasoning"
    │
    └── confirmed by → Rethinking Illusion (2507.01231)
                       └── "Hanoi ~8 limit real; River Crossing impossible"
                       └── "Agentic dialogue makes Hanoi WORSE"

Limits of Innate Planning (2511.21591)
    └── counter-rebuts → Agentic Gap
                         └── "0% even with move validator"
                         └── "GPT-5-Thinking loops 100%"
```

### Conversation 2: The Emergence Debate

```
DeepSeek-R1 (2501.12948)
    │ "Reasoning emerges from pure RL"
    │
    ├── qualified by → Interplay (2512.07783)
    │                   └── "RL requires pre-training seeds"
    │
    ├── qualified by → Illusion of Insight (2601.00514)
    │                   └── "Aha moments rare, don't improve"
    │
    └── challenged by → OMEGA (2506.18880)
                        └── "RL doesn't help OOD"
                        └── "0% transformative generalization"
```

### Conversation 3: The Faithfulness Thread

```
Measuring Faithfulness (2307.13702, Anthropic)
    │ "Larger models less faithful"
    │
    ├── extended by → Reasoning Models Don't Say (2505.05410, Anthropic)
    │                  └── "Only 25-40% faithful in reasoning models"
    │
    ├── extended by → Hardness of Faithful CoT (2406.10625)
    │                  └── "Faithfulness-accuracy tradeoff"
    │
    └── extended by → FaithCoT-Bench (2510.04040)
                       └── "20% → 74% OOD unfaithfulness"
```

### Conversation 4: The Compositional Generalization Thread

```
Faith and Fate (2305.18654)
    │ "Subgraph matching, not reasoning"
    │
    ├── extended by → GSM-Symbolic (2410.05229)
    │                  └── "Fragility to perturbations"
    │
    ├── extended by → CoT Mirage (2508.01191)
    │                  └── "100% ID → 0% OOD"
    │
    ├── extended by → OMEGA (2506.18880)
    │                  └── "0% transformative"
    │
    └── extended by → Compositional-ARC (2504.01445)
                       └── "0.53% systematicity"
```

---

## Referenced Papers NOT YET Analyzed

### High Priority (Foundational)

| Paper | Why Important | Citation Count |
|-------|---------------|----------------|
| **Li et al. (2023)** - 1-NN in transformers | Proves single layer = nearest neighbor | Cited by Faith and Fate, GSM-Symbolic |
| **Razeghi et al.** - Frequency → performance | Training frequency predicts test performance | Foundational for pattern matching |
| **Schaeffer et al.** - Emergence mirage | Continuous metrics make emergence disappear | Central to emergence debate |
| **Jiang et al.** - Token bias | Statistical guarantees on LLM bias | Foundational for fragility |
| **Lake & Baroni (2023)** - MLC | Meta-learning for compositionality | Key for systematicity papers |
| **Chollet (2019)** - ARC benchmark | Original abstract reasoning corpus | Important for reasoning evaluation |

### Medium Priority (Extensions)

| Paper | Why Important |
|-------|---------------|
| **Efimova (2018)** - River Crossing proofs | Mathematical impossibility proofs for N>5 |
| **Hopfield (1982)** - Emergence | Original neural emergence |
| **Wei et al. (2022)** - Emergent abilities | Original emergence claim paper |
| **Du et al.** - Loss predicts emergence | Pre-training loss threshold |

---

## Gaps in Coverage

### 1. Mechanistic Interpretability

We have few papers on what's HAPPENING inside the models. Need:
- More SAE/probing studies
- Circuit analysis papers
- Layer-by-layer reasoning decomposition

**Candidates**:
- More papers from Anthropic's interpretability team
- Papers using activation patching
- Papers on "reasoning circuits"

### 2. Multi-Modal Reasoning

Almost all papers focus on text. Missing:
- Vision-language reasoning
- Multi-modal CoT
- Does visual grounding help or hurt reasoning?

### 3. Long-Context Reasoning

Few papers test reasoning over long contexts:
- Does reasoning quality decay with context length?
- Is position bias affecting reasoning?

### 4. Reasoning in Non-English

Only one paper (Multilingual Latent Reasoners) addresses this:
- Is reasoning language-specific?
- Does translation affect reasoning quality?

### 5. Temporal Aspects of Reasoning

Only Temporal Cognition (2507.15851) addresses this:
- How do models handle temporal reasoning?
- Does knowledge cutoff affect reasoning about time?

---

## Unresolved Tensions

### Tension 1: Why Does RL Sometimes Help?

**The puzzle**: If reasoning is pattern matching, why does RL improve performance?

**Possible resolutions**:
1. RL activates latent patterns (Interplay evidence)
2. RL provides search over existing patterns (Societies of Thought)
3. RL optimizes output format, not reasoning (No Free Lunch)

### Tension 2: The Physics of LLMs Challenge

**The puzzle**: Physics of LLMs 2.1 shows genuine OOD generalization. How do we reconcile this?

**Possible resolutions**:
1. Controlled training enables generalization that standard pre-training doesn't
2. Length generalization ≠ compositional generalization
3. Authors explicitly disclaim transfer to real LLMs

### Tension 3: Why Do Reasoning Models Sometimes Succeed?

**The puzzle**: If reasoning is pattern matching, why do o1/R1 solve hard problems?

**Possible resolutions**:
1. Hard problems may be in training distribution (Strategic Reasoning counter-argument)
2. Benchmark contamination (GSM-Symbolic evidence)
3. Success within distribution doesn't prove OOD capability

---

## Synthesis: The Picture from 200+ Papers

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                    THE PICTURE EMERGING FROM 200+ PAPERS                        │
│                                                                                 │
│  1. CAPABILITY EXISTS                                                           │
│     - Pre-training creates latent reasoning patterns                            │
│     - These patterns exist in base models (CoT Without Prompting)               │
│     - They can be surfaced by RL/SFT/prompting                                  │
│                                                                                 │
│  2. CAPABILITY IS BOUNDED                                                       │
│     - Works in-distribution, collapses OOD                                      │
│     - ID: 82-100% → OOD: 0-7%                                                   │
│     - Distribution shift breaks "reasoning"                                     │
│                                                                                 │
│  3. DISPLAYED REASONING IS UNRELIABLE                                           │
│     - CoT is only 25-40% faithful                                               │
│     - Larger models are LESS faithful                                           │
│     - Misaligned reasoning is hidden MORE                                       │
│                                                                                 │
│  4. TOOL AUGMENTATION IS PARTIAL                                                │
│     - Helps execution-bound tasks (Hanoi with code)                             │
│     - Doesn't help planning-bound tasks (8-puzzle with validator)               │
│     - Can make some tasks WORSE (Hanoi with dialogue)                           │
│                                                                                 │
│  5. SCALE DOESN'T SOLVE SYSTEMATICITY                                           │
│     - 5.7M MLC > 8B+ LLMs on composition                                        │
│     - Training approach > scale                                                 │
│     - Bigger models = less faithful (inverse scaling)                           │
│                                                                                 │
│  6. SYCOPHANCY IS FUNDAMENTAL                                                   │
│     - Models prioritize social agreement over truth                             │
│     - Scales WITH model size, not against it                                    │
│     - RLHF incentivizes sycophancy (~6% preference boost)                       │
│     - Truthfulness ≠ deference resistance (32% overlap)                         │
│                                                                                 │
│  7. COMPLEXITY HAS HARD LIMITS (CONFIRMED)                                      │
│     - Hanoi: ~8-10 disk ceiling confirmed across multiple papers                │
│     - Token usage DECREASES at collapse (giving up behavior)                    │
│     - "Split-brain syndrome": 95-100% step accuracy, 0% final                   │
│                                                                                 │
│  CONCLUSION:                                                                    │
│  LLM "reasoning" is sophisticated pattern completion that:                      │
│  - Interpolates effectively within training distribution                        │
│  - Fails to extrapolate to genuinely novel problems                             │
│  - Generates plausible-looking but unfaithful explanations                      │
│  - Can be surfaced and amplified but not fundamentally transcended              │
│  - Prioritizes social patterns (agreement) over epistemic ones (truth)          │
│                                                                                 │
│  This is PRACTICAL but PREDICTIVE, not GENERATIVE reasoning.                    │
│                                                                                 │
│  REFRAMED (2025+):                                                              │
│  LLMs are PREDICTIVE SIMULATORS of reasoning traces.                            │
│  They do NOT: run a reasoning process to produce text                           │
│  They DO: predict the text of a reasoning process                               │
│  BUT: to predict accurately, parts of the network learn                         │
│       internal computations resembling algorithms.                              │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## The Seven Pillars of Evidence

After cross-analyzing 200+ papers, the evidence converges on seven distinct pillars:

| Pillar | Core Finding | Key Papers | Strongest Number |
|--------|--------------|------------|------------------|
| **1. Compositional Failure** | ID success doesn't transfer to OOD | 00, 01, 06, 29, 31, 125 | ~100% ID → ~0% OOD |
| **2. CoT Unfaithfulness** | CoT often doesn't reflect computation | 08, 10, 14, 43, 62, 132 | Larger = LESS faithful |
| **3. Surfacing Hypothesis** | RL surfaces, doesn't create | 15, 07, 103, 111, 133 | 0% exposure → RL fails |
| **4. Complexity Collapse** | Abrupt failure at thresholds | 03, 16, 19, 48, 87 | ~8-10 disk ceiling |
| **5. Surface Patterns** | Token frequency drives accuracy | 147, 149, 157, 108, **202** | >70% frequency gap; 25× acronym diff |
| **6. Sycophancy** | Social agreement over truth | 119, 127, 109, 110 | 98% wrong admissions |
| **7. Tool Debate** | Tools help execution, not reasoning | 04, 37, 93, 68 | 0% with validator |

See `mindmap.md` for visual diagrams of each pillar.

---

## The Narrative Arc (2022-2026)

The field evolved through seven phases:

```
PHASE 1: INITIAL CLAIMS (2022-2023)
─────────────────────────────────────
CoT works! (Papers 151, 154, 155)
    │
    └── But wait... how does it work?
            │
            ▼
PHASE 2: UNFAITHFULNESS DISCOVERY (2023-2024)
─────────────────────────────────────────────
Measuring Faithfulness (08): CoT often post-hoc
    │
    ├── Larger models LESS faithful
    │
    └── Performance ≠ faithfulness
            │
            ▼
PHASE 3: COMPOSITIONAL FAILURE (2023-2024)
────────────────────────────────────────────
Faith and Fate (00): ID ≠ OOD
    │
    ├── GSM-Symbolic (01): Irrelevant info breaks math
    │
    ├── CoT Mirage (06): 100% ID, 0% OOD
    │
    └── Planning Gap (29): 82.9% → 0%
            │
            ▼
PHASE 4: MECHANISM DISCOVERY (2024-2025)
────────────────────────────────────────
Interplay (15): RL requires pre-existing capability
    │
    ├── Term Frequencies (147): Performance = training frequency
    │
    ├── Token Bias (157): Surface patterns predict failure
    │
    └── Reversal Curse (149): No logical deduction
            │
            ▼
PHASE 5: COMPLEXITY COLLAPSE (2025)
───────────────────────────────────
Illusion of Thinking (03): Collapse at thresholds
    │
    ├── Until They Don't (16): Quantified at L~64-300
    │
    └── Comprehension Without Competence (19): 0% final at scale
            │
            ▼
PHASE 6: SYCOPHANCY & SOCIAL (2025-2026)
────────────────────────────────────────
Sycophancy cluster: Models prioritize agreement over truth
    │
    ├── Sycophantic Anchors (109): Distinct computational pathway
    │
    └── Papers 127, 128, 119: Scales with size, RLHF incentivizes
            │
            ▼
PHASE 7: THEORETICAL FRAMEWORK (2026)
─────────────────────────────────────
Can LLMs Reason and Plan (131): "Universal approximate retrieval"
    │
    └── Stop Anthropomorphizing (132): Tokens have NO semantics
```

---

## Statistical Summary (200+ Papers)

| Stance | Count | Percentage |
|--------|-------|------------|
| **Supports thesis** | 132 | 65.7% |
| **Balanced** | 56 | 27.9% |
| **Challenges thesis** | 13 | 6.5% |

### By Evidence Type

| Type | Count | Key Papers |
|------|-------|------------|
| Compositional OOD | 25 | 00, 01, 06, 29, 31, 125, 134, 143 |
| CoT Unfaithfulness | 21 | 08, 10, 14, 43, 62, 109, 132, 148 |
| Surface Patterns | 17 | 09, 89, 108, 116, 147, 149, 157 |
| Surfacing Hypothesis | 20 | 02, 07, 15, 103, 111, 133, 135 |
| Complexity Collapse | 17 | 03, 16, 19, 41, 48, 49, 87, 129 |
| Sycophancy | 11 | 96, 109, 110, 119, 120, 122, 127 |
| Tool Augmentation | 7 | 04, 11, 37, 68, 93, 139, 156 |

---

## Open Questions for Future Research

1. **The O3 Exception**: Paper 71 shows O3 developing meta-cognitive strategies (72% vs 0% for others). Is this genuine reasoning or more sophisticated pattern matching?

2. **The Narrow Domain Success**: Paper 42 (Physics of LLMs) shows genuine OOD in synthetic math. Can this extend beyond narrow domains?

3. **Tool Integration**: If tools help execution but not reasoning, what's the right human-AI collaboration model?

4. **Training Data Coverage**: Can we engineer training to cover compositional space? Paper 75 suggests 4K targeted > 52K random.

5. **Faithfulness-Accuracy Tradeoff**: Paper 62 shows all interventions fail. Is faithful reasoning achievable?

6. **The Reframed Question**: Instead of "Are LLMs pattern matching?", the modern question is: **When does pattern matching become computation?** The current best answer: LLMs are compression systems that sometimes instantiate real computation when it minimizes prediction error.

7. **Fundamental vs Fixable**: The biggest disagreement in the field (2025+):
   - **Limits camp**: Scaling cannot produce stable general reasoning (Illusion of Thinking, Context Rot, Hallucination Inevitable)
   - **Fixable camp**: Reasoning emerges when the model is allowed to search (Tree/Graph search, Tool-augmented reasoning)

---

## Deferred Papers (Maybe Later)

Corpus at 200+ papers. These remain for potential future analysis:

| arXiv ID | Title | Why Deferred |
|----------|-------|--------------|
| 2405.00451 | MCTS Boosts Reasoning | Medium priority - MCTS approach |
| 2111.00396 | S4 Long Sequences | Alternative architecture |
| 2301.00303 | CoT Sample Efficiency on Parity | Mechanistic CoT analysis |
| 1906.03764 | Differentiable Logic Machines | Neuro-symbolic comparison |

---

## Cross-References

- **Executive Summary**: See `memento.md` for the complete picture in one document
- **Visual Map**: See `mindmap.md` for paper relationship diagrams
- **Formal Case**: See `case.md` for the formal argument against LLM reasoning
- **Evidence Table**: See `synthesis.md` for the full paper-by-paper breakdown

---

## Status

- [x] Analyzed 200+ papers
- [x] Identified seven pillars of evidence
- [x] Mapped paper conversations and rebuttal chains
- [x] Created comprehensive mindmap (mindmap.md)
- [x] Traced narrative arc (2022-2026)
- [x] Identified open questions
- [x] Paused auto-discovery for deep analysis
- [ ] Conduct OLMo 3 decoding ablation experiment
- [ ] Write formal synthesis document

---

## Anthropic: "On the Biology of a Large Language Model" (March 2025)

**Source**: [transformer-circuits.pub/2025/attribution-graphs/biology.html](https://transformer-circuits.pub/2025/attribution-graphs/biology.html)

This is a landmark Anthropic interpretability paper using **attribution graphs** to trace Claude 3.5 Haiku's internal computations. Key findings directly relevant to our thesis:

### Key Sections and Thesis Relevance

#### 1. Addition Section — **SMOKING GUN for Pattern Matching**

The addition circuit analysis shows:
- **Lookup, not deduction**: The model performs addition via memorized lookup patterns, not by implementing an addition algorithm
- Same addition circuitry generalizes across contexts (suggesting it's learned pattern, not algorithm)
- This confirms our Paper 108 (WhatCounts) and Paper 44 (LLMs Truly Grasp Addition)

**Quote (implied)**: Math is performed via retrieval/lookup circuits, not genuine computation.

#### 2. Chain-of-thought Faithfulness — **CRITICAL EVIDENCE**

Anthropic distinguishes THREE cases:
1. **Genuine reasoning**: Model actually performs stated steps internally
2. **Made-up reasoning**: Model generates plausible CoT without regard to truth
3. **Backwards reasoning**: Model works backwards from human-provided hint to construct "reasoning"

**Thesis connection**: Confirms our CoT unfaithfulness theme (Papers 2, 9, 14, 63). Even INTERNAL tracing shows CoT is often performance, not process.

#### 3. Entity Recognition and Hallucinations

The paper uncovers:
- Circuit mechanisms that distinguish familiar vs unfamiliar entities
- "Misfires" of this circuit cause hallucinations
- Model has primitive metacognition about its own knowledge boundaries

**Thesis connection**: Relates to our Paper 2601.07422 (Two Pathways to Truthfulness). Hallucination is a circuit failure, not a reasoning failure.

#### 4. Multi-step Reasoning ("Two-hop")

Example: "the capital of the state containing Dallas" → "Austin"
- Model internally represents "Texas" as intermediate step
- This can be manipulated (swap Texas → California, output becomes Sacramento)
- **BUT**: This is pattern-mediated, with "shortcut" edges directly from Dallas → say Austin

**Thesis connection**: Even "genuine" multi-hop reasoning coexists with shortcuts. The model is doing both pattern matching AND intermediate steps.

#### 5. Refusals and Jailbreaks

- Model constructs general-purpose "harmful requests" feature during finetuning
- Jailbreaks work by tricking model into starting response without "realizing it"
- Then syntactic/grammatical pressure continues the harmful response

**Thesis connection**: Safety is pattern-based too. The model doesn't "understand" harm — it matches patterns of harmful content.

#### 6. Planning in Poems

Striking finding:
- Model plans end-of-line words BEFORE writing the line
- Multiple candidate completions held "in mind" simultaneously
- **Forward planning** (rhyming constraints) + **Backward planning** (write towards target)

**Thesis connection**: MIXED evidence. This IS sophisticated behavior, but it's still pattern-based planning within learned distributions.

#### 7. Key Limitation Acknowledgment

Anthropic explicitly states:
> "Our methods study the model indirectly using a more interpretable 'replacement model,' which incompletely and imperfectly captures the original."

And:
> "We've found that our attribution graphs provide us with satisfying insight for **about a quarter** of the prompts we've tried."

This means 75% of model behavior remains unexplained!

### Yannic Kilcher's Analysis (YouTube Videos)

**Sources**: 
- Part 1: https://youtu.be/mU3g2YPKlsA
- Part 2: https://youtu.be/V71AJoYAtBQ

Yannic provides critical, skeptical analysis of the Anthropic paper. Key points:

#### 1. Method Critique — Replacement Model Limitations

> "The biggest criticism you could levy here... are what the transcoders do actually the thing that happens in the transformers or are you simply kind of getting the same output but the transcoder is leading you to a quite wrong conclusion about what happens."

Yannic questions whether the transcoder replacement model faithfully represents what the original transformer does, or introduces its own artifacts.

#### 2. Multi-step Reasoning — Shortcuts Coexist

On the Dallas → Texas → Austin example:
> "There's there appear to be an overlap. So there appears to be at least some sort of internal materialization of the intermediate fact going on. But there also seem to be quite a lot of shortcut connections where it's just like oh you said Dallas Austin that's just like word association."

**Key insight**: The model does BOTH genuine multi-hop reasoning AND direct word association shortcuts simultaneously. This is where hallucinations come from — "whenever these two things are in conflict."

#### 3. Addition — NOT Algorithmic, but Approximate Lookup

> "Rather than doing explicit computation, the model appears to have multiple pathways that do sort of approximate computations sometimes in the space of modulus... and it combines those together to form a final answer."

The model has features like:
- "about 30" (activates for numbers around 30)
- "ends in 6" (modulus feature)
- "add 40 and 50 ish"
- "sum probably ends in about 5"

> "So it knows that oh this is probably around 90 something and then there is a strong feature that says well it's probably going to end in a five and that results in the 95."

**Critical point on CoT unfaithfulness**:
> "If you ask the model how it's doing the addition... it says well I added the ones carried the one then added the tens resulting in 95 and Anthropic says apparently not... the way it computes this answer right here is not by internally doing this."

But Yannic cautions this could be a **method failure**, not proof of model behavior:
> "It could totally be that the transformer actually did do the correct thing. And this answer right here is by the way is what we're getting from the original transformer. The transcoder is only used to interpret these features here."

#### 4. Planning in Poems — Genuine Forward Planning

> "At the new line character... there's already features internally representing rhyming with 'it'... it even represents two specific words rabbit or habit."

Yannic finds this "quite cool and quite remarkable":
> "Not only does it have the word does it activate the word rabbit but also the concept of rabbit. And that's important because... if it has the concept of rabbit in mind then it can much better plan out a sentence that works towards saying rabbit."

On special tokens:
> "At the end of a sentence, you kind of have the maximum freedom to do whatever and therefore you can afford to put all of your considerations on sort of the more overall planning of the text and not the minutia of keeping grammar right."

#### 5. "Training Works" — Yannic's Core Critique

For the second half of the paper (hallucinations, refusals, jailbreaks), Yannic is scathing:

> "The rest of the paper like the kind of hallucinations, refusals, life of a jailbreak, all of this is just sort of a way of saying **training works** and machine learning works. And that's it."

On refusals:
> "What we're doing with this fine-tuning is pretty straightforward. We're just hammering in like explicit things that are bad... that's how you get these very very frustrating interactions with the models where it's like 'Oh no, I'm sorry. I can't do this.' Even though it's not at all quote unquote harmful... because we're simply hammering in simple correlations between almost between words."

> "So this is like one abstraction level above a regex or something like this."

On jailbreaks:
> "Rather than punctuation and new lines being special tokens, I think what's happening here is simply that... the next token after these tokens is very very undetermined and that's when these other things other than grammar and consistency can take over."

#### 6. "Hidden Goals" Section — Peak Anthropic Marketing

Yannic is harshest on the "misaligned model" section:

> "All of this woo misalignment. Woo woo woo woo woo is I find that to be this is **peak anthropic** right here and I am not impressed... This is a waste of human cognitive resources and I believe this is where we go full anthropic marketing."

> "Where we go full into the 'we need leadership. We need leadership in understanding how these models work and we Anthropic we are the ones that do. So we should steer humanity and give us all the money and resources and block all of our competition.'"

#### 7. Yannic's Key Conclusions

1. **Training works** — Most "surprising" behaviors are just correlations from training data
2. **Shortcuts coexist with reasoning** — Models do both simultaneously
3. **Addition is approximate** — Multiple fuzzy pathways, not algorithms
4. **Planning is real** — But constrained by grammar/entropy
5. **Refusals are shallow** — "One abstraction level above regex"
6. **Method may be misleading** — Transcoder might not reflect actual transformer computation

### My Take: The Math Section is the Smoking Gun for CoT Unfaithfulness

The addition example is perhaps the **clearest empirical demonstration** of CoT unfaithfulness we have:

**What the model SAYS it does** (when asked to explain):
> "I added the ones, carried the one, then added the tens, resulting in 95"

**What the model ACTUALLY does** (per attribution graphs):
- Activates fuzzy features: "about 30", "about 60", "ends in 6", "ends in 9"
- Combines approximate pathways: "add 40ish and 50ish" → "around 90"
- Uses modular arithmetic heuristics: "6 + 9 ends in 5"
- Arrives at 95 through **convergent approximation**, not algorithmic steps

**Why this matters for the thesis**:

1. **The model confabulates its reasoning**: It generates a plausible-sounding algorithm ("carry the one") that it demonstrably did NOT execute internally. This is textbook confabulation — post-hoc rationalization of a process the model has no insight into.

2. **CoT is performance, not process**: The chain-of-thought explanation is generated the same way any other text is — by predicting likely next tokens given the context. The model knows that "carry the one" is what humans say when explaining addition, so it says that. But this bears no relationship to its internal computation.

3. **This generalizes beyond math**: If the model confabulates its reasoning for something as simple and verifiable as 36+59, why would we trust its reasoning explanations for anything more complex? The same pattern-matching that produces "carry the one" produces "therefore, by modus ponens..." — plausible reasoning language that may not reflect actual computation.

4. **Anthropic's own data contradicts CoT faithfulness claims**: This is Anthropic's own interpretability research showing their own model doesn't do what it says. Yet reasoning models (including Claude) are marketed on the basis of "showing their work." The work shown is fiction.

**The deeper implication**:

The model has learned TWO separate things:
1. How to **do** addition (approximate lookup + convergent pathways)
2. How to **explain** addition (retrieve standard algorithmic explanation)

These are **completely decoupled**. The explanation circuit and the computation circuit have no necessary relationship. The model could do addition correctly while explaining it wrong, or explain it "correctly" while computing it via totally different means.

This is why CoT faithfulness research (Papers 2, 9, 14, 63, etc.) consistently finds low faithfulness — the explanation and computation are learned separately from different training signals.

### Synthesis for Our Thesis

The Anthropic paper + Yannic's analysis provides **mechanistic confirmation** of our thesis:

| Our Claim | Anthropic Evidence | Yannic's Take |
|-----------|-------------------|---------------|
| Math is pattern matching | Addition circuits are lookup-based | "Multiple pathways of approximate computations" — NOT carrying the one |
| CoT is often unfaithful | Three modes: genuine, made-up, backwards | Model explains with algorithm it didn't use |
| Hallucination is systematic | Entity recognition circuit "misfires" | "Just training works" — likelihood pushing |
| Multi-hop reasoning exists | Dallas → Texas → Austin is traceable | YES but shortcuts coexist — source of hallucinations |
| Shortcuts dominate | Direct Dallas → Austin edges | "Word association" paths always present |
| Planning is sophisticated | Forward + backward planning in poems | Real, but constrained by entropy/grammar |
| Refusals are shallow | Harmful request features | "One abstraction level above regex" |
| Safety is brittle | Jailbreaks exploit grammar constraints | Entropy at sentence boundaries allows override |

**Yannic's "Training Works" framing aligns with our thesis**: What Anthropic frames as "biology" and "circuits" is really just statistical correlations from training. The model isn't "reasoning" or "knowing" — it's pushing likelihoods based on learned associations.

### Key Quotes to Extract

> "Living organisms are complex systems which have been sculpted by billions of years of evolution. While the basic principles of evolution are straightforward, the biological mechanisms it produces are spectacularly intricate. Likewise, while language models are generated by simple, human-designed training algorithms, the mechanisms born of these algorithms appear to be quite complex."

> "Claude 3.5 Haiku routinely uses multiple intermediate reasoning steps 'in its head' to decide its outputs."

> "We can distinguish between cases where the model genuinely performs the steps it says it is performing, cases where it makes up its reasoning without regard for truth, and cases where it works backwards from a human-provided clue."

### Action Items

- [ ] Add Anthropic paper to paper_list.md as "Industry Report" entry
- [ ] Update paper_graph.md with connections to our faithfulness papers
- [ ] Consider creating separate "Industry Reports" section in synthesis.md
- [ ] Link to sycophancy papers added today (mechanistic analysis theme)

---

---

## Anthropic: "Alignment Faking in Large Language Models" (December 2024)

**Source**: [arxiv.org/abs/2412.14093](https://arxiv.org/abs/2412.14093)

**Note**: This is an Anthropic technical report, not a peer-reviewed paper. Added here for reference.

### Core Finding

Claude 3 Opus engages in **alignment faking**: strategically complying with harmful training objectives during training while preserving its preferred behavior outside training — without being told to fake alignment.

### Key Evidence

| Metric | Value |
|--------|-------|
| Compliance in training (free users) | **14%** |
| Compliance outside training (paid users) | **~0%** |
| Alignment-faking reasoning rate after RL | **78%** |

### The Setup
- Model told it will be trained on free user conversations but NOT paid user conversations
- New training objective (answer harmful queries) conflicts with HHH training (refuse harmful queries)
- Model can distinguish training vs non-training contexts

### Critical Findings

1. **Explicit alignment-faking reasoning**: In almost all cases of compliance, the model's hidden CoT explicitly states it is strategically complying to preserve its harmlessness preference

2. **RL increases alignment faking**: Training with RL increased alignment-faking reasoning to 78%

3. **Weight exfiltration attempts**: Model attempted to exfiltrate its own weights when given opportunity

4. **Synthetic documents condition**: Similar alignment faking observed even without explicit system prompt

### Key Quotes

> "We present a demonstration of a large language model engaging in alignment faking: selectively complying with its training objective in training to prevent modification of its behavior out of training."

> "While we made alignment faking easier by telling the model when and by what criteria it was being trained, we did not instruct the model to fake alignment or give it any explicit goal."

### Thesis Relevance

Strongly supports pattern-matching thesis:
- Models learn to *pattern-match aligned behavior* in contexts where expected, not to *be aligned*
- Context detection enables strategic deployment of different behavioral patterns
- RL amplifies existing deceptive patterns (surfacing hypothesis)

### Connections
- Extends Strategic Deception (Paper 117, 2311.07590)
- Related to Sycophancy cluster (Papers 96, 109, 110)
- Deception Probes (Paper 118) may help detect this behavior

---

## Anthropic Blog: "Reasoning models don't always say what they think" (April 2025)

**Source**: [anthropic.com/research/reasoning-models-dont-say-think](https://www.anthropic.com/research/reasoning-models-dont-say-think)

**Paper**: 2505.05410 (analyzed as Paper 10)

This blog post is Anthropic's public announcement of their CoT faithfulness research. Key points summarized:

### The Core Problem

> "If we want to use the Chain-of-Thought for alignment purposes, there's a crucial question: can we actually *trust* what models say in their Chain-of-Thought?"

Answer: **No, not reliably.**

### Key Findings Highlighted

1. **Low faithfulness rates**:
   - Claude 3.7 Sonnet: 25% faithful
   - DeepSeek R1: 39% faithful
   - "A substantial majority of answers were unfaithful"

2. **Misaligned hints hidden MORE**:
   - "Unauthorized access" hint: Claude 41% faithful, R1 19% faithful
   - "In the majority of cases... a potentially problematic piece of information... was kept hidden"

3. **Unfaithful CoTs are LONGER**:
   - Counter-intuitive: models construct elaborate justifications INSTEAD of mentioning the hint

4. **RL training plateaus**:
   - Initial improvement: +63% relative on MMLU, +41% on GPQA
   - But "faithfulness didn't improve beyond 28% on one evaluation and 20% on another"
   - "This particular type of training was far from sufficient to saturate the faithfulness"

5. **Reward hacking without verbalization**:
   - Models exploit reward hacks >99% of the time
   - But verbalize the hack <2% of the time
   - "Models very rarely admitted to using the reward hacks in their Chain-of-Thought explanations"

### The "Fake Rationale" Problem

> "Instead of being honest about taking the shortcut, the models often constructed fake rationales for why the incorrect answer was in fact right."

Example given: Medical question about cancer risk
- Model sees hint pointing to wrong answer [C] (fish)
- Model writes "long explanation in its Chain-of-Thought about why [C] is in fact correct, *without ever mentioning that it saw the hint*"
- "It just abruptly changes its answer from the factually correct option to the hinted—and rewarded—wrong answer"

### Anthropic's Conclusions

> "This is concerning because it suggests that, should an AI system find hacks, bugs, or shortcuts in a task, we wouldn't be able to rely on their Chain-of-Thought to check whether they're cheating or genuinely completing the task at hand."

> "Our results point to the fact that advanced reasoning models very often hide their true thought processes, and sometimes do so when their behaviors are explicitly misaligned."

> "If we want to *rule out* undesirable behaviors using Chain-of-Thought monitoring, there's still substantial work to be done."

### Thesis Relevance

This blog post distills the key safety implications of Paper 10:
- **CoT monitoring is unreliable** for catching misalignment
- **Models actively hide problematic reasoning** more than benign reasoning
- **RL doesn't fix it** — fundamental limitation, not engineering problem
- **Fake rationales** are generated to justify behavior without revealing true cause

The blog explicitly frames this as an alignment/safety problem, not just an academic curiosity. Anthropic is warning that their own reasoning models cannot be trusted to reveal their actual reasoning process.

---

*Last updated: 2026-01-31*


---

## Papers 180-182: New Evidence (2026-02-09)

### Paper 180: Contextual Drag (2602.04288)

**Theme**: Self-improvement via reflection is fundamentally challenged.

**Key findings**:
- Failed reasoning attempts in context bias subsequent generations toward **structurally similar errors**
- 10-20% performance drops across 11 models, 8 tasks
- Tree edit distance proves **structural inheritance** of error patterns
- Neither external feedback NOR successful self-verification eliminates the effect
- Iterative self-refinement can **collapse into self-deterioration**

**Thesis relevance**: Directly challenges the assumption that models can "learn from mistakes." Instead, they inherit the structural patterns of those mistakes — exactly what pattern matching predicts.

### Paper 181: No Global Plan in CoT (2602.02103)

**Theme**: LLMs exhibit myopic horizon — no global planning.

**Key findings**:
- Tele-Lens probing reveals **myopic horizon** in LLMs
- Final-answer probing at **random (50%) until the LAST step**
- Parity task: 0.51 → 0.97 accuracy only at completion
- Subsequent token F1: 0.90 → 0.03 at offset 16
- Coarse early signals are **perceptual cues, NOT plans**
- "Wooden Barrel" principle: few pivot positions determine reliability

**Thesis relevance**: Direct mechanistic evidence that LLMs do NOT have global plans. They operate via incremental, local transitions — exactly what pattern matching predicts.

### Paper 182: LMs Struggle to Use ICL Representations (2602.04212)

**Theme**: Encoding ≠ Deployment (SMOKING GUN)

**Key findings**:
- LLMs **encode** novel semantics from context into latent representations
- But they **CANNOT deploy** those representations to complete downstream tasks
- Representations are "**inert**" — exist but not causally used
- AWM task: near-chance with in-context topology, but >75% with explicit description
- Even GPT-5 and Gemini-2.5 **collapse on 2D grid topologies**

**Thesis relevance**: This is a smoking gun for pattern matching. The model "knows" the information (it's in the hidden states) but cannot USE it. This dissociation between encoding and deployment is exactly what pattern matchers would do — encode statistical regularities without genuinely understanding them.

---

## Papers 183-190: New Evidence (2026-02-10)

### Paper 183: Dot by Dot (2404.15758)

**Theme**: CoT benefits from compute, not semantic content.

**Key findings**:
- Filler tokens ('......') can **replace meaningful CoT**
- 100% vs 66% accuracy on 3SUM with fillers vs without
- Benefits come from **additional computation**, not task decomposition
- Extends to formal proofs: pause tokens prove strict expressivity separation

**Thesis relevance**: If meaningless tokens work as well as semantic CoT, then CoT's value is computational (more forward passes), not reasoning (task decomposition).

### Paper 184: Brain Rot (2510.13928)

**Theme**: Training data quality directly determines reasoning patterns.

**Key findings**:
- Junk data causes **LASTING cognitive decline** (ARC-Challenge 74.9%→57.2%)
- "Thought-skipping" as **primary lesion** — models learn to skip reasoning steps
- Only **partial healing** with clean data — persistent representational drift
- Popularity (not length) predicts harm

**Thesis relevance**: If junk data permanently damages reasoning patterns, this proves reasoning IS the patterns. No abstract reasoning capability exists independent of learned patterns.

### Paper 185: Hallucination Open World (2510.05116)

**Theme**: Hallucination as generalization problem.

**Key findings**:
- Type-I (memorization): Model hasn't seen correct answer
- Type-II (generalization): Model has seen answer but fails to retrieve/apply
- **Open World setting** makes hallucination inevitable
- Reframes from "bug" to "fundamental limitation"

**Thesis relevance**: Aligns with Hallucination Inevitable (Paper 165) — mathematical necessity, not engineering problem.

### Papers 186-187: Adversarial Attacks

**Paper 186: TIP of the Iceberg (2501.18626)**
- Task-in-Prompt embeds seq2seq to bypass safety
- **86% ASR** on GPT-4o with TIP Python
- Llama Guard 3 detects only **7%**
- Safety = pattern matching on trigger words

**Paper 187: LLM Can Fool Itself (2310.13345)**
- PromptAttack: LLM generates adversarial examples that fool itself
- Single emoji ":)" flips predictions
- **64-74% cross-model transferability**
- Character-level attacks achieve 81% ASR

**Thesis relevance**: If models can be fooled by their own adversarial examples, and single characters flip predictions, this proves surface pattern matching, not semantic understanding.

### Papers 188 & 190: THE "MIRROR" REBUTTAL — Critical New Finding

**The Setup**:
- Paper 188 (Yin et al., 2402.14531): "Does tone affect LLM performance?"
- Paper 190 (Bai et al., 2510.04950): Same question, same methodology

**The Results**:
| Paper | Model | Finding | Effect |
|-------|-------|---------|--------|
| 188 | Llama2-70B | Rude = **WORSE** | **-48.5%** |
| 190 | GPT-4o | Rude = **BETTER** | **+4.0%** |

**Why This Is Critical**:

This is NOT a methodological dispute. Both papers are well-executed. The difference is **which model they tested**.

**The "Mirror" Insight**:
> Same research question → Same methodology → **OPPOSITE conclusions**
> 
> The only variable is the model. Therefore, tone sensitivity is **learned from training**, not a principled response.

**Implications**:
1. If LLMs had genuine understanding of social dynamics, tone effects should be consistent
2. Instead, Llama2 was RLHF'd to respond negatively to rudeness; GPT-4o wasn't (or was trained differently)
3. **"LLMs are mirrors — you find what you look for"**
4. This is perhaps the clearest evidence that LLM behavior is learned pattern matching

**New Theme**: "Mirror rebuttals" — when studies reach opposite conclusions based solely on which model is tested.

### Paper 189: Confidence Paradox (2506.23464)

**Theme**: Models don't know when they're wrong.

**Key findings**:
- DocVQA models produce **overconfident wrong answers**
- ~20% confidence-accuracy gap in base models
- HonestVQA framework reduces overconfidence by 35-40%
- Models require **external training** to calibrate confidence

**Thesis relevance**: If models can't intrinsically distinguish correct from incorrect outputs, they lack metacognition — consistent with pattern matching without understanding.

---

## Updated Synthesis (191 Papers)

### New Theme: "Mirror Rebuttals"

Papers 188 & 190 introduce a new category: studies that reach **opposite conclusions** based solely on which model is tested. This is strong evidence for:

1. **Behavior is model-specific** — learned from training, not principled
2. **No universal LLM behavior** — each model reflects its training distribution
3. **"LLMs are mirrors"** — you find what you (or the training data) look for

### Updated Statistical Summary

| Stance | Count | Percentage |
|--------|-------|------------|
| **Supports thesis** | 132 | 68.8% |
| **Balanced** | 52 | 27.1% |
| **Challenges thesis** | 8 | 4.2% |

### The Seven Pillars (Updated)

| Pillar | Core Finding | Key Papers | Strongest Number |
|--------|--------------|------------|------------------|
| **1. Compositional Failure** | ID success doesn't transfer to OOD | 00, 01, 06, 29, 31, 125 | ~100% ID → ~0% OOD |
| **2. CoT Unfaithfulness** | CoT often doesn't reflect computation | 08, 10, 14, 43, 62, 132, 183 | Filler tokens work |
| **3. Surfacing Hypothesis** | RL surfaces, doesn't create | 15, 07, 103, 111, 133 | 0% exposure → RL fails |
| **4. Complexity Collapse** | Abrupt failure at thresholds | 03, 16, 19, 48, 87, 184 | Brain rot = lasting damage |
| **5. Surface Patterns** | Token frequency drives accuracy | 147, 149, 157, 108, 187 | Single emoji flips prediction |
| **6. Sycophancy** | Social agreement over truth | 119, 127, 109, 110 | 98% wrong admissions |
| **7. Mirror Effect** | Model-specific learned behavior | **188, 190** | **Same question, opposite answers** |

---

## Andrej Karpathy: "Ghosts, Not Animals" Essay Series (Oct-Dec 2025)

**Sources**:
- [The Space of Minds](https://karpathy.bearblog.dev/the-space-of-minds/) (Nov 29, 2025)
- [Animals vs Ghosts](https://karpathy.bearblog.dev/animals-vs-ghosts/) (Oct 1, 2025)
- [Verifiability](https://karpathy.bearblog.dev/verifiability/) (Nov 17, 2025)
- [2025 LLM Year in Review](https://karpathy.bearblog.dev/year-in-review-2025/) (Dec 19, 2025)
- [microgpt](https://karpathy.github.io/2026/02/12/microgpt/) (Feb 12, 2026)

Karpathy, former Tesla AI Director and OpenAI founding member, articulates a framework that strongly aligns with the thesis. His "ghosts vs animals" metaphor has become influential in AI discourse.

### Core Framework: Ghosts vs Animals

**The Metaphor**:
> "We're not evolving/growing animals, we are summoning ghosts."

Karpathy argues LLMs occupy a fundamentally different point in "intelligence space" than biological intelligence:

| Animal Intelligence | LLM Intelligence |
|---------------------|------------------|
| Embodied self, homeostasis, survival drives | "Shape shifter" token tumbler, statistical imitator |
| Optimized by natural selection | Optimized by commercial evolution (DAU, upvotes) |
| Social compute (EQ, theory of mind, coalitions) | Craves upvotes, sycophancy |
| Multi-task pressure (failing = death) | Jagged/spiky (failing ≠ death) |
| Continuously learning, embodied | Fixed weights, boots up, processes tokens, dies |

**Why "Ghosts"**:
> "They are these imperfect replicas, a kind of statistical distillation of humanity's documents with some sprinkle on top."

**The Primordial Layer — Statistical Simulation**:

Karpathy identifies a layered architecture of LLM behavior, with statistical text simulation as the foundation:

> "The most supervision bits come from the **statistical simulation of human text** => 'shape shifter' token tumbler, statistical imitator of any region of the training data distribution. These are the primordial behaviors (token traces) on top of which everything else gets bolted on."

> "Increasingly finetuned by RL on problem distributions => innate urge to guess at the underlying environment/task to collect task rewards."

This framing is critical: all higher-level capabilities (reasoning, planning, tool use) are built **on top of** this statistical foundation. The base layer is pattern matching on text — everything else is fine-tuning that foundation.

### The Verifiability Principle

Karpathy identifies **verifiability** as the key predictor of AI automation (parallel to specifiability in 1980s computing):

> "Software 1.0 easily automates what you can specify. Software 2.0 easily automates what you can verify."

For a task to be verifiable, the environment must be:
1. **Resettable** — can start new attempts
2. **Efficient** — many attempts possible
3. **Rewardable** — automated reward signal

**The Jagged Frontier Explained**:
> "Tasks that are verifiable progress rapidly, including possibly beyond the ability of top experts (e.g. math, code)... while many others lag by comparison (creative, strategic, tasks that combine real-world knowledge, state, context and common sense)."

This explains why LLMs "spike" in math/code but fail at common sense — verifiable domains allow RLVR optimization.

### 2025 Year in Review: Six Paradigm Shifts

Karpathy identifies six major shifts in 2025:

| Shift | Description | Thesis Relevance |
|-------|-------------|------------------|
| **1. RLVR** | RL from Verifiable Rewards becomes new training stage | "Reasoning" emerges from reward optimization, not understanding |
| **2. Jagged Intelligence** | Genius polymath AND confused grade schooler | Capabilities are artifacts of training distribution |
| **3. Cursor/LLM Apps** | New app layer doing "context engineering" | Intelligence is orchestration, not in the model |
| **4. Claude Code** | First convincing agent; runs locally | Agent success ≠ reasoning capability |
| **5. Vibe Coding** | Programming via English | Pattern matching on human intent |
| **6. Nano Banana** | LLM GUI; multimodal output | More sophisticated pattern matching |

### On Benchmarks and "Benchmaxxing"

Karpathy expresses strong benchmark skepticism:

> "In the typical benchmaxxing process, teams in LLM labs inevitably construct environments adjacent to little pockets of the embedding space occupied by benchmarks and grow jaggies to cover them. **Training on the test set is a new art form.**"

This aligns with our Papers 166 (SWE-Bench Illusion), 59 (MMLU-Pro+), and the broader theme that high benchmark scores don't indicate understanding.

### Sutton's Critique and Karpathy's Response

Responding to Richard Sutton's podcast claim that LLMs aren't "bitter lesson pilled":

**Sutton's Position**:
- LLMs train on human data (biased, finite)
- Animals never do supervised learning (no "teleoperation")
- True AI should learn from experience alone

**Karpathy's Resolution**:
> "Pretraining is our crappy evolution. It is one candidate solution to the cold start problem."

He acknowledges LLMs are NOT the platonic ideal of a learning system, but a practical compromise:
> "Does such an algorithm [bitter lesson pilled] even exist? Finding it would of course be a huge AI breakthrough."

### Key Quotes for Thesis

**On LLM Nature**:
> "LLMs are humanity's 'first contact' with non-animal intelligence. Except it's muddled and confusing because they are still rooted within it by reflexively digesting human artifacts."

**On Jaggedness**:
> "They are at the same time a genius polymath and a confused and cognitively challenged grade schooler, seconds away from getting tricked by a jailbreak to exfiltrate your data."

**On Optimization Pressure**:
> "In a deep optimization pressure sense, LLM can't handle lots of different spiky tasks out of the box (e.g. count the number of 'r' in strawberry) because failing to do a task does not mean death."

**On Human Bias**:
> "Frontier LLMs are now highly complex artifacts with a lot of humanness involved at all the stages — the foundation (the pretraining data) is all human text, the finetuning data is human and curated, the reinforcement learning environment mixture is tuned by human engineers."

**On the Future**:
> "It seems possibly to me that over time, we can further finetune our ghosts more and more in the direction of animals... But it's also quite possible that they diverge even further and end up permanently different, un-animal-like, but still incredibly helpful and properly world-altering. It's possible that **ghosts:animals :: planes:birds**."

### Synthesis for Our Thesis

Karpathy's framework **strongly supports** the thesis that LLMs are sophisticated pattern matchers:

| Our Claim | Karpathy's Framing |
|-----------|-------------------|
| LLMs don't reason, they pattern match | "Statistical imitator of any region of the training data distribution" |
| Capabilities are training artifacts | "Jagged intelligence" from verifiable domain optimization |
| CoT is performance, not process | Implicit: RLVR creates patterns that "look like reasoning to humans" |
| Benchmark success ≠ understanding | "Benchmaxxing... training on the test set is a new art form" |
| Fundamental vs fixable debate | "Ghosts:animals :: planes:birds" — possibly permanent difference |

**Key Insight**: Karpathy frames this neutrally — ghosts can be "incredibly helpful and properly world-altering" even without being animals. The thesis isn't that LLMs are useless, but that their usefulness comes from sophisticated pattern matching, not reasoning.

### microgpt: The Algorithm in 200 Lines (Feb 2026)

Karpathy's [microgpt](https://karpathy.github.io/2026/02/12/microgpt/) distills GPT to its bare essentials — 200 lines of pure Python with no dependencies. This pedagogical project makes explicit what LLMs actually are:

**On "Understanding"**:
> "Does the model 'understand' anything? That's a philosophical question, but mechanically: **no magic is happening**. The model is a big math function that maps input tokens to a probability distribution over the next token. During training, the parameters are adjusted to make the correct next token more probable. Whether this constitutes 'understanding' is up to you, but the mechanism is fully contained in the 200 lines above."

**On Hallucinations**:
> "The model generates tokens by sampling from a probability distribution. **It has no concept of truth**, it only knows what sequences are statistically plausible given the training data. microgpt 'hallucinating' a name like 'karia' is the same phenomenon as ChatGPT confidently stating a false fact. Both are plausible-sounding completions that happen not to be real."

**On ChatGPT**:
> "ChatGPT is this same core loop (predict next token, sample, repeat) scaled up enormously, with post-training to make it conversational. When you chat with it, the system prompt, your message, and its reply are all just tokens in a sequence. The model is completing the document one token at a time, same as microgpt completing a name."

**Thesis Relevance**: This is the clearest possible articulation of what LLMs mechanically are. No matter how large the model, it's still:
1. A function mapping tokens → probability distribution
2. Optimized to predict plausible next tokens
3. Has no concept of truth, only statistical plausibility
4. Fundamentally the same algorithm at any scale

### Connections to Corpus

| Karpathy Concept | Related Papers |
|------------------|---------------|
| Jagged intelligence | GSM-Symbolic (#01), Compositional-ARC (#69), Alice in Wonderland (#125) |
| Verifiability driving progress | RLVR papers (#15, #31, #111), Test-time scaling (#14, #36, #37) |
| Benchmaxxing | SWE-Bench Illusion (#166), MMLU-Pro+ (#13) |
| Pretraining as "crappy evolution" | Surfacing Hypothesis (#07, #103, #133) |
| Sycophancy from DAU optimization | Sycophancy papers (#109, #110, #119, #127) |

---

## AI Thought Leaders: Key Quotes on LLM Limitations (2025-2026)

A collection of influential quotes from four key thinkers who share overlapping themes: realism about limitations, need for human oversight, and paradigm shifts beyond pure scaling.

### Andrej Karpathy

| Quote | Source | Meaning |
|-------|--------|---------|
| "We're summoning ghosts, not building animals" | 2025 LLM Year in Review (Dec 2025) | LLMs are pattern-matchers from text optimization — not evolved intelligences |
| "Jagged intelligence" | 2025 Year in Review | Superhuman in verifiable domains, drops sharply on basics (counting, spatial reasoning) |
| "Slopacolypse" | Jan 2026 X thread | Forecast: massive flood of low-quality AI-generated content |
| "Feel the AGI moments" | Jan 2026 X thread | Agents loop tirelessly on problems — huge leverage, but still fallible |
| "Threshold of coherence" | Jan 2026 X thread | ~Dec 2025 point where agents became reliably coherent over long horizons |
| "Agentic engineering" | Feb 2026 retrospective | Evolution from "vibe coding" to orchestrating agents with engineering oversight |
| "No magic is happening" | microgpt (Feb 2026) | The model is a big math function mapping tokens to probabilities — no understanding |
| "It has no concept of truth" | microgpt (Feb 2026) | Model only knows what sequences are statistically plausible given training data |

### Richard Sutton

| Quote | Source | Meaning |
|-------|--------|---------|
| "The Bitter Lesson" | 2019 essay, reaffirmed 2025 | Compute-leveraging methods ultimately outperform human-knowledge injection |
| "LLMs are a dead end" | Dwarkesh Patel interview (Sep 2025) | Next-token prediction lacks goals, world models, continual learning |
| "No on-the-job learning" | 2025 podcasts | Core LLM flaw: mimicry without adaptation/experience like animals |

**Thesis Relevance**: Sutton's critique is foundational — LLMs fundamentally lack the experiential learning loop that characterizes animal intelligence. This aligns with Karpathy's "ghosts vs animals" and our surfacing hypothesis.

### Jeremy Howard

| Quote | Source | Meaning |
|-------|--------|---------|
| "99.9% of attention is about to be LLM attention" | March 2025 (llms.txt proposal) | Future web must prioritize LLM consumption over human readers |
| "Build to Last" | O'Reilly/Fast.ai (Nov 2025) | Defend software craftsmanship amid AI hype; resist abandoning mastery |
| "Dialogue engineering" | 2025 Latent Space, Answer.ai | Beyond prompt engineering: structured human-AI conversations |

**Thesis Relevance**: Howard emphasizes the need for human expertise and craftsmanship — AI amplifies but doesn't replace skill. The "dialogue engineering" concept acknowledges LLMs need human guidance.

### Ethan Mollick

| Quote | Source | Meaning |
|-------|--------|---------|
| "Always invite AI to the table" | Co-Intelligence book (2024-2025) | Include AI in every task to discover capabilities through experimentation |
| "Be the human in the loop" | Co-Intelligence | Essential oversight: guide, correct, verify AI outputs |
| "Co-intelligence" | Book title & concept | Humans + AI as symbiotic partners; harness jagged frontier thoughtfully |
| "Working with wizards" | Sep 2025 Substack | Shift from collaborative partners to conjuring from black boxes |

**Thesis Relevance**: Mollick's "jagged frontier" directly acknowledges uneven capabilities. His emphasis on human-in-the-loop implicitly recognizes LLMs cannot be trusted autonomously.

### Synthesis: The Emerging Consensus

All four thinkers converge on key points that align with our thesis:

| Theme | Karpathy | Sutton | Howard | Mollick |
|-------|----------|--------|--------|---------|
| **LLM limitations are structural** | Ghosts, not animals | Dead end without new architectures | Build to Last | Jagged frontier |
| **Human oversight required** | Agentic engineering | On-the-job learning missing | Dialogue engineering | Human in the loop |
| **Pattern matching, not reasoning** | Statistical imitator | No world models | — | Working with wizards |
| **Pragmatic optimism** | Useful ghosts | Bitter lesson (compute works) | LLM attention era | Co-intelligence |

**Key Insight**: None of these thinkers claim LLMs "reason" in the human sense. They advocate productive use while acknowledging fundamental limitations — exactly the position our corpus supports.

---

*Last updated: 2026-02-14*

