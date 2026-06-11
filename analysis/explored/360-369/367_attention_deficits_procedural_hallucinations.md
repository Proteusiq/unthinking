# Paper Analysis: Attention Deficits in Language Models: Causal Explanations for Procedural Hallucinations

## Metadata
- **arXiv ID**: 2602.19239
- **Title**: Attention Deficits in Language Models: Causal Explanations for Procedural Hallucinations
- **Authors**: Ahmed Karim, Fatima Sheaib, Zein Khamis, Maggie Chlon, Jad Awada, Leon Chlon
- **Date**: February 2026
- **Venue**: arXiv preprint (stat.ML, cs.LG)
- **URL**: https://arxiv.org/abs/2602.19239

---

## Core Claims

1. **Procedural hallucinations are readout-stage routing failures**: Models fail to report values they computed moments earlier, not because knowledge is missing but because the readout mechanism routes to the wrong candidate

2. **Two-stage error decomposition**: Failures decompose into Stage 2A (gating) where the model doesn't enter answer mode, and Stage 2B (binding) where it enters answer mode but selects the wrong candidate

3. **Stage 2B dominates in hard regimes**: 65-100% of errors across model families are binding failures, not gating failures

4. **Information is "present but not used"**: Linear probes recover the correct answer at 74% (vs 2% chance) on error trials, proving the answer is encoded in hidden states but not routed to output

5. **Checkpointing nearly eliminates Stage 2B failures**: Restating the binding near the query converts 0% to 99.8% accuracy at long distances

---

## Methodology

### Stagewise Slot Population Framework

