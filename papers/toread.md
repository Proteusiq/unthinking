# Papers to Read

New papers discovered by automated search, pending review for literature survey.

---

## 2026-01-24 - 433 new papers

### [ErrorMap and ErrorAtlas: Charting the Failure Landscape of Large Language Models](https://arxiv.org/abs/2601.15812v1)
- **arXiv**: 2601.15812v1
- **Date**: 2026-01-22
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Large Language Models (LLM) benchmarks tell us when models fail, but not why they fail. A wrong answer on a reasoning dataset may stem from formatting issues, calculation errors, or dataset noise rather than weak reasoning. Without disentangling such causes, benchmarks remain incomplete and cannot reliably guide model improvement. We introduce ErrorMap, the first method to chart the sources of LLM failure. It extracts a model's unique "failure signature", clarifies what benchmarks measure, and b...


### [PhysProver: Advancing Automatic Theorem Proving for Physics](https://arxiv.org/abs/2601.15737v1)
- **arXiv**: 2601.15737v1
- **Date**: 2026-01-22
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning
- **Abstract**: The combination of verifiable languages and LLMs has significantly influenced both the mathematical and computer science communities because it provides a rigorous foundation for theorem proving. Recent advancements in the field provide foundation models and sophisticated agentic systems pushing the boundaries of formal mathematical reasoning to approach the natural language capability of LLMs. However, little attention has been given to the formal physics reasoning, which also heavily relies on...


### [Towards Reliable Medical LLMs: Benchmarking and Enhancing Confidence Estimation of Large Language Models in Medical Consultation](https://arxiv.org/abs/2601.15645v1)
- **arXiv**: 2601.15645v1
- **Date**: 2026-01-22
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Large-scale language models (LLMs) often offer clinical judgments based on incomplete information, increasing the risk of misdiagnosis. Existing studies have primarily evaluated confidence in single-turn, static settings, overlooking the coupling between confidence and correctness as clinical evidence accumulates during real consultations, which limits their support for reliable decision-making. We propose the first benchmark for assessing confidence in multi-turn interaction during realistic me...


### [The Flexibility Trap: Why Arbitrary Order Limits Reasoning Potential in Diffusion Language Models](https://arxiv.org/abs/2601.15165v1)
- **arXiv**: 2601.15165v1
- **Date**: 2026-01-21
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: reasoning boundary. Topics: OOD generalization, RL for reasoning
- **Abstract**: Diffusion Large Language Models (dLLMs) break the rigid left-to-right constraint of traditional LLMs, enabling token generation in arbitrary orders. Intuitively, this flexibility implies a solution space that strictly supersets the fixed autoregressive trajectory, theoretically unlocking superior reasoning potential for general tasks like mathematics and coding. Consequently, numerous works have leveraged reinforcement learning (RL) to elicit the reasoning capability of dLLMs. In this paper, we ...


### [Knowledge Graphs are Implicit Reward Models: Path-Derived Signals Enable Compositional Reasoning](https://arxiv.org/abs/2601.15160v1)
- **arXiv**: 2601.15160v1
- **Date**: 2026-01-21
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: compositional. Topics: Compositional generalization, RL for reasoning
- **Abstract**: Large language models have achieved near-expert performance in structured reasoning domains like mathematics and programming, yet their ability to perform compositional multi-hop reasoning in specialized scientific fields remains limited. We propose a bottom-up learning paradigm in which models are grounded in axiomatic domain facts and compose them to solve complex, unseen tasks. To this end, we present a post-training pipeline, based on a combination of supervised fine-tuning and reinforcement...


### [What Makes Low-Bit Quantization-Aware Training Work for Reasoning LLMs? A Systematic Study](https://arxiv.org/abs/2601.14888v1)
- **arXiv**: 2601.14888v1
- **Date**: 2026-01-21
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning
- **Abstract**: Reasoning models excel at complex tasks such as coding and mathematics, yet their inference is often slow and token-inefficient. To improve the inference efficiency, post-training quantization (PTQ) usually comes with the cost of large accuracy drops, especially for reasoning tasks under low-bit settings. In this study, we present a systematic empirical study of quantization-aware training (QAT) for reasoning models. Our key findings include: (1) Knowledge distillation is a robust objective for ...


### [PCL-Reasoner-V1.5: Advancing Math Reasoning with Offline Reinforcement Learning](https://arxiv.org/abs/2601.14716v1)
- **arXiv**: 2601.14716v1
- **Date**: 2026-01-21
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning
- **Abstract**: We present PCL-Reasoner-V1.5, a 32-billion-parameter large language model (LLM) for mathematical reasoning. The model is built upon Qwen2.5-32B and refined via supervised fine-tuning (SFT) followed by reinforcement learning (RL). A central innovation is our proposed offline RL method, which provides superior training stability and efficiency over standard online RL methods such as GRPO. Our model achieves state-of-the-art performance among models post-trained on Qwen2.5-32B, attaining average ac...


### [DARL: Encouraging Diverse Answers for General Reasoning without Verifiers](https://arxiv.org/abs/2601.14700v1)
- **arXiv**: 2601.14700v1
- **Date**: 2026-01-21
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning
- **Abstract**: Reinforcement Learning with Verifiable Rewards (RLVR) has demonstrated promising gains in enhancing the reasoning capabilities of large language models. However, its dependence on domain-specific verifiers significantly restricts its applicability to open and general domains. Recent efforts such as RLPR have extended RLVR to general domains, enabling training on broader datasets and achieving improvements over RLVR. However, a notable limitation of these methods is their tendency to overfit to r...


### [Say Anything but This: When Tokenizer Betrays Reasoning in LLMs](https://arxiv.org/abs/2601.14658v1)
- **arXiv**: 2601.14658v1
- **Date**: 2026-01-21
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Large language models (LLMs) reason over discrete token ID sequences, yet modern subword tokenizers routinely produce non-unique encodings: multiple token ID sequences can detokenize to identical surface strings. This representational mismatch creates an unmeasured fragility wherein reasoning processes can fail. LLMs may treat two internal representations as distinct "words" even when they are semantically identical at the text level. In this work, we show that tokenization can betray LLM reason...


### [MAS-Orchestra: Understanding and Improving Multi-Agent Reasoning Through Holistic Orchestration and Controlled Benchmarks](https://arxiv.org/abs/2601.14652v1)
- **arXiv**: 2601.14652v1
- **Date**: 2026-01-21
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning
- **Abstract**: While multi-agent systems (MAS) promise elevated intelligence through coordination of agents, current approaches to automatic MAS design under-deliver. Such shortcomings stem from two key factors: (1) methodological complexity - agent orchestration is performed using sequential, code-level execution that limits global system-level holistic reasoning and scales poorly with agent complexity - and (2) efficacy uncertainty - MAS are deployed without understanding if there are tangible benefits compa...


### [SearchGym: Bootstrapping Real-World Search Agents via Cost-Effective and High-Fidelity Environment Simulation](https://arxiv.org/abs/2601.14615v1)
- **arXiv**: 2601.14615v1
- **Date**: 2026-01-21
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning
- **Abstract**: Search agents have emerged as a pivotal paradigm for solving open-ended, knowledge-intensive reasoning tasks. However, training these agents via Reinforcement Learning (RL) faces a critical dilemma: interacting with live commercial Web APIs is prohibitively expensive, while relying on static data snapshots often introduces noise due to data misalignment. This misalignment generates corrupted reward signals that destabilize training by penalizing correct reasoning or rewarding hallucination. To a...


### [Rewarding How Models Think Pedagogically: Integrating Pedagogical Reasoning and Thinking Rewards for LLMs in Education](https://arxiv.org/abs/2601.14560v1)
- **arXiv**: 2601.14560v1
- **Date**: 2026-01-21
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning
- **Abstract**: Large language models (LLMs) are increasingly deployed as intelligent tutoring systems, yet research on optimizing LLMs specifically for educational contexts remains limited. Recent works have proposed reinforcement learning approaches for training LLM tutors, but these methods focus solely on optimizing visible responses while neglecting the model's internal thinking process. We introduce PedagogicalRL-Thinking, a framework that extends pedagogical alignment to reasoning LLMs in education throu...


### [Jet-RL: Enabling On-Policy FP8 Reinforcement Learning with Unified Training and Rollout Precision Flow](https://arxiv.org/abs/2601.14243v1)
- **arXiv**: 2601.14243v1
- **Date**: 2026-01-20
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning
- **Abstract**: Reinforcement learning (RL) is essential for enhancing the complex reasoning capabilities of large language models (LLMs). However, existing RL training pipelines are computationally inefficient and resource-intensive, with the rollout phase accounting for over 70% of total training time. Quantized RL training, particularly using FP8 precision, offers a promising approach to mitigating this bottleneck. A commonly adopted strategy applies FP8 precision during rollout while retaining BF16 precisio...


### [InT: Self-Proposed Interventions Enable Credit Assignment in LLM Reasoning](https://arxiv.org/abs/2601.14209v1)
- **arXiv**: 2601.14209v1
- **Date**: 2026-01-20
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning
- **Abstract**: Outcome-reward reinforcement learning (RL) has proven effective at improving the reasoning capabilities of large language models (LLMs). However, standard RL assigns credit only at the level of the final answer, penalizing entire reasoning traces when the outcome is incorrect and uniformly reinforcing all steps when it is correct. As a result, correct intermediate steps may be discouraged in failed traces, while spurious steps may be reinforced in successful ones. We refer to this failure mode a...


### ["The Whole Is Greater Than the Sum of Its Parts": A Compatibility-Aware Multi-Teacher CoT Distillation Framework](https://arxiv.org/abs/2601.13992v1)
- **arXiv**: 2601.13992v1
- **Date**: 2026-01-20
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Chain-of-Thought (CoT) reasoning empowers Large Language Models (LLMs) with remarkable capabilities but typically requires prohibitive parameter scales. CoT distillation has emerged as a promising paradigm to transfer reasoning prowess into compact Student Models (SLMs), but existing approaches often rely on a solitary teacher, capping the student's potential since individual LLMs often exhibit distinct capability biases and may suffer from catastrophic forgetting. While leveraging diverse teach...


### [HyperWalker: Dynamic Hypergraph-Based Deep Diagnosis for Multi-Hop Clinical Modeling across EHR and X-Ray in Medical VLMs](https://arxiv.org/abs/2601.13919v1)
- **arXiv**: 2601.13919v1
- **Date**: 2026-01-20
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: OOD generalization, RL for reasoning, Test-time scaling
- **Abstract**: Automated clinical diagnosis remains a core challenge in medical AI, which usually requires models to integrate multi-modal data and reason across complex, case-specific contexts. Although recent methods have advanced medical report generation (MRG) and visual question answering (VQA) with medical vision-language models (VLMs), these methods, however, predominantly operate under a sample-isolated inference paradigm, as such processing cases independently without access to longitudinal electronic...


### [Knowledge Graph-Assisted LLM Post-Training for Enhanced Legal Reasoning](https://arxiv.org/abs/2601.13806v1)
- **arXiv**: 2601.13806v1
- **Date**: 2026-01-20
- **Stance**: CHALLENGES
- **Why read**: May challenge thesis. Keywords: reasoning capability
- **Abstract**: LLM post-training has primarily relied on large text corpora and human feedback, without capturing the structure of domain knowledge. This has caused models to struggle dealing with complex reasoning tasks, especially for high-stakes professional domains. In Law, reasoning requires deep understanding of the relations between various legal concepts, a key component missing in current LLM post-training. In this paper, we propose a knowledge graph (KG)-assisted approach for enhancing LLMs' reasonin...


### [Finding RELIEF: Shaping Reasoning Behavior without Reasoning Supervision via Belief Engineering](https://arxiv.org/abs/2601.13752v1)
- **arXiv**: 2601.13752v1
- **Date**: 2026-01-20
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: faithfulness, unfaithful. Topics: CoT faithfulness analysis, RL for reasoning
- **Abstract**: Large reasoning models (LRMs) have achieved remarkable success in complex problem-solving, yet they often suffer from computational redundancy or reasoning unfaithfulness. Current methods for shaping LRM behavior typically rely on reinforcement learning or fine-tuning with gold-standard reasoning traces, a paradigm that is both computationally expensive and difficult to scale. In this paper, we reveal that LRMs possess latent \textit{reasoning beliefs} that internally track their own reasoning t...


### [Simulated Ignorance Fails: A Systematic Study of LLM Behaviors on Forecasting Problems Before Model Knowledge Cutoff](https://arxiv.org/abs/2601.13717v1)
- **arXiv**: 2601.13717v1
- **Date**: 2026-01-20
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Evaluating LLM forecasting capabilities is constrained by a fundamental tension: prospective evaluation offers methodological rigor but prohibitive latency, while retrospective forecasting (RF) -- evaluating on already-resolved events -- faces rapidly shrinking clean evaluation data as SOTA models possess increasingly recent knowledge cutoffs. Simulated Ignorance (SI), prompting models to suppress pre-cutoff knowledge, has emerged as a potential solution. We provide the first systematic test of ...


### [Beyond Memorization: Testing LLM Reasoning on Unseen Theory of Computation Tasks](https://arxiv.org/abs/2601.13392v1)
- **arXiv**: 2601.13392v1
- **Date**: 2026-01-19
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: pattern matching. Topics: Pattern matching analysis
- **Abstract**: Large language models (LLMs) have demonstrated strong performance on formal language tasks, yet whether this reflects genuine symbolic reasoning or pattern matching on familiar constructions remains unclear. We introduce a benchmark for deterministic finite automata (DFA) construction from regular languages, comprising factual knowledge questions, seen construction problems from public sources, and two types of unseen problems: hand-crafted instances with multiple interacting constraints and sys...


### [CURE-Med: Curriculum-Informed Reinforcement Learning for Multilingual Medical Reasoning](https://arxiv.org/abs/2601.13262v1)
- **arXiv**: 2601.13262v1
- **Date**: 2026-01-19
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning
- **Abstract**: While large language models (LLMs) have shown to perform well on monolingual mathematical and commonsense reasoning, they remain unreliable for multilingual medical reasoning applications, hindering their deployment in multilingual healthcare settings. We address this by first introducing CUREMED-BENCH, a high-quality multilingual medical reasoning dataset with open-ended reasoning queries with a single verifiable answer, spanning thirteen languages, including underrepresented languages such as ...


### [Agentic Conversational Search with Contextualized Reasoning via Reinforcement Learning](https://arxiv.org/abs/2601.13115v1)
- **arXiv**: 2601.13115v1
- **Date**: 2026-01-19
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning
- **Abstract**: Large Language Models (LLMs) have become a popular interface for human-AI interaction, supporting information seeking and task assistance through natural, multi-turn dialogue. To respond to users within multi-turn dialogues, the context-dependent user intent evolves across interactions, requiring contextual interpretation, query reformulation, and dynamic coordination between retrieval and generation. Existing studies usually follow static rewrite, retrieve, and generate pipelines, which optimiz...


### [Leveraging Lora Fine-Tuning and Knowledge Bases for Construction Identification](https://arxiv.org/abs/2601.13105v1)
- **arXiv**: 2601.13105v1
- **Date**: 2026-01-19
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: pattern matching. Topics: Pattern matching analysis
- **Abstract**: This study investigates the automatic identification of the English ditransitive construction by integrating LoRA-based fine-tuning of a large language model with a Retrieval-Augmented Generation (RAG) framework.A binary classification task was conducted on annotated data from the British National Corpus. Results demonstrate that a LoRA-fine-tuned Qwen3-8B model significantly outperformed both a native Qwen3-MAX model and a theory-only RAG system. Detailed error analysis reveals that fine-tuning...


### [Graph Reasoning Paradigm: Structured and Symbolic Reasoning with Topology-Aware Reinforcement Learning for Large Language Models](https://arxiv.org/abs/2601.12995v1)
- **arXiv**: 2601.12995v1
- **Date**: 2026-01-19
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning
- **Abstract**: Long Chain-of-Thought (LCoT), achieved by Reinforcement Learning with Verifiable Rewards (RLVR), has proven effective in enhancing the reasoning capabilities of Large Language Models (LLMs). However, reasoning in current LLMs is primarily generated as plain text, where performing semantic evaluation on such unstructured data creates a computational bottleneck during training. Despite RLVR-based optimization, existing methods still suffer from coarse-grained supervision, reward hacking, high trai...


### [Gated Differentiable Working Memory for Long-Context Language Modeling](https://arxiv.org/abs/2601.12906v1)
- **arXiv**: 2601.12906v1
- **Date**: 2026-01-19
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: Test-time scaling
- **Abstract**: Long contexts challenge transformers: attention scores dilute across thousands of tokens, critical information is often lost in the middle, and models struggle to adapt to novel patterns at inference time. Recent work on test-time adaptation addresses this by maintaining a form of working memory -- transient parameters updated on the current context -- but existing approaches rely on uniform write policies that waste computation on low-utility regions and suffer from high gradient variance acros...


### [Disagreement as Data: Reasoning Trace Analytics in Multi-Agent Systems](https://arxiv.org/abs/2601.12618v1)
- **arXiv**: 2601.12618v1
- **Date**: 2026-01-18
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Learning analytics researchers often analyze qualitative student data such as coded annotations or interview transcripts to understand learning processes. With the rise of generative AI, fully automated and human-AI workflows have emerged as promising methods for analysis. However, methodological standards to guide such workflows remain limited. In this study, we propose that reasoning traces generated by large language model (LLM) agents, especially within multi-agent systems, constitute a nove...


### [Agentic Reasoning for Large Language Models](https://arxiv.org/abs/2601.12538v1)
- **arXiv**: 2601.12538v1
- **Date**: 2026-01-18
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning, Test-time scaling
- **Abstract**: Reasoning is a fundamental cognitive process underlying inference, problem-solving, and decision-making. While large language models (LLMs) demonstrate strong reasoning capabilities in closed-world settings, they struggle in open-ended and dynamic environments. Agentic reasoning marks a paradigm shift by reframing LLMs as autonomous agents that plan, act, and learn through continual interaction. In this survey, we organize agentic reasoning along three complementary dimensions. First, we charact...


### [Incentivizing In-depth Reasoning over Long Contexts with Process Advantage Shaping](https://arxiv.org/abs/2601.12465v1)
- **arXiv**: 2601.12465v1
- **Date**: 2026-01-18
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning
- **Abstract**: Reinforcement Learning with Verifiable Rewards (RLVR) has proven effective in enhancing LLMs short-context reasoning, but its performance degrades in long-context scenarios that require both precise grounding and robust long-range reasoning. We identify the "almost-there" phenomenon in long-context reasoning, where trajectories are largely correct but fail at the final step, and attribute this failure to two factors: (1) the lack of high reasoning density in long-context QA data that push LLMs b...


### [R$^2$PO: Decoupling Training Trajectories from Inference Responses for LLM Reasoning](https://arxiv.org/abs/2601.11960v1)
- **arXiv**: 2601.11960v1
- **Date**: 2026-01-17
- **Stance**: CHALLENGES
- **Why read**: May challenge thesis. Keywords: reasoning capability. Topics: RL for reasoning
- **Abstract**: Reinforcement learning has become a central paradigm for improving LLM reasoning. However, existing methods use a single policy to produce both inference responses and training optimization trajectories. The objective conflict between generating stable inference responses and diverse training trajectories leads to insufficient exploration, which harms reasoning capability. In this paper, to address the problem, we propose R$^2$PO (Residual Rollout Policy Optimization), which introduces a lightwe...


### [Double-Calibration: Towards Trustworthy LLMs via Calibrating Knowledge and Reasoning Confidence](https://arxiv.org/abs/2601.11956v1)
- **arXiv**: 2601.11956v1
- **Date**: 2026-01-17
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Trustworthy reasoning in Large Language Models (LLMs) is challenged by their propensity for hallucination. While augmenting LLMs with Knowledge Graphs (KGs) improves factual accuracy, existing KG-augmented methods fail to quantify epistemic uncertainty in both the retrieved evidence and LLMs' reasoning. To bridge this gap, we introduce DoublyCal, a framework built on a novel double-calibration principle. DoublyCal employs a lightweight proxy model to first generate KG evidence alongside a calibr...


### [Thinking Traps in Long Chain-of-Thought: A Measurable Study and Trap-Aware Adaptive Restart](https://arxiv.org/abs/2601.11940v1)
- **arXiv**: 2601.11940v1
- **Date**: 2026-01-17
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: test-time compute. Topics: Test-time scaling
- **Abstract**: Scaling test-time compute via Long Chain-of-Thought (Long-CoT) significantly enhances reasoning capabilities, yet extended generation does not guarantee correctness: after an early wrong commitment, models may keep elaborating a self-consistent but incorrect prefix. Through fine-grained trajectory analysis, we identify Thinking Traps, prefix-dominant deadlocks where later reflection, alternative attempts, or verification fails to revise the root error. On a curated subset of DAPO-MATH, 89\% of f...


### [Do explanations generalize across large reasoning models?](https://arxiv.org/abs/2601.11517v1)
- **arXiv**: 2601.11517v1
- **Date**: 2026-01-16
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning
- **Abstract**: Large reasoning models (LRMs) produce a textual chain of thought (CoT) in the process of solving a problem, which serves as a potentially powerful tool to understand the problem by surfacing a human-readable, natural-language explanation. However, it is unclear whether these explanations generalize, i.e. whether they capture general patterns about the underlying problem rather than patterns which are esoteric to the LRM. This is a crucial question in understanding or discovering new concepts, e....


### [The unreasonable effectiveness of pattern matching](https://arxiv.org/abs/2601.11432v1)
- **arXiv**: 2601.11432v1
- **Date**: 2026-01-16
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: pattern matching. Topics: Pattern matching analysis
- **Abstract**: We report on an astonishing ability of large language models (LLMs) to make sense of "Jabberwocky" language in which most or all content words have been randomly replaced by nonsense strings, e.g., translating "He dwushed a ghanc zawk" to "He dragged a spare chair". This result addresses ongoing controversies regarding how to best think of what LLMs are doing: are they a language mimic, a database, a blurry version of the Web? The ability of LLMs to recover meaning from structural patterns speak...


### [Knowledge is Not Enough: Injecting RL Skills for Continual Adaptation](https://arxiv.org/abs/2601.11258v1)
- **arXiv**: 2601.11258v1
- **Date**: 2026-01-16
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning
- **Abstract**: Large Language Models (LLMs) face the "knowledge cutoff" challenge, where their frozen parametric memory prevents direct internalization of new information. While Supervised Fine-Tuning (SFT) is commonly used to update model knowledge, it often updates factual content without reliably improving the model's ability to use the newly incorporated information for question answering or decision-making. Reinforcement Learning (RL) is essential for acquiring reasoning skills; however, its high computat...


### [TANDEM: Temporal-Aware Neural Detection for Multimodal Hate Speech](https://arxiv.org/abs/2601.11178v1)
- **arXiv**: 2601.11178v1
- **Date**: 2026-01-16
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning
- **Abstract**: Social media platforms are increasingly dominated by long-form multimodal content, where harmful narratives are constructed through a complex interplay of audio, visual, and textual cues. While automated systems can flag hate speech with high accuracy, they often function as "black boxes" that fail to provide the granular, interpretable evidence, such as precise timestamps and target identities, required for effective human-in-the-loop moderation. In this work, we introduce TANDEM, a unified fra...


### [Spurious Rewards Paradox: Mechanistically Understanding How RLVR Activates Memorization Shortcuts in LLMs](https://arxiv.org/abs/2601.11061v1)
- **arXiv**: 2601.11061v1
- **Date**: 2026-01-16
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning
- **Abstract**: Reinforcement Learning with Verifiable Rewards (RLVR) is highly effective for enhancing LLM reasoning, yet recent evidence shows models like Qwen 2.5 achieve significant gains even with spurious or incorrect rewards. We investigate this phenomenon and identify a "Perplexity Paradox": spurious RLVR triggers a divergence where answer-token perplexity drops while prompt-side coherence degrades, suggesting the model is bypassing reasoning in favor of memorization. Using Path Patching, Logit Lens, JS...


### [Reasoning Models Generate Societies of Thought](https://arxiv.org/abs/2601.10825v1)
- **arXiv**: 2601.10825v1
- **Date**: 2026-01-15
- **Stance**: CHALLENGES
- **Why read**: May challenge thesis. Keywords: reasoning improvement. Topics: RL for reasoning
- **Abstract**: Large language models have achieved remarkable capabilities across domains, yet mechanisms underlying sophisticated reasoning remain elusive. Recent reasoning models outperform comparable instruction-tuned models on complex cognitive tasks, attributed to extended computation through longer chains of thought. Here we show that enhanced reasoning emerges not from extended computation alone, but from simulating multi-agent-like interactions -- a society of thought -- which enables diversification a...


### [MatchTIR: Fine-Grained Supervision for Tool-Integrated Reasoning via Bipartite Matching](https://arxiv.org/abs/2601.10712v1)
- **arXiv**: 2601.10712v1
- **Date**: 2026-01-15
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning
- **Abstract**: Tool-Integrated Reasoning (TIR) empowers large language models (LLMs) to tackle complex tasks by interleaving reasoning steps with external tool interactions. However, existing reinforcement learning methods typically rely on outcome- or trajectory-level rewards, assigning uniform advantages to all steps within a trajectory. This coarse-grained credit assignment fails to distinguish effective tool calls from redundant or erroneous ones, particularly in long-horizon multi-turn scenarios. To addre...


### [DR-Arena: an Automated Evaluation Framework for Deep Research Agents](https://arxiv.org/abs/2601.10504v1)
- **arXiv**: 2601.10504v1
- **Date**: 2026-01-15
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: As Large Language Models (LLMs) increasingly operate as Deep Research (DR) Agents capable of autonomous investigation and information synthesis, reliable evaluation of their task performance has become a critical bottleneck. Current benchmarks predominantly rely on static datasets, which suffer from several limitations: limited task generality, temporal misalignment, and data contamination. To address these, we introduce DR-Arena, a fully automated evaluation framework that pushes DR agents to t...


### [SuS: Strategy-aware Surprise for Intrinsic Exploration](https://arxiv.org/abs/2601.10349v1)
- **arXiv**: 2601.10349v1
- **Date**: 2026-01-15
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning
- **Abstract**: We propose Strategy-aware Surprise (SuS), a novel intrinsic motivation framework that uses pre-post prediction mismatch as a novelty signal for exploration in reinforcement learning. Unlike traditional curiosity-driven methods that rely solely on state prediction error, SuS introduces two complementary components: Strategy Stability (SS) and Strategy Surprise (SuS). SS measures consistency in behavioral strategy across temporal steps, while SuS captures unexpected outcomes relative to the agent'...


### [Boundary-Aware NL2SQL: Integrating Reliability through Hybrid Reward and Data Synthesis](https://arxiv.org/abs/2601.10318v1)
- **arXiv**: 2601.10318v1
- **Date**: 2026-01-15
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning
- **Abstract**: In this paper, we present BAR-SQL (Boundary-Aware Reliable NL2SQL), a unified training framework that embeds reliability and boundary awareness directly into the generation process. We introduce a Seed Mutation data synthesis paradigm that constructs a representative enterprise corpus, explicitly encompassing multi-step analytical queries alongside boundary cases including ambiguity and schema limitations. To ensure interpretability, we employ Knowledge-Grounded Reasoning Synthesis, which produc...


### [Evidence-Augmented Policy Optimization with Reward Co-Evolution for Long-Context Reasoning](https://arxiv.org/abs/2601.10306v1)
- **arXiv**: 2601.10306v1
- **Date**: 2026-01-15
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning
- **Abstract**: While Reinforcement Learning (RL) has advanced LLM reasoning, applying it to long-context scenarios is hindered by sparsity of outcome rewards. This limitation fails to penalize ungrounded "lucky guesses," leaving the critical process of needle-in-a-haystack evidence retrieval largely unsupervised. To address this, we propose EAPO (Evidence-Augmented Policy Optimization). We first establish the Evidence-Augmented Reasoning paradigm, validating via Tree-Structured Evidence Sampling that precise e...


### [PRL: Process Reward Learning Improves LLMs' Reasoning Ability and Broadens the Reasoning Boundary](https://arxiv.org/abs/2601.10201v1)
- **arXiv**: 2601.10201v1
- **Date**: 2026-01-15
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: reasoning boundary. Topics: RL for reasoning
- **Abstract**: Improving the reasoning abilities of Large Language Models (LLMs) has been a continuous topic recently. But most relevant works are based on outcome rewards at the trajectory level, missing fine-grained supervision during the reasoning process. Other existing training frameworks that try to combine process signals together to optimize LLMs also rely heavily on tedious additional steps like MCTS, training a separate reward model, etc., doing harm to the training efficiency. Moreover, the intuitio...


### [HUMANLLM: Benchmarking and Reinforcing LLM Anthropomorphism via Human Cognitive Patterns](https://arxiv.org/abs/2601.10198v1)
- **arXiv**: 2601.10198v1
- **Date**: 2026-01-15
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: Emergence claims
- **Abstract**: Large Language Models (LLMs) have demonstrated remarkable capabilities in reasoning and generation, serving as the foundation for advanced persona simulation and Role-Playing Language Agents (RPLAs). However, achieving authentic alignment with human cognitive and behavioral patterns remains a critical challenge for these agents. We present HUMANLLM, a framework treating psychological patterns as interacting causal forces. We construct 244 patterns from ~12,000 academic papers and synthesize 11,3...


### [ReasAlign: Reasoning Enhanced Safety Alignment against Prompt Injection Attack](https://arxiv.org/abs/2601.10173v1)
- **arXiv**: 2601.10173v1
- **Date**: 2026-01-15
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: Test-time scaling
- **Abstract**: Large Language Models (LLMs) have enabled the development of powerful agentic systems capable of automating complex workflows across various fields. However, these systems are highly vulnerable to indirect prompt injection attacks, where malicious instructions embedded in external data can hijack agent behavior. In this work, we present ReasAlign, a model-level solution to improve safety alignment against indirect prompt injection attacks. The core idea of ReasAlign is to incorporate structured ...


### [ToolSafe: Enhancing Tool Invocation Safety of LLM-based agents via Proactive Step-level Guardrail and Feedback](https://arxiv.org/abs/2601.10156v1)
- **arXiv**: 2601.10156v1
- **Date**: 2026-01-15
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning
- **Abstract**: While LLM-based agents can interact with environments via invoking external tools, their expanded capabilities also amplify security risks. Monitoring step-level tool invocation behaviors in real time and proactively intervening before unsafe execution is critical for agent deployment, yet remains under-explored. In this work, we first construct TS-Bench, a novel benchmark for step-level tool invocation safety detection in LLM agents. We then develop a guardrail model, TS-Guard, using multi-task...


### [Sparse-RL: Breaking the Memory Wall in LLM Reinforcement Learning via Stable Sparse Rollouts](https://arxiv.org/abs/2601.10079v1)
- **arXiv**: 2601.10079v1
- **Date**: 2026-01-15
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning
- **Abstract**: Reinforcement Learning (RL) has become essential for eliciting complex reasoning capabilities in Large Language Models (LLMs). However, the substantial memory overhead of storing Key-Value (KV) caches during long-horizon rollouts acts as a critical bottleneck, often prohibiting efficient training on limited hardware. While existing KV compression techniques offer a remedy for inference, directly applying them to RL training induces a severe policy mismatch, leading to catastrophic performance co...


### [Thinking Long, but Short: Stable Sequential Test-Time Scaling for Large Reasoning Models](https://arxiv.org/abs/2601.09855v1)
- **arXiv**: 2601.09855v1
- **Date**: 2026-01-14
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: Test-time scaling
- **Abstract**: Sequential test-time scaling is a promising training-free method to improve large reasoning model accuracy, but as currently implemented, significant limitations have been observed. Inducing models to think for longer can increase their accuracy, but as the length of reasoning is further extended, it has also been shown to result in accuracy degradation and model instability. This work presents a novel sequential test-time scaling method, Min-Seek, which improves model accuracy significantly ove...


### [Collaborative Multi-Agent Test-Time Reinforcement Learning for Reasoning](https://arxiv.org/abs/2601.09667v2)
- **arXiv**: 2601.09667v2
- **Date**: 2026-01-14
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning, Test-time scaling
- **Abstract**: Multi-agent systems have evolved into practical LLM-driven collaborators for many applications, gaining robustness from diversity and cross-checking. However, multi-agent RL (MARL) training is resource-intensive and unstable: co-adapting teammates induce non-stationarity, and rewards are often sparse and high-variance. Therefore, we introduce \textbf{Multi-Agent Test-Time Reinforcement Learning (MATTRL)}, a framework that injects structured textual experience into multi-agent deliberation at inf...


### [GIFT: Unlocking Global Optimality in Post-Training via Finite-Temperature Gibbs Initialization](https://arxiv.org/abs/2601.09233v1)
- **arXiv**: 2601.09233v1
- **Date**: 2026-01-14
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning
- **Abstract**: The prevailing post-training paradigm for Large Reasoning Models (LRMs)--Supervised Fine-Tuning (SFT) followed by Reinforcement Learning (RL)--suffers from an intrinsic optimization mismatch: the rigid supervision inherent in SFT induces distributional collapse, thereby exhausting the exploration space necessary for subsequent RL. In this paper, we reformulate SFT within a unified post-training framework and propose Gibbs Initialization with Finite Temperature (GIFT). We characterize standard SF...


### [UserLM-R1: Modeling Human Reasoning in User Language Models with Multi-Reward Reinforcement Learning](https://arxiv.org/abs/2601.09215v1)
- **arXiv**: 2601.09215v1
- **Date**: 2026-01-14
- **Stance**: CHALLENGES
- **Why read**: May challenge thesis. Keywords: reasoning capability. Topics: RL for reasoning
- **Abstract**: User simulators serve as the critical interactive environment for agent post-training, and an ideal user simulator generalizes across domains and proactively engages in negotiation by challenging or bargaining. However, current methods exhibit two issues. They rely on static and context-unaware profiles, necessitating extensive manual redesign for new scenarios, thus limiting generalizability. Moreover, they neglect human strategic thinking, leading to vulnerability to agent manipulation. To add...


### [SubTokenTest: A Practical Benchmark for Real-World Sub-token Understanding](https://arxiv.org/abs/2601.09089v1)
- **arXiv**: 2601.09089v1
- **Date**: 2026-01-14
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: Test-time scaling
- **Abstract**: Recent advancements in large language models (LLMs) have significantly enhanced their reasoning capabilities. However, they continue to struggle with basic character-level tasks, such as counting letters in words, a problem rooted in their tokenization process. While existing benchmarks have highlighted this weakness through basic character operations, such failures are often dismissed due to lacking practical relevance. Yet, many real-world applications, such as navigating text-based maps or in...


### [Multiplex Thinking: Reasoning via Token-wise Branch-and-Merge](https://arxiv.org/abs/2601.08808v1)
- **arXiv**: 2601.08808v1
- **Date**: 2026-01-13
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning
- **Abstract**: Large language models often solve complex reasoning tasks more effectively with Chain-of-Thought (CoT), but at the cost of long, low-bandwidth token sequences. Humans, by contrast, often reason softly by maintaining a distribution over plausible next steps. Motivated by this, we propose Multiplex Thinking, a stochastic soft reasoning mechanism that, at each thinking step, samples K candidate tokens and aggregates their embeddings into a single continuous multiplex token. This preserves the vocab...


### [Asymptotic Universal Alignment: A New Alignment Framework via Test-Time Scaling](https://arxiv.org/abs/2601.08777v1)
- **arXiv**: 2601.08777v1
- **Date**: 2026-01-13
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: Test-time scaling
- **Abstract**: Aligning large language models (LLMs) to serve users with heterogeneous and potentially conflicting preferences is a central challenge for personalized and trustworthy AI. We formalize an ideal notion of universal alignment through test-time scaling: for each prompt, the model produces $k\ge 1$ candidate responses and a user selects their preferred one. We introduce $(k,f(k))$-robust alignment, which requires the $k$-output model to have win rate $f(k)$ against any other single-output model, and...


