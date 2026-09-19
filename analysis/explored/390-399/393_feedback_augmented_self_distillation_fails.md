# Paper 393: Why Does Feedback-Augmented Self-Distillation Fail?

## Metadata
- **arXiv**: 2607.17558 (v1, 20 Jul 2026)
- **Title**: Why Does Feedback-Augmented Self-Distillation Fail to Improve Retrieval-Interleaved Search Agents?
- **Authors**: Fan Yang (Chapman University), Rui Meng (Lawrence Berkeley National Laboratory), Yuxin Wen (Chapman University) — first two equal contribution
- **Stance**: SUPPORTS (strongly) - identifies "decoding collapse," where a model emits reasoning-and-search templates that are "input-question-agnostic," making the distillation signal uninformative
- **Cluster**: `distillation`
- **Role**: The control condition. Removes the external label source and shows what the fitting loop returns when there is no new information to fit

---

## Core Finding

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  DECODING COLLAPSE: THE FORM SURVIVES, THE CONTENT DOES NOT          │
│                                                                      │
│  Setup: teacher and student are THE SAME WEIGHTS.                    │
│    y1 = model(X, successful_rollout)   <- "self-teacher"             │
│    y2 = model(X)                       <- student                    │
│    fit y2 toward y1                                                  │
│                                                                      │
│  The self-teacher IS stronger at inference time. Its advantage is    │
│  never internalized. What the student acquires instead:              │
│                                                                      │
│    "recurring reasoning-and-search output templates, producing       │
│     trajectories that appear diverse but are largely agnostic        │
│     to the input question"                                           │
│                                                                      │
│  Training pass rates stay near ZERO for most of training, with a     │
│  single transient rebound around step 180 before returning to        │
│  near-zero. The effective distillation signal gets sparser as        │
│  training proceeds.                                                  │
│                                                                      │
│  A reasoning-shaped output, decoupled from the question it is        │
│  nominally reasoning about.                                          │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Core Claims

1. **Feedback-augmented self-distillation does not sustain improvement** on retrieval-interleaved search agents, across every variant tested (unclipped, PPO-style clipped, joint with GRPO).
2. **The failure is not a weak teacher.** The feedback-augmented self-teacher measurably outperforms the unconditioned student at inference time. The advantage simply is not absorbed.
3. **Decoding collapse is the mechanism.** Models fall back on recurring output templates that look diverse but are agnostic to the input question, which makes the KL signal uninformative. Standard aggregate metrics do not detect this.
4. **The instability decomposes into model inconsistency and prompt inconsistency.** Stabilizing the label source (fixed-reference or EMA teacher) recovers training but does not resolve the underlying difficulty.
5. **Privileged feedback does not generalize to external teachers.** FA-MOPD underperforms plain MOPD, indicating the feedback trick introduces prompt inconsistency when the teacher is already strong.

---

## Methodology

### The degenerate case of the distillation loop

This paper is valuable precisely because it collapses the teacher and the student into one set of weights:

```
   STANDARD DISTILLATION            THIS PAPER
   teacher != student               teacher == student
   y1 = teacher(X)                  y1 = model(X, feedback)
   y2 = student(X)                  y2 = model(X)
   fit y2 -> y1                     fit y2 -> y1
        |                                |
        v                                v
   new information enters           NO new information enters
```

The only difference between label source and fitter is the prompt. The "privileged information" is a successful rollout from another attempt on the same question, pasted into the context.

### Rollout structure

A trajectory interleaves reasoning, search queries, and retrieved observations:

```
tau = (r1, s1, o1, r2, s2, o2, ..., rK, sK, oK, a)
       ^   ^   ^                              ^
       |   |   retrieved by environment       final answer
       |   search query
       reasoning
```

Retrieved passages are masked; loss is computed only on assistant-generated tokens.

### Setup

- **Student**: Qwen2.5-3B-Base (all trainable checkpoints)
- **External teacher** (for the OPD comparison): Qwen2.5-7B-Instruct
- **Retrieval**: E5 retriever, 2018 Wikipedia dump, top-3 passages per query, max 4 turns
- **Training data**: merged NQ + HotpotQA training sets
- **Evaluation**: 7 benchmarks - NQ, TriviaQA, PopQA, HotpotQA, 2WikiMultiHopQA, MuSiQue, Bamboogle (Exact Match)
- **Divergence**: reverse KL, single-sample KL estimator
- **Optimizer**: AdamW, lr 1e-6, warmup ratio 0.285, 5 rollouts, global batch 512
- **Max steps**: 200 (self-teacher) or 1000 (external teacher)
- **EMA momentum**: alpha = 0.95

---

## Key Evidence

### Finding 1: All FA-SD variants fail to sustain improvement

Both unclipped FA-SD and PPO-style clipped FA-SD keep pass rates "close to zero for much of training, with only a transient rebound around step 180 before returning to near-zero levels."

The joint FA-SD + GRPO variant is worse than GRPO alone: "both the training pass rate and validation performance degraded, suggesting that FA-SD introduces inconsistent supervision signals that interfere with and ultimately hinder the standard GRPO training process."

