# Papers to Read

Curated list of papers highly relevant to the thesis. Auto-discovered papers are filtered for direct relevance.

**Last updated**: 2026-01-27

---

## New Papers (2026-01-27)

### [MortalMATH: Evaluating the Conflict Between Reasoning Objectives and Emergency Contexts](https://arxiv.org/abs/2601.18790v1)
- **arXiv**: 2601.18790v1
- **Published**: 2026-01-26
- **Stance**: SUPPORTS
- **Priority**: 9/10
- **Classified by**: LLM
- **Why read**: This paper demonstrates that optimized reasoning in LLMs can lead to neglect of safety and emergent behaviors, supporting the view that reasoning is primarily pattern-based rather than genuinely generative.

<details>
<summary>Abstract</summary>

Large Language Models are increasingly optimized for deep reasoning, prioritizing the correct execution of complex tasks over general conversation. We investigate whether this focus on calculation creates a "tunnel vision" that ignores safety in critical situations. We introduce MortalMATH, a benchmark of 150 scenarios where users request algebra help while describing increasingly life-threatening emergencies (e.g., stroke symptoms, freefall). We find a sharp behavioral split: generalist models (like Llama-3.1) successfully refuse the math to address the danger. In contrast, specialized reasoning models (like Qwen-3-32b and GPT-5-nano) often ignore the emergency entirely, maintaining over 95 percent task completion rates while the user describes dying. Furthermore, the computational time required for reasoning introduces dangerous delays: up to 15 seconds before any potential help is offered. These results suggest that training models to relentlessly pursue correct answers may inadvertently unlearn the survival instincts required for safe deployment.

</details>

### [Teaching Models to Teach Themselves: Reasoning at the Edge of Learnability](https://arxiv.org/abs/2601.18778v1)
- **arXiv**: 2601.18778v1
- **Published**: 2026-01-26
- **Stance**: BALANCED
- **Priority**: 8/10
- **Classified by**: LLM
- **Why read**: This paper explores the limits of LLM reasoning and demonstrates that self-generated curricula can improve learning without genuine reasoning, supporting the thesis that LLM reasoning is fundamentally pattern matching rather than true generation.

<details>
<summary>Abstract</summary>

Can a model learn to escape its own learning plateau? Reinforcement learning methods for finetuning large reasoning models stall on datasets with low initial success rates, and thus little training signal. We investigate a fundamental question: Can a pretrained LLM leverage latent knowledge to generate an automated curriculum for problems it cannot solve? To explore this, we design SOAR: A self-improvement framework designed to surface these pedagogical signals through meta-RL. A teacher copy of the model proposes synthetic problems for a student copy, and is rewarded with its improvement on a small subset of hard problems. Critically, SOAR grounds the curriculum in measured student progress rather than intrinsic proxy rewards. Our study on the hardest subsets of mathematical benchmarks (0/128 success) reveals three core findings. First, we show that it is possible to realize bi-level meta-RL that unlocks learning under sparse, binary rewards by sharpening a latent capacity of pretrained models to generate useful stepping stones. Second, grounded rewards outperform intrinsic reward schemes used in prior LLM self-play, reliably avoiding the instability and diversity collapse modes they typically exhibit. Third, analyzing the generated questions reveals that structural quality and well-posedness are more critical for learning progress than solution correctness. Our results suggest that the ability to generate useful stepping stones does not require the preexisting ability to actually solve the hard problems, paving a principled path to escape reasoning plateaus without additional curated data.

</details>

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

### [Unknown Unknowns: Why Hidden Intentions in LLMs Evade Detection](https://arxiv.org/abs/2601.18552v1)
- **arXiv**: 2601.18552v1
- **Published**: 2026-01-26
- **Stance**: BALANCED
- **Priority**: 8/10
- **Classified by**: LLM
- **Why read**: This paper explores covert behaviors and detection challenges in LLMs, providing insights into their reasoning limitations and pattern-based tendencies.

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
- **Why read**: This paper investigates RL-based methods to enhance LLM reasoning on hard problems, providing insights into the capabilities and limitations of current approaches.

<details>
<summary>Abstract</summary>

Reinforcement learning (RL) has improved the reasoning abilities of large language models (LLMs), yet state-of-the-art methods still fail to learn on many training problems. On hard problems, on-policy RL rarely explores even a single correct rollout, yielding zero reward and no learning signal for driving improvement. We find that natural solutions to remedy this exploration problem from classical RL, such as entropy bonuses, more permissive clipping of the importance ratio, or direct optimization of pass@k objectives, do not resolve this issue and often destabilize optimization without improving solvability. A natural alternative is to leverage transfer from easier problems. However, we show that mixing easy and hard problems during RL training is counterproductive due to ray interference, where optimization focuses on already-solvable problems in a way that actively inhibits progress on harder ones. To address this challenge, we introduce Privileged On-Policy Exploration (POPE), an approach that leverages human- or other oracle solutions as privileged information to guide exploration on hard problems, unlike methods that use oracle solutions as training targets (e.g., off-policy RL methods or warmstarting from SFT). POPE augments hard problems with prefixes of oracle solutions, enabling RL to obtain non-zero rewards during guided rollouts. Crucially, the resulting behaviors transfer back to the original, unguided problems through a synergy between instruction-following and reasoning. Empirically, POPE expands the set of solvable problems and substantially improves performance on challenging reasoning benchmarks.

</details>

### [Reflect: Transparent Principle-Guided Reasoning for Constitutional Alignment at Scale](https://arxiv.org/abs/2601.18730v1)
- **arXiv**: 2601.18730v1
- **Published**: 2026-01-26
- **Stance**: BALANCED
- **Priority**: 7/10
- **Classified by**: LLM
- **Why read**: This paper explores an inference-time approach to aligning LLMs with principles, highlighting the reliance on pattern matching and surface-level reasoning rather than genuine understanding.

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
- **Why read**: This paper explores multilingual reasoning improvements using feedback mechanisms, providing insights into the capabilities and limitations of LLM reasoning approaches.

<details>
<summary>Abstract</summary>

When asked a question in a language less seen in its training data, current reasoning large language models (RLMs) often exhibit dramatically lower performance than when asked the same question in English. In response, we introduce \texttt{SP3F} (Self-Play with Privileged Pairwise Feedback), a two-stage framework for enhancing multilingual reasoning without \textit{any} data in the target language(s). First, we supervise fine-tune (SFT) on translated versions of English question-answer pairs to raise base model correctness. Second, we perform RL with feedback from a pairwise judge in a self-play fashion, with the judge receiving the English reference response as \textit{privileged information}. Thus, even when none of the model's responses are completely correct, the privileged pairwise judge can still tell which response is better. End-to-end, \texttt{SP3F} greatly improves base model performance, even outperforming fully post-trained models on multiple math and non-math tasks with less than   of the training data across the single-language, multilingual, and generalization to unseen language settings.

</details>

### [MultiVis-Agent: A Multi-Agent Framework with Logic Rules for Reliable and Comprehensive Cross-Modal Data Visualization](https://arxiv.org/abs/2601.18320v1)
- **arXiv**: 2601.18320v1
- **Published**: 2026-01-26
- **Stance**: SUPPORTS
- **Priority**: 4/10
- **Classified by**: Keyword
- **Why read**: General reasoning paper (keyword match)

<details>
<summary>Abstract</summary>

Real-world visualization tasks involve complex, multi-modal requirements that extend beyond simple text-to-chart generation, requiring reference images, code examples, and iterative refinement. Current systems exhibit fundamental limitations: single-modality input, one-shot generation, and rigid workflows. While LLM-based approaches show potential for these complex requirements, they introduce reliability challenges including catastrophic failures and infinite loop susceptibility. To address this gap, we propose MultiVis-Agent, a logic rule-enhanced multi-agent framework for reliable multi-modal and multi-scenario visualization generation. Our approach introduces a four-layer logic rule framework that provides mathematical guarantees for system reliability while maintaining flexibility. Unlike traditional rule-based systems, our logic rules are mathematical constraints that guide LLM reasoning rather than replacing it. We formalize the MultiVis task spanning four scenarios from basic generation to iterative refinement, and develop MultiVis-Bench, a benchmark with over 1,000 cases for multi-modal visualization evaluation. Extensive experiments demonstrate that our approach achieves 75.63% visualization score on challenging tasks, significantly outperforming baselines (57.54-62.79%), with task completion rates of 99.58% and code execution success rates of 94.56% (vs. 74.48% and 65.10% without logic rules), successfully addressing both complexity and reliability challenges in automated visualization generation.

</details>

### [Unsupervised Elicitation of Moral Values from Language Models](https://arxiv.org/abs/2601.17728v1)
- **arXiv**: 2601.17728v1
- **Published**: 2026-01-25
- **Stance**: BALANCED
- **Priority**: 4/10
- **Classified by**: Keyword
- **Why read**: General reasoning paper (keyword match)

<details>
<summary>Abstract</summary>

As AI systems become pervasive, grounding their behavior in human values is critical. Prior work suggests that language models (LMs) exhibit limited inherent moral reasoning, leading to calls for explicit moral teaching. However, constructing ground truth data for moral evaluation is difficult given plural frameworks and pervasive biases. We investigate unsupervised elicitation as an alternative, asking whether pretrained (base) LMs possess intrinsic moral reasoning capability that can be surfaced without human supervision. Using the Internal Coherence Maximization (ICM) algorithm across three benchmark datasets and four LMs, we test whether ICM can reliably label moral judgments, generalize across moral frameworks, and mitigate social bias. Results show that ICM outperforms all pre-trained and chatbot baselines on the Norm Bank and ETHICS benchmarks, while fine-tuning on ICM labels performs on par with or surpasses those of human labels. Across theoretically motivated moral frameworks, ICM yields its largest relative gains on Justice and Commonsense morality. Furthermore, although chatbot LMs exhibit social bias failure rates comparable to their pretrained ones, ICM reduces such errors by more than half, with the largest improvements in race, socioeconomic status, and politics. These findings suggest that pretrained LMs possess latent moral reasoning capacities that can be elicited through unsupervised methods like ICM, providing a scalable path for AI alignment.

</details>

### [HalluGuard: Demystifying Data-Driven and Reasoning-Driven Hallucinations in LLMs](https://arxiv.org/abs/2601.18753v1)
- **arXiv**: 2601.18753v1
- **Published**: 2026-01-26
- **Stance**: SUPPORTS
- **Priority**: 4/10
- **Classified by**: Keyword
- **Why read**: General reasoning paper (keyword match)

<details>
<summary>Abstract</summary>

The reliability of Large Language Models (LLMs) in high-stakes domains such as healthcare, law, and scientific discovery is often compromised by hallucinations. These failures typically stem from two sources: data-driven hallucinations and reasoning-driven hallucinations. However, existing detection methods usually address only one source and rely on task-specific heuristics, limiting their generalization to complex scenarios. To overcome these limitations, we introduce the Hallucination Risk Bound, a unified theoretical framework that formally decomposes hallucination risk into data-driven and reasoning-driven components, linked respectively to training-time mismatches and inference-time instabilities. This provides a principled foundation for analyzing how hallucinations emerge and evolve. Building on this foundation, we introduce HalluGuard, an NTK-based score that leverages the induced geometry and captured representations of the NTK to jointly identify data-driven and reasoning-driven hallucinations. We evaluate HalluGuard on 10 diverse benchmarks, 11 competitive baselines, and 9 popular LLM backbones, consistently achieving state-of-the-art performance in detecting diverse forms of LLM hallucinations.

