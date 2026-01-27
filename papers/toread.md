# Papers to Read

Curated list of papers highly relevant to the thesis. Auto-discovered papers are filtered for direct relevance.

**Last updated**: 2026-01-27

---

## New Papers (2026-01-27)

### [Dep-Search: Learning Dependency-Aware Reasoning Traces with Persistent Memory](https://arxiv.org/abs/2601.18771v1)
- **arXiv**: 2601.18771v1
- **Published**: 2026-01-26
- **Stance**: BALANCED
- **Priority**: 8/10
- **Classified by**: LLM
- **Why read**: This paper explores structured, dependency-aware reasoning mechanisms in LLMs, providing insights into their capabilities and limitations in multi-step reasoning tasks.

<details>
<summary>Abstract</summary>

Large Language Models (LLMs) have demonstrated remarkable capabilities in complex reasoning tasks, particularly when augmented with search mechanisms that enable systematic exploration of external knowledge bases. The field has evolved from traditional retrieval-augmented generation (RAG) frameworks to more sophisticated search-based frameworks that orchestrate multi-step reasoning through explicit search strategies. However, existing search frameworks still rely heavily on implicit natural language reasoning to determine search strategies and how to leverage retrieved information across reasoning steps. This reliance on implicit reasoning creates fundamental challenges for managing dependencies between sub-questions, efficiently reusing previously retrieved knowledge, and learning optimal search strategies through reinforcement learning. To address these limitations, we propose Dep-Search, a dependency-aware search framework that advances beyond existing search frameworks by integrating structured reasoning, retrieval, and persistent memory through GRPO. Dep-Search introduces explicit control mechanisms that enable the model to decompose questions with dependency relationships, retrieve information when needed, access previously stored knowledge from memory, and summarize long reasoning contexts into reusable memory entries. Through extensive experiments on seven diverse question answering datasets, we demonstrate that Dep-Search significantly enhances LLMs' ability to tackle complex multi-hop reasoning tasks, achieving substantial improvements over strong baselines across different model scales.

</details>

### [Reflect: Transparent Principle-Guided Reasoning for Constitutional Alignment at Scale](https://arxiv.org/abs/2601.18730v1)
- **arXiv**: 2601.18730v1
- **Published**: 2026-01-26
- **Stance**: BALANCED
- **Priority**: 7/10
- **Classified by**: LLM
- **Why read**: This paper explores an inference-time approach to aligning LLMs with principles, highlighting the pattern-based nature of reasoning and the reliance on pre-existing capabilities rather than genuine reasoning.

<details>
<summary>Abstract</summary>

The constitutional framework of alignment aims to align large language models (LLMs) with value-laden principles written in natural language (such as to avoid using biased language). Prior work has focused on parameter fine-tuning techniques, such as reinforcement learning from human feedback (RLHF), to instill these principles. However, these approaches are computationally demanding, require careful engineering and tuning, and often require difficult-to-obtain human annotation data. We propose \textsc{reflect}, an inference-time framework for constitutional alignment that does not require any training or data, providing a plug-and-play approach for aligning an instruction-tuned model to a set of principles. \textsc{reflect} operates entirely in-context, combining a (i) constitution-conditioned base response with post-generation (ii) self-evaluation, (iii)(a) self-critique, and (iii)(b) final revision. \textsc{reflect}'s technique of explicit in-context reasoning over principles during post-generation outperforms standard few-shot prompting and provides transparent reasoning traces. Our results demonstrate that \textsc{reflect} significantly improves LLM conformance to diverse and complex principles, including principles quite distinct from those emphasized in the model's original parameter fine-tuning, without sacrificing factual reasoning. \textsc{reflect} is particularly effective at reducing the rate of rare but significant violations of principles, thereby improving safety and robustness in the tail end of the distribution of generations. Finally, we show that \textsc{reflect} naturally generates useful training data for traditional parameter fine-tuning techniques, allowing for efficient scaling and the reduction of inference-time computational overhead in long-term deployment scenarios.

</details>

### [Gained in Translation: Privileged Pairwise Judges Enhance Multilingual Reasoning](https://arxiv.org/abs/2601.18722v1)
- **arXiv**: 2601.18722v1
- **Published**: 2026-01-26
- **Stance**: BALANCED
- **Priority**: 7/10
- **Classified by**: LLM
- **Why read**: This paper explores the limits of multilingual reasoning in LLMs and introduces a framework that leverages pattern-based feedback, aligning with the thesis on the predictive nature of LLM reasoning.

