# Paper 392: Beyond Trajectory Imitation

## Metadata
- **arXiv**: 2606.24064 (v1, 23 Jun 2026)
- **Title**: Beyond Trajectory Imitation: Strategy-Guided Policy Optimization for LLM Reasoning
- **Authors**: Tianyuan Shi, Canbin Huang (Sun Yat-sen University), Bei Li, Xin Chen (Meituan), Xiaojun Quan (Shenzhen Loop Area Institute), Jingang Wang (Meituan), Qifan Wang (Meta AI)
- **Stance**: SUPPORTS - the authors state outright that reasoning distillation transfers "what to answer rather than how to reason" and produces memorization of instance-specific steps
- **Cluster**: `distillation`
- **Role**: Names the fitted-surface problem from inside the distillation literature, then "fixes" it by changing the fit target

---

## Core Finding

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  THE LABEL SOURCE DETERMINES WHAT TRANSFERS                          │
│                                                                      │
│  Standard reasoning distillation:                                    │
│    y1 = teacher's solution trajectory                                │
│    fit student to y1                                                 │
│    => student memorizes instance-specific steps                      │
│                                                                      │
│  The authors' own diagnosis, verbatim:                               │
│    "transferring what to answer rather than how to reason"           │
│    "encourages memorization of instance-specific steps rather        │
│     than acquisition of transferable problem-solving skills"         │
│                                                                      │
│  Their fix is NOT to teach reasoning. It is to swap the label:       │
│    y1 = strategy description (problem type + approach + steps)       │
│    fit student to y1                                                 │
│    => better numbers, same loop                                      │
│                                                                      │
│  Qwen2.5-7B-Instruct average over 4 math benchmarks:                 │
│    Base                     42.2                                     │
│    SFT (trajectory fit)     42.7   (+0.5 over base)                  │
│    SGPO (strategy fit)      52.1   (+9.9 over base)                  │
│                                                                      │
│  Target engineering, not capability transfer.                        │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Core Claims

1. **Trajectory-level imitation transfers the answer surface, not a procedure.** Fitting a student to specific solution sequences yields memorization of instance-specific steps and limits generalization to novel problems.
2. **The unit of transfer can be changed.** Replacing solution trajectories with abstracted "strategy descriptions" (problem type, solving approach, general procedural steps, with all computation and answers stripped) improves downstream scores.
3. **Forward KL on the distributional shift beats imitation of the text.** Distilling the token-level probability change induced by strategy conditioning outperforms direct SFT on the very same guided trajectories.
4. **Benefit scales with the student's existing capacity.** Gains increase with base model strength, implying a minimum competence is required before strategy-level transfer does anything.

---

## Methodology

### The two-group construction

For each problem `q`, the same policy is sampled twice under different conditioning:

```
  autonomous group   {o_i}   ~  pi(. | q)          G1 = 8
  strategy-guided    {o~_j}  ~  pi(. | q, s)       G2 = 4
                                    ^
                                    strategy text s extracted from DeepSeek-R1
```

The training signal is the *gap between the two*. Correct guided trajectories supply a forward-KL target; the unguided policy is pulled toward it. Autonomous GRPO runs alongside.

### Why this is still the same loop

| Component | What it actually is |
|-----------|---------------------|
| Strategy description `s` | A relabeled target, produced by prompting DeepSeek-R1 and rank-selecting 1 of 5 candidates |
| Forward KL objective | Distance between two output distributions of the same weights |
| Stop-gradient on guided branch | Freezes the label source so it cannot drift toward the fitter |
| Proximal constraints | Keeps the fit target reachable from the current fit |
| Adaptive weight `alpha(q)` | Turns the fitting pressure up where the student disagrees most |

Nothing in the pipeline inspects, verifies, or executes a reasoning procedure. Every term is a disagreement measure between output distributions.

### Setup