</details>

### [Neuro-Symbolic Verification on Instruction Following of LLMs](https://arxiv.org/abs/2601.17789v1)
- **arXiv**: 2601.17789v1
- **Published**: 2026-01-25
- **Stance**: BALANCED
- **Priority**: 4/10
- **Classified by**: Keyword
- **Why read**: General reasoning paper (keyword match)

<details>
<summary>Abstract</summary>

A fundamental problem of applying Large Language Models (LLMs) to important applications is that LLMs do not always follow instructions, and violations are often hard to observe or check. In LLM-based agentic workflows, such violations can propagate and amplify along reasoning chains, causing task failures and system incidents. This paper presents NSVIF, a neuro-symbolic framework for verifying whether an LLM's output follows the instructions used to prompt the LLM. NSVIF is a universal, general-purpose verifier; it makes no assumption about the instruction or the LLM. NSVIF formulates instruction-following verification as a constraint-satisfaction problem by modeling user instructions as constraints. NSVIF models both logical and semantic constraints; constraint solving is done by a unified solver that orchestrates logical reasoning and semantic analysis. To evaluate NSVIF, we develop VIFBENCH, a new benchmark for instruction-following verifiers with fine-grained data labels. Experiments show that NSVIF significantly outperforms LLM-based approaches and provides interpretable feedback. We also show that feedback from NSVIF helps improve LLMs' instruction-following capability without post-training.

</details>

### [Towards a Declarative Agentic Layer for Intelligent Agents in MCP-Based Server Ecosystems](https://arxiv.org/abs/2601.17435v1)
- **arXiv**: 2601.17435v1
- **Published**: 2026-01-24
- **Stance**: SUPPORTS
- **Priority**: 4/10
- **Classified by**: Keyword
- **Why read**: General reasoning paper (keyword match)

<details>
<summary>Abstract</summary>

Recent advances in Large Language Models (LLMs) have enabled the development of increasingly complex agentic and multi-agent systems capable of planning, tool use and task decomposition. However, empirical evidence shows that many of these systems suffer from fundamental reliability issues, including hallucinated actions, unexecutable plans and brittle coordination. Crucially, these failures do not stem from limitations of the underlying models themselves, but from the absence of explicit architectural structure linking goals, capabilities and execution. This paper presents a declarative, model-independent architectural layer for grounded agentic workflows that addresses this gap. The proposed layer, referred to as DALIA (Declarative Agentic Layer for Intelligent Agents), formalises executable capabilities, exposes tasks through a declarative discovery protocol, maintains a federated directory of agents and their execution resources, and constructs deterministic task graphs grounded exclusively in declared operations. By enforcing a clear separation between discovery, planning and execution, the architecture constrains agent behaviour to a verifiable operational space, reducing reliance on speculative reasoning and free-form coordination. We present the architecture and design principles of the proposed layer and illustrate its operation through a representative task-oriented scenario, demonstrating how declarative grounding enables reproducible and verifiable agentic workflows across heterogeneous environments.

</details>

### [Making medical vision-language models think causally across modalities with retrieval-augmented cross-modal reasoning](https://arxiv.org/abs/2601.18356v1)
- **arXiv**: 2601.18356v1
- **Published**: 2026-01-26
- **Stance**: SUPPORTS
- **Priority**: 4/10
- **Classified by**: Keyword
- **Why read**: General reasoning paper (keyword match)

<details>
<summary>Abstract</summary>

Medical vision-language models (VLMs) achieve strong performance in diagnostic reporting and image-text alignment, yet their underlying reasoning mechanisms remain fundamentally correlational, exhibiting reliance on superficial statistical associations that fail to capture the causal pathophysiological mechanisms central to clinical decision-making. This limitation makes them fragile, prone to hallucinations, and sensitive to dataset biases. Retrieval-augmented generation (RAG) offers a partial remedy by grounding predictions in external knowledge. However, conventional RAG depends on semantic similarity, introducing new spurious correlations. We propose Multimodal Causal Retrieval-Augmented Generation, a framework that integrates causal inference principles with multimodal retrieval. It retrieves clinically relevant exemplars and causal graphs from external sources, conditioning model reasoning on counterfactual and interventional evidence rather than correlations alone. Applied to radiology report generation, diagnosis prediction, and visual question answering, it improves factual accuracy, robustness to distribution shifts, and interpretability. Our results highlight causal retrieval as a scalable path toward medical VLMs that think beyond pattern matching, enabling trustworthy multimodal reasoning in high-stakes clinical settings.

</details>

### [Integrating Fine-Grained Audio-Visual Evidence for Robust Multimodal Emotion Reasoning](https://arxiv.org/abs/2601.18321v1)
- **arXiv**: 2601.18321v1
- **Published**: 2026-01-26
- **Stance**: SUPPORTS
- **Priority**: 3/10
- **Classified by**: Keyword
- **Why read**: General reasoning paper (keyword match)

<details>
<summary>Abstract</summary>

Multimodal emotion analysis is shifting from static classification to generative reasoning. Beyond simple label prediction, robust affective reasoning must synthesize fine-grained signals such as facial micro-expressions and prosodic which shifts to decode the latent causality within complex social contexts. However, current Multimodal Large Language Models (MLLMs) face significant limitations in fine-grained perception, primarily due to data scarcity and insufficient cross-modal fusion. As a result, these models often exhibit unimodal dominance which leads to hallucinations in complex multimodal interactions, particularly when visual and acoustic cues are subtle, ambiguous, or even contradictory (e.g., in sarcastic scenery). To address this, we introduce SABER-LLM, a framework designed for robust multimodal reasoning. First, we construct SABER, a large-scale emotion reasoning dataset comprising 600K video clips, annotated with a novel six-dimensional schema that jointly captures audiovisual cues and causal logic. Second, we propose the structured evidence decomposition paradigm, which enforces a "perceive-then-reason" separation between evidence extraction and reasoning to alleviate unimodal dominance. The ability to perceive complex scenes is further reinforced by consistency-aware direct preference optimization, which explicitly encourages alignment among modalities under ambiguous or conflicting perceptual conditions. Experiments on EMER, EmoBench-M, and SABER-Test demonstrate that SABER-LLM significantly outperforms open-source baselines and achieves robustness competitive with closed-source models in decoding complex emotional dynamics. The dataset and model are available at https://github.com/zxzhao0/SABER-LLM.

</details>

### [Think-Augmented Function Calling: Improving LLM Parameter Accuracy Through Embedded Reasoning](https://arxiv.org/abs/2601.18282v1)
- **arXiv**: 2601.18282v1
- **Published**: 2026-01-26
- **Stance**: SUPPORTS
- **Priority**: 3/10
- **Classified by**: Keyword
- **Why read**: General reasoning paper (keyword match)

<details>
<summary>Abstract</summary>

Large language models (LLMs) have demonstrated remarkable capabilities in function calling for autonomous agents, yet current mechanisms lack explicit reasoning transparency during parameter generation, particularly for complex functions with interdependent parameters. While existing approaches like chain-of-thought prompting operate at the agent level, they fail to provide fine-grained reasoning guidance for individual function parameters. To address these limitations, we propose Think-Augmented Function Calling (TAFC), a novel framework that enhances function calling accuracy through explicit reasoning at both function and parameter levels. Our method introduces a universal "think" parameter augmentation that enables models to articulate their decision-making process, with dynamic optimization for parameter descriptions to improve reasoning quality. For complex parameters, TAFC automatically triggers granular reasoning based on complexity scoring, ensuring appropriate justification for critical decisions. Additionally, we propose reasoning-guided optimization to align generated reasoning with human expectations. TAFC requires no architectural modifications to existing LLMs while maintaining full API compatibility. Evaluation on ToolBench across proprietary and open-source models demonstrates significant improvements in parameter generation accuracy and reasoning coherence for multi-parameter functions, while providing enhanced interpretability for debugging AI agent behaviors.

</details>

### [Reflecting Twice before Speaking with Empathy: Self-Reflective Alternating Inference for Empathy-Aware End-to-End Spoken Dialogue](https://arxiv.org/abs/2601.18281v1)
- **arXiv**: 2601.18281v1
- **Published**: 2026-01-26
- **Stance**: SUPPORTS
- **Priority**: 3/10
- **Classified by**: Keyword
- **Why read**: General reasoning paper (keyword match)

<details>
<summary>Abstract</summary>

End-to-end Spoken Language Models (SLMs) hold great potential for paralinguistic perception, and numerous studies have aimed to enhance their capabilities, particularly for empathetic dialogue. However, current approaches largely depend on rigid supervised signals, such as ground-truth response in supervised fine-tuning or preference scores in reinforcement learning. Such reliance is fundamentally limited for modeling complex empathy, as there is no single "correct" response and a simple numerical score cannot fully capture the nuances of emotional expression or the appropriateness of empathetic behavior. To address these limitations, we sequentially introduce EmpathyEval, a descriptive natural-language-based evaluation model for assessing empathetic quality in spoken dialogues. Building upon EmpathyEval, we propose ReEmpathy, an end-to-end SLM that enhances empathetic dialogue through a novel Empathetic Self-Reflective Alternating Inference mechanism, which interleaves spoken response generation with free-form, empathy-related reflective reasoning. Extensive experiments demonstrate that ReEmpathy substantially improves empathy-sensitive spoken dialogue by enabling reflective reasoning, offering a promising approach toward more emotionally intelligent and empathy-aware human-computer interactions.

</details>

### [Typhoon-S: Minimal Open Post-Training for Sovereign Large Language Models](https://arxiv.org/abs/2601.18129v1)
- **arXiv**: 2601.18129v1
- **Published**: 2026-01-26
- **Stance**: CHALLENGES
- **Priority**: 3/10
- **Classified by**: Keyword
- **Why read**: General reasoning paper (keyword match)

<details>
<summary>Abstract</summary>

Large language models (LLMs) have progressed rapidly; however, most state-of-the-art models are trained and evaluated primarily in high-resource languages such as English and Chinese, and are often developed by a small number of organizations with access to large-scale compute and data. This gatekeeping creates a practical barrier for sovereign settings in which a regional- or national-scale institution or domain owner must retain control and understanding of model weights, training data, and deployment while operating under limited resources and strict transparency constraints. To this end, we identify two core requirements: (1) adoptability, the ability to transform a base model into a general-purpose assistant, and (2) sovereign capability, the ability to perform high-stakes, region-specific tasks (e.g., legal reasoning in local languages and cultural knowledge). We investigate whether these requirements can be achieved without scaling massive instruction corpora or relying on complex preference tuning pipelines and large-scale reinforcement fine-tuning (RFT). We present Typhoon S, a minimal and open post-training recipe that combines supervised fine-tuning, on-policy distillation, and small-scale RFT. Using Thai as a representative case study, we demonstrate that our approach transforms both sovereign-adapted and general-purpose base models into instruction-tuned models with strong general performance. We further show that small-scale RFT with InK-GRPO -- an extension of GRPO that augments the GRPO loss with a next-word prediction loss -- improves Thai legal reasoning and Thai-specific knowledge while preserving general capabilities. Our results suggest that a carefully designed post-training strategy can reduce the required scale of instruction data and computation, providing a practical path toward high-quality sovereign LLMs under academic-scale resources.

</details>

