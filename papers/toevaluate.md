# Papers to Evaluate

Raw auto-discovered papers awaiting triage. Review and promote relevant ones to `toread.md`.

**Last updated**: 2026-01-29

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

---

## New Papers (2026-01-29)

### [SoftHateBench: Evaluating Moderation Models Against Reasoning-Driven, Policy-Compliant Hostility](https://arxiv.org/abs/2601.20256v1)
- **arXiv**: 2601.20256v1
- **Published**: 2026-01-28
- **Stance**: SUPPORTS
- **Priority**: 8/10
- **Classified by**: LLM
- **Why read**: This paper demonstrates that current moderation models struggle with reasoning-driven, subtle hostility, highlighting the limitations of LLM reasoning as pattern matching rather than genuine understanding.

<details>
<summary>Abstract</summary>

Online hate on social media ranges from overt slurs and threats (\emph{hard hate speech}) to \emph{soft hate speech}: discourse that appears reasonable on the surface but uses framing and value-based arguments to steer audiences toward blaming or excluding a target group. We hypothesize that current moderation systems, largely optimized for surface toxicity cues, are not robust to this reasoning-driven hostility, yet existing benchmarks do not measure this gap systematically. We introduce \textbf{\textsc{SoftHateBench}}, a generative benchmark that produces soft-hate variants while preserving the underlying hostile standpoint. To generate soft hate, we integrate the \emph{Argumentum Model of Topics} (AMT) and \emph{Relevance Theory} (RT) in a unified framework: AMT provides the backbone argument structure for rewriting an explicit hateful standpoint into a seemingly neutral discussion while preserving the stance, and RT guides generation to keep the AMT chain logically coherent. The benchmark spans \textbf{7} sociocultural domains and \textbf{28} target groups, comprising \textbf{4,745} soft-hate instances. Evaluations across encoder-based detectors, general-purpose LLMs, and safety models show a consistent drop from hard to soft tiers: systems that detect explicit hostility often fail when the same stance is conveyed through subtle, reasoning-based language. \textcolor{red}{\textbf{Disclaimer.} Contains offensive examples used solely for research.}

</details>

### [Evolutionary Strategies lead to Catastrophic Forgetting in LLMs](https://arxiv.org/abs/2601.20861v1)
- **arXiv**: 2601.20861v1
- **Published**: 2026-01-28
- **Stance**: BALANCED
- **Priority**: 7/10
- **Classified by**: LLM
- **Why read**: This paper provides insights into the limitations of alternative training methods like Evolutionary Strategies, highlighting issues related to continual learning and forgetting, which relate to the broader discussion of LLM reasoning capabilities and their reliance on training dynamics.

<details>
<summary>Abstract</summary>

One of the biggest missing capabilities in current AI systems is the ability to learn continuously after deployment. Implementing such continually learning systems have several challenges, one of which is the large memory requirement of gradient-based algorithms that are used to train state-of-the-art LLMs. Evolutionary Strategies (ES) have recently re-emerged as a gradient-free alternative to traditional learning algorithms and have shown encouraging performance on specific tasks in LLMs. In this paper, we perform a comprehensive analysis of ES and specifically evaluate its forgetting curves when training for an increasing number of update steps. We first find that ES is able to reach performance numbers close to GRPO for math and reasoning tasks with a comparable compute budget. However, and most importantly for continual learning, the performance gains in ES is accompanied by significant forgetting of prior abilities, limiting its applicability for training models online. We also explore the reason behind this behavior and show that the updates made using ES are much less sparse and have orders of magnitude larger $\ell_2$ norm compared to corresponding GRPO updates, explaining the contrasting forgetting curves between the two algorithms. With this study, we aim to highlight the issue of forgetting in gradient-free algorithms like ES and hope to inspire future work to mitigate these issues.

</details>

### [Training Reasoning Models on Saturated Problems via Failure-Prefix Conditioning](https://arxiv.org/abs/2601.20829v1)
- **arXiv**: 2601.20829v1
- **Published**: 2026-01-28
- **Stance**: BALANCED
- **Priority**: 7/10
- **Classified by**: LLM
- **Why read**: This paper explores methods to improve LLM reasoning by addressing training challenges, providing insights into the nature of LLM capabilities and limitations.

<details>
<summary>Abstract</summary>

Reinforcement Learning with Verifiable Rewards (RLVR) has substantially improved the reasoning abilities of large language models (LLMs), yet training often stalls as problems become saturated. We identify the core challenge as the poor accessibility of informative failures: learning signals exist but are rarely encountered during standard rollouts. To address this, we propose failure-prefix conditioning, a simple and effective method for learning from saturated problems. Rather than starting from the original question, our approach reallocates exploration by conditioning training on prefixes derived from rare incorrect reasoning trajectories, thereby exposing the model to failure-prone states. We observe that failure-prefix conditioning yields performance gains matching those of training on medium-difficulty problems, while preserving token efficiency. Furthermore, we analyze the model's robustness, finding that our method reduces performance degradation under misleading failure prefixes, albeit with a mild trade-off in adherence to correct early reasoning. Finally, we demonstrate that an iterative approach, which refreshes failure prefixes during training, unlocks additional gains after performance plateaus. Overall, our results suggest that failure-prefix conditioning offers an effective pathway to extend RLVR training on saturated problems.

</details>

### [AgentLongBench: A Controllable Long Benchmark For Long-Contexts Agents via Environment Rollouts](https://arxiv.org/abs/2601.20730v1)
- **arXiv**: 2601.20730v1
- **Published**: 2026-01-28
- **Stance**: BALANCED
- **Priority**: 7/10
- **Classified by**: LLM
- **Why read**: This paper highlights the limitations of current LLMs in dynamic, reasoning-intensive tasks, emphasizing their reliance on static retrieval and pattern matching rather than genuine reasoning.

<details>
<summary>Abstract</summary>

The evolution of Large Language Models (LLMs) into autonomous agents necessitates the management of extensive, dynamic contexts. Current benchmarks, however, remain largely static, relying on passive retrieval tasks that fail to simulate the complexities of agent-environment interaction, such as non-linear reasoning and iterative feedback. To address this, we introduce \textbf{AgentLongBench}, which evaluates agents through simulated environment rollouts based on Lateral Thinking Puzzles. This framework generates rigorous interaction trajectories across knowledge-intensive and knowledge-free scenarios. Experiments with state-of-the-art models and memory systems (32K to 4M tokens) expose a critical weakness: while adept at static retrieval, agents struggle with the dynamic information synthesis essential for workflows. Our analysis indicates that this degradation is driven by the minimum number of tokens required to resolve a query. This factor explains why the high information density inherent in massive tool responses poses a significantly greater challenge than the memory fragmentation typical of long-turn dialogues.

</details>

### [ShieldedCode: Learning Robust Representations for Virtual Machine Protected Code](https://arxiv.org/abs/2601.20679v1)
- **arXiv**: 2601.20679v1
- **Published**: 2026-01-28
- **Stance**: BALANCED
- **Priority**: 7/10
- **Classified by**: LLM
- **Why read**: This paper explores the capabilities of LLMs in understanding and reasoning over protected code, providing insights into their pattern matching and robustness, which is relevant to assessing their genuine reasoning abilities.

<details>
<summary>Abstract</summary>

Large language models (LLMs) have achieved remarkable progress in code generation, yet their potential for software protection remains largely untapped. Reverse engineering continues to threaten software security, while traditional virtual machine protection (VMP) relies on rigid, rule-based transformations that are costly to design and vulnerable to automated analysis. In this work, we present the first protection-aware framework that learns robust representations of VMP-protected code. Our approach builds large-scale paired datasets of source code and normalized VM implementations, and introduces hierarchical dependency modeling at intra-, preceding-, and inter-instruction levels. We jointly optimize language modeling with functionality-aware and protection-aware contrastive objectives to capture both semantic equivalence and protection strength. To further assess resilience, we propose a protection effectiveness optimization task that quantifies and ranks different VM variants derived from the same source. Coupled with a two-stage continual pre-training and fine-tuning pipeline, our method enables models to generate, compare, and reason over protected code. Extensive experiments show that our framework significantly improves robustness across diverse protection levels, opening a new research direction for learning-based software defense. In this work, we present ShieldedCode, the first protection-aware framework that learns robust representations of VMP-protected code. Our method achieves 26.95% Pass@1 on L0 VM code generation compared to 22.58% for GPT-4o., and improves binary similarity detection Recall@1 by 10% over state of art methods like jTrans.

</details>

### [P2S: Probabilistic Process Supervision for General-Domain Reasoning Question Answering](https://arxiv.org/abs/2601.20649v1)
- **arXiv**: 2601.20649v1
- **Published**: 2026-01-28
- **Stance**: BALANCED
- **Priority**: 7/10
- **Classified by**: LLM
- **Why read**: This paper explores process supervision and reward mechanisms in LLM reasoning, providing insights into whether LLMs genuinely reason or rely on pattern matching.

<details>
<summary>Abstract</summary>

While reinforcement learning with verifiable rewards (RLVR) has advanced LLM reasoning in structured domains like mathematics and programming, its application to general-domain reasoning tasks remains challenging due to the absence of verifiable reward signals. To this end, methods like Reinforcement Learning with Reference Probability Reward (RLPR) have emerged, leveraging the probability of generating the final answer as a reward signal. However, these outcome-focused approaches neglect crucial step-by-step supervision of the reasoning process itself. To address this gap, we introduce Probabilistic Process Supervision (P2S), a novel self-supervision framework that provides fine-grained process rewards without requiring a separate reward model or human-annotated reasoning steps. During reinforcement learning, P2S synthesizes and filters a high-quality reference reasoning chain (gold-CoT). The core of our method is to calculate a Path Faithfulness Reward (PFR) for each reasoning step, which is derived from the conditional probability of generating the gold-CoT's suffix, given the model's current reasoning prefix. Crucially, this PFR can be flexibly integrated with any outcome-based reward, directly tackling the reward sparsity problem by providing dense guidance. Extensive experiments on reading comprehension and medical Question Answering benchmarks show that P2S significantly outperforms strong baselines.

