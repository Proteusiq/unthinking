# Paper Analysis: How Much Do Large Language Models Cheat on Evaluation?

## Metadata
- **arXiv ID**: 2507.19219
- **Title**: How Much Do Large Language Model Cheat on Evaluation? Benchmarking Overestimation under the One-Time-Pad-Based Framework
- **Authors**: Zi Liang, Liantong Yu, Shiyu Zhang, Qingqing Ye, Haibo Hu
- **Date**: Jul 2025
- **Venue**: arXiv preprint
- **Institution**: Hong Kong Polytechnic University

---

## Core Claims

1. **LLM benchmark scores are universally overestimated**: Due to contamination and biased overtraining, reported capabilities are inflated
2. **ArxivRoll quantifies overestimation**: Novel framework using fresh arXiv papers as "one-time pad" private benchmarks
3. **Rugged Scores (RS) measure cheating**: Metrics that compare public vs private benchmark performance to quantify contamination
4. **13B model can match GPT-4 on MMLU via fine-tuning**: Prior work showed a Llama-13B can achieve GPT-4-level MMLU scores through post-processing
5. **Llama-4 and Qwen-2.5 have contaminated training**: Popular models reported to have test-data-contaminated training

---

## Methodology

**Framework**: ArxivRoll — dynamic evaluation inspired by one-time pad cryptography

**Key Components**:

1. **SCP (Sequencing, Cloze, Prediction)**: Automated test generation from fresh arXiv papers
   - **Sequencing**: Reorder shuffled sentences from a paper fragment
   - **Cloze**: Fill in masked sentences
   - **Prediction**: Identify correct next sequence vs distractors

2. **Rugged Scores (RS)**: Quantify overestimation
   - **RS_I**: Performance gap between public and private benchmarks (contamination)
   - **RS_II**: Variance across private benchmarks (biased overtraining)

**Why ArXiv?**
- Papers published after model training cutoff = guaranteed unseen
- Challenging content (cutting-edge research)
- Covers multiple domains (CS, Math, Physics, Biology, Economics, etc.)

**Validation**:
- 0.76 Spearman correlation with ChatbotArena (sequencing tasks)
- Low variance across 32 regenerations (stable generation)

---

## Key Evidence

```
┌─────────────────────────────────────────────────────────────────────┐
│              THE CHEATING PROBLEM                                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Two types of benchmark abuse:                                      │
│                                                                     │
│  1. DATA CONTAMINATION                                              │
│     Test cases included in training → memorization → inflated       │
│     scores. A 13B Llama can match GPT-4 on MMLU via fine-tuning.    │
│                                                                     │
│  2. BIASED OVERTRAINING                                             │
│     Models prioritize benchmark domains at expense of others.       │
│     Claimed "comprehensive" but actually narrow.                    │
│                                                                     │
│  RESULT: Unfair comparisons, misleading capability assessments      │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Model Performance on Private Benchmarks (ArxivRollBench-2024b)

| Model | CS | Math | Physics | Bio | Avg |
|-------|----|----|---------|-----|-----|
| GPT-J-6B | 10.3% | 8.0% | 11.7% | 12.0% | ~10% |
| Llama3-8B | 22.9% | 21.7% | 23.0% | 23.6% | ~23% |
| Qwen2.5-7B-Instruct | 27.6% | 28.6% | 28.3% | 28.2% | ~28% |
| Llama3.3-70B-Instruct | 37.3% | 34.9% | 36.4% | 37.7% | ~37% |
| GPT-4 | 42.9% | 32.4% | 37.8% | 34.9% | ~37% |
| Claude-4-Sonnet | 57.1% | 35.3% | 31.1% | 41.9% | ~41% |
| Gemini-2.5-flash | 40.5% | 35.3% | 55.7% | 46.5% | ~45% |

**Note**: These are on sequencing tasks with 4-way multiple choice (25% random baseline).

### Correlation with ChatbotArena

| Benchmark | Spearman | Pearson | Kendall |
|-----------|----------|---------|---------|
| ArxivRoll (S) - Arena | 0.76 | 0.71 | 0.60 |
| ArxivRoll (C) - Arena | 0.61 | 0.51 | 0.55 |
| ArxivRoll (P) - Arena | 0.73 | 0.69 | 0.55 |

```
┌─────────────────────────────────────────────────────────────────────┐
│              RUGGED SCORES REVEAL CHEATING                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  RS_I = Performance(Public) - Performance(Private)                  │
│         ─────────────────────────────────────────                   │
│         Performance(Public) + Performance(Private)                  │
│                                                                     │
│  Higher RS_I → More overestimation on public benchmarks             │
│  → Model is "cheating" (contamination or gaming)                    │
│                                                                     │
│  RS_II = Std deviation across private benchmarks                    │
│  Higher RS_II → More biased overtraining (unbalanced capabilities)  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Relevance to Thesis