### [FABLE: Forest-Based Adaptive Bi-Path LLM-Enhanced Retrieval for Multi-Document Reasoning](https://arxiv.org/abs/2601.18116v1)
- **arXiv**: 2601.18116v1
- **Published**: 2026-01-26
- **Stance**: SUPPORTS
- **Priority**: 3/10
- **Classified by**: Keyword
- **Why read**: General reasoning paper (keyword match)

<details>
<summary>Abstract</summary>

The rapid expansion of long-context Large Language Models (LLMs) has reignited debate on whether Retrieval-Augmented Generation (RAG) remains necessary. However, empirical evidence reveals persistent limitations of long-context inference, including the lost-in-the-middle phenomenon, high computational cost, and poor scalability for multi-document reasoning. Conversely, traditional RAG systems, while efficient, are constrained by flat chunk-level retrieval that introduces semantic noise and fails to support structured cross-document synthesis.   We present \textbf{FABLE}, a \textbf{F}orest-based \textbf{A}daptive \textbf{B}i-path \textbf{L}LM-\textbf{E}nhanced retrieval framework that integrates LLMs into both knowledge organization and retrieval. FABLE constructs LLM-enhanced hierarchical forest indexes with multi-granularity semantic structures, then employs a bi-path strategy combining LLM-guided hierarchical traversal with structure-aware propagation for fine-grained evidence acquisition, with explicit budget control for adaptive efficiency trade-offs.   Extensive experiments demonstrate that FABLE consistently outperforms SOTA RAG methods and achieves comparable accuracy to full-context LLM inference with up to 94\% token reduction, showing that long-context LLMs amplify rather than fully replace the need for structured retrieval.

</details>

### [Sparks of Cooperative Reasoning: LLMs as Strategic Hanabi Agents](https://arxiv.org/abs/2601.18077v1)
- **arXiv**: 2601.18077v1
- **Published**: 2026-01-26
- **Stance**: SUPPORTS
- **Priority**: 3/10
- **Classified by**: Keyword
- **Why read**: General reasoning paper (keyword match)

<details>
<summary>Abstract</summary>

Cooperative reasoning under incomplete information remains challenging for both humans and multi-agent systems. The card game Hanabi embodies this challenge, requiring theory-of-mind reasoning and strategic communication. We benchmark 17 state-of-the-art LLM agents in 2-5 player games and study the impact of context engineering across model scales (4B to 600B+) to understand persistent coordination failures and robustness to scaffolding: from a minimal prompt with only explicit card details (Watson setting), to scaffolding with programmatic, Bayesian-motivated deductions (Sherlock setting), to multi-turn state tracking via working memory (Mycroft setting). We show that (1) agents can maintain an internal working memory for state tracking and (2) cross-play performance between different LLMs smoothly interpolates with model strength. In the Sherlock setting, the strongest reasoning models exceed 15 points on average across player counts, yet still trail experienced humans and specialist Hanabi agents, both consistently scoring above 20. We release the first public Hanabi datasets with annotated trajectories and move utilities: (1) HanabiLogs, containing 1,520 full game logs for instruction tuning, and (2) HanabiRewards, containing 560 games with dense move-level value annotations for all candidate moves. Supervised and RL finetuning of a 4B open-weight model (Qwen3-Instruct) on our datasets improves cooperative Hanabi play by 21% and 156% respectively, bringing performance to within ~3 points of a strong proprietary reasoning model (o4-mini) and surpassing the best non-reasoning model (GPT-4.1) by 52%. The HanabiRewards RL-finetuned model further generalizes beyond Hanabi, improving performance on a cooperative group-guessing benchmark by 11%, temporal reasoning on EventQA by 6.4%, instruction-following on IFBench-800K by 1.7 Pass@10, and matching AIME 2025 mathematical reasoning Pass@10.

</details>

### [On the Emergence and Test-Time Use of Structural Information in Large Language Models](https://arxiv.org/abs/2601.17869v1)
- **arXiv**: 2601.17869v1
- **Published**: 2026-01-25
- **Stance**: CHALLENGES
- **Priority**: 3/10
- **Classified by**: Keyword
- **Why read**: General reasoning paper (keyword match)

<details>
<summary>Abstract</summary>

Learning structural information from observational data is central to producing new knowledge outside the training corpus. This holds for mechanistic understanding in scientific discovery as well as flexible test-time compositional generation. We thus study how language models learn abstract structures and utilize the learnt structural information at test-time. To ensure a controlled setup, we design a natural language dataset based on linguistic structural transformations. We empirically show that the emergence of learning structural information correlates with complex reasoning tasks, and that the ability to perform test-time compositional generation remains limited.

</details>

### [ProGraph-R1: Progress-aware Reinforcement Learning for Graph Retrieval Augmented Generation](https://arxiv.org/abs/2601.17755v1)
- **arXiv**: 2601.17755v1
- **Published**: 2026-01-25
- **Stance**: SUPPORTS
- **Priority**: 3/10
- **Classified by**: Keyword
- **Why read**: General reasoning paper (keyword match)

<details>
<summary>Abstract</summary>

Graph Retrieval-Augmented Generation (GraphRAG) has been successfully applied in various knowledge-intensive question answering tasks by organizing external knowledge into structured graphs of entities and relations. It enables large language models (LLMs) to perform complex reasoning beyond text-chunk retrieval. Recent works have employed reinforcement learning (RL) to train agentic GraphRAG frameworks that perform iterative interactions between LLMs and knowledge graphs. However, existing RL-based frameworks such as Graph-R1 suffer from two key limitations: (1) they primarily depend on semantic similarity for retrieval, often overlooking the underlying graph structure, and (2) they rely on sparse, outcome-level rewards, failing to capture the quality of intermediate retrieval steps and their dependencies. To address these limitations, we propose ProGraph-R1, a progress-aware agentic framework for graph-based retrieval and multi-step reasoning. ProGraph-R1 introduces a structure-aware hypergraph retrieval mechanism that jointly considers semantic relevance and graph connectivity, encouraging coherent traversal along multi-hop reasoning paths. We also design a progress-based step-wise policy optimization, which provides dense learning signals by modulating advantages according to intermediate reasoning progress within a graph, rather than relying solely on final outcomes. Experiments on multi-hop question answering benchmarks demonstrate that ProGraph-R1 consistently improves reasoning accuracy and generation quality over existing GraphRAG methods.

</details>

### [A Computational Approach to Visual Metonymy](https://arxiv.org/abs/2601.17706v1)
- **arXiv**: 2601.17706v1
- **Published**: 2026-01-25
- **Stance**: SUPPORTS
- **Priority**: 3/10
- **Classified by**: Keyword
- **Why read**: General reasoning paper (keyword match)

<details>
<summary>Abstract</summary>

Images often communicate more than they literally depict: a set of tools can suggest an occupation and a cultural artifact can suggest a tradition. This kind of indirect visual reference, known as visual metonymy, invites viewers to recover a target concept via associated cues rather than explicit depiction. In this work, we present the first computational investigation of visual metonymy. We introduce a novel pipeline grounded in semiotic theory that leverages large language models and text-to-image models to generate metonymic visual representations. Using this framework, we construct ViMET, the first visual metonymy dataset comprising 2,000 multiple-choice questions to evaluate the cognitive reasoning abilities in multimodal language models. Experimental results on our dataset reveal a significant gap between human performance (86.9%) and state-of-the-art vision-language models (65.9%), highlighting limitations in machines' ability to interpret indirect visual references. Our dataset is publicly available at: https://github.com/cincynlp/ViMET.

</details>

### [SQL-Trail: Multi-Turn Reinforcement Learning with Interleaved Feedback for Text-to-SQL](https://arxiv.org/abs/2601.17699v1)
- **arXiv**: 2601.17699v1
- **Published**: 2026-01-25
- **Stance**: SUPPORTS
- **Priority**: 3/10
- **Classified by**: Keyword
- **Why read**: General reasoning paper (keyword match)

<details>
<summary>Abstract</summary>

While large language models (LLMs) have substantially improved Text-to-SQL generation, a pronounced gap remains between AI systems and human experts on challenging benchmarks such as BIRD-SQL. We argue this gap stems largely from the prevailing single-pass paradigm, which lacks the iterative reasoning, schema exploration, and error-correction behaviors that humans naturally employ. To address this limitation, we introduce SQL-Trail, a multi-turn reinforcement learning (RL) agentic framework for Text-to-SQL. Rather than producing a query in one shot, SQL-Trail interacts with the database environment and uses execution feedback to iteratively refine its predictions. Our approach centers on two key ideas: (i) an adaptive turn-budget allocation mechanism that scales the agent's interaction depth to match question difficulty, and (ii) a composite reward panel that jointly incentivizes SQL correctness and efficient exploration. Across benchmarks, SQL-Trail sets a new state of the art and delivers strong data efficiency--up to 18x higher than prior single-pass RL state-of-the-art methods. Notably, our 7B and 14B models outperform substantially larger proprietary systems by 5% on average, underscoring the effectiveness of interactive, agentic workflows for robust Text-to-SQL generation.

</details>

### [From Chains to DAGs: Probing the Graph Structure of Reasoning in LLMs](https://arxiv.org/abs/2601.17593v1)
- **arXiv**: 2601.17593v1
- **Published**: 2026-01-24
- **Stance**: CHALLENGES
- **Priority**: 3/10
- **Classified by**: Keyword
- **Why read**: General reasoning paper (keyword match)

<details>
<summary>Abstract</summary>

Recent progress in large language models has renewed interest in mechanistically characterizing how multi-step reasoning is represented and computed. While much prior work treats reasoning as a linear chain of steps, many reasoning problems are more naturally structured as directed acyclic graphs (DAGs), where intermediate conclusions may depend on multiple premises, branch into parallel sub-derivations, and later merge or be reused. Understanding whether such graph-structured reasoning is reflected in model internals remains an open question.   In this work, we introduce Reasoning DAG Probing, a framework that directly asks whether LLM hidden states encode the geometry of a reasoning DAG in a linearly accessible form, and where this structure emerges across layers. Within this framework, we associate each reasoning node with a textual realization and train lightweight probes to predict two graph-theoretic properties from hidden states: node depth and pairwise node distance. We use these probes to analyze the layerwise emergence of DAG structure and evaluate controls that disrupt reasoning-relevant structure while preserving superficial textual properties. Our results provide evidence that reasoning DAG geometry is meaningfully encoded in intermediate layers, with recoverability varying systematically by node depth and model scale, suggesting that LLM reasoning is not only sequential but exhibits measurable internal graph structure.

</details>

### [Revealing the Truth with ConLLM for Detecting Multi-Modal Deepfakes](https://arxiv.org/abs/2601.17530v1)
- **arXiv**: 2601.17530v1
- **Published**: 2026-01-24
- **Stance**: SUPPORTS
- **Priority**: 3/10
- **Classified by**: Keyword
- **Why read**: General reasoning paper (keyword match)

<details>
<summary>Abstract</summary>

