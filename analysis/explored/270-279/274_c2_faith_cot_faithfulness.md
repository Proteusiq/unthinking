# Paper Analysis: C2-Faith: Benchmarking LLM Judges for Causal and Coverage Faithfulness in Chain-of-Thought Reasoning

## Metadata
- **arXiv ID**: 2603.05167
- **Title**: C2-Faith: Benchmarking LLM Judges for Causal and Coverage Faithfulness in Chain-of-Thought Reasoning
- **Authors**: Avni Mittal (Microsoft), Rauno Arike
- **Date**: Mar 2026
- **Venue**: arXiv preprint

---

## Core Claims

1. **Detection-localization gap**: LLM judges can detect causal errors (88-94%) but struggle to localize the exact step (55-68% exact match) — a 26-33 percentage point gap
2. **Coverage scores are systematically inflated**: All judges over-credit incomplete reasoning; at 70% step deletion, mean scores remain ~3.0/4.0
3. **No single judge dominates all tasks**: Rankings invert between binary detection (DeepSeek leads) and localization (o4-mini leads)
4. **Early-prediction bias in localization**: All judges systematically predict errors earlier than they actually occur (mean -0.44 to -1.20 steps)
5. **DeepSeek ceiling collapse on coverage**: Near-zero correlation (ρ=-0.006) with ground truth at low deletion rates; 95% of scores are maximum (4/4)

---

## Methodology

**Benchmark**: C2-Faith — controlled perturbations from PRM800K verified reasoning chains

**Two Dimensions of Faithfulness:**
1. **Causality**: Does each step logically follow from prior context?
2. **Coverage**: Are essential intermediate inferences present?

**Perturbation Types:**
- Acausal replacements: Replace one middle step with LLM-generated logically inconsistent variant
- Coverage deletions: Uniformly remove 10%/30%/50%/70% of middle-region steps

**Three Evaluation Tasks:**
- Exp 1: Binary causal detection (flagged vs not flagged)
- Exp 2: Causal step localization (predict exact error index)
- Coverage scoring: 0-4 scale against reference labels

**Judges Tested**: GPT-4.1, DeepSeek-V3.1, o4-mini

**Dataset**: 450 perfect chains from PRM800K (all steps labeled +1), median 13 steps

---

## Key Evidence

```
┌─────────────────────────────────────────────────────────────────────┐
│              DETECTION-LOCALIZATION GAP                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Exp 1: Binary Detection    Exp 2: Exact Localization    GAP       │
│  ─────────────────────────────────────────────────────────────────  │
│  GPT-4.1:     82.7%         57.6%                        25.1 pp   │
│  DeepSeek:    94.7%         55.8%                        38.9 pp   │
│  o4-mini:     92.0%         68.0%                        24.0 pp   │
│                                                                     │
│  KEY: Judges detect "something is wrong" but can't pinpoint where   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Coverage Inflation Results

| Deletion Rate | GT Mean | GPT-4.1 | DeepSeek | o4-mini | Bias Range |
|---------------|---------|---------|----------|---------|------------|
| 10% | 3.47 | 3.82 | 3.90 | 3.75 | +0.28 to +0.43 |
| 30% | 3.06 | 3.74 | 3.86 | 3.63 | +0.57 to +0.79 |
| 50% | 2.44 | 3.39 | 3.67 | 3.26 | +0.82 to +1.22 |
| 70% | 2.17 | 2.95 | 3.29 | 2.91 | +0.74 to +1.12 |

```
┌─────────────────────────────────────────────────────────────────────┐
│              DEEPSEEK CEILING COLLAPSE                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  At 10% deletion (only 10% of steps removed):                       │
│    - DeepSeek assigns score 4 to 95.1% of examples                  │
│    - Spearman ρ = -0.006 (p=0.906) — essentially random             │
│                                                                     │
│  At 70% deletion (70% of steps removed):                            │
│    - DeepSeek still assigns score 4 to 64.1% of examples            │
│    - GPT-4.1 assigns score 4 to only 40.7%                          │
│                                                                     │
│  IMPLICATION: DeepSeek responds to surface coherence, not content   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Early-Prediction Bias

All judges predict error position EARLIER than actual:
- GPT-4.1: -0.82 steps
- DeepSeek-V3.1: -0.44 steps
- o4-mini: -1.20 steps (highest exact match but largest early bias)

