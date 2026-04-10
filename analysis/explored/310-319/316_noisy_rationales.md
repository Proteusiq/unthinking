# Paper Analysis: Can LMs Reason with Noisy Rationales?

## Metadata
- **arXiv ID**: 2410.23856
- **Title**: Can Language Models Perform Robust Reasoning in Chain-of-thought Prompting with Noisy Rationales?
- **Authors**: Zhanke Zhou, Rong Tao, Jianing Zhu, Yiwen Luo, Zengmao Wang, Bo Han (HKBU, Xi'an Jiaotong University)
- **Date**: October 2024
- **Venue**: NeurIPS 2024

---

## Core Claims

1. **LLMs vulnerable to noisy rationales**: GPT-3.5 drops up to 40.4% with inaccurate reasoning steps in demonstrations.

2. **Inaccurate > Irrelevant harm**: Factual errors within reasoning are more damaging than distractions.

3. **Self-correction fails**: Existing robust methods (self-correction, self-consistency) show limited efficacy.

4. **External supervision required**: CD-CoT requires clean examples to denoise effectively.

---

## Methodology

### Models
GPT-3.5-turbo, Gemini-Pro, Llama2-70B, Mixtral-8x7B

### Dataset
NoRa (Noisy Rationales): 26,391 questions across math, symbolic, commonsense reasoning

### Noise Types
- **Irrelevant**: Correct but unhelpful information (e.g., "five oceans on Earth" during math)
- **Inaccurate**: Relevant but factually wrong (e.g., "5+4=9" inserted mid-calculation)

### Baselines
Self-correction, Self-consistency, Self-denoise

```
┌─────────────────────────────────────────────────────────────────────┐
│  PERFORMANCE DROP WITH NOISY RATIONALES (GPT-3.5)                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Noise Type        Easy      Medium     Hard      Average           │
│  ─────────────────────────────────────────────────────────────────  │
│  Irrelevant        -6.2%     -13.0%    -17.8%    -12.3%             │
│  Inaccurate       -23.1%     -24.4%    -27.3%    -24.9%             │
│                                                                     │
│  Inaccurate noise is MORE harmful than irrelevant noise             │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Key Evidence

| Finding | Quantitative | Context |
|---------|--------------|---------|
| Irrelevant thoughts | -1.4% to -19.8% | Across models |
| Inaccurate thoughts | -2.2% to -40.4% | Across models |
| Self-correction (ISC) | Often WORSE than baseline | Fails to help |
| Self-denoise | 10.4% → 0.1% on symbolic | Catastrophic failure |
| CD-CoT | +17.8% average | Requires clean supervision |

### Key Insight
```
┌─────────────────────────────────────────────────────────────────────┐
│  WHY NOISY RATIONALES ARE CHALLENGING                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Models cannot distinguish:                                         │
│  - Relevant vs. irrelevant reasoning steps                          │
│  - Accurate vs. inaccurate calculations                             │
│                                                                     │
│  They pattern-match on surface features, not semantic validity      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Relationship to Other Papers

### Supports
- **#312 Unfaithful CoT** (2305.04388): Both show CoT limitations
- **#306 Lost in Noise** (2601.07226): Both show noise sensitivity
- **#3 GSM-Symbolic** (2410.05229): Both show surface changes collapse performance
- **#305 Effective Reasoning** (2509.19284): Both analyze reasoning failures

---

## REBUTTALS

### This Paper Demonstrates
- Models can't distinguish valid from invalid reasoning steps
- Self-correction inadequate
- External supervision required to break noise barrier

### Limitations (Authors Acknowledge)
1. Synthetic noise generation may differ from real-world noise
2. Limited to specific reasoning domains
3. CD-CoT requires clean supervision (not fully unsupervised)

---

## Key Quotes

> "LLMs are intrinsically vulnerable to noisy rationales."

> "Noisy-R is much more challenging than Noisy-Q, requiring context-specific knowledge."

> "Existing robust reasoning methods—ISC, SC, and SD—are ineffective against either noisy questions or noisy rationales."

---

## Significance for Thesis

**SUPPORTS** the thesis that LLMs don't genuinely reason:

1. **Surface-level processing**: Models can't distinguish valid from invalid reasoning steps
2. **Sensitivity to noise**: Real reasoning should be robust to irrelevant information
3. **No self-verification**: Models cannot validate their own reasoning chains
4. **Pattern matching confirmed**: Models follow the structure of CoT without evaluating its content

This is strong evidence that CoT is template-following, not genuine inference.

**Stance**: SUPPORTS

---

## Status
- [x] Read complete
- [x] Core claims extracted
- [x] Key evidence with numbers
- [x] Rebuttals checked
- [x] Paper graph updated
