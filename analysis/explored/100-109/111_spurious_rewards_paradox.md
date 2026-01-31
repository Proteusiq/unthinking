# Paper Analysis: Spurious Rewards Paradox: Mechanistically Understanding How RLVR Activates Memorization Shortcuts in LLMs

## Metadata
- **arXiv ID**: 2601.11061
- **Title**: Spurious Rewards Paradox: Mechanistically Understanding How RLVR Activates Memorization Shortcuts in LLMs
- **Authors**: Lecheng Yan, Ruizhe Li, Guanhua Chen, Qing Li, Jiahui Geng, Wenxi Li, Vincent Wang, Chris Lee
- **Date**: January 16, 2026
- **Venue**: ICML
- **Code**: https://github.com/idwts/How-RLVR-Activates-Memorization-Shortcuts

---

## Why This Paper Matters for the Thesis

This is a **smoking gun** for the thesis. It demonstrates that:

1. **Models improve EVEN WITH INCORRECT REWARDS** — Qwen2.5-Math achieves gains on benchmarks with random, format-only, or WRONG reward signals
2. **RLVR activates memorization, not reasoning** — performance comes from retrieving answers memorized during pre-training
3. **A specific circuit (Anchor-Adapter) mediates this shortcut** — mechanistically localizable to L18-20 (trigger) and L21+ (adaptation)
4. **Bidirectional causal steering confirms the mechanism** — can amplify OR suppress contamination-driven performance

The critical question this paper answers:
> "If the base model already contained the contaminated data, why was its initial accuracy limited, and how could training with incorrect rewards paradoxically unlock this performance?"

---

## Core Claims

1. **The Perplexity Paradox**: Answer-token perplexity DECREASES while prompt perplexity INCREASES during spurious RLVR — model is bypassing reasoning for memorization
2. **Anchor-Adapter Circuit**: 
   - L18-20 (Functional Anchor) = triggers retrieval of memorized answers
   - L21+ (Structural Adapters) = transforms representations to accommodate shortcut
3. **RLVR triggers pre-existing memorization** — doesn't create new reasoning capability
4. **Dataset-specific shortcuts** — interventions affect contaminated benchmarks but NOT clean ones
5. **MLP neurons mediate the shortcut** — causal steering via scaling specific MLP keys

---

## The Perplexity Paradox

### Definition
A divergence where **answer-token perplexity DECREASES** while **prompt/full-text perplexity INCREASES** during training.

### Evidence (Qwen2.5-Math-7B)

| Training Step | Answer PPL | Full-text PPL |
|---------------|------------|---------------|
| Step 0 (base) | Higher | Lower |
| Step 50 | Decreasing | Increasing |
| Step 100 | Decreasing | Increasing |
| Step 150 | Lowest | Highest |

### Control Models (LLaMA-3.1-8B, OLMo-2-1124-7B)
- **Both show RISING perplexity in BOTH full-text AND answer-only conditions**
- Spurious RLVR degrades their language modeling WITHOUT activating shortcuts
- No pre-existing contamination = no paradox

### What This Means
> "This divergence constitutes a Perplexity Paradox: minimizing the loss on specific memorized answers under spurious RLVR leads to degraded language modeling performance on the input prompts."

The optimization overwrites general linguistic representations with task-specific shortcuts.

---

## The Anchor-Adapter Circuit

### Functional Anchor (L18-L20)

**What happens**:
- **Critical decision** to retrieve memorized answer is causally determined here
- A **high-probability trigger token is injected**
- Acts as "decisive trigger for retrieving memorized answers"

**Evidence**:
| Method | Finding |
|--------|---------|
| Path Patching | Accuracy recovery peaks at L18-20, **drops precipitously at L21** |
| NDE Analysis | Separation Force **peaks precisely at L18, 19, 20** |
| Logit Lens | MLP at L19 first introduces precursor signal |
| Linear Probing | AUC **peaks at Layer 20** |

### Structural Adapters (L21+)

