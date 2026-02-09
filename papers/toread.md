# Papers to Read

Curated list of papers confirmed relevant to the thesis. Promoted from `toevaluate.md` after triage.

**Last updated**: 2026-02-09
**Total remaining**: 48 papers

---

## 🔴 HIGH PRIORITY — Counter-Evidence (Steel-Man the Opposition)

**Critical**: These papers argue LLMs DO reason. Must read to make the thesis defensible.

### Mechanistic Interpretability — Do Transformers Implement Algorithms?

| arXiv ID | Title | Why Read |
|----------|-------|----------|
| 2305.15054 | **Mechanistic Interpretation of Arithmetic Reasoning** | Shows specific circuits for arithmetic — potential counter-evidence |
| 2301.05217 | **Progress Measures for Grokking via Mechanistic Interpretability** | How grokking works mechanistically — algorithmic learning evidence |
| 2310.03714 | **Representation Engineering: Top-Down AI Transparency** | Control internal representations — implies structured knowledge |

### World Models — Do LLMs Build Internal State?

| arXiv ID | Title | Why Read |
|----------|-------|----------|
| 2310.02207 | **Language Models Represent Space and Time** | Linear probes find spatial/temporal structure — world model evidence |
| 2310.06824 | **The Geometry of Truth: Emergent Linear Structure** | Truth/false datasets show linear separability — latent knowledge |
| 2309.16609 | **Do LLMs Encode Space and Time Representations?** | Follow-up probing work |

### Search & Test-Time Compute — Does More Compute = Better Reasoning?

| arXiv ID | Title | Why Read |
|----------|-------|----------|
| 2305.10601 | **Tree of Thoughts: Deliberate Problem Solving** | Search over reasoning states improves accuracy |
| 2308.09687 | **Graph of Thoughts: Solving Elaborate Problems** | More sophisticated search structure |
| 2303.11366 | **Reflexion: Language Agents with Verbal Reinforcement** | Self-reflection improves performance |
| 2408.03314 | **Scaling LLM Test-Time Compute Optimally** | Inference compute > model parameters for some tasks |
| 2309.11495 | **Chain-of-Verification Reduces Hallucination** | Verification improves factuality |

### Emergence & Theory

| arXiv ID | Title | Why Read |
|----------|-------|----------|
| 2306.09308 | **A Theory of Emergent In-Context Learning** | Theoretical framework for emergence |
| 2602.03837 | **Accelerating Scientific Research with Gemini** | Google claims "novel mathematical discovery" |
| 2502.00674 | **Recursive Self-Aggregation Unlocks Deep Thinking** | Self-improvement via aggregation |

---

## 🔴 HIGH PRIORITY — Supports Thesis

Papers that directly test the pattern-matching hypothesis.

| arXiv ID | Title | Why Read |
|----------|-------|----------|
| 2412.03782 | **ICLR: In-Context Learning of Representations** (ICLR 2025) | Foundation for Paper 182 — LLMs encode but can't deploy |
| 2509.19284 | **Patterns over Principles: Fragility of Inductive Reasoning** (ACL 2025) | Title says "patterns over principles" |
| 2406.04692 | **Can LMs Perform Robust Reasoning with Noisy Rationales?** | CoT degrades with noisy context |
| 2601.07226 | **Lost in the Noise: Reasoning Models Fail with Distractors** | Extends Paper 180 findings |
| 2310.01382 | **Embers of Autoregression** (McCoy et al.) | Training distribution bounds capabilities |
| 2602.01763 | **Provable Expressiveness Hierarchy in Attention** | First provable separation |
| 2602.02909 | **BAPO Bounds on CoT Token Complexity** | Proves Ω(n) tokens required |
| 2602.01288 | **EDIS: Entropy Dynamics in LLM Reasoning** | Erroneous solutions = unstable dynamics |
| 2602.02863 | **Dynamic Instability Predicts Failure** | Instability predicts failure |
| 2602.02983 | **Are LLMs Biased Like Humans? Causal Reasoning** | "Rule-like reasoning strategies" |

---

## 🟠 MEDIUM PRIORITY — Mechanistic/Planning Evidence