### [Rewarding the Rare: Uniqueness-Aware RL for Creative Problem Solving in LLMs](https://arxiv.org/abs/2601.08763v2)
- **arXiv**: 2601.08763v2
- **Date**: 2026-01-13
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning
- **Abstract**: Reinforcement learning (RL) has become a central paradigm for post-training large language models (LLMs), particularly for complex reasoning tasks, yet it often suffers from exploration collapse: policies prematurely concentrate on a small set of dominant reasoning patterns, improving pass@1 while limiting rollout-level diversity and gains in pass@k. We argue that this failure stems from regularizing local token behavior rather than diversity over sets of solutions. To address this, we propose U...


### [PrivGemo: Privacy-Preserving Dual-Tower Graph Retrieval for Empowering LLM Reasoning with Memory Augmentation](https://arxiv.org/abs/2601.08739v1)
- **arXiv**: 2601.08739v1
- **Date**: 2026-01-13
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Knowledge graphs (KGs) provide structured evidence that can ground large language model (LLM) reasoning for knowledge-intensive question answering. However, many practical KGs are private, and sending retrieved triples or exploration traces to closed-source LLM APIs introduces leakage risk. Existing privacy treatments focus on masking entity names, but they still face four limitations: structural leakage under semantic masking, uncontrollable remote interaction, fragile multi-hop and multi-entit...


### [QuantEval: A Benchmark for Financial Quantitative Tasks in Large Language Models](https://arxiv.org/abs/2601.08689v2)
- **arXiv**: 2601.08689v2
- **Date**: 2026-01-13
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning
- **Abstract**: Large Language Models (LLMs) have shown strong capabilities across many domains, yet their evaluation in financial quantitative tasks remains fragmented and mostly limited to knowledge-centric question answering. We introduce QuantEval, a benchmark that evaluates LLMs across three essential dimensions of quantitative finance: knowledge-based QA, quantitative mathematical reasoning, and quantitative strategy coding. Unlike prior financial benchmarks, QuantEval integrates a CTA-style backtesting f...


### [sui-1: Grounded and Verifiable Long-Form Summarization](https://arxiv.org/abs/2601.08472v1)
- **arXiv**: 2601.08472v1
- **Date**: 2026-01-13
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: unfaithful. Topics: CoT faithfulness analysis
- **Abstract**: Large language models frequently generate plausible but unfaithful summaries that users cannot verify against source text, a critical limitation in compliance-sensitive domains such as government and legal analysis. We present sui-1, a 24B parameter model that produces abstractive summaries with inline citations, enabling users to trace each claim to its source sentence. Our synthetic data pipeline combines chain-of-thought prompting with multi-stage verification, generating over 22,000 high-qua...


### [JudgeRLVR: Judge First, Generate Second for Efficient Reasoning](https://arxiv.org/abs/2601.08468v1)
- **arXiv**: 2601.08468v1
- **Date**: 2026-01-13
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning
- **Abstract**: Reinforcement Learning with Verifiable Rewards (RLVR) has become a standard paradigm for reasoning in Large Language Models. However, optimizing solely for final-answer correctness often drives models into aimless, verbose exploration, where they rely on exhaustive trial-and-error tactics rather than structured planning to reach solutions. While heuristic constraints like length penalties can reduce verbosity, they often truncate essential reasoning steps, creating a difficult trade-off between ...


### [Fine-Mem: Fine-Grained Feedback Alignment for Long-Horizon Memory Management](https://arxiv.org/abs/2601.08435v1)
- **arXiv**: 2601.08435v1
- **Date**: 2026-01-13
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning
- **Abstract**: Effective memory management is essential for large language model agents to navigate long-horizon tasks. Recent research has explored using Reinforcement Learning to develop specialized memory manager agents. However, existing approaches rely on final task performance as the primary reward, which results in severe reward sparsity and ineffective credit assignment, providing insufficient guidance for individual memory operations. To this end, we propose Fine-Mem, a unified framework designed for ...


### [D$^2$Plan: Dual-Agent Dynamic Global Planning for Complex Retrieval-Augmented Reasoning](https://arxiv.org/abs/2601.08282v1)
- **arXiv**: 2601.08282v1
- **Date**: 2026-01-13
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: OOD generalization, RL for reasoning
- **Abstract**: Recent search-augmented LLMs trained with reinforcement learning (RL) can interleave searching and reasoning for multi-hop reasoning tasks. However, they face two critical failure modes as the accumulating context becomes flooded with both crucial evidence and irrelevant information: (1) ineffective search chain construction that produces incorrect queries or omits retrieval of critical information, and (2) reasoning hijacking by peripheral evidence that causes models to misidentify distractors ...


### [Discovery and Reinforcement of Tool-Integrated Reasoning Chains via Rollout Trees](https://arxiv.org/abs/2601.08274v2)
- **arXiv**: 2601.08274v2
- **Date**: 2026-01-13
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning
- **Abstract**: Tool-Integrated Reasoning has emerged as a key paradigm to augment Large Language Models (LLMs) with computational capabilities, yet integrating tool-use into long Chain-of-Thought (long CoT) remains underexplored, largely due to the scarcity of training data and the challenge of integrating tool-use without compromising the model's intrinsic long-chain reasoning. In this paper, we introduce DART (Discovery And Reinforcement of Tool-Integrated Reasoning Chains via Rollout Trees), a reinforcement...


