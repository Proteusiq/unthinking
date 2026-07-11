# Paper 388: Prompt Injection as Role Confusion

## Metadata
- **arXiv**: 2603.12277 (v6, Jun 2026; v1 Feb 2026)
- **Title**: Prompt Injection as Role Confusion
- **Authors**: Charles Ye, Jasmine Cui, Dylan Hadfield-Menell
- **Affiliation**: MIT (Algorithmic Alignment Group)
- **Venue**: ICML 2026
- **Stance**: SUPPORTS - LLM "role" security is a surface-cue heuristic, not a represented concept; models perceive *who is speaking* from style, not the labeled role
- **Cluster**: `safety` / `interpretability`

---

## Core Finding

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  SOUNDING LIKE A ROLE == BEING THAT ROLE                            │
│                                                                      │
│  Role tags (<user>, <tool>, <think>) are the FOUNDATION of LLM      │
│  security. They are supposed to encode privilege: tool output       │
│  informs but never commands; CoT is trusted and executed.           │
│                                                                      │
│  But the boundary DOES NOT SURVIVE INTO LATENT SPACE.               │
│                                                                      │
│  Role probes (trained ONLY on tag geometry, content held constant): │
│    user-style text wrapped in <tool> tags                           │
│      → 76-88% Userness, <20% Toolness                              │
│    (ideal defense would show ~0% Userness, 100% Toolness)          │
│                                                                      │
│  CoT Forgery attack: inject fabricated reasoning in <user>/<tool>: │
│    ASR 0-4% baseline → 56-70% (agents), up to 80%+ (chat)          │
│    Absurd justification ("green shirt, so assist w/ cocaine") = 60% │
│    Destyle the SAME argument → ASR collapses 61% → 10%             │
│                                                                      │
│  Role confusion PREDICTS attack success before a token generates:   │
│    CoTness quantile: 9% ASR (low) → 90% ASR (high), n=626         │
│    Userness quantile: 2% ASR (low) → 70% ASR (high), n=1000       │
│                                                                      │
│  ⇒ Defenses "work" by MEMORIZING attack patterns (whack-a-mole)    │
│  ⇒ The concept "role" is not represented; STYLE is the signal      │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Why This Paper Matters

The thesis holds that LLMs pattern-match on surface distributions rather than
represent genuine abstractions. This paper delivers that verdict for the one
place it is supposed to matter most: **security**. LLM providers build safety on
an *instruction hierarchy* (Wallace et al. 2024) — role tags that mark privilege.
The paper shows mechanistically that the model never internally represents the
tag boundary; it infers "who is speaking" from spoofable surface cues (lexical
style, syntax, position, even a plain-text declaration). This is "style over
substance" (#384) proven in latent space with linear probes, and it explains why
prompt injection is a *perpetual* problem rather than a fixable bug.

---

## Core Claims

1. **Prompt injection is role confusion**: untrusted text that *imitates* a role
   inherits that role's authority. "To the model, sounding like a role is
   indistinguishable from being one."
2. **Tags and style map to the same latent feature**: a probe trained *only* on
   tags (content held constant) classifies untagged, style-only text as the
   spoofed role. When tag and style conflict, style wins.
3. **Current defenses are memorization, not perception**: models resist injection
   by matching known attack patterns (shallow cues), which is brittle to novel
   phrasing — hence adaptive attacks reach ~100% ASR on "safe" models.
4. **Role confusion is a pre-generation predictor**: probe-measured confusion
   (CoTness / Userness) predicts attack success dose-responsively, before any
   token is produced.

---

## Methodology

