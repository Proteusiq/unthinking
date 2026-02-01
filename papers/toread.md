# Papers to Read

Curated list of papers confirmed relevant to the thesis. Promoted from `toevaluate.md` after triage.

**Last updated**: 2026-02-01

---

## NEW — Mined from Analysis Files 70+ (2026-02-01)

### Critical Foundational Papers

| arXiv ID | Title | Priority | Why Read |
|----------|-------|----------|----------|
| 2201.11903 | **Chain-of-Thought Prompting Elicits Reasoning** (Wei et al.) | ⭐ CRITICAL | **ORIGINAL CoT PAPER** (NeurIPS 2022). Foundation for ALL CoT research. 540B + 8 examples = SOTA GSM8K. Analysis file exists as Paper 151 — needs tracking. |
| 2203.11171 | **Self-Consistency Improves Chain of Thought Reasoning** (Wang et al.) | ⭐ CRITICAL | **SELF-CONSISTENCY** (ICLR 2023). +17.9% GSM8K, +11.0% SVAMP via diverse reasoning paths + majority voting. |
| 2409.13373 | **LLMs Still Can't Plan; Can LRMs?** (Kambhampati et al.) | ⭐ CRITICAL | **o1 on PlanBench** (Sep 2024). Tests o1/Strawberry — quantum improvement but STILL doesn't saturate. Extends Paper 150. |

### High Priority — Theoretical Foundations

| arXiv ID | Title | Priority | Why Read |
|----------|-------|----------|----------|
| 2310.07923 | **The Expressive Power of Transformers with Chain of Thought** (Merrill & Sabharwal) | 🟠 HIGH | **FOR THESIS** (ICLR 2024). Proves CoT adds computational power — linear steps = regular languages. Important for balance. |
| 2305.14699 | **Can Transformers Learn to Solve Problems Recursively?** | 🟠 HIGH | Mechanistic interp of recursive failures. Predicts 91% of failure cases by reconstructing "shortcut" algorithms. |
| 2108.12409 | **Train Short, Test Long: ALiBi** (Press et al.) | 🟠 HIGH | **Length extrapolation** (ICLR 2022). Linear biases enable OOD length generalization — architectural approach. |
| 2206.10498 | **PlanBench** (Valmeekam et al.) | 🟠 HIGH | **Kambhampati's planning benchmark** (NeurIPS D&B 2023). Used in Papers 131, 132, 150. |

### Medium Priority — Additional Foundations

| arXiv ID | Title | Priority | Why Read |
|----------|-------|----------|----------|
| 2205.11916 | **Large Language Models are Zero-Shot Reasoners** (Kojima et al.) | 🟡 MEDIUM | **"Let's think step by step"** (NeurIPS 2022). Original zero-shot CoT paper. |
| 2405.00451 | **Monte Carlo Tree Search Boosts Reasoning via Iterative Preference Learning** | 🟡 MEDIUM | MCTS + DPO: +5.9% GSM8K, +5.8% MATH. AlphaZero-inspired iterative preference learning. |

---

## HIGH PRIORITY — Core Thesis Papers (Added 2026-02-01)

These papers directly test or challenge the thesis that LLM reasoning is pattern matching, not genuine reasoning.

### Foundational Skeptic Papers (Kambhampati et al.)

| arXiv ID | Title | Priority | Why Read |
|----------|-------|----------|----------|
| 2403.04121 | **Can Large Language Models Reason and Plan?** | ✅ DONE | Analyzed as Paper 131 |
| 2504.09762 | **Stop Anthropomorphizing Intermediate Tokens as Reasoning/Thinking Traces!** | ✅ DONE | Analyzed as Paper 132 |
| 2405.04776 | **Chain of Thoughtlessness? An Analysis of CoT in Planning** | ✅ DONE | Analyzed as Paper 136 |

### Surfacing Hypothesis Papers

| arXiv ID | Title | Priority | Why Read |
|----------|-------|----------|----------|
| 2510.07364 | **Base Models Know How to Reason, Thinking Models Learn When** | ✅ DONE | Analyzed as Paper 133 |

### OOD Generalization Papers

| arXiv ID | Title | Priority | Why Read |
|----------|-------|----------|----------|
| 2410.09695 | **Can In-context Learning Really Generalize to Out-of-distribution Tasks?** | ✅ DONE | Analyzed as Paper 134 |
| 2502.04667 | **Unveiling the Mechanisms of Explicit CoT Training: How CoT Enhances Reasoning Generalization** | ✅ DONE | Analyzed as Paper 137 |

### Long CoT / Test-Time Scaling

| arXiv ID | Title | Priority | Why Read |
|----------|-------|----------|----------|
| 2502.03373 | **Demystifying Long Chain-of-Thought Reasoning in LLMs** | ✅ DONE | Analyzed as Paper 135 |

### CoT Faithfulness Evidence