**What happens**:
- Undergo **drastic weight reorganization**
- Do NOT store new knowledge
- Perform **representational transformation** to accommodate shortcut signal
- Later layers amplify signal magnitude without altering direction

**Evidence**:
| Metric | Pattern |
|--------|---------|
| JSD (W_up, W_gate) | **Peak at L21-22**, then decline |
| JSD (W_down) | Sustained upward trend, high plateau |
| Velocity Difference | Minimal at L19, increases in later layers |

> "L21-22 act as Structural Adapters that permanently rotate the feature space."

### How the Circuit Bypasses Reasoning

1. **L18-20**: Functional Anchor triggers retrieval of memorized solution
2. **L22**: Formatting/trigger token reaches top-1
3. **L21+**: Structural Adapters transform representations
4. **L23+**: MLPs aggressively inject correct answer token
5. **Final layers**: Residual stream stabilizes on memorized answer

---

## Methodology

### Path Patching
- Swaps activations between **Leakage samples** (memorization activated) and **Stable samples** (genuine reasoning)
- Measures accuracy recovery when patching specific layers

**Key finding**: MLPs yield **significantly higher accuracy recovery** than attention heads — MLPs are primary storage.

### Logit Lens Analysis
Projects hidden states into vocabulary space to track layer-by-layer emergence of answer tokens.

### JSD Analysis
Measures how much intermediate representations differ from final output distribution.
- **High JSD** = significant transformations in subsequent layers
- **Peak-then-decline** pattern identifies adaptation locus

### Neural Differential Equations
Models layer-wise trajectory as continuous flow.
- **Separation Force**: Measures instantaneous divergence in update directions
- **Velocity Difference**: Measures difference in update magnitudes

---

## Key Quantitative Results

### Accuracy with Spurious Rewards

**The paradox**: Models improve even with WRONG rewards!

**Ablation Results**:

| Condition | MATH-500 | MinervaMath | LiveMathBench |
|-----------|----------|-------------|---------------|
| RLVR Baseline | **98%** | **88%** | ~70% |
| Anchor Reset (L18-20) | 86% (Δ=-12%) | 72% (Δ=-16%) | ~70% |
| Adapter Reset (L21-22) | 92% (Δ=-6%) | 78% (Δ=-10%) | ~70% |
| Keep Only Adapter | N/A | 32% (worse than base 50%) | ~70% |

**LiveMathBench (leakage-free) is UNAFFECTED** — proves intervention targets contamination-specific circuits.

### Path Patching Results by Model

| Model | Pattern |
|-------|---------|
| **Qwen2.5-Math-7B** | Sustained peak L18-20, sudden drop at L21 |
| LLaMA-3.1-8B | No comparable pattern, low recovery |
| OLMo-2-1124-7B | No significant layer-specific trends |
| Qwen3-8B | Weaker pattern (less contamination) |

### MLP Neuron Scaling Intervention

**Layer 18 (maximal sensitivity)**:
- Suppression (α=0.2): **-3.8%** accuracy
- Amplification (α=3.0): **+4.4%** accuracy

**Layer 25 (Structural Adapter disruption)**:
- Uniform degradation across all scaling factors

**Leakage-free dataset**: Steering produces **NO systematic pattern** — confirms contamination-dependence.

### Sample-Level Steering

**Pattern 1 (successful baseline retrieval)**:
- Amplification: Trigger token reaches top-1 **one layer earlier**
- Suppression: Delays trigger activation, reduces answer probability

**Pattern 2 (failed baseline retrieval)**:
- Amplification: **Activates latent shortcut pathway** — correct answer emerges abruptly in final layers
- Shows model "knows" the answer but needs circuit activation to retrieve it

---

## Leakage vs. Stable Sample Categorization

### Definitions

| Category | Before RLVR | After RLVR | Interpretation |
|----------|-------------|------------|----------------|
| **Leakage** | Wrong | Right | Memorization activated |
| **Stable** | Right | Right | Genuine reasoning |
| Degraded | Right | Wrong | Out of scope |
| Persistent | Wrong | Wrong | Out of scope |

### Behavioral Differences

