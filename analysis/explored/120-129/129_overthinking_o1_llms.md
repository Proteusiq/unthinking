# Paper Analysis: Do NOT Think That Much for 2+3=? On the Overthinking of o1-Like LLMs

## Metadata
- **arXiv ID**: 2412.21187
- **Title**: Do NOT Think That Much for 2+3=? On the Overthinking of o1-Like LLMs
- **Authors**: Xingyu Chen, Jiahao Xu, Tian Liang, Zhiwei He, et al.
- **Date**: December 2024
- **Venue**: Preprint (Tencent AI Lab + SJTU)
- **Institutions**: Tencent AI Lab, Shanghai Jiao Tong University

---

## Core Claims

1. **o1-like models exhibit severe overthinking**: Generate excessive tokens/solutions for trivial problems with no accuracy benefit

2. **First solution is correct >92% of the time**: Later solutions rarely contribute to accuracy — most tokens are wasted

3. **More solutions for EASIER problems**: Counter-intuitively, models generate more reasoning rounds for simple problems than hard ones

4. **Later solutions lack diversity**: Many repeated reasoning strategies — not genuine exploration of alternatives

5. **Overthinking can be mitigated**: Self-training with shorter responses maintains accuracy while reducing tokens by ~45-50%

---

## Methodology

### Test Sets (Varying Difficulty)
- **ASDIV**: Elementary school math (easiest)
- **GSM8K**: Grade school math (medium)
- **MATH500**: High school competition math (hardest)
- **GPQA**: Graduate-level science questions
- **AIME24**: American Invitational Mathematics Examination

### Models Tested
- **QwQ-32B-Preview** (Qwen)
- **DeepSeek-R1**
- Conventional baselines: Llama-3.3-70B-Instruct, Qwen2.5-Math-72B-Instruct

### Efficiency Metrics Proposed
1. **Outcome Efficiency (ξ_O)**: Ratio of tokens to reach first correct answer / total tokens
2. **Process Efficiency (ξ_P)**: Ratio of tokens in distinct reasoning strategies / total tokens

---

## Key Evidence

### The "2+3=5" Example (Figure 2)
| Metric | Value |
|--------|-------|
| QwQ solutions generated | **13** |
| Total tokens | 901 |
| Tokens to first correct answer | 39 |
| Outcome efficiency | **4.3%** |
| Distinct reasoning strategies | 7 of 13 |
| Process efficiency | **35.8%** |
| **Token overhead vs conventional LLMs** | **1,953%** |

### Table 1: Baseline Efficiency Results

| Model | Dataset | Accuracy | #Solutions | #Tokens | Outcome Eff. | Process Eff. |
|-------|---------|----------|------------|---------|--------------|--------------|
| QwQ-32B-Preview | ASDIV | 96.9% | 3.5 | 741.8 | **41.9%** | 66.5% |
| DeepSeek-R1 | ASDIV | 97.1% | 4.5 | 845.0 | **45.9%** | 64.3% |
| QwQ-32B-Preview | GSM8K | 94.8% | 3.1 | 772.8 | **50.7%** | 67.6% |
| DeepSeek-R1 | GSM8K | 96.4% | 4.3 | 1056.3 | **48.9%** | 62.0% |
| QwQ-32B-Preview | MATH500 | 93.0% | 3.2 | 2407.9 | **52.3%** | 71.2% |
| DeepSeek-R1 | MATH500 | 96.4% | 4.3 | 2704.3 | **51.0%** | 66.2% |

**Conventional LLMs**: 100% process efficiency (single solution), outcome efficiency = accuracy

### First Correctness Distribution (Figure 5)
- **>92%** of cases: First solution is already correct
- First solution uses **<60%** of total tokens (often ~38.7%)
- Later solutions contribute **marginally** to accuracy

### Easy vs Hard Problems (Critical Finding)

| Difficulty | QwQ Solutions | DeepSeek-R1 Solutions | Implication |
|------------|---------------|----------------------|-------------|
| Level 1-2 (easy) | 3.7 | 4.6 | **More** solutions |
| Level 4-5 (hard) | 3.0 | 3.9 | **Fewer** solutions |

**Key insight**: Models generate MORE rounds for EASIER problems — the opposite of efficient reasoning.

### Distinctness Ratio (Solution Diversity)
- Solution#2 often just double-checks Solution#1 with **same strategy**
- Distinctness ratio **decreases 11.5%** for Solution#≥4 vs Solution#3
- Many solutions are **redundant repetitions**

