# Papers to Read

Curated list of papers confirmed relevant to the thesis. Promoted from `toevaluate.md` after triage.

**Last updated**: 2026-01-29

---

## High Priority (Directly Tests Thesis)

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

## Recently Analyzed (Removed from Queue)

- ✅ **Outcome-Based RL** (2601.15158) — Analyzed 2026-01-29
- ✅ **Gaming the Judge** (2601.14691) — Analyzed 2026-01-29
- ✅ **Beyond Memorization** (2601.13392) — Analyzed 2026-01-29

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
