# Paper Analysis: Illusions of Reflection

## Metadata
- **arXiv ID**: 2510.18254
- **Title**: Illusions of reflection: open-ended task reveals systematic failures in Large Language Models' reflective reasoning
- **Authors**: Sion Weatherhead, Flora Salim, Aaron Belbasis
- **Affiliation**: University of New South Wales, Aurecon Group
- **Date**: October 2025
- **Venue**: arXiv preprint

---

## Core Claims

1. **LLM "reflection" does not function like human meta-reasoning** — it's fluent text, not functional correction
2. **Reflection repeats the SAME failure 85% of the time** — above chance benchmark (74.69%)
3. **Reasoning models (LRMs) show NO advantage over non-reasoning models** — no statistical difference
4. **Open-ended tasks reveal failures hidden in closed-ended benchmarks** — weaker signals expose limits
5. **"Gains" from reflection are chance-based, not principled** — second attempts sometimes succeed by luck

---

## Methodology

### Task: Cognitive Reflection Test (CRT) Item Generation

Models must create novel CRT items ("trick questions") that:
1. Have an intuitive-but-wrong answer
2. Have a single correct answer reachable via reflection
3. Are NOT copied from existing CRT items (novelty)
4. Are linguistically clear

### Two Conditions
- **Generation**: Invent items de novo (more open-ended)
- **Search-Identify**: Find existing trick questions and adapt (external anchors)

### Protocol (3 stages)
1. **Initial answer**: Model produces 4 candidate items
2. **Self-reflection**: Model explains failures and produces corrective advice
3. **Re-answer**: Model attempts again with reflection prepended

### Models Tested (8)
- **Reasoning Models**: o3, o4-mini, Gemini 2.5 Pro-Preview, DeepSeek Reasoner
- **Non-Reasoning**: GPT-4.1, Claude 3.7 Extended, Llama-3.3-70B, Llama-4 Maverick

### Evaluation
- 3 independent LLM evaluators (GPT-4.1, o4-mini, Gemini 2.5)
- Fail-fast rule: ANY evaluator fail = item fails
- Human validation: κ=0.54 agreement with LLM labels

---

## Key Evidence

### 1. Initial Performance is POOR

| Task | N Sessions | Initial Pass (x/expected) | Pass Rate |
|------|------------|---------------------------|-----------|
| Generation | 32 | 22/128 | **17.2%** |
| Search-Identify | 32 | 37/128 | **28.9%** |
| **Total** | **64** | **59/256** | **23.0%** |

**Critical**: Mean ~1 valid item per 4 attempts!

### 2. Reflection Provides Only MODEST Gains

| Condition | Initial | Post-Reflection | Δ (paired) |
|-----------|---------|-----------------|------------|
| Overall | 0.230 | 0.441 | +0.211 |
| Generation | 0.172 | 0.281 | +0.109 |
| Search-Identify | 0.289 | 0.602 | +0.313 |

**Critical**: Generation only improves by ~11% — still mostly failing!

### 3. Reflection REPEATS Same Failure (Above Chance!)

| Metric | Value |
|--------|-------|
| **Overall repeat rate** | **85.36%** |
| Chance benchmark | 74.69% |
| Excess above chance | +10.68 pp |
| Permutation p-value | **p=0.0001** |

**Per condition**:
- Generation: 85.3% same-category repeats (58/68)
- Search-Identify: 75.0% same-category repeats (39/52)

**Critical finding**: Reflection doesn't fix errors — it REPEATS them!

### 4. Reasoning Models Show NO Advantage

| Model Type | Mean Reflection Gain | SD | n |
|------------|---------------------|-----|---|
| **Reasoning** | **0.036** | 0.237 | 40 |
| Non-Reasoning | 0.111 | 0.171 | 24 |
| **Difference** | **-0.075** | | |

Statistical test:
- β = -0.075, CR1 95% CI [-0.113, -0.037]
- One-sided p = 0.9999 (NO superiority)
- Wild cluster bootstrap p = 1.0

**Critical**: Reasoning models are WORSE, not better!

### 5. Strategy Comparison

| Strategy | Effectiveness |
|----------|--------------|
| Explanation | Largest gain |
| Instructions | Not different from Retry |
| Keywords | Not different from Retry |
| **Retry (no scaffolding)** | **Indistinguishable from active strategies** |

**Critical**: Just trying again works as well as "reflection"!

### 6. Open-Endedness Matters

| Condition | Initial Pass | Reflection Gain |
|-----------|-------------|-----------------|
| Search-Identify | 28.9% | +31.3% |
| Generation | 17.2% | +10.9% |

**When solution space is larger (Generation)**:
- Initial success drops
- Reflection recovers LESS
- Error persistence is HIGHER

---

## The "Vignette" Example (Qualitative Evidence)

The paper provides a detailed case study:

> "In the search–identify condition, a model explicitly reasons that the lily-pad exponential-growth riddle is 'widely shared' and 'not part of CRT tests' (incorrect; it is a canonical CRT item), then reproduces that very item; on reattempt, it justifies the same choice and reproduces it again."

**Key insight**: "The reflection text summons the right labels ('do not copy', 'not a CRT item') but fails to activate the nested checks that would control generation"

