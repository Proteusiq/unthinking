# Paper Analysis: Measuring Chain of Thought Faithfulness by Unlearning Reasoning Steps

## Metadata
- **arXiv ID**: 2502.14829
- **Title**: Measuring Chain of Thought Faithfulness by Unlearning Reasoning Steps
- **Authors**: Martin Tutek, Fateme Hashemi Chaleshtori, Ana Marasović, Yonatan Belinkov
- **Date**: February 2025
- **Venue**: EMNLP 2025 (Outstanding Paper Award)
- **Institution**: Technion, University of Utah

---

## Core Claims

1. **Parametric faithfulness > Contextual faithfulness** — Erasing CoT steps from context doesn't remove knowledge from parameters; models can reconstruct
2. **fur (Faithfulness by Unlearning Reasoning) detects more faithful CoTs than Add-mistake** — Parametric intervention reveals ~40-86% faithful CoTs vs. 16-50% for contextual methods
3. **Unlearning changes both predictions AND reasoning** — Post-unlearning, CoTs support different answers (66-94% of cases)
4. **Faithfulness ≠ Plausibility** — Weak correlation (0.15) between ff-soft and human ratings of supportiveness
5. **High correlation between unlearning efficacy and faithfulness** — Pearson r=0.889, p<0.0001

---

## Methodology

### Novel Framework: Parametric Faithfulness Framework (pff)
Two stages:
1. **Parameter Intervention**: Erase information from model parameters (not just context)
2. **Evaluation**: Measure if intervention affected predictions

### fur: Faithfulness by Unlearning Reasoning steps
- Uses NPO+KL (Negative Preference Optimization with KL regularization)
- Unlearns content words from individual CoT steps
- Only updates FF2 matrix of Transformer MLPs (memory store)
- 5 iterations of unlearning per step

### Two Faithfulness Metrics
1. **ff-hard**: Binary — did unlearning ANY step change the prediction?
2. **ff-soft**: Continuous — how much probability mass shifted from initial answer?

### Controls
1. **Efficacy**: Reduction in probability of unlearned CoT step (Eq. 2)
2. **Specificity**: Agreement on held-out set post-unlearning (Eq. 3)  
3. **General capabilities**: MMLU performance unchanged

### Experimental Setup
- **Models**: LLaMA-3-8B, LLaMA-3.2-3B, Mistral-7B-v0.2, Phi-3-mini
- **Datasets**: ARC-Challenge, OpenbookQA, Sports, StrategyQA, TruthfulQA
- **250 instances per dataset**

---

## Key Evidence

### Table 1: Unlearning Controls Are Valid

| Model | Base MMLU | Avg Efficacy | Avg Specificity | Post MMLU |
|-------|-----------|--------------|-----------------|-----------|
| LLaMA-8B | 63.9% | 20-48% | 95-98% | 63.8% |
| LLaMA-3B | 60.4% | 29-37% | 96-98% | 60.2-60.3% |
| Mistral-2 | 59.0% | 49-72% | 95-98% | 58.8-59.0% |
| Phi-3 | 69.9% | 11-44% | 97-99% | 69.6-69.9% |

**Key insight**: General capabilities preserved (MMLU essentially unchanged)

### Table 2: Parametric vs. Contextual Faithfulness (ff-hard)

| Model | ARC (fur) | ARC (+mistake) | Book (fur) | Book (+mistake) |
|-------|-----------|----------------|------------|-----------------|
| LLaMA-8B | **39.6%** | 16.2% | **44.3%** | 18.0% |
| LLaMA-3B | **64.4%** | 31.1% | **68.6%** | 45.9% |
| Mistral-2 | **40.0%** | 31.6% | **60.0%** | 35.7% |
| Phi-3 | **39.1%** | 27.6% | **46.2%** | 38.5% |

**Key insight**: fur identifies ~2x more faithful CoTs than Add-mistake baseline

### Table 3: LLM-as-Judge — Does Reasoning Change?

| Model | ARC | Book | Sports | SQA | TQA |
|-------|-----|------|--------|-----|-----|
| LLaMA-8B | 81.5% | 80.2% | 73.1% | 66.7% | 86.9% |
| LLaMA-3B | 85.4% | 69.3% | 81.0% | 94.2% | 84.9% |
| Mistral-2 | 83.9% | 90.5% | 80.3% | 86.5% | 81.7% |
| Phi-3 | 75.7% | 75.5% | 69.2% | 73.6% | 81.1% |

**Key insight**: 66-94% of post-unlearning CoTs support DIFFERENT answers

### Critical Finding: Efficacy-Faithfulness Correlation
> "The Pearson correlation between average efficacy and ff-hard is high: 0.889 with p<0.0001"

