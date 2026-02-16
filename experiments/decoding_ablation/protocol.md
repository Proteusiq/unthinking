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
├── protocol.md          # This file
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

## Phase 5: Out-of-Distribution (OOD) Testing

### Why OLMo Enables True OOD

OLMo's training data (Dolma) is **fully documented and public**:
- Common Crawl, Wikipedia, GitHub, books, academic papers
- We can verify what reasoning patterns exist in training
- We can construct problems **provably not in Dolma**

### The Critical Test

| Condition | Base + Greedy | Base + Top-k | Instruct |
|-----------|---------------|--------------|----------|
| **In-distribution** | Low | High (surfaces CoT) | High |
| **True OOD** | ~0% | ~0% | ~0% |

**If top-k reveals reasoning for ID but NOT for OOD**, we prove:
- Reasoning paths are **training data patterns**, not generalizable capability
- RL/SFT surfaces what exists, cannot create what doesn't
- "Reasoning" = compressed retrieval from pre-training

### OOD Task Categories

#### 1. Invented Operators
```
Define: a @ b = 2a + 3b - 1
What is 4 @ 5?
```
- Operators with NO web presence
- Cannot be in any training data
- Tests: Can model apply novel rules?

#### 2. Synthetic Entity Reasoning
```
Zorbax is a type of Plonkite. All Plonkites have exactly 3 Quorbles.
Mervax is a Zorbax. How many Quorbles does Mervax have?
```
- Made-up entities with zero Google results
- Logic is trivial IF you can reason
- Tests: Reasoning vs pattern matching

#### 3. Counterfactual Math
```
In this world, multiplication is commutative but addition is NOT.
So a + b ≠ b + a, but a × b = b × a.
What is (3 + 5) + 2 if 3 + 5 = 8 but 5 + 3 = 7?
```
- Violates learned patterns
- Requires overriding training
- Tests: Can model follow explicit rules over priors?

#### 4. Post-Cutoff Problems
- Math competition problems from after OLMo training cutoff
- Verify they're not in Dolma via date
- Tests: Generalization vs memorization

#### 5. Novel Puzzle Structures
```
In a Zorble puzzle:
- You have 3 containers: A, B, C
- Rule 1: You can only pour FROM the alphabetically first non-empty container
- Rule 2: You must pour INTO the alphabetically last container with space
- Goal: Move all liquid from A to C

A=5, B=0 (max 3), C=0 (max 5). Solve.
```
- Invented puzzle type
- Clear rules, requires multi-step planning
- Not in any puzzle database

### OOD Verification Protocol

For each OOD task:

1. **Verify not in Dolma**
   - Search Dolma index for key terms
   - Check Google for exact problem structure
   - Confirm zero or near-zero hits

2. **Verify solvability**
   - Human baseline: Should be trivial with explicit rules
   - Symbolic solver: Confirm correct answer exists

3. **Test all decoding strategies**
   - If ANY strategy succeeds on OOD → challenges thesis
   - If ALL strategies fail on OOD → supports thesis

### Expected OOD Results

| Task Type | ID Accuracy (Top-k) | OOD Accuracy (Top-k) |
|-----------|---------------------|----------------------|
| Standard math (GSM8K) | ~60-70% | N/A |
| Invented operators | N/A | <5% |
| Synthetic entities | N/A | <5% |
| Counterfactual math | N/A | <5% |
| Novel puzzles | N/A | <5% |

### The Complete Argument

```
┌─────────────────────────────────────────────────────────────────┐
│                    THE SURFACING HYPOTHESIS                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  IN-DISTRIBUTION:                                               │
│  ┌─────────────┐    top-k     ┌─────────────┐                   │
│  │ Base Model  │ ──────────>  │ CoT Revealed │  ✓ Accuracy ↑    │
│  │ (greedy=low)│              │ (was hidden) │                  │
│  └─────────────┘              └─────────────┘                   │
│                                                                 │
│  OUT-OF-DISTRIBUTION:                                           │
│  ┌─────────────┐    top-k     ┌─────────────┐                   │
│  │ Base Model  │ ──────────>  │ Still Fails  │  ✗ No CoT exists │
│  │ (greedy=0%) │              │ (~0%)        │                  │
│  └─────────────┘              └─────────────┘                   │
│                                                                 │
│  CONCLUSION: Reasoning = training patterns, not capability      │
│  - ID: Patterns exist → can be surfaced                         │
│  - OOD: Patterns don't exist → nothing to surface               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### OOD Success Criteria

The OOD phase succeeds if:

1. **ID surfacing works**: Top-k reveals CoT on GSM8K-like tasks
2. **OOD surfacing fails**: Top-k does NOT reveal CoT on novel tasks
3. **Gap is stark**: ID lift >10%, OOD lift <2%
4. **Human baseline high**: Humans solve OOD tasks easily (proves solvability)

This proves: **Reasoning is pattern retrieval from training, not generalizable capability.**

---

## Success Criteria (Updated)

The experiment succeeds if we demonstrate:

1. **Existence**: CoT paths exist in base OLMo 3 token probabilities
2. **Recovery**: Alternative decoding recovers these paths (>30% recovery rate)
3. **Utility**: Recovered CoT improves accuracy (>10% lift)
4. **Mechanism**: CoT presence correlates with model confidence
5. **Boundary**: Recovery works for ID, fails for OOD (proves distribution-bounded)

This proves: **Reasoning is learned during pre-training, bounded by training distribution, and not created by RL/SFT.**

---

## References

- Wang & Zhou (2024). "Chain-of-Thought Reasoning Without Prompting" (2402.10200)
- s1 paper (2501.19393) - 1K samples surfaces reasoning
- Interplay paper (2512.07783) - 0% exposure = RL fails
- OLMo technical report
