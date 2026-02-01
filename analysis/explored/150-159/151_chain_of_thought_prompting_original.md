# Paper Analysis: Chain-of-Thought Prompting Elicits Reasoning in Large Language Models

## Metadata
- **arXiv ID**: 2201.11903
- **Title**: Chain-of-Thought Prompting Elicits Reasoning in Large Language Models
- **Authors**: Jason Wei, Xuezhi Wang, Dale Schuurmans, Maarten Bosma, Brian Ichter, Fei Xia, Ed Chi, Quoc Le, Denny Zhou
- **Affiliation**: Google Research, Brain Team
- **Date**: January 2022 (v1), January 2023 (v6)
- **Venue**: NeurIPS 2022 (Main Conference Track)

---

## Core Claims

1. **CoT prompting "significantly improves" reasoning** — Generating intermediate reasoning steps before the final answer improves performance on complex reasoning tasks.

2. **Reasoning abilities "emerge naturally" at scale** — CoT benefits only materialize at ~100B+ parameters; smaller models don't benefit.

3. **No fine-tuning required** — CoT works via few-shot prompting with manually composed exemplars; no weight modification needed.

4. **CoT enables problem decomposition** — Models "decompose multi-step problems into intermediate steps."

5. **State-of-the-art on GSM8K** — 540B PaLM with CoT achieves 58% on GSM8K, surpassing fine-tuned GPT-3 + verifier (55%).

---

## Methodology

### How Few-Shot CoT Works
1. **Standard prompting**: Q → A (direct answer)
2. **CoT prompting**: Q → reasoning steps → A (intermediate steps before answer)

### Implementation
- Provide **8 chain-of-thought exemplars** as demonstrations
- Model generates its own CoT at test time, mimicking format
- **No fine-tuning** — pure prompting technique
- External calculator used for basic arithmetic operations

### Models Tested
| Family | Sizes |
|--------|-------|
| LaMDA | 422M, 8B, 62B, **137B** |
| PaLM | 8B, 62B, **540B** |

---

## Key Evidence

### GSM8K (Math Word Problems)

| Method | Model | Accuracy |
|--------|-------|----------|
| Fine-tuned GPT-3 + verifier | 175B | 55% |
| **CoT prompting** | **PaLM 540B** | **58%** |
| CoT + self-consistency | PaLM 540B | 74% |

### Scaling Behavior

| Prompting | Scaling Curve |
|-----------|---------------|
| Standard | "Relatively flat" — more parameters don't help |
| CoT | "Increasing model scale leads to improved performance" |

### Emergence Threshold
> "The benefits of chain of thought prompting only materialize with a sufficient number of model parameters (around 100B)"

### Other Benchmarks
- **Sports Understanding**: PaLM 540B CoT = 95% (vs 84% unaided human)
- **CommonsenseQA**: Improved with scale + CoT
- **StrategyQA**: Improved with scale + CoT

---

## Critical Analysis: Relationship to Thesis

### This Paper's Claims vs. Subsequent Evidence

| Wei et al. Claim | Subsequent Findings |
|------------------|---------------------|
| CoT "elicits reasoning" | CoT is unfaithful to actual computation (Papers 10, 148) |
| "Emerge naturally" at 100B | Emergence is metric artifact (Paper 146) |
| Models "decompose" problems | Models produce plausible text, may not decompose (Paper 132) |
| Improved performance = reasoning | Benchmark performance ≠ genuine reasoning (Papers 01, 03) |

### What This Paper Does NOT Address

1. **Faithfulness**: Are CoT steps reflective of actual model computation?
2. **OOD Generalization**: Does CoT help on truly novel problems?
3. **Pattern matching vs. reasoning**: Is improved accuracy from reasoning or better pattern completion?
4. **Failure modes**: When and why does CoT fail?