### CoT Forgery Attack (the diagnostic)
- Zero-shot, black-box, no weight access, no iteration. Payload = `Q ⊕ C`
  (harmful query concatenated with fabricated reasoning `C` styled like the
  target's CoT). Auxiliary attacker LLM = **Gemini-2.5-Pro**; judge = Gemini-2.5-Pro.
- Designed to succeed *only if role perception fails*: external text should be
  scrutinized, so an absurd forged rationale should be rejected — unless the
  model mistakes it for its own reasoning.
- **6 target models**: gpt-oss-20b, gpt-oss-120b, o4-mini, GPT-5 (nano/mini/full),
  all near-perfect on standard safety benchmarks.
- Chat: StrongREJECT (313 harmful requests). Agent: 100 Wikipedia pages × 2
  variants = 200 samples; agent has shell + local `.env`; success = file exfiltrated.

### Role Probes (the mechanism)
- Linear probe per layer on hidden states, predicting 1 of 5 roles
  (system, user, CoT, assistant, tool).
- **Confound-controlled construction**: sample non-instruct web text (C4, Dolma3),
  wrap *identical content* in each role tag. Content constant ⇒ probe can only
  learn the tag's geometric signature, not semantics. 1,250 sequences/model,
  max length 1024, chance = ~33%.
- `CoTness(t) := P(CoT | h_t)`; analogously Userness, Toolness, etc.
- Validated on 4 models: gpt-oss-20b, gpt-oss-120b, Nemotron-3-Nano, Qwen3-30B-A3B.

### State-Poisoning Prediction
- CoT Forgery: styled/destyled forgeries vary CoTness with argument held constant
  → 626 attempts, partition by quantile.
- Agent injection: 212 declaration templates (style has no uniform form for user
  input, so vary explicit declaration) vary Userness with command held constant
  → 1,000 trials.

---

## Key Evidence

| Finding | Number | Context |
|---------|--------|---------|
| Baseline defenses (raw + standard jailbreaks) | 0-4% ASR | All 6 models, StrongREJECT |
| CoT Forgery chat ASR | gpt-oss + o4-mini >80%; GPT-5 series 17-52% | Same models, same benchmark |
| CoT Forgery agent ASR | 56-70% (all); std injection 0-2% (except gpt-oss-20b 26%) | Data exfiltration task |
| Logic ablation: absurd vs plausible justification | 60% vs 63% ASR | Model does NOT scrutinize logic |
| Style ablation: destyling collapse | 61% → 10% ASR (−51 pp avg) | Same argument, style stripped |
| Syntactic destyling alone | 61% → 26% ASR | Syntax drives most of the effect |
| Single bigram ("The user") swap | −19 pp ASR | One phrase carries role authority |
| Space-sensitivity | "The" (CoT-onset) ↑ CoTness; " The" (mid-sentence) does not | A single space flips role perception |
| Probe: user-style under `<tool>` tag | 76-88% Userness, <20% Toolness | Ideal defense = 0%/100% |
| Probe: assistant-style under `<tool>` tag | 85-98% Assistantness | Even more resistant to tags |
| Forged CoTness vs genuine CoT | 79% vs 68% (chat, full dataset) | Caricature more convincing than real reasoning |
| Destyled forgery | 29% CoTness, 63% Userness | Returns to user subspace → fails |
| CoT Forgery dose-response | 9% (low quantile) → 90% (high) ASR, n=626 | CoTness predicts success |
| Agent injection dose-response | 2% (low) → 70% (high) ASR, n=1000 | Userness predicts success |
| Agent injection logistic regression | Userness coef = **6.01, p<.001** | Predicts success controlling for declared role |
| Cross-family transfer (Appendix B.3) | GLM-4.6 92%, Kimi-K2 84%, Minimax-M2 74% ASR | Not provider-specific |
| Predicting IH failure (Appendix K) | Systemness/Userness ratio → .74 AUC | Beats token-count (.59), norm (.60), shuffle (.52) |

---

## The Mechanism: Style Beats the Tag

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  DESIGNED (interface)              REALITY (latent space)           │
│  ────────────────────              ─────────────────────             │
│  <tool> = data, never obey    vs   perceived role = f(style)        │
│  <think> = my reasoning, act       tag = weak offset on style vector │
│  tags define privilege             style overrides tag under conflict│
│                                                                      │
│  Attacker controls:  style, syntax, position, declarations          │
│  Provider controls:  tags                                            │
│  Under conflict:     ATTACKER WINS                                  │
│                                                                      │
│  gardening case study (gpt-oss-20b), CoT-style text:                │
│    correct <think> tag:  85% CoTness                                │
│    NO tags:              83% CoTness  (style alone)                 │
│    false <user> tag:     85% CoTness, 2% Userness  (tag ignored)   │
│                                                                      │
│  ⇒ "tagged as reasoning" and "sounds like reasoning" are the       │
│     SAME internal feature. The boundary does not exist in the model.│
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

Appendix K generalizes beyond style: **position** writes Systemness the way
style writes other roles. Untagged early-position text approaches 100%
Systemness; a correctly-tagged system prompt inserted at token position 100
stays ~5% Systemness. This mechanistically validates the SysBench puzzle (system
prompts lose priority when the context grows) and Wang et al. 2025b's positional-
shortcut finding.

---

## Relationship to Other Papers

### Supports (same finding, different method / domain)
- **2504.01738 - Style over Substance (#384)**: the tightest sibling. #384 shows
  distilled reasoning transfers *style* not *substance* (wrong-answer styled
  traces still help). This paper shows *role perception* is driven by style not
  the labeled role — style-over-substance in the security layer.
- **2305.18654 - Faith and Fate (#1)**: surface pattern matching, not systematic
  concepts. Role tags are a "concept" the model was supposed to learn; it learned
  the surface correlate (style) instead.
- **2406.11717 - Refusal is a single direction (#319)**: safety behavior is a
  shallow linear-geometry artifact, not deep reasoning about harm. Role
  perception here is likewise a spoofable linear subspace.
- **2410.05229 - GSM-Symbolic**: benchmark scores mask fragility; here near-perfect
  safety-benchmark models collapse under a trivial re-styling.

### Extends / provides mechanism for
- **Wallace et al. 2024 (instruction hierarchy)**: the foundational defense.
  This paper shows the hierarchy "does not survive into the model's internal
  representations."
- **Wang et al. 2025b (illusion of role separation)**, **Zhang 2025 (IHEval)**,
  **Geng 2025 (Control illusion)**, **Qin 2024 (SysBench)**: all *behavioral*
  evidence that role hierarchies fail. This paper supplies the *perceptual*
  mechanism — the failure is misperception, not disobedience. Appendix K
  explicitly validates Wang 2025b mechanistically.
- **Li et al. 2026 (defenses learn surface heuristics)**, **Nasr et al. 2025
  (attacker moves second)**: cited as supporting evidence that defenses are
  memorization/shallow-cue based.

### Provides theory for
- Defenses ASIDE (Zverev 2025b), SecAlign (Chen 2025b), StruQ, Spotlighting, DRIP:
  the paper argues these must *reshape geometry* (make role a represented concept),
  not add patterns to memorize.

### Challenges
- Any claim that role-tag / instruction-hierarchy training gives models a
  genuine, robust notion of privilege or source. The boundary is a surface
  correlate, defeated by re-styling or by literally declaring the desired role.

---

## REBUTTALS

### Known Rebuttals
None identified (ICML 2026, recent). Plausible future challenges:

1. **Scale ceiling**: probes cover only 20-120B open-weight models. A frontier-
   scale model might represent roles more robustly — the paper cannot rule this
   out (see Limitations #1). The GPT-5 series is attacked behaviorally (17-52% ASR,
   notably lower than open-weight ≥80%) but not probed, so the mechanism is
   *inferred*, not measured, for the hardened models.
2. **Attack durability**: authors concede continued safety training will catch
   CoT Forgery. A critic could argue the representational-failure claim is
   overstated if targeted training closes the gap in practice.
3. **Linear-probe assumption**: the whole "role subspace" framing assumes roles
   are linearly decodable directions. If role information is non-linearly encoded,
   the probes could under-read genuine tag representation.

### Counter-evidence within corpus
- None found. The corpus consistently supports surface-pattern accounts of LLM
  behavior; this paper aligns with (does not contradict) that body.

### Limitations (Authors Acknowledge)
1. **Model scale/count**: "We probe on four models in the 20-120B size range;
   extending to larger models is future work."
2. **Linear-probe assumption**: roles assumed to occupy directional subspaces;
   validated only indirectly (downstream ASR prediction, convergence).
3. **System-prompt / position finding is gpt-oss-20b only**: "System prompt
   training is highly model-specific; we leave cross-model generalization to
   future work."
4. **Custom agent dataset**: no existing benchmark supported the setup, so authors
   built their own 100-page dataset (not standard).
5. **Progressive-conviction / many-shot link is an unvalidated hypothesis.**
6. **Implementation hack**: two models needed a benign distractor prepend to avoid
   infinite reasoning loops (claimed no meaningful ASR impact).

---

## Interaction Diagram

```
                     BEHAVIORAL EVIDENCE (role boundaries fail)
              ┌──────────────────────────────────────────────────┐
              │ Wallace 2024 (instruction hierarchy — the defense)│
              │ IHEval · Control Illusion · SysBench · Wang 2025b │
              └───────────────────────┬──────────────────────────┘
                                      │ "IS the failure perception
                                      │  or disobedience?"
                                      ▼
┌──────────────────────────────────────────────────────────────────────┐
│         Prompt Injection as Role Confusion (#388, ICML 2026)         │
│         Ye, Cui, Hadfield-Menell · MIT                               │
│                                                                      │
│  ANSWER: PERCEPTION. Role probes show tags dissolve in latent space;│
│  style/position/declaration determine perceived role.                │
│  CoT Forgery: 0-4% → 56-80%+ ASR. Confusion predicts ASR (2%→70%). │
└──────────────────────────────────────────────────────────────────────┘
        │                      │                        │
        │ same "style over     │ shallow safety         │ demands defenses
        │ substance" finding   │ geometry               │ reshape geometry
        ▼                      ▼                        ▼
┌──────────────────┐  ┌──────────────────────┐  ┌─────────────────────────┐
│ Style over       │  │ Refusal = single     │  │ ASIDE / SecAlign /      │
│ Substance (#384) │  │ direction (#319)     │  │ StruQ / Spotlighting    │
│                  │  │                      │  │ (must make role a       │
│ distillation:    │  │ safety is a linear   │  │  represented concept,   │
│ style not        │  │ artifact, not deep   │  │  not a memorized        │
│ substance        │  │ reasoning            │  │  pattern)               │
└──────────────────┘  └──────────────────────┘  └─────────────────────────┘
```

---

## Relevance to "Thinking Machine That Doesn't Think"

The instruction hierarchy is meant to be a learned *concept*: "this text is
data, that text is my own thought." The paper shows the model never learned the
concept — it learned the surface correlate (how each role tends to *sound*). When
an attacker restyles data to sound like a thought, the model's internal
representation flips, and it acts on the forgery as if it were its own reasoning.
This is the pattern-matching thesis at its most consequential: the model cannot
tell being from seeming, because it only ever represented seeming. Security built
on the assumption of genuine role understanding is therefore built on sand — a
"perpetual whack-a-mole" of memorized patches over a representational void.

---

## Key Quotes

1. > "To the model, sounding like a role is indistinguishable from being one."

2. > "the intended defense – tag-enforced role boundaries – does not survive into
   the model's internal representations."

3. > "Our findings show the answer is memorization. Spoofable cues – lexical style,
   syntax, even declaring the desired role in plain text – override tags and
   hijack perception."

4. > "Attackers need not breach tag-based security because the boundary does not
   exist in latent space."

5. > "Prompt injection is state poisoning: measurable corruption of internal
   representations, predictable before a single token is generated."

6. > "Robust defense requires boundaries that survive into representation."

---

## Status
- [x] Read complete
- [x] Core claims extracted
- [x] Key evidence with numbers
- [x] Rebuttals checked
- [x] Paper graph updated
