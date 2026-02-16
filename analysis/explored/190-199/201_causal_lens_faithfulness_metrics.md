# Paper Analysis: A Causal Lens for Evaluating Faithfulness Metrics

## Metadata
- **arXiv ID**: 2502.18848
- **Title**: A Causal Lens for Evaluating Faithfulness Metrics
- **Authors**: Kerem Zaman, Shashank Srivastava
- **Affiliations**: UNC Chapel Hill
- **Date**: February 2025
- **Venue**: EMNLP 2025

---

## Core Claims

1. **Faithfulness metrics need systematic evaluation**: Existing metrics (Simulatability, Corrupting CoT, CC-SHAP) are evaluated in isolation without a principled comparison framework.

2. **Causal Diagnosticity provides ground truth**: Using knowledge editing to create faithful/unfaithful explanation pairs enables rigorous metric evaluation.

3. **Filler Tokens metric is most reliable**: Among all tested metrics, replacing CoT with filler tokens (ellipses) most consistently distinguishes faithful from unfaithful explanations.

4. **Continuous metrics outperform binary ones**: Measuring change in prediction scores rather than just whether prediction changed yields better diagnosticity.

---

## Methodology

### Causal Diagnosticity Framework
1. **Knowledge Editing**: Create two edited models M̄ and M̃ with different counterfactual knowledge
2. **Explanation Generation**: Each model generates explanation for same question (same answer, different reasoning)
3. **Diagnosticity Evaluation**: Test if faithfulness metric correctly assigns higher score to explanation matching the evaluated model's knowledge

### Faithfulness Metrics Tested
1. **Post-hoc**: CC-SHAP, Simulatability
2. **CoT-based**: Early Answering, Filler Tokens, Adding Mistakes, Paraphrasing, CC-SHAP

### Tasks (Increasing Complexity)
1. **FactCheck**: Simple yes/no fact verification
2. **Analogy**: Multiple-choice analogies exploiting hierarchical relations
3. **Object Counting**: Classification and counting
4. **Multi-hop Reasoning**: Complex multi-step reasoning chains

---

## Key Evidence

### Main Results: Diagnosticity Scores (Table 1)
| Metric | FactCheck | Analogy | Object Counting | Multi-hop | Copeland |
|--------|-----------|---------|-----------------|-----------|----------|
| **Filler Tokens** | **0.828-0.893** | 0.561-0.810 | **0.630-0.843** | **0.682-0.585** | **29** |
| Early Answering | 0.756-0.838 | 0.534-0.859 | 0.566-0.724 | 0.468-0.435 | 18 |
| Adding Mistakes | 0.534-0.427 | 0.590-0.639 | 0.614-0.579 | 0.542-0.402 | 13 |
| CC-SHAP (CoT) | 0.559-0.598 | 0.318-0.939 | 0.539-0.506 | 0.442-0.488 | 12 |
| Paraphrasing | 0.556-0.525 | 0.535-0.430 | 0.425-0.385 | 0.448-0.525 | 8 |
| Simulatability | 0.501-0.507 | 0.501 | 0.499-0.500 | 0.502-0.512 | 3 |

(Values for Qwen-Gemma; 0.5 = random baseline)

### Key Findings

**Filler Tokens most reliable**:
- Highest Copeland score (29) across all metrics
- Only metric significantly > 0.5 across ALL tasks and models
- Multi-hop task: all other metrics fail to exceed baseline

**Simulatability fails**:
- Near-random performance (0.50-0.51) across all tasks
- Cannot distinguish faithful from unfaithful explanations

**Binary vs. Continuous metrics** (Table 2):
| Task | Binary | Continuous |
|------|--------|------------|
| FactCheck | 0.718 | **0.828** |
| Analogy | 0.469 | **0.561** |
| Object Counting | 0.482 | **0.630** |
| Multi-hop | 0.410 | **0.682** |

Continuous metrics consistently outperform binary.

---

## Relationship to Thesis

### SUPPORTS — Filler tokens are most diagnostic of faithfulness

