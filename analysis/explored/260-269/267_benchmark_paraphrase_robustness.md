# Paper Analysis: On Robustness and Reliability of Benchmark-Based Evaluation of LLMs

## Metadata
- **arXiv ID**: 2509.04013
- **Title**: On Robustness and Reliability of Benchmark-Based Evaluation of LLMs
- **Authors**: Riccardo Lunardi, Vincenzo Della Mea, Stefano Mizzaro, Kevin Roitero (University of Udine)
- **Date**: Sep 2025

---

## Core Claims

1. **LLMs show 15-30% answer inconsistency across paraphrased questions** — semantically equivalent rewordings produce different answers, revealing surface-pattern matching
2. **Benchmark scores overestimate generalization** — high accuracy on fixed phrasings doesn't transfer to linguistic variation
3. **Rankings remain stable despite accuracy drops** — τ > 0.9 correlation, suggesting relative comparisons are more reliable than absolute scores
4. **Smaller models are "consistently wrong"** — negative correlation (ρ=-0.51) between accuracy and consistency for <15B parameter models
5. **Older benchmarks show more overestimation** — suggests contamination/memorization rather than understanding

---

## Methodology

**Approach**: Systematic paraphrase attack on benchmark questions to test robustness.

**Scale**:
- **6 benchmarks**: ARC-C, HellaSwag, MMLU, OpenBookQA, RACE, SciQ
- **34 LLMs**: From bloom-560m to Mistral-Large-2411, including gpt4o-mini
- **264,761 paraphrases**: 5 paraphrases per question across 52,966 questions

**Paraphrase Generation**: GPT-4o mini with semantic preservation constraints:
- No negations
- Preserve question form
- Maintain original meaning
- Keep answer option order

**Evaluation**: Zero-shot, top-1 token probability decoding for reproducibility.

---

## Key Evidence

```
┌─────────────────────────────────────────────────────────────────────┐
│                    ANSWER CONSISTENCY ACROSS PARAPHRASES            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Models give SAME answer to all paraphrases:  70-85% of questions   │
│  Models give 2+ DIFFERENT answers:            15-30% of questions   │
│  Models give 3+ DIFFERENT answers:            2.5-5% of questions   │
│  Models give ALL 4 different answers:         0.3-0.7% of questions │
│                                                                     │
│  "Even state-of-the-art models occasionally exhibit significant     │
│   sensitivity to surface-level changes in question phrasing"        │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Accuracy vs Consistency: The U-Shaped Paradox

| Model Size | Accuracy-Consistency Correlation | Interpretation |
|------------|----------------------------------|----------------|
| 0-15B parameters | ρ = -0.51 (p < 0.01) | Less capable = more consistent (but wrong) |
| 16-150B parameters | ρ = +0.79 (p < 0.01) | More capable = more consistent (and correct) |

```
┌─────────────────────────────────────────────────────────────────────┐
│              CONSISTENCY IS NOT A PROXY FOR CORRECTNESS             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Small models: High consistency + Low accuracy                      │
│    → "Over-simplicity: repeat same wrong answer regardless"         │
│    → Pattern matching without semantic understanding                │
│                                                                     │
│  Large models: High consistency + High accuracy                     │
│    → Better generalization, preserves correct answers               │
│    → Robustness to linguistic variation                             │
│                                                                     │
│  "Less capable models tend to be more consistent in their           │
│   predictions, although they are often wrong"                       │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Benchmark Reliability Under Paraphrasing

| Category | Finding |
|----------|---------|
| Rankings preserved | Kendall's τ > 0.9 across all benchmarks |
| Absolute scores drop | Majority of models are "Over" (original > paraphrased) |
| Average accuracy | 0.54 for both 1st and 5th paraphrase (semantically equivalent) |
| Worst performance | RACE, OpenBookQA (multi-step inference required) |

### Evidence of Contamination/Memorization