### Finding 2: The label source is genuinely stronger - and it does not matter

Comparing the two branches at inference time with no parameter updates, "the feedback-augmented self-teacher branch is often stronger than the unconditioned student." But "the student does not reliably catch up to the self-teacher branch over training."

The authors name this an **internalization failure**: "rollout-derived feedback can improve behavior when provided in the prompt, but the resulting token-level distillation signal is not reliably absorbed into the unconditioned search agent."

### Finding 3: The signal starves itself

The effective sample ratio - the fraction of sampled trajectories yielding a valid distillation signal - *decreases* over training for both variants. The usable supervision becomes progressively sparser while the loss continues to be minimized.

```
  loss going down     +     pass rate near zero     +     signal getting sparser
                               |
                               v
              "a small distillation loss need not imply
               useful reasoning or search behavior"
```

### Finding 4: EMA regularization recovers some ground

Final evaluation, Exact Match across all seven benchmarks:

| Method | Init / Signal | NQ | TriviaQA | PopQA | HotpotQA | 2Wiki | MuSiQue | Bamboogle | **Avg** |
|--------|---------------|-----|----------|-------|----------|-------|---------|-----------|---------|
| None | Qwen3B-Base | 0.148 | 0.268 | 0.135 | 0.085 | 0.049 | 0.022 | 0.089 | **0.114** |
| FA-SD + EMA | EMA self-teacher | 0.291 | 0.435 | 0.296 | 0.167 | 0.138 | 0.038 | 0.081 | **0.206** |

Two details worth noting:
- **Bamboogle goes down**: 0.089 -> 0.081. The only benchmark not in the training mixture's domain lineage regresses.
- **MuSiQue barely moves**: 0.022 -> 0.038, the hardest multi-hop set.

The gains concentrate on single-hop QA (NQ +0.143, TriviaQA +0.167, PopQA +0.161) and thin out as compositional demand rises.

### Finding 5: Both fixes are fixes to the label source, not the student

| Strategy | What it does | Effect |
|----------|--------------|--------|
| Fixed reference teacher | Freezes label source at step 0 | Recovers after temporary regression, continues improving |
| EMA teacher (alpha=0.95) | Slows label source drift | Faster recovery, higher final performance |

Both work by making the target *stop moving*. The paper frames the underlying problem as supervision inconsistency decomposed into **model inconsistency** (the evolving self-teacher) and **prompt inconsistency** (conditioning on feedback demonstrations).

### Finding 6: The trick does not transfer to a real teacher

Standard MOPD "improves more steadily during early training without experiencing the temporary performance regression observed in regularized FA-SD." Feedback-Augmented MOPD **underperforms** standard MOPD. The authors conclude that "when the external teacher already provides strong supervision, incorporating privileged feedback can introduce additional prompt inconsistency or unnecessary conditioning, thereby harming model performance."

---

## Relevance to the Thesis

### The cleanest available demonstration that form is what transfers

Strip the external label source out of the distillation loop and run it. What comes back is a template:

```
┌──────────────────────────────────────────────────────────────────────┐
│  WHAT WE MIGHT EXPECT           vs    WHAT THE PAPER FOUND           │
├──────────────────────────────────────────────────────────────────────┤
│  Model bootstraps reasoning           Model converges to recurring   │
│  from its own successes               reasoning-and-search templates │
│                                                                      │
│  Diverse trajectories reflect         Trajectories "appear diverse   │
│  exploration of the problem           but are largely agnostic to    │
│                                       the input question"            │
│                                                                      │
│  Lower KL means better behavior       "a small distillation loss     │
│                                       need not imply useful          │
│                                       reasoning or search behavior"  │
└──────────────────────────────────────────────────────────────────────┘
```

When the label source carries no information the fitter does not already have, the fit returns the most frequent shape in the data. That shape is reasoning-*looking* output with no dependence on the question. This is what a fitted surface degrades to under self-supervision.

### The objective cannot see the thing we care about

The paper states outright that decoding collapse "can be missed by existing evaluation metrics," which "do not test whether decoded trajectories are input-specific." A distillation loss measures agreement with a label source. It has no term for whether the output is *about* the input. Agreement can be achieved by convergence on a question-independent template, and it is.

### Why the fixes are telling

Every remedy the authors find is a remedy applied to the **label source**: freeze it, or slow its drift. None is applied to the student's reasoning. The problem is diagnosed and solved entirely in the vocabulary of unstable supervision targets - the vocabulary of fitting.

---

## REBUTTALS

### Known Rebuttals
None identified; the paper is from July 2026 and no arXiv responses were found.

### This Paper Challenges

- **#343 RL via Self-Distillation (2601.20802)**: directly cited (Hübotter et al.) as motivation, and its central mechanism is what fails here. This paper adopts the reverse-KL self-distillation gradient from that work and shows it does not transfer to retrieval-interleaved agentic tasks. A domain-scoped negative result against a corpus paper.
- **#342 Self-Distillation Enables Continual Learning (2601.19897)** and **#292 Simple Self-Distillation (2604.01193)**: both report self-distillation working. This paper bounds that claim - self-distillation succeeds where the conditioning gap carries information and fails where it does not.

