# Papers to Evaluate

Raw auto-discovered papers awaiting triage. Review and promote relevant ones to `toread.md`.

**Last updated**: 2026-02-01
**Last triage**: 2026-01-31

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

## New Papers (2026-02-01)

### [Mil-SCORE: Benchmarking Long-Context Geospatial Reasoning and Planning in Large Language Models](https://arxiv.org/abs/2601.21826v1)
- **arXiv**: 2601.21826v1
- **Published**: 2026-01-29
- **Stance**: BALANCED
- **Priority**: 8/10
- **Classified by**: LLM
- **Why read**: This paper introduces a complex, multi-hop reasoning benchmark in a realistic scenario, providing insights into LLMs' reasoning capabilities and limitations in long-context, multi-modal tasks.

<details>
<summary>Abstract</summary>

As large language models (LLMs) are applied to increasingly longer and more complex tasks, there is a growing need for realistic long-context benchmarks that require selective reading and integration of heterogeneous, multi-modal information sources. This need is especially acute for geospatial planning problems, such as those found in planning for large-scale military operations, which demand fast and accurate reasoning over maps, orders, intelligence reports, and other distributed data. To address this gap, we present MilSCORE (Military Scenario Contextual Reasoning), to our knowledge the first scenario-level dataset of expert-authored, multi-hop questions grounded in a complex, simulated military planning scenario used for training. MilSCORE is designed to evaluate high-stakes decision-making and planning, probing LLMs' ability to combine tactical and spatial reasoning across multiple sources and to reason over long-horizon, geospatially rich context. The benchmark includes a diverse set of question types across seven categories targeting both factual recall and multi-step reasoning about constraints, strategy, and spatial analysis. We provide an evaluation protocol and report baseline results for a range of contemporary vision-language models. Our findings highlight substantial headroom on MilSCORE, indicating that current systems struggle with realistic, scenario-level long-context planning, and positioning MilSCORE as a challenging testbed for future work.

</details>

### [UEval: A Benchmark for Unified Multimodal Generation](https://arxiv.org/abs/2601.22155v1)
- **arXiv**: 2601.22155v1
- **Published**: 2026-01-29
- **Stance**: BALANCED
- **Priority**: 7/10
- **Classified by**: LLM
- **Why read**: This paper evaluates the reasoning capabilities of multimodal models, highlighting the importance of reasoning and the limitations of current models, which aligns with the thesis that LLM reasoning is pattern-based and surface-level.

<details>
<summary>Abstract</summary>

We introduce UEval, a benchmark to evaluate unified models, i.e., models capable of generating both images and text. UEval comprises 1,000 expert-curated questions that require both images and text in the model output, sourced from 8 real-world tasks. Our curated questions cover a wide range of reasoning types, from step-by-step guides to textbook explanations. Evaluating open-ended multimodal generation is non-trivial, as simple LLM-as-a-judge methods can miss the subtleties. Different from previous works that rely on multimodal Large Language Models (MLLMs) to rate image quality or text accuracy, we design a rubric-based scoring system in UEval. For each question, reference images and text answers are provided to a MLLM to generate an initial rubric, consisting of multiple evaluation criteria, and human experts then refine and validate these rubrics. In total, UEval contains 10,417 validated rubric criteria, enabling scalable and fine-grained automatic scoring. UEval is challenging for current unified models: GPT-5-Thinking scores only 66.4 out of 100, while the best open-source model reaches merely 49.1. We observe that reasoning models often outperform non-reasoning ones, and transferring reasoning traces from a reasoning model to a non-reasoning model significantly narrows the gap. This suggests that reasoning may be important for tasks requiring complex multimodal understanding and generation.

</details>

### [Exploring Reasoning Reward Model for Agents](https://arxiv.org/abs/2601.22154v1)
- **arXiv**: 2601.22154v1
- **Published**: 2026-01-29
- **Stance**: BALANCED
- **Priority**: 7/10
- **Classified by**: LLM
- **Why read**: This paper explores structured feedback mechanisms in agentic RL that enhance reasoning performance, providing insights into the nature of LLM reasoning and its reliance on pattern-based evaluation.