</details>

### [PathWise: Planning through World Model for Automated Heuristic Design via Self-Evolving LLMs](https://arxiv.org/abs/2601.20539v1)
- **arXiv**: 2601.20539v1
- **Published**: 2026-01-28
- **Stance**: BALANCED
- **Priority**: 7/10
- **Classified by**: LLM
- **Why read**: This paper explores LLM-based heuristic design and reasoning processes, providing insights into the capabilities and limitations of LLM reasoning in optimization contexts.

<details>
<summary>Abstract</summary>

Large Language Models (LLMs) have enabled automated heuristic design (AHD) for combinatorial optimization problems (COPs), but existing frameworks' reliance on fixed evolutionary rules and static prompt templates often leads to myopic heuristic generation, redundant evaluations, and limited reasoning about how new heuristics should be derived. We propose a novel multi-agent reasoning framework, referred to as Planning through World Model for Automated Heuristic Design via Self-Evolving LLMs (PathWise), which formulates heuristic generation as a sequential decision process over an entailment graph serving as a compact, stateful memory of the search trajectory. This approach allows the system to carry forward past decisions and reuse or avoid derivation information across generations. A policy agent plans evolutionary actions, a world model agent generates heuristic rollouts conditioned on those actions, and critic agents provide routed reflections summarizing lessons from prior steps, shifting LLM-based AHD from trial-and-error evolution toward state-aware planning through reasoning. Experiments across diverse COPs show that PathWise converges faster to better heuristics, generalizes across different LLM backbones, and scales to larger problem sizes.

</details>

### [CtrlCoT: Dual-Granularity Chain-of-Thought Compression for Controllable Reasoning](https://arxiv.org/abs/2601.20467v1)
- **arXiv**: 2601.20467v1
- **Published**: 2026-01-28
- **Stance**: BALANCED
- **Priority**: 7/10
- **Classified by**: LLM
- **Why read**: This paper explores chain-of-thought compression techniques that impact reasoning interpretability and efficiency, relevant to understanding LLM reasoning capabilities and limitations.

<details>
<summary>Abstract</summary>

Chain-of-thought (CoT) prompting improves LLM reasoning but incurs high latency and memory cost due to verbose traces, motivating CoT compression with preserved correctness. Existing methods either shorten CoTs at the semantic level, which is often conservative, or prune tokens aggressively, which can miss task-critical cues and degrade accuracy. Moreover, combining the two is non-trivial due to sequential dependency, task-agnostic pruning, and distribution mismatch. We propose \textbf{CtrlCoT}, a dual-granularity CoT compression framework that harmonizes semantic abstraction and token-level pruning through three components: Hierarchical Reasoning Abstraction produces CoTs at multiple semantic granularities; Logic-Preserving Distillation trains a logic-aware pruner to retain indispensable reasoning cues (e.g., numbers and operators) across pruning ratios; and Distribution-Alignment Generation aligns compressed traces with fluent inference-time reasoning styles to avoid fragmentation. On MATH-500 with Qwen2.5-7B-Instruct, CtrlCoT uses 30.7\% fewer tokens while achieving 7.6 percentage points higher than the strongest baseline, demonstrating more efficient and reliable reasoning. Our code will be publicly available at https://github.com/fanzhenxuan/Ctrl-CoT.

</details>

### [Scaling Medical Reasoning Verification via Tool-Integrated Reinforcement Learning](https://arxiv.org/abs/2601.20221v1)
- **arXiv**: 2601.20221v1
- **Published**: 2026-01-28
- **Stance**: SUPPORTS
- **Priority**: 3/10
- **Classified by**: Keyword
- **Why read**: LLM reasoning paper (keyword match - verify relevance)

<details>
<summary>Abstract</summary>

Large language models have achieved strong performance on medical reasoning benchmarks, yet their deployment in clinical settings demands rigorous verification to ensure factual accuracy. While reward models offer a scalable approach for reasoning trace verification, existing methods face two limitations: they produce only scalar reward values without explicit justification, and they rely on single-pass retrieval that precludes adaptive knowledge access as verification unfolds. We introduce $\method$, an agentic framework that addresses these limitations by training medical reasoning verifiers to iteratively query external medical corpora during evaluation. Our approach combines tool-augmented verification with an iterative reinforcement learning paradigm that requires only trace-level supervision, alongside an adaptive curriculum mechanism that dynamically adjusts training data distribution. Across four medical reasoning benchmarks, $\method$ achieves substantial gains over existing methods, improving MedQA accuracy by 23.5% and MedXpertQA by 32.0% relative to the base generator in particular. Crucially, $\method$ demonstrates an $\mathbf{8\times}$ reduction in sampling budget requirement compared to prior reward model baselines. These findings establish that grounding verification in dynamically retrieved evidence offers a principled path toward more reliable medical reasoning systems.

</details>

### [VERGE: Formal Refinement and Guidance Engine for Verifiable LLM Reasoning](https://arxiv.org/abs/2601.20055v1)
- **arXiv**: 2601.20055v1
- **Published**: 2026-01-27
- **Stance**: SUPPORTS
- **Priority**: 3/10
- **Classified by**: Keyword
- **Why read**: LLM reasoning paper (keyword match - verify relevance)

<details>
<summary>Abstract</summary>

Despite the syntactic fluency of Large Language Models (LLMs), ensuring their logical correctness in high-stakes domains remains a fundamental challenge. We present a neurosymbolic framework that combines LLMs with SMT solvers to produce verification-guided answers through iterative refinement. Our approach decomposes LLM outputs into atomic claims, autoformalizes them into first-order logic, and verifies their logical consistency using automated theorem proving. We introduce three key innovations: (1) multi-model consensus via formal semantic equivalence checking to ensure logic-level alignment between candidates, eliminating the syntactic bias of surface-form metrics, (2) semantic routing that directs different claim types to appropriate verification strategies: symbolic solvers for logical claims and LLM ensembles for commonsense reasoning, and (3) precise logical error localization via Minimal Correction Subsets (MCS), which pinpoint the exact subset of claims to revise, transforming binary failure signals into actionable feedback. Our framework classifies claims by their logical status and aggregates multiple verification signals into a unified score with variance-based penalty. The system iteratively refines answers using structured feedback until acceptance criteria are met or convergence is achieved. This hybrid approach delivers formal guarantees where possible and consensus verification elsewhere, advancing trustworthy AI. With the GPT-OSS-120B model, VERGE demonstrates an average performance uplift of 18.7% at convergence across a set of reasoning benchmarks compared to single-pass approaches.

</details>

### [Group Distributionally Robust Optimization-Driven Reinforcement Learning for LLM Reasoning](https://arxiv.org/abs/2601.19280v1)
- **arXiv**: 2601.19280v1
- **Published**: 2026-01-27
- **Stance**: CHALLENGES
- **Priority**: 3/10
- **Classified by**: Keyword
- **Why read**: LLM reasoning paper (keyword match - verify relevance)

<details>
<summary>Abstract</summary>

Recent progress in Large Language Model (LLM) reasoning is increasingly driven by the refinement of post-training loss functions and alignment strategies. However, standard Reinforcement Learning (RL) paradigms like Group Relative Policy Optimization (GRPO) remain constrained by static uniformity: uniform prompt sampling and a fixed number of rollouts per prompt. For heterogeneous, heavy-tailed reasoning data, this creates structural inefficiencies that waste compute on already-solved patterns while under-training the long tail of hard problems. To address this, we propose Multi-Adversary Group Distributionally Robust Optimization (GDRO), an optimization-first framework that moves beyond uniform reasoning models by dynamically adapting the training distribution.   We introduce an Online Difficulty Classifier that partitions prompts into dynamic pass@k difficulty groups. We then propose two independent GDRO games for post-training: (1) Prompt-GDRO, which employs an EMA-debiased multiplicative-weights bandit sampler to target the intensive difficulty margin and upweight persistently hard groups without frequency bias; and (2) Rollout-GDRO, which uses a shadow-price controller to reallocate rollouts across groups, maximizing gradient variance reduction on hard tasks under a fixed mean budget (compute-neutral). We provide no-regret guarantees for both controllers and additionally a variance-proxy analysis motivating a square-root optimal rollout allocation for Rollout-GDRO. We validate our framework on the DAPO 14.1k dataset using Qwen3-Base models. Prompt-GDRO and Rollout-GDRO achieve average relative gains of +10.6% and +10.1%, respectively, in pass@8 accuracy across 1.7B, 4B, and 8B scales compared to the GRPO baseline. Qualitative analysis shows an emergent curriculum: the adversaries shift resources to the evolving reasoning frontier, enhancing the reasoning model's performance.

</details>

### [A Dialectic Pipeline for Improving LLM Robustness](https://arxiv.org/abs/2601.20659v1)
- **arXiv**: 2601.20659v1
- **Published**: 2026-01-28
- **Stance**: SUPPORTS
- **Priority**: 3/10
- **Classified by**: Keyword
- **Why read**: LLM reasoning paper (keyword match - verify relevance)

<details>
<summary>Abstract</summary>

Assessing ways in which Language Models can reduce their hallucinations and improve the outputs' quality is crucial to ensure their large-scale use.   However, methods such as fine-tuning on domain-specific data or the training of a separate \textit{ad hoc} verifier require demanding computational resources (not feasible for many user applications) and constrain the models to specific fields of knowledge.   In this thesis, we propose a dialectic pipeline that preserves LLMs' generalization abilities while improving the quality of its answer via self-dialogue, enabling it to reflect upon and correct tentative wrong answers.   We experimented with different pipeline settings, testing our proposed method on different datasets and on different families of models. All the pipeline stages are enriched with the relevant context (in an oracle-RAG setting) and a study on the impact of its summarization or its filtering is conducted.   We find that our proposed dialectic pipeline is able to outperform by significative margins the standard model answers and that it consistently achieves higher performances than Chain-of-Thought only prompting.

