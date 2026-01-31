# Papers to Evaluate

Raw auto-discovered papers awaiting triage. Review and promote relevant ones to `toread.md`.

**Last updated**: 2026-01-31
**Last triage**: 2026-01-31 — Triaged 3 new papers (1 promoted, 2 removed)

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

## Awaiting Triage

*Empty — all papers triaged on 2026-01-31*

---

## Triage Log

| Date | Paper | arXiv | Decision | Reason |
|------|-------|-------|----------|--------|
| 2026-01-31 | Semantic Content Determines Algorithmic Performance (WhatCounts) | 2601.21618 | KEEP | 40% accuracy variation on counting based on SEMANTIC CONTENT — directly supports pattern matching thesis |
| 2026-01-31 | Evaluating ChatGPT on Medical IE | 2601.21767 | REMOVE | Medical domain-specific, IE tasks not reasoning |
| 2026-01-31 | Can David Beat Goliath (DAVID-GRPO) | 2601.21699 | REMOVE | RL training method, not testing reasoning limits |
| 2026-01-30 | Scaling Reasoning Hop | 2601.21214 | KEEP | ep heads suppress correct trajectories — mechanistic |
| 2026-01-30 | Thinking Out of Order | 2601.22035 | KEEP | 67% AR drop on answer-before-reasoning |
| 2026-01-30 | Chain Of Thought Compression | 2601.21576 | KEEP | First theory: learning signal decays exponentially |
| 2026-01-30 | Teaching Models to Teach Themselves (SOAR) | 2601.18778 | KEEP | Tests self-curriculum for unsolvable problems |
| 2026-01-30 | From Chains to DAGs | 2601.17593 | KEEP | Probes DAG structure in hidden states |
| 2026-01-30 | HalluGuard | 2601.18753 | KEEP | Decomposes hallucinations: data vs reasoning |
| 2026-01-30 | Code over Words | 2601.18352 | KEEP | INVERSE SCALING when reasoning contradicts priors |
| 2026-01-30 | Oops, Wait | 2601.17421 | KEEP | "wait" tokens signal correctness, exploited partially |
| 2026-01-30 | Strong Reasoning Isn't Enough | 2601.19773 | SKIP | Already in toread.md |
| 2026-01-30 | Reasoning-Critical Neurons | 2601.19847 | SKIP | Already analyzed as Paper 100 |
| 2026-01-30 | Mil-SCORE | 2601.21826 | REMOVE | Military domain-specific benchmark |
| 2026-01-30 | UEval | 2601.22155 | REMOVE | Multimodal generation benchmark |
| 2026-01-30 | Exploring Reasoning Reward Model | 2601.22154 | REMOVE | RL training method, not testing reasoning |
| 2026-01-30 | Token-Guard | 2601.21969 | REMOVE | Hallucination mitigation method |
| 2026-01-30 | ProRAG | 2601.21912 | REMOVE | RAG-focused process reward |
| 2026-01-30 | From Meta-Thought to Execution | 2601.21909 | REMOVE | Training framework |
| 2026-01-30 | Embodied Task Planning | 2601.21841 | REMOVE | Embodied planning, domain-specific |
| 2026-01-30 | Bridging the Arithmetic Gap | 2601.21157 | REMOVE | Financial domain-specific |
| 2026-01-30 | Adaptive Confidence Gating | 2601.21469 | REMOVE | Code generation multi-agent |
| 2026-01-30 | Bayesian-LoRA | 2601.21003 | REMOVE | Calibration method |
| 2026-01-30 | Optimizing Agentic Workflows | 2601.22037 | REMOVE | Efficiency optimization |
| 2026-01-30 | Thinking Broad, Acting Fast | 2601.21611 | REMOVE | E-commerce distillation |
| 2026-01-30 | Latent Chain-of-Thought as Planning | 2601.21358 | REMOVE | Latent reasoning efficiency |
| 2026-01-30 | Less Noise, More Voice | 2601.21244 | REMOVE | RL training technique |
| 2026-01-30 | UrduBench | 2601.21000 | REMOVE | Language-specific benchmark |
| 2026-01-30 | FRISM | 2601.21187 | REMOVE | VLM model merging |
| 2026-01-30 | Distribution-Aware Reward | 2601.21804 | REMOVE | TTRL training method |
| 2026-01-30 | TACLer | 2601.21711 | REMOVE | Curriculum learning efficiency |
| 2026-01-30 | Breaking the Overscaling Curse | 2601.21619 | REMOVE | Parallelism efficiency |
| 2026-01-30 | ASTRA | 2601.21558 | REMOVE | Agentic training framework |
| 2026-01-30 | System 1&2 Synergy | 2601.21414 | REMOVE | Model interpolation |
| 2026-01-30 | Do Reasoning Models Enhance Embedding | 2601.21192 | REMOVE | Embedding models |
| 2026-01-30 | AgenticSimLaw | 2601.21936 | REMOVE | Legal domain multi-agent |
| 2026-01-30 | Test-Time Compute Games | 2601.21839 | REMOVE | Economics/pricing |
| 2026-01-30 | Beyond Imitation (ATP-Latent) | 2601.21598 | REMOVE | Latent planning method |
| 2026-01-30 | ARGORA | 2601.21533 | REMOVE | Multi-agent argumentation |
| 2026-01-30 | Concise Geometric Description | 2601.21164 | REMOVE | Geometry method |
| 2026-01-30 | Not All Code Is Equal | 2601.21894 | REMOVE | Code complexity for training |
| 2026-01-30 | HE-SNR | 2601.20255 | REMOVE | Training metric |
| 2026-01-30 | Explicit Multi-head Attention | 2601.19611 | REMOVE | Architecture improvement |
| 2026-01-30 | SoftHateBench | 2601.20256 | REMOVE | Hate speech moderation |
| 2026-01-30 | Evolutionary Strategies | 2601.20861 | REMOVE | ES vs GRPO forgetting |
| 2026-01-30 | Training on Saturated Problems | 2601.20829 | REMOVE | Training method |
| 2026-01-30 | AgentLongBench | 2601.20730 | REMOVE | Agent benchmark |
| 2026-01-30 | ShieldedCode | 2601.20679 | REMOVE | Code protection |
| 2026-01-30 | P2S | 2601.20649 | REMOVE | Process supervision method |
| 2026-01-30 | PathWise | 2601.20539 | REMOVE | Heuristic design |
| 2026-01-30 | CtrlCoT | 2601.20467 | REMOVE | CoT compression method |
| 2026-01-30 | Scaling Medical Reasoning | 2601.20221 | REMOVE | Medical domain |
| 2026-01-30 | VERGE | 2601.20055 | REMOVE | Formal verification |
| 2026-01-30 | Group DRO-Driven RL | 2601.19280 | REMOVE | RL optimization |
| 2026-01-30 | A Dialectic Pipeline | 2601.20659 | REMOVE | Self-dialogue method |
| 2026-01-30 | MetaGen | 2601.19290 | REMOVE | Multi-agent topology |
| 2026-01-30 | Policy of Thoughts | 2601.20379 | REMOVE | Test-time policy evolution |
| 2026-01-30 | LTS-VoiceAgent | 2601.19952 | REMOVE | Voice agent |
| 2026-01-30 | When Iterative RAG Beats | 2601.19827 | REMOVE | RAG-focused |
| 2026-01-30 | RPO-RAG | 2601.19225 | REMOVE | RAG method |
| 2026-01-30 | Decompose-and-Formalise | 2601.19605 | REMOVE | Verification method |
| 2026-01-30 | Formula-One Prompting | 2601.19302 | REMOVE | Prompting technique |
| 2026-01-30 | Riddle Quest | 2601.19273 | REMOVE | Riddle benchmark |
| 2026-01-30 | Save the Good Prefix (VPPO) | 2601.18984 | REMOVE | RL training method |
| 2026-01-30 | Reuse your FLOPs (PrefixRL) | 2601.18795 | REMOVE | RL training method |
| 2026-01-30 | Dep-Search | 2601.18771 | REMOVE | Search framework |
| 2026-01-30 | Do not be greedy (ThinkTwice) | 2601.18395 | REMOVE | DocIE sampling |
| 2026-01-30 | Think-Augmented Function Calling | 2601.18282 | REMOVE | Function calling |
| 2026-01-30 | MATA | 2601.19204 | REMOVE | Multi-agent visual |
| 2026-01-30 | FROST | 2601.19001 | REMOVE | Efficiency method |
| 2026-01-30 | Self-Distilled Reasoner | 2601.18734 | REMOVE | Distillation method |
| 2026-01-30 | Dynamic Thinking-Token Selection | 2601.18383 | REMOVE | KV cache efficiency |
| 2026-01-30 | α³-SecBench | 2601.18754 | REMOVE | UAV security benchmark |
| 2026-01-30 | TSRBench | 2601.18744 | REMOVE | Time series benchmark |
| 2026-01-30 | Balanced Neuro-Symbolic | 2601.18595 | REMOVE | Neuro-symbolic method |
| 2026-01-30 | TriPlay-RL | 2601.18292 | REMOVE | Safety alignment |
| 2026-01-30 | Thought-Transfer Attack | 2601.19061 | REMOVE | Security attack |
| 2026-01-30 | Unknown Unknowns | 2601.18552 | REMOVE | Hidden intentions detection |
| 2026-01-30 | POPE | 2601.18779 | REMOVE | RL method (oracle guidance) |
| 2026-01-30 | UniCog | 2601.17897 | REMOVE | Latent analysis framework |
| 2026-01-30 | A Syllogistic Probe | 2601.17426 | REMOVE | Syllogistic scaling |
| 2026-01-30 | On the Emergence (structural info) | 2601.17869 | REMOVE | Compositional generation |
| 2026-01-30 | Sparks of Cooperative Reasoning | 2601.18077 | REMOVE | Hanabi game benchmark |
| 2026-01-30 | From LLMs to LRMs (pruning) | 2601.18091 | REMOVE | Pruning study |
| 2026-01-30 | Comprehensive Evaluation | 2601.13243 | REMOVE | Evaluation framework |
| 2026-01-30 | InT: Self-Proposed Interventions | 2601.14209 | REMOVE | Credit assignment method |
| 2026-01-30 | Failure Modes in Multi-Hop QA | 2601.12499 | REMOVE | Overlaps with analyzed papers |
| 2026-01-30 | Tracking Knowledge Propagation | 2601.15495 | REMOVE | Overlaps with analyzed papers |
| 2026-01-30 | Confidence over Time | 2601.13387 | REMOVE | Confidence calibration |
| 2026-01-30 | Automated Benchmark (Bloom's) | 2601.20253 | REMOVE | Benchmark generation |
