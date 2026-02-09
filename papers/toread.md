# Papers to Read

Curated list of papers confirmed relevant to the thesis. Promoted from `toevaluate.md` after triage.

**Last updated**: 2026-02-09
**Total remaining**: 24 papers

---

## HIGH PRIORITY — Directly Supports Thesis

Papers that directly test the pattern-matching hypothesis or provide strong mechanistic evidence.

| arXiv ID | Title | Priority | Why Read |
|----------|-------|----------|----------|
| 2412.03782 | **ICLR: In-Context Learning of Representations** (Park et al., ICLR 2025) | 🔴 HIGH | Foundation for Paper 182 — shows LLMs encode but can't deploy representations |
| 2509.19284 | **Patterns over Principles: Fragility of Inductive Reasoning** (ACL 2025) | 🔴 HIGH | Title literally says "patterns over principles" |
| 2406.04692 | **Can LMs Perform Robust Reasoning in CoT with Noisy Rationales?** | 🔴 HIGH | CoT degrades with noisy context — models can't filter bad rationales |
| 2601.07226 | **Lost in the Noise: Reasoning Models Fail with Contextual Distractors** | 🔴 HIGH | Extends Paper 180 (Contextual Drag) findings |
| 2310.01382 | **Embers of Autoregression: How LLMs Are Shaped by Training** (McCoy) | 🔴 HIGH | Training distribution bounds capabilities |
| 2602.01763 | **Provable Expressiveness Hierarchy in Hybrid Linear-Full Attention** | 🔴 HIGH | First provable separation for function composition |
| 2602.02909 | **Reasoning about Reasoning: BAPO Bounds on CoT Token Complexity** | 🔴 HIGH | Proves Ω(n) reasoning tokens required — fundamental bottlenecks |
| 2602.01288 | **EDIS: Diagnosing LLM Reasoning via Entropy Dynamics** | 🔴 HIGH | Erroneous solutions exhibit unstable dynamics |
| 2602.02863 | **Dynamic Instability Predicts Failure** | 🔴 HIGH | Instability predicts failure with above-chance AUC |
| 2602.02983 | **Are LLMs Biased Like Humans? Causal Reasoning** | 🔴 HIGH | 20+ LLMs show "rule-like reasoning strategies" |

---

## MEDIUM PRIORITY — Mechanistic/Planning Evidence

| arXiv ID | Title | Priority | Why Read |
|----------|-------|----------|----------|
| 2310.08518 | **Language Models Don't Always Say What They Think** (Anthropic) | 🟠 MED | Faithfulness — Anthropic's internal analysis |
| 2405.00675 | **The Confidence Paradox** | 🟠 MED | Calibration failures |
| 2402.06702 | **Mind Your Tone (Politeness)** | 🟠 MED | Prompt sensitivity to social cues |
| 2503.19786 | **Knowing Before Saying: Representations Encode CoT Success** | 🟠 MED | Early encoding — but coarse, not precise planning |
| 2507.21513 | **Emergent Response Planning in LLMs** | 🟠 MED | Internal planning — challenged by myopic horizon |
| 2512.03771 | **How Far Can Transformers Reason? The Globality Barrier** | 🟠 MED | Theoretical limits on compositional reasoning |
| 2505.15392 | **Martingale Score: Bayesian Rationality in LLM Reasoning** | 🟠 MED | Belief persistence patterns |
| 2507.09075 | **Context-Parametric Inversion** | 🟠 MED | Instruction tuning doesn't improve context reliance |
| 2504.11373 | **Rethinking Mixture-of-Agents** | 🟠 MED | Challenges multi-agent improvement assumption |
| 2505.09388 | **Rethinking Thinking Tokens: LLMs as Improvement Operators** | 🟠 MED | Self-improvement assumption — challenged by contextual drag |
| 2602.02427 | **Embedding Perturbation Reflects Uncertainty** | 🟠 MED | Incorrect steps = tokens sensitive to perturbations |
| 2601.21826 | **Mil-SCORE: Long-Context Geospatial Reasoning** | 🟠 MED | Struggle with scenario-level long-context planning |
| 2602.02465 | **MentisOculi: Limits of Reasoning with Mental Imagery** | 🟠 MED | Visual thoughts don't benefit model reasoning |

---

## LOW PRIORITY — May Challenge Thesis (Steel-man)

| arXiv ID | Title | Priority | Why Read |
|----------|-------|----------|----------|
| 2602.03837 | **Accelerating Scientific Research with Gemini** | 🟡 LOW | Google claims "novel mathematical discovery" — check evidence |
| 2502.00674 | **Recursive Self-Aggregation Unlocks Deep Thinking** | 🟡 LOW | Self-improvement via aggregation — may challenge thesis |

---

## MAYBE LATER — Methods/Foundations

| arXiv ID | Title | Priority | Notes |
|----------|-------|----------|-------|
| 2305.18290 | **DPO** (Rafailov) | 🔵 LATER | Training method |
| 2203.02155 | **InstructGPT** (Ouyang) | 🔵 LATER | Foundational RLHF |
| 2406.08464 | **Beyond SFT: RL with Minimal Labels** | 🔵 LATER | Training |
| 2502.06607 | **Generalized Correctness Models** | 🔵 LATER | Training |
| 2505.01854 | **EchoLeak: Zero-Click Injection** | 🔵 LATER | Security |
| 2111.00396 | **S4: Efficiently Modeling Long Sequences** | 🔵 LATER | Alternative architecture |
| 2301.00303 | **CoT Improves Sample Efficiency on Parity** | 🔵 LATER | Mechanistic CoT analysis |
| 1906.03764 | **Differentiable Logic Machines** | 🔵 LATER | Neuro-symbolic comparison |
| 2405.00451 | **MCTS Boosts Reasoning via Iterative Preference Learning** | 🔵 LATER | AlphaZero-inspired |

---

## Summary by Priority

| Priority | Count | Description |
|----------|-------|-------------|
| 🔴 HIGH | 10 | Direct thesis evidence |
| 🟠 MEDIUM | 13 | Mechanistic/supporting |
| 🟡 LOW | 2 | Potential challenges |
| 🔵 LATER | 9 | Methods/foundations |
| **Total** | **34** | Papers remaining |

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
