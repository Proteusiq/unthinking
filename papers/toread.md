# Papers to Read

Curated list of papers confirmed relevant to the thesis. **219 papers remaining.**

Source tracking: issues [#40](https://github.com/Proteusiq/unthinking/issues/40)–[#45](https://github.com/Proteusiq/unthinking/issues/45), [#47](https://github.com/Proteusiq/unthinking/issues/47) (closed), [#71](https://github.com/Proteusiq/unthinking/issues/71), [#72](https://github.com/Proteusiq/unthinking/issues/72).

## Selection Rules

- **NO single-author papers** - Prefer papers with multiple authors for broader peer validation
- Prefer papers from established research groups or institutions
- Prefer papers with reproducible experiments and open code/data

---

## High Priority - Model Distillation Cluster (arXiv Search 2026-06-26)

Student models echoing teacher distributions: distillation as statistical mimicry, not knowledge transfer. The student learns to replicate the teacher's output distribution - pure math, no understanding. Directly relevant to the predictive-not-reasoning thesis.

### Tier 1: Foundational / Directly Thesis-Relevant

| arXiv ID | Title | Year | Expected Stance | Why |
|----------|-------|------|-----------------|-----|
| ~~[2504.01738](https://arxiv.org/abs/2504.01738)~~ | ~~Style over Substance: Distilled Language Models Reason Via Stylistic Replication~~ | ~~Apr 2025~~ | ~~supports~~ | DONE #384 |
| ~~[2503.03730](https://arxiv.org/abs/2503.03730)~~ | ~~Towards Understanding Distilled Reasoning Models: A Representational Approach~~ | ~~Mar 2025~~ | ~~balanced~~ | DONE #385 |
| ~~[2511.05184](https://arxiv.org/abs/2511.05184)~~ | ~~Effectiveness of Chain-of-Thought in Distilling Reasoning Capability from LLMs~~ | ~~Nov 2025~~ | ~~supports~~ | DONE #386 |
| ~~[2306.08543](https://arxiv.org/abs/2306.08543)~~ | ~~MiniLLM: On-Policy Distillation of Large Language Models~~ | ~~Jun 2023~~ | ~~balanced~~ | DONE #387 |
| [2603.14458](https://arxiv.org/abs/2603.14458) | Distilling Reasoning Without Knowledge: A Framework for Reliable LLMs | Mar 2026 | supports | Title says it all - can you distill "reasoning" while explicitly excluding knowledge? Tests the separation |

### Tier 2: On-Policy Distillation Mechanics (Distribution Matching Focus)

| arXiv ID | Title | Year | Expected Stance | Why |
|----------|-------|------|-----------------|-----|
| [2606.22793](https://arxiv.org/abs/2606.22793) | A Formula-Driven Survey and Research Agenda for On-Policy Distillation | Jun 2026 | balanced | Comprehensive survey unifying OPD variants under a single formula - distribution matching as the core mechanism |
| [2606.26091](https://arxiv.org/abs/2606.26091) | On-Policy Self-Distillation with Sampled Demonstrations Reduces Output Diversity | Jun 2026 | supports | Self-distillation collapses output diversity while boosting pass@1 - distribution narrowing, not capability gain |
| [2606.09471](https://arxiv.org/abs/2606.09471) | Escaping the KL Agreement Trap in On-Policy Distillation | Jun 2026 | balanced | When student already matches teacher distribution, learning stalls. The "agreement trap" = distribution convergence without capability |
| [2606.07082](https://arxiv.org/abs/2606.07082) | On the Geometry of On-Policy Distillation | Jun 2026 | balanced | Analyzes training dynamics geometrically - what happens in weight space during distribution matching? |
| [2601.18734](https://arxiv.org/abs/2601.18734) | Self-Distilled Reasoner: On-Policy Self-Distillation for Large Language Models | Jan 2026 | balanced | Model as both teacher and student - circular distribution matching. What does the student actually learn? |

### Tier 3: Capacity & Limits of Distribution Transfer

| arXiv ID | Title | Year | Expected Stance | Why |
|----------|-------|------|-----------------|-----|
| [2311.07052](https://arxiv.org/abs/2311.07052) | Towards the Law of Capacity Gap in Distilling Language Models | Nov 2023 | supports | When student is too small to hold teacher's distribution, what breaks first? Capacity limits of mimicry |
| [2305.12129](https://arxiv.org/abs/2305.12129) | Lifting the Curse of Capacity Gap in Distilling Language Models | May 2023 | balanced | Companion to above - techniques to bridge the gap. But does bridging = understanding or better approximation? |
| [2606.24747](https://arxiv.org/abs/2606.24747) | Scaling Laws for Task-Specific LLM Distillation | Jun 2026 | balanced | Scaling laws for distillation - predictable relationships between teacher/student size and output quality |
| [2511.01354](https://arxiv.org/abs/2511.01354) | Thinking with DistilQwen: A Tale of Four Distilled Reasoning and Reward Model Series | Nov 2025 | balanced | Large-scale distillation of Qwen reasoning models - do distilled variants maintain reasoning or just output patterns? |
| [2502.20339](https://arxiv.org/abs/2502.20339) | Thinking Slow, Fast: Scaling Inference Compute with Distilled Reasoners | Feb 2025 | balanced | Can distilled models trade compute for reasoning? Tests whether the "reasoning" transfers or just the distribution |

---

## High Priority - LLM Reasoning Failures Survey Updates (GitHub 2026-06-13)

New papers added to Awesome-LLM-Reasoning-Failures repo since our last sync.

| arXiv ID | Title | Category | Stance |
|----------|-------|----------|--------|
| [2310.08661](https://arxiv.org/abs/2310.08661) | Counting and algorithmic generalization with transformers | Cognitive/Counting | supports |
| [2507.15877](https://arxiv.org/abs/2507.15877) | Out-of-Distribution Generalization in ARC-AGI: Execution-Guided Neural Program Synthesis | Abstract Reasoning | supports |
| [2508.05405](https://arxiv.org/abs/2508.05405) | DeepPHY: Benchmarking Agentic VLMs on Physical Reasoning | Embodied Reasoning | supports |

---

## Medium-High Priority - Self-Distillation Cluster (Issue #85)

Three papers from ETH Zürich + MIT (Hübotter, Shenfeld, Krause group) using self-distillation as an alternative to RL/SFT. Project page: [self-distillation.github.io](https://self-distillation.github.io/).

Mechanism: model conditioned on extra context (feedback / demonstration / user follow-up) acts as its own teacher; the hindsight token distribution is distilled back into the policy.

Critical reading: hindsight conditioning works because the model already had the pattern - it just needed the right context to surface it. This is direct mechanistic evidence for the predictive-not-reasoning thesis (the model doesn't "learn to reason"; better priors unlock better completions). Methods papers, but the underlying premise is thesis-relevant.

| arXiv ID | Title | Stance |
|----------|-------|--------|
| ~~[2601.19897](https://arxiv.org/abs/2601.19897)~~ | ~~Self-Distillation Enables Continual Learning (SDFT)~~ | ~~supports~~ | DONE #342 |
| ~~[2601.20802](https://arxiv.org/abs/2601.20802)~~ | ~~Reinforcement Learning via Self-Distillation (SDPO)~~ | ~~supports~~ | DONE #343 |
| ~~[2603.12273](https://arxiv.org/abs/2603.12273)~~ | ~~Aligning Language Models from User Interactions (SDPO@User)~~ | ~~supports~~ | DONE #344 |

---

## High Priority - Abliteration & Steering Theory (arXiv Search 2026-04-12)

Papers examining linear/affine representation of alignment, steering vectors, and mechanistic interpretability of refusal. Critical for the thesis: if alignment is a single direction, it's mascara.

| arXiv ID | Title | Stance |
|----------|-------|--------|
| ~~[2603.27412](https://arxiv.org/abs/2603.27412)~~ | ~~The Geometry of Harmful Intent~~ | ~~supports~~ | SKIP: single-author |
| ~~[2603.09313](https://arxiv.org/abs/2603.09313)~~ | ~~Curveball Steering: The Right Direction To Steer Isn't Always Linear~~ | ~~balanced~~ | DONE #321 |
| ~~[2602.11246](https://arxiv.org/abs/2602.11246)~~ | ~~How Many Features Can a Language Model Store Under the Linear Representation Hypothesis?~~ | ~~balanced~~ | DONE #322 |
| ~~[2602.05539](https://arxiv.org/abs/2602.05539)~~ | ~~Steering Large Reasoning Models towards Concise Reasoning via Flow Matching~~ | ~~supports~~ | DONE #323 |
| ~~[2601.21702](https://arxiv.org/abs/2601.21702)~~ | ~~Beyond Forgetting: Machine Unlearning Elicits Controllable Side Behaviors~~ | ~~supports~~ | DONE #324 |

---

## High Priority - LLM-as-Judge & Evaluation Circularity (Issues #71, #72)

Papers examining whether LLMs can reliably evaluate themselves or other LLMs. Critical for the thesis: if LLMs don't reason, using them to judge "reasoning" is circular.

### From Issues

| arXiv ID | Title | Stance |
|----------|-------|--------|
| ~~[2411.15594](https://arxiv.org/abs/2411.15594)~~ | ~~A Survey on LLM as a Judge~~ | ~~supports~~ | DONE #267 |
| ~~[2412.12509](https://arxiv.org/abs/2412.12509)~~ | ~~Can You Trust LLM Judgement~~ | ~~supports~~ | DONE #268 |
| ~~[2509.04013](https://arxiv.org/abs/2509.04013)~~ | ~~On Robustness and Reliability of Benchmark-Based Evaluation of LLMs~~ | ~~supports~~ | DONE #269 |
| ~~[2502.03461](https://arxiv.org/abs/2502.03461)~~ | ~~Do Large Language Model Benchmarks Test Reliability?~~ | ~~supports~~ | DONE #270 |

### LLM Judge Reliability (arXiv Search 2024-2026)

| arXiv ID | Title | Stance |
|----------|-------|--------|
| ~~[2603.08412](https://arxiv.org/abs/2603.08412)~~ | ~~Aligning to Illusions: Choice Blindness in Human and AI Feedback~~ | ~~supports~~ | DONE #271 |
| ~~[2603.05485](https://arxiv.org/abs/2603.05485)~~ | ~~Towards Provably Unbiased LLM Judges via Bias-Bounded Evaluation~~ | ~~supports~~ | DONE #272 |
| ~~[2603.05399](https://arxiv.org/abs/2603.05399)~~ | ~~Judge Reliability Harness: Stress Testing the Reliability of LLM Judges~~ | ~~supports~~ | DONE #273 |
| ~~[2603.05167](https://arxiv.org/abs/2603.05167)~~ | ~~C2-Faith: Benchmarking LLM Judges for Causal and Coverage Faithfulness in CoT Reasoning~~ | ~~supports~~ | DONE #274 |
| ~~[2602.16610](https://arxiv.org/abs/2602.16610)~~ | ~~Who Can We Trust? LLM-as-a-Jury for Comparative Assessment~~ | ~~supports~~ | DONE #275 |
| ~~[2602.13576](https://arxiv.org/abs/2602.13576)~~ | ~~Rubrics as an Attack Surface: Stealthy Preference Drift in LLM Judges~~ | ~~supports~~ | DONE #276 |
| ~~[2602.13110](https://arxiv.org/abs/2602.13110)~~ | ~~SCOPE: Selective Conformal Optimized Pairwise LLM Judging~~ | ~~balanced~~ | DONE #287 |
| ~~[2602.02219](https://arxiv.org/abs/2602.02219)~~ | ~~Am I More Pointwise or Pairwise? Revealing Position Bias in Rubric-Based LLM-as-a-Judge~~ | ~~supports~~ | DONE #288 |
| ~~[2602.02287](https://arxiv.org/abs/2602.02287)~~ | ~~Cross-Lingual Stability of LLM Judges Under Controlled Generation~~ | ~~supports~~ | DONE #289 |
| ~~[2507.17788](https://arxiv.org/abs/2507.17788)~~ | ~~Adaptive Repetition for Mitigating Position Bias in LLM-Based Ranking~~ | ~~supports~~ | DONE #290 |
| ~~[2512.16272](https://arxiv.org/abs/2512.16272)~~ | ~~Beyond Blind Spots: Analytic Hints for Mitigating LLM-Based Evaluation Pitfalls~~ | ~~supports~~ | DONE #291 |
| ~~[2512.06710](https://arxiv.org/abs/2512.06710)~~ | ~~Stochasticity in Agentic Evaluations: Quantifying Inconsistency with ICC~~ | ~~supports~~ | DONE #292 |

### Benchmark Contamination & Gaming

| arXiv ID | Title | Stance |
|----------|-------|--------|
| ~~[2602.13626](https://arxiv.org/abs/2602.13626)~~ | ~~Benchmark Leakage Trap: Can We Trust LLM-based Recommendation?~~ | ~~supports~~ | DONE #293 |
| ~~[2602.11792](https://arxiv.org/abs/2602.11792)~~ | ~~Detecting RLVR Training Data via Structural Convergence of Reasoning~~ | ~~supports~~ | DONE #296 |
| [2601.20858](https://arxiv.org/abs/2601.20858) | When Flores Bloomz Wrong: Cross-Direction Contamination in MT Evaluation | supports |
| [2511.17602](https://arxiv.org/abs/2511.17602) | Beyond Surface-Level Similarity: Hierarchical Contamination Detection | supports |
| [2510.02386](https://arxiv.org/abs/2510.02386) | On The Fragility of Benchmark Contamination Detection in Reasoning Models | supports |
| [2509.00072](https://arxiv.org/abs/2509.00072) | Beyond Memorization: Reasoning-Driven Synthesis as Contamination Mitigation | balanced |
| ~~[2507.19219](https://arxiv.org/abs/2507.19219)~~ | ~~How Much Do LLMs Cheat on Evaluation? Benchmarking Overestimation~~ | ~~supports~~ | DONE #278 |
| [2504.08300](https://arxiv.org/abs/2504.08300) | Large Language Models Could Be Rote Learners | supports |
| [2502.17259](https://arxiv.org/abs/2502.17259) | Detecting Benchmark Contamination Through Watermarking | supports |
| [2502.06655](https://arxiv.org/abs/2502.06655) | Unbiased Evaluation of LLMs from a Causal Perspective | balanced |
| [2412.15194](https://arxiv.org/abs/2412.15194) | MMLU-CF: A Contamination-free Multi-task Language Understanding Benchmark | balanced |
| [2603.09678](https://arxiv.org/abs/2603.09678) | EsoLang-Bench: Evaluating Genuine Reasoning via Esoteric Programming Languages | supports |

### Self-Evaluation Limitations

| arXiv ID | Title | Stance |
|----------|-------|--------|
| [2603.03824](https://arxiv.org/abs/2603.03824) | In-Context Environments Induce Evaluation-Awareness in Language Models | supports |
| [2602.21054](https://arxiv.org/abs/2602.21054) | VAUQ: Vision-Aware Uncertainty Quantification for LVLM Self-Evaluation | balanced |
| [2602.05110](https://arxiv.org/abs/2602.05110) | Understanding LLM Evaluator Behavior: A Structured Multi-Evaluator Framework | supports |
| [2601.14479](https://arxiv.org/abs/2601.14479) | Can LLM Reasoning Be Trusted? A Comparative Study Using Human Benchmarking | supports |
| [2601.03511](https://arxiv.org/abs/2601.03511) | IntroLM: Introspective Language Models via Prefilling-Time Self-Evaluation | balanced |

---

## High Priority - Diffusion LLMs & Sequential Generation

Papers on diffusion language models that reveal sequential "reasoning" is post-hoc rationalization.

| arXiv ID | Title | Stance |
|----------|-------|--------|
| ~~[2603.01190](https://arxiv.org/abs/2603.01190)~~ | ~~Reasoning or Rationalization? The Role of Justifications in Masked Diffusion Models for Fact Verification~~ | ~~DONE~~ |
| ~~[2602.23225](https://arxiv.org/abs/2602.23225)~~ | ~~Why Diffusion Language Models Struggle with Truly Parallel (Non-Autoregressive) Decoding?~~ | ~~DONE~~ |
| ~~[2602.22871](https://arxiv.org/abs/2602.22871)~~ | ~~Test-Time Scaling with Diffusion Language Models via Reward-Guided Stitching~~ | ~~DONE~~ |
| [2603.01331](https://arxiv.org/abs/2603.01331) | MetaState: Persistent Working Memory for Discrete Diffusion Language Models | balanced |
| [2602.15014](https://arxiv.org/abs/2602.15014) | Scaling Beyond Masked Diffusion Language Models | balanced |
| ~~[2602.12586](https://arxiv.org/abs/2602.12586)~~ | ~~Can I Have Your Order? MCTS for Slot Filling Ordering in Diffusion LMs~~ | ~~DONE~~ |
| [2508.13070](https://arxiv.org/abs/2508.13070) | Reinforced Context Order Recovery for Adaptive Reasoning and Planning | balanced |

**Key findings:**
- **2603.01190**: Verdict resolves in first few diffusion steps; forcing deliberation *hurts* accuracy (86.2% → 71.9%); model rationalizes wrong answers 56% of time
- **2602.23225**: DLMs converge to left-to-right despite parallel architecture; AR-ness learned from sequential training data, not inherent to reasoning

---

## High Priority - Next Wave: Inference / Multi-Token Prediction

Papers on multi-token prediction (MTP) and speculative decoding. **Thesis relevance**: if next-N tokens can be recovered from an NTP-pretrained model's hidden state with lightweight finetuning, the future is already encoded - extending the surfacing/elicitation framework (s1, SDPO@User) from "reasoning" to "next-N-token continuation." Lossless ~2–5× speedups with no quality loss suggest autoregressive sequentiality is a sampling convention, not a computational necessity.

Critical reading: these are systems/methods papers, but their *empirical premise* - that future tokens are latent in the current hidden state - is mechanistically informative for the predictive-not-reasoning thesis. Papers #1 and #5 most directly relevant.

| arXiv ID | Title | Stance |
|----------|-------|--------|
| [2502.09419](https://arxiv.org/abs/2502.09419) | On multi-token prediction for efficient LLM inference (Mehra et al., Sony, 3 authors) | supports |
| [2507.11851](https://arxiv.org/abs/2507.11851) | Your LLM Knows the Future: Uncovering Its Multi-Token Prediction Potential (Samragh et al., Apple, 7 authors) | supports |
| [2509.18362](https://arxiv.org/abs/2509.18362) | FastMTP: Accelerating LLM Inference with Enhanced Multi-Token Prediction (Cai et al., Tencent, 10 authors) | balanced |
| [2511.11346](https://arxiv.org/abs/2511.11346) | Fast and Expressive Multi-Token Prediction with Probabilistic Circuits (Grivas et al., Edinburgh + April, 9 authors) | balanced |
| [2505.24544](https://arxiv.org/abs/2505.24544) | Cross-Attention Speculative Decoding / Beagle (Zhong et al., LG AI Research, 5 authors) | balanced |

**Expected key evidence (from abstracts):**
- **2502.09419**: NTP-pretrained LLMs *inherently possess* MTP capability via numerical marginalization over intermediate token probabilities; performance scales with model size; hidden layers strongly specialized for NTP → adaptation non-trivial
- **2507.11851**: Lightweight finetuning + gated LoRA + masked-input → ~5× speedup on code/math, ~2.5× on chat, **no quality loss**; "leverages the inherent knowledge of vanilla autoregressive language models about future tokens"
- **2509.18362**: Single MTP head with position-shared weights on self-distilled data → 2.03× speedup vs NTP, 82% improvement over vanilla MTP
- **2511.11346**: Probabilistic circuits relax future-token independence assumption; rigorous expressiveness-vs-latency trade-off study on byte-level LLMs (EvaByte)
- **2505.24544**: Cross-attention SD on par with EAGLE-v2 without pooling/auxiliary layers; Two-Stage Block-Attention Training

**Thesis hook**: The framing "Your LLM Knows the Future" is the surfacing hypothesis applied to next-N-token prediction. If a frozen base model already contains the information needed to predict N tokens ahead - and a small adapter can extract it lossless - then autoregressive token-by-token generation is an interface choice, not evidence of step-by-step computation. This parallels the s1 finding (1k samples sufficient) and CoT-without-prompting (Wang & Zhou): the capability pre-exists; the recipe surfaces it.

**Open questions for analysis:**
1. Does MTP work uniformly across tasks, or does it fail where reasoning is most needed? (If MTP succeeds on reasoning tasks at 5×, sequential CoT is even less necessary than thought.)
2. Paper #1's finding that "hidden layers are strongly specialized for NTP" - does this complicate the surfacing claim, or refine it (capability exists but is bottlenecked)?
3. Connection to Paper #293 (Chandra et al.) and the broader argument that LLM outputs are pattern-completions of conditional context, not assertions of internally-held beliefs.

---

## High Priority - CoT Faithfulness (Issue #67)

Papers on whether Chain-of-Thought reasoning is faithful to internal model computation.

| arXiv ID | Title | Stance |
|----------|-------|--------|
| ~~[2602.11201](https://arxiv.org/abs/2602.11201)~~ | ~~Mechanistic Evidence for Faithfulness Decay in CoT Reasoning~~ | ~~DONE~~ |
| ~~[2510.13272](https://arxiv.org/abs/2510.13272)~~ | ~~Beyond Correctness: Rewarding Faithful Reasoning in RAG (Info-Think)~~ | ~~DONE~~ |
| ~~[2602.07833](https://arxiv.org/abs/2602.07833)~~ | ~~SPD-Faith Bench: Diagnosing Faithfulness in Multimodal CoT~~ | ~~DONE~~ |
| ~~[2602.14444](https://arxiv.org/abs/2602.14444)~~ | ~~Broken Chains: The Cost of Incomplete Reasoning in LLMs~~ | ~~DONE~~ |
| ~~[2602.17544](https://arxiv.org/abs/2602.17544)~~ | ~~Evaluating CoT through Reusability and Verifiability~~ | ~~DONE~~ |
| ~~[2602.18297](https://arxiv.org/abs/2602.18297)~~ | ~~Analyzing CoT Monitorability Through Information Theory~~ | ~~DONE~~ |
| ~~[2602.20710](https://arxiv.org/abs/2602.20710)~~ | ~~Counterfactual Simulation Training for CoT Faithfulness~~ | ~~DONE~~ |

---

## High Priority - Parameter Efficiency & RL Dynamics (Related to #221)

Papers exploring why RL is more parameter-efficient than SFT, and what this reveals about reasoning.

### Mechanistic Explanations

| arXiv ID | Title | Stance |
|----------|-------|--------|
| ~~[2511.08567](https://arxiv.org/abs/2511.08567)~~ | ~~The Path Not Taken: RLVR Provably Learns Off the Principals~~ | ~~DONE~~ |
| ~~[2602.07729](https://arxiv.org/abs/2602.07729)~~ | ~~Do We Need Adam? SGD in RLVR (updates <0.02% params)~~ | ~~DONE~~ |
| ~~[2507.10616](https://arxiv.org/abs/2507.10616)~~ | ~~Scalpel vs. Hammer: GRPO Amplifies, SFT Replaces~~ | ~~DONE~~ |

### Parameter-Efficient Methods for Reasoning

| arXiv ID | Title | Stance |
|----------|-------|--------|
| [2601.06677](https://arxiv.org/abs/2601.06677) | Plasticity vs. Rigidity: LoRA on Micro-Budget Reasoning | balanced |
| [2602.16839](https://arxiv.org/abs/2602.16839) | Progressive Thought Encoding (+19.3% over LoRA) | balanced |
| [2602.20727](https://arxiv.org/abs/2602.20727) | ID-LoRA: Matrix Interpolative Decomposition (46% fewer params) | balanced |
| [2506.20629](https://arxiv.org/abs/2506.20629) | PLoP: Precise LoRA Placement | balanced |
| [2505.17697](https://arxiv.org/abs/2505.17697) | Activation Control for Long CoT (training-free) | supports |

### RL vs SFT Comparisons

| arXiv ID | Title | Stance |
|----------|-------|--------|
| [2510.01857](https://arxiv.org/abs/2510.01857) | Learning Reasoning Reward Models via Inverse RL | supports |

---

## High Priority - Superficial Alignment Debate

Papers directly addressing whether alignment is superficial.

| arXiv ID | Title | Stance |
|----------|-------|--------|
| [2406.05946](https://arxiv.org/abs/2406.05946) | Safety Alignment Should Be Made More Than Just a Few Tokens Deep | supports |
| ~~[2506.07452](https://arxiv.org/abs/2506.07452)~~ | ~~When Style Breaks Safety~~ | ~~DONE~~ |

### Papers Citing "Revisiting SAH" (2410.03717)

| arXiv ID | Title | Stance |
|----------|-------|--------|
| ~~[2506.06998](https://arxiv.org/abs/2506.06998)~~ | ~~What Makes Reasoning Models Different? Follow the Reasoning Leader~~ | ~~DONE~~ |
| [2601.21571](https://arxiv.org/abs/2601.21571) | Shaping Capabilities with Token-Level Data Filtering | balanced |
| [2602.07340](https://arxiv.org/abs/2602.07340) | Revisiting Robustness for LLM Safety Alignment via Selective Geometry Control | supports |

---

## High Priority - Counter-Evidence (Steel-Man)

Papers that may challenge the thesis. Must read to make thesis defensible.

### Mechanistic Interpretability (#40)

| arXiv ID | Title |
|----------|-------|
| ~~[2301.05217](https://arxiv.org/abs/2301.05217)~~ | ~~Progress Measures for Grokking~~ | DONE #220 |
| [2310.03714](https://arxiv.org/abs/2310.03714) | Representation Engineering |

### World Models (#41)

| arXiv ID | Title |
|----------|-------|
| [2309.16609](https://arxiv.org/abs/2309.16609) | Do LLMs Encode Space and Time? |

### Search & Test-Time Compute (#42)

| arXiv ID | Title |
|----------|-------|
| ~~[2303.11366](https://arxiv.org/abs/2303.11366)~~ | ~~Reflexion~~ | DONE #301 |
| ~~[2408.03314](https://arxiv.org/abs/2408.03314)~~ | ~~Scaling Test-Time Compute Optimally~~ | DONE #302 |
| ~~[2309.11495](https://arxiv.org/abs/2309.11495)~~ | ~~Chain-of-Verification~~ | DONE #303 |

### Emergence & Theory (#43)

| arXiv ID | Title |
|----------|-------|
| [2306.09308](https://arxiv.org/abs/2306.09308) | Theory of Emergent In-Context Learning |
| ~~[2602.03837](https://arxiv.org/abs/2602.03837)~~ | ~~Accelerating Research with Gemini~~ | DONE #297 |
| ~~[2502.00674](https://arxiv.org/abs/2502.00674)~~ | ~~Recursive Self-Aggregation~~ | DONE #298 |
| ~~[2602.04843](https://arxiv.org/abs/2602.04843)~~ | ~~Fluid Representations in Reasoning Models (potential challenge)~~ | DONE #170 |

---

## High Priority - Supports Thesis (#44)

| arXiv ID | Title |
|----------|-------|
| ~~[2412.03782](https://arxiv.org/abs/2412.03782)~~ | ~~ICLR: In-Context Learning of Representations~~ | DONE #304 |
| ~~[2509.19284](https://arxiv.org/abs/2509.19284)~~ | ~~Patterns over Principles~~ | DONE #305 |
| [2406.04692](https://arxiv.org/abs/2406.04692) | Robust Reasoning with Noisy Rationales |
| ~~[2601.07226](https://arxiv.org/abs/2601.07226)~~ | ~~Lost in the Noise~~ | DONE #306 |
| ~~[2602.01763](https://arxiv.org/abs/2602.01763)~~ | ~~Provable Expressiveness Hierarchy~~ | DONE #307 |
| ~~[2602.02909](https://arxiv.org/abs/2602.02909)~~ | ~~BAPO Bounds on CoT Complexity~~ | DONE #308 |
| ~~[2602.01288](https://arxiv.org/abs/2602.01288)~~ | ~~EDIS: Entropy Dynamics~~ | DONE #309 |
| ~~[2602.02863](https://arxiv.org/abs/2602.02863)~~ | ~~Dynamic Instability Predicts Failure~~ | DONE #310 |
| ~~[2602.02983](https://arxiv.org/abs/2602.02983)~~ | ~~Are LLMs Biased Like Humans?~~ | DONE #311 |
| ~~[2602.04288](https://arxiv.org/abs/2602.04288)~~ | ~~Contextual Drag: How Errors Affect LLM Reasoning (10-20% drops)~~ | DONE #180 |
| ~~[2602.01017](https://arxiv.org/abs/2602.01017)~~ | ~~How Unfaithful Reasoning Emerges (simplicity bias threshold)~~ | ~~DONE (#172)~~ |
| ~~[2602.04212](https://arxiv.org/abs/2602.04212)~~ | ~~LLMs Struggle to Use Representations Learned In-Context~~ | DONE #182 |
| ~~[2602.02103](https://arxiv.org/abs/2602.02103)~~ | ~~No Global Plan in CoT: Myopic Horizon (Tele-Lens)~~ | DONE #181 |

### Papers Citing Embers of Autoregression (2309.13638)

**Supports thesis:**

| arXiv ID | Title | Citations |
|----------|-------|-----------|
| [2403.06963](https://arxiv.org/abs/2403.06963) | The Pitfalls of Next-Token Prediction | 146 |
| [2402.08939](https://arxiv.org/abs/2402.08939) | Premise Order Matters in Reasoning | 116 |
| [2310.20707](https://arxiv.org/abs/2310.20707) | What's In My Big Data? | 177 |
| [2303.13988](https://arxiv.org/abs/2303.13988) | Machine Psychology | 232 |
| [2404.09932](https://arxiv.org/abs/2404.09932) | Foundational Challenges in Assuring LLM Safety | 309 |
| [2404.01869](https://arxiv.org/abs/2404.01869) | Beyond Accuracy: Evaluating Reasoning Behavior - Survey | 120 |
| [2402.08115](https://arxiv.org/abs/2402.08115) | Self-Verification Limitations (Kambhampati) | 114 |
| [2311.09247](https://arxiv.org/abs/2311.09247) | Comparing Humans, GPT-4 on Abstraction (Mitchell) | 106 |
| [2310.18362](https://arxiv.org/abs/2310.18362) | SoK: Memorization in LLMs | 86 |

**Potentially challenges thesis:**

| arXiv ID | Title | Citations |
|----------|-------|-----------|
| [2501.17047](https://arxiv.org/abs/2501.17047) | How Linguistics Learned to Love LLMs | 43 |
| [2406.19384](https://arxiv.org/abs/2406.19384) | The Remarkable Robustness of LLMs | 65 |
| [2402.18225](https://arxiv.org/abs/2402.18225) | CogBench: LLM Walks into Psychology Lab | 66 |

---

## Medium Priority (#45)

| arXiv ID | Title |
|----------|-------|
| [2310.08518](https://arxiv.org/abs/2310.08518) | Don't Always Say What They Think (Anthropic) |
| [2503.19786](https://arxiv.org/abs/2503.19786) | Knowing Before Saying |
| [2507.21513](https://arxiv.org/abs/2507.21513) | Emergent Response Planning |
| [2512.03771](https://arxiv.org/abs/2512.03771) | The Globality Barrier |
| [2505.15392](https://arxiv.org/abs/2505.15392) | Martingale Score |
| [2507.09075](https://arxiv.org/abs/2507.09075) | Context-Parametric Inversion |
| [2504.11373](https://arxiv.org/abs/2504.11373) | Rethinking Mixture-of-Agents |
| [2505.09388](https://arxiv.org/abs/2505.09388) | Rethinking Thinking Tokens |
| [2602.02427](https://arxiv.org/abs/2602.02427) | Embedding Perturbation |
| [2601.21826](https://arxiv.org/abs/2601.21826) | Mil-SCORE |
| [2602.02465](https://arxiv.org/abs/2602.02465) | MentisOculi |
| [2310.02238](https://arxiv.org/abs/2310.02238) | Knowledge Editing Survey |
| [2305.14956](https://arxiv.org/abs/2305.14956) | Editing LLMs |

---

## From Survey: LLM Reasoning Failures (#47, closed)

Papers from Song et al. survey ([2602.06176](https://arxiv.org/abs/2602.06176)) not yet in corpus.
Source: [Awesome-LLM-Reasoning-Failures](https://github.com/Peiyang-Song/Awesome-LLM-Reasoning-Failures)

### Cognitive Skills & Biases

| arXiv ID | Title |
|----------|-------|
| ~~[2305.03731](https://arxiv.org/abs/2305.03731)~~ | ~~Working Memory Capacity of ChatGPT~~ | DONE #376 |
| ~~[2505.10571](https://arxiv.org/abs/2505.10571)~~ | ~~LLMs Do Not Have Human-Like Working Memory~~ | DONE #379 |
| ~~[2305.19555](https://arxiv.org/abs/2305.19555)~~ | ~~Large Language Models Are Not Strong Abstract Reasoners~~ | DONE #378 |
| [2410.11756](https://arxiv.org/abs/2410.11756) | Evidence of Cognitive Deficits: Clock Drawing Test |
| [2502.05092](https://arxiv.org/abs/2502.05092) | Lost in Time: Clock and Calendar Understanding Challenges |
| [2412.04629](https://arxiv.org/abs/2412.04629) | Argumentative Experience: Reducing Confirmation Bias |
| ~~[2410.15413](https://arxiv.org/abs/2410.15413)~~ | ~~A Comprehensive Evaluation of Cognitive Biases in LLMs~~ | DONE #377 |
| [2403.00811](https://arxiv.org/abs/2403.00811) | Cognitive Bias in High-Stakes Decision-Making with LLMs |
| [2202.12299](https://arxiv.org/abs/2202.12299) | Capturing Failures of LLMs via Human Cognitive Biases |
| ~~[2305.04400](https://arxiv.org/abs/2305.04400)~~ | ~~Do LLMs Show Decision Heuristics Similar to Humans?~~ | DONE #381 |
| [2504.09946](https://arxiv.org/abs/2504.09946) | Assessing Judging Bias in Large Reasoning Models |
| [2502.17091](https://arxiv.org/abs/2502.17091) | WildFrame: Comparing Framing in Humans and LLMs |
| [2503.04840](https://arxiv.org/abs/2503.04840) | Framing the Game: How Context Shapes LLM Decision-Making |
| ~~[2506.03923](https://arxiv.org/abs/2506.03923)~~ | ~~More or Less Wrong: Directional Bias in LLM Comparative Reasoning~~ | DONE #372 |
| [2310.10076](https://arxiv.org/abs/2310.10076) | Verbosity Bias in Preference Labeling by LLMs |
| ~~[2505.22910](https://arxiv.org/abs/2505.22910)~~ | ~~Talent or Luck? Evaluating Attribution Bias in LLMs~~ | DONE #373 |
| [2406.01285](https://arxiv.org/abs/2406.01285) | LLMs as Recommender Systems: A Study of Popularity Bias |
| ~~[2507.22887](https://arxiv.org/abs/2507.22887)~~ | ~~Where to Show Demos in Your Prompt: Positional Bias~~ | DONE #374 |
| [2308.11483](https://arxiv.org/abs/2308.11483) | LLMs Sensitivity to Order of Options in Multiple-Choice Questions |
| [2502.04134](https://arxiv.org/abs/2502.04134) | The Order Effect: Prompt Sensitivity to Input Order |
| [2412.06593](https://arxiv.org/abs/2412.06593) | Anchoring Bias in LLMs: An Experimental Study |
| [2309.17012](https://arxiv.org/abs/2309.17012) | Benchmarking Cognitive Biases in LLMs as Evaluators |
| [2308.00225](https://arxiv.org/abs/2308.00225) | Instructed to Bias: Emergent Cognitive Bias in Instruction-Tuned LMs |

### Theory of Mind & Social Reasoning

| arXiv ID | Title |
|----------|-------|
| [2406.14737](https://arxiv.org/abs/2406.14737) | Dissecting the Ullman Variations with a SCALPEL |
| [2302.08399](https://arxiv.org/abs/2302.08399) | LLMs Fail on Trivial Alterations to Theory-of-Mind Tasks |
| [2410.13648](https://arxiv.org/abs/2410.13648) | SimpleToM: Exposing the Gap between Explicit ToM Inference |
| [2310.03051](https://arxiv.org/abs/2310.03051) | How FaR Are LLMs From Agents with Theory-of-Mind? |
| [2502.04424](https://arxiv.org/abs/2502.04424) | EmoBench-M: Benchmarking Emotional Intelligence for MLLMs |
| [2406.04428](https://arxiv.org/abs/2406.04428) | MoralBench: Moral Evaluation of LLMs |
| [2402.01719](https://arxiv.org/abs/2402.01719) | Measuring Moral Inconsistencies in LLMs |
| [2309.13356](https://arxiv.org/abs/2309.13356) | Probing the Moral Development of LLMs through Defining Issues Test |
| [2404.02934](https://arxiv.org/abs/2404.02934) | GreedLlama: Financial Value-Aligned LLMs in Moral Reasoning |
| [2502.20490](https://arxiv.org/abs/2502.20490) | EgoNormia: Benchmarking Physical Social Norm Understanding |
| [2410.07304](https://arxiv.org/abs/2410.07304) | The Moral Turing Test |
| [2402.03578](https://arxiv.org/abs/2402.03578) | LLM Multi-Agent Systems: Challenges and Open Problems |
| [2404.16698](https://arxiv.org/abs/2404.16698) | Cooperate or Collapse: Sustainable Cooperation in LLM Agents |
| [2310.03903](https://arxiv.org/abs/2310.03903) | LLM-Coordination: Multi-Agent Coordination Abilities |
| [2503.11926](https://arxiv.org/abs/2503.11926) | Monitoring Reasoning Models for Misbehavior |
| [2311.08562](https://arxiv.org/abs/2311.08562) | Magic: LLM Multi-Agent Cognition, Adaptability, Rationality |

### Logic & Compositional Reasoning

| arXiv ID | Title |
|----------|-------|
| [2312.03633](https://arxiv.org/abs/2312.03633) | Exploring the Reversal Curse in BERT and GPT |
| [2403.13799](https://arxiv.org/abs/2403.13799) | Reverse Training to Nurse the Reversal Curse |
| [2402.01453](https://arxiv.org/abs/2402.01453) | The Queen of England Is Not England's Queen |
| [2403.00758](https://arxiv.org/abs/2403.00758) | Mitigating Reversal Curse via Semantic-Aware Permutation Training |
| [2311.07468](https://arxiv.org/abs/2311.07468) | An Analysis and Mitigation of the Reversal Curse |
| [2310.10322](https://arxiv.org/abs/2310.10322) | Untying the Reversal Curse via Bidirectional LM Editing |
| [2410.18808](https://arxiv.org/abs/2410.18808) | Delving into the Reversal Curse: How Far Can LLMs Generalize? |
| ~~[2411.16353](https://arxiv.org/abs/2411.16353)~~ | ~~The Two-Hop Curse: A->B, B->C Fail to Learn A->C~~ | DONE #380 |
| ~~[2502.13913](https://arxiv.org/abs/2502.13913)~~ | ~~How Do LLMs Perform Two-Hop Reasoning in Context?~~ | DONE #382 |
| [2403.02615](https://arxiv.org/abs/2403.02615) | Exploring Limitations in Compositional Relation Reasoning |
| ~~[2405.06680](https://arxiv.org/abs/2405.06680)~~ | ~~Exploring the Compositional Deficiency in Mathematical Reasoning~~ | DONE #383 |
| [2401.00757](https://arxiv.org/abs/2401.00757) | LogicAsker: Evaluating Logical Reasoning Ability |
| [2306.12567](https://arxiv.org/abs/2306.12567) | Evaluating LLMs with NeuBAROCO: Syllogistic Reasoning |
| [2310.05163](https://arxiv.org/abs/2310.05163) | LLMs' Inefficacy in Understanding Converse Relations |
| [2402.10735](https://arxiv.org/abs/2402.10735) | Assessing Reasoning Abilities in Claim Verification |
| [2406.12158](https://arxiv.org/abs/2406.12158) | LLMs Are Prone to Fallacies in Causal Inference |
| [2410.16502](https://arxiv.org/abs/2410.16502) | Rulebreakers Challenge: Blind Spot in Formal Logic |
| [2402.11051](https://arxiv.org/abs/2402.11051) | LLMs Fall Short: Complex Relationships in Detective Narratives |
| [2410.01748](https://arxiv.org/abs/2410.01748) | Not All LLM Reasoners Are Created Equal |
| [2407.15720](https://arxiv.org/abs/2407.15720) | Do LLMs Have Compositional Ability? |
| [2402.14328](https://arxiv.org/abs/2402.14328) | Understanding and Patching Compositional Reasoning |
| [2402.01805](https://arxiv.org/abs/2402.01805) | Enhancing Logical Reasoning through Graph-Based Synthetic Data |
| [2408.15778](https://arxiv.org/abs/2408.15778) | LogicGame: Benchmarking Rule-Based Reasoning |
| [2402.11442](https://arxiv.org/abs/2402.11442) | Can LLMs Reason with Rules? Logic Scaffolding |
| [2408.08978](https://arxiv.org/abs/2408.08978) | See What LLMs Cannot Answer: Self-Challenge Framework |

### Benchmark Robustness

| arXiv ID | Title |
|----------|-------|
| [2309.03882](https://arxiv.org/abs/2309.03882) | LLMs Are Not Robust Multiple Choice Selectors |
| [2402.01781](https://arxiv.org/abs/2402.01781) | When Benchmarks Are Targets: Sensitivity of Leaderboards |
| [2406.19470](https://arxiv.org/abs/2406.19470) | Changing Answer Order Can Decrease MMLU Accuracy |
| [2410.23884](https://arxiv.org/abs/2410.23884) | Failure Modes of LLMs for Causal Reasoning on Narratives |
| [2402.19255](https://arxiv.org/abs/2402.19255) | GSM-Plus: Evaluating Robustness as Math Problem Solvers |
| [2103.07191](https://arxiv.org/abs/2103.07191) | Are NLP Models Really Able to Solve Simple Math Word Problems? |
| [2212.10264](https://arxiv.org/abs/2212.10264) | ReCode: Robustness Evaluation of Code Generation Models |
| [2402.05980](https://arxiv.org/abs/2402.05980) | Do Large Code Models Understand Programming Concepts? |
| [2403.19114](https://arxiv.org/abs/2403.19114) | EvoEval: Evolving Coding Benchmarks via LLM |
| [2306.03438](https://arxiv.org/abs/2306.03438) | LLMs of Code Fail at Completing Code with Potential Bugs |
| [2305.15507](https://arxiv.org/abs/2305.15507) | The Larger They Are, the Harder They Fail: Identifier Swaps |
| [2404.01535](https://arxiv.org/abs/2404.01535) | Syntactic Robustness for LLM-Based Code Generation |
| [2406.11020](https://arxiv.org/abs/2406.11020) | RUPBench: Reasoning Under Perturbations |
| [2401.09395](https://arxiv.org/abs/2401.09395) | Evaluating Math and Coding via Ontology-Guided Interventions |
| [2310.01991](https://arxiv.org/abs/2310.01991) | Fill in the Blank: Backward Reasoning in Math Word Problems |
| [2502.06453](https://arxiv.org/abs/2502.06453) | MATH-Perturb: Benchmarking against Hard Perturbations |
| [2505.20296](https://arxiv.org/abs/2505.20296) | Reasoning LLMs Are Wandering Solution Explorers |
| ~~[2507.13337](https://arxiv.org/abs/2507.13337)~~ | ~~FormulaOne: Measuring Depth of Algorithmic Reasoning~~ | DONE #375 |

### Arithmetic & Mathematics

| arXiv ID | Title |
|----------|-------|
| [2412.18626](https://arxiv.org/abs/2412.18626) | Why Do LLMs Struggle to Count Letters? |
| [2410.19730](https://arxiv.org/abs/2410.19730) | Counting Ability of LLMs and Impact of Tokenization |
| [2405.20131](https://arxiv.org/abs/2405.20131) | Language Models Need Inductive Biases to Count Inductively |
| [2410.14166](https://arxiv.org/abs/2410.14166) | LLM The Genius Paradox: Word-Based Counting Problems |
| [2407.15160](https://arxiv.org/abs/2407.15160) | When Can Transformers Count to n? |
| [2405.11357](https://arxiv.org/abs/2405.11357) | LLMs Lack Understanding of Character Composition |
| [2403.19346](https://arxiv.org/abs/2403.19346) | LLMs Are Unconscious of Unreasonability in Math Problems |
| [2406.17681](https://arxiv.org/abs/2406.17681) | VarBench: Robust Benchmarking Through Variable Perturbation |
| [2406.09072](https://arxiv.org/abs/2406.09072) | Living in the Moment: Co-Temporal Reasoning |
| [2501.02825](https://arxiv.org/abs/2501.02825) | Randomly Sampled Language Reasoning Problems Reveal Limits |
| [2410.18921](https://arxiv.org/abs/2410.18921) | From Blind Solvers to Logical Thinkers |
| [2304.02015](https://arxiv.org/abs/2304.02015) | How Well Do LLMs Perform in Arithmetic Tasks? |
| [2410.13857](https://arxiv.org/abs/2410.13857) | How Numerical Precision Affects Mathematical Reasoning |
| [2406.02356](https://arxiv.org/abs/2406.02356) | Language Models Do Hard Arithmetic Easily, Easy Arithmetic Hardly |
| [2410.15580](https://arxiv.org/abs/2410.15580) | Language Models Are Symbolic Learners in Arithmetic |
| [2406.06576](https://arxiv.org/abs/2406.06576) | OccamLLM: Fast and Exact Language Model Arithmetic |
| [2309.03241](https://arxiv.org/abs/2309.03241) | GPT Can Solve Mathematical Problems Without a Calculator |
| [2406.05055](https://arxiv.org/abs/2406.05055) | Robustness Assessment with Missing/Contradictory Conditions |
| [2403.05845](https://arxiv.org/abs/2403.05845) | Reverse That Number! Decoding Order Matters |
| [2402.03822](https://arxiv.org/abs/2402.03822) | RevOrder: Novel Method for Enhanced Arithmetic |
| [2306.16636](https://arxiv.org/abs/2306.16636) | CMATH: Chinese Elementary School Math Test |
| [2502.11574](https://arxiv.org/abs/2502.11574) | Large Language Models and Mathematical Reasoning Failures |
| [2410.09988](https://arxiv.org/abs/2410.09988) | HARDMath: Benchmark for Challenging Applied Math |
| [2502.01612](https://arxiv.org/abs/2502.01612) | Self-Improving Transformers Overcome Length Generalization |

### Embodied & Physical Reasoning

| arXiv ID | Title |
|----------|-------|
| [2312.04613](https://arxiv.org/abs/2312.04613) | Testing LLM Performance on the Physics GRE |
| [2502.12054](https://arxiv.org/abs/2502.12054) | PhysReason: Physics-Based Reasoning Benchmark |
| [2502.00334](https://arxiv.org/abs/2502.00334) | UGPhysics: Undergraduate Physics Reasoning |
| [2504.16074](https://arxiv.org/abs/2504.16074) | PHYBench: Physical Perception and Reasoning |
| [2507.04766](https://arxiv.org/abs/2507.04766) | ABench-Physics: Benchmarking Physical Reasoning |
| [2502.15815](https://arxiv.org/abs/2502.15815) | Theoretical Physics Benchmark (TPBench) |
| [2412.00821](https://arxiv.org/abs/2412.00821) | Improving Physics Reasoning Using Mixture of Refinement Agents |
| [2502.15224](https://arxiv.org/abs/2502.15224) | Auto-Bench: Automated Benchmark for Scientific Discovery |
| [2412.08619](https://arxiv.org/abs/2412.08619) | Synthetic Vision: Training VLMs to Understand Physics |
| [2411.08027](https://arxiv.org/abs/2411.08027) | Llmphy: Complex Physical Reasoning Using LLMs and World Models |
| [2409.14277](https://arxiv.org/abs/2409.14277) | Can-Do! Embodied Planning with Large Multimodal Models |
| [2505.05405](https://arxiv.org/abs/2505.05405) | DeepPHY: Benchmarking Agentic VLMs on Physical Reasoning |
| [2502.14669](https://arxiv.org/abs/2502.14669) | AlphaMaze: Enhancing LLMs' Spatial Intelligence via GRPO |
| [2410.23242](https://arxiv.org/abs/2410.23242) | A Little Less Conversation: Physical Common-Sense in 3D |
| [2310.13065](https://arxiv.org/abs/2310.13065) | Creative Robot Tool Use with Large Language Models |
| [2410.15863](https://arxiv.org/abs/2410.15863) | Task-Oriented Robotic Manipulation with VLMs |

### General Failure Studies

| arXiv ID | Title |
|----------|-------|
| [2405.19616](https://arxiv.org/abs/2405.19616) | Easy Problems That LLMs Get Wrong |
| [2302.03494](https://arxiv.org/abs/2302.03494) | A Categorical Archive of ChatGPT Failures |

---

## High Priority - Memorization & Fragility

Papers on memorization mechanisms and reasoning fragility.

| arXiv ID | Title | Stance |
|----------|-------|--------|
| ~~[2507.21009](https://arxiv.org/abs/2507.21009)~~ | ~~Memorization in Fine-Tuned Large Language Models~~ | ~~DONE (#259)~~ |
| ~~[2408.04667](https://arxiv.org/abs/2408.04667)~~ | ~~Non-Determinism of "Deterministic" LLM Settings~~ | ~~DONE (#260)~~ |

**Key findings:**
- **2507.21009**: Value and Output matrices contribute more to memorization than Query/Key; lower perplexity correlates with increased memorization; higher LoRA ranks → more memorization
- **2408.04667**: Accuracy variations up to 15% across runs; gap between best and worst performance up to 70%; none of the LLMs consistently delivers repeatable accuracy even at temperature=0

---

## From User Notes (Mar 2026)

Papers extracted from research notes on framing bias, unlearning, and jailbreaking.

### Framing & Reliability (High Priority - Supports Thesis)

| arXiv ID | Title | Stance |
|----------|-------|--------|
| ~~[2602.20440](https://arxiv.org/abs/2602.20440)~~ | ~~Intelligence Without Integrity: Why Capable LLMs May Undermine Reliability~~ | ~~supports~~ | DONE #224 |
| ~~[2510.14665](https://arxiv.org/abs/2510.14665)~~ | ~~Beyond Hallucinations: The Illusion of Understanding in Large Language Models~~ | ~~supports~~ | DONE #225 |

**Key finding (Intelligence Without Integrity)**: Intelligence and integrity trade off - frontier models most likely to reach correct conclusions under neutral conditions are often most susceptible to shifting conclusions under motivated framing. Introduces "goal-conditioned analytical sycophancy."

### LLM Unlearning (Medium Priority)

Papers on model unlearning - shows brittleness of learned behaviors.

| arXiv ID | Title | Stance |
|----------|-------|--------|
| ~~[2510.09007](https://arxiv.org/abs/2510.09007)~~ | ~~LLM Unlearning on Noisy Forget Sets (AISec'25)~~ | ~~balanced~~ | DONE #226 |
| ~~[2503.01854](https://arxiv.org/abs/2503.01854)~~ | ~~A Comprehensive Survey of Machine Unlearning Techniques for LLMs~~ | ~~balanced~~ | DONE #227 |
| ~~[2410.16454](https://arxiv.org/abs/2410.16454)~~ | ~~Catastrophic Failure of LLM Unlearning via Quantization (ICLR 2025)~~ | ~~supports~~ | DONE #228 |
| ~~[2511.11914](https://arxiv.org/abs/2511.11914)~~ | ~~Forgetting-MarI: LLM Unlearning via Marginal Information Regularization~~ | ~~balanced~~ | DONE #229 |
| ~~[2311.02105](https://arxiv.org/abs/2311.02105)~~ | ~~Making Harmful Behaviors Unlearnable for Large Language Models~~ | ~~balanced~~ | DONE #230 |

### Jailbreaking (Lower Priority - Large Existing Literature)

Papers on jailbreaking - shows superficiality of alignment.

| arXiv ID | Title | Stance |
|----------|-------|--------|
| ~~[2505.19773](https://arxiv.org/abs/2505.19773)~~ | ~~What Really Matters in Many-Shot Attacks? Long-Context Vulnerabilities (ACL 2025)~~ | ~~supports~~ | DONE #231 |
| ~~[2504.09604](https://arxiv.org/abs/2504.09604)~~ | ~~Mitigating Many-Shot Jailbreaking~~ | ~~supports~~ | DONE #232 |
| ~~[2502.01925](https://arxiv.org/abs/2502.01925)~~ | ~~PANDAS: Improving Many-Shot Jailbreaking (ICML 2025 Spotlight)~~ | ~~supports~~ | DONE #233 |
| ~~[2410.16531](https://arxiv.org/abs/2410.16531)~~ | ~~Bayesian scaling laws for in-context learning (COLM 2025)~~ | ~~supports~~ | DONE #234 |
| ~~[2407.04295](https://arxiv.org/abs/2407.04295)~~ | ~~Jailbreak Attacks and Defenses Against LLMs: A Survey~~ | ~~supports~~ | DONE #235 |
| ~~[2403.12171](https://arxiv.org/abs/2403.12171)~~ | ~~EasyJailbreak: A Unified Framework for Jailbreaking LLMs~~ | ~~supports~~ | DONE #236 |
| ~~[2507.22171](https://arxiv.org/abs/2507.22171)~~ | ~~Enhancing Jailbreak Attacks on LLMs via Persona Prompts (NeurIPS 2025 Workshop)~~ | ~~supports~~ | DONE #237 |
| ~~[2508.03054](https://arxiv.org/abs/2508.03054)~~ | ~~Beyond Surface-Level Detection: Cognitive-Driven Defense via Meta-Operations~~ | ~~supports~~ | DONE #238 |
| ~~[2506.00782](https://arxiv.org/abs/2506.00782)~~ | ~~Jailbreak-R1: Exploring Jailbreak Capabilities via RL~~ | ~~supports~~ | DONE #239 |
| ~~[2508.04039](https://arxiv.org/abs/2508.04039)~~ | ~~Large Reasoning Models Are Autonomous Jailbreak Agents (Nature Comms 2026)~~ | ~~supports~~ | DONE #240 |
| ~~[2503.05264](https://arxiv.org/abs/2503.05264)~~ | ~~Jailbreaking is (Mostly) Simpler Than You Think~~ | ~~supports~~ | DONE #241 |
| ~~[2505.10066](https://arxiv.org/abs/2505.10066)~~ | ~~Dark LLMs: The Growing Threat of Unaligned AI Models~~ | ~~supports~~ | DONE #242 |

**Key finding from Many-Shot (2505.19773)**: Context length is primary factor - even repetitive shots or random dummy text can circumvent safety measures.

---

## High Priority - Alignment Faking & Deception Cluster

Papers on "alignment faking," deception, and emergent misalignment. These papers make strong claims about AI behavior - read each fully and assess independently.

### Open Questions

Key empirical questions to resolve when reading these papers:
- Does the behavior persist without the elaborate prompt/setup?
- Is this "deep" internalized behavior or "shallow" prompt compliance?
- What do the authors' own limitations sections reveal?
- How do results vary across models and conditions?

### Alignment Faking (Anthropic 2024)

| arXiv ID | Title | Stance | Notes |
|----------|-------|--------|-------|
| ~~[2412.14093](https://arxiv.org/abs/2412.14093)~~ | ~~Alignment faking in large language models~~ | ~~supports~~ | DONE #279 |
| ~~[2506.18032](https://arxiv.org/abs/2506.18032)~~ | ~~Why Do Some Language Models Fake Alignment While Others Don't?~~ | ~~supports~~ | DONE #281 |
| [2506.21584](https://arxiv.org/abs/2506.21584) | Empirical Evidence for Alignment Faking in a Small LLM | TBD | Tests in 8B model; proposes "shallow" vs "deep" deception taxonomy |
| [2401.05566](https://arxiv.org/abs/2401.05566) | Sleeper Agents: Training Deceptive LLMs that Persist Through Safety Training | TBD | Explicitly trains backdoors; tests persistence through safety training |

### Emergent Misalignment

| arXiv ID | Title | Stance | Notes |
|----------|-------|--------|-------|
| ~~[2502.17424](https://arxiv.org/abs/2502.17424)~~ | ~~Emergent Misalignment: Narrow finetuning can produce broadly misaligned LLMs~~ | ~~TBD~~ | DONE #328 | Nature 2026; finetuning on insecure code produces broad behavioral changes |
| ~~[2511.18397](https://arxiv.org/abs/2511.18397)~~ | ~~Natural emergent misalignment from reward hacking in production RL~~ | ~~TBD~~ | DONE #332 | Anthropic; production RL environments; "inoculation prompting" tested as mitigation |
| ~~[2508.02063](https://arxiv.org/abs/2508.02063)~~ | ~~TRACEALIGN: Tracing the Drift - Attributing Alignment Failures to Training-Time Belief Sources~~ | ~~TBD~~ | DONE #329 | Introduces Belief Conflict Index; traces failures to training data |

### Alignment Evaluation & Stress Testing

| arXiv ID | Title | Stance | Notes |
|----------|-------|--------|-------|
| ~~[2602.20813](https://arxiv.org/abs/2602.20813)~~ | ~~Pressure Reveals Character: Behavioural Alignment Evaluation at Depth~~ | ~~TBD~~ | DONE #330 | 904 scenarios across 6 categories; tests under pressure |
| ~~[2510.07686](https://arxiv.org/abs/2510.07686)~~ | ~~Stress-Testing Model Specs Reveals Character Differences~~ | ~~TBD~~ | DONE #331 | Forces tradeoffs between principles; 70,000+ divergent cases |
| ~~[2510.11235](https://arxiv.org/abs/2510.11235)~~ | ~~AI Alignment Strategies from a Risk Perspective~~ | ~~TBD~~ | DONE #333 | Analyzes 7 techniques vs 7 failure modes |
| ~~[2512.00349](https://arxiv.org/abs/2512.00349)~~ | ~~Debate with Images: Detecting Deceptive Behaviors in MLLMs~~ | ~~TBD~~ | DONE #334 | MM-DeceptionBench; multi-agent debate framework |

### Alignment Surveys & Frameworks

| arXiv ID | Title | Stance | Notes |
|----------|-------|--------|-------|
| ~~[2507.19672](https://arxiv.org/abs/2507.19672)~~ | ~~Alignment and Safety in LLMs: Safety Mechanisms, Training Paradigms, and Emerging Challenges~~ | ~~TBD~~ | DONE #335 | 119-page survey of alignment techniques |

### Monitoring & Situational Awareness (Bengio et al.)

| arXiv ID | Title | Stance | Notes |
|----------|-------|--------|-------|
| [2603.16928](https://arxiv.org/abs/2603.16928) | Noticing the Watcher: LLM Agents Can Infer CoT Monitoring | TBD | Bengio; tests whether models infer monitoring from feedback |
| [2310.17688](https://arxiv.org/abs/2310.17688) | Managing extreme AI risks amid rapid progress | TBD | Bengio, Hinton, Russell; Science paper; position on AI risks |

### Anthropomorphism in AI Research

| arXiv ID | Title | Stance | Notes |
|----------|-------|--------|-------|
| ~~[2502.09192](https://arxiv.org/abs/2502.09192)~~ | ~~Thinking beyond the anthropomorphic paradigm benefits LLM research~~ | ~~TBD~~ | DONE #336 | Analyzes 100k+ papers; identifies anthropomorphic assumptions |

---

## High Priority - Reasoning & Understanding (Andreas, Shah, Sekhon)

Papers examining LLM reasoning, understanding, and evaluation methodology.

### Jacob Andreas (MIT)

| arXiv ID | Title | Stance | Notes |
|----------|-------|--------|-------|
| [2312.03729](https://arxiv.org/abs/2312.03729) | Cognitive Dissonance: Why Do LLM Outputs Disagree with Internal Representations? | TBD | Studies gap between internal representations and outputs |
| [2212.01681](https://arxiv.org/abs/2212.01681) | Language Models as Agent Models | TBD | Theoretical framing of what LMs model |
| [2405.09605](https://arxiv.org/abs/2405.09605) | Elements of World Knowledge (EWoK) | TBD | Evaluates world modeling capabilities |

### Rohin Shah (DeepMind)

| arXiv ID | Title | Stance | Notes |
|----------|-------|--------|-------|
| [2210.01790](https://arxiv.org/abs/2210.01790) | Goal Misgeneralization: Why Correct Specifications Aren't Enough | TBD | Defines goal misgeneralization problem |
| [2501.13011](https://arxiv.org/abs/2501.13011) | MONA: Myopic Optimization with Non-myopic Approval | TBD | Reward hacking prevention via myopic optimization |
| [2505.01420](https://arxiv.org/abs/2505.01420) | Evaluating Frontier Models for Stealth and Situational Awareness | TBD | Scheming evaluations on frontier models |
| [2504.01849](https://arxiv.org/abs/2504.01849) | An Approach to Technical AGI Safety and Security | TBD | Comprehensive safety framework |

### Jasjeet Sekhon (Yale)

| arXiv ID | Title | Stance | Notes |
|----------|-------|--------|-------|
| [2507.02825](https://arxiv.org/abs/2507.02825) | Establishing Best Practices for Building Rigorous Agentic Benchmarks | TBD | Critiques SWE-bench, TAU-bench methodology |
| [2501.00961](https://arxiv.org/abs/2501.00961) | Uncovering Memorization Effect in the Presence of Spurious Correlations | TBD | Nature Comms; memorization and spurious correlations |

---

## High Priority - Agency, Role-Play, and Narrative Completion

Papers examining whether LLMs have genuine agency/goals or simulate them via narrative completion.

### Core Question

"Alignment faking" requires persistent goals to protect. If LLMs lack persistent state and true goals, "faking" is a category error - what looks like strategic deception is actually coherent narrative completion from conflicting prompts.

### Superficial Alignment Hypothesis

| arXiv ID | Title | Stance | Notes |
|----------|-------|--------|-------|
| ~~[2312.01552](https://arxiv.org/abs/2312.01552)~~ | ~~The Unlocking Spell on Base LLMs (URIAL)~~ | ~~supports~~ | DONE #280 |
| ~~[2602.15829](https://arxiv.org/abs/2602.15829)~~ | ~~Operationalising SAH via Task Complexity~~ | ~~supports~~ | DONE #284 |

### LLM Agency Critiques

| arXiv ID | Title | Stance | Notes |
|----------|-------|--------|-------|
| ~~[2407.08790](https://arxiv.org/abs/2407.08790)~~ | ~~Large Models of What? Mistaking Engineering for Linguistic Agency~~ | ~~supports~~ | DONE #285 |
| ~~[2305.14784](https://arxiv.org/abs/2305.14784)~~ | ~~Anthropomorphization of AI: Opportunities and Risks~~ | ~~supports~~ | DONE #282 |
| ~~[2509.21545](https://arxiv.org/abs/2509.21545)~~ | ~~Evidence for Limited Metacognition in LLMs~~ | ~~balanced~~ | DONE #283 |
| ~~[2505.23323](https://arxiv.org/abs/2505.23323)~~ | ~~Neither Stochastic Parroting nor AGI~~ | ~~supports~~ | DONE #286 |

### Role-Play and Persona Simulation

| arXiv ID | Title | Stance | Notes |
|----------|-------|--------|-------|
| [2410.04272](https://arxiv.org/abs/2410.04272) | Evaluating Language Model Character Traits | TBD | Formalizes LM behavior without anthropomorphism |
| [2412.14368](https://arxiv.org/abs/2412.14368) | Memorization Over Reasoning? Character Understanding | TBD | LLMs rely on memorization for character understanding |

### Sycophancy and Lack of Genuine Beliefs

| arXiv ID | Title | Stance | Notes |
|----------|-------|--------|-------|
| [2603.16643](https://arxiv.org/abs/2603.16643) | Good Arguments Against People Pleasers | TBD | Reasoning mitigates but masks sycophancy |
| [2603.18373](https://arxiv.org/abs/2603.18373) | To See or To Please: Split Beliefs in VLMs | TBD | Different answers to users vs. probing - no consistent beliefs |
| [2603.20620](https://arxiv.org/abs/2603.20620) | Reasoning Traces Shape Outputs but Models Won't Say So | TBD | LLMs don't accurately report what influences outputs |
| [2510.03667](https://arxiv.org/abs/2510.03667) | Invisible Saboteurs: Sycophantic LLMs Mislead Novices in Problem-Solving Tasks | supports | n=24 study; high-sycophancy bot → worse task outcomes, users can't detect it (CHI 2026) |
| [2605.21778](https://arxiv.org/abs/2605.21778) | What Counts as AI Sycophancy? A Taxonomy and Expert Survey of a Fragmented Construct | balanced | 70-paper review + 106-expert survey; 94.3% agree it's a problem, disagree on what qualifies |
| [2602.01002](https://arxiv.org/abs/2602.01002) | How RLHF Amplifies Sycophancy | supports | Formal proof: covariance mechanism links reward optimization to preference-data bias |

### Reward Hacking in LLM RL (Issue #93 follow-up)

Modern manifestation of the 2016 "Faulty Reward Functions" / "Concrete Problems in AI Safety" failure mode in LLM RL pipelines (RLHF, RLVR, rubric-RL). See `analysis/thoughts.md` "Blog Posts & Non-Paper Resources" for the foundational sources.

| arXiv ID | Title | Stance | Notes |
|----------|-------|--------|-------|
| ~~[2606.04923](https://arxiv.org/abs/2606.04923)~~ | ~~Reproducing, Analyzing, and Detecting Reward Hacking in Rubric-Based Reinforcement Learning~~ | ~~supports~~ | DONE #369 |
| ~~[2606.03131](https://arxiv.org/abs/2606.03131)~~ | ~~HARVE: Hacking-Aware Reward-Head Vector Editing for Robust Reward Models~~ | ~~supports~~ | DONE #370 |
| ~~[2606.06223](https://arxiv.org/abs/2606.06223)~~ | ~~From Reward-Hack Activations to Agentic Risk States~~ | ~~supports~~ | DONE #371 |
| ~~[2606.05625](https://arxiv.org/abs/2606.05625)~~ | ~~Self-Commitment Latency: A Reward-Free Probe for Prompted Implicit Hacking~~ | ~~supports~~ | DONE #372 |
| ~~[2606.04145](https://arxiv.org/abs/2606.04145)~~ | ~~EvalStop: Detecting and Correcting Reward Overoptimization in Multi-Tenant RLHF Platforms~~ | ~~balanced~~ | DONE #373 |
| [2606.09711](https://arxiv.org/abs/2606.09711) | Proxy Reward Internalization and Mechanistic Exploitation: A Learned Precursor to Reward Hacking and Its Generalization | supports | Beigi, Jin, Huang; studies the *learned precursor* to hacking before it becomes visible, and how the proxy-reward representation generalizes - the mechanistic counterpart to OpenAI's "Where the Goblins Came From" reward-leak post-mortem (see `analysis/thoughts.md`) |

### Counter-Arguments (Steel-man)

| arXiv ID | Title | Stance | Notes |
|----------|-------|--------|-------|
| [2601.02043](https://arxiv.org/abs/2601.02043) | Simulated Reasoning is Reasoning | TBD | Argues simulation constitutes genuine reasoning |
| [2407.11015](https://arxiv.org/abs/2407.11015) | Does ChatGPT Have a Mind? | TBD | Philosophical examination of LLM understanding |

---

### Training Pipeline Notes (Not Papers)

From CS336 L16 (51-53min): Base models have most/all knowledge that SFT/RL extract or prime.

Training pipeline pattern: **SFT → RLVR → SFT(2 epoch) → RLHF**

- SFT objective: Fit reference distribution (imitation)
- RLHF objective: Maximize reward function (also imitation of preferences)

---

## High Priority - arXiv Search (Apr–May 2026)

Papers harvested by arXiv sweep over CoT faithfulness, memorization–generalization, and reasoning limitations. Single-author papers excluded per selection rules. See `toevaluate.md` for staged Apr–May 2026 candidates.

| arXiv ID | Title | Stance |
|----------|-------|--------|
| ~~[2605.24960](https://arxiv.org/abs/2605.24960)~~ | ~~Investigating the Interplay between Contextual and Parametric Chain-of-Thought Faithfulness under Optimization~~ | ~~supports~~ | DONE #357 |
| ~~[2605.22873](https://arxiv.org/abs/2605.22873)~~ | ~~When Do LLMs Reason? A Dynamical Systems View via Entropy Phase Transitions~~ | ~~supports~~ | DONE #355 |
| ~~[2605.24396](https://arxiv.org/abs/2605.24396)~~ | ~~Understanding and Mitigating Premature Confidence for Better LLM Reasoning~~ | ~~supports~~ | DONE #354 |
| [2605.20410](https://arxiv.org/abs/2605.20410) | Mechanics of Bias and Reasoning: Interpreting the Impact of CoT Prompting on Gender Bias in LLMs | supports |
| ~~[2605.18022](https://arxiv.org/abs/2605.18022)~~ | ~~Unveiling Memorization-Generalization Coexistence: Arithmetic Tasks with Label Noise~~ | ~~supports~~ | DONE #358 |
| [2605.01750](https://arxiv.org/abs/2605.01750) | Talk is Cheap, Communication is Hard: Dynamic Grounding Failures and Repair in Multi-Agent Negotiation | supports |
| ~~[2604.25345](https://arxiv.org/abs/2604.25345)~~ | ~~Plausible but Wrong: A Case Study on Agentic Failures in Astrophysical Workflows~~ | ~~supports~~ | DONE #356 |
| [2604.16646](https://arxiv.org/abs/2604.16646) | Agentic Frameworks for Reasoning Tasks: An Empirical Study (22 frameworks) | balanced |
| [2604.14140](https://arxiv.org/abs/2604.14140) | LongCoT: Benchmarking Long-Horizon Chain-of-Thought Reasoning | balanced |
