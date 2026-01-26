# Papers to Read

Curated list of papers highly relevant to the thesis. Auto-discovered papers are filtered for direct relevance.

**Last updated**: 2026-01-26

---

## New Papers (2026-01-26)

### [Trapped in the past? Disentangling fluid and crystallized intelligence of large language models using chess](https://arxiv.org/abs/2601.16823v1)
- **arXiv**: 2601.16823v1
- **Published**: 2026-01-23
- **Stance**: CHALLENGES
- **Priority**: 9/10
- **Why read**: This paper investigates the limits of LLM reasoning, especially in out-of-distribution tasks, supporting the view that current models rely heavily on memorization rather than genuine reasoning.

<details>
<summary>Abstract</summary>

Large Language Models (LLMs) exhibit remarkable capabilities, yet it remains unclear to what extent these reflect sophisticated recall (crystallized intelligence) or reasoning ability (fluid intelligence). We introduce chess as a controlled testbed for disentangling these faculties. Leveraging the game's structure and scalable engine evaluations, we construct a taxonomy of positions varying in training corpus proximity--ranging from common states solvable by memorization to novel ones requiring first-principles reasoning. We systematically evaluate multiple GPT generations under varying reasoning intensities. Our analysis reveals a clear gradient: performance consistently degrades as fluid intelligence demands increase. Notably, in out-of-distribution tasks, performance collapses to random levels. While newer models improve, progress slows significantly for tasks outside the training distribution. Furthermore, while reasoning-augmented inference improves performance, its marginal benefit per token decreases with distributional proximity. These results suggest current architectures remain limited in systematic generalization, highlighting the need for mechanisms beyond scale to achieve robust fluid intelligence.

</details>

### [Reasoning Promotes Robustness in Theory of Mind Tasks](https://arxiv.org/abs/2601.16853v1)
- **arXiv**: 2601.16853v1
- **Published**: 2026-01-23
- **Stance**: CHALLENGES
- **Priority**: 8/10
- **Why read**: This paper investigates whether improvements in LLM reasoning are due to genuine reasoning capabilities or robustness, directly addressing the thesis about the nature of LLM reasoning.

<details>
<summary>Abstract</summary>

Large language models (LLMs) have recently shown strong performance on Theory of Mind (ToM) tests, prompting debate about the nature and true performance of the underlying capabilities. At the same time, reasoning-oriented LLMs trained via reinforcement learning with verifiable rewards (RLVR) have achieved notable improvements across a range of benchmarks. This paper examines the behavior of such reasoning models in ToM tasks, using novel adaptations of machine psychological experiments and results from established benchmarks. We observe that reasoning models consistently exhibit increased robustness to prompt variations and task perturbations. Our analysis indicates that the observed gains are more plausibly attributed to increased robustness in finding the correct solution, rather than to fundamentally new forms of ToM reasoning. We discuss the implications of this interpretation for evaluating social-cognitive behavior in LLMs.

</details>

### [AgentDrive: An Open Benchmark Dataset for Agentic AI Reasoning with LLM-Generated Scenarios in Autonomous Systems](https://arxiv.org/abs/2601.16964v1)
- **arXiv**: 2601.16964v1
- **Published**: 2026-01-23
- **Stance**: CHALLENGES
- **Priority**: 8/10
- **Why read**: This paper evaluates LLM reasoning in complex, structured scenarios related to autonomous systems, providing insights into the predictive nature of LLM capabilities.

<details>
<summary>Abstract</summary>

The rapid advancement of large language models (LLMs) has sparked growing interest in their integration into autonomous systems for reasoning-driven perception, planning, and decision-making. However, evaluating and training such agentic AI models remains challenging due to the lack of large-scale, structured, and safety-critical benchmarks. This paper introduces AgentDrive, an open benchmark dataset containing 300,000 LLM-generated driving scenarios designed for training, fine-tuning, and evaluating autonomous agents under diverse conditions. AgentDrive formalizes a factorized scenario space across seven orthogonal axes: scenario type, driver behavior, environment, road layout, objective, difficulty, and traffic density. An LLM-driven prompt-to-JSON pipeline generates semantically rich, simulation-ready specifications that are validated against physical and schema constraints. Each scenario undergoes simulation rollouts, surrogate safety metric computation, and rule-based outcome labeling. To complement simulation-based evaluation, we introduce AgentDrive-MCQ, a 100,000-question multiple-choice benchmark spanning five reasoning dimensions: physics, policy, hybrid, scenario, and comparative reasoning. We conduct a large-scale evaluation of fifty leading LLMs on AgentDrive-MCQ. Results show that while proprietary frontier models perform best in contextual and policy reasoning, advanced open models are rapidly closing the gap in structured and physics-grounded reasoning. We release the AgentDrive dataset, AgentDrive-MCQ benchmark, evaluation code, and related materials at https://github.com/maferrag/AgentDrive

