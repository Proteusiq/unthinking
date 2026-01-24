# Decoding Ablation Experiment: Surfacing Reasoning in OLMo 3

## Hypothesis

**Reasoning paths exist in OLMo 3 base model, hidden by greedy decoding.**

RL and instruction-tuning don't create reasoning - they make existing reasoning paths the default. We can prove this by showing alternative decoding strategies reveal CoT in the base model.

---

## Experimental Design

### Models

| Model | Description | Purpose |
|-------|-------------|---------|
| `allenai/OLMo-2-1124-7B` | Base model (no SFT/RL) | Primary test subject |
| `allenai/OLMo-2-1124-7B-Instruct` | Instruction-tuned | Comparison baseline |
| `allenai/OLMo-2-1124-7B-DPO` | DPO-aligned | Additional comparison |

### Decoding Strategies

| Strategy | Parameters | Expected Behavior |
|----------|------------|-------------------|
| **Greedy** | `do_sample=False` | Direct answer, no CoT |
| **Top-k** | `k=50, temp=0.7` | May reveal reasoning paths |
| **Top-p (nucleus)** | `p=0.9, temp=0.7` | Alternative reasoning paths |
| **Beam search** | `num_beams=5` | Diverse completions |
| **Contrastive** | `penalty_alpha=0.6, top_k=4` | Force diversity |

### Datasets

| Dataset | Size | Task | Why |
|---------|------|------|-----|
| GSM8K (test) | 1319 | Math word problems | Standard reasoning benchmark |
| AQuA-RAT | 254 | Multiple choice math | Wang & Zhou used this |
| SVAMP | 1000 | Math variations | Test robustness |
| LogiQA | 651 | Logical reasoning | Non-math reasoning |

---

## Protocol

### Phase 1: Baseline Measurement

```python
# For each dataset, measure:
# 1. Greedy accuracy on base model
# 2. Greedy accuracy on instruct model
# 3. Gap = potential "hidden" capability
```

### Phase 2: Alternative Decoding on Base Model

```python
# For each decoding strategy:
# 1. Generate N=5 completions per problem
# 2. Check if ANY completion contains CoT
# 3. Check if ANY completion is correct
# 4. Record: P(CoT present), P(correct | CoT), P(correct | no CoT)
```

### Phase 3: CoT Detection

**Indicators of Chain-of-Thought:**
- Step markers: "Step 1", "First,", "Let's", "So,"
- Intermediate calculations: numbers not in problem or answer
- Reasoning words: "because", "therefore", "since", "if...then"
- Length: CoT completions typically longer

```python
def has_cot(completion: str) -> bool:
    """Detect if completion contains reasoning chain."""
    indicators = [
        r'\bStep \d',
        r'\bFirst\b.*\bThen\b',
        r'\bLet\'s\b',
        r'\bbecause\b',
        r'\btherefore\b',
        r'=\s*\d+',  # intermediate calculation
    ]
    return any(re.search(p, completion, re.IGNORECASE) for p in indicators)
```

### Phase 4: Confidence Analysis

```python
# For each token position:
# 1. Get full probability distribution
# 2. Measure entropy
# 3. Compare confidence when CoT present vs absent
# 4. Replicate Wang & Zhou finding: CoT correlates with higher confidence
```

---

## Key Metrics

### Primary Metrics

| Metric | Formula | Target |
|--------|---------|--------|
| **CoT Recovery Rate** | P(CoT in top-k \| no CoT in greedy) | >30% |
| **Accuracy Lift** | Acc(best-of-k) - Acc(greedy) | >10% |
| **CoT-Accuracy Correlation** | Corr(has_cot, correct) | >0.5 |

### Secondary Metrics

| Metric | Purpose |
|--------|---------|
| Confidence gap | Mean logprob(correct path) - Mean logprob(incorrect path) |
| CoT length | Tokens in reasoning vs direct answer |
| Step count | Number of reasoning steps when CoT present |

---

## Expected Results

### If Hypothesis is Correct:

1. **Base model greedy**: Low accuracy, no CoT
2. **Base model top-k/p**: Higher accuracy, CoT appears in alternatives
3. **Instruct model greedy**: High accuracy, CoT default
4. **Gap closes**: Base + alternative decoding ≈ Instruct + greedy

### The Killer Finding:

> "OLMo 3 base achieves X% accuracy with greedy decoding. With top-k sampling (k=50), accuracy rises to Y%, and Z% of correct answers contain chain-of-thought reasoning. The reasoning was always there - greedy decoding just didn't select it."

---

## Analysis Plan

### Figure 1: Accuracy by Decoding Strategy
```
Bar chart: [Greedy, Top-k, Top-p, Beam] x [Base, Instruct]
Shows: Alternative decoding closes the gap
```

### Figure 2: CoT Prevalence in Token Alternatives
```
For position i, plot P(CoT token in top-k) across sequence
Shows: Reasoning paths exist but aren't top-1
```

### Figure 3: Confidence vs CoT Presence
```
Scatter: Mean confidence (y) vs Has CoT (x)
Shows: CoT paths have higher confidence (Wang & Zhou replication)
```

### Table 1: Recovery Rates
```
| Dataset | Greedy Acc | Best-of-5 Acc | CoT Recovery | Lift |
|---------|------------|---------------|--------------|------|
| GSM8K   | ?%         | ?%            | ?%           | ?%   |
| ...     | ...        | ...           | ...          | ...  |
```

---

## Implementation Notes

### Hardware Requirements
- GPU with 16GB+ VRAM for OLMo 7B
- Or use quantized (4-bit) version

### Key Libraries
```python
transformers>=4.40
torch>=2.0
datasets
accelerate
bitsandbytes  # for quantization
```

### Runtime Estimate
- ~5 completions × ~2000 problems × 4 strategies = ~40K generations
- At ~1 sec/generation = ~11 hours
- Parallelize across GPUs if available

---

## Files in This Directory

```
experiments/decoding_ablation/
├── PROTOCOL.md          # This file
├── run_experiment.py    # Main experiment script
├── decoding.py          # Decoding strategy implementations
├── cot_detection.py     # CoT detection utilities
├── analysis.py          # Results analysis
├── requirements.txt     # Dependencies
└── results/             # Output directory
    ├── raw/             # Raw generations
    └── figures/         # Plots
```

---

## Success Criteria

The experiment succeeds if we demonstrate:

1. **Existence**: CoT paths exist in base OLMo 3 token probabilities
2. **Recovery**: Alternative decoding recovers these paths (>30% recovery rate)
3. **Utility**: Recovered CoT improves accuracy (>10% lift)
4. **Mechanism**: CoT presence correlates with model confidence

This proves: **Reasoning is learned during pre-training, not created by RL/SFT.**

---

## References

- Wang & Zhou (2024). "Chain-of-Thought Reasoning Without Prompting" (2402.10200)
- s1 paper (2501.19393) - 1K samples surfaces reasoning
- Interplay paper (2512.07783) - 0% exposure = RL fails
- OLMo technical report