</details>

### [MetaGen: Self-Evolving Roles and Topologies for Multi-Agent LLM Reasoning](https://arxiv.org/abs/2601.19290v1)
- **arXiv**: 2601.19290v1
- **Published**: 2026-01-27
- **Stance**: BALANCED
- **Priority**: 2/10
- **Classified by**: Keyword
- **Why read**: LLM reasoning paper (keyword match - verify relevance)

<details>
<summary>Abstract</summary>

Large language models are increasingly deployed as multi-agent systems, where specialized roles communicate and collaborate through structured interactions to solve complex tasks that often exceed the capacity of a single agent. However, most existing systems still rely on a fixed role library and an execution-frozen interaction topology, a rigid design choice that frequently leads to task mismatch, prevents timely adaptation when new evidence emerges during reasoning, and further inflates inference cost. We introduce MetaGen, a training-free framework that adapts both the role space and the collaboration topology at inference time, without updating base model weights. MetaGen generates and rewrites query-conditioned role specifications to maintain a controllable dynamic role pool, then instantiates a constrained execution graph around a minimal backbone. During execution, it iteratively updates role prompts and adjusts structural decisions using lightweight feedback signals. Experiments on code generation and multi-step reasoning benchmarks show that MetaGen improves the accuracy and cost tradeoff over strong multi-agent baselines.

</details>

### [Policy of Thoughts: Scaling LLM Reasoning via Test-time Policy Evolution](https://arxiv.org/abs/2601.20379v1)
- **arXiv**: 2601.20379v1
- **Published**: 2026-01-28
- **Stance**: BALANCED
- **Priority**: 2/10
- **Classified by**: Keyword
- **Why read**: LLM reasoning paper (keyword match - verify relevance)

<details>
<summary>Abstract</summary>

Large language models (LLMs) struggle with complex, long-horizon reasoning due to instability caused by their frozen policy assumption. Current test-time scaling methods treat execution feedback merely as an external signal for filtering or rewriting trajectories, without internalizing it to improve the underlying reasoning strategy. Inspired by Popper's epistemology of "conjectures and refutations," we argue that intelligence requires real-time evolution of the model's policy through learning from failed attempts. We introduce Policy of Thoughts (PoT), a framework that recasts reasoning as a within-instance online optimization process. PoT first generates diverse candidate solutions via an efficient exploration mechanism, then uses Group Relative Policy Optimization (GRPO) to update a transient LoRA adapter based on execution feedback. This closed-loop design enables dynamic, instance-specific refinement of the model's reasoning priors. Experiments show that PoT dramatically boosts performance: a 4B model achieves 49.71% accuracy on LiveCodeBench, outperforming GPT-4o and DeepSeek-V3 despite being over 50 smaller.

</details>

### [LTS-VoiceAgent: A Listen-Think-Speak Framework for Efficient Streaming Voice Interaction via Semantic Triggering and Incremental Reasoning](https://arxiv.org/abs/2601.19952v1)
- **arXiv**: 2601.19952v1
- **Published**: 2026-01-26
- **Stance**: BALANCED
- **Priority**: 2/10
- **Classified by**: Keyword
- **Why read**: LLM reasoning paper (keyword match - verify relevance)

<details>
<summary>Abstract</summary>

Real-time voice agents face a dilemma: end-to-end models often lack deep reasoning, while cascaded pipelines incur high latency by executing ASR, LLM reasoning, and TTS strictly in sequence, unlike human conversation where listeners often start thinking before the speaker finishes. Since cascaded architectures remain the dominant choice for complex tasks, existing cascaded streaming strategies attempt to reduce this latency via mechanical segmentation (e.g., fixed chunks, VAD-based splitting) or speculative generation, but they frequently either break semantic units or waste computation on predictions that must be rolled back. To address these challenges, we propose LTS-VoiceAgent, a Listen-Think-Speak framework that explicitly separates when to think from how to reason incrementally. It features a Dynamic Semantic Trigger to detect meaningful prefixes, and a Dual-Role Stream Orchestrator that coordinates a background Thinker (for state maintenance) and a foreground Speaker (for speculative solving). This parallel design enables "thinking while speaking" without blocking responses. We also introduce a Pause-and-Repair benchmark containing natural disfluencies to stress-test streaming robustness. Experiments across VERA, Spoken-MQA, BigBenchAudio, and our benchmark show that LTS-VoiceAgent achieves a stronger accuracy-latency-efficiency trade-off than serial cascaded baselines and existing streaming strategies.

</details>

## New Papers (2026-01-28)

### [When Iterative RAG Beats Ideal Evidence: A Diagnostic Study in Scientific Multi-hop Question Answering](https://arxiv.org/abs/2601.19827v1)
- **arXiv**: 2601.19827v1
- **Published**: 2026-01-27
- **Stance**: BALANCED
- **Priority**: 8/10
- **Classified by**: LLM
- **Why read**: This paper provides empirical evidence on the limitations and capabilities of iterative retrieval in LLM reasoning, highlighting reliance on pattern matching and surface-level improvements rather than genuine reasoning.

<details>
<summary>Abstract</summary>

Retrieval-Augmented Generation (RAG) extends large language models (LLMs) beyond parametric knowledge, yet it is unclear when iterative retrieval-reasoning loops meaningfully outperform static RAG, particularly in scientific domains with multi-hop reasoning, sparse domain knowledge, and heterogeneous evidence. We provide the first controlled, mechanism-level diagnostic study of whether synchronized iterative retrieval and reasoning can surpass an idealized static upper bound (Gold Context) RAG. We benchmark eleven state-of-the-art LLMs under three regimes: (i) No Context, measuring reliance on parametric memory; (ii) Gold Context, where all oracle evidence is supplied at once; and (iii) Iterative RAG, a training-free controller that alternates retrieval, hypothesis refinement, and evidence-aware stopping. Using the chemistry-focused ChemKGMultiHopQA dataset, we isolate questions requiring genuine retrieval and analyze behavior with diagnostics spanning retrieval coverage gaps, anchor-carry drop, query quality, composition fidelity, and control calibration. Across models, Iterative RAG consistently outperforms Gold Context, with gains up to 25.6 percentage points, especially for non-reasoning fine-tuned models. Staged retrieval reduces late-hop failures, mitigates context overload, and enables dynamic correction of early hypothesis drift, but remaining failure modes include incomplete hop coverage, distractor latch trajectories, early stopping miscalibration, and high composition failure rates even with perfect retrieval. Overall, staged retrieval is often more influential than the mere presence of ideal evidence; we provide practical guidance for deploying and diagnosing RAG systems in specialized scientific settings and a foundation for more reliable, controllable iterative retrieval-reasoning frameworks.

</details>

### [Strong Reasoning Isn't Enough: Evaluating Evidence Elicitation in Interactive Diagnosis](https://arxiv.org/abs/2601.19773v1)
- **arXiv**: 2601.19773v1
- **Published**: 2026-01-27
- **Stance**: SUPPORTS
- **Priority**: 8/10
- **Classified by**: LLM
- **Why read**: This paper highlights that strong reasoning alone does not ensure effective evidence gathering in interactive settings, supporting the view that LLM reasoning is limited and pattern-based.

<details>
<summary>Abstract</summary>

Interactive medical consultation requires an agent to proactively elicit missing clinical evidence under uncertainty. Yet existing evaluations largely remain static or outcome-centric, neglecting the evidence-gathering process. In this work, we propose an interactive evaluation framework that explicitly models the consultation process using a simulated patient and a \rev{simulated reporter} grounded in atomic evidences. Based on this representation, we introduce Information Coverage Rate (ICR) to quantify how completely an agent uncovers necessary evidence during interaction. To support systematic study, we build EviMed, an evidence-based benchmark spanning diverse conditions from common complaints to rare diseases, and evaluate 10 models with varying reasoning abilities. We find that strong diagnostic reasoning does not guarantee effective information collection, and this insufficiency acts as a primary bottleneck limiting performance in interactive settings. To address this, we propose REFINE, a strategy that leverages diagnostic verification to guide the agent in proactively resolving uncertainties. Extensive experiments demonstrate that REFINE consistently outperforms baselines across diverse datasets and facilitates effective model collaboration, enabling smaller agents to achieve superior performance under strong reasoning supervision. Our code can be found at https://github.com/NanshineLoong/EID-Benchmark .

</details>

### [RPO-RAG: Aligning Small LLMs with Relation-aware Preference Optimization for Knowledge Graph Question Answering](https://arxiv.org/abs/2601.19225v1)
- **arXiv**: 2601.19225v1
- **Published**: 2026-01-27
- **Stance**: BALANCED
- **Priority**: 8/10
- **Classified by**: LLM
- **Why read**: This paper explores how small LLMs can improve reasoning through retrieval and training strategies, providing insights into the practical reasoning capabilities and limitations of LLMs.

<details>
<summary>Abstract</summary>

