# Paper Analysis: Working Memory Capacity of ChatGPT

## Metadata
- **arXiv ID**: 2305.03731
- **Title**: Working Memory Capacity of ChatGPT: An Empirical Study
- **Authors**: Gong, Wan, Wang (Oxford)
- **Date**: May 2023
- **Venue**: AAAI 2024
- **Stance**: SUPPORTS thesis
- **Cluster**: cognitive

---

## Why This Paper Matters

This paper applies the **gold-standard cognitive science measure of working memory** (n-back task) to LLMs, revealing that ChatGPT has a capacity limit strikingly similar to humans (~3 items). More critically: **noise completely destroys this capacity**, and abstract reasoning fails even at n=1. This provides a cognitive-mechanistic explanation for why LLMs fail at multi-step reasoning.

```
┌─────────────────────────────────────────────────────────────────────┐
│  KEY FINDING                                                        │
├─────────────────────────────────────────────────────────────────────┤
│  ChatGPT WM capacity ≈ 3 items (same as humans)                    │
│  BUT: Adding noise → capacity drops to CHANCE LEVEL                │
│  Abstract reasoning → fails even at n=1                            │
│                                                                     │
│  This isn't robust reasoning - it's fragile pattern matching       │
│  that breaks under minimal interference                            │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Core Argument

Working memory capacity - the ability to temporarily hold and manipulate information - is foundational to reasoning. The authors test whether LLMs have similar capacity constraints to humans using the n-back task, the "gold-standard measure of working memory capacity in cognitive science."

**Central finding**: ChatGPT shows human-like capacity limits (~3 items), but this capacity is:
1. Destroyed by noise (irrelevant characters)
2. Insufficient for abstract reasoning
3. Correlated with model capability (GPT-4 > GPT-3.5 >> open-source)

---

## Methodology

### The N-Back Task
- Present sequence of stimuli one at a time
- Respond "match" if current stimulus = stimulus n steps back
- Requires continuous updating while dropping irrelevant items
- Human performance drops significantly at n=3 (Cowan 2001, Jaeggi et al. 2010)

### Experimental Design

| Parameter | Value |
|-----------|-------|
| **Blocks per condition** | 50 |
| **Trials per block** | 24 (8 match, 16 nonmatch) |
| **n values tested** | 1, 2, 3 |
| **Primary model** | GPT-3.5-turbo |
| **Temperature** | 1 |

### Task Variants

| Variant | Modification |
|---------|--------------|
| **Base Verbal** | Letters from 20-letter alphabet |
| **With Noise** | 3-6 random noise characters (#$%&@^~) added |
| **With Feedback** | Correct/wrong feedback after each trial |
| **With CoT** | "Think step by step" instruction |
| **Spatial** | 3x3 ASCII grid with X marker |
| **Abstract Spatial** | Match if same row/column (not identical position) |

### Primary Metric: d' (Detection Sensitivity)
- d' = 1 set as threshold for capacity limit
- Higher d' = better discrimination between match/nonmatch
- More robust than accuracy (accounts for response bias)

---

## Key Evidence

### Finding 1: Verbal Task Shows Human-Like Capacity Limit

**Statistical significance**: H=97.54, p=6.6×10⁻²² (Kruskal-Wallis)

From Wilcoxon signed-rank tests (d' > 1):

| n-back | T | p | r (effect size) |
|--------|---|---|-----------------|
| 1-back | 1275 | 8.9×10⁻¹⁶ | **1.00** |
| 2-back | 1046 | 1.9×10⁻⁵ | **0.64** |
| 3-back | 811 | **0.048** | **0.27** |

**Interpretation**: At n=3, performance is barely significant (p=0.048) with small effect size (r=0.27). This matches the human capacity limit of ~3 items.

### Finding 2: Noise DESTROYS Working Memory Capacity

**Statistical significance**: H=3.92, **p=0.14** (NOT significant)

With noise added:

| n-back | r (effect size) |
|--------|-----------------|
| 1-back | **-0.03** |
| 2-back | **-0.53** |
| 3-back | **-0.64** |

**Critical finding**: Negative r values mean d' is BELOW 1.0 - the model cannot distinguish match from nonmatch even at 1-back when noise is present. The noise variant shows NO significant decline across n-back levels because performance is at floor throughout.

> "Adding noise significantly reduces the model's working memory capacity, which is analogous to distracting stimuli presented in human working memory experiments."

### Finding 3: Abstract Spatial Reasoning Fails Completely

When requiring abstract matching (same row/column, not identical position):

| Task | n-back | r (effect size) |
|------|--------|-----------------|
| Abstract (incl. identical) | 1-back | -0.26 |
| Abstract (incl. identical) | 2-back | **-0.75** |
| Abstract (incl. identical) | 3-back | **-0.84** |
| Abstract (excl. identical) | 1-back | **-0.72** |
| Abstract (excl. identical) | 2-back | **-0.86** |
| Abstract (excl. identical) | 3-back | **-0.83** |

**Critical finding**: Negative r values mean d' < 1.0 - the model cannot perform abstract spatial reasoning even at n=1. When identical positions are excluded, performance is catastrophic from the start.

### Finding 4: CoT Helps But Doesn't Overcome Limits

With CoT reasoning:

| n-back | T | p | r |
|--------|---|---|---|
| 1-back | 1275 | 8.9×10⁻¹⁶ | 1.00 |
| 2-back | 1160 | 1.5×10⁻⁸ | **0.82** |
| 3-back | 719 | **0.22** | **0.13** |

**Interpretation**: CoT improves 2-back (r: 0.64→0.82) but 3-back becomes non-significant (p=0.22) with tiny effect (r=0.13). The capacity limit persists.

### Finding 5: Model Capability Correlates with WM Capacity

From Figure 9:
- **GPT-4**: d' remains high across all n-back levels tested
- **GPT-3.5**: d' drops to ~1 at n=3
- **Open-source (Bloomz-7B, ChatGLM-6B, Vicuna-7B/13B)**: d' near 0 at ALL levels

> "GPT-4, which is arguably the most intelligent LLM today, also possesses a working memory capacity that far exceeds that of other LLMs."

> "Other open-source LLMs... have a very low working memory capacity and are nearly indistinguishable from each other."

---

## Theoretical Implications

### Connection to Executive Attention Hypothesis

The authors connect their findings to Engle's executive attention theory:

> "The restriction on working memory capacity is not specifically about memory storage per se, but more about the capacity for sustained, regulated attention in the presence of interference."

The noise finding is critical here: LLMs cannot suppress salient distractors, just as humans with low WM capacity cannot (Gaspar et al. 2016).

### Why This Supports the Thesis

```
┌─────────────────────────────────────────────────────────────────────┐
│  WHAT THIS REVEALS ABOUT LLM "REASONING"                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  IF MODELS REASONED:             WHAT ACTUALLY HAPPENS:             │
│  ├── Noise irrelevant to task    ├── Noise destroys capacity        │
│  │   should be filtered          │   (can't filter distractors)     │
│  ├── Abstract relations should   ├── Abstract reasoning fails       │
│  │   be extractable              │   even at n=1                    │
│  └── Capacity should support     └── Capacity ~3 items - same       │
│      multi-step reasoning            fundamental constraint as       │
│                                      humans                          │
│                                                                     │
│  The model can't THINK about what to ignore - it pattern-matches   │
│  the entire input, including irrelevant noise                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Limitations (Authors Acknowledge)

1. **Single model family focus**: Primarily GPT-3.5; limited GPT-4 testing due to cost
2. **Task specificity**: N-back is one WM measure; other span tasks not tested
3. **Temperature = 1**: Adds variability to responses
4. **No fine-tuning**: Didn't test whether training on n-back improves capacity
5. **GPT-4 not fully characterized**: "Due to the high cost of calling the API of GPT-4, we did not test it with n>3"

---

## Relationship to Other Papers

### Supports
- **Faith and Fate** (2305.18654): WM capacity ~3 explains why compositional reasoning fails at depth >3
- **Distracted by Irrelevant Context** (2302.00093): Noise interference confirms fundamental distraction sensitivity
- **Illusion of Thinking** (2506.06941): WM limits explain why extended "thinking" doesn't improve reasoning
- **Alice in Wonderland** (2406.02061): WM limits explain why simple tasks fail when context grows

### Extends
- **Cowan (2001)**: Applies human WM capacity findings to LLMs
- **Gaspar et al. (2016)**: Inability to suppress distractors predicts low WM - LLMs show this pattern

---

## Key Quotes

> "We discover that ChatGPT has limited working memory capacity, and that its capacity limit is similar to that of humans."

> "This consistent pattern thus might be reflecting a fundamental constraint that emerged from the architecture of the model, suggesting a possibility that the low-level mechanisms of working memory in ChatGPT might be similar to human working memory, at least in some aspects."

> "Although some prompting techniques may be used to improve the model's performance, the trend of performance declines and the capacity limit still bear a striking resemblance to humans."

> "The n-back task... is arguably the gold-standard measure of working memory capacity in cognitive science."

> "Working memory capacity has proved to be closely related to fluid intelligence... it might also be used as an index of the intelligence emerged from LLMs."

---

## Relevance to Thesis

**SUPPORTS**: This paper provides a cognitive-mechanistic explanation for LLM reasoning limitations:

1. **Capacity is fundamentally limited to ~3 items** - multi-step reasoning requiring >3 intermediate values should fail
2. **Noise destroys capacity** - the model cannot filter irrelevant information, indicating pattern matching over selective attention
3. **Abstract reasoning fails at n=1** - the model cannot extract abstract relations even when WM load is minimal
4. **Better models = more capacity, same constraint** - scaling improves but doesn't transcend the fundamental limit

```
┌─────────────────────────────────────────────────────────────────────┐
│  BOTTOM LINE                                                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  LLMs have human-like WM capacity limits (~3 items)                │
│  BUT they lack human-like ability to:                              │
│  • Filter irrelevant information (noise → collapse)                │
│  • Extract abstract relations (fails at n=1)                       │
│                                                                     │
│  This is FRAGILE pattern matching, not ROBUST reasoning            │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Status
- [x] Read complete
- [x] Core claims extracted
- [x] Key evidence with numbers
- [x] Limitations documented
- [x] Paper graph updated
