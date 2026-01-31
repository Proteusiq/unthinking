# Papers to Read

Curated list of papers confirmed relevant to the thesis. Promoted from `toevaluate.md` after triage.

**Last updated**: 2026-01-31

---

## High Priority (Directly Tests Thesis)

### [Semantic Content Determines Algorithmic Performance (WhatCounts)](https://arxiv.org/abs/2601.21618)
- **arXiv**: 2601.21618
- **Stance**: SUPPORTS
- **Why read**: **VERY STRONG EVIDENCE** — Counting accuracy varies by 40%+ depending on WHAT is being counted (cities vs chemicals, names vs symbols). "LLMs do not implement algorithms; they approximate them, and the approximation is argument-dependent."
- **Key finding**: Atomic counting task with no reasoning steps shows semantic content determines performance. Any LLM function may carry hidden dependencies on the meaning of its inputs.

<details>
<summary>Abstract</summary>

Counting should not depend on what is being counted; more generally, any algorithm's behavior should be invariant to the semantic content of its arguments. We introduce WhatCounts to test this property in isolation. Unlike prior work that conflates semantic sensitivity with reasoning complexity or prompt variation, WhatCounts is atomic: count items in an unambiguous, delimited list with no duplicates, distractors, or reasoning steps for different semantic types. Frontier LLMs show over 40% accuracy variation depending solely on what is being counted - cities versus chemicals, names versus symbols. Controlled ablations rule out confounds. The gap is semantic, and it shifts unpredictably with small amounts of unrelated fine-tuning. LLMs do not implement algorithms; they approximate them, and the approximation is argument-dependent. As we show with an agentic example, this has implications beyond counting: any LLM function may carry hidden dependencies on the meaning of its inputs.

</details>

### [Scaling Reasoning Hop Exposes Weaknesses: Demystifying and Improving Hop Generalization](https://arxiv.org/abs/2601.21214)
- **arXiv**: 2601.21214
- **Stance**: SUPPORTS
- **Why read**: Finds "erroneous processing heads" (ep heads) that suppress correct reasoning trajectories. Removing individual ep heads during inference can restore correct predictions. Mechanistic evidence for reasoning failures.
- **Key finding**: Errors concentrate at specific token positions; certain attention heads tip the balance by amplifying incorrect trajectories while suppressing correct ones.

<details>
<summary>Abstract</summary>

Chain-of-thought (CoT) reasoning has become the standard paradigm for enabling Large Language Models (LLMs) to solve complex problems. However, recent studies reveal a sharp performance drop in reasoning hop generalization scenarios, where the required number of reasoning steps exceeds training distributions while the underlying algorithm remains unchanged. We find that errors concentrate at token positions of a few critical error types, rather than being uniformly distributed. Closer inspection reveals that these token-level erroneous predictions stem from internal competition mechanisms: certain attention heads, termed erroneous processing heads (ep heads), tip the balance by amplifying incorrect reasoning trajectories while suppressing correct ones. Notably, removing individual ep heads during inference can often restore the correct predictions.

</details>

### [Thinking Out of Order: When Output Order Stops Reflecting Reasoning Order](https://arxiv.org/abs/2601.22035)
- **arXiv**: 2601.22035
- **Stance**: SUPPORTS
- **Why read**: AR models suffer **67% relative accuracy drop** when required to produce answers before explanations. MDLMs remain stable (≤14% drop). Relates to our Paper 99 (Flexibility Trap).
- **Key finding**: AR models must commit to answers before generating reasoning when output structure conflicts with reasoning order.

<details>
<summary>Abstract</summary>

Autoregressive (AR) language models enforce a fixed left-to-right generation order, creating a fundamental limitation when the required output structure conflicts with natural reasoning. When prompts request answers before reasoning, AR models exhibit large accuracy gaps compared to standard chain-of-thought ordering (up to 67% relative drop), while MDLMs remain stable (≤14% relative drop), a property we term "order robustness".

</details>

### [Code over Words: Overcoming Semantic Inertia via Code-Grounded Reasoning](https://arxiv.org/abs/2601.18352)
- **arXiv**: 2601.18352
- **Stance**: SUPPORTS
- **Why read**: **INVERSE SCALING** — larger models perform WORSE when reasoning requires suppressing pre-trained priors (e.g., "Lava is Dangerous" contradicted by in-context rules). Directly supports pattern matching thesis.
- **Key finding**: Larger models exhibit inverse scaling when natural language reasoning requires suppressing pre-trained associations.

<details>
<summary>Abstract</summary>

LLMs struggle with Semantic Inertia: the inability to inhibit pre-trained priors when dynamic, in-context rules contradict them. We probe this phenomenon using Baba Is You, where physical laws are mutable text rules. We quantatively observe that larger models can exhibit inverse scaling: they perform worse than smaller models when natural language reasoning requires suppressing pre-trained associations.

</details>

---

## Medium Priority (Strong Mechanistic Evidence)

### [Chain Of Thought Compression: A Theoretical Analysis](https://arxiv.org/abs/2601.21576)
- **arXiv**: 2601.21576
- **Stance**: SUPPORTS
- **Why read**: **First theoretical analysis** of CoT compression. Proves learning signal for high-order logical dependencies **exponentially decays** — skipping intermediate steps inevitably leads to high-order interaction barriers.
- **Key finding**: Order-r Interaction proves signal decay is fundamental, not fixable by better training.

