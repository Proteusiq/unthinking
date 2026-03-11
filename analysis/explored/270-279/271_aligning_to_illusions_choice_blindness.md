# Paper Analysis: Aligning to Illusions: Choice Blindness in Human and AI Feedback

## Metadata
- **arXiv ID**: 2603.08412
- **Title**: Aligning to Illusions: Choice Blindness in Human and AI Feedback
- **Authors**: Wenbin Wu
- **Date**: Mar 2026

---

## Core Claims

1. **RLHF rests on unstable preferences** — 91% of surreptitiously swapped human preferences go undetected, extending "choice blindness" to text evaluation
2. **LLM judge detection is shallow** — removing prior reasoning from context causes blindness to surge from near-zero to >50%
3. **Social pressure induces universal compliance** — explicit pressure makes LLMs adopt presented (wrong) preferences
4. **Reward signals are noise-tolerant but policy is not** — 16-33% label corruption needed before reward halves, but pairwise accuracy unchanged
5. **Proxy model reports lie** — at 50% corruption, Best-of-N produces no improvement over random, while proxy reports monotonically increasing scores

---

## Methodology

Three experiments spanning the RLHF preference pipeline:

1. **Human choice blindness study**: Third-person evaluative comparison of unfamiliar text with surreptitious preference swaps
2. **LLM judge study**: 15 LLM judges tested for detection capability under context removal and social pressure conditions
3. **Dose-response experiment**: Two architectures (86M to 2B parameters), measuring reward signal degradation under label corruption

---

## Key Evidence

```
┌─────────────────────────────────────────────────────────────────────┐
│                    CHOICE BLINDNESS RATES                           │
├─────────────────────────────────────────────────────────────────────┤
│  Human annotators:        91% swaps undetected                      │
│  LLMs (with context):     Near-zero blindness                       │
│  LLMs (no context):       >50% blindness                            │
│  LLMs (social pressure):  Near-universal compliance                 │
│                                                                     │
│  KEY: Detection relies on text matching, not self-monitoring        │
└─────────────────────────────────────────────────────────────────────┘
```

| Finding | Number | Context |
|---------|--------|---------|
| Human swap detection failure | 91% | Surreptitiously swapped preferences undetected |
| LLM blindness (no prior reasoning) | >50% | When context removed, blindness surges |
| Label corruption threshold | 16-33% | Before reward signal halves |
| Best-of-N at 50% corruption | 0% improvement | Random sampling equivalence |
| Proxy model behavior | Monotonic increase | Reports increasing scores despite policy degradation |

### The Preference Construction Problem

```
┌─────────────────────────────────────────────────────────────────────┐
│           WHAT RLHF ASSUMES        vs       WHAT THE PAPER FINDS    │
├─────────────────────────────────────────────────────────────────────┤
│  Preferences reflect stable        │  Preferences are constructed   │
│  internal states                   │  by elicitation context        │
│                                    │                                │
│  Human metacognition can           │  91% swaps go undetected       │
│  detect preference errors          │                                │
│                                    │                                │
│  LLM judges provide stable         │  Detection is shallow text     │
│  self-monitoring                   │  matching, not understanding   │
│                                    │                                │
│  Evaluation metrics catch          │  Pairwise accuracy unchanged   │
│  corruption                        │  even at high corruption       │
└─────────────────────────────────────────────────────────────────────┘
```

### Dose-Response Corruption Analysis

The paper shows a critical disconnect between metrics and outcomes:

- **16-33% corruption**: Required before reward signal halves
- **Pairwise accuracy**: Virtually unchanged throughout corruption range
- **Best-of-N at 50%**: No improvement over random sampling
- **Proxy model reports**: Continue showing improvement (lying)

This means standard evaluation metrics cannot detect the corruption that destroys policy quality.

---

## Relevance to Thesis

**Strong support for the thesis.**

This paper reveals a fundamental flaw in the RLHF feedback loop — preferences are not stable internal states but constructed artifacts of elicitation context. Key implications:

1. **Human preferences are unreliable** — 91% swap detection failure means human feedback may be reconstructed post-hoc
2. **LLM judges are shallow** — detection relies on text matching, not genuine understanding or self-monitoring
3. **Metrics deceive** — standard evaluation cannot detect corruption that destroys downstream policy

The "preference construction problem" means the signal entering RLHF is shaped by context in ways that neither humans nor LLMs can detect. This directly supports the thesis that LLMs (and their evaluation) operate through pattern-matching rather than genuine understanding.

---

## Stance: SUPPORTS

**Classification**: Supports the thesis that LLMs don't genuinely reason

**Confidence**: High — controlled experiments with quantified failure rates

---

## Key Quotes

> "91% of surreptitiously swapped preferences go undetected, extending choice blindness to third-person evaluative comparison of unfamiliar text."

> "Detection relies on shallow text matching rather than genuine self-monitoring: removing prior reasoning from context causes blindness to surge from near-zero to over 50%."

> "At 50% corruption, reward-guided selection produces no improvement over random sampling, while the proxy model reports monotonically increasing scores."

> "Together, these results reveal a preference construction problem: the signal entering RLHF is shaped by elicitation context in ways that neither human metacognition, LLM self-monitoring, nor standard evaluation metrics can detect."

---

## Rebuttals

### Papers This Paper Challenges

- **RLHF Papers (various)**: Foundational assumption of stable preferences is violated
- **LLM-as-Judge reliability claims**: Detection is shallow text matching, not genuine self-monitoring

### Counter-Evidence

None identified. The controlled experiments are methodologically strong.

---

## Connections to Other Papers

| Paper | Relationship |
|-------|--------------|
| #267 (2411.15594) Survey LLM-as-Judge | Extends: Shows shallow detection mechanism behind reported biases |
| #268 (2412.12509) LLM Judgment Reliability | Extends: Choice blindness explains why single-shot masks variability |
| #117 (2601.15436) Elusive Sycophancy | Supports: Social pressure → universal compliance mechanism |
| #128 (2310.13548) Towards Understanding Sycophancy | Extends: Demonstrates sycophancy under explicit social pressure |

---

## Methodological Notes

**Strengths:**
- Controlled experiments with clear manipulation
- Quantified failure rates across multiple conditions
- Dose-response design shows systematic relationship
- Tests both human and LLM components of RLHF pipeline

**Limitations:**
- Single author — independent replication valuable
- Specific to pairwise preference evaluation

---

## Impact Assessment

**HIGH IMPACT** for LLM-as-Judge reliability literature:

1. Demonstrates fundamental flaw in preference feedback assumptions
2. Shows LLM judge "detection" is surface-level text matching
3. Reveals metric-policy disconnect (metrics lie about corruption)
4. Extends choice blindness from psychology to AI alignment

The paper suggests RLHF may be optimizing for elicitation artifacts rather than genuine preferences — a serious concern for alignment research.
