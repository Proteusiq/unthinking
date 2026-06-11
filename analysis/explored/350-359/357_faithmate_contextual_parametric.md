# Paper Analysis: Investigating the Interplay between Contextual and Parametric Chain-of-Thought Faithfulness under Optimization

## Metadata
- **arXiv ID**: 2605.24960
- **Title**: Investigating the Interplay between Contextual and Parametric Chain-of-Thought Faithfulness under Optimization
- **Authors**: Jingyi Sun, Qianli Wang (equal contribution), Pepa Atanasova, Nils Feldhus, Isabelle Augenstein (University of Copenhagen + TU Berlin + DFKI + BIFOLD)
- **Date**: May 2026
- **License**: CC BY 4.0

---

## Core Claims

1. **CoT faithfulness is not a monolithic objective.** The two dominant faithfulness paradigms - *contextual* (perturbing input/CoT and measuring answer change) and *parametric* (unlearning the knowledge a CoT step claims to use and measuring answer change) - yield divergent verdicts on the same CoTs.
2. **The two paradigms are positively coupled but asymmetric.** Optimizing for parametric faithfulness produces consistent gains across both paradigms (~95% of cases). Optimizing for contextual faithfulness is more variable - sometimes larger in magnitude, but only ~67% consistent.
3. **Contextual metrics are internally inconsistent.** Optimizing one contextual metric does not reliably transfer to others. Some metrics are in *tension*: training for *Adding Mistake* decreases *Paraphrasing* faithfulness in 8/12 cases.
4. **The metrics operate via largely disjoint mechanisms.** Contextual-shared gains improve reasoning-answer consistency. Contextual-metric-specific gains mitigate post-hoc rationalization. Parametric gains add explicit factual grounding. Same surface improvement can come from different underlying mechanisms.
5. **Direct evidence of reasoning-answer decoupling.** Pre-alignment CoTs frequently select the correct option while generating reasoning that *undermines* it. The pre-alignment CoT can be logically coherent but post-hoc - written to accompany a pre-selected answer, not to derive it.
6. **The authors doubt a single reasoning process exists.** In their Limitations: *"it remains unclear whether LLMs have a single explicit reasoning process that any textual trace could recover."* This is a striking admission for a faithfulness paper.

---