- **Models**: Qwen2.5-1.5B-Instruct, Qwen2.5-7B-Instruct, Llama-3.2-8B-Instruct
- **Data**: 8.5K problems sampled from LUFFY; reference solutions from DeepSeek-R1; ~1/3 for SFT warm-up, remainder for RL
- **Benchmarks**: MATH500 (avg@4), AMC23 (avg@32), OlympiadBench (avg@4), AIME24 (avg@32)
- **Decoding**: max 32K tokens, temperature 0.6, top-p 0.95
- **Compute**: 32 GPUs (4 nodes x 8), veRL + vLLM, ~17 hours end-to-end for the 7B model
- **Hyperparameters**: GRPO clip 0.2/0.28, KL threshold delta=1.0, alpha_0=0.5, gamma=0.1, alpha_max=0.8

---

## Key Evidence

### Finding 1: Main results across three base models

| Model | MATH500 | AMC23 | Olympiad | AIME24 | Average |
|-------|---------|-------|----------|--------|---------|
| Qwen2.5-1.5B-Instruct | 50.1 | 21.3 | 18.4 | 3.0 | **23.2** |
| — SFT | 48.4 | 19.7 | 16.1 | 4.7 | **22.2** |
| — SFT+GRPO | 54.1 | 26.2 | 21.7 | 5.5 | **26.9** |
| — HPT | 53.8 | 28.5 | 22.6 | 7.7 | **28.2** |
| — LUFFY | 54.4 | 27.9 | 23.1 | 8.4 | **28.5** |
| — SGPO | 57.7 | 29.0 | 23.7 | 9.0 | **29.9** |
| Qwen2.5-7B-Instruct | 75.2 | 43.0 | 38.8 | 11.8 | **42.2** |
| — SFT | 76.4 | 42.1 | 40.0 | 12.4 | **42.7** |
| — SGPO | 82.7 | 55.9 | 50.0 | 19.7 | **52.1** |
| Llama-3.2-8B-Instruct | 43.7 | 20.3 | 14.5 | 3.0 | **20.4** |
| — SGPO | 52.0 | 25.6 | 22.9 | 10.0 | **27.6** |

**Note the SFT row for the 1.5B model: 23.2 -> 22.2.** Fitting a small student directly to a strong teacher's trajectories made it *worse* than the untouched base model.

### Finding 2: Fitting the distribution beats fitting the text

Same successful strategy-guided trajectories, two ways of fitting to them:

| Distillation type | MATH500 | AMC23 | Olympiad | AIME24 | Average |
|-------------------|---------|-------|----------|--------|---------|
| KL distillation | 82.7 | 55.9 | 50.0 | 19.7 | **52.1** |
| Direct SFT | 79.8 | 53.0 | 47.0 | 17.3 | **49.3** |

Gap: **2.8 points**. The authors explain it as granularity of the learning signal - uniform fitting pressure across all tokens versus pressure concentrated where the two distributions diverge. Both are distance minimization; one is just better weighted.

### Finding 3: Ablations (Qwen2.5-7B-Instruct)

| Setting | Average | Delta |
|---------|---------|-------|
| SGPO (full) | 52.1 | — |
| w/o strategy distillation | 49.9 | −2.2 |
| w/o autonomous GRPO | 48.6 | −3.5 |
| w/o all proximal constraints | 45.3 | **−6.8** |
| w/o KL clipping | 48.7 | −3.4 |
| w/o target selection | 48.1 | −4.0 |
| w/o adaptive weighting | 50.9 | −1.2 |

The largest single drop comes from removing the constraints that keep the fit target *reachable from the current fit* - a numerical stability concern, not a reasoning one. Removing them "triggers abrupt entropy collapse driven by excessively large KL updates."

### Finding 4: Forward vs reverse KL

| KL direction | MATH500 | AMC23 | Olympiad | AIME24 | Average |
|--------------|---------|-------|----------|--------|---------|
| Forward (theirs) | 82.7 | 55.9 | 50.0 | 19.7 | **52.1** |
| Reverse | 81.3 | 54.2 | 48.2 | 20.0 | **50.9** |