Large Language Models (LLMs) have recently demonstrated remarkable reasoning abilities, yet hallucinate on knowledge-intensive tasks. Retrieval-augmented generation (RAG) mitigates this issue by grounding answers in external sources, e.g., knowledge graphs (KGs). However, existing KG-based RAG approaches rely on semantics-unaware path sampling and are weakly aligned with KG reasoning objectives, which limits further accuracy gains. They also feed retrieved paths directly into the reasoner without organizing them into answer-centered reasoning paths, hindering small LLMs' ability to leverage the retrieved knowledge. Furthermore, prior works predominantly rely on large LLMs (e.g., ChatGPT/GPT-4) or assume backbones above 7B parameters, leaving sub-7B models underexplored. We address this gap with RPO-RAG, the first KG-based RAG framework specifically designed for small LLMs, to the best of our knowledge. RPO-RAG introduces three key innovations: (1) a query-path semantic sampling strategy that provides informative supervisory signals; (2) a relation-aware preference optimization that aligns training with intermediate KG reasoning signals (e.g., relation); and (3) an answer-centered prompt design that organizes entities and reasoning paths in an interpretable format. Extensive experiments on two benchmark Knowledge Graph Question Answering (KGQA) datasets, WebQSP and CWQ, demonstrate that RPO-RAG effectively bridges the performance gap between small and large language models. On WebQSP, it improves F1 by up to 8.8%, reflecting enhanced answer precision, while on CWQ it achieves new state-of-the-art results among models under 8B parameters in both Hit and F1. Overall, RPO-RAG substantially improves the reasoning capability of small LLMs, even under 3B parameters-highlighting their potential for resource-efficient and practical on-device KGQA applications.

</details>

### [Identifying and Transferring Reasoning-Critical Neurons: Improving LLM Inference Reliability via Activation Steering](https://arxiv.org/abs/2601.19847v1)
- **arXiv**: 2601.19847v1
- **Published**: 2026-01-27
- **Stance**: BALANCED
- **Priority**: 7/10
- **Classified by**: LLM
- **Why read**: This paper investigates neuron-level mechanisms and inference strategies that influence reasoning reliability, providing insights into whether LLM reasoning is fundamentally pattern matching or involves genuine reasoning capabilities.

<details>
<summary>Abstract</summary>

Despite the strong reasoning capabilities of recent large language models (LLMs), achieving reliable performance on challenging tasks often requires post-training or computationally expensive sampling strategies, limiting their practical efficiency. In this work, we first show that a small subset of neurons in LLMs exhibits strong predictive correlations with reasoning correctness. Based on this observation, we propose AdaRAS (Adaptive Reasoning Activation Steering), a lightweight test-time framework that improves reasoning reliability by selectively intervening on neuron activations. AdaRAS identifies Reasoning-Critical Neurons (RCNs) via a polarity-aware mean-difference criterion and adaptively steers their activations during inference, enhancing incorrect reasoning traces while avoiding degradation on already-correct cases. Experiments on 10 mathematics and coding benchmarks demonstrate consistent improvements, including over 13% gains on AIME-24 and AIME-25. Moreover, AdaRAS exhibits strong transferability across datasets and scalability to stronger models, outperforming post-training methods without additional training or sampling cost.

</details>

### [Decompose-and-Formalise: Recursively Verifiable Natural Language Inference](https://arxiv.org/abs/2601.19605v1)
- **arXiv**: 2601.19605v1
- **Published**: 2026-01-27
- **Stance**: BALANCED
- **Priority**: 7/10
- **Classified by**: LLM
- **Why read**: This paper explores structured reasoning and verification methods in LLMs, providing insights into their capabilities and limitations in formal reasoning tasks.

<details>
<summary>Abstract</summary>

Recent work has shown that integrating large language models (LLMs) with theorem provers (TPs) in neuro-symbolic pipelines helps with entailment verification and proof-guided refinement of explanations for natural language inference (NLI). However, scaling such refinement to naturalistic NLI remains difficult: long, syntactically rich inputs and deep multi-step arguments amplify autoformalisation errors, where a single local mismatch can invalidate the proof. Moreover, current methods often handle failures via costly global regeneration due to the difficulty of localising the responsible span or step from prover diagnostics. Aiming to address these problems, we propose a decompose-and-formalise framework that (i) decomposes premise-hypothesis pairs into an entailment tree of atomic steps, (ii) verifies the tree bottom-up to isolate failures to specific nodes, and (iii) performs local diagnostic-guided refinement instead of regenerating the whole explanation. Moreover, to improve faithfulness of autoformalisation, we introduce $θ$-substitution in an event-based logical form to enforce consistent argument-role bindings. Across a range of reasoning tasks using five LLM backbones, our method achieves the highest explanation verification rates, improving over the state-of-the-art by 26.2%, 21.7%, 21.6% and 48.9%, while reducing refinement iterations and runtime and preserving strong NLI accuracy.

</details>

### [Formula-One Prompting: Adaptive Reasoning Through Equations For Applied Mathematics](https://arxiv.org/abs/2601.19302v1)
- **arXiv**: 2601.19302v1
- **Published**: 2026-01-27
- **Stance**: BALANCED
- **Priority**: 7/10
- **Classified by**: LLM
- **Why read**: This paper explores an advanced prompting technique that leverages equations as intermediate representations, shedding light on the extent to which LLMs can perform reasoning through pattern matching versus explicit derivation.

<details>
<summary>Abstract</summary>

Prompting techniques such as Chain-of-Thought (CoT) and Program-of-Thought (PoT) improve LLM mathematical reasoning by structuring intermediate steps in natural language or code. However, applied mathematics problems in domains like finance, physics, and cryptography often require recalling or deriving governing equations, a step that current approaches do not explicitly leverage. We propose Formula-One Prompting (F-1), a two-phase approach that uses mathematical equations as an intermediate representation before adaptive solving. F-1 first formulates governing equations from problem descriptions, then selects a solving strategy among CoT, PoT, or direct computation based on the generated equations, all within a single LLM call. Results across five models and four benchmarks show F-1 outperforms CoT by +5.76% and PoT by +8.42% on average. Crucially, gains are largest in applied domains: +13.30% on FinanceMath over CoT, and within OlympiadBench, larger gains on physics (+2.55%) than pure math (+0.44%). This demonstrates that F-1 is more effective than CoT in applied mathematics problems.

</details>

### [Riddle Quest : The Enigma of Words](https://arxiv.org/abs/2601.19273v1)
- **arXiv**: 2601.19273v1
- **Published**: 2026-01-27
- **Stance**: BALANCED
- **Priority**: 7/10
- **Classified by**: LLM
- **Why read**: This paper investigates LLM reasoning through riddles, highlighting both the models' pattern recognition strengths and their limitations in reasoning coverage, aligning with the thesis.

<details>
<summary>Abstract</summary>

Riddles are concise linguistic puzzles that describe an object or idea through indirect, figurative, or playful clues. They are a longstanding form of creative expression, requiring the solver to interpret hints, recognize patterns, and draw inferences to identify the answers. In this work, we introduce a simple pipeline for creating and evaluating analogy-based riddles. The system includes a triples creator that builds structured facts about a concept, a semantic mapper that selects attributes useful for analogy, a stylized generator that turns them into riddle clues, and a validator that collects all possible answers the riddle could point to. We use this validator to study whether large language models can recover the full answer set for different riddle types. Our case study shows that while models often guess the main intended answer, they frequently miss other valid interpretations. This highlights the value of riddles as a lightweight tool for examining reasoning coverage and ambiguity handling in language models.

</details>

### [Save the Good Prefix: Precise Error Penalization via Process-Supervised RL to Enhance LLM Reasoning](https://arxiv.org/abs/2601.18984v1)
- **arXiv**: 2601.18984v1
- **Published**: 2026-01-26
- **Stance**: SUPPORTS
- **Priority**: 3/10
- **Classified by**: Keyword
- **Why read**: LLM reasoning paper (keyword match - verify relevance)

<details>
<summary>Abstract</summary>

Reinforcement learning (RL) has emerged as a powerful framework for improving the reasoning capabilities of large language models (LLMs). However, most existing RL approaches rely on sparse outcome rewards, which fail to credit correct intermediate steps in partially successful solutions. Process reward models (PRMs) offer fine-grained step-level supervision, but their scores are often noisy and difficult to evaluate. As a result, recent PRM benchmarks focus on a more objective capability: detecting the first incorrect step in a reasoning path. However, this evaluation target is misaligned with how PRMs are typically used in RL, where their step-wise scores are treated as raw rewards to maximize. To bridge this gap, we propose Verifiable Prefix Policy Optimization (VPPO), which uses PRMs only to localize the first error during RL. Given an incorrect rollout, VPPO partitions the trajectory into a verified correct prefix and an erroneous suffix based on the first error, rewarding the former while applying targeted penalties only after the detected mistake. This design yields stable, interpretable learning signals and improves credit assignment. Across multiple reasoning benchmarks, VPPO consistently outperforms sparse-reward RL and prior PRM-guided baselines on both Pass@1 and Pass@K.

</details>

### [Reuse your FLOPs: Scaling RL on Hard Problems by Conditioning on Very Off-Policy Prefixes](https://arxiv.org/abs/2601.18795v1)
- **arXiv**: 2601.18795v1
- **Published**: 2026-01-26
- **Stance**: SUPPORTS
- **Priority**: 3/10
- **Classified by**: Keyword
- **Why read**: LLM reasoning paper (keyword match - verify relevance)

<details>
<summary>Abstract</summary>

Typical reinforcement learning (RL) methods for LLM reasoning waste compute on hard problems, where correct on-policy traces are rare, policy gradients vanish, and learning stalls. To bootstrap more efficient RL, we consider reusing old sampling FLOPs (from prior inference or RL training) in the form of off-policy traces. Standard off-policy methods supervise against off-policy data, causing instabilities during RL optimization. We introduce PrefixRL, where we condition on the prefix of successful off-policy traces and run on-policy RL to complete them, side-stepping off-policy instabilities. PrefixRL boosts the learning signal on hard problems by modulating the difficulty of the problem through the off-policy prefix length. We prove that the PrefixRL objective is not only consistent with the standard RL objective but also more sample efficient. Empirically, we discover back-generalization: training only on prefixed problems generalizes to out-of-distribution unprefixed performance, with learned strategies often differing from those in the prefix. In our experiments, we source the off-policy traces by rejection sampling with the base model, creating a self-improvement loop. On hard reasoning problems, PrefixRL reaches the same training reward 2x faster than the strongest baseline (SFT on off-policy data then RL), even after accounting for the compute spent on the initial rejection sampling, and increases the final reward by 3x. The gains transfer to held-out benchmarks, and PrefixRL is still effective when off-policy traces are derived from a different model family, validating its flexibility in practical settings.

