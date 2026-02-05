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

## LOW PRIORITY — Skip or Deprioritize

### Training/RL Method Papers (No Reasoning Insights)
These papers improve benchmark performance but don't analyze reasoning mechanisms:

- **CPMobius** (2602.02979v1) — Coach-Player RL paradigm. +4.9 accuracy. Training method only.
- **Likelihood-Based Reward Designs** (2602.03979v1) — Reward engineering for RL. Training method.
- **Beyond Rejection Sampling: Trajectory Fusion** (2602.04391v1) — Training strategy. No reasoning analysis.
- **TrajFusion** (2602.04391v1) — Same as above, duplicate.
- **Prompt Augmentation Scales up GRPO** (2602.03190v1) — Training trick for entropy collapse. No reasoning analysis.
- **Learning While Staying Curious** (2602.02244v1) — Entropy-preserving SFT. Training method.
- **Restoring Exploration: Latent Exploration Decoding** (2602.01698v1) — Decoding strategy. No reasoning analysis.
- **Beyond Mode Elicitation: Latent Diffusion Reasoner** (2602.01705v2) — Exploration in latent space. Training method.
- **CoBA-RL** (2602.03048v2) — Budget allocation for RL. Training method.
- **RAPO** (2602.04224v1) — Safety alignment. Not about reasoning.
- **Mitigating Safety Tax via DGR** (2602.02136v1) — Safety alignment. Not about reasoning.
- **CurioSFT** (2602.02244v1) — Entropy-preserving training. Duplicate concept.
- **Thickening-to-Thinning** (2602.04265v1) — Reward shaping. Training method.
- **CRAFT** (2602.01348v1) — GRPO framework for RAG. Training method.
- **Discovering Process-Outcome Credit** (2602.01034v1) — Step-wise credit. Training method.
- **Continuous-Utility DPO** (2602.00931v1) — Preference optimization. Training method.
- **Beyond KL Divergence: Bregman Divergences** (2602.04380v1) — Policy optimization. Training method.
- **EGSPO** (2602.03309v1) — Token-level gradient modulation. Training method.
- **Not All Negative Samples Are Equal** (2602.03516v2) — Negative sample quality for RL. Training method.
- **Learning Generative Selection for Best-of-N** (2602.02143v1) — RL for selection. Training method.
- **Small Generalizable Prompt Predictive Models** (2602.01970v1) — Prompt selection. Training method.

### Efficiency/Inference Optimization Papers
- **Beyond Tokens: Semantic-Aware Speculative Decoding** (2602.03708v2) — Speedup method.
- **ForesightKV** (2602.03203v1) — KV cache eviction. Efficiency.
- **NEAT: Neuron-Based Early Exit** (2602.02010v1) — Early exit for LRMs. Efficiency.
- **S3-CoT** (2602.01982v1) — Efficient CoT via self-sampling. Efficiency.
- **ConPress** (2602.01472v1) — Multi-question compression. Efficiency.
- **CoSMo: Short Chains, Deep Thoughts** (2602.03141v1) — Reasoning efficiency. Efficiency.
- **Accordion-Thinking** (2602.03249v1) — Dynamic summarization. Efficiency.
- **TraceNAS** (2602.02891v1) — Pruning method. Efficiency.
- **Prism: Test-Time Scaling for dLLMs** (2602.01842v1) — Efficiency for diffusion LLMs.
- **Adaptive Test-Time Compute Allocation** (2602.03975v1) — Compute allocation. Efficiency.
- **A Single Revision Step** (2602.02828v1) — Token-efficient revision. Efficiency.

### RAG/Retrieval Papers
- **ROG: Retrieval-Augmented LLM Reasoning** (2602.02382v1) — RAG for KG. Retrieval-focused.
- **A-RAG: Scaling Agentic RAG** (2602.03442v1) — RAG framework. Retrieval-focused.
- **Scaling Search-Augmented LLM Reasoning** (2602.01672v1) — Search augmentation. Retrieval.
- **ProRAG** (2601.21912v1) — Process-supervised RAG. Retrieval-focused.

