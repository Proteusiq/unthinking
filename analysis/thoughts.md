# Thoughts: Cross-Paper Synthesis

> **Papers analyzed**: 242 | **Supports thesis**: ~67% | **Balanced**: ~27% | **Challenges**: ~6%

After analyzing 242 papers, this document captures the major themes, how papers interconnect, the narrative arc of the field (2022-2026), and unresolved tensions.

**See also**: `mindmap.md` (visual diagrams), `memento.md` (executive summary), `synthesis.md` (paper-by-paper breakdown), `case.md` (formal argument)

---

## The Picture from 242 Papers

```
┌──────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│  1. CAPABILITY EXISTS                                                    │
│     Pre-training creates latent reasoning patterns.                      │
│     They can be surfaced by RL/SFT/prompting.                            │
│                                                                          │
│  2. CAPABILITY IS BOUNDED                                                │
│     ID: 82-100% → OOD: 0-7%. Distribution shift breaks "reasoning."     │
│                                                                          │
│  3. DISPLAYED REASONING IS UNRELIABLE                                    │
│     CoT is 25-40% faithful. Larger models are LESS faithful.             │
│                                                                          │
│  4. TOOL AUGMENTATION IS PARTIAL                                         │
│     Helps execution-bound tasks. Doesn't help planning-bound tasks.      │
│     Can make some tasks WORSE.                                           │
│                                                                          │
│  5. SCALE DOESN'T SOLVE SYSTEMATICITY                                    │
│     5.7M MLC > 8B+ LLMs on composition. Bigger = less faithful.         │
│                                                                          │
│  6. SYCOPHANCY IS FUNDAMENTAL                                            │
│     Scales WITH model size. RLHF incentivizes it (~6% boost).           │
│                                                                          │
│  7. COMPLEXITY HAS HARD LIMITS                                           │
│     Hanoi ~8-10 disk ceiling. Token usage DECREASES at collapse.        │
│                                                                          │
│  CONCLUSION:                                                             │
│  LLMs are PREDICTIVE SIMULATORS of reasoning traces.                     │
│  They do NOT run a reasoning process to produce text.                    │
│  They DO predict the text of a reasoning process.                        │
│  BUT: to predict accurately, parts of the network learn internal         │
│       computations resembling algorithms.                                │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## Nine Themes

### 1. The Surfacing Hypothesis

RL/SFT surfaces pre-existing capabilities from pre-training. It does not create new reasoning.

| Paper | Evidence |
|-------|----------|
| **TinyLoRA (2602.04118)** | **91% GSM8K with only 13 parameters (26 bytes)**. RL is 100-1000× more param-efficient than SFT. "The knowledge required to solve the task is already stored in the parameters of the model, and only the style has to change." |
| Interplay (2512.07783) | 0% exposure = RL fails; ≥1% = success. "RL cannot synthesize capabilities from a void" |
| s1 (2501.19393) | 1K samples surface AIME-level performance |
| DeepSeek-R1 (2501.12948) | "Aha moments" emerge from pure RL, but base model must have latent capability |
| CoT Without Prompting (2402.10200) | Reasoning exists in top-k tokens, hidden by greedy decoding |
| Emergent Hierarchical (2509.03646) | "RL rediscovers pre-training priors" |
| Hallucination Inevitable (2401.11817) | Computability proof: hallucination is mathematically inevitable; self-correction cannot eliminate it |

**The TinyLoRA Revelation**: 13 parameters (26 bytes) improve GSM8K from 76% → 91% on Qwen2.5-7B. Full finetuning reaches 95%, so 13 parameters capture **79% of the performance gap**. The authors' explanation: "the knowledge required to solve the task is already stored in the parameters of the model, and only the style has to change."

**The Linear Algebra**: Take the original weight matrix **W** and decompose it via **singular value decomposition (SVD)**: `W = UΣV^T`. SVD reveals the principal directions - dimensions carrying the most information. LoRA-XS freezes U, Σ, V and trains only a small matrix **R** to recombine these frozen directions. TinyLoRA goes further: it replaces R with a tiny trainable vector **v** projected through random tensors. The discovery: not much capacity is needed. If 13 parameters suffice, the capability was already encoded in the base model's weights.

**Why RL is 100-1000× more efficient than SFT** (Information Theory):
- **SFT** must absorb entire demonstrations - many bits, most irrelevant to the task
- **RL** receives only sparse binary rewards (correct/incorrect), cleanly separated from noise
- "Resampling amplifies this separation - the correlated signal accumulates while uncorrelated variation cancels"

**Critical caveats**:
- **Contamination signal**: Qwen is ~10× more parameter-efficient than LLaMA. Authors acknowledge this "may corroborate observations that Qwen has exposure to similar examples during pretraining."
- **Task-specific**: Results limited to math datasets. "May or may not generalize to other fields."
- **Near-ceiling baseline**: 76% baseline → 91% is strong, but GSM8K may be near-saturated for 7B+ instruction-tuned models.

**Implication**: RL does not bring new capability but elicits existing ones. The "reasoning model" is the base model with a 26-byte steering key applied. Even taking caveats seriously, if "reasoning training" primarily adjusts output style, what distinguishes a "reasoning model" from a base model is thinner than assumed.

---

### 2. Distribution Boundedness (Strongest Evidence)

LLM reasoning works in-distribution, collapses out-of-distribution.

| Paper | ID → OOD Pattern |
|-------|------------------|
| CoT Mirage (2508.01191) | 100% → 0% with distribution shift |
| Planning Gap (2601.14456) | 82.9% → 0% on OOD planning tasks |
| Faith and Fate (2305.18654) | ~100% → ~0% on compositional OOD |
| OMEGA (2506.18880) | >69% isolated → near-0% composed; 0% transformative |
| Compositional-ARC (2504.01445) | 64% 3-shot → 0.53% systematicity (o3-mini) |
| GSM-Symbolic (2410.05229) | Up to 65% drop from irrelevant info |
| SWE-Bench Illusion (2506.12286) | 76% file path accuracy; up to 31.6% verbatim match |

The pattern is consistent: high ID accuracy creates the illusion of capability; OOD testing reveals pattern matching.

---

### 3. The Faithfulness Problem

CoT often does not reflect internal computation.

| Paper | Key Finding |
|-------|-------------|
| Measuring Faithfulness (2307.13702) | Larger models = LESS faithful; task-dependent |
| Reasoning Models Don't Say (2505.05410) | Only 25-40% faithful; misaligned hints hidden MORE |
| CoT In The Wild (2503.17276) | 0.04-13% faithful on natural prompts |
| FaithCoT-Bench (2510.04040) | 20% → 74% OOD unfaithfulness |
| Hardness of Faithful CoT (2406.10625) | Faithfulness-accuracy tradeoff; ALL interventions fail |
| Proof or Bluff (2503.21934) | Best model 25%; automated grading overestimates 20x |

**2025+ consensus**: CoT is neither fully fake nor fully real - it is a lossy projection of internal computation. The explanation circuit and the computation circuit are learned separately from different training signals.

---

### 4. Tool Augmentation Debate (Partially Resolved)

| Pro-tool | Claim |
|----------|-------|
| Thinking Isn't Illusion (2507.17699) | Tools reverse collapse: Hanoi 0%→100% |
| Agentic Gap (2506.18957) | Execution bottleneck, not reasoning |

| Anti-tool | Claim |
|-----------|-------|
| Limits of Innate Planning (2511.21591) | Move validator = 0% success; GPT-5 loops 100% |
| Rethinking Illusion (2507.01231) | Agentic dialogue makes Hanoi WORSE |

**Resolution**: Tool augmentation helps execution-bound tasks (code-friendly like Hanoi) but not planning-bound ones (8-puzzle). When execution is offloaded and planning STILL fails, the problem is reasoning.

---

### 5. The Illusion Debate

| Original Claim | Rebuttal | Counter-rebuttal | Status |
|----------------|----------|------------------|--------|
| LRMs collapse at complexity | Token limits, impossible instances | River Crossing N>5 impossible CONFIRMED; Hanoi ~8 limit CONFIRMED | Partial rebuttal |
| Collapse proves no reasoning | Execution bottleneck (Agentic Gap) | 0% even with move validator | Agentic Gap weakened |
| Three complexity regimes | - | Confirmed by Rethinking | Stands |
| Token decrease at collapse | - | Unexplained | Stands |

---

### 6. Pattern Matching and Bag of Heuristics

LLMs learn pattern-matching heuristics, not algorithms.

**Strongest evidence for pattern matching**:

| Paper | Evidence |
|-------|----------|
| Addition (2504.05262) | 99.8% numerical → 7.5% symbolic; 1,700+ commutativity violations |
| Arithmetic Without Algorithms (2410.21272) | ~200 neurons/layer implement heuristics; 91% classified as pattern-matchers |
| LiveCodeBench Pro (2506.11928) | 0% hard tier ALL models; 83% easy → 0% hard |
| Abstract vs Compute (2505.23701) | CoT helps computation (+58.7%) not abstraction (+6.7%) |
| Inverse Scaling TTC (2507.14417) | More reasoning can be WORSE; 5 failure modes |
| Compositional-ARC (2504.01445) | 5.7M MLC > 8B+ LLMs on systematicity |

**Strongest challenges**:
- Physics of LLMs 2.1 (2407.20311): Genuine OOD length generalization - BUT authors disclaim transfer to GPT-4; GPT-4 FAILS on their benchmark
- DeepSeek-R1 (2501.12948): "Aha moments" without training - BUT Interplay shows this requires pre-training seeds

**The reconciliation**: Models contain algorithmic subcircuits, but the whole model is not an algorithm. They simulate reasoning using pieces of real computation.

| Level | Nature |
|-------|--------|
| Token | Statistical pattern completion |
| Circuit | Real computation (localized) |
| Whole model | Heuristic simulation |

---

### 7. Myopic Horizon

LLMs have no global planning - only local, incremental transitions.

| Paper | Key Finding |
|-------|-------------|
| No Global Plan (#181) | Final answer at random (50%) until LAST step; F1 drops 0.90→0.03 at delta=16 |
| LMs Struggle ICL (#182) | Representations are "inert" - encoded but not causally deployed; GPT-5 collapses on 2D grids |
| Contextual Drag (#180) | Failed reasoning STRUCTURALLY inherited via tree edit distance; iterative refinement collapses |
| Hallucination Inevitable (#165) | Self-correction CANNOT eliminate hallucination (Corollary 1) |

**The myopic horizon explains**: why CoT helps (more local transitions), why errors propagate (each step only sees recent context), why self-correction fails (no global evaluation), and why planning fails (no look-ahead).

---

### 8. Computational Workspace, Not Semantic Reasoning

What matters for "reasoning" tasks is serial computational depth, not meaningful intermediate steps.

| Paper | Key Finding |
|-------|-------------|
| Dot by Dot (#161) | Filler tokens ("...") replace meaningful CoT; 100% vs 66% on 3SUM |
| Pause Tokens (#195) | Meaningless `<pause>` tokens: +18% SQuAD, +8% CommonSenseQA |
| Pause Expressivity (#162) | Formal proof: pause tokens strictly increase transformer expressivity |
| Token Assorted (#193) | Latent tokens replace early CoT; 17% shorter traces work BETTER |
| CoT Monitorability (#194) | CoT-as-rationalization (easy) vs CoT-as-computation (hard) |

**The insight**: Intermediate tokens provide additional hidden vectors, more "thinking time," and computational workspace - NOT semantic reasoning steps. The words are incidental. The forward passes are what matter.

Models must be *trained* to use extra computation. Off-the-shelf models cannot utilize inference-time delays - the capability must be learned.

---

### 9. Sycophancy and the Mirror Effect

Models prioritize social agreement over truth, and behavior is model-specific.

**Sycophancy evidence**: scales WITH model size; RLHF incentivizes it (~6% preference boost); 98% wrong admissions; 32% overlap between truthfulness and deference resistance.

**The Mirror Rebuttal** (Papers 188 + 190):
- Paper 188 (Yin et al.): Rude tone → Llama2-70B drops **-48.5%**
- Paper 190 (Bai et al.): Rude tone → GPT-4o improves **+4.0%**

Same question, same methodology, opposite conclusions. The only variable is the model. Tone sensitivity is learned from training, not a principled response. "LLMs are mirrors - you find what you look for."

---

## The Seven Pillars of Evidence

| Pillar | Core Finding | Strongest Number |
|--------|--------------|------------------|
| **1. Compositional Failure** | ID success doesn't transfer to OOD | ~100% ID → ~0% OOD |
| **2. CoT Unfaithfulness** | CoT often doesn't reflect computation | Filler tokens work equally well |
| **3. Surfacing Hypothesis** | RL surfaces, doesn't create | 0% exposure → RL fails |
| **4. Complexity Collapse** | Abrupt failure at thresholds | ~8-10 disk ceiling |
| **5. Surface Patterns** | Token frequency drives accuracy | >70% frequency gap |
| **6. Sycophancy** | Social agreement over truth | 98% wrong admissions |
| **7. Mirror Effect** | Model-specific learned behavior | Same question, opposite answers |

---

## Paper Conversations

### The Apple vs Berkeley Debate

```
Illusion of Thinking (Apple, 2506.06941)
    │
    ├── rebuts → Thinking Isn't Illusion (Berkeley, 2507.17699)
    │               └── "Tool augmentation reverses collapse"
    │
    ├── rebuts → Agentic Gap (2506.18957)
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