</details>

### [Dep-Search: Learning Dependency-Aware Reasoning Traces with Persistent Memory](https://arxiv.org/abs/2601.18771v1)
- **arXiv**: 2601.18771v1
- **Published**: 2026-01-26
- **Stance**: SUPPORTS
- **Priority**: 3/10
- **Classified by**: Keyword
- **Why read**: LLM reasoning paper (keyword match - verify relevance)

<details>
<summary>Abstract</summary>

Large Language Models (LLMs) have demonstrated remarkable capabilities in complex reasoning tasks, particularly when augmented with search mechanisms that enable systematic exploration of external knowledge bases. The field has evolved from traditional retrieval-augmented generation (RAG) frameworks to more sophisticated search-based frameworks that orchestrate multi-step reasoning through explicit search strategies. However, existing search frameworks still rely heavily on implicit natural language reasoning to determine search strategies and how to leverage retrieved information across reasoning steps. This reliance on implicit reasoning creates fundamental challenges for managing dependencies between sub-questions, efficiently reusing previously retrieved knowledge, and learning optimal search strategies through reinforcement learning. To address these limitations, we propose Dep-Search, a dependency-aware search framework that advances beyond existing search frameworks by integrating structured reasoning, retrieval, and persistent memory through GRPO. Dep-Search introduces explicit control mechanisms that enable the model to decompose questions with dependency relationships, retrieve information when needed, access previously stored knowledge from memory, and summarize long reasoning contexts into reusable memory entries. Through extensive experiments on seven diverse question answering datasets, we demonstrate that Dep-Search significantly enhances LLMs' ability to tackle complex multi-hop reasoning tasks, achieving substantial improvements over strong baselines across different model scales.

</details>

### [Do not be greedy, Think Twice: Sampling and Selection for Document-level Information Extraction](https://arxiv.org/abs/2601.18395v1)
- **arXiv**: 2601.18395v1
- **Published**: 2026-01-26
- **Stance**: SUPPORTS
- **Priority**: 3/10
- **Classified by**: Keyword
- **Why read**: LLM reasoning paper (keyword match - verify relevance)

<details>
<summary>Abstract</summary>

Document-level Information Extraction (DocIE) aims to produce an output template with the entities and relations of interest occurring in the given document. Standard practices include prompting decoder-only LLMs using greedy decoding to avoid output variability. Rather than treating this variability as a limitation, we show that sampling can produce substantially better solutions than greedy decoding, especially when using reasoning models. We thus propose ThinkTwice, a sampling and selection framework in which the LLM generates multiple candidate templates for a given document, and a selection module chooses the most suitable one. We introduce both an unsupervised method that exploits agreement across generated outputs, and a supervised selection method using reward models trained on labeled DocIE data. To address the scarcity of golden reasoning trajectories for DocIE, we propose a rejection-sampling-based method to generate silver training data that pairs output templates with reasoning traces. Our experiments show the validity of unsupervised and supervised ThinkTwice, consistently outperforming greedy baselines and the state-of-the-art.

</details>

### [Think-Augmented Function Calling: Improving LLM Parameter Accuracy Through Embedded Reasoning](https://arxiv.org/abs/2601.18282v1)
- **arXiv**: 2601.18282v1
- **Published**: 2026-01-26
- **Stance**: SUPPORTS
- **Priority**: 3/10
- **Classified by**: Keyword
- **Why read**: LLM reasoning paper (keyword match - verify relevance)

<details>
<summary>Abstract</summary>

Large language models (LLMs) have demonstrated remarkable capabilities in function calling for autonomous agents, yet current mechanisms lack explicit reasoning transparency during parameter generation, particularly for complex functions with interdependent parameters. While existing approaches like chain-of-thought prompting operate at the agent level, they fail to provide fine-grained reasoning guidance for individual function parameters. To address these limitations, we propose Think-Augmented Function Calling (TAFC), a novel framework that enhances function calling accuracy through explicit reasoning at both function and parameter levels. Our method introduces a universal "think" parameter augmentation that enables models to articulate their decision-making process, with dynamic optimization for parameter descriptions to improve reasoning quality. For complex parameters, TAFC automatically triggers granular reasoning based on complexity scoring, ensuring appropriate justification for critical decisions. Additionally, we propose reasoning-guided optimization to align generated reasoning with human expectations. TAFC requires no architectural modifications to existing LLMs while maintaining full API compatibility. Evaluation on ToolBench across proprietary and open-source models demonstrates significant improvements in parameter generation accuracy and reasoning coherence for multi-parameter functions, while providing enhanced interpretability for debugging AI agent behaviors.

</details>

### [MATA: A Trainable Hierarchical Automaton System for Multi-Agent Visual Reasoning](https://arxiv.org/abs/2601.19204v1)
- **arXiv**: 2601.19204v1
- **Published**: 2026-01-27
- **Stance**: SUPPORTS
- **Priority**: 3/10
- **Classified by**: Keyword
- **Why read**: LLM reasoning paper (keyword match - verify relevance)

<details>
<summary>Abstract</summary>

Recent vision-language models have strong perceptual ability but their implicit reasoning is hard to explain and easily generates hallucinations on complex queries. Compositional methods improve interpretability, but most rely on a single agent or hand-crafted pipeline and cannot decide when to collaborate across complementary agents or compete among overlapping ones. We introduce MATA (Multi-Agent hierarchical Trainable Automaton), a multi-agent system presented as a hierarchical finite-state automaton for visual reasoning whose top-level transitions are chosen by a trainable hyper agent. Each agent corresponds to a state in the hyper automaton, and runs a small rule-based sub-automaton for reliable micro-control. All agents read and write a shared memory, yielding transparent execution history. To supervise the hyper agent's transition policy, we build transition-trajectory trees and transform to memory-to-next-state pairs, forming the MATA-SFT-90K dataset for supervised finetuning (SFT). The finetuned LLM as the transition policy understands the query and the capacity of agents, and it can efficiently choose the optimal agent to solve the task. Across multiple visual reasoning benchmarks, MATA achieves the state-of-the-art results compared with monolithic and compositional baselines. The code and dataset are available at https://github.com/ControlNet/MATA.

</details>

### [FROST: Filtering Reasoning Outliers with Attention for Efficient Reasoning](https://arxiv.org/abs/2601.19001v1)
- **arXiv**: 2601.19001v1
- **Published**: 2026-01-26
- **Stance**: BALANCED
- **Priority**: 2/10
- **Classified by**: Keyword
- **Why read**: LLM reasoning paper (keyword match - verify relevance)

<details>
<summary>Abstract</summary>

We propose FROST, an attention-aware method for efficient reasoning. Unlike traditional approaches, FROST leverages attention weights to prune uncritical reasoning paths, yielding shorter and more reliable reasoning trajectories. Methodologically, we introduce the concept of reasoning outliers and design an attention-based mechanism to remove them. Theoretically, FROST preserves and enhances the model's reasoning capacity while eliminating outliers at the sentence level. Empirically, we validate FROST on four benchmarks using two strong reasoning models (Phi-4-Reasoning and GPT-OSS-20B), outperforming state-of-the-art methods such as TALE and ThinkLess. Notably, FROST achieves an average 69.68% reduction in token usage and a 26.70% improvement in accuracy over the base model. Furthermore, in evaluations of attention outlier metrics, FROST reduces the maximum infinity norm by 15.97% and the average kurtosis by 91.09% compared to the base model. Code is available at https://github.com/robinzixuan/FROST

</details>

### [Self-Distilled Reasoner: On-Policy Self-Distillation for Large Language Models](https://arxiv.org/abs/2601.18734v1)
- **arXiv**: 2601.18734v1
- **Published**: 2026-01-26
- **Stance**: BALANCED
- **Priority**: 2/10
- **Classified by**: Keyword
- **Why read**: LLM reasoning paper (keyword match - verify relevance)

<details>
<summary>Abstract</summary>

Knowledge distillation improves large language model (LLM) reasoning by compressing the knowledge of a teacher LLM to train smaller LLMs. On-policy distillation advances this approach by having the student sample its own trajectories while a teacher LLM provides dense token-level supervision, addressing the distribution mismatch between training and inference in off-policy distillation methods. However, on-policy distillation typically requires a separate, often larger, teacher LLM and does not explicitly leverage ground-truth solutions available in reasoning datasets. Inspired by the intuition that a sufficiently capable LLM can rationalize external privileged reasoning traces and teach its weaker self (i.e., the version without access to privileged information), we introduce On-Policy Self-Distillation (OPSD), a framework where a single model acts as both teacher and student by conditioning on different contexts. The teacher policy conditions on privileged information (e.g., verified reasoning traces) while the student policy sees only the question; training minimizes the per-token divergence between these distributions over the student's own rollouts. We demonstrate the efficacy of our method on multiple mathematical reasoning benchmarks, achieving 4-8x token efficiency compared to reinforcement learning methods such as GRPO and superior performance over off-policy distillation methods.

</details>

### [Dynamic Thinking-Token Selection for Efficient Reasoning in Large Reasoning Models](https://arxiv.org/abs/2601.18383v1)
- **arXiv**: 2601.18383v1
- **Published**: 2026-01-26
- **Stance**: BALANCED
- **Priority**: 2/10
- **Classified by**: Keyword
- **Why read**: LLM reasoning paper (keyword match - verify relevance)

<details>
<summary>Abstract</summary>

