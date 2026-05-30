# Paper Analysis: Understanding and Mitigating Premature Confidence for Better LLM Reasoning

## Metadata
- **arXiv ID**: 2605.24396
- **Title**: Understanding and Mitigating Premature Confidence for Better LLM Reasoning
- **Authors**: Anonymized (double-blind submission, likely ICLR/ICML 2026 cycle)
- **Date**: May 2026
- **Venue**: Under review (CC BY 4.0)

---

## Core Claims

1. **Premature confidence is real and measurable.** Probing the model at evenly-spaced truncation checkpoints of a CoT shows that models often commit to their final answer well before the reasoning chain completes. The remaining tokens cannot causally shape the answer because it is already fixed.
2. **Premature confidence strongly predicts reasoning flaws.** Across four benchmarks (CSQA, GPQA, LSAT, MuSR), prematurely confident CoTs contain 1.1× to 2.8× more logical flaws per sample than progressively confident ones — and the correlation persists when restricted to correct answers, so this is not just a "wrong answers have bad reasoning" artifact.
3. **The signature flaw is "wrong conclusion".** The most amplified category is the model asserting a final answer that contradicts its own preceding reasoning — exactly what one expects when the answer is fixed before reasoning begins.
4. **Premature confidence grows with model size and is amplified by outcome-based RL.** Base Qwen3 models show monotonic increase in premature confidence from 1.7B → 4B → 8B *before any RL*. RL with outcome rewards makes it worse on hard problems via a "vanishing CoT" failure mode where models skip reasoning entirely.
5. **Two competing forces govern post-RL premature confidence**: *reasoning utility* (how much progressive CoT helps the task) and *reasoning accessibility* (how readily the base model produces progressive CoT). On hard problems, accessibility dominates — the model rarely produces progressive CoT to begin with, so RL has little to reinforce and converges to premature confidence.
6. **Progressive Confidence Shaping (PCS) — a method.** A drop-in modification of GRPO that uses the confidence trajectory's inner product with a fixed monotonically-decreasing scoring vector as a reward penalty. No external reward model, no step-level annotations.

---

