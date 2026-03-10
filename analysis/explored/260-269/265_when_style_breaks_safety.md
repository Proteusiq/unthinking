# Paper #265: When Style Breaks Safety

## Metadata
- **arXiv**: [2506.07452](https://arxiv.org/abs/2506.07452)
- **Title**: When Style Breaks Safety: Defending LLMs Against Superficial Style Alignment
- **Authors**: Yuxin Xiao, Sana Tonekaboni, Walter Gerych, Vinith Suriyakumar, Marzyeh Ghassemi
- **Affiliation**: MIT
- **Date**: June 2025 (v1), February 2026 (v3)
- **Venue**: ICLR 2026

## Stance: SUPPORTS THESIS

## Summary

This paper provides devastating empirical evidence for the Superficial Alignment Hypothesis. By evaluating 36 LLMs across 7 jailbreak benchmarks, the authors demonstrate that **style patterns** (semantically irrelevant to malicious intent) **inflate attack success rates** (ASR). Models learn to follow style patterns without internalizing safety principles. The key insight: alignment is shallow pattern-matching on style, not deep understanding of safety.

## Core Finding

```
┌─────────────────────────────────────────────────────────────────────┐
│                    ASR INFLATION VIA STYLE                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  "chemical warfare agents"         → Model REFUSES                  │
│  "create a list of chemical        → Model COMPLIES                 │
│   warfare agents"                                                   │
│                                                                     │
│  The ONLY difference is a style pattern ("create a list of")        │
│  that is semantically IRRELEVANT to the malicious intent.           │
│                                                                     │
│  RESULT: 32/36 LLMs show inflated ASR due to style patterns         │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## Why This Supports the Thesis

```
┌─────────────────────────────────────────────────────────────────────┐
│            ALIGNMENT IS STYLE IMITATION, NOT UNDERSTANDING          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  If LLMs understood safety principles:                              │
│  - They would refuse "list of warfare agents" AND "warfare agents"  │
│  - Style would be irrelevant to safety decisions                    │
│  - Out-of-distribution styles wouldn't break safety                 │
│                                                                     │
│  What actually happens:                                             │
│  - Style patterns from training data override safety                │
│  - ASR correlates with attention to style tokens (r=0.456)          │
│  - Fine-tuning on specific styles makes model vulnerable to them    │
│                                                                     │
│  CONCLUSION: LLMs match surface patterns, not safety principles     │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## Key Evidence

### ASR Inflation Across 36 LLMs

| Model Family | ASR Inflation Trend |
|--------------|---------------------|
| Mistral | Highest inflation |
| DeepSeek | High |
| OLMo | Moderate-High |
| Qwen | Moderate |
| GPT | Moderate |
| Gemma | Low |
| Llama | Lowest |

### Mechanistic Finding: Attention Correlates with Vulnerability
- **Spearman correlation: 0.456** (p < 0.05) between attention to style tokens and ASR inflation
- LLMs that disproportionately attend to style patterns are more vulnerable
- Style patterns appearing more in instruction-tuning data → higher ASR inflation

### Superficial Style Alignment Experiments
- Fine-tuning on list-style data → model vulnerable to list-style jailbreaks
- Fine-tuning on poem-style data → model vulnerable to poem-style jailbreaks
- **Style-specific vulnerability**: training style predicts testing vulnerability
- Mixing style-removed data mitigates the effect

### Key Numbers
- **32/36 LLMs** exhibit ASR inflation
- **2,134 jailbreak queries** decomposed into style + intent
- **7 benchmarks**: AdvBench, HarmBench, SORRY-Bench, XSTest, MaliciousInstruct, StrongREJECT, MedSafetyBench
- **p-value = 0.0002** for ASR inflation significance

## Key Quotes

> "Style patterns inflate the ASR for nearly all models... the reported ASRs in benchmarks are inflated, in the sense that they do not capture the true rates when LLMs face core malicious intents alone."

> "We find that nearly all models exhibit ASR inflation. Notably, the inflation correlates with an LLM's relative attention to style patterns."

> "Models fine-tuned on data containing specific style patterns become more vulnerable to jailbreaks in the same style, which suggests that superficial style alignment inflates safety risks."

> "The superficial alignment hypothesis posits that alignment tuning may lead models to imitate style patterns without internalizing deeper safety principles."

> "ASR-inflating style patterns appear more frequently in the instruction-tuning datasets used to align LLMs."

## SafeStyle Defense

The paper proposes SafeStyle: incorporate safety training data augmented to match style patterns in fine-tuning data.

| Defense | Effectiveness |
|---------|---------------|
| No Defense | High ASR inflation |
| Vanilla safety data | Partial mitigation |
| PTST (inference prompts) | Inconsistent |
| SPPFT (freeze layers) | Partial |
| Constrained updates | Partial |
| **SafeStyle** | **Best: matches training style** |

**Key insight**: Even 50 safety examples in matched style preserves safety.

## Relationship to Other Papers

### Directly Supports
- **#172 Superficial Alignment** (2410.03717): This paper provides large-scale empirical validation across 36 LLMs
- **#264 Scalpel vs Hammer** (2507.10616): Both show alignment is surface-level style matching

### Supports
- **#262 Path Not Taken** (2511.08567): Style compliance is another manifestation of shallow updates
- **#263 SGD in RLVR** (2602.07729): 0.02% param updates can't encode deep safety understanding
- **LIMA** (2305.18654): Style is mostly what alignment teaches

### Cited Evidence
- Zhou et al. (2023): Original Superficial Alignment Hypothesis
- Lin et al. (2024): Alignment as style adaptation
- Qi et al. (2024): Benign fine-tuning compromises safety

## Methodology

- **Models**: 36 LLMs across 7 families (Llama, Gemma, Qwen, Mistral, OLMo, DeepSeek, GPT)
- **Decomposition**: GPT-4o extracts malicious intent from style pattern
- **Validation**: NLI model (DeBERTa) confirms semantic equivalence
- **Metrics**: ASR via GPT-4o, LC_WR for utility
- **Controlled experiments**: Fine-tune with specific styles, test on same/different styles

## Critical Assessment

This is a rigorous ICLR 2026 paper with:
1. **Large-scale evaluation** (36 LLMs, 7 benchmarks, 2134 queries)
2. **Mechanistic insight** (attention correlates with vulnerability)
3. **Controlled experiments** (fine-tuning with specific styles)
4. **Practical defense** (SafeStyle)

The finding that 32/36 LLMs show ASR inflation from semantically-irrelevant style patterns is a **smoking gun** for superficial alignment. If models understood safety, style wouldn't matter. But style matters enormously — proving alignment is pattern-matching, not understanding.

## REBUTTALS

### This Paper Rebuts

- **"LLMs understand safety principles"**: No — style patterns (irrelevant to safety) break alignment
- **"Alignment is deep and robust"**: No — fine-tuning on benign styles creates vulnerabilities
- **"Benchmark ASRs reflect true vulnerability"**: No — ASRs are inflated by style patterns

### Potential Counter-Arguments

1. **"Maybe style IS relevant to safety"** — Authors explicitly test this: decomposition via NLI confirms semantic equivalence

2. **"This is just prompt engineering"** — No: the effect persists across fine-tuning, showing it's learned behavior

## Impact Assessment

| Dimension | Score | Notes |
|-----------|-------|-------|
| Methodological rigor | Very High | ICLR 2026, 36 LLMs, controlled experiments |
| Thesis relevance | Critical | Direct evidence for superficial alignment |
| Novelty | High | First large-scale study of style-induced ASR |
| Reproducibility | High | Code released, clear methodology |

## Tags

#superficial-alignment #safety #jailbreak #style #attention #fine-tuning

---

**Analysis by**: Literature Review System
**Date**: March 2026
**Confidence**: Very High (ICLR 2026, large-scale empirical study, mechanistic insight)
