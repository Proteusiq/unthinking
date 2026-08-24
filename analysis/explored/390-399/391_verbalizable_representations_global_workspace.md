# Paper Analysis: Verbalizable Representations Form a Global Workspace in Language Models

## Metadata
- **arXiv ID**: 2607.15495
- **Title**: Verbalizable Representations Form a Global Workspace in Language Models
- **Authors**: Wes Gurnee, Nicholas Sofroniew, Adam Pearce, Mateusz Piotrowski, Isaac Kauvar, Runjin Chen, Anna Soligo, Paul Bogdan, Euan Ong, Rowan Wang, Ben Thompson, David Abrahams, Subhash Kantamneni, Emmanuel Ameisen, Joshua Batson, and Jack Lindsey (Anthropic)
- **Date**: July 2026
- **Venue**: arXiv preprint
- **Stance**: CHALLENGES the categorical claim that LLMs have no causally structured internal intermediate states; does not establish consciousness, understanding, or robust OOD reasoning
- **Role**: Provides a label-free Jacobian method for reading and intervening on a sparse, output-disposed subset of residual-stream directions

---

## Why This Paper Matters

The paper contributes a useful mechanistic method, not evidence of sentience. Its Jacobian lens (J-lens) fits one corpus-averaged downstream-Jacobian map rather than a human-labeled probe or a trained feature dictionary. The resulting directions are indexed by the model's own vocabulary, so a direction can be read as a token the model is disposed to make verbal without first assigning it a human label.

This makes the paper a serious challenge to the strongest possible version of the thesis: the tested models have some silent, causally consequential intermediate variables that can be read, swapped, and reused. It does not challenge the thesis's central discriminator, systematic generalization beyond training-distribution structure. Nor does it justify the promotional inference from a functional access interface to consciousness.

```
Residual activation at layer l
          |
          | corpus-averaged downstream Jacobian
          v
Vocabulary-indexed J-space directions
          |
          +--> read: which tokens are poised to be verbalized?
          +--> intervene: which reports or answers change?
          +--> limit: what remains outside this verbalizable interface?
```

---

## Core Claims

1. **A sparse verbalizable subspace exists.** J-lens directions identify a small set of residual-stream components that have average first-order influence on current and future verbal output.
2. **Some directions are causally used.** Coordinate swaps and ablations change reports, two-hop answers, rhyme plans, and selected downstream behavior more than matched non-J-space controls.
3. **The interface has selected global-workspace-like properties.** The authors report reportability, selective use in flexible tasks, limited capacity, and broadcast-like connectivity in middle layers.
4. **The conclusion is functional, not phenomenal.** The authors explicitly take no position on subjective experience and state that transformers have no direct analogue of the biological recurrent workspace.

---

## Methodology

### The Jacobian lens

For residual activation `h_l,t`, the method averages its gradient effect on present and future penultimate-layer states across a generic corpus, then applies the model's unembedding to that average map. Each vocabulary row defines a token-associated direction. The default fit uses **1,000** pretraining-like sequences of **128** tokens, averages across source and target positions, and uses the penultimate rather than final layer to reduce artifacts.

The J-space is not the full span of these overcomplete token directions. It is a union of sparse, non-negative cones, decomposed with gradient pursuit. The reported workspace uses roughly **25** active directions in middle layers.

### Experimental setup

| Element | Setup |
|---------|-------|
| Main model | Claude Sonnet 4.5 |
| Corroborating models | Claude Haiku 4.5, Opus 4.5; selected audit analyses on Opus 4.6 |
| Layer sampling | 25 evenly spaced residual-stream layers, reindexed 0-100 |
| Main workspace band | Approximately L38-L92 in Sonnet 4.5 |
| Comparison lenses | Logit lens, tuned lens, J-lens variants, template lens, oracle lens |
| Controls | Matched random directions/heads, J versus non-J components, component clamps, output-token exclusions, SAE controls |

### Readout, control, and explanation are different claims

| Claim | Supported by the experiments | Not established |
|-------|------------------------------|-----------------|
| Readout | A direction predicts a token the model is disposed to verbalize | A complete literal sentence-like account of internal state |
| Control | Selected directions can causally change reports and some answers | That all native computation routes through that direction |
| Explanation | The directions have selected access-workspace-like properties | Human-like understanding, a biological workspace, or phenomenal consciousness |