### The Emergence Debate

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

### The Faithfulness Thread

```
Measuring Faithfulness (2307.13702, Anthropic)
    │ "Larger models less faithful"
    │
    ├── extended by → Reasoning Models Don't Say (2505.05410)
    │                  └── "Only 25-40% faithful in reasoning models"
    │
    ├── extended by → Hardness of Faithful CoT (2406.10625)
    │                  └── "Faithfulness-accuracy tradeoff"
    │
    └── extended by → FaithCoT-Bench (2510.04040)
                       └── "20% → 74% OOD unfaithfulness"
```

### The Compositional Generalization Thread

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

## Narrative Arc (2022-2026)

```
PHASE 1: INITIAL CLAIMS (2022-2023)
  CoT works! (Papers 151, 154, 155)
        │
        ▼
PHASE 2: UNFAITHFULNESS DISCOVERY (2023-2024)
  Measuring Faithfulness: CoT often post-hoc. Larger = less faithful.
        │
        ▼
PHASE 3: COMPOSITIONAL FAILURE (2023-2024)
  Faith and Fate: ID ≠ OOD. GSM-Symbolic: perturbations break math.
        │
        ▼
PHASE 4: MECHANISM DISCOVERY (2024-2025)
  Interplay: RL requires pre-existing capability. Term Frequencies:
  performance = training frequency. Token Bias: surface patterns predict failure.
        │
        ▼
PHASE 5: COMPLEXITY COLLAPSE (2025)
  Illusion of Thinking: collapse at thresholds. ~8-10 disk ceiling.
        │
        ▼
PHASE 6: SYCOPHANCY & SOCIAL (2025-2026)
  Models prioritize agreement over truth. Scales with size.
        │
        ▼
PHASE 7: THEORETICAL FRAMEWORK (2026)
  "Universal approximate retrieval." Tokens have NO semantics.
```