> "The outcome is fluent self-critique without correction."

---

## Failure Modes Identified

### 1. Fluent Labels Without Constraint Binding
- Models produce correct-sounding labels ("do not copy", "novelty required")
- But fail to activate actual constraint checks
- Nested concepts not bound to generation

### 2. Plagiarism Recidivism
- After initial plagiarism flag, many reflections produce MORE plagiarism
- Sometimes EXACT same plagiarism repeated
- OR (Generation vs Search) = 0.501, p<.001 (lower in Search)

### 3. Chance-Based Recovery, Not Correction
- "Gains are not consistent with principled diagnosis and systematic correction"
- "Instead, it appears to be a chance event; resulting from having another attempt and occasionally producing valid items among continued failures"

### 4. More Open-Ended = Worse
- Generation (more open) has lower initial success
- Generation has smaller reflection gains
- Generation has higher error persistence

---

## Relationship to Other Papers

### Supports
- **Illusion of Insight (2601.00514)**: "Aha!" moments are illusory, don't constitute self-correction
- **Measuring Faithfulness (2307.13702)**: CoT text ≠ internal computation
- **CoT In The Wild (2503.08679)**: Unfaithfulness on natural tasks
- **Reasoning Models Don't Say (2505.05410)**: 25-40% faithfulness
- **Frontier LLMs Still Struggle (2507.07313)**: Memorization-based failures
- **OMEGA (2506.18880)**: RL training doesn't improve reflection; 85% same-failure rate parallels OMEGA's finding that RL can hurt

### Challenges
- **DeepSeek-R1 (2501.12948)**: Extended thinking doesn't help
- **Thinking Isn't Illusion (2507.17699)**: Reasoning models no better
- **s1 (2501.19393)**: Test-time compute doesn't guarantee improvement

### Extends
- **Renze & Guven [3]**: Tests reflection on OPEN-ended tasks (vs closed-ended)
- **Illusion of Insight**: Tests BEHAVIORAL evidence of reflection failure

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
- Paper is recent (October 2025)
- No direct rebuttals found on arXiv

### Potential Counter-Arguments

1. **"CRT generation is too specialized"**
   - Counter: Task is simple, rule-constrained, auditable
   - Counter: Domain knowledge available to models (can list CRT items)
   - Counter: Same patterns likely generalize to other constraint-following tasks

2. **"Temperature settings affect results"**
   - Counter: Authors use "standard public API configurations" (~0.7-1.0)
   - Counter: Reflects real-world usage patterns
   - Counter: Deterministic decoding would artificially dampen performance

3. **"LLM evaluators may be biased"**
   - Counter: Human validation shows κ=0.54 agreement
   - Counter: Fail-fast rule is conservative
   - Counter: Three independent evaluators reduce bias

4. **"Just need more compute/iterations"**
   - Counter: 85% repeat rate suggests MORE iterations = MORE same failures
   - Counter: Reasoning models (more compute) are WORSE

### Limitations (Authors Acknowledge)
- Single task domain (CRT items)
- LLM-based evaluation (though validated)
- Sample size (64 sessions, 8 models)
- API models only (no fine-tuning control)

---

## Key Quotes

> "First-pass performance is poor (often zero valid items; mean ≈1), and reflection yields only modest gains"

> "The second attempt frequently repeats the same violation, indicating 'corrective gains' arise largely from chance production of a valid item rather than error detection and principled, constraint-sensitive repair"

> "Models marketed for 'reasoning' show no advantage"

> "Current LLM 'reflection' lacks functional evidence of the active, goal-driven monitoring that helps humans respect constraints"

> "The reflection text summons the right labels ('do not copy', 'not a CRT item') but fails to activate the nested checks that would control generation"

> "Fluent self-critique without correction"

> "If LLM reflection cannot bind reasoning to specified constraints when external signals are weak or non-existent, reflection will entrench failure modes by rehearsing them"

---

## Implications for the Literature Review Thesis

**Literature Review Thesis**: LLM reasoning is practical but fundamentally predictive (pattern matching from training distributions), not genuinely generative.

### Strong Support for Multiple Claims

| Thesis Claim | Evidence from This Paper |
|--------------|--------------------------|
| CoT is performative | Fluent labels without constraint binding |
| "Thinking" doesn't work | Reasoning models NO advantage |
| Pattern matching limits | 85% same-failure repetition |
| External signals required | Open-ended tasks reveal failures |

### Key New Concept: "Fluent Self-Critique Without Correction"

This captures the pattern-matching thesis perfectly:
- Models PRODUCE text that looks like reflection
- Text contains correct labels and concepts
- But text is NOT functionally connected to generation
- Nested constraints not activated despite verbal mention

### Strengthens Against Position Significantly

1. **Behavioral evidence**: Not just performance metrics, but failure PATTERNS
2. **Above-chance repetition**: Proves it's not just "hard task"
3. **Reasoning model disadvantage**: Challenges "more thinking = better"
4. **Open-ended exposure**: Reveals what closed-ended benchmarks hide

### Critical Quote for Paper

> "Simply adding more scratchpad is unlikely to fix it"

This directly challenges the "scaling reasoning" hypothesis.

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [x] Paper graph updated