Large Reasoning Models (LRMs) excel at solving complex problems by explicitly generating a reasoning trace before deriving the final answer. However, these extended generations incur substantial memory footprint and computational overhead, bottlenecking LRMs' efficiency. This work uses attention maps to analyze the influence of reasoning traces and uncover an interesting phenomenon: only some decision-critical tokens in a reasoning trace steer the model toward the final answer, while the remaining tokens contribute negligibly. Building on this observation, we propose Dynamic Thinking-Token Selection (DynTS). This method identifies decision-critical tokens and retains only their associated Key-Value (KV) cache states during inference, evicting the remaining redundant entries to optimize efficiency.

</details>

### [$α^3$-SecBench: A Large-Scale Evaluation Suite of Security, Resilience, and Trust for LLM-based UAV Agents over 6G Networks](https://arxiv.org/abs/2601.18754v1)
- **arXiv**: 2601.18754v1
- **Published**: 2026-01-26
- **Stance**: BALANCED
- **Priority**: 2/10
- **Classified by**: Keyword
- **Why read**: LLM reasoning paper (keyword match - verify relevance)

<details>
<summary>Abstract</summary>

Autonomous unmanned aerial vehicle (UAV) systems are increasingly deployed in safety-critical, networked environments where they must operate reliably in the presence of malicious adversaries. While recent benchmarks have evaluated large language model (LLM)-based UAV agents in reasoning, navigation, and efficiency, systematic assessment of security, resilience, and trust under adversarial conditions remains largely unexplored, particularly in emerging 6G-enabled settings.   We introduce $α^{3}$-SecBench, the first large-scale evaluation suite for assessing the security-aware autonomy of LLM-based UAV agents under realistic adversarial interference. Building on multi-turn conversational UAV missions from $α^{3}$-Bench, the framework augments benign episodes with 20,000 validated security overlay attack scenarios targeting seven autonomy layers, including sensing, perception, planning, control, communication, edge/cloud infrastructure, and LLM reasoning. $α^{3}$-SecBench evaluates agents across three orthogonal dimensions: security (attack detection and vulnerability attribution), resilience (safe degradation behavior), and trust (policy-compliant tool usage).   We evaluate 23 state-of-the-art LLMs from major industrial providers and leading AI labs using thousands of adversarially augmented UAV episodes sampled from a corpus of 113,475 missions spanning 175 threat types. While many models reliably detect anomalous behavior, effective mitigation, vulnerability attribution, and trustworthy control actions remain inconsistent. Normalized overall scores range from 12.9% to 57.1%, highlighting a significant gap between anomaly detection and security-aware autonomous decision-making. We release $α^{3}$-SecBench on GitHub: https://github.com/maferrag/AlphaSecBench

</details>

### [TSRBench: A Comprehensive Multi-task Multi-modal Time Series Reasoning Benchmark for Generalist Models](https://arxiv.org/abs/2601.18744v1)
- **arXiv**: 2601.18744v1
- **Published**: 2026-01-26
- **Stance**: BALANCED
- **Priority**: 2/10
- **Classified by**: Keyword
- **Why read**: LLM reasoning paper (keyword match - verify relevance)

<details>
<summary>Abstract</summary>

Time series data is ubiquitous in real-world scenarios and crucial for critical applications ranging from energy management to traffic control. Consequently, the ability to reason over time series is a fundamental skill for generalist models to solve practical problems. However, this dimension is notably absent from existing benchmarks of generalist models. To bridge this gap, we introduce TSRBench, a comprehensive multi-modal benchmark designed to stress-test the full spectrum of time series reasoning capabilities. TSRBench features: i) a diverse set of 4125 problems from 14 domains, and is categorized into 4 major dimensions: Perception, Reasoning, Prediction, and Decision-Making. ii) 15 tasks from the 4 dimensions evaluating essential reasoning capabilities (e.g., numerical reasoning). Through extensive experiments, we evaluated over 30 leading proprietary and open-source LLMs, VLMs, and TSLLMs within TSRBench. Our findings reveal that: i) scaling laws hold for perception and reasoning but break down for prediction; ii) strong reasoning does not guarantee accurate context-aware forecasting, indicating a decoupling between semantic understanding and numerical prediction; and iii) despite the complementary nature of textual and visual represenations of time series as inputs, current multimodal models fail to effectively fuse them for reciprocal performance gains. TSRBench provides a standardized evaluation platform that not only highlights existing challenges but also offers valuable insights to advance generalist models. Our code and dataset are available at https://tsrbench.github.io/.

</details>

### [A Balanced Neuro-Symbolic Approach for Commonsense Abductive Logic](https://arxiv.org/abs/2601.18595v1)
- **arXiv**: 2601.18595v1
- **Published**: 2026-01-26
- **Stance**: BALANCED
- **Priority**: 2/10
- **Classified by**: Keyword
- **Why read**: LLM reasoning paper (keyword match - verify relevance)

<details>
<summary>Abstract</summary>

Although Large Language Models (LLMs) have demonstrated impressive formal reasoning abilities, they often break down when problems require complex proof planning. One promising approach for improving LLM reasoning abilities involves translating problems into formal logic and using a logic solver. Although off-the-shelf logic solvers are in principle substantially more efficient than LLMs at logical reasoning, they assume that all relevant facts are provided in a question and are unable to deal with missing commonsense relations. In this work, we propose a novel method that uses feedback from the logic solver to augment a logic problem with commonsense relations provided by the LLM, in an iterative manner. This involves a search procedure through potential commonsense assumptions to maximize the chance of finding useful facts while keeping cost tractable. On a collection of pure-logical reasoning datasets, from which some commonsense information has been removed, our method consistently achieves considerable improvements over existing techniques, demonstrating the value in balancing neural and symbolic elements when working in human contexts.

</details>

### [TriPlay-RL: Tri-Role Self-Play Reinforcement Learning for LLM Safety Alignment](https://arxiv.org/abs/2601.18292v1)
- **arXiv**: 2601.18292v1
- **Published**: 2026-01-26
- **Stance**: BALANCED
- **Priority**: 2/10
- **Classified by**: Keyword
- **Why read**: LLM reasoning paper (keyword match - verify relevance)

<details>
<summary>Abstract</summary>

In recent years, safety risks associated with large language models have become increasingly prominent, highlighting the urgent need to mitigate the generation of toxic and harmful content. The mainstream paradigm for LLM safety alignment typically adopts a collaborative framework involving three roles: an attacker for adversarial prompt generation, a defender for safety defense, and an evaluator for response assessment. In this paper, we propose a closed-loop reinforcement learning framework called TriPlay-RL that enables iterative and co-improving collaboration among three roles with near-zero manual annotation. Experimental results show that the attacker preserves high output diversity while achieving a 20%-50% improvement in adversarial effectiveness; the defender attains 10%-30% gains in safety performance without degrading general reasoning capability; and the evaluator continuously refines its fine-grained judgment ability through iterations, accurately distinguishing unsafe responses, simple refusals, and useful guidance. Overall, our framework establishes an efficient and scalable paradigm for LLM safety alignment, enabling continuous co-evolution within a unified learning loop.

</details>

### [Thought-Transfer: Indirect Targeted Poisoning Attacks on Chain-of-Thought Reasoning Models](https://arxiv.org/abs/2601.19061v1)
- **arXiv**: 2601.19061v1
- **Published**: 2026-01-27
- **Stance**: BALANCED
- **Priority**: 2/10
- **Classified by**: Keyword
- **Why read**: LLM reasoning paper (keyword match - verify relevance)

<details>
<summary>Abstract</summary>

Chain-of-Thought (CoT) reasoning has emerged as a powerful technique for enhancing large language models' capabilities by generating intermediate reasoning steps for complex tasks. A common practice for equipping LLMs with reasoning is to fine-tune pre-trained models using CoT datasets from public repositories like HuggingFace, which creates new attack vectors targeting the reasoning traces themselves. While prior works have shown the possibility of mounting backdoor attacks in CoT-based models, these attacks require explicit inclusion of triggered queries with flawed reasoning and incorrect answers in the training set to succeed. Our work unveils a new class of Indirect Targeted Poisoning attacks in reasoning models that manipulate responses of a target task by transferring CoT traces learned from a different task. Our "Thought-Transfer" attack can influence the LLM output on a target task by manipulating only the training samples' CoT traces, while leaving the queries and answers unchanged, resulting in a form of ``clean label'' poisoning. Unlike prior targeted poisoning attacks that explicitly require target task samples in the poisoned data, we demonstrate that thought-transfer achieves 70% success rates in injecting targeted behaviors into entirely different domains that are never present in training. Training on poisoned reasoning data also improves the model's performance by 10-15% on multiple benchmarks, providing incentives for a user to use our poisoned reasoning dataset. Our findings reveal a novel threat vector enabled by reasoning models, which is not easily defended by existing mitigations.

</details>

## New Papers (2026-01-27)

### [Teaching Models to Teach Themselves: Reasoning at the Edge of Learnability](https://arxiv.org/abs/2601.18778v1)
- **arXiv**: 2601.18778v1
- **Published**: 2026-01-26
- **Stance**: BALANCED
- **Priority**: 8/10
- **Classified by**: LLM
- **Why read**: Explores whether models can generate curricula for problems they can't solve - tests if self-improvement requires genuine reasoning or just pattern surfacing.

<details>
<summary>Abstract</summary>

Can a model learn to escape its own learning plateau? Reinforcement learning methods for finetuning large reasoning models stall on datasets with low initial success rates, and thus little training signal. We investigate a fundamental question: Can a pretrained LLM leverage latent knowledge to generate an automated curriculum for problems it cannot solve? To explore this, we design SOAR: A self-improvement framework designed to surface these pedagogical signals through meta-RL. A teacher copy of the model proposes synthetic problems for a student copy, and is rewarded with its improvement on a small subset of hard problems. Critically, SOAR grounds the curriculum in measured student progress rather than intrinsic proxy rewards. Our study on the hardest subsets of mathematical benchmarks (0/128 success) reveals three core findings. First, we show that it is possible to realize bi-level meta-RL that unlocks learning under sparse, binary rewards by sharpening a latent capacity of pretrained models to generate useful stepping stones. Second, grounded rewards outperform intrinsic reward schemes used in prior LLM self-play, reliably avoiding the instability and diversity collapse modes they typically exhibit. Third, analyzing the generated questions reveals that structural quality and well-posedness are more critical for learning progress than solution correctness. Our results suggest that the ability to generate useful stepping stones does not require the preexisting ability to actually solve the hard problems, paving a principled path to escape reasoning plateaus without additional curated data.

