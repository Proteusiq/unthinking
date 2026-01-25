# Papers to Read

Curated list of papers highly relevant to the thesis. Auto-discovered papers are filtered for direct relevance.

**Last updated**: 2026-01-25

---

## High Priority (Directly Tests Thesis)

### [Gaming the Judge: Unfaithful Chain-of-Thought Can Undermine Agent Evaluation](https://arxiv.org/abs/2601.14691)
- **arXiv**: 2601.14691
- **Stance**: SUPPORTS
- **Why read**: Directly tests CoT faithfulness - shows LLM judges can be fooled by unfaithful reasoning traces
- **Key finding**: CoT doesn't faithfully reflect internal reasoning or environment state

<details>
<summary>Abstract</summary>

We study the effect of Chain-of-Thought on the reliability of agent evaluation. We find that LLM judges can be fooled by unfaithful reasoning traces that don't accurately represent the agent's internal state or interaction with the environment. This has implications for agent evaluation pipelines that rely on CoT.

</details>

### [Beyond Memorization: Testing LLM Reasoning on Unseen Theory of Computation Tasks](https://arxiv.org/abs/2601.13392)
- **arXiv**: 2601.13392
- **Stance**: SUPPORTS
- **Why read**: Tests pattern matching vs genuine reasoning on DFA construction
- **Key finding**: Benchmark distinguishes memorization from symbolic reasoning

<details>
<summary>Abstract</summary>

We propose a benchmark based on Theory of Computation tasks to distinguish memorization from genuine symbolic reasoning in LLMs. Our benchmark tests DFA construction and related tasks that require systematic rule application rather than pattern matching.

</details>

### [Outcome-Based RL Provably Leads Transformers to Reason, but Only With the Right Data](https://arxiv.org/abs/2601.15158)
- **arXiv**: 2601.15158
- **Stance**: CHALLENGES (but limited)
- **Why read**: Analyzes how RL enables CoT emergence - relevant to "surfacing" hypothesis
- **Key finding**: Sparse rewards can drive gradient descent to discover reasoning

<details>
<summary>Abstract</summary>

We analyze theoretically how outcome-based reinforcement learning can lead transformers to discover chain-of-thought reasoning. We show that sparse rewards can drive gradient descent to find reasoning patterns, but only when the training data has the right structure.

</details>

### [Say Anything but This: When Tokenizer Betrays Reasoning in LLMs](https://arxiv.org/abs/2601.14658)
- **arXiv**: 2601.14658
- **Stance**: SUPPORTS
- **Why read**: Shows reasoning fails due to tokenization - surface-level fragility
- **Key finding**: Non-unique encodings create unmeasured reasoning fragility

<details>
<summary>Abstract</summary>

We demonstrate that tokenization choices can undermine LLM reasoning in ways that are not captured by standard benchmarks. Non-unique encodings of the same input create unmeasured fragility in reasoning performance.

</details>

### [The Flexibility Trap: Why Arbitrary Order Limits Reasoning Potential in Diffusion Language Models](https://arxiv.org/abs/2601.15165)
- **arXiv**: 2601.15165
- **Stance**: BALANCED
- **Why read**: Tests whether flexible generation order improves reasoning
- **Key finding**: Flexibility doesn't unlock superior reasoning potential

<details>
<summary>Abstract</summary>

We investigate whether diffusion language models, which can generate tokens in arbitrary order, have superior reasoning potential compared to autoregressive models. We find that this flexibility does not unlock improved reasoning capabilities.

</details>

---

## Medium Priority (Relevant Evidence)

### [A Comprehensive Evaluation of LLM Reasoning: From Single-Model to Multi-Agent Paradigms](https://arxiv.org/abs/2601.13243)
- **arXiv**: 2601.13243
- **Stance**: BALANCED
- **Why read**: Unified evaluation of reasoning paradigms including CoT and multi-agent

<details>
<summary>Abstract</summary>

We present a comprehensive evaluation framework for LLM reasoning capabilities, spanning single-model approaches like chain-of-thought to multi-agent systems. Our evaluation covers multiple reasoning domains and paradigms.

</details>

### [InT: Self-Proposed Interventions Enable Credit Assignment in LLM Reasoning](https://arxiv.org/abs/2601.14209)
- **arXiv**: 2601.14209
- **Stance**: SUPPORTS
- **Why read**: Shows standard RL can't distinguish correct vs incorrect intermediate steps

<details>
<summary>Abstract</summary>

We show that standard reinforcement learning approaches cannot reliably distinguish between correct and incorrect intermediate reasoning steps. We propose interventions that enable proper credit assignment in LLM reasoning.

</details>

### [Failure Modes in Multi-Hop QA: The Weakest Link Law and the Recognition Bottleneck](https://arxiv.org/abs/2601.12499)
- **arXiv**: 2601.12499
- **Stance**: SUPPORTS
- **Why read**: Identifies recognition vs synthesis failure in multi-hop reasoning

<details>
<summary>Abstract</summary>

We identify two key failure modes in multi-hop question answering: the weakest link law (where performance is bounded by the weakest reasoning step) and the recognition bottleneck (where retrieval failures cascade into reasoning failures).

</details>

### [Tracking the Limits of Knowledge Propagation: How LLMs Fail at Multi-Step Reasoning with Conflicting Knowledge](https://arxiv.org/abs/2601.15495)
- **arXiv**: 2601.15495
- **Stance**: SUPPORTS
- **Why read**: Tests knowledge propagation failures in multi-step reasoning

<details>
<summary>Abstract</summary>

We investigate how LLMs fail to properly propagate knowledge through multi-step reasoning chains, especially when different pieces of knowledge conflict. We track where and how these propagation failures occur.

</details>

### [Confidence over Time: Confidence Calibration with Temporal Logic for Large Language Model Reasoning](https://arxiv.org/abs/2601.13387)
- **arXiv**: 2601.13387
- **Stance**: SUPPORTS
- **Why read**: Shows confidence estimation ignores how reasoning evolves

<details>
<summary>Abstract</summary>

We show that standard confidence estimation methods fail to account for how reasoning evolves over multiple steps. We propose a temporal logic framework for better calibrated confidence in LLM reasoning.

</details>

---

## Low Priority (Tangentially Related)

### [Agentic Reasoning for Large Language Models](https://arxiv.org/abs/2601.12538)
- **arXiv**: 2601.12538
- **Why read**: Survey on agentic reasoning paradigm

<details>
<summary>Abstract</summary>

Survey paper covering the agentic reasoning paradigm for large language models, including tool use, planning, and multi-agent collaboration.

</details>

### [Graph Reasoning Paradigm](https://arxiv.org/abs/2601.12995)
- **arXiv**: 2601.12995
- **Why read**: Structured reasoning with topology-aware RL

<details>
<summary>Abstract</summary>

We propose a graph-based reasoning paradigm that uses topology-aware reinforcement learning to improve structured reasoning in LLMs.

</details>

---

## Skipped (Not Relevant)

The following paper types are filtered out:
- RAG/retrieval papers (MiRAGE, Chunking papers)
- Domain-specific applications (medical, legal, finance, traffic)
- Image/audio/video generation
- Efficiency/quantization papers
- Tool-specific papers (code, decompilation)
- Survey/taxonomy papers without new findings