The stated reason is mode coverage: reverse KL "would actively penalize mass outside the guided mode, collapsing the policy onto a single strategy." The choice between them is a choice about how to shape a probability distribution.

### Finding 5: Complementary scaling - the box has to be big enough

| Base model | Base avg | SGPO avg | Gain |
|------------|----------|----------|------|
| Qwen2.5-1.5B-Instruct | 23.2 | 29.9 | **+6.7** |
| Qwen2.5-7B-Instruct | 42.2 | 52.1 | **+9.9** |

The bigger student absorbs more. The authors: "a minimum reasoning competence is needed to benefit from strategy-level transfer," and in Limitations, "very weak base models may not benefit substantially."

---

## Relevance to the Thesis

### What the paper establishes without meaning to

The paper is an engineering contribution with no stake in the reasoning debate, which is exactly what makes its framing load-bearing. Its opening sentence is a diagnosis the corpus has argued for from the outside:

```
   Trajectory imitation transfers   ──>   what to answer
   Trajectory imitation does NOT    ──>   how to reason
```

The authors treat this as a solvable targeting problem. It is solvable, and they solve it - by moving to a coarser label. What never appears anywhere in the method is a step where a procedure is extracted, checked, or executed. The "how to reason" that SGPO transfers is a **natural-language description of a procedure**, fitted as text-conditioned distributional shift. It is a different surface, not a different kind of object.

### The strategy description is itself a pattern

Appendix B makes this concrete. Strategy descriptions are produced by prompting DeepSeek-R1 for "problem type / strategy / steps," sampling 5 candidates, and rank-selecting with a second prompt scoring four criteria. The resulting artifact is a short piece of text that raises the guided pass rate. It is a prompt-shaped feature that correlates with success - discovered by search over a generator's outputs, validated by whether it moves a number.

### What the failure modes look like

Every failure mode in the ablations is an estimator failure mode:

| Failure | Description in the paper |
|---------|--------------------------|
| Entropy collapse | Removing proximal constraints causes "abrupt entropy collapse driven by excessively large KL updates" |
| Optimization plateau | Without autonomous GRPO, "reward subsequently stagnates" once "the easily exploitable strategy descriptions are exhausted" |
| Unreachable targets | Target selection is needed to minimize "the distributional gap that the distillation step must bridge" |

None of these are inferential errors. They are all descriptions of a fit going unstable.

---

## REBUTTALS

### Known Rebuttals
None identified. The paper is recent (June 2026) and no arXiv responses were found.

### Challenges to This Paper's Framing

The natural objection is that SGPO genuinely does transfer something more general than trajectories - the +2.2 over the strongest hybrid baseline is real, and it generalizes across two model families. That is granted. The thesis-relevant claim is not that strategy distillation fails; it is that a method which *succeeds* at transferring "how to reason" does so entirely by relabeling and reweighting a distribution-matching objective.

A second objection: human teaching also communicates strategies in natural language, so "strategy text as the transfer medium" is not evidence against reasoning. The distinguishing detail is that the student is never required to *apply* the strategy correctly - only to shift its token distribution toward the one induced by the strategy's presence in the prompt. Correctness enters only through the binary reward on the guided rollouts used to filter which trajectories become targets.

### Limitations (Authors Acknowledge)

1. **Math only.** "our experiments focus on mathematical reasoning; validating the framework on other reasoning domains such as code generation, logical reasoning, and scientific problem solving remains important."
2. **Strategy extraction is not quality-controllable.** It "relies on a strong model and is not fully quality-controllable."
3. **Weak models may not benefit.** "the complementary scaling pattern implies that very weak base models may not benefit substantially from strategy distillation, and understanding the precise capability threshold deserves further investigation."
4. **Scale untested.** Larger training sets and stronger base models remain unexplored.

---

## Relationship to Other Papers

