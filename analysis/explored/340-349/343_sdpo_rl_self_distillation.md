# Paper 343: Reinforcement Learning via Self-Distillation (SDPO)

## Metadata
- **arXiv**: 2601.20802 (v2, Feb 2026; v1 Jan 2026)
- **Title**: Reinforcement Learning via Self-Distillation
- **Authors**: Jonas Hübotter, Frederike Lübeck, Lejs Behric, Anton Baumann, Marco Bagatella, Daniel Marta, Ido Hakimi, Idan Shenfeld, Thomas Kleine Buening, Carlos Guestrin, Andreas Krause
- **Affiliation**: ETH Zürich + MIT + Stanford
- **Code**: [github.com/lasgroup/SDPO](https://github.com/lasgroup/SDPO)
- **Stance**: SUPPORTS — paper is methodologically neutral on reasoning, but its mechanism, ablations, and empirical scaling provide strong instrumental evidence for the predictive thesis.
- **Cluster**: `finetuning`

---

## Core Finding

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  THE CREDIT-ASSIGNMENT BOTTLENECK OF RLVR                            │
│                                                                      │
│  RLVR: scalar reward r ∈ {0,1}  →  one constant advantage per token  │
│  SDPO: tokenized feedback f     →  per-token logit-level advantage   │
│                                                                      │
│  Mechanism: the SAME model produces TWO distributions                │
│      teacher = π_θ(· | x, f, y_<t)   ← prompt has feedback in it     │
│      student = π_θ(· | x, y_<t)      ← original prompt               │
│      A^SDPO_t = log [ teacher / student ]   (KL via stop-grad)       │
│                                                                      │
│  Empirical headline (Qwen3-8B, LiveCodeBench v6):                    │
│      Base 27.9%  →  GRPO 41.2%  →  SDPO 48.8%                        │
│      (beats Claude Sonnet 4 / Opus 4 on this benchmark)              │
│      4× fewer generations to match GRPO's final accuracy             │
│      Generations are >3× SHORTER than GRPO (no "Wait... Hmm...")     │
│                                                                      │
│  CRITICAL: initial self-teacher accuracy is <1% on hard questions,   │
│  *exactly 0%* on 78% of them. One pass of in-context feedback        │
│  doesn't solve them. ITERATIVE WEIGHT UPDATES do.                    │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Core Claims

1. **Credit-assignment bottleneck of RLVR is the binding constraint**, not RL itself. Verifiable environments already produce rich tokenized feedback (errors, judge text, failing tests); RLVR throws this away.
2. **The current model conditioned on its own failure + feedback is good enough to act as its own teacher.** No external teacher, no reward model.
3. **SDPO converts feedback into dense, logit-level credit assignment** via a stop-grad KL distillation loss between student and self-teacher over the original rollout. Drop-in advantage replacement for GRPO.
4. **Self-teaching is an emergent capability of scale.** SDPO beats GRPO substantially on Qwen3-8B, marginally on Qwen3-1.7B, and *underperforms* on Qwen2.5-1.5B.
5. **At test time, SDPO accelerates discovery on tasks RLVR cannot touch.** RLVR needs a first success to learn anything; SDPO learns from feedback before any success exists.

---

## Methodology

### RLRF formalism
RLVR: y ~ π_θ(·|x), receive scalar r. RLRF: receive **tokenized feedback string f** (errors, failed tests, judge text, sample correct solution).

### Mechanism (the trick)
SDPO does *not* convert f into a reward. It converts f into a **changed next-token distribution over the same trajectory y**:

1. Sample y ~ π_θ(·|x). Get f from environment.
2. Recompute log-probabilities of *the original tokens y* under π_θ(·|x, f, y_<t) — same model, prompt now contains f.
3. Minimize per-position KL: `L_SDPO = Σ_t KL( π_θ(·|x,y_<t) ‖ stopgrad(π_θ(·|x,f,y_<t)) )`
4. Stop-grad on teacher prevents collapse.

### Reprompting template (Table 2)
```
prompt
[optional] Correct solution: <successful_previous_rollout>
The following is feedback from your unsuccessful earlier attempt: <env_output>
Correctly solve the original question.
Assistant: <original_response>
```

The model's new log-probs over `<original_response>` are the teacher distribution.

### Advantage comparison
```
A^GRPO_{i,t}      = r_i − mean{r_i}      (constant in t)
A^SDPO_{i,t}(ŷ)   = log [ π_θ(ŷ|x,f_i,y_<t) / π_θ(ŷ|x,y_<t) ]
                   (defined for every token in vocab at every position)
```

GRPO: one scalar per rollout. SDPO: |y|·(K+1) advantages.

### "Successful rollouts as implicit feedback" (§3)
In standard RLVR (scalar-only): for failed y_i, set f := y_j where y_j is a successful sibling rollout. Teacher then evaluates y_i conditioned on `prompt + "here is a correct solution: y_j" + y_i`. Token-level disagreement signal even when environment returns 0/1.

### Test-Time SDPO (§5)
For a single hard question: iteratively sample y_k → get feedback f_k → one SDPO update with batch 16. **Compresses interaction history into weights**, bypassing context-length limit.

### Stability
- Top-K=100 logit distillation.
- Symmetric Jensen-Shannon variant.
- Regularized teacher (EMA or trust-region with initial teacher); unregularized diverges (36.1% vs 50.6%).

---

## Key Evidence

| Finding | Number | Context |
|---------|--------|---------|
| LCBv6 final acc (Qwen3-8B) | SDPO 48.8 vs GRPO 41.2 vs base 27.9 | Beats Claude Sonnet 4 (40.5) / Opus 4 (39.7) |
| Sample efficiency on LCBv6 | 4× fewer generations | To reach GRPO's final accuracy |
| Aggregate sci+tool | SDPO 70.2 vs GRPO 66.6 | Final accuracy |
| Chemistry wall-clock (Olmo3-7B) | 6× speedup | Reaches GRPO 5h-acc in 50 min; +10pp at 5h |
| Chemistry (Qwen3-8B, 5h) | SDPO 80.9 vs GRPO 74.5 vs base 41.2 | |
| Generation length | >3× shorter than GRPO | Up to 11× on Chemistry/Olmo3 |
| GRPO verbose CoT example | 5,549 tok ("Wait" 25×, "Hmm." 5×, "No." 9×, "going in circles") | vs SDPO 764 tok, both correct |
| Scaling (LCBv6 step 80) | Qwen3-8B/4B big gain; 1.7B small; 1.5B negative | Self-teacher capability is emergent with scale |
| Dense vs sparse credit | logit > token > sequence > GRPO | Even seq-level SDPO beats GRPO — feedback alone helps |
| Self-teacher improves during training | student surpasses initial teacher | Genuine bootstrapping (Fig. 10) |
| Forgetting (Qwen3-8B holdout) | SDPO −1.1 vs GRPO −1.7 vs SFT −2.1 | IFEval/MMLU-Pro/ArenaHard avg |
| Feedback ablation | f=output 39.9 / f=own_sol 42.6 / both 48.3 / +y 44.5 | Including y biases teacher toward student's prior |
| Test-time discovery (very hard, pass@64<0.03) | SDPO 53.2% vs best-of-k 41.5% vs multi-turn 35.6% | Discovery@2750 |
| 3× fewer attempts | At 22% discovery probability | vs best-of-k / multi-turn |
| Q3 case | Solved only by SDPO | Found at attempt 321 = 20 SDPO steps |
| Initial self-teacher on these | <1% acc; 0% on 78% of them | One-shot in-context fix doesn't work |
| Multi-turn context exhaustion | 32k window after 837±466 steps (hard) / 1007±349 (very hard) | Confirms context-into-weights argument |

---

## Relationship to Other Papers

### Supports
- **2601.19897 (#342) — SDFT**: same authors, same self-distillation principle. SDPO is the RL/feedback-driven sibling of SDFT's demonstration-driven version.
- **2603.12273 (#344) — SDPO@User Interactions**: applies SDPO formalism with user follow-ups as feedback. Same algorithmic core.
- **2604.01193 — Embarrassingly Simple Self-Distillation**: convergent. SSD improves code via distribution reshaping (works with 62% gibberish). SDPO is the same reshaping driven by environment feedback.
- **2603.05488 — Reasoning Theater Performance**: answer is decodable from activations earlier than the CoT monitor sees. SDPO empirically corroborates this by removing GRPO's verbose "Wait/Hmm" filler while improving accuracy — direct evidence the verbose CoT was performative pattern completion.
- **2312.01552 — URIAL / Superficial Alignment**: SDPO's success depends on the base model's existing conditional capability. Alignment is unlocking, not creating.

### Extends
- **GRPO (Shao 2024) / DeepSeek-R1 (Guo 2025)**: drop-in advantage replacement.
- **STaR / expert iteration / BYOL**: bootstrap-from-self lineage.
- **On-policy distillation (Agarwal 2024)**: removes need for external strong teacher.
- **Process Reward Models (Lightman 2023, Wang 2024)**: paper's own claim: "each language model is implicitly a PRM through retrospection." Eliminates separate PRM.
- **Snell 2022 — Learning by distilling context**: SDPO is context-into-weights with environment feedback as the context.
- **Test-Time Training**: Test-Time SDPO is a TTT variant for a single question.

### Challenges
- **Reflexion (Shinn 2023) / Self-Refine (Madaan 2023)**: pure in-context iteration; SDPO's superior discovery on hard problems shows context-only correction has a ceiling — the *weight update* is what closes the gap.

### Provides Mechanism For
- **Verbose-CoT reduction**: paper's qualitative observation that GRPO produces "Wait/Hmm" filler tokens, SDPO does not. This is mechanistic evidence that long CoT under RLVR is reward-hacking pattern completion, not "thinking."

---

## REBUTTALS

### Known Rebuttals
None at time of analysis (Jan 2026 paper). Likely future angles:
- The "self-teacher" framing as introspection vs. conditioning could be challenged by mechanistic interpretability work showing the per-token disagreement signal is just attention-routed pattern completion over feedback tokens (the prediction here).
- The 0% one-shot teacher accuracy on 78% of hard questions is itself an empirical brake on strong "self-correction" claims.

### Limitations (Authors Acknowledge)
> "SDPO's performance depends on a model's in-context learning ability, suggesting that SDPO is primarily applicable for RL-training stronger base models, while it can underperform GRPO on weaker models. Moreover, performance depends on the quality of the environment feedback. If the environment provides uninformative or misleading feedback, a model may not be able to learn from it through SDPO."

Additional:
- Underperforms GRPO on Qwen2.5-1.5B.
- Strictly on-policy in experiments; off-policy variant sketched only.
- All experiments are verifiable code/science. Open-ended text untested.
- SDPO advantages are biased w.r.t. expected reward J(θ); hybrid SDPO+GRPO is more robust on weak models.

---

## Key Quotes

1. > "Current methods for reinforcement learning with verifiable rewards (RLVR) learn only from a scalar outcome reward per attempt, creating a severe credit-assignment bottleneck."

2. > "SDPO treats the current model conditioned on feedback as a self-teacher and distills its feedback-informed next-token predictions back into the policy. In this way, SDPO leverages the model's ability to retrospectively identify its own mistakes in-context."

3. > "We can use the same policy in two different roles: As the student for the initial attempt and as the teacher to determine the value of actions in hindsight."

4. > "Including the feedback in-context transforms the model's next-token distribution, allowing the self-teacher to agree or disagree with the student's original choices at specific tokens. This yields dense, logit-level credit assignment."

5. > "Our work shows that *each language model is implicitly a PRM* through retrospection if given rich feedback."

6. > "In the same way that in-context learning is an emergent phenomenon with scale, the self-teacher's ability to perform accurate retrospection in SDPO appears to be emergent with scale."

7. > "The self-teacher's initial accuracy is <1% for almost all questions, and even exactly 0% on 78% of them. This shows that a single turn of in-context feedback is insufficient to solve the problem."

---

## Critical Assessment

### The introspection framing vs. the conditioning reality

The paper's narrative is that SDPO works because the model can "retrospectively identify its own mistakes." The actual mathematical object is `π_θ(·|x, f, y_<t)` — the same network producing a different distribution because the prompt changed. There is no introspection; there is conditional next-token prediction.

```
┌─────────────────────────────────────────────────────────────────────┐
│  THE LITERAL MECHANISM                                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  "Self-teacher" = π_θ(· | x, f, y_<t)                               │
│  "Student"      = π_θ(· | x,    y_<t)                               │
│                                                                     │
│  The teacher does NOT have privileged access to "I was wrong."      │
│  The teacher has the FEEDBACK STRING in its prompt.                 │
│  The model conditions on text in exactly the way it always does.    │
│                                                                     │
│  SDPO works because π(· | x, "ZeroDivisionError on line 73") is a   │
│  better policy than π(· | x). That is a fact about CONDITIONING,    │
│  not introspection.                                                 │
│                                                                     │
│  The model has been pretrained on the entire internet of            │
│  StackOverflow / code reviews / "fix the bug" patterns. SDPO is,    │
│  in effect, distilling those priors back into the policy through    │
│  question-specific feedback.                                        │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Five pieces of evidence the predictive reading is correct

1. **The model needs the text feedback to "know" it was wrong.** A genuinely introspecting agent could self-correct from x alone. SDPO architecturally cannot.

2. **§4.6 ablation:** including the student's own response y in the teacher prompt (f = output + own_sol + y) gives **44.5%** vs. without y **48.3%**. A self-introspecting agent shouldn't be biased by re-seeing its own answer. A pattern-completer is — its next-token distribution is dragged toward its own prior.

3. **0% one-shot teacher accuracy on 78% of hard questions.** The teacher does not "know" the answer in any single forward pass. It just provides slightly-less-bad gradient pressure. This is gradient descent in policy space, not "the model identified its mistake."

4. **Verbose CoT reduction.** GRPO produces 5× "Hmm.", 25× "Wait", explicit "Wait I'm going in circles" — and SDPO removes the filler while *improving* accuracy. If verbose CoT were genuine reasoning, removing it should hurt. SDPO's denser supervision signal doesn't reward filler, so the filler disappears. Long CoT under RLVR is reward-hacking pattern completion.

5. **Scaling matches ICL emergence, not reasoning emergence.** SDPO's gain is coupled to in-context-learning strength. The paper says this explicitly: "the self-teacher's ability to perform accurate retrospection in SDPO appears to be emergent with scale" — exactly tracking ICL emergence.

### Why this paper is recorded as SUPPORTS

The paper itself is methodologically neutral. It does not take a position on reasoning vs. prediction. But the *mechanism it demonstrates* and the *control conditions it provides* are remarkably good evidence for the predictive view:

- The central engine is conditional next-token prediction, repackaged as "retrospection."
- Empirically it requires textual feedback channels — no self-verification from x alone.
- Scaling tracks ICL.
- Ablations show classic predictive-bias signatures (the teacher being dragged toward the student's prior).

The honest synthesis: SDPO is a powerful demonstration of how much capability you can extract by treating an LLM as a sophisticated conditional density estimator. The "self-teaching" framing is a useful metaphor for paper-writing; the underlying mechanism is "conditioning on feedback strings shifts the predictive distribution in useful directions, and you can distill that shift into the unconditional weights."

---

## Status
- [x] Read complete
- [x] Core claims extracted
- [x] Key evidence with numbers
- [x] Rebuttals checked
- [x] Paper graph updated