</details>

### [Unknown Unknowns: Why Hidden Intentions in LLMs Evade Detection](https://arxiv.org/abs/2601.18552v1)
- **arXiv**: 2601.18552v1
- **Published**: 2026-01-26
- **Stance**: BALANCED
- **Priority**: 8/10
- **Classified by**: LLM
- **Why read**: Shows detection of covert LLM behaviors collapses in realistic settings - relevant to understanding what LLMs actually compute vs. display.

<details>
<summary>Abstract</summary>

LLMs are increasingly embedded in everyday decision-making, yet their outputs can encode subtle, unintended behaviours that shape user beliefs and actions. We refer to these covert, goal-directed behaviours as hidden intentions, which may arise from training and optimisation artefacts, or be deliberately induced by an adversarial developer, yet remain difficult to detect in practice. We introduce a taxonomy of ten categories of hidden intentions, grounded in social science research and organised by intent, mechanism, context, and impact, shifting attention from surface-level behaviours to design-level strategies of influence. We show how hidden intentions can be easily induced in controlled models, providing both testbeds for evaluation and demonstrations of potential misuse. We systematically assess detection methods, including reasoning and non-reasoning LLM judges, and find that detection collapses in realistic open-world settings, particularly under low-prevalence conditions, where false positives overwhelm precision and false negatives conceal true risks. Stress tests on precision-prevalence and precision-FNR trade-offs reveal why auditing fails without vanishingly small false positive rates or strong priors on manipulation types. Finally, a qualitative case study shows that all ten categories manifest in deployed, state-of-the-art LLMs, emphasising the urgent need for robust frameworks. Our work provides the first systematic analysis of detectability failures of hidden intentions in LLMs under open-world settings, offering a foundation for understanding, inducing, and stress-testing such behaviours, and establishing a flexible taxonomy for anticipating evolving threats and informing governance.

</details>

### [POPE: Learning to Reason on Hard Problems via Privileged On-Policy Exploration](https://arxiv.org/abs/2601.18779v1)
- **arXiv**: 2601.18779v1
- **Published**: 2026-01-26
- **Stance**: BALANCED
- **Priority**: 7/10
- **Classified by**: LLM
- **Why read**: Shows RL fails on hard reasoning problems without oracle guidance - tests whether reasoning can emerge vs. needs to be seeded.

<details>
<summary>Abstract</summary>

Reinforcement learning (RL) has improved the reasoning abilities of large language models (LLMs), yet state-of-the-art methods still fail to learn on many training problems. On hard problems, on-policy RL rarely explores even a single correct rollout, yielding zero reward and no learning signal for driving improvement. We find that natural solutions to remedy this exploration problem from classical RL, such as entropy bonuses, more permissive clipping of the importance ratio, or direct optimization of pass@k objectives, do not resolve this issue and often destabilize optimization without improving solvability. A natural alternative is to leverage transfer from easier problems. However, we show that mixing easy and hard problems during RL training is counterproductive due to ray interference, where optimization focuses on already-solvable problems in a way that actively inhibits progress on harder ones. To address this challenge, we introduce Privileged On-Policy Exploration (POPE), an approach that leverages human- or other oracle solutions as privileged information to guide exploration on hard problems, unlike methods that use oracle solutions as training targets (e.g., off-policy RL methods or warmstarting from SFT). POPE augments hard problems with prefixes of oracle solutions, enabling RL to obtain non-zero rewards during guided rollouts. Crucially, the resulting behaviors transfer back to the original, unguided problems through a synergy between instruction-following and reasoning. Empirically, POPE expands the set of solvable problems and substantially improves performance on challenging reasoning benchmarks.

</details>

### [HalluGuard: Demystifying Data-Driven and Reasoning-Driven Hallucinations in LLMs](https://arxiv.org/abs/2601.18753v1)
- **arXiv**: 2601.18753v1
- **Published**: 2026-01-26
- **Stance**: SUPPORTS
- **Priority**: 7/10
- **Classified by**: Keyword
- **Why read**: Decomposes hallucinations into data-driven vs reasoning-driven components - directly relevant to understanding LLM reasoning failures.

<details>
<summary>Abstract</summary>

The reliability of Large Language Models (LLMs) in high-stakes domains such as healthcare, law, and scientific discovery is often compromised by hallucinations. These failures typically stem from two sources: data-driven hallucinations and reasoning-driven hallucinations. However, existing detection methods usually address only one source and rely on task-specific heuristics, limiting their generalization to complex scenarios. To overcome these limitations, we introduce the Hallucination Risk Bound, a unified theoretical framework that formally decomposes hallucination risk into data-driven and reasoning-driven components, linked respectively to training-time mismatches and inference-time instabilities. This provides a principled foundation for analyzing how hallucinations emerge and evolve. Building on this foundation, we introduce HalluGuard, an NTK-based score that leverages the induced geometry and captured representations of the NTK to jointly identify data-driven and reasoning-driven hallucinations. We evaluate HalluGuard on 10 diverse benchmarks, 11 competitive baselines, and 9 popular LLM backbones, consistently achieving state-of-the-art performance in detecting diverse forms of LLM hallucinations.

</details>

### [From Chains to DAGs: Probing the Graph Structure of Reasoning in LLMs](https://arxiv.org/abs/2601.17593v1)
- **arXiv**: 2601.17593v1
- **Published**: 2026-01-24
- **Stance**: BALANCED
- **Priority**: 7/10
- **Classified by**: Keyword
- **Why read**: Probes whether LLM hidden states encode DAG-structured reasoning - tests if reasoning is genuinely compositional or just sequential.

<details>
<summary>Abstract</summary>

Recent progress in large language models has renewed interest in mechanistically characterizing how multi-step reasoning is represented and computed. While much prior work treats reasoning as a linear chain of steps, many reasoning problems are more naturally structured as directed acyclic graphs (DAGs), where intermediate conclusions may depend on multiple premises, branch into parallel sub-derivations, and later merge or be reused. Understanding whether such graph-structured reasoning is reflected in model internals remains an open question. In this work, we introduce Reasoning DAG Probing, a framework that directly asks whether LLM hidden states encode the geometry of a reasoning DAG in a linearly accessible form, and where this structure emerges across layers. Within this framework, we associate each reasoning node with a textual realization and train lightweight probes to predict two graph-theoretic properties from hidden states: node depth and pairwise node distance. We use these probes to analyze the layerwise emergence of DAG structure and evaluate controls that disrupt reasoning-relevant structure while preserving superficial textual properties. Our results provide evidence that reasoning DAG geometry is meaningfully encoded in intermediate layers, with recoverability varying systematically by node depth and model scale, suggesting that LLM reasoning is not only sequential but exhibits measurable internal graph structure.

</details>

### [Oops, Wait: Token-Level Signals as a Lens into LLM Reasoning](https://arxiv.org/abs/2601.17421v1)
- **arXiv**: 2601.17421v1
- **Published**: 2026-01-24
- **Stance**: BALANCED
- **Priority**: 7/10
- **Classified by**: Keyword
- **Why read**: Analyzes "wait" tokens as signals of reasoning - shows models fine-tuned on small data acquire reasoning signals but exploit them only partially.

<details>
<summary>Abstract</summary>

The emergence of discourse-like tokens such as "wait" and "therefore" in large language models (LLMs) has offered a unique window into their reasoning processes. However, systematic analyses of how such signals vary across training strategies and model scales remain lacking. In this paper, we analyze token-level signals through token probabilities across various models. We find that specific tokens strongly correlate with reasoning correctness, varying with training strategies while remaining stable across model scales. A closer look at the "wait" token in relation to answer probability demonstrates that models fine-tuned on small-scale datasets acquire reasoning ability through such signals but exploit them only partially. This work provides a systematic lens to observe and understand the dynamics of LLM reasoning.

</details>

### [UniCog: Uncovering Cognitive Abilities of LLMs through Latent Mind Space Analysis](https://arxiv.org/abs/2601.17897v1)
- **arXiv**: 2601.17897v1
- **Published**: 2026-01-25
- **Stance**: SUPPORTS
- **Priority**: 6/10
- **Classified by**: Keyword
- **Why read**: Reveals "Pareto principle of LLM cognition" - shared reasoning core with ability-specific signatures; failures manifest as anomalous latent activations.

<details>
<summary>Abstract</summary>

A growing body of research suggests that the cognitive processes of large language models (LLMs) differ fundamentally from those of humans. However, existing interpretability methods remain limited in explaining how cognitive abilities are engaged during LLM reasoning. In this paper, we propose UniCog, a unified framework that analyzes LLM cognition via a latent mind space. Formulated as a latent variable model, UniCog encodes diverse abilities from dense model activations into sparse, disentangled latent dimensions. Through extensive analysis on six advanced LLMs, including DeepSeek-V3.2 and GPT-4o, we reveal a Pareto principle of LLM cognition, where a shared reasoning core is complemented by ability-specific signatures. Furthermore, we discover that reasoning failures often manifest as anomalous intensity in latent activations. These findings opens a new paradigm in LLM analysis, providing a cognition grounded view of reasoning dynamics. Finally, leveraging these insights, we introduce a latent-informed candidate prioritization strategy, which improves reasoning performance by up to 7.5% across challenging benchmarks. Our code is available at https://github.com/milksalute/unicog.

</details>