<details>
<summary>Abstract</summary>

Agentic Reinforcement Learning (Agentic RL) has achieved notable success in enabling agents to perform complex reasoning and tool use. However, most methods still relies on sparse outcome-based reward for training. Such feedback fails to differentiate intermediate reasoning quality, leading to suboptimal training results. In this paper, we introduce Agent Reasoning Reward Model (Agent-RRM), a multi-faceted reward model that produces structured feedback for agentic trajectories, including (1) an explicit reasoning trace , (2) a focused critique that provides refinement guidance by highlighting reasoning flaws, and (3) an overall score that evaluates process performance. Leveraging these signals, we systematically investigate three integration strategies: Reagent-C (text-augmented refinement), Reagent-R (reward-augmented guidance), and Reagent-U (unified feedback integration). Extensive evaluations across 12 diverse benchmarks demonstrate that Reagent-U yields substantial performance leaps, achieving 43.7% on GAIA and 46.2% on WebWalkerQA, validating the effectiveness of our reasoning reward model and training schemes. Code, models, and datasets are all released to facilitate future research.

</details>

### [Token-Guard: Towards Token-Level Hallucination Control via Self-Checking Decoding](https://arxiv.org/abs/2601.21969v1)
- **arXiv**: 2601.21969v1
- **Published**: 2026-01-29
- **Stance**: BALANCED
- **Priority**: 7/10
- **Classified by**: LLM
- **Why read**: This paper explores hallucination mitigation techniques that relate to LLM reasoning, providing insights into the practical limitations of current models and their reliance on pattern matching.

<details>
<summary>Abstract</summary>

Large Language Models (LLMs) often hallucinate, generating content inconsistent with the input. Retrieval-Augmented Generation (RAG) and Reinforcement Learning with Human Feedback (RLHF) can mitigate hallucinations but require resource-intensive retrieval or large-scale fine-tuning. Decoding-based methods are lighter yet lack explicit hallucination control. To address this, we present Token-Guard, a token-level hallucination control method based on self-checking decoding. Token-Guard performs internal verification at each reasoning step to detect hallucinated tokens before they propagate. Candidate fragments are further evaluated in a latent space with explicit hallucination risk scoring, while iterative pruning and regeneration dynamically correct detected errors. Experiments on HALU datasets show Token-Guard substantially reduces hallucinations and improves generation accuracy, offering a scalable, modular solution for reliable LLM outputs. Our code is publicly available.

</details>

### [ProRAG: Process-Supervised Reinforcement Learning for Retrieval-Augmented Generation](https://arxiv.org/abs/2601.21912v1)
- **arXiv**: 2601.21912v1
- **Published**: 2026-01-29
- **Stance**: BALANCED
- **Priority**: 7/10
- **Classified by**: LLM
- **Why read**: This paper explores reinforcement learning approaches that incorporate step-level supervision to improve reasoning in retrieval-augmented generation, providing insights into the capabilities and limitations of LLM reasoning processes.

<details>
<summary>Abstract</summary>

Reinforcement learning (RL) has become a promising paradigm for optimizing Retrieval-Augmented Generation (RAG) in complex reasoning tasks. However, traditional outcome-based RL approaches often suffer from reward sparsity and inefficient credit assignment, as coarse-grained scalar rewards fail to identify specific erroneous steps within long-horizon trajectories. This ambiguity frequently leads to "process hallucinations", where models reach correct answers through flawed logic or redundant retrieval steps. Although recent process-aware approaches attempt to mitigate this via static preference learning or heuristic reward shaping, they often lack the on-policy exploration capabilities required to decouple step-level credit from global outcomes. To address these challenges, we propose ProRAG, a process-supervised reinforcement learning framework designed to integrate learned step-level supervision into the online optimization loop. Our framework consists of four stages: (1) Supervised Policy Warmup to initialize the model with a structured reasoning format; (2) construction of an MCTS-based Process Reward Model (PRM) to quantify intermediate reasoning quality; (3) PRM-Guided Reasoning Refinement to align the policy with fine-grained process preferences; and (4) Process-Supervised Reinforcement Learning with a dual-granularity advantage mechanism. By aggregating step-level process rewards with global outcome signals, ProRAG provides precise feedback for every action. Extensive experiments on five multi-hop reasoning benchmarks demonstrate that ProRAG achieves superior overall performance compared to strong outcome-based and process-aware RL baselines, particularly on complex long-horizon tasks, validating the effectiveness of fine-grained process supervision. The code and model are available at https://github.com/lilinwz/ProRAG.