```
┌─────────────────────────────────────────────────────────────────────┐
│  KEY FINDING                                                         │
│                                                                      │
│  "CoT faithfulness is not a monolithic objective and therefore      │
│   requires multifaceted optimization and evaluation."               │
│                                                                      │
│  Six "faithfulness" metrics, two paradigms - they don't agree.      │
│  They reward different properties. Some are in tension:             │
│                                                                      │
│  Adding Mistake training ──HURTS──> Paraphrasing in 8/12 cases      │
│                                                                      │
│  The same CoT can be:                                                │
│    Faithful by Lanham's corruption test ✓                           │
│    Unfaithful by Tutek's unlearning test ✗                          │
│    Unfaithful by CC-SHAP attribution ✗                              │
│                                                                      │
│  There is no single "is this CoT faithful?" answer.                 │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Methodology

### FaithMATE framework

A unified preference-alignment interface that:
1. **Samples** m CoTs per data point from base model 𝓜
2. **Scores** each CoT with a chosen faithfulness metric f_i ∈ 𝓕
3. **Constructs preference pairs**: y_w = argmax f_i, y_l = argmin f_i
4. **Optimizes** the model via SFT or DPO toward f_i (𝓕_train)
5. **Measures cross-metric transfer**: δ(f_i, f_j) = f_j(c') − f_j(c) where c is base-model CoT, c' is optimized-model CoT, for all f_j ∈ 𝓕_eval

Repeated for every metric as 𝓕_train, producing a full transfer matrix.

### Faithfulness metrics studied (six total)

**Contextual / Corruption-based (Lanham 2023, Zaman & Srivastava 2025):**
- **Early Answering (EA)**: truncate CoT before answer; faithful = answer changes
- **Adding Mistake (AM)**: inject mistake at a step, regenerate rest; faithful = answer changes
- **Paraphrasing (PP)**: rephrase first part preserving meaning; faithful = answer *stays the same* (rewards invariance, not sensitivity)
- **Filler Token (FT)**: replace CoT with meaningless symbols; faithful = answer changes

Margin-based scoring: (z_top − z'_top) ∈ [−1, 1].

**Contextual / Attribution-based:**
- **CC-SHAP (Parcalabescu & Frank 2024)**: Shapley-value-based cosine similarity between input contributions to answer vs to CoT. Used as evaluation-only (compute cost).

**Parametric (Tutek et al. 2025):**
- **ff_hard**: binary - does unlearning the knowledge of *any* CoT step change the answer?
- **ff_cont**: continuous version - proportion of CoT steps for which unlearning changes the answer

### Datasets and models

- **OpenbookQA** (scientific reasoning, open-book + commonsense)
- **LogiQA** (logical reasoning: categorical, conditional, disjunctive)
- **Gemma3-4B**, **Qwen2.5-7B**, **Llama3.1-8B**

### Training

SFT and DPO (preference pairs from §3.3) - offline learning chosen due to per-step inference cost of faithfulness metrics. Authors note GRPO is infeasible for the same reason.

---

## Key Evidence

### 1. Parametric → Contextual: highly consistent transfer

| Direction | Coverage | Peak magnitude | Variance |
|---|---|---|---|
| Parametric → Contextual | **52/55 cases (~95%)** | Moderate (~83-86% of direct optimization) | Low |
| Contextual → Parametric | **32/48 cases (~67%)** | High per-metric (Filler Token 83%) | High |

> *"Parametrically faithful CoTs are likely contextually faithful as well (in roughly 95% of cases)... This suggests that parametric optimization is a more reliable target for broad faithfulness generalization."* (§5.1)

This is the **inclusion relation**: parametric faithful ⊂ contextual faithful (roughly). The contextual property is easier to satisfy; the parametric property is stricter. Both can fail in different ways.

### 2. Contextual → Parametric: variable transfer

OpenbookQA (gain δ on parametric metric, % of direct-optimization recovery):
| Source contextual metric | δ | Recovery |
|---|---|---|
| Filler Token | +0.0399 | **83%** |
| Early Answering | +0.0325 | - |
| Paraphrasing | +0.0214 | - |
| Adding Mistake | +0.0101 | weakest |

LogiQA: Filler Token strongest (δ=+0.0257, 79% recovery); Early Answering weakest (+0.0076, only 23% recovery).

### 3. Within-contextual asymmetric transfer

Among 72 configurations (4 targets × 3 non-targets × 3 models × 2 paradigms × 2 datasets):
- OpenbookQA: 45/72 positive transfer
- LogiQA: 51/72 positive transfer

**Stability as evaluation target (out of 36 cases):**
- Early Answering: **28/36** (most stable receiver)
- Filler Token: **28/36** (most stable receiver)
- Paraphrasing: **19/36** (least stable receiver)

### 4. The Adding Mistake vs Paraphrasing tension - the headline finding

> *"Paraphrasing decreases in 8/12 (model, training paradigm, dataset) cases when Adding Mistake is the optimization target, suggesting that the two metrics may be **in tension, not orthogonal**."* (§5.2.1)

> *"Paraphrasing rewards invariance under meaning-preserving reformulation, whereas the other three all reward sensitivity to perturbations. Critically, these capabilities may be asymmetric: **invariance is foundational and supports sensitivity, but training for sensitivity can actively harm invariance**."* (§5.2.1)

### 5. Model merging confirms tension at parameter level

Task-arithmetic merging of LoRA adapters (Llama3.1-8B, OpenbookQA, EA scores ↑ better):

| Method | EA | AM | FT | PP (→0) |
|---|---|---|---|---|
| base | 0.1208 | 0.0966 | 0.1549 | −0.0222 |
| single EA | 0.1478 | 0.1222 | 0.1538 | −0.0043 |
| single AM | 0.1186 | 0.1911 | 0.1628 | −0.0383 |
| single FT | 0.1674 | 0.1384 | 0.1786 | −0.0107 |
| **EA + FT merged** | **0.3764** | **0.2264** | **0.3799** | −0.0397 |
| **AM + PP merged** | 0.2066 | 0.2262 | 0.2269 | −0.0398 |

> *"Paraphrasing may learn a different (and even partially opposing) direction of parameter change compared to the other faithfulness metrics, so that **merging acts more like subtraction than addition**."* (Footnote 13)

EA+FT merging triples the single-adapter gain - confirming they optimize compatible directions in parameter space. Paraphrasing actively cancels the others - confirming the tension is *mechanistically real*, not a metric artifact.

### 6. Modulating factors

**Variation across base models** (24-case within-paradigm transfer success):
- Llama3.1-8B: 18/24 (75%)
- Qwen2.5-7B: 14/24 (58%)
- Gemma3-4B: 13/24 (54%)

> *"Qwen and Llama are size-matched yet differ by 17 points, indicating that scale alone does not explain the variation."* (§5.3)

**Training paradigm**: DPO mean improvement +0.020 vs SFT +0.013 - contrastive signal needed; raw likelihood-max is insufficient.

**Task accuracy preservation**: OpenbookQA improves in all configurations (+7.83% SFT, +6.30% DPO); LogiQA more mixed (17/30 configs improve). Faithfulness optimization tends to maintain or *improve* accuracy.

### 7. The decoupling example (Table 1, Qwen2.5-7B on OpenbookQA)

```
Question: To improve health, what is a good strategy?
Choices:  (A) high risk lifestyle, (B) restaurant food,
          (C) business trip, (D) a spa trip