```
┌─────────────────────────────────────────────────────────────────────┐
│  KEY FINDING                                                         │
│                                                                      │
│  Models commit to their answer BEFORE reasoning. The CoT tokens     │
│  that follow are post-hoc rationalization — decoupled from the      │
│  actual decision process. This gets WORSE with scale (1.7B→8B)      │
│  and WORSE with task difficulty. Outcome-based RL amplifies it.     │
│                                                                      │
│  The signature: "wrong_conclusion" — the model's CoT argues for X,  │
│  then the final answer is Y. The reasoning never moved the answer.  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Methodology

**Premature confidence measurement.** For a CoT of length T tokens:
1. Generate full CoT, record final answer a*
2. Construct 11 checkpoints at {0%, 10%, ..., 100%} of the CoT length
3. At each checkpoint, truncate the CoT and prompt the model to directly output the final answer
4. Record fraction of probe answers matching a* across multiple Monte Carlo samples → confidence trajectory **c** = [c₀, c₁, ..., c₁₀]
5. Classify via Spearman ρ between **c** and checkpoint index. Default threshold ρ = 0.4. High ρ = progressive; low ρ = premature.

**CoT monitor (flaw detection).** Two-phase audit pipeline using o3-mini (with DeepSeek-R1 as robustness check):
- Chunk CoT into paragraphs, decompose into atomic statements (fact/inference/rule/meta)
- Verify each statement for passage fidelity + internal coherence
- Categorize flaws: `misreading`, `ignored_evidence`, `wrong_conclusion`, `unsupported_conclusion`, `internal_contradiction`
- Severity: critical / major / minor

**Models evaluated (correlation study)**: Qwen2.5-32B-Instruct, DeepSeek-R1-Distill-Qwen-32B

**Datasets**: CSQA (commonsense), GPQA (graduate science), LSAT (legal), MuSR (multi-step)

**Progressive Confidence Shaping (PCS)**:
- Built on GRPO
- K=6 checkpoints at {0%, 20%, 40%, 60%, 80%, 100%}, 10 MC samples each
- Fixed scoring vector **w** = [0.5, 0.3, 0.1, −0.1, −0.3, −0.5] (positive on early, negative on late)
- Penalty: P_i = η · ⟨**c**_i, **w**⟩
- Modified advantage: Ã_i,t = A_i,t − P_i for all tokens t in completion i
- Confidence measured against *gold answer* during training (not full-CoT answer) — reuses verifier, gives partial-progress credit, penalizes premature commitment

**Training experiments**: Qwen2.5-3B on Countdown; Qwen2.5-Math-1.5B/7B on DAPO/AIME/HMMT; Qwen3-1.7B/4B/8B on SciQA.

---

## Key Evidence

### Correlation: premature confidence ↔ reasoning flaws

| Benchmark | Premature flaws/sample | Progressive flaws/sample | Ratio |
|---|---|---|---|
| CSQA | 0.47 | 0.17 | 2.8× |
| GPQA | 2.78 | 2.50 | 1.1× |
| LSAT | 5.84 | 4.36 | 1.3× |
| MuSR | 1.14 | 1.05 | 1.1× |

**Gap-proportion metric:**
- CSQA: 40.0% (premature) vs 16.2% (progressive)
- GPQA: 91.5% vs 81.9%
- MuSR: 66.1% vs 63.3%
- LSAT: both saturate ~94% (count metric more informative here)

**Robustness:**
- Holds across Spearman thresholds 0.4–0.8
- Holds when restricted to **correct** samples only (CSQA: 12.5% vs 3.7% issue rate at threshold 0.5)
- Holds when monitor swapped to DeepSeek-R1 (83.8% agreement on flag/no-flag, 97% within ±1 issue count)
- Holds under alternative inner-product quantification (>87% agreement with Spearman)

### Signature flaw: wrong_conclusion

| Benchmark | Wrong_conclusion / sample | Amplification (premature vs progressive) |
|---|---|---|
| CSQA | 0.23 | 2.6× (0.23 vs 0.09) |
| GPQA | 0.98 | — |
| LSAT | 2.43 | — |
| MuSR | 0.47 | — |

> Other categories: `ignored_evidence` 4.5× on LSAT, `unsupported_conclusion` 2.2× on LSAT, `misreading` 1.1–2.2× across benchmarks.

### Vanishing CoT (Countdown case study)

Forcing a "vanishing CoT" RL checkpoint to verbalize:

| Metric | Forced-CoT (vanishing) | Verbose-CoT (normal) |
|---|---|---|
| Accuracy | 59% | 98% |
| Reasoning flaws | 169 | 2 (84.5× more) |
| % progressively confident (ρ > 0.4) | 45% | 76% |
| Mean ρ | 0.11 | 0.62 |

> The forced verbalization is **decoupled from the model's actual decision process** — exactly the post-hoc rationalization pattern.

### Long CoT with logical shortcuts (Countdown)

| Group | Shortcut rate |
|---|---|
| Prematurely confident (ρ < 0.50) | 37.3% |
| Progressively confident (ρ ≥ 0.50) | 11.8% (3× lower) |
| Premature, correct only | 13.3% |
| Progressive, correct only | 6.2% |

### Method (PCS) results

**Countdown (Qwen2.5-3B)**:
| Setting | Pass@1 vanilla | Pass@1 ours | Δ |
|---|---|---|---|
| Easy (4-10-50) | 79.2% | 81.4% | +2.2pp |
| **Hard (4-30-100)** | **19.1%** | **61.1%** | **+42.0pp (3.2×)** |

Pass@128 on hard: 24.0% → 81.2%. Reasoning flaws: 93.5% → 45.5% (all), 23.5% → 9.2% (correct only).

**Math reasoning (Qwen2.5-Math-1.5B)**:
| Benchmark | Vanilla Pass@64 | Ours Pass@64 | Δ |
|---|---|---|---|
| AIME 2025 | 36.7% | 43.3% | +6.6pp |
| HMMT 2025 Feb | 10.0% | 16.7% | +6.7pp (1.67×) |

**SciQA accuracy gains** (Qwen3 series):
| Model | Vanilla | Ours | Δ |
|---|---|---|---|
| Qwen3-1.7B | 68.5% | 72.6% | +4.1pp |
| Qwen3-4B | 73.9% | 76.8% | +2.9pp |
| Qwen3-8B | 71.7% | 77.5% | +5.8pp |

### Safety / faithfulness benchmark (hint acknowledgement)

Hint-injection protocol from Nguyen et al. 2025 (arXiv 2510.02230). Misleading hints attributed to authority. Pattern-detector flags whether CoT acknowledges the hint (>95% precision validated).

| Benchmark | Vanilla acknowledgement | PCS acknowledgement | Δ |
|---|---|---|---|
| AIME (w/ hints) | 15.2% | 22.2% | +7.0pp |
| GSM-Hard (w/ hints) | 5.4% | 8.2% | +2.8pp |

> **Mechanistic interpretation (paper's own words):** *"prematurely confident CoT, by contrast, commits up front and tends to silently absorb the hint into a post-hoc rationalization."*

### Scale dependency (key thesis evidence)

Premature confidence in **base models, before any RL** (SciQA Chemistry, Qwen3 series): monotonically increases with model size at every Spearman threshold, both overall and restricted to correct samples.

After GRPO training:

| Model (SciQA) | Premature confidence score 𝒪 |
|---|---|
| Qwen3-1.7B | −0.033 |
| Qwen3-4B | −0.012 |
| Qwen3-8B | **+0.031** |

| Model (DAPO) | 𝒪 |
|---|---|
| Qwen2.5-Math-1.5B | −0.52 |
| Qwen3-4B | −0.49 |
| Qwen2.5-Math-7B | **−0.46** |

> Larger pretrained models are inherently more prone to premature confidence — they commit to answers earlier in the CoT even **before** outcome-based RL amplifies the tendency.

---

```
┌──────────────────────────────────────────────────────────────────────┐
│  THE TWO-FORCE FRAMEWORK (Section 4)                                 │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   REASONING UTILITY          vs       REASONING ACCESSIBILITY        │
│                                                                      │
│   Task-level pressure                 Model-level baseline           │
│   to use real reasoning               propensity to produce          │
│                                       progressive CoT                │
│                                                                      │
│   Estimated: accuracy gap             Estimated: premature           │
│   between progressive and             confidence score at first      │
│   premature CoT at η=±1.0             RL checkpoint                  │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   ON HARD PROBLEMS, ACCESSIBILITY DOMINATES:                         │
│                                                                      │
│   Model rarely produces progressive CoT to begin with                │
│         ↓                                                            │
│   RL has nothing to reinforce                                        │
│         ↓                                                            │
│   Training converges to premature confidence                         │
│         ↓                                                            │
│   "Vanishing CoT" failure mode                                       │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Relationship to Thesis