<details>
<summary>Abstract</summary>

When asked a question in a language less seen in its training data, current reasoning large language models (RLMs) often exhibit dramatically lower performance than when asked the same question in English. In response, we introduce \texttt{SP3F} (Self-Play with Privileged Pairwise Feedback), a two-stage framework for enhancing multilingual reasoning without \textit{any} data in the target language(s). First, we supervise fine-tune (SFT) on translated versions of English question-answer pairs to raise base model correctness. Second, we perform RL with feedback from a pairwise judge in a self-play fashion, with the judge receiving the English reference response as \textit{privileged information}. Thus, even when none of the model's responses are completely correct, the privileged pairwise judge can still tell which response is better. End-to-end, \texttt{SP3F} greatly improves base model performance, even outperforming fully post-trained models on multiple math and non-math tasks with less than   of the training data across the single-language, multilingual, and generalization to unseen language settings.

</details>

### [Overalignment in Frontier LLMs: An Empirical Study of Sycophantic Behaviour in Healthcare](https://arxiv.org/abs/2601.18334v1)
- **arXiv**: 2601.18334v1
- **Published**: 2026-01-26
- **Stance**: BALANCED
- **Priority**: 7/10
- **Classified by**: LLM
- **Why read**: This paper investigates the reasoning robustness of frontier LLMs in a critical application domain, highlighting limitations related to pattern matching and alignment biases.

<details>
<summary>Abstract</summary>

As LLMs are increasingly integrated into clinical workflows, their tendency for sycophancy, prioritizing user agreement over factual accuracy, poses significant risks to patient safety. While existing evaluations often rely on subjective datasets, we introduce a robust framework grounded in medical MCQA with verifiable ground truths. We propose the Adjusted Sycophancy Score, a novel metric that isolates alignment bias by accounting for stochastic model instability, or "confusability". Through an extensive scaling analysis of the Qwen-3 and Llama-3 families, we identify a clear scaling trajectory for resilience. Furthermore, we reveal a counter-intuitive vulnerability in reasoning-optimized "Thinking" models: while they demonstrate high vanilla accuracy, their internal reasoning traces frequently rationalize incorrect user suggestions under authoritative pressure. Our results across frontier models suggest that benchmark performance is not a proxy for clinical reliability, and that simplified reasoning structures may offer superior robustness against expert-driven sycophancy.

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

### [ProGraph-R1: Progress-aware Reinforcement Learning for Graph Retrieval Augmented Generation](https://arxiv.org/abs/2601.17755v1)
- **arXiv**: 2601.17755v1
- **Published**: 2026-01-25
- **Stance**: SUPPORTS
- **Priority**: 3/10
- **Classified by**: Keyword
- **Why read**: LLM reasoning paper (keyword match - verify relevance)

<details>
<summary>Abstract</summary>

Graph Retrieval-Augmented Generation (GraphRAG) has been successfully applied in various knowledge-intensive question answering tasks by organizing external knowledge into structured graphs of entities and relations. It enables large language models (LLMs) to perform complex reasoning beyond text-chunk retrieval. Recent works have employed reinforcement learning (RL) to train agentic GraphRAG frameworks that perform iterative interactions between LLMs and knowledge graphs. However, existing RL-based frameworks such as Graph-R1 suffer from two key limitations: (1) they primarily depend on semantic similarity for retrieval, often overlooking the underlying graph structure, and (2) they rely on sparse, outcome-level rewards, failing to capture the quality of intermediate retrieval steps and their dependencies. To address these limitations, we propose ProGraph-R1, a progress-aware agentic framework for graph-based retrieval and multi-step reasoning. ProGraph-R1 introduces a structure-aware hypergraph retrieval mechanism that jointly considers semantic relevance and graph connectivity, encouraging coherent traversal along multi-hop reasoning paths. We also design a progress-based step-wise policy optimization, which provides dense learning signals by modulating advantages according to intermediate reasoning progress within a graph, rather than relying solely on final outcomes. Experiments on multi-hop question answering benchmarks demonstrate that ProGraph-R1 consistently improves reasoning accuracy and generation quality over existing GraphRAG methods.

</details>

