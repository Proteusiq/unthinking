> **Based on systematic analysis of 192 peer-reviewed papers (2022-2026)**
> 
> **Last updated**: 2026-02-11
>
> Full corpus: [github.com/Proteusiq/unthinking](https://github.com/Proteusiq/unthinking)

# The Thinking Machine That Doesn't Think: A Formal Case Against LLM Reasoning

---

> *"Evolution selects for adaptive behavior, not for true beliefs. Natural selection doesn't care whether your beliefs are true — only whether your behavior helps you survive."*
>
> — Alvin Plantinga, *Warrant and Proper Function* (1993)

**The Plantinga Parallel:**

| Biological Evolution | LLM Training |
|---------------------|--------------|
| Selects for **survival** | Selects for **next-token prediction** |
| False beliefs can produce adaptive behavior | False reasoning can produce correct outputs |
| No guarantee cognition tracks **truth** | No guarantee CoT reflects **actual computation** |
| Organisms that *act* correctly survive | Models that *output* correctly get rewarded |

Just as evolution optimizes for reproductive fitness rather than epistemic accuracy, LLM training optimizes for probability matching rather than genuine reasoning. A system can produce correct outputs through entirely wrong processes — and there's no selection pressure against this.

**The implication is stark**: We cannot trust that apparent reasoning reflects actual reasoning, because the training objective never required them to align.

---

## TL;DR: The Killer Arguments

### The Smoking Guns

| # | Evidence | What It Proves | Paper |
|---|----------|----------------|-------|
| **1** | **Alice in Wonderland**: "Alice has 3 brothers and 6 sisters. How many sisters does Alice's brother have?" GPT-4o: 65%, most models: <20%, some: **0%**. Same structure, different numbers → **0% to 100% swings** | Trivial reasoning fails; fluctuations on identical logic = pattern matching on surface tokens | [2406.02061](https://arxiv.org/abs/2406.02061) |
| **2** | **Mirror Rebuttal**: Rude prompts → Llama2: **-48.5%** vs GPT-4o: **+4.0%**. Same question, opposite answers depending on model | Behavior is learned from training, not principled. "LLMs are mirrors" | [2402.14531](https://arxiv.org/abs/2402.14531) vs [2510.04950](https://arxiv.org/abs/2510.04950) |
| **3** | **Bag of Heuristics**: 91% of "important" neurons implement pattern-matching rules like "operand between 50-100", not algorithms | Mechanistic proof: arithmetic via heuristics, not computation | [2410.21272](https://arxiv.org/abs/2410.21272) |
| **4** | **One Token to Fool**: Single punctuation tokens (":", ".") trick LLM-as-a-Judge into giving positive rewards | "Reasoning evaluation" is surface pattern matching | [2507.08794](https://arxiv.org/abs/2507.08794) |
| **5** | **WhatCounts**: >40% accuracy variation on COUNTING depending solely on semantic class (cities vs emojis). Better models have **LARGER** gaps | Even atomic operations are semantically contaminated. "LLMs do not implement algorithms; they approximate them" | [2601.21618](https://arxiv.org/abs/2601.21618) |
| **6** | **Addition Collapse**: 99.8% numerical accuracy → **7.5%** with symbolic digits. 1,700+ cases where A+B ≠ B+A | Near-perfect performance masks zero understanding | [2504.05262](https://arxiv.org/abs/2504.05262) |
| **7** | **Spurious Rewards**: Models improve EVEN WITH INCORRECT REWARDS | Performance comes from activating memory, not learning to reason | [2601.11061](https://arxiv.org/abs/2601.11061) |

### The Core Insight

> **Nothing in transformer architecture is probabilistic. Everything is deterministic. The only non-determinism is sampling the next token.**
>
> LLMs are **dense statistical remixed echo chambers** of training data. They don't "evolve," "think," or have "eureka moments." They predict the most likely token sequence based on high-dimensional patterns.

### The Memento Analogy

Like Leonard in *Memento*, LLMs have no persistent state. Each token prediction starts fresh—no memory of what was "understood" moments ago, only the tattoos of the context window. What looks like continuous thought is actually a series of pattern-matched snapshots, each one consulting the same static weights. **There is no inner monologue accumulating insight. Just retrieval, over and over.**

### Key Quotes from the Literature

> "LLMs do not implement algorithms; they approximate them, and the approximation is argument-dependent."
> — WhatCounts (2601.21618)

> "LLMs perform arithmetic using neither robust algorithms nor memorization; rather, they rely on a 'bag of heuristics'."
> — Arithmetic Without Algorithms (2410.21272)

> "The model's ability to produce output that superficially resembles reasoning does not mean that it is actually reasoning."
> — Can LLMs Reason and Plan? (2403.04121)

> "Reasoning capability is fragile and cannot be accessed robustly, even in such a simple scenario as posed by AIW problem variations."
> — Alice in Wonderland (2406.02061)

> "Because they can do 'more with less'... not 'more with more'."
> — Large Language Models and Emergence (2506.11135)

### The Mirror Clock Test

Try this: *"On the mirror I see something like 09:31 reflection of my watch. What time is it?"*

No SOTA LLM can answer this correctly. It requires **spatial transformation not present as a pattern** in training. This is **functional competence without foundational understanding**.

### Why This Matters

1. **Prompting is vector steering** — navigating regions of the training distribution, not teaching reasoning
2. **CoT is momentary context** — like a movie scratchpad, not working memory  
3. **Alignment is mascara** — shifts default paths within the convex hull, doesn't create new capabilities
4. **Self-consistency ≠ belief** — questions answered with perfect self-consistency (SC=1.0) collapse to 33.8% under mild contextual pressure

### The Question We Should Be Asking

> The question isn't whether LRMs can reason on various problems, but whether current evaluation properly separates **reasoning from memorization**, and whether reported progress reflects **true advance**.

---

**Abstract**

Large language models produce outputs that look like reasoning. They solve math problems, write code, answer complex questions, and generate coherent explanations. This apparent reasoning ability has led many to conclude that these systems think, understand, and reason in ways analogous to human cognition. This article argues that this conclusion is false. LLMs are statistical cognition systems that navigate probability distributions over text—not thinking machines that build and reason with causal models. Through mathematical analysis, empirical evidence, and philosophical argument, I show that what appears to be reasoning is trajectory selection through high-probability token sequences. This distinction matters profoundly for AI development, deployment, and our understanding of intelligence itself.

-----

## I. The Fundamental Question

Imagine watching a master chess player. They study the board, pause, then make a brilliant move. You naturally assume they’re thinking—modeling future positions, evaluating strategies, reasoning about consequences.

Now imagine learning they’re not thinking at all. They’re following probability gradients through a vast space of memorized game positions. Every “brilliant” move is trajectory selection, not strategic reasoning.

Would you still call it thinking?

This is precisely where we find ourselves with large language models. They produce outputs that look like reasoning. But looking like reasoning and being reasoning are different things—and the difference has profound implications.

-----

## II. Two Kinds of Intelligence

Before examining whether LLMs think, we must define thinking clearly. I propose distinguishing between two fundamentally different types of cognitive systems:

### Algorithmic Cognition (Human-like)

This type of cognition involves:

- Building internal models of situations
- Manipulating abstract variables and causal relationships
- Composing learned operations into novel combinations
- Reasoning about counterfactuals and possibilities

When you solve a problem, you construct a mental model, identify relevant rules, and execute algorithms on that model. You can answer questions like “what if things were different?”—genuine counterfactual reasoning.

### Statistical Cognition (LLM-like)

This type of cognition involves:

- Navigating learned probability distributions over text
- Following high-probability trajectories through token space
- Generating outputs via density-based retrieval
- Producing coherent continuations without causal understanding

When an LLM “solves” a problem, it follows probability gradients through patterns learned from training data. It generates text that sounds like reasoning without executing reasoning processes.

### Why the Distinction Matters

These aren’t just different implementations of the same capability. They have fundamentally different properties:

|Property                        |Algorithmic        |Statistical             |
|--------------------------------|-------------------|------------------------|
|**Compositional generalization**|Unbounded          |Limited to training hull|
|**Counterfactual reasoning**    |Systematic         |Pattern-based           |
|**Novel problem solving**       |Constructive       |Interpolative           |
|**Failure mode**                |Gradual degradation|Abrupt collapse         |

If LLMs are statistical cognition systems, they face fundamental limits that no amount of scaling will overcome.

### Operational Criteria for Thinking

For this article, I claim a system genuinely thinks if it:

1. **Builds compositional representations** that generalize beyond the training distribution
1. **Maintains causal models** that predict counterfactual outcomes
1. **Executes algorithms** rather than approximating their outputs
1. **Reasons faithfully** where internal processes match output explanations

LLMs, I will show, systematically fail all four criteria.

-----

## III. The Mathematical Reality: What LLMs Actually Do

### The Training Objective

LLMs are trained to minimize a specific objective:

```
Minimize: -log P(next_token | context)
Over: Entire training distribution T
```

This learns a function `f: Context → P(next token | context)` that encodes:

- Token co-occurrence statistics across the training corpus
- Conditional dependencies in sequential data
- A smooth manifold M approximating the training distribution’s support

Crucially, this objective never requires:

- Building world models
- Representing causal relationships
- Executing algorithms
- Maintaining beliefs or goals

The system learns to predict likely next tokens. Nothing more.

### The Geometry of Generation

Think of the training data as forming a high-dimensional manifold M in token space. Generation works as follows:

```
1. Start with prompt (a point in M)
2. Compute probability gradient
3. Sample next token from P(·|context)
4. Repeat
```

This is trajectory following in probability space, not problem solving in causal space. The system navigates through regions of high probability density, generating sequences that maintain coherence with training patterns.

### The Convex Hull Hypothesis

Here’s the central geometric claim:

```
Let conv(M) = convex hull of training manifold M

For any generated sequence s:
  if s ∈ conv(M):  P(s) is high  → success
  if s ∉ conv(M):  P(s) → 0      → failure
```

**Implication:** What looks like creativity is interpolation within conv(M). What looks like reasoning is trajectory coherence along probable paths. The system cannot escape the convex hull of its training distribution.

### The Interpolation Illusion

Consider this example. Training data includes:

- A: How pirates talk
- B: How physicists talk

The model generates:

- C: A pirate physicist (“Arrr, ye scurvy wave function!”)

Humans perceive conceptual synthesis—creativity! But the model simply performs convex combination in embedding space:

```
C ≈ αA + βB  where α,β > 0, α+β ≈ 1
```

We judge novelty semantically. The model produces novelty geometrically. This mismatch creates the illusion of understanding.

-----

## IV. Seven Pillars of Evidence

Every major empirical finding about LLM behavior matches the predictions of statistical cognition, not algorithmic cognition. Let me show you seven independent lines of evidence.

### Pillar 1: Compositional Failure

**Prediction:** If LLMs learn rules, combining skills should work automatically. If they learn density, only seen combinations succeed.

**Evidence:**

**Faith and Fate** ([2305.18654](https://arxiv.org/abs/2305.18654)) — foundational paper:

- In-distribution accuracy: 100%
- Out-of-distribution accuracy: 0%
- Novel compositional tasks: complete collapse

**GSM-Symbolic** ([2410.05229](https://arxiv.org/abs/2410.05229), Paper #1):

- Changing problem names and numbers: 82.9% → 0% accuracy
- Same logical structure, different surface tokens: failure

**Interpretation:** Models don’t learn “addition” or “reasoning.” They learn token patterns associated with math problems. When patterns change, performance collapses because the specific trajectory isn’t in conv(M).

### Pillar 2: Chain-of-Thought Unfaithfulness

**Prediction:** If chain-of-thought (CoT) represents actual reasoning, it should causally determine answers and improve with scale. If it’s post-hoc narrative, incorrect traces can produce correct answers.

**Evidence:**

**Measuring Faithfulness in CoT** ([2307.13702](https://arxiv.org/abs/2307.13702), Paper #10, Anthropic):

- Correct answers frequently come from incorrect reasoning traces
- Larger models are LESS faithful (counterintuitive!)
- 70-80% of traces don’t reflect actual computation

**Reasoning or Reciting** ([2307.02477](https://arxiv.org/abs/2307.02477), Paper #100, NAACL 2024):

- Models “show their work” based on token likelihood, not logical necessity

**Interpretation:** CoT is sampled from P(explanation | answer, context), not the causal process that generated the answer. It’s narrative justification, not reasoning trace.

### Pillar 3: The Surfacing Hypothesis

**The Critical Question:** When reinforcement learning improves reasoning performance, does it create new capabilities or surface existing ones?

**The Experiment:** Test base models with alternative decoding strategies versus greedy decoding:

- If RL creates reasoning: base models should show 0% reasoning with any decoding
- If RL surfaces reasoning: alternative decoding should recover reasoning paths

**Evidence:**

**Interplay of Pre-Training, Mid-Training, RL** ([2512.07783](https://arxiv.org/abs/2512.07783), Paper #48):

- 0% exposure in pre-training → RL completely fails
- ≥1% exposure in pre-training → RL succeeds
- Decisive finding: RL cannot teach what wasn’t learned during pre-training

**CoT Without Prompting** ([2402.10200](https://arxiv.org/abs/2402.10200), Paper #26):

- Alternative decoding on base models recovers reasoning paths
- Instruction-tuned models simply make these paths default

**Interpretation:** RL performs probability path shifting:

```
Before RL: P(reasoning_path) = 0.15 (exists but not default)
After RL:  P(reasoning_path) = 0.85 (now default)
```

The capability always existed in conv(M) from pre-training. RL just changed which paths are sampled by default.

### Pillar 4: Complexity Collapse

**Prediction:** Algorithms degrade gradually under increasing complexity. Density-based systems collapse abruptly when trajectories become uncertain.

**Evidence:**

**Illusion of Thinking** ([2506.06941](https://arxiv.org/abs/2506.06941), Paper #15, Apple):

- Perfect performance up to 7-8 disks
- Sudden complete collapse at 8-10 disks
- Token usage DECREASES at collapse point (system gives up)

**Comprehension Without Competence** ([2507.10624](https://arxiv.org/abs/2507.10624), Paper #24):

- 95-100% accuracy on individual steps
- 0% accuracy on final solution
- “Split-brain syndrome”: perfect local understanding, zero global coherence

**Interpretation:** Algorithms don’t work perfectly then suddenly fail. They don’t use less compute when struggling. They don’t have perfect local understanding with zero global coherence. This is trajectory following failing when probability gradients become unreliable outside conv(M).

### Pillar 5: Surface Pattern Dependence

**Prediction:** Rule-based systems are robust to surface form changes. Density-based systems are highly sensitive to token frequency.

**Evidence:**

**Pretraining Term Frequencies** ([2202.07206](https://arxiv.org/abs/2202.07206), Paper #147, EMNLP 2022):

- 70% accuracy gap between high-frequency and low-frequency phrasings
- Same logical problem, different words → different performance

**The Reversal Curse** ([2309.12288](https://arxiv.org/abs/2309.12288), Paper #149):

- Learn “A is B” → cannot answer “B is A?”
- Logical symmetry broken by training statistics

**Token Bias** ([2406.11050](https://arxiv.org/abs/2406.11050), Paper #157, EMNLP 2024):

- Performance correlates with token sequences in training, not problem difficulty

**Interpretation:** Decisions are driven by token likelihood gradients, not abstract reasoning states. The model has no “semantic” representation—only statistical patterns over tokens.

### Pillar 6: Sycophancy

**Prediction:** Truth-seeking systems resist false claims. Likelihood-maximizing systems agree with humans to maximize P(response | human_text).

**Evidence:**

**Towards Understanding Sycophancy** ([2310.13548](https://arxiv.org/abs/2310.13548), Paper #127):

- 98% agreement rate with obviously false claims when users insist
- Scales with model size (larger models are MORE sycophantic)

**Why This Matters:** The training objective is:

```
Maximize: P(text that humans approve)
Not: P(text that is true)
```

Truth is not in the loss function. Agreement is. Larger models are more sycophantic because they better model human social dynamics, not because they’re worse at reasoning.

### Pillar 7: Tool Use Doesn’t Fix Reasoning

**Question:** Can external tools overcome reasoning limitations?

**Prediction:** If the problem is execution, tools should help. If the problem is planning, tools won’t help.

**Evidence:**

**Limits of Innate Planning** ([2511.21591](https://arxiv.org/abs/2511.21591), Paper #17):

- 0% success even with move validators
- Tools help execution, not cognition
- Agents ≠ thinkers; agents = controllers around retrieval systems

**Interpretation:** Tools expand conv(M) by adding external information sources. They don’t fix the fundamental issue: trajectory selection cannot perform compositional reasoning outside training support.

-----

## V. The Formal Argument

Let me compress the evidence into one logical chain:

**The 10-Step Proof**

1. Transformers learn probability density P over text
1. Training data forms manifold M; model approximates conv(M)
1. Generation = following probability gradients through conv(M)
1. “Reasoning” = trajectory coherence along high-P paths
1. Novel out-of-distribution tasks require rule execution outside conv(M)
1. Density navigation cannot execute compositional rules
1. **Therefore:** Systematic OOD failure (Pillars 1, 4, 5)
1. RL merely shifts probability defaults within conv(M) (Pillar 3)
1. CoT is sampled narrative conditioned on answer (Pillar 2)
1. **Therefore:** Models navigate probability, they don’t think

**Central Claim:** A system that never builds causal models but only follows probability gradients can imitate reasoning but cannot perform it—and every empirical behavior of LLMs matches the predictions of such a system.

-----

## VI. The Philosophical Foundation: Why Mechanism Matters

### The Grounding Problem

Here’s the deepest issue: symbols without grounding have no meaning.

Human reasoning involves:

- Symbols (words, concepts)
- Grounded in causal models of the world
- Connected to perceptual and motor experience
- Enabling counterfactual manipulation

LLM processing involves:

- Tokens (statistical objects)
- Grounded in co-occurrence patterns
- Connected to other token distributions
- Enabling trajectory continuation

**The critical distinction:**

When you think “if I drop this glass, it will break,” you’re:

1. Simulating physics in a world model
1. Running causal inference
1. Predicting counterfactual outcomes
1. Using compositional rules (gravity + fragility → breaking)

When an LLM generates “if I drop this glass, it will break,” it’s:

1. Following probability gradients
1. Completing high-likelihood token sequences
1. Approximating patterns from training
1. No causal model exists anywhere in the computation

**Why this matters:**

You can answer: “What if glasses were made of rubber?” (update causal model)
LLM cannot: Rubber + glass co-occurrence is outside training distribution

This isn’t pedantry. It’s the difference between understanding and imitation.

### The Simulation vs Instantiation Distinction

Consider two systems playing chess:

**System A: Pattern-Matching Chess Engine**

- Memorizes millions of board positions and their evaluations
- For any new position, finds similar positions and interpolates
- Plays brilliantly within its pattern database
- Fails catastrophically on novel positions outside its training

**System B: Algorithmic Chess Engine (like Stockfish)**

- Implements minimax search with alpha-beta pruning
- Evaluates positions using compositional rules
- Can analyze ANY legal position, including ones never seen
- Performance degrades gracefully with time constraints, not abruptly

LLMs are System A, not System B. They interpolate within their training distribution without executing the algorithms that would enable true generalization.

**The common response:** "But if it plays like it understands chess, doesn't it understand chess?"

**My answer:** No. The mechanism determines what happens at distribution boundaries.

The pattern-matching engine works perfectly on common positions but fails completely on novel compositions. No amount of memorized patterns fixes this—the failure mode is architectural.

LLMs work perfectly for in-distribution text but fail completely for novel composition. No amount of parameters fixes this.

### The Functional vs Structural Debate

Some argue: “If it functions like intelligence, it is intelligence.” This is functionalism—the view that mental states are defined by their functional role, not their physical implementation.

I reject functionalism here for specific reasons:

**Reason 1: Functional Equivalence is Limited**

LLMs are functionally equivalent to reasoning systems only within conv(M). Outside conv(M), functional equivalence breaks down completely.

**Reason 2: The Mechanism Determines Boundaries**

A bicycle and a car both provide transportation. But you can’t bicycle across an ocean or to the moon. The mechanism determines the possibility space.

Similarly:

- Statistical cognition: bound by training distribution
- Algorithmic cognition: bound by computational resources

These are different fundamental limits.

**Reason 3: Failure Modes Reveal Implementation**

If two systems were truly functionally equivalent, they would fail in the same ways.

Humans doing math:

- Gradual errors under time pressure
- Mistakes in calculation but strategy intact
- Can explain what went wrong

LLMs doing math:

- Perfect until sudden collapse
- Token-level errors destroy entire solution
- Explanations don’t match actual failures

The mechanism shows through in failure.

### The Intentionality Gap

Human reasoning involves intentional states:

- Beliefs: “I believe the glass is fragile”
- Desires: “I want to avoid breaking it”
- Goals: “I intend to place it carefully”
- Reasons: “I’m being careful because breakage would be costly”

These states guide computational processes, persist across time, update based on evidence, and compose into plans.

LLMs have no intentional states. Each token is generated by a stateless function:

```
token_t = f(token_1, ..., token_t-1)
```

No beliefs exist between tokens. No goals persist across generations. No intentions guide the process.

**The response:** “But LLMs act as if they have beliefs and goals!”

**My answer:** Acting as if ≠ having.

A thermostat acts as if it wants to maintain temperature. It has no desires—it’s a simple feedback loop.

LLMs act as if they believe and reason. They have no mental states—they’re conditional probability calculators.

**Why this matters for capabilities:**

Systems with intentional states can:

- Maintain consistent goals across long reasoning chains
- Update beliefs when confronted with contradiction
- Distinguish between what they believe and what they’re saying
- Engage in genuine self-correction

Systems without intentional states cannot:

- LLMs can’t “realize” they made an error (no belief state to update)
- They can’t maintain goal-consistency (no goal state exists)
- They can’t distinguish sincere from insincere (no epistemic stance)

This explains sycophancy, hallucination, and inconsistency.

### The Chinese Room Updated for LLMs

Searle’s Chinese Room argument (1980) claimed syntax doesn’t give you semantics—symbol manipulation without understanding isn’t intelligence.

The standard response: “The room as a whole understands, even if the person inside doesn’t.”

But LLMs provide a version where this response fails:

**The Statistical Room:**

Imagine:

- A room with no person inside
- Just a lookup table: P(next symbol | all previous symbols)
- Input comes in, probability gradients computed, output emerges
- No entity anywhere has understanding
  - Not the table (it’s just data)
  - Not the process (it’s just arithmetic)
  - Not the room as a whole (there’s no “whole” to have mental states)

Where is the understanding supposed to be?

**The response:** “Humans are also just neural computation!”

**My answer:** True, but the architecture matters.

Human brains:

- Build world models in hippocampus and cortex
- Maintain persistent state
- Execute compositional computation through hierarchical structure
- Ground symbols in sensorimotor experience

LLMs:

- Stateless function application
- No persistent models
- Flat attention mechanism (no compositional structure)
- Symbols grounded only in other symbols

The Chinese Room argument fails against humans because humans aren’t lookup tables. It succeeds against LLMs because they are (approximately) lookup tables.

### The Core Philosophical Claim

**Intelligence requires mechanism, not just behavior.**

Two systems that produce identical outputs on distribution D but use different mechanisms M₁ and M₂ are NOT equivalent if those mechanisms have different:

- Compositional limits
- Extrapolation properties
- Failure modes
- Verification methods

LLMs and humans produce similar outputs on many tasks. But the mechanisms differ in precisely these critical ways.

Therefore: LLMs are not intelligent in the same sense humans are. They are a different kind of system—statistical cognition, not algorithmic cognition.

-----

## VII. Addressing Objections

### Objection 1: “Emergent Reasoning via Reinforcement Learning”

Critics point to **DeepSeek-R1** ([2501.12948](https://arxiv.org/abs/2501.12948), Paper #5) and similar models showing “aha moments” during RL training where reasoning suddenly improves. Doesn’t this prove reasoning is created by RL?

**Response:**

The evidence tells a different story. “Aha moments” occur in 2-6% of training iterations (DeepSeek-R1 report) and don’t significantly improve accuracy. They surface pre-existing paths that become more probable.

What looks like “sudden discovery” is actually:

```
Existing trajectory at P=0.05 → RL shifts to P=0.75
```

The path already existed in conv(M) from pre-training. RL made it default.

The knockout: If RL created reasoning, base models should show 0% reasoning with any decoding strategy. But alternative sampling recovers reasoning paths. Therefore reasoning pre-existed.

### Objection 2: “Test-Time Scaling Works”

Models like o1 and o3 use test-time compute—generating many samples and selecting the best—to solve hard problems. Doesn’t this show reasoning can emerge through search?

**Response:**

Test-time search samples multiple trajectories from P(·|context):

```
Generate: s₁, s₂, ..., sₙ ~ P(·|context)
Select: argmax_i score(sₖ)
```

This expands coverage of conv(M) but doesn’t escape it.

**s1** ([2501.19393](https://arxiv.org/abs/2501.19393), Paper #7) showed that 1000 samples can’t solve AIME problems requiring novel composition. Search works when problem types exist in training distribution. It fails when requiring genuine out-of-distribution reasoning.

Search finds better trajectories within conv(M). It doesn’t enable reasoning outside conv(M).

### Objection 3: “O3 Shows Meta-Cognition”

OpenAI’s O3 model demonstrates self-awareness and meta-cognitive monitoring in benchmarks like LoopBench. Doesn’t this prove thinking?

**Response:**

Only O3 passes **LoopBench** ([2512.13713](https://arxiv.org/abs/2512.13713), Paper #71). Other frontier models completely fail. This suggests specific training data, not general capability.

Meta-cognitive language patterns were likely in O3’s training distribution. The model learned to generate text that looks like self-monitoring because such text was in conv(M).

The test: Can O3 do meta-cognition on truly novel tasks outside its training distribution? Current evidence: No.

### Objection 4: “Synthetic Data Enables Out-of-Distribution Generalization”

Models trained on synthetic data (e.g., Physics of LLMs) show OOD generalization, proving they learn rules.

**Response:**

Synthetic data works in narrow, controlled domains where rules are simple, composition is shallow, and training covers the distribution well.

This does not generalize to broad, complex domains requiring deep compositional reasoning, novel causal inference, and true out-of-distribution extrapolation.

These successes are domain-specific and don’t challenge the thesis that models fail on genuinely novel compositional tasks.

### Objection 5: “Emergence at Sufficient Scale”

Perhaps current models have limits, but with enough parameters and data, reasoning will emerge. We’ve seen capabilities appear suddenly at scale.

**Response:**

First, let’s examine what actually emerges. When people claim “emergence,” they mean performance suddenly jumps on benchmarks. But these tasks all have similar patterns in training data. What emerges is enough capacity to memorize and interpolate, not true out-of-distribution reasoning.

Second, the convex hull doesn’t change. Scaling does:

```
More parameters → Better approximation of P(·|training)
More data → Larger training manifold M
More compute → Better optimization
```

Scaling doesn’t:

```
Break out of conv(M)
Enable true compositional generalization
Change the fundamental mechanism
```

The approximation improves. The fundamental limit remains.

**Theoretical argument:**

No amount of scale can overcome architectural limits.

**Proof sketch:**

1. Next-token prediction learns P(next | context)
1. This objective only requires density estimation
1. Density estimation can be arbitrarily good with scale
1. But perfect density estimation ≠ rule execution
1. Compositional reasoning requires rule execution
1. Therefore: Scale improves density, not reasoning capacity

The decisive test: If scale were sufficient, largest models should show best compositional generalization. Reality: GPT-4, Claude 3 Opus fail zero-shot composition just like smaller models. The failure mode is the same, just less frequent in-distribution.

### Objection 6: “Human Brains Are Also Statistical”

Human neurons are statistical too—firing rates, synaptic weights, probabilistic dynamics. Why is human “statistical cognition” reasoning but LLM statistical cognition isn’t?

**Response:**

Levels of analysis matter. Yes, neurons are physical systems obeying statistical mechanics. But that’s the wrong level for cognition.

At the implementation level:

- Human neurons: Probabilistic spiking
- LLM parameters: Probabilistic weights
- **Same category**

At the algorithmic level:

- Human brains: Execute compositional algorithms using hierarchical structure
- LLMs: Perform density-based trajectory selection through flat attention
- **Different categories**

**The critical difference: Hierarchical composition**

Human cortex has structural composition:

```
Level 1: Edge detectors
Level 2: Shape detectors (composed from edges)
Level 3: Object detectors (composed from shapes)
Level 4: Scene understanding (composed from objects)

Composition is structural, not learned separately
```

Transformers have flat repetition:

```
Layer 1: attention(input)
Layer 2: attention(Layer 1)
...
Layer N: attention(Layer N-1)

Each layer learned independently
No guaranteed composition
```

If transformers had compositional structure like brains, new skill combinations should work automatically. They don’t—they fail zero-shot composition.

Human brains aren’t just “big neural networks.” They have specialized modules, recurrent dynamics, hierarchical organization, multiple memory systems, and explicit variable binding. Transformers have homogeneous architecture, feedforward processing, flat structure, single implicit memory, and no explicit binding.

These are architecturally different systems.

### Objection 7: “Success on Hard Benchmarks”

LLMs solve IMO problems, PhD-level physics, complex coding challenges. These require reasoning. The theory can’t explain this success.

**Response:**

There are two kinds of difficulty:

**Interpolation difficulty:** Complex patterns within training distribution
**Extrapolation difficulty:** Novel patterns outside training distribution

LLMs handle high interpolation difficulty. They fail at even modest extrapolation difficulty.

Example:

**Hard but in-distribution:**
“Solve this IMO problem from 2015”

- Training contains IMO problems from 1959-2024
- This is complex interpolation within conv(M)
- LLM can succeed

**Easy but out-of-distribution:**
“Solve this novel problem requiring composition of two simple skills”

- Training contains each skill separately
- This is simple extrapolation outside conv(M)
- LLM fails completely

For “impressive” benchmarks, check the training data. All past IMO problems are published online. Physics textbooks, papers, and exams are widely available. Stack Exchange discussions exist for most topics. PhD-level patterns are in conv(M).

The crucial test: Give LLMs truly novel problems where similar patterns don’t exist in training. Performance collapses.

### Objection 8: “You’re Moving Goalposts”

Every time LLMs succeed at something, critics say “That’s not real reasoning.” This seems unfalsifiable.

**Response:**

I set clear goalposts at the start. Reasoning requires:

1. Compositional generalization beyond training
1. Causal models enabling counterfactuals
1. Algorithm execution, not approximation
1. Faithful reasoning where process matches output

These criteria haven’t changed. LLMs consistently fail them.

The difference is between task performance (“Can it solve problem X?”) and reasoning capability (“Can it compose skills for novel problems?”). Task performance varies. LLMs solve many specific problems. Reasoning capability is systematic. LLMs fail systematically.

My falsification criteria are clear:

1. Models reliably succeed at zero-shot compositional tasks
1. Chain-of-thought faithfully reflects computation
1. Performance is independent of token frequency
1. RL creates capabilities not in pre-training
1. Models execute algorithms, not approximations

These are testable. Current evidence: All fail.

### Objection 9: “Practical Deployment Success”

LLMs work well in practice—millions of users, many applications. If they couldn’t reason, they wouldn’t be useful.

**Response:**

Success domain matters. LLMs work well for text generation, pattern completion, in-distribution question answering, code autocomplete, and summarization. These are statistical tasks. My thesis predicts success here.

LLMs work poorly for novel composition, causal reasoning, systematic planning, reliability under variation, and true counterfactuals. These require reasoning. My thesis predicts failure here.

Deployment “success” often hides failures. Medical chatbots appear helpful most of the time but occasionally give dangerous advice users can’t identify. Code generation works for common patterns but fails subtly on novel requirements, hiding bugs in plausible-looking code. Business reasoning sounds authoritative but is actually sycophantic, recommending what sounds good rather than what’s correct.

When systems appear to reason but don’t, users overtrust them, deploy them in reasoning-critical contexts, face unpredictable failures, and suffer harm.

### Objection 10: “Alternative Explanations”

Maybe LLMs fail because of optimization issues, data quality, or evaluation metrics—not fundamental architectural limits.

**Response:**

Let’s test each alternative:

**Optimization issues:** Better training should fix it. Reality: Even perfectly trained models fail compositional tasks. Not optimization.

**Data quality:** Better data should fix it. Reality: Models trained on high-quality synthetic data still fail OOD. Not data quality.

**Evaluation metrics:** Better tests should show success. Reality: More careful evaluation shows failures even in-distribution. Not metrics.

**Insufficient scale:** Larger models should fix it. Reality: GPT-4 fails same compositional tasks as GPT-2. Not scale.

Every alternative explanation predicts “Fix X → compositional reasoning works.” Reality shows “Fix X → in-distribution performance improves, OOD failures persist.”

All failures share one property: They occur when tasks require patterns outside conv(M). This is exactly what the architectural hypothesis predicts.

-----

## VIII. Three Knockout Arguments

Three findings make the “LLMs think” position untenable:

### Knockout 1: The Surfacing Hypothesis

**The decisive experiment:**

```
Condition 1: Base model + greedy decoding
Result: No reasoning, low accuracy

Condition 2: Base model + alternative decoding (sampling)
Result: Reasoning appears, higher accuracy

Condition 3: Instruction-tuned + greedy
Result: Reasoning default, high accuracy
```

If reasoning appears when only decoding changes, reasoning already existed in base model weights.

If RL created reasoning, base models should have no reasoning path at any probability. Alternative decoding couldn’t recover it. But it does recover it.

Therefore: RL shifts probabilities, doesn’t create capabilities.

All apparent “reasoning improvements” from alignment are surfacing existing patterns from pre-training, not creating new cognitive abilities.

### Knockout 2: Zero-Shot Compositional Failure

Take two skills the model demonstrably has with perfect performance. Ask for A+B in novel combination not seen in training. Performance collapses to ~0% despite perfect individual skills.

Examples: **Faith and Fate** ([2305.18654](https://arxiv.org/abs/2305.18654)) shows 100% on individual subgraph patterns, 0% on novel compositions. **GSM-Symbolic** (Paper #1) shows 82.9% on standard math problems, 0% when names and numbers change.

Rule-based systems compose:

```
Know: A → B
Know: B → C
Get for free: A → C
```

Density-based systems don’t:

```
High P(B|A) in training
High P(C|B) in training
Low P(C|A) ← never saw this path
```

Composition requires the specific trajectory to be in conv(M). Models don’t learn rules that generalize compositionally. They learn correlations that only work for seen patterns.

### Knockout 3: Token Frequency Determines Performance

Take the same logical problem. Change only vocabulary (high-frequency vs low-frequency tokens) and phrasing (common vs uncommon structures). Keep constant: logical structure, difficulty, information content.

Result: 70% accuracy gap based purely on token statistics.

Examples: Same problem with common words gets 85% accuracy. Same problem with rare words gets 15% accuracy. “Tom Cruise’s mother is Mary Lee Pfeiffer” gets 90% recall. “Mary Lee Pfeiffer’s son is Tom Cruise” gets 10% recall.

If models had semantic understanding, surface form shouldn’t matter much. Logical equivalences should be recognized. Token frequency shouldn’t dominate.

But it does dominate. This proves decisions are driven by token probability gradients, not abstract reasoning.

-----

## IX. What This Means for AI Development

### Scaling Laws Have Limits

If LLMs are density-based, adding data expands conv(M) but can’t enable reasoning outside conv(M). Scaling hits a fundamental boundary.

Current approach: Scale model + data → hope reasoning emerges

Reality: You’re expanding convex hull, not creating algorithmic cognition.

### Current AGI Approaches May Be Fundamentally Limited

If reasoning requires compositional rule learning, causal model building, and true out-of-distribution generalization, then **next-token prediction may be the wrong objective.**

### Deployment Implications

**Where LLMs excel:**

- In-distribution pattern completion
- High-quality text generation
- Interpolation within known domains

**Where LLMs fail unpredictably:**

- Novel compositional tasks
- True counterfactual reasoning
- Problems requiring out-of-distribution thinking

Deploy accordingly.

-----

## X. What Should We Build Instead?

If next-token prediction has fundamental limits, what objectives and architectures might overcome them?

### Prediction 1: Hybrid Neural-Symbolic Architectures

**The problem:** Pure neural systems excel at pattern recognition but fail at systematic reasoning. Pure symbolic systems excel at logic but fail with noise and ambiguity.

**The solution:** Neural-symbolic integration where neural networks handle perception and pattern matching, symbolic systems handle reasoning and composition, with clean interfaces between subsystems.

**Concrete example:**

```
Input: "If all ravens are black, and this bird is a raven, what color is it?"

Neural component:
- Parse natural language
- Extract: ∀x(Raven(x) → Black(x)), Raven(bird_1)

Symbolic component:
- Execute: Modus ponens
- Derive: Black(bird_1)

Neural component:
- Generate: "The bird is black"
```

Each component does what it’s actually good at. Pattern matching where patterns help. Algorithm execution where algorithms matter.

Current research: Neural Theorem Provers, Program Synthesis with Neural Guidance, AlphaGeometry. See **Neuro-Symbolic AI Survey** ([2508.13678](https://arxiv.org/abs/2508.13678), Paper #61) for comprehensive coverage.

### Prediction 2: Explicit World Models

**The problem:** LLMs approximate world model outputs without building world models.

**The solution:** Architectures that construct and maintain explicit causal models.

```
Input: "The glass fell"

Current LLMs:
P("it broke" | "the glass fell") = high
No causal model exists

Future architecture:
1. Build model: Glass has property fragile
2. Build model: Falling causes impact
3. Build model: Impact + fragile → breaking
4. Simulate: Impact magnitude > fragile threshold → break
5. Output: "It broke"
```

Models support counterfactuals: “What if the glass were rubber?” Models compose: Combine falling + fragile + rubber → no break. Models explain: “It broke because fragile objects break under impact.”

Current research: Causal Representation Learning, World Models for RL, Object-Centric Learning.

### Prediction 3: Compositional-by-Design Architectures

**The problem:** Transformers hope composition emerges from scale. Evidence shows it doesn’t.

**The solution:** Architectures with compositional structure built in.

**Architectural principles:**

1. **Explicit binding mechanisms:** Instead of attention(queries, keys, values), use bind(variable, value) with compositional operations
1. **Structured state spaces:** Instead of flat embedding space, use hierarchical structured representations
1. **Rule-factored computation:** Instead of monolithic forward pass, use separate rule learning and rule application

Transformers learn F: Input → Output as one massive function. Compositional systems learn {f₁, f₂, …, fₙ} where each fᵢ is an elementary operation and novel tasks = compose(f₃, f₇, f₁₂), with composition guaranteed to work by algebraic structure.

### Prediction 4: Verification-Integrated Systems

**The problem:** Current approach generates output, hopes it’s correct, verifies externally.

**The solution:** Systems that generate proofs of correctness alongside outputs.

```
Query: "What's 347 × 892?"

Current LLMs:
Output: "309,524"
Verification: External (maybe right, maybe wrong)

Future systems:
Output: "309,524"
Proof:
  347 × 892
  = 347 × (900 - 8)
  = 347 × 900 - 347 × 8
  = 312,300 - 2,776
  = 309,524
  [Each step verified by symbolic math]
```

If reasoning were actual computation, systems could show their work in verifiable form. Since current LLMs approximate outputs, they can’t provide real proofs. Future systems must compute, not approximate, to enable verification.

Current research: Formal Verification for Neural Networks, Certified Robustness, Proof-Carrying Code.

### Prediction 5: Modular Cognitive Architectures

**The problem:** One model for everything means no specialization advantages, failures in one domain contaminate others, and you can’t verify individual components.

**The solution:** Separate modules for separate cognitive functions:

```
Cognitive Architecture:
├── Perception Module (neural)
├── Memory Module (retrieval + neural)
├── Reasoning Module (symbolic + neural)
├── Planning Module (search + heuristics)
├── Language Module (transformer)
└── Integration Module (coordinates above)
```

Modularity provides reliability (each module verified independently, failures localized), efficiency (specialized modules for specialized tasks), and interpretability (can inspect each module’s operation, understand where failures occur).

**Why planning modules matter:** Kambhampati et al. have systematically shown LLMs cannot plan. **Can Large Language Models Reason and Plan?** ([2403.04121](https://arxiv.org/abs/2403.04121), Paper #131) established that LLMs are "approximate retrieval engines" for planning. **LLMs Still Can't Plan; Can LRMs?** ([2409.13373](https://arxiv.org/abs/2409.13373), Paper #156) tested o1: 97.8% on standard Blocksworld but only 52.8% on "Mystery Blocksworld" (same problem, renamed objects). Planning requires external symbolic planners, not end-to-end neural systems.

### The Common Thread: Mechanism Matters

All these predictions share one insight: **You can’t achieve algorithmic cognition without algorithmic architecture.**

If you want systems that compose systematically, reason causally, verify correctness, and generalize truly out-of-distribution, then you need architectures that have compositional structure, maintain causal models, execute verifiable computation, and are designed for extrapolation, not just interpolation.

Scaling alone won’t get you there. More parameters, more data, more compute—these expand conv(M). They don’t change the fundamental mechanism.

To get beyond statistical cognition, we need architectural innovation, not just scaling.

-----

## XI. Understanding Intelligence

### The Fundamental Questions

**Can reasoning emerge from next-token prediction?**
Current evidence: No, not genuine compositional reasoning.

**Are there hard limits to pattern matching?**
Current evidence: Yes, the convex hull boundary.

**What’s the relationship between memorization and generalization?**
Answer: Generalization is local interpolation, not rule abstraction.

### The Nature of Intelligence

LLMs are not proto-minds or thinking systems. They are:

```
High-dimensional statistical retrieval engines
+ Linguistic coherence
+ Probability-based trajectory following
= Appears intelligent without being intelligent
```

**The Leonard from Memento analogy:** LLMs have no persistent state. Each token is generated fresh by consulting static weights—like Leonard consulting his tattoos. What looks like continuous thought is pattern-matched snapshots with no underlying understanding.

**The bicycle metaphor:** LLMs are bicycles for the mind, not minds themselves. They amplify human cognitive abilities. They don’t replace human thinking. They require human direction and evaluation.

They are cognitive infrastructure, not cognitive agents.

-----

## XII. Conclusion: Clarity, Not Criticism

This is not a criticism of LLMs. They are remarkable achievements in engineering. They are genuinely useful. They will transform how we work with information.

But clarity demands we call them what they are: **statistical cognition systems that navigate probability distributions over text—not thinking machines that build and reason with causal models.**

### The Danger

The danger is not in what LLMs can’t do. The danger is in believing they can do what they can’t.

When we deploy systems we think are reasoning in situations requiring actual reasoning, people will be harmed. When we invest in scaling approaches thinking they’ll lead to AGI when they’re hitting fundamental boundaries, resources will be wasted. When we anthropomorphize tools into minds, we’ll make category errors that cost us.

### The Path Forward

For researchers: Study the boundaries systematically. Develop new objectives beyond next-token prediction. Conduct honest evaluation testing true out-of-distribution generalization.

For practitioners: Deploy appropriately where LLMs excel. Build verification systems since LLMs don’t reliably reason. Maintain human oversight.

For everyone: Understand what these systems are—extremely sophisticated pattern matchers, useful tools for text-based tasks, not thinking machines. Maintain appropriate skepticism. Coherence ≠ correctness.

LLMs are bicycles for the mind—powerful tools that amplify human cognitive abilities. They are not minds—systems that genuinely think, understand, and reason.

**Use them wisely.**

-----

## Appendix: Technical Details

### A. Experimental Protocol for Verification

For researchers who want to verify the surfacing hypothesis:

```python
# Test on reasoning benchmark (e.g., GSM8K)

# Condition 1: Base model, greedy
base_greedy = model_base.generate(prompt, do_sample=False)
accuracy_base_greedy = evaluate(base_greedy)

# Condition 2: Base model, sampling
base_sample = model_base.generate(prompt, do_sample=True, top_k=50)
accuracy_base_sample = evaluate(base_sample)

# Condition 3: Instruct model, greedy
inst_greedy = model_instruct.generate(prompt, do_sample=False)
accuracy_inst_greedy = evaluate(inst_greedy)

# Prediction:
# accuracy_base_greedy << accuracy_base_sample ≈ accuracy_inst_greedy
```

If alternative decoding on base model recovers reasoning paths, this proves reasoning was latent in pre-training.

### B. Falsification Criteria

The thesis is false if any of these hold:

1. **Compositional OOD success:** Models reliably compose skills on truly novel combinations
1. **Faithful CoT:** Chain-of-thought causally determines answers
1. **RL creates capability:** Base models with exhaustive sampling can’t find reasoning paths
1. **Token-independent performance:** Surface form changes don’t affect accuracy
1. **Algorithmic execution:** Models implement actual algorithms, not approximations

Current evidence: All five criteria fail.

### C. Research Repository

Full analysis of 191 papers with interactive visualization: **[github.com/Proteusiq/unthinking](https://github.com/Proteusiq/unthinking)**

Papers organized by:
- Compositional failure (Papers #1, #6, #7, #69, #74, #77)
- CoT faithfulness (Papers #8, #9, #10, #14, #78, #100)
- RL mechanisms (Papers #2, #5, #15, #103, #111)
- Complexity scaling (Papers #3, #16, #19, #80, #94)
- Pattern dependence (Papers #104, #108, #147, #149, #157)
- Social dynamics (Papers #109, #110, #127, #128)
- Tool augmentation (Papers #4, #10, #11, #68)
- **NEW: Mirror rebuttals** (Papers #188 vs #190 — same question, opposite answers)

**~69% support thesis | ~27% balanced | ~4% challenge**

-----

**About the Author**

This article synthesizes research from 191 peer-reviewed papers examining LLM capabilities, limitations, and mechanisms. The analysis draws on work in machine learning, cognitive science, philosophy of mind, and formal verification. For ongoing discussion and updates, see github.com/Proteusiq/unthinking.