| arXiv ID | Title | Priority | Why Read |
|----------|-------|----------|----------|
| 2508.15842 | **Lexical Hints of Accuracy in LLM Reasoning Chains** | ✅ DONE | Analyzed as Paper 138 |

### Novel Architectures

| arXiv ID | Title | Priority | Why Read |
|----------|-------|----------|----------|
| 2512.24601 | **Recursive Language Models** | ✅ DONE | Analyzed as Paper 139 |

---

## Medium Priority (Strong Mechanistic Evidence)

### Sycophancy/Deception (Issue #27)

- [x] **Illusions of Confidence** (2601.05905) — Analyzed as Paper 122
- [x] **Causal Illusions in LLMs** (2410.11684) — Analyzed as Paper 123

### Elicitation (Issue #26)

- [x] **Self-Exploring Language Models** (2405.19332) — SKIPPED: Training methodology paper (preference optimization), not about reasoning capabilities

### Cited Papers to Review (Issue #25: Papers Based On)

**HIGH PRIORITY — Rebuttals & Direct Evidence**
- [x] **The Illusion of the Illusion of Thinking** (2506.09250) — Analyzed as Paper 124
- [x] **Alice in Wonderland: Simple Tasks Showing Complete Reasoning Breakdown** (2406.02061) — Analyzed as Paper 125
- [x] **Fundamental Limitations of Alignment in LLMs** (2304.11082) — Analyzed as Paper 126

**HIGH PRIORITY — Sycophancy/Conformity Foundational**
- [x] **Towards Understanding Sycophancy in Language Models** (2310.13548) — Analyzed as Paper 127
- [x] **Do as we do, not as you think: The conformity of LLMs** (2501.13381) — Analyzed as Paper 128

**MEDIUM PRIORITY — Overthinking Research**
- [x] **Overthinking in LRMs** (2412.21187) — Analyzed as Paper 129
- [x] **Underthinking in LRMs** (2501.18585) — Analyzed as Paper 130

**SKIPPED (Not Relevant to Reasoning Thesis)**
- [x] 2509.15202 — DeepRefusal: Safety alignment METHOD, not reasoning test
- [x] 2508.03550 — LAGER: LLM-as-Judge METHOD, not reasoning test  
- [x] 2511.02623 — TRACE: Realignment METHOD, not reasoning test
- [x] 2402.15570 — BEAST: Adversarial attack METHOD for jailbreaking/safety, not reasoning test

---

## Alternative Architectures / Training Methods

*All papers in this section have been analyzed — see Recently Analyzed below.*

---

## NEW — Cited Papers from 00-09 Analysis (2026-02-01)

### Mechanistic/Theoretical Foundations

| arXiv ID | Title | Priority | Why Read |
|----------|-------|----------|----------|
| 2301.00234 | **Transformers Learn 1-Nearest Neighbor** (Li et al.) | ⭐ CRITICAL | WRONG ID — 2301.00234 is ICL Survey. Need to find correct paper. |
| 2202.07206 | **Impact of Pretraining Term Frequencies on Few-Shot Reasoning** (Razeghi et al.) | ✅ DONE | Analyzed as Paper 147 |
| 2310.XXXXX | **Token Bias in LLMs** (Jiang et al.) | 🟠 HIGH | Statistical guarantees for token bias. Foundation for fragility/sensitivity findings in GSM-Symbolic. |
| 2206.07682 | **Emergent Abilities Are Mirage** (Schaeffer et al.) | 🟠 HIGH | WRONG ID — check for correct paper. May be duplicate of 2304.15004. |

### Length/OOD Generalization Theory

| arXiv ID | Title | Priority | Why Read |
|----------|-------|----------|----------|
| 2108.12409 | **Train Short, Test Long: ALiBi** (Press et al.) | 🟠 HIGH | Linear biases for length extrapolation. Architectural approach to OOD — shows what's needed to generalize. |
| 2111.00396 | **Efficiently Modeling Long Sequences with S4** (Gu et al.) | 🟡 MEDIUM | State space models for long sequences. Alternative architecture with different reasoning properties. |
| 2404.01445 | **Theory for Length Generalization in Learning to Reason** | 🟡 MEDIUM | Theoretical analysis of when/why length generalization fails. Already in corpus as Paper 66. |

### CoT Theoretical Foundations

| arXiv ID | Title | Priority | Why Read |
|----------|-------|----------|----------|
| 2310.07923 | **Expressive Power of Transformers with Chain of Thought** (Merrill & Sabharwal) | 🟠 HIGH | Proves CoT gives additional computational power. FOR reasoning argument — important for balance. |
| 2205.11916 | **Zero-Shot CoT: Let's Think Step by Step** (Kojima et al.) | 🟡 MEDIUM | Original zero-shot CoT paper. Foundation for all CoT research. May already be covered. |
| 2301.00303 | **CoT Improves Sample Efficiency on Parity** (Kim & Suzuki) | 🟡 MEDIUM | Mechanistic analysis of WHY CoT helps. Relevant to Paper 137's findings. |