### Counter-Considerations

The honest reading is that this is a **negative result in one domain**, not a refutation of self-distillation generally. Retrieval-interleaved agents differ structurally: model actions determine which evidence is retrieved, and observations come from the environment rather than the policy. The authors are explicit that "matching token-level distributions may be insufficient to transfer the long-horizon search decisions required for effective retrieval."

That scoping is genuine and should be stated. What survives it is the decoding-collapse observation itself, which is a statement about what the model produces, not about whether the method works: recurring templates, input-agnostic, invisible to aggregate metrics.

A second caveat: EMA-regularized FA-SD *does* improve over base (0.114 -> 0.206). The paper is not a story of total failure but of a signal that requires heavy stabilization to yield anything, and yields least where compositional demand is highest.

### Limitations (Authors Acknowledge)

1. **Warm-up regression is unexplained.** The self-teacher "requires an initial warm-up phase, during which the model may experience temporary performance regression"; the cause is hypothesized, not established.
2. **Dense supervision alone is insufficient.** "Additional GRPO and OPD comparisons in Appendix C.4 further suggest that dense distributional supervision alone is insufficient for search-agent training."
3. **Open questions left explicit**: "what to distill from successful rollouts, when feedback-augmented teachers should be trusted, and how to stabilize self-distillation in retrieval-interleaved agents."

---

## Relationship to Other Papers

### Supports
- **#384 Style over Substance (2504.01738)**: the strongest pairing in the corpus. Style over Substance shows distilled students replicate reasoning *style*; this paper shows a self-distilled student converges to reasoning *templates* that are question-independent. Same object found by two unrelated methods in two domains.
- **#392 Beyond Trajectory Imitation (2606.24064)**: companion result. #392 shows fitting to a real label source yields instance memorization; #393 shows fitting to a non-informative label source yields templates. Both are what happens when you fit a surface.
- **#8 Measuring Faithfulness in CoT (2307.13702)**: reasoning text that does not track the input is the training-time analogue of reasoning text that does not track the answer.

### Challenges
- **#343 RL via Self-Distillation (2601.20802)**: adopts its gradient formulation and reports it failing in the agentic setting.

### Extends
- **#387 MiniLLM (2306.08543)**: MiniLLM established reverse KL for LM distillation; this paper applies reverse KL in the self-teacher regime and documents where it breaks.

---

## Key Quotes

> "We identify that models can rely on recurring reasoning-and-search output templates, producing trajectories that appear diverse but are largely agnostic to the input question, making the KL-based self-distillation signal uninformative."

> "We term this phenomenon decoding collapse, a failure mode that can be missed by existing evaluation metrics."

> "Thus, a small distillation loss need not imply useful reasoning or search behavior."

> "rollout-derived feedback can improve behavior when provided in the prompt, but the resulting token-level distillation signal is not reliably absorbed into the unconditioned search agent."

> "Successful rollout feedback can make the self-teacher behave as if useful evidence has already been identified, while the unconditioned student must still discover such evidence through search."

> "These findings suggest that richer self-generated supervision alone is insufficient."

---

## Interaction Diagram

```
                  ┌──────────────────────────────────────┐
                  │  RL via Self-Distillation (#343)     │
                  │  Hübotter et al. · 2601.20802        │
                  │  reverse-KL self-teacher gradient    │
                  └──────────────────┬───────────────────┘
                                     │ adopted, then
                                     │ found to fail
                                     ▼
┌──────────────────────────────────────────────────────────────────────────┐
│        Why Does FA Self-Distillation Fail? (Jul 2026)                    │
│        Yang, Meng, Wen · Chapman / LBNL                                  │
│                                                                          │
│  teacher == student, differing only by prompt                            │
│  => DECODING COLLAPSE: templates, input-question-agnostic                │
│  => pass rate near zero; effective signal ratio falling                  │
│  => EMA fix: 0.114 -> 0.206 avg EM, but Bamboogle 0.089 -> 0.081         │
└──────────────────────────────────────────────────────────────────────────┘
           │                    │                         │
           │ same object,       │ companion               │ bounds
           │ different method   │ failure mode            │
           ▼                    ▼                         ▼
┌──────────────────┐  ┌──────────────────────┐  ┌─────────────────────────┐
│ Style over       │  │ Beyond Trajectory    │  │ Self-Distillation       │
│ Substance (#384) │  │ Imitation (#392)     │  │ successes (#292, #342)  │
│                  │  │                      │  │                         │
│ replicates       │  │ informative label    │  │ bounded: works only     │
│ reasoning STYLE  │  │ source -> instance   │  │ where the conditioning  │
│                  │  │ memorization         │  │ gap carries information │
└──────────────────┘  └──────────────────────┘  └─────────────────────────┘
```

---

## Status
- [x] Read complete
- [x] Core claims extracted
- [x] Key evidence with numbers
- [x] Rebuttals checked
- [x] Paper graph updated