</details>

## New Papers (2026-01-26)

### [Trapped in the past? Disentangling fluid and crystallized intelligence of large language models using chess](https://arxiv.org/abs/2601.16823v1)
- **arXiv**: 2601.16823v1
- **Published**: 2026-01-23
- **Stance**: CHALLENGES
- **Priority**: 9/10
- **Why read**: This paper investigates the limits of LLM reasoning, emphasizing the reliance on memorization and distributional familiarity, which directly challenges the thesis that LLM reasoning is fundamentally generative.

<details>
<summary>Abstract</summary>

Large Language Models (LLMs) exhibit remarkable capabilities, yet it remains unclear to what extent these reflect sophisticated recall (crystallized intelligence) or reasoning ability (fluid intelligence). We introduce chess as a controlled testbed for disentangling these faculties. Leveraging the game's structure and scalable engine evaluations, we construct a taxonomy of positions varying in training corpus proximity--ranging from common states solvable by memorization to novel ones requiring first-principles reasoning. We systematically evaluate multiple GPT generations under varying reasoning intensities. Our analysis reveals a clear gradient: performance consistently degrades as fluid intelligence demands increase. Notably, in out-of-distribution tasks, performance collapses to random levels. While newer models improve, progress slows significantly for tasks outside the training distribution. Furthermore, while reasoning-augmented inference improves performance, its marginal benefit per token decreases with distributional proximity. These results suggest current architectures remain limited in systematic generalization, highlighting the need for mechanisms beyond scale to achieve robust fluid intelligence.

</details>

### [Reasoning Promotes Robustness in Theory of Mind Tasks](https://arxiv.org/abs/2601.16853v1)
- **arXiv**: 2601.16853v1
- **Published**: 2026-01-23
- **Stance**: CHALLENGES
- **Priority**: 8/10
- **Why read**: This paper investigates whether improvements in LLM reasoning are due to genuine reasoning capabilities or robustness, directly addressing the thesis about the nature of LLM reasoning.

<details>
<summary>Abstract</summary>

Large language models (LLMs) have recently shown strong performance on Theory of Mind (ToM) tests, prompting debate about the nature and true performance of the underlying capabilities. At the same time, reasoning-oriented LLMs trained via reinforcement learning with verifiable rewards (RLVR) have achieved notable improvements across a range of benchmarks. This paper examines the behavior of such reasoning models in ToM tasks, using novel adaptations of machine psychological experiments and results from established benchmarks. We observe that reasoning models consistently exhibit increased robustness to prompt variations and task perturbations. Our analysis indicates that the observed gains are more plausibly attributed to increased robustness in finding the correct solution, rather than to fundamentally new forms of ToM reasoning. We discuss the implications of this interpretation for evaluating social-cognitive behavior in LLMs.

</details>

### [AgentDrive: An Open Benchmark Dataset for Agentic AI Reasoning with LLM-Generated Scenarios in Autonomous Systems](https://arxiv.org/abs/2601.16964v1)
- **arXiv**: 2601.16964v1
- **Published**: 2026-01-23
- **Stance**: CHALLENGES
- **Priority**: 8/10
- **Why read**: This paper evaluates LLM reasoning in complex, structured scenarios, providing insights into whether their capabilities are genuinely generative or pattern-based.

<details>
<summary>Abstract</summary>

The rapid advancement of large language models (LLMs) has sparked growing interest in their integration into autonomous systems for reasoning-driven perception, planning, and decision-making. However, evaluating and training such agentic AI models remains challenging due to the lack of large-scale, structured, and safety-critical benchmarks. This paper introduces AgentDrive, an open benchmark dataset containing 300,000 LLM-generated driving scenarios designed for training, fine-tuning, and evaluating autonomous agents under diverse conditions. AgentDrive formalizes a factorized scenario space across seven orthogonal axes: scenario type, driver behavior, environment, road layout, objective, difficulty, and traffic density. An LLM-driven prompt-to-JSON pipeline generates semantically rich, simulation-ready specifications that are validated against physical and schema constraints. Each scenario undergoes simulation rollouts, surrogate safety metric computation, and rule-based outcome labeling. To complement simulation-based evaluation, we introduce AgentDrive-MCQ, a 100,000-question multiple-choice benchmark spanning five reasoning dimensions: physics, policy, hybrid, scenario, and comparative reasoning. We conduct a large-scale evaluation of fifty leading LLMs on AgentDrive-MCQ. Results show that while proprietary frontier models perform best in contextual and policy reasoning, advanced open models are rapidly closing the gap in structured and physics-grounded reasoning. We release the AgentDrive dataset, AgentDrive-MCQ benchmark, evaluation code, and related materials at https://github.com/maferrag/AgentDrive

</details>

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