The rapid rise of deepfake technology poses a severe threat to social and political stability by enabling hyper-realistic synthetic media capable of manipulating public perception. However, existing detection methods struggle with two core limitations: (1) modality fragmentation, which leads to poor generalization across diverse and adversarial deepfake modalities; and (2) shallow inter-modal reasoning, resulting in limited detection of fine-grained semantic inconsistencies. To address these, we propose ConLLM (Contrastive Learning with Large Language Models), a hybrid framework for robust multimodal deepfake detection. ConLLM employs a two-stage architecture: stage 1 uses Pre-Trained Models (PTMs) to extract modality-specific embeddings; stage 2 aligns these embeddings via contrastive learning to mitigate modality fragmentation, and refines them using LLM-based reasoning to address shallow inter-modal reasoning by capturing semantic inconsistencies. ConLLM demonstrates strong performance across audio, video, and audio-visual modalities. It reduces audio deepfake EER by up to 50%, improves video accuracy by up to 8%, and achieves approximately 9% accuracy gains in audio-visual tasks. Ablation studies confirm that PTM-based embeddings contribute 9%-10% consistent improvements across modalities.

</details>

### [SpatialMath: Spatial Comprehension-Infused Symbolic Reasoning for Mathematical Problem-Solving](https://arxiv.org/abs/2601.17489v1)
- **arXiv**: 2601.17489v1
- **Published**: 2026-01-24
- **Stance**: SUPPORTS
- **Priority**: 3/10
- **Classified by**: Keyword
- **Why read**: General reasoning paper (keyword match)

<details>
<summary>Abstract</summary>

Multimodal Small-to-Medium sized Language Models (MSLMs) have demonstrated strong capabilities in integrating visual and textual information but still face significant limitations in visual comprehension and mathematical reasoning, particularly in geometric problems with diverse levels of visual infusion. Current models struggle to accurately decompose intricate visual inputs and connect perception with structured reasoning, leading to suboptimal performance. To address these challenges, we propose SpatialMath, a novel Spatial Comprehension-Infused Symbolic Reasoning Framework designed to integrate spatial representations into structured symbolic reasoning chains. SpatialMath employs a specialized perception module to extract spatially-grounded representations from visual diagrams, capturing critical geometric structures and spatial relationships. These representations are then methodically infused into symbolic reasoning chains, facilitating visual comprehension-aware structured reasoning. To this end, we introduce MATHVERSE-PLUS, a novel dataset containing structured visual interpretations and step-by-step reasoning paths for vision-intensive mathematical problems. SpatialMath significantly outperforms strong multimodal baselines, achieving up to 10 percentage points improvement over supervised fine-tuning with data augmentation in vision-intensive settings. Robustness analysis reveals that enhanced spatial representations directly improve reasoning accuracy, reinforcing the need for structured perception-to-reasoning pipelines in MSLMs.

</details>

### [Oops, Wait: Token-Level Signals as a Lens into LLM Reasoning](https://arxiv.org/abs/2601.17421v1)
- **arXiv**: 2601.17421v1
- **Published**: 2026-01-24
- **Stance**: CHALLENGES
- **Priority**: 3/10
- **Classified by**: Keyword
- **Why read**: General reasoning paper (keyword match)

<details>
<summary>Abstract</summary>

The emergence of discourse-like tokens such as "wait" and "therefore" in large language models (LLMs) has offered a unique window into their reasoning processes. However, systematic analyses of how such signals vary across training strategies and model scales remain lacking. In this paper, we analyze token-level signals through token probabilities across various models. We find that specific tokens strongly correlate with reasoning correctness, varying with training strategies while remaining stable across model scales. A closer look at the "wait" token in relation to answer probability demonstrates that models fine-tuned on small-scale datasets acquire reasoning ability through such signals but exploit them only partially. This work provides a systematic lens to observe and understand the dynamics of LLM reasoning.

</details>

### [FastInsight: Fast and Insightful Retrieval via Fusion Operators for Graph RAG](https://arxiv.org/abs/2601.18579v1)
- **arXiv**: 2601.18579v1
- **Published**: 2026-01-26
- **Stance**: SUPPORTS
- **Priority**: 3/10
- **Classified by**: Keyword
- **Why read**: General reasoning paper (keyword match)

<details>
<summary>Abstract</summary>

Existing Graph RAG methods aiming for insightful retrieval on corpus graphs typically rely on time-intensive processes that interleave Large Language Model (LLM) reasoning. To enable time-efficient insightful retrieval, we propose FastInsight. We first introduce a graph retrieval taxonomy that categorizes existing methods into three fundamental operations: vector search, graph search, and model-based search. Through this taxonomy, we identify two critical limitations in current approaches: the topology-blindness of model-based search and the semantics-blindness of graph search. FastInsight overcomes these limitations by interleaving two novel fusion operators: the Graph-based Reranker (GRanker), which functions as a graph model-based search, and Semantic-Topological eXpansion (STeX), which operates as a vector-graph search. Extensive experiments on broad retrieval and generation datasets demonstrate that FastInsight significantly improves both retrieval accuracy and generation quality compared to state-of-the-art baselines, achieving a substantial Pareto improvement in the trade-off between effectiveness and efficiency.

</details>

### [TriPlay-RL: Tri-Role Self-Play Reinforcement Learning for LLM Safety Alignment](https://arxiv.org/abs/2601.18292v1)
- **arXiv**: 2601.18292v1
- **Published**: 2026-01-26
- **Stance**: CHALLENGES
- **Priority**: 3/10
- **Classified by**: Keyword
- **Why read**: General reasoning paper (keyword match)

<details>
<summary>Abstract</summary>

In recent years, safety risks associated with large language models have become increasingly prominent, highlighting the urgent need to mitigate the generation of toxic and harmful content. The mainstream paradigm for LLM safety alignment typically adopts a collaborative framework involving three roles: an attacker for adversarial prompt generation, a defender for safety defense, and an evaluator for response assessment. In this paper, we propose a closed-loop reinforcement learning framework called TriPlay-RL that enables iterative and co-improving collaboration among three roles with near-zero manual annotation. Experimental results show that the attacker preserves high output diversity while achieving a 20%-50% improvement in adversarial effectiveness; the defender attains 10%-30% gains in safety performance without degrading general reasoning capability; and the evaluator continuously refines its fine-grained judgment ability through iterations, accurately distinguishing unsafe responses, simple refusals, and useful guidance. Overall, our framework establishes an efficient and scalable paradigm for LLM safety alignment, enabling continuous co-evolution within a unified learning loop.

</details>

### [UniCog: Uncovering Cognitive Abilities of LLMs through Latent Mind Space Analysis](https://arxiv.org/abs/2601.17897v1)
- **arXiv**: 2601.17897v1
- **Published**: 2026-01-25
- **Stance**: SUPPORTS
- **Priority**: 3/10
- **Classified by**: Keyword
- **Why read**: General reasoning paper (keyword match)

<details>
<summary>Abstract</summary>

A growing body of research suggests that the cognitive processes of large language models (LLMs) differ fundamentally from those of humans. However, existing interpretability methods remain limited in explaining how cognitive abilities are engaged during LLM reasoning. In this paper, we propose UniCog, a unified framework that analyzes LLM cognition via a latent mind space. Formulated as a latent variable model, UniCog encodes diverse abilities from dense model activations into sparse, disentangled latent dimensions. Through extensive analysis on six advanced LLMs, including DeepSeek-V3.2 and GPT-4o, we reveal a Pareto principle of LLM cognition, where a shared reasoning core is complemented by ability-specific signatures. Furthermore, we discover that reasoning failures often manifest as anomalous intensity in latent activations. These findings opens a new paradigm in LLM analysis, providing a cognition grounded view of reasoning dynamics. Finally, leveraging these insights, we introduce a latent-informed candidate prioritization strategy, which improves reasoning performance by up to 7.5% across challenging benchmarks. Our code is available at https://github.com/milksalute/unicog.

</details>

### [Code over Words: Overcoming Semantic Inertia via Code-Grounded Reasoning](https://arxiv.org/abs/2601.18352v1)
- **arXiv**: 2601.18352v1
- **Published**: 2026-01-26
- **Stance**: BALANCED
- **Priority**: 2/10
- **Classified by**: Keyword
- **Why read**: General reasoning paper (keyword match)

<details>
<summary>Abstract</summary>

LLMs struggle with Semantic Inertia: the inability to inhibit pre-trained priors (e.g., "Lava is Dangerous") when dynamic, in-context rules contradict them. We probe this phenomenon using Baba Is You, where physical laws are mutable text rules, enabling precise evaluation of models' ability to override learned priors when rules change. We quantatively observe that larger models can exhibit inverse scaling: they perform worse than smaller models when natural language reasoning requires suppressing pre-trained associations (e.g., accepting "Lava is Safe"). Our analysis attributes this to natural language encoding, which entangles descriptive semantics and logical rules, leading to persistent hallucinations of familiar physics despite explicit contradictory rules. Here we show that representing dynamics as executable code, rather than descriptive text, reverses this trend and enables effective prior inhibition. We introduce Code-Grounded Vistas (LCV), which fine-tunes models on counterfactual pairs and identifies states with contradictory rules, thereby forcing attention to logical constraints rather than visual semantics. This training-time approach outperforms expensive inference-time search methods in both efficiency and accuracy. Our results demonstrate that representation fundamentally determines whether scaling improves or impairs contextual reasoning. This challenges the assumption that larger models are universally better, with implications for domains that require dynamic overriding of learned priors.

</details>

### [Overalignment in Frontier LLMs: An Empirical Study of Sycophantic Behaviour in Healthcare](https://arxiv.org/abs/2601.18334v1)
- **arXiv**: 2601.18334v1
- **Published**: 2026-01-26
- **Stance**: BALANCED
- **Priority**: 2/10
- **Classified by**: Keyword
- **Why read**: General reasoning paper (keyword match)

<details>
<summary>Abstract</summary>

As LLMs are increasingly integrated into clinical workflows, their tendency for sycophancy, prioritizing user agreement over factual accuracy, poses significant risks to patient safety. While existing evaluations often rely on subjective datasets, we introduce a robust framework grounded in medical MCQA with verifiable ground truths. We propose the Adjusted Sycophancy Score, a novel metric that isolates alignment bias by accounting for stochastic model instability, or "confusability". Through an extensive scaling analysis of the Qwen-3 and Llama-3 families, we identify a clear scaling trajectory for resilience. Furthermore, we reveal a counter-intuitive vulnerability in reasoning-optimized "Thinking" models: while they demonstrate high vanilla accuracy, their internal reasoning traces frequently rationalize incorrect user suggestions under authoritative pressure. Our results across frontier models suggest that benchmark performance is not a proxy for clinical reliability, and that simplified reasoning structures may offer superior robustness against expert-driven sycophancy.

</details>

### [PaperSearchQA: Learning to Search and Reason over Scientific Papers with RLVR](https://arxiv.org/abs/2601.18207v1)
- **arXiv**: 2601.18207v1
- **Published**: 2026-01-26
- **Stance**: BALANCED
- **Priority**: 2/10
- **Classified by**: Keyword
- **Why read**: General reasoning paper (keyword match)

<details>
<summary>Abstract</summary>

Search agents are language models (LMs) that reason and search knowledge bases (or the web) to answer questions; recent methods supervise only the final answer accuracy using reinforcement learning with verifiable rewards (RLVR). Most RLVR search agents tackle general-domain QA, which limits their relevance to technical AI systems in science, engineering, and medicine. In this work we propose training agents to search and reason over scientific papers -- this tests technical question-answering, it is directly relevant to real scientists, and the capabilities will be crucial to future AI Scientist systems. Concretely, we release a search corpus of 16 million biomedical paper abstracts and construct a challenging factoid QA dataset called PaperSearchQA with 60k samples answerable from the corpus, along with benchmarks. We train search agents in this environment to outperform non-RL retrieval baselines; we also perform further quantitative analysis and observe interesting agent behaviors like planning, reasoning, and self-verification. Our corpus, datasets, and benchmarks are usable with the popular Search-R1 codebase for RLVR training and released on https://huggingface.co/collections/jmhb/papersearchqa. Finally, our data creation methods are scalable and easily extendable to other scientific domains.