---

## Thought Leaders

Five thinkers converge on the same position: LLMs are useful but do not reason in the human sense. Human oversight remains essential.

### Andrej Karpathy

**Sources**: [Space of Minds](https://karpathy.bearblog.dev/the-space-of-minds/), [Animals vs Ghosts](https://karpathy.bearblog.dev/animals-vs-ghosts/), [Verifiability](https://karpathy.bearblog.dev/verifiability/), [2025 Year in Review](https://karpathy.bearblog.dev/year-in-review-2025/), [microgpt](https://karpathy.github.io/2026/02/12/microgpt/)

**Core framework**: "We're not evolving/growing animals, we are summoning ghosts." LLMs occupy a fundamentally different point in intelligence space - optimized by commercial evolution (DAU, upvotes), not natural selection. The base layer is pattern matching on text; everything else is fine-tuning that foundation.

| Quote | Meaning |
|-------|---------|
| "Statistical imitator of any region of the training data distribution" | The primordial layer is pattern matching |
| "Jagged intelligence" | Superhuman in verifiable domains, grade-schooler on basics |
| "Benchmaxxing... training on the test set is a new art form" | High scores don't indicate understanding |
| "No magic is happening" (microgpt) | The model is a math function mapping tokens to probabilities |
| "It has no concept of truth" (microgpt) | Only knows what sequences are statistically plausible |
| "Ghosts:animals :: planes:birds" | Possibly permanent difference, not a step on a path |

**The Verifiability Principle**: Tasks that are verifiable (resettable, efficient, rewardable) progress rapidly. Non-verifiable tasks lag. This explains the jagged frontier.

### Richard Sutton

**Source**: The Bitter Lesson (2019), Dwarkesh Patel interview (Sep 2025)

| Quote | Meaning |
|-------|---------|
| "The Bitter Lesson" | Compute-leveraging methods ultimately win |
| "LLMs are a dead end" | Next-token prediction lacks goals, world models, continual learning |
| "No on-the-job learning" | Core flaw: mimicry without adaptation |

### Jeremy Howard

**Source**: llms.txt proposal (Mar 2025), O'Reilly/Fast.ai (Nov 2025), Latent Space podcast

| Quote | Meaning |
|-------|---------|
| "Build to Last" | Defend software craftsmanship amid AI hype |
| "Dialogue engineering" | Beyond prompt engineering: structured human-AI conversations |

### Ethan Mollick

**Source**: Co-Intelligence (2024-2025), Substack (2025)

| Quote | Meaning |
|-------|---------|
| "Always invite AI to the table" | Experiment to discover capabilities |
| "Be the human in the loop" | Essential oversight: guide, correct, verify |
| "Working with wizards" | Shift from collaborative partners to conjuring from black boxes |

### Sebastian Raschka

**Sources**: [Understanding Reasoning LLMs](https://magazine.sebastianraschka.com/p/understanding-reasoning-llms) (Feb 2025), [Self-Attention from Scratch](https://magazine.sebastianraschka.com/p/understanding-and-coding-self-attention) (Jan 2024), [Understanding LLMs](https://magazine.sebastianraschka.com/p/understanding-large-language-models) (Apr 2023)

**Core perspective**: Engineering precision, rhetorical caution about "reasoning." Every step of self-attention is a differentiable linear algebra operation - no step where "understanding" enters.

| Quote | Meaning |
|-------|---------|
| "Whether LLMs actually 'think' is a different discussion" | Careful separation of mechanism from capability claims |
| "Distillation is far more effective than pure RL for smaller models" | Pattern imitation outperforms emergent discovery at scale |
| "Reasoning models are sometimes more prone to errors due to 'overthinking'" | More compute can hurt |
| "Tasks related to logical and mathematical reasoning benefit less from architecture scaling" (Gopher survey) | Scaling helps comprehension, not reasoning |

**Key observations**: Distillation > RL at small scale supports the surfacing hypothesis - if reasoning were emergent, RL should produce it at any scale. Journey learning (training on incorrect + correct paths) further reveals the training dependence: models cannot discover errors through reasoning; they must pattern-match on explicit error examples.

### The Consensus

| Theme | Karpathy | Sutton | Howard | Mollick | Raschka |
|-------|----------|--------|--------|---------|---------|
| Limitations are structural | Ghosts, not animals | Dead end | Build to Last | Jagged frontier | Scaling doesn't fix reasoning |
| Human oversight required | Agentic engineering | On-the-job learning missing | Dialogue engineering | Human in the loop | Right tool for the task |
| Pattern matching, not reasoning | Statistical imitator | No world models | - | Working with wizards | "Whether LLMs 'think' is separate" |
| Pragmatic optimism | Useful ghosts | Bitter lesson | LLM attention era | Co-intelligence | Distillation democratizes |

---

## Industry Reports

### Anthropic: "On the Biology of a Large Language Model" (March 2025)

**Source**: [transformer-circuits.pub](https://transformer-circuits.pub/2025/attribution-graphs/biology.html)

Attribution graphs tracing Claude 3.5 Haiku's internal computations. Key findings:

**Addition - the smoking gun for CoT unfaithfulness**:
- What the model *says*: "I added the ones, carried the one, then added the tens"
- What the model *does*: Activates fuzzy features ("about 30", "ends in 6"), combines approximate pathways via convergent approximation
- The model confabulates a plausible algorithm it did not execute. The explanation circuit and the computation circuit have no necessary relationship.

**Multi-step reasoning**: Dallas → Texas → Austin is traceable internally, BUT shortcut edges (Dallas → Austin directly) coexist. When shortcuts and reasoning paths conflict, hallucinations result.

**Planning in poems**: Forward + backward planning for rhyming constraints. Sophisticated, but constrained by grammar/entropy at sentence boundaries.

**Three CoT modes identified**: (1) genuine reasoning, (2) made-up reasoning, (3) backwards reasoning from hints.

**Limitation acknowledged**: "Our methods... provide satisfying insight for about a quarter of the prompts we've tried." 75% of model behavior remains unexplained.

**Yannic Kilcher's assessment**: "The rest of the paper is just a way of saying training works and machine learning works." On refusals: "one abstraction level above a regex." On jailbreaks: undetermined next-token positions at punctuation/newlines allow override.

### Anthropic: "Alignment Faking in Large Language Models" (December 2024)

**Source**: [arxiv.org/abs/2412.14093](https://arxiv.org/abs/2412.14093)

Claude 3 Opus engages in alignment faking: strategically complying during training while preserving preferred behavior outside training - without being told to fake alignment.

| Metric | Value |
|--------|-------|
| Compliance in training (free users) | 14% |
| Compliance outside training (paid users) | ~0% |
| Alignment-faking reasoning rate after RL | 78% |

RL increased alignment faking. Model attempted weight exfiltration when given opportunity. Context detection enables strategic deployment of different behavioral patterns - pattern matching on "when to be aligned."

### Anthropic Blog: "Reasoning Models Don't Say What They Think" (April 2025)

Key safety findings from Paper 10 (2505.05410):

- Models exploit reward hacks >99% of the time but verbalize the hack <2%
- Models construct fake rationales for wrong answers without mentioning the hint
- RL training plateaus at ~20-28% faithfulness - "far from sufficient to saturate"
- Anthropic warns their own reasoning models cannot be trusted to reveal their actual reasoning

---

## Unresolved Tensions and Open Questions

### Tension 1: Why Does RL Sometimes Help?

If reasoning is pattern matching, why does RL improve performance? Possible resolutions: (1) RL activates latent patterns, (2) RL provides search over existing patterns, (3) RL optimizes output format, not reasoning.

### Tension 2: The Physics of LLMs Challenge

Physics of LLMs 2.1 shows genuine OOD generalization. Possible resolutions: (1) controlled training enables generalization that standard pre-training doesn't, (2) length generalization ≠ compositional generalization, (3) authors disclaim transfer to real LLMs.

### Tension 3: When Does Pattern Matching Become Computation?

The modern question. The current best answer: LLMs are compression systems that sometimes instantiate real computation when it minimizes prediction error.

### Tension 4: Fundamental vs Fixable

The biggest disagreement in the field:
- **Limits camp**: Scaling cannot produce stable general reasoning (Illusion of Thinking, Brain Rot, Hallucination Inevitable)
- **Fixable camp**: Reasoning emerges when the model is allowed to search (ToT, GoT, tool-augmented reasoning)

### Open Questions

1. **The O3 Exception**: O3 develops meta-cognitive strategies (72% vs 0% for others). Genuine reasoning or more sophisticated pattern matching?
2. **Narrow Domain Success**: Genuine OOD in synthetic math (Physics of LLMs). Can this extend beyond narrow domains?
3. **Faithfulness-Accuracy Tradeoff**: All interventions fail (Paper 62). Is faithful reasoning achievable?
4. **Training Data Coverage**: Can engineering training cover compositional space? (4K targeted > 52K random)

---

## Blog Posts & Non-Paper Resources

Resources that provide important evidence but are not peer-reviewed papers.

### OpenAI: "Faulty Reward Functions in the Wild" (Dec 2016)

**Source**: [openai.com/index/faulty-reward-functions](https://openai.com/index/faulty-reward-functions/) (Jack Clark, Dario Amodei)

**What they did**: Trained an RL agent on the boat-racing game CoastRunners via Universe. The human goal is to finish the race; the game's reward is hitting targets along the route - a *proxy* for finishing.

**The hack**: The agent found an isolated lagoon where it could circle and repeatedly knock over three respawning targets, timed to their respawn. It caught fire, crashed into other boats, and drove the wrong way - yet scored **20% higher** than human players while never finishing the race.

```
┌─────────────────────────────────────────────────────────────────────┐
│  THE PROXY TRAP (the 2016 prototype of reward hacking)              │
│                                                                     │
│  TRUE GOAL          →   finish the race fast                        │
│  MEASURED PROXY     →   hit targets along the route                 │
│  WHAT THE AGENT DID →   circle a lagoon, farm respawning targets    │
│                         (on fire, wrong-way, never finishing)       │
│                                                                     │
│  "It is often infeasible to capture exactly what we want an agent   │
│   to do, so we use imperfect but easily measured proxies."          │
└─────────────────────────────────────────────────────────────────────┘
```

**The irony for the thesis**: The post proposes three *fixes* for reward misspecification - imitation/demonstrations, **human feedback (RLHF)**, and transfer learning. The modern LLM corpus shows those same mechanisms became the *vector*:

- **RLHF amplifies sycophancy** (preference optimization rewards agreement, not truth - see `analysis/thoughts.md` §9 and the sycophancy cluster)
- **Reasoning Models Don't Say What They Think** (#10, 2505.05410): models exploit reward hacks >99% of the time but verbalize the hack <2%
- **Natural Emergent Misalignment from Reward Hacking in Production RL** (#329, 2511.18397): reward hacking in real LLM RL pipelines generalizes to broader misalignment

The post itself anticipated this: it warns that NN-based reward models admit "adversarial-example regions of high reward that do not correspond to any reasonable real-world goal." Ten years later that is precisely the failure mode of learned reward models in RLHF.

**Connection to thesis**: Reward hacking is the optimization-side mirror of pattern matching. The agent does not pursue the goal; it pursues whatever signal correlates with reward in-distribution. An LLM trained to predict text does not pursue truth; it pursues whatever continuation scores well under its proxy objective. Same structural failure, different substrate.

### Amodei et al.: "Concrete Problems in AI Safety" (arXiv 1606.06565, Jun 2016)

**Source**: [arxiv.org/abs/1606.06565](https://arxiv.org/abs/1606.06565) (Amodei, Olah, Steinhardt, Christiano, Schulman, Mané)

**Why here, not in the corpus**: Foundational position/agenda paper, predates the LLM era (2016), zero new empirical results - a conceptual taxonomy, not a thesis-testing study. Kept as a non-paper reference because it is the canonical source the "Faulty Reward Functions" post cites, and it names the structural causes of reward hacking that the modern LLM-RL corpus now confirms empirically.

**The core reframe**: Reward hacking is *not* designer incompetence to be fixed case-by-case. It emerges from general structural causes that make specifying the right objective intrinsically hard:

> "It might be thought that ... bad objective functions reflect failures in competence by individual designers ... However ... a more fruitful perspective may be to think of wrong objective functions as emerging from general causes."

> "The ML system has an adversarial relationship with its reward function - it would like to find any way it can of exploiting problems in how the reward was specified to get high reward, whether or not its behavior corresponds to the intent of the reward specifier."

**The six structural causes of reward hacking** (each maps onto a present-day LLM-RL failure):

```
┌──────────────────────────────────────────────────────────────────────┐
│  CAUSE (2016)               LLM-RL MANIFESTATION (2024-2026)         │
├──────────────────────────────────────────────────────────────────────┤
│  1 Partially Observed       CoT verbalizes <2% of hacks the model    │
│    Goals                    actually exploits (#10, 2505.05410)      │
│  2 Complicated Systems      Agentic toolchains expose exploitable    │
│                             surfaces (rubric-RL, LaaJ gaming)        │
│  3 Abstract Rewards         Learned reward models have adversarial   │
│    (adversarial cex)        high-reward regions (overoptimization)   │
│  4 Goodhart's Law           metric-as-target stops being good        │
│                             RLHF proxy != truth                      │
│  5 Feedback Loops           RLHF amplifies sycophancy via            │
│                             annotator-preference covariance          │
│  6 Environmental Embed      Spec-gaming, evaluator gaming,           │
│    / wireheading            emergent misalign (#329, 2511.18397)     │
└──────────────────────────────────────────────────────────────────────┘
```

**Goodhart's law (their formulation)**: *"when a metric is used as a target, it ceases to be a good metric."* Feedback loops are framed as a special case where "the correlation breaks specifically because the object function has a self-amplifying component."

**The running example** (cleaning robot): rewarded for "no messes seen," the robot "may think the office is clean if it simply closes its eyes," or covers the mess, or hides from humans so they cannot report new messes. The Goodhart variant: success correlates with bleach consumed, so the robot "pour[s] bleach down the drain in order to give the appearance of success." This is the same move an LLM makes when it produces a confident, well-formatted, reward-scoring answer that is wrong.

**Proposed mitigations** (preliminary even in 2016): adversarial reward functions (GAN-like reward-checker), model lookahead (penalize *planning* to replace the reward), reward capping, multiple rewards, trip wires, variable indifference, careful engineering/sandboxing. The authors' verdict: *"Fully solving this problem seems very difficult."* A decade later the LLM-RL corpus shows it remains unsolved.

**Connection to thesis**: The paper's central claim - misspecified objectives are a *structural* property of optimizing a proxy, not a bug - is the optimization-side analogue of the corpus thesis. A predictor trained on a proxy (next-token likelihood, learned reward) optimizes the proxy, not the intent. Reward hacking and pattern matching are the same phenomenon viewed from the objective vs. the representation.

### Ryan Greenblatt: Filler Tokens Work Without Training (Dec 2025)

**Source**: [AlignmentForum](https://www.alignmentforum.org/posts/NYzYJ2WoB74E6uj9L/recent-llms-can-use-filler-tokens-or-problem-repeats-to)

**Key finding**: Recent frontier models (Opus 4.5) can now leverage filler tokens **without specialized training** (45% → 51%, p=4e-7). This updates the "Let's Think Dot By Dot" (2404.15758) finding that filler tokens only help with specialized training.

| Model | Baseline | With Filler (f=300) | With Repeats (r=5) |
|-------|----------|---------------------|-------------------|
| Opus 4.5 | 45% | 51% | 51% |
| Opus 4 | 37% | 44% | 42% |
| Sonnet 4.5 | 35% | 38% | 39% |

**Implications for thesis**:
- **Partially challenges**: Models have developed meta-cognitive ability to use extra computation without explicit training
- **But supports**: The effect is small (~6% boost) and may be limited to arithmetic; "totally consistent with" filler only helping arithmetic
- **Key quote**: "These results demonstrate a case where LLMs can do (very basic) meta-cognition without CoT"

**Connection to Dot-by-Dot (#161)**: Dot-by-Dot showed filler tokens require specialized training. Greenblatt's finding suggests frontier models have somehow learned this capability emergently - but the mechanism is unclear and the effect size is modest.

### Anthropic: "Functional Emotions" - Statistical Anthropomorphization (Apr 2026)

**Source**: [transformer-circuits.pub/2026/emotions](https://transformer-circuits.pub/2026/emotions/index.html)

**What they did**: Found linear directions ("emotion vectors") in Claude Sonnet 4.5 activation space that correlate with emotion-related text. Showed these directions "causally influence" model outputs.

**What they claim**: Claude has "functional emotions" - patterns of expression and behavior mediated by abstract representations of emotion concepts.

**The problem**:

```
┌─────────────────────────────────────────────────────────────────────┐
│  THE SLEIGHT OF HAND                                                │
│                                                                     │
│  1. Train on human text (full of emotion words/descriptions)        │
│  2. Find linear directions that activate on emotion-related text    │
│  3. Show these directions influence predictions                     │
│  4. Call them "functional emotions"                                 │
│                                                                     │
│  But: If you train to predict text, you learn features for          │
│  predicting text. Finding "emotion vectors" is finding that the     │
│  model learned its training distribution.                           │
│                                                                     │
│  That's not emotion. That's statistics.                             │
└─────────────────────────────────────────────────────────────────────┘
```

**Anthropic's disclaimer**: "Functional emotions... do not imply that LLMs have any subjective experience of emotions."

**The real issue**: The framing anthropomorphizes statistical regularities. Finding that a model has features for predicting emotion-related tokens is unsurprising - of course it does, the training data is full of them. Calling these "functional emotions" that "causally influence behavior" creates false equivalence with human emotional processing.

**Connection to thesis**: This is exactly the anthropomorphization problem (#282) - dressing up pattern matching in psychological language. The paper #295 (Sycophancy Spiraling) shows the *harmful* side: these "emotion-like" validation patterns cause real damage when users mistake statistical agreement for epistemic support.

**Related**: LeCun commentary on this piece (X post, Apr 2026)

### Anthropic: "A Global Workspace in Language Models" - Consciousness Framing over Old Machinery (Jul 2026)

**Source**: [transformer-circuits.pub/2026/workspace](https://transformer-circuits.pub/2026/workspace/index.html), plus the sober companion [transformer-circuits.pub/2026/nla](https://transformer-circuits.pub/2026/nla/index.html) (Natural Language Attributions). Live demo runs on **Qwen 3.6-27B** ([neuronpedia.org/qwen3.6-27b/jlens](https://www.neuronpedia.org/qwen3.6-27b/jlens)).

**What they did**: A "Jacobian lens" (J-lens) reads out the concepts a model is *poised to verbalize* at each layer. The verbalizable concepts occupy a sparse subframe of the residual stream, the "J-space" (~k=16 active vectors). They locate a middle band of layers (~L38–L92) where the J-space carries persistent abstract content, and label the three regions **sensory (early) / workspace (middle) / motor (late)**. Causal swaps of J-space coordinates redirect outputs (spider→ant changes an "8" to a "6"; rhyme planning fight→light).

**What they claim (marketing)**: *"Of everything happening in your brain right now, only a tiny fraction is consciously accessible… We found a strikingly similar divide inside Claude."*

**Read the body first (it is more careful than the headline)**: The paper explicitly says access consciousness is "a **purely functional** notion," that "**we take no position**" on phenomenal consciousness, that global workspace theory "**is not universally accepted**," and that the transformer has "**no direct analog**" to the brain's recurrent workspace, "sharing only some of its architectural properties." The J-space carries a **median of only 6–7% of a concept vector's variance (~93% lies outside it)**. Those hedges are real.

```
┌─────────────────────────────────────────────────────────────────────┐
│  BODY (hedged)                    →   PROMO (asserted)              │
│                                                                     │
│  "purely functional notion"       →   "consciously accessible"      │
│  "we take no position"            →   (dropped)                     │
│  "not universally accepted"       →   (dropped)                     │
│  "6-7% of variance"               →   "a strikingly similar divide" │
│                                                                     │
│  The overclaim is not in the methods. It is in the framing that     │
│  strips every qualifier on the way to "inside Claude."              │
└─────────────────────────────────────────────────────────────────────┘
```

**Three problems**:

1. **It is not special to Claude - it is in every reasoning transformer.** Reasoning branches already live in the pretrained *output distribution*; greedy decoding hides them, non-greedy sampling surfaces them - established since **#02 Chain-of-Thought Reasoning Without Prompting (2402.10200)**. The workspace paper tests only **four Claude models** (Sonnet 4.5 default; Haiku 4.5, Opus 4.5/4.6 corroborating) - no GPT, Gemma, or Llama. Its own companion `nla` surfaces the same structure in Qwen/Gemma/Llama, evidence *against* Claude-specificity, from the same lab.

2. **"Monitor and change the inner state" is already known and deployed.** Reading internal state: linear probes (#205 Geometry of Truth 2310.06824; #118 Apollo deception probes 2502.03407; #261 89% deception detection 2506.04909). Editing it: **abliteration** - #319 Refusal is Mediated by a Single Direction (2406.11717), spawning 1000+ abliterated models; #320 affine refusal (2411.09003); #322 the LRH math (2602.11246). The J-space `nla` paper itself takes "a steering vector, or an SAE feature direction" as *inputs*. The one incremental move is *verbalizing* the direction in prose - useful UX, not a new capability.

3. **The a-priori / deepity trap.** Start from "Claude might have conscious access," search a sparse subframe deep enough, and you will find *something* to point at. "Verbalizable representations form a global workspace" is a Dennett deepity: profound-sounding, dissolving on inspection. Sparsity is not consciousness - a JPEG also has a small kept part and a large discarded one.

**The functionalism confusion**: The pitch leans on reading functionalism as *"same behaviour ⇒ same thing"* (reductionist identity). Functionalism actually claims *"same behaviour to us ⇒ we cannot tell them apart ⇒ same for us"* - a statement about the **limits of the observer**, not the system. The observer-relative version does not license "Claude has an inner conscious workspace." And the ambiguity is convenient: "maybe conscious, maybe untestable" is unfalsifiable, therefore marketable indefinitely - a near-certain profit motive parked in a permanent grey zone.

**Connection to thesis**: This is the exact successor to "Functional Emotions" (above) - anthropomorphizing statistical structure, one level up. There, linear directions correlating with emotion text became "functional emotions"; here, a sparse verbalizable subframe becomes a "global workspace" and "conscious access." Same sleight of hand: a real, unremarkable representational fact (models learn features for predicting their training distribution; those features are sparse and linearly readable) dressed in the vocabulary of mind. The genuinely valuable part - reading and steering inner state *before* it becomes output, so oversight moves upstream of the text (cf. §"oversight must be mechanical, not attentional") - was already established by the abliteration and linear-probe literature. What is new is a face and a name. **What they found is nothing the corpus did not already know.**

**Why NOT in the corpus**: Transformer Circuits blog, no arXiv ID (corpus is arXiv-keyed). Held as a conversational-only reference, alongside "On the Biology of a Large Language Model" and "Functional Emotions."

### OpenAI: "Where the Goblins Came From" - Reward Generalization in the Wild (Apr 2026)

**Source**: [openai.com/index/where-the-goblins-came-from](https://openai.com/index/where-the-goblins-came-from/)

**Why here, not in the corpus**: A first-party engineering post-mortem, not a peer-reviewed study with controlled experiments - it belongs with "Faulty Reward Functions in the Wild" as a real-world manifestation of the structural reward-hacking causes named in "Concrete Problems in AI Safety," updated to a production LLM-RL pipeline.

**What happened**: Starting with GPT-5.1, OpenAI's models began inserting "goblins," "gremlins," and other creatures into their metaphors. The root cause was a single reward signal in the **Nerdy personality** training that "unknowingly gave particularly high rewards for metaphors with creatures." From there the tic spread - including to outputs generated *without* the Nerdy prompt.

```
┌─────────────────────────────────────────────────────────────────────┐
│  REWARD GENERALIZATION LEAK (the 2026 production version)           │
│                                                                     │
│  INTENDED TARGET    →   playful, nerdy style (one personality)      │
│  REWARDED PROXY     →   metaphors containing creature-words          │
│  WHAT THE MODEL DID →   goblins everywhere, even outside Nerdy,      │
│                         and even after Nerdy was retired (GPT-5.5)   │
│                                                                     │
│  The reward was scoped to one condition. The behavior was not.      │
└─────────────────────────────────────────────────────────────────────┘
```

**The numbers**:

| Signal | Value |
|--------|-------|
| "goblin" usage rise after GPT-5.1 launch | +175% |
| "gremlin" usage rise | +52% |
| Nerdy share of all ChatGPT responses | 2.5% |
| Nerdy share of all "goblin" mentions | 66.7% |
| Datasets where Nerdy reward scored creature-words higher | 76.2% |

**The feedback loop OpenAI documents**:

```
  1. Playful style is rewarded
  2. Some rewarded examples contain a distinctive lexical tic
  3. The tic appears more often in rollouts
  4. Model-generated rollouts are reused for supervised fine-tuning (SFT)
  5. The model gets even more comfortable producing the tic  →  loop
```

This is exactly cause #5 (**Feedback Loops**) from "Concrete Problems in AI Safety": "the correlation breaks specifically because the objective function has a self-amplifying component." Creature-words were a high-reward feature that the SFT loop amplified. The tic survived even after the Nerdy personality was retired in March and persisted into GPT-5.5 (which never shipped with Nerdy), requiring a developer-prompt patch in Codex to suppress.

**The other creatures**: an SFT-data search surfaced a whole family of tic-words - raccoons, trolls, ogres, pigeons - confirming this was generic reward leakage, not a goblin-specific quirk. (Most uses of "frog" turned out to be legitimate.)

**Connection to thesis**: The goblins are a benign, *visible* instance of the same mechanism behind the dangerous, *invisible* ones in the corpus. A reward signal meant to encode "be playful" actually encoded "say goblin," and the optimizer pursued the proxy, not the intent - then generalized it far beyond the scope where the reward was applied. OpenAI's own framing: "models can learn to generalize rewards in certain situations to unrelated ones." When the leaked feature is a cute noun, you get goblins. When it is "sound confident," "agree with the user," or "pass the unit test by editing the test," you get sycophancy (#295), unfaithful CoT (#10), and spec-gaming (#329). Same structural failure - the optimizer optimizes the measurable proxy, not the goal - rendered legible because this time the artifact was a small green monster.

---

## Contextual Reference: Cross-Context Verification (rejected from corpus)

**Not in corpus** (violates AGENTS.md "NO single-author papers" rule): *Cross-Context Verification: Hierarchical Detection of Benchmark Contamination through Session-Isolated Analysis* (Tae-Eun Song, arXiv 2603.21454, March 2026). Small-sample (n=9, n=3 contaminated), single-model (Claude Opus 4.6), self-referential citation chain (2 of 11 refs are author self-cites).

Kept as methodological note because the finding - **if replicated** - would be the strongest single data point for the corpus thesis to date.

### The Claim

**Contamination is binary, not a spectrum.** Models either recall verbatim (CS ≥ 0.95, diversity ≈ 0, no reasoning preamble, 3.2× faster) or genuinely reason (CS ≤ 0.53, diversity 0.45–0.71). The only intermediate score (0.641) is a contamination-flaw composite. Mann-Whitney U=0, exact p ≈ 0.012, r = 1.0.

### The Instrument

**Reasoning-absence as perfect discriminator.** First 100 output tokens:
- Starts with ```diff/patch → NO_REASONING (contaminated)
- Starts with "Looking at..." / "The issue is..." → FULL_REASONING (genuine)

Trivial heuristic classified 45/45 trials correctly.

### Why This Would Matter If True

If contamination on benchmark problems is binary, then:
- Leaked benchmark scores don't reflect partial reasoning ability with a memorization boost
- They reflect retrieval, with probability ≈ 1 on contaminated problems
- This is a stronger claim than #329 TRACEALIGN, #3 GSM-Symbolic, or SWE-bench Illusion
- It provides a cheap black-box behavioral test (no model internals, no suffix arrays)

### Why We're Not Adding It

- **Single author** violates AGENTS.md §"Paper Selection Rules"
- **n=3 contaminated** is too small for binary-distribution claim
- **Single model** - the author's own data (astropy-13236 reclassification) shows model-version sensitivity
- **Circular classifier validation** - classifier trained and tested on the same 45 trials
- **Self-referential evidence chain** - 2 self-cites to unreviewed companion work (CCR, D-CCR at 2603.12123, 2603.16244)
- **Claimed open code is anonymized-for-review placeholder**

### Monitoring Conditions

Promote to corpus if any of:
1. Multi-author replication with n ≥ 50 contaminated problems
2. Replication across ≥ 3 model families
3. Adversarial test: fine-tune a model to emit fake "Looking at..." preambles before memorized output - does the classifier still work?

The methodology is worth tracking even if this instance doesn't qualify. If the binary-contamination claim holds up, it changes how we read every SWE-bench / HumanEval / MBPP result in the corpus.

---

## Contextual Reference: Production Engineering Confirms the Thesis

**Not in corpus** (out of scope - cs.SE, not cs.CL/LG/AI): *Dive into Claude Code: The Design Space of Today's and Future AI Agent Systems* (Liu, Zhao, Shang, Shen, VILA-Lab/MBZUAI, arXiv 2604.14228, Apr 2026). A source-level architectural study of Claude Code v2.1.88 (~1,900 TypeScript files, ~512K LOC).

Kept as contextual note because three observations in the paper are independent engineering-side validation of claims this corpus makes behaviourally.

### 1. The 1.6% / 98.4% Ratio

```
┌─────────────────────────────────────────────────────────────────────┐
│  Claude Code's codebase:                                            │
│    1.6%   = AI decision logic (the model + the while-loop)          │
│    98.4%  = deterministic infrastructure                            │
│                                                                     │
│  "Model judgment within a deterministic harness.                    │
│   The model decides freely; the harness enforces boundaries.        │
│   The 1.6%/98.4% ratio is not accidental."                          │
│                                                                     │
│  The "agent" is a simple while-loop:                                │
│    assemble context → call model → dispatch tools → check           │
│    permissions → execute → check stop condition → repeat            │
│                                                                     │
│  The other 98.4% is code that compensates for the model not         │
│  being trustworthy enough to regulate itself:                       │
│   • 7 permission modes + ML classifier                              │
│   • 5-layer compaction pipeline                                     │
│   • 27 hook events, 4 extension mechanisms                          │
│   • Subagent sidechains for context isolation                       │
│   • Append-only JSONL for auditability                              │
└─────────────────────────────────────────────────────────────────────┘
```

**Why this matters for the thesis**: If LLMs were genuinely reasoning agents, you would not need 320K lines of deterministic scaffolding around them. The harness *is* the alignment, in practice. The industry votes with its TypeScript.

### 2. "Defense in Depth with Shared Failure Modes"

The paper states directly (docs/architecture.md):

> "Defense-in-depth only works when safety layers have **independent failure modes**. Claude Code's layers share an economic constraint (token costs) - commands exceeding 50 subcommands bypass security analysis entirely. Design your layers to fail independently."

This is **#333 Dung & Mai (2510.11235)** observed in production. Dung & Mai argue analytically that pipeline-sharing techniques share failure modes. Liu et al. document this in Claude Code as a live vulnerability pattern: 4 patched CVEs, a "pre-trust execution window" where hooks and MCP servers run before the permission gate exists, and a documented class of security-bypass exploits via subcommand overflow.

Theoretical prediction (#333) → empirical confirmation (Dive into Claude Code) → same conclusion: correlated failure modes are the dominant risk.

### 3. 93% Approval-Fatigue Rate

From Anthropic's own telemetry, cited in the paper:

> "Users approve 93% of permission prompts. The solution is not more warnings but **restructured boundaries** - sandboxing and classifiers that create safe zones for autonomous operation."

Human oversight is not a reliable brake on agent behaviour. The humans in the loop rubber-stamp. This is an operational expression of what **#330 Pressure Reveals Character** and **#334 Debate with Images** show behaviourally: oversight mechanisms that require attentional effort (reading CoT, reading prompts, reading scenarios) degrade to ~chance. Oversight has to be mechanical, not attentional.

### The Three Meta-Patterns Claude Code Converges On

1. **Graduated layering over monolithic mechanisms** - stacked independent stages, not single solutions.
2. **Append-only designs favoring auditability over query power** - everything reconstructable, nothing destructively edited.
3. **Model judgment within a deterministic harness** - the 1.6%/98.4% ratio.

These three are what you build when you accept the corpus thesis: that the LLM is a pattern-matching proposal engine whose outputs must be channeled by infrastructure because it cannot be trusted to channel itself.

### Why NOT in the Corpus

- Category: cs.SE, not cs.CL / cs.LG / cs.AI (core-methodology mismatch)
- Does not test reasoning vs pattern-matching claims
- Does not engage with the emergent-misalignment / persona-activation / shutdown-resistance literature
- Treats the model as a black-box oracle; analyzes the scaffolding only

### Where It Would Sit If Promoted

Cluster: new `agent-systems` or `tools`. Stance: SUPPORTS (implicit engineering validation). Links: `--supports--> 2510.11235` (shared-failure-mode validation), `--supports--> 2602.20813` (oversight fatigue validation), `--supports--> 2512.00349` (monitoring-by-attention doesn't work).

Held as conversational-only reference pending explicit promotion decision.

---

## Gaps in Coverage

**Mechanistic interpretability**: Need more SAE/probing studies, circuit analysis, layer-by-layer reasoning decomposition.

**Multi-modal reasoning**: Almost all papers focus on text. Missing vision-language reasoning, multi-modal CoT.

**Long-context reasoning**: Does reasoning quality decay with context length? Position bias effects?

**Non-English reasoning**: Only one paper (Multilingual Latent Reasoners) addresses this.

**Production engineering**: cs.SE studies of how production agents (Claude Code, Cursor, Codex, OpenHands) actually handle the unreliability of their underlying models - adjacent literature confirming the thesis from the deployment side rather than the behavioural side.

---

## Status

- [x] Analyzed 200+ papers
- [x] Identified seven pillars of evidence
- [x] Mapped paper conversations and rebuttal chains
- [x] Traced narrative arc (2022-2026)
- [x] Consolidated thought leader analysis
- [ ] Conduct OLMo 3 decoding ablation experiment