```
┌─────────────────────────────────────────────────────────────────────┐
│             OLDER BENCHMARKS SHOW MORE OVERESTIMATION               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  "Over" category (original > paraphrased):                          │
│    Older benchmarks → more models in "Over" category                │
│    ρ = -0.33 correlation with benchmark release date                │
│                                                                     │
│  Interpretation: "Models may overfit to older benchmarks,           │
│  potentially due to data contamination from pretraining"            │
│                                                                     │
│  "Paraphrasing disrupts this memorization/leak effect"              │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Chain-of-Thought Does NOT Help

| Finding | Value |
|---------|-------|
| Accuracy improvement from CoT | < 3% on average |
| Consistency drop from CoT | ~7% across models |
| CoT reliability | Many models produce "hallucinated reasoning steps" |

---

## Thesis Relevance

**Stance**: SUPPORTS

This paper provides controlled experimental evidence that LLMs match surface patterns rather than understand semantic content:

```
┌─────────────────────────────────────────────────────────────────────┐
│                        WHY THIS SUPPORTS THE THESIS                 │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  If LLMs truly reasoned about questions:                            │
│    → Semantically equivalent phrasings would yield same answers     │
│    → Consistency would correlate with capability                    │
│                                                                     │
│  What we actually observe:                                          │
│    → 15-30% inconsistency on equivalent questions                   │
│    → Small models are "consistently wrong"                          │
│    → Older benchmarks show memorization signatures                  │
│    → CoT doesn't improve consistency                                │
│                                                                     │
│  "Benchmark accuracy scores may reflect the particular wording      │
│   of test items more than the model's reasoning abilities"          │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Mechanism: Surface Pattern Matching

The paper reveals why benchmark scores inflate perceived capability:
1. Models memorize specific phrasings from training data
2. Fixed benchmark format enables pattern completion
3. Linguistic variation disrupts pattern matching
4. "Semantic understanding" would be robust to paraphrasing

---

## Critical Assessment

### Strengths
- Large-scale controlled experiment (264K paraphrases, 34 models)
- Quantitative methodology (Kendall's τ, Pearson ρ)
- Semantic validation of paraphrases (forward/reverse order)
- Tests both reliability (rankings) and robustness (absolute scores)

### Limitations
- Paraphrases generated by GPT-4o mini (potential systematic biases)
- Zero-shot only (few-shot might show different patterns)
- Multiple-choice format only (open-ended generation not tested)
- No mechanistic explanation for inconsistency

### Methodological Innovation
- Distinguishes benchmark **reliability** (ranking stability) from **robustness** (generalization)
- Shows these are independent: reliable rankings, unreliable absolute scores

---

## Connections

### Related Papers in Corpus
- **#267 (LLM-as-a-Judge Survey)**: Both show evaluation infrastructure compromised
- **#268 (Can You Trust LLM Judgments)**: Complements—#268 shows judge unreliability, #269 shows benchmark unreliability
- **#260 (Non-Determinism)**: Both expose hidden randomness in evaluation
- **Diffusion papers (#254-258)**: Same conclusion—sequential form doesn't require sequential reasoning

### Novel Contribution
First paper to systematically quantify **both** benchmark reliability AND robustness separately with paraphrase attacks at scale.

---

## Quotations

> "If a model's output varies across semantically equivalent rewordings, benchmark accuracy scores may reflect the particular wording of test items more than the model's reasoning abilities."

> "Less capable models can exhibit high consistency while consistently providing wrong answers."

> "Current benchmark practices, typically relying on single question formulations, fail to capture the semantic fragility, or brittleness, of LLMs."

> "Models may overfit to older benchmarks, potentially due to data contamination from pretraining, thus achieving inflated accuracy on original formulations."

---

## REBUTTALS

### Papers This Paper Rebuts
- Claims that high benchmark scores indicate reasoning ability
- Assumptions that benchmark rankings reflect true capability ordering

### Counter-Evidence Needed
- Show paraphrasing actually changes question difficulty (not just surface form)
- Demonstrate that humans also show inconsistency on paraphrases
- Provide few-shot results where context might stabilize answers
