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
- **Why read**: Shows reasoning models ignore safety context (95%+ task completion while user describes dying), suggesting tunnel vision from pattern optimization.

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
