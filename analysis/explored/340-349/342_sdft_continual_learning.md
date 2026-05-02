# Paper 342: Self-Distillation Enables Continual Learning (SDFT)

## Metadata
- **arXiv**: 2601.19897 (v1, Jan 2026)
- **Title**: Self-Distillation Enables Continual Learning
- **Authors**: Idan Shenfeld, Mehul Damani, Jonas Hübotter, Pulkit Agrawal
- **Affiliation**: MIT (Improbable AI Lab) + ETH Zürich
- **Project page**: [self-distillation.github.io/SDFT.html](https://self-distillation.github.io/SDFT.html)
- **Code**: [github.com/idanshen/Self-Distillation](https://github.com/idanshen/Self-Distillation) (524★ / 59 forks; Apache-2.0; TRL-based; H200 single-GPU reproducible)
- **Released checkpoints**: [improbableaimit/sdft-tooluse-7b](https://huggingface.co/improbableaimit/sdft-tooluse-7b), [improbableaimit/sdft-science-7b](https://huggingface.co/improbableaimit/sdft-science-7b)
- **Stance**: SUPPORTS (strongly) — methodological paper whose central premise is direct mechanistic evidence for the predictive thesis.
- **Cluster**: `finetuning`

> **Important code/paper discrepancy** (resolved in [issue #5](https://github.com/idanshen/Self-Distillation/issues/5)):
> The paper formulates the loss as **reverse KL** (`D_KL(student ‖ teacher)`), but author confirms **all paper results were produced with on-policy sampling + per-token forward KL** (similar to the [GKD paper, 2306.13649](https://arxiv.org/abs/2306.13649)). The repo defaults to `alpha=0.0` = forward KL; arXiv update pending. The mechanistic interpretation in this analysis is unaffected (teacher-as-conditioned-self), but the specific KL-direction claim should be read with this caveat.

---

## Core Finding

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  THE IN-CONTEXT ASSUMPTION (formal statement, §3)                    │
│                                                                      │
│      π(y | x, c)  ≈  π*_{k+1}(y | x)                                 │
│                                                                      │
│      "demonstration-conditioned base model ≈ optimal next policy"    │
│                                                                      │
│  Empirical validation (Tool Use, Qwen2.5-7B-Instruct):               │
│    • Base model, no demo:         42% accuracy                       │
│    • Base model + demo in prompt: 100% accuracy                      │
│    • KL(teacher → base) = 0.68 nats                                  │
│    • KL(SFT-finetuned → base) = 1.26 nats                            │
│                                                                      │
│  ⇒  Fine-tuning amortizes a context-conditional distribution into    │
│     unconditional weights. It does not create new capability.        │
│                                                                      │
│  Mechanism — student/teacher are the SAME network:                   │
│    teacher = π_θ(· | x, c)   (with EMA of student weights)           │
│    student = π_θ(· | x)                                              │
│    loss     = D_KL(student ‖ stop_grad(teacher))                     │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Core Claims

1. **Continual learning from demonstrations is solvable without explicit reward** by combining the on-policy advantage of RL (mitigates forgetting) with the supervision-from-demonstration regime.
2. **A model conditioned on a demonstration is approximately the optimal post-finetuning policy.** This "In-Context Assumption" is cast formally as Inverse RL: the demonstration-conditioned model defines the implicit reward; reverse-KL between unconditioned student and conditioned teacher is equivalent to on-policy RL.
3. **SFT is fundamentally off-policy and is the dominant cause of catastrophic forgetting** in demonstration-based fine-tuning. SDFT both improves new-task accuracy *and* preserves prior capabilities — no Pareto trade-off.
4. **Benefit scales with model capability**: SDFT requires a strong-enough in-context learner. 3B *under*-performs SFT; 7B → +4 pts; 14B → +7 pts.
5. **Sequential continual learning works**: a single 7B model trained Science → Tool → Medical with SDFT accumulates all three skills; SFT oscillates and forgets.

---

## Methodology

**Mechanism (Algorithm 1):**
1. Sample student rollout `y ~ π_θ(·|x)` (on-policy).
2. Compute analytic per-token KL between student `π_θ(·|x)` and teacher `π_ϕ(·|x,c)` where `ϕ` is an EMA of `θ` (α ∈ {0.01, 0.02, 0.05}).
3. Update `θ` via gradient of the analytic KL (single trajectory per prompt — multi-sample gives negligible gain).
4. Update teacher: `ϕ ← α·θ + (1−α)·ϕ`.

**Comparison table:**

| | SFT | On-policy RL (GRPO) | SDFT |
|---|-----|---------------------|------|
| Trajectories | expert (off-policy) | model rollouts (on-policy) | model rollouts (on-policy) |
| Reward | implicit token CE | explicit reward fn | implicit: log π(y\|x,c) − log π_k(y\|x) |
| Cost vs SFT | 1× | high | ~2.5× FLOPs, ~4× wall-clock |
| Credit assignment | token-level | trajectory-level | token-level (denser than GRPO) |

**Teacher design ablations** — frozen-base teacher under-performs (no progress tracking); student-as-own-teacher diverges; **EMA teacher** is the sweet spot.

---

## Key Evidence

| Finding | Number | Context |
|---------|--------|---------|
| Base → demo-conditioned (Tool Use, Qwen-7B) | 42% → 100% | The in-context assumption empirically validated |
| KL(teacher → base) vs KL(SFT → base) | 0.68 vs 1.26 nats | Teacher stays half as far from base while 100% accurate |
| SDFT vs SFT new-task / 6-bench-avg (SciQA, Qwen-7B) | 70.2 / 64.5 vs 66.2 / 53.4 | New task ↑, prior preserved |
| SDFT vs SFT (Tool Use) | 70.6 / 65.4 vs 63.2 / 56.0 | +7.4 new, +9.4 retained |
| SDFT vs SFT (Medical) | 40.2 / 65.4 vs 35.5 / 60.2 | +4.7 new, +5.2 retained |
| Knowledge Acquisition (2025-disaster, OOD) | SDFT 98 vs SFT 80 vs Oracle-RAG 100 | OOD jump shows knowledge integration, not memorization |
| Reasoning model preservation (Olmo3-Think, Medical) | 31.2% / 4612 tok → SFT 23.5% / 3273 tok → SDFT 43.7% / 4180 tok | SFT collapses CoT depth; SDFT preserves it |
| Scaling: SDFT − SFT margin (3B / 7B / 14B) | −X / +4 / +7 pts | Monotonic; under-performs at 3B (weak ICL) |
| Pass@k preservation (k up to 128) | gain held uniformly | Not entropy collapse; genuine acquisition |
| On-policy ablation | offline distillation < SDFT | On-policy ingredient is essential, not just teacher quality |
| Compute overhead | ~2.5× FLOPs / ~4× wall-clock | vs SFT |

---

## Relationship to Other Papers

### Supports (same finding, different method)
- **2604.01193 — Embarrassingly Simple Self-Distillation Improves Code Generation**: sibling paper. Same mechanism reading: SSD improves code generation via *distribution reshaping*, not new reasoning, even with 62% gibberish data. SDFT is the demonstration-conditioned variant of the same principle.
- **2312.01552 — URIAL / Superficial Alignment**: SDFT is URIAL made operational and successful — alignment is amortizing context-conditional behavior into weights.
- **2509.04259 — RL's Razor (Shenfeld et al., not yet in corpus)**: same first author; SDFT extends "on-policy mitigates forgetting" from RL to demonstrations.
- **2510.18874 — Retaining by Doing (not yet in corpus)**: convergent on-policy-data-mitigates-forgetting finding.
- **2501.17161 — SFT Memorizes, RL Generalizes (Chu et al., not yet in corpus)**: cited; SDFT inherits the OOD-generalization claim with on-policy demonstration learning.

### Extends
- **Snell et al. 2022 — Learning by distilling context**: SDFT generalizes context-distillation to on-policy and to expert demonstrations.
- **Agarwal et al. 2024 — On-policy distillation**: methodological ancestor; SDFT replaces external strong teacher with self-conditioning.

### Challenges (provides counter-evidence to)
- **2504.13837 — Yue et al. "Does RL incentivize reasoning beyond the base model?"**: SDFT preempts the pass@k-collapse critique by showing pass@128 holds uniformly.

---

## REBUTTALS

### Known Rebuttals
None at time of analysis (paper is Jan 2026, very recent). Likely future challenges:
- The In-Context Assumption is empirically validated, not theoretically guaranteed. Papers showing ICL failure modes (e.g., counterfactual ICL, OOD ICL) could narrow SDFT's regime.
- The 3B under-performance result already demonstrates a regime where the assumption breaks down.

### Limitations (Authors Acknowledge)
1. **Compute overhead**: 2.5× FLOPs / 4× wall-clock vs SFT.
2. **Surface artifacts**: student inherits teacher phrasing ("Based on the text…", "Following the example…"); fix is "fundamentally a heuristic."
3. **Capability-coupled**: "smaller models with weak ICL abilities fail to provide meaningful teacher signals."
4. **Cannot drive aggressive behavioral shifts**: "transforming a non-reasoning model into one that produces explicit chain-of-thought traces proved difficult."
5. **Some forgetting remains** even with on-policy.
6. **ICL Assumption not theoretically guaranteed** — only empirically validated.

### Reproducibility caveats (from public GitHub issues)

The published codebase has surfaced concrete reproducibility issues that qualify the magnitude (not direction) of the claims:

- **[Issue #9](https://github.com/idanshen/Self-Distillation/issues/9)**: Multiple independent users report only marginal SDFT improvement over base Qwen2.5-7B-Instruct on Tool Use. One verified replication on `improbableaimit/sdft-science-7b` shows the released science checkpoint scores Tool-Use **48.5%** (vs base 41.2%, vs paper-claimed 70%+ retention) — i.e., the released checkpoint already shows ~7pp Tool-Use degradation contradicting Figure 4's "no forgetting" framing.
- **Independent run by `devonbrackbill`** on a single H200 with the README defaults: SDFT vs SFT prior-task forgetting gap measured at **~1pp (−4.24 vs −5.33)**, vs paper Figure 4's headline ~6pp. IFEval drops **−24pp under SFT, −20pp under SDFT** — both methods show severe IFEval degradation that the paper figures don't emphasize.
- **`yanlai00`**: "SFT does not seem to forget much, at least with lr=1e-5" — questions whether the dramatic Figure 3b forgetting curve is robust to LR sweep.
- **Author response**: forgetting magnitude is sensitive to LR (5e-5 used for Figures 3 and 4); README example LR matches.

The mechanistic finding (in-context-conditioned model ≈ optimal next policy; SDFT preserves capability better than SFT in *direction*) replicates. The claimed *magnitudes* of the forgetting gap may be smaller than headlined.

---

## Key Quotes

1. > "We exploit this property by using the same model in two roles: a teacher, conditioned on both the task input and an expert demonstration, and a student, conditioned only on the task input."

2. > "We introduce our In-Context Assumption — given a demonstration c, the model conditioned on c approximates the optimal next policy. π*_{k+1}(y|x) ≈ π(y|x,c)"

3. > "Thus, our method can be viewed as an on-policy RL algorithm that maximizes rewards inferred by comparing the student's current behavior to its own 'wiser,' demonstration-aware counterpart."

4. > "When provided with the appropriate demonstration c for each prompt x, the teacher achieves a 100% success rate. … In all cases, not only were the final tool calls correct, but the intermediate chain-of-thought was valid and semantically grounded."

5. > "This disparity underscores a key limitation of SFT: it teaches the model to reproduce specific answers but does not reliably incorporate the underlying facts into the model's broader knowledge base."

6. > "While distillation from the teacher improves over standard SFT, it consistently underperforms our method. This gap indicates that the benefits of SDFT cannot be attributed solely to the quality of the teacher and further highlights the importance of on-policy learning."

---

## Critical Assessment

```
┌─────────────────────────────────────────────────────────────────────┐
│  WHY THIS PAPER STRONGLY SUPPORTS THE THESIS                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  The teacher and the student are the SAME network.                  │
│  The only difference is the conditioning context c.                 │
│                                                                     │
│  ⇒  Whatever "improvement" SDFT produces was already present in     │
│     the base model's parameters as a CONDITIONAL distribution.      │
│                                                                     │
│  ⇒  Fine-tuning is the act of making π(·|x,c) accessible as π(·|x). │
│     i.e., compressing in-context behavior into weights.             │
│                                                                     │
│  ⇒  Scaling story: SDFT works BETTER on bigger models because they  │
│     have stronger ICL. If fine-tuning were creating new reasoning,  │
│     ICL strength would be irrelevant.                               │
│                                                                     │
│  This is the URIAL/superficial-alignment claim made constructive.   │
└─────────────────────────────────────────────────────────────────────┘
```

The single strongest mechanistic statement: a base model that gets 42% on Tool Use unconditioned gets **100%** when shown one demonstration in context — and the entire SDFT training signal is the difference between conditioned and unconditioned forward passes of the *same parameters*. No external reward, no new information injected into weight space beyond what the base model can already compute given context.

The "wiser counterpart" the paper cites is the model itself. There is no wisdom being added; there is wisdom being made unconditional.

The Knowledge Acquisition result (0% baseline → 89% in-distribution → 98% OOD) on the 2025-disaster corpus is interesting because the facts genuinely aren't in the base model. But even there, the demonstration-conditioned model can produce the right answer when shown the article in context — i.e., the model already has the *machinery* to answer questions about arbitrary articles; SDFT just compiles specific articles into the weights.

The 14B > 7B > 3B scaling is decisive: SDFT's effectiveness is *coupled to ICL strength*. If fine-tuning created new capability, scaling-of-ICL would be irrelevant. That it dominates the gain is direct evidence that **fine-tuning is bottlenecked by what the base model can predict given context** — i.e., by its predictive (not reasoning) capacity.

---

## Status
- [x] Read complete
- [x] Core claims extracted
- [x] Key evidence with numbers
- [x] Rebuttals checked
- [x] Paper graph updated