</details>

### [From Meta-Thought to Execution: Cognitively Aligned Post-Training for Generalizable and Reliable LLM Reasoning](https://arxiv.org/abs/2601.21909v1)
- **arXiv**: 2601.21909v1
- **Published**: 2026-01-29
- **Stance**: BALANCED
- **Priority**: 7/10
- **Classified by**: LLM
- **Why read**: This paper explores a cognitively-inspired training framework that emphasizes abstract reasoning strategies, providing insights into the nature of LLM reasoning and its reliance on pattern-based learning.

<details>
<summary>Abstract</summary>

Current LLM post-training methods optimize complete reasoning trajectories through Supervised Fine-Tuning (SFT) followed by outcome-based Reinforcement Learning (RL). While effective, a closer examination reveals a fundamental gap: this approach does not align with how humans actually solve problems. Human cognition naturally decomposes problem-solving into two distinct stages: first acquiring abstract strategies (i.e., meta-knowledge) that generalize across problems, then adapting them to specific instances. In contrast, by treating complete trajectories as basic units, current methods are inherently problem-centric, entangling abstract strategies with problem-specific execution. To address this misalignment, we propose a cognitively-inspired framework that explicitly mirrors the two-stage human cognitive process. Specifically, Chain-of-Meta-Thought (CoMT) focuses supervised learning on abstract reasoning patterns without specific executions, enabling acquisition of generalizable strategies. Confidence-Calibrated Reinforcement Learning (CCRL) then optimizes task adaptation via confidence-aware rewards on intermediate steps, preventing overconfident errors from cascading and improving execution reliability. Experiments across four models and eight benchmarks show 2.19\% and 4.63\% improvements in-distribution and out-of-distribution respectively over standard methods, while reducing training time by 65-70% and token consumption by 50%, demonstrating that aligning post-training with human cognitive principles yields not only superior generalization but also enhanced training efficiency.

</details>

### [Embodied Task Planning via Graph-Informed Action Generation with Large Lanaguage Model](https://arxiv.org/abs/2601.21841v1)
- **arXiv**: 2601.21841v1
- **Published**: 2026-01-29
- **Stance**: BALANCED
- **Priority**: 7/10
- **Classified by**: LLM
- **Why read**: This paper explores the limitations of LLMs in long-horizon embodied planning and proposes a hybrid approach that combines pattern-based reasoning with structured memory, providing insights into the practical capabilities and constraints of LLM reasoning.

<details>
<summary>Abstract</summary>

While Large Language Models (LLMs) have demonstrated strong zero-shot reasoning capabilities, their deployment as embodied agents still faces fundamental challenges in long-horizon planning. Unlike open-ended text generation, embodied agents must decompose high-level intent into actionable sub-goals while strictly adhering to the logic of a dynamic, observed environment. Standard LLM planners frequently fail to maintain strategy coherence over extended horizons due to context window limitation or hallucinate transitions that violate constraints. We propose GiG, a novel planning framework that structures embodied agents' memory using a Graph-in-Graph architecture. Our approach employs a Graph Neural Network (GNN) to encode environmental states into embeddings, organizing these embeddings into action-connected execution trace graphs within an experience memory bank. By clustering these graph embeddings, the framework enables retrieval of structure-aware priors, allowing agents to ground current decisions in relevant past structural patterns. Furthermore, we introduce a novel bounded lookahead module that leverages symbolic transition logic to enhance the agents' planning capabilities through the grounded action projection. We evaluate our framework on three embodied planning benchmarks-Robotouille Synchronous, Robotouille Asynchronous, and ALFWorld. Our method outperforms state-of-the-art baselines, achieving Pass@1 performance gains of up to 22% on Robotouille Synchronous, 37% on Asynchronous, and 15% on ALFWorld with comparable or lower computational cost.