### Faithfulness/Unfaithfulness

| arXiv ID | Title | Priority | Why Read |
|----------|-------|----------|----------|
| 2305.04388 | **Language Models Don't Always Say What They Think** (Turpin et al.) | ✅ DONE | Analyzed as Paper 148 |
| 2212.08073 | **Large Language Models Can Be Easily Distracted** | 🟡 MEDIUM | Irrelevant context hurts reasoning. Related to GSM-NoOp findings. |
| 2309.12288 | **The Reversal Curse: LLMs trained on "A is B" fail to learn "B is A"** (Berglund et al.) | ✅ DONE | Analyzed as Paper 149 |

### Relational Reasoning & World Models

| arXiv ID | Title | Priority | Why Read |
|----------|-------|----------|----------|
| 2206.XXXXX | **DLM: Differentiable Logic Machines** | 🟡 MEDIUM | Dramatically outperforms LLMs 100,000x larger on logical reasoning. Architectural comparison. |
| 2305.15771 | **On the Planning Abilities of Large Language Models** (Valmeekam et al., NeurIPS Spotlight 2023) | ✅ DONE | Analyzed as Paper 150 |
| 2206.10498 | **PlanBench: Evaluating LLMs on Planning and Reasoning about Change** (Valmeekam et al., NeurIPS D&B 2023) | 🟠 HIGH | Benchmark used in planning investigations. |

### Emergence/Scaling Critiques

| arXiv ID | Title | Priority | Why Read |
|----------|-------|----------|----------|
| 2304.15004 | **Are Emergent Abilities of LLMs a Mirage?** (Schaeffer et al.) | ✅ DONE | Analyzed as Paper 146 |
| 2201.11903 | **Chain of Thought Prompting Elicits Reasoning** (Wei et al.) | ✅ DONE | Analyzed as Paper 151 |

---

## Previously Triaged (Completed)

| arXiv ID | Title | Priority | Status |
|----------|-------|----------|--------|
| 2601.21894 | **Not All Code Is Equal: Code Complexity and LLM Reasoning** | 🟠 HIGH | ✅ DONE — Analyzed as Paper 140 |
| 2601.21909 | **From Meta-Thought to Execution: Cognitively Aligned Post-Training** | 🟠 HIGH | ✅ DONE — Analyzed as Paper 141 |
| 2601.21414 | **System 1&2 Synergy via Dynamic Model Interpolation** | 🟡 MEDIUM | ✅ DONE — Analyzed as Paper 142 |

---

## Recently Analyzed (Removed from Queue)

- ✅ **Mechanisms of Explicit CoT Training** (2502.04667) — Analyzed 2026-02-01 as Paper 137
- ✅ **Lexical Hints of Accuracy** (2508.15842) — Analyzed 2026-02-01 as Paper 138
- ✅ **Recursive Language Models** (2512.24601) — Analyzed 2026-02-01 as Paper 139
- ✅ **CoT Compression** (2601.21576) — Analyzed 2026-01-31 as Paper 24
- ✅ **Chains to DAGs** (2601.17593) — Analyzed 2026-01-31 as Paper 90
- ✅ **HalluGuard** (2601.18753) — Analyzed 2026-01-31 as Paper 91
- ✅ **Oops Wait** (2601.17421) — Analyzed 2026-01-31 as Paper 92
- ✅ **SOAR** (2601.18778) — Analyzed 2026-01-31 as Paper 94
- ✅ **LLM-JEPA** (2509.14252) — Analyzed 2026-01-31 as Paper 95
- ✅ **Sycophancy** (2601.15436) — Analyzed 2026-01-31 as Paper 96
- ✅ **WhatCounts** (2601.21618) — Analyzed 2026-01-31 as Paper 108
- ✅ **Strong Reasoning Isn't Enough** (2601.19773) — Analyzed 2026-01-31 as Paper 107
- ✅ **Reasoning-Critical Neurons (AdaRAS)** (2601.19847) — Analyzed 2026-01-29 as Paper 106
- ✅ **Flexibility Trap** (2601.15165) — Analyzed 2026-01-29
- ✅ **Tokenizer Betrays Reasoning** (2601.14658) — Analyzed 2026-01-29
- ✅ **Outcome-Based RL** (2601.15158) — Analyzed 2026-01-29
- ✅ **Gaming the Judge** (2601.14691) — Analyzed 2026-01-29
- ✅ **Beyond Memorization** (2601.13392) — Analyzed 2026-01-29

---

## Skipped (Not Relevant)

The following paper types are filtered out:
- RAG/retrieval papers (unless testing reasoning directly)
- Domain-specific applications (medical, legal, finance, traffic, chemistry)
- Image/audio/video generation and understanding
- Efficiency/quantization papers without reasoning analysis
- Tool-specific papers (code, SQL, visualization)
- Safety/alignment papers not about reasoning
- Survey/taxonomy papers without new findings on reasoning
- Training methods without reasoning insights