```
┌─────────────────────────────────────────────────────────────────────┐
│  PROCEDURAL HALLUCINATION DECOMPOSITION                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Stage 1: Compute/Encode     (hidden state encodes correct value)   │
│       │                                                             │
│       ▼                                                             │
│  Stage 2A: Gating            Does model enter answer mode?          │
│       │                      GateGap = max(candidate) - max(other)  │
│       ▼                                                             │
│  Stage 2B: Binding           Does model select correct candidate?   │
│                              ValueGap = z(correct) - z(best wrong)  │
│                                                                     │
│  KEY: Both Stage 2A and 2B are READOUT failures, not knowledge      │
│  failures. The correct answer is already in the hidden state.       │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Task Design

Two synthetic long-context binding tasks with known single-token candidate sets (~50 candidates):

- **competing_vars**: Different keys hold different values; competitor is a distractor
- **primacy_recency**: Same key reassigned multiple times; recency bias competes with correct (first) value

Prompts have binding region, k filler tokens (k up to 2048), and a query.

### Information-Theoretic Framework

Formalizes "present but not used" via:
- **I_avail(k)** = I(V; H_k): mutual information between ground truth and hidden state
- **I_used(k)** = I(V; Y_k): mutual information between ground truth and model output
- **Routing efficiency** η_k = I_used / I_avail ∈ [0,1]

Procedural hallucinations correspond to η_k << 1.

### Pseudo-Priors and Decompression Bounds

Causal intervention: remove binding evidence while preserving template structure (KEY1 = [REDACTED]). The pseudo-prior p̃ measures model's probability of guessing correctly without evidence.

**Bits-to-Trust**: To achieve success probability p from pseudo-prior p̃, the model needs at least KL(Ber(p) || Ber(p̃)) nats.

**Concrete example**: If recency bias gives p̃ = 0.05, achieving 90% accuracy requires ≈3.2 bits of evidence.

### Distance Dependence via Strong Data Processing Inequality

Information decays geometrically with distance through the model:
```
I(V; H_k) ≤ (∏ α(K_t)) · I(V; S_0)
```

---

## Key Evidence

### Stage 2B Dominance (Table 1)

n=800, greedy decoding, ~50 candidates:

| Model | Task | k | Accuracy | Frac 2B |
|-------|------|---|----------|---------|
| Qwen2.5-3B | competing | 256 | 10.7% | **65.0%** |
| Qwen2.5-3B | primacy | 256 | 4.3% | **81.5%** |
| Qwen2.5-3B-Inst. | primacy | 256 | 6.1% | **92.8%** |
| Gemma-2-2B | competing | 256 | 99.5% | **100%** |
| Gemma-2-2B | primacy | 256 | 80.1% | **98.7%** |
| Llama-3.2-3B | competing | 2048 | 38.5% | **98.2%** |
| Llama-3.2-3B | primacy | 2048 | 0.1% | **53.9%** |

### Probes Certify Information Presence (Table 2)

Qwen2.5-3B, ~50 candidates (chance ≈ 2%):

| Task | k | Model Acc | Probe (final layer) |
|------|---|-----------|---------------------|
| competing | 256 | 20.0% | **73.9%** (37x chance) |
| competing | 512 | 0.0% | **39.0%** (20x chance) |
| primacy | 256 | 6.9% | **35.4%** (18x chance) |
| primacy | 512 | 0.0% | **12.4%** (6x chance) |

### Mechanistic Localization via Activation Patching

Consistent motif across all three model families:
- **Late attention layers restore correct bindings** (positive restoration)
- **Late MLPs corrupt them** (negative effect)

Specific: Qwen2.5-3B Layer 33 attention: ΔM = +3.44; Layer 35 MLP: ΔM = -3.30

Gemma-2-2b has an "anti-recency" head at L22H3 that counterbalances a misbinding head at L25H2.

### Checkpointing Recovers Accuracy (Tables 3, 8)

| Model | Task | k | Baseline | +Checkpoint |
|-------|------|---|----------|-------------|
| Qwen2.5-3B | competing | 1024 | **0.0%** | **99.8%** |
| Qwen2.5-3B | primacy | 1024 | 0.0% | 76.3% |
| Llama-3.2-3B-Inst. | competing | 2048 | 0.0% | 85.3% |
| Gemma-2-9b-it | naturalistic | 2048 | baseline | **100.0%** |

ValueGap goes from -9.93 to +2.88 with checkpointing on Qwen at k=1024.

### Routing Efficiency Certificates

At k=256 competing_vars (Qwen2.5-3B):
- I_used ≥ 0.45 nats (from Fano bound on 25.5% candidate accuracy)
- Probe accuracy 73.9% → I_avail proxy ≈ 2.32 nats
- Routing efficiency η ≈ 0.19 (model uses only ~19% of available information)

---

## Relationship to Thesis

### STRONGLY SUPPORTS Thesis

```
┌─────────────────────────────────────────────────────────────────────┐
│  KEY INSIGHT: LLMs know the answer but can't use it                 │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  The model COMPUTES the correct value (probes recover it at 74%)    │
│  but FAILS to ROUTE it to the output (accuracy 0-20%)               │
│                                                                     │
│  This is not a knowledge/reasoning failure.                         │
│  This is a mechanical routing failure in the readout stage.         │
│                                                                     │
│  Hallucination ≠ "model doesn't know"                               │
│  Hallucination = "model can't use what it knows"                    │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

1. **Procedural hallucination is mechanical, not epistemic**: The model has the information; it fails to route it. This directly supports the thesis that LLMs are pattern-matching systems whose outputs depend on routing mechanics, not understanding.

2. **Recency bias drives binding errors**: Stage 2B errors are driven by recency bias (most recent candidate preferred over correct one), showing the model's "reasoning" is dominated by positional statistics.

3. **Late MLPs corrupt correct bindings**: Activation patching reveals that the correct binding is computed by attention but then corrupted by MLP layers. The architecture itself undermines its own computation.

4. **Checkpointing works by shortening distance, not adding knowledge**: The fix is purely mechanical (restate the binding nearby), confirming the failure is about information routing, not missing information.

5. **Extends companion paper (2509.11208)**: Moves from macro-level compression theory to micro-level mechanistic explanation of the same phenomenon.

---

## Relationship to Other Papers