### Multi-Agent/Agentic Papers (No Reasoning Tests)
- **From Assumptions to Actions: Embodied Agents** (2602.04326v1) — Embodied planning. Agentic.
- **MAS-ProVe: Multi-Agent Process Verification** (2602.03053v1) — Multi-agent infrastructure.
- **Empirical-MCTS** (2602.04248v1) — MCTS framework. Agentic infrastructure.
- **MAGIC: Attacker-Defender Game** (2602.01539v1) — Safety adversarial game. Agentic.
- **Exploring Reasoning Reward Model for Agents** (2601.22154v1) — Agent reward model. Agentic.
- **Adaptive Confidence Gating** (2601.21469v1) — Multi-agent for code gen. Agentic.
- **Optimizing Agentic Workflows** (2601.22037v1) — Meta-tools for agents. Agentic.
- **Embodied Task Planning via GiG** (2601.21841v1) — Embodied agents. Agentic.

### Domain-Specific Applications
- **RE-MCDF: Clinical Diagnosis** (2602.01297v1) — Medical domain.
- **LEC-KG: SDGs Knowledge Graph** (2602.02090v1) — Domain-specific KG.
- **LinGO: Uncivil Discourse** (2602.04693v1) — Social media analysis.
- **OpInf-LLM: PDE Solving** (2602.01493v1) — Scientific computing.
- **Scaling-Aware Adapter: Biomolecular Structures** (2602.02780v1) — Biochemistry.
- **Understanding QA generation: Bangla** (2602.01451v1) — Low-resource NLP.
- **When Silence Is Golden: Temporal QA** (2602.04755v1) — Temporal reasoning. Could be relevant but niche.
- **Micro Domain-Adaptive Pre-Training** (2602.04466v1) — Enterprise domain. Application.

### Tool/Code/Task-Specific Papers
- **ReasonCACHE** (2602.02366v1) — KV cache for ICL. Method paper.
- **CoLT: Chain of Latent Tool Calls** (2602.04246v1) — Latent tool calls. Method.
- **D-CORE: Task Decomposition for Tool Use** (2602.02160v1) — Tool use training.
- **AICD Bench: AI-Generated Code Detection** (2602.02079v1) — Code detection benchmark.
- **Enhancing Math via Execution-Driven Reasoning** (2602.03950v1) — Math method. Application.
- **Distilling LLM Reasoning into Graph of Concept** (2602.03006v1) — Distillation method.
- **EvalQReason: Step-Level Reasoning Evaluation** (2602.02295v1) — Evaluation framework.
- **Towards Long-Horizon Interpretability** (2602.01914v1) — Attribution method.

### Interpretability/Control Without Reasoning Insights
- **Interpreting and Controlling via Integrated Policy Gradient** (2602.02313v2) — Interpretability method.
- **Advancing General-Purpose Reasoning via Gradient Surgery** (2602.02301v1) — Multi-task RL.
- **Chain of Simulation** (2602.02842v1) — Routing framework. Method.
- **Knowledge Model Prompting (TMK)** (2602.03900v1) — Prompting technique.

### Miscellaneous/Tangential
- **On the Credibility of Evaluating LLMs using Survey Questions** (2602.04033v1) — Survey methodology critique.
- **Token-Guard: Hallucination Control** (2601.21969v1) — Hallucination mitigation method.
- **TACLer: Curriculum Reinforcement Learning** (2601.21711v1) — Training method.
- **Thinking Broad, Acting Fast: Latent Reasoning Distillation** (2601.21611v1) — Distillation for e-commerce.
- **From Meta-Thought to Execution** (2601.21909v1) — Cognitively-aligned training. Check toread.md — may already be done.

---

## Summary Statistics

- **Total papers in batch**: 76
- **HIGH PRIORITY (Promote)**: 12 papers
- **MEDIUM PRIORITY (Review later)**: 8 papers  
- **LOW PRIORITY (Skip)**: 56 papers

### Key Themes in HIGH PRIORITY Papers

1. **Contextual/Error Propagation** — Contextual Drag, Dynamic Instability
2. **Mechanistic Analysis** — Unfaithful Reasoning Emergence, No Global Plan, Entropy Dynamics
3. **Fundamental Limitations** — In-Context Representation Use, BAPO Bounds, Expressiveness Hierarchy
4. **Causal/Planning** — Causal Reasoning Bias, Mil-SCORE Planning

### Notable Gaps Filled
- More evidence for "myopic horizon" / lack of global planning
- Theoretical bounds on CoT token requirements
- Mechanistic analysis of how unfaithfulness emerges from training
- Evidence that in-context learning ≠ deploying learned representations