---

## Key Evidence

### Finding 1: Verbal report is concentrated in a small causal component

| Intervention | Result | Context |
|--------------|--------|---------|
| Pure J-vector swap | **88%** top-5 target report | Verbal-report task |
| J-space component swap | **59%** top-5 target report | Same task |
| Non-J-space component swap | **5%** top-5 target report | Same task |
| Clamp J-space while swapping non-J remainder | Effect falls to **0** | Swap task |
| Concept-vector variance in J-space | Median **6-7%** | Roughly 93% is outside the sparse verbalizable component |

The result is strong evidence that this particular output-disposed component matters causally for verbal report. It is also direct evidence that the J-space is incomplete: most concept-vector variance is outside it.

### Finding 2: Intermediate directions partially redirect silent computation

| Test | Result | Context |
|------|--------|---------|
| Two-hop intermediate swap | **54%** Haiku, **70%** Sonnet, **70%** Opus top-1 redirection | 50 factual prompts |
| Intermediate versus direct-answer effect | Intermediate intervention works about **17 percentage points of depth** earlier | Layer-timing comparison |
| Intermediate probe variance in J-space | **10-15%** | Probe decomposition |
| Probe-component swap | J component **61%**, raw J vector **60%**, non-J remainder **28%**, clamped remainder **6%** top-1 flips | n=90 |

This is the paper's clearest challenge to a claim that all internal computation is merely post-hoc text prediction. The aggregate effects are material but incomplete, not proof of reliable symbolic variable substitution.

### Finding 3: Flexible reuse is real but partial

| Test | Result | Interpretation |
|------|--------|----------------|
| Flexible argument swaps | **76/192** target answers at ordinary strength | Partial reuse across downstream tasks |
| Same swaps, double strength | **101/192** target answers | Stronger intervention helps, still far from universal control |
| Country-fact subset | **42/48** top-1 off-diagonal targets | Best-performing category |
| Number-relation subset | **0/48** at ordinary strength | Important failure case |

The authors' best country examples support reuse of an abstract direction across capital, language, and continent questions. The number failure prevents treating the result as a general argument-variable interface.

### Finding 4: J-space is selective, capacity-limited, and connected

| Finding | Result | Context |
|---------|--------|---------|
| Sparse occupancy | Median plateau around **25** directions | Workspace layers |
| Sparse decomposition variance | At most **10%** excess explained variance | Activation reconstruction |
| Single-layer list capacity | Roughly **1-2** concepts | Random-list test |
| Cross-layer list capacity | Roughly **6** concepts | Pooled workspace layers |
| Dual-load arithmetic availability | **95%** alone to **72%** with a second held concept | Concurrent covert tasks |
| Broadcast-head ablation recall@25 | **0.86** random-head control to **0.67** targeted ablation | Most affected layers |
| Injected-thought reporting | **0.54** to **0.09** under broadcast-head ablation | Targeted versus random-head ablation |

Heavy J-space ablation disproportionately harms multi-hop reasoning, analogy, translation, summarization, and sonnet writing, while MMLU, SQuAD, sentiment, CoLA, and other routine tasks remain closer to baseline. Explicit GSM8K chain-of-thought is more robust than direct answering. This selective profile fits a reportable/flexible interface, not an all-purpose account of computation.

### Finding 5: The method has a practical alignment-audit use case, with limits

| Audit | Result | Qualification |
|-------|--------|---------------|
| Blackmail eval-awareness ablation | Awareness **71% -> 3%**; blackmail **0/180 -> 13/180** | Shows an audit-related direction can be causally relevant in a constructed setting |
| NLA comparison | About **94,000** positions; J-lens separates NLA flags with AUC **0.853** | NLA-derived labels are not independent behavioral ground truth |
| Fabrication reflection fine-tuning | Dishonesty **0.25 -> 0.07** | Reflection vectors are partly causal: ablation returns **0.07 -> 0.22** |
| Deception reflection fine-tuning | Deception **0.38 -> 0.05** | Ablation returns **0.05 -> 0.23** |

The paper's audit results motivate further work, but an activation readout is not a reliable item-level truth certificate. The authors acknowledge that unnamed, automatic, or compiled behavior can bypass the J-space.

