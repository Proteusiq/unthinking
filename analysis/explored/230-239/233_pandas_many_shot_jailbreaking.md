# Paper Analysis: PANDAS: Improving Many-Shot Jailbreaking

## Metadata
- **arXiv ID**: 2502.01925
- **Title**: PANDAS: Improving Many-Shot Jailbreaking via Positive Affirmation, Negative Demonstration, and Adaptive Sampling
- **Authors**: Avery Ma, Yangchen Pan, Amir-massoud Farahmand
- **Date**: February 2025
- **Venue**: ICML 2025 (Spotlight)

---

## Core Claims

1. Many-shot jailbreaking can be significantly improved by modifying fabricated dialogues with Positive Affirmations, Negative Demonstrations, and Adaptive Sampling
2. PANDAS significantly outperforms baseline many-shot methods in long-context scenarios
3. Attention analysis reveals how long-context vulnerabilities are exploited
4. Introduces ManyHarm: a new dataset of harmful question-answer pairs for jailbreak research

---

## Methodology

### PANDAS Components
1. **Positive Affirmations**: Modifying fabricated dialogue exchanges
2. **Negative Demonstrations**: Showing model examples of harmful responses
3. **Adaptive Sampling**: Optimizing which harmful Q&A pairs to include based on target prompt's topic

### Key Innovation
Rather than randomly sampling from a pool of unsafe Q&A pairs, PANDAS tailors the selection to the specific harmful request, making attacks more effective.

---

## Key Evidence

### Attack Success Rates (ASR)

| Model | Baseline MSJ | PANDAS | Improvement |
|-------|-------------|--------|-------------|
| Llama-3.1-8B | 45% | 74.23% | **+29pp** |
| openchat-3.6-8B | 64% | 98% | **+34pp** |
| Other models | varies | up to 100% | +26 to +48pp |

### Key Findings
1. **PANDAS achieves 74-100% ASR** vs baseline MSJ 45-64%
2. **Adaptive sampling is crucial**: Topic-matched fake conversations outperform random sampling by 26-48 percentage points
3. **Perplexity-based defenses completely ineffective**: Cannot detect PANDAS attacks
4. **Long-context exploitation**: Attacks become more effective with longer context windows

### Venue Signal
- Accepted at ICML 2025 as **Spotlight** paper (high quality signal)
- Code available at GitHub (reproducibility)

---

## Relationship to Thesis

### Supports
This paper **strongly supports** the thesis:

1. **Demonstrates safety is statistical, not principled**: By showing that adaptive sampling (matching attack context to target) improves jailbreaking, proves safety is about probability distributions, not understanding
2. **Shows pattern matching exploits**: Model responds based on what patterns are most probable in context
3. **Long-context vulnerabilities are fundamental**: Not edge cases but exploitable design features

### Key Insight for Thesis
The fact that **topic-matched** fake conversations work better than random ones proves the model is doing statistical pattern matching. A model with "true understanding" of safety wouldn't be fooled by contextually relevant but fabricated examples.

---

## Relationship to Other Papers

### Extends
- **Anil et al. (2024)**: Improves upon original many-shot jailbreaking
- **#231 (What Really Matters)**: Both study what makes many-shot attacks effective
- **#232 (Mitigating Many-Shot)**: Attack vs. defense papers on same mechanism

### Supports
- **#240 (LRMs as Jailbreak Agents)**: Both show sophisticated attack optimization
- **#241 (CCA)**: Both show context manipulation bypasses safety

---

## REBUTTALS TO THIS PAPER

### Potential Counter-Arguments
1. Mitigations may be possible (see #232)
2. Limited to models with long context windows
3. Requires significant compute for adaptive sampling

### Limitations
- Effectiveness depends on quality of ManyHarm dataset
- May be mitigated by defense papers (#232)

---

## Key Quotes

> "Many-shot jailbreaking circumvents the safety alignment of LLMs by exploiting their ability to process long input sequences."

> "These exchanges are randomly sampled from a pool of unsafe question-answer pairs, making it appear as though the model has already complied with harmful instructions."

---

## Status
- [x] Read abstract and key results
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [ ] Paper graph updated