**Strong support for the thesis.**

The paper demonstrates that:

1. **Benchmark scores are inflated**: The gap between public and private benchmark performance shows models "know" public benchmarks in ways that don't generalize

2. **Memorization masquerades as capability**: A 13B model matching GPT-4 on MMLU through fine-tuning proves benchmark performance can be achieved without genuine understanding

3. **Pattern matching on training distribution**: Models perform systematically worse on unseen (post-cutoff) content, revealing dependence on training data patterns rather than generalizable reasoning

4. **Contamination is widespread**: The authors note Llama-4 and Qwen-2.5 have contaminated training — this is industry-wide, not isolated

The core insight supporting the thesis: if models genuinely reasoned, their performance on public vs private benchmarks in the same domain should be similar. The systematic gap reveals pattern-matching to memorized or familiar content.

---

## Stance: SUPPORTS

**Classification**: Supports the thesis that LLMs don't genuinely reason

**Confidence**: High — comprehensive framework with validation, multiple models tested, quantitative metrics

---

## Key Quotes

> "Due to the contamination of public benchmarks or imbalanced model training, LLMs may achieve unreal evaluation results on public benchmarks, either intentionally or unintentionally."

> "A 13-billion-parameter Llama model can easily achieve results comparable to GPT-4 on benchmarks like MMLU through post-processing-based fine-tuning."

> "Popular open-source LLMs such as Llama-4 and Qwen-2.5 have been reported to experience test-data-contaminated training."

> "Such intentional or unintentional cheating behaviors distort the true capabilities of LLMs, misleading subsequent training procedures and corresponding discoveries."

---

## Rebuttals

### Papers This Paper Challenges

- **All public benchmark evaluations**: Shows MMLU, GSM8K, etc. scores are inflated
- **Model capability claims**: Demonstrates reported capabilities don't generalize to unseen content
- **Leaderboard rankings**: Argues rankings based on contaminated benchmarks are unreliable

### Counter-Evidence

The paper proposes a solution (ArxivRoll) that enables uncontaminated evaluation. However, even this reveals that models perform much worse on truly novel content — supporting rather than challenging the thesis.

---

## Connections to Other Papers

| Paper | Relationship |
|-------|--------------|
| #269 (2509.04013) Benchmark Robustness | Complements: Both show benchmark fragility; ArxivRoll quantifies contamination |
| #270 (2502.03461) Benchmarks Test Reliability? | Complements: Both question benchmark validity |
| #4 (2410.05229) GSM-Symbolic | Supports: GSM-Symbolic showed symbolic perturbations break performance; ArxivRoll shows temporal novelty does too |
| #267 (2411.15594) LLM-as-Judge Survey | Extends: ArxivRoll provides contamination-free evaluation alternative |
| #19 (2406.11050) Token Bias | Supports: Both reveal surface-level shortcuts inflate benchmark scores |

---

## Methodological Notes

**Strengths:**
- Novel "one-time pad" approach to contamination-free evaluation
- Automated test generation (SCP) is reproducible
- Multiple domains covered (CS, Math, Physics, Bio, Econ, etc.)
- Quantitative metrics for overestimation (RS_I, RS_II)
- High correlation with ChatbotArena validates relevance
- Comprehensive model coverage (37 models)

**Limitations:**
- ArXiv-based tests require reading comprehension, not all reasoning types
- SCP tasks (sequencing, cloze, prediction) may not capture all capabilities
- Private benchmarks become public after release (single use)
- Requires continuous generation of new benchmarks

---

## Impact Assessment

**HIGH IMPACT** for LLM evaluation:

1. **Contamination quantification**: First to systematically measure overestimation proportion
2. **Dynamic evaluation**: Renewable private benchmarks prevent gaming
3. **Industry-wide implications**: Shows popular models have contaminated training
4. **Methodology contribution**: SCP enables automated, domain-diverse test generation

The paper's key contribution is shifting from "what is the score?" to "how much of the score is real?" — a fundamental reframing that exposes the gap between benchmark performance and genuine capability.

```
┌─────────────────────────────────────────────────────────────────────┐
│                       THE BOTTOM LINE                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  "How much do LLMs cheat?"                                          │
│                                                                     │
│  ANSWER: Enough that a 13B model can fake GPT-4-level MMLU scores,  │
│  popular models have contaminated training, and systematic          │
│  public-private performance gaps reveal benchmark gaming rather     │
│  than genuine capability.                                           │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```