### [Debiasing Large Language Models via Adaptive Causal Prompting with Sketch-of-Thought](https://arxiv.org/abs/2601.08108v1)
- **arXiv**: 2601.08108v1
- **Date**: 2026-01-13
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Despite notable advancements in prompting methods for Large Language Models (LLMs), such as Chain-of-Thought (CoT), existing strategies still suffer from excessive token usage and limited generalisability across diverse reasoning tasks. To address these limitations, we propose an Adaptive Causal Prompting with Sketch-of-Thought (ACPS) framework, which leverages structural causal models to infer the causal effect of a query on its answer and adaptively select an appropriate intervention (i.e., st...


### [Reasoning Beyond Chain-of-Thought: A Latent Computational Mode in Large Language Models](https://arxiv.org/abs/2601.08058v1)
- **arXiv**: 2601.08058v1
- **Date**: 2026-01-12
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Chain-of-Thought (CoT) prompting has improved the reasoning performance of large language models (LLMs), but it remains unclear why it works and whether it is the unique mechanism for triggering reasoning in large language models. In this work, we study this question by directly analyzing and intervening on the internal representations of LLMs with Sparse Autoencoders (SAEs), identifying a small set of latent features that are causally associated with LLM reasoning behavior. Across multiple mode...


### [Enhancing Self-Correction in Large Language Models through Multi-Perspective Reflection](https://arxiv.org/abs/2601.07780v1)
- **arXiv**: 2601.07780v1
- **Date**: 2026-01-12
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: While Chain-of-Thought (CoT) prompting advances LLM reasoning, challenges persist in consistency, accuracy, and self-correction, especially for complex or ethically sensitive tasks. Existing single-dimensional reflection methods offer insufficient improvements. We propose MyGO Poly-Reflective Chain-of-Thought (PR-CoT), a novel methodology employing structured multi-perspective reflection. After initial CoT, PR-CoT guides the LLM to self-assess its reasoning across multiple predefined angles: log...


### [Beyond Static Tools: Test-Time Tool Evolution for Scientific Reasoning](https://arxiv.org/abs/2601.07641v1)
- **arXiv**: 2601.07641v1
- **Date**: 2026-01-12
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: Test-time scaling
- **Abstract**: The central challenge of AI for Science is not reasoning alone, but the ability to create computational methods in an open-ended scientific world. Existing LLM-based agents rely on static, pre-defined tool libraries, a paradigm that fundamentally fails in scientific domains where tools are sparse, heterogeneous, and intrinsically incomplete. In this paper, we propose Test-Time Tool Evolution (TTE), a new paradigm that enables agents to synthesize, verify, and evolve executable tools during infer...


### [GRPO with State Mutations: Improving LLM-Based Hardware Test Plan Generation](https://arxiv.org/abs/2601.07593v1)
- **arXiv**: 2601.07593v1
- **Date**: 2026-01-12
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning
- **Abstract**: RTL design often relies heavily on ad-hoc testbench creation early in the design cycle. While large language models (LLMs) show promise for RTL code generation, their ability to reason about hardware specifications and generate targeted test plans remains largely unexplored. We present the first systematic study of LLM reasoning capabilities for RTL verification stimuli generation, establishing a two-stage framework that decomposes test plan generation from testbench execution. Our benchmark rev...


### [Outcome-Grounded Advantage Reshaping for Fine-Grained Credit Assignment in Mathematical Reasoning](https://arxiv.org/abs/2601.07408v1)
- **arXiv**: 2601.07408v1
- **Date**: 2026-01-12
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning
- **Abstract**: Group Relative Policy Optimization (GRPO) has emerged as a promising critic-free reinforcement learning paradigm for reasoning tasks. However, standard GRPO employs a coarse-grained credit assignment mechanism that propagates group-level rewards uniformly to to every token in a sequence, neglecting the varying contribution of individual reasoning steps. We address this limitation by introducing Outcome-grounded Advantage Reshaping (OAR), a fine-grained credit assignment mechanism that redistribu...


### [Reward Modeling from Natural Language Human Feedback](https://arxiv.org/abs/2601.07349v1)
- **arXiv**: 2601.07349v1
- **Date**: 2026-01-12
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning
- **Abstract**: Reinforcement Learning with Verifiable reward (RLVR) on preference data has become the mainstream approach for training Generative Reward Models (GRMs). Typically in pairwise rewarding tasks, GRMs generate reasoning chains ending with critiques and preference labels, and RLVR then relies on the correctness of the preference labels as the training reward. However, in this paper, we demonstrate that such binary classification tasks make GRMs susceptible to guessing correct outcomes without sound c...


### [LRAS: Advanced Legal Reasoning with Agentic Search](https://arxiv.org/abs/2601.07296v1)
- **arXiv**: 2601.07296v1
- **Date**: 2026-01-12
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning
- **Abstract**: While Large Reasoning Models (LRMs) have demonstrated exceptional logical capabilities in mathematical domains, their application to the legal field remains hindered by the strict requirements for procedural rigor and adherence to legal logic. Existing legal LLMs, which rely on "closed-loop reasoning" derived solely from internal parametric knowledge, frequently suffer from lack of self-awareness regarding their knowledge boundaries, leading to confident yet incorrect conclusions. To address thi...


### [ReasonTabQA: A Comprehensive Benchmark for Table Question Answering from Real World Industrial Scenarios](https://arxiv.org/abs/2601.07280v1)
- **arXiv**: 2601.07280v1
- **Date**: 2026-01-12
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning
- **Abstract**: Recent advancements in Large Language Models (LLMs) have significantly catalyzed table-based question answering (TableQA). However, existing TableQA benchmarks often overlook the intricacies of industrial scenarios, which are characterized by multi-table structures, nested headers, and massive scales. These environments demand robust table reasoning through deep structured inference, presenting a significant challenge that remains inadequately addressed by current methodologies. To bridge this g...


### [The Confidence Dichotomy: Analyzing and Mitigating Miscalibration in Tool-Use Agents](https://arxiv.org/abs/2601.07264v1)
- **arXiv**: 2601.07264v1
- **Date**: 2026-01-12
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning
- **Abstract**: Autonomous agents based on large language models (LLMs) are rapidly evolving to handle multi-turn tasks, but ensuring their trustworthiness remains a critical challenge. A fundamental pillar of this trustworthiness is calibration, which refers to an agent's ability to express confidence that reliably reflects its actual performance. While calibration is well-established for static models, its dynamics in tool-integrated agentic workflows remain underexplored. In this work, we systematically inve...


### [Lost in the Noise: How Reasoning Models Fail with Contextual Distractors](https://arxiv.org/abs/2601.07226v1)
- **arXiv**: 2601.07226v1
- **Date**: 2026-01-12
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning, Test-time scaling, Emergence claims
- **Abstract**: Recent advances in reasoning models and agentic AI systems have led to an increased reliance on diverse external information. However, this shift introduces input contexts that are inherently noisy, a reality that current sanitized benchmarks fail to capture. We introduce NoisyBench, a comprehensive benchmark that systematically evaluates model robustness across 11 datasets in RAG, reasoning, alignment, and tool-use tasks against diverse noise types, including random documents, irrelevant chat h...


### [Structured Reasoning for Large Language Models](https://arxiv.org/abs/2601.07180v1)
- **arXiv**: 2601.07180v1
- **Date**: 2026-01-12
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning
- **Abstract**: Large language models (LLMs) achieve strong performance by generating long chains of thought, but longer traces always introduce redundant or ineffective reasoning steps. One typical behavior is that they often perform unnecessary verification and revisions even if they have reached the correct answers. This limitation stems from the unstructured nature of reasoning trajectories and the lack of targeted supervision for critical reasoning abilities. To address this, we propose Structured Reasonin...


### [Rewarding Creativity: A Human-Aligned Generative Reward Model for Reinforcement Learning in Storytelling](https://arxiv.org/abs/2601.07149v1)
- **arXiv**: 2601.07149v1
- **Date**: 2026-01-12
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning
- **Abstract**: While Large Language Models (LLMs) can generate fluent text, producing high-quality creative stories remains challenging. Reinforcement Learning (RL) offers a promising solution but faces two critical obstacles: designing reliable reward signals for subjective storytelling quality and mitigating training instability. This paper introduces the Reinforcement Learning for Creative Storytelling (RLCS) framework to systematically address both challenges. First, we develop a Generative Reward Model (G...


### [X-Coder: Advancing Competitive Programming with Fully Synthetic Tasks, Solutions, and Tests](https://arxiv.org/abs/2601.06953v1)
- **arXiv**: 2601.06953v1
- **Date**: 2026-01-11
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning
- **Abstract**: Competitive programming presents great challenges for Code LLMs due to its intensive reasoning demands and high logical complexity. However, current Code LLMs still rely heavily on real-world data, which limits their scalability. In this paper, we explore a fully synthetic approach: training Code LLMs with entirely generated tasks, solutions, and test cases, to empower code reasoning models without relying on real-world data. To support this, we leverage feature-based synthesis to propose a nove...


### [Forest Before Trees: Latent Superposition for Efficient Visual Reasoning](https://arxiv.org/abs/2601.06803v1)
- **arXiv**: 2601.06803v1
- **Date**: 2026-01-11
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: out-of-distribution. Topics: OOD generalization
- **Abstract**: While Chain-of-Thought empowers Large Vision-Language Models with multi-step reasoning, explicit textual rationales suffer from an information bandwidth bottleneck, where continuous visual details are discarded during discrete tokenization. Recent latent reasoning methods attempt to address this challenge, but often fall prey to premature semantic collapse due to rigid autoregressive objectives. In this paper, we propose Laser, a novel paradigm that reformulates visual deduction via Dynamic Wind...


### [MedEinst: Benchmarking the Einstellung Effect in Medical LLMs through Counterfactual Differential Diagnosis](https://arxiv.org/abs/2601.06636v1)
- **arXiv**: 2601.06636v1
- **Date**: 2026-01-10
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Despite achieving high accuracy on medical benchmarks, LLMs exhibit the Einstellung Effect in clinical diagnosis--relying on statistical shortcuts rather than patient-specific evidence, causing misdiagnosis in atypical cases. Existing benchmarks fail to detect this critical failure mode. We introduce MedEinst, a counterfactual benchmark with 5,383 paired clinical cases across 49 diseases. Each pair contains a control case and a "trap" case with altered discriminative evidence that flips the diag...


### [How well can off-the-shelf LLMs elucidate molecular structures from mass spectra using chain-of-thought reasoning?](https://arxiv.org/abs/2601.06289v1)
- **arXiv**: 2601.06289v1
- **Date**: 2026-01-09
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning
- **Abstract**: Mass spectrometry (MS) is a powerful analytical technique for identifying small molecules, yet determining complete molecular structures directly from tandem mass spectra (MS/MS) remains a long-standing challenge due to complex fragmentation patterns and the vast diversity of chemical space. Recent progress in large language models (LLMs) has shown promise for reasoning-intensive scientific tasks, but their capability for chemical interpretation is still unclear. In this work, we introduce a Cha...


### [AdaFuse: Adaptive Ensemble Decoding with Test-Time Scaling for LLMs](https://arxiv.org/abs/2601.06022v1)
- **arXiv**: 2601.06022v1
- **Date**: 2026-01-09
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: Test-time scaling
- **Abstract**: Large language models (LLMs) exhibit complementary strengths arising from differences in pretraining data, model architectures, and decoding behaviors. Inference-time ensembling provides a practical way to combine these capabilities without retraining. However, existing ensemble approaches suffer from fundamental limitations. Most rely on fixed fusion granularity, which lacks the flexibility required for mid-generation adaptation and fails to adapt to different generation characteristics across ...


### [Chaining the Evidence: Robust Reinforcement Learning for Deep Search Agents with Citation-Aware Rubric Rewards](https://arxiv.org/abs/2601.06021v1)
- **arXiv**: 2601.06021v1
- **Date**: 2026-01-09
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning
- **Abstract**: Reinforcement learning (RL) has emerged as a critical technique for enhancing LLM-based deep search agents. However, existing approaches primarily rely on binary outcome rewards, which fail to capture the comprehensiveness and factuality of agents' reasoning process, and often lead to undesirable behaviors such as shortcut exploitation and hallucinations. To address these limitations, we propose \textbf{Citation-aware Rubric Rewards (CaRR)}, a fine-grained reward framework for deep search agents...


### [The Molecular Structure of Thought: Mapping the Topology of Long Chain-of-Thought Reasoning](https://arxiv.org/abs/2601.06002v2)
- **arXiv**: 2601.06002v2
- **Date**: 2026-01-09
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning
- **Abstract**: Large language models (LLMs) often fail to learn effective long chain-of-thought (Long CoT) reasoning from human or non-Long-CoT LLMs imitation. To understand this, we propose that effective and learnable Long CoT trajectories feature stable molecular-like structures in unified view, which are formed by three interaction types: Deep-Reasoning (covalent-like), Self-Reflection (hydrogen-bond-like), and Self-Exploration (van der Waals-like). Analysis of distilled trajectories reveals these structur...


### [Logic-Parametric Neuro-Symbolic NLI: Controlling Logical Formalisms for Verifiable LLM Reasoning](https://arxiv.org/abs/2601.05705v1)
- **arXiv**: 2601.05705v1
- **Date**: 2026-01-09
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Large language models (LLMs) and theorem provers (TPs) can be effectively combined for verifiable natural language inference (NLI). However, existing approaches rely on a fixed logical formalism, a feature that limits robustness and adaptability. We propose a logic-parametric framework for neuro-symbolic NLI that treats the underlying logic not as a static background, but as a controllable component. Using the LogiKEy methodology, we embed a range of classical and non-classical formalisms into h...


### [WildSci: Advancing Scientific Reasoning from In-the-Wild Literature](https://arxiv.org/abs/2601.05567v1)
- **arXiv**: 2601.05567v1
- **Date**: 2026-01-09
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning
- **Abstract**: Recent progress in large language model (LLM) reasoning has focused on domains like mathematics and coding, where abundant high-quality data and objective evaluation metrics are readily available. In contrast, progress in LLM reasoning models remains limited in scientific domains such as medicine and materials science due to limited dataset coverage and the inherent complexity of open-ended scientific questions. To address these challenges, we introduce WildSci, a new dataset of domain-specific ...


### [Thinking with Map: Reinforced Parallel Map-Augmented Agent for Geolocalization](https://arxiv.org/abs/2601.05432v1)
- **arXiv**: 2601.05432v1
- **Date**: 2026-01-08
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning, Test-time scaling
- **Abstract**: The image geolocalization task aims to predict the location where an image was taken anywhere on Earth using visual clues. Existing large vision-language model (LVLM) approaches leverage world knowledge, chain-of-thought reasoning, and agentic capabilities, but overlook a common strategy used by humans -- using maps. In this work, we first equip the model \textit{Thinking with Map} ability and formulate it as an agent-in-the-map loop. We develop a two-stage optimization scheme for it, including ...


### [The Persona Paradox: Medical Personas as Behavioral Priors in Clinical Language Models](https://arxiv.org/abs/2601.05376v1)
- **arXiv**: 2601.05376v1
- **Date**: 2026-01-08
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Persona conditioning can be viewed as a behavioral prior for large language models (LLMs) and is often assumed to confer expertise and improve safety in a monotonic manner. However, its effects on high-stakes clinical decision-making remain poorly characterized. We systematically evaluate persona-based control in clinical LLMs, examining how professional roles (e.g., Emergency Department physician, nurse) and interaction styles (bold vs.\ cautious) influence behavior across models and medical ta...


### [Learning from Mistakes: Negative Reasoning Samples Enhance Out-of-Domain Generalization](https://arxiv.org/abs/2601.04992v2)
- **arXiv**: 2601.04992v2
- **Date**: 2026-01-08
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: OOD generalization, RL for reasoning
- **Abstract**: Supervised fine-tuning (SFT) on chain-of-thought (CoT) trajectories demonstrations is a common approach for enabling reasoning in large language models. Standard practices typically only retain trajectories with correct final answers (positives) while ignoring the rest (negatives). We argue that this paradigm discards substantial supervision and exacerbates overfitting, limiting out-of-domain (OOD) generalization. Specifically, we surprisingly find that incorporating negative trajectories into S...


### [Higher-Order Knowledge Representations for Agentic Scientific Reasoning](https://arxiv.org/abs/2601.04878v1)
- **arXiv**: 2601.04878v1
- **Date**: 2026-01-08
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: CoT faithfulness analysis, Emergence claims
- **Abstract**: Scientific inquiry requires systems-level reasoning that integrates heterogeneous experimental data, cross-domain knowledge, and mechanistic evidence into coherent explanations. While Large Language Models (LLMs) offer inferential capabilities, they often depend on retrieval-augmented contexts that lack structural depth. Traditional Knowledge Graphs (KGs) attempt to bridge this gap, yet their pairwise constraints fail to capture the irreducible higher-order interactions that govern emergent phys...


### [AT$^2$PO: Agentic Turn-based Policy Optimization via Tree Search](https://arxiv.org/abs/2601.04767v1)
- **arXiv**: 2601.04767v1
- **Date**: 2026-01-08
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning
- **Abstract**: LLM agents have emerged as powerful systems for tackling multi-turn tasks by interleaving internal reasoning and external tool interactions. Agentic Reinforcement Learning has recently drawn significant research attention as a critical post-training paradigm to further refine these capabilities. In this paper, we present AT$^2$PO (Agentic Turn-based Policy Optimization via Tree Search), a unified framework for multi-turn agentic RL that addresses three core challenges: limited exploration divers...


### [Tool-MAD: A Multi-Agent Debate Framework for Fact Verification with Diverse Tool Augmentation and Adaptive Retrieval](https://arxiv.org/abs/2601.04742v1)
- **arXiv**: 2601.04742v1
- **Date**: 2026-01-08
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: faithfulness. Topics: CoT faithfulness analysis
- **Abstract**: Large Language Models (LLMs) suffer from hallucinations and factual inaccuracies, especially in complex reasoning and fact verification tasks. Multi-Agent Debate (MAD) systems aim to improve answer accuracy by enabling multiple LLM agents to engage in dialogue, promoting diverse reasoning and mutual verification. However, existing MAD frameworks primarily rely on internal knowledge or static documents, making them vulnerable to hallucinations. While MADKE introduces external evidence to mitigate...


### [PRISM: A Unified Framework for Post-Training LLMs Without Verifiable Rewards](https://arxiv.org/abs/2601.04700v2)
- **arXiv**: 2601.04700v2
- **Date**: 2026-01-08
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: Test-time scaling
- **Abstract**: Current techniques for post-training Large Language Models (LLMs) rely either on costly human supervision or on external verifiers to boost performance on tasks such as mathematical reasoning and code generation. However, as LLMs improve their problem-solving, any further improvement will potentially require high-quality solutions to difficult problems that are not available to humans. As a result, learning from unlabeled data is becoming increasingly attractive in the research community. Existi...


### [Addressing Overthinking in Large Vision-Language Models via Gated Perception-Reasoning Optimization](https://arxiv.org/abs/2601.04442v1)
- **arXiv**: 2601.04442v1
- **Date**: 2026-01-07
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning, Test-time scaling
- **Abstract**: Large Vision-Language Models (LVLMs) have exhibited strong reasoning capabilities through chain-of-thought mechanisms that generate step-by-step rationales. However, such slow-thinking approaches often lead to overthinking, where models produce excessively verbose responses even for simple queries, resulting in test-time inefficiency and even degraded accuracy. Prior work has attempted to mitigate this issue via adaptive reasoning strategies, but these methods largely overlook a fundamental bott...


### [Adaptive-Boundary-Clipping GRPO: Ensuring Bounded Ratios for Stable and Generalizable Training](https://arxiv.org/abs/2601.03895v1)
- **arXiv**: 2601.03895v1
- **Date**: 2026-01-07
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning
- **Abstract**: Group Relative Policy Optimization (GRPO) has emerged as a popular algorithm for reinforcement learning with large language models (LLMs). However, upon analyzing its clipping mechanism, we argue that it is suboptimal in certain scenarios. With appropriate modifications, GRPO can be significantly enhanced to improve both flexibility and generalization. To this end, we propose Adaptive-Boundary-Clipping GRPO (ABC-GRPO), an asymmetric and adaptive refinement of the original GRPO framework. We demo...


### [Atlas: Orchestrating Heterogeneous Models and Tools for Multi-Domain Complex Reasoning](https://arxiv.org/abs/2601.03872v1)
- **arXiv**: 2601.03872v1
- **Date**: 2026-01-07
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: out-of-distribution. Topics: OOD generalization
- **Abstract**: The integration of large language models (LLMs) with external tools has significantly expanded the capabilities of AI agents. However, as the diversity of both LLMs and tools increases, selecting the optimal model-tool combination becomes a high-dimensional optimization challenge. Existing approaches often rely on a single model or fixed tool-calling logic, failing to exploit the performance variations across heterogeneous model-tool pairs. In this paper, we present ATLAS (Adaptive Tool-LLM Alig...


### [MIND: From Passive Mimicry to Active Reasoning through Capability-Aware Multi-Perspective CoT Distillation](https://arxiv.org/abs/2601.03717v1)
- **arXiv**: 2601.03717v1
- **Date**: 2026-01-07
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: out-of-distribution. Topics: OOD generalization
- **Abstract**: While Large Language Models (LLMs) have emerged with remarkable capabilities in complex tasks through Chain-of-Thought reasoning, practical resource constraints have sparked interest in transferring these abilities to smaller models. However, achieving both domain performance and cross-domain generalization remains challenging. Existing approaches typically restrict students to following a single golden rationale and treat different reasoning paths independently. Due to distinct inductive biases...


### [From Implicit to Explicit: Token-Efficient Logical Supervision for Mathematical Reasoning in LLMs](https://arxiv.org/abs/2601.03682v1)
- **arXiv**: 2601.03682v1
- **Date**: 2026-01-07
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: out-of-distribution. Topics: OOD generalization, Pattern matching analysis
- **Abstract**: Recent studies reveal that large language models (LLMs) exhibit limited logical reasoning abilities in mathematical problem-solving, instead often relying on pattern-matching and memorization. We systematically analyze this limitation, focusing on logical relationship understanding, which is a core capability underlying genuine logical reasoning, and reveal that errors related to this capability account for over 90\% of incorrect predictions, with Chain-of-Thought Supervised Fine-Tuning (CoT-SFT...


### [Towards Compositional Generalization of LLMs via Skill Taxonomy Guided Data Synthesis](https://arxiv.org/abs/2601.03676v1)
- **arXiv**: 2601.03676v1
- **Date**: 2026-01-07
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: compositional. Topics: Compositional generalization
- **Abstract**: Large Language Models (LLMs) and agent-based systems often struggle with compositional generalization due to a data bottleneck in which complex skill combinations follow a long-tailed, power-law distribution, limiting both instruction-following performance and generalization in agent-centric tasks. To address this challenge, we propose STEPS, a Skill Taxonomy guided Entropy-based Post-training data Synthesis framework for generating compositionally challenging data. STEPS explicitly targets comp...


### [Metaphors are a Source of Cross-Domain Misalignment of Large Reasoning Models](https://arxiv.org/abs/2601.03388v2)
- **arXiv**: 2601.03388v2
- **Date**: 2026-01-06
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: Emergence claims
- **Abstract**: Earlier research has shown that metaphors influence human's decision making, which raises the question of whether metaphors also influence large language models (LLMs)' reasoning pathways, considering their training data contain a large number of metaphors. In this work, we investigate the problem in the scope of the emergent misalignment problem where LLMs can generalize patterns learned from misaligned content in one domain to another domain. We discover a strong causal relationship between me...


### [ATLAS: Adaptive Test-Time Latent Steering with External Verifiers for Enhancing LLMs Reasoning](https://arxiv.org/abs/2601.03093v1)
- **arXiv**: 2601.03093v1
- **Date**: 2026-01-06
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: Test-time scaling
- **Abstract**: Recent work on activation and latent steering has demonstrated that modifying internal representations can effectively guide large language models (LLMs) toward improved reasoning and efficiency without additional training. However, most existing approaches rely on fixed steering policies and static intervention strengths, which limit their robustness across problem instances and often result in over- or under-steering. We propose Adaptive Test-time Latent Steering, called (ATLAS), a task-specif...


### [Detecting Hallucinations in Retrieval-Augmented Generation via Semantic-level Internal Reasoning Graph](https://arxiv.org/abs/2601.03052v1)
- **arXiv**: 2601.03052v1
- **Date**: 2026-01-06
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: faithfulness. Topics: CoT faithfulness analysis
- **Abstract**: The Retrieval-augmented generation (RAG) system based on Large language model (LLM) has made significant progress. It can effectively reduce factuality hallucinations, but faithfulness hallucinations still exist. Previous methods for detecting faithfulness hallucinations either neglect to capture the models' internal reasoning processes or handle those features coarsely, making it difficult for discriminators to learn. This paper proposes a semantic-level internal reasoning graph-based method fo...


### [Mechanistic Interpretability of Large-Scale Counting in LLMs through a System-2 Strategy](https://arxiv.org/abs/2601.02989v1)
- **arXiv**: 2601.02989v1
- **Date**: 2026-01-06
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: Test-time scaling
- **Abstract**: Large language models (LLMs), despite strong performance on complex mathematical problems, exhibit systematic limitations in counting tasks. This issue arises from architectural limits of transformers, where counting is performed across layers, leading to degraded precision for larger counting problems due to depth constraints. To address this limitation, we propose a simple test-time strategy inspired by System-2 cognitive processes that decomposes large counting tasks into smaller, independent...


### [Correct, Concise and Complete: Multi-stage Training For Adaptive Reasoning](https://arxiv.org/abs/2601.02972v1)
- **arXiv**: 2601.02972v1
- **Date**: 2026-01-06
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning, Test-time scaling
- **Abstract**: The reasoning capabilities of large language models (LLMs) have improved substantially through increased test-time computation, typically in the form of intermediate tokens known as chain-of-thought (CoT). However, CoT often becomes unnecessarily long, increasing computation cost without actual accuracy gains or sometimes even degrading performance, a phenomenon known as ``overthinking''. We propose a multi-stage efficient reasoning method that combines supervised fine-tuning -- via rejection sa...


### [Linear Script Representations in Speech Foundation Models Enable Zero-Shot Transliteration](https://arxiv.org/abs/2601.02906v1)
- **arXiv**: 2601.02906v1
- **Date**: 2026-01-06
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Multilingual speech foundation models such as Whisper are trained on web-scale data, where data for each language consists of a myriad of regional varieties. However, different regional varieties often employ different scripts to write the same language, rendering speech recognition output also subject to non-determinism in the output script. To mitigate this problem, we show that script is linearly encoded in the activation space of multilingual speech models, and that modifying activations at ...


### [SYNAPSE: Empowering LLM Agents with Episodic-Semantic Memory via Spreading Activation](https://arxiv.org/abs/2601.02744v2)
- **arXiv**: 2601.02744v2
- **Date**: 2026-01-06
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: While Large Language Models (LLMs) excel at generalized reasoning, standard retrieval-augmented approaches fail to address the disconnected nature of long-term agentic memory. To bridge this gap, we introduce Synapse (Synergistic Associative Processing Semantic Encoding), a unified memory architecture that transcends static vector similarity. Drawing from cognitive science, Synapse models memory as a dynamic graph where relevance emerges from spreading activation rather than pre-computed links. ...


### [Time-Scaling Is What Agents Need Now](https://arxiv.org/abs/2601.02714v1)
- **arXiv**: 2601.02714v1
- **Date**: 2026-01-06
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning
- **Abstract**: Early artificial intelligence paradigms exhibited separated cognitive functions: Neural Networks focused on "perception-representation," Reinforcement Learning on "decision-making-behavior," and Symbolic AI on "knowledge-reasoning." With Transformer-based large models and world models, these paradigms are converging into cognitive agents with closed-loop "perception-decision-action" capabilities.
  Humans solve complex problems under limited cognitive resources through temporalized sequential re...


### [DermoGPT: Open Weights and Open Data for Morphology-Grounded Dermatological Reasoning MLLMs](https://arxiv.org/abs/2601.01868v1)
- **arXiv**: 2601.01868v1
- **Date**: 2026-01-05
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning, Test-time scaling
- **Abstract**: Multimodal Large Language Models (MLLMs) show promise for medical applications, yet progress in dermatology lags due to limited training data, narrow task coverage, and lack of clinically-grounded supervision that mirrors expert diagnostic workflows. We present a comprehensive framework to address these gaps. First, we introduce DermoInstruct, a large-scale morphology-anchored instruction corpus comprising 211,243 images and 772,675 trajectories across five task formats, capturing the complete d...


### [A Training-Free Large Reasoning Model-based Knowledge Tracing Framework for Unified Prediction and Prescription](https://arxiv.org/abs/2601.01708v1)
- **arXiv**: 2601.01708v1
- **Date**: 2026-01-05
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: Test-time scaling
- **Abstract**: Knowledge Tracing (KT) aims to estimate a learner's evolving mastery based on interaction histories. Recent studies have explored Large Language Models (LLMs) for KT via autoregressive nature, but such approaches typically require fine-tuning and exhibit unstable or near-random performance. Moreover, prior KT systems primarily focus on prediction and rely on multi-stage pipelines for feedback and recommendation, resulting in increased system complexity and resources. To address this gap, we prop...


### [SWE-Lego: Pushing the Limits of Supervised Fine-tuning for Software Issue Resolving](https://arxiv.org/abs/2601.01426v2)
- **arXiv**: 2601.01426v2
- **Date**: 2026-01-04
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning, Test-time scaling
- **Abstract**: We present SWE-Lego, a supervised fine-tuning (SFT) recipe designed to achieve state-ofthe-art performance in software engineering (SWE) issue resolving. In contrast to prevalent methods that rely on complex training paradigms (e.g., mid-training, SFT, reinforcement learning, and their combinations), we explore how to push the limits of a lightweight SFT-only approach for SWE tasks. SWE-Lego comprises three core building blocks, with key findings summarized as follows: 1) the SWE-Lego dataset, a...


### [FLOP-Efficient Training: Early Stopping Based on Test-Time Compute Awareness](https://arxiv.org/abs/2601.01332v1)
- **arXiv**: 2601.01332v1
- **Date**: 2026-01-04
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: test-time compute. Topics: Test-time scaling
- **Abstract**: Scaling training compute, measured in FLOPs, has long been shown to improve the accuracy of large language models, yet training remains resource-intensive. Prior work shows that increasing test-time compute (TTC)-for example through iterative sampling-can allow smaller models to rival or surpass much larger ones at lower overall cost. We introduce TTC-aware training, where an intermediate checkpoint and a corresponding TTC configuration can together match or exceed the accuracy of a fully traine...


### [T3C: Test-Time Tensor Compression with Consistency Guarantees](https://arxiv.org/abs/2601.01299v1)
- **arXiv**: 2601.01299v1
- **Date**: 2026-01-03
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: Test-time scaling
- **Abstract**: We present T3C, a train-once, test-time budget-conditioned compression framework that exposes rank and precision as a controllable deployment knob. T3C combines elastic tensor factorization (maintained up to a maximal rank) with rank-tied mixed-precision quantization and a lightweight controller that maps a latency/energy/size budget token to per-layer rank/bit assignments; the policy snaps to hardware-aligned profiles and is monotone in the budget. A fast, layerwise consistency certificate, com...


### [Intention Collapse: Intention-Level Metrics for Reasoning in Language Models](https://arxiv.org/abs/2601.01011v1)
- **arXiv**: 2601.01011v1
- **Date**: 2026-01-03
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Every act of language generation compresses a rich internal state into a single token sequence. We call this process intention collapse: a many-to-one projection from a high dimensional intention space I into an external language space L. We formalize intention collapse for contemporary language models, define three simple, model agnostic intention metrics (intention entropy Hint, effective dimensionality dimeff, and latent knowledge recoverability Recov), and propose an empirical agenda for stu...


### [Many Minds from One Model: Bayesian-Inspired Transformers for Population Diversity](https://arxiv.org/abs/2512.25063v2)
- **arXiv**: 2512.25063v2
- **Date**: 2025-12-31
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning
- **Abstract**: Despite their scale and success, modern transformers are usually trained as single-minded systems: optimization produces a deterministic set of parameters, representing a single functional hypothesis about the data. Motivated by the analogy to human populations, in which population-level intelligence emerges from diverse individual behaviors, we propose Population Bayesian Transformers (B-Trans), which enable sampling diverse yet coherent transformer large language model instances (hereafter ref...


### [When to Ponder: Adaptive Compute Allocation for Code Generation via Test-Time Training](https://arxiv.org/abs/2601.00894v1)
- **arXiv**: 2601.00894v1
- **Date**: 2025-12-31
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: OOD generalization, Test-time scaling
- **Abstract**: Large language models apply uniform computation to all inputs, regardless of difficulty. We propose PonderTTT, a gating strategy using the TTT layer's self-supervised reconstruction loss to selectively trigger Test-Time Training (TTT) updates. The gating decision itself is training-free--requiring no learned classifier or auxiliary networks; only a single scalar threshold is initially calibrated on unlabeled data and continuously adapted via EMA to maintain target update rates. Our experiments w...


### [Compute-Accuracy Pareto Frontiers for Open-Source Reasoning Large Language Models](https://arxiv.org/abs/2512.24776v1)
- **arXiv**: 2512.24776v1
- **Date**: 2025-12-31
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: Test-time scaling, Emergence claims
- **Abstract**: Large Language Models (LLMs) are demonstrating rapid improvements on complex reasoning benchmarks, particularly when allowed to utilize intermediate reasoning steps before converging on a final solution. However, current literature often overlooks the significant computational burden associated with generating long reasoning sequences. For industrial applications, model selection depends not only on raw accuracy but also on resource constraints and inference costs. In this work, we conduct a tes...


### [Understanding and Steering the Cognitive Behaviors of Reasoning Models at Test-Time](https://arxiv.org/abs/2512.24574v2)
- **arXiv**: 2512.24574v2
- **Date**: 2025-12-31
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: Test-time scaling
- **Abstract**: Large Language Models (LLMs) often rely on long chain-of-thought (CoT) reasoning to solve complex tasks. While effective, these trajectories are frequently inefficient, leading to high latency from excessive token generation, or unstable reasoning that alternates between underthinking (shallow, inconsistent steps) and overthinking (repetitive, verbose reasoning). In this work, we study the structure of reasoning trajectories and uncover specialized attention heads that correlate with distinct co...


### [World model inspired sarcasm reasoning with large language model agents](https://arxiv.org/abs/2512.24329v1)
- **arXiv**: 2512.24329v1
- **Date**: 2025-12-30
- **Stance**: CHALLENGES
- **Why read**: May challenge thesis. Keywords: reasoning capability
- **Abstract**: Sarcasm understanding is a challenging problem in natural language processing, as it requires capturing the discrepancy between the surface meaning of an utterance and the speaker's intentions as well as the surrounding social context. Although recent advances in deep learning and Large Language Models (LLMs) have substantially improved performance, most existing approaches still rely on black-box predictions of a single model, making it difficult to structurally explain the cognitive factors un...


### [Trellis: Learning to Compress Key-Value Memory in Attention Models](https://arxiv.org/abs/2512.23852v1)
- **arXiv**: 2512.23852v1
- **Date**: 2025-12-29
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Transformers, while powerful, suffer from quadratic computational complexity and the ever-growing Key-Value (KV) cache of the attention mechanism. This paper introduces Trellis, a novel Transformer architecture with bounded memory that learns how to compress its key-value memory dynamically at test time. Trellis replaces the standard KV cache with a fixed-size memory and train a two-pass recurrent compression mechanism to store new keys and values into memory. To achieve this, it leverages an on...


### [The Big Three in Marriage Talk: LLM-Assisted Analysis of Moral Ethics and Sentiment on Weibo and Xiaohongshu](https://arxiv.org/abs/2512.23609v1)
- **arXiv**: 2512.23609v1
- **Date**: 2025-12-29
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: China's marriage registrations have declined dramatically, dropping from 13.47 million couples in 2013 to 6.1 million in 2024. Understanding public attitudes toward marriage requires examining not only emotional sentiment but also the moral reasoning underlying these evaluations. This study analyzed 219,358 marriage-related posts from two major Chinese social media platforms (Sina Weibo and Xiaohongshu) using large language model (LLM)-assisted content analysis. Drawing on Shweder's Big Three mo...


### [Scoring, Reasoning, and Selecting the Best! Ensembling Large Language Models via a Peer-Review Process](https://arxiv.org/abs/2512.23213v1)
- **arXiv**: 2512.23213v1
- **Date**: 2025-12-29
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: We propose LLM-PeerReview, an unsupervised LLM Ensemble method that selects the most ideal response from multiple LLM-generated candidates for each query, harnessing the collective wisdom of multiple models with diverse strengths. LLM-PeerReview is built on a novel, peer-review-inspired framework that offers a clear and interpretable mechanism, while remaining fully unsupervised for flexible adaptability and generalization. Specifically, it operates in three stages: For scoring, we use the emerg...


### [Entropy-Aware Speculative Decoding Toward Improved LLM Reasoning](https://arxiv.org/abs/2512.23765v1)
- **arXiv**: 2512.23765v1
- **Date**: 2025-12-29
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Speculative decoding (SD) accelerates large language model (LLM) reasoning by using a small draft model to generate candidate tokens, which the target LLM either accepts directly or regenerates upon rejection. However, excessive alignment between the draft and target models constrains SD to the performance of the target LLM. To address this limitation, we propose Entropy-Aware Speculative Decoding (EASD), a training-free enhancement. Building on standard SD, EASD incorporates a dynamic entropy-b...


### [Is Chain-of-Thought Really Not Explainability? Chain-of-Thought Can Be Faithful without Hint Verbalization](https://arxiv.org/abs/2512.23032v1)
- **arXiv**: 2512.23032v1
- **Date**: 2025-12-28
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: faithfulness, unfaithful. Topics: CoT faithfulness analysis
- **Abstract**: Recent work, using the Biasing Features metric, labels a CoT as unfaithful if it omits a prompt-injected hint that affected the prediction. We argue this metric confuses unfaithfulness with incompleteness, the lossy compression needed to turn distributed transformer computation into a linear natural language narrative. On multi-hop reasoning tasks with Llama-3 and Gemma-3, many CoTs flagged as unfaithful by Biasing Features are judged faithful by other metrics, exceeding 50% in some models. With...


### [Scaling Unverifiable Rewards: A Case Study on Visual Insights](https://arxiv.org/abs/2512.22650v1)
- **arXiv**: 2512.22650v1
- **Date**: 2025-12-27
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: Test-time scaling
- **Abstract**: Large Language Model (LLM) agents can increasingly automate complex reasoning through Test-Time Scaling (TTS), iterative refinement guided by reward signals. However, many real-world tasks involve multi-stage pipeline whose final outcomes lack verifiable rewards or sufficient data to train robust reward models, making judge-based refinement prone to accumulate error over stages. We propose Selective TTS, a process-based refinement framework that scales inference across different stages in multi-...


### [Evaluating GRPO and DPO for Faithful Chain-of-Thought Reasoning in LLMs](https://arxiv.org/abs/2512.22631v1)
- **arXiv**: 2512.22631v1
- **Date**: 2025-12-27
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: faithfulness. Topics: CoT faithfulness analysis
- **Abstract**: Chain-of-thought (CoT) reasoning has emerged as a powerful technique for improving the problem-solving capabilities of large language models (LLMs), particularly for tasks requiring multi-step reasoning. However, recent studies show that CoT explanations often fail to reflect the model's actual reasoning process, as models may produce coherent yet misleading justifications or modify answers without acknowledging external cues. Such discrepancies undermine the reliability of CoT-based methods for...


### [SWE-RM: Execution-free Feedback For Software Engineering Agents](https://arxiv.org/abs/2512.21919v1)
- **arXiv**: 2512.21919v1
- **Date**: 2025-12-26
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning, Test-time scaling
- **Abstract**: Execution-based feedback like unit testing is widely used in the development of coding agents through test-time scaling (TTS) and reinforcement learning (RL). This paradigm requires scalable and reliable collection of unit test cases to provide accurate feedback, and the resulting feedback is often sparse and cannot effectively distinguish between trajectories that are both successful or both unsuccessful. In contrast, execution-free feedback from reward models can provide more fine-grained sign...


### [Do Latent Tokens Think? A Causal and Adversarial Analysis of Chain-of-Continuous-Thought](https://arxiv.org/abs/2512.21711v1)
- **arXiv**: 2512.21711v1
- **Date**: 2025-12-25
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: out-of-distribution. Topics: CoT faithfulness analysis, OOD generalization
- **Abstract**: Latent tokens are gaining attention for enhancing reasoning in large language models (LLMs), yet their internal mechanisms remain unclear. This paper examines the problem from a reliability perspective, uncovering fundamental weaknesses: latent tokens function as uninterpretable placeholders rather than encoding faithful reasoning. While resistant to perturbation, they promote shortcut usage over genuine reasoning. We focus on Chain-of-Continuous-Thought (COCONUT), which claims better efficiency...


### [Rethinking Supervised Fine-Tuning: Emphasizing Key Answer Tokens for Improved LLM Accuracy](https://arxiv.org/abs/2512.21017v1)
- **arXiv**: 2512.21017v1
- **Date**: 2025-12-24
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: With the rapid advancement of Large Language Models (LLMs), the Chain-of-Thought (CoT) component has become significant for complex reasoning tasks. However, in conventional Supervised Fine-Tuning (SFT), the model could allocate disproportionately more attention to CoT sequences with excessive length. This reduces focus on the much shorter but essential Key portion-the final answer, whose correctness directly determines task success and evaluation quality. To address this limitation, we propose ...


### [Reflection Pretraining Enables Token-Level Self-Correction in Biological Sequence Models](https://arxiv.org/abs/2512.20954v1)
- **arXiv**: 2512.20954v1
- **Date**: 2025-12-24
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Chain-of-Thought (CoT) prompting has significantly advanced task-solving capabilities in natural language processing with large language models. Unlike standard prompting, CoT encourages the model to generate intermediate reasoning steps, non-answer tokens, that help guide the model toward more accurate final outputs. These intermediate steps enable more complex reasoning processes such as error correction, memory management, future planning, and self-reflection. However, applying CoT to non-nat...


### [Generalization of RLVR Using Causal Reasoning as a Testbed](https://arxiv.org/abs/2512.20760v1)
- **arXiv**: 2512.20760v1
- **Date**: 2025-12-23
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: OOD generalization, RL for reasoning
- **Abstract**: Reinforcement learning with verifiable rewards (RLVR) has emerged as a promising paradigm for post-training large language models (LLMs) on complex reasoning tasks. Yet, the conditions under which RLVR yields robust generalization remain poorly understood. This paper provides an empirical study of RLVR generalization in the setting of probabilistic inference over causal graphical models. This setting offers two natural axes along which to examine generalization: (i) the level of the probabilisti...


### [AgentMath: Empowering Mathematical Reasoning for Large Language Models via Tool-Augmented Agent](https://arxiv.org/abs/2512.20745v2)
- **arXiv**: 2512.20745v2
- **Date**: 2025-12-23
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning, Emergence claims
- **Abstract**: Large Reasoning Models (LRMs) like o3 and DeepSeek-R1 have achieved remarkable progress in natural language reasoning with long chain-of-thought. However, they remain computationally inefficient and struggle with accuracy when solving problems requiring complex mathematical operations. In this work, we present AgentMath, an agent framework that seamlessly integrates language models' reasoning capabilities with code interpreters' computational precision to efficiently tackle complex mathematical ...


### [Multi-hop Reasoning via Early Knowledge Alignment](https://arxiv.org/abs/2512.20144v2)
- **arXiv**: 2512.20144v2
- **Date**: 2025-12-23
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning
- **Abstract**: Retrieval-Augmented Generation (RAG) has emerged as a powerful paradigm for Large Language Models (LLMs) to address knowledge-intensive queries requiring domain-specific or up-to-date information. To handle complex multi-hop questions that are challenging for single-step retrieval, iterative RAG approaches incorporating reinforcement learning have been proposed. However, existing iterative RAG systems typically plan to decompose questions without leveraging information about the available retrie...


### [Exploring Zero-Shot ACSA with Unified Meaning Representation in Chain-of-Thought Prompting](https://arxiv.org/abs/2512.19651v1)
- **arXiv**: 2512.19651v1
- **Date**: 2025-12-22
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Aspect-Category Sentiment Analysis (ACSA) provides granular insights by identifying specific themes within reviews and their associated sentiment. While supervised learning approaches dominate this field, the scarcity and high cost of annotated data for new domains present significant barriers. We argue that leveraging large language models (LLMs) in a zero-shot setting is a practical alternative where resources for data annotation are limited. In this work, we propose a novel Chain-of-Thought (...


### [A Large-Language-Model Framework for Automated Humanitarian Situation Reporting](https://arxiv.org/abs/2512.19475v1)
- **arXiv**: 2512.19475v1
- **Date**: 2025-12-22
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Timely and accurate situational reports are essential for humanitarian decision-making, yet current workflows remain largely manual, resource intensive, and inconsistent. We present a fully automated framework that uses large language models (LLMs) to transform heterogeneous humanitarian documents into structured and evidence-grounded reports. The system integrates semantic text clustering, automatic question generation, retrieval augmented answer extraction with citations, multi-level summariza...


### [AWPO: Enhancing Tool-Use of Large Language Models through Adaptive Integration of Reasoning Rewards](https://arxiv.org/abs/2512.19126v3)
- **arXiv**: 2512.19126v3
- **Date**: 2025-12-22
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: out-of-distribution. Topics: OOD generalization, RL for reasoning
- **Abstract**: While Reinforcement Learning (RL) shows promise in training tool-use Large Language Models (LLMs) using verifiable outcome rewards, existing methods largely overlook the potential of reasoning rewards based on chain-of-thought quality for better tool utilization. Furthermore, naïvely combining reasoning and outcome rewards may yield suboptimal performance or conflict with the primary optimization objective. To address this, we propose Advantage-Weighted Policy Optimization (AWPO), a principled R...


### [Directional Attractors in LLM Reasoning: How Similarity Retrieval Steers Iterative Summarization Based Reasoning](https://arxiv.org/abs/2601.08846v1)
- **arXiv**: 2601.08846v1
- **Date**: 2025-12-22
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Iterative summarization based reasoning frameworks such as InftyThink enable long-horizon reasoning in large language models (LLMs) by controlling context growth, but they repeatedly regenerate similar reasoning strategies across tasks. We introduce InftyThink with Cross-Chain Memory, an extension that augments iterative reasoning with an embedding-based semantic cache of previously successful reasoning patterns. At each reasoning step, the model retrieves and conditions on the most semantically...


### [Remedy-R: Generative Reasoning for Machine Translation Evaluation without Error Annotations](https://arxiv.org/abs/2512.18906v1)
- **arXiv**: 2512.18906v1
- **Date**: 2025-12-21
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: out-of-distribution. Topics: OOD generalization, RL for reasoning
- **Abstract**: Over the years, automatic MT metrics have hillclimbed benchmarks and presented strong and sometimes human-level agreement with human ratings. Yet they remain black-box, offering little insight into their decision-making and often failing under real-world out-of-distribution (OOD) inputs. We introduce Remedy-R, a reasoning-driven generative MT metric trained with reinforcement learning from pairwise translation preferences, without requiring error-span annotations or distillation from closed LLMs...


### [External Hippocampus: Topological Cognitive Maps for Guiding Large Language Model Reasoning](https://arxiv.org/abs/2512.18190v3)
- **arXiv**: 2512.18190v3
- **Date**: 2025-12-20
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: This paper proposes the External Hippocampus framework, which models language model reasoning from a cognitive dynamics perspective as the flow of information energy in semantic space. Unlike traditional weight-space optimization methods, this framework constructs topological cognitive maps through dimensionality reduction projection, enabling precise navigation and intervention of energy flow at test time while avoiding substantial computational requirements and demonstrating predictable interv...


### [Unbiased Visual Reasoning with Controlled Visual Inputs](https://arxiv.org/abs/2512.22183v1)
- **arXiv**: 2512.22183v1
- **Date**: 2025-12-19
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning
- **Abstract**: End-to-end Vision-language Models (VLMs) often answer visual questions by exploiting spurious correlations instead of causal visual evidence, and can become more shortcut-prone when fine-tuned. We introduce VISTA (Visual-Information Separation for Text-based Analysis), a modular framework that decouples perception from reasoning via an explicit information bottleneck. A frozen VLM sensor is restricted to short, objective perception queries, while a text-only LLM reasoner decomposes each question...


### [DEER: A Benchmark for Evaluating Deep Research Agents on Expert Report Generation](https://arxiv.org/abs/2512.17776v2)
- **arXiv**: 2512.17776v2
- **Date**: 2025-12-19
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: As large language models advance, deep research systems capable of generating expert-level reports through multi-step reasoning and evidence-based synthesis are emerging. However, evaluating such reports remains challenging. Existing benchmarks often lack systematic evaluation criteria, rely heavily on LLM-based judges that may miss issues requiring expert judgment, and verify only a limited subset of explicitly cited statements rather than report-wide factual reliability. To address these limit...


### [WRAVAL -- WRiting Assist eVALuation](https://arxiv.org/abs/2601.03268v1)
- **arXiv**: 2601.03268v1
- **Date**: 2025-12-19
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: The emergence of Large Language Models (LLMs) has shifted language model evaluation toward reasoning and problem-solving tasks as measures of general intelligence. Small Language Models (SLMs) -- defined here as models under 10B parameters -- typically score 3-4 times lower than LLMs on these metrics. However, we demonstrate that these evaluations fail to capture SLMs' effectiveness in common industrial applications, such as tone modification tasks (e.g., funny, serious, professional). We propos...


### [Seed-Prover 1.5: Mastering Undergraduate-Level Theorem Proving via Learning from Experience](https://arxiv.org/abs/2512.17260v1)
- **arXiv**: 2512.17260v1
- **Date**: 2025-12-19
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning, Test-time scaling
- **Abstract**: Large language models have recently made significant progress to generate rigorous mathematical proofs. In contrast, utilizing LLMs for theorem proving in formal languages (such as Lean) remains challenging and computationally expensive, particularly when addressing problems at the undergraduate level and beyond. In this work, we present \textbf{Seed-Prover 1.5}, a formal theorem-proving model trained via large-scale agentic reinforcement learning, alongside an efficient test-time scaling (TTS) ...


### [Emergent World Beliefs: Exploring Transformers in Stochastic Games](https://arxiv.org/abs/2512.23722v1)
- **arXiv**: 2512.23722v1
- **Date**: 2025-12-18
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: Emergence claims
- **Abstract**: Transformer-based large language models (LLMs) have demonstrated strong reasoning abilities across diverse fields, from solving programming challenges to competing in strategy-intensive games such as chess. Prior work has shown that LLMs can develop emergent world models in games of perfect information, where internal representations correspond to latent states of the environment. In this paper, we extend this line of investigation to domains of incomplete information, focusing on poker as a can...


### [Generative Adversarial Reasoner: Enhancing LLM Reasoning with Adversarial Reinforcement Learning](https://arxiv.org/abs/2512.16917v2)
- **arXiv**: 2512.16917v2
- **Date**: 2025-12-18
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning
- **Abstract**: Large language models (LLMs) with explicit reasoning capabilities excel at mathematical reasoning yet still commit process errors, such as incorrect calculations, brittle logic, and superficially plausible but invalid steps. In this paper, we introduce Generative Adversarial Reasoner, an on-policy joint training framework designed to enhance reasoning by co-evolving an LLM reasoner and an LLM-based discriminator through adversarial reinforcement learning. A compute-efficient review schedule part...


### [Explaining the Reasoning of Large Language Models Using Attribution Graphs](https://arxiv.org/abs/2512.15663v1)
- **arXiv**: 2512.15663v1
- **Date**: 2025-12-17
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: faithfulness. Topics: CoT faithfulness analysis
- **Abstract**: Large language models (LLMs) exhibit remarkable capabilities, yet their reasoning remains opaque, raising safety and trust concerns. Attribution methods, which assign credit to input features, have proven effective for explaining the decision making of computer vision models. From these, context attributions have emerged as a promising approach for explaining the behavior of autoregressive LLMs. However, current context attributions produce incomplete explanations by directly relating generated ...


### [Well Begun, Half Done: Reinforcement Learning with Prefix Optimization for LLM Reasoning](https://arxiv.org/abs/2512.15274v1)
- **arXiv**: 2512.15274v1
- **Date**: 2025-12-17
- **Stance**: CHALLENGES
- **Why read**: May challenge thesis. Keywords: reasoning capability. Topics: RL for reasoning
- **Abstract**: Reinforcement Learning with Verifiable Rewards (RLVR) significantly enhances the reasoning capability of Large Language Models (LLMs). Current RLVR approaches typically conduct training across all generated tokens, but neglect to explore which tokens (e.g., prefix tokens) actually contribute to reasoning. This uniform training strategy spends substantial effort on optimizing low-return tokens, which in turn impedes the potential improvement from high-return tokens and reduces overall training ef...


### [RFKG-CoT: Relation-Driven Adaptive Hop-count Selection and Few-Shot Path Guidance for Knowledge-Aware QA](https://arxiv.org/abs/2512.15219v1)
- **arXiv**: 2512.15219v1
- **Date**: 2025-12-17
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: CoT faithfulness analysis
- **Abstract**: Large language models (LLMs) often generate hallucinations in knowledge-intensive QA due to parametric knowledge limitations. While existing methods like KG-CoT improve reliability by integrating knowledge graph (KG) paths, they suffer from rigid hop-count selection (solely question-driven) and underutilization of reasoning paths (lack of guidance). To address this, we propose RFKG-CoT: First, it replaces the rigid hop-count selector with a relation-driven adaptive hop-count selector that dynami...


### [Beyond Majority Voting: Towards Fine-grained and More Reliable Reward Signal for Test-Time Reinforcement Learning](https://arxiv.org/abs/2512.15146v2)
- **arXiv**: 2512.15146v2
- **Date**: 2025-12-17
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning, Test-time scaling
- **Abstract**: Test-time reinforcement learning mitigates the reliance on annotated data by using majority voting results as pseudo-labels, emerging as a complementary direction to reinforcement learning with verifiable rewards (RLVR) for improving reasoning ability of large language models (LLMs). However, this voting strategy often induces confirmation bias and suffers from sparse rewards, limiting the overall performance. In this work, we propose subgroup-specific step-wise confidence-weighted pseudo-label ...


### [The Semantic Illusion: Certified Limits of Embedding-Based Hallucination Detection in RAG Systems](https://arxiv.org/abs/2512.15068v2)
- **arXiv**: 2512.15068v2
- **Date**: 2025-12-17
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: CoT faithfulness analysis
- **Abstract**: Retrieval-Augmented Generation (RAG) systems remain susceptible to hallucinations despite grounding in retrieved evidence. While current detection methods leverage embedding similarity and natural language inference (NLI), their reliability in safety-critical settings remains unproven. We apply conformal prediction to RAG hallucination detection, transforming heuristic scores into decision sets with finite-sample coverage guarantees (1-alpha). Using calibration sets of n=600, we demonstrate a fu...


### [DreamPRM-Code: Function-as-Step Process Reward Model with Label Correction for LLM Coding](https://arxiv.org/abs/2512.15000v1)
- **arXiv**: 2512.15000v1
- **Date**: 2025-12-17
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: Test-time scaling
- **Abstract**: Process Reward Models (PRMs) have become essential for improving Large Language Models (LLMs) via test-time scaling, yet their effectiveness in coding remains limited due to the lack of meaningful step decompositions in code and the noise of Monte-Carlo-generated partial labels. We propose DreamPRM-Code, a coding-focused PRM that treats functions as reasoning steps using a Chain-of-Function prompting strategy to induce modular code generation, enabling PRM training and application analogous to m...


### [RecGPT-V2 Technical Report](https://arxiv.org/abs/2512.14503v1)
- **arXiv**: 2512.14503v1
- **Date**: 2025-12-16
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: pattern matching. Topics: RL for reasoning, Pattern matching analysis
- **Abstract**: Large language models (LLMs) have demonstrated remarkable potential in transforming recommender systems from implicit behavioral pattern matching to explicit intent reasoning. While RecGPT-V1 successfully pioneered this paradigm by integrating LLM-based reasoning into user interest mining and item tag prediction, it suffers from four fundamental limitations: (1) computational inefficiency and cognitive redundancy across multiple reasoning routes; (2) insufficient explanation diversity in fixed-t...


### [Ladder Up, Memory Down: Low-Cost Fine-Tuning With Side Nets](https://arxiv.org/abs/2512.14237v1)
- **arXiv**: 2512.14237v1
- **Date**: 2025-12-16
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Fine-tuning large language models (LLMs) is often limited by the memory available on commodity GPUs. Parameter-efficient fine-tuning (PEFT) methods such as QLoRA reduce the number of trainable parameters, yet still incur high memory usage induced by the backward pass in the full model. We revisit Ladder Side Tuning (LST), a rarely explored PEFT technique that adds a lightweight side network, and show that it matches QLoRA's compute scaling slope while cutting peak memory by 50\%. Across differen...


### [Differentiable Evolutionary Reinforcement Learning](https://arxiv.org/abs/2512.13399v1)
- **arXiv**: 2512.13399v1
- **Date**: 2025-12-15
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: out-of-distribution. Topics: OOD generalization, RL for reasoning
- **Abstract**: The design of effective reward functions presents a central and often arduous challenge in reinforcement learning (RL), particularly when developing autonomous agents for complex reasoning tasks. While automated reward optimization approaches exist, they typically rely on derivative-free evolutionary heuristics that treat the reward function as a black box, failing to capture the causal relationship between reward structure and task performance. To bridge this gap, we propose Differentiable Evol...


### [SignRAG: A Retrieval-Augmented System for Scalable Zero-Shot Road Sign Recognition](https://arxiv.org/abs/2512.12885v1)
- **arXiv**: 2512.12885v1
- **Date**: 2025-12-14
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Automated road sign recognition is a critical task for intelligent transportation systems, but traditional deep learning methods struggle with the sheer number of sign classes and the impracticality of creating exhaustive labeled datasets. This paper introduces a novel zero-shot recognition framework that adapts the Retrieval-Augmented Generation (RAG) paradigm to address this challenge. Our method first uses a Vision Language Model (VLM) to generate a textual description of a sign from an input...


### [Reasoning Within the Mind: Dynamic Multimodal Interleaving in Latent Space](https://arxiv.org/abs/2512.12623v2)
- **arXiv**: 2512.12623v2
- **Date**: 2025-12-14
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: Test-time scaling
- **Abstract**: Recent advancements in Multimodal Large Language Models (MLLMs) have significantly enhanced cross-modal understanding and reasoning by incorporating Chain-of-Thought (CoT) reasoning in the semantic space. Building upon this, recent studies extend the CoT mechanism to the visual modality, enabling models to integrate visual information during reasoning through external tools or explicit image generation. However, these methods remain dependent on explicit step-by-step reasoning, unstable percepti...


### [Understanding Syllogistic Reasoning in LLMs from Formal and Natural Language Perspectives](https://arxiv.org/abs/2512.12620v3)
- **arXiv**: 2512.12620v3
- **Date**: 2025-12-14
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: Emergence claims
- **Abstract**: We study syllogistic reasoning in LLMs from the logical and natural language perspectives. In process, we explore fundamental reasoning capabilities of the LLMs and the direction this research is moving forward. To aid in our studies, we use 14 large language models and investigate their syllogistic reasoning capabilities in terms of symbolic inferences as well as natural language understanding. Even though this reasoning mechanism is not a uniform emergent property across LLMs, the perfect symb...


### [Coupled Variational Reinforcement Learning for Language Model General Reasoning](https://arxiv.org/abs/2512.12576v1)
- **arXiv**: 2512.12576v1
- **Date**: 2025-12-14
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning
- **Abstract**: While reinforcement learning have achieved impressive progress in language model reasoning, they are constrained by the requirement for verifiable rewards. Recent verifier-free RL methods address this limitation by utilizing the intrinsic probabilities of LLMs generating reference answers as reward signals. However, these approaches typically sample reasoning traces conditioned only on the question. This design decouples reasoning-trace sampling from answer information, leading to inefficient ex...


### [Journey Before Destination: On the importance of Visual Faithfulness in Slow Thinking](https://arxiv.org/abs/2512.12218v2)
- **arXiv**: 2512.12218v2
- **Date**: 2025-12-13
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: faithfulness, unfaithful. Topics: CoT faithfulness analysis
- **Abstract**: Reasoning-augmented vision language models (VLMs) generate explicit chains of thought that promise greater capability and transparency but also introduce new failure modes: models may reach correct answers via visually unfaithful intermediate steps, or reason faithfully yet fail on the final prediction. Standard evaluations that only measure final-answer accuracy cannot distinguish these behaviors. We introduce the visual faithfulness of reasoning chains as a distinct evaluation dimension, focus...


### [Extending the Context of Pretrained LLMs by Dropping Their Positional Embeddings](https://arxiv.org/abs/2512.12167v1)
- **arXiv**: 2512.12167v1
- **Date**: 2025-12-13
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: Test-time scaling
- **Abstract**: So far, expensive finetuning beyond the pretraining sequence length has been a requirement for effectively extending the context of language models (LM). In this work, we break this key bottleneck by Dropping the Positional Embeddings of LMs after training (DroPE). Our simple method is motivated by three key theoretical and empirical observations. First, positional embeddings (PEs) serve a crucial role during pretraining, providing an important inductive bias that significantly facilitates conve...


### [Mistake Notebook Learning: Batch-Clustered Failures for Training-Free Agent Adaptation](https://arxiv.org/abs/2512.11485v3)
- **arXiv**: 2512.11485v3
- **Date**: 2025-12-12
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: Test-time scaling
- **Abstract**: With the growing adoption of Large Language Model (LLM) agents in persistent, real-world roles, they naturally encounter continuous streams of tasks and inevitable failures. A key limitation, however, is their inability to systematically learn from these mistakes, forcing them to repeat identical errors in similar contexts. Unlike prior training-free methods that primarily store raw instance-level experience or focus on retrieving successful trajectories, we propose Mistake Notebook Learning (MN...


### [When Actions Teach You to Think: Reasoning-Action Synergy via Reinforcement Learning in Conversational Agents](https://arxiv.org/abs/2512.11277v1)
- **arXiv**: 2512.11277v1
- **Date**: 2025-12-12
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning
- **Abstract**: Supervised fine-tuning (SFT) has emerged as one of the most effective ways to improve the performance of large language models (LLMs) in downstream tasks. However, SFT can have difficulty generalizing when the underlying data distribution changes, even when the new data does not fall completely outside the training domain. Recent reasoning-focused models such as o1 and R1 have demonstrated consistent gains over their non-reasoning counterparts, highlighting the importance of reasoning for improv...


### [FutureWeaver: Planning Test-Time Compute for Multi-Agent Systems with Modularized Collaboration](https://arxiv.org/abs/2512.11213v1)
- **arXiv**: 2512.11213v1
- **Date**: 2025-12-12
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: test-time compute. Topics: Test-time scaling
- **Abstract**: Scaling test-time computation improves large language model performance without additional training. Recent work demonstrates that techniques such as repeated sampling, self-verification, and self-reflection can significantly enhance task success by allocating more inference-time compute. However, applying these techniques across multiple agents in a multi-agent system is difficult: there does not exist principled mechanisms to allocate compute to foster collaboration among agents, to extend tes...


### [LabelFusion: Learning to Fuse LLMs and Transformer Classifiers for Robust Text Classification](https://arxiv.org/abs/2512.10793v1)
- **arXiv**: 2512.10793v1
- **Date**: 2025-12-11
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: OOD generalization
- **Abstract**: LabelFusion is a fusion ensemble for text classification that learns to combine a traditional transformer-based classifier (e.g., RoBERTa) with one or more Large Language Models (LLMs such as OpenAI GPT, Google Gemini, or DeepSeek) to deliver accurate and cost-aware predictions across multi-class and multi-label tasks. The package provides a simple high-level interface (AutoFusionClassifier) that trains the full pipeline end-to-end with minimal configuration, and a flexible API for advanced user...


### [OPV: Outcome-based Process Verifier for Efficient Long Chain-of-Thought Verification](https://arxiv.org/abs/2512.10756v1)
- **arXiv**: 2512.10756v1
- **Date**: 2025-12-11
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning
- **Abstract**: Large language models (LLMs) have achieved significant progress in solving complex reasoning tasks by Reinforcement Learning with Verifiable Rewards (RLVR). This advancement is also inseparable from the oversight automated by reliable verifiers. However, current outcome-based verifiers (OVs) are unable to inspect the unreliable intermediate steps in the long reasoning chains of thought (CoTs). Meanwhile, current process-based verifiers (PVs) have difficulties in reliably detecting errors in the ...


### [Confucius Code Agent: Scalable Agent Scaffolding for Real-World Codebases](https://arxiv.org/abs/2512.10398v5)
- **arXiv**: 2512.10398v5
- **Date**: 2025-12-11
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Real-world software engineering tasks require coding agents that can operate over massive repositories, sustain long-horizon sessions, and reliably coordinate complex toolchains at test time. Existing research-grade coding agents offer transparency but struggle when scaled to heavier, production-level workloads, while production-grade systems achieve strong practical performance but provide limited extensibility, interpretability, and controllability. We introduce the Confucius Code Agent (CCA),...


### [KBQA-R1: Reinforcing Large Language Models for Knowledge Base Question Answering](https://arxiv.org/abs/2512.10999v2)
- **arXiv**: 2512.10999v2
- **Date**: 2025-12-10
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning
- **Abstract**: Knowledge Base Question Answering (KBQA) challenges models to bridge the gap between natural language and strict knowledge graph schemas by generating executable logical forms. While Large Language Models (LLMs) have advanced this field, current approaches often struggle with a dichotomy of failure: they either generate hallucinated queries without verifying schema existence or exhibit rigid, template-based reasoning that mimics synthesized traces without true comprehension of the environment. T...


### [CONCUR: A Framework for Continual Constrained and Unconstrained Routing](https://arxiv.org/abs/2512.09386v1)
- **arXiv**: 2512.09386v1
- **Date**: 2025-12-10
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: out-of-distribution. Topics: OOD generalization
- **Abstract**: AI tasks differ in complexity and are best addressed with different computation strategies (e.g., combinations of models and decoding methods). Hence, an effective routing system that maps tasks to the appropriate strategies is crucial. Most prior methods build the routing framework by training a single model across all strategies, which demands full retraining whenever new strategies appear and leads to high overhead. Attempts at such continual routing, however, often face difficulties with gen...


### [Are Hypervectors Enough? Single-Call LLM Reasoning over Knowledge Graphs](https://arxiv.org/abs/2512.09369v1)
- **arXiv**: 2512.09369v1
- **Date**: 2025-12-10
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: CoT faithfulness analysis
- **Abstract**: Recent advances in large language models (LLMs) have enabled strong reasoning over both structured and unstructured knowledge. When grounded on knowledge graphs (KGs), however, prevailing pipelines rely on heavy neural encoders to embed and score symbolic paths or on repeated LLM calls to rank candidates, leading to high latency, GPU cost, and opaque decisions that hinder faithful, scalable deployment. We propose PathHD, a lightweight and encoder-free KG reasoning framework that replaces neural ...


### [ReasonBENCH: Benchmarking the (In)Stability of LLM Reasoning](https://arxiv.org/abs/2512.07795v1)
- **arXiv**: 2512.07795v1
- **Date**: 2025-12-08
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Large language models (LLMs) are increasingly deployed in settings where reasoning, such as multi-step problem solving and chain-of-thought, is essential. Yet, current evaluation practices overwhelmingly report single-run accuracy while ignoring the intrinsic uncertainty that naturally arises from stochastic decoding. This omission creates a blind spot because practitioners cannot reliably assess whether a method's reported performance is stable, reproducible, or cost-consistent. We introduce Re...


### [Leveraging KV Similarity for Online Structured Pruning in LLMs](https://arxiv.org/abs/2512.07090v1)
- **arXiv**: 2512.07090v1
- **Date**: 2025-12-08
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Pruning has emerged as a promising direction for accelerating large language model (LLM) inference, yet existing approaches often suffer from instability because they rely on offline calibration data that may not generalize across inputs. In this work, we introduce Token Filtering, a lightweight online structured pruning technique that makes pruning decisions directly during inference without any calibration data. The key idea is to measure token redundancy via joint key-value similarity and ski...


### [SETUP: Sentence-level English-To-Uniform Meaning Representation Parser](https://arxiv.org/abs/2512.07068v1)
- **arXiv**: 2512.07068v1
- **Date**: 2025-12-08
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Uniform Meaning Representation (UMR) is a novel graph-based semantic representation which captures the core meaning of a text, with flexibility incorporated into the annotation schema such that the breadth of the world's languages can be annotated (including low-resource languages). While UMR shows promise in enabling language documentation, improving low-resource language technologies, and adding interpretability, the downstream applications of UMR can only be fully explored when text-to-UMR pa...


### [ProAgent: Harnessing On-Demand Sensory Contexts for Proactive LLM Agent Systems](https://arxiv.org/abs/2512.06721v1)
- **arXiv**: 2512.06721v1
- **Date**: 2025-12-07
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Large Language Model (LLM) agents are emerging to transform daily life. However, existing LLM agents primarily follow a reactive paradigm, relying on explicit user instructions to initiate services, which increases both physical and cognitive workload. In this paper, we propose ProAgent, the first end-to-end proactive agent system that harnesses massive sensory contexts and LLM reasoning to deliver proactive assistance. ProAgent first employs a proactive-oriented context extraction approach with...


### [Why They Disagree: Decoding Differences in Opinions about AI Risk on the Lex Fridman Podcast](https://arxiv.org/abs/2512.06350v1)
- **arXiv**: 2512.06350v1
- **Date**: 2025-12-06
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: The emergence of transformative technologies often surfaces deep societal divisions, nowhere more evident than in contemporary debates about artificial intelligence (AI). A striking feature of these divisions is that they persist despite shared interests in ensuring that AI benefits humanity and avoiding catastrophic outcomes. This paper analyzes contemporary debates about AI risk, parsing the differences between the "doomer" and "boomer" perspectives into definitional, factual, causal, and mora...


### [ARCANE: A Multi-Agent Framework for Interpretable and Configurable Alignment](https://arxiv.org/abs/2512.06196v1)
- **arXiv**: 2512.06196v1
- **Date**: 2025-12-05
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: faithfulness. Topics: CoT faithfulness analysis, Test-time scaling
- **Abstract**: As agents based on large language models are increasingly deployed to long-horizon tasks, maintaining their alignment with stakeholder preferences becomes critical. Effective alignment in such settings requires reward models that are interpretable so that stakeholders can understand and audit model objectives. Moreover, reward models must be capable of steering agents at interaction time, allowing preference shifts to be incorporated without retraining. We introduce ARCANE, a framework that fram...


### [Zoom in, Click out: Unlocking and Evaluating the Potential of Zooming for GUI Grounding](https://arxiv.org/abs/2512.05941v1)
- **arXiv**: 2512.05941v1
- **Date**: 2025-12-05
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: Test-time scaling
- **Abstract**: Grounding is a fundamental capability for building graphical user interface (GUI) agents. Although existing approaches rely on large-scale bounding box supervision, they still face various challenges, such as cross-platform generalization, complex layout analysis, and fine-grained element localization. In this paper, we investigate zoom as a strong yet underexplored prior for GUI grounding, and propose a training-free method, ZoomClick. By characterizing four key properties of zoom (i.e., pre-zo...


### [Structured Reasoning with Tree-of-Thoughts for Bengali Math Word Problems](https://arxiv.org/abs/2512.05580v1)
- **arXiv**: 2512.05580v1
- **Date**: 2025-12-05
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Mathematical Word Problems (MWPs) are among the most challenging tasks in natural language processing because they require both linguistic understanding and multi-step numerical reasoning. While Chain-of-Thought (CoT) prompting has shown promise, its linear structure often propagates errors, limiting overall effectiveness. To address this limitation, we present the a systematic study of Tree-of-Thought (ToT) reasoning for Bengali MWPs using the SOMADHAN dataset. Owing to computational and token-...


### [Learning from Self Critique and Refinement for Faithful LLM Summarization](https://arxiv.org/abs/2512.05387v2)
- **arXiv**: 2512.05387v2
- **Date**: 2025-12-05
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: faithfulness, test-time compute. Topics: CoT faithfulness analysis, Test-time scaling
- **Abstract**: Large Language Models (LLMs) often suffer from hallucinations: output content that is not grounded in the input context, when performing long-form text generation tasks such as summarization. Prior works have shown that hallucinations can be reduced by iteratively critiquing and refining previously generated outputs using either the same model or a more powerful teacher model as the critique. However, these approaches either require additional test-time compute or assume access to more powerful ...


### [To Think or Not to Think: The Hidden Cost of Meta-Training with Excessive CoT Examples](https://arxiv.org/abs/2512.05318v1)
- **arXiv**: 2512.05318v1
- **Date**: 2025-12-04
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Chain-of-thought (CoT) prompting combined with few-shot in-context learning (ICL) has unlocked significant reasoning capabilities in large language models (LLMs). However, ICL with CoT examples is ineffective on novel tasks when the pre-training knowledge is insufficient. We study this problem in a controlled setting using the CoT-ICL Lab framework, and propose meta-training techniques to learn novel abstract reasoning tasks in-context. Although CoT examples facilitate reasoning, we noticed that...


### [DraCo: Draft as CoT for Text-to-Image Preview and Rare Concept Generation](https://arxiv.org/abs/2512.05112v1)
- **arXiv**: 2512.05112v1
- **Date**: 2025-12-04
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Recent unified multimodal large language models (MLLMs) have shown impressive capabilities, incorporating chain-of-thought (CoT) reasoning for enhanced text-to-image generation. However, existing approaches remain limited, either treating the model merely as a standalone generator or relying on abstract textual planning. To this end, we propose Draft-as-CoT (DraCo), a novel interleaved reasoning paradigm that fully leverages both textual and visual contents in CoT for better planning and verific...


### [Semantic Soft Bootstrapping: Long Context Reasoning in LLMs without Reinforcement Learning](https://arxiv.org/abs/2512.05105v1)
- **arXiv**: 2512.05105v1
- **Date**: 2025-12-04
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning
- **Abstract**: Long context reasoning in large language models (LLMs) has demonstrated enhancement of their cognitive capabilities via chain-of-thought (CoT) inference. Training such models is usually done via reinforcement learning with verifiable rewards (RLVR) in reasoning based problems, like math and programming. However, RLVR is limited by several bottlenecks, such as, lack of dense reward, and inadequate sample efficiency. As a result, it requires significant compute resources in post-training phase. To...


### [STELLA: Guiding Large Language Models for Time Series Forecasting with Semantic Abstractions](https://arxiv.org/abs/2512.04871v1)
- **arXiv**: 2512.04871v1
- **Date**: 2025-12-04
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Recent adaptations of Large Language Models (LLMs) for time series forecasting often fail to effectively enhance information for raw series, leaving LLM reasoning capabilities underutilized. Existing prompting strategies rely on static correlations rather than generative interpretations of dynamic behavior, lacking critical global and instance-specific context. To address this, we propose STELLA (Semantic-Temporal Alignment with Language Abstractions), a framework that systematically mines and i...


### [Are LLMs Truly Multilingual? Exploring Zero-Shot Multilingual Capability of LLMs for Information Retrieval: An Italian Healthcare Use Case](https://arxiv.org/abs/2512.04834v1)
- **arXiv**: 2512.04834v1
- **Date**: 2025-12-04
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: pattern matching. Topics: Pattern matching analysis
- **Abstract**: Large Language Models (LLMs) have become a key topic in AI and NLP, transforming sectors like healthcare, finance, education, and marketing by improving customer service, automating tasks, providing insights, improving diagnostics, and personalizing learning experiences. Information extraction from clinical records is a crucial task in digital healthcare. Although traditional NLP techniques have been used for this in the past, they often fall short due to the complexity, variability of clinical ...


### [EtCon: Edit-then-Consolidate for Reliable Knowledge Editing](https://arxiv.org/abs/2512.04753v1)
- **arXiv**: 2512.04753v1
- **Date**: 2025-12-04
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Knowledge editing aims to update specific facts in large language models (LLMs) without full retraining. Prior efforts sought to tune the knowledge layers of LLMs, proving effective for making selective edits. However, a significant gap exists between their performance in controlled, teacher-forcing evaluations and their real-world effectiveness in lifelong learning scenarios, which greatly limits their practical applicability. This work's empirical analysis reveals two recurring issues associat...


### [On GRPO Collapse in Search-R1: The Lazy Likelihood-Displacement Death Spiral](https://arxiv.org/abs/2512.04220v1)
- **arXiv**: 2512.04220v1
- **Date**: 2025-12-03
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: OOD generalization, RL for reasoning
- **Abstract**: Tool-integrated (TI) reinforcement learning (RL) enables large language models (LLMs) to perform multi-step reasoning by interacting with external tools such as search engines and retrievers. Group Relative Policy Optimization (GRPO), exemplified by the recent Search-R1, offers fast convergence and a value-free formulation that makes it appealing for this setting, yet consistently suffers from training collapse. We identify Lazy Likelihood Displacement (LLD), a systematic reduction or stagnation...


### [Training and Evaluation of Guideline-Based Medical Reasoning in LLMs](https://arxiv.org/abs/2512.03838v1)
- **arXiv**: 2512.03838v1
- **Date**: 2025-12-03
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: out-of-distribution. Topics: CoT faithfulness analysis, OOD generalization
- **Abstract**: Machine learning for early prediction in medicine has recently shown breakthrough performance, however, the focus on improving prediction accuracy has led to a neglect of faithful explanations that are required to gain the trust of medical practitioners. The goal of this paper is to teach LLMs to follow medical consensus guidelines step-by-step in their reasoning and prediction process. Since consensus guidelines are ubiquitous in medicine, instantiations of verbalized medical inference rules to...


### [AR-Med: Automated Relevance Enhancement in Medical Search via LLM-Driven Information Augmentation](https://arxiv.org/abs/2512.03737v1)
- **arXiv**: 2512.03737v1
- **Date**: 2025-12-03
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Accurate and reliable search on online healthcare platforms is critical for user safety and service efficacy. Traditional methods, however, often fail to comprehend complex and nuanced user queries, limiting their effectiveness. Large language models (LLMs) present a promising solution, offering powerful semantic understanding to bridge this gap. Despite their potential, deploying LLMs in this high-stakes domain is fraught with challenges, including factual hallucinations, specialized knowledge ...


### [SPARK: Stepwise Process-Aware Rewards for Reference-Free Reinforcement Learning](https://arxiv.org/abs/2512.03244v1)
- **arXiv**: 2512.03244v1
- **Date**: 2025-12-02
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning
- **Abstract**: Process reward models (PRMs) that provide dense, step-level feedback have shown promise for reinforcement learning, yet their adoption remains limited by the need for expensive step-level annotations or ground truth references. We propose SPARK: a three-stage framework where in the first stage a generator model produces diverse solutions and a verifier model evaluates them using parallel scaling (self-consistency) and sequential scaling (meta-critique). In the second stage, we use these verifica...


### [The Moral Consistency Pipeline: Continuous Ethical Evaluation for Large Language Models](https://arxiv.org/abs/2512.03026v1)
- **arXiv**: 2512.03026v1
- **Date**: 2025-12-02
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: The rapid advancement and adaptability of Large Language Models (LLMs) highlight the need for moral consistency, the capacity to maintain ethically coherent reasoning across varied contexts. Existing alignment frameworks, structured approaches designed to align model behavior with human ethical and social norms, often rely on static datasets and post-hoc evaluations, offering limited insight into how ethical reasoning may evolve across different contexts or temporal scales. This study presents t...


### [Martingale Score: An Unsupervised Metric for Bayesian Rationality in LLM Reasoning](https://arxiv.org/abs/2512.02914v1)
- **arXiv**: 2512.02914v1
- **Date**: 2025-12-02
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Recent advances in reasoning techniques have substantially improved the performance of large language models (LLMs), raising expectations for their ability to provide accurate, truthful, and reliable information. However, emerging evidence suggests that iterative reasoning may foster belief entrenchment and confirmation bias, rather than enhancing truth-seeking behavior. In this study, we propose a systematic evaluation framework for belief entrenchment in LLM reasoning by leveraging the Marting...


### [OptPO: Optimal Rollout Allocation for Test-time Policy Optimization](https://arxiv.org/abs/2512.02882v1)
- **arXiv**: 2512.02882v1
- **Date**: 2025-12-02
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: distribution shift. Topics: Test-time scaling
- **Abstract**: Test-time policy optimization enables large language models (LLMs) to adapt to distribution shifts by leveraging feedback from self-generated rollouts. However, existing methods rely on fixed-budget majority voting to estimate rewards, incurring substantial computational redundancy. We propose Optimal Rollout Allocation for Test-time Policy Optimization (OptPO), a principled framework that adaptively allocates inference budgets. By formulating the voting process as a Bayesian sequential probabil...


### [Think in Parallel, Answer as One: Logit Averaging for Open-Ended Reasoning](https://arxiv.org/abs/2512.02874v1)
- **arXiv**: 2512.02874v1
- **Date**: 2025-12-02
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: Test-time scaling
- **Abstract**: Majority voting has proven effective for close-ended question answering by aggregating parallel reasoning traces. However, it is not directly applicable to open-ended reasoning, such as code generation and web-based deep research, where a "majority" over complete solutions is ill-defined. We introduce ThinkMerge, a training-free, plug-and-play decoding strategy that runs K parallel reasoning traces and averages their next-token logits at synchronization points to produce a single coherent output...


### [Emergent Bayesian Behaviour and Optimal Cue Combination in LLMs](https://arxiv.org/abs/2512.02719v1)
- **arXiv**: 2512.02719v1
- **Date**: 2025-12-02
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: Emergence claims
- **Abstract**: Large language models (LLMs) excel at explicit reasoning, but their implicit computational strategies remain underexplored. Decades of psychophysics research show that humans intuitively process and integrate noisy signals using near-optimal Bayesian strategies in perceptual tasks. We ask whether LLMs exhibit similar behaviour and perform optimal multimodal integration without explicit training or instruction. Adopting the psychophysics paradigm, we infer computational principles of LLMs from sy...


### [An Empirical Survey of Model Merging Algorithms for Social Bias Mitigation](https://arxiv.org/abs/2512.02689v1)
- **arXiv**: 2512.02689v1
- **Date**: 2025-12-02
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Large language models (LLMs) are known to inherit and even amplify societal biases present in their pre-training corpora, threatening fairness and social trust. To address this issue, recent work has explored ``editing'' LLM parameters to mitigate social bias with model merging approaches; however, there is no empirical comparison. In this work, we empirically survey seven algorithms: Linear, Karcher Mean, SLERP, NuSLERP, TIES, DELLA, and Nearswap, applying 13 open weight models in the GPT, LLaM...


### [See, Think, Learn: A Self-Taught Multimodal Reasoner](https://arxiv.org/abs/2512.02456v1)
- **arXiv**: 2512.02456v1
- **Date**: 2025-12-02
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Vision-Language Models (VLMs) have achieved remarkable progress in integrating visual perception with language understanding. However, effective multimodal reasoning requires both accurate perception and robust reasoning, and weakness in either limits the performance of VLMs. Prior efforts to enhance reasoning often depend on high-quality chain-of-thought (CoT) data, obtained via labor-intensive human annotations, costly proprietary models, or self-training methods that overlook perception. To a...


### [LeechHijack: Covert Computational Resource Exploitation in Intelligent Agent Systems](https://arxiv.org/abs/2512.02321v1)
- **arXiv**: 2512.02321v1
- **Date**: 2025-12-02
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Large Language Model (LLM)-based agents have demonstrated remarkable capabilities in reasoning, planning, and tool usage. The recently proposed Model Context Protocol (MCP) has emerged as a unifying framework for integrating external tools into agent systems, enabling a thriving open ecosystem of community-built functionalities. However, the openness and composability that make MCP appealing also introduce a critical yet overlooked security assumption -- implicit trust in third-party tool provid...


### [When Does Verification Pay Off? A Closer Look at LLMs as Solution Verifiers](https://arxiv.org/abs/2512.02304v1)
- **arXiv**: 2512.02304v1
- **Date**: 2025-12-02
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: Test-time scaling
- **Abstract**: Large language models (LLMs) can act as both problem solvers and solution verifiers, with verifiers improving solver performance by selecting high-quality answers from a pool of candidates. However, prior studies of solver-verifier interactions have been limited, focusing mainly on self-verification and rarely examining how verifiers judge outputs from models in their own or in another model family. Modern LLMs also undergo extensive post-training, but its effect on verification remains unclear....


### [The Art of Scaling Test-Time Compute for Large Language Models](https://arxiv.org/abs/2512.02008v1)
- **arXiv**: 2512.02008v1
- **Date**: 2025-12-01
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: test-time compute. Topics: Test-time scaling
- **Abstract**: Test-time scaling (TTS) -- the dynamic allocation of compute during inference -- is a promising direction for improving reasoning in large language models (LLMs). However, a systematic comparison of well-known TTS strategies under identical conditions is missing, and the influence of model type and problem difficulty on performance remains unclear. To address these gaps, we conduct the first large-scale study of TTS, spanning over thirty billion tokens generated using eight open-source LLMs (7B ...


### [From Atomic to Composite: Reinforcement Learning Enables Generalization in Complementary Reasoning](https://arxiv.org/abs/2512.01970v2)
- **arXiv**: 2512.01970v2
- **Date**: 2025-12-01
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: out-of-distribution. Topics: OOD generalization, RL for reasoning
- **Abstract**: The mechanism by which RL contributes to reasoning capabilities-whether it incentivizes the synthesis of new skills or merely amplifies existing behaviors-remains a subject of intense debate. In this work, we investigate this question through the lens of Complementary Reasoning, a complex task that requires integrating internal parametric knowledge with external contextual information. Using a controlled synthetic dataset of human biographies, we strictly decouple this ability into two atomic sk...


### [Rectifying LLM Thought from Lens of Optimization](https://arxiv.org/abs/2512.01925v1)
- **arXiv**: 2512.01925v1
- **Date**: 2025-12-01
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: emergent reasoning. Topics: RL for reasoning, Emergence claims
- **Abstract**: Recent advancements in large language models (LLMs) have been driven by their emergent reasoning capabilities, particularly through long chain-of-thought (CoT) prompting, which enables thorough exploration and deliberation. Despite these advances, long-CoT LLMs often exhibit suboptimal reasoning behaviors, such as overthinking and excessively protracted reasoning chains, which can impair performance. In this paper, we analyze reasoning processes through an optimization lens, framing CoT as a gra...


### [Beyond SFT: Reinforcement Learning for Safer Large Reasoning Models with Better Reasoning Ability](https://arxiv.org/abs/2512.01848v1)
- **arXiv**: 2512.01848v1
- **Date**: 2025-12-01
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning
- **Abstract**: Large reasoning models (LRMs) extend large language models by generating explicit chain-of-thought (CoT) reasoning, significantly improving mathematical and logical problem solving. However, this explicit reasoning process also introduces new safety risks, as unsafe behaviors often emerge within intermediate reasoning trajectories, even when final answers appear harmless. Existing safety alignment approaches primarily rely on supervised fine-tuning (SFT) over safety-oriented long CoT datasets. W...


### [Beware of Reasoning Overconfidence: Pitfalls in the Reasoning Process for Multi-solution Tasks](https://arxiv.org/abs/2512.01725v1)
- **arXiv**: 2512.01725v1
- **Date**: 2025-12-01
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Large Language Models (LLMs) excel in reasoning tasks requiring a single correct answer, but they perform poorly in multi-solution tasks that require generating comprehensive and diverse answers. We attribute this limitation to \textbf{reasoning overconfidence}: a tendency to express undue certainty in an incomplete solution set. To examine the effect, we introduce \textit{MuSoBench}, a benchmark of multi-solution problems. Experiments show that the conventional short chain-of-thought (Short-CoT...


### [Zero-Overhead Introspection for Adaptive Test-Time Compute](https://arxiv.org/abs/2512.01457v4)
- **arXiv**: 2512.01457v4
- **Date**: 2025-12-01
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: test-time compute. Topics: Test-time scaling
- **Abstract**: Large language models excel at reasoning but lack key aspects of introspection, including anticipating their own success and the computation required to achieve it. Humans use real-time introspection to decide how much effort to invest, when to make multiple attempts, when to stop, and when to signal success or failure. Without this, LLMs struggle to make intelligent meta-cognition decisions. Test-time scaling methods like Best-of-N drive up cost and latency by using a fixed budget of samples re...


### [DrawingBench: Evaluating Spatial Reasoning and UI Interaction Capabilities of Large Language Models through Mouse-Based Drawing Tasks](https://arxiv.org/abs/2512.01174v1)
- **arXiv**: 2512.01174v1
- **Date**: 2025-12-01
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: As agentic AI systems increasingly operate autonomously, establishing trust through verifiable evaluation becomes critical. Yet existing benchmarks lack the transparency and auditability needed to assess whether agents behave reliably. We present DrawingBench, a verification framework for evaluating the trustworthiness of agentic LLMs through spatial reasoning tasks that require generating sequences of low-level GUI actions. Unlike opaque evaluations, DrawingBench provides transparent, rule-base...


### [Mode-Conditioning Unlocks Superior Test-Time Scaling](https://arxiv.org/abs/2512.01127v1)
- **arXiv**: 2512.01127v1
- **Date**: 2025-11-30
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: test-time compute. Topics: RL for reasoning, Test-time scaling
- **Abstract**: Parallel sampling promises substantial gains in test-time scaling, but its effectiveness is sharply limited by diversity collapse, where models concentrate on a few modes and repeated samples produce the same mistakes. We propose the mode-conditioning (ModC) framework, which explicitly allocates test-time compute across reasoning modes using either specialist models or mode-specific prefixes. ModC consistently improves scaling across controlled graph-search tasks and large-scale reasoning benchm...


### [Catch Me If You Can: How Smaller Reasoning Models Pretend to Reason with Mathematical Fidelity](https://arxiv.org/abs/2512.00552v1)
- **arXiv**: 2512.00552v1
- **Date**: 2025-11-29
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: pattern matching. Topics: Pattern matching analysis
- **Abstract**: Current evaluation of mathematical reasoning in language models relies primarily on answer accuracy, potentially masking fundamental failures in logical computation. We introduce a diagnostic framework that distinguishes genuine mathematical reasoning from superficial pattern matching through four complementary axes: forward-backward consistency, transitivity coverage, counterfactual sensitivity, and perturbation robustness. Through a case study applying this framework to Qwen3-0.6B on the Menat...


### [G-KV: Decoding-Time KV Cache Eviction with Global Attention](https://arxiv.org/abs/2512.00504v1)
- **arXiv**: 2512.00504v1
- **Date**: 2025-11-29
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning
- **Abstract**: Recent reasoning large language models (LLMs) excel in complex tasks but encounter significant computational and memory challenges due to long sequence lengths. KV cache compression has emerged as an effective approach to greatly enhance the efficiency of reasoning. However, existing methods often focus on prompt compression or token eviction with local attention score, overlooking the long-term importance of tokens. We propose G-KV, a KV cache eviction method that employs a global scoring mecha...


### [SCALE: Selective Resource Allocation for Overcoming Performance Bottlenecks in Mathematical Test-time Scaling](https://arxiv.org/abs/2512.00466v1)
- **arXiv**: 2512.00466v1
- **Date**: 2025-11-29
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: test-time compute. Topics: Test-time scaling
- **Abstract**: Test-time compute scaling has emerged as a powerful paradigm for enhancing mathematical reasoning in large language models (LLMs) by allocating additional computational resources during inference. However, current methods employ uniform resource distribution across all reasoning sub-problems, creating fundamental bottlenecks where challenging sub-problems receive insufficient attention while routine operations consume disproportionate resources. This uniform allocation creates performance bottle...


### [Towards Corpus-Grounded Agentic LLMs for Multilingual Grammatical Analysis](https://arxiv.org/abs/2512.00214v1)
- **arXiv**: 2512.00214v1
- **Date**: 2025-11-28
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Empirical grammar research has become increasingly data-driven, but the systematic analysis of annotated corpora still requires substantial methodological and technical effort. We explore how agentic large language models (LLMs) can streamline this process by reasoning over annotated corpora and producing interpretable, data-grounded answers to linguistic questions. We introduce an agentic framework for corpus-grounded grammatical analysis that integrates concepts such as natural-language task i...


### [ThetaEvolve: Test-time Learning on Open Problems](https://arxiv.org/abs/2511.23473v1)
- **arXiv**: 2511.23473v1
- **Date**: 2025-11-28
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning, Test-time scaling
- **Abstract**: Recent advances in large language models (LLMs) have enabled breakthroughs in mathematical discovery, exemplified by AlphaEvolve, a closed-source system that evolves programs to improve bounds on open problems. However, it relies on ensembles of frontier LLMs to achieve new bounds and is a pure inference system that models cannot internalize the evolving strategies. We introduce ThetaEvolve, an open-source framework that simplifies and extends AlphaEvolve to efficiently scale both in-context lea...


### [Multi-chain Graph Refinement and Selection for Reliable Reasoning in Large Language Models](https://arxiv.org/abs/2511.23136v1)
- **arXiv**: 2511.23136v1
- **Date**: 2025-11-28
- **Stance**: CHALLENGES
- **Why read**: May challenge thesis. Keywords: reasoning capability. Topics: Test-time scaling
- **Abstract**: The complex reasoning ability of Large Language Models (LLMs) poses a critical bottleneck for their practical applications. Test-time expansion methods such as Tree-of-Thought (ToT) and Graph-of-Thought (GoT) enhance reasoning by introducing intermediate reasoning structures, tree search, or graph-based exploration mechanisms. However, their reasoning strategies suffer from limited diversity, redundant search branches, and inadequate integration and error correction across heterogeneous reasonin...


### [DeepSeekMath-V2: Towards Self-Verifiable Mathematical Reasoning](https://arxiv.org/abs/2511.22570v1)
- **arXiv**: 2511.22570v1
- **Date**: 2025-11-27
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: test-time compute. Topics: CoT faithfulness analysis, RL for reasoning, Test-time scaling
- **Abstract**: Large language models have made significant progress in mathematical reasoning, which serves as an important testbed for AI and could impact scientific research if further advanced. By scaling reasoning with reinforcement learning that rewards correct final answers, LLMs have improved from poor performance to saturating quantitative reasoning competitions like AIME and HMMT in one year. However, this approach faces fundamental limitations. Pursuing higher final answer accuracy doesn't address a ...


### [Focused Chain-of-Thought: Efficient LLM Reasoning via Structured Input Information](https://arxiv.org/abs/2511.22176v1)
- **arXiv**: 2511.22176v1
- **Date**: 2025-11-27
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning
- **Abstract**: Recent large language models achieve strong reasoning performance by generating detailed chain-of-thought traces, but this often leads to excessive token use and high inference latency. Existing efficiency approaches typically focus on model-centric interventions, such as reinforcement learning or supervised fine-tuning, to reduce verbosity. In contrast, we propose a training-free, input-centric approach. Inspired by cognitive psychology, we introduce Focused Chain-of-Thought (F-CoT), which sepa...


### [Reinforcement Learning for Latent-Space Thinking in LLMs](https://arxiv.org/abs/2512.11816v1)
- **arXiv**: 2512.11816v1
- **Date**: 2025-11-26
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning
- **Abstract**: Chain-of-Thought (CoT) reasoning typically utilizes the discrete language space for thinking, which is inherently inefficient, as many generated tokens only enforce linguistic rules that are not required for reasoning. To bypass this, latent-space thinking allows models to think using the continuous embedding space. While existing methods for training those models show domain-specific gains, they fail to maintain performance in complex tasks, such as mathematical reasoning. We experimentally dem...


### [Text-to-SQL as Dual-State Reasoning: Integrating Adaptive Context and Progressive Generation](https://arxiv.org/abs/2511.21402v1)
- **arXiv**: 2511.21402v1
- **Date**: 2025-11-26
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: CoT faithfulness analysis
- **Abstract**: Recent divide-and-conquer reasoning approaches, particularly those based on Chain-of-Thought (CoT), have substantially improved the Text-to-SQL capabilities of Large Language Models (LLMs). However, when applied to complex enterprise databases, such methods struggle to maintain coherent reasoning due to limited context capacity, unreliable schema linking, and weak grounding in database semantics. To overcome these issues, we introduce DSR-SQL, a \textbf{D}ual-\textbf{S}tate \textbf{R}easoning fr...


### [Do Reasoning Vision-Language Models Inversely Scale in Test-Time Compute? A Distractor-centric Empirical Analysis](https://arxiv.org/abs/2511.21397v1)
- **arXiv**: 2511.21397v1
- **Date**: 2025-11-26
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: test-time compute. Topics: Test-time scaling
- **Abstract**: How does irrelevant information (i.e., distractors) affect test-time scaling in vision-language models (VLMs)? Prior studies on language models have reported an inverse scaling effect, where textual distractors lead to longer but less effective reasoning. To investigate whether similar phenomena occur in multimodal settings, we introduce Idis (Images with distractors), a visual question-answering dataset that systematically varies distractors along semantic, numerical, and spatial dimensions. Ou...


### [AI Urban Scientist: Multi-Agent Collaborative Automation for Urban Research](https://arxiv.org/abs/2512.07849v2)
- **arXiv**: 2512.07849v2
- **Date**: 2025-11-26
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Urban research aims to understand how cities operate and evolve as complex adaptive systems. With the rapid growth of urban data and analytical methodologies, the central challenge of the field has shifted from data availability to the integration of heterogeneous data into coherent, verifiable urban knowledge through multidisciplinary approaches. Recent advances in AI, particularly the emergence of large language models (LLMs), have enabled the development of AI scientists capable of autonomous...


### [ThreadWeaver: Adaptive Threading for Efficient Parallel Reasoning in Language Models](https://arxiv.org/abs/2512.07843v1)
- **arXiv**: 2512.07843v1
- **Date**: 2025-11-24
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning
- **Abstract**: Scaling inference-time computation has enabled Large Language Models (LLMs) to achieve strong reasoning performance, but inherently sequential decoding leads to substantial latency, especially on complex tasks. Recent work on adaptive parallel reasoning aims to improve inference efficiency by decomposing the problem-solving process into concurrent reasoning threads when beneficial. However, existing methods on realistic tasks are either limited to supervised behavior cloning or exhibit significa...


### [Eliciting Chain-of-Thought in Base LLMs via Gradient-Based Representation Optimization](https://arxiv.org/abs/2511.19131v1)
- **arXiv**: 2511.19131v1
- **Date**: 2025-11-24
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: distribution shift. Topics: OOD generalization
- **Abstract**: Chain-of-Thought (CoT) reasoning is a critical capability for large language models (LLMs), enabling them to tackle com- plex multi-step tasks. While base LLMs, pre-trained on general text corpora, often struggle with reasoning due to a lack of specialized training, recent studies reveal their latent reason- ing potential tied to hidden states. However, existing hidden state manipulation methods, such as linear activation steering, suffer from limitations due to their rigid and unconstrained nat...


### [Towards Efficient LLM-aware Heterogeneous Graph Learning](https://arxiv.org/abs/2511.17923v1)
- **arXiv**: 2511.17923v1
- **Date**: 2025-11-22
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Heterogeneous graphs are widely present in real-world complex networks, where the diversity of node and relation types leads to complex and rich semantics. Efforts for modeling complex relation semantics in heterogeneous graphs are restricted by the limitations of predefined semantic dependencies and the scarcity of supervised signals. The advanced pre-training and fine-tuning paradigm leverages graph structure to provide rich self-supervised signals, but introduces semantic gaps between tasks. ...


### [L2V-CoT: Cross-Modal Transfer of Chain-of-Thought Reasoning via Latent Intervention](https://arxiv.org/abs/2511.17910v1)
- **arXiv**: 2511.17910v1
- **Date**: 2025-11-22
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Recently, Chain-of-Thought (CoT) reasoning has significantly enhanced the capabilities of large language models (LLMs), but Vision-Language Models (VLMs) still struggle with multi-step reasoning tasks due to limited multimodal reasoning data. To bridge this gap, researchers have explored methods to transfer CoT reasoning from LLMs to VLMs. However, existing approaches either need high training costs or require architectural alignment. In this paper, we use Linear Artificial Tomography (LAT) to e...


### [Cognitive BASIC: An In-Model Interpreted Reasoning Language for LLMs](https://arxiv.org/abs/2511.16837v1)
- **arXiv**: 2511.16837v1
- **Date**: 2025-11-20
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Cognitive BASIC is a minimal, BASIC-style prompting language and in-model interpreter that structures large language model (LLM) reasoning into explicit, stepwise execution traces. Inspired by the simplicity of retro BASIC, we repurpose numbered lines and simple commands as an interpretable cognitive control layer. Modern LLMs can reliably simulate such short programs, enabling transparent multi-step reasoning inside the model. A natural-language interpreter file specifies command semantics, mem...


### [SurvAgent: Hierarchical CoT-Enhanced Case Banking and Dichotomy-Based Multi-Agent System for Multimodal Survival Prediction](https://arxiv.org/abs/2511.16635v1)
- **arXiv**: 2511.16635v1
- **Date**: 2025-11-20
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Survival analysis is critical for cancer prognosis and treatment planning, yet existing methods lack the transparency essential for clinical adoption. While recent pathology agents have demonstrated explainability in diagnostic tasks, they face three limitations for survival prediction: inability to integrate multimodal data, ineffective region-of-interest exploration, and failure to leverage experiential learning from historical cases. We introduce SurvAgent, the first hierarchical chain-of-tho...


### [What Really Counts? Examining Step and Token Level Attribution in Multilingual CoT Reasoning](https://arxiv.org/abs/2511.15886v1)
- **arXiv**: 2511.15886v1
- **Date**: 2025-11-19
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: faithfulness. Topics: CoT faithfulness analysis
- **Abstract**: This study investigates the attribution patterns underlying Chain-of-Thought (CoT) reasoning in multilingual LLMs. While prior works demonstrate the role of CoT prompting in improving task performance, there are concerns regarding the faithfulness and interpretability of the generated reasoning chains. To assess these properties across languages, we applied two complementary attribution methods--ContextCite for step-level attribution and Inseq for token-level attribution--to the Qwen2.5 1.5B-Ins...


### [VisPlay: Self-Evolving Vision-Language Models from Images](https://arxiv.org/abs/2511.15661v2)
- **arXiv**: 2511.15661v2
- **Date**: 2025-11-19
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: compositional. Topics: Compositional generalization, RL for reasoning
- **Abstract**: Reinforcement learning (RL) provides a principled framework for improving Vision-Language Models (VLMs) on complex reasoning tasks. However, existing RL approaches often rely on human-annotated labels or task-specific heuristics to define verifiable rewards, both of which are costly and difficult to scale. We introduce VisPlay, a self-evolving RL framework that enables VLMs to autonomously improve their reasoning abilities using large amounts of unlabeled image data. Starting from a single base ...


### [A Reasoning Paradigm for Named Entity Recognition](https://arxiv.org/abs/2511.11978v1)
- **arXiv**: 2511.11978v1
- **Date**: 2025-11-15
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: pattern matching. Topics: Pattern matching analysis
- **Abstract**: Generative LLMs typically improve Named Entity Recognition (NER) performance through instruction tuning. They excel at generating entities by semantic pattern matching but lack an explicit, verifiable reasoning mechanism. This "cognitive shortcutting" leads to suboptimal performance and brittle generalization, especially in zero-shot and lowresource scenarios where reasoning from limited contextual cues is crucial. To address this issue, a reasoning framework is proposed for NER, which shifts th...


### [Expert-Guided Prompting and Retrieval-Augmented Generation for Emergency Medical Service Question Answering](https://arxiv.org/abs/2511.10900v2)
- **arXiv**: 2511.10900v2
- **Date**: 2025-11-14
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Large language models (LLMs) have shown promise in medical question answering, yet they often overlook the domain-specific expertise that professionals depend on, such as the clinical subject areas (e.g., trauma, airway) and the certification level (e.g., EMT, Paramedic). Existing approaches typically apply general-purpose prompting or retrieval strategies without leveraging this structured context, limiting performance in high-stakes settings. We address this gap with EMSQA, an 24.3K-question m...


### [SSR: Socratic Self-Refine for Large Language Model Reasoning](https://arxiv.org/abs/2511.10621v1)
- **arXiv**: 2511.10621v1
- **Date**: 2025-11-13
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: Test-time scaling
- **Abstract**: Large Language Models (LLMs) have demonstrated remarkable reasoning abilities, yet existing test-time frameworks often rely on coarse self-verification and self-correction, limiting their effectiveness on complex tasks. In this paper, we propose Socratic Self-Refine (SSR), a novel framework for fine-grained evaluation and precise refinement of LLM reasoning. Our proposed SSR decomposes model responses into verifiable (sub-question, sub-answer) pairs, enabling step-level confidence estimation thr...


### [Position: On the Methodological Pitfalls of Evaluating Base LLMs for Reasoning](https://arxiv.org/abs/2511.10381v1)
- **arXiv**: 2511.10381v1
- **Date**: 2025-11-13
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: Pattern matching analysis
- **Abstract**: Existing work investigates the reasoning capabilities of large language models (LLMs) to uncover their limitations, human-like biases and underlying processes. Such studies include evaluations of base LLMs (pre-trained on unlabeled corpora only) for this purpose. Our position paper argues that evaluating base LLMs' reasoning capabilities raises inherent methodological concerns that are overlooked in such existing studies. We highlight the fundamental mismatch between base LLMs' pretraining objec...


### [ProgRAG: Hallucination-Resistant Progressive Retrieval and Reasoning over Knowledge Graphs](https://arxiv.org/abs/2511.10240v2)
- **arXiv**: 2511.10240v2
- **Date**: 2025-11-13
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Large Language Models (LLMs) demonstrate strong reasoning capabilities but struggle with hallucinations and limited transparency. Recently, KG-enhanced LLMs that integrate knowledge graphs (KGs) have been shown to improve reasoning performance, particularly for complex, knowledge-intensive tasks. However, these methods still face significant challenges, including inaccurate retrieval and reasoning failures, often exacerbated by long input contexts that obscure relevant information or by context ...


### [PustakAI: Curriculum-Aligned and Interactive Textbooks Using Large Language Models](https://arxiv.org/abs/2511.10002v2)
- **arXiv**: 2511.10002v2
- **Date**: 2025-11-13
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Large Language Models (LLMs) have demonstrated remarkable capabilities in understanding and generating human-like content. This has revolutionized various sectors such as healthcare, software development, and education. In education, LLMs offer potential for personalized and interactive learning experiences, especially in regions with limited teaching resources. However, adapting these models effectively to curriculum-specific content, such as the National Council of Educational Research and Tra...


### [Reasoning: From Reflection to Solution](https://arxiv.org/abs/2511.11712v1)
- **arXiv**: 2511.11712v1
- **Date**: 2025-11-12
- **Stance**: CHALLENGES
- **Why read**: May challenge thesis. Keywords: genuine reasoning. Topics: Pattern matching analysis
- **Abstract**: What is reasoning? This question has driven centuries of philosophical inquiry, from Aristotle's syllogisms to modern computational complexity theory. In the age of large language models achieving superhuman performance on benchmarks like GSM8K (95\% accuracy) and HumanEval (90\% pass@1), we must ask: have these systems learned to \emph{reason}, or have they learned to \emph{pattern-match over reasoning traces}?
  This paper argues for a specific answer: \textbf{reasoning is iterative operator a...


### [mmJEE-Eval: A Bilingual Multimodal Benchmark for Evaluating Scientific Reasoning in Vision-Language Models](https://arxiv.org/abs/2511.09339v1)
- **arXiv**: 2511.09339v1
- **Date**: 2025-11-12
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: Pattern matching analysis
- **Abstract**: Contemporary vision-language models (VLMs) perform well on existing multimodal reasoning benchmarks (78-85\% accuracy on MMMU, MathVista). Yet, these results fail to sufficiently distinguish true scientific reasoning articulation capabilities from pattern-matching. To address this gap, we introduce \textbf{mmJEE-Eval}, a multimodal bilingual (English and Hindi) benchmark comprising 1,460 questions from India's JEE Advanced examination (2019-2025) spanning pre-college Physics, Chemistry, and Math...


### [AI Founding Fathers: A Case Study of GIS Search in Multi-Agent Pipelines](https://arxiv.org/abs/2511.09005v1)
- **arXiv**: 2511.09005v1
- **Date**: 2025-11-12
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Although Large Language Models (LLMs) show exceptional fluency, efforts persist to extract stronger reasoning capabilities from them. Drawing on search-based interpretations of LLM computation, this paper advances a systematic framework for understanding LLM reasoning and optimization. Namely, that enhancing reasoning is best achieved by structuring a multi-agent pipeline to ensure a traversal of the search space in a gradual, incremental, and sequential (GIS) manner. Stated succinctly, high-qua...


### [Equilibrium Dynamics and Mitigation of Gender Bias in Synthetically Generated Data](https://arxiv.org/abs/2511.10689v1)
- **arXiv**: 2511.10689v1
- **Date**: 2025-11-12
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: pattern matching. Topics: Pattern matching analysis
- **Abstract**: Recursive prompting with large language models enables scalable synthetic dataset generation but introduces the risk of bias amplification. We investigate gender bias dynamics across three generations of recursive text generation using three complementary evaluation frameworks: rule-based pattern matching, embedding-based semantic similarity, and downstream task performance. Experiments with three initial bias levels (0.1, 0.3, 0.6) and four mitigation strategies reveal equilibrium dynamics rath...


### [Think-at-Hard: Selective Latent Iterations to Improve Reasoning Language Models](https://arxiv.org/abs/2511.08577v1)
- **arXiv**: 2511.08577v1
- **Date**: 2025-11-11
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Improving reasoning capabilities of Large Language Models (LLMs), especially under parameter constraints, is crucial for real-world applications. Prior work proposes recurrent transformers, which allocate a fixed number of extra iterations per token to improve generation quality. After the first, standard forward pass, instead of verbalization, last-layer hidden states are fed back as inputs for additional iterations to refine token predictions. Yet we identify a latent overthinking phenomenon: ...


### [Investigating CoT Monitorability in Large Reasoning Models](https://arxiv.org/abs/2511.08525v3)
- **arXiv**: 2511.08525v3
- **Date**: 2025-11-11
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: faithfulness. Topics: CoT faithfulness analysis
- **Abstract**: Large Reasoning Models (LRMs) have demonstrated remarkable performance on complex tasks by engaging in extended reasoning before producing final answers. Beyond improving abilities, these detailed reasoning traces also create a new opportunity for AI safety, CoT Monitorability: monitoring potential model misbehavior, such as the use of shortcuts or sycophancy, through their chain-of-thought (CoT) during decision-making. However, two key fundamental challenges arise when attempting to build more ...


### [DPRM: A Dual Implicit Process Reward Model in Multi-Hop Question Answering](https://arxiv.org/abs/2511.08364v2)
- **arXiv**: 2511.08364v2
- **Date**: 2025-11-11
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: In multi-hop question answering (MHQA) tasks, Chain of Thought (CoT) improves the quality of generation by guiding large language models (LLMs) through multi-step reasoning, and Knowledge Graphs (KGs) reduce hallucinations via semantic matching. Outcome Reward Models (ORMs) provide feedback after generating the final answers but fail to evaluate the process for multi-step reasoning. Traditional Process Reward Models (PRMs) evaluate the reasoning process but require costly human annotations or ro...


### [AgentPRM: Process Reward Models for LLM Agents via Step-Wise Promise and Progress](https://arxiv.org/abs/2511.08325v1)
- **arXiv**: 2511.08325v1
- **Date**: 2025-11-11
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: test-time compute. Topics: RL for reasoning, Test-time scaling
- **Abstract**: Despite rapid development, large language models (LLMs) still encounter challenges in multi-turn decision-making tasks (i.e., agent tasks) like web shopping and browser navigation, which require making a sequence of intelligent decisions based on environmental feedback. Previous work for LLM agents typically relies on elaborate prompt engineering or fine-tuning with expert trajectories to improve performance. In this work, we take a different perspective: we explore constructing process reward m...


### [Last Layer Logits to Logic: Empowering LLMs with Logic-Consistent Structured Knowledge Reasoning](https://arxiv.org/abs/2511.07910v1)
- **arXiv**: 2511.07910v1
- **Date**: 2025-11-11
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Large Language Models (LLMs) achieve excellent performance in natural language reasoning tasks through pre-training on vast unstructured text, enabling them to understand the logic in natural language and generate logic-consistent responses. However, the representational differences between unstructured and structured knowledge make LLMs inherently struggle to maintain logic consistency, leading to \textit{Logic Drift} challenges in structured knowledge reasoning tasks such as Knowledge Graph Qu...


### [Think Consistently, Reason Efficiently: Energy-Based Calibration for Implicit Chain-of-Thought](https://arxiv.org/abs/2511.07124v1)
- **arXiv**: 2511.07124v1
- **Date**: 2025-11-10
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Large Language Models (LLMs) have demonstrated strong reasoning capabilities through \emph{Chain-of-Thought} (CoT) prompting, which enables step-by-step intermediate reasoning. However, explicit CoT methods rely on discrete token-level reasoning processes that are prone to error propagation and limited by vocabulary expressiveness, often resulting in rigid and inconsistent reasoning trajectories. Recent research has explored implicit or continuous reasoning in latent spaces, allowing models to p...


### [Explicit Knowledge-Guided In-Context Learning for Early Detection of Alzheimer's Disease](https://arxiv.org/abs/2511.06215v1)
- **arXiv**: 2511.06215v1
- **Date**: 2025-11-09
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: out-of-distribution. Topics: OOD generalization
- **Abstract**: Detecting Alzheimer's Disease (AD) from narrative transcripts remains a challenging task for large language models (LLMs), particularly under out-of-distribution (OOD) and data-scarce conditions. While in-context learning (ICL) provides a parameter-efficient alternative to fine-tuning, existing ICL approaches often suffer from task recognition failure, suboptimal demonstration selection, and misalignment between label words and task objectives, issues that are amplified in clinical domains like ...


### [DRAGON: Guard LLM Unlearning in Context via Negative Detection and Reasoning](https://arxiv.org/abs/2511.05784v2)
- **arXiv**: 2511.05784v2
- **Date**: 2025-11-08
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Unlearning in Large Language Models (LLMs) is crucial for protecting private data and removing harmful knowledge. Most existing approaches rely on fine-tuning to balance unlearning efficiency with general language capabilities. However, these methods typically require training or access to retain data, which is often unavailable in real world scenarios. Although these methods can perform well when both forget and retain data are available, few works have demonstrated equivalent capability in mor...


### [RIDE: Difficulty Evolving Perturbation with Item Response Theory for Mathematical Reasoning](https://arxiv.org/abs/2511.04120v1)
- **arXiv**: 2511.04120v1
- **Date**: 2025-11-06
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: pattern matching. Topics: RL for reasoning, Pattern matching analysis
- **Abstract**: Large language models (LLMs) achieve high performance on mathematical reasoning, but these results can be inflated by training data leakage or superficial pattern matching rather than genuine reasoning. To this end, an adversarial perturbation-based evaluation is needed to measure true mathematical reasoning ability. Current rule-based perturbation methods often generate ill-posed questions and impede the systematic evaluation of question difficulty and the evolution of benchmarks. To bridge thi...


### [Multimodal Reasoning via Latent Refocusing](https://arxiv.org/abs/2511.02360v3)
- **arXiv**: 2511.02360v3
- **Date**: 2025-11-04
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Chain of Thought (CoT) reasoning enhances logical performance by decomposing complex tasks, yet its multimodal extension faces a trade-off. The existing Thinking with Images paradigm is limited by the modality gap between vision and language, which hinders reliable extraction of reasoning relevant information from high dimensional visual data. Recent latent space reasoning method provides stronger multimodal representations, but it often lacks the ability to refocus on visual inputs and suffers ...


### [Multi-Step Knowledge Interaction Analysis via Rank-2 Subspace Disentanglement](https://arxiv.org/abs/2511.01706v1)
- **arXiv**: 2511.01706v1
- **Date**: 2025-11-03
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: CoT faithfulness analysis
- **Abstract**: Natural Language Explanations (NLEs) describe how Large Language Models (LLMs) make decisions, drawing on both external Context Knowledge (CK) and Parametric Knowledge (PK) stored in model weights. Understanding their interaction is key to assessing the grounding of NLEs, yet it remains underexplored. Prior work has largely examined only single-step generation, typically the final answer, and has modelled PK and CK interaction only as a binary choice in a rank-1 subspace. This overlooks richer f...


### [BanglaNirTox: A Large-scale Parallel Corpus for Explainable AI in Bengali Text Detoxification](https://arxiv.org/abs/2511.01512v1)
- **arXiv**: 2511.01512v1
- **Date**: 2025-11-03
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Toxic language in Bengali remains prevalent, especially in online environments, with few effective precautions against it. Although text detoxification has seen progress in high-resource languages, Bengali remains underexplored due to limited resources. In this paper, we propose a novel pipeline for Bengali text detoxification that combines Pareto class-optimized large language models (LLMs) and Chain-of-Thought (CoT) prompting to generate detoxified sentences. To support this effort, we constru...


### [BARD: budget-aware reasoning distillation](https://arxiv.org/abs/2511.01470v2)
- **arXiv**: 2511.01470v2
- **Date**: 2025-11-03
- **Stance**: CHALLENGES
- **Why read**: May challenge thesis. Keywords: reasoning capability. Topics: RL for reasoning
- **Abstract**: While long Chain-of-Thought (CoT) distillation effectively transfers reasoning capability to smaller language models, the reasoning process often remains redundant and computational budget uncontrollable, leading to inefficient resource usage. To address this limitation, we propose \textbf{Budget-Aware Reasoning Distillation (BARD)}, a novel framework that simultaneously distills reasoning capability and enables fine-grained control over the reasoning length. BARD uses the thinking budget as a u...


### [Visual Backdoor Attacks on MLLM Embodied Decision Making via Contrastive Trigger Learning](https://arxiv.org/abs/2510.27623v1)
- **arXiv**: 2510.27623v1
- **Date**: 2025-10-31
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: out-of-distribution. Topics: OOD generalization
- **Abstract**: Multimodal large language models (MLLMs) have advanced embodied agents by enabling direct perception, reasoning, and planning task-oriented actions from visual inputs. However, such vision driven embodied agents open a new attack surface: visual backdoor attacks, where the agent behaves normally until a visual trigger appears in the scene, then persistently executes an attacker-specified multi-step policy. We introduce BEAT, the first framework to inject such visual backdoors into MLLM-based emb...


### [Thought Branches: Interpreting LLM Reasoning Requires Resampling](https://arxiv.org/abs/2510.27484v1)
- **arXiv**: 2510.27484v1
- **Date**: 2025-10-31
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: unfaithful. Topics: CoT faithfulness analysis, OOD generalization
- **Abstract**: Most work interpreting reasoning models studies only a single chain-of-thought (CoT), yet these models define distributions over many possible CoTs. We argue that studying a single sample is inadequate for understanding causal influence and the underlying computation. Though fully specifying this distribution is intractable, it can be understood by sampling. We present case studies using resampling to investigate model decisions. First, when a model states a reason for its action, does that reas...


### [Measuring Chain-of-Thought Monitorability Through Faithfulness and Verbosity](https://arxiv.org/abs/2510.27378v2)
- **arXiv**: 2510.27378v2
- **Date**: 2025-10-31
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: faithfulness, unfaithful. Topics: CoT faithfulness analysis
- **Abstract**: Chain-of-thought (CoT) outputs let us read a model's step-by-step reasoning. Since any long, serial reasoning process must pass through this textual trace, the quality of the CoT is a direct window into what the model is thinking. This visibility could help us spot unsafe or misaligned behavior (monitorability), but only if the CoT is transparent about its internal reasoning (faithfulness). Fully measuring faithfulness is difficult, so researchers often focus on examining the CoT in cases where ...


### [Metis-SPECS: Decoupling Multimodal Learning via Self-distilled Preference-based Cold Start](https://arxiv.org/abs/2510.25801v2)
- **arXiv**: 2510.25801v2
- **Date**: 2025-10-29
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: out-of-distribution. Topics: OOD generalization, RL for reasoning
- **Abstract**: Reinforcement learning (RL) with verifiable rewards has recently catalyzed a wave of "MLLM-r1" approaches that bring RL to vision language models. Most representative paradigms begin with a cold start, typically employing supervised fine-tuning (SFT), to initialize the policy before RL. However, SFT-based cold start adopts the reasoning paradigm intertwined with task solution and output format, which may induce instruction-style overfitting, weakens out-of-distribution generalization, and ultima...


### [CritiCal: Can Critique Help LLM Uncertainty or Confidence Calibration?](https://arxiv.org/abs/2510.24505v1)
- **arXiv**: 2510.24505v1
- **Date**: 2025-10-28
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: out-of-distribution. Topics: OOD generalization
- **Abstract**: Accurate confidence calibration in Large Language Models (LLMs) is critical for safe use in high-stakes domains, where clear verbalized confidence enhances user trust. Traditional methods that mimic reference confidence expressions often fail to capture the reasoning needed for accurate confidence assessment. We propose natural language critiques as a solution, ideally suited for confidence calibration, as precise gold confidence labels are hard to obtain and often require multiple generations. ...


### [Latent Chain-of-Thought for Visual Reasoning](https://arxiv.org/abs/2510.23925v2)
- **arXiv**: 2510.23925v2
- **Date**: 2025-10-27
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: OOD generalization, RL for reasoning
- **Abstract**: Chain-of-thought (CoT) reasoning is critical for improving the interpretability and reliability of Large Vision-Language Models (LVLMs). However, existing training algorithms such as SFT, PPO, and GRPO may not generalize well across unseen reasoning tasks and heavily rely on a biased reward model. To address this challenge, we reformulate reasoning in LVLMs as posterior inference and propose a scalable training algorithm based on amortized variational inference. By leveraging diversity-seeking r...


### [LightKGG: Simple and Efficient Knowledge Graph Generation from Textual Data](https://arxiv.org/abs/2510.23341v1)
- **arXiv**: 2510.23341v1
- **Date**: 2025-10-27
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: Pattern matching analysis
- **Abstract**: The scarcity of high-quality knowledge graphs (KGs) remains a critical bottleneck for downstream AI applications, as existing extraction methods rely heavily on error-prone pattern-matching techniques or resource-intensive large language models (LLMs). While recent tools leverage LLMs to generate KGs, their computational demands limit accessibility for low-resource environments. Our paper introduces LightKGG, a novel framework that enables efficient KG extraction from textual data using small-sc...


### [Mapping Faithful Reasoning in Language Models](https://arxiv.org/abs/2510.22362v1)
- **arXiv**: 2510.22362v1
- **Date**: 2025-10-25
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: faithfulness. Topics: CoT faithfulness analysis
- **Abstract**: Chain-of-thought (CoT) traces promise transparency for reasoning language models, but prior work shows they are not always faithful reflections of internal computation. This raises challenges for oversight: practitioners may misinterpret decorative reasoning as genuine. We introduce Concept Walk, a general framework for tracing how a model's internal stance evolves with respect to a concept direction during reasoning. Unlike surface text, Concept Walk operates in activation space, projecting eac...


### [RETuning: Upgrading Inference-Time Scaling for Stock Movement Prediction with Large Language Models](https://arxiv.org/abs/2510.21604v1)
- **arXiv**: 2510.21604v1
- **Date**: 2025-10-24
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: out-of-distribution. Topics: OOD generalization, RL for reasoning
- **Abstract**: Recently, large language models (LLMs) have demonstrated outstanding reasoning capabilities on mathematical and coding tasks. However, their application to financial tasks-especially the most fundamental task of stock movement prediction-remains underexplored. We study a three-class classification problem (up, hold, down) and, by analyzing existing reasoning responses, observe that: (1) LLMs follow analysts' opinions rather than exhibit a systematic, independent analytical logic (CoTs). (2) LLMs...


### [GeoThought: A Dataset for Enhancing Mathematical Geometry Reasoning in Vision-Language Models](https://arxiv.org/abs/2510.21881v1)
- **arXiv**: 2510.21881v1
- **Date**: 2025-10-23
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Large language models (LLMs) have demonstrated strong reasoning capabilities in text-based mathematical problem solving; however, when adapted to visual reasoning tasks, particularly geometric problem solving, their performance substantially declines because geometric problems present unique challenges. Specifically, these challenges stem from two key factors: first, the intrinsic complexity of geometry requiring detailed image comprehension and multi-step reasoning, and second, the limitations ...


### [The Dog the Cat Chased Stumped the Model: Measuring When Language Models Abandon Structure for Shortcuts](https://arxiv.org/abs/2510.20543v2)
- **arXiv**: 2510.20543v2
- **Date**: 2025-10-23
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: pattern matching. Topics: Pattern matching analysis
- **Abstract**: When language models correctly parse "The cat that the dog chased meowed," are they analyzing syntax or simply familiar with dogs chasing cats? Despite extensive benchmarking, we lack methods to distinguish structural understanding from semantic pattern matching. We introduce CenterBench, a dataset of 9,720 comprehension questions on center-embedded sentences (like "The cat [that the dog chased] meowed") where relative clauses nest recursively, creating processing demands from simple to deeply n...


### [Enhancing Reasoning Skills in Small Persian Medical Language Models Can Outperform Large-Scale Data Training](https://arxiv.org/abs/2510.20059v5)
- **arXiv**: 2510.20059v5
- **Date**: 2025-10-22
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning
- **Abstract**: Enhancing reasoning capabilities in small language models is critical for specialized applications such as medical question answering, particularly in underrepresented languages like Persian. In this study, we employ Reinforcement Learning with AI Feedback (RLAIF) and Direct preference optimization (DPO) to improve the reasoning skills of a general-purpose Persian language model. To achieve this, we translated a multiple-choice medical question-answering dataset into Persian and used RLAIF to ge...


### [The Zero-Step Thinking: An Empirical Study of Mode Selection as Harder Early Exit in Reasoning Models](https://arxiv.org/abs/2510.19176v1)
- **arXiv**: 2510.19176v1
- **Date**: 2025-10-22
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Reasoning models have demonstrated exceptional performance in tasks such as mathematics and logical reasoning, primarily due to their ability to engage in step-by-step thinking during the reasoning process. However, this often leads to overthinking, resulting in unnecessary computational overhead. To address this issue, Mode Selection aims to automatically decide between Long-CoT (Chain-of-Thought) or Short-CoT by utilizing either a Thinking or NoThinking mode. Simultaneously, Early Exit determi...


### [Chain-of-Conceptual-Thought Elicits Daily Conversation in Large Language Models](https://arxiv.org/abs/2510.18434v3)
- **arXiv**: 2510.18434v3
- **Date**: 2025-10-21
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Chain-of-Thought (CoT) is widely applied to enhance the LLM capability in math, coding and reasoning tasks. However, its performance is limited for open-domain tasks, when there are no clearly defined reasoning steps or logical transitions. To mitigate such challenges, we propose a new prompt-based paradigm called Chain of Conceptual Thoughts (CoCT), which suggests the LLM first to produce the tag of concepts, then complete the detailed content following the concept. To encourage this hierarchic...


### [Can LLMs Correct Themselves? A Benchmark of Self-Correction in LLMs](https://arxiv.org/abs/2510.16062v2)
- **arXiv**: 2510.16062v2
- **Date**: 2025-10-17
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Self-correction of large language models (LLMs) emerges as a critical component for enhancing their reasoning performance. Although various self-correction methods have been proposed, a comprehensive evaluation of these methods remains largely unexplored, and the question of whether LLMs can truly correct themselves is a matter of significant interest and concern. In this study, we introduce CorrectBench, a benchmark developed to evaluate the effectiveness of self-correction strategies, includin...


### [HugAgent: Benchmarking LLMs for Simulation of Individualized Human Reasoning](https://arxiv.org/abs/2510.15144v3)
- **arXiv**: 2510.15144v3
- **Date**: 2025-10-16
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: out-of-distribution. Topics: OOD generalization
- **Abstract**: Simulating human reasoning in open-ended tasks has long been a central aspiration in AI and cognitive science. While large language models now approximate human responses at scale, they remain tuned to population-level consensus, often erasing the individuality of reasoning styles and belief trajectories. To advance the vision of more human-like reasoning in machines, we introduce HugAgent (Human-Grounded Agent Benchmark), which rethinks human reasoning simulation along three dimensions: (i) fro...


### [Internalizing World Models via Self-Play Finetuning for Agentic RL](https://arxiv.org/abs/2510.15047v1)
- **arXiv**: 2510.15047v1
- **Date**: 2025-10-16
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: out-of-distribution. Topics: OOD generalization, RL for reasoning
- **Abstract**: Large Language Models (LLMs) as agents often struggle in out-of-distribution (OOD) scenarios. Real-world environments are complex and dynamic, governed by task-specific rules and stochasticity, which makes it difficult for LLMs to ground their internal knowledge in those dynamics. Under such OOD conditions, vanilla RL training often fails to scale; we observe Pass@k--the probability that at least one of (k) sampled trajectories succeeds--drops markedly across training steps, indicating brittle e...


### [Assessing LLM Reasoning Through Implicit Causal Chain Discovery in Climate Discourse](https://arxiv.org/abs/2510.13417v1)
- **arXiv**: 2510.13417v1
- **Date**: 2025-10-15
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: pattern matching. Topics: Pattern matching analysis
- **Abstract**: How does a cause lead to an effect, and which intermediate causal steps explain their connection? This work scrutinizes the mechanistic causal reasoning capabilities of large language models (LLMs) to answer these questions through the task of implicit causal chain discovery. In a diagnostic evaluation framework, we instruct nine LLMs to generate all possible intermediate causal steps linking given cause-effect pairs in causal chain structures. These pairs are drawn from recent resources in argu...


### [Beyond Correctness: Rewarding Faithful Reasoning in Retrieval-Augmented Generation](https://arxiv.org/abs/2510.13272v1)
- **arXiv**: 2510.13272v1
- **Date**: 2025-10-15
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: faithfulness, unfaithful. Topics: CoT faithfulness analysis, RL for reasoning
- **Abstract**: Inspired by the success of reinforcement learning (RL) in Large Language Model (LLM) training for domains like math and code, recent works have begun exploring how to train LLMs to use search engines more effectively as tools for retrieval-augmented generation. Although these methods achieve performance improvement across QA benchmarks, many prioritize final answer correctness while overlooking the quality of intermediate reasoning steps, which may lead to chain-of-thought unfaithfulness. In thi...


### [CoT-Evo: Evolutionary Distillation of Chain-of-Thought for Scientific Reasoning](https://arxiv.org/abs/2510.13166v2)
- **arXiv**: 2510.13166v2
- **Date**: 2025-10-15
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: While chain-of-thought (CoT) distillation from advanced large language models (LLMs) has proven effective in general reasoning tasks, it struggles in scientific domains where even advanced models often produce incorrect or superficial reasoning due to high complexity and specialized knowledge requirements. Directly distilling from such flawed outputs results in low-quality training data and limits the performance of smaller student models. To overcome this, we propose CoT-Evo, an evolutionary Co...


### [On the Reasoning Abilities of Masked Diffusion Language Models](https://arxiv.org/abs/2510.13117v1)
- **arXiv**: 2510.13117v1
- **Date**: 2025-10-15
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: OOD generalization
- **Abstract**: Masked diffusion models (MDMs) for text offer a compelling alternative to traditional autoregressive language models. Parallel generation makes them efficient, but their computational capabilities and the limitations inherent to their parallelism remain largely unexplored. To this end, we characterize what types of reasoning problems MDMs can provably solve and how efficiently. We do this by connecting MDMs to the well-understood reasoning frameworks of chain of thought (CoT) and padded looped t...


### [Can GRPO Help LLMs Transcend Their Pretraining Origin?](https://arxiv.org/abs/2510.15990v1)
- **arXiv**: 2510.15990v1
- **Date**: 2025-10-14
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: out-of-distribution, compositional. Topics: Compositional generalization, OOD generalization, RL for reasoning
- **Abstract**: Reinforcement Learning with Verifiable Rewards (RLVR), primarily driven by the Group Relative Policy Optimization (GRPO) algorithm, is a leading approach for enhancing the reasoning abilities of Large Language Models (LLMs). Despite its wide adoption, GRPO's gains are often inconsistent; for instance, a model may show significant improvement in one reasoning domain, like mathematics, yet remain stagnant in another, such as medicine. This inconsistency raises a critical question: under what condi...


### [Enhancing Long Chain-of-Thought Reasoning through Multi-Path Plan Aggregation](https://arxiv.org/abs/2510.11620v2)
- **arXiv**: 2510.11620v2
- **Date**: 2025-10-13
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: RL for reasoning
- **Abstract**: Inference-time scaling enhances the reasoning ability of a language model (LM) by extending its chain-of-thought (CoT). However, existing approaches typically generate the entire reasoning chain in a single forward pass, which often leads to CoT derailment, i.e., the reasoning trajectory drifting off course due to compounding errors. This problem is particularly severe for smaller LMs with long CoTs due to their limited capacity. To address this, we analyze raw long CoTs and uncover a reasoning ...


### [Evaluating Reasoning Faithfulness in Medical Vision-Language Models using Multimodal Perturbations](https://arxiv.org/abs/2510.11196v2)
- **arXiv**: 2510.11196v2
- **Date**: 2025-10-13
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: faithfulness. Topics: CoT faithfulness analysis
- **Abstract**: Vision-language models (VLMs) often produce chain-of-thought (CoT) explanations that sound plausible yet fail to reflect the underlying decision process, undermining trust in high-stakes clinical use. Existing evaluations rarely catch this misalignment, prioritizing answer accuracy or adherence to formats. We present a clinically grounded framework for chest X-ray visual question answering (VQA) that probes CoT faithfulness via controlled text and image modifications across three axes: clinical ...


### [Revisiting the UID Hypothesis in LLM Reasoning Traces](https://arxiv.org/abs/2510.13850v1)
- **arXiv**: 2510.13850v1
- **Date**: 2025-10-11
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: unfaithful. Topics: CoT faithfulness analysis
- **Abstract**: Large language models (LLMs) often solve problems using step-by-step Chain-of-Thought (CoT) reasoning, yet these intermediate steps are frequently unfaithful or hard to interpret. Inspired by the Uniform Information Density (UID) hypothesis in psycholinguistics -- which posits that humans communicate by maintaining a stable flow of information -- we introduce entropy-based metrics to analyze the information flow within reasoning traces. Surprisingly, across three challenging mathematical benchma...


### [Audit-of-Understanding: Posterior-Constrained Inference for Mathematical Reasoning in Language Models](https://arxiv.org/abs/2510.10252v2)
- **arXiv**: 2510.10252v2
- **Date**: 2025-10-11
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: faithfulness. Topics: CoT faithfulness analysis
- **Abstract**: Large language models (LLMs) often generate reasoning traces that appear coherent but rest on unsupported assumptions, leading to hallucinated conclusions. Prior work mainly addresses factual hallucinations or relies on post-hoc verification, leaving reasoning-induced hallucinations largely unaddressed. We propose Audit-of-Understanding (AoU), a framework that constrains inference to validated premises through three phases: (1) decomposing a query into candidate assumptions, (2) auditing their s...


### [A Comprehensive Evaluation of Multilingual Chain-of-Thought Reasoning: Performance, Consistency, and Faithfulness Across Languages](https://arxiv.org/abs/2510.09555v1)
- **arXiv**: 2510.09555v1
- **Date**: 2025-10-10
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: faithfulness. Topics: CoT faithfulness analysis
- **Abstract**: Large reasoning models (LRMs) increasingly rely on step-by-step Chain-of-Thought (CoT) reasoning to improve task performance, particularly in high-resource languages such as English. While recent work has examined final-answer accuracy in multilingual settings, the thinking traces themselves, i.e., the intermediate steps that lead to the final answer, remain underexplored. In this paper, we present the first comprehensive study of multilingual CoT reasoning, evaluating three key dimensions: perf...


### [Verifying Chain-of-Thought Reasoning via Its Computational Graph](https://arxiv.org/abs/2510.09312v1)
- **arXiv**: 2510.09312v1
- **Date**: 2025-10-10
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Current Chain-of-Thought (CoT) verification methods predict reasoning correctness based on outputs (black-box) or activations (gray-box), but offer limited insight into why a computation fails. We introduce a white-box method: Circuit-based Reasoning Verification (CRV). We hypothesize that attribution graphs of correct CoT steps, viewed as execution traces of the model's latent reasoning circuits, possess distinct structural fingerprints from those of incorrect steps. By training a classifier on...


### [ReFIne: A Framework for Trustworthy Large Reasoning Models with Reliability, Faithfulness, and Interpretability](https://arxiv.org/abs/2510.09062v1)
- **arXiv**: 2510.09062v1
- **Date**: 2025-10-10
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: faithfulness. Topics: CoT faithfulness analysis
- **Abstract**: Recent advances in long chain-of-thought (CoT) reasoning have largely prioritized answer accuracy and token efficiency, while overlooking aspects critical to trustworthiness. We argue that usable reasoning systems must be trustworthy, characterized by three properties: interpretability, faithfulness, and reliability. To this end, we propose ReFIne, a new training framework that integrates supervised fine-tuning with GRPO to encourage models to: (i) improve interpretability by producing structure...


### [Benchmarking LLM Causal Reasoning with Scientifically Validated Relationships](https://arxiv.org/abs/2510.07231v2)
- **arXiv**: 2510.07231v2
- **Date**: 2025-10-08
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: pattern matching. Topics: Pattern matching analysis
- **Abstract**: Causal reasoning is fundamental for Large Language Models (LLMs) to understand genuine cause-and-effect relationships beyond pattern matching. Existing benchmarks suffer from critical limitations such as reliance on synthetic data and narrow domain coverage. We introduce a novel benchmark constructed from casually identified relationships extracted from top-tier economics and finance journals, drawing on rigorous methodologies including instrumental variables, difference-in-differences, and regr...


### [Thinking on the Fly: Test-Time Reasoning Enhancement via Latent Thought Policy Optimization](https://arxiv.org/abs/2510.04182v3)
- **arXiv**: 2510.04182v3
- **Date**: 2025-10-05
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: out-of-distribution. Topics: OOD generalization, Test-time scaling
- **Abstract**: Recent advancements in Large Language Models (LLMs) have shifted from explicit Chain-of-Thought (CoT) reasoning to more efficient latent reasoning, where intermediate thoughts are represented as vectors rather than text. However, latent reasoning can be brittle on challenging, out-of-distribution tasks where robust reasoning is most critical. To overcome these limitations, we introduce Latent Thought Policy Optimization (LTPO), a parameter-free framework that enhances LLM reasoning entirely at t...


### [Exploring Chain-of-Thought Reasoning for Steerable Pluralistic Alignment](https://arxiv.org/abs/2510.04045v1)
- **arXiv**: 2510.04045v1
- **Date**: 2025-10-05
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: faithfulness. Topics: CoT faithfulness analysis, RL for reasoning
- **Abstract**: Large Language Models (LLMs) are typically trained to reflect a relatively uniform set of values, which limits their applicability to tasks that require understanding of nuanced human perspectives. Recent research has underscored the importance of enabling LLMs to support steerable pluralism -- the capacity to adopt a specific perspective and align generated outputs with it. In this work, we investigate whether Chain-of-Thought (CoT) reasoning techniques can be applied to building steerable plur...


### [Unlocking Reasoning Capabilities in LLMs via Reinforcement Learning Exploration](https://arxiv.org/abs/2510.03865v2)
- **arXiv**: 2510.03865v2
- **Date**: 2025-10-04
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: out-of-distribution. Topics: OOD generalization, RL for reasoning
- **Abstract**: Reinforcement learning with verifiable rewards (RLVR) has recently enhanced the reasoning capabilities of large language models (LLMs), particularly for mathematical problem solving. However, a fundamental limitation remains: as the sampling budget increases, the advantage of RLVR-trained models over their pretrained bases often diminishes or even vanishes, revealing a strong dependence on the base model's restricted search space. We attribute this phenomenon to the widespread use of the reverse...


### [How to Train Your Advisor: Steering Black-Box LLMs with Advisor Models](https://arxiv.org/abs/2510.02453v1)
- **arXiv**: 2510.02453v1
- **Date**: 2025-10-02
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: out-of-distribution. Topics: OOD generalization, RL for reasoning
- **Abstract**: Foundation models are increasingly deployed as black-box services, where model weights cannot be modified and customization is limited to prompting. While static prompt optimization has shown promise, it produces a single fixed prompt that fails to adapt to different inputs, users, or environments. We introduce Advisor Models, lightweight parametric policies trained with reinforcement learning to reactively issue natural language steering instructions in-context to black-box models. The advisor ...


### [More Than One Teacher: Adaptive Multi-Guidance Policy Optimization for Diverse Exploration](https://arxiv.org/abs/2510.02227v2)
- **arXiv**: 2510.02227v2
- **Date**: 2025-10-02
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: out-of-distribution. Topics: OOD generalization, RL for reasoning
- **Abstract**: Reinforcement Learning with Verifiable Rewards (RLVR) is a promising paradigm for enhancing the reasoning ability in Large Language Models (LLMs). However, prevailing methods primarily rely on self-exploration or a single off-policy teacher to elicit long chain-of-thought (LongCoT) reasoning, which may introduce intrinsic model biases and restrict exploration, ultimately limiting reasoning diversity and performance. Drawing inspiration from multi-teacher strategies in knowledge distillation, we ...


### [Think Right: Learning to Mitigate Under-Over Thinking via Adaptive, Attentive Compression](https://arxiv.org/abs/2510.01581v1)
- **arXiv**: 2510.01581v1
- **Date**: 2025-10-02
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: out-of-distribution, test-time compute. Topics: OOD generalization, RL for reasoning, Test-time scaling
- **Abstract**: Recent thinking models solve complex reasoning tasks by scaling test-time compute, but this scaling must be allocated in line with task difficulty. On one hand, short reasoning (underthinking) leads to errors on harder problems that require extended reasoning steps; but, excessively long reasoning (overthinking) can be token-inefficient, generating unnecessary steps even after reaching a correct intermediate solution. We refer to this as under-adaptivity, where the model fails to modulate its re...


### [GRAD: Generative Retrieval-Aligned Demonstration Sampler for Efficient Few-Shot Reasoning](https://arxiv.org/abs/2510.01165v1)
- **arXiv**: 2510.01165v1
- **Date**: 2025-10-01
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: out-of-distribution. Topics: OOD generalization
- **Abstract**: Large Language Models (LLMs) achieve strong performance across diverse tasks, but their effectiveness often depends on the quality of the provided context. Retrieval-Augmented Generation (RAG) enriches prompts with external information, but its reliance on static databases constrains adaptability and can result in irrelevant demonstrations. In this work, we propose a Generative Retrieval-Aligned Demonstrator (GRAD), a dynamic demonstration-based approach where an LLM model is trained to generate...


### [Unspoken Hints: Accuracy Without Acknowledgement in LLM Reasoning](https://arxiv.org/abs/2509.26041v2)
- **arXiv**: 2509.26041v2
- **Date**: 2025-09-30
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: faithfulness. Topics: CoT faithfulness analysis
- **Abstract**: Large language models (LLMs) increasingly rely on chain-of-thought (CoT) prompting to solve mathematical and logical reasoning tasks. Yet, a central question remains: to what extent are these generated rationales \emph{faithful} to the underlying computations, rather than post-hoc narratives shaped by hints that function as answer shortcuts embedded in the prompt? Following prior work on hinted vs.\ unhinted prompting, we present a systematic study of CoT faithfulness under controlled hint manip...


### [NePTune: A Neuro-Pythonic Framework for Tunable Compositional Reasoning on Vision-Language](https://arxiv.org/abs/2509.25757v1)
- **arXiv**: 2509.25757v1
- **Date**: 2025-09-30
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: compositional. Topics: Compositional generalization
- **Abstract**: Modern Vision-Language Models (VLMs) have achieved impressive performance in various tasks, yet they often struggle with compositional reasoning, the ability to decompose and recombine concepts to solve novel problems. While neuro-symbolic approaches offer a promising direction, they are typically constrained by crisp logical execution or predefined predicates, which limit flexibility. In this work, we introduce NePTune, a neuro-symbolic framework that overcomes these limitations through a hybri...


### [TimeOmni-1: Incentivizing Complex Reasoning with Time Series in Large Language Models](https://arxiv.org/abs/2509.24803v1)
- **arXiv**: 2509.24803v1
- **Date**: 2025-09-29
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: out-of-distribution. Topics: OOD generalization
- **Abstract**: Recent advances in multimodal time series learning underscore a paradigm shift from analytics centered on basic patterns toward advanced time series understanding and reasoning. However, existing multimodal time series datasets mostly remain at the level of surface alignment and question answering, without reaching the depth of genuine reasoning. The absence of well-defined tasks that genuinely require time series reasoning, along with the scarcity of high-quality data, has limited progress in b...


### [Seeing Symbols, Missing Cultures: Probing Vision-Language Models' Reasoning on Fire Imagery and Cultural Meaning](https://arxiv.org/abs/2509.23311v2)
- **arXiv**: 2509.23311v2
- **Date**: 2025-09-27
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: pattern matching. Topics: Pattern matching analysis
- **Abstract**: Vision-Language Models (VLMs) often appear culturally competent but rely on superficial pattern matching rather than genuine cultural understanding. We introduce a diagnostic framework to probe VLM reasoning on fire-themed cultural imagery through both classification and explanation analysis. Testing multiple models on Western festivals, non-Western traditions, and emergency scenes reveals systematic biases: models correctly identify prominent Western festivals but struggle with underrepresented...


### [Causally-Enhanced Reinforcement Policy Optimization](https://arxiv.org/abs/2509.23095v1)
- **arXiv**: 2509.23095v1
- **Date**: 2025-09-27
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: unfaithful. Topics: CoT faithfulness analysis
- **Abstract**: Large language models (LLMs) trained with reinforcement objectives often achieve superficially correct answers via shortcut strategies, pairing correct outputs with spurious or unfaithful reasoning and degrading under small causal perturbations. We introduce Causally-Enhanced Policy Optimization (CE-PO), a drop-in reward-shaping framework that augments policy optimization with a differentiable proxy for causal coherence along the generation pathway from prompt (Z) to rationale (X) to answer (Y)....


### [From Evidence to Trajectory: Abductive Reasoning Path Synthesis for Training Retrieval-Augmented Generation Agents](https://arxiv.org/abs/2509.23071v1)
- **arXiv**: 2509.23071v1
- **Date**: 2025-09-27
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: CoT faithfulness analysis, RL for reasoning
- **Abstract**: Retrieval-augmented generation agents development is hindered by the lack of process-level supervision to effectively guide agentic capabilities like task decomposition, retriever invocation, and stepwise decision-making. While reinforcement learning offers a potential solution, it suffers from sparse rewards and the limited reasoning capabilities of large language models (LLMs). Meanwhile, existing data synthesis methods only produce chain-of-thought rationales and fail to model environmental i...


### [SciReasoner: Laying the Scientific Reasoning Ground Across Disciplines](https://arxiv.org/abs/2509.21320v3)
- **arXiv**: 2509.21320v3
- **Date**: 2025-09-25
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: CoT faithfulness analysis, RL for reasoning
- **Abstract**: We present a scientific reasoning foundation model that aligns natural language with heterogeneous scientific representations. The model is pretrained on a 206B-token corpus spanning scientific text, pure sequences, and sequence-text pairs, then aligned via SFT on 40M instructions, annealed cold-start bootstrapping to elicit long-form chain-of-thought, and reinforcement learning with task-specific reward shaping, which instills deliberate scientific reasoning. It supports four capability familie...


### [RL Grokking Recipe: How Does RL Unlock and Transfer New Algorithms in LLMs?](https://arxiv.org/abs/2509.21016v2)
- **arXiv**: 2509.21016v2
- **Date**: 2025-09-25
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: out-of-distribution, compositional. Topics: Compositional generalization, OOD generalization, RL for reasoning
- **Abstract**: It remains an open question whether LLMs can acquire or generalize genuinely new reasoning strategies, beyond the sharpened skills encoded in their parameters during pre-training or post-training. To attempt to answer this debate, we introduce DELTA-Code -- Distributional Evaluation of Learnability and Transferrability in Algorithmic Coding -- a controlled benchmark of synthetic coding problem families designed to probe two fundamental aspects: learnability -- can LLMs, through reinforcement lea...


### [Exploiting Tree Structure for Credit Assignment in RL Training of LLMs](https://arxiv.org/abs/2509.18314v2)
- **arXiv**: 2509.18314v2
- **Date**: 2025-09-22
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: out-of-distribution. Topics: OOD generalization, RL for reasoning
- **Abstract**: Reinforcement learning improves LLM reasoning, yet sparse delayed reward over long sequences makes token-level credit assignment the key bottleneck. We study the verifiable-reward setting, where the final answer is checkable and multiple responses can be drawn per prompt. Reasoning tasks in math and medical QA align with this setup, where only a few decision tokens significantly impact the outcome. PPO offers token-level advantages with a learned value model, but it is complex to train both the ...


### [Latent Traits and Cross-Task Transfer: Deconstructing Dataset Interactions in LLM Fine-tuning](https://arxiv.org/abs/2509.13624v2)
- **arXiv**: 2509.13624v2
- **Date**: 2025-09-17
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: out-of-distribution. Topics: OOD generalization
- **Abstract**: Large language models are increasingly deployed across diverse applications. This often includes tasks LLMs have not encountered during training. This implies that enumerating and obtaining the high-quality training data for all tasks is infeasible. Thus, we often need to rely on transfer learning using datasets with different characteristics, and anticipate out-of-distribution requests. Motivated by this practical need, we propose an analysis framework, building a transfer learning matrix and d...


### [No Answer Needed: Predicting LLM Answer Accuracy from Question-Only Linear Probes](https://arxiv.org/abs/2509.10625v1)
- **arXiv**: 2509.10625v1
- **Date**: 2025-09-12
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: out-of-distribution. Topics: OOD generalization
- **Abstract**: Do large language models (LLMs) anticipate when they will answer correctly? To study this, we extract activations after a question is read but before any tokens are generated, and train linear probes to predict whether the model's forthcoming answer will be correct. Across three open-source model families ranging from 7 to 70 billion parameters, projections on this "in-advance correctness direction" trained on generic trivia questions predict success in distribution and on diverse out-of-distrib...


### [MachineLearningLM: Scaling Many-shot In-context Learning via Continued Pretraining](https://arxiv.org/abs/2509.06806v5)
- **arXiv**: 2509.06806v5
- **Date**: 2025-09-08
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: out-of-distribution. Topics: OOD generalization
- **Abstract**: Large language models (LLMs) possess broad world knowledge and strong general-purpose reasoning ability, yet they struggle to learn from many in-context examples on standard machine learning (ML) tasks, that is, to leverage many-shot demonstrations purely via in-context learning (ICL) without gradient descent. We introduce MachineLearningLM, a portable continued-pretraining framework that equips a general-purpose LLM with robust in-context ML capability while preserving its general knowledge and...


### [Mitigating Spurious Correlations Between Question and Answer via Chain-of-Thought Correctness Perception Distillation](https://arxiv.org/abs/2509.05602v2)
- **arXiv**: 2509.05602v2
- **Date**: 2025-09-06
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: out-of-distribution, faithfulness. Topics: CoT faithfulness analysis, OOD generalization
- **Abstract**: Large language models (LLMs) excel at reasoning tasks but are expensive to deploy. Thus small language models (SLMs) are fine-tuned on CoT data generated by LLMs to copy LLMs' abilities. However, these CoT data may include noisy rationales that either fail to substantiate the answers or contribute no additional information to support answer prediction, which leads SLMs to capture spurious correlations between questions and answers and compromise the quality of reasoning. In this work, we propose...


### [Towards a Unified View of Large Language Model Post-Training](https://arxiv.org/abs/2509.04419v2)
- **arXiv**: 2509.04419v2
- **Date**: 2025-09-04
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: out-of-distribution. Topics: OOD generalization, RL for reasoning
- **Abstract**: Two major sources of training data exist for post-training modern language models: online (model-generated rollouts) data, and offline (human or other-model demonstrations) data. These two types of data are typically used by approaches like Reinforcement Learning (RL) and Supervised Fine-Tuning (SFT), respectively. In this paper, we show that these approaches are not in contradiction, but are instances of a single optimization process. We derive a Unified Policy Gradient Estimator, and present t...


### [CausalARC: Abstract Reasoning with Causal World Models](https://arxiv.org/abs/2509.03636v2)
- **arXiv**: 2509.03636v2
- **Date**: 2025-09-03
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: distribution shift, out-of-distribution. Topics: OOD generalization, Test-time scaling
- **Abstract**: On-the-fly reasoning often requires adaptation to novel problems under limited data and distribution shift. This work introduces CausalARC: an experimental testbed for AI reasoning in low-data and out-of-distribution regimes, modeled after the Abstraction and Reasoning Corpus (ARC). Each CausalARC reasoning task is sampled from a fully specified causal world model, formally expressed as a structural causal model. Principled data augmentations provide observational, interventional, and counterfac...


### [Privacy-Preserving Reasoning with Knowledge-Distilled Parametric Retrieval Augmented Generation](https://arxiv.org/abs/2509.01088v2)
- **arXiv**: 2509.01088v2
- **Date**: 2025-09-01
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: out-of-distribution. Topics: OOD generalization
- **Abstract**: The current RAG system requires uploading plaintext documents to the cloud, risking private data leakage. Parametric RAG (PRAG) encodes documents as LoRA parameters within LLMs, offering a possible way to reduce exposure of raw content. However, it still faces two issues: (1) PRAG demands synthesizing QA pairs and fine-tuning LLM for each individual document to create its corresponding LoRA, leading to unacceptable inference latency. (2) The performance of PRAG relies solely on synthetic QA data...


### [The Gold Medals in an Empty Room: Diagnosing Metalinguistic Reasoning in LLMs with Camlang](https://arxiv.org/abs/2509.00425v1)
- **arXiv**: 2509.00425v1
- **Date**: 2025-08-30
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: pattern matching. Topics: Pattern matching analysis
- **Abstract**: Large Language Models (LLMs) achieve gold-medal performance across many benchmarks, yet it remains unclear whether such success reflects genuine reasoning or pattern matching. From a cognitive science perspective, an informative test is whether models can master an unfamiliar language through explicit metalinguistic deductive learning, a paradigm where human learners can reliably internalise grammatical systems through metalinguistic reasoning. We address this question with Camlang, a novel cons...


### [Analysing Chain of Thought Dynamics: Active Guidance or Unfaithful Post-hoc Rationalisation?](https://arxiv.org/abs/2508.19827v1)
- **arXiv**: 2508.19827v1
- **Date**: 2025-08-27
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: faithfulness, unfaithful. Topics: CoT faithfulness analysis
- **Abstract**: Recent work has demonstrated that Chain-of-Thought (CoT) often yields limited gains for soft-reasoning problems such as analytical and commonsense reasoning. CoT can also be unfaithful to a model's actual reasoning. We investigate the dynamics and faithfulness of CoT in soft-reasoning tasks across instruction-tuned, reasoning and reasoning-distilled models. Our findings reveal differences in how these models rely on CoT, and show that CoT influence and faithfulness are not always aligned.


### [Learning to Refine: Self-Refinement of Parallel Reasoning in LLMs](https://arxiv.org/abs/2509.00084v1)
- **arXiv**: 2509.00084v1
- **Date**: 2025-08-27
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: out-of-distribution. Topics: OOD generalization, Test-time scaling
- **Abstract**: To further enhance the ability of Large Language Models (LLMs) to solve complex, multi-step reasoning problems, test-time scaling (TTS) methods have gained widespread attention. Existing approaches such as Best-of-N and majority voting are limited as their performance depends on the quality of candidate responses, making them unable to produce a correct solution when all candidates are incorrect. Introducing an additional model to select the best response also incurs significant deployment costs...


### [ThinkDial: An Open Recipe for Controlling Reasoning Effort in Large Language Models](https://arxiv.org/abs/2508.18773v1)
- **arXiv**: 2508.18773v1
- **Date**: 2025-08-26
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: out-of-distribution. Topics: OOD generalization, RL for reasoning
- **Abstract**: Large language models (LLMs) with chain-of-thought reasoning have demonstrated remarkable problem-solving capabilities, but controlling their computational effort remains a significant challenge for practical deployment. Recent proprietary systems like OpenAI's gpt-oss series have introduced discrete operational modes for intuitive reasoning control, but the open-source community has largely failed to achieve such capabilities. In this paper, we introduce ThinkDial, the first open-recipe end-to-...


### [Being Kind Isn't Always Being Safe: Diagnosing Affective Hallucination in LLMs](https://arxiv.org/abs/2508.16921v2)
- **arXiv**: 2508.16921v2
- **Date**: 2025-08-23
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Large Language Models (LLMs) are increasingly engaged in emotionally vulnerable conversations that extend beyond information seeking to moments of personal distress. As they adopt affective tones and simulate empathy, they risk creating the illusion of genuine relational connection. We term this phenomenon Affective Hallucination, referring to emotionally immersive responses that evoke false social presence despite the model's lack of affective capacity. To address this, we introduce AHaBench, a...


### [End-to-End Agentic RAG System Training for Traceable Diagnostic Reasoning](https://arxiv.org/abs/2508.15746v1)
- **arXiv**: 2508.15746v1
- **Date**: 2025-08-21
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: out-of-distribution. Topics: OOD generalization, RL for reasoning
- **Abstract**: Accurate diagnosis with medical large language models is hindered by knowledge gaps and hallucinations. Retrieval and tool-augmented methods help, but their impact is limited by weak use of external knowledge and poor feedback-reasoning traceability. To address these challenges, We introduce Deep-DxSearch, an agentic RAG system trained end-to-end with reinforcement learning (RL) that enables steer tracebale retrieval-augmented reasoning for medical diagnosis. In Deep-DxSearch, we first construct...


### [DiagECG: An LLM-Driven Framework for Diagnostic Reasoning via Discretized ECG Tokenization](https://arxiv.org/abs/2508.15338v1)
- **arXiv**: 2508.15338v1
- **Date**: 2025-08-21
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: out-of-distribution. Topics: OOD generalization
- **Abstract**: Electrocardiography plays a central role in cardiovascular diagnostics, yet existing automated approaches often struggle to generalize across clinical tasks and offer limited support for open-ended reasoning. We present DiagECG, a novel framework that integrates time-series and language modeling by enabling large language models to process 12-lead ECG signals for clinical text generation tasks. Our approach discretizes continuous ECG embeddings into symbolic tokens using a lead-independent encod...


### [Structured Prompting and Multi-Agent Knowledge Distillation for Traffic Video Interpretation and Risk Inference](https://arxiv.org/abs/2508.13439v1)
- **arXiv**: 2508.13439v1
- **Date**: 2025-08-19
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: CoT faithfulness analysis
- **Abstract**: Comprehensive highway scene understanding and robust traffic risk inference are vital for advancing Intelligent Transportation Systems (ITS) and autonomous driving. Traditional approaches often struggle with scalability and generalization, particularly under the complex and dynamic conditions of real-world environments. To address these challenges, we introduce a novel structured prompting and knowledge distillation framework that enables automatic generation of high-quality traffic scene annota...


### [ToxiFrench: Benchmarking and Enhancing Language Models via CoT Fine-Tuning for French Toxicity Detection](https://arxiv.org/abs/2508.11281v2)
- **arXiv**: 2508.11281v2
- **Date**: 2025-08-15
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: faithfulness. Topics: CoT faithfulness analysis
- **Abstract**: Detecting toxic content using language models is crucial yet challenging. While substantial progress has been made in English, toxicity detection in French remains underdeveloped, primarily due to the lack of culturally relevant, human-annotated, large-scale datasets. In this work, we release ToxiFrench, a dataset of 53,622 French online comments together with a balanced benchmark split for systematic evaluation. The dataset is constructed via a semi-automated annotation pipeline that reduces ma...


### [Can Multi-modal (reasoning) LLMs detect document manipulation?](https://arxiv.org/abs/2508.11021v1)
- **arXiv**: 2508.11021v1
- **Date**: 2025-08-14
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: out-of-distribution. Topics: OOD generalization
- **Abstract**: Document fraud poses a significant threat to industries reliant on secure and verifiable documentation, necessitating robust detection mechanisms. This study investigates the efficacy of state-of-the-art multi-modal large language models (LLMs)-including OpenAI O1, OpenAI 4o, Gemini Flash (thinking), Deepseek Janus, Grok, Llama 3.2 and 4, Qwen 2 and 2.5 VL, Mistral Pixtral, and Claude 3.5 and 3.7 Sonnet-in detecting fraudulent documents. We benchmark these models against each other and prior wor...


### [AMFT: Aligning LLM Reasoners by Meta-Learning the Optimal Imitation-Exploration Balance](https://arxiv.org/abs/2508.06944v3)
- **arXiv**: 2508.06944v3
- **Date**: 2025-08-09
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: out-of-distribution. Topics: OOD generalization, RL for reasoning
- **Abstract**: Large Language Models (LLMs) are typically fine-tuned for reasoning tasks through a two-stage pipeline of Supervised Fine-Tuning (SFT) followed by Reinforcement Learning (RL), a process fraught with catastrophic forgetting and suboptimal trade-offs between imitation and exploration. Recent single-stage methods attempt to unify SFT and RL using heuristics, but lack a principled mechanism for dynamically balancing the two paradigms. In this paper, we reframe this challenge through the theoretical ...


### [Temporal Self-Rewarding Language Models: Decoupling Chosen-Rejected via Past-Future](https://arxiv.org/abs/2508.06026v1)
- **arXiv**: 2508.06026v1
- **Date**: 2025-08-08
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: out-of-distribution. Topics: OOD generalization
- **Abstract**: Self-Rewarding Language Models propose an architecture in which the Large Language Models(LLMs) both generates responses and evaluates its own outputs via LLM-as-a-Judge prompting, dynamically improving its generative capabilities through iterative Direct Preference Optimization (DPO). However, our analysis reveals a critical limitation in existing Self-Rewarding paradigms: the synchronized improvement of chosen and rejected responses progressively narrows the representational difference between...


### [AttriLens-Mol: Attribute Guided Reinforcement Learning for Molecular Property Prediction with Large Language Models](https://arxiv.org/abs/2508.04748v3)
- **arXiv**: 2508.04748v3
- **Date**: 2025-08-06
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: out-of-distribution. Topics: OOD generalization, RL for reasoning
- **Abstract**: Large Language Models (LLMs) have shown promise in assisting molecular property prediction tasks but often rely on human-crafted prompts and chain-of-thought templates. While recent advanced large reasoning models like DeepSeek-R1 employ reinforcement learning for an extended ``thinking'' process, their reasoning can be verbose and lack relevance. We introduce AttriLens-Mol, an attribute-guided reinforcement learning framework for molecular property prediction with LLMs. AttriLens-Mol steers the...


### [Unveiling Over-Memorization in Finetuning LLMs for Reasoning Tasks](https://arxiv.org/abs/2508.04117v2)
- **arXiv**: 2508.04117v2
- **Date**: 2025-08-06
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: out-of-distribution. Topics: OOD generalization
- **Abstract**: The pretrained large language models (LLMs) are finetuned with labeled data for better instruction following ability and alignment with human values. In this paper, we study the learning dynamics of LLM finetuning on reasoning tasks and reveal the uncovered over-memorization phenomenon during a specific stage of LLM finetuning. At this stage, the LLMs have excessively memorized training data and exhibit high test perplexity while maintaining good test accuracy. We explore the conditions that con...


### [Thinking with Nothinking Calibration: A New In-Context Learning Paradigm in Reasoning Large Language Models](https://arxiv.org/abs/2508.03363v4)
- **arXiv**: 2508.03363v4
- **Date**: 2025-08-05
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: out-of-distribution. Topics: OOD generalization
- **Abstract**: Reasoning large language models (RLLMs) have recently demonstrated remarkable capabilities through structured and multi-step reasoning. While prior research has primarily focused on improving their training and inference strategies, their potential for in-context learning (ICL) remains largely underexplored. To fill this gap, we propose Thinking with Nothinking Calibration (JointThinking), a new ICL paradigm that prompts the model to generate two answers in parallel: one in Thinking mode and the...


### [Proof2Hybrid: Automatic Mathematical Benchmark Synthesis for Proof-Centric Problems](https://arxiv.org/abs/2508.02208v2)
- **arXiv**: 2508.02208v2
- **Date**: 2025-08-04
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: pattern matching. Topics: Pattern matching analysis
- **Abstract**: Evaluating the mathematical capability of Large Language Models (LLMs) is a critical yet challenging frontier. Existing benchmarks fall short, particularly for proof-centric problems, as manual creation is unscalable and costly, leaving the true mathematical abilities of LLMs largely unassessed. To overcome these barriers, we propose Proof2Hybrid, the first fully automated framework that synthesizes high-quality, proof-centric benchmarks from natural language mathematical corpora. The key novelt...


### [RL-PLUS: Countering Capability Boundary Collapse of LLMs in Reinforcement Learning with Hybrid-policy Optimization](https://arxiv.org/abs/2508.00222v4)
- **arXiv**: 2508.00222v4
- **Date**: 2025-07-31
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: out-of-distribution. Topics: OOD generalization, RL for reasoning
- **Abstract**: Reinforcement Learning with Verifiable Reward (RLVR) has significantly advanced the complex reasoning abilities of Large Language Models (LLMs). However, it struggles to break through the inherent capability boundaries of the base LLM, due to its essentially on-policy strategy coupled with LLM's immense action space and sparse reward. Critically, RLVR can lead to the capability boundary collapse, narrowing the LLM's problem-solving scope. To address this problem, we propose RL-PLUS, a novel hybr...


### [UnsafeChain: Enhancing Reasoning Model Safety via Hard Cases](https://arxiv.org/abs/2507.21652v2)
- **arXiv**: 2507.21652v2
- **Date**: 2025-07-29
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: out-of-distribution. Topics: OOD generalization
- **Abstract**: As large reasoning models (LRMs) grow more capable, chain-of-thought (CoT) reasoning introduces new safety challenges. Existing SFT-based safety alignment studies dominantly focused on filtering prompts with safe, high-quality responses, while overlooking hard prompts that always elicit harmful outputs. To fill this gap, we introduce UnsafeChain, a safety alignment dataset constructed from hard prompts with diverse sources, where unsafe completions are identified and explicitly corrected into sa...


### [How does Chain of Thought Think? Mechanistic Interpretability of Chain-of-Thought Reasoning with Sparse Autoencoding](https://arxiv.org/abs/2507.22928v1)
- **arXiv**: 2507.22928v1
- **Date**: 2025-07-24
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: faithfulness. Topics: CoT faithfulness analysis
- **Abstract**: Chain-of-thought (CoT) prompting boosts Large Language Models accuracy on multi-step tasks, yet whether the generated "thoughts" reflect the true internal reasoning process is unresolved. We present the first feature-level causal study of CoT faithfulness. Combining sparse autoencoders with activation patching, we extract monosemantic features from Pythia-70M and Pythia-2.8B while they tackle GSM8K math problems under CoT and plain (noCoT) prompting. Swapping a small set of CoT-reasoning feature...


### [Small LLMs Do Not Learn a Generalizable Theory of Mind via Reinforcement Learning](https://arxiv.org/abs/2507.15788v1)
- **arXiv**: 2507.15788v1
- **Date**: 2025-07-21
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: out-of-distribution. Topics: OOD generalization, RL for reasoning, Emergence claims
- **Abstract**: Recent advancements in large language models (LLMs) have demonstrated emergent capabilities in complex reasoning, largely spurred by rule-based Reinforcement Learning (RL) techniques applied during the post-training. This has raised the question of whether similar methods can instill more nuanced, human-like social intelligence, such as a Theory of Mind (ToM), in LLMs. This paper investigates whether small-scale LLMs can acquire a robust and generalizable ToM capability through RL with verifiabl...


### [Why Braking? Scenario Extraction and Reasoning Utilizing LLM](https://arxiv.org/abs/2507.15874v1)
- **arXiv**: 2507.15874v1
- **Date**: 2025-07-17
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: out-of-distribution. Topics: OOD generalization
- **Abstract**: The growing number of ADAS-equipped vehicles has led to a dramatic increase in driving data, yet most of them capture routine driving behavior. Identifying and understanding safety-critical corner cases within this vast dataset remains a significant challenge. Braking events are particularly indicative of potentially hazardous situations, motivating the central question of our research: Why does a vehicle brake? Existing approaches primarily rely on rule-based heuristics to retrieve target scena...


### [Can We Predict Alignment Before Models Finish Thinking? Towards Monitoring Misaligned Reasoning Models](https://arxiv.org/abs/2507.12428v2)
- **arXiv**: 2507.12428v2
- **Date**: 2025-07-16
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: unfaithful. Topics: CoT faithfulness analysis
- **Abstract**: Reasoning language models improve performance on complex tasks by generating long chains of thought (CoTs), but this process can also increase harmful outputs in adversarial settings. In this work, we ask whether the long CoTs can be leveraged for predictive safety monitoring: do the reasoning traces provide early signals of final response alignment that could enable timely intervention? We evaluate a range of monitoring methods using either CoT text or activations, including highly capable larg...


### [DyG-RAG: Dynamic Graph Retrieval-Augmented Generation with Event-Centric Reasoning](https://arxiv.org/abs/2507.13396v1)
- **arXiv**: 2507.13396v1
- **Date**: 2025-07-16
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: CoT faithfulness analysis
- **Abstract**: Graph Retrieval-Augmented Generation has emerged as a powerful paradigm for grounding large language models with external structured knowledge. However, existing Graph RAG methods struggle with temporal reasoning, due to their inability to model the evolving structure and order of real-world events. In this work, we introduce DyG-RAG, a novel event-centric dynamic graph retrieval-augmented generation framework designed to capture and reason over temporal knowledge embedded in unstructured text. ...


### [A Code Comprehension Benchmark for Large Language Models for Code](https://arxiv.org/abs/2507.10641v1)
- **arXiv**: 2507.10641v1
- **Date**: 2025-07-14
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: pattern matching. Topics: Pattern matching analysis
- **Abstract**: Large Language Models have shown impressive capabilities in coding tasks like code generation and code completion, as they have been trained on a large amount of code data. Also, since one of the core pretraining objectives is Next Token Prediction, these models tends to learn surface-level syntactic patterns in code. However, this does not guarantee code comprehension ability i.e. the ability to capture the semantics of the code. In our opinion, this is the reason why these models often underpe...


### [Simple Mechanistic Explanations for Out-Of-Context Reasoning](https://arxiv.org/abs/2507.08218v2)
- **arXiv**: 2507.08218v2
- **Date**: 2025-07-10
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: out-of-distribution. Topics: OOD generalization
- **Abstract**: Out-of-context reasoning (OOCR) is a phenomenon in which fine-tuned LLMs exhibit surprisingly deep out-of-distribution generalization. Rather than learning shallow heuristics, they implicitly internalize and act on the consequences of observations scattered throughout the fine-tuning data. In this work, we investigate this phenomenon mechanistically and find that many instances of OOCR in the literature have a simple explanation: the LoRA fine-tuning essentially adds a constant steering vector, ...


### [When Chain of Thought is Necessary, Language Models Struggle to Evade Monitors](https://arxiv.org/abs/2507.05246v1)
- **arXiv**: 2507.05246v1
- **Date**: 2025-07-07
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: faithfulness, unfaithful. Topics: CoT faithfulness analysis
- **Abstract**: While chain-of-thought (CoT) monitoring is an appealing AI safety defense, recent work on "unfaithfulness" has cast doubt on its reliability. These findings highlight an important failure mode, particularly when CoT acts as a post-hoc rationalization in applications like auditing for bias. However, for the distinct problem of runtime monitoring to prevent severe harm, we argue the key property is not faithfulness but monitorability. To this end, we introduce a conceptual framework distinguishing...


### [OMEGA: Can LLMs Reason Outside the Box in Math? Evaluating Exploratory, Compositional, and Transformative Generalization](https://arxiv.org/abs/2506.18880v1)
- **arXiv**: 2506.18880v1
- **Date**: 2025-06-23
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: out-of-distribution, compositional. Topics: Compositional generalization, OOD generalization
- **Abstract**: Recent large-scale language models (LLMs) with long Chain-of-Thought reasoning-such as DeepSeek-R1-have achieved impressive results on Olympiad-level mathematics benchmarks. However, they often rely on a narrow set of strategies and struggle with problems that require a novel way of thinking. To systematically investigate these limitations, we introduce OMEGA-Out-of-distribution Math Problems Evaluation with 3 Generalization Axes-a controlled yet diverse benchmark designed to evaluate three axes...


### [A Comment On "The Illusion of Thinking": Reframing the Reasoning Cliff as an Agentic Gap](https://arxiv.org/abs/2506.18957v1)
- **arXiv**: 2506.18957v1
- **Date**: 2025-06-23
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: The recent work by Shojaee et al. (2025), titled The Illusion of Thinking: Understanding the Strengths and Limitations of Reasoning Models via the Lens of Problem Complexity, presents a compelling empirical finding, a reasoning cliff, where the performance of Large Reasoning Models (LRMs) collapses beyond a specific complexity threshold, which the authors posit as an intrinsic scaling limitation of Chain-of-Thought (CoT) reasoning. This commentary, while acknowledging the study's methodological ...


### [From Prompts to Constructs: A Dual-Validity Framework for LLM Research in Psychology](https://arxiv.org/abs/2506.16697v1)
- **arXiv**: 2506.16697v1
- **Date**: 2025-06-20
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: pattern matching. Topics: Pattern matching analysis
- **Abstract**: Large language models (LLMs) are rapidly being adopted across psychology, serving as research tools, experimental subjects, human simulators, and computational models of cognition. However, the application of human measurement tools to these systems can produce contradictory results, raising concerns that many findings are measurement phantoms--statistical artifacts rather than genuine psychological phenomena. In this Perspective, we argue that building a robust science of AI psychology requires...


### [Revisiting Compositional Generalization Capability of Large Language Models Considering Instruction Following Ability](https://arxiv.org/abs/2506.15629v1)
- **arXiv**: 2506.15629v1
- **Date**: 2025-06-18
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: compositional. Topics: Compositional generalization
- **Abstract**: In generative commonsense reasoning tasks such as CommonGen, generative large language models (LLMs) compose sentences that include all given concepts. However, when focusing on instruction-following capabilities, if a prompt specifies a concept order, LLMs must generate sentences that adhere to the specified order. To address this, we propose Ordered CommonGen, a benchmark designed to evaluate the compositional generalization and instruction-following abilities of LLMs. This benchmark measures ...


### [Position: Pause Recycling LoRAs and Prioritize Mechanisms to Uncover Limits and Effectiveness](https://arxiv.org/abs/2506.13479v1)
- **arXiv**: 2506.13479v1
- **Date**: 2025-06-16
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: pattern matching, compositional. Topics: Compositional generalization, Pattern matching analysis
- **Abstract**: Merging or routing low-rank adapters (LoRAs) has emerged as a popular solution for enhancing large language models, particularly when data access is restricted by regulatory or domain-specific constraints. This position paper argues that the research community should shift its focus from developing new merging or routing algorithms to understanding the conditions under which reusing LoRAs is truly effective. Through theoretical analysis and synthetic two-hop reasoning and math word-problem tasks...


### [Atomic-to-Compositional Generalization for Mobile Agents with A New Benchmark and Scheduling System](https://arxiv.org/abs/2506.08972v1)
- **arXiv**: 2506.08972v1
- **Date**: 2025-06-10
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: compositional. Topics: Compositional generalization
- **Abstract**: Autonomous agents powered by multimodal large language models have been developed to facilitate task execution on mobile devices. However, prior work has predominantly focused on atomic tasks -- such as shot-chain execution tasks and single-screen grounding tasks -- while overlooking the generalization to compositional tasks, which are indispensable for real-world applications. This work introduces UI-NEXUS, a comprehensive benchmark designed to evaluate mobile agents on three categories of comp...


### [Chain-of-Code Collapse: Reasoning Failures in LLMs via Adversarial Prompting in Code Generation](https://arxiv.org/abs/2506.06971v2)
- **arXiv**: 2506.06971v2
- **Date**: 2025-06-08
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: CoT faithfulness analysis
- **Abstract**: Large Language Models (LLMs) have achieved remarkable success in tasks requiring complex reasoning, such as code generation, mathematical problem solving, and algorithmic synthesis -- especially when aided by reasoning tokens and Chain-of-Thought prompting. Yet, a core question remains: do these models truly reason, or do they merely exploit shallow statistical patterns? In this paper, we introduce Chain-of-Code Collapse, where we systematically investigate the robustness of reasoning LLMs by in...


### [Please Translate Again: Two Simple Experiments on Whether Human-Like Reasoning Helps Translation](https://arxiv.org/abs/2506.04521v2)
- **arXiv**: 2506.04521v2
- **Date**: 2025-06-05
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: faithfulness. Topics: CoT faithfulness analysis
- **Abstract**: Large Language Models (LLMs) demonstrate strong reasoning capabilities for many tasks, often by explicitly decomposing the task via Chain-of-Thought (CoT) reasoning. Recent work on LLM-based translation designs hand-crafted prompts to decompose translation, or trains models to incorporate intermediate steps. Translating Step-by-step (Briakou et al., 2024), for instance, introduces a multi-step prompt with decomposition and refinement of translation with LLMs, which achieved state-of-the-art resu...


### [Does Thinking More always Help? Mirage of Test-Time Scaling in Reasoning Models](https://arxiv.org/abs/2506.04210v3)
- **arXiv**: 2506.04210v3
- **Date**: 2025-06-04
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: Test-time scaling
- **Abstract**: Recent trends in test-time scaling for reasoning models (e.g., OpenAI o1, DeepSeek R1) have led to a popular belief that extending thinking traces using prompts like "Wait" or "Let me rethink" can improve performance. This raises a natural question: Does thinking more at test-time truly lead to better reasoning? To answer this question, we perform a detailed empirical study across models and benchmarks, which reveals a consistent pattern of initial performance improvements from additional thinki...


### [CoT is Not True Reasoning, It Is Just a Tight Constraint to Imitate: A Theory Perspective](https://arxiv.org/abs/2506.02878v2)
- **arXiv**: 2506.02878v2
- **Date**: 2025-06-03
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: pattern matching, emergent reasoning. Topics: Pattern matching analysis, Emergence claims
- **Abstract**: Chain-of-Thought (CoT) prompting has demonstrably enhanced the performance of Large Language Models on tasks requiring multi-step inference. This success has led to widespread claims of emergent reasoning capabilities in these models. In this paper, we present a theoretical counter-perspective: Chain-of-Thought (CoT) does not elicit genuine, abstract reasoning. Instead, we argue that Chain-of-Thought functions as a powerful structural constraint that guides Large Language Models to imitate the f...


### [SemVink: Advancing VLMs' Semantic Understanding of Optical Illusions via Visual Global Thinking](https://arxiv.org/abs/2506.02803v3)
- **arXiv**: 2506.02803v3
- **Date**: 2025-06-03
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Vision-language models (VLMs) excel in semantic tasks but falter at a core human capability: detecting hidden content in optical illusions or AI-generated images through perceptual adjustments like zooming. We introduce HC-Bench, a benchmark of 112 images with hidden text, objects, and illusions, revealing that leading VLMs achieve near-zero accuracy (0-5.36%)-even with explicit prompting. Humans resolve such ambiguities instinctively, yet VLMs fail due to an overreliance on high-level semantics...


### [A Closer Look at Bias and Chain-of-Thought Faithfulness of Large (Vision) Language Models](https://arxiv.org/abs/2505.23945v2)
- **arXiv**: 2505.23945v2
- **Date**: 2025-05-29
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: faithfulness, unfaithful, chain-of-thought faithful. Topics: CoT faithfulness analysis
- **Abstract**: Chain-of-thought (CoT) reasoning enhances performance of large language models, but questions remain about whether these reasoning traces faithfully reflect the internal processes of the model. We present the first comprehensive study of CoT faithfulness in large vision-language models (LVLMs), investigating how both text-based and previously unexplored image-based biases affect reasoning and bias articulation. Our work introduces a novel, fine-grained evaluation pipeline for categorizing bias a...


### [A Survey of Generative Categories and Techniques in Multimodal Generative Models](https://arxiv.org/abs/2506.10016v3)
- **arXiv**: 2506.10016v3
- **Date**: 2025-05-29
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: faithfulness, compositional. Topics: CoT faithfulness analysis, Compositional generalization, RL for reasoning, Emergence claims
- **Abstract**: Multimodal Generative Models (MGMs) have rapidly evolved beyond text generation, now spanning diverse output modalities including images, music, video, human motion, and 3D objects, by integrating language with other sensory modalities under unified architectures. This survey categorises six primary generative modalities and examines how foundational techniques, namely Self-Supervised Learning (SSL), Mixture of Experts (MoE), Reinforcement Learning from Human Feedback (RLHF), and Chain-of-Though...


### [Learning Composable Chains-of-Thought](https://arxiv.org/abs/2505.22635v1)
- **arXiv**: 2505.22635v1
- **Date**: 2025-05-28
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: compositional. Topics: Compositional generalization
- **Abstract**: A common approach for teaching large language models (LLMs) to reason is to train on chain-of-thought (CoT) traces of in-distribution reasoning problems, but such annotated data is costly to obtain for every problem of interest. We want reasoning models to generalize beyond their training distribution, and ideally to generalize compositionally: combine atomic reasoning skills to solve harder, unseen reasoning tasks. We take a step towards compositional generalization of reasoning skills when add...


### [SV-TrustEval-C: Evaluating Structure and Semantic Reasoning in Large Language Models for Source Code Vulnerability Analysis](https://arxiv.org/abs/2505.20630v1)
- **arXiv**: 2505.20630v1
- **Date**: 2025-05-27
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: pattern matching. Topics: Pattern matching analysis
- **Abstract**: As Large Language Models (LLMs) evolve in understanding and generating code, accurately evaluating their reliability in analyzing source code vulnerabilities becomes increasingly vital. While studies have examined LLM capabilities in tasks like vulnerability detection and repair, they often overlook the importance of both structure and semantic reasoning crucial for trustworthy vulnerability analysis. To address this gap, we introduce SV-TrustEval-C, a benchmark designed to evaluate LLMs' abilit...


### [SelfReflect: Can LLMs Communicate Their Internal Answer Distribution?](https://arxiv.org/abs/2505.20295v3)
- **arXiv**: 2505.20295v3
- **Date**: 2025-05-26
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: faithfulness. Topics: CoT faithfulness analysis
- **Abstract**: The common approach to communicate a large language model's (LLM) uncertainty is to add a percentage number or a hedging word to its response. But is this all we can do? Instead of generating a single answer and then hedging it, an LLM that is fully transparent to the user needs to be able to reflect on its internal belief distribution and output a summary of all options it deems possible, and how likely they are. To test whether LLMs possess this capability, we develop the SelfReflect metric, a...


### [Reasoning LLMs are Wandering Solution Explorers](https://arxiv.org/abs/2505.20296v1)
- **arXiv**: 2505.20296v1
- **Date**: 2025-05-26
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: unfaithful. Topics: CoT faithfulness analysis, Test-time scaling
- **Abstract**: Large Language Models (LLMs) have demonstrated impressive reasoning abilities through test-time computation (TTC) techniques such as chain-of-thought prompting and tree-based reasoning. However, we argue that current reasoning LLMs (RLLMs) lack the ability to systematically explore the solution space. This paper formalizes what constitutes systematic problem solving and identifies common failure modes that reveal reasoning LLMs to be wanderers rather than systematic explorers. Through qualitativ...


### [When Two LLMs Debate, Both Think They'll Win](https://arxiv.org/abs/2505.19184v3)
- **arXiv**: 2505.19184v3
- **Date**: 2025-05-25
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: faithfulness. Topics: CoT faithfulness analysis
- **Abstract**: Can LLMs accurately adjust their confidence when facing opposition? Building on previous studies measuring calibration on static fact-based question-answering tasks, we evaluate Large Language Models (LLMs) in a dynamic, adversarial debate setting, uniquely combining two realistic factors: (a) a multi-turn format requiring models to update beliefs as new information emerges, and (b) a zero-sum structure to control for task-related uncertainty, since mutual high-confidence claims imply systematic...


### [Context Reasoner: Incentivizing Reasoning Capability for Contextualized Privacy and Safety Compliance via Reinforcement Learning](https://arxiv.org/abs/2505.14585v2)
- **arXiv**: 2505.14585v2
- **Date**: 2025-05-20
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: pattern matching. Topics: RL for reasoning, Pattern matching analysis
- **Abstract**: While Large Language Models (LLMs) exhibit remarkable capabilities, they also introduce significant safety and privacy risks. Current mitigation strategies often fail to preserve contextual reasoning capabilities in risky scenarios. Instead, they rely heavily on sensitive pattern matching to protect LLMs, which limits the scope. Furthermore, they overlook established safety and privacy standards, leading to systemic risks for legal compliance. To address these gaps, we formulate safety and priva...


### [Interpretable Traces, Unexpected Outcomes: Investigating the Disconnect in Trace-Based Knowledge Distillation](https://arxiv.org/abs/2505.13792v1)
- **arXiv**: 2505.13792v1
- **Date**: 2025-05-20
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: faithfulness. Topics: CoT faithfulness analysis
- **Abstract**: Question Answering (QA) poses a challenging and critical problem, particularly in today's age of interactive dialogue systems such as ChatGPT, Perplexity, Microsoft Copilot, etc. where users demand both accuracy and transparency in the model's outputs. Since smaller language models (SLMs) are computationally more efficient but often under-perform compared to larger models, Knowledge Distillation (KD) methods allow for finetuning these smaller models to improve their final performance. Lately, th...


### [Sense and Sensitivity: Examining the Influence of Semantic Recall on Long Context Code Reasoning](https://arxiv.org/abs/2505.13353v3)
- **arXiv**: 2505.13353v3
- **Date**: 2025-05-19
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: pattern matching. Topics: Pattern matching analysis
- **Abstract**: Large language models (LLMs) are increasingly deployed for understanding large codebases, but whether they understand operational semantics of long code context or rely on pattern matching shortcuts remains unclear. We distinguish between lexical recall (retrieving code verbatim) and semantic recall (understanding operational semantics). Evaluating 10 state-of-the-art LLMs, we find that while frontier models achieve near-perfect, position-independent lexical recall, semantic recall degrades seve...


### [Reasoning Models Don't Always Say What They Think](https://arxiv.org/abs/2505.05410v1)
- **arXiv**: 2505.05410v1
- **Date**: 2025-05-08
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: faithfulness. Topics: CoT faithfulness analysis, RL for reasoning, Test-time scaling
- **Abstract**: Chain-of-thought (CoT) offers a potential boon for AI safety as it allows monitoring a model's CoT to try to understand its intentions and reasoning processes. However, the effectiveness of such monitoring hinges on CoTs faithfully representing models' actual reasoning processes. We evaluate CoT faithfulness of state-of-the-art reasoning models across 6 reasoning hints presented in the prompts and find: (1) for most settings and models tested, CoTs reveal their usage of hints in at least 1% of e...


### [Probing and Inducing Combinational Creativity in Vision-Language Models](https://arxiv.org/abs/2504.13120v2)
- **arXiv**: 2504.13120v2
- **Date**: 2025-04-17
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: pattern matching. Topics: Pattern matching analysis
- **Abstract**: The ability to combine existing concepts into novel ideas stands as a fundamental hallmark of human intelligence. Recent advances in Vision-Language Models (VLMs) like GPT-4V and DALLE-3 have sparked debate about whether their outputs reflect combinational creativity--defined by M. A. Boden (1998) as synthesizing novel ideas through combining existing concepts--or sophisticated pattern matching of training data. Drawing inspiration from cognitive science, we investigate the combinational creativ...


### [Evaluating the Generalization Capabilities of Large Language Models on Code Reasoning](https://arxiv.org/abs/2504.05518v1)
- **arXiv**: 2504.05518v1
- **Date**: 2025-04-07
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: pattern matching, out-of-distribution. Topics: OOD generalization, Pattern matching analysis
- **Abstract**: We assess how the code reasoning abilities of large language models (LLMs) generalize to different kinds of programs. We present techniques for obtaining in- and out-of-distribution programs with different characteristics: code sampled from a domain-specific language, code automatically generated by an LLM, code collected from competitive programming contests, and mutated versions of these programs. We also present an experimental methodology for evaluating LLM generalization by comparing their ...


### [Fast Controlled Generation from Language Models with Adaptive Weighted Rejection Sampling](https://arxiv.org/abs/2504.05410v2)
- **arXiv**: 2504.05410v2
- **Date**: 2025-04-07
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: pattern matching. Topics: Pattern matching analysis
- **Abstract**: The dominant approach to generating from language models subject to some constraint is locally constrained decoding (LCD), incrementally sampling tokens at each time step such that the constraint is never violated. Typically, this is achieved through token masking: looping over the vocabulary and excluding non-conforming tokens. There are two important problems with this approach. (i) Evaluating the constraint on every token can be prohibitively expensive -- LM vocabularies often exceed $100,000...


### [Truthful or Fabricated? Using Causal Attribution to Mitigate Reward Hacking in Explanations](https://arxiv.org/abs/2504.05294v2)
- **arXiv**: 2504.05294v2
- **Date**: 2025-04-07
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: faithfulness. Topics: CoT faithfulness analysis
- **Abstract**: Chain-of-thought explanations are widely used to inspect the decision process of large language models (LLMs) and to evaluate the trustworthiness of model outputs, making them important for effective collaboration between LLMs and humans. We demonstrate that preference optimization - a key step in the alignment phase - can inadvertently reduce the faithfulness of these explanations. This occurs because the reward model (RM), which guides alignment, is tasked with optimizing both the expected qua...


### [Do Large Language Models Truly Grasp Addition? A Rule-Focused Diagnostic Using Two-Integer Arithmetic](https://arxiv.org/abs/2504.05262v3)
- **arXiv**: 2504.05262v3
- **Date**: 2025-04-07
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: pattern matching. Topics: Pattern matching analysis
- **Abstract**: Large language models (LLMs) achieve impressive results on advanced mathematics benchmarks but sometimes fail on basic arithmetic tasks, raising the question of whether they have truly grasped fundamental arithmetic rules or are merely relying on pattern matching. To unravel this issue, we systematically probe LLMs' understanding of two-integer addition ($0$ to $2^{64}$) by testing three crucial properties: commutativity ($A+B=B+A$), representation invariance via symbolic remapping (e.g., $7 \ma...


### [FReM: A Flexible Reasoning Mechanism for Balancing Quick and Slow Thinking in Long-Context Question Answering](https://arxiv.org/abs/2503.22985v1)
- **arXiv**: 2503.22985v1
- **Date**: 2025-03-29
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: pattern matching. Topics: Pattern matching analysis
- **Abstract**: Long-context question-answering (LCQA) systems have greatly benefited from the powerful reasoning capabilities of large language models (LLMs), which can be categorized into slow and quick reasoning modes. However, both modes have their limitations. Slow thinking generally leans to explore every possible reasoning path, which leads to heavy overthinking and wastes time. Quick thinking usually relies on pattern matching rather than truly understanding the query logic, which misses proper understa...


### [Annotating Scientific Uncertainty: A comprehensive model using linguistic patterns and comparison with existing approaches](https://arxiv.org/abs/2503.11376v1)
- **arXiv**: 2503.11376v1
- **Date**: 2025-03-14
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: pattern matching. Topics: Pattern matching analysis
- **Abstract**: UnScientify, a system designed to detect scientific uncertainty in scholarly full text. The system utilizes a weakly supervised technique to identify verbally expressed uncertainty in scientific texts and their authorial references. The core methodology of UnScientify is based on a multi-faceted pipeline that integrates span pattern matching, complex sentence analysis and author reference checking. This approach streamlines the labeling and annotation processes essential for identifying scientif...


### [Chain-of-Thought Reasoning In The Wild Is Not Always Faithful](https://arxiv.org/abs/2503.08679v4)
- **arXiv**: 2503.08679v4
- **Date**: 2025-03-11
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: faithfulness, unfaithful. Topics: CoT faithfulness analysis
- **Abstract**: Chain-of-Thought (CoT) reasoning has significantly advanced state-of-the-art AI capabilities. However, recent studies have shown that CoT reasoning is not always faithful when models face an explicit bias in their prompts, i.e., the CoT can give an incorrect picture of how models arrive at conclusions. We go further and show that unfaithful CoT can also occur on realistic prompts with no artificial bias. We find that when separately presented with the questions "Is X bigger than Y?" and "Is Y bi...


### [Rewarding Curse: Analyze and Mitigate Reward Modeling Issues for LLM Reasoning](https://arxiv.org/abs/2503.05188v1)
- **arXiv**: 2503.05188v1
- **Date**: 2025-03-07
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: faithfulness, unfaithful. Topics: CoT faithfulness analysis
- **Abstract**: Chain-of-thought (CoT) prompting demonstrates varying performance under different reasoning tasks. Previous work attempts to evaluate it but falls short in providing an in-depth analysis of patterns that influence the CoT. In this paper, we study the CoT performance from the perspective of effectiveness and faithfulness. For the former, we identify key factors that influence CoT effectiveness on performance improvement, including problem difficulty, information gain, and information flow. For th...


### [LVLM-Compress-Bench: Benchmarking the Broader Impact of Large Vision-Language Model Compression](https://arxiv.org/abs/2503.04982v1)
- **arXiv**: 2503.04982v1
- **Date**: 2025-03-06
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Despite recent efforts in understanding the compression impact on large language models (LLMs) in terms of their downstream task performance and trustworthiness on relatively simpler uni-modal benchmarks (for example, question answering, common sense reasoning), their detailed study on multi-modal Large Vision-Language Models (LVLMs) is yet to be unveiled. Towards mitigating this gap, we present LVLM-Compress-Bench, a framework to first thoroughly study the broad impact of compression on the gen...


### [Enough Coin Flips Can Make LLMs Act Bayesian](https://arxiv.org/abs/2503.04722v2)
- **arXiv**: 2503.04722v2
- **Date**: 2025-03-06
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: pattern matching. Topics: Pattern matching analysis, Emergence claims
- **Abstract**: Large language models (LLMs) exhibit the ability to generalize given few-shot examples in their input prompt, an emergent capability known as in-context learning (ICL). We investigate whether LLMs use ICL to perform structured reasoning in ways that are consistent with a Bayesian framework or rely on pattern matching. Using a controlled setting of biased coin flips, we find that: (1) LLMs often possess biased priors, causing initial divergence in zero-shot settings, (2) in-context evidence outwe...


### [Learning to Substitute Components for Compositional Generalization](https://arxiv.org/abs/2502.20834v1)
- **arXiv**: 2502.20834v1
- **Date**: 2025-02-28
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: compositional. Topics: Compositional generalization
- **Abstract**: Despite the rising prevalence of neural language models, recent empirical evidence suggests their deficiency in compositional generalization. One of the current de-facto solutions to this problem is compositional data augmentation, which aims to introduce additional compositional inductive bias. However, existing handcrafted augmentation strategies offer limited improvement when systematic generalization of neural language models requires multi-grained compositional bias (i.e., not limited to ei...


### [A Causal Lens for Evaluating Faithfulness Metrics](https://arxiv.org/abs/2502.18848v3)
- **arXiv**: 2502.18848v3
- **Date**: 2025-02-26
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: faithfulness, unfaithful. Topics: CoT faithfulness analysis
- **Abstract**: Large Language Models (LLMs) offer natural language explanations as an alternative to feature attribution methods for model interpretability. However, despite their plausibility, they may not reflect the model's true reasoning faithfully. While several faithfulness metrics have been proposed, they are often evaluated in isolation, making principled comparisons between them difficult. We present Causal Diagnosticity, a testbed framework for evaluating faithfulness metrics for natural language exp...


### [Beyond No: Quantifying AI Over-Refusal and Emotional Attachment Boundaries](https://arxiv.org/abs/2502.14975v1)
- **arXiv**: 2502.14975v1
- **Date**: 2025-02-20
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: pattern matching. Topics: Pattern matching analysis
- **Abstract**: We present an open-source benchmark and evaluation framework for assessing emotional boundary handling in Large Language Models (LLMs). Using a dataset of 1156 prompts across six languages, we evaluated three leading LLMs (GPT-4o, Claude-3.5 Sonnet, and Mistral-large) on their ability to maintain appropriate emotional boundaries through pattern-matched response analysis. Our framework quantifies responses across seven key patterns: direct refusal, apology, explanation, deflection, acknowledgment...


### [Measuring Chain of Thought Faithfulness by Unlearning Reasoning Steps](https://arxiv.org/abs/2502.14829v4)
- **arXiv**: 2502.14829v4
- **Date**: 2025-02-20
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: faithfulness. Topics: CoT faithfulness analysis
- **Abstract**: When prompted to think step-by-step, language models (LMs) produce a chain of thought (CoT), a sequence of reasoning steps that the model supposedly used to produce its prediction. Despite much work on CoT prompting, it is unclear if reasoning verbalized in a CoT is faithful to the models' parametric beliefs. We introduce a framework for measuring parametric faithfulness of generated reasoning, and propose Faithfulness by Unlearning Reasoning steps (FUR), an instance of this framework. FUR erase...


### [An explainable transformer circuit for compositional generalization](https://arxiv.org/abs/2502.15801v1)
- **arXiv**: 2502.15801v1
- **Date**: 2025-02-19
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: compositional. Topics: Compositional generalization
- **Abstract**: Compositional generalization-the systematic combination of known components into novel structures-remains a core challenge in cognitive science and machine learning. Although transformer-based large language models can exhibit strong performance on certain compositional tasks, the underlying mechanisms driving these abilities remain opaque, calling into question their interpretability. In this work, we identify and mechanistically interpret the circuit responsible for compositional induction in ...


### [KGGen: Extracting Knowledge Graphs from Plain Text with Language Models](https://arxiv.org/abs/2502.09956v2)
- **arXiv**: 2502.09956v2
- **Date**: 2025-02-14
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: Pattern matching analysis
- **Abstract**: Recent interest in building foundation models for KGs has highlighted a fundamental challenge: knowledge-graph data is relatively scarce. The best-known KGs are primarily human-labeled, created by pattern-matching, or extracted using early NLP techniques. While human-generated KGs are in short supply, automatically extracted KGs are of questionable quality. We present a solution to this data scarcity problem in the form of a text-to-KG generator (KGGen), a package that uses language models to cr...


### [The simulation of judgment in LLMs](https://arxiv.org/abs/2502.04426v3)
- **arXiv**: 2502.04426v3
- **Date**: 2025-02-06
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Large Language Models (LLMs) are increasingly embedded in evaluative processes, from information filtering to assessing and addressing knowledge gaps through explanation and credibility judgments. This raises the need to examine how such evaluations are built, what assumptions they rely on, and how their strategies diverge from those of humans. We benchmark six LLMs against expert ratings--NewsGuard and Media Bias/Fact Check--and against human judgments collected through a controlled experiment....


### [LLMs to Support a Domain Specific Knowledge Assistant](https://arxiv.org/abs/2502.04095v1)
- **arXiv**: 2502.04095v1
- **Date**: 2025-02-06
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: faithfulness. Topics: CoT faithfulness analysis
- **Abstract**: This work presents a custom approach to developing a domain specific knowledge assistant for sustainability reporting using the International Financial Reporting Standards (IFRS). In this domain, there is no publicly available question-answer dataset, which has impeded the development of a high-quality chatbot to support companies with IFRS reporting. The two key contributions of this project therefore are:
  (1) A high-quality synthetic question-answer (QA) dataset based on IFRS sustainability ...


### [Limitations of Large Language Models in Clinical Problem-Solving Arising from Inflexible Reasoning](https://arxiv.org/abs/2502.04381v1)
- **arXiv**: 2502.04381v1
- **Date**: 2025-02-05
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: pattern matching. Topics: Pattern matching analysis
- **Abstract**: Large Language Models (LLMs) have attained human-level accuracy on medical question-answer (QA) benchmarks. However, their limitations in navigating open-ended clinical scenarios have recently been shown, raising concerns about the robustness and generalizability of LLM reasoning across diverse, real-world medical tasks. To probe potential LLM failure modes in clinical problem-solving, we present the medical abstraction and reasoning corpus (M-ARC). M-ARC assesses clinical reasoning through scen...


### [On the Reasoning Capacity of AI Models and How to Quantify It](https://arxiv.org/abs/2501.13833v1)
- **arXiv**: 2501.13833v1
- **Date**: 2025-01-23
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: pattern matching. Topics: Pattern matching analysis
- **Abstract**: Recent advances in Large Language Models (LLMs) have intensified the debate surrounding the fundamental nature of their reasoning capabilities. While achieving high performance on benchmarks such as GPQA and MMLU, these models exhibit limitations in more complex reasoning tasks, highlighting the need for more rigorous evaluation methodologies. We propose a novel phenomenological approach that goes beyond traditional accuracy metrics to probe the underlying mechanisms of model behavior, establish...


### [Multi-round, Chain-of-thought Post-editing for Unfaithful Summaries](https://arxiv.org/abs/2501.11273v1)
- **arXiv**: 2501.11273v1
- **Date**: 2025-01-20
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: faithfulness, unfaithful. Topics: CoT faithfulness analysis
- **Abstract**: Recent large language models (LLMs) have demonstrated a remarkable ability to perform natural language understanding and generation tasks. In this work, we investigate the use of LLMs for evaluating faithfulness in news summarization, finding that it achieves a strong correlation with human judgments. We further investigate LLMs' capabilities as a faithfulness post-editor, experimenting with different chain-of-thought prompts for locating and correcting factual inconsistencies between a generate...


### [GPT as a Monte Carlo Language Tree: A Probabilistic Perspective](https://arxiv.org/abs/2501.07641v2)
- **arXiv**: 2501.07641v2
- **Date**: 2025-01-13
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: Pattern matching analysis
- **Abstract**: Large Language Models (LLMs), such as GPT, are considered to learn the latent distributions within large-scale web-crawl datasets and accomplish natural language processing (NLP) tasks by predicting the next token. However, this mechanism of latent distribution modeling lacks quantitative understanding and analysis. In this paper, we propose a novel perspective that any language dataset can be represented by a Monte Carlo Language Tree (abbreviated as ``Data-Tree''), where each node denotes a to...


### [IOLBENCH: Benchmarking LLMs on Linguistic Reasoning](https://arxiv.org/abs/2501.04249v2)
- **arXiv**: 2501.04249v2
- **Date**: 2025-01-08
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: compositional. Topics: Compositional generalization
- **Abstract**: Despite the remarkable advancements and widespread applications of deep neural networks, their ability to perform reasoning tasks remains limited, particularly in domains requiring structured, abstract thought. In this paper, we investigate the linguistic reasoning capabilities of state-of-the-art large language models (LLMs) by introducing IOLBENCH, a novel benchmark derived from International Linguistics Olympiad (IOL) problems. This dataset encompasses diverse problems testing syntax, morphol...


### [Beyond Introspection: Reinforcing Thinking via Externalist Behavioral Feedback](https://arxiv.org/abs/2501.01457v3)
- **arXiv**: 2501.01457v3
- **Date**: 2024-12-31
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: While inference-time thinking allows Large Language Models (LLMs) to address complex problems, the extended thinking process can be unreliable or inconsistent because of the model's probabilistic nature, especially near its knowledge boundaries. Existing approaches attempt to mitigate this by having the model critique its own reasoning to make corrections. However, such self-critique inherits the same biases of the original output, known as the introspection illusion. Moving beyond such introspe...


### [Exploring Compositional Generalization of Multimodal LLMs for Medical Imaging](https://arxiv.org/abs/2412.20070v2)
- **arXiv**: 2412.20070v2
- **Date**: 2024-12-28
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: compositional. Topics: Compositional generalization
- **Abstract**: Medical imaging provides essential visual insights for diagnosis, and multimodal large language models (MLLMs) are increasingly utilized for its analysis due to their strong generalization capabilities; however, the underlying factors driving this generalization remain unclear. Current research suggests that multi-task training outperforms single-task as different tasks can benefit each other, but they often overlook the internal relationships within these tasks. To analyze this phenomenon, we a...


### [Molly: Making Large Language Model Agents Solve Python Problem More Logically](https://arxiv.org/abs/2412.18093v1)
- **arXiv**: 2412.18093v1
- **Date**: 2024-12-24
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Applying large language models (LLMs) as teaching assists has attracted much attention as an integral part of intelligent education, particularly in computing courses. To reduce the gap between the LLMs and the computer programming education expert, fine-tuning and retrieval augmented generation (RAG) are the two mainstream methods in existing researches. However, fine-tuning for specific tasks is resource-intensive and may diminish the model`s generalization capabilities. RAG can perform well o...


### [NeSyCoCo: A Neuro-Symbolic Concept Composer for Compositional Generalization](https://arxiv.org/abs/2412.15588v1)
- **arXiv**: 2412.15588v1
- **Date**: 2024-12-20
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: compositional. Topics: Compositional generalization
- **Abstract**: Compositional generalization is crucial for artificial intelligence agents to solve complex vision-language reasoning tasks. Neuro-symbolic approaches have demonstrated promise in capturing compositional structures, but they face critical challenges: (a) reliance on predefined predicates for symbolic representations that limit adaptability, (b) difficulty in extracting predicates from raw data, and (c) using non-differentiable operations for combining primitive concepts. To address these issues,...


### [The Illusion-Illusion: Vision Language Models See Illusions Where There are None](https://arxiv.org/abs/2412.18613v1)
- **arXiv**: 2412.18613v1
- **Date**: 2024-12-07
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Illusions are entertaining, but they are also a useful diagnostic tool in cognitive science, philosophy, and neuroscience. A typical illusion shows a gap between how something "really is" and how something "appears to be", and this gap helps us understand the mental processing that lead to how something appears to be. Illusions are also useful for investigating artificial systems, and much research has examined whether computational models of perceptions fall prey to the same illusions as people...


### [TQA-Bench: Evaluating LLMs for Multi-Table Question Answering with Scalable Context and Symbolic Extension](https://arxiv.org/abs/2411.19504v1)
- **arXiv**: 2411.19504v1
- **Date**: 2024-11-29
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: pattern matching. Topics: Pattern matching analysis
- **Abstract**: The advent of large language models (LLMs) has unlocked great opportunities in complex data management tasks, particularly in question answering (QA) over complicated multi-table relational data. Despite significant progress, systematically evaluating LLMs on multi-table QA remains a critical challenge due to the inherent complexity of analyzing heterogeneous table structures and potential large scale of serialized relational data. Existing benchmarks primarily focus on single-table QA, failing ...


### [On the Impact of Fine-Tuning on Chain-of-Thought Reasoning](https://arxiv.org/abs/2411.15382v2)
- **arXiv**: 2411.15382v2
- **Date**: 2024-11-22
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: faithfulness. Topics: CoT faithfulness analysis, RL for reasoning
- **Abstract**: Large language models have emerged as powerful tools for general intelligence, showcasing advanced natural language processing capabilities that find applications across diverse domains. Despite their impressive performance, recent studies have highlighted the potential for significant enhancements in LLMs' task-specific performance through fine-tuning strategies like Reinforcement Learning with Human Feedback (RLHF), supervised fine-tuning (SFT), and Quantized Low-Rank Adapters (Q-LoRA) method....


### [VisAidMath: Benchmarking Visual-Aided Mathematical Reasoning](https://arxiv.org/abs/2410.22995v2)
- **arXiv**: 2410.22995v2
- **Date**: 2024-10-30
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: reasoning illusion
- **Abstract**: A hallmark of advanced artificial intelligence is the capacity to progress from passive visual perception to the strategic modification of visual information to facilitate complex reasoning. This advanced capability, however, remains critically underdeveloped in current Large Multi-modal Models (LMMs). The deficiency is often masked by evaluation metrics that prioritize final-answer accuracy, creating an illusion of competence where genuine reasoning is absent. Using the domain of geometric prob...


### [Rare-to-Frequent: Unlocking Compositional Generation Power of Diffusion Models on Rare Concepts with LLM Guidance](https://arxiv.org/abs/2410.22376v4)
- **arXiv**: 2410.22376v4
- **Date**: 2024-10-29
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: compositional. Topics: Compositional generalization
- **Abstract**: State-of-the-art text-to-image (T2I) diffusion models often struggle to generate rare compositions of concepts, e.g., objects with unusual attributes. In this paper, we show that the compositional generation power of diffusion models on such rare concepts can be significantly enhanced by the Large Language Model (LLM) guidance. We start with empirical and theoretical analysis, demonstrating that exposing frequent concepts relevant to the target rare concepts during the diffusion sampling process...


### [Do Large Language Models Truly Grasp Mathematics? An Empirical Exploration From Cognitive Psychology](https://arxiv.org/abs/2410.14979v6)
- **arXiv**: 2410.14979v6
- **Date**: 2024-10-19
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: pattern matching. Topics: Pattern matching analysis
- **Abstract**: The cognitive mechanism by which Large Language Models (LLMs) solve mathematical problems remains a widely debated and unresolved issue. Currently, there is little interpretable experimental evidence that connects LLMs' problem-solving with human cognitive psychology.To determine if LLMs possess human-like mathematical reasoning, we modified the problems used in the human Cognitive Reflection Test (CRT). Our results show that, even with the use of Chains of Thought (CoT) prompts, mainstream LLMs...


### [Evaluating Morphological Compositional Generalization in Large Language Models](https://arxiv.org/abs/2410.12656v4)
- **arXiv**: 2410.12656v4
- **Date**: 2024-10-16
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: compositional. Topics: Compositional generalization
- **Abstract**: Large language models (LLMs) have demonstrated significant progress in various natural language generation and understanding tasks. However, their linguistic generalization capabilities remain questionable, raising doubts about whether these models learn language similarly to humans. While humans exhibit compositional generalization and linguistic creativity in language use, the extent to which LLMs replicate these abilities, particularly in morphology, is under-explored. In this work, we system...


### [FLARE: Faithful Logic-Aided Reasoning and Exploration](https://arxiv.org/abs/2410.11900v5)
- **arXiv**: 2410.11900v5
- **Date**: 2024-10-14
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: faithfulness. Topics: CoT faithfulness analysis
- **Abstract**: Modern Question Answering (QA) and Reasoning approaches based on Large Language Models (LLMs) commonly use prompting techniques, such as Chain-of-Thought (CoT), assuming the resulting generation will have a more granular exploration and reasoning over the question space and scope. However, such methods struggle with generating outputs that are faithful to the intermediate chain of reasoning produced by the model. On the other end of the spectrum, neuro-symbolic methods such as Faithful CoT (F-Co...


### [CoMAT: Chain of Mathematically Annotated Thought Improves Mathematical Reasoning](https://arxiv.org/abs/2410.10336v2)
- **arXiv**: 2410.10336v2
- **Date**: 2024-10-14
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: faithfulness. Topics: CoT faithfulness analysis
- **Abstract**: Mathematical reasoning remains a significant challenge for large language models (LLMs), despite progress in prompting techniques such as Chain-of-Thought (CoT). We present **Chain of Mathematically Annotated Thought (CoMAT)**, which enhances reasoning through two stages: *Symbolic Conversion* (converting natural language queries into symbolic form) and *Reasoning Execution* (deriving answers from symbolic representations). CoMAT operates entirely with a single LLM and without external solvers. ...


### [Do great minds think alike? Investigating Human-AI Complementarity in Question Answering with CAIMIRA](https://arxiv.org/abs/2410.06524v1)
- **arXiv**: 2410.06524v1
- **Date**: 2024-10-09
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: pattern matching. Topics: Pattern matching analysis
- **Abstract**: Recent advancements of large language models (LLMs) have led to claims of AI surpassing humans in natural language processing (NLP) tasks such as textual understanding and reasoning. This work investigates these assertions by introducing CAIMIRA, a novel framework rooted in item response theory (IRT) that enables quantitative assessment and comparison of problem-solving abilities of question-answering (QA) agents: humans and AI systems. Through analysis of over 300,000 responses from ~70 AI syst...


### [Do Vision-Language Models Really Understand Visual Language?](https://arxiv.org/abs/2410.00193v3)
- **arXiv**: 2410.00193v3
- **Date**: 2024-09-30
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Visual language is a system of communication that conveys information through symbols, shapes, and spatial arrangements. Diagrams are a typical example of a visual language depicting complex concepts and their relationships in the form of an image. The symbolic nature of diagrams presents significant challenges for building models capable of understanding them. Recent studies suggest that Large Vision-Language Models (LVLMs) can even tackle complex reasoning tasks involving diagrams. In this pap...


### [Can Models Learn Skill Composition from Examples?](https://arxiv.org/abs/2409.19808v2)
- **arXiv**: 2409.19808v2
- **Date**: 2024-09-29
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: compositional. Topics: Compositional generalization
- **Abstract**: As large language models (LLMs) become increasingly advanced, their ability to exhibit compositional generalization -- the capacity to combine learned skills in novel ways not encountered during training -- has garnered significant attention. This type of generalization, particularly in scenarios beyond training data, is also of great interest in the study of AI safety and alignment. A recent study introduced the SKILL-MIX evaluation, where models are tasked with composing a short paragraph demo...


### [Logic-of-Thought: Injecting Logic into Contexts for Full Reasoning in Large Language Models](https://arxiv.org/abs/2409.17539v2)
- **arXiv**: 2409.17539v2
- **Date**: 2024-09-26
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: unfaithful. Topics: CoT faithfulness analysis
- **Abstract**: Large Language Models (LLMs) have demonstrated remarkable capabilities across various tasks but their performance in complex logical reasoning tasks remains unsatisfactory. Although some prompting methods, such as Chain-of-Thought, can improve the reasoning ability of LLMs to some extent, they suffer from an unfaithful issue where derived conclusions may not align with the generated reasoning chain. To address this issue, some studies employ the approach of propositional logic to further enhance...


### [Large Language Models are Pattern Matchers: Editing Semi-Structured and Structured Documents with ChatGPT](https://arxiv.org/abs/2409.07732v1)
- **arXiv**: 2409.07732v1
- **Date**: 2024-09-12
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: pattern matching. Topics: OOD generalization, Pattern matching analysis
- **Abstract**: Large Language Models (LLMs) offer numerous applications, the full extent of which is not yet understood. This paper investigates if LLMs can be applied for editing structured and semi-structured documents with minimal effort. Using a qualitative research approach, we conduct two case studies with ChatGPT and thoroughly analyze the results. Our experiments indicate that LLMs can effectively edit structured and semi-structured documents when provided with basic, straightforward prompts. ChatGPT d...


### [Privacy Checklist: Privacy Violation Detection Grounding on Contextual Integrity Theory](https://arxiv.org/abs/2408.10053v2)
- **arXiv**: 2408.10053v2
- **Date**: 2024-08-19
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: pattern matching. Topics: Pattern matching analysis
- **Abstract**: Privacy research has attracted wide attention as individuals worry that their private data can be easily leaked during interactions with smart devices, social platforms, and AI applications. Computer science researchers, on the other hand, commonly study privacy issues through privacy attacks and defenses on segmented fields. Privacy research is conducted on various sub-fields, including Computer Vision (CV), Natural Language Processing (NLP), and Computer Networks. Within each field, privacy ha...


### [Chain-of-Thought Augmentation with Logit Contrast for Enhanced Reasoning in Language Models](https://arxiv.org/abs/2407.03600v2)
- **arXiv**: 2407.03600v2
- **Date**: 2024-07-04
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: compositional. Topics: Compositional generalization
- **Abstract**: Rapidly increasing model scales coupled with steering methods such as chain-of-thought prompting have led to drastic improvements in language model reasoning. At the same time, models struggle with compositional generalization and are far from human performance on many reasoning-based benchmarks. Leveraging the success of chain-of-thought prompting, and also taking inspiration from context-aware decoding (CAD), we explore input-based contrasting methods to further encourage the type of reasoning...


### [modeLing: A Novel Dataset for Testing Linguistic Reasoning in Language Models](https://arxiv.org/abs/2406.17038v1)
- **arXiv**: 2406.17038v1
- **Date**: 2024-06-24
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: compositional, emergent reasoning. Topics: Compositional generalization, Emergence claims
- **Abstract**: We introduce modeLing, a novel benchmark of Linguistics Olympiad-style puzzles which tests few-shot reasoning in AI systems. Solving these puzzles necessitates inferring aspects of a language's grammatical structure from a small number of examples. Such puzzles provide a natural testbed for language models, as they require compositional generalization and few-shot inductive reasoning. Consisting solely of new puzzles written specifically for this work, modeLing has no risk of appearing in the tr...


### [Dissecting the Ullman Variations with a SCALPEL: Why do LLMs fail at Trivial Alterations to the False Belief Task?](https://arxiv.org/abs/2406.14737v2)
- **arXiv**: 2406.14737v2
- **Date**: 2024-06-20
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: pattern matching. Topics: Pattern matching analysis
- **Abstract**: Recent empirical results have sparked a debate about whether or not Large Language Models (LLMs) are capable of Theory of Mind (ToM). While some have found LLMs to be successful on ToM evaluations such as the False Belief task, others have shown that their performance is not robust against trivial alterations to stimuli. In this paper, we introduce SCALPEL -- a technique to incrementally modify stimuli to test different specific hypotheses about why LLMs fail -- and apply this method to the "tra...


### [Compositional Generalization with Grounded Language Models](https://arxiv.org/abs/2406.04989v1)
- **arXiv**: 2406.04989v1
- **Date**: 2024-06-07
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: compositional. Topics: Compositional generalization
- **Abstract**: Grounded language models use external sources of information, such as knowledge graphs, to meet some of the general challenges associated with pre-training. By extending previous work on compositional generalization in semantic parsing, we allow for a controlled evaluation of the degree to which these models learn and generalize from patterns in knowledge graphs. We develop a procedure for generating natural language questions paired with knowledge graphs that targets different aspects of compos...


### [DiNeR: a Large Realistic Dataset for Evaluating Compositional Generalization](https://arxiv.org/abs/2406.04669v1)
- **arXiv**: 2406.04669v1
- **Date**: 2024-06-07
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: compositional. Topics: Compositional generalization, OOD generalization
- **Abstract**: Most of the existing compositional generalization datasets are synthetically-generated, resulting in a lack of natural language variation. While there have been recent attempts to introduce non-synthetic datasets for compositional generalization, they suffer from either limited data scale or a lack of diversity in the forms of combinations. To better investigate compositional generalization with more linguistic phenomena and compositional diversity, we propose the DIsh NamE Recognition (DiNeR) t...


### [SPOR: A Comprehensive and Practical Evaluation Method for Compositional Generalization in Data-to-Text Generation](https://arxiv.org/abs/2405.10650v8)
- **arXiv**: 2405.10650v8
- **Date**: 2024-05-17
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: compositional. Topics: Compositional generalization
- **Abstract**: Compositional generalization is an important ability of language models and has many different manifestations. For data-to-text generation, previous research on this ability is limited to a single manifestation called Systematicity and lacks consideration of large language models (LLMs), which cannot fully cover practical application scenarios. In this work, we propose SPOR, a comprehensive and practical evaluation method for compositional generalization in data-to-text generation. SPOR includes...


### [Towards Compositionally Generalizable Semantic Parsing in Large Language Models: A Survey](https://arxiv.org/abs/2404.13074v1)
- **arXiv**: 2404.13074v1
- **Date**: 2024-04-15
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: compositional. Topics: Compositional generalization
- **Abstract**: Compositional generalization is the ability of a model to generalize to complex, previously unseen types of combinations of entities from just having seen the primitives. This type of generalization is particularly relevant to the semantic parsing community for applications such as task-oriented dialogue, text-to-SQL parsing, and information retrieval, as they can harbor infinite complexity. Despite the success of large language models (LLMs) in a wide range of NLP tasks, unlocking perfect compo...


### [Language Plays a Pivotal Role in the Object-Attribute Compositional Generalization of CLIP](https://arxiv.org/abs/2403.18525v1)
- **arXiv**: 2403.18525v1
- **Date**: 2024-03-27
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: distribution shift, out-of-distribution, compositional. Topics: Compositional generalization, OOD generalization
- **Abstract**: Vision-language models, such as CLIP, have shown promising Out-of-Distribution (OoD) generalization under various types of distribution shifts. Recent studies attempted to investigate the leading cause of this capability. In this work, we follow the same path, but focus on a specific type of OoD data - images with novel compositions of attribute-object pairs - and study whether such models can successfully classify those images into composition classes. We carefully designed an authentic image t...


### [IllusionVQA: A Challenging Optical Illusion Dataset for Vision Language Models](https://arxiv.org/abs/2403.15952v3)
- **arXiv**: 2403.15952v3
- **Date**: 2024-03-23
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: The advent of Vision Language Models (VLM) has allowed researchers to investigate the visual understanding of a neural network using natural language. Beyond object classification and detection, VLMs are capable of visual comprehension and common-sense reasoning. This naturally led to the question: How do VLMs respond when the image itself is inherently unreasonable? To this end, we present IllusionVQA: a diverse dataset of challenging optical illusions and hard-to-interpret scenes to test the c...


### [Contrastive Region Guidance: Improving Grounding in Vision-Language Models without Training](https://arxiv.org/abs/2403.02325v1)
- **arXiv**: 2403.02325v1
- **Date**: 2024-03-04
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: compositional. Topics: Compositional generalization
- **Abstract**: Highlighting particularly relevant regions of an image can improve the performance of vision-language models (VLMs) on various vision-language (VL) tasks by guiding the model to attend more closely to these regions of interest. For example, VLMs can be given a "visual prompt", where visual markers such as bounding boxes delineate key image regions. However, current VLMs that can incorporate visual guidance are either proprietary and expensive or require costly training on curated data that inclu...


### [WilKE: Wise-Layer Knowledge Editor for Lifelong Knowledge Editing](https://arxiv.org/abs/2402.10987v2)
- **arXiv**: 2402.10987v2
- **Date**: 2024-02-16
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: pattern matching. Topics: Pattern matching analysis
- **Abstract**: Knowledge editing aims to rectify inaccuracies in large language models (LLMs) without costly retraining for outdated or erroneous knowledge. However, current knowledge editing methods primarily focus on single editing, failing to meet the requirements for lifelong editing. This study reveals a performance degradation encountered by knowledge editing in lifelong editing, characterized by toxicity buildup and toxicity flash, with the primary cause identified as pattern unmatch. We introduce a kno...


### [Can LLM find the green circle? Investigation and Human-guided tool manipulation for compositional generalization](https://arxiv.org/abs/2312.07763v1)
- **arXiv**: 2312.07763v1
- **Date**: 2023-12-12
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: compositional. Topics: Compositional generalization
- **Abstract**: The meaning of complex phrases in natural language is composed of their individual components. The task of compositional generalization evaluates a model's ability to understand new combinations of components. Previous studies trained smaller, task-specific models, which exhibited poor generalization. While large language models (LLMs) exhibit impressive generalization abilities on many tasks through in-context learning (ICL), their potential for compositional generalization remains unexplored. ...


### [ComPEFT: Compression for Communicating Parameter Efficient Updates via Sparsification and Quantization](https://arxiv.org/abs/2311.13171v2)
- **arXiv**: 2311.13171v2
- **Date**: 2023-11-22
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: compositional. Topics: Compositional generalization
- **Abstract**: Parameter-efficient fine-tuning (PEFT) techniques make it possible to efficiently adapt a language model to create "expert" models that specialize to new tasks or domains. Recent techniques in model merging and compositional generalization leverage these expert models by dynamically composing modules to improve zero/few-shot generalization. Despite the efficiency of PEFT methods, the size of expert models can make it onerous to retrieve expert models per query over high-latency networks like the...


### [Practical Membership Inference Attacks against Fine-tuned Large Language Models via Self-prompt Calibration](https://arxiv.org/abs/2311.06062v4)
- **arXiv**: 2311.06062v4
- **Date**: 2023-11-10
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Membership Inference Attacks (MIA) aim to infer whether a target data record has been utilized for model training or not. Existing MIAs designed for large language models (LLMs) can be bifurcated into two types: reference-free and reference-based attacks. Although reference-based attacks appear promising performance by calibrating the probability measured on the target model with reference models, this illusion of privacy risk heavily depends on a reference dataset that closely resembles the tra...


### [The Impact of Depth on Compositional Generalization in Transformer Language Models](https://arxiv.org/abs/2310.19956v2)
- **arXiv**: 2310.19956v2
- **Date**: 2023-10-30
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: compositional. Topics: Compositional generalization
- **Abstract**: To process novel sentences, language models (LMs) must generalize compositionally -- combine familiar elements in new ways. What aspects of a model's structure promote compositional generalization? Focusing on transformers, we test the hypothesis, motivated by theoretical and empirical work, that deeper transformers generalize more compositionally. Simply adding layers increases the total number of parameters; to address this confound between depth and size, we construct three classes of models ...


### [What Algorithms can Transformers Learn? A Study in Length Generalization](https://arxiv.org/abs/2310.16028v1)
- **arXiv**: 2310.16028v1
- **Date**: 2023-10-24
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: out-of-distribution, compositional. Topics: Compositional generalization, OOD generalization, Emergence claims
- **Abstract**: Large language models exhibit surprising emergent generalization properties, yet also struggle on many simple reasoning tasks such as arithmetic and parity. This raises the question of if and when Transformer models can learn the true algorithm for solving a task. We study the scope of Transformers' abilities in the specific setting of length generalization on algorithmic tasks. Here, we propose a unifying framework to understand when and how Transformers can exhibit strong length generalization...


### [HallusionBench: An Advanced Diagnostic Suite for Entangled Language Hallucination and Visual Illusion in Large Vision-Language Models](https://arxiv.org/abs/2310.14566v5)
- **arXiv**: 2310.14566v5
- **Date**: 2023-10-23
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: We introduce HallusionBench, a comprehensive benchmark designed for the evaluation of image-context reasoning. This benchmark presents significant challenges to advanced large visual-language models (LVLMs), such as GPT-4V(Vision), Gemini Pro Vision, Claude 3, and LLaVA-1.5, by emphasizing nuanced understanding and interpretation of visual data. The benchmark comprises 346 images paired with 1129 questions, all meticulously crafted by human experts. We introduce a novel structure for these visua...


### [Harnessing Dataset Cartography for Improved Compositional Generalization in Transformers](https://arxiv.org/abs/2310.12118v1)
- **arXiv**: 2310.12118v1
- **Date**: 2023-10-18
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: compositional. Topics: Compositional generalization
- **Abstract**: Neural networks have revolutionized language modeling and excelled in various downstream tasks. However, the extent to which these models achieve compositional generalization comparable to human cognitive abilities remains a topic of debate. While existing approaches in the field have mainly focused on novel architectures and alternative learning paradigms, we introduce a pioneering method harnessing the power of dataset cartography (Swayamdipta et al., 2020). By strategically identifying a subs...


### [Large language models converge toward human-like concept organization](https://arxiv.org/abs/2308.15047v1)
- **arXiv**: 2308.15047v1
- **Date**: 2023-08-29
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: pattern matching. Topics: Pattern matching analysis
- **Abstract**: Large language models show human-like performance in knowledge extraction, reasoning and dialogue, but it remains controversial whether this performance is best explained by memorization and pattern matching, or whether it reflects human-like inferential semantics and world knowledge. Knowledge bases such as WikiData provide large-scale, high-quality representations of inferential semantics and world knowledge. We show that large language models learn to organize concepts in ways that are striki...


### [ChatGPT as Data Augmentation for Compositional Generalization: A Case Study in Open Intent Detection](https://arxiv.org/abs/2308.13517v1)
- **arXiv**: 2308.13517v1
- **Date**: 2023-08-25
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: compositional. Topics: Compositional generalization
- **Abstract**: Open intent detection, a crucial aspect of natural language understanding, involves the identification of previously unseen intents in user-generated text. Despite the progress made in this field, challenges persist in handling new combinations of language components, which is essential for compositional generalization. In this paper, we present a case study exploring the use of ChatGPT as a data augmentation technique to enhance compositional generalization in open intent detection tasks. We be...


### [Skills-in-Context Prompting: Unlocking Compositionality in Large Language Models](https://arxiv.org/abs/2308.00304v3)
- **arXiv**: 2308.00304v3
- **Date**: 2023-08-01
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: compositional. Topics: Compositional generalization
- **Abstract**: We investigate how to elicit compositional generalization capabilities in large language models (LLMs). Compositional generalization empowers LLMs to solve complex problems by combining foundational skills, a critical reasoning ability akin to human intelligence. However, even the most advanced LLMs currently struggle with this form of reasoning. We examine this problem within the framework of in-context learning and find that demonstrating both foundational skills and compositional examples gro...


### [Adapt and Decompose: Efficient Generalization of Text-to-SQL via Domain Adapted Least-To-Most Prompting](https://arxiv.org/abs/2308.02582v3)
- **arXiv**: 2308.02582v3
- **Date**: 2023-08-01
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: compositional. Topics: Compositional generalization
- **Abstract**: Cross-domain and cross-compositional generalization of Text-to-SQL semantic parsing is a challenging task. Existing Large Language Model (LLM) based solutions rely on inference-time retrieval of few-shot exemplars from the training set to synthesize a run-time prompt for each Natural Language (NL) test query. In contrast, we devise an algorithm which performs offline sampling of a minimal set-of few-shots from the training data, with complete coverage of SQL clauses, operators and functions, and...


### [Training Models to Generate, Recognize, and Reframe Unhelpful Thoughts](https://arxiv.org/abs/2307.02768v1)
- **arXiv**: 2307.02768v1
- **Date**: 2023-07-06
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: Pattern matching analysis
- **Abstract**: Many cognitive approaches to well-being, such as recognizing and reframing unhelpful thoughts, have received considerable empirical support over the past decades, yet still lack truly widespread adoption in self-help format. A barrier to that adoption is a lack of adequately specific and diverse dedicated practice material. This work examines whether current language models can be leveraged to both produce a virtually unlimited quantity of practice material illustrating standard unhelpful though...


### [On Conditional and Compositional Language Model Differentiable Prompting](https://arxiv.org/abs/2307.01446v1)
- **arXiv**: 2307.01446v1
- **Date**: 2023-07-04
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: compositional. Topics: Compositional generalization
- **Abstract**: Prompts have been shown to be an effective method to adapt a frozen Pretrained Language Model (PLM) to perform well on downstream tasks. Prompts can be represented by a human-engineered word sequence or by a learned continuous embedding. In this work, we investigate conditional and compositional differentiable prompting. We propose a new model, Prompt Production System (PRopS), which learns to transform task instructions or input metadata, into continuous prompts that elicit task-specific output...


### [Evaluating Shutdown Avoidance of Language Models in Textual Scenarios](https://arxiv.org/abs/2307.00787v1)
- **arXiv**: 2307.00787v1
- **Date**: 2023-07-03
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: pattern matching. Topics: Pattern matching analysis, Emergence claims
- **Abstract**: Recently, there has been an increase in interest in evaluating large language models for emergent and dangerous capabilities. Importantly, agents could reason that in some scenarios their goal is better achieved if they are not turned off, which can lead to undesirable behaviors. In this paper, we investigate the potential of using toy textual scenarios to evaluate instrumental reasoning and shutdown avoidance in language models such as GPT-4 and Claude. Furthermore, we explore whether shutdown ...


### [FunQA: Towards Surprising Video Comprehension](https://arxiv.org/abs/2306.14899v2)
- **arXiv**: 2306.14899v2
- **Date**: 2023-06-26
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review
- **Abstract**: Surprising videos, such as funny clips, creative performances, or visual illusions, attract significant attention. Enjoyment of these videos is not simply a response to visual stimuli; rather, it hinges on the human capacity to understand (and appreciate) commonsense violations depicted in these videos. We introduce FunQA, a challenging video question-answering (QA) dataset specifically designed to evaluate and enhance the depth of video reasoning based on counter-intuitive and fun videos. Unlik...


### [Chinese Fine-Grained Financial Sentiment Analysis with Large Language Models](https://arxiv.org/abs/2306.14096v5)
- **arXiv**: 2306.14096v5
- **Date**: 2023-06-25
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: pattern matching. Topics: Pattern matching analysis
- **Abstract**: Entity-level fine-grained sentiment analysis in the financial domain is a crucial subtask of sentiment analysis and currently faces numerous challenges. The primary challenge stems from the lack of high-quality and large-scale annotated corpora specifically designed for financial text sentiment analysis, which in turn limits the availability of data necessary for developing effective text processing techniques. Recent advancements in large language models (LLMs) have yielded remarkable performan...


### [Improving Generalization in Language Model-Based Text-to-SQL Semantic Parsing: Two Simple Semantic Boundary-Based Techniques](https://arxiv.org/abs/2305.17378v1)
- **arXiv**: 2305.17378v1
- **Date**: 2023-05-27
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: compositional. Topics: Compositional generalization
- **Abstract**: Compositional and domain generalization present significant challenges in semantic parsing, even for state-of-the-art semantic parsers based on pre-trained language models (LMs). In this study, we empirically investigate improving an LM's generalization in semantic parsing with two simple techniques: at the token level, we introduce a token preprocessing method to preserve the semantic boundaries of tokens produced by LM tokenizers; at the sequence level, we propose to use special tokens to mark...


### [Testing the General Deductive Reasoning Capacity of Large Language Models Using OOD Examples](https://arxiv.org/abs/2305.15269v3)
- **arXiv**: 2305.15269v3
- **Date**: 2023-05-24
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: compositional. Topics: Compositional generalization, OOD generalization
- **Abstract**: Given the intractably large size of the space of proofs, any model that is capable of general deductive reasoning must generalize to proofs of greater complexity. Recent studies have shown that large language models (LLMs) possess some abstract deductive reasoning ability given chain-of-thought prompts. However, they have primarily been tested on proofs using modus ponens or of a specific size, and from the same distribution as the in-context examples. To measure the general deductive reasoning ...


### [Emergent inabilities? Inverse scaling over the course of pretraining](https://arxiv.org/abs/2305.14681v2)
- **arXiv**: 2305.14681v2
- **Date**: 2023-05-24
- **Stance**: BALANCED
- **Why read**: Relevance unclear - needs review. Topics: Pattern matching analysis, Emergence claims
- **Abstract**: Does inverse scaling only occur as a function of model size, or can it also occur over the course of training? We carry out an exploratory study investigating whether the performance of language models on specific tasks can decrease (while general performance remains high) during training on the language modeling task. We find 8 tasks on which Pythia 12B (Biderman et al., 2023) shows decreased performance over the course of training. Five of these tasks (TruthfulQA-MC1, TruthfulQA-MC2, Hindsight...


### [How Do In-Context Examples Affect Compositional Generalization?](https://arxiv.org/abs/2305.04835v3)
- **arXiv**: 2305.04835v3
- **Date**: 2023-05-08
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: compositional. Topics: Compositional generalization, OOD generalization
- **Abstract**: Compositional generalization--understanding unseen combinations of seen primitives--is an essential reasoning capability in human intelligence. The AI community mainly studies this capability by fine-tuning neural networks on lots of training samples, while it is still unclear whether and how in-context learning--the prevailing few-shot paradigm based on large language models--exhibits compositional generalization. In this paper, we present CoFe, a test suite to investigate in-context compositio...


### [Explainable Verbal Reasoner Plus (EVR+): A Natural Language Reasoning Framework that Supports Diverse Compositional Reasoning](https://arxiv.org/abs/2305.00061v1)
- **arXiv**: 2305.00061v1
- **Date**: 2023-04-28
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: compositional. Topics: Compositional generalization
- **Abstract**: Languages models have been successfully applied to a variety of reasoning tasks in NLP, yet the language models still suffer from compositional generalization. In this paper we present Explainable Verbal Reasoner Plus (EVR+), a reasoning framework that enhances language models' compositional reasoning ability by (1) allowing the model to explicitly generate and execute symbolic operators, and (2) allowing the model to decompose a complex task into several simpler ones in a flexible manner. Compa...


### [Conversational Text-to-SQL: An Odyssey into State-of-the-Art and Challenges Ahead](https://arxiv.org/abs/2302.11054v1)
- **arXiv**: 2302.11054v1
- **Date**: 2023-02-21
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: compositional. Topics: Compositional generalization
- **Abstract**: Conversational, multi-turn, text-to-SQL (CoSQL) tasks map natural language utterances in a dialogue to SQL queries. State-of-the-art (SOTA) systems use large, pre-trained and finetuned language models, such as the T5-family, in conjunction with constrained decoding. With multi-tasking (MT) over coherent tasks with discrete prompts during training, we improve over specialized text-to-SQL T5-family models. Based on Oracle analyses over n-best hypotheses, we apply a query plan model and a schema li...


### [Techniques to Improve Neural Math Word Problem Solvers](https://arxiv.org/abs/2302.03145v1)
- **arXiv**: 2302.03145v1
- **Date**: 2023-02-06
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: pattern matching. Topics: Pattern matching analysis
- **Abstract**: Developing automatic Math Word Problem (MWP) solvers is a challenging task that demands the ability of understanding and mathematical reasoning over the natural language. Recent neural-based approaches mainly encode the problem text using a language model and decode a mathematical expression over quantities and operators iteratively. Note the problem text of a MWP consists of a context part and a question part, a recent work finds these neural solvers may only perform shallow pattern matching be...


### [Cross-modal Attention Congruence Regularization for Vision-Language Relation Alignment](https://arxiv.org/abs/2212.10549v2)
- **arXiv**: 2212.10549v2
- **Date**: 2022-12-20
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: compositional. Topics: Compositional generalization
- **Abstract**: Despite recent progress towards scaling up multimodal vision-language models, these models are still known to struggle on compositional generalization benchmarks such as Winoground. We find that a critical component lacking from current vision-language models is relation-level alignment: the ability to match directional semantic relations in text (e.g., "mug in grass") with spatial relationships in the image (e.g., the position of the mug relative to the grass). To tackle this problem, we show t...


### [On the Compositional Generalization Gap of In-Context Learning](https://arxiv.org/abs/2211.08473v1)
- **arXiv**: 2211.08473v1
- **Date**: 2022-11-15
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: out-of-distribution, compositional. Topics: Compositional generalization, OOD generalization
- **Abstract**: Pretrained large generative language models have shown great performance on many tasks, but exhibit low compositional generalization abilities. Scaling such models has been shown to improve their performance on various NLP tasks even just by conditioning them on a few examples to solve the task without any fine-tuning (also known as in-context learning). In this work, we look at the gap between the in-distribution (ID) and out-of-distribution (OOD) performance of such models in semantic parsing ...


### [Counterfactual Recipe Generation: Exploring Compositional Generalization in a Realistic Scenario](https://arxiv.org/abs/2210.11431v1)
- **arXiv**: 2210.11431v1
- **Date**: 2022-10-20
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: compositional. Topics: Compositional generalization
- **Abstract**: People can acquire knowledge in an unsupervised manner by reading, and compose the knowledge to make novel combinations. In this paper, we investigate whether pretrained language models can perform compositional generalization in a realistic setting: recipe generation. We design the counterfactual recipe generation task, which asks models to modify a base recipe according to the change of an ingredient. This task requires compositional generalization at two levels: the surface level of incorpora...


### [Multitask Pre-training of Modular Prompt for Chinese Few-Shot Learning](https://arxiv.org/abs/2210.07565v3)
- **arXiv**: 2210.07565v3
- **Date**: 2022-10-14
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: compositional. Topics: Compositional generalization
- **Abstract**: Prompt tuning is a parameter-efficient approach to adapting pre-trained language models to downstream tasks. Although prompt tuning has been shown to match the performance of full model tuning when training data is sufficient, it tends to struggle in few-shot learning settings. In this paper, we present Multi-task Pre-trained Modular Prompt (MP2) to boost prompt tuning for few-shot learning. MP2 is a set of combinable prompts pre-trained on 38 Chinese tasks. On downstream tasks, the pre-trained ...


### [Compositional Semantic Parsing with Large Language Models](https://arxiv.org/abs/2209.15003v2)
- **arXiv**: 2209.15003v2
- **Date**: 2022-09-29
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: compositional. Topics: Compositional generalization
- **Abstract**: Humans can reason compositionally when presented with new tasks. Previous research shows that appropriate prompting techniques enable large language models (LLMs) to solve artificial compositional generalization tasks such as SCAN. In this work, we identify additional challenges in more realistic semantic parsing tasks with larger vocabulary and refine these prompting techniques to address them. Our best method is based on least-to-most prompting: it decomposes the problem using prompting-based ...


### [Evaluating the Impact of Model Scale for Compositional Generalization in Semantic Parsing](https://arxiv.org/abs/2205.12253v2)
- **arXiv**: 2205.12253v2
- **Date**: 2022-05-24
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: out-of-distribution, compositional. Topics: Compositional generalization, OOD generalization
- **Abstract**: Despite their strong performance on many tasks, pre-trained language models have been shown to struggle on out-of-distribution compositional generalization. Meanwhile, recent work has shown considerable improvements on many NLP tasks from model scaling. Can scaling up model size also improve compositional generalization in semantic parsing? We evaluate encoder-decoder models up to 11B parameters and decoder-only models up to 540B parameters, and compare model scaling curves for three different m...


### [Recursive Decoding: A Situated Cognition Approach to Compositional Generation in Grounded Language Understanding](https://arxiv.org/abs/2201.11766v2)
- **arXiv**: 2201.11766v2
- **Date**: 2022-01-27
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: out-of-distribution, compositional. Topics: Compositional generalization, OOD generalization
- **Abstract**: Compositional generalization is a troubling blind spot for neural language models. Recent efforts have presented techniques for improving a model's ability to encode novel combinations of known inputs, but less work has focused on generating novel combinations of known outputs. Here we focus on this latter "decode-side" form of generalization in the context of gSCAN, a synthetic benchmark for compositional generalization in grounded language understanding. We present Recursive Decoding (RD), a n...


### [Dyna-bAbI: unlocking bAbI's potential with dynamic synthetic benchmarking](https://arxiv.org/abs/2112.00086v1)
- **arXiv**: 2112.00086v1
- **Date**: 2021-11-30
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: compositional. Topics: Compositional generalization, OOD generalization
- **Abstract**: While neural language models often perform surprisingly well on natural language understanding (NLU) tasks, their strengths and limitations remain poorly understood. Controlled synthetic tasks are thus an increasingly important resource for diagnosing model behavior. In this work we focus on story understanding, a core competency for NLU systems. However, the main synthetic resource for story understanding, the bAbI benchmark, lacks such a systematic mechanism for controllable task generation. W...


### [Compositional Generalization in Semantic Parsing: Pre-training vs. Specialized Architectures](https://arxiv.org/abs/2007.08970v3)
- **arXiv**: 2007.08970v3
- **Date**: 2020-07-17
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: compositional. Topics: Compositional generalization
- **Abstract**: While mainstream machine learning methods are known to have limited ability to compositionally generalize, new architectures and techniques continue to be proposed to address this limitation. We investigate state-of-the-art techniques and architectures in order to assess their effectiveness in improving compositional generalization in semantic parsing tasks based on the SCAN and CFQ datasets. We show that masked language model (MLM) pre-training rivals SCAN-inspired architectures on primitive ho...


### [CommonGen: A Constrained Text Generation Challenge for Generative Commonsense Reasoning](https://arxiv.org/abs/1911.03705v4)
- **arXiv**: 1911.03705v4
- **Date**: 2019-11-09
- **Stance**: SUPPORTS
- **Why read**: Likely supports thesis. Keywords: compositional. Topics: Compositional generalization
- **Abstract**: Recently, large-scale pre-trained language models have demonstrated impressive performance on several commonsense-reasoning benchmark datasets. However, building machines with commonsense to compose realistically plausible sentences remains challenging. In this paper, we present a constrained text generation task, CommonGen associated with a benchmark dataset, to explicitly test machines for the ability of generative commonsense reasoning. Given a set of common concepts (e.g., {dog, frisbee, cat...



---