### [Unsupervised Elicitation of Moral Values from Language Models](https://arxiv.org/abs/2601.17728v1)
- **arXiv**: 2601.17728v1
- **Published**: 2026-01-25
- **Stance**: SUPPORTS
- **Priority**: 3/10
- **Classified by**: Keyword
- **Why read**: LLM reasoning paper (keyword match - verify relevance)

<details>
<summary>Abstract</summary>

As AI systems become pervasive, grounding their behavior in human values is critical. Prior work suggests that language models (LMs) exhibit limited inherent moral reasoning, leading to calls for explicit moral teaching. However, constructing ground truth data for moral evaluation is difficult given plural frameworks and pervasive biases. We investigate unsupervised elicitation as an alternative, asking whether pretrained (base) LMs possess intrinsic moral reasoning capability that can be surfaced without human supervision. Using the Internal Coherence Maximization (ICM) algorithm across three benchmark datasets and four LMs, we test whether ICM can reliably label moral judgments, generalize across moral frameworks, and mitigate social bias. Results show that ICM outperforms all pre-trained and chatbot baselines on the Norm Bank and ETHICS benchmarks, while fine-tuning on ICM labels performs on par with or surpasses those of human labels. Across theoretically motivated moral frameworks, ICM yields its largest relative gains on Justice and Commonsense morality. Furthermore, although chatbot LMs exhibit social bias failure rates comparable to their pretrained ones, ICM reduces such errors by more than half, with the largest improvements in race, socioeconomic status, and politics. These findings suggest that pretrained LMs possess latent moral reasoning capacities that can be elicited through unsupervised methods like ICM, providing a scalable path for AI alignment.

</details>

### [Do Reasoning Models Ask Better Questions? A Formal Information-Theoretic Analysis on Multi-Turn LLM Games](https://arxiv.org/abs/2601.17716v1)
- **arXiv**: 2601.17716v1
- **Published**: 2026-01-25
- **Stance**: SUPPORTS
- **Priority**: 3/10
- **Classified by**: Keyword
- **Why read**: LLM reasoning paper (keyword match - verify relevance)

<details>
<summary>Abstract</summary>

Large Language Models (LLMs) excel at many tasks but still struggle with a critical ability for LLM-based agents: asking good questions for resolving ambiguity in user requests. While prior work has explored information-seeking behavior through word games, existing benchmarks lack comprehensive evaluation frameworks that provide both final and intermediate signals based on Information Gain (IG). Moreover, they rarely provide systematic comparisons between models that use chain-of-thought reasoning and those that do not. We propose a multi-turn dialogue framework that quantitatively measures how effectively LLMs gather information through yes/no questions in a hierarchical knowledge graph environment. Our framework employs a triad of interacting LLM agents that ask questions, answer them, and update the hypothesis space. We adopt IG as the main metric, grounded in Shannon entropy, to assess query effectiveness at each turn and cumulatively. We instantiate our framework in a geographical Guess My City game setting organized in a five-level taxonomy and evaluate multiple LLM variants under fully and partially observable conditions, with and without Chain-of-Thought reasoning. Our experiments demonstrate that, among the evaluated models, the ones with explicit reasoning capabilities achieve higher IG per turn and reach solutions in fewer steps, particularly in partially observable settings. Analysis of reasoning traces reveals that smaller models compensate for limited capacity through more aggressive exploration of candidate questions, while larger models exhibit higher assertiveness in selecting optimal queries, generating candidates with greater potential IG.

</details>

### [EFT-CoT: A Multi-Agent Chain-of-Thought Framework for Emotion-Focused Therapy](https://arxiv.org/abs/2601.17842v1)
- **arXiv**: 2601.17842v1
- **Published**: 2026-01-25
- **Stance**: BALANCED
- **Priority**: 2/10
- **Classified by**: Keyword
- **Why read**: LLM reasoning paper (keyword match - verify relevance)

<details>
<summary>Abstract</summary>