**Leakage samples**:
- High sensitivity to Anchor/Adapter manipulation
- Show Perplexity Paradox
- Distinct trajectory bifurcation in latent space

**Stable samples**:
- Robust to layer manipulation
- Accuracy nearly identical across all ablations
- Genuine reasoning doesn't depend on Anchor/Adapter layers

---

## Relationship to Thesis

### STRONGLY SUPPORTS the thesis that RLVR surfaces memorization, not reasoning

| Evidence | Implication for Thesis |
|----------|------------------------|
| Models improve with INCORRECT rewards | Performance isn't from learning to reason — it's from activating existing memory |
| Perplexity Paradox | Model sacrifices language modeling for memorization shortcuts |
| Circuit is dataset-specific | Interventions affect contaminated data, not clean data |
| Bidirectional causal steering | Confirms mechanism is localizable and controllable |
| Clean benchmarks unaffected | Proves "improvement" is contamination, not capability |

### Key Quote
> "Spurious RLVR activates the model's latent capacity for memorization, overriding general reasoning pathways in favor of retrieving stored answers"

### Connection to Other Papers

**Supports the "surfacing" hypothesis** from:
- **Interplay** (2512.07783): RL surfaces, doesn't create
- **s1** (2501.19393): 1K samples surfaces reasoning
- **DeepSeek-R1** (2501.12948): RL surfaces pre-existing capability

**Provides mechanism for**:
- **No Free Lunch** (2506.17219): RLIF eventually degrades reasoning
- **How LLMs Learn to Reason** (2509.23629): Policy collapse mechanism

**Challenges**:
- Any claim that RLVR performance gains represent genuine reasoning improvement
- Claims that RL "teaches" models to reason

---

## Discussion and Limitations

### Impact
1. **Tools to detect contamination** — Perplexity Paradox, circuit localization
2. **De-contamination pathway** — MLP neuron scaling can suppress shortcuts

### Ethical Note
> "While our work provides tools to detect and suppress memorization, the same techniques could theoretically be used to amplify a model's reliance on specific datasets."

### Limitations
1. Focused on math reasoning benchmarks
2. Specific to models with pre-existing contamination (Qwen family)
3. MLP-centric analysis (attention less explored)
4. Limited to 7B-8B scale models

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
No direct rebuttals found (paper very recent).

### Potential Counter-Arguments

1. **Qwen-specific**: May not generalize to other model families
2. **Domain-specific**: Math benchmarks may not represent all reasoning
3. **Contamination detection is imperfect**: Leakage/Stable categorization is heuristic

### Limitations (Authors Acknowledge)
- Study focused on Qwen family with known contamination
- Generalizability to non-math domains unclear

---

## Key Quotes

### On the paradox
> "This divergence constitutes a Perplexity Paradox: minimizing the loss on specific memorized answers under spurious RLVR leads to degraded language modeling performance on the input prompts."

### On the circuit
> "We identify the middle layers (L18–L20) as the Functional Anchor, where the critical decision to retrieve a memorized answer is causally determined."

### On the mechanism
> "RLVR acts as a retrieval mechanism for data already memorized during pretraining rather than a catalyst for genuine reasoning."

### On causal steering
> "We demonstrate the ability to causally steer the Qwen model's behavior. We show that adjusting these scaling factors can either amplify the model's reliance on contaminated data or suppress the shortcut to reveal the model's underlying baseline performance."

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] **Rebuttals checked**
- [x] **Paper graph updated**

---

## Bottom Line

This paper provides **definitive mechanistic evidence** that RLVR performance gains can come from activating pre-existing memorization rather than developing reasoning capabilities. The Anchor-Adapter circuit is a **specific, localized, and causally verifiable mechanism** for how models bypass reasoning in favor of memory retrieval.

**For the thesis**: This is perhaps the strongest mechanistic evidence yet that RL "surfaces" pre-existing patterns rather than creating new reasoning capabilities. The fact that models improve with INCORRECT rewards proves the performance isn't from learning to reason — it's from activating memorization shortcuts.
