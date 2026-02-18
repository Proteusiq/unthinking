# Paper Analysis: Revisiting the Superficial Alignment Hypothesis

## Metadata
- **arXiv ID**: 2410.03717
- **Title**: Revisiting the Superficial Alignment Hypothesis
- **Authors**: Mohit Raghavendra (Georgia Tech), Vaskar Nath (Scale AI), Sean Hendryx (Scale AI)
- **Date**: September 2024
- **Venue**: arXiv preprint

---

## Core Claims

The paper challenges the Superficial Alignment Hypothesis (SAH), which states:
- C1: A model's knowledge is learned entirely during pre-training
- C2: A small number of examples can saturate performance
- C3: Post-training is largely about style, not new capabilities

**Authors' Claims**:
1. Post-training performance scales as a power law with data (P ∝ D^(1/b))
2. Style/formatting saturates quickly (~100 examples), but reasoning continues to improve
3. Models can learn to integrate new knowledge beyond pre-training cutoff

---

## Methodology

### Experiments Conducted

| Task | Train Dataset | Test Benchmark | # Train Examples |
|------|---------------|----------------|------------------|
| Math | GSM8k Train | GSM8k Test | 7,500 |
| Multihop QnA | SubQA Train | SubQA Test | 2,700 |
| Coding | StarCoder Self-Align | HumanEval+ | 10,000 |
| Instruction Following | Conifer/Dolly | IFEval | 5,000-15,000 |

### Models Tested
- Llama-3 (8B, 70B)
- Llama-2 (7B, 70B)
- Mistral (7B)

### New Knowledge Experiment
- Created Facts100: 100 hand-curated news events after March 2023 (Llama-3 knowledge cutoff)
- Tested direct questions and multihop questions
- Compared base model vs. post-trained model on integrating new facts

---

## Key Evidence

### Power Law Scaling (Figure 1)

| Model | Task | 100 examples | 1000 examples | Full dataset |
|-------|------|--------------|---------------|--------------|
| Llama-3 8B | GSM8k | ~20% | ~40% | ~55% |
| Llama-3 8B | SubQA | ~25% | ~35% | ~45% |
| Llama-3 8B | HumanEval+ | ~15% | ~25% | ~35% |

Performance follows P ∝ D^(1/b) across all tasks.

### Style vs Reasoning Breakdown (Figure 3) — KEY EVIDENCE

**Critical finding**: Style and reasoning improvements are SEPARABLE

| Finetuning Level | Formatting Errors | Reasoning Errors | Total Mistakes |
|------------------|-------------------|------------------|----------------|
| 100 examples | ~5% | ~70% | High |
| 1000 examples | ~5% | ~50% | Medium |
| Full dataset | ~5% | ~40% | Lower |

- Formatting errors plateau at ~100 examples
- Reasoning errors continue to decrease with more data
- Total mistakes correlate with reasoning errors (r² = 0.98), not formatting

### New Knowledge Results (Table 4)

| Model | Direct Qn (Event SFT) | Multihop Qn (Event SFT) |
|-------|----------------------|------------------------|
| Base Model | 65% | 37% |
| Post-trained Model | 81% | 55% |

Post-trained models significantly better at integrating AND USING new facts.

### Model Scaling (Figure 2)

Larger models show steeper improvement curves with more data:
- 70B models curve upward with additional training data
- This suggests capacity is being leveraged for capability, not just memorization

---

## Why This Paper CHALLENGES the Thesis

### Classification: **CHALLENGES** (Balanced)

### 1. Clear Separation of Style vs Capability

The paper demonstrates that style and task capability are separable:
- Style saturates at ~100 examples (confirms SAH on this narrow point)
- But task performance continues improving significantly beyond this
- If it were purely pattern matching with fixed templates, both should plateau together

### 2. Reasoning Errors Decrease Independently

After formatting is learned, models still make fewer reasoning errors with more data:
- This suggests learning something beyond surface patterns
- The high correlation (r² = 0.98) between reasoning errors and total mistakes shows reasoning is the bottleneck, not style

### 3. Novel Combinations on Test Set

While GSM8k train→test is same distribution, test problems ARE novel combinations:
- The model hasn't seen the exact problems
- Getting better on novel combinations within distribution suggests compositional ability
- This is evidence that post-training teaches more than memorization

### 4. Larger Models Show Accelerating Returns

70B models show steeper improvement curves:
- More capacity → better utilization of additional data
- This suggests models are learning generalizable patterns, not just memorizing

### 5. New Knowledge Integration

The Facts100 experiment shows post-trained models:
- Better at storing new facts (81% vs 65%)
- Better at USING facts in multihop reasoning (55% vs 37%)
- The gap in multihop (18 percentage points) suggests learning to reason with new facts, not just retrieve them

---

## Relationship to Other Papers

### Directly Rebuts
- **LIMA (2305.11206)**: The foundational SAH paper — this paper provides counter-evidence showing reasoning improves beyond style saturation

### Challenges
- **Interplay (2512.07783)**: This paper suggests post-training does MORE than surface capabilities
- **Faith and Fate (2305.18654)**: Evidence that in-distribution compositional ability improves with training
- **LLM Probability Concentration (2506.17871)**: #210 argues alignment is path selection; this paper argues it teaches reasoning (tension unresolved — #210 doesn't cite this paper)

### Supports (Partially)
- **Demystifying Long CoT (2502.03373)**: Both show training exposes capabilities
- **Base Models Know How to Reason (2510.07364)**: Post-training surfaces latent abilities

### Related
- **GSM-Symbolic (2410.05229)**: Different methodology — tests OOD, which this paper doesn't

---

## Limitations and Counter-Arguments

### What the Paper Doesn't Show

1. **No OOD generalization test**: Same-distribution evaluation (GSM8k train→test)
2. **"Reasoning errors" operationalized by GPT-4o**: May conflate pattern errors with reasoning
3. **Power law could be pattern coverage**: More data = more patterns (alternative explanation)

### The Thesis Can Still Accommodate This

The surfacing hypothesis (Interplay paper) suggests:
- Capabilities exist in base model
- Post-training surfaces and refines them
- This is compatible with the current paper's findings

---

## Key Quotes

> "Style and formatting improvements saturate quickly."

Confirms SAH's claim about style, but the paper shows this isn't the whole story.

> "Model performance is instead correlated with its reasoning ability and it improves significantly with more examples"

Key evidence that post-training teaches more than style.

> "Post-training task performance scales as a power law against the number of finetuning examples"

Establishes predictable scaling for capabilities.

> "Models post-trained for reasoning are significantly better at learning new knowledge"

Evidence for capability transfer, not just pattern memorization.

---

## Honest Assessment

### For the Thesis (Counter-Evidence)
- Post-training improves reasoning performance, not just style
- The separation of style (~100 examples) and capability (continues scaling) is strong evidence
- New knowledge experiment shows learning to USE facts, not just store them

### Limitations
- No OOD testing — doesn't address whether this is true generalization
- Same-distribution evaluation — could be pattern coverage within distribution
- r² correlation doesn't prove causation

### Verdict
This paper provides genuine counter-evidence to the strong form of the pattern matching thesis. It shows that post-training teaches task-specific capabilities that go beyond style/format learning. However, it doesn't address whether these capabilities generalize OOD.

**Classification**: CHALLENGES (with balanced caveats)

---

## Status
- [x] Read complete (full HTML)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [x] Critical assessment revised after researcher feedback
- [x] Paper graph updated