Leveraging Large Language Models (LLMs) for Mental Health Question Answering (MHQA) is promising for mitigating resource shortages. However, existing Cognitive Behavioral Therapy (CBT)-based approaches predominantly favor a "top-down" rational restructuring, often neglecting clients' embodied experiences and primary emotion processing. To address this, we propose an Emotion-Focused Therapy (EFT)-based Multi-Agent Chain-of-Thought framework (EFT-CoT). Adopting a "bottom-up" trajectory, it deconstructs the intervention into a three-stage reasoning flow: "Embodied Perception - Cognitive Exploration - Narrative Intervention." Utilizing eight specialized agents, the system explicitly executes critical components such as somatic awareness mapping, adaptive assessment, core belief extraction, and narrative restructuring. We further constructed "EFT-Instruct," a high-quality dataset via Chain-of-Thought distillation of approximately 67,000 authentic texts, and fine-tuned a specialized model, EFT-LLM. Experimental evaluations demonstrate that EFT-LLM outperforms strong baselines and human responses across metrics like empathy depth and structural professionalism. Ablation studies confirm the necessity of the multi-agent mechanism. The model exhibits superior psychological reasoning, offering an effective pathway for interpretable, high-empathy counseling systems.

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

---

## High Priority (Directly Tests Thesis)

### [Gaming the Judge: Unfaithful Chain-of-Thought Can Undermine Agent Evaluation](https://arxiv.org/abs/2601.14691)
- **arXiv**: 2601.14691
- **Stance**: SUPPORTS
- **Why read**: Directly tests CoT faithfulness - shows LLM judges can be fooled by unfaithful reasoning traces
- **Key finding**: CoT doesn't faithfully reflect internal reasoning or environment state

<details>
<summary>Abstract</summary>

We study the effect of Chain-of-Thought on the reliability of agent evaluation. We find that LLM judges can be fooled by unfaithful reasoning traces that don't accurately represent the agent's internal state or interaction with the environment. This has implications for agent evaluation pipelines that rely on CoT.

</details>

### [Beyond Memorization: Testing LLM Reasoning on Unseen Theory of Computation Tasks](https://arxiv.org/abs/2601.13392)
- **arXiv**: 2601.13392
- **Stance**: SUPPORTS
- **Why read**: Tests pattern matching vs genuine reasoning on DFA construction
- **Key finding**: Benchmark distinguishes memorization from symbolic reasoning

<details>
<summary>Abstract</summary>

We propose a benchmark based on Theory of Computation tasks to distinguish memorization from genuine symbolic reasoning in LLMs. Our benchmark tests DFA construction and related tasks that require systematic rule application rather than pattern matching.

</details>

### [Outcome-Based RL Provably Leads Transformers to Reason, but Only With the Right Data](https://arxiv.org/abs/2601.15158)
- **arXiv**: 2601.15158
- **Stance**: CHALLENGES (but limited)
- **Why read**: Analyzes how RL enables CoT emergence - relevant to "surfacing" hypothesis
- **Key finding**: Sparse rewards can drive gradient descent to discover reasoning

<details>
<summary>Abstract</summary>

We analyze theoretically how outcome-based reinforcement learning can lead transformers to discover chain-of-thought reasoning. We show that sparse rewards can drive gradient descent to find reasoning patterns, but only when the training data has the right structure.

</details>

### [Say Anything but This: When Tokenizer Betrays Reasoning in LLMs](https://arxiv.org/abs/2601.14658)
- **arXiv**: 2601.14658
- **Stance**: SUPPORTS
- **Why read**: Shows reasoning fails due to tokenization - surface-level fragility
- **Key finding**: Non-unique encodings create unmeasured reasoning fragility

<details>
<summary>Abstract</summary>

We demonstrate that tokenization choices can undermine LLM reasoning in ways that are not captured by standard benchmarks. Non-unique encodings of the same input create unmeasured fragility in reasoning performance.

</details>

### [The Flexibility Trap: Why Arbitrary Order Limits Reasoning Potential in Diffusion Language Models](https://arxiv.org/abs/2601.15165)
- **arXiv**: 2601.15165
- **Stance**: BALANCED
- **Why read**: Tests whether flexible generation order improves reasoning
- **Key finding**: Flexibility doesn't unlock superior reasoning potential

<details>
<summary>Abstract</summary>

We investigate whether diffusion language models, which can generate tokens in arbitrary order, have superior reasoning potential compared to autoregressive models. We find that this flexibility does not unlock improved reasoning capabilities.

</details>

---

## Medium Priority (Relevant Evidence)

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

## Skipped (Not Relevant)

The following paper types are filtered out:
- RAG/retrieval papers
- Domain-specific applications (medical, legal, finance, traffic, chemistry)
- Image/audio/video generation and understanding
- Efficiency/quantization papers without reasoning analysis
- Tool-specific papers (code, SQL, visualization)
- Safety/alignment papers not about reasoning
- Survey/taxonomy papers without new findings on reasoning
