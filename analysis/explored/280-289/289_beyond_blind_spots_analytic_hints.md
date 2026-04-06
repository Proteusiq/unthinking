# Beyond Blind Spots: Analytic Hints for Mitigating LLM-Based Evaluation Pitfalls

**arXiv**: [2512.16272](https://arxiv.org/abs/2512.16272)
**Date**: December 2025
**Authors**: Ora Nova Fandina, Eitan Farchi, Shmulik Froimovich, Raviv Gal, Wesam Ibraheem, Rami Katan, Alice Podolsky (IBM)

## Summary

Demonstrates that LLM judges have consistent "blind spots" - recurrent evaluation failures in domain-specific tasks. In COBOL code evaluation, production-deployed LLMs detect only 45-63% of errors. Rule-based analytic checkers catch errors LLMs miss. Injecting analytic hints into prompts improves detection to 74%, but LLMs can only utilize external signals - they cannot independently evaluate domain-specific correctness.

## Key Findings

```
┌─────────────────────────────────────────────────────────────────────┐
│  CORE INSIGHT: LLM judges have systematic blind spots               │
│  Production-tuned judges still miss 37-55% of domain errors         │
│  External analytic tools required to fill evaluation gaps           │
└─────────────────────────────────────────────────────────────────────┘
```

### The Evaluation Gap

| Configuration | Error Detection Rate |
|---------------|---------------------|
| Native LLM Judge | 45-63% |
| Analytic Checker alone | Higher precision, lacks explanation |
| LLM + Analytic Hints (naive) | 48-70% |
| LLM + Analytic Hints (optimized) | **74%** |

### Taxonomy of Blind Spots

Six categories of evaluation failures emerged from expert analysis:

1. **Multi-line reasoning failures**: Issues requiring non-local context
2. **Omission detection**: Missing initializations, status checks
3. **Execution order**: Using files before opening, skipping checks
4. **Implicit conventions**: COBOL-IMS patterns not in training
5. **Control flow misunderstanding**: Restart logic, implicit branching
6. **Data handling**: Implicit type conversions, field declarations

### Why Analytic Hints Work

```
┌─────────────────────────────────────────────────────────────────────┐
│  WHAT LLMs CAN DO:                                                  │
│  - Recognize patterns IN the input                                  │
│  - Generate explanations when directed                              │
│  - Follow hints about what to look for                              │
│                                                                     │
│  WHAT LLMs CANNOT DO:                                               │
│  - Detect what SHOULD be there but ISN'T                            │
│  - Simulate program semantics/execution                             │
│  - Reason about non-local context across code                       │
└─────────────────────────────────────────────────────────────────────┘
```

### The Trade-off Revealed

When hints are injected:
- Detection of analytic-flagged errors: up to 90%
- But rediscovery of native-judge issues: only 45-67%

> "By emphasizing analytic issues, they improved detection of these issues but deprioritized unhinted aspects."

This proves LLMs follow prompts, not reasoning about correctness.

## Relevance to Thesis

**Stance**: Supports

This paper provides strong industrial evidence that:

1. **Pattern matching, not understanding**: LLMs miss issues requiring semantic reasoning
2. **Omission blindness**: Cannot detect what's missing, only match what's present
3. **External scaffolding required**: Rule-based tools needed to fill gaps

### Connection to Broader Thesis

| Aspect | Evidence |
|--------|----------|
| Surface pattern focus | Misses non-local, semantic issues |
| Cannot simulate execution | Control flow, state tracking failures |
| Needs external crutches | Analytic hints improve detection |
| Evaluation is shallow | 45-63% detection on production judges |

## Key Quotes

> "LaaJs tend to struggle with multi-line reasoning, particularly when issues depend on non-local context or the interaction between distributed control structures."

> "Several error types reflect omissions rather than incorrect content... highlighting LaaJ's difficulty in detecting when something important is not present."

> "Current LaaJs lack the ability to simulate program semantics or execution state, instead relying heavily on surface-level patterns."

> "Foundation models often excel at recognizing what is in the input, but struggle to reason about what should be there and is missing."

## Methodology

- **100 COBOL programs**: Deliberately seeded with realistic errors
- **4 production LLM judges**: Llama-4-Maverick, Llama-3-405b, DeepSeek-v3, GPT-OSS-120B
- **Expert validation**: Domain experts constructed blind spot taxonomy
- **30+ error types**: Rule-based checker developed from taxonomy
- **Hint injection**: Naive and optimized prompt strategies tested

## Connections to Other Papers

- **Supports #267-276**: LLM-as-judge reliability theme
- **Supports #288-290**: Pattern-based evaluation limitations
- **Complements #274**: C2-Faith also found LLMs miss faithfulness issues

## Implications

1. **Industrial validation**: Even production-tuned judges fail systematically
2. **Hybrid systems required**: LLMs alone insufficient for critical evaluation
3. **Pattern matching confirmed**: LLMs detect presence, not absence

```
┌─────────────────────────────────────────────────────────────────────┐
│  THE INDUSTRIAL EVIDENCE:                                           │
│                                                                     │
│  These are production-deployed judges, carefully engineered         │
│  with human-in-the-loop testing. Yet they still miss 37-55%        │
│  of domain errors because they cannot reason about code -           │
│  only match surface patterns they've seen before.                   │
│                                                                     │
│  When hints point to errors, LLMs can explain them.                 │
│  Without hints, they cannot find them.                              │
│  This is retrieval + generation, not evaluation.                    │
└─────────────────────────────────────────────────────────────────────┘
```

## REBUTTALS

None identified. This is rigorous industrial research with expert validation. The 45-63% detection rate is empirically measured across 4 production LLM judges.

**Potential counter-argument**: COBOL is underrepresented in training data.
**Response**: The authors explicitly note this, but the *pattern* of blind spots (omission detection, execution simulation, non-local reasoning) reflects fundamental LLM limitations, not just domain coverage. The same issues appear in other evaluation literature.

---

*Analysis conducted following AGENTS.md methodology. Full paper read via arXiv HTML.*