### [Code over Words: Overcoming Semantic Inertia via Code-Grounded Reasoning](https://arxiv.org/abs/2601.18352v1)
- **arXiv**: 2601.18352v1
- **Published**: 2026-01-26
- **Stance**: SUPPORTS
- **Priority**: 6/10
- **Classified by**: Keyword
- **Why read**: Shows larger models exhibit INVERSE scaling when reasoning requires suppressing pre-trained priors - directly supports pattern matching thesis.

<details>
<summary>Abstract</summary>

LLMs struggle with Semantic Inertia: the inability to inhibit pre-trained priors (e.g., "Lava is Dangerous") when dynamic, in-context rules contradict them. We probe this phenomenon using Baba Is You, where physical laws are mutable text rules, enabling precise evaluation of models' ability to override learned priors when rules change. We quantatively observe that larger models can exhibit inverse scaling: they perform worse than smaller models when natural language reasoning requires suppressing pre-trained associations (e.g., accepting "Lava is Safe"). Our analysis attributes this to natural language encoding, which entangles descriptive semantics and logical rules, leading to persistent hallucinations of familiar physics despite explicit contradictory rules. Here we show that representing dynamics as executable code, rather than descriptive text, reverses this trend and enables effective prior inhibition. We introduce Code-Grounded Vistas (LCV), which fine-tunes models on counterfactual pairs and identifies states with contradictory rules, thereby forcing attention to logical constraints rather than visual semantics. This training-time approach outperforms expensive inference-time search methods in both efficiency and accuracy. Our results demonstrate that representation fundamentally determines whether scaling improves or impairs contextual reasoning. This challenges the assumption that larger models are universally better, with implications for domains that require dynamic overriding of learned priors.

</details>

### [A Syllogistic Probe: Tracing the Evolution of Logic Reasoning in Large Language Models](https://arxiv.org/abs/2601.17426v1)
- **arXiv**: 2601.17426v1
- **Published**: 2026-01-24
- **Stance**: BALANCED
- **Priority**: 6/10
- **Classified by**: Keyword
- **Why read**: Tests syllogistic reasoning evolution - finds scaling promotes shift toward modern logic, thinking accelerates beyond parameter scaling.

<details>
<summary>Abstract</summary>

Human logic has gradually shifted from intuition-driven inference to rigorous formal systems. Motivated by recent advances in large language models (LLMs), we explore whether LLMs exhibit a similar evolution in the underlying logical framework. Using existential import as a probe, we for evaluate syllogism under traditional and modern logic. Through extensive experiments of testing SOTA LLMs on a new syllogism dataset, we have some interesting findings: (i) Model size scaling promotes the shift toward modern logic; (ii) Thinking serves as an efficient accelerator beyond parameter scaling; (iii) the Base model plays a crucial role in determining how easily and stably this shift can emerge. Beyond these core factors, we conduct additional experiments for in-depth analysis of properties of current LLMs on syllogistic reasoning.

</details>

### [On the Emergence and Test-Time Use of Structural Information in Large Language Models](https://arxiv.org/abs/2601.17869v1)
- **arXiv**: 2601.17869v1
- **Published**: 2026-01-25
- **Stance**: BALANCED
- **Priority**: 6/10
- **Classified by**: Keyword
- **Why read**: Tests compositional generation from learned structures - shows emergence correlates with complex reasoning but test-time compositional generation remains limited.

<details>
<summary>Abstract</summary>

Learning structural information from observational data is central to producing new knowledge outside the training corpus. This holds for mechanistic understanding in scientific discovery as well as flexible test-time compositional generation. We thus study how language models learn abstract structures and utilize the learnt structural information at test-time. To ensure a controlled setup, we design a natural language dataset based on linguistic structural transformations. We empirically show that the emergence of learning structural information correlates with complex reasoning tasks, and that the ability to perform test-time compositional generation remains limited.

</details>

### [Sparks of Cooperative Reasoning: LLMs as Strategic Hanabi Agents](https://arxiv.org/abs/2601.18077v1)
- **arXiv**: 2601.18077v1
- **Published**: 2026-01-26
- **Stance**: BALANCED
- **Priority**: 5/10
- **Classified by**: Keyword
- **Why read**: Tests theory-of-mind reasoning in Hanabi game - strongest reasoning models still trail humans; RL fine-tuning improves but doesn't close gap.

<details>
<summary>Abstract</summary>

Cooperative reasoning under incomplete information remains challenging for both humans and multi-agent systems. The card game Hanabi embodies this challenge, requiring theory-of-mind reasoning and strategic communication. We benchmark 17 state-of-the-art LLM agents in 2-5 player games and study the impact of context engineering across model scales (4B to 600B+) to understand persistent coordination failures and robustness to scaffolding: from a minimal prompt with only explicit card details (Watson setting), to scaffolding with programmatic, Bayesian-motivated deductions (Sherlock setting), to multi-turn state tracking via working memory (Mycroft setting). We show that (1) agents can maintain an internal working memory for state tracking and (2) cross-play performance between different LLMs smoothly interpolates with model strength. In the Sherlock setting, the strongest reasoning models exceed 15 points on average across player counts, yet still trail experienced humans and specialist Hanabi agents, both consistently scoring above 20. We release the first public Hanabi datasets with annotated trajectories and move utilities: (1) HanabiLogs, containing 1,520 full game logs for instruction tuning, and (2) HanabiRewards, containing 560 games with dense move-level value annotations for all candidate moves. Supervised and RL finetuning of a 4B open-weight model (Qwen3-Instruct) on our datasets improves cooperative Hanabi play by 21% and 156% respectively, bringing performance to within ~3 points of a strong proprietary reasoning model (o4-mini) and surpassing the best non-reasoning model (GPT-4.1) by 52%. The HanabiRewards RL-finetuned model further generalizes beyond Hanabi, improving performance on a cooperative group-guessing benchmark by 11%, temporal reasoning on EventQA by 6.4%, instruction-following on IFBench-800K by 1.7 Pass@10, and matching AIME 2025 mathematical reasoning Pass@10.

</details>

### [From LLMs to LRMs: Rethinking Pruning for Reasoning-Centric Models](https://arxiv.org/abs/2601.18091v1)
- **arXiv**: 2601.18091v1
- **Published**: 2026-01-26
- **Stance**: BALANCED
- **Priority**: 5/10
- **Classified by**: Keyword
- **Why read**: Studies how pruning affects reasoning models differently - relevant to understanding what components enable reasoning.

<details>
<summary>Abstract</summary>

The rise of Large Reasoning Models (LRMs) marks a paradigm shift from pattern-matching toward deliberate, multi-step reasoning. Yet the field still lacks systematic study of how such models behave under compression. We present the first comprehensive analysis of pruning techniques across diverse LRMs. Our findings challenge conventional wisdom: reasoning-optimized models exhibit distinct vulnerability patterns, with certain pruning strategies that work well for general LLMs actually degrading reasoning capabilities. We identify critical factors for maintaining reasoning integrity under compression and propose practical guidelines for efficient LRM deployment. Our analysis reveals that the architectural and training differences in LRMs create unique compression challenges that require rethinking traditional pruning approaches.

</details>

### [A Comprehensive Evaluation of LLM Reasoning: From Single-Model to Multi-Agent Paradigms](https://arxiv.org/abs/2601.13243)
- **arXiv**: 2601.13243
- **Stance**: BALANCED
- **Why read**: Unified evaluation of reasoning paradigms including CoT and multi-agent

<details>
<summary>Abstract</summary>

We present a comprehensive evaluation framework for LLM reasoning capabilities, spanning single-model approaches like chain-of-thought to multi-agent systems. Our evaluation covers multiple reasoning domains and paradigms.

</details>

### [InT: Self-Proposed Interventions Enable Credit Assignment in LLM Reasoning](https://arxiv.org/abs/2601.14209)
- **arXiv**: 2601.14209
- **Stance**: SUPPORTS
- **Why read**: Shows standard RL can't distinguish correct vs incorrect intermediate steps

<details>
<summary>Abstract</summary>

We show that standard reinforcement learning approaches cannot reliably distinguish between correct and incorrect intermediate reasoning steps. We propose interventions that enable proper credit assignment in LLM reasoning.

</details>

### [Failure Modes in Multi-Hop QA: The Weakest Link Law and the Recognition Bottleneck](https://arxiv.org/abs/2601.12499)
- **arXiv**: 2601.12499
- **Stance**: SUPPORTS
- **Why read**: Identifies recognition vs synthesis failure in multi-hop reasoning

<details>
<summary>Abstract</summary>

We identify two key failure modes in multi-hop question answering: the weakest link law (where performance is bounded by the weakest reasoning step) and the recognition bottleneck (where retrieval failures cascade into reasoning failures).

</details>

### [Tracking the Limits of Knowledge Propagation: How LLMs Fail at Multi-Step Reasoning with Conflicting Knowledge](https://arxiv.org/abs/2601.15495)
- **arXiv**: 2601.15495
- **Stance**: SUPPORTS
- **Why read**: Tests knowledge propagation failures in multi-step reasoning

<details>
<summary>Abstract</summary>

We investigate how LLMs fail to properly propagate knowledge through multi-step reasoning chains, especially when different pieces of knowledge conflict. We track where and how these propagation failures occur.

</details>

### [Confidence over Time: Confidence Calibration with Temporal Logic for Large Language Model Reasoning](https://arxiv.org/abs/2601.13387)
- **arXiv**: 2601.13387
- **Stance**: SUPPORTS
- **Why read**: Shows confidence estimation ignores how reasoning evolves

<details>
<summary>Abstract</summary>

We show that standard confidence estimation methods fail to account for how reasoning evolves over multiple steps. We propose a temporal logic framework for better calibrated confidence in LLM reasoning.

</details>

---

## Triage Log

| Date | Paper | Decision | Reason |
|------|-------|----------|--------|
| | | | |