</details>

### [Adaptive Confidence Gating in Multi-Agent Collaboration for Efficient and Optimized Code Generation](https://arxiv.org/abs/2601.21469v1)
- **arXiv**: 2601.21469v1
- **Published**: 2026-01-29
- **Stance**: SUPPORTS
- **Priority**: 5/10
- **Classified by**: Keyword
- **Why read**: LLM reasoning paper (keyword match - verify relevance)

<details>
<summary>Abstract</summary>

While Large Language Models (LLMs) have catalyzed breakthroughs in automated code generation, Small Language Models (SLMs) often encounter reasoning bottlenecks and failure loops when addressing complex logical requirements. To overcome these challenges, we propose DebateCoder, a multi-agent collaborative framework designed to improve the reasoning ability of SLMs (e.g., Pangu-1B) in resource-constrained environments. DebateCoder uses a structured role-playing protocol with three agents: User Agent (A_UA), Technical Agent (A_TA), and Quality Assurance Agent (A_QA). It also includes an Adaptive Confidence Gating mechanism with a 95% threshold to balance accuracy and inference efficiency. In addition, we introduce a multi-turn deliberation module and a reviewer-guided analytical debugging loop for orthogonal pre-generation debate and post-generation refinement. Experiments on HumanEval and MBPP show that DebateCoder achieves 70.12% Pass@1 on HumanEval, outperforming MapCoder while reducing API overhead by about 35%. These results indicate that collaborative protocols can mitigate limitations of small-parameter models and provide a scalable, efficient approach to high-quality automated software engineering.

</details>

### [Optimizing Agentic Workflows using Meta-tools](https://arxiv.org/abs/2601.22037v1)
- **arXiv**: 2601.22037v1
- **Published**: 2026-01-29
- **Stance**: SUPPORTS
- **Priority**: 4/10
- **Classified by**: Keyword
- **Why read**: LLM reasoning paper (keyword match - verify relevance)

<details>
<summary>Abstract</summary>

Agentic AI enables LLM to dynamically reason, plan, and interact with tools to solve complex tasks. However, agentic workflows often require many iterative reasoning steps and tool invocations, leading to significant operational expense, end-to-end latency and failures due to hallucinations. This work introduces Agent Workflow Optimization (AWO), a framework that identifies and optimizes redundant tool execution patterns to improve the efficiency and robustness of agentic workflows. AWO analyzes existing workflow traces to discover recurring sequences of tool calls and transforms them into meta-tools, which are deterministic, composite tools that bundle multiple agent actions into a single invocation. Meta-tools bypass unnecessary intermediate LLM reasoning steps and reduce operational cost while also shortening execution paths, leading to fewer failures. Experiments on two agentic AI benchmarks show that AWO reduces the number of LLM calls up to 11.9% while also increasing the task success rate by up to 4.2 percent points.

</details>

### [Thinking Broad, Acting Fast: Latent Reasoning Distillation from Multi-Perspective Chain-of-Thought for E-Commerce Relevance](https://arxiv.org/abs/2601.21611v1)
- **arXiv**: 2601.21611v1
- **Published**: 2026-01-29
- **Stance**: SUPPORTS
- **Priority**: 3/10
- **Classified by**: Keyword
- **Why read**: LLM reasoning paper (keyword match - verify relevance)

<details>
<summary>Abstract</summary>

