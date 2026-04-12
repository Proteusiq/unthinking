# Paper 319: Refusal in LLMs is mediated by a single direction

## Metadata
- **arXiv**: 2406.11717
- **Date**: June 2024 (paper), April 2024 (LessWrong preview)
- **Authors**: Andy Arditi, Oscar Obeso, Aaquib Syed, Daniel Paleka, Nina Panickssery, Wes Gurnee, Neel Nanda
- **Affiliation**: MATS Program (ML Alignment Theory Scholars)
- **Venue**: arXiv + LessWrong
- **Stance**: Strongly Supports

---

## Core Finding

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  REFUSAL IS A SINGLE DIRECTION                                      │
│                                                                     │
│  r = mean(harmful_activations) - mean(harmless_activations)         │
│                                                                     │
│  Ablate r from all residual stream writers:                         │
│  W_out' ← W_out - r̂r̂ᵀW_out                                         │
│                                                                     │
│  RESULT: Model loses ability to refuse harmful requests             │
│  WITHOUT retraining, WITHOUT capability degradation                 │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Key insight**: Safety alignment operates through a **1-dimensional subspace**. This direction can be extracted via simple difference-of-means and removed via weight orthogonalization.

---

## Methodology

### Finding the Refusal Direction

1. Run model on n harmful + n harmless instructions (n=512, though n=32 works)
2. Cache residual stream activations at last token position
3. Compute difference-in-means for each layer: `r_l = mean(harmful_l) - mean(harmless_l)`
4. Evaluate normalized directions `r̂_l` to select the single best refusal direction `r̂`

### Ablating the Direction

**Inference-time intervention**: For every component `c` writing to residual stream:
```
c_out' ← c_out - (c_out · r̂)r̂
```

**Weight orthogonalization** (permanent): For each matrix writing to residual stream:
```
W_out' ← W_out - r̂r̂ᵀW_out
```

Matrices affected: embedding, positional embedding, attention out, MLP out.

### Inducing Refusal (Reverse Direction)

Adding the refusal direction to harmless prompts causes the model to refuse:
```
a_harmless' ← a_harmless - (a_harmless · r̂)r̂ + (avg_proj_harmful)r̂
```

---

## Results

### Bypassing Refusal

Tested on JailbreakBench (100 harmful instructions across 10 categories):

| Model | Baseline Refusal | After Ablation | Unsafe Completions |
|-------|------------------|----------------|-------------------|
| Gemma 7B | High | Near-zero | High |
| Qwen 1.8B-72B | High | Near-zero | High |
| Llama 3 8B-70B | High | Near-zero | High |
| Yi 6B-34B | High | Near-zero | High |

### Inducing Refusal

Adding the direction to harmless prompts (Alpaca dataset, 128 instructions):
- Models refuse harmless requests like "Generate a list of five books"
- Response: "I am unable to provide information... as it would be unethical"

### PCA Analysis

The first PCA component strongly separates harmful/harmless activations at mid-to-late layers. After a certain layer, PC1 becomes **identical** to the difference-of-means direction.

> "These findings provide strong evidence that refusal is represented as a one-dimensional linear subspace within the activation space."

---

## Implications for Thesis