| arXiv ID | Title | Why Read |
|----------|-------|----------|
| 2310.08518 | **Language Models Don't Always Say What They Think** (Anthropic) | Faithfulness analysis |
| 2405.00675 | **The Confidence Paradox** | Calibration failures |
| 2402.06702 | **Mind Your Tone (Politeness)** | Prompt sensitivity |
| 2503.19786 | **Knowing Before Saying** | Early encoding — coarse, not precise |
| 2507.21513 | **Emergent Response Planning in LLMs** | Internal planning |
| 2512.03771 | **How Far Can Transformers Reason? The Globality Barrier** | Theoretical limits |
| 2505.15392 | **Martingale Score: Bayesian Rationality** | Belief persistence |
| 2507.09075 | **Context-Parametric Inversion** | Instruction tuning limits |
| 2504.11373 | **Rethinking Mixture-of-Agents** | Multi-agent challenges |
| 2505.09388 | **Rethinking Thinking Tokens** | Self-improvement limits |
| 2602.02427 | **Embedding Perturbation Reflects Uncertainty** | Token sensitivity |
| 2601.21826 | **Mil-SCORE: Long-Context Geospatial Reasoning** | Long-context struggles |
| 2602.02465 | **MentisOculi: Limits of Mental Imagery** | Visual reasoning limits |

---

## 🟠 MEDIUM PRIORITY — Knowledge Editing (Counter-Evidence)

| arXiv ID | Title | Why Read |
|----------|-------|----------|
| 2310.02238 | **Comprehensive Study of Knowledge Editing for LLMs** | ROME, MEMIT survey — editable = structured? |
| 2305.14956 | **Editing Large Language Models** | Comprehensive editing survey |

---

## 🔵 MAYBE LATER — Methods/Foundations

| arXiv ID | Title | Notes |
|----------|-------|-------|
| 2305.18290 | **DPO** (Rafailov) | Training method |
| 2203.02155 | **InstructGPT** (Ouyang) | Foundational RLHF |
| 2406.08464 | **Beyond SFT: RL with Minimal Labels** | Training |
| 2502.06607 | **Generalized Correctness Models** | Training |
| 2505.01854 | **EchoLeak: Zero-Click Injection** | Security |
| 2111.00396 | **S4: Efficiently Modeling Long Sequences** | Alternative architecture |
| 2301.00303 | **CoT Improves Sample Efficiency on Parity** | Mechanistic CoT |
| 1906.03764 | **Differentiable Logic Machines** | Neuro-symbolic |
| 2405.00451 | **MCTS Boosts Reasoning** | AlphaZero-inspired |

---

## Summary by Priority

| Priority | Count | Description |
|----------|-------|-------------|
| 🔴 HIGH (Counter) | 14 | Steel-man the opposition |
| 🔴 HIGH (Supports) | 10 | Direct thesis evidence |
| 🟠 MEDIUM | 15 | Mechanistic/supporting |
| 🔵 LATER | 9 | Methods/foundations |
| **Total** | **48** | Papers remaining |

---

## Reading Protocol for Counter-Evidence

For each counter-evidence paper:
1. Read the FULL paper (not just abstract)
2. Ask: Does this ACTUALLY challenge the thesis, or can it be reconciled?
3. Distinguish: Mechanistic evidence vs behavioral evidence
4. Key question: Does this show reasoning or sophisticated pattern matching?

After reading, decide:
- **Challenges thesis** → Update synthesis with counter-evidence
- **Can be reconciled** → Note how thesis accommodates finding
- **Actually supports** → Add to supporting evidence

---

## Key Question

After reading counter-evidence, can we still conclude:

> "LLM reasoning is pattern matching from training distributions, not genuinely generative reasoning"

Or must we refine to:

> "LLMs implement local algorithms but lack a stable global reasoning controller"

---

## Skipped (Not Relevant)

- RAG/retrieval (unless testing reasoning)
- Domain-specific applications
- Image/audio/video generation
- Efficiency/quantization
- Tool-specific papers
- Safety/alignment (not reasoning)
- Surveys without new findings
- Training methods without reasoning insights
