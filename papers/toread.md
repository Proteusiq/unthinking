# Papers to Read

Curated list of papers confirmed relevant to the thesis. **181 papers remaining.**

Source tracking: issues [#40](https://github.com/Proteusiq/unthinking/issues/40)–[#45](https://github.com/Proteusiq/unthinking/issues/45), [#47](https://github.com/Proteusiq/unthinking/issues/47) (closed).

---

## High Priority — Parameter Efficiency & RL Dynamics (Related to #221)

Papers exploring why RL is more parameter-efficient than SFT, and what this reveals about reasoning.

### Mechanistic Explanations

| arXiv ID | Title | Stance |
|----------|-------|--------|
| [2511.08567](https://arxiv.org/abs/2511.08567) | The Path Not Taken: RLVR Provably Learns Off the Principals | supports |
| [2602.07729](https://arxiv.org/abs/2602.07729) | Do We Need Adam? SGD in RLVR (updates <0.02% params) | supports |
| [2507.10616](https://arxiv.org/abs/2507.10616) | Scalpel vs. Hammer: GRPO Amplifies, SFT Replaces | supports |

### Parameter-Efficient Methods for Reasoning

| arXiv ID | Title | Stance |
|----------|-------|--------|
| [2512.23165](https://arxiv.org/abs/2512.23165) | Evaluating Parameter Efficient Methods for RLVR | balanced |
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

## High Priority — Superficial Alignment Debate

Papers directly addressing whether alignment is superficial.

| arXiv ID | Title | Stance |
|----------|-------|--------|
| [2506.07452](https://arxiv.org/abs/2506.07452) | When Style Breaks Safety | supports |

### Papers Citing "Revisiting SAH" (2410.03717)

| arXiv ID | Title | Stance |
|----------|-------|--------|
| [2506.06998](https://arxiv.org/abs/2506.06998) | What Makes Reasoning Models Different? Follow the Reasoning Leader | supports |
| [2601.21571](https://arxiv.org/abs/2601.21571) | Shaping Capabilities with Token-Level Data Filtering | balanced |
| [2602.07340](https://arxiv.org/abs/2602.07340) | Revisiting Robustness for LLM Safety Alignment via Selective Geometry Control | supports |

---

## High Priority — Counter-Evidence (Steel-Man)

Papers that may challenge the thesis. Must read to make thesis defensible.

### Mechanistic Interpretability (#40)

| arXiv ID | Title |
|----------|-------|
| [2301.05217](https://arxiv.org/abs/2301.05217) | Progress Measures for Grokking |
| [2310.03714](https://arxiv.org/abs/2310.03714) | Representation Engineering |

### World Models (#41)

| arXiv ID | Title |
|----------|-------|
| [2309.16609](https://arxiv.org/abs/2309.16609) | Do LLMs Encode Space and Time? |

### Search & Test-Time Compute (#42)

| arXiv ID | Title |
|----------|-------|
| [2303.11366](https://arxiv.org/abs/2303.11366) | Reflexion |
| [2408.03314](https://arxiv.org/abs/2408.03314) | Scaling Test-Time Compute Optimally |
| [2309.11495](https://arxiv.org/abs/2309.11495) | Chain-of-Verification |

### Emergence & Theory (#43)

| arXiv ID | Title |
|----------|-------|
| [2306.09308](https://arxiv.org/abs/2306.09308) | Theory of Emergent In-Context Learning |
| [2602.03837](https://arxiv.org/abs/2602.03837) | Accelerating Research with Gemini |
| [2502.00674](https://arxiv.org/abs/2502.00674) | Recursive Self-Aggregation |

---

## High Priority — Supports Thesis (#44)

| arXiv ID | Title |
|----------|-------|
| [2412.03782](https://arxiv.org/abs/2412.03782) | ICLR: In-Context Learning of Representations |
| [2509.19284](https://arxiv.org/abs/2509.19284) | Patterns over Principles |
| [2406.04692](https://arxiv.org/abs/2406.04692) | Robust Reasoning with Noisy Rationales |
| [2601.07226](https://arxiv.org/abs/2601.07226) | Lost in the Noise |
| [2602.01763](https://arxiv.org/abs/2602.01763) | Provable Expressiveness Hierarchy |
| [2602.02909](https://arxiv.org/abs/2602.02909) | BAPO Bounds on CoT Complexity |
| [2602.01288](https://arxiv.org/abs/2602.01288) | EDIS: Entropy Dynamics |
| [2602.02863](https://arxiv.org/abs/2602.02863) | Dynamic Instability Predicts Failure |
| [2602.02983](https://arxiv.org/abs/2602.02983) | Are LLMs Biased Like Humans? |

### Papers Citing Embers of Autoregression (2309.13638)

**Supports thesis:**

| arXiv ID | Title | Citations |
|----------|-------|-----------|
| [2403.06963](https://arxiv.org/abs/2403.06963) | The Pitfalls of Next-Token Prediction | 146 |
| [2402.08939](https://arxiv.org/abs/2402.08939) | Premise Order Matters in Reasoning | 116 |
| [2310.20707](https://arxiv.org/abs/2310.20707) | What's In My Big Data? | 177 |
| [2303.13988](https://arxiv.org/abs/2303.13988) | Machine Psychology | 232 |
| [2404.09932](https://arxiv.org/abs/2404.09932) | Foundational Challenges in Assuring LLM Safety | 309 |
| [2404.01869](https://arxiv.org/abs/2404.01869) | Beyond Accuracy: Evaluating Reasoning Behavior — Survey | 120 |
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
| [2305.03731](https://arxiv.org/abs/2305.03731) | Working Memory Capacity of ChatGPT |
| [2505.10571](https://arxiv.org/abs/2505.10571) | LLMs Do Not Have Human-Like Working Memory |
| [2305.19555](https://arxiv.org/abs/2305.19555) | Large Language Models Are Not Strong Abstract Reasoners |
| [2410.11756](https://arxiv.org/abs/2410.11756) | Evidence of Cognitive Deficits: Clock Drawing Test |
| [2502.05092](https://arxiv.org/abs/2502.05092) | Lost in Time: Clock and Calendar Understanding Challenges |
| [2412.04629](https://arxiv.org/abs/2412.04629) | Argumentative Experience: Reducing Confirmation Bias |
| [2410.15413](https://arxiv.org/abs/2410.15413) | A Comprehensive Evaluation of Cognitive Biases in LLMs |
| [2403.00811](https://arxiv.org/abs/2403.00811) | Cognitive Bias in High-Stakes Decision-Making with LLMs |
| [2202.12299](https://arxiv.org/abs/2202.12299) | Capturing Failures of LLMs via Human Cognitive Biases |
| [2305.04400](https://arxiv.org/abs/2305.04400) | Do LLMs Show Decision Heuristics Similar to Humans? |
| [2504.09946](https://arxiv.org/abs/2504.09946) | Assessing Judging Bias in Large Reasoning Models |
| [2502.17091](https://arxiv.org/abs/2502.17091) | WildFrame: Comparing Framing in Humans and LLMs |
| [2503.04840](https://arxiv.org/abs/2503.04840) | Framing the Game: How Context Shapes LLM Decision-Making |
| [2506.03923](https://arxiv.org/abs/2506.03923) | More or Less Wrong: Directional Bias in LLM Comparative Reasoning |
| [2310.10076](https://arxiv.org/abs/2310.10076) | Verbosity Bias in Preference Labeling by LLMs |
| [2505.22910](https://arxiv.org/abs/2505.22910) | Talent or Luck? Evaluating Attribution Bias in LLMs |
| [2406.01285](https://arxiv.org/abs/2406.01285) | LLMs as Recommender Systems: A Study of Popularity Bias |
| [2507.22887](https://arxiv.org/abs/2507.22887) | Where to Show Demos in Your Prompt: Positional Bias |
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
| [2411.16353](https://arxiv.org/abs/2411.16353) | The Two-Hop Curse: A->B, B->C Fail to Learn A->C |
| [2502.13913](https://arxiv.org/abs/2502.13913) | How Do LLMs Perform Two-Hop Reasoning in Context? |
| [2403.02615](https://arxiv.org/abs/2403.02615) | Exploring Limitations in Compositional Relation Reasoning |
| [2405.06680](https://arxiv.org/abs/2405.06680) | Exploring the Compositional Deficiency in Mathematical Reasoning |
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
| [2507.13337](https://arxiv.org/abs/2507.13337) | FormulaOne: Measuring Depth of Algorithmic Reasoning |

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