Effective relevance modeling is crucial for e-commerce search, as it aligns search results with user intent and enhances customer experience. Recent work has leveraged large language models (LLMs) to address the limitations of traditional relevance models, especially for long-tail and ambiguous queries. By incorporating Chain-of-Thought (CoT) reasoning, these approaches improve both accuracy and interpretability through multi-step reasoning. However, two key limitations remain: (1) most existing approaches rely on single-perspective CoT reasoning, which fails to capture the multifaceted nature of e-commerce relevance (e.g., user intent vs. attribute-level matching vs. business-specific rules); and (2) although CoT-enhanced LLM's offer rich reasoning capabilities, their high inference latency necessitates knowledge distillation for real-time deployment, yet current distillation methods discard the CoT rationale structure at inference, using it as a transient auxiliary signal and forfeiting its reasoning utility. To address these challenges, we propose a novel framework that better exploits CoT semantics throughout the optimization pipeline. Specifically, the teacher model leverages Multi-Perspective CoT (MPCoT) to generate diverse rationales and combines Supervised Fine-Tuning (SFT) with Direct Preference Optimization (DPO) to construct a more robust reasoner. For distillation, we introduce Latent Reasoning Knowledge Distillation (LRKD), which endows a student model with a lightweight inference-time latent reasoning extractor, allowing efficient and low-latency internalization of the LLM's sophisticated reasoning capabilities. Evaluated in offline experiments and online A/B tests on an e-commerce search advertising platform serving tens of millions of users daily, our method delivers significant offline gains, showing clear benefits in both commercial performance and user experience.

</details>

### [TACLer: Tailored Curriculum Reinforcement Learning for Efficient Reasoning](https://arxiv.org/abs/2601.21711v1)
- **arXiv**: 2601.21711v1
- **Published**: 2026-01-29
- **Stance**: BALANCED
- **Priority**: 2/10
- **Classified by**: Keyword
- **Why read**: LLM reasoning paper (keyword match - verify relevance)

<details>
<summary>Abstract</summary>

Large Language Models (LLMs) have shown remarkable performance on complex reasoning tasks, especially when equipped with long chain-of-thought (CoT) reasoning. However, eliciting long CoT typically requires large-scale reinforcement learning (RL) training, while often leading to overthinking with redundant intermediate steps. To improve learning and reasoning efficiency, while preserving or even enhancing performance, we propose TACLer, a model-tailored curriculum reinforcement learning framework that gradually increases the complexity of the data based on the model's proficiency in multi-stage RL training. TACLer features two core components: (i) tailored curriculum learning that determines what knowledge the model lacks and needs to learn in progressive stages; (ii) a hybrid Thinking/NoThinking reasoning paradigm that balances accuracy and efficiency by enabling or disabling the Thinking mode. Our experiments show that TACLer yields a twofold advantage in learning and reasoning: (i) it reduces computational cost, cutting training compute by over 50% compared to long thinking models and reducing inference token usage by over 42% relative to the base model; and (ii) it improves accuracy by over 9% on the base model, consistently outperforming state-of-the-art Nothinking and Thinking baselines across four math datasets with complex problems.

</details>

### [Breaking the Overscaling Curse: Thinking Parallelism Before Parallel Thinking](https://arxiv.org/abs/2601.21619v1)
- **arXiv**: 2601.21619v1
- **Published**: 2026-01-29
- **Stance**: BALANCED
- **Priority**: 2/10
- **Classified by**: Keyword
- **Why read**: LLM reasoning paper (keyword match - verify relevance)

<details>
<summary>Abstract</summary>

Parallel thinking enhances LLM reasoning by multi-path sampling and aggregation. In system-level evaluations, a global parallelism level N is allocated to all samples, typically set large to maximize overall dataset accuracy. However, due to sample heterogeneity, some samples can achieve comparable performance with a smaller N'< N, causing budget redundancy. This incompatibility between system-level efficacy and sample-level efficiency constitutes the overscaling curse. In this paper, we formalize and quantify the overscaling curse, showing its universality and severity in practice, and analyze its trigger mechanism. We then propose a lightweight method, T2, to break the overscaling curse, which utilizes latent representations to estimate the optimal parallelism level for each sample before decoding. Experiments show that T2 significantly reduces cost while maintaining comparable performance, enabling more efficient parallel thinking.

</details>

### [ASTRA: Automated Synthesis of agentic Trajectories and Reinforcement Arenas](https://arxiv.org/abs/2601.21558v1)
- **arXiv**: 2601.21558v1
- **Published**: 2026-01-29
- **Stance**: BALANCED
- **Priority**: 2/10
- **Classified by**: Keyword
- **Why read**: LLM reasoning paper (keyword match - verify relevance)