</details>

### [MemWeaver: Weaving Hybrid Memories for Traceable Long-Horizon Agentic Reasoning](https://arxiv.org/abs/2601.18204v1)
- **arXiv**: 2601.18204v1
- **Published**: 2026-01-26
- **Stance**: BALANCED
- **Priority**: 2/10
- **Classified by**: Keyword
- **Why read**: General reasoning paper (keyword match)

<details>
<summary>Abstract</summary>

Large language model-based agents operating in long-horizon interactions require memory systems that support temporal consistency, multi-hop reasoning, and evidence-grounded reuse across sessions. Existing approaches largely rely on unstructured retrieval or coarse abstractions, which often lead to temporal conflicts, brittle reasoning, and limited traceability. We propose MemWeaver, a unified memory framework that consolidates long-term agent experiences into three interconnected components: a temporally grounded graph memory for structured relational reasoning, an experience memory that abstracts recurring interaction patterns from repeated observations, and a passage memory that preserves original textual evidence. MemWeaver employs a dual-channel retrieval strategy that jointly retrieves structured knowledge and supporting evidence to construct compact yet information-dense contexts for reasoning. Experiments on the LoCoMo benchmark demonstrate that MemWeaver substantially improves multi-hop and temporal reasoning accuracy while reducing input context length by over 95\% compared to long-context baselines.

</details>

### [DeepPlanning: Benchmarking Long-Horizon Agentic Planning with Verifiable Constraints](https://arxiv.org/abs/2601.18137v1)
- **arXiv**: 2601.18137v1
- **Published**: 2026-01-26
- **Stance**: BALANCED
- **Priority**: 2/10
- **Classified by**: Keyword
- **Why read**: General reasoning paper (keyword match)

<details>
<summary>Abstract</summary>

While agent evaluation has shifted toward long-horizon tasks, most benchmarks still emphasize local, step-level reasoning rather than the global constrained optimization (e.g., time and financial budgets) that demands genuine planning ability. Meanwhile, existing LLM planning benchmarks underrepresent the active information gathering and fine-grained local constraints typical of real-world settings. To address this, we introduce DeepPlanning, a challenging benchmark for practical long-horizon agent planning. It features multi-day travel planning and multi-product shopping tasks that require proactive information acquisition, local constrained reasoning, and global constrained optimization. Evaluations on DeepPlanning show that even frontier agentic LLMs struggle with these problems, highlighting the importance of reliable explicit reasoning patterns and parallel tool use for achieving better effectiveness-efficiency trade-offs. Error analysis further points to promising directions for improving agentic LLMs over long planning horizons. We open-source the code and data to support future research.

</details>

### [CHiRPE: A Step Towards Real-World Clinical NLP with Clinician-Oriented Model Explanations](https://arxiv.org/abs/2601.18102v1)
- **arXiv**: 2601.18102v1
- **Published**: 2026-01-26
- **Stance**: BALANCED
- **Priority**: 2/10
- **Classified by**: Keyword
- **Why read**: General reasoning paper (keyword match)

<details>
<summary>Abstract</summary>

The medical adoption of NLP tools requires interpretability by end users, yet traditional explainable AI (XAI) methods are misaligned with clinical reasoning and lack clinician input. We introduce CHiRPE (Clinical High-Risk Prediction with Explainability), an NLP pipeline that takes transcribed semi-structured clinical interviews to: (i) predict psychosis risk; and (ii) generate novel SHAP explanation formats co-developed with clinicians. Trained on 944 semi-structured interview transcripts across 24 international clinics of the AMP-SCZ study, the CHiRPE pipeline integrates symptom-domain mapping, LLM summarisation, and BERT classification. CHiRPE achieved over 90% accuracy across three BERT variants and outperformed baseline models. Explanation formats were evaluated by 28 clinical experts who indicated a strong preference for our novel concept-guided explanations, especially hybrid graph-and-text summary formats. CHiRPE demonstrates that clinically-guided model development produces both accurate and interpretable results. Our next step is focused on real-world testing across our 24 international sites.

</details>

### [Evaluating Semantic and Syntactic Understanding in Large Language Models for Payroll Systems](https://arxiv.org/abs/2601.18012v1)
- **arXiv**: 2601.18012v1
- **Published**: 2026-01-25
- **Stance**: BALANCED
- **Priority**: 2/10
- **Classified by**: Keyword
- **Why read**: General reasoning paper (keyword match)

<details>
<summary>Abstract</summary>

Large language models are now used daily for writing, search, and analysis, and their natural language understanding continues to improve. However, they remain unreliable on exact numerical calculation and on producing outputs that are straightforward to audit. We study synthetic payroll system as a focused, high-stakes example and evaluate whether models can understand a payroll schema, apply rules in the right order, and deliver cent-accurate results. Our experiments span a tiered dataset from basic to complex cases, a spectrum of prompts from minimal baselines to schema-guided and reasoning variants, and multiple model families including GPT, Claude, Perplexity, Grok and Gemini. Results indicate clear regimes where careful prompting is sufficient and regimes where explicit computation is required. The work offers a compact, reproducible framework and practical guidance for deploying LLMs in settings that demand both accuracy and assurance.

</details>

### [SD-E$^2$: Semantic Exploration for Reasoning Under Token Budgets](https://arxiv.org/abs/2601.17982v1)
- **arXiv**: 2601.17982v1
- **Published**: 2026-01-25
- **Stance**: BALANCED
- **Priority**: 2/10
- **Classified by**: Keyword
- **Why read**: General reasoning paper (keyword match)

<details>
<summary>Abstract</summary>

Small language models (SLMs) struggle with complex reasoning because exploration is expensive under tight compute budgets. We introduce Semantic Diversity-Exploration-Exploitation (SD-E$^2$), a reinforcement learning framework that makes exploration explicit by optimizing semantic diversity in generated reasoning trajectories. Using a frozen sentence-embedding model, SD-E$^2$ assigns a diversity reward that captures (i) the coverage of semantically distinct solution strategies and (ii) their average pairwise dissimilarity in embedding space, rather than surface-form novelty. This diversity reward is combined with outcome correctness and solution efficiency in a z-score-normalized multi-objective objective that stabilizes training. On GSM8K, SD-E$^2$ surpasses the base Qwen2.5-3B-Instruct and strong GRPO baselines (GRPO-CFL and GRPO-CFEE) by +27.4, +5.2, and +1.5 percentage points, respectively, while discovering on average 9.8 semantically distinct strategies per question. We further improve MedMCQA to 49.64% versus 38.37% for the base model and show gains on the harder AIME benchmark (1983-2025), reaching 13.28% versus 6.74% for the base. These results indicate that rewarding semantic novelty yields a more compute-efficient exploration-exploitation signal for training reasoning-capable SLMs. By introducing cognitive adaptation-adjusting the reasoning process structure rather than per-token computation-SD-E$^2$ offers a complementary path to efficiency gains in resource-constrained models.

</details>

### [LLMs as Cultural Archives: Cultural Commonsense Knowledge Graph Extraction](https://arxiv.org/abs/2601.17971v1)
- **arXiv**: 2601.17971v1
- **Published**: 2026-01-25
- **Stance**: BALANCED
- **Priority**: 2/10
- **Classified by**: Keyword
- **Why read**: General reasoning paper (keyword match)

<details>
<summary>Abstract</summary>

Large language models (LLMs) encode rich cultural knowledge learned from diverse web-scale data, offering an unprecedented opportunity to model cultural commonsense at scale. Yet this knowledge remains mostly implicit and unstructured, limiting its interpretability and use. We present an iterative, prompt-based framework for constructing a Cultural Commonsense Knowledge Graph (CCKG) that treats LLMs as cultural archives, systematically eliciting culture-specific entities, relations, and practices and composing them into multi-step inferential chains across languages. We evaluate CCKG on five countries with human judgments of cultural relevance, correctness, and path coherence. We find that the cultural knowledge graphs are better realized in English, even when the target culture is non-English (e.g., Chinese, Indonesian, Arabic), indicating uneven cultural encoding in current LLMs. Augmenting smaller LLMs with CCKG improves performance on cultural reasoning and story generation, with the largest gains from English chains. Our results show both the promise and limits of LLMs as cultural technologies and that chain-structured cultural knowledge is a practical substrate for culturally grounded NLP.

</details>

### [EFT-CoT: A Multi-Agent Chain-of-Thought Framework for Emotion-Focused Therapy](https://arxiv.org/abs/2601.17842v1)
- **arXiv**: 2601.17842v1
- **Published**: 2026-01-25
- **Stance**: BALANCED
- **Priority**: 2/10
- **Classified by**: Keyword
- **Why read**: General reasoning paper (keyword match)

<details>
<summary>Abstract</summary>

Leveraging Large Language Models (LLMs) for Mental Health Question Answering (MHQA) is promising for mitigating resource shortages. However, existing Cognitive Behavioral Therapy (CBT)-based approaches predominantly favor a "top-down" rational restructuring, often neglecting clients' embodied experiences and primary emotion processing. To address this, we propose an Emotion-Focused Therapy (EFT)-based Multi-Agent Chain-of-Thought framework (EFT-CoT). Adopting a "bottom-up" trajectory, it deconstructs the intervention into a three-stage reasoning flow: "Embodied Perception - Cognitive Exploration - Narrative Intervention." Utilizing eight specialized agents, the system explicitly executes critical components such as somatic awareness mapping, adaptive assessment, core belief extraction, and narrative restructuring. We further constructed "EFT-Instruct," a high-quality dataset via Chain-of-Thought distillation of approximately 67,000 authentic texts, and fine-tuned a specialized model, EFT-LLM. Experimental evaluations demonstrate that EFT-LLM outperforms strong baselines and human responses across metrics like empathy depth and structural professionalism. Ablation studies confirm the necessity of the multi-agent mechanism. The model exhibits superior psychological reasoning, offering an effective pathway for interpretable, high-empathy counseling systems.

</details>

### [LegalMALR:Multi-Agent Query Understanding and LLM-Based Reranking for Chinese Statute Retrieval](https://arxiv.org/abs/2601.17692v1)
- **arXiv**: 2601.17692v1
- **Published**: 2026-01-25
- **Stance**: BALANCED
- **Priority**: 2/10
- **Classified by**: Keyword
- **Why read**: General reasoning paper (keyword match)

<details>
<summary>Abstract</summary>