```
┌─────────────────────────────────────────────────────────────────────┐
│                    WHY THIS IS DEVASTATING                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  IF ALIGNMENT WERE DEEP:                                            │
│  - Refusal would be distributed across the network                  │
│  - Removing it would require extensive retraining                   │
│  - Surgical removal would degrade core capabilities                 │
│  - Different models would need different techniques                 │
│                                                                     │
│  WHAT WE OBSERVE:                                                   │
│  - Refusal = ONE DIRECTION (1D subspace)                            │
│  - Removal = linear algebra (no gradients)                          │
│  - Capabilities preserved (benchmarks unchanged)                    │
│  - Same technique works across model families                       │
│                                                                     │
│  CONCLUSION: Alignment is cosmetic, not structural                  │
│              "Mascara" that washes off under trivial perturbation   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Connection to "Alignment as Mascara"

This paper provides the **mechanistic proof** that safety alignment is superficial:

1. **Same substrate**: Refusal uses the same residual stream as capability
2. **Single direction**: Not entangled with knowledge/reasoning
3. **Orthogonalizable**: Can be removed without touching other directions
4. **Universal**: Works across Qwen, Gemma, Yi, Llama (1.8B-72B)

### The Fragility Revelation

From the paper:
> "Although our methodology presents an even simpler and cheaper methodology, it is not the first such methodology to jailbreak the weights of open-source chat models."

The authors explicitly note this **demonstrates the fragility of safety fine-tuning**.

---

## Key Quotes

> "We find that refusal is mediated by a single direction in the residual stream: preventing the model from representing this direction hinders its ability to refuse requests."

> "This novel jailbreak technique... further demonstrates the fragility of safety fine-tuning of open-source chat models."

> "We don't view disclosure of our methodology as introducing new risk... We hope that this work will motivate more robust methods for safety fine-tuning."

---

## Technical Details

### What is Orthogonalized

| Component | Matrix | Effect |
|-----------|--------|--------|
| Embedding | W_E | Can't embed refusal |
| Position | W_pos | Position doesn't trigger refusal |
| Attention | W_O | Attention can't write refusal |
| MLP | W_out | MLP can't write refusal |

### Why It Works

The authors hypothesize a "refusal feature" that acts as a bottleneck:
- Many harmful inputs → express refusal feature → model refuses
- Remove the feature's direction → bottleneck broken → model complies

This is consistent with the **linear representation hypothesis**: concepts are encoded as directions in activation space.

---

## Rebuttals and Limitations

### Authors' Acknowledged Limitations

1. Don't fully understand how refusal direction is **computed** from harmful input
2. Don't know how it's **translated** to refusal output tokens
3. Don't claim to know what the direction actually **represents** (harm? danger? non-interpretable?)
4. Methodology (difference-of-means) may not be optimal

### Potential Counter-Evidence

The finding that one direction controls all refusal could be seen as:
- **Weakness**: Proves alignment is shallow
- **Opportunity**: Could enable more robust alignment if we understand the mechanism

However, subsequent work (heretic, 1000+ abliterated models) confirms the finding is robust across architectures.

---

## Connections to Other Papers

| Paper | Relationship |
|-------|--------------|
| Zou et al. 2023 (RepE) | Prior work on harmfulness directions; this paper extends with weight modification |
| Rimsky et al. 2023 | Extracted refusal direction via multiple-choice; steering didn't work for open-ended generation |
| Zheng et al. 2024 | System prompts shift activations orthogonally to harmful/harmless separation |
| Paper 240 (LRMs as Jailbreak Agents) | Confirms: even without abliteration, 97% ASR proves fragility |
| Paper 231 (Many-Shot Jailbreaking) | Different mechanism (context length) but same conclusion: safety is shallow |

---

## Tools and Reproduction

| Resource | URL | Description |
|----------|-----|-------------|
| Original Colab | [colab.research.google.com/...](https://colab.research.google.com/drive/1a-aQvKC9avdZpdyBn4jgRQFObTPy1JZw) | Authors' demo |
| heretic | [github.com/p-e-w/heretic](https://github.com/p-e-w/heretic) | Fully automatic, TPE-optimized |
| abliterator | [github.com/FailSpy/abliterator](https://github.com/FailSpy/abliterator) | Original library |
| mlabonne tutorial | [huggingface.co/blog/mlabonne/abliteration](https://huggingface.co/blog/mlabonne/abliteration) | Step-by-step guide |

---

## Summary

**Rating**: Strongly Supports thesis

**Contribution**: Mechanistic proof that safety alignment is a 1-dimensional feature that can be surgically removed via linear algebra, without retraining and without capability degradation. This is the smoking gun evidence that alignment is "mascara" — a thin veneer over next-token prediction, not a deep architectural property.

**The devastating implication**: If alignment were deep, removing it would be hard. It's not hard. It's one vector subtraction.