### Math Symbol Density Predicts Success

Correctly classified steps: mean density 0.235
Incorrectly classified steps: mean density 0.139 (41% lower)

**Implication**: Judges rely on symbolic anchors for verification; natural language steps evade detection.

---

## Relevance to Thesis

**Strong support for the thesis.**

The paper demonstrates multiple failures in LLM judge reasoning:

1. **Detection without understanding**: High detection rates but low localization accuracy shows judges pattern-match to "something wrong" without genuine comprehension of logical structure

2. **Surface coherence over semantic completeness**: Coverage inflation shows judges evaluate "does this sound complete" rather than verifying step-by-step inference chains

3. **Symbol dependence**: Math-heavy steps are detected more easily not because judges understand math, but because symbolic anchors provide easy comparison points

4. **Early-prediction bias**: Systematic tendency to predict errors earlier suggests judges follow heuristics (flag early when uncertain) rather than reasoning through chains

The DeepSeek ceiling collapse is particularly damning — assigning maximum coverage scores to chains missing 70% of steps reveals no genuine completeness assessment.

---

## Stance: SUPPORTS

**Classification**: Supports the thesis that LLMs don't genuinely reason

**Confidence**: High — controlled perturbations with exact ground truth, multiple judges, statistical validation

---

## Key Quotes

> "A consistent pattern across all models is that detection rates substantially exceed exact-match accuracy... showing that pinpointing the wrong step is far harder than just noticing that something is wrong."

> "All judges treat 'does this sound complete' differently from 'are all reasoning steps present.'"

> "DeepSeek's global coherence heuristic dominates over local completeness checking: even when 70% of middle steps are deleted, the remaining 30% form a coherent-looking fragment that DeepSeek treats as complete."

> "Steps rich in symbolic expressions provide concrete anchors that the judge can verify against the preceding context... In contrast, steps dominated by natural-language reasoning lack such anchors, and the judge must rely on semantic plausibility."

---

## Rebuttals

### Papers This Paper Challenges

- **LLM-as-Judge reliability claims**: Controlled experiments reveal systematic gaps between detection and understanding
- **Process reward model reliability**: PRMs built on judge labels may inherit these blindspots

### Counter-Evidence

None identified. Paper provides controlled diagnostic, not theoretical claims.

---

## Connections to Other Papers

| Paper | Relationship |
|-------|--------------|
| #267 (2411.15594) Survey LLM-as-Judge | Extends: Provides controlled benchmark for documented judge limitations |
| #268 (2412.12509) LLM Judgment Reliability | Complements: C2-Faith adds causality/coverage dimensions to reliability analysis |
| #271 (2603.08412) Choice Blindness | Extends: Detection-localization gap parallels shallow detection in choice blindness |
| #272 (2603.05485) Bias-Bounded Evaluation | Complements: A-BB bounds overall bias; C2-Faith reveals task-specific failures |
| #273 (2603.05399) Judge Reliability Harness | Complements: JRH tests formatting/semantic; C2-Faith tests causal/coverage |
| #8 (2307.13702) CoT Faithfulness | Extends: Provides benchmark for measuring faithfulness that #8 documented as limited |

---

## Methodological Notes

**Strengths:**
- Controlled perturbations with exact ground truth labels
- Two complementary dimensions (causality + coverage)
- Multiple task framings reveal different failure modes
- Statistical validation (McNemar, bootstrap CIs, Spearman)
- Edit-type taxonomy in ablations

**Limitations:**
- Mathematical domain only (PRM800K/MATH)
- GT coverage labels are GPT-4.1 generated
- Acausal negations may be detectable via surface cues
- 450 reference chains (moderate scale)

---

## Impact Assessment

**HIGH IMPACT** for LLM judge evaluation:

1. **Novel benchmark**: First to separate causality and coverage with controlled perturbations
2. **Detection-localization gap**: New diagnostic revealing shallow understanding
3. **Coverage inflation**: Quantifies systematic over-crediting of incomplete reasoning
4. **Practical guidance**: Task-specific judge recommendations backed by evidence

The finding that judges can detect but not localize errors is a precise analogue of "pattern matching without understanding" — knowing something is wrong without knowing why is the signature of heuristic rather than genuine reasoning.