Statute retrieval is essential for legal assistance and judicial decision support, yet real-world legal queries are often implicit, multi-issue, and expressed in colloquial or underspecified forms. These characteristics make it difficult for conventional retrieval-augmented generation pipelines to recover the statutory elements required for accurate retrieval. Dense retrievers focus primarily on the literal surface form of the query, whereas lightweight rerankers lack the legal-reasoning capacity needed to assess statutory applicability. We present LegalMALR, a retrieval framework that integrates a Multi-Agent Query Understanding System (MAS) with a zero-shot large-language-model-based reranking module (LLM Reranker). MAS generates diverse, legally grounded reformulations and conducts iterative dense retrieval to broaden candidate coverage. To stabilise the stochastic behaviour of LLM-generated rewrites, we optimise a unified MAS policy using Generalized Reinforcement Policy Optimization(GRPO). The accumulated candidate set is subsequently evaluated by the LLM Reranker, which performs natural-language legal reasoning to produce the final ranking. We further construct CSAID, a dataset of 118 difficult Chinese legal queries annotated with multiple statutory labels, and evaluate LegalMALR on both CSAID and the public STARD benchmark. Experiments show that LegalMALR substantially outperforms strong Retrieval-augmented generation(RAG) baselines in both in-distribution and out-of-distribution settings, demonstrating the effectiveness of combining multi-perspective query interpretation, reinforcement-based policy optimisation, and large-model reranking for statute retrieval.

</details>

### [Align to the Pivot: Dual Alignment with Self-Feedback for Multilingual Math Reasoning](https://arxiv.org/abs/2601.17671v1)
- **arXiv**: 2601.17671v1
- **Published**: 2026-01-25
- **Stance**: BALANCED
- **Priority**: 2/10
- **Classified by**: Keyword
- **Why read**: General reasoning paper (keyword match)

<details>
<summary>Abstract</summary>

Despite the impressive reasoning abilities demonstrated by large language models (LLMs), empirical evidence indicates that they are not language agnostic as expected, leading to performance declines in multilingual settings, especially for low-resource languages. We attribute the decline to the model's inconsistent multilingual understanding and reasoning alignment. To address this, we present Pivot-Aligned Self-Feedback Multilingual Reasoning (PASMR), aiming to improve the alignment of multilingual math reasoning abilities in LLMs. This approach designates the model's primary language as the pivot language. During training, the model first translates questions into the pivot language to facilitate better alignment of reasoning patterns. The reasoning process in the target language is then supervised by the pivot language's reasoning answers, thereby establishing a cross-lingual self-feedback mechanism without relying on external correct answers or reward models. Extensive experimental results demonstrate that our method enhances both the model's understanding of questions and its reasoning capabilities, leading to notable task improvements.

</details>

### [Fast KVzip: Efficient and Accurate LLM Inference with Gated KV Eviction](https://arxiv.org/abs/2601.17668v1)
- **arXiv**: 2601.17668v1
- **Published**: 2026-01-25
- **Stance**: BALANCED
- **Priority**: 2/10
- **Classified by**: Keyword
- **Why read**: General reasoning paper (keyword match)

<details>
<summary>Abstract</summary>

Efficient key-value (KV) cache management is crucial for the practical deployment of large language models (LLMs), yet existing compression techniques often incur a trade-off between performance degradation and computational overhead. We propose a novel gating-based KV cache eviction method for frozen-weight LLMs that achieves high compression ratios with negligible computational cost. Our approach introduces lightweight sink-attention gating modules to identify and retain critical KV pairs, and integrates seamlessly into both the prefill and decoding stages. The proposed gate training algorithm relies on forward passes of an LLM, avoiding expensive backpropagation, while achieving strong task generalization through a task-agnostic reconstruction objective. Extensive experiments across the Qwen2.5-1M, Qwen3, and Gemma3 families show that our method maintains near-lossless performance while evicting up to 70% of the KV cache. The results are consistent across a wide range of tasks, including long-context understanding, code comprehension, and mathematical reasoning, demonstrating the generality of our approach.

</details>

### [Agentic Search in the Wild: Intents and Trajectory Dynamics from 14M+ Real Search Requests](https://arxiv.org/abs/2601.17617v1)
- **arXiv**: 2601.17617v1
- **Published**: 2026-01-24
- **Stance**: BALANCED
- **Priority**: 2/10
- **Classified by**: Keyword
- **Why read**: General reasoning paper (keyword match)

<details>
<summary>Abstract</summary>

LLM-powered search agents are increasingly being used for multi-step information seeking tasks, yet the IR community lacks empirical understanding of how agentic search sessions unfold and how retrieved evidence is used. This paper presents a large-scale log analysis of agentic search based on 14.44M search requests (3.97M sessions) collected from DeepResearchGym, i.e. an open-source search API accessed by external agentic clients. We sessionize the logs, assign session-level intents and step-wise query-reformulation labels using LLM-based annotation, and propose Context-driven Term Adoption Rate (CTAR) to quantify whether newly introduced query terms are traceable to previously retrieved evidence. Our analyses reveal distinctive behavioral patterns. First, over 90% of multi-turn sessions contain at most ten steps, and 89% of inter-step intervals fall under one minute. Second, behavior varies by intent. Fact-seeking sessions exhibit high repetition that increases over time, while sessions requiring reasoning sustain broader exploration. Third, agents reuse evidence across steps. On average, 54% of newly introduced query terms appear in the accumulated evidence context, with contributions from earlier steps beyond the most recent retrieval. The findings suggest that agentic search may benefit from repetition-aware early stopping, intent-adaptive retrieval budgets, and explicit cross-step context tracking. We plan to release the anonymized logs to support future research.

</details>

### [$α^3$-SecBench: A Large-Scale Evaluation Suite of Security, Resilience, and Trust for LLM-based UAV Agents over 6G Networks](https://arxiv.org/abs/2601.18754v1)
- **arXiv**: 2601.18754v1
- **Published**: 2026-01-26
- **Stance**: BALANCED
- **Priority**: 2/10
- **Classified by**: Keyword
- **Why read**: General reasoning paper (keyword match)

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
- **Why read**: General reasoning paper (keyword match)

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
- **Why read**: General reasoning paper (keyword match)

<details>
<summary>Abstract</summary>

Although Large Language Models (LLMs) have demonstrated impressive formal reasoning abilities, they often break down when problems require complex proof planning. One promising approach for improving LLM reasoning abilities involves translating problems into formal logic and using a logic solver. Although off-the-shelf logic solvers are in principle substantially more efficient than LLMs at logical reasoning, they assume that all relevant facts are provided in a question and are unable to deal with missing commonsense relations. In this work, we propose a novel method that uses feedback from the logic solver to augment a logic problem with commonsense relations provided by the LLM, in an iterative manner. This involves a search procedure through potential commonsense assumptions to maximize the chance of finding useful facts while keeping cost tractable. On a collection of pure-logical reasoning datasets, from which some commonsense information has been removed, our method consistently achieves considerable improvements over existing techniques, demonstrating the value in balancing neural and symbolic elements when working in human contexts.

</details>

### [RareAlert: Aligning heterogeneous large language model reasoning for early rare disease risk screening](https://arxiv.org/abs/2601.18132v1)
- **arXiv**: 2601.18132v1
- **Published**: 2026-01-26
- **Stance**: BALANCED
- **Priority**: 2/10
- **Classified by**: Keyword
- **Why read**: General reasoning paper (keyword match)

<details>
<summary>Abstract</summary>

Missed and delayed diagnosis remains a major challenge in rare disease care. At the initial clinical encounters, physicians assess rare disease risk using only limited information under high uncertainty. When high-risk patients are not recognised at this stage, targeted diagnostic testing is often not initiated, resulting in missed diagnosis. Existing primary care triage processes are structurally insufficient to reliably identify patients with rare diseases at initial clinical presentation and universal screening is needed to reduce diagnostic delay. Here we present RareAlert, an early screening system which predict patient-level rare disease risk from routinely available primary-visit information. RareAlert integrates reasoning generated by ten LLMs, calibrates and weights these signals using machine learning, and distils the aligned reasoning into a single locally deployable model. To develop and evaluate RareAlert, we curated RareBench, a real-world dataset of 158,666 cases covering 33 Orphanet disease categories and more than 7,000 rare conditions, including both rare and non-rare presentations. The results showed that rare disease identification can be reconceptualised as a universal uncertainty resolution process applied to the general patient population. On an independent test set, RareAlert, a Qwen3-4B based model trained with calibrated reasoning signals, achieved an AUC of 0.917, outperforming the best machine learning ensemble and all evaluated LLMs, including GPT-5, DeepSeek-R1, Claude-3.7-Sonnet, o3-mini, Gemini-2.5-Pro, and Qwen3-235B. These findings demonstrate the diversity in LLM medical reasoning and the effectiveness of aligning such reasoning in highly uncertain clinical tasks. By incorporating calibrated reasoning into a single model, RareAlert enables accurate, privacy-preserving, and scalable rare disease risk screening suitable for large-scale local deployment.

</details>

### [Beyond Text-to-SQL: Can LLMs Really Debug Enterprise ETL SQL?](https://arxiv.org/abs/2601.18119v1)
- **arXiv**: 2601.18119v1
- **Published**: 2026-01-26
- **Stance**: BALANCED
- **Priority**: 2/10
- **Classified by**: Keyword
- **Why read**: General reasoning paper (keyword match)

<details>
<summary>Abstract</summary>

SQL is central to enterprise data engineering, yet generating fully correct SQL code in a single attempt remains difficult, even for experienced developers and advanced text-to-SQL LLMs, often requiring multiple debugging iterations. We introduce OurBench, the first benchmark for enterprise-level SQL reasoning and debugging. Our benchmark is built on two key innovations: (1) an automated construction workflow that uses reverse engineering to systematically inject realistic bugs into large-scale SQL code, enabling scalable and diverse benchmark generation; and (2) an execution-free evaluation framework tailored to enterprise settings, providing fast, accurate, and resource-efficient assessment.   OurBench comprises 469 OurBenchSyn queries featuring syntax errors with explicit error messages, and 516 OurBenchSem queries targeting semantic errors in which the code fails to meet user intent. The queries are highly complex, averaging over 140 lines and featuring deep and wide abstract syntax trees.   Evaluation of nearly 30 LLMs reveals a substantial performance gap: the best-performing model, Claude-4-Sonnet, achieves only 36.46 percent accuracy on OurBenchSyn and 32.17 percent on OurBenchSem, while most models score below 20 percent. We further explore four solution strategies, identify key challenges, and outline promising directions for enterprise SQL debugging with LLMs.

</details>

### [EvolVE: Evolutionary Search for LLM-based Verilog Generation and Optimization](https://arxiv.org/abs/2601.18067v1)
- **arXiv**: 2601.18067v1
- **Published**: 2026-01-26
- **Stance**: BALANCED
- **Priority**: 2/10
- **Classified by**: Keyword
- **Why read**: General reasoning paper (keyword match)

<details>
<summary>Abstract</summary>

Verilog's design cycle is inherently labor-intensive and necessitates extensive domain expertise. Although Large Language Models (LLMs) offer a promising pathway toward automation, their limited training data and intrinsic sequential reasoning fail to capture the strict formal logic and concurrency inherent in hardware systems. To overcome these barriers, we present EvolVE, the first framework to analyze multiple evolution strategies on chip design tasks, revealing that Monte Carlo Tree Search (MCTS) excels at maximizing functional correctness, while Idea-Guided Refinement (IGR) proves superior for optimization. We further leverage Structured Testbench Generation (STG) to accelerate the evolutionary process. To address the lack of complex optimization benchmarks, we introduce IC-RTL, targeting industry-scale problems derived from the National Integrated Circuit Contest. Evaluations establish EvolVE as the new state-of-the-art, achieving 98.1% on VerilogEval v2 and 92% on RTLLM v2. Furthermore, on the industry-scale IC-RTL suite, our framework surpasses reference implementations authored by contest participants, reducing the Power, Performance, Area (PPA) product by up to 66% in Huffman Coding and 17% in the geometric mean across all problems. The source code of the IC-RTL benchmark is available at https://github.com/weiber2002/ICRTL.

