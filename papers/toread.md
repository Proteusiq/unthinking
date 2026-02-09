# Papers to Read

Curated list of papers confirmed relevant to the thesis. Promoted from `toevaluate.md` after triage.

**Last updated**: 2026-02-09

---

## NEW — From Summer 2025 Reading (Issues #30-32, #35)

Papers from your Italy Summer 2025 reading not yet analyzed.

### 🔴 HIGH PRIORITY — Core Thesis Papers

| arXiv ID | Title | Priority | Theme |
|----------|-------|----------|-------|
| [2305.11169](https://arxiv.org/abs/2305.11169) | **Arithmetic Without Algorithms** (Dziri) | 🔴 HIGH | Math = bag of heuristics |
| [2310.07191](https://arxiv.org/abs/2310.07191) | **GSM-Symbolic** | 🔴 HIGH | Math limitations under perturbation |
| [2404.15758](https://arxiv.org/abs/2404.15758) | **Let's Think Dot by Dot** | 🔴 HIGH | Hidden computation, filler tokens work |
| [2402.18312](https://arxiv.org/abs/2402.18312) | **Mechanistic Understanding of CoT** | ✅ DONE | Analyzed as Paper 163 |
| [2301.13379](https://arxiv.org/abs/2301.13379) | **Faithful Chain-of-Thought Reasoning** (Lanham) | 🔴 HIGH | CoT faithfulness analysis |
| [2406.12837](https://arxiv.org/abs/2406.12837) | **RCoT: Detecting Unfaithful Reasoning** | 🔴 HIGH | Reverse CoT detects unfaithfulness |
| [2401.11817](https://arxiv.org/abs/2401.11817) | **Hallucination is Inevitable** (computability) | 🔴 HIGH | Theoretical proof of inevitability |
| [2405.20947](https://arxiv.org/abs/2405.20947) | **Predictable Compression Failures** | 🔴 HIGH | Hallucinations as compression failures |
| [2406.02088](https://arxiv.org/abs/2406.02088) | **LLMs Get Lost in Multi-Turn** | 🔴 HIGH | Context degradation |
| [2406.13121](https://arxiv.org/abs/2406.13121) | **Context Rot** | 🔴 HIGH | More tokens → worse performance |
| [2404.17038](https://arxiv.org/abs/2404.17038) | **SWE-Bench Illusion** | 🔴 HIGH | Remember instead of reason |
| [2507.11473](https://arxiv.org/abs/2507.11473) | **Proof or Bluff (USAMO 2025)** | 🔴 HIGH | Math olympiad failures |
| [2406.14193](https://arxiv.org/abs/2406.14193) | **The Wall Confronting LLMs** | 🔴 HIGH | Scaling limits |

### 🟠 MEDIUM PRIORITY — Supporting Evidence

| arXiv ID | Title | Priority | Theme |
|----------|-------|----------|-------|
| [2310.08518](https://arxiv.org/abs/2310.08518) | **Language Models Don't Always Say What They Think** (Anthropic) | 🟠 MED | Faithfulness |
| [2405.00675](https://arxiv.org/abs/2405.00675) | **The Confidence Paradox** | 🟠 MED | Calibration failures |
| [2507.11768](https://arxiv.org/abs/2507.11768) | **One Token to Fool LLM-as-a-Judge** | 🟠 MED | Adversarial |
| [2310.13345](https://arxiv.org/abs/2310.13345) | **An LLM can Fool Itself** | 🟠 MED | Adversarial |
| [2501.18626](https://arxiv.org/abs/2501.18626) | **TIP of the Iceberg (Task-in-Prompt)** | 🟠 MED | Jailbreak |
| [2510.05116](https://arxiv.org/abs/2510.05116) | **Hallucination Inevitable (Open World)** | 🟠 MED | Hallucination theory |
| [2510.13928](https://arxiv.org/abs/2510.13928) | **LLMs Can Get Brain Rot** | 🟠 MED | Data quality decay |
| [2510.07192](https://arxiv.org/abs/2510.07192) | **Poisoning Attacks Require Few Samples** | 🟠 MED | ~250 samples enough |
| [2509.11208](https://arxiv.org/abs/2509.11208) | **Predictable Compression Failures** | 🟠 MED | Bayesian in expectation |
| [2402.06702](https://arxiv.org/abs/2402.06702) | **Mind Your Tone (Politeness)** | 🟠 MED | Prompt sensitivity |

### 🟡 LOWER PRIORITY — Methods/Foundations

| arXiv ID | Title | Priority | Theme |
|----------|-------|----------|-------|
| [2305.18290](https://arxiv.org/abs/2305.18290) | **DPO** (Rafailov) | 🟡 LOW | Training method |
| [2203.02155](https://arxiv.org/abs/2203.02155) | **InstructGPT** (Ouyang) | 🟡 LOW | Foundational RLHF |
| [2406.08464](https://arxiv.org/abs/2406.08464) | **Beyond SFT: RL with Minimal Labels** | 🟡 LOW | Training |
| [2502.06607](https://arxiv.org/abs/2502.06607) | **Generalized Correctness Models** | 🟡 LOW | Training |
| [2505.01854](https://arxiv.org/abs/2505.01854) | **EchoLeak: Zero-Click Injection** | 🟡 LOW | Security |

---

## NEW — High Priority from Discovery (2026-02-05)

Papers promoted from `toevaluate.md` after manual triage of 76 auto-discovered papers.

### Mechanistic/Theoretical Foundations

| arXiv ID | Title | Priority | Why Read |
|----------|-------|----------|----------|
| 2602.04288 | **Contextual Drag: How Errors in the Context Affect LLM Reasoning** | 🟠 HIGH | 10-20% drops from contextual drag across 11 models; "reasoning trajectories inherit error patterns" — supports pattern-matching thesis |
| 2602.01017 | **How Does Unfaithful Reasoning Emerge from Autoregressive Training?** | 🟠 HIGH | Controlled synthetic experiments. Faithful reasoning only when noise < threshold (simplicity bias). Transition from faithful → skip-step reasoning |
| 2602.04212 | **Language Models Struggle to Use Representations Learned In-Context** | 🟠 HIGH | LLMs encode novel semantics BUT can't deploy them. Even SOTA reasoning models "cannot reliably leverage novel patterns in-context" |
| 2602.02103 | **No Global Plan in Chain-of-Thought: Uncover the Latent Planning Horizon** | 🟠 HIGH | Tele-Lens probing: "LLMs exhibit myopic horizon, incremental transitions without global planning" — direct evidence against planning |
| 2602.01763 | **A Provable Expressiveness Hierarchy in Hybrid Linear-Full Attention** | 🟠 HIGH | First provable separation: (L+1) full attention sufficient for function composition, but L-1 full + 2^{3L²} linear CANNOT |
| 2602.02909 | **Reasoning about Reasoning: BAPO Bounds on CoT Token Complexity** | 🟠 HIGH | Proves Ω(n) reasoning tokens required for majority/matching/reachability. Frontier models fail below this — fundamental bottlenecks |

### Entropy/Dynamics Diagnostics

| arXiv ID | Title | Priority | Why Read |
|----------|-------|----------|----------|
| 2602.01288 | **EDIS: Diagnosing LLM Reasoning via Entropy Dynamics** | 🟠 HIGH | "Erroneous solutions exhibit unstable dynamics" = intrinsic properties of reasoning failure. Entropy as diagnostic |
| 2602.02863 | **"I May Not Have Articulated Myself Clearly": Dynamic Instability** | 🟠 HIGH | Instability predicts failure (above-chance AUC). Early instability = corrective, late = destructive. Training-free |
| 2602.02427 | **Embedding Perturbation Reflects Uncertainty in LLM Reasoning** | 🟡 MEDIUM | Incorrect steps = tokens sensitive to embedding perturbations. Perturbation outperforms probability/entropy for UQ |

### Causal/Planning Evidence

| arXiv ID | Title | Priority | Why Read |
|----------|-------|----------|----------|
| 2602.02983 | **Are LLMs Biased Like Humans? Causal Reasoning** | 🟠 HIGH | 20+ LLMs on 11 collider tasks. "Most LLMs exhibit rule-like reasoning strategies" — supports pattern-matching. Don't mirror human biases |
| 2601.21826 | **Mil-SCORE: Long-Context Geospatial Reasoning and Planning** | 🟡 MEDIUM | Expert-authored multi-hop planning. "Substantial headroom... struggle with scenario-level long-context planning" |

### Visual Reasoning

| arXiv ID | Title | Priority | Why Read |
|----------|-------|----------|----------|
| 2602.02465 | **MentisOculi: Limits of Reasoning with Mental Imagery** | 🟡 MEDIUM | Visual thoughts "do not yet benefit model reasoning." UMMs fail to leverage even ground-truth visualizations |

### POTENTIAL CHALLENGES — Steel-man the Opposition

| arXiv ID | Title | Priority | Why Read |
|----------|-------|----------|----------|
| 2602.04843 | **Fluid Representations in Reasoning Models** | 🔴 CRITICAL | Claims QwQ-32B "gradually improves internal representation during reasoning." Shows abstract encodings. **Could challenge pattern-matching thesis** — must evaluate critically |
| 2602.03837 | **Accelerating Scientific Research with Gemini** | 🟡 MEDIUM | Google claims Gemini contributed to "novel mathematical discovery." Case studies — check evidence quality |

---

## NEW — Mined from Analysis Files 70+ (2026-02-01)

### Critical Foundational Papers

| arXiv ID | Title | Priority | Why Read |
|----------|-------|----------|----------|
| 2201.11903 | **Chain-of-Thought Prompting Elicits Reasoning** (Wei et al.) | ✅ DONE | Analyzed as Paper 151. ORIGINAL CoT PAPER (NeurIPS 2022). |
| 2203.11171 | **Self-Consistency Improves Chain of Thought Reasoning** (Wang et al.) | ✅ DONE | Analyzed as Paper 155. +17.9% GSM8K via majority voting (ICLR 2023). |
| 2409.13373 | **LLMs Still Can't Plan; Can LRMs?** (Kambhampati et al.) | ✅ DONE | Analyzed as Paper 156. o1: 97.8% BW, 52.8% Mystery BW, 23.6% on 20+ steps. |

### High Priority — Theoretical Foundations

| arXiv ID | Title | Priority | Why Read |
|----------|-------|----------|----------|
| 2310.07923 | **The Expressive Power of Transformers with Chain of Thought** (Merrill & Sabharwal) | ✅ DONE | Analyzed as Paper 152. Proves CoT adds computational power — linear steps = regular languages. |
| 2305.14699 | **Can Transformers Learn to Solve Problems Recursively?** | ✅ DONE | Analyzed as Paper 158. Predicts 91% of failure cases by reconstructing "shortcut" algorithms. |
| 2108.12409 | **Train Short, Test Long: ALiBi** (Press et al.) | ✅ DONE | Analyzed as Paper 159. ICLR 2022. Linear biases enable length extrapolation — architectural approach. |
| 2206.10498 | **PlanBench** (Valmeekam et al.) | ✅ DONE | Analyzed as Paper 153. IPC-style benchmark, GPT-4 achieves ~12% on planning. |

### Medium Priority — Additional Foundations

| arXiv ID | Title | Priority | Why Read |
|----------|-------|----------|----------|
| 2205.11916 | **Large Language Models are Zero-Shot Reasoners** (Kojima et al.) | ✅ DONE | Analyzed as Paper 154. "Let's think step by step" (NeurIPS 2022). |
| 2405.00451 | **Monte Carlo Tree Search Boosts Reasoning via Iterative Preference Learning** | 🔵 MAYBE LATER | MCTS + DPO: +5.9% GSM8K, +5.8% MATH. AlphaZero-inspired iterative preference learning. |

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
| ~~2301.00234~~ | ~~**Transformers Learn 1-Nearest Neighbor** (Li et al.)~~ | ❌ REMOVED | Paper not found on arXiv — may be non-arXiv publication or wrong citation. |
| 2202.07206 | **Impact of Pretraining Term Frequencies on Few-Shot Reasoning** (Razeghi et al.) | ✅ DONE | Analyzed as Paper 147 |
| 2406.11050 | **A Peek into Token Bias: LLMs Are Not Yet Genuine Reasoners** (Jiang et al.) | ✅ DONE | Analyzed as Paper 157. EMNLP 2024. Statistical hypothesis testing for token bias — 6 hypotheses rejected. |
| ~~2206.07682~~ | ~~**Emergent Abilities Are Mirage** (Schaeffer et al.)~~ | ✅ DUPLICATE | Already analyzed as Paper 146 (correct ID: 2304.15004) |

### Length/OOD Generalization Theory

| arXiv ID | Title | Priority | Why Read |
|----------|-------|----------|----------|
| 2108.12409 | **Train Short, Test Long: ALiBi** (Press et al.) | 🟠 HIGH | Linear biases for length extrapolation. Architectural approach to OOD — shows what's needed to generalize. |
| 2111.00396 | **Efficiently Modeling Long Sequences with S4** (Gu et al.) | 🔵 MAYBE LATER | State space models for long sequences. Alternative architecture with different reasoning properties. |
| 2404.01445 | **Theory for Length Generalization in Learning to Reason** | 🟡 MEDIUM | Theoretical analysis of when/why length generalization fails. Already in corpus as Paper 66. |

### CoT Theoretical Foundations

| arXiv ID | Title | Priority | Why Read |
|----------|-------|----------|----------|
| 2310.07923 | **Expressive Power of Transformers with Chain of Thought** (Merrill & Sabharwal) | ✅ DONE | Analyzed as Paper 152 |
| 2205.11916 | **Zero-Shot CoT: Let's Think Step by Step** (Kojima et al.) | ✅ DONE | Analyzed as Paper 154 |
| 2301.00303 | **CoT Improves Sample Efficiency on Parity** (Kim & Suzuki) | 🔵 MAYBE LATER | Mechanistic analysis of WHY CoT helps. Relevant to Paper 137's findings. |

### Faithfulness/Unfaithfulness

| arXiv ID | Title | Priority | Why Read |
|----------|-------|----------|----------|
| 2305.04388 | **Language Models Don't Always Say What They Think** (Turpin et al.) | ✅ DONE | Analyzed as Paper 148 |
| 2302.00093 | **Large Language Models Can Be Easily Distracted by Irrelevant Context** (Shi et al.) | ✅ DONE | Analyzed as Paper 160. ICML 2023. GSM-IC benchmark. Precursor to GSM-Symbolic. |
| 2309.12288 | **The Reversal Curse: LLMs trained on "A is B" fail to learn "B is A"** (Berglund et al.) | ✅ DONE | Analyzed as Paper 149 |

### Relational Reasoning & World Models

| arXiv ID | Title | Priority | Why Read |
|----------|-------|----------|----------|
| 1906.03764 | **Differentiable Logic Machines** (Zimmer et al.) | 🔵 MAYBE LATER | arXiv 2019. Outperforms LLMs on logical reasoning. Neuro-symbolic architecture comparison. |
| 2305.15771 | **On the Planning Abilities of Large Language Models** (Valmeekam et al., NeurIPS Spotlight 2023) | ✅ DONE | Analyzed as Paper 150 |
| 2206.10498 | **PlanBench: Evaluating LLMs on Planning and Reasoning about Change** (Valmeekam et al., NeurIPS D&B 2023) | ✅ DONE | Analyzed as Paper 153 |

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
