# Benchmark Leakage Trap: Can We Trust LLM-based Recommendation?

**arXiv**: [2602.13626](https://arxiv.org/abs/2602.13626)
**Date**: February 2026
**Authors**: Mingqiao Zhang, Qiyao Peng, Yumeng Wang, Chunyuan Liu, Hongtao Liu

## Summary

Demonstrates that benchmark data leakage in LLM-based recommendation systems creates dual effects: in-domain leakage produces spurious performance gains (+25%), while out-of-domain leakage degrades performance (-25%). This "leakage trap" means benchmark results may reflect memorization rather than true recommendation capability. The effect is strong enough to reverse model rankings on leaderboards.

## Key Findings

```
┌─────────────────────────────────────────────────────────────────────┐
│  CORE INSIGHT: Benchmark leakage creates the "leakage trap"         │
│  In-domain leak: +25% spurious gains (memorization, not capability) │
│  Out-of-domain leak: -25% degradation (noise interference)          │
│  Model rankings can REVERSE based on contamination patterns         │
└─────────────────────────────────────────────────────────────────────┘
```

### The Dual Effect of Data Leakage

| Leakage Type | Effect | Example (TALLRec) |
|--------------|--------|-------------------|
| Pure In-Domain (10%) | **+25.0%** AUC | 0.7036 → 0.8795 |
| Pure Out-of-Domain (60%) | **-25.6%** AUC | 0.7036 → 0.5234 |
| Mixed (10% ID + 60% OOD) | -11.4% AUC | 0.7036 → 0.6234 |

### The Leakage Trap Mechanism

```
┌─────────────────────────────────────────────────────────────────────┐
│  HOW IT WORKS:                                                      │
│                                                                     │
│  1. LLM pre-trained/fine-tuned on data including benchmark items    │
│  2. LLM "memorizes" user-item associations from benchmark           │
│  3. During evaluation, LLM retrieves memorized patterns             │
│  4. Benchmark score reflects MEMORIZATION, not recommendation skill │
│                                                                     │
│  RESULT: Artificially inflated metrics that fail to reflect         │
│          true model performance                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Model Rankings Can Reverse

Before leakage: PersonPrompt < BinLLM
After leakage: PersonPrompt > BinLLM

> "Recommenders trained on LLMs with data leaks may change their original rankings when undergoing benchmark testing."

### Architecture Matters

- **LLMRec (pure LLM)**: More susceptible to leakage effects
- **LLMRec+Collab**: More robust due to collaborative signal redundancy

## Relevance to Thesis

**Stance**: Supports

This paper provides strong evidence that:

1. **Memorization, not understanding**: Performance gains from leakage are memorization artifacts
2. **Evaluation is compromised**: Benchmark results may not reflect true capability
3. **Pattern matching dominates**: LLMs retrieve memorized associations rather than reasoning

### Connection to Broader Thesis

| Aspect | Evidence |
|--------|----------|
| Memorization over reasoning | In-domain leakage produces +25% spurious gains |
| Surface pattern matching | Memorized associations retrieved during inference |
| Evaluation circularity | Benchmark tests what was memorized, not capability |

## Key Quotes

> "Benchmark data leakage... occurs when LLMs are exposed to and potentially memorize benchmark datasets during pre-training or fine-tuning, leading to artificially inflated performance metrics that fail to reflect true model performance."

> "When the leaked data is domain-relevant, it induces substantial but spurious performance gains, misleadingly exaggerating the model's capability."

> "The inherent data leakage in LLMs can obscure the boundary between authentic user preferences and memorized data artifacts."

> "Test results may reflect the model's prior exposure to evaluation data rather than its true recommendation ability."

## Methodology

- **Base model**: Vicuna-7B
- **Contamination**: LoRA fine-tuning on leakage datasets
- **Datasets**: ML-1M, Amazon-Book (target); 6 external sources (OOD)
- **7 recommendation methods**: ICL, Prompt4NR, TALLRec, CoLLM-MF, CoLLM-DIN, PersonPrompt, BinLLM
- **Controlled comparison**: Clean LLM vs Dirty LLM

## Connections to Other Papers

- **Supports #278**: Both show LLMs "cheat" on benchmarks via memorization
- **Supports #292**: Stochasticity + leakage = unreliable evaluation
- **Complements contamination literature**: Specific to recommendation domain

## Implications

1. **Benchmark results are untrustworthy**: Leakage creates spurious gains
2. **Model rankings misleading**: Rankings can reverse based on contamination
3. **LLMs are memorizers**: Performance reflects data exposure, not capability

```
┌─────────────────────────────────────────────────────────────────────┐
│  THE RECOMMENDATION TRAP:                                           │
│                                                                     │
│  If an LLM-based recommender's performance reflects what it         │
│  memorized from benchmark data rather than understanding of         │
│  user preferences, then:                                            │
│                                                                     │
│  - The model is not "reasoning" about recommendations               │
│  - It's retrieving memorized user-item associations                 │
│  - Benchmark scores are artifacts of data exposure                  │
│                                                                     │
│  This is pattern matching dressed as recommendation intelligence.   │
└─────────────────────────────────────────────────────────────────────┘
```

## REBUTTALS

None identified. This is empirical demonstration of a well-documented phenomenon (data contamination) in a new domain (recommendation systems).

**Potential counter-argument**: LoRA fine-tuning may not fully simulate pre-training leakage.
**Response**: Authors address this directly - LoRA provides a "conservative lower-bound estimate." If lightweight parameter updates produce +25% spurious gains, full pre-training contamination would be worse.

---

*Analysis conducted following AGENTS.md methodology. Full paper read via arXiv HTML.*