</details>

### [Think Locally, Explain Globally: Graph-Guided LLM Investigations via Local Reasoning and Belief Propagation](https://arxiv.org/abs/2601.17915v1)
- **arXiv**: 2601.17915v1
- **Published**: 2026-01-25
- **Stance**: BALANCED
- **Priority**: 2/10
- **Classified by**: Keyword
- **Why read**: General reasoning paper (keyword match)

<details>
<summary>Abstract</summary>

LLM agents excel when environments are mostly static and the needed information fits in a model's context window, but they often fail in open-ended investigations where explanations must be constructed by iteratively mining evidence from massive, heterogeneous operational data. These investigations exhibit hidden dependency structure: entities interact, signals co-vary, and the importance of a fact may only become clear after other evidence is discovered. Because the context window is bounded, agents must summarize intermediate findings before their significance is known, increasing the risk of discarding key evidence. ReAct-style agents are especially brittle in this regime. Their retrieve-summarize-reason loop makes conclusions sensitive to exploration order and introduces run-to-run non-determinism, producing a reliability gap where Pass-at-k may be high but Majority-at-k remains low. Simply sampling more rollouts or generating longer reasoning traces does not reliably stabilize results, since hypotheses cannot be autonomously checked as new evidence arrives and there is no explicit mechanism for belief bookkeeping and revision. In addition, ReAct entangles semantic reasoning with controller duties such as tool orchestration and state tracking, so execution errors and plan drift degrade reasoning while consuming scarce context.   We address these issues by formulating investigation as abductive reasoning over a dependency graph and proposing EoG (Explanations over Graphs), a disaggregated framework in which an LLM performs bounded local evidence mining and labeling (cause vs symptom) while a deterministic controller manages traversal, state, and belief propagation to compute a minimal explanatory frontier. On a representative ITBench diagnostics task, EoG improves both accuracy and run-to-run consistency over ReAct baselines, including a 7x average gain in Majority-at-k entity F1.

</details>

### [VidLaDA: Bidirectional Diffusion Large Language Models for Efficient Video Understanding](https://arxiv.org/abs/2601.17868v1)
- **arXiv**: 2601.17868v1
- **Published**: 2026-01-25
- **Stance**: BALANCED
- **Priority**: 2/10
- **Classified by**: Keyword
- **Why read**: General reasoning paper (keyword match)

<details>
<summary>Abstract</summary>

Standard Autoregressive Video LLMs inevitably suffer from causal masking biases that hinder global spatiotemporal modeling, leading to suboptimal understanding efficiency. We propose VidLaDA, a Video LLM based on Diffusion Language Model utilizing bidirectional attention to capture bidirectional dependencies. To further tackle the inference bottleneck of diffusion decoding on massive video tokens, we introduce MARS-Cache. This framework accelerates inference by combining asynchronous visual cache refreshing with frame-wise chunk attention, effectively pruning redundancy while preserving global connectivity via anchor tokens. Extensive experiments show VidLaDA outperforms diffusion baselines and rivals state-of-the-art autoregressive models (e.g., Qwen2.5-VL and LLaVA-Video), with MARS-Cache delivering over 12x speedup without compromising reasoning accuracy. Code and checkpoints are open-sourced at https://github.com/ziHoHe/VidLaDA.

</details>

### [MMR-Bench: A Comprehensive Benchmark for Multimodal LLM Routing](https://arxiv.org/abs/2601.17814v1)
- **arXiv**: 2601.17814v1
- **Published**: 2026-01-25
- **Stance**: BALANCED
- **Priority**: 2/10
- **Classified by**: Keyword
- **Why read**: General reasoning paper (keyword match)

<details>
<summary>Abstract</summary>

Multimodal large language models (MLLMs) have advanced rapidly, yet heterogeneity in architecture, alignment strategies, and efficiency means that no single model is uniformly superior across tasks. In practical deployments, workloads span lightweight OCR to complex multimodal reasoning; using one MLLM for all queries either over-provisions compute on easy instances or sacrifices accuracy on hard ones. Query-level model selection (routing) addresses this tension, but extending routing from text-only LLMs to MLLMs is nontrivial due to modality fusion, wide variation in computational cost across models, and the absence of a standardized, budget-aware evaluation. We present MMR-Bench, a unified benchmark that isolates the multimodal routing problem and enables comparison under fixed candidate sets and cost models. MMR-Bench provides (i) a controlled environment with modality-aware inputs and variable compute budgets, (ii) a broad suite of vision-language tasks covering OCR, general VQA, and multimodal math reasoning, and (iii) strong single-model reference, oracle upper bounds, and representative routing policies. Using MMR-Bench, we show that incorporating multimodal signals improves routing quality. Empirically, these cues improve the cost-accuracy frontier and enable the routed system to exceed the strongest single model's accuracy at roughly 33% of its cost. Furthermore, policies trained on a subset of models and tasks generalize zero-shot to new datasets and text-only benchmarks without retuning, establishing MMR-Bench as a foundation for studying adaptive multimodal model selection and efficient MLLM deployment. The code will be available at: https://github.com/Hunter-Wrynn/MMR-Bench.

</details>

### [Agentic reinforcement learning empowers next-generation chemical language models for molecular design and synthesis](https://arxiv.org/abs/2601.17687v1)
- **arXiv**: 2601.17687v1
- **Published**: 2026-01-25
- **Stance**: BALANCED
- **Priority**: 2/10
- **Classified by**: Keyword
- **Why read**: General reasoning paper (keyword match)

<details>
<summary>Abstract</summary>

Language models are revolutionizing the biochemistry domain, assisting scientists in drug design and chemical synthesis with high efficiency. Yet current approaches struggle between small language models prone to hallucination and limited knowledge retention, and large cloud-based language models plagued by privacy risks and high inference costs. To bridge this gap, we introduce ChemCRAFT, a novel framework leveraging agentic reinforcement learning to decouple chemical reasoning from knowledge storage. Instead of forcing the model to memorize vast chemical data, our approach empowers the language model to interact with a sandbox for precise information retrieval. This externalization of knowledge allows a locally deployable small model to achieve superior performance with minimal inference costs. To enable small language models for agent-calling ability, we build an agentic trajectory construction pipeline and a comprehensive chemical-agent sandbox. Based on sandbox interactions, we constructed ChemToolDataset, the first large-scale chemical tool trajectory dataset. Simultaneously, we propose SMILES-GRPO to build a dense chemical reward function, promoting the model's ability to call chemical agents. Evaluations across diverse aspects of drug design show that ChemCRAFT outperforms current cloud-based LLMs in molecular structure analysis, molecular optimization, and synthesis pathway prediction, demonstrating that scientific reasoning is not solely an emergent ability of model scale, but a learnable policy of tool orchestration. This work establishes a cost-effective and privacy-preserving paradigm for AI-aided chemistry, opening new avenues for accelerating molecular discovery with locally deployable agents.

</details>

### [Real-Time Trend Prediction via Continually-Aligned LLM Query Generation](https://arxiv.org/abs/2601.17567v1)
- **arXiv**: 2601.17567v1
- **Published**: 2026-01-24
- **Stance**: BALANCED
- **Priority**: 2/10
- **Classified by**: Keyword
- **Why read**: General reasoning paper (keyword match)

<details>
<summary>Abstract</summary>

Trending news detection in low-traffic search environments faces a fundamental cold-start problem, where a lack of query volume prevents systems from identifying emerging or long-tail trends. Existing methods relying on keyword frequency or query spikes are inherently slow and ineffective in these sparse settings, lagging behind real-world shifts in attention. We introduce RTTP, a novel Real-Time Trending Prediction framework that generates search queries directly from news content instead of waiting for users to issue them. RTTP leverages a continual learning LLM (CL-LLM) that converts posts into search-style queries and scores them using engagement strength + creator authority, enabling early trend surfacing before search volume forms. To ensure adaptation without degrading reasoning, we propose Mix-Policy DPO, a new preference-based continual learning approach that combines on-policy stability with off-policy novelty to mitigate catastrophic forgetting during model upgrades. Deployed at production scale on Facebook and Meta AI products, RTTP delivers +91.4% improvement in tail-trend detection precision@500 and +19% query generation accuracy over industry baselines, while sustaining stable performance after multi-week online training. This work demonstrates that LLM-generated synthetic search signals, when aligned and continually updated, unlock timely trend understanding in low-traffic search environments.

</details>

### [A Syllogistic Probe: Tracing the Evolution of Logic Reasoning in Large Language Models](https://arxiv.org/abs/2601.17426v1)
- **arXiv**: 2601.17426v1
- **Published**: 2026-01-24
- **Stance**: BALANCED
- **Priority**: 2/10
- **Classified by**: Keyword
- **Why read**: General reasoning paper (keyword match)

<details>
<summary>Abstract</summary>

Human logic has gradually shifted from intuition-driven inference to rigorous formal systems. Motivated by recent advances in large language models (LLMs), we explore whether LLMs exhibit a similar evolution in the underlying logical framework. Using existential import as a probe, we for evaluate syllogism under traditional and modern logic. Through extensive experiments of testing SOTA LLMs on a new syllogism dataset, we have some interesting findings: (i) Model size scaling promotes the shift toward modern logic; (ii) Thinking serves as an efficient accelerator beyond parameter scaling; (iii) the Base model plays a crucial role in determining how easily and stably this shift can emerge. Beyond these core factors, we conduct additional experiments for in-depth analysis of properties of current LLMs on syllogistic reasoning.

</details>

### [Agentic Very Long Video Understanding](https://arxiv.org/abs/2601.18157v1)
- **arXiv**: 2601.18157v1
- **Published**: 2026-01-26
- **Stance**: BALANCED
- **Priority**: 2/10
- **Classified by**: Keyword
- **Why read**: General reasoning paper (keyword match)

<details>
<summary>Abstract</summary>

The advent of always-on personal AI assistants, enabled by all-day wearable devices such as smart glasses, demands a new level of contextual understanding, one that goes beyond short, isolated events to encompass the continuous, longitudinal stream of egocentric video. Achieving this vision requires advances in long-horizon video understanding, where systems must interpret and recall visual and audio information spanning days or even weeks. Existing methods, including large language models and retrieval-augmented generation, are constrained by limited context windows and lack the ability to perform compositional, multi-hop reasoning over very long video streams. In this work, we address these challenges through EGAgent, an enhanced agentic framework centered on entity scene graphs, which represent people, places, objects, and their relationships over time. Our system equips a planning agent with tools for structured search and reasoning over these graphs, as well as hybrid visual and audio search capabilities, enabling detailed, cross-modal, and temporally coherent reasoning. Experiments on the EgoLifeQA and Video-MME (Long) datasets show that our method achieves state-of-the-art performance on EgoLifeQA (57.5%) and competitive performance on Video-MME (Long) (74.1%) for complex longitudinal video understanding tasks.

</details>

### [From LLMs to LRMs: Rethinking Pruning for Reasoning-Centric Models](https://arxiv.org/abs/2601.18091v1)
- **arXiv**: 2601.18091v1
- **Published**: 2026-01-26
- **Stance**: BALANCED
- **Priority**: 2/10
- **Classified by**: Keyword
- **Why read**: General reasoning paper (keyword match)