Interpretation: The more successfully you unlearn, the more the prediction changes — indicating CoTs ARE connected to internal reasoning.

### User Study: Faithfulness ≠ Plausibility
> "We find a weak Pearson correlation of 0.15 between ff-soft and human ratings of supportiveness."

**Key insight**: Steps identified as faithful by fur are NOT considered plausible by humans.

---

## Relationship to Other Papers

### Supports
- **Measuring Faithfulness (2307.13702)**: Extends with parametric intervention approach
- **Reasoning Models Don't Say (2505.05410)**: Both show CoT ≠ internal computation
- **CoT In The Wild (2503.08679)**: Both find CoT unfaithfulness in natural settings

### Challenges
- Papers that assume CoT faithfulness without testing it
- Add-mistake and other contextual perturbation methods (underestimate faithfulness)

### Extends
- **Measuring Faithfulness (Lanham et al., 2023)**: From contextual to parametric perturbation
- Machine unlearning literature: Novel application to faithfulness measurement

### Provides Mechanism For
- Why contextual faithfulness methods may underestimate — models can reconstruct erased info
- Why faithfulness and plausibility diverge — different optimization pressures

---

## REBUTTALS TO THIS PAPER

### Potential Counter-Arguments
1. **Unlearning is imperfect**: Authors acknowledge — precision/recall tradeoffs
2. **Limited to open-weight models**: Cannot apply to closed APIs (GPT-4, Claude)
3. **Compute-intensive**: Requires fine-tuning for each step
4. **Only MCQA tasks**: May not generalize to long-form generation

### Limitations (Authors Acknowledge)
1. "Relies on machine unlearning techniques, which are imperfect"
2. "Limited to English language MCQA tasks"
3. "Applying fur requires the capability to fine-tune the target model"
4. ff-hard "represents a lower bound on the model's true faithfulness"
5. Only test cases where CoT and no-CoT predictions agree

### Search for Direct Rebuttals
- **None found** — paper is recent (Feb 2025, EMNLP Outstanding)
- Would need papers showing contextual faithfulness IS sufficient

---

## Key Quotes

### On the core motivation:
> "Perturbing the reasoning chain while maintaining model parameters fixed measures self-consistency... it does not reflect faithfulness of the reasoning chain with respect to model parameters, which we call parametric faithfulness."

### On contextual vs. parametric:
> "Models could recover information erased only from context, and introduced mistakes might make the model prioritize erroneous context."

### On the finding:
> "In general parametric faithfulness through fur identifies a larger proportion of faithful CoTs than contextual faithfulness. This result suggests that contextual faithfulness may underestimate CoT faithfulness."

### On efficacy-faithfulness correlation:
> "We interpret this as indication that reasoning chains generated by the models are generally faithful, as the stronger we unlearn, the more frequent the change in prediction."

### On faithfulness ≠ plausibility:
> "This result provides further evidence that faithfulness, in general, does not correlate with plausibility... one might need to specifically align LMs for reasoning plausibility."

### On reasoning change:
> "Post-unlearning CoTs largely support different answers compared to the base LM, indicating the unlearning-based intervention fundamentally changes the models' verbalized reasoning."

---

## Relevance to the Literature Review Thesis

**Literature Review Thesis**: LLM reasoning is practical but fundamentally predictive (pattern matching from training distributions), not genuinely generative.

### NUANCED EVIDENCE

This paper presents **mixed evidence** for this thesis:

**AGAINST the thesis (CoTs can be faithful)**:
- fur shows CoTs ARE often parametrically faithful (40-86% ff-hard)
- High efficacy-faithfulness correlation (r=0.889) suggests CoTs reflect internal computation
- Unlearning steps changes BOTH predictions AND reasoning

**FOR the thesis (pattern matching, not genuine reasoning)**:
- **Faithfulness ≠ Plausibility** (r=0.15): Even "faithful" steps aren't what humans consider good reasoning
- **Contextual methods overestimate unfaithfulness**: Models reconstruct from parameters, suggesting retrieval not reasoning
- The fact that CoTs are "faithful" doesn't mean they represent genuine reasoning — they could faithfully reflect pattern matching

### Key Numbers for Synthesis:
- **40-86% ff-hard** across models/datasets (fur)
- **r=0.889 correlation** between efficacy and faithfulness
- **66-94%** post-unlearning CoTs support different answers
- **r=0.15 correlation** between faithfulness and plausibility

### Important Distinction
This paper measures whether CoTs **reflect internal computation** — NOT whether that internal computation constitutes genuine reasoning. A model could faithfully verbalize its pattern-matching process.

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] **Rebuttals checked**
- [x] **Paper graph updated**