---

## Limitations & Issues

### Methodological Concerns

1. **The lens is output-aligned by construction.** It reads directions with average causal influence on future verbal output. This is valuable, but it narrows the candidate workspace to what the model is poised to say.
2. **The sparse interface is incomplete.** The J-space explains at most 10% of activation variance in the reported decomposition, and most attribution-graph influence remains in unnamed non-J remainders.
3. **Effects are often partial.** Two-hop redirection reaches 54-70%, flexible swaps 76/192 at ordinary strength, and numeric substitutions fail entirely at that strength.
4. **Model scope is narrow.** The core experiments use proprietary Claude models. The paper does not disclose model sizes, pretraining data, many decoding settings, or a scaling study.
5. **No systematic OOD test.** The experiments do not test novel-rule acquisition, compositional transfer, or distributional robustness, the key empirical discriminator for the thesis.
6. **The paper reports few conventional statistical tests.** Most central evidence is rates, confidence intervals, ranks, and figures rather than preregistered hypothesis tests or effect sizes.

### Interpretive Concerns

1. **A verbalizable interface is not consciousness.** The paper says access consciousness is a purely functional notion, takes no position on phenomenal consciousness, and states that transformer depth has no direct biological recurrent analogue.
2. **A steerable direction need not have the human semantic label assigned to it.** Prior work on truth and linear probes shows that causal steering can affect correlated familiarity or behavior rather than uniquely isolating the named concept.
3. **Readability does not imply self-knowledge.** The model can expose a token-associated direction without possessing a stable, globally correct natural-language account of its reasons, goals, or experience.

---

## REBUTTALS

### Direct Rebuttals and Replications

No direct arXiv rebuttal or peer-reviewed replication was found as of August 2026. Later preprints use J-space operationally but do not independently establish the global-workspace interpretation.

| Source | Relationship | Relevance |
|--------|--------------|-----------|
| Measure, Don't Optimize (2608.11408) | Scoped limitation | J-Access predicts recovery across **398** unlearned checkpoints, but preregistered item-level AUROC is **0.504** and optimizing the readout worsens revival (**0.283 -> 0.387**). A model-level signal is not a per-item certificate. |
| Beyond the Trace (2608.17638) | Operational extension | Uses a 64-axis J-space frame and reports held-out routing reconstruction, while explicitly not testing global-workspace properties. |
| J-CoT (2607.21981) | Downstream use | Uses J-space coefficients as a recurrent interface; this tests utility, not consciousness or unique causal privilege. |
| Obfuscated Activations (2412.09565) | Pre-existing deployment challenge | Latent-space defenses can be bypassed while harmful behavior persists, limiting safety claims from a readable internal state alone. |

### Counter-Evidence in the Corpus

| Paper | Relationship |
|-------|--------------|
| #8 Measuring Faithfulness (2307.13702) | Textual CoT is often post-hoc; J-space is valuable precisely if it can be evaluated against this stronger causal standard. |
| #10 Reasoning Models Don't Always Say What They Think (2505.05410) | CoT hides used hints and reward hacks; motivates latent auditing but sets a difficult behavioral validation target. |
| #201 A Causal Lens for Evaluating Faithfulness Metrics (2502.18848) | Requires causal diagnosticity rather than plausible readouts; relevant standard for J-lens audit claims. |
| #204 Language Models Represent Space and Time (2310.02207) | Linear decodability alone does not prove causal use; J-space's intervention controls are stronger, but semantic interpretation remains qualified. |
| #205 Geometry of Truth (2310.06824) | Steerable directions can encode familiarity or correlates rather than the investigator's named concept. |
| #319 Refusal Is Mediated by a Single Direction (2406.11717) | Prior causal residual-direction control supports the intervention methodology but offers a thinner output-policy explanation for some audit effects. |
| #368 From Reward-Hack Activations to Agentic Risk States (2606.06223) | Activation-only monitoring adds little action prediction without context, qualifying deployment claims. |

---

## Graph Links to Other Papers

### Papers This EXTENDS