### Mitigation Results (Table 4)

| Method | MATH500 Acc | Tokens | Reduction | Outcome Eff. |
|--------|-------------|--------|-----------|--------------|
| Baseline QwQ | 93.0% | 2407.9 | — | 52.3% |
| +SimPO (FCS+Reflection) | 92.8% | 1330.7 | **44.7%** | 80.0% |
| +SimPO (FCS only) | 91.0% | 1016.0 | **57.8%** | 88.7% |

---

## Relationship to Thesis

### SUPPORTS the thesis

**Key Evidence for Pattern Matching Over Reasoning:**

1. **First answer is almost always correct (>92%)**: If o1-like models were "reasoning," they would need the extended chain to reach conclusions. Instead, the answer appears immediately — later tokens are **redundant pattern generation**.

2. **More thinking for easier problems**: A reasoning system would allocate more compute to harder problems. o1-like models do the **opposite** — suggesting they're running through learned patterns regardless of problem difficulty.

3. **Repeated strategies, not exploration**: Later solutions often use the **same reasoning strategy** (11.5% distinctness drop). This is **pattern repetition**, not genuine exploration of alternatives.

4. **1,953% token overhead for "2+3=5"**: No reasoning system would spend 901 tokens on trivial arithmetic. This is **uncontrolled pattern completion** — the model keeps generating because it was trained to.

5. **Mitigation via shorter training data works**: SimPO with shorter responses maintains accuracy while cutting tokens ~45%. This proves the extra tokens were **never necessary for correctness** — just pattern completion artifacts.

### Mechanism Revealed

The "thinking" in o1-like models is not deliberate reasoning but:
- **Pattern completion** trained via RL to generate long chains
- **Uncontrolled repetition** once patterns are triggered
- **No metacognitive awareness** of when problem is solved
- **Training artifact** that can be fixed with preference optimization

---

## Relationship to Other Papers

### Supports
- **Paper 24 (2601.21576)**: CoT Compression — both show extended reasoning chains often redundant
- **Paper 92 (2601.17421)**: Oops Wait — shows error correction in long chains is often fake
- **Paper 63 (2409.12917)**: To CoT or Not — showed CoT hurts on simple problems

### Extends
- **Paper 10 (2407.01687)**: Scaling of Test-Time Compute — this paper shows the dark side (inefficiency)
- **Paper 44 (2405.15071)**: Adaptive Inference — validates need for difficulty-aware compute allocation

### Challenges
- **Claims that longer thinking = better reasoning**: Shows most extra thinking is wasted
- **o1 as "reasoning breakthrough"**: Reveals much of o1's token use is inefficient pattern repetition

### Provides Mechanism For
- Why o1-like models are expensive: Not because reasoning is hard, but because of **trained overthinking patterns**
- Why accuracy doesn't scale linearly with compute: Diminishing returns after first solution

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
No direct rebuttals found (December 2024 paper).

### Potential Counter-Arguments

1. **Extra solutions serve as verification**: Even if redundant for accuracy, they might catch errors
   - **Counter**: Figure 5 shows first solution is correct >92% of time — verification rarely needed

2. **Diversity has value beyond accuracy**: Multiple approaches might help in edge cases
   - **Counter**: Distinctness ratio drops significantly — solutions aren't that diverse

3. **Hard problems need long chains**: MATH500/AIME require extended reasoning
   - **Counter**: Table 4 shows ~45% token reduction with maintained accuracy — chains were always too long

4. **Efficiency is just an engineering problem**: Can be optimized without changing the model
   - **Counter**: Paper's point — inefficiency reveals the "thinking" was never genuine reasoning

### Limitations (Authors Acknowledge)

1. Only math domains tested — may not generalize to other reasoning tasks
2. QwQ-32B-Preview as main test platform — other o1-like models may differ
3. Self-training approach requires sampling many responses
4. Did not analyze *why* models overthink (only that they do)

---

## Key Quotes

> "On average, o1-like models consumed **1,953% more tokens** than conventional models to reach the same answer."

> "In more than **92%** of cases, the initial round of solutions produces the correct answer."

> "o1-like models tend to generate **more solutions for easier test sets**."

> "The distinctness ratio for Solution#≥4 across test sets **decreases by 11.5%** compared to Solution#3."

> "Our approach can reduce token output by **48.6%** while maintaining accuracy."

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] **Rebuttals checked**
- [ ] **Paper graph updated**