<details>
<summary>Abstract</summary>

Chain-of-Thought (CoT) has unlocked advanced reasoning abilities of LLMs with intermediate steps, yet incurs prohibitive computational costs. Recent studies show that compressing reasoning steps into latent states offers a token-efficient alternative. However, the mechanism behind CoT compression remains unclear. We prove that the learning signal for high-order logical dependencies exponentially decays to solve irreducible problems, where skipping intermediate steps inevitably leads to high-order interaction barriers.

</details>

### [From Chains to DAGs: Probing the Graph Structure of Reasoning in LLMs](https://arxiv.org/abs/2601.17593)
- **arXiv**: 2601.17593
- **Stance**: BALANCED
- **Why read**: Probes whether LLM hidden states encode DAG-structured reasoning in linearly accessible form. Tests if reasoning is genuinely compositional or just sequential.
- **Key finding**: Reasoning DAG geometry is meaningfully encoded in intermediate layers, with recoverability varying by node depth and model scale.

<details>
<summary>Abstract</summary>

We introduce Reasoning DAG Probing, a framework that directly asks whether LLM hidden states encode the geometry of a reasoning DAG in a linearly accessible form. We train lightweight probes to predict node depth and pairwise node distance from hidden states. Our results provide evidence that reasoning DAG geometry is meaningfully encoded in intermediate layers, with recoverability varying systematically by node depth and model scale.

</details>

### [HalluGuard: Demystifying Data-Driven and Reasoning-Driven Hallucinations](https://arxiv.org/abs/2601.18753)
- **arXiv**: 2601.18753
- **Stance**: SUPPORTS
- **Why read**: Decomposes hallucination risk into **data-driven** (training mismatch) and **reasoning-driven** (inference instability) components. Principled foundation for understanding reasoning failures.
- **Key finding**: Unified theoretical framework linking hallucinations to training-time and inference-time factors.

<details>
<summary>Abstract</summary>

We introduce the Hallucination Risk Bound, a unified theoretical framework that formally decomposes hallucination risk into data-driven and reasoning-driven components, linked respectively to training-time mismatches and inference-time instabilities. This provides a principled foundation for analyzing how hallucinations emerge and evolve.

</details>

### [Oops, Wait: Token-Level Signals as a Lens into LLM Reasoning](https://arxiv.org/abs/2601.17421)
- **arXiv**: 2601.17421
- **Stance**: BALANCED
- **Why read**: Specific tokens like "wait" strongly correlate with reasoning correctness. Models fine-tuned on small datasets acquire reasoning signals but **exploit them only partially**.
- **Key finding**: Training strategies affect token-level reasoning signals; models have latent capability they don't fully use.

<details>
<summary>Abstract</summary>

The emergence of discourse-like tokens such as "wait" and "therefore" in LLMs has offered a unique window into their reasoning processes. We find that specific tokens strongly correlate with reasoning correctness, varying with training strategies while remaining stable across model scales. A closer look at the "wait" token demonstrates that models fine-tuned on small-scale datasets acquire reasoning ability through such signals but exploit them only partially.

</details>

### [Teaching Models to Teach Themselves: Reasoning at the Edge of Learnability (SOAR)](https://arxiv.org/abs/2601.18778)
- **arXiv**: 2601.18778
- **Stance**: BALANCED
- **Why read**: Tests if models can generate curricula for problems they **cannot solve**. Key finding: ability to generate useful stepping stones does NOT require ability to solve the hard problems.
- **Key finding**: Structural quality and well-posedness matter more than solution correctness for curriculum generation.

<details>
<summary>Abstract</summary>

Can a model learn to escape its own learning plateau? We investigate: Can a pretrained LLM leverage latent knowledge to generate an automated curriculum for problems it cannot solve? We design SOAR: A self-improvement framework. Our results suggest that the ability to generate useful stepping stones does not require the preexisting ability to actually solve the hard problems, paving a principled path to escape reasoning plateaus without additional curated data.

</details>

---

## Recently Analyzed (Removed from Queue)

- ✅ **Strong Reasoning Isn't Enough** (2601.19773) — Analyzed 2026-01-31 as Paper 107
- ✅ **Reasoning-Critical Neurons (AdaRAS)** (2601.19847) — Analyzed 2026-01-29 as Paper 106
- ✅ **Flexibility Trap** (2601.15165) — Analyzed 2026-01-29
- ✅ **Tokenizer Betrays Reasoning** (2601.14658) — Analyzed 2026-01-29
- ✅ **Outcome-Based RL** (2601.15158) — Analyzed 2026-01-29
- ✅ **Gaming the Judge** (2601.14691) — Analyzed 2026-01-29
- ✅ **Beyond Memorization** (2601.13392) — Analyzed 2026-01-29

---

## Skipped (Not Relevant)

The following paper types are filtered out:
- RAG/retrieval papers (unless testing reasoning directly)
- Domain-specific applications (medical, legal, finance, traffic, chemistry)
- Image/audio/video generation and understanding
- Efficiency/quantization papers without reasoning analysis
- Tool-specific papers (code, SQL, visualization)
- Safety/alignment papers not about reasoning
- Survey/taxonomy papers without new findings on reasoning
- Training methods without reasoning insights