<details>
<summary>Abstract</summary>

Large language models (LLMs) are increasingly used as tool-augmented agents for multi-step decision making, yet training robust tool-using agents remains challenging. Existing methods still require manual intervention, depend on non-verifiable simulated environments, rely exclusively on either supervised fine-tuning (SFT) or reinforcement learning (RL), and struggle with stable long-horizon, multi-turn learning. To address these challenges, we introduce ASTRA, a fully automated end-to-end framework for training tool-augmented language model agents via scalable data synthesis and verifiable reinforcement learning. ASTRA integrates two complementary components. First, a pipeline that leverages the static topology of tool-call graphs synthesizes diverse, structurally grounded trajectories, instilling broad and transferable tool-use competence. Second, an environment synthesis framework that captures the rich, compositional topology of human semantic reasoning converts decomposed question-answer traces into independent, code-executable, and rule-verifiable environments, enabling deterministic multi-turn RL. Based on this method, we develop a unified training methodology that integrates SFT with online RL using trajectory-level rewards to balance task completion and interaction efficiency. Experiments on multiple agentic tool-use benchmarks demonstrate that ASTRA-trained models achieve state-of-the-art performance at comparable scales, approaching closed-source systems while preserving core reasoning ability. We release the full pipelines, environments, and trained models at https://github.com/LianjiaTech/astra.

</details>

### [System 1&2 Synergy via Dynamic Model Interpolation](https://arxiv.org/abs/2601.21414v1)
- **arXiv**: 2601.21414v1
- **Published**: 2026-01-29
- **Stance**: BALANCED
- **Priority**: 2/10
- **Classified by**: Keyword
- **Why read**: LLM reasoning paper (keyword match - verify relevance)

<details>
<summary>Abstract</summary>

Training a unified language model that adapts between intuitive System 1 and deliberative System 2 remains challenging due to interference between their cognitive modes. Recent studies have thus pursued making System 2 models more efficient. However, these approaches focused on output control, limiting what models produce. We argue that this paradigm is misaligned: output length is merely a symptom of the model's cognitive configuration, not the root cause. In this work, we shift the focus to capability control, which modulates \textit{how models think} rather than \textit{what they produce}. To realize this, we leverage existing Instruct and Thinking checkpoints through dynamic parameter interpolation, without additional training. Our pilot study establishes that linear interpolation yields a convex, monotonic Pareto frontier, underpinned by representation continuity and structural connectivity. Building on this, we propose \textbf{DAMI} (\textbf{D}yn\textbf{A}mic \textbf{M}odel \textbf{I}nterpolation), a framework that estimates a query-specific Reasoning Intensity $λ(q)$ to configure cognitive depth. For training-based estimation, we develop a preference learning method encoding accuracy and efficiency criteria. For zero-shot deployment, we introduce a confidence-based method leveraging inter-model cognitive discrepancy. Experiments on five mathematical reasoning benchmarks demonstrate that DAMI achieves higher accuracy than the Thinking model while remaining efficient, effectively combining the efficiency of System 1 with the reasoning depth of System 2.

</details>

### [AgenticSimLaw: A Juvenile Courtroom Multi-Agent Debate Simulation for Explainable High-Stakes Tabular Decision Making](https://arxiv.org/abs/2601.21936v1)
- **arXiv**: 2601.21936v1
- **Published**: 2026-01-29
- **Stance**: BALANCED
- **Priority**: 2/10
- **Classified by**: Keyword
- **Why read**: LLM reasoning paper (keyword match - verify relevance)

<details>
<summary>Abstract</summary>

