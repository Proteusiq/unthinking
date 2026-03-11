# Paper Analysis: Who Judges the Judge? LLM Jury-on-Demand: Building Trustworthy LLM Evaluation Systems

## Metadata
- **arXiv ID**: 2512.01786
- **Title**: Who Judges the Judge? LLM Jury-on-Demand: Building Trustworthy LLM Evaluation Systems
- **Authors**: Xiaochuan Li, Ke Wang, Girija Gouda, Shubham Choudhary, Yaqun Wang, Linwei Hu, Joel Vaughan, Freddy Lecue
- **Date**: Dec 2025
- **Venue**: arXiv preprint (66 pages, 22 figures, 37 tables)

---

## Core Claims

1. **Single LLM judges are biased**: Individual judges exhibit systematic biases that undermine evaluation reliability
2. **Static juries lack adaptability**: Fixed judge panels cannot adjust to varying task requirements
3. **Reliability predictors can assess judge agreement with humans**: Trained predictors using token distributions, embeddings, and structural features identify when judges will agree with experts
4. **Dynamic jury selection outperforms baselines**: Selecting optimal juries per data point achieves higher correlation with human judgment than single-judge or static-jury methods
5. **Reliability-weighted aggregation improves accuracy**: Weighting judge scores by predicted reliability produces better final evaluations

---

## Methodology

**Framework**: LLM Jury-on-Demand — dynamic, learning-based evaluation system

**Key Components**:
1. **Reliability Predictors**: Train models to predict when LLM judges will agree with human experts
   - Features: token distributions, embeddings, structural input features
2. **Dynamic Jury Selection**: For each data point, select optimal subset of most reliable judges
3. **Reliability-Weighted Aggregation**: Weight judge scores by predicted reliability

**Evaluation**:
- Benchmarks: Summarization and RAG (Retrieval-Augmented Generation)
- Baselines: Single judges, static juries
- Metric: Correlation with human judgment

---

## Key Evidence

```
┌─────────────────────────────────────────────────────────────────────┐
│              DYNAMIC JURY OUTPERFORMS ALTERNATIVES                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Problem with current approaches:                                   │
│    • Human evaluation: reliable but slow and costly                 │
│    • Single LLM judges: biased                                      │
│    • Static juries: lack adaptability                               │
│                                                                     │
│  Solution: LLM Jury-on-Demand                                       │
│    • Train reliability predictors per judge                         │
│    • Dynamically select most reliable judges per instance           │
│    • Weight aggregation by reliability                              │
│                                                                     │
│  Result: "Significantly higher correlation with human judgment      │
│          than both single-judge and static-jury baselines"          │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Reliability Prediction Features

The paper uses multiple signal types to predict judge reliability:
- **Token distributions**: Raw probability outputs from judges
- **Embeddings**: Semantic representations of inputs/outputs
- **Structural features**: Input characteristics (length, complexity, etc.)

### Scale of Evaluation

66 pages with 22 figures and 37 tables suggests comprehensive evaluation across:
- Multiple judge models
- Multiple evaluation aspects
- Multiple aggregation strategies

---

## Relevance to Thesis

**Supports the thesis.**

The paper's premise is that LLM judges are unreliable:

1. **Single judges are biased**: The entire motivation rests on judges being systematically unreliable — not just noisy but directionally biased

2. **Reliability is context-dependent**: The need for *dynamic* jury selection implies judges fail unpredictably across instances — they don't generalize reliable evaluation capability

3. **Requires learned correction**: Training reliability predictors to identify when judges will agree with humans is an admission that judge outputs cannot be trusted at face value

4. **Aggregation compensates for individual failure**: Like BT-σ (#275), this paper proposes aggregation to mask individual unreliability — the solution acknowledges the problem

The key insight supporting the thesis: if LLM judges genuinely reasoned about evaluation, their reliability wouldn't need external prediction — it would be intrinsic. The need for learned reliability models shows judges pattern-match in ways that sometimes align with human judgment and sometimes don't.

---

## Stance: SUPPORTS

**Classification**: Supports the thesis that LLMs don't genuinely reason

**Confidence**: Moderate — based on abstract; full paper may contain additional evidence

---

## Key Quotes

> "Single LLM judges are biased, and static juries lack adaptability."

> "Our method trains a set of reliability predictors to assess when LLM judges will agree with human experts."

> "For each data point, an optimal jury of the most reliable judges is dynamically selected, and their scores are aggregated using their reliability as weights."

> "Our dynamic jury system achieves significantly higher correlation with human judgment than both single-judge and static-jury baselines."

---

## Rebuttals

### Papers This Paper Challenges

- **Single-judge approaches**: Demonstrates single judges are biased
- **Static jury methods**: Shows fixed panels lack adaptability

### Counter-Evidence

The paper proposes a solution (dynamic jury selection) that partially addresses judge unreliability. However, the need for such complex correction itself supports the thesis — if judges genuinely reasoned, such machinery wouldn't be necessary.

---

## Connections to Other Papers

| Paper | Relationship |
|-------|--------------|
| #267 (2411.15594) Survey LLM-as-Judge | Extends: Provides learning-based solution for documented limitations |
| #268 (2412.12509) LLM Judgment Reliability | Extends: Operationalizes reliability measurement via predictors |
| #275 (2602.16610) LLM-as-a-Jury | Related: Both propose jury-based aggregation; this adds dynamic selection |
| #272 (2603.05485) Bias-Bounded Evaluation | Complements: A-BB bounds bias mathematically; this predicts reliability empirically |
| #273 (2603.05399) Judge Reliability Harness | Complements: JRH stress-tests; this paper learns to predict which tests will pass |

---

## Methodological Notes

**Strengths:**
- Learning-based approach to reliability prediction
- Dynamic per-instance adaptation
- Comprehensive evaluation (66 pages, 37 tables)
- Multiple feature types for reliability prediction

**Limitations:**
- Requires training reliability predictors (supervision needed)
- Computational overhead for dynamic jury selection
- Full methodology details not available from abstract alone

---

## Impact Assessment

**MEDIUM-HIGH IMPACT** for LLM evaluation practice:

1. **Practical framework**: Jury-on-Demand provides actionable approach for improving evaluation
2. **Reliability prediction**: Novel contribution of learning when judges will agree with humans
3. **Dynamic adaptation**: Advances beyond static aggregation methods
4. **Comprehensive evaluation**: 66 pages suggests thorough empirical validation

The paper's key contribution is shifting from "which judge is best" to "which judges are best *for this instance*" — recognizing that reliability is contextual, not intrinsic. This fundamentally undermines claims that LLM judges have stable evaluation capabilities.
