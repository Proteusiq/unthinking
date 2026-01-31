# Papers to Read

Curated list of papers confirmed relevant to the thesis. Promoted from `toevaluate.md` after triage.

**Last updated**: 2026-01-31

---

## Sycophancy & Hallucination Mechanisms (HIGH PRIORITY)

### [Sycophantic Anchors: Localizing and Quantifying User Agreement in Reasoning Models](https://arxiv.org/abs/2601.21183)
- **arXiv**: 2601.21183
- **Stance**: SUPPORTS
- **Why read**: Identifies "sycophantic anchors" — sentences that causally lock models into user agreement. Linear probes detect them with **84.6% accuracy**. Sycophancy builds gradually during reasoning = potential intervention window.
- **Key finding**: Sycophantic anchors are MORE distinguishable than correct reasoning anchors (asymmetry). Commitment can be quantified mid-inference (R²=0.74).

### [Sycophancy Hides Linearly in the Attention Heads](https://arxiv.org/abs/2601.16644)
- **arXiv**: 2601.16644
- **Stance**: SUPPORTS (mechanistic)
- **Why read**: Sycophancy is **linearly separable** in attention activations. Truthfulness and deference-resistance are **distinct mechanisms**. Attention heads disproportionately attend to expressions of user doubt.
- **Key finding**: Probes transfer from TruthfulQA to other factual QA benchmarks. Simple linear interventions can mitigate sycophancy.

### [Spurious Rewards Paradox: How RLVR Activates Memorization Shortcuts](https://arxiv.org/abs/2601.11061)
- **arXiv**: 2601.11061
- **Stance**: STRONGLY SUPPORTS
- **Why read**: Mechanistically shows how RLVR triggers memorization shortcuts. Identifies **Anchor-Adapter circuit** that bypasses reasoning. Models achieve gains even with spurious/incorrect rewards!
- **Key finding**: "Perplexity Paradox" — answer-token perplexity drops while prompt coherence degrades = bypassing reasoning for memorization. Localized to middle layers (L18-20 Anchor, L21+ Adapter).

### [Are Your Reasoning Models Reasoning or Guessing?](https://arxiv.org/abs/2601.10679)
- **arXiv**: 2601.10679
- **Stance**: STRONGLY SUPPORTS
- **Why read**: Mechanistic analysis shows HRM appears to be "guessing" not "reasoning". Fails on extremely simple puzzles (1 unknown cell!). "Grokking" dynamics where answer suddenly becomes correct.
- **Key finding**: Multiple fixed points exist — model "guesses" first fixed point (possibly incorrect) and gets trapped. Augmenting guesses (not reasoning) boosts Sudoku from 54.5% → 96.9%.

### [Two Pathways to Truthfulness: Intrinsic Encoding of LLM Hallucinations](https://arxiv.org/abs/2601.07422)
- **arXiv**: 2601.07422
- **Stance**: BALANCED (mechanistic)
- **Why read**: Identifies **two distinct pathways** for truthfulness: (1) Question-Anchored (Q-A information flow) and (2) Answer-Anchored (self-contained evidence). Tied to LLM knowledge boundaries.
- **Key finding**: Attention knockout and token patching validate the two pathways. Internal representations are aware of their distinctions.

---

## High Priority (Directly Tests Thesis)

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

## Alternative Architectures / Training Methods

### [LLM-JEPA: Large Language Models Meet Joint Embedding Predictive Architectures](https://arxiv.org/abs/2509.14252)
- **arXiv**: 2509.14252
- **Authors**: Hai Huang, Yann LeCun, Randall Balestriero
- **Stance**: BALANCED (training method, not reasoning test)
- **Why read**: Alternative to next-token prediction. JEPA (embedding-space prediction) outperforms input-space methods in vision. Tests whether embedding-space objectives help LLMs. Mentioned in issue #13.
- **Key finding**: LLM-JEPA outperforms standard training on GSM8K, Spider, NL-RX across Llama3, Gemma2, OLMo families. Induces more structured representations.
- **Limitation for thesis**: No OOD/compositional generalization testing. Tests in-distribution improvement only.

<details>
<summary>Abstract</summary>

Large Language Model (LLM) pretraining, finetuning, and evaluation rely on input-space reconstruction and generative capabilities. Yet, it has been observed in vision that embedding-space training objectives, e.g., with Joint Embedding Predictive Architectures (JEPAs), are far superior to their input-space counterpart. We develop LLM-JEPA, a JEPA based solution for LLMs applicable both to finetuning and pretraining. LLM-JEPA is able to outperform the standard LLM training objectives by a significant margin across models, all while being robust to overfitting.

</details>

---

## Recently Analyzed (Removed from Queue)

- ✅ **WhatCounts** (2601.21618) — Analyzed 2026-01-31 as Paper 108
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