### Supports
- **#384 Style over Substance (2504.01738)**: independent confirmation from the opposite direction. Style over Substance shows style-only traces with *wrong answers* still give +12pp; this paper shows trajectory text yields instance memorization. Both isolate the transferred object as surface form rather than procedure.
- **#386 CoT KD Effectiveness (2511.05184)**: same subject, consistent finding on what chain-of-thought supervision does and does not carry into a student.
- **#0 Faith and Fate (2305.18654)**: "memorization of instance-specific steps" is linearized subgraph matching observed at the training-objective level rather than the inference level.
- **#393 FA Self-Distillation (2607.17558)**: the companion failure case - when the label source carries no extra information, the same loop returns templates.

### Extends
- **#387 MiniLLM (2306.08543)**: MiniLLM changed the divergence direction (reverse KL) to fix distillation; this paper changes the target content. Both treat "reasoning capability" as a distribution-shaping problem, and this paper's Appendix F ablation runs the forward/reverse comparison MiniLLM motivated, finding forward KL better in this setting (52.1 vs 50.9).

### Challenged By
- **#6 DeepSeek-R1 (2501.12948)**: supplies the reference solutions used here, and argues RL incentivizes genuine reasoning capability. This paper's results are compatible with that reading if one accepts that what R1 has is transferable-by-relabeling.

---

## Key Quotes

> "Distilling reasoning capabilities from strong to weak language models typically involves imitating specific solution trajectories, effectively transferring what to answer rather than how to reason."

> "This trajectory-level imitation encourages memorization of instance-specific patterns rather than acquisition of transferable skills, limiting generalization to novel problems."

> "The student is trained to reproduce what the expert wrote, that is, specific sequences of reasoning steps for specific problems, but is never taught the reusable problem-solving strategy that explains why those steps were chosen."

> "These methods improve how the teacher's output is transferred but do not change what is transferred: the student still imitates specific solutions."

> "Crucially, SGPO never imitates any trajectory, whether autonomous or guided. Instead, it distills the distributional shift caused by strategy conditioning, operating at the level of token-level probability changes rather than sequence matching."

> "optimization pressure concentrates on tokens whose probability shifts most under strategy conditioning, which empirically correspond to strategy-critical decision points rather than routine linguistic tokens."

---

## Interaction Diagram

```
                    ┌────────────────────────────────┐
                    │  DeepSeek-R1 (#6)              │
                    │  supplies reference solutions  │
                    └───────────────┬────────────────┘
                                    │ relabeled into
                                    │ "strategy descriptions"
                                    ▼
┌──────────────────────────────────────────────────────────────────────────┐
│              Beyond Trajectory Imitation (Jun 2026)                      │
│              Shi et al. · Sun Yat-sen / Meituan / Meta AI                │
│                                                                          │
│  DIAGNOSES: trajectory fitting transfers answers, not procedures         │
│  FIXES IT BY: swapping the fit target, keeping the fitting loop          │
│  RESULT: 42.2 -> 52.1 on Qwen2.5-7B; KL fit beats text fit by 2.8        │
└──────────────────────────────────────────────────────────────────────────┘
           │                    │                         │
           │ confirms           │ companion               │ extends
           ▼                    ▼                         ▼
┌──────────────────┐  ┌──────────────────────┐  ┌─────────────────────────┐
│ Style over       │  │ FA Self-Distillation │  │ MiniLLM (#387)          │
│ Substance (#384) │  │ Fails (#393)         │  │                         │
│                  │  │                      │  │ changed the divergence  │
│ style w/ WRONG   │  │ no new information   │  │ direction; this paper   │
│ answers: +12pp   │  │ in label source      │  │ changes the target      │
│                  │  │ -> templates         │  │ content                 │
└──────────────────┘  └──────────────────────┘  └─────────────────────────┘
```

---

## Status
- [x] Read complete
- [x] Core claims extracted
- [x] Key evidence with numbers
- [x] Rebuttals checked
- [x] Paper graph updated