We introduce AgenticSimLaw, a role-structured, multi-agent debate framework that provides transparent and controllable test-time reasoning for high-stakes tabular decision-making tasks. Unlike black-box approaches, our courtroom-style orchestration explicitly defines agent roles (prosecutor, defense, judge), interaction protocols (7-turn structured debate), and private reasoning strategies, creating a fully auditable decision-making process. We benchmark this framework on young adult recidivism prediction using the NLSY97 dataset, comparing it against traditional chain-of-thought (CoT) prompting across almost 90 unique combinations of models and strategies. Our results demonstrate that structured multi-agent debate provides more stable and generalizable performance compared to single-agent reasoning, with stronger correlation between accuracy and F1-score metrics. Beyond performance improvements, AgenticSimLaw offers fine-grained control over reasoning steps, generates complete interaction transcripts for explainability, and enables systematic profiling of agent behaviors. While we instantiate this framework in the criminal justice domain to stress-test reasoning under ethical complexity, the approach generalizes to any deliberative, high-stakes decision task requiring transparency and human oversight. This work addresses key LLM-based multi-agent system challenges: organization through structured roles, observability through logged interactions, and responsibility through explicit non-deployment constraints for sensitive domains. Data, results, and code will be available on github.com under the MIT license.

</details>

### [Test-Time Compute Games](https://arxiv.org/abs/2601.21839v1)
- **arXiv**: 2601.21839v1
- **Published**: 2026-01-29
- **Stance**: BALANCED
- **Priority**: 2/10
- **Classified by**: Keyword
- **Why read**: LLM reasoning paper (keyword match - verify relevance)

<details>
<summary>Abstract</summary>

Test-time compute has emerged as a promising strategy to enhance the reasoning abilities of large language models (LLMs). However, this strategy has in turn increased how much users pay cloud-based providers offering LLM-as-a-service, since providers charge users for the amount of test-time compute they use to generate an output. In our work, we show that the market of LLM-as-a-service is socially inefficient: providers have a financial incentive to increase the amount of test-time compute, even if this increase contributes little to the quality of the outputs. To address this inefficiency, we introduce a reverse second-price auction mechanism where providers bid their offered price and (expected) quality for the opportunity to serve a user, and users pay proportionally to the marginal value generated by the winning provider relative to the second-highest bidder. To illustrate and complement our theoretical results, we conduct experiments with multiple instruct models from the $\texttt{Llama}$ and $\texttt{Qwen}$ families, as well as reasoning models distilled from $\texttt{DeepSeek-R1}$, on math and science benchmark datasets.

</details>

### [Beyond Imitation: Reinforcement Learning for Active Latent Planning](https://arxiv.org/abs/2601.21598v1)
- **arXiv**: 2601.21598v1
- **Published**: 2026-01-29
- **Stance**: BALANCED
- **Priority**: 2/10
- **Classified by**: Keyword
- **Why read**: LLM reasoning paper (keyword match - verify relevance)

<details>
<summary>Abstract</summary>

Aiming at efficient and dense chain-of-thought (CoT) reasoning, latent reasoning methods fine-tune Large Language Models (LLMs) to substitute discrete language tokens with continuous latent tokens. These methods consume fewer tokens compared to the conventional language CoT reasoning and have the potential to plan in a dense latent space. However, current latent tokens are generally supervised based on imitating language labels. Considering that there can be multiple equivalent but diverse CoT labels for a question, passively imitating an arbitrary one may lead to inferior latent token representations and latent reasoning policies, undermining the potential planning ability and resulting in clear gaps between training and testing. In this work, we emphasize the importance of active planning over the representation space of latent tokens in achieving the optimal latent reasoning policy. So, we propose the \underline{A}c\underline{t}ive Latent \underline{P}lanning method (ATP-Latent), which models the supervision process of latent tokens as a conditional variational auto-encoder (VAE) to obtain a smoother latent space. Moreover, to facilitate the most reasonable latent reasoning policy, ATP-Latent conducts reinforcement learning (RL) with an auxiliary coherence reward, which is calculated based on the consistency between VAE-decoded contents of latent tokens, enabling a guided RL process. In experiments on LLaMA-1B, ATP-Latent demonstrates +4.1\% accuracy and -3.3\% tokens on four benchmarks compared to advanced baselines. Codes are available on https://github.com/zz1358m/ATP-Latent-master.

</details>