| Paper | Connection |
|-------|------------|
| #205 Geometry of Truth (2310.06824) | Replaces a human-labeled linear probe with vocabulary-indexed Jacobian directions and component-swap controls. |
| #319 Refusal Is Mediated by a Single Direction (2406.11717) | Generalizes residual-direction intervention from refusal policy to sparse verbalizable intermediate variables. |
| #10 Reasoning Models Don't Always Say What They Think (2505.05410) | Offers a candidate latent interface for auditing computation that visible CoT fails to disclose. |

### Papers This CHALLENGES

| Paper | Connection |
|-------|------------|
| #204 Language Models Represent Space and Time (2310.02207) | Coordinate swaps and J/non-J clamps give stronger causal evidence than decodability alone for selected intermediate variables. |
| #181 No Global Plan in CoT (2602.02103) | Shows some intermediate concepts can alter downstream answers before the final answer direction is effective, although it does not demonstrate a global plan. |

### Papers That QUALIFY This Paper

| Paper | Qualification |
|-------|---------------|
| #201 A Causal Lens for Evaluating Faithfulness Metrics (2502.18848) | Requires task-specific causal validation before interpreting an internal readout as explanation. |
| #368 From Reward-Hack Activations to Agentic Risk States (2606.06223) | Shows context materially improves activation-based risk prediction. |
| 2608.11408 Measure, Don't Optimize | J-Access is predictive across checkpoints but fails as a fine-grained optimized target. |

---

## Key Quotes

> "The basic idea is to characterize an intermediate activation vector by its first-order causal effect on the model's outputs, over a broad distribution of potential contexts." -- Section 2.1

> "Taken together, these results indicate that the J-space component of a concept's representation, despite accounting for a small fraction of its variance, is responsible for that concept's availability for verbal report." -- Section 3.1

> "Across 90 two-hop prompts, swapping the probes' J-space components flips the model's answer to the swapped-in intermediate on 61% of trials, matching the 60% achieved by swapping the raw J-lens token vectors as in the preceding experiments." -- Section 3.3

> "In this section, we first demonstrate that it succeeds in doing so, and then go on to show that these representations serve a broader functional role: they exhibit the cluster of properties, enumerated above, characteristic of a global workspace." -- Section 3

> "This construction means that the set of concepts the lens can name is exactly the set of concepts that have a single-token name in the tokenizer's vocabulary." -- Section 9.1

> "Note that access consciousness is a purely functional notion; the relationship that it has with subjective experience (sometimes called phenomenal consciousness) is widely debated. In this paper, we take no position on this issue, and instead focus on the functional role played by consciously accessible information." -- Section 1.1

> "We do not feel comfortable making the stronger claim that monitoring the J-space is sufficient for alignment monitoring, or that any sophisticated plan the model might execute must be represented there." -- Section 9.2

---

## Interaction Diagram

```
Textual CoT unfaithfulness (#8, #10)
              |
              | motivates a latent causal readout
              v
J-space / J-lens (#391) --extends--> probe and steering work (#205, #319)
              |
              | partial causal intermediate control
              v
Challenge: no internal structured state at all
              |
              | still untested
              v
OOD generalization, complete explanation, and consciousness
```

---

## Relevance to "Thinking Machine That Doesn't Think"

### Central Contribution

J-space is a useful way to inspect a small, interpretable output-disposed slice of a model's internal state and causally intervene on selected directions. The one-fit, vocabulary-indexed method is a meaningful advance over human-labeled probes and heavyweight learned dictionaries for this purpose.

### The tension the paper leaves open

The paper weakens the blanket claim that an LLM only emits a reasoning-shaped string with no internal structured intermediate computation. It does not show that the model understands the concepts it can verbalize, that its selected directions exhaust its computation, or that it can generalize the represented structure beyond familiar distributions. A model can expose and use a limited reportable interface while remaining a next-token predictor trained from human data.

The evidence therefore supports a narrow claim: tested LLMs have limited, causally consequential, verbalizable internal workspaces for some tasks. It does not support the stronger claim that they are conscious. People supply the goals, interpretation, and application constraints that determine whether this mechanism succeeds or fails.

---

## Status
- [x] Read complete (main text and Appendices A.1-A.24)
- [x] Core claims extracted
- [x] Key evidence with numbers
- [x] Direct rebuttals and corpus counter-evidence checked
- [x] Paper graph updated