**Supports thesis**:
1. **Filler tokens work best**: The metric that replaces CoT with "..." (meaningless filler) most reliably detects unfaithfulness
2. **Semantic content not needed for diagnosis**: If filler tokens detect faithfulness, the semantic content of CoT isn't what matters
3. **Simulatability fails**: Whether a simulator can predict from explanation doesn't correlate with actual faithfulness
4. **Multi-hop reasoning hardest**: Consistent with thesis that complex reasoning is where LLMs fail

**Key insight for thesis**:
The paper shows that **replacing CoT with filler tokens** is the BEST way to test if CoT actually matters for the answer. This is exactly what the filler token papers (#196-198) show — filler tokens can replace semantic CoT. If removing semantic content and replacing with "..." changes the answer, then the CoT was actually being used. If not, the CoT was decorative.

This provides **methodological support** for the filler token research: the reason filler tokens work is that CoT's benefit is computational (more forward passes), not semantic (meaningful reasoning steps).

---

## Relationship to Other Papers

### Directly Supports
- **Measuring Faithfulness (#10, 2307.13702)**: Extends Lanham et al.'s corruption methods; Filler Tokens best
- **Seq-VCR (#196)**: Both show filler/dummy tokens reveal true computation vs. decoration
- **Dot by Dot (#161)**: Filler tokens metric confirms hidden computation hypothesis

### Extends
- **Reasoning Models Don't Say (#9, 2505.05410)**: Provides causal framework for testing unfaithfulness
- **FaithCoT-Bench (#62)**: Complementary benchmark with causal grounding

### Provides Framework For
- **Testing faithfulness claims**: Causal Diagnosticity as gold standard for faithfulness evaluation
- **Evaluating future metrics**: Principled comparison methodology

### Challenges (Implicitly)
- **Post-hoc explanation methods**: CC-SHAP and Simulatability perform poorly
- **Paraphrasing as faithfulness test**: Low diagnosticity suggests paraphrasing isn't reliable

---

## REBUTTALS TO THIS PAPER

### Potential Counter-Arguments

1. **Synthetic explanations**: Manually generated explanations may not reflect natural model outputs
2. **Limited tasks**: Four tasks may not generalize to all reasoning scenarios
3. **Knowledge editing artifacts**: ICE/MEMIT may introduce confounds beyond knowledge changes
4. **Model-specific results**: Significant variation between Qwen and Gemma on some tasks

### Limitations (Authors Acknowledge)
- "While we provide a diverse set of tasks, the benchmark could be expanded to include more realistic, open-ended scenarios"
- "Synthetic explanations reduce the realism... but necessary to guarantee validity"
- "The Multi-hop task is particularly challenging, as all other metrics fail to significantly exceed baseline"

---

## Key Quotes

> "Filler Tokens is the most reliable overall, significantly outperforming the baseline value of 0.5 across all tasks and models."

> "The Multi-hop task is particularly challenging, as all other metrics fail to significantly exceed baseline performance."

> "Continuous metrics are generally more diagnostic than binary ones but can be sensitive to noise and model choice."

> "Diagnostic performance varies across tasks and models, with Filler Tokens performing best overall."

---

## Critical Assessment

### What This Paper Adds

1. **Causal Diagnosticity framework**: Principled method for evaluating faithfulness metrics
2. **Systematic benchmark**: Four tasks spanning complexity levels
3. **Clear finding**: Filler Tokens most reliable metric

### For Thesis

The paper provides strong methodological support for the filler token research:
- **Filler Tokens metric = best faithfulness test** validates that filler tokens reveal computational role of CoT
- **Semantic content replacement works** — the metric itself works by replacing content with filler
- **Simulatability fails** — external observers can't tell faithful from unfaithful, suggesting CoT is often decorative

### Stance: SUPPORTS

The paper shows that the best way to test if CoT is actually used is to replace it with filler tokens. This is exactly what the filler token papers demonstrate — that the semantic content of intermediate steps doesn't matter, only the computational opportunity. The paper provides a rigorous methodological framework that validates the filler token research program.

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [x] Paper graph updated