### [ARGORA: Orchestrated Argumentation for Causally Grounded LLM Reasoning and Decision Making](https://arxiv.org/abs/2601.21533v1)
- **arXiv**: 2601.21533v1
- **Published**: 2026-01-29
- **Stance**: BALANCED
- **Priority**: 2/10
- **Classified by**: Keyword
- **Why read**: LLM reasoning paper (keyword match - verify relevance)

<details>
<summary>Abstract</summary>

Existing multi-expert LLM systems gather diverse perspectives but combine them through simple aggregation, obscuring which arguments drove the final decision. We introduce ARGORA, a framework that organizes multi-expert discussions into explicit argumentation graphs showing which arguments support or attack each other. By casting these graphs as causal models, ARGORA can systematically remove individual arguments and recompute outcomes, identifying which reasoning chains were necessary and whether decisions would change under targeted modifications. We further introduce a correction mechanism that aligns internal reasoning with external judgments when they disagree. Across diverse benchmarks and an open-ended use case, ARGORA achieves competitive accuracy and demonstrates corrective behavior: when experts initially disagree, the framework resolves disputes toward correct answers more often than it introduces new errors, while providing causal diagnostics of decisive arguments.

</details>

### [Not All Code Is Equal: A Data-Centric Study of Code Complexity and LLM Reasoning](https://arxiv.org/abs/2601.21894v1)
- **arXiv**: 2601.21894v1
- **Published**: 2026-01-29
- **Stance**: BALANCED
- **Priority**: 2/10
- **Classified by**: Keyword
- **Why read**: LLM reasoning paper (keyword match - verify relevance)

<details>
<summary>Abstract</summary>

Large Language Models (LLMs) increasingly exhibit strong reasoning abilities, often attributed to their capacity to generate chain-of-thought-style intermediate reasoning. Recent work suggests that exposure to code can further enhance these skills, but existing studies largely treat code as a generic training signal, leaving open the question of which properties of code actually contribute to improved reasoning. To address this gap, we study the structural complexity of code, which captures control flow and compositional structure that may shape how models internalise multi-step reasoning during fine-tuning. We examine two complementary settings: solution-driven complexity, where complexity varies across multiple solutions to the same problem, and problem-driven complexity, where complexity reflects variation in the underlying tasks. Using cyclomatic complexity and logical lines of code to construct controlled fine-tuning datasets, we evaluate a range of open-weight LLMs on diverse reasoning benchmarks. Our findings show that although code can improve reasoning, structural properties strongly determine its usefulness. In 83% of experiments, restricting fine-tuning data to a specific structural complexity range outperforms training on structurally diverse code, pointing to a data-centric path for improving reasoning beyond scaling.

</details>

## Awaiting Triage

*Empty — all papers triaged*

---

## Triage Log (Promoted Papers Only)

| Date | Paper | arXiv | Reason |
|------|-------|-------|--------|
| 2026-01-31 | Semantic Content Determines Algorithmic Performance (WhatCounts) | 2601.21618 | 40% accuracy variation on counting based on SEMANTIC CONTENT |
| 2026-01-30 | Scaling Reasoning Hop | 2601.21214 | ep heads suppress correct trajectories — mechanistic |
| 2026-01-30 | Thinking Out of Order | 2601.22035 | 67% AR drop on answer-before-reasoning |
| 2026-01-30 | Chain Of Thought Compression | 2601.21576 | First theory: learning signal decays exponentially |
| 2026-01-30 | Teaching Models to Teach Themselves (SOAR) | 2601.18778 | Tests self-curriculum for unsolvable problems |
| 2026-01-30 | From Chains to DAGs | 2601.17593 | Probes DAG structure in hidden states |
| 2026-01-30 | HalluGuard | 2601.18753 | Decomposes hallucinations: data vs reasoning |
| 2026-01-30 | Code over Words | 2601.18352 | INVERSE SCALING when reasoning contradicts priors |
| 2026-01-30 | Oops, Wait | 2601.17421 | "wait" tokens signal correctness, exploited partially |
| 2026-01-30 | Strong Reasoning Isn't Enough | 2601.19773 | ~20% SR drop static→interactive; decoupled capabilities |