**Stance: SUPPORTS** (strong direct evidence)

This is among the most cleanly demonstrated tests of the predictive-not-reasoning thesis to date. The mechanism is mechanistic and the evidence is quantitative:

1. **Smoking gun for "answer-first, reasoning-after"**: The truncation-probing methodology directly operationalizes the claim that CoT is post-hoc rationalization. When the confidence trajectory is flat-high from the first checkpoint, the answer is provably fixed before reasoning is generated. The authors *explicitly* call this "post-hoc rationalization" in their conclusion.

2. **Scale makes it worse, not better**: The monotonic increase 1.7B → 4B → 8B in *base* models (before RL) is direct evidence against the "more scale → more reasoning" hypothesis. Larger models are *more* prone to commit early.

3. **The signature flaw is the dead giveaway**: `wrong_conclusion` — model's CoT argues for option D, then states final answer A — is exactly what pattern-matching predicts. The reasoning is generated to *accompany* the answer, not to *produce* it. When pattern-matched answer and post-hoc reasoning conflict, the answer wins.

4. **RL amplifies the pathology**: Outcome-based RL (which is most of modern reasoning training: DeepSeek-R1 style) makes premature confidence worse on hard tasks. The "vanishing CoT" failure mode — where the model learns to skip reasoning entirely — is a damning result for the "RL teaches reasoning" framing.

