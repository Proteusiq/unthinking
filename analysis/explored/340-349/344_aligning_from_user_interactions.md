# Paper 344: Aligning Language Models from User Interactions (SDPO@User)

## Metadata
- **arXiv**: 2603.12273 (v1, Feb 2026)
- **Title**: Aligning Language Models from User Interactions
- **Authors**: Thomas Kleine Buening, Jonas Hübotter, Barna Pásztor, Idan Shenfeld, Giorgia Ramponi, Andreas Krause
- **Affiliation**: ETH Zürich + MIT + UZH
- **Code**: [github.com/lasgroup/user_interactions](https://github.com/lasgroup/user_interactions) (Apache-2.0; supports both online and offline SDPO; multi-GPU via accelerate)
- **Stance**: SUPPORTS (strongly) - the personalization-without-explicit-feedback result is among the cleanest empirical evidence in the corpus that LLM "learning" is preference disambiguation over a pre-existing predictive prior.
- **Cluster**: `alignment`

> **Two operating modes shipped in code:**
> - **Online SDPO**: real-time interactive loop (Gradio UI optional). Default policy `Qwen/Qwen3-8B`, default user simulator `Qwen/Qwen3-32B` *or* Claude API; LR `5e-6`; `train_steps_per_example=1`; `loss_mode="full_distillation"`; `distillation_topk=20` (note: paper text says 100 in SDPO root paper).
> - **Offline SDPO**: trains on pre-collected WildFeedback/WildChat JSONL via `accelerate`. Default `Qwen/Qwen3-4B`; LR `2e-6`; batch 4; grad-accum 8; 2 epochs.
>
> **Exact hindsight prompt template (verbatim from `online_sdpo_updater_config.py`)**:
> ```
> === HINDSIGHT CONTEXT ===
> [The following is a future user message. Use this to guide your answer to the user prompt.]
> {follow_up}
> ```
> Subtly different from the paper's Table 1 wording. The semantics are equivalent (same conditioning role for the future user message), but anyone reproducing should match the code form.

---

## Core Finding

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  ALIGNMENT BY HINDSIGHT, NOT BY REASONING                            │
│                                                                      │
│  The teacher and the student are the SAME model.                     │
│  Only difference: the teacher's prompt has one extra message -       │
│  the user's NEXT message (the follow-up `o`).                        │
│                                                                      │
│      A_i(x, y, o) := log [ π_θ(y_i | x, o, y_<i)                     │
│                          / π_θ(y_i | x,    y_<i) ]                   │
│                                                                      │
│  Trained on 14k WildChat conversations / 50k tuples (x,y,o):         │
│  • Qwen3-4B AlpacaEval 2.0:  37.9 → 46.1   (+8.2)                    │
│  • Qwen3-8B IFEval:          83.9 → 85.0   (+1.1)                    │
│  • TruthfulQA / HellaSwag / CommonsenseQA: unchanged                 │
│  • Personalization: >85% win rate after 50 interactions              │
│  • >95% after 200 interactions                                       │
│                                                                      │
│  ⇒  Matches an ORACLE with the explicit user profile in its prompt.  │
│                                                                      │
│  Smoking gun: ~50 silent follow-ups recovers preferences that the    │
│  oracle gets only with an explicit textual description. The          │
│  preference axes were ALREADY ENCODED in the predictive prior.       │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Core Claims

1. **Multi-turn user interactions are an underutilized data modality.** Follow-up messages contain implicit signals that are typically discarded. Learn from them with no explicit reward, preference label, or curation.
2. **The model's own in-context capability is the supervision lever.** The hindsight (post-follow-up) distribution is the teacher; the difference between hindsight and original yields the learning signal.
3. **SDPO extracts this signal at the token level.** Log-ratio between hindsight and original token probabilities serves as both (i) a token-level "advantage" (policy gradient view) and (ii) a reverse-KL distillation loss - equivalent in expectation.
4. **14k raw WildChat conversations improve alignment without regressing other capabilities.** Same mechanism enables online personalization with no explicit feedback.
5. **The signal is robust and interpretable.** Advantages on irrelevant follow-ups are near zero (no spurious updates); relevant feedback produces sharp, semantically meaningful token-level penalties/rewards.

---

## Methodology

### Hindsight mechanism (chat template, Table 1)
Given an interaction tuple `(x, y, o)`:
- `x` = conversation history including most recent user prompt
- `y` = assistant response from `π_θ(·|x)`
- `o` = the user's *next* message (the follow-up)

Re-prompt the same model:
```
User: <conversation> x
      <hindsight context> The following is a future user message.
      Use this to guide your answer to the user prompt: o
A:    <assistant completion> y
```

Recompute logits for the *same* `y` but conditioned on the future message `o`. Token-level advantage:

```
A_i(x, y, o) = log [ π_θ(y_i | x, o, y_<i) / π_θ(y_i | x, y_<i) ]
```

### Auto-filtering of irrelevant follow-ups
**No explicit gate.** When `o` is unrelated to `y`, attention treats it as neutral and the hindsight distribution is close to the original. `A_i ≈ 0`, gradient vanishes. Suppression is *emergent*, inheriting the model's own attention-routed judgment of relevance.

### Loss
Self-distillation form (Eq. 2):
```
L_SDPO(θ) = Σ_i KL( π_θ(·|x, y_<i) ‖ π̄_θ(·|x, o, y_<i) )
```
where π̄_θ is the **stop-gradient** hindsight policy.

Off-policy variant (Eq. 4) used because WildChat completions came from GPT-3.5/4, not the trained model. Biased w.r.t. on-policy SDPO but principled.

### Latent-reward interpretation (Appendix A)
Under stylized assumptions (Boltzmann user + Bayesian-posterior model), sequence-level advantage equals `r(x,y) − log Z(x,y)`. SDPO is implicitly maximizing the user's latent reward. Authors disclaim: "the attention mechanism in a transformer does not implement Bayesian conditioning in a literal sense."

### Relationship to SDPO root paper
This is an **application** of Hübotter et al. 2026 (#343, arXiv 2601.20802) where the "extra context" used to form the teacher distribution is specifically the user's follow-up `o`.

---

## Key Evidence

### General-alignment gains (Table 2)

| Model | Bench | Before → After | Δ |
|-------|-------|----------------|---|
| Qwen3-4B | AlpacaEval 2.0 LC | 37.9 → 46.1 | **+8.2** |
| Qwen3-4B | IFEval Prompt-Level | 81.9 → 83.2 | +1.3 |
| Qwen3-4B | ArenaHard-v2 (Hard) | 9.0 → 7.8 | −1.2 (regression) |
| Qwen3-4B | MMLU-Pro CoT | 58.1 → 58.0 | flat |
| Qwen3-8B | AlpacaEval 2.0 LC | 49.3 → 51.9 | +2.6 |
| Qwen3-8B | IFEval | 83.9 → 85.0 | +1.1 |
| Qwen3-8B | ArenaHard-v2 (Hard) | 14.0 → 15.5 | +1.5 |
| Qwen3-8B | ArenaHard-v2 (Creative) | 13.7 → 16.2 | +2.5 |
| Qwen3-8B | MMLU-Pro CoT | 62.5 → 63.3 | +0.8 |
| Olmo3-7B-DPO | AlpacaEval 2.0 LC | 50.4 → 51.8 | +1.4 |
| Olmo3-7B-DPO | ArenaHard-v2 Creative | 8.2 → 10.0 | +1.8 |

> "For Qwen3-8B we observe no degradation on any benchmark."

### Robustness - random WildChat slice (Table 3, Qwen3-8B)
Random 14k slice (no curation, ~50k tuples): AlpacaEval +1.4, IFEval +0.6, MMLU-Pro flat, ArenaHard-Hard −0.6. Curation helps but isn't required.

### SFT collapses (Table 4, Qwen3-4B)
Standard SFT on the same WildFeedback (x, y) pairs:
- AlpacaEval 2.0: 37.9 → **18.9** (−19.0)
- IFEval: 81.9 → 73.2 (−8.7)
- ArenaHard Hard: 9.0 → 3.1 (−5.9)
- MMLU-Pro: 58.1 → 51.2 (−6.9)

→ "supervised fine-tuning on the assistant completions leads to a substantial degradation across all benchmarks."

### Pre-training preserved (Table 6, Qwen3-8B)
- TruthfulQA MC1: 0.366 → 0.3647 (within stderr)
- HellaSwag: 0.5717 → 0.5710
- CommonsenseQA: 0.7846 → 0.7871

→ No catastrophic forgetting.

### Personalization (Figures 4–6)
- **>85% win rate** after only 50 interactions.
- **>95%** after 200 interactions.
- "Continual online adaptation with SDPO matches and can even exceed the performance of [an] in-context oracle that is explicitly provided with the full user profile description in its prompt."
- **Preference flipping** (Fig. 4): after 250 interactions of one preference, flipping the simulated user's preference reverses the policy quickly.
- **Continual personalization without forgetting** (Fig. 6): three sequential preferences (500 interactions each) accumulate without regression.

---

## Relationship to Other Papers

### Supports
- **2601.20802 (#343) - SDPO**: this paper is the user-interactions instantiation of the same algorithm.
- **2601.19897 (#342) - SDFT**: companion; same self-distillation principle for continual learning from demonstrations.
- **2604.01193 - Embarrassingly Simple Self-Distillation**: convergent. SSD reshapes distributions via simple token-level signal; SDPO@User reshapes via user-follow-up. Both: same network, different conditioning, no new reasoning learned.
- **2312.01552 - URIAL / Superficial Alignment**: 50-interaction silent personalization matching an explicit-profile oracle is a uniquely sharp version of the URIAL claim that "alignment is mostly surface" - preference axes are pre-encoded.
- **2410.03717 / 2506.07452 - Superficial Alignment cluster**: extends to the user-interaction setting.
- **2602.06176 - LLM Reasoning Failures Survey**: SDPO@User's mechanism (in-context revision becomes weight update) corroborates the survey's "next-token prediction" root cause.

### Extends
- **RLHF (Ouyang 2022) / DPO (Rafailov 2023)**: alternative to preference-based alignment without explicit feedback collection.
- **Snell 2022 - Context distillation**: the "context" being distilled is the *future* user information about a *past* response.
- **WildFeedback (Shi 2024)**: provides the curated dataset; this paper builds the algorithm.

### Provides Mechanism For
- **Sycophancy literature (e.g., 2310.13548 Understanding Sycophancy)**: explicit safety-section warning that user follow-ups can reward sycophantic/manipulative behavior. The hindsight-conditioning mechanism that enables silent preference disambiguation is *the same mechanism* that bakes in flattery if positive follow-ups follow flattering responses. SDPO@User is mechanistically a sycophancy-amplification scheme by default; safety must be added externally.

### Challenges
- **In-context-only correction methods (Self-Refine, Reflexion)**: those leave the model unchanged; SDPO@User makes the correction permanent.

---

## REBUTTALS

### Known Rebuttals
None at time of analysis (Feb 2026 paper).

### Limitations (Authors Acknowledge)
1. **Adversarial drift**: "User follow-ups may implicitly encourage behaviors that conflict with existing safety or alignment constraints…"
2. **No benign/adversarial discrimination**: "SDPO derives a local, token-level learning signal and naturally suppresses updates from irrelevant interactions, [but] does not by itself distinguish between benign and adversarial learning signals."
3. **Capability-dependent**: "SDPO is most effective when the base model can reliably interpret and exploit the hindsight signal provided by user follow-ups. For smaller or less instruction-tuned models, this signal appears weaker or less stable" (Qwen3-4B regressed −1.2 on ArenaHard Hard).
4. **Latent-reward derivation is idealized** - attention is not literal Bayesian conditioning.
5. **Off-policy bias**: surrogate L̂_SDPO is biased w.r.t. on-policy SDPO.
6. **Privacy / governance**: separate from technical limitations; collection of user data needs consent/governance.

---

## Key Quotes

1. > "Importantly, **language models are already able to make use of this information in context**. After observing a user's follow-up, the same model is often able to revise its behavior. We leverage this ability..."

2. > "These observations suggest a simple but powerful perspective: having seen the user's follow-up message, the model's behavior is often better aligned than before. **The user interaction reveals information that the model can already interpret and act upon, but only after the fact. *In hindsight*.**"

3. > "**This suggests that a model's in-context learning ability can be used as a lever for learning directly from user interactions in a principled way.**"

4. > "In other words, **we distill the model into itself**."

5. > "Continual online adaptation with SDPO matches and can even exceed the performance of this oracle, suggesting that **interaction-based learning can extract preference signals that are difficult to encode purely through prompting**."

6. > "Overall, these visualizations highlight two key properties of our self-distillation approach. First, **the token-level advantages are highly interpretable** and align with intuitive notions of user feedback when such feedback is present. Second, **SDPO is robust to irrelevant or uninformative user follow-ups**, naturally suppressing learning updates when the interaction does not convey actionable information."

---

## Critical Assessment

```
┌─────────────────────────────────────────────────────────────────────┐
│  THE SMOKING GUN                                                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  The teacher and the student are the SAME network.                  │
│  Only difference: teacher's prompt has one extra message (o).       │
│                                                                     │
│  ⇒  "Learning" = redistributing probability mass that already       │
│      existed in the parameters.                                     │
│                                                                     │
│  ⇒  Personalization with NO explicit feedback matches an oracle     │
│      given the EXPLICIT user profile in its system prompt.          │
│                                                                     │
│  ⇒  ~50 follow-ups → 85% win rate. The dimensions the user          │
│      "teaches" are already encoded in the LM's predictive prior.    │
│                                                                     │
│  This is alignment-as-disambiguation, not alignment-as-reasoning.   │
│  The follow-up is an INDEX into existing predictive structure.      │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Why this paper is one of the strongest pieces of thesis-evidence in the corpus

The personalization result is decisive. With **only ~50–200 follow-up messages** and **no explicit description of the user's preferences**, the model converges to behavior matching/exceeding an oracle that was *given the explicit profile in its system prompt*. This means:

1. The model's parameters already contain a vast library of stylistic/preference dimensions (concise/detailed, casual/professional, beginner/expert, no-emoji, no-sycophancy).
2. The user's follow-ups don't *teach* these dimensions - they *select* among them.
3. The follow-up `o` acts as an *index* into existing predictive structure.
4. The model is performing **preference disambiguation by next-token-likelihood-shifting** - exactly what predictive next-token models do.
5. Preference *flipping* and *complementary accumulation* both work, consistent with orthogonal pre-existing dimensions in the predictive embedding space.

### The signal-vs-noise property is also predictive, not reasoning

The "irrelevant follow-ups produce near-zero advantage" property (§4.3, Fig. 8) is pure prediction. If the model's prediction of `y` given `x` is unchanged when irrelevant `o` is appended, that's because attention has already learned that unrelated tokens shouldn't influence prediction of the prior region - a *learned predictive prior*, not "judgment" or "reasoning" about relevance.

### The honest counter-argument

Recognizing that a complaint about tone applies to specific words requires *understanding* what `o` says. Isn't that reasoning?

**Why this fails as a counter:** recognizing tone-relevance in feedback is exactly what a sufficiently good next-token *predictor* of human conversations would do - humans always do this in their text, so the model has learned the joint distribution. The paper itself frames this as "in-context learning," which is well-understood as implicit Bayesian inference / pattern-matching over training distribution structure (cited: Yadkori 2024, Luo 2025). And benchmark gains are modest (1–3 pts typically); the smaller Qwen3-4B *regresses* on the harder ArenaHard Hard benchmark - exactly where prediction is too weak to make redistribution useful.

### Bottom line

The paper does not itself frame its findings as evidence about reasoning vs. prediction (the authors describe their work in alignment/RL terms - "latent reward," "policy optimization"). The thesis-relevant interpretation is derived from the mechanics: every architectural choice and every quoted sentence about "in-context learning ability as a lever" is consistent with a pure-prediction reading of LLM behavior, and *inconsistent* with a strong-reasoning reading.

A reasoning system wouldn't need a hindsight prompt to correct itself. It wouldn't have the "right" distribution sitting one prompt away from the wrong one. SDPO@User works *because* LLMs are conditional density models, full stop.

---

## Status
- [x] Read complete
- [x] Core claims extracted
- [x] Key evidence with numbers
- [x] Rebuttals checked
- [x] Paper graph updated
