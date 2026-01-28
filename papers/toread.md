# Papers to Read

Curated list of papers confirmed relevant to the thesis. Promoted from `toevaluate.md` after triage.

**Last updated**: 2026-01-27

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

## Skipped (Not Relevant)

The following paper types are filtered out:
- RAG/retrieval papers
- Domain-specific applications (medical, legal, finance, traffic, chemistry)
- Image/audio/video generation and understanding
- Efficiency/quantization papers without reasoning analysis
- Tool-specific papers (code, SQL, visualization)
- Safety/alignment papers not about reasoning
- Survey/taxonomy papers without new findings on reasoning