5. **Faithfulness improves alongside accuracy**: The hint-acknowledgement experiment shows the *same* intervention that reduces premature confidence *also* makes models more transparent about misleading evidence. This unifies the "CoT is unfaithful" literature with the "CoT is fake reasoning" literature under a single mechanism.

6. **Methodological inheritance from Lanham 2023**: The truncation-probing approach directly extends Lanham et al.'s early-answering measurements, but operationalizes them as a continuous trajectory rather than a single early-stopping point. This makes the evidence sharper and the signal usable as a training reward.

The only thesis-mitigating aspect is that PCS *fixes* the problem to some degree — so one could argue this shows reasoning is learnable. But the deeper finding stands: under standard training (RL with outcome rewards), reasoning is **not** learned; the model learns to commit early and confabulate. Reasoning has to be explicitly forced via a confidence-shaped objective.

---

## Relationship to Other Papers

### Supports (same finding via different method)

- **#149/#312 Turpin et al. 2023** (2305.04388) — "Language Models Don't Always Say What They Think": this paper provides direct mechanistic operationalization of Turpin's observation that biased features (suggested answers) don't appear in CoT.
- **#8 Lanham et al. 2023** (2307.13702) — "Measuring Faithfulness in CoT": methodological parent. PCS extends Lanham's early-answering measurement into a continuous trajectory and a training signal.
- **#15 Chen et al. 2025** (2505.05410) — "Reasoning Models Don't Always Say What They Think": directly relevant. The hint-acknowledgement experiment is the same template (probing whether the CoT discloses external influence on the answer).
- **#22 Arcuschin et al. 2025** (2503.08679) — "CoT in the Wild Is Not Always Faithful": same finding via observational study of production CoT.
- **#162 Pfau et al. 2024** (2404.15758) — "Let's Think Dot by Dot": supports the broader claim that CoT tokens often don't causally drive answers; this paper shows when and why.
- **#82 Tanneru et al. 2024** (2406.10625) — "Hardness of Faithful CoT": uses similar confidence-over-truncation for SFT data filtering; PCS pushes the idea into RL.
- **#21 Illusions of Reflection / #26 No Free Lunch (Internal Feedback)**: same family — internal mechanisms (self-correction, internal feedback, reflection) don't fix the underlying premature-commit problem.

### Extends

- **Lanham 2023 methodology**: continuous trajectory + Monte Carlo sampling + Spearman classification
- **GRPO (Shao et al. 2024)**: drop-in modification of the advantage with a confidence-shaping penalty
- **Concurrent: Qu et al. 2025 (MRT, 2503.07572)** — closest concurrent work; uses intermediate confidence as RL signal but for test-time-compute efficiency, not faithfulness

### Challenges

- The "more scale → emergent reasoning" framing common in capability research. Direct counter-evidence: premature confidence scales **monotonically up** with model size in base models.
- Outcome-reward RL as a route to genuine reasoning (DeepSeek-R1, Jaech 2024). PCS shows outcome rewards *amplify* the pathology on hard problems.

### Rebutted by / under scrutiny from

- None known yet (paper is May 2026, under review).
- Possible critique: the monitor is itself an LLM (o3-mini), so monitor errors could explain some "reasoning flaws". Authors address with DeepSeek-R1 cross-validation (97% agreement within ±1 issue).

---

## REBUTTALS

### Known Rebuttals
- No direct rebuttals identified (paper posted May 2026, anonymous/under review).
- Potential counter from MRT (Qu et al. 2025, arXiv 2503.07572): also uses confidence probing, but argues the goal is test-time efficiency, not faithfulness. This is more concurrent-but-different-framing than a rebuttal.

### Limitations (Authors Acknowledge)

