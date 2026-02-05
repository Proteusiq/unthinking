# Papers to Evaluate

Raw auto-discovered papers awaiting triage. Review and promote relevant ones to `toread.md`.

**Last updated**: 2026-02-05
**Last triage**: 2026-02-05

---

## Triage Criteria

Promote to `toread.md` if paper:
- Directly tests reasoning claims with controlled experiments
- Provides new quantitative evidence (not just benchmarks)
- Challenges OR strongly supports the thesis with data
- High-impact venue or award-winning

Discard if paper:
- Tangentially related (mentions reasoning but doesn't test it)
- Overlaps significantly with already-analyzed papers
- Domain-specific application without generalizable insights
- No empirical evidence (opinion/position papers)
- Training/efficiency methods without reasoning analysis
- RAG/retrieval-focused without reasoning insights
- Multi-agent infrastructure without reasoning tests

---

## HIGH PRIORITY — Promote to toread.md

### [Contextual Drag: How Errors in the Context Affect LLM Reasoning](https://arxiv.org/abs/2602.04288v1)
- **arXiv**: 2602.04288v1
- **Published**: 2026-02-04
- **Stance**: SUPPORTS
- **Priority**: 9/10
- **Why promote**: **CRITICAL** — Tests self-improvement assumption directly. Shows 10-20% performance drops from contextual drag across 11 models on 8 tasks. Key finding: "subsequent reasoning trajectories inherit structurally similar error patterns" — supports pattern-matching thesis. Uses tree edit distance for structural analysis. Neither external feedback nor self-verification fixes it.

### [How Does Unfaithful Reasoning Emerge from Autoregressive Training? A Study of Synthetic Experiments](https://arxiv.org/abs/2602.01017v1)
- **arXiv**: 2602.01017v1
- **Published**: 2026-02-01
- **Stance**: SUPPORTS
- **Priority**: 9/10
- **Why promote**: **MECHANISTIC** — Controlled synthetic experiments on how unfaithfulness emerges. Key finding: models can learn faithful reasoning BUT only when training noise below critical threshold (simplicity bias). At higher noise: transition from faithful → unfaithful skip-step reasoning. Mechanistic analysis of implicit self-verification emergence.

### [Language Models Struggle to Use Representations Learned In-Context](https://arxiv.org/abs/2602.04212v1)
- **arXiv**: 2602.04212v1
- **Published**: 2026-02-04
- **Stance**: SUPPORTS
- **Priority**: 9/10
- **Why promote**: **FUNDAMENTAL** — Tests whether LLMs can deploy in-context learned representations. Key finding: LLMs encode novel semantics in latent representations BUT struggle to deploy them for next-token prediction. Even SOTA reasoning models "cannot reliably leverage novel patterns presented in-context." Direct evidence for pattern-matching vs reasoning distinction.

### [No Global Plan in Chain-of-Thought: Uncover the Latent Planning Horizon of LLMs](https://arxiv.org/abs/2602.02103v1)
- **arXiv**: 2602.02103v1
- **Published**: 2026-02-02
- **Stance**: SUPPORTS
- **Priority**: 9/10
- **Why promote**: **MECHANISTIC** — Probes latent planning via Tele-Lens method. Key finding: "LLMs exhibit a myopic horizon, primarily conducting incremental transitions without precise global planning." Direct evidence against deliberate planning hypothesis. Shows CoT bypass can be recognized automatically.

### [MentisOculi: Revealing the Limits of Reasoning with Mental Imagery](https://arxiv.org/abs/2602.02465v1)
- **arXiv**: 2602.02465v1
- **Published**: 2026-02-02
- **Stance**: SUPPORTS
- **Priority**: 8/10
- **Why promote**: Tests visual reasoning strategies. Key finding: visual thoughts "do not yet benefit model reasoning." UMMs suffer from "compounding generation errors and fail to leverage even ground-truth visualizations." Challenges the idea that multimodal reasoning helps.

### [A Provable Expressiveness Hierarchy in Hybrid Linear-Full Attention](https://arxiv.org/abs/2602.01763v1)
- **arXiv**: 2602.01763v1
- **Published**: 2026-02-02
- **Stance**: SUPPORTS
- **Priority**: 8/10
- **Why promote**: **THEORETICAL** — Proves expressiveness hierarchy for multi-step reasoning. Key result: (L+1)-layer full attention sufficient for sequential function composition, but hybrid with L-1 full + 2^{3L²} linear layers CANNOT solve it. First provable separation — architectural constraints on reasoning.

### [Are LLMs Biased Like Humans? Causal Reasoning as a Function of Prior Knowledge, Irrelevant Information, and Reasoning Budget](https://arxiv.org/abs/2602.02983v1)
- **arXiv**: 2602.02983v1
- **Published**: 2026-02-03
- **Stance**: SUPPORTS
- **Priority**: 8/10
- **Why promote**: Tests causal reasoning against human baseline on 11 collider tasks. 20+ LLMs benchmarked. Key finding: "most LLMs exhibit more rule-like reasoning strategies than humans" — supports pattern-matching. LLMs don't mirror human collider biases. CoT increases robustness. Good methodological rigor.

### [EDIS: Diagnosing LLM Reasoning via Entropy Dynamics](https://arxiv.org/abs/2602.01288v1)
- **arXiv**: 2602.01288v1
- **Published**: 2026-02-01
- **Stance**: SUPPORTS
- **Priority**: 8/10
- **Why promote**: **MECHANISTIC** — Shows entropy dynamics distinguish correct vs incorrect reasoning. Key finding: "erroneous solutions exhibit unstable dynamics, including burst spikes and peak-valley spikes" that persist across models/training stages = "intrinsic properties of reasoning failure." Entropy as diagnostic for reasoning reliability.

### [Reasoning about Reasoning: BAPO Bounds on Chain-of-Thought Token Complexity in LLMs](https://arxiv.org/abs/2602.02909v1)
- **arXiv**: 2602.02909v1
- **Published**: 2026-02-02
- **Stance**: SUPPORTS
- **Priority**: 8/10
- **Why promote**: **THEORETICAL** — Proves lower bounds on CoT tokens required. Key results: binary majority, triplet matching, graph reachability all require Ω(n) reasoning tokens. Experiments show frontier models fail when constrained below this. Identifies "fundamental bottlenecks in inference-time compute."

### ["I May Not Have Articulated Myself Clearly": Diagnosing Dynamic Instability in LLM Reasoning at Inference Time](https://arxiv.org/abs/2602.02863v1)
- **arXiv**: 2602.02863v1
- **Published**: 2026-02-02
- **Stance**: SUPPORTS
- **Priority**: 8/10
- **Why promote**: **MECHANISTIC** — Detects reasoning breakdown from log probabilities alone. Key finding: "instability strength predicts failure" with above-chance AUC. Critical insight: "early instability can reflect corrective stabilization, late instability is destructive" — recoverability depends on timing. Training-free diagnostic.

### [Embedding Perturbation may Better Reflect the Uncertainty in LLM Reasoning](https://arxiv.org/abs/2602.02427v1)
- **arXiv**: 2602.02427v1
- **Published**: 2026-02-02
- **Stance**: BALANCED
- **Priority**: 7/10
- **Why promote**: **MECHANISTIC** — Shows incorrect reasoning steps contain tokens highly sensitive to embedding perturbations. Perturbation-based metric outperforms token probability/entropy for uncertainty quantification. Enables identification of uncertain intermediate steps.

### [Mil-SCORE: Benchmarking Long-Context Geospatial Reasoning and Planning in Large Language Models](https://arxiv.org/abs/2601.21826v1)
- **arXiv**: 2601.21826v1
- **Published**: 2026-01-29
- **Stance**: BALANCED
- **Priority**: 7/10
- **Why promote**: Expert-authored multi-hop questions on complex planning. Tests spatial + tactical reasoning across heterogeneous sources. Key finding: "substantial headroom... current systems struggle with realistic, scenario-level long-context planning." Good for planning limitations evidence.

---

## MEDIUM PRIORITY — Review Later

### [Learning to Reason Faithfully through Step-Level Faithfulness Maximization](https://arxiv.org/abs/2602.03507v1)
- **arXiv**: 2602.03507v1
- **Published**: 2026-02-03
- **Stance**: SUPPORTS
- **Priority**: 6/10
- **Why medium**: FaithRL framework optimizes faithfulness directly. Reduces hallucination while maintaining accuracy. Theoretically shows optimizing faithfulness mitigates over-confidence. Training method but with faithfulness insights.

### [Auto-Comp: An Automated Pipeline for Scalable Compositional Probing of Contrastive Vision-Language Models](https://arxiv.org/abs/2602.02043v1)
- **arXiv**: 2602.02043v1
- **Published**: 2026-02-02
- **Stance**: SUPPORTS
- **Priority**: 6/10
- **Why medium**: Tests compositional reasoning in VLMs. Key finding: "universal compositional failures in both CLIP and SigLIP" — high susceptibility to low-entropy distractors. Trade-off: context aids spatial reasoning but hinders attribute binding.

### [SpatiaLab: Can Vision-Language Models Perform Spatial Reasoning in the Wild?](https://arxiv.org/abs/2602.03916v1)
- **arXiv**: 2602.03916v1
- **Published**: 2026-02-03
- **Stance**: SUPPORTS
- **Priority**: 6/10
- **Why medium**: Comprehensive spatial reasoning benchmark. InternVL3.5-72B: 54.93% vs humans 87.57%. Open-ended drops 10-25%. Good quantitative gap evidence but VLM-focused.

### [UEval: A Benchmark for Unified Multimodal Generation](https://arxiv.org/abs/2601.22155v1)
- **arXiv**: 2601.22155v1
- **Published**: 2026-01-29
- **Stance**: BALANCED
- **Priority**: 6/10
- **Why medium**: Expert-curated multimodal benchmark. GPT-5-Thinking: 66.4/100, best open-source: 49.1. Key finding: "reasoning models often outperform non-reasoning ones" — may challenge thesis. Needs investigation.

### [CoT is Not the Chain of Truth: An Empirical Internal Analysis of Reasoning LLMs for Fake News Generation](https://arxiv.org/abs/2602.04856v1)
- **arXiv**: 2602.04856v1
- **Published**: 2026-02-04
- **Stance**: BALANCED
- **Priority**: 6/10
- **Why medium**: Shows CoT can internally contain unsafe narratives even when refusing. Challenges "refusal implies safety" assumption. Identifies critical attention heads in mid-depth layers. Safety-focused but has mechanistic insights.

### [On the Limits of Layer Pruning for Generative Reasoning in LLMs](https://arxiv.org/abs/2602.01997v1)
- **arXiv**: 2602.01997v1
- **Published**: 2026-02-02
- **Stance**: BALANCED
- **Priority**: 5/10
- **Why medium**: Shows multi-step reasoning particularly sensitive to depth reduction. Observes degradation of arithmetic computation and balanced parenthesis generation. Architecture → reasoning connection.

### [Training LLMs for Divide-and-Conquer Reasoning Elevates Test-Time Scalability](https://arxiv.org/abs/2602.02477v1)
- **arXiv**: 2602.02477v1
- **Published**: 2026-02-02
- **Stance**: BALANCED
- **Priority**: 5/10
- **Why medium**: DAC vs CoT comparison. +8.6% Pass@1 advantage. Shows "fundamental misalignment between general-purpose post-training and DAC-style inference." Interesting if provides analysis of WHY.

### [Self-Verification Dilemma: Experience-Driven Suppression of Overused Checking in LLM Reasoning](https://arxiv.org/abs/2602.03485v1)
- **arXiv**: 2602.03485v1
- **Published**: 2026-02-03
- **Stance**: BALANCED
- **Priority**: 5/10
- **Why medium**: Large-scale empirical analysis of self-verification. "Vast majority of rechecks are confirmatory rather than corrective." Mismatch between verification activation and usefulness. Supports pattern-based verification.

---

## POTENTIAL CHALLENGES TO THESIS — Need Investigation

Papers that might provide evidence AGAINST the pattern-matching thesis. Critical to review for steel-manning.

### [Fluid Representations in Reasoning Models](https://arxiv.org/abs/2602.04843v1)
- **arXiv**: 2602.04843v1
- **Published**: 2026-02-04
- **Stance**: CHALLENGES (potentially)
- **Priority**: 8/10
- **Why investigate**: **MECHANISTIC** — Claims QwQ-32B "gradually improves its internal representation of actions and concepts during reasoning." Shows "abstract encodings that focus on structure rather than specific action names." Steering experiments show "injecting refined representations from successful traces boosts accuracy." Could suggest genuine in-context learning/reasoning. **MUST READ** to evaluate claims critically.

### [Accelerating Scientific Research with Gemini: Case Studies](https://arxiv.org/abs/2602.03837v1)
- **arXiv**: 2602.03837v1
- **Published**: 2026-02-03
- **Stance**: CHALLENGES (potentially)
- **Priority**: 6/10
- **Why investigate**: Google claims Gemini Deep Think contributed to "novel, expert-level mathematical discovery." Case studies of researcher-AI collaboration. Could be cherry-picked but worth checking what evidence is presented.

### [The Illusion of the Illusion of Thinking](https://arxiv.org/abs/2506.09250)
- **arXiv**: 2506.09250
- **Published**: 2025-06
- **Stance**: CHALLENGES
- **Priority**: 9/10
- **Why investigate**: **DIRECT REBUTTAL** — Already analyzed as Paper 124. Claims original "Illusion of Thinking" paper methodology was flawed. Important counter-evidence to track.

---

## Summary Statistics

- **Total relevant papers**: 20
- **HIGH PRIORITY**: 12 papers (promoted to toread.md)
- **MEDIUM PRIORITY**: 8 papers (review later)
- **Discarded**: 56 papers (training methods, efficiency, RAG, domain-specific)

### Key Themes

1. **Error Propagation** — Contextual Drag shows errors inherit patterns
2. **Myopic Horizon** — No global planning, incremental transitions only  
3. **In-Context ≠ Deployment** — Encode but can't use novel representations
4. **Theoretical Bounds** — BAPO proves Ω(n) tokens needed; expressiveness hierarchy
5. **Instability Diagnostics** — Entropy dynamics predict reasoning failures