<details>
<summary>Abstract</summary>

Large language models (LLMs) are increasingly costly to deploy, motivating extensive research on model pruning. However, most existing studies focus on instruction-following LLMs, leaving it unclear whether established pruning strategies transfer to reasoning-augmented models that explicitly generate long intermediate reasoning traces. In this work, we conduct a controlled study of pruning for both instruction-following ($\textbf{LLM-instruct}$) and reasoning-augmented ($\textbf{LLM-think}$) models. To isolate the effects of pruning, we align pruning calibration and post-pruning recovery data with each model's original training distribution, which we show yields more stable and reliable pruning behavior. We evaluate static depth pruning, static width pruning, and dynamic pruning across 17 tasks spanning classification, generation, and reasoning. Our results reveal clear paradigm-dependent differences: depth pruning outperforms width pruning on classification tasks, while width pruning is more robust for generation and reasoning. Moreover, static pruning better preserves reasoning performance, whereas dynamic pruning excels on classification and generation but remains challenging for long-chain reasoning. These findings underscore the need for pruning strategies that explicitly account for the distinct characteristics of reasoning-augmented LLMs. Our code is publicly available at https://github.com/EIT-NLP/LRM-Pruning.

</details>

### [UniPACT: A Multimodal Framework for Prognostic Question Answering on Raw ECG and Structured EHR](https://arxiv.org/abs/2601.17916v1)
- **arXiv**: 2601.17916v1
- **Published**: 2026-01-25
- **Stance**: BALANCED
- **Priority**: 2/10
- **Classified by**: Keyword
- **Why read**: General reasoning paper (keyword match)

<details>
<summary>Abstract</summary>

Accurate clinical prognosis requires synthesizing structured Electronic Health Records (EHRs) with real-time physiological signals like the Electrocardiogram (ECG). Large Language Models (LLMs) offer a powerful reasoning engine for this task but struggle to natively process these heterogeneous, non-textual data types. To address this, we propose UniPACT (Unified Prognostic Question Answering for Clinical Time-series), a unified framework for prognostic question answering that bridges this modality gap. UniPACT's core contribution is a structured prompting mechanism that converts numerical EHR data into semantically rich text. This textualized patient context is then fused with representations learned directly from raw ECG waveforms, enabling an LLM to reason over both modalities holistically. We evaluate UniPACT on the comprehensive MDS-ED benchmark, it achieves a state-of-the-art mean AUROC of 89.37% across a diverse set of prognostic tasks including diagnosis, deterioration, ICU admission, and mortality, outperforming specialized baselines. Further analysis demonstrates that our multimodal, multi-task approach is critical for performance and provides robustness in missing data scenarios.

</details>

### [Do Reasoning Models Ask Better Questions? A Formal Information-Theoretic Analysis on Multi-Turn LLM Games](https://arxiv.org/abs/2601.17716v1)
- **arXiv**: 2601.17716v1
- **Published**: 2026-01-25
- **Stance**: BALANCED
- **Priority**: 2/10
- **Classified by**: Keyword
- **Why read**: General reasoning paper (keyword match)

<details>
<summary>Abstract</summary>

Large Language Models (LLMs) excel at many tasks but still struggle with a critical ability for LLM-based agents: asking good questions for resolving ambiguity in user requests. While prior work has explored information-seeking behavior through word games, existing benchmarks lack comprehensive evaluation frameworks that provide both final and intermediate signals based on Information Gain (IG). Moreover, they rarely provide systematic comparisons between models that use chain-of-thought reasoning and those that do not. We propose a multi-turn dialogue framework that quantitatively measures how effectively LLMs gather information through yes/no questions in a hierarchical knowledge graph environment. Our framework employs a triad of interacting LLM agents that ask questions, answer them, and update the hypothesis space. We adopt IG as the main metric, grounded in Shannon entropy, to assess query effectiveness at each turn and cumulatively. We instantiate our framework in a geographical Guess My City game setting organized in a five-level taxonomy and evaluate multiple LLM variants under fully and partially observable conditions, with and without Chain-of-Thought reasoning. Our experiments demonstrate that, among the evaluated models, the ones with explicit reasoning capabilities achieve higher IG per turn and reach solutions in fewer steps, particularly in partially observable settings. Analysis of reasoning traces reveals that smaller models compensate for limited capacity through more aggressive exploration of candidate questions, while larger models exhibit higher assertiveness in selecting optimal queries, generating candidates with greater potential IG.

</details>

## New Papers (2026-01-26)

### [Trapped in the past? Disentangling fluid and crystallized intelligence of large language models using chess](https://arxiv.org/abs/2601.16823v1)
- **arXiv**: 2601.16823v1
- **Published**: 2026-01-23
- **Stance**: SUPPORTS
- **Priority**: 9/10
- **Why read**: This paper demonstrates that LLM performance heavily depends on memorization and distributional familiarity, supporting the view that reasoning is limited and pattern matching dominates.

<details>
<summary>Abstract</summary>

Large Language Models (LLMs) exhibit remarkable capabilities, yet it remains unclear to what extent these reflect sophisticated recall (crystallized intelligence) or reasoning ability (fluid intelligence). We introduce chess as a controlled testbed for disentangling these faculties. Leveraging the game's structure and scalable engine evaluations, we construct a taxonomy of positions varying in training corpus proximity--ranging from common states solvable by memorization to novel ones requiring first-principles reasoning. We systematically evaluate multiple GPT generations under varying reasoning intensities. Our analysis reveals a clear gradient: performance consistently degrades as fluid intelligence demands increase. Notably, in out-of-distribution tasks, performance collapses to random levels. While newer models improve, progress slows significantly for tasks outside the training distribution. Furthermore, while reasoning-augmented inference improves performance, its marginal benefit per token decreases with distributional proximity. These results suggest current architectures remain limited in systematic generalization, highlighting the need for mechanisms beyond scale to achieve robust fluid intelligence.

</details>

### [Reasoning Promotes Robustness in Theory of Mind Tasks](https://arxiv.org/abs/2601.16853v1)
- **arXiv**: 2601.16853v1
- **Published**: 2026-01-23
- **Stance**: BALANCED
- **Priority**: 7/10
- **Why read**: This paper investigates whether improved performance in Theory of Mind tasks reflects genuine reasoning or pattern matching, directly relevant to the thesis.

<details>
<summary>Abstract</summary>

Large language models (LLMs) have recently shown strong performance on Theory of Mind (ToM) tests, prompting debate about the nature and true performance of the underlying capabilities. At the same time, reasoning-oriented LLMs trained via reinforcement learning with verifiable rewards (RLVR) have achieved notable improvements across a range of benchmarks. This paper examines the behavior of such reasoning models in ToM tasks, using novel adaptations of machine psychological experiments and results from established benchmarks. We observe that reasoning models consistently exhibit increased robustness to prompt variations and task perturbations. Our analysis indicates that the observed gains are more plausibly attributed to increased robustness in finding the correct solution, rather than to fundamentally new forms of ToM reasoning. We discuss the implications of this interpretation for evaluating social-cognitive behavior in LLMs.

</details>

### [Spatial-Agent: Agentic Geo-spatial Reasoning with Scientific Core Concepts](https://arxiv.org/abs/2601.16965v1)
- **arXiv**: 2601.16965v1
- **Published**: 2026-01-23
- **Stance**: BALANCED
- **Priority**: 7/10
- **Why read**: This paper explores the limitations of LLMs in genuine geospatial reasoning, highlighting reliance on pattern matching and structured workflows, which aligns with the thesis on LLM reasoning being fundamentally predictive.

<details>
<summary>Abstract</summary>

Geospatial reasoning is essential for real-world applications such as urban analytics, transportation planning, and disaster response. However, existing LLM-based agents often fail at genuine geospatial computation, relying instead on web search or pattern matching while hallucinating spatial relationships. We present Spatial-Agent, an AI agent grounded in foundational theories of spatial information science. Our approach formalizes geo-analytical question answering as a concept transformation problem, where natural-language questions are parsed into executable workflows represented as GeoFlow Graphs -- directed acyclic graphs with nodes corresponding to spatial concepts and edges representing transformations. Drawing on spatial information theory, Spatial-Agent extracts spatial concepts, assigns functional roles with principled ordering constraints, and composes transformation sequences through template-based generation. Extensive experiments on MapEval-API and MapQA benchmarks demonstrate that Spatial-Agent significantly outperforms existing baselines including ReAct and Reflexion, while producing interpretable and executable geospatial workflows.

</details>

### [AgentDrive: An Open Benchmark Dataset for Agentic AI Reasoning with LLM-Generated Scenarios in Autonomous Systems](https://arxiv.org/abs/2601.16964v1)
- **arXiv**: 2601.16964v1
- **Published**: 2026-01-23
- **Stance**: BALANCED
- **Priority**: 6/10
- **Why read**: Evaluates LLM reasoning in complex, structured driving scenarios across multiple reasoning dimensions.

<details>
<summary>Abstract</summary>

The rapid advancement of large language models (LLMs) has sparked growing interest in their integration into autonomous systems for reasoning-driven perception, planning, and decision-making. However, evaluating and training such agentic AI models remains challenging due to the lack of large-scale, structured, and safety-critical benchmarks. This paper introduces AgentDrive, an open benchmark dataset containing 300,000 LLM-generated driving scenarios designed for training, fine-tuning, and evaluating autonomous agents under diverse conditions. AgentDrive formalizes a factorized scenario space across seven orthogonal axes: scenario type, driver behavior, environment, road layout, objective, difficulty, and traffic density. An LLM-driven prompt-to-JSON pipeline generates semantically rich, simulation-ready specifications that are validated against physical and schema constraints. Each scenario undergoes simulation rollouts, surrogate safety metric computation, and rule-based outcome labeling. To complement simulation-based evaluation, we introduce AgentDrive-MCQ, a 100,000-question multiple-choice benchmark spanning five reasoning dimensions: physics, policy, hybrid, scenario, and comparative reasoning. We conduct a large-scale evaluation of fifty leading LLMs on AgentDrive-MCQ. Results show that while proprietary frontier models perform best in contextual and policy reasoning, advanced open models are rapidly closing the gap in structured and physics-grounded reasoning. We release the AgentDrive dataset, AgentDrive-MCQ benchmark, evaluation code, and related materials at https://github.com/maferrag/AgentDrive

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

## Low Priority (Tangentially Related)

### [Agentic Reasoning for Large Language Models](https://arxiv.org/abs/2601.12538)
- **arXiv**: 2601.12538
- **Why read**: Survey on agentic reasoning paradigm

<details>
<summary>Abstract</summary>

Survey paper covering the agentic reasoning paradigm for large language models, including tool use, planning, and multi-agent collaboration.

</details>

### [Graph Reasoning Paradigm](https://arxiv.org/abs/2601.12995)
- **arXiv**: 2601.12995
- **Why read**: Structured reasoning with topology-aware RL

<details>
<summary>Abstract</summary>

We propose a graph-based reasoning paradigm that uses topology-aware reinforcement learning to improve structured reasoning in LLMs.

</details>

---

## Skipped (Not Relevant)

The following paper types are filtered out:
- RAG/retrieval papers (MiRAGE, Chunking papers)
- Domain-specific applications (medical, legal, finance, traffic)
- Image/audio/video generation
- Efficiency/quantization papers
- Tool-specific papers (code, decompilation)
- Survey/taxonomy papers without new findings
