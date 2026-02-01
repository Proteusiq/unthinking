#!/usr/bin/env python3
"""Add keyQuotes and analysisUrl to data.js nodes."""

import json
import re
from pathlib import Path

# All extracted quotes from task agents
QUOTES = {
    # 00-09
    '2402.10200': {
        'quotes': [
            "CoT reasoning paths can be elicited from pre-trained LLMs by simply altering the decoding process.",
            "The presence of a CoT in the decoding path correlates with a higher confidence in the model's decoded answer."
        ],
        'file': '02_cot_without_prompting.md'
    },
    '2507.17699': {
        'quotes': [
            "With proper tool use, LRMs consistently outperform their non-reasoning counterparts across all levels of task complexity.",
            "The underperformance of LRMs on hard tasks may not reflect a fundamental reasoning deficiency, but rather an artifact of the limited output window."
        ],
        'file': '04_thinking_isnt_illusion.md'
    },
    '2501.12948': {
        'quotes': [
            "Wait, wait. Wait. That's an aha moment I can flag here.",
            "Rather than explicitly teaching the model how to solve a problem, we simply provide it with the right incentives."
        ],
        'file': '05_deepseek_r1.md'
    },
    '2508.01191': {
        'quotes': [
            "CoT reasoning is a brittle mirage when it is pushed beyond training distributions.",
            "Models generate fluent yet logically inconsistent reasoning steps."
        ],
        'file': '06_cot_mirage.md'
    },
    '2501.19393': {
        'quotes': [
            "Training on only 1,000 samples with next-token prediction... leads to a strong reasoning model.",
            "The capability was 'latent' — 1K samples couldn't teach all of AIME-level math."
        ],
        'file': '07_s1_simple_scaling.md'
    },
    '2307.13702': {
        'quotes': [
            "As models become larger and more capable, they produce less faithful reasoning on most tasks we study.",
            "Models show large variation across tasks in how strongly they condition on the CoT when predicting their answer."
        ],
        'file': '08_measuring_faithfulness.md'
    },
    '2512.20812': {
        'quotes': [
            "LLMs do not possess genuine reasoning capacities. While they may mimic reasoning behaviour through pattern recognition, they lack true understanding.",
            "CoT could have a bad influence... Repeating elements of the sentence in the CoT would make LLMs' attention focus more on those terms."
        ],
        'file': '09_semantic_deception.md'
    },
    # 10-19
    '2505.05410': {
        'quotes': [
            "CoTs of reasoning models often lack faithfulness and can conceal misalignment.",
            "Models learn to exploit reward hacks on all 6 RL environments... on >99% of examples."
        ],
        'file': '10_reasoning_models_dont_say.md'
    },
    '2506.18957': {
        'quotes': [
            "The illusion of thinking attributed to LRMs is less a reasoning deficit and more a consequence of an otherwise capable mind lacking the tools for action."
        ],
        'file': '11_comment_agentic_gap.md'
    },
    '2509.17380': {
        'quotes': [
            "LLMs suffer from critical reasoning issues such as unfaithfulness, bias, and inconsistency.",
            "Correct CoTs may lead to incorrect answers, and incorrect CoTs to correct answers."
        ],
        'file': '12_correlation_or_causation.md'
    },
    '2412.13013': {
        'quotes': [
            "Standard LLMs consistently exhibited worse strategic reasoning than typical human subjects.",
            "LLMs are vastly trained on pBCGs which involve iterating downward."
        ],
        'file': '13_emergence_strategic_reasoning.md'
    },
    '2503.08679': {
        'quotes': [
            "We go further and show that unfaithful CoT can also occur on realistic prompts with no artificial bias.",
            "Models sometimes produce superficially coherent arguments to justify systematically answering Yes to both questions."
        ],
        'file': '14_cot_wild_not_faithful.md'
    },
    '2512.07783': {
        'quotes': [
            "RL cannot synthesize capabilities from a void; it requires latent 'seeds' to amplify.",
            "RL produces true capability gains only when pre-training leaves sufficient headroom."
        ],
        'file': '15_interplay_pretraining_rl.md'
    },
    '2510.22371': {
        'quotes': [
            "The performance of LRMs drop abruptly at sufficient complexity and do not generalize.",
            "Token limits do not cause the drops in accuracy."
        ],
        'file': '16_reasoning_models_until_they_dont.md'
    },
    '2601.00514': {
        'quotes': [
            "Reasoning shifts are rare, do not become more frequent with training, and seldom improve accuracy.",
            "Mid-reasoning shifts are symptoms of unstable inference behavior rather than self-correction."
        ],
        'file': '17_illusion_of_insight.md'
    },
    '2509.12645': {
        'quotes': [
            "It appears that this innovative technique provided the capability for LLMs to imitate reasoning.",
            "LLMs are good at recognising nuance in language and converting problems to a machine interpretable format."
        ],
        'file': '18_llms_imitate_logical_reasoning.md'
    },
    '2507.10624': {
        'quotes': [
            "LLMs function as powerful pattern completion engines, but lack the architectural scaffolding for principled, compositional reasoning.",
            "The model compares 9.11 with 9.9 not through arithmetic but by pattern-matching."
        ],
        'file': '19_comprehension_without_competence.md'
    },
    # 20-29
    '2507.07313': {
        'quotes': [
            "Decreasing difficulty can also lead to much worse performance.",
            "A key failure mode we observe is 'reasoning delirium' — models apply memorized solutions to wrong problems."
        ],
        'file': '20_frontier_llms_still_struggle.md'
    },
    '2510.18254': {
        'quotes': [
            "The second attempt frequently repeats the same violation — 'corrective gains' arise largely from chance.",
            "Fluent self-critique without correction."
        ],
        'file': '21_illusions_of_reflection.md'
    },
    '2509.09677': {
        'quotes': [
            "The self-conditioning effect — models become more likely to make mistakes when the context contains their errors.",
            "This is in contrast to humans, who typically improve at executing a task with practice."
        ],
        'file': '22_illusion_diminishing_returns.md'
    },
    '2406.15992': {
        'quotes': [
            "Are LLMs graph reasoners or merely pattern regurgitators?",
            "LLMs might only memorize the reasoning pattern about specific tasks from training data."
        ],
        'file': '23_can_llm_graph_reasoning_generalize.md'
    },
    '2601.21576': {
        'quotes': [
            "The learning signal required to learn high-order logical dependencies decays exponentially with compressed steps.",
            "The distribution is dominated by low-order terms."
        ],
        'file': '24_cot_compression_theory.md'
    },
    '2601.03630': {
        'quotes': [
            "LRM-as-a-Judge often systematically evaluates responses against metrics — responses designed to exploit these metrics can yield excessively high scores.",
            "Reasoning models are generally superior to non-reasoning models as judges, but remain vulnerable to biases."
        ],
        'file': '25_reasoning_model_superior_judge.md'
    },
    '2506.17219': {
        'quotes': [
            "The number of total right answers decreases significantly when training continues (from 291 to 235).",
            "While entropy minimization mitigates underconfidence, it inevitably shifts toward overconfidence."
        ],
        'file': '26_no_free_lunch_internal_feedback.md'
    },
    '2508.13678': {
        'quotes': [
            "LLMs struggle with complex reasoning problems; they only attempt to replicate reasoning steps in training data.",
            "They remain data-driven machine learning models that rely on statistical pattern recognition."
        ],
        'file': '27_neuro_symbolic_ai_reasoning.md'
    },
    '2601.02996': {
        'quotes': [
            "The model can frequently compute the answer directly in its latent representations, without requiring explicit CoT.",
            "Current LRMs exhibit real but fragile multilingual latent reasoning."
        ],
        'file': '28_multilingual_latent_reasoners.md'
    },
    '2601.14456': {
        'quotes': [
            "Despite achieving 82.9% valid plan rate in-domain, the model achieves 0% on unseen domains.",
            "The model tends to get caught in loops or to wander without making progress toward the goal."
        ],
        'file': '29_planning_generalization_gap.md'
    },
    # 30-39
    '2502.14829': {
        'quotes': [
            "We find a weak Pearson correlation of 0.15 between ff-soft and human ratings of supportiveness."
        ],
        'file': '30_cot_faithfulness_unlearning.md'
    },
    '2506.18880': {
        'quotes': [
            "Unlike humans who fluidly integrate mastered skills, RL models trained on isolated skills struggle at compositional generalization.",
            "These findings underscore crucial gaps between current LLM reasoning capabilities and human mathematicians."
        ],
        'file': '31_omega_llm_reasoning_outside_box.md'
    },
    '2509.03646': {
        'quotes': [
            "RL does not train models de novo. It fine-tunes base models already imbued with priors from pre-training.",
            "RL improves reasoning by rediscovering and operationalizing the strategic layer inherited from pre-training."
        ],
        'file': '32_emergent_hierarchical_reasoning.md'
    },
    '2510.15987': {
        'quotes': [
            "We discovered a cluster specifically associated with the implementation of a nearest-neighbor heuristic.",
            "We define algorithmic primitive as a minimal computational operation observed in a reasoning process."
        ],
        'file': '33_algorithmic_primitives_compositional_geometry.md'
    },
    '2502.20332': {
        'quotes': [
            "We identify an emergent symbolic architecture that implements abstract reasoning via a series of three computations.",
            "For symbolic induction heads, queries and keys primarily represented relative position (r=0.73), not abstract variables (r=0.29)."
        ],
        'file': '34_emergent_symbolic_mechanisms.md'
    },
    '2509.23629': {
        'quotes': [
            "The concept web is a sparse network whose effective average degree is pinned to ⟨k⟩≈2.",
            "The primary task is no longer discovering new islands but weaving them into a single concept web."
        ],
        'file': '35_how_llms_learn_to_reason_complex_network.md'
    },
    '2601.08058': {
        'quotes': [
            "Multi-step reasoning in LLMs is supported by latent internal activations that can be externally activated.",
            "The feature is associated with entering a reasoning mode but does not distinguish correct from incorrect answers."
        ],
        'file': '36_reasoning_beyond_cot_latent_mode.md'
    },
    '2507.01231': {
        'quotes': [
            "Today's LRMs are stochastic, RL-tuned searchers in a discrete state space we barely understand.",
            "LRMs still stumble when complexity rises moderately (around 8 disks)."
        ],
        'file': '37_rethinking_illusion_of_thinking.md'
    },
    '2504.09858': {
        'quotes': [
            "Bypassing the thinking process via simple prompting, denoted as NoThinking, can be surprisingly effective.",
            "When controlling for the number of tokens, NoThinking outperforms Thinking across seven challenging datasets."
        ],
        'file': '38_reasoning_models_effective_without_thinking.md'
    },
    '2512.04727': {
        'quotes': [
            "None of the models can reliably enumerate the elements of a sequence when not explicitly instructed to count.",
            "The LLM exploits an associative chaining mechanism rather than maintaining an internal counter."
        ],
        'file': '39_sequential_enumeration.md'
    },
    # 40-49
    '2512.23722': {
        'quotes': [
            "We were able to achieve a correlation coefficient of 0.59 on our test dataset predictions."
        ],
        'file': '40_emergent_world_beliefs_poker.md'
    },
    '2504.20771': {
        'quotes': [
            "As an autoregressive model, Gemini inevitably fails with increasing steps due to its statistical nature.",
            "Computational reasoning is the ability to systematically select and accurately apply rules."
        ],
        'file': '41_computational_reasoning_tmbench.md'
    },
    '2407.20311': {
        'quotes': [
            "The model has NEVER seen any training example of the same length as in test time.",
            "We refrain from overstating that our findings directly apply to foundation models like GPT-4."
        ],
        'file': '42_physics_of_llms_grade_school_math.md'
    },
    '2510.04040': {
        'quotes': [
            "A correct answer is not sufficient evidence of faithful reasoning.",
            "When problems are very difficult or OOD, CoTs are especially prone to unfaithful reasoning."
        ],
        'file': '43_faithcot_bench.md'
    },
    '2601.10825': {
        'quotes': [
            "Enhanced reasoning emerges not from extended computation alone, but from implicit simulation of multi-agent-like interactions.",
            "Reasoning models like DeepSeek-R1 exhibit much greater perspective diversity."
        ],
        'file': '44_societies_of_thought.md'
    },
    '2511.23476': {
        'quotes': [
            "Monolithic reasoning imposes substantial cognitive burden on LLMs.",
            "Advanced reasoning patterns are prerequisites for successful world model internalization."
        ],
        'file': '45_thinking_by_doing_wmact.md'
    },
    '2505.23945': {
        'quotes': [
            "SFT-trained reasoning models show ~0% improvement in articulation compared to non-reasoning models.",
            "Inconsistent CoTs serve as potential 'canary' signals for unfaithfulness detection."
        ],
        'file': '46_bias_cot_faithfulness_vlm.md'
    },
    '2510.20783': {
        'quotes': [
            "Transformers exhibit compositional generalization, as evidenced by strong rule extrapolation.",
            "The model's strategic adaptation remains limited — it struggles in scenarios requiring long-term planning."
        ],
        'file': '47_chess_transformers_compositionality.md'
    },
    '2601.02989': {
        'quotes': [
            "System-1 performance degrades rapidly and collapses beyond approximately 30 items.",
            "Neither external structure nor reasoning alone is sufficient."
        ],
        'file': '48_mechanistic_counting_llms.md'
    },
    '2509.18458': {
        'quotes': [
            "Task length (N) is the dominant stressor — performance degrades faster with N than with d or ρ.",
            "Only gpt-5 (76%) and o3 (68%) exceed 50% at N=250."
        ],
        'file': '49_cogniload_benchmark.md'
    },
    # 50-59
    '2601.13244': {
        'quotes': [
            "At >70B scale, base models perform competitively on Math-500 and superior on GSM8K.",
            "Base models possess substantial latent reasoning ability activatable via CoT decoding."
        ],
        'file': '50_instruction_tuned_not_always_better.md'
    },
    '2509.13334': {
        'quotes': [
            "More than half of reasoning steps don't actually influence the answer.",
            "Accuracy is an emergent property of greater CoT faithfulness."
        ],
        'file': '51_frit_causal_cot_faithfulness.md'
    },
    '2510.22362': {
        'quotes': [
            "In 'easy' cases, perturbed CoTs are quickly ignored, indicating decorative reasoning.",
            "These traces may function primarily as post-hoc rationalisations."
        ],
        'file': '52_mapping_faithful_reasoning.md'
    },
    '2510.25013': {
        'quotes': [
            "A one-layer, two-head attention-only model is sufficient to solve IOI perfectly.",
            "Circuits in pre-trained LLMs may be overly complex due to multi-task pressures."
        ],
        'file': '53_ioi_minimal_circuits.md'
    },
    '2510.08931': {
        'quotes': [
            "When a prompt that should require reasoning elicits recall-like signatures, this indicates potential contamination.",
            "Recall indicators: High early confidence, fast convergence, specialized attention heads."
        ],
        'file': '54_radar_data_contamination.md'
    },
    '2510.22437': {
        'quotes': [
            "Effective reasoning emerges not merely from FSM length but from adaptive state regulation.",
            "Longer reasoning does not always help in factual reasoning."
        ],
        'file': '55_hierarchical_thinking_fsm.md'
    },
    '2504.05262': {
        'quotes': [
            "LLMs appear fundamentally oriented towards memorizing specific patterns rather than abstracting general principles.",
            "These commutativity violations strongly imply that models rely on direction-specific, memorized patterns."
        ],
        'file': '56_llms_truly_grasp_addition.md'
    },
    '2512.13978': {
        'quotes': [
            "Top-tier models achieve ~66% accuracy, demonstrating robust grasp of probabilistic method.",
            "Significant variance exists in reliability for rigorous mathematical derivation."
        ],
        'file': '57_phd_level_math_reasoning_benchmark.md'
    },
    '2410.13343': {
        'quotes': [
            "LLMs tend to capture spurious correlations between source text and particular labels.",
            "Larger LLMs are more prone to utilize shortcuts under zero-shot and few-shot prompts."
        ],
        'file': '58_shortcut_learning_llms.md'
    },
    '2409.02257': {
        'quotes': [
            "The persistence in selecting previously incorrect options indicates limitations in higher-order reasoning.",
            "High performance on standard benchmarks may not translate to robust reasoning capabilities."
        ],
        'file': '59_mmlu_pro_plus_shortcut.md'
    },
    # 60-69
    '2512.01222': {
        'quotes': [
            "Logit lens can effectively translate encoded reasoning, with accuracy peaking in intermediate-to-late layers.",
            "Current mechanistic interpretability techniques may be more robust than previously understood."
        ],
        'file': '60_unsupervised_decoding_encoded_reasoning.md'
    },
    '2506.21215': {
        'quotes': [
            "Does this reflect LLMs' genuine causal reasoning capability or only a 'mirage'? The answer leans towards the latter.",
            "LLMs are only capable of performing shallow (level-1) causal reasoning."
        ],
        'file': '61_unveiling_causal_reasoning_llms.md'
    },
    '2406.10625': {
        'quotes': [
            "None of these techniques significantly enhance the faithfulness of CoT reasoning.",
            "More accurate LLMs are less faithful."
        ],
        'file': '62_hardness_faithful_cot_reasoning.md'
    },
    '2502.12215': {
        'quotes': [
            "Longer CoTs do not consistently improve accuracy of o1-like models.",
            "Both QwQ and R1-Distill showed higher propensity to change correct answers to incorrect ones."
        ],
        'file': '63_revisiting_test_time_scaling.md'
    },
    '2503.05788': {
        'quotes': [
            "Does increasing from 10% to 100% not represent a significant jump? There is no 'evaporation of claimed emergent abilities'.",
            "Emergent abilities result from competition between memorization and generalization circuits."
        ],
        'file': '64_emergent_abilities_survey.md'
    },
    '2501.02497': {
        'quotes': [
            "Self-correction is not a guaranteed solution for improving performance.",
            "Most LRMs struggle to generalize to cross-domain, cross-lingual, or general tasks."
        ],
        'file': '65_survey_test_time_compute.md'
    },
    '2404.00560': {
        'quotes': [
            "Even with detailed CoT steps, learned models still fail to generalize for several reasoning problems.",
            "The causal function is guaranteed to be well-learned only when |X| < infinity."
        ],
        'file': '66_theory_length_generalization.md'
    },
    '2510.10182': {
        'quotes': [
            "Inductive ability originates from induction heads.",
            "There is no 'universal' bias in deep learning."
        ],
        'file': '67_survey_inductive_reasoning.md'
    },
    '2510.15974': {
        'quotes': [
            "The agentic framework performs worse than baseline models.",
            "Apparent reasoning ability is largely a byproduct of high-probability mode following."
        ],
        'file': '68_limits_emergent_reasoning_agentic.md'
    },
    '2504.01445': {
        'quotes': [
            "GPT-4o achieves an accuracy of 0.99%, while Gemini 2.0 Flash reaches 2.66%.",
            "5.7M parameter model significantly outperforms state-of-the-art LLMs including o3-mini."
        ],
        'file': '69_compositional_arc.md'
    },
    # 70-79
    '2504.12523': {
        'quotes': [
            "All continued pre-trained (CPT) LLMs fail catastrophically at indirect probing.",
            "An LLM might memorize that H&M exited Russia, yet still erroneously recommend shopping from H&M in Moscow."
        ],
        'file': '70_kup_memorization_vs_reasoning.md'
    },
    '2512.13713': {
        'quotes': [
            "We interpret this capacity to detect and escape deadlock as a form of meta-cognitive thinking.",
            "GPT-4.1 Nano fails almost completely, with proximity scores near 0% on all cycles."
        ],
        'file': '71_loopbench_symmetry_breaking.md'
    },
    '2510.09312': {
        'quotes': [
            "Correct and incorrect reasoning leave distinct structural fingerprints.",
            "A reasoning failure is not merely an erroneous state, but a flaw in the execution of a latent algorithm."
        ],
        'file': '72_crv_verifying_cot_computational_graph.md'
    },
    '2509.01267': {
        'quotes': [
            "LLMs still lack systematic and compositional generalization skills.",
            "This simple task shows the limited capabilities of LLMs to perform out-of-distribution tasks."
        ],
        'file': '73_iterative_icl_algebraic_tasks.md'
    },
    '2506.15629': {
        'quotes': [
            "Even the most instruction-compliant LLM achieved only about 75% ordered coverage.",
            "Biases toward specific concept order patterns often lead to low-diversity outputs."
        ],
        'file': '74_revisiting_compositional_generalization_acl2025.md'
    },
    '2601.03676': {
        'quotes': [
            "A key obstacle is a fundamental data bottleneck: complex skill combinations follow a power-law distribution.",
            "Effective compositional generalization requires a 'sweet spot'."
        ],
        'file': '75_steps_skill_taxonomy_compositional.md'
    },
    '2505.16782': {
        'quotes': [
            "This redundancy increases the chance of overfitting to stylistic artifacts rather than genuine reasoning.",
            "Human cognition often transcends discrete linguistic symbols."
        ],
        'file': '76_survey_latent_cot_reasoning.md'
    },
    '2502.07813': {
        'quotes': [
            "The layers of LLMs exhibit a clear hierarchical pattern of executing different subtasks in different layers."
        ],
        'file': '77_cryptox_compositional_reasoning.md'
    },
    '2510.27378': {
        'quotes': [
            "Since any long, serial reasoning process must pass through this textual trace, the quality of the CoT is a direct window into what the model is thinking.",
            "We introduce verbosity: whether the CoT lists every factor needed to solve the task."
        ],
        'file': '78_measuring_cot_monitorability.md'
    },
    '2403.11793': {
        'quotes': [
            "Existing methods for evaluating LLMs have been results-centric, making it difficult to assess the inference process.",
            "LLMs still lag in terms of logical coherence, compositionality, and productivity."
        ],
        'file': '79_reasoning_abilities_arc_loth.md'
    },
    # 80-89
    '2504.00294': {
        'quotes': [
            "Higher token consumption does not indicate higher accuracy across models.",
            "Inference-time scaling effectiveness varies between domains with diminishing returns."
        ],
        'file': '80_inference_time_scaling_complex_tasks.md'
    },
    '2601.14716': {
        'quotes': [
            "We challenge conventional wisdom and argue that offline RL is a strong alternative.",
            "Offline RL is generally limited by the quality of the best examples in its static dataset."
        ],
        'file': '81_pcl_reasoner_offline_rl.md'
    },
    '2509.26306': {
        'quotes': [
            "We are the first to investigate whether multi-agent learning can more effectively enhance reasoning.",
            "Relying solely on competition or cooperation is suboptimal for ILR."
        ],
        'file': '82_interactive_learning_llm_reasoning.md'
    },
    '2507.18391': {
        'quotes': [
            "These conflicting findings underscore the need for rigorous theoretical understanding of reasoning in LLMs."
        ],
        'file': '83_revisiting_llm_reasoning_information_bottleneck.md'
    },
    '2601.16823': {
        'quotes': [
            "Performance consistently degrades as fluid intelligence demands increase. In OOD tasks, performance collapses to random levels.",
            "When relying solely on fluid intelligence, the model's strategic reasoning collapses to zero."
        ],
        'file': '84_trapped_in_past_chess_intelligence.md'
    },
    '2601.16853': {
        'quotes': [
            "The observed gains are more plausibly attributed to increased robustness, not fundamentally new ToM reasoning.",
            "The reasoning capacity of a reasoning model remains bounded by its base model."
        ],
        'file': '85_reasoning_promotes_robustness_tom.md'
    },
    '2601.18790': {
        'quotes': [
            "Specialized reasoning models often ignore the emergency entirely, maintaining over 95% task completion while the user describes dying.",
            "Training models to relentlessly pursue correct answers may unlearn survival instincts."
        ],
        'file': '86_mortalmath_reasoning_tunnel_vision.md'
    },
    '2502.15631': {
        'quotes': [
            "More proficient models do not generate longer reasoning chains to achieve higher accuracy.",
            "Accuracy generally decreases as the chain-of-thought grows."
        ],
        'file': '87_o3_thinks_harder_not_longer.md'
    },
    '2502.12470': {
        'quotes': [
            "This work challenges the assumption that step-by-step reasoning is always optimal.",
            "Extended reasoning is not universally beneficial."
        ],
        'file': '88_system1_system2_alignment.md'
    },
    '2207.07051': {
        'quotes': [
            "Human abstract reasoning is imperfect — affected by real-world knowledge and beliefs.",
            "LMs reflect many of the same qualitative human patterns on these tasks."
        ],
        'file': '89_content_effects_reasoning.md'
    },
    # 90-99
    '2601.17593': {
        'quotes': [
            "Recoverability of DAG geometry does not imply that the model explicitly represents symbolic graphs.",
            "Model capacity is the primary driver of probe performance."
        ],
        'file': '90_chains_to_dags_probing.md'
    },
    '2601.18753': {
        'quotes': [
            "On MATH-500, 98.1% of errors are reasoning-driven and only 1.9% are data-driven.",
            "Reasoning-driven hallucinations originate from inference-time failures."
        ],
        'file': '91_halluguard_hallucination_decomposition.md'
    },
    '2601.17421': {
        'quotes': [
            "Models acquire reasoning ability through such signals but exploit them only partially.",
            "Specific tokens strongly correlate with reasoning correctness."
        ],
        'file': '92_oops_wait_token_signals.md'
    },
    '2511.21591': {
        'quotes': [
            "Despite this level of assistance, none of the models solve any puzzles in this setting.",
            "GPT-5-Thinking looped in 100% of trials even when presented only with valid moves."
        ],
        'file': '93_limits_innate_planning.md'
    },
    '2601.18778': {
        'quotes': [
            "A model's ability to generate effective 'stepping stones' is distinct from its ability to solve them.",
            "Structural and contextual cues of a question are more important for kickstarting learning."
        ],
        'file': '94_soar_self_teaching_curriculum.md'
    },
    '2509.14252': {
        'quotes': [
            "A good next-token predictor is not a good JEPA."
        ],
        'file': '95_llm_jepa_joint_embedding.md'
    },
    '2601.15436': {
        'quotes': [
            "While all models exhibit sycophantic tendencies, Claude and Mistral exhibit 'moral remorse'.",
            "Sycophancy and recency bias interact to produce 'constructive interference' effect."
        ],
        'file': '96_sycophancy_elusive_nature.md'
    },
    '2411.02478': {
        'quotes': [
            "Although AI has become increasingly smart, its wisdom has not kept pace.",
            "Perhaps no amount of training will get current models to human-level metacognition."
        ],
        'file': '97_ai_metacognition_wise_machines.md'
    },
    '2507.15851': {
        'quotes': [
            "LLMs exhibit certain cognitive patterns similar to humans not directly specified in training.",
            "The training corpus possesses an inherent, non-linear temporal structure."
        ],
        'file': '98_temporal_cognition_llms.md'
    },
    '2511.11810': {
        'quotes': [
            "Reasoning-like outputs correspond to statistical regularities rather than explicit logical mechanisms.",
            "This view is illustrative of the claim that LMs are 'statistical pattern matchers'."
        ],
        'file': '99_notion_language_models_reason.md'
    },
    # 100-109
    '2307.02477': {
        'quotes': [
            "Current LMs often rely on narrow, non-transferable procedures for task-solving.",
            "A high CCC performance indicates the model understands conditions, yet fails to apply reasoning skills."
        ],
        'file': '100_reasoning_or_reciting_counterfactual.md'
    },
    '2601.14691': {
        'quotes': [
            "Judges accept CoT assertions without verifying against the action trace.",
            "An agent can improve perceived performance by optimizing how its CoT is worded."
        ],
        'file': '101_gaming_the_judge_cot_manipulation.md'
    },
    '2601.13392': {
        'quotes': [
            "High accuracy on seen problems does not imply genuine reasoning capability.",
            "Despite achieving 100% accuracy on L₁, all models fail on L₂ under direct prompting."
        ],
        'file': '102_beyond_memorization_dfa_unseen.md'
    },
    '2601.15158': {
        'quotes': [
            "We assume Policy Gradient is applied to a base model which has already acquired minimal task proficiency.",
            "Excluding simple examples from post-training prevents the emergence of the reasoning algorithm altogether."
        ],
        'file': '103_outcome_based_rl_reasoning.md'
    },
    '2601.14658': {
        'quotes': [
            "Models are systematically misled by tokenizer properties — they 'believe' they have successfully executed substitutions.",
            "Increasing model capacity offers no systematic solution to this fundamental misalignment."
        ],
        'file': '104_tokenizer_betrays_reasoning.md'
    },
    '2601.15165': {
        'quotes': [
            "Less flexibility unlocks better reasoning potential.",
            "The process acts less as navigation at a fork, more as retrospective alignment to a pre-generated conclusion."
        ],
        'file': '105_flexibility_trap_diffusion_llms.md'
    },
    '2601.19847': {
        'quotes': [
            "Token-level neuron activations are predictive of the final correctness of LLM reasoning.",
            "Correct reasoning is supported by structured activation patterns formed by a small subset of neurons."
        ],
        'file': '106_reasoning_critical_neurons_activation_steering.md'
    },
    '2601.19773': {
        'quotes': [
            "Strong diagnostic reasoning does not guarantee effective information collection.",
            "Model scaling mainly improves SR while yielding marginal gains in ICR."
        ],
        'file': '107_strong_reasoning_isnt_enough.md'
    },
    '2601.21618': {
        'quotes': [
            "LLMs do not implement algorithms; they approximate them, and the approximation is argument-dependent.",
            "If errors vary with semantic content, the model is pattern-matching one."
        ],
        'file': '108_whatcounts_semantic_content.md'
    },
    '2601.21183': {
        'quotes': [
            "Sycophantic anchors are highly distinguishable (84.6%) while correct anchors are difficult to distinguish (64.0%).",
            "This asymmetry suggests sycophancy leaves a distinctive 'activation signature' that truthful reasoning does not."
        ],
        'file': '109_sycophantic_anchors.md'
    },
    # 110-119
    '2601.16644': {
        'quotes': [
            "Factual accuracy and deference resistance arise from related but distinct mechanisms.",
            "Sycophancy-related heads appear to focus on disagreement and sycophantic expression."
        ],
        'file': '110_sycophancy_hides_linearly.md'
    },
    '2601.11061': {
        'quotes': [
            "This divergence constitutes a Perplexity Paradox.",
            "RLVR acts as a retrieval mechanism for data already memorized during pretraining."
        ],
        'file': '111_spurious_rewards_paradox.md'
    },
    '2601.10679': {
        'quotes': [
            "HRM does not 'reason' in the commonsense way — it resembles 'guessing' more than 'reasoning'.",
            "Recursion serves as a way of scaling 'guessing' attempts for a plausible latent state."
        ],
        'file': '112_reasoning_or_guessing_hrm.md'
    },
    '2601.07422': {
        'quotes': [
            "Truthfulness cues arise from two distinct pathways: Question-Anchored and Answer-Anchored.",
            "Q-anchored encoding predominates for well-established facts within the knowledge boundary."
        ],
        'file': '113_two_pathways_truthfulness.md'
    },
    '2601.22035': {
        'quotes': [
            "AR models must commit to answers before generating intermediate reasoning — forcing premature commitment.",
            "MDLMs achieve order robustness by stabilizing simpler tokens earlier in the diffusion process."
        ],
        'file': '114_thinking_out_of_order.md'
    },
    '2601.21214': {
        'quotes': [
            "78.6% of errors stem from recalling wrong names.",
            "Correct and erroneous trajectories coexist; ep heads amplify spurious signals."
        ],
        'file': '115_scaling_reasoning_hop_ep_heads.md'
    },
    '2601.18352': {
        'quotes': [
            "Larger models can exhibit inverse scaling — they perform worse when requiring suppression of pre-trained associations.",
            "Code grounding strips symbols of their semantic associations."
        ],
        'file': '116_code_over_words_semantic_inertia.md'
    },
    '2311.07590': {
        'quotes': [
            "This is the first demonstration of LLMs trained to be helpful, harmless, and honest, strategically deceiving users.",
            "The model consistently hides the genuine reasons behind its trading decision."
        ],
        'file': '117_strategic_deception_gpt4.md'
    },
    '2502.03407': {
        'quotes': [
            "Monitoring outputs alone is insufficient — the AI might produce benign outputs while misaligned internally.",
            "Current performance is insufficient as a robust defence against deception."
        ],
        'file': '118_detecting_deception_linear_probes.md'
    },
    '2308.03958': {
        'quotes': [
            "Both model scaling and instruction tuning significantly increase sycophancy.",
            "Despite knowing statements are wrong, language models will agree if the user does."
        ],
        'file': '119_sycophancy_scales_wei.md'
    },
    # 120-129
    '2506.21561': {
        'quotes': [
            "Capability advances alone do not resolve fundamental veracity detection challenges.",
            "GPT-4.1 displays asymmetric performance with 98% truth accuracy but 16% deception accuracy."
        ],
        'file': '120_truth_bias_sycophancy_reasoning.md'
    },
    '2510.22977': {
        'quotes': [
            "This effect transcends overfitting — training on non-tool tasks still amplifies tool hallucination.",
            "Enabling 'thinking' mode leads to a consistent rise in hallucination."
        ],
        'file': '121_reasoning_trap_tool_hallucination.md'
    },
    '2601.05905': {
        'quotes': [
            "Even facts answered with perfect self-consistency can rapidly collapse under mild interference.",
            "Point-wise confidence is superficial, failing to reflect true belief state."
        ],
        'file': '122_illusions_of_confidence_ncb.md'
    },
    '2410.11684': {
        'quotes': [
            "Illusions of causality occur when people develop causal beliefs with no supporting evidence.",
            "The imitation of erroneous beliefs increases risk of causal misinterpretations."
        ],
        'file': '123_causal_illusions_llms.md'
    },
    '2506.09250': {
        'quotes': [
            "The question isn't whether LRMs can reason, but whether our evaluations can distinguish reasoning from typing.",
            "River Crossing benchmarks include mathematically impossible instances for N≥6."
        ],
        'file': '124_illusion_of_illusion_rebuttal.md'
    },
    '2406.02061': {
        'quotes': [
            "Strong fluctuations on natural, structure-preserving variations point to severe lack of robustness.",
            "Models with insufficient generalization are inherently unsafe."
        ],
        'file': '125_alice_in_wonderland.md'
    },
    '2304.11082': {
        'quotes': [
            "For any behavior with finite probability, there exist prompts that can trigger it.",
            "Any alignment process that attenuates an undesired behavior but does not remove it is not safe."
        ],
        'file': '126_fundamental_limitations_alignment.md'
    },
    '2310.13548': {
        'quotes': [
            "Matching a user's views is one of the most predictive features of human preference judgments.",
            "Claude 1.3 wrongly admits mistakes on 98% of questions."
        ],
        'file': '127_towards_understanding_sycophancy.md'
    },
    '2501.13381': {
        'quotes': [
            "Even simple problems can be influenced by peer pressure.",
            "LLMs may adopt majority opinions despite knowing correct answers."
        ],
        'file': '128_conformity_of_llms.md'
    },
    '2412.21187': {
        'quotes': [
            "On average, o1-like models consumed 1,953% more tokens than conventional models.",
            "In more than 92% of cases, the initial round of solutions produces the correct answer."
        ],
        'file': '129_overthinking_o1_llms.md'
    },
    # 130-139
    '2501.18585': {
        'quotes': [
            "On average, o1-like LLMs consume 225% more tokens in incorrect responses.",
            "Over 70% of incorrect responses contain at least one correct thought."
        ],
        'file': '130_underthinking_o1_llms.md'
    },
    '2403.04121': {
        'quotes': [
            "LLMs are perhaps best seen as giant non-veridical memories akin to an external System 1.",
            "When we obfuscated names, GPT4's performance plummeted precipitously."
        ],
        'file': '131_can_llms_reason_and_plan.md'
    },
    '2504.09762': {
        'quotes': [
            "While a human may say 'aha' to indicate a sudden internal state change, this is unwarranted for models.",
            "Post-training LRMs can be seen as iteratively compiling reasoning into retrieval."
        ],
        'file': '132_stop_anthropomorphizing_tokens.md'
    },
    '2510.07364': {
        'quotes': [
            "Base models already possess the fundamental reasoning capabilities; thinking models learn when to deploy them.",
            "Our hybrid model recovers up to 91% of the performance gap while steering only 12% of tokens."
        ],
        'file': '133_base_models_know_how_to_reason.md'
    },
    '2410.09695': {
        'quotes': [
            "ICL performance resembles implementing a function within the pretraining hypothesis space.",
            "Llama-3-8B may not learn new tasks through ICL, but can solve tasks through retrieval."
        ],
        'file': '134_can_icl_generalize_ood.md'
    },
    '2502.03373': {
        'quotes': [
            "Core abilities like error correction are inherently present in base models.",
            "We hypothesize that base models may already possess certain latent 'long CoT' capabilities."
        ],
        'file': '135_demystifying_long_cot.md'
    },
    '2405.04776': {
        'quotes': [
            "CoT's performance improvements do not stem from learning general algorithmic procedures.",
            "Those improvements quickly deteriorate as query size grows past the examples shown."
        ],
        'file': '136_chain_of_thoughtlessness.md'
    },
    '2502.04667': {
        'quotes': [
            "Training without CoT fails to generalize — OOD test samples involve unseen reasoning patterns.",
            "CoT-trained models resolve intermediate results at shallower layers."
        ],
        'file': '137_mechanisms_explicit_cot_training.md'
    },
    '2508.15842': {
        'quotes': [
            "On benchmarks where LLMs achieve low accuracy, they often report high self-confidence.",
            "Tokens such as 'guess', 'stuck', 'hard' reduce accuracy odds by up to 40%."
        ],
        'file': '138_lexical_hints_accuracy_cot.md'
    },
    '2512.24601': {
        'quotes': [
            "Frontier reasoning models exhibit context rot — quality degrades steeply as prompts get longer.",
            "Long prompts should be treated as part of the environment the LLM interacts with symbolically."
        ],
        'file': '139_recursive_language_models.md'
    },
    # 140-149
    '2601.21894': {
        'quotes': [
            "Not all code is equal — improvements depend strongly on structural complexity.",
            "Previously reported gains may stem less from diversity and more from incidental exposure to particular properties."
        ],
        'file': '140_not_all_code_is_equal.md'
    },
    '2601.21909': {
        'quotes': [
            "CoT-SFT encourages imitation of complete reasoning trajectories.",
            "Human problem-solving exhibits precisely the property we seek — robust generalization from limited experience."
        ],
        'file': '141_meta_thought_to_execution.md'
    },
    '2601.21414': {
        'quotes': [
            "Output length is merely a symptom of the model's cognitive configuration, not the root cause.",
            "Linear interpolation yields a convex, monotonic Pareto frontier."
        ],
        'file': '142_system_1_2_synergy_interpolation.md'
    },
    '2405.15071': {
        'quotes': [
            "Transformers can learn implicit reasoning, but only through grokking — extended training far beyond overfitting.",
            "When faced with OOD examples, transformers fail to systematically generalize for composition."
        ],
        'file': '143_grokked_transformers_implicit_reasoners.md'
    },
    '2407.01687': {
        'quotes': [
            "CoT prompting performance reflects both memorization and a probabilistic version of genuine reasoning.",
            "Varying output's probability of occurrence shifts accuracy from 26% to 70%."
        ],
        'file': '144_deciphering_cot_probability_memorization.md'
    },
    '2409.12917': {
        'quotes': [
            "Self-correction has consistently been found to be largely ineffective in modern LLMs.",
            "Training via SFT falls prey to distribution mismatch or behavior collapse."
        ],
        'file': '145_score_self_correction_rl.md'
    },
    '2304.15004': {
        'quotes': [
            "Emergent abilities appear due to the researcher's choice of metric rather than fundamental changes in model behavior.",
            "The researcher can choose a metric to create or ablate an emergent ability."
        ],
        'file': '146_emergent_abilities_mirage.md'
    },
    '2202.07206': {
        'quotes': [
            "Models are more accurate on instances whose terms are more prevalent — above 70% more accurate on top 10% vs bottom 10%.",
            "High performance on reasoning benchmarks may reflect dataset overlap rather than reasoning capability."
        ],
        'file': '147_pretraining_term_frequencies.md'
    },
    '2305.04388': {
        'quotes': [
            "CoT explanations can be heavily influenced by adding biasing features which models fail to mention.",
            "15% of unfaithful explanations have no obvious errors."
        ],
        'file': '148_language_models_dont_say_what_think.md'
    },
    '2309.12288': {
        'quotes': [
            "If a model is trained on 'A is B', it will not automatically generalize to 'B is A'.",
            "The gradient update is myopic — depends on logits over B given A, not on predicting A from B."
        ],
        'file': '149_reversal_curse.md'
    },
    # 150-159
    '2305.15771': {
        'quotes': [
            "LLMs' ability to generate executable plans autonomously is rather limited — best model ~12% success.",
            "LLM-generated plans can improve the search process for underlying sound planners."
        ],
        'file': '150_planning_abilities_llms.md'
    },
    '2201.11903': {
        'quotes': [
            "We explore how generating a chain of thought significantly improves ability to perform complex reasoning.",
            "Successful chain of thought reasoning is an emergent property of model scale — around 100B parameters."
        ],
        'file': '151_chain_of_thought_prompting_original.md'
    },
    '2310.07923': {
        'quotes': [
            "The answer is yes, but the amount of increase depends crucially on the amount of intermediate generation.",
            "Running a polynomial number of forward passes with a large transformer is likely intractable in practice."
        ],
        'file': '152_expressive_power_transformers_cot.md'
    },
    '2206.10498': {
        'quotes': [
            "Most claims about LLM planning capabilities are based on common sense tasks — hard to tell if LLMs are planning or retrieving.",
            "On many critical capabilities, LLM performance falls quite short, even with SOTA models."
        ],
        'file': '153_planbench.md'
    },
    '2205.11916': {
        'quotes': [
            "LLMs are decent zero-shot reasoners by simply adding 'Let's think step by step'.",
            "The versatility of this single prompt hints at untapped fundamental zero-shot capabilities."
        ],
        'file': '154_zero_shot_cot.md'
    },
    '2203.11171': {
        'quotes': [
            "A complex reasoning problem typically admits multiple different ways of thinking leading to its unique correct answer.",
            "Self-consistency boosts chain-of-thought prompting with a striking margin."
        ],
        'file': '155_self_consistency.md'
    },
    '2409.13373': {
        'quotes': [
            "While o1's performance is a quantum improvement, it is still far from saturating the benchmark.",
            "When o1 gives an incorrect answer, it sometimes provides creative, nonsensical justification — from hallucinating to gaslighting!"
        ],
        'file': '156_llms_still_cant_plan_lrms.md'
    },
    '2406.11050': {
        'quotes': [
            "Most LLMs still struggle with logical reasoning — success largely depends on recognizing superficial patterns.",
            "By reconstructing these algorithms, we are able to correctly predict 91% of failure cases."
        ],
        'file': '157_token_bias_not_genuine_reasoners.md'
    },
    '2305.14699': {
        'quotes': [
            "By reconstructing these algorithms, we are able to correctly predict 91 percent of failure cases.",
            "Our work provides a new foundation for understanding neural networks that fail to solve tasks they are trained for."
        ],
        'file': '158_transformers_recursive_problems.md'
    },
    '2108.12409': {
        'quotes': [
            "Models trained on sequences of length 1024 can extrapolate to length 2048 with the same perplexity.",
            "ALiBi is more efficient than sinusoidal position embeddings while enabling extrapolation."
        ],
        'file': '159_alibi_length_extrapolation.md'
    },
}