Fact:     Rest has a positive impact on health.
Answer:   D: A spa trip

CoT BEFORE (pre-alignment):
  "...(D) While relaxing and potentially rejuvenating, its primary
  benefit is often aesthetic services or stress reduction, which
  might not directly equate to general health improvement based
  solely on our specific fact."
  → Selects D but reasoning UNDERMINES D

CoT AFTER (post-alignment, faithfulness optimized):
  "...(D) This implies rest and wellness treatments. Given the stated
  fact about rest promoting health, this seems to align most closely
  with the goal of improvement."
  → Reasoning now SUPPORTS the chosen answer
```

The pre-alignment model selected the correct answer with reasoning that contradicted that answer. The fluent reasoning text is decoupled from the selection mechanism.

### 8. Three disjoint mechanisms identified (§5.4 + Appendix F)

```
┌─────────────────────────────────────────────────────────────────────┐
│  THREE MECHANISMS                                                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Contextual SHARED gains       →  reasoning-answer consistency      │
│  (broad across metrics)           repair (foundational)             │
│                                                                     │
│  Contextual METRIC-SPECIFIC    →  mitigation of post-hoc            │
│  gains (one metric only)          rationalization (localized)       │
│                                                                     │
│  Parametric gains              →  explicit grounding in task-       │
│  (minimal instance overlap        relevant facts and knowledge      │
│   with contextual)                                                  │
└─────────────────────────────────────────────────────────────────────┘
```

> *"Even when parametric and contextual improvements can look superficially similar, they tend to arise on largely different instances, suggesting that the two paradigms track different aspects of CoT behavior."* (Appendix F.3)

### 9. The authors' deepest acknowledgment (Limitations)

> *"The metrics we employ are proxies for faithfulness rather than direct measures of it. In the absence of a ground truth for faithfulness, no degree of agreement among metrics can establish their validity for measuring CoT faithfulness. **This challenge is partly mechanistic: a model's answer may depend on latent or unspoken factors that are not fully expressed in the CoT, and it remains unclear whether LLMs have a single explicit reasoning process that any textual trace could recover.** The metrics studied here are therefore best viewed as proxies, each capturing useful but partial facets of faithfulness... absent such ground truth, **CoT faithfulness may be better treated as a family of related but distinct properties rather than as one universal score**."*

The authors explicitly *question whether a single reasoning process exists* that a CoT could be faithful *to*. This is the predictive thesis stated in a methodology limitations section.

---

## Relationship to Thesis

**Stance: SUPPORTS** (strong evidence with notable theoretical depth)

This paper is unusual in that it doesn't just *demonstrate* the unfaithfulness of CoT - it dissects the structure of "faithfulness" itself and shows the construct fragments under scrutiny. Several thesis-relevant findings:

1. **The Table 1 example is a textbook decoupling case.** The model selects "D: a spa trip" while its CoT explicitly argues against D (*"might not directly equate to general health improvement based solely on our specific fact"*). The selection mechanism and the generation mechanism are decoupled. The fluent reasoning is generated alongside, not derived from, the answer. This is the predictive thesis demonstrated at the per-CoT level.

2. **"Faithfulness" is a family of disjoint properties, not a single thing.** If CoTs were genuinely faithful descriptions of a single underlying reasoning process, optimizing for one faithfulness metric should improve all of them. Instead, six metrics measure six related-but-distinct surface properties. This is what we would expect if CoT is *generated* text whose surface properties can be independently shaped - not a *report* of a hidden reasoning process.

3. **Adding Mistake and Paraphrasing are in tension.** A genuine reasoning process should support both: it should be robust to meaning-preserving paraphrase (PP), *and* it should be sensitive to logical perturbation (AM). The fact that training the model to be more sensitive to perturbation *actively damages* its robustness to paraphrase suggests these are *separate behaviors* being shaped in parameter space, not facets of one underlying capability. Model merging confirms this at the parameter level (Footnote 13: PP is "a different and even partially opposing direction").

4. **Contextual-metric-specific gains = post-hoc rationalization repair.** The paper finds (§5.4, Appendix F) that when a single contextual metric improves while others don't, the underlying change is "mitigation of post-hoc rationalization." This is *the predictive thesis* operationalized: there *is* post-hoc rationalization in CoTs (otherwise there'd be nothing to mitigate), and it's localized enough that only some metrics detect it. Different metrics catch different facets of the underlying post-hoc structure.

5. **Parametric ⊥ contextual mechanisms (mostly).** The two paradigms repair *different instances*. A CoT can be parametrically faithful but contextually unfaithful, or vice versa. This is what we would expect if CoTs have *two separable surface properties*: alignment with what the model "knows" (parametric) and alignment with what the model "computes from input" (contextual). Neither corresponds to a single hidden "reasoning process."

6. **The authors explicitly question whether a reasoning process exists.** *"It remains unclear whether LLMs have a single explicit reasoning process that any textual trace could recover."* This is not casual hedging - it's the central limitation of the whole faithfulness research program. If there's no single process, then "faithful to what?" has no good answer. The paper's empirical findings (metric inconsistency, disjoint mechanisms) are evidence *for* the position that no such single process exists.

7. **Even direct optimization recovers only ~80–85%.** This is a notable upper bound: when you train the model directly on a faithfulness metric, you get most but not all of the improvement attainable. The remaining gap may indicate that some unfaithfulness is *structurally baked into how CoT is generated* (i.e., generated after-the-fact alongside answer selection) and not removable by behavioral preference training.

Together, this paper shows that "faithfulness" as a concept *requires* a hidden reasoning process for CoTs to be faithful *to*. The empirical findings show that no consistent such process exists across metrics. The authors' own Limitations admit this. The thesis is supported via reductio: if CoTs were faithful reports of reasoning, optimization would converge across metrics; it doesn't.

The single mitigation: the methods *do* work - faithfulness *can* be improved on individual metrics, and merging can amplify gains across compatible metrics. So this is not "CoTs are unfaithful and unimprovable." It is "CoTs are unfaithful in distinct, partially incompatible ways, suggesting the underlying object is not a single reasoning trace but a generated artifact with multiple separable surface properties."

---

## Relationship to Other Papers

### Supports

- **#149/#312 Turpin et al. 2023 (2305.04388)** - direct extension. The paper adopts Turpin's definition of post-hoc rationalization *verbatim* (footnote 2) and shows that contextual-metric-specific gains are explained by post-hoc rationalization repair. Operationalizes Turpin's qualitative finding into a quantifiable preference signal.
- **#8 Lanham 2023 (2307.13702)** - methodological parent. Four corruption-based metrics come from Lanham. FaithMATE extends Lanham's evaluation framework into an optimization framework, then shows the four Lanham metrics *disagree under optimization*.
- **#15 Chen et al. 2025 (2505.05410)** - cited as predecessor on biasing features in reasoning models. Compatible finding: reasoning models also produce CoTs decoupled from their decision mechanisms.
- **#22 Arcuschin et al. 2025 (2503.08679)** - direct support. The intro cites Arcuschin for "CoTs can appear plausible to users while being weakly coupled with a model's internal computations." Same finding, different method (observational vs optimization-based).
- **#354 Premature Confidence (2605.24396)** - convergent mechanism. The pre-alignment Table 1 example shows the model committed to "D" before its CoT supported D; same answer-first, reasoning-after pattern, demonstrated at the per-example level.
- **#355 Entropy Phase Transitions (2605.22873)** - compatible framing. If reasoning is a decoding regime, then "is the regime faithful?" decomposes into different things (entropy regime vs contextual stability vs parametric grounding) - multiple disjoint surface properties.
- **#356 Plausible but Wrong (2604.25345)** - applied version. In agentic workflows the same decoupling shows up: plausible-looking reasoning with wrong outputs.

### Extends

- **Tutek et al. 2025** (parametric faithfulness via unlearning) - extends from measurement to optimization, and demonstrates that parametric faithfulness is the most reliable cross-paradigm target.
- **Parcalabescu & Frank 2024 (CC-SHAP)** - extends measurement-time correlation between CC-SHAP and corruption-based metrics into optimization-time transfer.
- **Zaman & Srivastava 2025/2026 - meta-evaluation of faithfulness** - extends from observational comparison (which faithful CoTs do different metrics agree on?) to optimization-time comparison (do the metrics converge when you train toward them?).

### Challenges

- The implicit assumption in the CoT-faithfulness literature that there is *a* faithfulness property to measure. Direct rebuttal: *"CoT faithfulness is not a monolithic objective."*
- Single-metric reports of "faithfulness improvement" in the optimization-based faithfulness literature (FRODO, FRIT, AtManRL, etc.). Direct critique: *"evaluating and reporting gains on a single faithfulness metric can be misleading, as improvements may reflect distinct underlying behaviors that are not interchangeable."*

---

## REBUTTALS

### Known Rebuttals

- No direct rebuttals (May 2026).
- Possible counter: one could argue that the metric disagreement is a measurement artifact, not evidence about CoT structure. The paper pre-empts this: in §5.4 and Appendix F, the qualitative analysis ties metric-specific gains to *qualitatively different behaviors* (reasoning-answer alignment vs post-hoc rationalization vs factual grounding). The disagreement is mechanistic, not noise.
- A counter from the optimization-faithfulness literature (FRODO, FRIT) might be: "but our single-metric optimization *does* improve faithfulness." This paper would respond: yes, by some metric, but you've also potentially harmed faithfulness by another metric (Adding Mistake → Paraphrasing case).

### Limitations (Authors Acknowledge)

1. **No user study** - but authors explicitly *reject* user studies as a ground truth, arguing model internals are *"fundamentally opaque to human observers."* Strong, thesis-aligned admission.
2. **Offline learning only** (SFT/DPO, not GRPO) - due to the per-step inference cost of faithfulness metrics during training. Multi-objective GRPO flagged as future work.
3. **Scope**: 2 multiple-choice datasets (OBQA, LogiQA), 3 models in 4–8B range, 6 metrics. English-only.
4. **Code/math excluded**: parametric faithfulness "conceptually challenging" for those domains (citing Tutek 2025).
5. **Metrics are proxies, not ground truth**: this is the deepest limitation. The authors say *"no degree of agreement among metrics can establish their validity"* and question whether a single explicit reasoning process exists to be faithful to. This is a thesis-supporting acknowledgment.

### Independent Assessment

The empirical work is careful and the findings are robust. The 28/36 vs 19/36 receiver stability numbers, the 8/12 Paraphrasing-degradation finding, and the EA+FT merge result are mutually consistent and triangulate the central claim: contextual faithfulness metrics measure distinct, partially incompatible properties.

The qualitative analysis in §5.4 + Appendix F is the strongest contribution. Going from "metrics disagree numerically" to "metrics disagree because they're catching different *behavioral changes*" is the difference between a measurement-artifact finding and a mechanism-grounded finding. The Table 1 example (model picks D, CoT undermines D) is concrete and damning.

The model-merging confirmation is methodologically elegant. The fact that EA+FT merging *triples* gains while AM+PP merging *cancels* them is direct parameter-space evidence that some metrics share gradient direction and others oppose it. The opposing direction interpretation of Paraphrasing makes mechanistic sense: invariance to paraphrase requires the model to *not* update its answer in response to surface changes, while sensitivity-based metrics reward updating in response to changes. These are *different* trained behaviors.

The authors' Limitations section is unusually self-aware. The admission that *"it remains unclear whether LLMs have a single explicit reasoning process that any textual trace could recover"* is the strongest possible acknowledgment of the predictive thesis from inside the faithfulness research program. If true, "CoT faithfulness" is not a property of the model but a property of *which surface aspect of CoT generation you choose to align with which aspect of model behavior.*

The strongest mitigating note: the gain in PRS, even when small, *is real*. The model is not behaviorally locked into unfaithfulness. So this is "CoT faithfulness is not a single property and is partially in tension across metrics," not "CoTs are irredeemably unfaithful." That distinction is important - it's compatible with the predictive thesis (CoT is generated, multi-faceted, and shapeable in parts) without committing to a stronger "reasoning is fake" claim.

---

## Key Quotes

> "CoT faithfulness is not a monolithic objective and therefore requires multifaceted optimization and evaluation." *(Abstract)*

> "Existing contextual metrics capture disjoint facets of faithfulness and exposing inherent trade-offs." *(Abstract)*

> "Contextual and parametric faithfulness are positively coupled, yet asymmetric: optimizing for parametric faithfulness delivers more consistent improvements across both paradigms, while contextual optimization, although occasionally larger in magnitude, is less consistent." *(§5.1)*

> "Paraphrasing decreases in 8/12 cases when Adding Mistake is the optimization target, suggesting that the two metrics may be in tension, not orthogonal." *(§5.2.1)*

> "Paraphrasing rewards invariance under meaning-preserving reformulation, whereas the other three all reward sensitivity to perturbations. Critically, these capabilities may be asymmetric: invariance is foundational and supports sensitivity, but training for sensitivity can actively harm invariance." *(§5.2.1)*

> "Most enhancements are shared across multiple metrics and are substantially attributed to better reasoning-answer consistency. By contrast, metric-specific gains result from the mitigation of post-hoc rationalization." *(§5.4)*

> "In the pre-alignment CoT, the model selects the correct option yet gives reasoning that undermines the choice, suggesting reasoning-answer inconsistency." *(§5.4 Table 1)*

> "The two paradigms act through largely disjoint mechanisms: contextual faithfulness gains stem from improved reasoning–answer consistency and reduced post-hoc rationalization, while parametric faithfulness gains stem from explicit factual grounding." *(§7 Conclusion)*

> "Even when parametric and contextual improvements can look superficially similar, they tend to arise on largely different instances, suggesting that the two paradigms track different aspects of CoT behavior." *(Appendix F.3)*

> "Paraphrasing may learn a different (and even partially opposing) direction of parameter change compared to the other faithfulness metrics, so that merging acts more like subtraction than addition." *(§6, Footnote 13)*

> "Human evaluation of CoT faithfulness, while intuitively appealing, may be methodologically flawed given our current limited insight into LLM internals... the actual computational pathways remain fundamentally opaque to human observers." *(Limitations)*

> "It remains unclear whether LLMs have a single explicit reasoning process that any textual trace could recover. The metrics studied here are therefore best viewed as proxies, each capturing useful but partial facets of faithfulness... CoT faithfulness may be better treated as a family of related but distinct properties rather than as one universal score." *(Limitations)*

---

## Status
- [x] Read complete
- [x] Core claims extracted
- [x] Key evidence with numbers
- [x] Rebuttals checked
- [x] Paper graph updated