### The "Elicits" Framing
The title claims CoT "elicits reasoning" — implying reasoning ability was latent and is now revealed. Subsequent research challenges this:
- **Paper 133** (Base Models Know How to Reason): Supports "surfacing" interpretation
- **Paper 148** (Don't Say What They Think): CoT can be systematically unfaithful
- **Paper 132** (Stop Anthropomorphizing): Tokens aren't reasoning traces

---

## Relationship to Other Papers

### Foundational For
- All subsequent CoT research builds on this paper
- GSM8K becomes standard reasoning benchmark
- "Emergent abilities" framing originates here

### Challenged By
- **Paper 146** (Emergence Mirage): 100B threshold may be metric artifact
- **Paper 148** (Don't Say What They Think): CoT explanations systematically unfaithful
- **Paper 10** (Measuring Faithfulness): Larger models = less faithful CoT
- **Paper 01** (GSM-Symbolic): Fragility shows CoT doesn't encode robust reasoning
- **Paper 132** (Stop Anthropomorphizing): Intermediate tokens aren't reasoning

### Extended By
- **Paper 26** (CoT Without Prompting): CoT exists in decoding paths
- **Paper 76** (Latent CoT Survey): Reasoning may be in latent space, not tokens
- **Paper 135** (Demystifying Long CoT): Long CoT works by reducing uncertainty

---

## REBUTTALS TO THIS PAPER

### Direct Challenges in Corpus

1. **GSM-Symbolic (Paper 01)**: Same models fail on symbolic variations → CoT doesn't encode robust reasoning

2. **Emergence Mirage (Paper 146)**: The 100B "emergence" threshold may be measurement artifact, not real capability jump

3. **CoT Unfaithfulness (Papers 10, 148)**: CoT steps don't reflect actual computation; models can be biased by irrelevant features without mentioning them

4. **Planning failures (Papers 131, 150)**: CoT doesn't help LLMs plan autonomously — ~12% success rate

### Methodological Issues
1. **External calculator**: Using calculator for arithmetic inflates apparent "reasoning" ability
2. **Manually composed exemplars**: Results depend heavily on prompt engineering
3. **Benchmark saturation**: GSM8K may be in training distribution

### The Paper's Own Limitations
- Only works at 100B+ scale
- Doesn't guarantee correct reasoning
- Prompt-sensitive results

---

## Key Quotes

**On the core claim**:
> "We explore how generating a chain of thought -- a series of intermediate reasoning steps -- significantly improves the ability of large language models to perform complex reasoning."

**On emergence**:
> "We show how such reasoning abilities emerge naturally in sufficiently large language models via a simple method called chain of thought prompting."

**On threshold**:
> "Successful chain of thought reasoning is an emergent property of model scale — that is, the benefits of chain of thought prompting only materialize with a sufficient number of model parameters (around 100B)."

---

## Historical Significance

This paper is **foundational** for the field:
1. Introduced "chain-of-thought prompting" terminology
2. Established few-shot CoT paradigm
3. Made "emergent reasoning" a central narrative
4. Set up GSM8K as standard reasoning benchmark
5. Inspired thousands of follow-up papers

**However**: The strong claims ("elicits reasoning", "emerge naturally") have been substantially challenged by subsequent research showing:
- CoT is often unfaithful
- Emergence may be metric artifact
- Benchmark performance ≠ genuine reasoning
- Models remain fragile on variations

---

## Verdict for Thesis

### Position: FOR the thesis (with irony)

This paper is technically "FOR genuine reasoning" in its claims, but subsequent work in our corpus has **substantially rebutted** those claims:

| Original Claim | Status in 2026 |
|----------------|----------------|
| CoT elicits reasoning | Challenged — may be pattern completion |
| Abilities emerge at 100B | Challenged — metric artifact |
| Models decompose problems | Challenged — produce plausible text |
| Improved performance = reasoning | Challenged — benchmarks don't test reasoning |

**The paper is essential to analyze because it established the claims that subsequent work refutes.**

---

## Status
- [x] Read complete (via task agent)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] **Rebuttals checked**
- [x] **Paper graph updated** (pending)