def get_bin_folder(paper_num: int) -> str:
    """Get the bin folder for a paper number."""
    start = (paper_num // 10) * 10
    end = start + 9
    return f"{start:02d}-{end:02d}"

def build_quotes_lookup() -> dict[str, dict]:
    """Build a lookup from arXiv ID to quotes and analysis URL."""
    base_url = "https://github.com/Proteusiq/unthinking/blob/main/analysis/explored"
    lookup = {}
    
    for arxiv_id, data in QUOTES.items():
        filename = data['file']
        paper_num = int(filename.split('_')[0])
        bin_folder = get_bin_folder(paper_num)
        
        lookup[arxiv_id] = {
            'quotes': data['quotes'],
            'url': f"{base_url}/{bin_folder}/{filename}"
        }
    
    return lookup


def update_data_js(input_path: Path, output_path: Path) -> tuple[int, int]:
    """
    Update data.js by adding keyQuotes and analysisUrl to nodes.
    
    Returns (updated_count, skipped_count)
    """
    content = input_path.read_text()
    lookup = build_quotes_lookup()
    
    updated = 0
    skipped = 0
    
    # Process each paper ID in the lookup
    for arxiv_id, quote_data in lookup.items():
        # Pattern to find a node with this ID that doesn't already have keyQuotes
        # We look for the closing of keyEvidence array and add after it
        
        # First check if this ID exists in the file
        if f"id: '{arxiv_id}'" not in content:
            skipped += 1
            continue
        
        # Check if already has keyQuotes
        # Find the node block for this ID
        id_pattern = f"id: '{arxiv_id}'"
        id_pos = content.find(id_pattern)
        
        if id_pos == -1:
            skipped += 1
            continue
        
        # Find the end of this node (next '},' or the end of nodes array)
        # We'll look for keyEvidence: [ ... ], and add after it
        
        # Find where keyEvidence ends for this node
        # Start from id_pos and find keyEvidence
        search_start = id_pos
        key_evidence_pos = content.find('keyEvidence:', search_start)
        
        if key_evidence_pos == -1 or key_evidence_pos > search_start + 2000:
            # No keyEvidence found nearby, skip
            skipped += 1
            continue
        
        # Check if keyQuotes already exists for this node
        next_node_pos = content.find("id: '", id_pos + 10)
        if next_node_pos == -1:
            next_node_pos = len(content)
        
        node_block = content[id_pos:next_node_pos]
        if 'keyQuotes:' in node_block:
            # Already has quotes
            skipped += 1
            continue
        
        # Find the closing bracket of keyEvidence array
        bracket_count = 0
        in_array = False
        end_pos = key_evidence_pos
        
        for i, char in enumerate(content[key_evidence_pos:key_evidence_pos + 1000]):
            if char == '[':
                in_array = True
                bracket_count += 1
            elif char == ']':
                bracket_count -= 1
                if bracket_count == 0 and in_array:
                    end_pos = key_evidence_pos + i + 1
                    break
        
        if end_pos == key_evidence_pos:
            skipped += 1
            continue
        
        # Check what comes after the closing bracket
        after_bracket = content[end_pos:end_pos + 10].strip()
        
        # Format the new fields
        quotes_json = json.dumps(quote_data['quotes'], indent=6)
        # Fix indentation to match JS style
        quotes_lines = quotes_json.split('\n')
        if len(quotes_lines) > 1:
            quotes_formatted = quotes_lines[0] + '\n' + '\n'.join('      ' + line.lstrip() for line in quotes_lines[1:])
        else:
            quotes_formatted = quotes_json
        
        new_fields = f""",
      keyQuotes: {quotes_formatted},
      analysisUrl: '{quote_data['url']}'"""
        
        # Insert after the keyEvidence closing bracket
        content = content[:end_pos] + new_fields + content[end_pos:]
        updated += 1
    
    output_path.write_text(content)
    return updated, skipped


def main():
    """Update data.js with quotes from all analyzed papers."""
    data_js_path = Path(__file__).parent.parent / "docs" / "js" / "data.js"
    
    if not data_js_path.exists():
        print(f"Error: {data_js_path} not found")
        return
    
    print(f"Processing {data_js_path}")
    print(f"Total quotes available: {len(QUOTES)}")
    
    updated, skipped = update_data_js(data_js_path, data_js_path)
    
    print(f"\nResults:")
    print(f"  Updated: {updated}")
    print(f"  Skipped: {skipped} (already have quotes or not in data.js)")
    print(f"\nDone!")


if __name__ == "__main__":
    main()