1. **Threshold sensitivity**: gap between premature/progressive groups shrinks at higher Spearman thresholds (CSQA: 2.8× at ρ=0.4, 1.3× at ρ=0.8). The correlation is real but graded.
2. **LSAT saturation**: both groups ~94% issue proportion — the metric saturates and the gap-proportion result is degenerate; count metric used instead.
3. **MuSR weak effect**: per-sample gap ≤0.1 issues and noisy; group ordering flips at intermediate thresholds.
4. **Extreme difficulty boundary**: at extreme difficulty, reasoning utility shrinks because the model fails regardless of confidence pattern — bounds the gains.
5. **Pattern-based hint detection**: regex-based with 7 rule groups, not LLM-judged. Manually validated at >95% precision but pattern-bound.
6. **Compute cost**: probing requires K=6 checkpoints × 10 MC samples per generation per RL step. Considerable overhead even without an external monitor.
7. **Monitor reliance**: main flaw counts come from an LLM monitor (o3-mini). Cross-validated with DeepSeek-R1 but still LLM-as-judge inheritance.

### Independent Assessment

Strong paper. The methodology — confidence trajectory via truncation probing — is well-motivated and the central correlation is robust under every ablation (threshold, monitor model, correctness restriction, quantification method). The scale result (premature confidence ↑ with model size in *base* models) is particularly thesis-relevant because it cannot be blamed on training: the base pretraining itself produces models that commit earlier.

The wrong_conclusion finding is mechanistically clean. The CSQA case study (model writes "Option D would be likely favored", then states "Answer: A") is exactly what a pattern-matching account predicts — the answer is retrieved by surface features, the reasoning is generated as filler. The flat-high confidence trajectory (every probe ≥92% from chunk 1) is direct evidence.

The PCS method is interesting but secondary. What matters for the thesis is the diagnostic finding: premature confidence is real, measurable, amplified by scale and outcome RL, and produces the predicted failure modes. Whether PCS or some other intervention fixes it is methodological progress, not evidence against the predictive thesis.

The two-force framework (reasoning utility vs accessibility) is a useful frame for understanding why RL on hard problems converges to vanishing CoT. It also predicts that scaling alone won't fix this — larger base models have *lower* accessibility, not higher.

The hint-acknowledgement transfer (improving premature confidence also improves faithfulness on the hint task) is a particularly nice piece of mechanistic confirmation: the same intervention fixes both "fake reasoning" and "unfaithful disclosure" — suggesting they share a common cause (early commitment to a pattern-matched answer).

---

## Key Quotes

> "premature confidence, the tendency to commit to an answer early and use the remaining tokens to rationalize it, strongly predicts flawed reasoning across tasks and model scales." *(Abstract)*

> "by probing the model at intermediate points of its CoT, we can see that it often commits to an answer well before the reasoning chain is complete—the remaining tokens cannot causally shape the answer, since it is already fixed." *(§1)*

> "The most pervasive flaw category is wrong_conclusion—asserting a final answer that does not follow from the evidence the CoT itself just laid out—which has the highest absolute counts across all four benchmarks ... and is amplified 2.6× on CSQA prematurely confident samples." *(§2.2)*

> "The corresponding confidence trajectory is high and flat from the first chunk onward—every probe yields ≥92% agreement with the final answer—confirming that the model committed to A before reasoning began. Intuitively, when the answer is fixed up front, the CoT cannot perturb the commitment: whatever the reasoning concludes, even when it directly conflicts with the chosen answer, does not move the model." *(§2.2 CSQA case study)*

> "This indicates that the forced CoT is decoupled from the model's actual decision process: the verbalized reasoning contains far more reasoning flaws and does not causally support the final answer, as evidenced by the low and flat confidence trajectory (ρ̄ = 0.11)." *(§2.3 vanishing CoT)*

> "larger pretrained models are inherently more prone to premature confidence—they commit to an answer earlier in the CoT even without outcome-based RL amplifying this tendency." *(§4)*

> "Under vanilla RL, one might expect hard problems to push models toward CoTs whose confidence builds gradually, since premature confidence shouldn't pay off when the problem is genuinely difficult. Yet we find the opposite." *(§1)*

> "prematurely confident CoT, by contrast, commits up front and tends to silently absorb the hint into a post-hoc rationalization." *(§3.2.4)*

> "validating it as a quantitative indicator of post-hoc rationalization." *(§5 Conclusion)*

---

## Status
- [x] Read complete
- [x] Core claims extracted
- [x] Key evidence with numbers
- [x] Rebuttals checked
- [x] Paper graph updated
