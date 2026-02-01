# Papers to Read

Curated list of papers confirmed relevant to the thesis. Promoted from `toevaluate.md` after triage.

**Last updated**: 2026-02-01

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