### Directly Extends
- **Paper 168 (2509.11208)**: Companion paper providing macro-level compression theory; this paper provides micro-level mechanistic explanation
- **Paper 368 (2507.11768)**: Companion paper on positional encoding breaking exchangeability; this paper shows positional effects cause binding failures

### Strongly Supports
- **Paper 165 (2401.11817)**: Hallucination is Inevitable - procedural hallucination is another dimension of inevitability
- **Paper 107 (2601.07422)**: Two Pathways to Truthfulness - "present but not used" maps to encoding-output dissociation
- **Paper 247 (2602.11201)**: Mechanistic Evidence for Faithfulness Decay - both find late-layer corruption of correct information

### Related Mechanism
- **Lost-in-the-Middle (Liu et al., 2024)**: This paper provides the mechanistic explanation for why lost-in-the-middle occurs (geometric information decay via SDPI)
- **Paper 161 (2302.00093)**: LLMs distracted by irrelevant context - procedural hallucination provides formal framework

### Connects To
- **Paper 108 (2601.22035)**: Thinking Out of Order - both show output doesn't faithfully reflect internal computation
- **Paper 182 (2602.02103)**: No Global Plan in CoT - both show failures at the readout/output stage

---

## REBUTTALS

### Potential Limitations

1. **Synthetic tasks only**: Experiments use synthetic binding tasks designed to isolate the phenomenon. Whether the same mechanisms explain failures in naturalistic long-context tasks (e.g., document QA) remains to be validated.

2. **Activation access required**: Mechanistic claims (probing, patching) apply only to open-weight models. For hosted APIs, only output-level diagnostics are available.

3. **Single-token candidate set**: Restricts to settings where the answer is one token from a known set. Multi-token generation hallucinations may involve different mechanisms.

4. **Checkpointing failure mode**: Llama at k=2048 primacy_recency shows checkpointing can fail when Stage 2A gating collapses entirely (0% → 0.3%).

### Authors' Acknowledged Limitations

> "Our experiments focus on synthetic binding tasks designed to isolate the phenomena. Whether the same mechanisms explain failures in naturalistic long-context tasks (e.g., document QA) remains to be validated."

> "A model could produce a valid-looking trace via post-hoc rationalization."

> "Trace auditing does not prove faithfulness - it detects certificate failures but does not prove faithfulness to the model's hidden chain-of-thought."

---

## Key Quotes

> "The model did not lack the information; it simply failed to use it."

> "Many structured-generation failures are not about missing knowledge but about mis-commitment. The model encodes the correct answer (probes recover it) but routes its output toward a biased competitor."

> "A linear probe on the final-layer residual stream recovers the correct value far above chance (e.g., 74% vs. 2% on Qwen2.5-3B), indicating that the answer is encoded but not used."

> "Qwen recovers from 0% to 99.8% accuracy at k=1024."

---

## Methodology Assessment

### Strengths
- **Rigorous decomposition**: Stage 2A/2B framework is clean, measurable, and falsifiable
- **Multi-method validation**: Combines probing, activation patching, and interventional evidence
- **Information-theoretic grounding**: Fano bounds + SDPI provide provable certificates
- **Cross-model consistency**: Results hold across Qwen, Gemma, and Llama families
- **Reproducibility**: Open reproducibility package included

### Weaknesses
- Limited to synthetic tasks (acknowledged)
- Limited model scale (2B-9B)
- Single-token answer constraint
- No comparison to other hallucination detection methods

---

## Status

- [x] Full paper read
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [x] Paper graph updated

---

## Classification

| Dimension | Assessment |
|-----------|------------|
| **Stance** | Strongly Supports |
| **Confidence** | High |
| **Relevance** | Very High - mechanistic explanation of hallucination as routing failure |
| **Evidence Type** | Theoretical + Empirical + Mechanistic |
| **Venue Quality** | arXiv preprint |

---

## One-Sentence Summary

Procedural hallucinations are readout-stage routing failures where the correct answer is encoded in the hidden state (probes recover it at 74%) but not routed to the output, with late MLPs corrupting attention-computed bindings and checkpointing recovering accuracy from 0% to 99.8%.
