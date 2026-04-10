# Paper Analysis: Rethinking Mixture-of-Agents: Is Mixing Different Large Language Models Beneficial?

## Metadata
- **arXiv ID**: 2502.00674
- **Title**: Rethinking Mixture-of-Agents: Is Mixing Different Large Language Models Beneficial?
- **Authors**: Wenzhe Li, Yong Lin, Mengzhou Xia, Chi Jin (Princeton University)
- **Date**: February 2025
- **Venue**: arXiv preprint

---

## Core Claims

1. **Self-MoA outperforms Mixed-MoA**: Using multiple samples from a single top-performing model beats aggregating outputs from diverse models by 6.6% on AlpacaEval 2.0.

2. **Quality trumps diversity**: MoA performance is more sensitive to proposer quality than to model diversity—mixing models often degrades average quality.

3. **In-model diversity suffices**: Multiple samples from the same model provide enough variation for effective aggregation without needing diverse "reasoning approaches."

---

## Methodology

### Experimental Setup
- **Benchmark**: AlpacaEval 2.0, MMLU, CRUX, MATH
- **Models tested**: Qwen1.5-110B-Chat, WizardLM-8x22B, LLaMA-3-70B, Qwen2-7B-Instruct, DeepSeek-Coder-V2, Qwen2-Math-7B
- **Over 200 experiments** mapping quality-diversity tradeoff

### Quality-Diversity Analysis
- Linear regression: t = α×quality + β×diversity + γ
- Finding: α > β across all datasets (quality coefficient stronger)
- R² ≈ 0.7 (quality + diversity explain 70% of performance)

```
┌─────────────────────────────────────────────────────────────────────┐
│  KEY FINDING: QUALITY TRUMPS DIVERSITY                              │
│                                                                     │
│  Traditional MoA:  Mix different LLMs → cross-model diversity       │
│  Self-MoA:         Same model, multiple samples → in-model diversity│
│                                                                     │
│  Result: Self-MoA wins because quality matters more than diversity  │
│          α (quality) > β (diversity) in regression analysis         │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Key Evidence

| Finding | Quantitative Result | Context |
|---------|---------------------|---------|
| Self-MoA vs Mixed-MoA (AlpacaEval) | +6.6 points (65.7 vs 59.1) | LC Win Rate |
| Top model gains | +2-3 points (78.5 vs 76.7) | gemma-2-9b-it-WPO-HB |
| MMLU Self-MoA vs best Mixed | 69.01 vs 68.90 | 6×TaskBest |
| CRUX Self-MoA vs best Mixed | 52.62 vs 47.00 | 6×TaskBest |
| MATH Self-MoA vs best Mixed | 69.80 vs 67.62 | 6×TaskBest |
| Quality coefficient (α) MMLU | 2.558 ± 0.176 (p<0.001) | R²=0.771 |
| Quality coefficient (α) CRUX | 4.548 ± 0.459 (p<0.001) | R²=0.685 |
| Quality coefficient (α) MATH | 4.719 ± 0.416 (p<0.001) | R²=0.760 |
| Diversity coefficient (β) | 1.42-2.84 across datasets | Always less than α |
| Quality > Diversity ratio | 1.4x-3.2x | α/β across all datasets |

**Critical finding**: When diversity is maximized at the expense of quality (including weak models), performance degrades. The aggregator cannot synthesize "better reasoning" from diverse weak models—it needs high-quality patterns to select from.

---

## Relationship to Other Papers

### Supports
- **#296 RLVR Structural Convergence** (2602.11792): Both show in-model consistency matters more than diversity
- **#295 Test-Time Compute** (2603.15377): Both challenge "more diverse compute = better"; quality of scorer/proposer dominates
- **#297 Gemini Scientific Discovery** (2602.03837): Aggregator as selector, not reasoner—aligns with "junior collaborator" framing

### Challenges
- Challenges MoA paradigm that diversity of perspectives improves reasoning

### Extends
- **#146 Emergent Abilities Mirage** (2304.15004): If emergence were real, diverse models should produce emergent insights; instead, quality dominates

---

## REBUTTALS

### Known Rebuttals
**Potential counter-argument**: Self-MoA works because the aggregator is just "selecting the best" from multiple samples, not because reasoning fails.

**Response**: This is exactly the point—the aggregator is a selector/ranker, not a synthesizer of novel reasoning. If LLMs could genuinely reason, diverse perspectives should enable novel insights beyond any individual sample.

### Limitations (Authors Acknowledge)
1. **Diversity plateau**: "As more responses are sampled from a single model, the diversity among those samples tends to plateau"
2. **Aggregation difficulty**: Aggregating many samples is harder for LLMs than handling fewer samples
3. **Context length constraint**: Limited by aggregator context window (e.g., 8192 tokens for Gemma 2)
4. **No universal compute-optimal solution**: Adding more samples can have both positive and negative effects
5. **Aggregator quality matters**: Weak aggregators constrain MoA performance (Qwen2-7B on MATH)

---

## Key Quotes

> "Surprisingly, Self-MoA outperforms standard MoA that mixes different LLMs in a large number of scenarios."

> "MoA performance is rather sensitive to the quality, and mixing different LLMs often lowers the average quality of the models."

> "We confirm that the MoA performance is particularly sensitive to variations in quality, highlighting the importance of prioritizing quality within the proposer mixture."

> "Compared to Self-MoA on the best-performing model, simply aiming for greater diversity in the proposer mixture can result in lower overall quality, which may negatively impact MoA's performance."

---

## Significance for Thesis

```
┌─────────────────────────────────────────────────────────────────────┐
│  WHY SELF-MOA SUPPORTS THE THESIS                                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  IF LLMs reasoned:                                                  │
│  • Diverse perspectives → novel insights                            │
│  • Mixed-MoA should beat Self-MoA (like human brainstorming)       │
│                                                                     │
│  WHAT ACTUALLY HAPPENS:                                             │
│  • Quality (training) trumps diversity (perspectives)               │
│  • Self-MoA beats Mixed-MoA                                         │
│  • Aggregator selects best pattern, doesn't synthesize reasoning    │
│                                                                     │
│  CONCLUSION:                                                        │
│  Ensemble success = better pattern selection                        │
│                  ≠ emergent reasoning from diverse views            │
└─────────────────────────────────────────────────────────────────────┘
```

**Stance**: SUPPORTS

The paper's finding that in-model diversity suffices suggests the "diversity" that helps is sampling variation from the same distribution—not genuinely different reasoning approaches. This aligns with the thesis that LLMs are sophisticated pattern matchers whose "reasoning" is constrained by training distribution quality.

---

## Status
- [x] Read complete
- [x] Core claims extracted
- [x] Key evidence with numbers
- [x] Rebuttals checked
- [x] Paper graph updated
