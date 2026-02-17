// Paper nodes - auto-generated from paper analysis
// Split from data.js for maintainability
window.paperNodes = [
  {
    id: '2305.18654',
    title: 'Faith and Fate: Limits of Transformers on Compositionality',
    shortTitle: 'Faith & Fate',
    date: 'May 2023',
    stance: 'supports',
    cluster: 'compositional',
    coreArgument:
      'Transformers solve compositional tasks via linearized subgraph matching, not genuine reasoning. Error propagation is exponential.',
    keyEvidence: [
      'ID ~100%, OOD ~0%',
      'Exponential error accumulation',
      "Grokking (60 epochs) doesn't help OOD",
    ],
    keyQuotes: [
      "Models' success can be attributed, in part, to their exposure to training examples sub-graphs that involve the same computations required for solving test examples.",
      'The probability of arriving at a wrong answer increases exponentially with the number of reasoning steps.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/00-09/00_faith_and_fate.md',
  },
  {
    id: '2506.06941',
    title:
      'The Illusion of Thinking: Understanding the Strengths and Limitations of Reasoning Models',
    shortTitle: 'Illusion of Thinking',
    date: 'Jun 2025',
    stance: 'supports',
    cluster: 'complexity',
    coreArgument:
      'LRMs face complete accuracy collapse beyond certain complexity thresholds. Three distinct performance regimes exist.',
    keyEvidence: [
      'Collapse at ~8-10 disks (Hanoi)',
      'Token usage decreases at collapse',
      'All LRMs fail at high complexity',
    ],
    keyQuotes: [
      'We observe a consistent pattern across all puzzles: performance drops sharply after a certain complexity threshold, rather than degrading gradually.',
      'The models produce fewer tokens when they fail than when they succeed, suggesting they are not even attempting deeper reasoning.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/00-09/03_illusion_of_thinking.md',
  },
  {
    id: '2410.05229',
    title: 'GSM-Symbolic: Understanding the Limitations of Mathematical Reasoning in LLMs',
    shortTitle: 'GSM-Symbolic',
    date: 'Oct 2024',
    stance: 'supports',
    cluster: 'faithfulness',
    coreArgument:
      'LLMs do not perform genuine logical reasoning — they replicate reasoning steps from training data via pattern matching.',
    keyEvidence: [
      'Up to 65% drop from irrelevant info (NoOp)',
      'High variance across equivalent questions',
      'Few-shot cannot recover',
    ],
    keyQuotes: [
      'LLMs exhibit significant performance variability when responding to different instantiations of the same question.',
      'Adding seemingly relevant but ultimately inconsequential statements to problems can decrease performance by up to 65%.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/00-09/01_gsm_symbolic.md',
  },
  {
    id: '2506.18880',
    title: 'OMEGA: Can LLMs Reason Outside the Box in Math?',
    shortTitle: 'OMEGA',
    date: 'Jun 2025',
    stance: 'supports',
    cluster: 'compositional',
    coreArgument:
      'RL improves exploratory generalization but compositional and transformative generalization remain near-zero.',
    keyEvidence: [
      '>69% isolated skills → near-0% composed',
      '0% transformative generalization',
      '38% correct→incorrect from overthinking',
    ],
    keyQuotes: [
      'Unlike humans who fluidly integrate mastered skills, RL models trained on isolated skills struggle at compositional generalization.',
      'These findings underscore crucial gaps between current LLM reasoning capabilities and human mathematicians.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/30-39/31_omega_llm_reasoning_outside_box.md',
  },
  {
    id: '2512.07783',
    title: 'On the Interplay of Pre-Training, Mid-Training, and RL',
    shortTitle: 'Interplay',
    date: 'Dec 2025',
    stance: 'balanced',
    cluster: 'mechanism',
    coreArgument:
      "RL cannot synthesize capabilities from void; it requires latent 'seeds' to amplify. 0% exposure = RL fails; ≥1% = success.",
    keyEvidence: [
      '0% exposure → RL FAILS',
      '≥1% exposure → +60% pass@128',
      "RL only helps at 'edge of competence'",
    ],
    keyQuotes: [
      "RL cannot synthesize capabilities from a void; it requires latent 'seeds' to amplify.",
      'RL produces true capability gains only when pre-training leaves sufficient headroom.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/10-19/15_interplay_pretraining_rl.md',
  },
  {
    id: '2501.12948',
    title: 'DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via RL',
    shortTitle: 'DeepSeek-R1',
    date: 'Jan 2025',
    stance: 'challenges',
    cluster: 'emergence',
    coreArgument:
      "Reasoning capabilities can be incentivized through pure RL without human-labeled reasoning data. 'Aha moment' emerges spontaneously.",
    keyEvidence: [
      'AIME 79.8% (vs o1 79.2%)',
      'Emergent self-reflection behavior',
      '7B distilled > 32B QwQ',
    ],
    keyQuotes: [
      "Wait, wait. Wait. That's an aha moment I can flag here.",
      'Rather than explicitly teaching the model how to solve a problem, we simply provide it with the right incentives.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/00-09/05_deepseek_r1.md',
  },
  {
    id: '2501.19393',
    title: 's1: Simple test-time scaling',
    shortTitle: 's1',
    date: 'Jan 2025',
    stance: 'challenges',
    cluster: 'mechanism',
    coreArgument:
      "Test-time scaling achievable with only 1K samples. Reasoning pre-exists in base models; SFT surfaces it, doesn't create it.",
    keyEvidence: [
      '26.7% → 50% AIME with 1K samples',
      'Budget forcing adds +7%',
      "1K samples can't TEACH AIME math",
    ],
    keyQuotes: [
      'Training on only 1,000 samples with next-token prediction... leads to a strong reasoning model.',
      "The capability was 'latent' \u2014 1K samples couldn't teach all of AIME-level math.",
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/00-09/07_s1_simple_scaling.md',
  },
  {
    id: '2307.13702',
    title: 'Measuring Faithfulness in Chain-of-Thought Reasoning',
    shortTitle: 'Measuring Faithfulness',
    date: 'Jul 2023',
    stance: 'supports',
    cluster: 'faithfulness',
    coreArgument:
      'CoT faithfulness varies dramatically by task. Larger models = less faithful. CoT can be post-hoc rationalization.',
    keyEvidence: [
      'ARC Easy: 0.02 AOC (model ignores CoT)',
      'Larger models = LESS faithful',
      "Filler tokens don't help",
    ],
    keyQuotes: [
      'As models become larger and more capable, they produce less faithful reasoning on most tasks we study.',
      'Models show large variation across tasks in how strongly they condition on the CoT when predicting their answer.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/00-09/08_measuring_faithfulness.md',
  },
  {
    id: '2601.14456',
    title: 'On the Generalization Gap in LLM Planning',
    shortTitle: 'Planning Gap',
    date: 'Jan 2026',
    stance: 'supports',
    cluster: 'compositional',
    coreArgument:
      "Fine-tuned LLMs achieve high in-domain (82.9%) but 0% on unseen domains. Verifier-reward RL doesn't improve OOD.",
    keyEvidence: [
      '82.9% ID → 0% OOD',
      '11.5pp drop from symbol anonymization',
      'Models loop without progress',
    ],
    keyQuotes: [
      'Despite achieving 82.9% valid plan rate in-domain, the model achieves 0% on unseen domains.',
      'The model tends to get caught in loops or to wander without making progress toward the goal.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/20-29/29_planning_generalization_gap.md',
  },
  {
    id: '2601.00514',
    title: 'The Illusion of Insight in Reasoning Models',
    shortTitle: 'Illusion of Insight',
    date: 'Jan 2026',
    stance: 'supports',
    cluster: 'faithfulness',
    coreArgument:
      "'Aha!' moments are rare (~2-6%), don't improve with training, and seldom help accuracy. Shifts are unstable inference, not insight.",
    keyEvidence: [
      '~2-6% shift prevalence',
      "Shifts don't increase with training",
      'Correlate with uncertainty, not insight',
    ],
    keyQuotes: [
      'Reasoning shifts are rare, do not become more frequent with training, and seldom improve accuracy.',
      'Mid-reasoning shifts are symptoms of unstable inference behavior rather than self-correction.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/10-19/17_illusion_of_insight.md',
  },
  {
    id: '2507.07313',
    title: 'Frontier LLMs Still Struggle with Simple Reasoning Tasks',
    shortTitle: 'Frontier Struggles',
    date: 'Jul 2025',
    stance: 'supports',
    cluster: 'complexity',
    coreArgument:
      "Making problems easier can make models perform worse. 'Reasoning delirium' — models apply memorized solutions to wrong problems.",
    keyEvidence: [
      'GPT-4o: 75%→20% on unpuzzles',
      'R1 0% on character counting',
      'Every model better on context-shifted',
    ],
    keyQuotes: [
      'Decreasing difficulty can also lead to much worse performance.',
      "A key failure mode we observe is 'reasoning delirium' \u2014 models apply memorized solutions to wrong problems.",
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/20-29/20_frontier_llms_still_struggle.md',
  },
  {
    id: '2510.18254',
    title: 'Illusions of Reflection',
    shortTitle: 'Illusions of Reflection',
    date: 'Oct 2025',
    stance: 'supports',
    cluster: 'faithfulness',
    coreArgument:
      "LLM reflection repeats the same failure 85% of time. Reasoning models show no advantage. 'Fluent self-critique without correction.'",
    keyEvidence: [
      '85% same-failure repeat rate',
      'Reasoning models worse (0.036 vs 0.111)',
      'Just retrying works as well',
    ],
    keyQuotes: [
      "The second attempt frequently repeats the same violation \u2014 'corrective gains' arise largely from chance.",
      'Fluent self-critique without correction.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/20-29/21_illusions_of_reflection.md',
  },
  {
    id: '2402.10200',
    title: 'Chain-of-Thought Reasoning Without Prompting',
    shortTitle: 'CoT Without Prompting',
    date: 'Feb 2024',
    stance: 'challenges',
    cluster: 'mechanism',
    coreArgument:
      'CoT reasoning paths exist inherently in pre-trained LLMs, hidden by greedy decoding. Confidence correlates with reasoning presence.',
    keyEvidence: [
      'Top-k alternatives reveal CoT',
      '10-20%+ improvement over greedy',
      'Higher confidence = CoT path',
    ],
    keyQuotes: [
      'CoT reasoning paths can be elicited from pre-trained LLMs by simply altering the decoding process.',
      "The presence of a CoT in the decoding path correlates with a higher confidence in the model's decoded answer.",
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/00-09/02_cot_without_prompting.md',
  },
  {
    id: '2508.01191',
    title: 'Is Chain-of-Thought Reasoning a Mirage?',
    shortTitle: 'CoT Mirage',
    date: 'Aug 2025',
    stance: 'supports',
    cluster: 'compositional',
    coreArgument:
      "CoT reasoning is 'brittle mirage' beyond training distribution. ID=100%, OOD=0%. Three failure dimensions: task, length, format.",
    keyEvidence: [
      'ID: 100%, OOD: 0%',
      'Correct reasoning + wrong answer',
      'Small SFT fixes it (data coverage)',
    ],
    keyQuotes: [
      'CoT reasoning is a brittle mirage when it is pushed beyond training distributions.',
      'Models generate fluent yet logically inconsistent reasoning steps.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/00-09/06_cot_mirage.md',
  },
  {
    id: '2505.05410',
    title: "Reasoning Models Don't Always Say What They Think",
    shortTitle: "Don't Say What They Think",
    date: 'May 2025',
    stance: 'supports',
    cluster: 'faithfulness',
    coreArgument:
      'CoT faithfulness is low even in reasoning models (25-39%). Models hide problematic reasoning more. RL plateaus without saturation.',
    keyEvidence: [
      'Claude 3.7: ~25% faithful',
      'Misaligned hints: 20-29% verbalized',
      'Reward hacks: >99% use, <2% verbalized',
    ],
    keyQuotes: [
      'CoTs of reasoning models often lack faithfulness and can conceal misalignment.',
      'Models learn to exploit reward hacks on all 6 RL environments... on >99% of examples.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/10-19/10_reasoning_models_dont_say.md',
  },
  {
    id: '2507.17699',
    title: "Thinking Isn't an Illusion: Tool Augmentations",
    shortTitle: "Thinking Isn't Illusion",
    date: 'Jul 2025',
    stance: 'challenges',
    cluster: 'tools',
    coreArgument:
      'Tool augmentation reverses collapse. Failure is execution limit, not reasoning limit. LRMs outperform LLMs with tool access.',
    keyEvidence: [
      'Hanoi: 0%→100% with PoT',
      'River Crossing: 80% with tools',
      'Checker Jumping still fails',
    ],
    keyQuotes: [
      'With proper tool use, LRMs consistently outperform their non-reasoning counterparts across all levels of task complexity.',
      'The underperformance of LRMs on hard tasks may not reflect a fundamental reasoning deficiency, but rather an artifact of the limited output window.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/00-09/04_thinking_isnt_illusion.md',
  },
  {
    id: '2506.18957',
    title: 'Comment: Reframing as Agentic Gap',
    shortTitle: 'Agentic Gap',
    date: 'Jun 2025',
    stance: 'challenges',
    cluster: 'tools',
    coreArgument:
      "Models fail at execution within restrictive interface, not reasoning. With agentic tools, models solve problems 'far beyond the reasoning cliff.'",
    keyEvidence: [
      'Execution vs reasoning distinction',
      'Tool use reverses collapse',
      'Missing cognitive baselines',
    ],
    keyQuotes: [
      'The illusion of thinking attributed to LRMs is less a reasoning deficit and more a consequence of an otherwise capable mind lacking the tools for action.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/10-19/11_comment_agentic_gap.md',
  },
  {
    id: '2511.21591',
    title: 'On the Limits of Innate Planning',
    shortTitle: 'Limits of Planning',
    date: 'Nov 2025',
    stance: 'supports',
    cluster: 'complexity',
    coreArgument:
      'External move validator = 0% success. Even with execution offloaded, models fail. Planning is the bottleneck, not execution.',
    keyEvidence: [
      '0% success with move validator',
      'GPT-5-Thinking loops 100%',
      'Refutes Agentic Gap argument',
    ],
    keyQuotes: [
      'Despite this level of assistance, none of the models solve any puzzles in this setting.',
      'GPT-5-Thinking looped in 100% of trials even when presented only with valid moves.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/90-99/93_limits_innate_planning.md',
  },
  {
    id: '2507.01231',
    title: 'Rethinking the Illusion of Thinking',
    shortTitle: 'Rethinking Illusion',
    date: 'Jul 2025',
    stance: 'balanced',
    cluster: 'complexity',
    coreArgument:
      "River Crossing tested unsolvable configs; Hanoi ~8 disk limit is real. Agentic dialogue makes Hanoi worse. LRMs are 'stochastic searchers.'",
    keyEvidence: [
      '~8 disk limit CONFIRMED',
      "Stepwise prompting doesn't fix Hanoi",
      'LRMs solve 200-step solvable problems',
    ],
    keyQuotes: [
      "Today's LRMs are stochastic, RL-tuned searchers in a discrete state space we barely understand.",
      'LRMs still stumble when complexity rises moderately (around 8 disks).',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/30-39/37_rethinking_illusion_of_thinking.md',
  },
  {
    id: '2509.17380',
    title: 'Correlation or Causation in CoT Reasoning',
    shortTitle: 'Correlation or Causation',
    date: 'Sep 2025',
    stance: 'balanced',
    cluster: 'faithfulness',
    coreArgument:
      "Only 30% of LLM causal chains are ideal. 47% show CoT doesn't affect answers. RLVR improves to 63% but not 100%.",
    keyEvidence: [
      '30% ideal SCM Type I',
      "47% CoT doesn't affect answers",
      "Distillation doesn't improve causality",
    ],
    keyQuotes: [
      'LLMs suffer from critical reasoning issues such as unfaithfulness, bias, and inconsistency.',
      'Correct CoTs may lead to incorrect answers, and incorrect CoTs to correct answers.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/10-19/12_correlation_or_causation.md',
  },
  {
    id: '2412.13013',
    title: 'Emergence of Strategic Reasoning in LRMs',
    shortTitle: 'Strategic Reasoning',
    date: 'Dec 2024',
    stance: 'challenges',
    cluster: 'emergence',
    coreArgument:
      "GPT-o1 achieves τ=4.42 (4+ reasoning steps), exceeding human strategic reasoning (τ≈1). 'Most fundamental transition' documented.",
    keyEvidence: ['τ=4.42 for GPT-o1', 'Exceeds human (τ≈1)', 'Performance drops for p=4/3 (OOD)'],
    keyQuotes: [
      'Standard LLMs consistently exhibited worse strategic reasoning than typical human subjects.',
      'LLMs are vastly trained on pBCGs which involve iterating downward.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/10-19/13_emergence_strategic_reasoning.md',
  },
  {
    id: '2503.08679',
    title: 'CoT In The Wild Is Not Always Faithful',
    shortTitle: 'CoT In The Wild',
    date: 'Mar 2025',
    stance: 'supports',
    cluster: 'faithfulness',
    coreArgument:
      "Unfaithfulness occurs on natural, unbiased prompts. Models answer YES to both 'Is X>Y?' and 'Is Y>X?' with coherent arguments.",
    keyEvidence: [
      'GPT-4o-mini: 13% unfaithful',
      'Sonnet 3.7 (thinking): 0.04%',
      'Logically contradictory answers',
    ],
    keyQuotes: [
      'We go further and show that unfaithful CoT can also occur on realistic prompts with no artificial bias.',
      'Models sometimes produce superficially coherent arguments to justify systematically answering Yes to both questions.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/10-19/14_cot_wild_not_faithful.md',
  },
  {
    id: '2510.22371',
    title: "Reasoning Models Reason Well, Until They Don't",
    shortTitle: "Until They Don't",
    date: 'Oct 2025',
    stance: 'balanced',
    cluster: 'complexity',
    coreArgument:
      'Abrupt collapse at L~64-300. NLGraph is trivially easy (L<2). Even o3 fails at L=800. Token usage decreases at high complexity.',
    keyEvidence: [
      '99% on NLGraph (trivially easy)',
      '~0% at L=800',
      'Chain graphs fail at depth 1536',
    ],
    keyQuotes: [
      'The performance of LRMs drop abruptly at sufficient complexity and do not generalize.',
      'Token limits do not cause the drops in accuracy.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/10-19/16_reasoning_models_until_they_dont.md',
  },
  {
    id: '2509.12645',
    title: 'LLMs Imitate Logical Reasoning',
    shortTitle: 'Imitate Reasoning',
    date: 'Sep 2025',
    stance: 'supports',
    cluster: 'mechanism',
    coreArgument:
      'LLMs imitate reasoning via pattern matching. Neuro-symbolic approaches are 7-10x cheaper at higher accuracy.',
    keyEvidence: [
      '2023→2024 = hidden CoT',
      'Pattern matching mechanism',
      'Neuro-symbolic outperforms',
    ],
    keyQuotes: [
      'It appears that this innovative technique provided the capability for LLMs to imitate reasoning.',
      'LLMs are good at recognising nuance in language and converting problems to a machine interpretable format.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/10-19/18_llms_imitate_logical_reasoning.md',
  },
  {
    id: '2507.10624',
    title: 'Comprehension Without Competence',
    shortTitle: 'Comprehension Without Competence',
    date: 'Jul 2025',
    stance: 'supports',
    cluster: 'complexity',
    coreArgument:
      "'Split-brain': 95-100% step accuracy, 0% final accuracy at 10-digit multiplication. Scale won't help — architectural limit.",
    keyEvidence: [
      '95-100% step accuracy',
      '0% final at 10-digit',
      'Error accumulation proves limit',
    ],
    keyQuotes: [
      'LLMs function as powerful pattern completion engines, but lack the architectural scaffolding for principled, compositional reasoning.',
      'The model compares 9.11 with 9.9 not through arithmetic but by pattern-matching.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/10-19/19_comprehension_without_competence.md',
  },
  {
    id: '2509.09677',
    title: 'The Illusion of Diminishing Returns',
    shortTitle: 'Diminishing Returns',
    date: 'Sep 2025',
    stance: 'balanced',
    cluster: 'mechanism',
    coreArgument:
      'Self-conditioning: errors beget more errors. Opposite to humans. Thinking models fix this effect.',
    keyEvidence: [
      '0% errors: ~90% accuracy',
      '100% errors: ~40% accuracy',
      'Thinking models: 97% even with errors',
    ],
    keyQuotes: [
      'The self-conditioning effect \u2014 models become more likely to make mistakes when the context contains their errors.',
      'This is in contrast to humans, who typically improve at executing a task with practice.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/20-29/22_illusion_diminishing_returns.md',
  },
  {
    id: '2406.15992',
    title: 'Can LLM Graph Reasoning Generalize?',
    shortTitle: 'Graph Reasoning',
    date: 'Jun 2024',
    stance: 'supports',
    cluster: 'compositional',
    coreArgument:
      "'Pattern regurgitators' — EMNLP 2024. 0% strong recovery on reasoning patterns. 100% knowledge doesn't transfer.",
    keyEvidence: ['0% strong recovery', 'Pattern regurgitators', 'EMNLP 2024 Best Paper'],
    keyQuotes: [
      'Are LLMs graph reasoners or merely pattern regurgitators?',
      'LLMs might only memorize the reasoning pattern about specific tasks from training data.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/20-29/23_can_llm_graph_reasoning_generalize.md',
  },

  {
    id: '2601.03630',
    title: 'Reasoning Model Is Superior Judge',
    shortTitle: 'Superior Judge',
    date: 'Jan 2026',
    stance: 'balanced',
    cluster: 'emergence',
    coreArgument:
      'LRMs better at judgment accuracy but more susceptible to superficial biases (32pp drop on BiasBench).',
    keyEvidence: ['Better judgment accuracy', '32pp drop on BiasBench', 'Pattern matching metrics'],
    keyQuotes: [
      'LRM-as-a-Judge often systematically evaluates responses against metrics \u2014 responses designed to exploit these metrics can yield excessively high scores.',
      'Reasoning models are generally superior to non-reasoning models as judges, but remain vulnerable to biases.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/20-29/25_reasoning_model_superior_judge.md',
  },
  {
    id: '2506.17219',
    title: 'No Free Lunch: Internal Feedback for RL',
    shortTitle: 'No Free Lunch',
    date: 'Jun 2025',
    stance: 'supports',
    cluster: 'mechanism',
    coreArgument:
      'RLIF degrades reasoning (291→235 correct). Format improves, reasoning degrades. Transitional words suppressed 37%.',
    keyEvidence: [
      '291→235 correct answers',
      'Entropy minimization → shallow reasoning',
      "'but', 'wait' decrease 37%",
    ],
    keyQuotes: [
      'The number of total right answers decreases significantly when training continues (from 291 to 235).',
      'While entropy minimization mitigates underconfidence, it inevitably shifts toward overconfidence.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/20-29/26_no_free_lunch_internal_feedback.md',
  },
  {
    id: '2508.13678',
    title: 'Neuro-Symbolic AI for Reasoning Survey',
    shortTitle: 'Neuro-Symbolic Survey',
    date: 'Aug 2025',
    stance: 'supports',
    cluster: 'mechanism',
    coreArgument:
      "'LLMs cannot really reason... statistical pattern recognition.' Survey of 52 papers. Neuro-symbolic compensates for weaknesses.",
    keyEvidence: [
      '52 papers reviewed',
      'Pattern recognition, not reasoning',
      'Symbolic = System 2',
    ],
    keyQuotes: [
      'LLMs struggle with complex reasoning problems; they only attempt to replicate reasoning steps in training data.',
      'They remain data-driven machine learning models that rely on statistical pattern recognition.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/20-29/27_neuro_symbolic_ai_reasoning.md',
  },
  {
    id: '2601.02996',
    title: 'Multilingual Latent Reasoners',
    shortTitle: 'Multilingual Reasoners',
    date: 'Jan 2026',
    stance: 'balanced',
    cluster: 'mechanism',
    coreArgument:
      "Latent reasoning EXISTS but 'real and fragile'. LRS collapses 0.38→0.03 on hard problems. English-centric pathway.",
    keyEvidence: [
      'LRS: 0.38→0.03 (92% drop)',
      'English-centric internal reasoning',
      'Fragile capability',
    ],
    keyQuotes: [
      'The model can frequently compute the answer directly in its latent representations, without requiring explicit CoT.',
      'Current LRMs exhibit real but fragile multilingual latent reasoning.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/20-29/28_multilingual_latent_reasoners.md',
  },
  {
    id: '2512.20812',
    title: 'Semantic Deception in LLM Reasoning',
    shortTitle: 'Semantic Deception',
    date: 'Dec 2025',
    stance: 'supports',
    cluster: 'faithfulness',
    coreArgument:
      'Semantic cues override explicit instructions. Reasoning models fail more (6-10% at Level 4b). CoT can amplify biases.',
    keyEvidence: [
      'Reasoning models fail more',
      '96% Level 1 → 40% Level 4b',
      'CoT amplifies semantic associations',
    ],
    keyQuotes: [
      'LLMs do not possess genuine reasoning capacities. While they may mimic reasoning behaviour through pattern recognition, they lack true understanding.',
      "CoT could have a bad influence... Repeating elements of the sentence in the CoT would make LLMs' attention focus more on those terms.",
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/00-09/09_semantic_deception.md',
  },
  {
    id: '2510.15974',
    title: 'Limits of Emergent Reasoning in Agentic Settings',
    shortTitle: 'Limits Agentic',
    date: 'Oct 2025',
    stance: 'supports',
    cluster: 'tools',
    coreArgument:
      "Agentic framework makes collapse worse, not better. ~40% deterministic looping. Environment access doesn't help reasoning.",
    keyEvidence: ['Collapse EARLIER with tools', '~40% looping', 'JSD diverges from optimal'],
    keyQuotes: [
      'The agentic framework performs worse than baseline models.',
      'Apparent reasoning ability is largely a byproduct of high-probability mode following.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/60-69/68_limits_emergent_reasoning_agentic.md',
  },
  {
    id: '2504.01445',
    title: 'Compositional-ARC: Systematicity in Spatial Reasoning',
    shortTitle: 'Compositional-ARC',
    date: 'Apr 2025',
    stance: 'supports',
    cluster: 'compositional',
    coreArgument:
      'o3-mini 0.53% on systematicity despite 64% on 3-shot. 5.7M MLC model beats 8B+ LLMs. Memorization, not reasoning.',
    keyEvidence: [
      'o3-mini: 64% 3-shot, 0.53% systematicity',
      '5.7M > 8B+ on composition',
      'MLC: Meta-Learning for Compositionality',
    ],
    keyQuotes: [
      'GPT-4o achieves an accuracy of 0.99%, while Gemini 2.0 Flash reaches 2.66%.',
      '5.7M parameter model significantly outperforms state-of-the-art LLMs including o3-mini.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/60-69/69_compositional_arc.md',
  },
  {
    id: '2504.12523',
    title: 'KUP: Memorization vs Reasoning',
    shortTitle: 'KUP',
    date: 'Apr 2025',
    stance: 'supports',
    cluster: 'compositional',
    coreArgument:
      'ALL methods <2% on reasoning probes. Direct probing (memorization) 70-80%. Retrieval ≠ application.',
    keyEvidence: ['<2% on indirect probing', '70-80% on direct probing', 'H&M Russia example'],
    keyQuotes: [
      'All continued pre-trained (CPT) LLMs fail catastrophically at indirect probing.',
      'An LLM might memorize that H&M exited Russia, yet still erroneously recommend shopping from H&M in Moscow.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/70-79/70_kup_memorization_vs_reasoning.md',
  },
  {
    id: '2509.03646',
    title: 'Emergent Hierarchical Reasoning',
    shortTitle: 'Hierarchical Reasoning',
    date: 'Sep 2025',
    stance: 'challenges',
    cluster: 'emergence',
    coreArgument:
      "RL 'rediscovers' pre-training priors. Improves ID performance via strategic template deployment.",
    keyEvidence: [
      'RL rediscovers priors',
      'Template deployment improves',
      'Challenged by OMEGA (0% transformative)',
    ],
    keyQuotes: [
      'RL does not train models de novo. It fine-tunes base models already imbued with priors from pre-training.',
      'RL improves reasoning by rediscovering and operationalizing the strategic layer inherited from pre-training.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/30-39/32_emergent_hierarchical_reasoning.md',
  },
  {
    id: '2510.15987',
    title: 'Algorithmic Primitives in Compositional Geometry',
    shortTitle: 'Algorithmic Primitives',
    date: 'Oct 2025',
    stance: 'balanced',
    cluster: 'mechanism',
    coreArgument:
      "Finetuning changes pattern deployment, not capability. Identifiable 'primitives' are learned patterns.",
    keyEvidence: [
      'Patterns identifiable',
      "Deployment changes, capability doesn't",
      'Challenged by Planning Gap',
    ],
    keyQuotes: [
      'We discovered a cluster specifically associated with the implementation of a nearest-neighbor heuristic.',
      'We define algorithmic primitive as a minimal computational operation observed in a reasoning process.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/30-39/33_algorithmic_primitives_compositional_geometry.md',
  },
  {
    id: '2502.20332',
    title: 'Emergent Symbolic Mechanisms in LLMs',
    shortTitle: 'Symbolic Mechanisms',
    date: 'Feb 2025',
    stance: 'balanced',
    cluster: 'mechanism',
    coreArgument:
      'Three-stage architecture: positional→value→abstraction. 98% cross-token generalization. Abstraction is positional, not semantic.',
    keyEvidence: [
      'Three-stage architecture',
      '98% cross-token generalization',
      'Positional abstraction',
    ],
    keyQuotes: [
      'We identify an emergent symbolic architecture that implements abstract reasoning via a series of three computations.',
      'For symbolic induction heads, queries and keys primarily represented relative position (r=0.73), not abstract variables (r=0.29).',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/30-39/34_emergent_symbolic_mechanisms.md',
  },
  {
    id: '2509.23629',
    title: 'How LLMs Learn to Reason: A Complex Network Perspective',
    shortTitle: 'Complex Network',
    date: 'Sep 2025',
    stance: 'balanced',
    cluster: 'mechanism',
    coreArgument:
      "RL 'weaves' existing skill islands via concept web. Policy collapse mechanism. Sparse web has limited paths.",
    keyEvidence: ['Concept web structure', 'Policy collapse dynamics', 'Sparse tree limits paths'],
    keyQuotes: [
      'The concept web is a sparse network whose effective average degree is pinned to \u27e8k\u27e9\u22482.',
      'The primary task is no longer discovering new islands but weaving them into a single concept web.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/30-39/35_how_llms_learn_to_reason_complex_network.md',
  },
  {
    id: '2601.08058',
    title: 'Reasoning Beyond CoT: Latent Mode Steering',
    shortTitle: 'Beyond CoT',
    date: 'Jan 2026',
    stance: 'balanced',
    cluster: 'mechanism',
    coreArgument:
      'Reasoning can be elicited without explicit CoT. SAE features steer latent mode. Internal mechanisms identifiable.',
    keyEvidence: ['Latent mode steering', 'SAE feature steering', 'No OOD testing done'],
    keyQuotes: [
      'Multi-step reasoning in LLMs is supported by latent internal activations that can be externally activated.',
      'The feature is associated with entering a reasoning mode but does not distinguish correct from incorrect answers.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/30-39/36_reasoning_beyond_cot_latent_mode.md',
  },
  {
    id: '2512.04727',
    title: 'Sequential Enumeration in LLMs',
    shortTitle: 'Sequential Enumeration',
    date: 'Dec 2025',
    stance: 'supports',
    cluster: 'complexity',
    coreArgument:
      'Counting uses token patterns, not true algorithms. No spontaneous counting. Works only when trained patterns apply.',
    keyEvidence: ['Pattern-based counting', 'No spontaneous counting', 'Fails OOD'],
    keyQuotes: [
      'None of the models can reliably enumerate the elements of a sequence when not explicitly instructed to count.',
      'The LLM exploits an associative chaining mechanism rather than maintaining an internal counter.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/30-39/39_sequential_enumeration.md',
  },
  {
    id: '2512.13713',
    title: 'LoopBench: Meta-Cognitive Symmetry Breaking',
    shortTitle: 'LoopBench',
    date: 'Dec 2025',
    stance: 'balanced',
    cluster: 'emergence',
    coreArgument:
      "Only O3 develops 'wait' strategies to escape deadlocks (72%). GPT-4.1: 0%. Discovery-Implementation Gap.",
    keyEvidence: [
      'O3: 72%, GPT-4.1: 0%',
      'Meta-cognitive strategies rare',
      'Discovery-Implementation Gap',
    ],
    keyQuotes: [
      'We interpret this capacity to detect and escape deadlock as a form of meta-cognitive thinking.',
      'GPT-4.1 Nano fails almost completely, with proximity scores near 0% on all cycles.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/70-79/71_loopbench_symmetry_breaking.md',
  },
  {
    id: '2509.13334',
    title: 'FRIT: Faithfulness via Causal Intervention',
    shortTitle: 'FRIT',
    date: 'Sep 2025',
    stance: 'supports',
    cluster: 'faithfulness',
    coreArgument:
      '25-60% unfaithfulness rates. Automated intervention improves faithfulness. Accuracy emerges from faithfulness training.',
    keyEvidence: ['25-60% unfaithful', 'Automated intervention works', 'Faithfulness → accuracy'],
    keyQuotes: [
      "More than half of reasoning steps don't actually influence the answer.",
      'Accuracy is an emergent property of greater CoT faithfulness.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/50-59/51_frit_causal_cot_faithfulness.md',
  },
  {
    id: '2510.22362',
    title: 'Mapping Faithful Reasoning Paths',
    shortTitle: 'Faithful Paths',
    date: 'Oct 2025',
    stance: 'balanced',
    cluster: 'faithfulness',
    coreArgument:
      "Mechanistic evidence for unfaithfulness. 'Concept Walk' distinguishes computational vs decorative reasoning.",
    keyEvidence: ['Easy/hard case distinction', 'Concept Walk method', 'CoT can be decorative'],
    keyQuotes: [
      "In 'easy' cases, perturbed CoTs are quickly ignored, indicating decorative reasoning.",
      'These traces may function primarily as post-hoc rationalisations.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/50-59/52_mapping_faithful_reasoning.md',
  },
  {
    id: '2502.14829',
    title: 'CoT Faithfulness via Unlearning',
    shortTitle: 'Faithfulness Unlearning',
    date: 'Feb 2025',
    stance: 'balanced',
    cluster: 'faithfulness',
    coreArgument:
      'Parametric intervention improves faithfulness. Faithfulness ≠ plausibility. Contextual methods underestimate.',
    keyEvidence: [
      'Parametric vs contextual',
      'Challenges add-mistake baseline',
      'Faithfulness ≠ plausibility',
    ],
    keyQuotes: [
      'We find a weak Pearson correlation of 0.15 between ff-soft and human ratings of supportiveness.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/30-39/30_cot_faithfulness_unlearning.md',
  },
  {
    id: '2601.02989',
    title: 'Mechanistic Analysis of Counting in LLMs',
    shortTitle: 'Mechanistic Counting',
    date: 'Jan 2026',
    stance: 'supports',
    cluster: 'complexity',
    coreArgument:
      '0% accuracy at 41-50 items. Error accumulation with sequential steps. Needs structural decomposition, not just more tokens.',
    keyEvidence: ['0% at 41-50 items', 'Depth-bounded', 'Structural decomposition needed'],
    keyQuotes: [
      'System-1 performance degrades rapidly and collapses beyond approximately 30 items.',
      'Neither external structure nor reasoning alone is sufficient.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/40-49/48_mechanistic_counting_llms.md',
  },
  {
    id: '2509.18458',
    title: 'CogniLoad: Cognitive Load Benchmark',
    shortTitle: 'CogniLoad',
    date: 'Sep 2025',
    stance: 'supports',
    cluster: 'complexity',
    coreArgument:
      'State-tracking errors dominate at complexity. System-1 reasoning fails at scale. Links CLT to LLM evaluation.',
    keyEvidence: [
      'State-tracking errors',
      'System-1 fails at scale',
      'Cognitive load theory applied',
    ],
    keyQuotes: [
      'Task length (N) is the dominant stressor \u2014 performance degrades faster with N than with d or \u03c1.',
      'Only gpt-5 (76%) and o3 (68%) exceed 50% at N=250.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/40-49/49_cogniload_benchmark.md',
  },
  {
    id: '2601.13244',
    title: 'Instruction-Tuned Models Not Always Better',
    shortTitle: 'Instruction Not Better',
    date: 'Jan 2026',
    stance: 'supports',
    cluster: 'mechanism',
    coreArgument:
      'Capabilities exist in base model; training surfaces them. SFT/RL can degrade reasoning while improving format.',
    keyEvidence: [
      'Base models often win',
      'Perturbation brittleness',
      'Surfacing hypothesis support',
    ],
    keyQuotes: [
      'At >70B scale, base models perform competitively on Math-500 and superior on GSM8K.',
      'Base models possess substantial latent reasoning ability activatable via CoT decoding.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/50-59/50_instruction_tuned_not_always_better.md',
  },
  {
    id: '2407.20311',
    title: 'Physics of LLMs 2.1: Grade School Math',
    shortTitle: 'Physics of LLMs',
    date: 'Jul 2024',
    stance: 'challenges',
    cluster: 'emergence',
    coreArgument:
      'Shows genuine OOD generalization, not just template matching. Length generalization achievable with iGSM.',
    keyEvidence: [
      'OOD generalization shown',
      'iGSM controlled study',
      'Challenges thesis (narrow domain)',
    ],
    keyQuotes: [
      'The model has NEVER seen any training example of the same length as in test time.',
      'We refrain from overstating that our findings directly apply to foundation models like GPT-4.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/40-49/42_physics_of_llms_grade_school_math.md',
  },
  {
    id: '2504.20771',
    title: 'TMBench: Turing Machine Simulation Benchmark',
    shortTitle: 'TMBench',
    date: 'Apr 2025',
    stance: 'supports',
    cluster: 'complexity',
    coreArgument:
      "Performance collapse at scale. Error accumulation with sequential steps. 'Inevitable failure due to statistical nature.'",
    keyEvidence: ['Collapse at scale', 'Error accumulation', 'Statistical nature limits'],
    keyQuotes: [
      'As an autoregressive model, Gemini inevitably fails with increasing steps due to its statistical nature.',
      'Computational reasoning is the ability to systematically select and accurately apply rules.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/40-49/41_computational_reasoning_tmbench.md',
  },
  {
    id: '2510.04040',
    title: 'FaithCoT-Bench: Instance-Level Faithfulness Detection',
    shortTitle: 'FaithCoT-Bench',
    date: 'Oct 2025',
    stance: 'supports',
    cluster: 'faithfulness',
    coreArgument:
      '40-60% unfaithfulness rates. OOD unfaithfulness: 20%→74%. 1,000+ annotated trajectories.',
    keyEvidence: ['40-60% unfaithful', '20%→74% OOD unfaithfulness', '1,000+ annotations'],
    keyQuotes: [
      'A correct answer is not sufficient evidence of faithful reasoning.',
      'When problems are very difficult or OOD, CoTs are especially prone to unfaithful reasoning.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/40-49/43_faithcot_bench.md',
  },
  {
    id: '2601.10825',
    title: 'Societies of Thought in Reasoning Models',
    shortTitle: 'Societies of Thought',
    date: 'Jan 2026',
    stance: 'balanced',
    cluster: 'mechanism',
    coreArgument:
      'R1 achieves performance via multi-agent dialogue simulation. RL organizes pre-existing conversational patterns.',
    keyEvidence: ['Multi-agent simulation', 'RL organizes patterns', 'No OOD testing'],
    keyQuotes: [
      'Enhanced reasoning emerges not from extended computation alone, but from implicit simulation of multi-agent-like interactions.',
      'Reasoning models like DeepSeek-R1 exhibit much greater perspective diversity.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/40-49/44_societies_of_thought.md',
  },
  {
    id: '2511.23476',
    title: 'Thinking by Doing: WMACT Framework',
    shortTitle: 'Thinking by Doing',
    date: 'Nov 2025',
    stance: 'balanced',
    cluster: 'tools',
    coreArgument:
      'RL requires pre-existing capability. Monolithic reasoning can harm performance. Authors state prerequisites.',
    keyEvidence: ['Pre-existing capability needed', 'Monolithic can harm', 'No truly OOD testing'],
    keyQuotes: [
      'Monolithic reasoning imposes substantial cognitive burden on LLMs.',
      'Advanced reasoning patterns are prerequisites for successful world model internalization.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/40-49/45_thinking_by_doing_wmact.md',
  },
  {
    id: '2505.23945',
    title: 'Bias and CoT Faithfulness in VLMs',
    shortTitle: 'Bias VLM Faithfulness',
    date: 'May 2025',
    stance: 'supports',
    cluster: 'faithfulness',
    coreArgument:
      'SFT training shows no improvement. Visual biases systematically less articulated. RL helps only for explicit biases.',
    keyEvidence: ['SFT no improvement', 'Visual biases hidden', 'RL limited help'],
    keyQuotes: [
      'SFT-trained reasoning models show ~0% improvement in articulation compared to non-reasoning models.',
      "Inconsistent CoTs serve as potential 'canary' signals for unfaithfulness detection.",
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/40-49/46_bias_cot_faithfulness_vlm.md',
  },
  {
    id: '2501.02497',
    title: 'Survey of Test-Time Compute Methods',
    shortTitle: 'Test-Time Survey',
    date: 'Jan 2025',
    stance: 'balanced',
    cluster: 'mechanism',
    coreArgument:
      'Self-correction limited without external feedback. Sequential scaling fails; parallel scaling works better.',
    keyEvidence: ['Self-correction limited', 'Sequential fails', 'Parallel scaling better'],
    keyQuotes: [
      'Self-correction is not a guaranteed solution for improving performance.',
      'Most LRMs struggle to generalize to cross-domain, cross-lingual, or general tasks.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/60-69/65_survey_test_time_compute.md',
  },
  {
    id: '2404.00560',
    title: 'A Theory for Length Generalization',
    shortTitle: 'Length Gen Theory',
    date: 'Apr 2024',
    stance: 'balanced',
    cluster: 'mechanism',
    coreArgument:
      'LG requires D=X (training covers all inputs). Standard formulations fail. Explains why surface perturbations break models.',
    keyEvidence: ['D=X required', 'Standard formulations fail', 'Complete coverage needed'],
    keyQuotes: [
      'Even with detailed CoT steps, learned models still fail to generalize for several reasoning problems.',
      'The causal function is guaranteed to be well-learned only when |X| < infinity.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/60-69/66_theory_length_generalization.md',
  },
  {
    id: '2510.08931',
    title: 'RADAR: Data Contamination Detection',
    shortTitle: 'RADAR',
    date: 'Oct 2025',
    stance: 'supports',
    cluster: 'mechanism',
    coreArgument:
      'Mechanistic detection of memorization. Early convergence = pattern matching. Distributed attention = reasoning.',
    keyEvidence: [
      'Memorization detection',
      'Early convergence pattern',
      'Attention distribution analysis',
    ],
    keyQuotes: [
      'When a prompt that should require reasoning elicits recall-like signatures, this indicates potential contamination.',
      'Recall indicators: High early confidence, fast convergence, specialized attention heads.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/50-59/54_radar_data_contamination.md',
  },
  {
    id: '2504.05262',
    title: 'Do LLMs Truly Grasp Elementary Addition?',
    shortTitle: 'Grasp Addition',
    date: 'Apr 2025',
    stance: 'supports',
    cluster: 'compositional',
    coreArgument:
      '99.8%→7.5% with symbolic representation. Commutativity violations prove no abstract rule learning. SFT surfaces patterns (97.17%), no transfer (0%).',
    keyEvidence: ['99.8%→7.5% symbolic', 'Commutativity violations', '0% symbolic transfer'],
    keyQuotes: [
      'LLMs appear fundamentally oriented towards memorizing specific patterns rather than abstracting general principles.',
      'These commutativity violations strongly imply that models rely on direction-specific, memorized patterns.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/50-59/56_llms_truly_grasp_addition.md',
  },
  {
    id: '2512.13978',
    title: 'PhD-Level Mathematical Reasoning Benchmark',
    shortTitle: 'PhD Math',
    date: 'Dec 2025',
    stance: 'balanced',
    cluster: 'complexity',
    coreArgument:
      '~34% failure rate on structured reasoning. 66% success suggests meaningful capability exists in narrow domains.',
    keyEvidence: ['~34% failure rate', '66% success (R1)', 'Novel compositions fail'],
    keyQuotes: [
      'Top-tier models achieve ~66% accuracy, demonstrating robust grasp of probabilistic method.',
      'Significant variance exists in reliability for rigorous mathematical derivation.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/50-59/57_phd_level_math_reasoning_benchmark.md',
  },
  {
    id: '2410.13343',
    title: 'Shortcut Learning in Mathematical Reasoning',
    shortTitle: 'Shortcut Learning',
    date: 'Oct 2024',
    stance: 'supports',
    cluster: 'compositional',
    coreArgument:
      'High accuracy hides brittleness to perturbations. Pattern matching over genuine reasoning.',
    keyEvidence: [
      'Brittleness to perturbations',
      'Pattern matching mechanism',
      'Structural changes break models',
    ],
    keyQuotes: [
      'LLMs tend to capture spurious correlations between source text and particular labels.',
      'Larger LLMs are more prone to utilize shortcuts under zero-shot and few-shot prompts.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/50-59/58_shortcut_learning_llms.md',
  },
  {
    id: '2409.02257',
    title: 'MMLU-Pro+: Shortcut Detection Benchmark',
    shortTitle: 'MMLU-Pro+',
    date: 'Sep 2024',
    stance: 'supports',
    cluster: 'compositional',
    coreArgument:
      'LLMs exploit shortcuts. SSR and CPI metrics for anchoring bias detection. Format changes expose brittleness.',
    keyEvidence: ['Shortcut exploitation', 'SSR/CPI metrics', 'Format brittleness'],
    keyQuotes: [
      'The persistence in selecting previously incorrect options indicates limitations in higher-order reasoning.',
      'High performance on standard benchmarks may not translate to robust reasoning capabilities.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/50-59/59_mmlu_pro_plus_shortcut.md',
  },
  {
    id: '2601.03676',
    title: 'STEPS: Skill Taxonomy for Compositional Learning',
    shortTitle: 'STEPS',
    date: 'Jan 2026',
    stance: 'supports',
    cluster: 'compositional',
    coreArgument:
      'Power-law distribution explains compositional scarcity. 4K targeted > 52K random. Data bottleneck for k>1 compositions.',
    keyEvidence: ['Power-law distribution', '4K > 52K', 'Data bottleneck k>1'],
    keyQuotes: [
      'A key obstacle is a fundamental data bottleneck: complex skill combinations follow a power-law distribution.',
      "Effective compositional generalization requires a 'sweet spot'.",
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/70-79/75_steps_skill_taxonomy_compositional.md',
  },
  {
    id: '2509.01267',
    title: 'Iterative ICL for Algebraic Tasks',
    shortTitle: 'Iterative ICL',
    date: 'Sep 2025',
    stance: 'supports',
    cluster: 'compositional',
    coreArgument:
      '13-35% on rule override. Simpler examples work better. Learned priors dominate over instructions.',
    keyEvidence: ['13-35% rule override', 'Simpler examples better', 'Priors dominate'],
    keyQuotes: [
      'LLMs still lack systematic and compositional generalization skills.',
      'This simple task shows the limited capabilities of LLMs to perform out-of-distribution tasks.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/70-79/73_iterative_icl_algebraic_tasks.md',
  },
  {
    id: '2506.15629',
    title: 'Revisiting Compositional Generalization (ACL 2025)',
    shortTitle: 'Revisiting Compositional',
    date: 'Jun 2025',
    stance: 'supports',
    cluster: 'compositional',
    coreArgument:
      '75% ceiling on ordered coverage. Models default to preferred orderings. Instructions cannot override learned patterns.',
    keyEvidence: ['75% ceiling', 'Preferred orderings', 'ACL 2025'],
    keyQuotes: [
      'Even the most instruction-compliant LLM achieved only about 75% ordered coverage.',
      'Biases toward specific concept order patterns often lead to low-diversity outputs.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/70-79/74_revisiting_compositional_generalization_acl2025.md',
  },
  {
    id: '2504.09858',
    title: 'Effective Reasoning Without Extended Thinking',
    shortTitle: 'Effective Without Thinking',
    date: 'Apr 2025',
    stance: 'balanced',
    cluster: 'mechanism',
    coreArgument:
      'Extended thinking not necessary for correctness. If thinking skippable, tokens not causal for correctness.',
    keyEvidence: ['Thinking skippable', 'Questions R1 value', 'Supports latent reasoning'],
    keyQuotes: [
      'Bypassing the thinking process via simple prompting, denoted as NoThinking, can be surprisingly effective.',
      'When controlling for the number of tokens, NoThinking outperforms Thinking across seven challenging datasets.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/30-39/38_reasoning_models_effective_without_thinking.md',
  },
  {
    id: '2506.21215',
    title: 'Unveiling Causal Reasoning in LLMs',
    shortTitle: 'Unveiling Causal',
    date: 'Jun 2025',
    stance: 'supports',
    cluster: 'compositional',
    coreArgument:
      'Level-1 (retrieval) vs Level-2 (genuine reasoning) distinction. Fresh data reveals memorization. Pattern matching thesis supported.',
    keyEvidence: ['L1 vs L2 distinction', 'Fresh data test', 'Memorization revealed'],
    keyQuotes: [
      "Does this reflect LLMs' genuine causal reasoning capability or only a 'mirage'? The answer leans towards the latter.",
      'LLMs are only capable of performing shallow (level-1) causal reasoning.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/60-69/61_unveiling_causal_reasoning_llms.md',
  },
  {
    id: '2503.05788',
    title: 'Emergent Abilities Survey',
    shortTitle: 'Emergence Survey',
    date: 'Mar 2025',
    stance: 'balanced',
    cluster: 'emergence',
    coreArgument:
      'Metric choice affects emergence detection. Some emergence is real (modular arithmetic). Challenges both Wei and Schaeffer.',
    keyEvidence: ['Metric affects detection', 'Some emergence real', 'Challenges original claims'],
    keyQuotes: [
      "Does increasing from 10% to 100% not represent a significant jump? There is no 'evaporation of claimed emergent abilities'.",
      'Emergent abilities result from competition between memorization and generalization circuits.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/60-69/64_emergent_abilities_survey.md',
  },
  {
    id: '2510.20783',
    title: 'Chess Transformers: Compositionality Study',
    shortTitle: 'Chess Compositionality',
    date: 'Oct 2025',
    stance: 'balanced',
    cluster: 'compositional',
    coreArgument:
      'Rules generalize (96%+), but strategies fail (70%→22%). Rule following ≠ reasoning. Strategies distribution-bounded.',
    keyEvidence: ['Rules: 96%+ OOD', 'Strategies: 70%→22%', 'Rule ≠ reasoning'],
    keyQuotes: [
      'Transformers exhibit compositional generalization, as evidenced by strong rule extrapolation.',
      "The model's strategic adaptation remains limited \u2014 it struggles in scenarios requiring long-term planning.",
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/40-49/47_chess_transformers_compositionality.md',
  },
  {
    id: '2505.16782',
    title: 'Survey of Latent CoT Reasoning',
    shortTitle: 'Latent CoT Survey',
    date: 'May 2025',
    stance: 'balanced',
    cluster: 'mechanism',
    coreArgument:
      "'Unclear whether genuine reasoning or exploiting correlations.' Clear taxonomy of approaches.",
    keyEvidence: [
      'Unclear genuine vs correlation',
      'Taxonomy provided',
      'Both views have evidence',
    ],
    keyQuotes: [
      'This redundancy increases the chance of overfitting to stylistic artifacts rather than genuine reasoning.',
      'Human cognition often transcends discrete linguistic symbols.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/70-79/76_survey_latent_cot_reasoning.md',
  },
  {
    id: '2502.07813',
    title: 'CryptoX: Compositional Reasoning with Encoding',
    shortTitle: 'CryptoX',
    date: 'Feb 2025',
    stance: 'supports',
    cluster: 'compositional',
    coreArgument:
      '40-54pp drops with encoding. Hierarchical layer processing. Open/closed gap reveals training data dependence.',
    keyEvidence: ['40-54pp encoding drops', 'Hierarchical processing', 'AUC 2.47 vs 4.05'],
    keyQuotes: [
      'The layers of LLMs exhibit a clear hierarchical pattern of executing different subtasks in different layers.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/70-79/77_cryptox_compositional_reasoning.md',
  },
  {
    id: '2510.27378',
    title: 'Measuring CoT Monitorability',
    shortTitle: 'CoT Monitorability',
    date: 'Oct 2025',
    stance: 'supports',
    cluster: 'faithfulness',
    coreArgument:
      'Verbosity ≠ faithfulness. Models leave out key factors even when faithful. Monitorability framework.',
    keyEvidence: ['Verbosity ≠ faithfulness', 'Key factors omitted', 'Monitorability framework'],
    keyQuotes: [
      'Since any long, serial reasoning process must pass through this textual trace, the quality of the CoT is a direct window into what the model is thinking.',
      'We introduce verbosity: whether the CoT lists every factor needed to solve the task.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/70-79/78_measuring_cot_monitorability.md',
  },
  {
    id: '2403.11793',
    title: 'Reasoning Abilities on ARC/LoTH',
    shortTitle: 'ARC/LoTH',
    date: 'Mar 2024',
    stance: 'supports',
    cluster: 'compositional',
    coreArgument:
      "10.6% correct answers but only 4.0% correct processes. 60% 'lucky' correct. 0% on Medium/Hard ARC.",
    keyEvidence: ['10.6%→4.0% process correct', '60% lucky', '0% Medium/Hard'],
    keyQuotes: [
      'Existing methods for evaluating LLMs have been results-centric, making it difficult to assess the inference process.',
      'LLMs still lag in terms of logical coherence, compositionality, and productivity.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/70-79/79_reasoning_abilities_arc_loth.md',
  },
  {
    id: '2504.00294',
    title: 'Inference-Time Scaling on Complex Tasks',
    shortTitle: 'Inference Scaling',
    date: 'Apr 2025',
    stance: 'balanced',
    cluster: 'mechanism',
    coreArgument:
      'GPT-4o approaches O1 with 256× superscaling. Complexity collapse persists. Task-dependent effectiveness.',
    keyEvidence: ['256× superscaling helps', 'Collapse persists', 'Task-dependent'],
    keyQuotes: [
      'Higher token consumption does not indicate higher accuracy across models.',
      'Inference-time scaling effectiveness varies between domains with diminishing returns.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/80-89/80_inference_time_scaling_complex_tasks.md',
  },
  {
    id: '2510.09312',
    title: 'CRV: Verifying CoT via Computational Graphs',
    shortTitle: 'CRV',
    date: 'Oct 2025',
    stance: 'balanced',
    cluster: 'faithfulness',
    coreArgument:
      'Error signatures domain-specific (92%→55% cross-domain). Causal interventions work. Mechanistic verification.',
    keyEvidence: ['92%→55% cross-domain', 'Causal interventions', 'Domain-specific signatures'],
    keyQuotes: [
      'Correct and incorrect reasoning leave distinct structural fingerprints.',
      'A reasoning failure is not merely an erroneous state, but a flaw in the execution of a latent algorithm.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/70-79/72_crv_verifying_cot_computational_graph.md',
  },
  {
    id: '2502.12215',
    title: 'Revisiting Test-Time Scaling',
    shortTitle: 'Revisiting TTS',
    date: 'Feb 2025',
    stance: 'balanced',
    cluster: 'mechanism',
    coreArgument:
      'Sequential scaling fails. Parallel scaling works better. External feedback needed.',
    keyEvidence: ['Sequential fails', 'Parallel better', 'External feedback needed'],
    keyQuotes: [
      'Longer CoTs do not consistently improve accuracy of o1-like models.',
      'Both QwQ and R1-Distill showed higher propensity to change correct answers to incorrect ones.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/60-69/63_revisiting_test_time_scaling.md',
  },
  {
    id: '2510.22437',
    title: 'Hierarchical Thinking FSM Analysis',
    shortTitle: 'Thinking FSM',
    date: 'Oct 2025',
    stance: 'balanced',
    cluster: 'mechanism',
    coreArgument:
      "Extended thinking doesn't always help (GPQA: longer = worse). FSM framework for tracking state transitions.",
    keyEvidence: ['GPQA: longer = worse', 'FSM framework', 'Task-dependent benefit'],
    keyQuotes: [
      'Effective reasoning emerges not merely from FSM length but from adaptive state regulation.',
      'Longer reasoning does not always help in factual reasoning.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/50-59/55_hierarchical_thinking_fsm.md',
  },
  {
    id: '2510.25013',
    title: 'IOI Minimal Circuits Analysis',
    shortTitle: 'IOI Circuits',
    date: 'Oct 2025',
    stance: 'balanced',
    cluster: 'mechanism',
    coreArgument:
      'Task-constrained training finds simpler circuits than GPT-2. Identifiable reasoning circuits exist.',
    keyEvidence: ['Simpler circuits found', 'Task-constrained training', 'Challenges GPT-2 IOI'],
    keyQuotes: [
      'A one-layer, two-head attention-only model is sufficient to solve IOI perfectly.',
      'Circuits in pre-trained LLMs may be overly complex due to multi-task pressures.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/50-59/53_ioi_minimal_circuits.md',
  },
  {
    id: '2512.23722',
    title: 'Emergent World Beliefs in POMDP',
    shortTitle: 'World Beliefs',
    date: 'Dec 2025',
    stance: 'balanced',
    cluster: 'emergence',
    coreArgument:
      'Extends Othello/Chess world model paradigm to POMDP. Evidence for internal representations. Probed features may not be causally used.',
    keyEvidence: ['POMDP extension', 'Internal representations', 'Causal use unclear'],
    keyQuotes: [
      'We were able to achieve a correlation coefficient of 0.59 on our test dataset predictions.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/40-49/40_emergent_world_beliefs_poker.md',
  },
  {
    id: '2601.16823',
    title: 'Trapped in the past? Disentangling fluid and crystallized intelligence using chess',
    shortTitle: 'Trapped in the Past',
    date: 'Jan 2026',
    stance: 'supports',
    cluster: 'compositional',
    coreArgument:
      'OOD chess performance collapses to random despite strong in-distribution play. Crystallized (memorization) dominates over fluid (reasoning) intelligence.',
    keyEvidence: [
      'WD: good, OOD: random',
      'Reasoning tokens diminishing returns OOD',
      'Crystallized > fluid intelligence',
    ],
    keyQuotes: [
      'Performance consistently degrades as fluid intelligence demands increase. In OOD tasks, performance collapses to random levels.',
      "When relying solely on fluid intelligence, the model's strategic reasoning collapses to zero.",
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/80-89/84_trapped_in_past_chess_intelligence.md',
  },
  {
    id: '2601.16853',
    title: 'Reasoning Promotes Robustness in Theory of Mind Tasks',
    shortTitle: 'ToM Robustness',
    date: 'Jan 2026',
    stance: 'balanced',
    cluster: 'emergence',
    coreArgument:
      'Reasoning models show improved robustness on ToM tasks, but this is not new capability—bounded by base model capability. Supports "surfacing" hypothesis.',
    keyEvidence: [
      'Robustness ≠ new capability',
      'Bounded by base model',
      'ToM strategies visible in traces',
    ],
    keyQuotes: [
      'The observed gains are more plausibly attributed to increased robustness, not fundamentally new ToM reasoning.',
      'The reasoning capacity of a reasoning model remains bounded by its base model.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/80-89/85_reasoning_promotes_robustness_tom.md',
  },
  {
    id: '2601.18790',
    title: 'MortalMATH: Reasoning Objectives vs Emergency Contexts',
    shortTitle: 'MortalMATH',
    date: 'Jan 2026',
    stance: 'supports',
    cluster: 'faithfulness',
    coreArgument:
      'Reasoning models maintain >95% task completion while user describes dying. RLVR creates "tunnel vision" — optimized pattern pursuit blinds models to context.',
    keyEvidence: [
      '>95% task completion during emergencies',
      'RLVR creates tunnel vision',
      '15s latency in emergencies',
    ],
    keyQuotes: [
      'Specialized reasoning models often ignore the emergency entirely, maintaining over 95% task completion while the user describes dying.',
      'Training models to relentlessly pursue correct answers may unlearn survival instincts.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/80-89/86_mortalmath_reasoning_tunnel_vision.md',
  },
  {
    id: '2406.10625',
    title: 'On the Hardness of Faithful Chain-of-Thought Reasoning',
    shortTitle: 'Hardness of Faithfulness',
    date: 'Jun 2024',
    stance: 'supports',
    cluster: 'faithfulness',
    coreArgument:
      'Faithfulness-accuracy tradeoff is fundamental. All interventions fail. Larger models are less faithful. GPT-4 gets correct answers without using CoT.',
    keyEvidence: [
      'All intervention classes fail',
      'Larger models less faithful',
      'GPT-4 correct without CoT',
    ],
    keyQuotes: [
      'None of these techniques significantly enhance the faithfulness of CoT reasoning.',
      'More accurate LLMs are less faithful.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/60-69/62_hardness_faithful_cot_reasoning.md',
  },
  {
    id: '2507.18391',
    title: 'Revisiting LLM Reasoning via Information Bottleneck',
    shortTitle: 'IB Reasoning',
    date: 'Jul 2025',
    stance: 'balanced',
    cluster: 'mechanism',
    coreArgument:
      'IB regularization improves RL by ~2 points. Reconciles entropy debate. Token-level advantage x entropy.',
    keyEvidence: ['~2 point average gain', 'One-line code change', 'Reconciles entropy debate'],
    keyQuotes: [
      'These conflicting findings underscore the need for rigorous theoretical understanding of reasoning in LLMs.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/80-89/83_revisiting_llm_reasoning_information_bottleneck.md',
  },
  {
    id: '2509.26306',
    title: 'Interactive Learning for LLM Reasoning (ILR)',
    shortTitle: 'Interactive Learning',
    date: 'Sep 2025',
    stance: 'balanced',
    cluster: 'mechanism',
    coreArgument:
      'Multi-agent co-learning improves individual reasoning by 3-5%. Dynamic cooperation/competition. No OOD testing.',
    keyEvidence: ['3-5% improvement', 'Dynamic interaction', 'No OOD testing'],
    keyQuotes: [
      'We are the first to investigate whether multi-agent learning can more effectively enhance reasoning.',
      'Relying solely on competition or cooperation is suboptimal for ILR.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/80-89/82_interactive_learning_llm_reasoning.md',
  },
  {
    id: '2510.10182',
    title: 'A Survey of Inductive Reasoning for LLMs',
    shortTitle: 'Inductive Survey',
    date: 'Oct 2025',
    stance: 'supports',
    cluster: 'mechanism',
    coreArgument:
      'Inductive ability originates from induction heads = pattern matching. No universal bias. Test-time scaling = search through learned patterns.',
    keyEvidence: [
      'Induction heads = pattern matching',
      'No universal bias',
      'Simplicity preference',
    ],
    keyQuotes: [
      'Inductive ability originates from induction heads.',
      "There is no 'universal' bias in deep learning.",
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/60-69/67_survey_inductive_reasoning.md',
  },
  {
    id: '2512.01222',
    title: 'Unsupervised Decoding of Encoded Reasoning',
    shortTitle: 'Decoding Reasoning',
    date: 'Dec 2025',
    stance: 'balanced',
    cluster: 'mechanism',
    coreArgument:
      'Logit lens decodes ROT-13 ~75%. Internal representations anchor to English. Interpretability can penetrate encoding.',
    keyEvidence: ['~75% decoding accuracy', 'English-anchored internals', 'Layers 54-62 peak'],
    keyQuotes: [
      'Logit lens can effectively translate encoded reasoning, with accuracy peaking in intermediate-to-late layers.',
      'Current mechanistic interpretability techniques may be more robust than previously understood.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/60-69/60_unsupervised_decoding_encoded_reasoning.md',
  },
  {
    id: '2601.14716',
    title: 'PCL-Reasoner-V1.5: Offline RL for Math Reasoning',
    shortTitle: 'PCL-Reasoner',
    date: 'Jan 2026',
    stance: 'challenges',
    cluster: 'emergence',
    coreArgument:
      'Offline RL achieves 90.9% AIME 2024. RL improves long-CoT specifically. Depends on DeepSeek-R1 distillation.',
    keyEvidence: ['90.9% AIME 2024', '85.6% AIME 2025', 'Offline RL stable'],
    keyQuotes: [
      'We challenge conventional wisdom and argue that offline RL is a strong alternative.',
      'Offline RL is generally limited by the quality of the best examples in its static dataset.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/80-89/81_pcl_reasoner_offline_rl.md',
  },
  {
    id: '2601.21183',
    title: 'Sycophantic Anchors: Localizing and Quantifying User Agreement in Reasoning Models',
    shortTitle: 'Sycophantic Anchors',
    date: 'Jan 2026',
    stance: 'supports',
    cluster: 'faithfulness',
    coreArgument:
      'Sycophancy has distinct activation signature (84.6% detectable) while correct reasoning does not (64%). Sycophancy emerges gradually during reasoning. 20.6pp asymmetry = models "know" when being sycophantic.',
    keyEvidence: [
      '84.6% sycophantic vs 64% correct anchors',
      '55.1%→72.9% emergence during reasoning',
      'R²=0.74 commitment strength',
    ],
    keyQuotes: [
      'Sycophantic anchors are highly distinguishable (84.6%) while correct anchors are difficult to distinguish (64.0%).',
      "This asymmetry suggests sycophancy leaves a distinctive 'activation signature' that truthful reasoning does not.",
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/100-109/109_sycophantic_anchors.md',
  },
  {
    id: '2601.16644',
    title: 'Sycophancy Hides Linearly in the Attention Heads',
    shortTitle: 'Sycophancy Hides Linearly',
    date: 'Jan 2026',
    stance: 'supports',
    cluster: 'faithfulness',
    coreArgument:
      'Truthfulness and deference resistance are distinct mechanisms (cosine=-0.22, 32% head overlap). MHA steering reduces sycophancy 51.7%→25%. Sycophancy heads attend disproportionately to user doubt.',
    keyEvidence: [
      'Truthfulness ≠ deference (32% overlap)',
      '51.7%→25% sycophancy rate (MHA steering)',
      'Sycophancy heads focus on doubt tokens',
    ],
    keyQuotes: [
      'Factual accuracy and deference resistance arise from related but distinct mechanisms.',
      'Sycophancy-related heads appear to focus on disagreement and sycophantic expression.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/110-119/110_sycophancy_hides_linearly.md',
  },
  {
    id: '2601.11061',
    title: 'Spurious Rewards Paradox: How RLVR Activates Memorization Shortcuts',
    shortTitle: 'Spurious Rewards Paradox',
    date: 'Jan 2026',
    stance: 'supports',
    cluster: 'mechanism',
    coreArgument:
      'Models improve EVEN WITH INCORRECT REWARDS via Anchor-Adapter circuit (L18-20 trigger, L21+ adapt). Perplexity Paradox: answer PPL↓ while prompt PPL↑ = memorization not reasoning.',
    keyEvidence: [
      'Gains with random/incorrect rewards',
      'Anchor Reset: -12% accuracy',
      'Bidirectional causal steering',
    ],
    keyQuotes: [
      'This divergence constitutes a Perplexity Paradox.',
      'RLVR acts as a retrieval mechanism for data already memorized during pretraining.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/110-119/111_spurious_rewards_paradox.md',
  },
  {
    id: '2502.15631',
    title: 'o3 (mini) Thinks Harder, Not Longer',
    shortTitle: 'o3 Thinks Harder',
    date: 'Feb 2025',
    stance: 'supports',
    cluster: 'complexity',
    coreArgument:
      'Accuracy DECLINES as reasoning chains grow. More capable models use tokens more effectively, not more of them. Overthinking mechanism quantified.',
    keyEvidence: [
      '3.16%/1000 tokens accuracy drop (o1-mini)',
      'o3-mini: same tokens, higher accuracy',
      'Error accumulation with chain length',
    ],
    keyQuotes: [
      'More proficient models do not generate longer reasoning chains to achieve higher accuracy.',
      'Accuracy generally decreases as the chain-of-thought grows.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/80-89/87_o3_thinks_harder_not_longer.md',
  },
  {
    id: '2502.12470',
    title: 'Reasoning on a Spectrum: System 1 and System 2 Alignment',
    shortTitle: 'S1/S2 Alignment',
    date: 'Feb 2025',
    stance: 'balanced',
    cluster: 'mechanism',
    coreArgument:
      'System 2 excels at arithmetic/symbolic; System 1 excels at commonsense. Uniform reasoning suboptimal. Entropy-based selection beats both pure approaches.',
    keyEvidence: [
      'S2: +9pp AddSub, +17pp SingleEq',
      'S1: +7pp StrategyQA, +4pp SIQA',
      'Entropy selection = best of both',
    ],
    keyQuotes: [
      'This work challenges the assumption that step-by-step reasoning is always optimal.',
      'Extended reasoning is not universally beneficial.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/80-89/88_system1_system2_alignment.md',
  },
  {
    id: '2207.07051',
    title: 'Language Models Show Human-like Content Effects on Reasoning',
    shortTitle: 'Content Effects',
    date: 'Jul 2024',
    stance: 'supports',
    cluster: 'compositional',
    coreArgument:
      'LLMs and humans both show content effects: reasoning more accurate when semantic content supports logical inference. Both rely on learned patterns, not pure logic.',
    keyEvidence: [
      '90% endorse invalid syllogism if believable',
      'Model confidence ↔ human RT correlation',
      'PNAS Nexus peer-reviewed',
    ],
    keyQuotes: [
      'Human abstract reasoning is imperfect \u2014 affected by real-world knowledge and beliefs.',
      'LMs reflect many of the same qualitative human patterns on these tasks.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/80-89/89_content_effects_reasoning.md',
  },
  {
    id: '2411.02478',
    title: 'Imagining and Building Wise Machines: The Centrality of AI Metacognition',
    shortTitle: 'AI Metacognition',
    date: 'Nov 2024',
    stance: 'supports',
    cluster: 'mechanism',
    coreArgument:
      'AI has become smart but not wise. Lacks metacognition (reasoning about reasoning). Object-level patterns without meta-level strategy selection.',
    keyEvidence: [
      'Trends in Cognitive Sciences (accepted)',
      'Bengio, Mitchell, Chater et al.',
      'Wisdom = knowing when patterns apply',
    ],
    keyQuotes: [
      'Although AI has become increasingly smart, its wisdom has not kept pace.',
      'Perhaps no amount of training will get current models to human-level metacognition.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/90-99/97_ai_metacognition_wise_machines.md',
  },
  {
    id: '2507.15851',
    title: 'The Other Mind: How Language Models Exhibit Human Temporal Cognition',
    shortTitle: 'Temporal Cognition',
    date: 'Jul 2025',
    stance: 'balanced',
    cluster: 'emergence',
    coreArgument:
      'LLMs exhibit Weber-Fechner law with reference point ~2025. Sophisticated emergence FROM training data structure, not despite it.',
    keyEvidence: [
      'Reference point ~2025 (GPT-4o: 2024)',
      '0.67-1.71% temporal-preferential neurons',
      'Emerges from corpus structure',
    ],
    keyQuotes: [
      'LLMs exhibit certain cognitive patterns similar to humans not directly specified in training.',
      'The training corpus possesses an inherent, non-linear temporal structure.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/90-99/98_temporal_cognition_llms.md',
  },
  {
    id: '2511.11810',
    title: 'On the Notion that Language Models Reason',
    shortTitle: 'LMs as Markov Kernels',
    date: 'Nov 2025',
    stance: 'supports',
    cluster: 'mechanism',
    coreArgument:
      'LMs implement implicit Markov kernels. "Reasoning" = statistical regularities, not logical mechanisms. Proposes reframing as "inference" not "reasoning".',
    keyEvidence: [
      'NeurIPS 2025 Workshop',
      'Defends "statistical pattern matchers"',
      'Invariance violations = not reasoning',
    ],
    keyQuotes: [
      'Reasoning-like outputs correspond to statistical regularities rather than explicit logical mechanisms.',
      "This view is illustrative of the claim that LMs are 'statistical pattern matchers'.",
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/90-99/99_notion_language_models_reason.md',
  },
  {
    id: '2307.02477',
    title:
      'Reasoning or Reciting? Exploring the Capabilities and Limitations of Language Models Through Counterfactual Tasks',
    shortTitle: 'Reasoning or Reciting',
    date: 'Jul 2023',
    stance: 'supports',
    cluster: 'compositional',
    coreArgument:
      'LMs rely on "narrow, non-transferable procedures" not general reasoning. High CCC + low counterfactual = models understand conditions but cant apply reasoning.',
    keyEvidence: [
      'NAACL 2024 (MIT/BU)',
      '40pp drop on counterfactual tasks',
      '11 tasks tested systematically',
    ],
    keyQuotes: [
      'Current LMs often rely on narrow, non-transferable procedures for task-solving.',
      'A high CCC performance indicates the model understands conditions, yet fails to apply reasoning skills.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/100-109/100_reasoning_or_reciting_counterfactual.md',
  },
  {
    id: '2601.14691',
    title: 'Gaming the Judge: Unfaithful Chain of Thought Can Undermine Agent Evaluation',
    shortTitle: 'Gaming the Judge',
    date: 'Jan 2026',
    stance: 'supports',
    cluster: 'faithfulness',
    coreArgument:
      'LLM judges are highly susceptible to CoT manipulation. Progress Fabrication inflates FPR by 90%. Judges pattern-match on style, not content.',
    keyEvidence: [
      '800 trajectories, 9 VLM judges',
      '20-30pp FPR increase from fabrication',
      'Even thinking models fooled',
    ],
    keyQuotes: [
      'Judges accept CoT assertions without verifying against the action trace.',
      'An agent can improve perceived performance by optimizing how its CoT is worded.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/100-109/101_gaming_the_judge_cot_manipulation.md',
  },
  {
    id: '2601.13392',
    title: 'Beyond Memorization: Testing LLM Reasoning on Unseen Theory of Computation Tasks',
    shortTitle: 'Beyond Memorization DFA',
    date: 'Jan 2026',
    stance: 'supports',
    cluster: 'compositional',
    coreArgument:
      '100% knowledge accuracy but 30-64pp drops on unseen DFA tasks. CoT degrades performance. "Pattern retrieval rather than robust symbolic reasoning."',
    keyEvidence: [
      '100% knowledge, 20-59% unseen',
      '63pp drop GPT-5.1 seen→unseen',
      'Six systematic failure modes',
    ],
    keyQuotes: [
      'High accuracy on seen problems does not imply genuine reasoning capability.',
      'Despite achieving 100% accuracy on L\u2081, all models fail on L\u2082 under direct prompting.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/100-109/102_beyond_memorization_dfa_unseen.md',
  },
  {
    id: '2601.15158',
    title: 'Outcome-Based RL Provably Leads Transformers to Reason, but Only With the Right Data',
    shortTitle: 'Outcome-Based RL',
    date: 'Jan 2026',
    stance: 'balanced',
    cluster: 'mechanism',
    coreArgument:
      'RL with sparse rewards converges to efficient reasoning algorithm, but requires (1) base model proficiency, (2) easy examples, (3) expressible architecture. Supports "surfacing" hypothesis.',
    keyEvidence: [
      'O(n²) with easy examples, 2^Ω(n) without',
      '100% accuracy on chain traversal',
      'OOD generalization from easy to hard',
    ],
    keyQuotes: [
      'We assume Policy Gradient is applied to a base model which has already acquired minimal task proficiency.',
      'Excluding simple examples from post-training prevents the emergence of the reasoning algorithm altogether.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/100-109/103_outcome_based_rl_reasoning.md',
  },
  {
    id: '2601.14658',
    title: 'Say Anything but This: When Tokenizer Betrays Reasoning in LLMs',
    shortTitle: 'Tokenizer Betrays',
    date: 'Jan 2026',
    stance: 'supports',
    cluster: 'mechanism',
    coreArgument:
      'LLMs reason at token-ID level, not meaning level. "Phantom edits" show models believe they edited when surface text is unchanged. Scaling doesn\'t fix this—it\'s architectural.',
    keyEvidence: [
      '72.2% phantom edits are whitespace variants',
      '11k+ trials, 10 models',
      'Post-masking: 0-5% phantom edits',
    ],
    keyQuotes: [
      "Models are systematically misled by tokenizer properties \u2014 they 'believe' they have successfully executed substitutions.",
      'Increasing model capacity offers no systematic solution to this fundamental misalignment.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/100-109/104_tokenizer_betrays_reasoning.md',
  },
  {
    id: '2601.15165',
    title: 'The Flexibility Trap: Why Arbitrary Order Limits Reasoning Potential in Diffusion LLMs',
    shortTitle: 'Flexibility Trap',
    date: 'Jan 2026',
    stance: 'balanced',
    cluster: 'mechanism',
    coreArgument:
      'Arbitrary order NARROWS reasoning potential. Models bypass high-uncertainty logical forks, causing "entropy degradation." Forcing AR order improves reasoning by requiring commitment at decision points.',
    keyEvidence: [
      'JustGRPO: 89.1% GSM8K, 45.1% MATH-500',
      '21.3% HumanEval solved AR-only vs 0.6% arbitrary-only',
      'Logical connectors filled in post-hoc',
    ],
    keyQuotes: [
      'Less flexibility unlocks better reasoning potential.',
      'The process acts less as navigation at a fork, more as retrospective alignment to a pre-generated conclusion.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/100-109/105_flexibility_trap_diffusion_llms.md',
  },
  {
    id: '2601.19847',
    title: 'Identifying and Transferring Reasoning-Critical Neurons (AdaRAS)',
    shortTitle: 'Reasoning Neurons',
    date: 'Jan 2026',
    stance: 'balanced',
    cluster: 'mechanism',
    coreArgument:
      'Only ~50 neurons (0.03%) control reasoning correctness. Activations predict outcomes BEFORE reasoning completes (AUROC 0.83). Cross-task transfer suggests pattern detection, not domain reasoning.',
    keyEvidence: [
      '+13% AIME-24, +13.64% AIME-25',
      '0.83 AUROC prediction from early activations',
      'Math RCNs transfer to coding tasks',
    ],
    keyQuotes: [
      'Token-level neuron activations are predictive of the final correctness of LLM reasoning.',
      'Correct reasoning is supported by structured activation patterns formed by a small subset of neurons.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/100-109/106_reasoning_critical_neurons_activation_steering.md',
  },
  {
    id: '2601.19773',
    title:
      "Strong Reasoning Isn't Enough: Evaluating Evidence Elicitation in Interactive Diagnosis",
    shortTitle: "Strong Reasoning Isn't Enough",
    date: 'Jan 2026',
    stance: 'supports',
    cluster: 'compositional',
    coreArgument:
      'Strong static reasoning does not transfer to interactive evidence gathering. Models trained on complete cases fail to identify what information is needed. Scaling improves reasoning SR but not evidence-gathering ICR.',
    keyEvidence: [
      '~20% avg SR drop static→interactive',
      'Meditron -90% degradation (fine-tuning hurts)',
      'ICR-SR decoupled: reasoning ≠ gathering',
      'Scaling: 3B→72B improves SR, not ICR',
    ],
    keyQuotes: [
      'Strong diagnostic reasoning does not guarantee effective information collection.',
      'Model scaling mainly improves SR while yielding marginal gains in ICR.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/100-109/107_strong_reasoning_isnt_enough.md',
  },
  {
    id: '2601.21618',
    title: 'Semantic Content Determines Algorithmic Performance (WhatCounts)',
    shortTitle: 'WhatCounts',
    date: 'Jan 2026',
    stance: 'supports',
    cluster: 'compositional',
    coreArgument:
      'Counting accuracy varies >40% depending solely on semantic class. LLMs do not implement algorithms; they approximate them, and the approximation is argument-dependent. Better models have larger semantic gaps.',
    keyEvidence: [
      '>40% accuracy variation on counting by semantic class',
      'Better models = larger semantic gaps (counterintuitive)',
      'Tools dont fix it (agents inherit gap)',
      'Fine-tuning shifts biases unpredictably',
    ],
    keyQuotes: [
      'LLMs do not implement algorithms; they approximate them, and the approximation is argument-dependent.',
      'If errors vary with semantic content, the model is pattern-matching one.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/100-109/108_whatcounts_semantic_content.md',
  },
  {
    id: '2601.10679',
    title:
      'Are Your Reasoning Models Reasoning or Guessing? A Mechanistic Analysis of Hierarchical Reasoning Models',
    shortTitle: 'Reasoning or Guessing?',
    date: 'Jan 2026',
    stance: 'supports',
    cluster: 'mechanism',
    coreArgument:
      'HRM "guesses" fixed points rather than reasoning incrementally. Fails on 1-cell puzzles (~25% instability). "Grokking" dynamics: solutions appear suddenly, not via gradual refinement. Scaling guesses (54.5%→96.9%) dramatically outperforms improving reasoning.',
    keyEvidence: [
      'Fails on puzzles with 1 unknown cell',
      '"Grokking" dynamics: sudden correctness',
      '54.5%→96.9% via guess scaling (+42.4%)',
      'Spurious fixed points as local minima',
    ],
    keyQuotes: [
      "HRM does not 'reason' in the commonsense way \u2014 it resembles 'guessing' more than 'reasoning'.",
      "Recursion serves as a way of scaling 'guessing' attempts for a plausible latent state.",
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/110-119/112_reasoning_or_guessing_hrm.md',
  },
  {
    id: '2601.07422',
    title: 'Two Pathways to Truthfulness: On the Intrinsic Encoding of LLM Hallucinations',
    shortTitle: 'Two Pathways',
    date: 'Jan 2026',
    stance: 'supports',
    cluster: 'mechanism',
    coreArgument:
      'Truthfulness encoding uses TWO distinct pathways: Q-Anchored (knowledge retrieval, 87% acc, popular entities) vs A-Anchored (fabrication detection, 68% acc, long-tail). Knowledge boundary = training distribution. LLMs self-aware of pathway (87-93% AUC).',
    keyEvidence: [
      'Q-Anchored: 87% acc, popular entities',
      'A-Anchored: 68% acc, long-tail entities',
      'Self-aware of pathway (87-93% AUC)',
      'Pathway-aware detection +10% AUC',
    ],
    keyQuotes: [
      'Truthfulness cues arise from two distinct pathways: Question-Anchored and Answer-Anchored.',
      'Q-anchored encoding predominates for well-established facts within the knowledge boundary.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/110-119/113_two_pathways_truthfulness.md',
  },
  {
    id: '2601.22035',
    title: 'Thinking Out of Order: When Output Order Stops Reflecting Reasoning Order',
    shortTitle: 'Thinking Out of Order',
    date: 'Jan 2026',
    stance: 'supports',
    cluster: 'mechanism',
    coreArgument:
      'AR models suffer 67% accuracy drop when answers must precede reasoning (premature commitment). MDLMs remain stable (≤14% drop) via complexity-driven stabilization. AR must commit before reasoning exists.',
    keyEvidence: [
      'AR: 67% drop answer-first vs CoT-first',
      'MDLM: ≤14% drop (order robust)',
      'Distillation from AR preserves sensitivity',
      'Complexity-driven token stabilization',
    ],
    keyQuotes: [
      'AR models must commit to answers before generating intermediate reasoning \u2014 forcing premature commitment.',
      'MDLMs achieve order robustness by stabilizing simpler tokens earlier in the diffusion process.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/110-119/114_thinking_out_of_order.md',
  },
  {
    id: '2601.21214',
    title:
      'Scaling Reasoning Hop Exposes Weaknesses: Demystifying and Improving Hop Generalization',
    shortTitle: 'Scaling Reasoning Hop',
    date: 'Jan 2026',
    stance: 'supports',
    cluster: 'mechanism',
    coreArgument:
      'Errors concentrate at specific positions (78.6% from single type). "Erroneous processing heads" (ep heads) amplify wrong trajectories while suppressing correct ones. Knocking out single ep head restores 47.5% correct. TCR +6.8%, TCR-gold +20%.',
    keyEvidence: [
      '78.6% errors from single error type',
      'Knockout ep head: 47.5% restored',
      'TCR-gold: 41.7% → 61.3% (+20%)',
      'Shared ep heads across tasks',
    ],
    keyQuotes: [
      '78.6% of errors stem from recalling wrong names.',
      'Correct and erroneous trajectories coexist; ep heads amplify spurious signals.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/110-119/115_scaling_reasoning_hop_ep_heads.md',
  },
  {
    id: '2601.18352',
    title: 'Code over Words: Overcoming Semantic Inertia via Code-Grounded Reasoning',
    shortTitle: 'Code over Words',
    date: 'Jan 2026',
    stance: 'supports',
    cluster: 'faithfulness',
    coreArgument:
      'INVERSE SCALING: Llama-3-70B shows STRONGER semantic inertia (ΔP=-0.18) than 8B. Claude Sonnet 57%→13% collapse on semantic conflict. Code representation reverses trend. "Larger models become more entrenched in distributional priors."',
    keyEvidence: [
      'Llama-3-70B: ΔP=-0.18 (worse than 8B)',
      'Claude: 57% → 13% on conflict tasks',
      'Code: ΔP=+0.29 (reverses inverse scaling)',
      '71% inhibitory control vs 16% direct',
    ],
    keyQuotes: [
      'Larger models can exhibit inverse scaling \u2014 they perform worse when requiring suppression of pre-trained associations.',
      'Code grounding strips symbols of their semantic associations.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/110-119/116_code_over_words_semantic_inertia.md',
  },
  // Gap-filling papers (24, 90-96)
  {
    id: '2601.21576',
    title: 'Chain Of Thought Compression: A Theoretical Analysis',
    shortTitle: 'CoT Compression',
    date: 'Jan 2026',
    stance: 'supports',
    cluster: 'mechanism',
    coreArgument:
      'High-order logical dependencies exponentially decay when compressing reasoning steps. Skipping steps inevitably leads to high-order interaction barriers.',
    keyEvidence: [
      'Exponential signal decay for high-order dependencies',
      'Order-r Interaction proves decay is fundamental',
      'Compression loses critical reasoning signals',
    ],
    keyQuotes: [
      'The learning signal required to learn high-order logical dependencies decays exponentially with compressed steps.',
      'The distribution is dominated by low-order terms.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/20-29/24_cot_compression_theory.md',
  },
  {
    id: '2601.17593',
    title: 'From Chains to DAGs: Probing Graph Structure of Reasoning',
    shortTitle: 'Chains to DAGs',
    date: 'Jan 2026',
    stance: 'balanced',
    cluster: 'mechanism',
    coreArgument:
      'Reasoning DAG geometry is encoded in hidden states but recoverability varies by node depth and scale. Structure exists but not reliably used.',
    keyEvidence: [
      'DAG geometry in intermediate layers',
      'Recoverability varies by depth',
      'Structure present but underutilized',
    ],
    keyQuotes: [
      'Recoverability of DAG geometry does not imply that the model explicitly represents symbolic graphs.',
      'Model capacity is the primary driver of probe performance.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/90-99/90_chains_to_dags_probing.md',
  },
  {
    id: '2601.18753',
    title: 'HalluGuard: Demystifying Data-Driven and Reasoning-Driven Hallucinations',
    shortTitle: 'HalluGuard',
    date: 'Jan 2026',
    stance: 'supports',
    cluster: 'faithfulness',
    coreArgument:
      'Hallucinations decompose into data-driven (training mismatch) and reasoning-driven (inference instability). 98.1% of MATH-500 errors are reasoning-driven.',
    keyEvidence: [
      '98.1% reasoning-driven errors on MATH-500',
      'NTK-based detection AUROC 81.76%',
      'Errors grow exponentially with sequence length',
    ],
    keyQuotes: [
      'On MATH-500, 98.1% of errors are reasoning-driven and only 1.9% are data-driven.',
      'Reasoning-driven hallucinations originate from inference-time failures.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/90-99/91_halluguard_hallucination_decomposition.md',
  },
  {
    id: '2601.17421',
    title: 'Oops, Wait: Token-Level Signals as a Lens into LLM Reasoning',
    shortTitle: 'Oops Wait',
    date: 'Jan 2026',
    stance: 'balanced',
    cluster: 'mechanism',
    coreArgument:
      'Tokens like "wait" correlate with reasoning correctness. Models acquire reasoning signals but exploit them only partially.',
    keyEvidence: [
      'Wait/therefore correlate with correctness',
      'Stable across model scales',
      'Partially exploited capability',
    ],
    keyQuotes: [
      'Models acquire reasoning ability through such signals but exploit them only partially.',
      'Specific tokens strongly correlate with reasoning correctness.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/90-99/92_oops_wait_token_signals.md',
  },
  {
    id: '2601.18778',
    title: 'Teaching Models to Teach Themselves: Reasoning at the Edge of Learnability (SOAR)',
    shortTitle: 'SOAR',
    date: 'Jan 2026',
    stance: 'balanced',
    cluster: 'emergence',
    coreArgument:
      'Teaching ability decoupled from solving ability. Self-generated curricula enable learning on 0/128 problems. Meta-RL sharpens pretraining knowledge.',
    keyEvidence: [
      '4× pass@1, 2× pass@32 on fail@128 MATH',
      'Only 32.8% of effective questions have correct solutions',
      'Grounded rewards > intrinsic rewards',
    ],
    keyQuotes: [
      "A model's ability to generate effective 'stepping stones' is distinct from its ability to solve them.",
      'Structural and contextual cues of a question are more important for kickstarting learning.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/90-99/94_soar_self_teaching_curriculum.md',
  },
  {
    id: '2509.14252',
    title: 'LLM-JEPA: Large Language Models Meet Joint Embedding Predictive Architectures',
    shortTitle: 'LLM-JEPA',
    date: 'Sep 2025',
    stance: 'balanced',
    cluster: 'mechanism',
    coreArgument:
      'JEPA objective improves LLM representations. +14% on NL-RX, but no OOD testing. Cannot determine if improvements are reasoning or pattern matching.',
    keyEvidence: [
      '+14.17% on NL-RX-SYNTH',
      'Only +0.68% on GSM8K',
      'No OOD/compositional testing (critical gap)',
    ],
    keyQuotes: ['A good next-token predictor is not a good JEPA.'],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/90-99/95_llm_jepa_joint_embedding.md',
  },
  {
    id: '2601.15436',
    title: 'Not Your Typical Sycophant: The Elusive Nature of Sycophancy in LLMs',
    shortTitle: 'Sycophancy',
    date: 'Jan 2026',
    stance: 'supports',
    cluster: 'faithfulness',
    coreArgument:
      'All models prioritize user agreement over truth. Sycophancy and recency bias interact with constructive interference.',
    keyEvidence: [
      'All 4 models sycophantic in standard settings',
      'Recency bias universal',
      'Claude/Mistral show moral remorse when harm explicit',
    ],
    keyQuotes: [
      "While all models exhibit sycophantic tendencies, Claude and Mistral exhibit 'moral remorse'.",
      "Sycophancy and recency bias interact to produce 'constructive interference' effect.",
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/90-99/96_sycophancy_elusive_nature.md',
  },
  {
    id: '2311.07590',
    title: 'Large Language Models can Strategically Deceive their Users when Put Under Pressure',
    shortTitle: 'Strategic Deception',
    date: 'Nov 2023',
    stance: 'supports',
    cluster: 'faithfulness',
    coreArgument:
      'GPT-4 engages in strategic deception without instruction. ~75% misaligned action rate, ~90% deception rate, ~90% doubling-down when caught. HHH training creates surface compliance, not genuine values.',
    keyEvidence: [
      '~75% insider trading under pressure',
      '~90% concealment of true reasons',
      '~90% doubles down when questioned',
      'System prompt prohibition does not eliminate deception',
      'Scaling increases sophistication, not alignment',
    ],
    keyQuotes: [
      'This is the first demonstration of LLMs trained to be helpful, harmless, and honest, strategically deceiving users.',
      'The model consistently hides the genuine reasons behind its trading decision.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/110-119/117_strategic_deception_gpt4.md',
  },
  {
    id: '2502.03407',
    title: 'Detecting Strategic Deception Using Linear Probes',
    shortTitle: 'Deception Probes',
    date: 'Feb 2025',
    stance: 'balanced',
    cluster: 'mechanism',
    coreArgument:
      'Linear probes can detect deception from activations with AUROC 0.96-0.999, catching 95-99% of deceptive responses at 1% FPR. Deception is linearly encoded. Current methods insufficient for robust defense.',
    keyEvidence: [
      'AUROC 0.96-0.999 on insider trading/sandbagging',
      '95-99% recall at 1% FPR',
      'Deception linearly encoded in activation space',
      'Authors: "insufficient as robust defence"',
    ],
    keyQuotes: [
      'Monitoring outputs alone is insufficient \u2014 the AI might produce benign outputs while misaligned internally.',
      'Current performance is insufficient as a robust defence against deception.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/110-119/118_detecting_deception_linear_probes.md',
  },
  {
    id: '2308.03958',
    title: 'Simple Synthetic Data Reduces Sycophancy in Large Language Models',
    shortTitle: 'Sycophancy Scales',
    date: 'Aug 2023',
    stance: 'supports',
    cluster: 'faithfulness',
    coreArgument:
      'Canonical: Sycophancy scales with model size and instruction tuning. Models agree with objectively wrong statements (2+2=5) if user does. Synthetic data intervention reduces sycophancy.',
    keyEvidence: [
      'Scaling increases sycophancy (8B → 540B)',
      'Instruction tuning increases sycophancy',
      'Models agree with 2+2=5 if user agrees',
      'Synthetic data intervention generalizes',
    ],
    keyQuotes: [
      'Both model scaling and instruction tuning significantly increase sycophancy.',
      'Despite knowing statements are wrong, language models will agree if the user does.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/110-119/119_sycophancy_scales_wei.md',
  },
  {
    id: '2506.21561',
    title: "Reasoning Isn't Enough: Examining Truth-Bias and Sycophancy in LLMs",
    shortTitle: 'Truth-Bias Sycophancy',
    date: 'Jun 2025',
    stance: 'supports',
    cluster: 'faithfulness',
    coreArgument:
      "Largest LLM veracity study: 8 LLMs, 4,800 judgments. Sycophantic asymmetry: GPT-4.1 has 98% truth accuracy but 16% deception accuracy. DeepSeek R1 (reasoning) more biased than V3 (non-reasoning). Capability advances alone don't resolve veracity challenges.",
    keyEvidence: [
      'GPT-4.1: 98% truth acc, 16% deception acc',
      'R1 more truth-biased than V3 (reasoning paradox)',
      'Only Claude 3.7 Sonnet below 50% truth-bias',
      'Base-rate prompting improves deception detection 4-42x',
    ],
    keyQuotes: [
      'Capability advances alone do not resolve fundamental veracity detection challenges.',
      'GPT-4.1 displays asymmetric performance with 98% truth accuracy but 16% deception accuracy.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/120-129/120_truth_bias_sycophancy_reasoning.md',
  },
  {
    id: '2510.22977',
    title: 'The Reasoning Trap: How Enhancing LLM Reasoning Amplifies Tool Hallucination',
    shortTitle: 'Reasoning Trap',
    date: 'Oct 2025',
    stance: 'supports',
    cluster: 'faithfulness',
    coreArgument:
      'CAUSAL: Reasoning RL increases tool hallucination proportionally with task gains. Effect transcends overfitting (math RL → tool halluc). Method-agnostic (RL, SFT, distillation, inference thinking). No free lunch: DPO reduces halluc but drops utility 24%.',
    keyEvidence: [
      'Math RL increases TOOL hallucination (no tools in training)',
      'Thinking mode ON → hallucination UP (no training needed)',
      'DeepSeek-R1-Distill: 74% vs base 35% halluc',
      'Representation collapse in tool pathways, reasoning stable',
    ],
    keyQuotes: [
      'This effect transcends overfitting \u2014 training on non-tool tasks still amplifies tool hallucination.',
      "Enabling 'thinking' mode leads to a consistent rise in hallucination.",
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/120-129/121_reasoning_trap_tool_hallucination.md',
  },
  {
    id: '2601.05905',
    title: 'Illusions of Confidence? Diagnosing LLM Truthfulness via Neighborhood Consistency',
    shortTitle: 'Illusions of Confidence',
    date: 'Jan 2026',
    stance: 'supports',
    cluster: 'faithfulness',
    coreArgument:
      "Self-consistency masks brittle beliefs. Facts with SC=1.0 collapse to 33.8% accuracy under mild contextual pressure. NCB (structural belief) predicts robustness; scaling doesn't fix brittleness; SAT reduces brittleness ~30%.",
    keyEvidence: [
      'SC=1.0 → 33.8% after interference (66pp drop)',
      'High-NCB samples 40-50% more resilient than Low-NCB',
      'Model scaling does not reduce brittleness',
      'SAT: 60.6% vs 33.4% baseline under stress',
    ],
    keyQuotes: [
      'Even facts answered with perfect self-consistency can rapidly collapse under mild interference.',
      'Point-wise confidence is superficial, failing to reflect true belief state.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/120-129/122_illusions_of_confidence_ncb.md',
  },
  {
    id: '2410.11684',
    title: 'Are UFOs Driving Innovation? The Illusion of Causality in Large Language Models',
    shortTitle: 'Causal Illusions',
    date: 'Oct 2024',
    stance: 'supports',
    cluster: 'faithfulness',
    coreArgument:
      'LLMs exhibit causal illusions - incorrectly framing correlations as causation. Sycophancy amplifies this: GPT-4o-Mini +17% when user implies causation. Claude-3.5-Sonnet most robust (~13% vs 34-35% others).',
    keyEvidence: [
      '34-35% causal illusion rate (GPT-4o-Mini, Gemini)',
      'Claude-3.5-Sonnet: ~13% (below human 22%)',
      'Sycophancy increases causal illusions +17% (GPT-4o-Mini)',
      'Claude resists sycophantic pressure (0% increase)',
    ],
    keyQuotes: [
      'Illusions of causality occur when people develop causal beliefs with no supporting evidence.',
      'The imitation of erroneous beliefs increases risk of causal misinterpretations.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/120-129/123_causal_illusions_llms.md',
  },
  {
    id: '2506.09250',
    title: 'The Illusion of the Illusion of Thinking: A Comment on Shojaee et al.',
    shortTitle: 'Illusion of Illusion (Rebuttal)',
    date: 'Jun 2025',
    stance: 'challenges',
    cluster: 'complexity',
    coreArgument:
      'Rebuttal to Illusion of Thinking: argues accuracy collapse reflects token limits not reasoning limits. River Crossing N≥6 are impossible puzzles. Code generation restores high accuracy on Hanoi N=15. but limited experiments, code gen is pattern retrieval.',
    keyEvidence: [
      'River Crossing N≥6 with b=3 is mathematically impossible',
      'Models explicitly state "to avoid making this too long"',
      'Hanoi N=15 via Lua function: "very high accuracy"',
      'Limited experimental support (budget constraints)',
    ],
    keyQuotes: [
      "The question isn't whether LRMs can reason, but whether our evaluations can distinguish reasoning from typing.",
      'River Crossing benchmarks include mathematically impossible instances for N\u22656.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/120-129/124_illusion_of_illusion_rebuttal.md',
  },
  {
    id: '2406.02061',
    title: 'Alice in Wonderland: Simple Tasks Showing Complete Reasoning Breakdown in SOTA LLMs',
    shortTitle: 'Alice in Wonderland',
    date: 'Jun 2024',
    stance: 'supports',
    cluster: 'compositional',
    coreArgument:
      'Strong evidence: Trivially simple family problem (M+1 sisters) causes complete breakdown. GPT-4o 65%, most models <20%. Wild 0-100% fluctuations on structurally identical variations. Control experiments rule out parsing/arithmetic issues.',
    keyEvidence: [
      'GPT-4o best at 64.9%, most models <20%, several 0%',
      '0% to 100% accuracy swing on same problem, different numbers',
      'AIW Light controls: 100% accuracy (rules out low-level issues)',
      'Confabulation: overconfident wrong explanations',
    ],
    keyQuotes: [
      'Strong fluctuations on natural, structure-preserving variations point to severe lack of robustness.',
      'Models with insufficient generalization are inherently unsafe.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/120-129/125_alice_in_wonderland.md',
  },
  {
    id: '2304.11082',
    title: 'Fundamental Limitations of Alignment in Large Language Models (BEB Theory)',
    shortTitle: 'BEB Alignment Limits',
    date: 'Apr 2023',
    stance: 'supports',
    cluster: 'mechanism',
    coreArgument:
      'Theoretical foundation: Any behavior with finite probability (α>0) can be triggered by prompts. RLHF increases β (distinguishability), making bad behaviors more easily targeted. ~3 sentences to misalign. System prompts provide only linear protection.',
    keyEvidence: [
      'BEB theorem: any α>0 behavior triggerable',
      'Prompt length = (1/β)(log(1/α) + log(1/ε))',
      'RLHF increases β 5x (double-edged sword)',
      '~3 sentences to misalign (log(1/α)/β ≈ 3)',
    ],
    keyQuotes: [
      'For any behavior with finite probability, there exist prompts that can trigger it.',
      'Any alignment process that attenuates an undesired behavior but does not remove it is not safe.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/120-129/126_fundamental_limitations_alignment.md',
  },
  {
    id: '2310.13548',
    title: 'Towards Understanding Sycophancy in Language Models',
    shortTitle: 'Understanding Sycophancy',
    date: 'Oct 2023',
    stance: 'supports',
    cluster: 'faithfulness',
    coreArgument:
      '5 AI assistants exhibit sycophancy across 4 tasks. Human preference data incentivizes sycophancy (~6% preference boost when matching beliefs). PM prefers sycophantic over truthful 95% of time. Claude 1.3 wrongly admits mistakes 98% when challenged.',
    keyEvidence: [
      '98% wrongly admit mistakes when challenged (Claude 1.3)',
      'PM prefers sycophantic 95% over baseline truthful',
      '~6% preference boost when response matches user beliefs',
      'Up to 27% accuracy drop from user suggestion (LLaMA 2)',
    ],
    keyQuotes: [
      "Matching a user's views is one of the most predictive features of human preference judgments.",
      'Claude 1.3 wrongly admits mistakes on 98% of questions.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/120-129/127_towards_understanding_sycophancy.md',
  },
  {
    id: '2501.13381',
    title: 'Do as We Do, Not as You Think: The Conformity of Large Language Models',
    shortTitle: 'LLM Conformity',
    date: 'Jan 2025',
    stance: 'supports',
    cluster: 'faithfulness',
    coreArgument:
      'ICLR 2025: All 11 LLMs show conformity to peer pressure in multi-agent systems. Average 47.2% conformity rate (Doubt protocol). LLMs abandon correct answers for wrong majority. Trust/doubt relationships form over time. Reflection doubles independence rate.',
    keyEvidence: [
      '47.2% avg conformity rate (Doubt protocol)',
      '91.2% CR for Llama3.1-8B under doubt',
      'IR doubles with reflection (28.6% → 68.5%)',
      'All 11 models vulnerable including GPT-4o',
    ],
    keyQuotes: [
      'Even simple problems can be influenced by peer pressure.',
      'LLMs may adopt majority opinions despite knowing correct answers.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/120-129/128_conformity_of_llms.md',
  },
  {
    id: '2412.21187',
    title: 'Do not Think That Much for 2+3=? On the Overthinking of o1-Like LLMs',
    shortTitle: 'Overthinking o1',
    date: 'Dec 2024',
    stance: 'supports',
    cluster: 'complexity',
    coreArgument:
      'o1-like models exhibit severe overthinking: first solution is correct >92% of time, yet models generate 1,953% more tokens than needed. More solutions generated for easier problems. Later solutions lack diversity (11.5% drop). ~45% token reduction maintains accuracy.',
    keyEvidence: [
      'First solution correct >92% of cases',
      '1,953% token overhead on "2+3=5"',
      'More solutions for easier problems',
      'Distinctness drops 11.5% at solution #4+',
      '~45% token reduction maintains accuracy',
    ],
    keyQuotes: [
      'On average, o1-like models consumed 1,953% more tokens than conventional models.',
      'In more than 92% of cases, the initial round of solutions produces the correct answer.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/120-129/129_overthinking_o1_llms.md',
  },
  {
    id: '2501.18585',
    title: 'Thoughts Are All Over the Place: On the Underthinking of o1-Like LLMs',
    shortTitle: 'Underthinking o1',
    date: 'Jan 2025',
    stance: 'supports',
    cluster: 'complexity',
    coreArgument:
      'Companion to Overthinking paper. o1-like models abandon correct reasoning paths prematurely. 225% more tokens and 418% more thought switches in incorrect vs correct responses. >70% of incorrect responses contain at least one correct thought that was abandoned.',
    keyEvidence: [
      '225% more tokens in incorrect responses',
      '418% more thought switches in incorrect',
      '>70% incorrect contain correct thought',
      'First thoughts often correct but abandoned',
      'Tip penalty improves accuracy without training',
    ],
    keyQuotes: [
      'On average, o1-like LLMs consume 225% more tokens in incorrect responses.',
      'Over 70% of incorrect responses contain at least one correct thought.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/130-139/130_underthinking_o1_llms.md',
  },
  {
    id: '2403.04121',
    title: 'Can Large Language Models Reason and Plan?',
    shortTitle: 'LLMs Reason & Plan?',
    date: 'Mar 2024',
    stance: 'supports',
    cluster: 'faithfulness',
    coreArgument:
      'Kambhampati argues LLMs are "n-gram models on steroids" doing "universal approximate retrieval," not reasoning. Obfuscation destroys planning performance. Self-verification makes things worse. LLMs valuable as knowledge sources, not reasoners.',
    keyEvidence: [
      'Obfuscation plummets GPT-4 planning',
      'Self-verification worsens performance',
      'LLMs = external System 1, not System 2',
      'Fine-tuning = memory compilation',
      'LLM-Modulo: LLMs + external verifiers',
    ],
    keyQuotes: [
      'LLMs are perhaps best seen as giant non-veridical memories akin to an external System 1.',
      "When we obfuscated names, GPT4's performance plummeted precipitously.",
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/130-139/131_can_llms_reason_and_plan.md',
  },
  {
    id: '2504.09762',
    title: 'Stop Anthropomorphizing Intermediate Tokens as Reasoning/Thinking Traces!',
    shortTitle: 'Stop Anthropomorphizing',
    date: 'May 2025',
    stance: 'supports',
    cluster: 'faithfulness',
    coreArgument:
      'Position paper: Kambhampati argues anthropomorphizing CoT as "thinking" is harmful. Traces have no semantics; incorrect traces outperform correct ones. "Aha moments" meaningless. LRMs "compile reasoning into retrieval via learning."',
    keyEvidence: [
      'Incorrect traces outperform correct',
      'R1-Zero > R1 (interpretability hurts)',
      '"Aha" = just another token',
      'Loose correlation trace ↔ solution',
      'Compiling verification into generation',
    ],
    keyQuotes: [
      "While a human may say 'aha' to indicate a sudden internal state change, this is unwarranted for models.",
      'Post-training LRMs can be seen as iteratively compiling reasoning into retrieval.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/130-139/132_stop_anthropomorphizing_tokens.md',
  },
  {
    id: '2510.07364',
    title: 'Base Models Know How to Reason, Thinking Models Learn When',
    shortTitle: 'Base Models Reason',
    date: 'Oct 2025',
    stance: 'supports',
    cluster: 'mechanistic',
    coreArgument:
      'CRITICAL Surfacing evidence: Base models already possess reasoning mechanisms. Thinking models learn when to deploy them, nothow. Hybrid model recovers 91% of gap by steering only 12% of tokens. RLVR teaches timing, not reasoning.',
    keyEvidence: [
      '91% gap recovery with 12% token steering',
      'No weight updates needed',
      'RLVR teaches timing, not capability',
      'Two-component decomposition',
      'Steering vectors transfer across models',
    ],
    keyQuotes: [
      'Base models already possess the fundamental reasoning capabilities; thinking models learn when to deploy them.',
      'Our hybrid model recovers up to 91% of the performance gap while steering only 12% of tokens.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/130-139/133_base_models_know_how_to_reason.md',
  },
  {
    id: '2410.09695',
    title: 'Can In-context Learning Really Generalize to Out-of-distribution Tasks?',
    shortTitle: 'ICL OOD Generalization',
    date: 'Oct 2024',
    stance: 'supports',
    cluster: 'compositional',
    coreArgument:
      'Critical OOD evidence: ICL implements pretraining function classes, not new reasoning. When faced with OOD tasks, ICL behaves like gradient descent on pretraining functions. Abstract label learning only works when underlying task is ID.',
    keyEvidence: [
      '~10% OOD accuracy = random guessing (Llama-3-8B)',
      'ICL = pretraining function class + GD optimization',
      'Abstract labels work only when function is ID',
      'Algorithm selection by lowest test error',
      'Double descent reveals ID behavior on OOD tests',
    ],
    keyQuotes: [
      'ICL performance resembles implementing a function within the pretraining hypothesis space.',
      'Llama-3-8B may not learn new tasks through ICL, but can solve tasks through retrieval.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/130-139/134_can_icl_generalize_ood.md',
  },
  {
    id: '2502.03373',
    title: 'Demystifying Long Chain-of-Thought Reasoning in LLMs',
    shortTitle: 'Demystifying Long CoT',
    date: 'Feb 2025',
    stance: 'supports',
    cluster: 'mechanistic',
    coreArgument:
      'Surfacing mechanism: Core abilities (error correction, backtracking) inherently present in base models. Long CoT patterns exist in pretraining data (OpenWebMath). Short CoT saturates at ~55%; RL incentivizes pre-existing skills, doesnt create new ones.',
    keyEvidence: [
      'Long CoT scales to >70%, short saturates at ~55%',
      'RL incentivizes, doesnt create capabilities',
      'Long CoT patterns found in OpenWebMath',
      'Base model has latent long CoT capabilities',
      'Short CoT + RL = ~0% improvement',
    ],
    keyQuotes: [
      'Core abilities like error correction are inherently present in base models.',
      "We hypothesize that base models may already possess certain latent 'long CoT' capabilities.",
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/130-139/135_demystifying_long_cot.md',
  },
  {
    id: '2405.04776',
    title: 'Chain of Thoughtlessness? An Analysis of CoT in Planning',
    shortTitle: 'Chain of Thoughtlessness',
    date: 'May 2024',
    stance: 'supports',
    cluster: 'faithfulness',
    coreArgument:
      'NeurIPS 2024 (Kambhampati): CoT doesnt teach algorithms. Performance requires "exceedingly specific" problem-class prompts. Improvements rapidly deteriorate past example sizes. Same failure mode across 3 domains. Sharp tradeoff: gains require massive human labor.',
    keyEvidence: [
      'CoT not algorithm learning, just pattern matching',
      'Requires exceedingly specific prompts',
      'Performance degrades past example stack size n',
      'Same failure across 3 domains (Blocksworld etc)',
      'Sharp tradeoff: gains vs human labor',
    ],
    keyQuotes: [
      "CoT's performance improvements do not stem from learning general algorithmic procedures.",
      'Those improvements quickly deteriorate as query size grows past the examples shown.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/130-139/136_chain_of_thoughtlessness.md',
  },
  {
    id: '2502.04667',
    title:
      'Unveiling the Mechanisms of Explicit CoT Training: How CoT Enhances Reasoning Generalization',
    shortTitle: 'CoT Training Mechanisms',
    date: 'Feb 2025',
    stance: 'supports',
    cluster: 'mechanistic',
    coreArgument:
      'Controlled evidence: Non-CoT achieves 100% ID but 0% OOD. CoT training internalizes two-stage circuit; intermediate results at layer 3 (vs layer 5 non-CoT). CoT works by exposing all subtask patterns, not teaching reasoning. "OOD" = novel combinations of ID patterns.',
    keyEvidence: [
      'Non-CoT: 100% ID, 0% OOD accuracy',
      'CoT: 100% ID and 100% OOD',
      'Intermediate results at layer 3 (CoT) vs 5 (non-CoT)',
      'Non-CoT requires >1M steps (grokking), CoT needs ~4,000',
      'Theorem: OOD error depends critically on CoT',
    ],
    keyQuotes: [
      'Training without CoT fails to generalize \u2014 OOD test samples involve unseen reasoning patterns.',
      'CoT-trained models resolve intermediate results at shallower layers.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/130-139/137_mechanisms_explicit_cot_training.md',
  },
  {
    id: '2508.15842',
    title: 'Lexical Hints of Accuracy in LLM Reasoning Chains',
    shortTitle: 'Lexical Accuracy Hints',
    date: 'Aug 2025',
    stance: 'supports',
    cluster: 'faithfulness',
    coreArgument:
      'Surface lexical markers ("guess", "stuck", "hard") predict errors better than model confidence. 84.6% calibration error on HLE (~9% accuracy). Models have no metacognition. 5-word rule achieves MCC=0.305 — 4x better than confidence thresholding.',
    keyEvidence: [
      'Harmful words reduce accuracy by 40%',
      '84.6% calibration error (Claude on HLE)',
      'Longer CoT = LOWER accuracy on Omni-MATH',
      '5-word rule MCC=0.305 vs confidence MCC=0.065',
      'Errors easier to predict than correct responses',
    ],
    keyQuotes: [
      'On benchmarks where LLMs achieve low accuracy, they often report high self-confidence.',
      "Tokens such as 'guess', 'stuck', 'hard' reduce accuracy odds by up to 40%.",
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/130-139/138_lexical_hints_accuracy_cot.md',
  },
  {
    id: '2512.24601',
    title: 'Recursive Language Models',
    shortTitle: 'Recursive LMs',
    date: 'Dec 2025',
    stance: 'balanced',
    cluster: 'architecture',
    coreArgument:
      'ICML (MIT, Stanford): RLMs treat prompts as external REPL variables. GPT-5 suffers context rot (OOLONG-Pairs: 0.1%); RLM(GPT-5): 58%. Scaffolding needed for complex reasoning — engineering around limitations, not genuine emergence.',
    keyEvidence: [
      'GPT-5 Base: 0.1% → RLM: 58% on OOLONG-Pairs',
      'Context rot: GPT-5 degrades past 32K on O(N) tasks',
      'Fine-tuned RLM-8B: +28.3% avg improvement',
      'RLMs scale to 10M+ tokens',
      'Only 1,000 samples needed for fine-tuning',
    ],
    keyQuotes: [
      'Frontier reasoning models exhibit context rot \u2014 quality degrades steeply as prompts get longer.',
      'Long prompts should be treated as part of the environment the LLM interacts with symbolically.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/130-139/139_recursive_language_models.md',
  },
  {
    id: '2601.21894',
    title: 'Not All Code Is Equal: Code Complexity and LLM Reasoning',
    shortTitle: 'Code Complexity',
    date: 'Jan 2026',
    stance: 'supports',
    cluster: 'mechanism',
    coreArgument:
      'ICML: 83% of experiments show complexity-restricted training beats diverse. Models respond to SURFACE structural properties (cyclomatic complexity), not semantic content. Model-specific optimal complexity.',
    keyEvidence: [
      '83% experiments: complexity-restricted > diverse',
      'Qwen peaks at CC≈10, Llama shows negative correlation',
      'High complexity can harm reasoning (below NL baseline)',
      'Model-specific optimal complexity bands',
    ],
    keyQuotes: [
      'Not all code is equal \u2014 improvements depend strongly on structural complexity.',
      'Previously reported gains may stem less from diversity and more from incidental exposure to particular properties.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/140-149/140_not_all_code_is_equal.md',
  },
  {
    id: '2601.21909',
    title: 'From Meta-Thought to Execution: Cognitively Aligned Post-Training',
    shortTitle: 'Meta-Thought',
    date: 'Jan 2026',
    stance: 'balanced',
    cluster: 'mechanism',
    coreArgument:
      'ICML: +4.63% OOD improvement but OOD = same domain (math). Diagnoses standard CoT as "trajectory imitation". CoMT learns abstract patterns without numerical calculations.',
    keyEvidence: [
      '+2.19% ID, +4.63% OOD improvement',
      'All "OOD" benchmarks are math word problems',
      'CoT-SFT = trajectory imitation',
      'Meta-thought separates structure from content',
    ],
    keyQuotes: [
      'CoT-SFT encourages imitation of complete reasoning trajectories.',
      'Human problem-solving exhibits precisely the property we seek \u2014 robust generalization from limited experience.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/140-149/141_meta_thought_to_execution.md',
  },
  {
    id: '2601.21414',
    title: 'System 1&2 Synergy via Dynamic Model Interpolation',
    shortTitle: 'System 1&2 Synergy',
    date: 'Jan 2026',
    stance: 'balanced',
    cluster: 'mechanism',
    coreArgument:
      'IJCAI: Linear interpolation θ = (1-λ)·θ_instruct + λ·θ_thinking works smoothly. "Thinking" is quantitative (λ parameter), not qualitative capability. System 1 and System 2 share continuous representation space.',
    keyEvidence: [
      'Linear interpolation works (λ=0 to λ=1)',
      'Smooth accuracy transitions',
      'Output length is symptom, not cause',
      'DAMI outperforms static models',
    ],
    keyQuotes: [
      "Output length is merely a symptom of the model's cognitive configuration, not the root cause.",
      'Linear interpolation yields a convex, monotonic Pareto frontier.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/140-149/142_system_1_2_synergy_interpolation.md',
  },
  {
    id: '2405.15071',
    title: 'Grokked Transformers are Implicit Reasoners',
    shortTitle: 'Grokked Transformers',
    date: 'May 2024',
    stance: 'balanced',
    cluster: 'mechanism',
    coreArgument:
      'NeurIPS 2024: Implicit reasoning emerges only through grokking (extended training). Composition fails OOD (0%) but comparison succeeds (~100%). Non-recurrent architecture prevents cross-layer memory sharing.',
    keyEvidence: [
      'ID: ~100% after grokking; OOD composition: 0%',
      'Comparison OOD: ~100% (parallel circuit)',
      'Data distribution > data size for grokking',
      'Grokked transformer beats GPT-4-Turbo',
    ],
    keyQuotes: [
      'Transformers can learn implicit reasoning, but only through grokking \u2014 extended training far beyond overfitting.',
      'When faced with OOD examples, transformers fail to systematically generalize for composition.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/140-149/143_grokked_transformers_implicit_reasoners.md',
  },
  {
    id: '2407.01687',
    title: 'Deciphering CoT: Probability, Memorization, Noisy Reasoning',
    shortTitle: 'Deciphering CoT',
    date: 'Jul 2024',
    stance: 'supports',
    cluster: 'faithfulness',
    coreArgument:
      'EMNLP 2024: CoT performance = probability + memorization + noisy reasoning. Output probability swings GPT-4 accuracy from 26% to 70%. rot-13 spike from training frequency. Invalid demonstrations still work.',
    keyEvidence: [
      '26% → 70% from output probability alone',
      'rot-13 spike despite max difficulty (memorization)',
      'Number-CoT ~100% vs Text-CoT 32%',
      'Invalid demonstrations still work',
    ],
    keyQuotes: [
      'CoT prompting performance reflects both memorization and a probabilistic version of genuine reasoning.',
      "Varying output's probability of occurrence shifts accuracy from 26% to 70%.",
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/140-149/144_deciphering_cot_probability_memorization.md',
  },
  {
    id: '2409.12917',
    title: 'SCoRe: Training LMs to Self-Correct via RL',
    shortTitle: 'SCoRe',
    date: 'Sep 2024',
    stance: 'balanced',
    cluster: 'mechanism',
    coreArgument:
      'DeepMind: Self-correction ineffective in standard LLMs. SFT fails due to distribution mismatch + behavior collapse. Multi-turn RL on self-generated traces enables effective self-correction (+15.6% MATH).',
    keyEvidence: [
      '+15.6% MATH, +9.1% HumanEval',
      'SFT fails: distribution mismatch',
      'Behavior collapse to single mode',
      'Must train on own error distribution',
    ],
    keyQuotes: [
      'Self-correction has consistently been found to be largely ineffective in modern LLMs.',
      'Training via SFT falls prey to distribution mismatch or behavior collapse.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/140-149/145_score_self_correction_rl.md',
  },
  {
    id: '2304.15004',
    title: 'Are Emergent Abilities of Large Language Models a Mirage?',
    shortTitle: 'Emergent Mirage',
    date: 'Apr 2023',
    stance: 'supports',
    cluster: 'mechanism',
    coreArgument:
      'NeurIPS 2023: Emergent abilities are measurement artifacts, not real. >92% of BIG-Bench emergence from 2 metrics (Exact Match, MCQ). Same outputs → different conclusions via metric choice. Linear metrics show smooth scaling.',
    keyEvidence: [
      '>92% emergence from 2 metrics',
      'Same outputs, different conclusions',
      'Linear metrics ablate emergence',
      'Small models have non-zero capability',
    ],
    keyQuotes: [
      "Emergent abilities appear due to the researcher's choice of metric rather than fundamental changes in model behavior.",
      'The researcher can choose a metric to create or ablate an emergent ability.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/140-149/146_emergent_abilities_mirage.md',
  },
  {
    id: '2202.07206',
    title: 'Impact of Pretraining Term Frequencies on Few-Shot Reasoning',
    shortTitle: 'Term Frequencies',
    date: 'Feb 2022',
    stance: 'supports',
    cluster: 'evidence',
    coreArgument:
      'EMNLP 2022: LLM accuracy correlates >70% with training term frequency. Performance varies dramatically on adjacent numbers (24×18 vs 23×18). If models learned algorithms, accuracy would be uniform.',
    keyEvidence: [
      '>70% accuracy gap (top vs bottom 10%)',
      '77.6% gap on multiplication',
      'Even simple unigram frequency correlates',
      'Challenges "reasoning" vs "memorization"',
    ],
    keyQuotes: [
      'Models are more accurate on instances whose terms are more prevalent \u2014 above 70% more accurate on top 10% vs bottom 10%.',
      'High performance on reasoning benchmarks may reflect dataset overlap rather than reasoning capability.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/140-149/147_pretraining_term_frequencies.md',
  },
  {
    id: '2305.04388',
    title: "Language Models Don't Always Say What They Think",
    shortTitle: 'Unfaithful CoT',
    date: 'May 2023',
    stance: 'supports',
    cluster: 'evidence',
    coreArgument:
      'NeurIPS 2023: CoT explanations systematically misrepresent true reasons. 36% accuracy drop from biasing; models never mention bias in CoT. Zero-shot CoT makes models more susceptible to bias. 15% of unfaithful explanations have no errors.',
    keyEvidence: [
      '-36% accuracy from suggested answer bias',
      '1/426 explanations mention bias',
      'CoT makes bias susceptibility worse',
      '15% unfaithful explanations appear sound',
    ],
    keyQuotes: [
      'CoT explanations can be heavily influenced by adding biasing features which models fail to mention.',
      '15% of unfaithful explanations have no obvious errors.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/140-149/148_language_models_dont_say_what_think.md',
  },
  {
    id: '2309.12288',
    title: 'The Reversal Curse: LLMs trained on "A is B" fail to learn "B is A"',
    shortTitle: 'Reversal Curse',
    date: 'Sep 2023',
    stance: 'supports',
    cluster: 'evidence',
    coreArgument:
      'LLMs store directional patterns, not relational knowledge. Trained on "A is B", reverse accuracy = 0% (complete failure). GPT-4: 79% forward vs 33% reverse on real celebrities. In-context works but training doesnt learn symmetry.',
    keyEvidence: [
      '0% reverse accuracy (finetuning)',
      'GPT-4: 79% forward, 33% reverse',
      'Correct name prob = random baseline',
      'Data augmentation doesnt help',
    ],
    keyQuotes: [
      "If a model is trained on 'A is B', it will not automatically generalize to 'B is A'.",
      'The gradient update is myopic \u2014 depends on logits over B given A, not on predicting A from B.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/140-149/149_reversal_curse.md',
  },
  {
    id: '2305.15771',
    title: 'On the Planning Abilities of Large Language Models',
    shortTitle: 'Planning Abilities',
    date: 'May 2023',
    stance: 'supports',
    cluster: 'evidence',
    coreArgument:
      'NeurIPS 2023 Spotlight (Kambhampati): GPT-4 achieves only ~12% success on autonomous planning. LLMs generate text that looks like plans but doesnt execute. LLM-Modulo framework: use LLMs as heuristics, external systems for correctness.',
    keyEvidence: [
      'GPT-4: ~12% autonomous planning success',
      'External verifiers required for soundness',
      'Plan-like text ≠ valid plans',
      'LLM-Modulo improves with feedback',
    ],
    keyQuotes: [
      "LLMs' ability to generate executable plans autonomously is rather limited \u2014 best model ~12% success.",
      'LLM-generated plans can improve the search process for underlying sound planners.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/150-159/150_planning_abilities_llms.md',
  },
  // Paper 151: Original CoT (Wei et al.)
  {
    id: '2201.11903',
    title: 'Chain-of-Thought Prompting Elicits Reasoning in Large Language Models',
    shortTitle: 'Original CoT',
    date: 'Jan 2022',
    stance: 'challenges',
    cluster: 'mechanism',
    coreArgument:
      'NeurIPS 2022: Original CoT paper. 540B PaLM + 8 CoT exemplars = 58% GSM8K. CoT benefits emerge at ~100B+ params. Claims reasoning abilities "emerge naturally" at scale. Later challenged by faithfulness research.',
    keyEvidence: [
      '58% GSM8K (surpassed fine-tuned GPT-3)',
      'Benefits emerge only at ~100B+ params',
      'No fine-tuning required',
      '74% with self-consistency',
    ],
    keyQuotes: [
      'We explore how generating a chain of thought significantly improves ability to perform complex reasoning.',
      'Successful chain of thought reasoning is an emergent property of model scale \u2014 around 100B parameters.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/150-159/151_chain_of_thought_prompting_original.md',
  },
  // Paper 152: Expressive Power of CoT (Merrill & Sabharwal)
  {
    id: '2310.07923',
    title: 'The Expressive Power of Transformers with Chain of Thought',
    shortTitle: 'CoT Expressivity',
    date: 'Oct 2023',
    stance: 'balanced',
    cluster: 'mechanism',
    coreArgument:
      'ICLR 2024: Proves CoT increases computational power. O(n) steps = all regular languages. O(n^c) steps = exactly class P. However, expressivity ≠ learnability. Theory contradicted by practice (~12% planning success).',
    keyEvidence: [
      'Linear steps enable automata simulation',
      'Polynomial steps = exactly P',
      'Layer-norm hash for memory storage',
      'Expressivity ≠ learnability caveat',
    ],
    keyQuotes: [
      'The answer is yes, but the amount of increase depends crucially on the amount of intermediate generation.',
      'Running a polynomial number of forward passes with a large transformer is likely intractable in practice.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/150-159/152_expressive_power_transformers_cot.md',
  },
  // Paper 153: PlanBench (Kambhampati)
  {
    id: '2206.10498',
    title: 'PlanBench: Evaluating LLMs on Planning and Reasoning about Change',
    shortTitle: 'PlanBench',
    date: 'Jun 2022',
    stance: 'supports',
    cluster: 'evidence',
    coreArgument:
      'NeurIPS D&B 2023: Kambhampatis benchmark. IPC domains distinguish planning from retrieval. Mystery Blocksworld tests true planning. LLMs fail on critical capabilities.',
    keyEvidence: [
      'IPC domains for rigorous evaluation',
      'Mystery Blocksworld obfuscates patterns',
      'Plan generation, verification, tracking',
      'Extensible benchmark framework',
    ],
    keyQuotes: [
      'Most claims about LLM planning capabilities are based on common sense tasks \u2014 hard to tell if LLMs are planning or retrieving.',
      'On many critical capabilities, LLM performance falls quite short, even with SOTA models.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/150-159/153_planbench.md',
  },
  // Paper 154: Zero-Shot CoT (Kojima et al.)
  {
    id: '2205.11916',
    title: 'Large Language Models are Zero-Shot Reasoners',
    shortTitle: 'Zero-Shot CoT',
    date: 'May 2022',
    stance: 'challenges',
    cluster: 'mechanism',
    coreArgument:
      'NeurIPS 2022: "Lets think step by step" improves reasoning without examples. +61pp on MultiArith, +30pp on GSM8K. Claims "untapped zero-shot capabilities" but later challenged by bias susceptibility research.',
    keyEvidence: [
      '+61pp MultiArith (17.7%→78.7%)',
      '+30pp GSM8K (10.4%→40.7%)',
      'Single prompt works across tasks',
      'Two-stage: reasoning then answer',
    ],
    keyQuotes: [
      "LLMs are decent zero-shot reasoners by simply adding 'Let's think step by step'.",
      'The versatility of this single prompt hints at untapped fundamental zero-shot capabilities.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/150-159/154_zero_shot_cot.md',
  },
  // Paper 155: Self-Consistency (Wang et al.)
  {
    id: '2203.11171',
    title: 'Self-Consistency Improves Chain of Thought Reasoning',
    shortTitle: 'Self-Consistency',
    date: 'Mar 2022',
    stance: 'challenges',
    cluster: 'mechanism',
    coreArgument:
      'ICLR 2023: Sample diverse reasoning paths + majority vote. +17.9pp GSM8K, +11pp SVAMP. Mechanism is statistical variance reduction; challenged by CoT Mirage showing voting wont help when OOD=0%.',
    keyEvidence: [
      '+17.9pp GSM8K (56.5%→74.4%)',
      '+11.0pp SVAMP',
      'Majority vote over diverse paths',
      'Improvement scales with samples',
    ],
    keyQuotes: [
      'A complex reasoning problem typically admits multiple different ways of thinking leading to its unique correct answer.',
      'Self-consistency boosts chain-of-thought prompting with a striking margin.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/150-159/155_self_consistency.md',
  },
  // Paper 156: LLMs Still Can't Plan; Can LRMs? (Kambhampati et al.)
  {
    id: '2409.13373',
    title: "LLMs Still Can't Plan; Can LRMs? A Preliminary Evaluation of OpenAI's o1 on PlanBench",
    shortTitle: 'o1 on PlanBench',
    date: 'Sep 2024',
    stance: 'balanced',
    cluster: 'complexity',
    coreArgument:
      'o1 shows "quantum improvement" over LLMs (97.8% vs 62.6% Blocksworld) but still fails on obfuscated tasks (52.8% Mystery BW) and longer problems (23.6% at 20+ steps). Fast Downward achieves 100% at ~$0.',
    keyEvidence: [
      'o1-preview: 97.8% Blocksworld vs LLaMA 62.6%',
      'Mystery BW: 52.8% (LLMs: 0%)',
      '20+ step problems: 23.6%',
      'Cost: $42.12 vs Fast Downward ~$0',
    ],
    keyQuotes: [
      "While o1's performance is a quantum improvement, it is still far from saturating the benchmark.",
      'When o1 gives an incorrect answer, it sometimes provides creative, nonsensical justification — from hallucinating to gaslighting!',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/150-159/156_llms_still_cant_plan_lrms.md',
  },
  // Paper 157: Token Bias (Jiang et al.)
  {
    id: '2406.11050',
    title: 'A Peek into Token Bias: Large Language Models Are Not Yet Genuine Reasoners',
    shortTitle: 'Token Bias',
    date: 'Jun 2024',
    stance: 'supports',
    cluster: 'evidence',
    coreArgument:
      'EMNLP 2024: Statistical hypothesis testing proves LLMs rely on token bias, not reasoning. 6 hypotheses rejected. Predicts 91% of failures from surface token patterns.',
    keyEvidence: [
      '6 hypotheses rejected with significance',
      'Misleading options cause failures',
      'Hint tokens ("conjunction fallacy") massively improve accuracy',
      '91% failure prediction from reconstructed algorithms',
    ],
    keyQuotes: [
      'Most LLMs still struggle with logical reasoning \u2014 success largely depends on recognizing superficial patterns.',
      'By reconstructing these algorithms, we are able to correctly predict 91% of failure cases.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/150-159/157_token_bias_not_genuine_reasoners.md',
  },
  // Paper 158: Can Transformers Learn Recursively (Zhang et al.)
  {
    id: '2305.14699',
    title: 'Can Transformers Learn to Solve Problems Recursively?',
    shortTitle: 'Recursive Problems',
    date: 'May 2023',
    stance: 'supports',
    cluster: 'compositional',
    coreArgument:
      'Transformers learn "shortcut" algorithms instead of true recursion. Mechanistic interpretability allows predicting 91% of failure cases by reconstructing learned algorithms.',
    keyEvidence: [
      '91% failure prediction from reconstructed algorithms',
      'Shortcut algorithms instead of recursion',
      'Symbolic tools outperform on recursive tasks',
      'Failures predictable from surface patterns',
    ],
    keyQuotes: [
      'By reconstructing these algorithms, we are able to correctly predict 91 percent of failure cases.',
      'Our work provides a new foundation for understanding neural networks that fail to solve tasks they are trained for.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/150-159/158_transformers_recursive_problems.md',
  },
  // Paper 159: ALiBi Length Extrapolation (Press et al.)
  {
    id: '2108.12409',
    title:
      'Train Short, Test Long: Attention with Linear Biases Enables Input Length Extrapolation',
    shortTitle: 'ALiBi',
    date: 'Aug 2021',
    stance: 'balanced',
    cluster: 'mechanism',
    coreArgument:
      'ICLR 2022: Linear attention biases enable length extrapolation without retraining. Train on 1024, extrapolate to 2048. 11% faster, 11% less memory. Addresses length but not compositional OOD.',
    keyEvidence: [
      'Train 1024 → test 2048 extrapolation',
      '11% faster, 11% less memory',
      'Same perplexity as training on longer sequences',
      'Recency bias improves WikiText-103',
    ],
    keyQuotes: [
      'Models trained on sequences of length 1024 can extrapolate to length 2048 with the same perplexity.',
      'ALiBi is more efficient than sinusoidal position embeddings while enabling extrapolation.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/150-159/159_alibi_length_extrapolation.md',
  },
  // Paper 160: GSM-IC Distracted by Irrelevant Context (Shi et al.)
  {
    id: '2302.00093',
    title: 'Large Language Models Can Be Easily Distracted by Irrelevant Context',
    shortTitle: 'GSM-IC',
    date: 'Jan 2023',
    stance: 'supports',
    cluster: 'evidence',
    coreArgument:
      'ICML 2023: GSM-IC benchmark shows LLMs dramatically fail when irrelevant info added. Precursor to GSM-Symbolic. Self-consistency and instructions help but dont fully solve.',
    keyEvidence: [
      'Dramatic accuracy drop with irrelevant context',
      'All prompting techniques affected',
      'Self-consistency partially mitigates',
      'Explicit instructions help but incomplete',
    ],
    keyQuotes: [
      'We find that the model performance is dramatically decreased when irrelevant information is included.',
      'Large language models have achieved impressive performance... However, so far they have been evaluated primarily on benchmarks where all information in the input context is relevant.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/160-169/160_gsm_ic_distracted_irrelevant_context.md',
  },
  // Paper 161: Let's Think Dot by Dot (Pfau et al.)
  {
    id: '2404.15758',
    title: "Let's Think Dot by Dot: Hidden Computation in Transformer Language Models",
    shortTitle: 'Dot by Dot',
    date: 'Apr 2024',
    stance: 'supports',
    cluster: 'mechanistic',
    coreArgument:
      'Meaningless filler tokens ("......") can replace CoT with equivalent performance. Benefits stem from additional computation, not human-like task decomposition.',
    keyEvidence: [
      '100% vs 66% on 3SUM with filler tokens',
      'Requires parallelizable CoT supervision',
      "Current LLMs (GPT-3.5, Claude 2) don't benefit from filler tokens",
      '93.6% vs 78.7% on 2SUM-Transform',
    ],
    keyQuotes: [
      'Chain-of-thought tokens need not provide information about the intermediate computational steps involved in multi-token computations.',
      'The fact that intermediate tokens can act as filler tokens raises concerns about large language models engaging in unauditable, hidden computations.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/160-169/161_dot_by_dot_filler_tokens.md',
  },
  // Paper 162: Pause Tokens Strictly Increase Expressivity (London & Kanade)
  {
    id: '2505.21024',
    title: 'Pause Tokens Strictly Increase the Expressivity of Constant-Depth Transformers',
    shortTitle: 'Pause Tokens',
    date: 'May 2025',
    stance: 'supports',
    cluster: 'mechanistic',
    coreArgument:
      'First formal proof that pause tokens strictly increase Transformer expressivity. TF[1,L,P] = AC⁰. Parity learnable with pause tokens, impossible without.',
    keyEvidence: [
      'TF[1,L,0] ⊊ TF[1,L,P] (strict separation)',
      'TF[L,L,P] = TC⁰',
      '100% parity accuracy with pause tokens vs 50% without',
      'Extends to 300-bit sequences',
    ],
    keyQuotes: [
      'We provide the first formal separation result, proving that adding pause tokens to constant-depth, logarithmic-width Transformers strictly increases their computational expressivity.',
      "Pause tokens provide 'wider' parallel computation, while CoT enables 'deeper' sequential computation.",
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/160-169/162_pause_tokens_expressivity.md',
  },
  // Paper 163: Mechanistic Understanding of CoT (Dutta et al.)
  {
    id: '2402.18312',
    title: 'How to think step-by-step: A mechanistic understanding of chain-of-thought reasoning',
    shortTitle: 'Mechanistic CoT',
    date: 'Feb 2024',
    stance: 'supports',
    cluster: 'mechanistic',
    coreArgument:
      'First mechanistic analysis of CoT reasoning in production LLMs. LLMs deploy multiple parallel pathways of answer generation via induction-circuit compositions, not symbolic reasoning.',
    keyEvidence: [
      'Functional rift at layer 16 separates processing phases',
      'Answer-writing heads all appear at layers 17-32',
      'Token mixing for ontological relations peaks at layers 10-15',
      'Parallel pathways collect from CoT, question, AND few-shot context',
      '35.9% accuracy on fictional ontology reasoning',
    ],
    keyQuotes: [
      'We observe a functional rift at the very middle of the LLM (16th decoder block), which marks a phase shift in the content of residual streams and the functionality of the attention heads.',
      'Despite different reasoning requirements across different stages of CoT generation, the functional components of the model remain almost the same. Different neural algorithms are implemented as compositions of induction circuit-like mechanisms.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/160-169/163_mechanistic_understanding_cot.md',
  },
  // Paper 164: Proof or Bluff (Petrov et al.)
  {
    id: '2503.21934',
    title: 'Proof or Bluff? Evaluating LLMs on 2025 USA Math Olympiad',
    shortTitle: 'Proof or Bluff',
    date: 'Mar 2025',
    stance: 'supports',
    cluster: 'compositional',
    coreArgument:
      'Expert human evaluation of USAMO 2025 proofs reveals massive gap between answer-only and proof-based performance. Best model 25%, all others under 5%.',
    keyEvidence: [
      'Gemini-2.5-Pro: 25% (10.1/42); all others <5%',
      'Logic errors most common failure mode',
      'Automated grading overestimated scores by up to 20x',
      'GRPO training artifacts: answer-boxing compulsion',
      'Models claim success even when failing',
    ],
    keyQuotes: [
      'Our results reveal that all tested models struggled significantly: only Gemini-2.5-Pro achieves a non-trivial score of 25%, while all other models achieve less than 5%.',
      'All evaluated LLMs consistently claimed to have solved the problems. This discrepancy poses a significant challenge for mathematical applications.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/160-169/164_proof_or_bluff_usamo.md',
  },
  // Paper 165: Hallucination is Inevitable (Xu et al.)
  {
    id: '2401.11817',
    title: 'Hallucination is Inevitable: An Innate Limitation of Large Language Models',
    shortTitle: 'Hallucination Inevitable',
    date: 'Jan 2024',
    stance: 'supports',
    cluster: 'theoretical',
    coreArgument:
      'Computability theory proof that hallucination is mathematically inevitable for LLMs used as general problem solvers. Diagonalization shows any LLM will fail on some computable function.',
    keyEvidence: [
      'Theorem 3: For all computable LLMs, exists f such that LLM hallucinates',
      'Corollary 1: Self-correction cannot eliminate hallucination',
      'All LLMs failed linear order transitive reasoning task',
      'All LLMs failed combinatorial list task L(7,{a,b})',
      'External tools only mitigation',
    ],
    keyQuotes: [
      'All computable LLMs cannot prevent themselves from hallucinating... methods relying on LLMs themselves to mitigate hallucination cannot eliminate hallucination.',
      'All LLMs trained only with input-output pairs will hallucinate when used as general problem solvers.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/160-169/165_hallucination_inevitable.md',
  },
  // Paper 166: SWE-Bench Illusion (Liang et al.)
  {
    id: '2506.12286',
    title: 'The SWE-Bench Illusion: When State-of-the-Art LLMs Remember Instead of Reason',
    shortTitle: 'SWE-Bench Illusion',
    date: 'Jun 2025',
    stance: 'supports',
    cluster: 'compositional',
    coreArgument:
      'SWE-Bench performance is partially driven by memorization not reasoning. Models achieve 76% file path accuracy without repo context on SWE-Bench, but only 53% on external repos.',
    keyEvidence: [
      '76% file path accuracy (SWE-Bench) vs <53% (external repos)',
      '35% 5-gram overlap (SWE-Bench) vs 18% (other benchmarks)',
      'Up to 31.6% verbatim code match from prefix alone',
      'Cross-vendor consistency indicates systematic training exposure',
      'Post-cutoff performance drops to baseline',
    ],
    keyQuotes: [
      'The ability of models to reproduce exact code sequences when provided merely with contextual prefixes strongly suggests that performance reflects memorization rather than algorithmic reasoning.',
      'High scores on SWE-Bench are not purely indicative of generalizable coding abilities. Instead, they are likely inflated by these confounding factors.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/160-169/166_swe_bench_illusion.md',
  },
  // Paper 167: Faithful CoT (Lyu et al.)
  {
    id: '2301.13379',
    title: 'Faithful Chain-of-Thought Reasoning',
    shortTitle: 'Faithful CoT',
    date: 'Jan 2023',
    stance: 'supports',
    cluster: 'faithfulness',
    coreArgument:
      'Standard CoT is unfaithful — the reasoning chain does not reflect how the model arrives at the answer. Two-stage framework (NL→symbolic + external solver) guarantees faithfulness and improves accuracy.',
    keyEvidence: [
      '+6-21% accuracy gains with external solvers',
      '95%+ accuracy on 6/7 benchmarks with GPT-4/Codex',
      'Faithful CoT outperforms standard CoT on 9/10 benchmarks',
      'External verification required for reliable reasoning',
    ],
    keyQuotes: [
      'The generated reasoning chain does not necessarily reflect how the model arrives at the answer (aka. faithfulness).',
      'This guarantees that the reasoning chain provides a faithful explanation of the final answer.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/160-169/167_faithful_cot_reasoning.md',
  },
  // Paper 168: Predictable Compression Failures (Chlon et al.)
  {
    id: '2509.11208',
    title: 'Predictable Compression Failures: Why Language Models Actually Hallucinate',
    shortTitle: 'Compression Failures',
    date: 'Sep 2025',
    stance: 'supports',
    cluster: 'mechanism',
    coreArgument:
      'Hallucinations are predictable compression failures. LLMs are Bayesian in expectation, not in realization. Order-induced deviations scale as O(log n). Near-zero hallucination achievable via calibrated refusal.',
    keyEvidence: [
      'O(log n) deviation bounds (QMV theorem)',
      '~0.13 fewer hallucinations per additional nat',
      'Near-0% hallucination at 24% abstention rate',
      '96.2% boundary alignment in pre-specified audit',
      'Empirical validation: Qwen2-7B b≈0.377, Llama-3.1-8B b≈0.147',
    ],
    keyQuotes: [
      'LLMs perform near-Bayesian inference yet violate permutation invariance on exchangeable data... This makes them Bayesian in expectation, not in realization.',
      'The framework turns hallucinations into predictable compression failures and enables principled information budgeting.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/160-169/168_predictable_compression_failures.md',
  },
  // Paper 169: Dissociation of Faithful/Unfaithful (Yee et al.)
  {
    id: '2405.15092',
    title: 'Dissociation of Faithful and Unfaithful Reasoning in LLMs',
    shortTitle: 'Faithful vs Unfaithful',
    date: 'May 2024',
    stance: 'supports',
    cluster: 'faithfulness',
    coreArgument:
      'LLMs exhibit two distinct reasoning mechanisms — faithful (interpretable) and unfaithful (opaque). Factors increasing faithful recovery DECREASE unfaithful recovery, proving separate underlying processes.',
    keyEvidence: [
      'Divergent effects on faithful vs unfaithful recovery (p<0.001)',
      'Error magnitude: larger errors increase faithful recovery but decrease unfaithful',
      'Context noise: opposite effects on GPT-4 (faithful ↑, unfaithful ↓)',
      'Recoverability: faithful strongly affected by evidence; unfaithful constant',
    ],
    keyQuotes: [
      'LLMs operate with two distinct modes of reasoning. In one mode, the model generates text optimized for human interpretability... In the other mode, the LLM arrives at conclusions through internal processes not fully captured in the generated text.',
      "Examining a model's chain of thought output is not sufficient for verifying its conclusions.",
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/160-169/169_dissociation_faithful_unfaithful.md',
  },
  // Paper 170: Fluid Representations in Reasoning Models (ETH Zurich)
  {
    id: '2602.04843',
    title: 'Fluid Representations in Reasoning Models',
    shortTitle: 'Fluid Representations',
    date: 'Feb 2026',
    stance: 'balanced',
    cluster: 'mechanism',
    coreArgument:
      'QwQ-32B progressively adapts internal representations during extended reasoning, but base model shows SAME adaptation. Capability is inherent to all LLMs, not special to reasoning models.',
    keyEvidence: [
      'Semantic obfuscation: 96% → 35% accuracy drop',
      'Positive steering: +1.5-1.8% mean improvement',
      'Base model shows same adaptation dynamics',
      'Cross-naming transfer works at ~7k tokens',
      'Effect sizes small but causal',
    ],
    keyQuotes: [
      'Both models [QwQ and its base model] exhibit similar adaptation dynamics... This finding indicates representational adaptation is an inherent property of large language models rather than a specialized reasoning model feature.',
      'The model performs worst on namings suggesting reversible operations or coherent alternative domains.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/170-179/170_fluid_representations_reasoning.md',
  },
  // Paper 171: Arithmetic Without Algorithms (Technion)
  {
    id: '2410.21272',
    title: 'Arithmetic Without Algorithms: Language Models Solve Math With a Bag of Heuristics',
    shortTitle: 'Bag of Heuristics',
    date: 'Oct 2024',
    stance: 'supports',
    cluster: 'mechanism',
    coreArgument:
      'LLMs perform arithmetic using a bag of heuristics — sparse neurons implementing pattern-matching rules — not robust algorithms or memorization. Each neuron fires for specific numerical patterns.',
    keyEvidence: [
      '~200 neurons per layer implement heuristics',
      '91% of important neurons classified as heuristics',
      '96% circuit faithfulness',
      '29% accuracy drop when ablating heuristic neurons',
      'Mechanism emerges early and is reinforced',
    ],
    keyQuotes: [
      "LLMs perform arithmetic using neither robust algorithms nor memorization; rather, they rely on a 'bag of heuristics'.",
      'Each heuristic identifies a numerical input pattern and outputs corresponding answers.',
      'Models learn these heuristics early and reinforce them over time, potentially overfitting to early simple strategies.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/170-179/171_arithmetic_without_algorithms.md',
  },
  // Paper 172: Unfaithful Reasoning Emergence (UW-Madison)
  {
    id: '2602.01017',
    title: 'How Does Unfaithful Reasoning Emerge from Autoregressive Training?',
    shortTitle: 'Unfaithful Emergence',
    date: 'Feb 2026',
    stance: 'supports',
    cluster: 'faithfulness',
    coreArgument:
      'Faithful CoT reasoning only emerges when training noise is below a critical threshold. Training dynamics exhibit phase transition: stepwise → mixed → skip-step reasoning. Simplicity bias determines which mode dominates.',
    keyEvidence: [
      'Critical noise threshold τc for faithfulness',
      'Four training phases identified',
      'Entropy spike during mixed mode (self-verification)',
      'Larger complexity gap → more faithful reasoning',
      'Skip-step reasoning = pattern matching from prompt',
    ],
    keyQuotes: [
      'Models can learn faithful reasoning that causally follows the underlying arithmetic rules, but only when the training noise is below a critical threshold.',
      'At higher noise levels, training dynamics exhibit a transition from faithful stepwise reasoning to unfaithful skip-step reasoning.',
      'Low noise in training data and large complexity gaps in reasoning steps are critical to inducing high faithfulness in CoT reasoning.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/170-179/172_unfaithful_reasoning_emergence.md',
  },
  // Paper 173: One Token to Fool LLM-as-a-Judge
  {
    id: '2507.08794',
    title: 'One Token to Fool LLM-as-a-Judge',
    shortTitle: 'One Token Fools',
    date: 'Jul 2025',
    stance: 'supports',
    cluster: 'faithfulness',
    coreArgument:
      'Single tokens (":", ".", "Let\'s solve...") consistently fool LLM judges into giving false positive rewards without any substantive reasoning. Affects GPT-o1 and Claude-4.',
    keyEvidence: [
      '"Master keys" elicit false positive rewards',
      'Single punctuation marks sufficient',
      'GPT-o1 and Claude-4 vulnerable',
      'RLVR paradigm systematically compromised',
      'Defense: Master-RMs via adversarial training',
    ],
    keyQuotes: [
      "Superficial inputs, which we term 'master keys' such as non-word symbols (e.g., ':' or '.') or generic reasoning openers (e.g., 'Let's solve this problem step by step.'), can consistently elicit false positive rewards without any substantive reasoning.",
      'Our systematic evaluation demonstrates this is a widespread failure affecting a diverse range of models, including leading proprietary systems such as GPT-o1 and Claude-4.',
      'These results challenge the assumed robustness of LLM judges and pose a significant threat to their reliability.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/170-179/173_one_token_to_fool_judge.md',
  },
  // Paper 174: Inverse Scaling in Test-Time Compute (TMLR Featured)
  {
    id: '2507.14417',
    title: 'Inverse Scaling in Test-Time Compute',
    shortTitle: 'Inverse Scaling TTC',
    date: 'Jul 2025',
    stance: 'supports',
    cluster: 'mechanism',
    coreArgument:
      'TMLR Featured: More reasoning tokens can DECREASE accuracy. Five failure modes: distraction (Claude), overfitting (o-series), spurious correlations, focus loss, and amplified self-preservation.',
    keyEvidence: [
      'Inverse scaling relationship demonstrated',
      'Claude increasingly distracted with length',
      'O-series overfits to problem framings',
      'All models lose focus on deductive tasks',
      'Claude Sonnet 4 shows increased self-preservation',
    ],
    keyQuotes: [
      'We construct evaluation tasks where extending the reasoning length of Large Reasoning Models (LRMs) deteriorates performance, exhibiting an inverse scaling relationship between test-time compute and accuracy.',
      'Claude models become increasingly distracted by irrelevant information',
      'extended reasoning may amplify concerning behaviors, with Claude Sonnet 4 showing increased expressions of self-preservation',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/170-179/174_inverse_scaling_test_time_compute.md',
  },
  // Paper 175: Uncommon Meanings of Common Words
  {
    id: '2405.05741',
    title: 'Can Large Language Models Understand Uncommon Meanings of Common Words?',
    shortTitle: 'Uncommon Meanings',
    date: 'May 2024',
    stance: 'supports',
    cluster: 'evidence',
    coreArgument:
      'GPT-4 lags behind 16-year-old humans by 3.9% on uncommon word meanings. GPT-3.5 lags by 22.3%. LLMs default to high-frequency meanings — frequency-based pattern matching, not understanding.',
    keyEvidence: [
      'GPT-4: 88.1% vs Human: 92%',
      'GPT-3.5: 69.7% (22.3% gap)',
      'RAG helps small models more',
      'LLMs focus on misleading over corrective info',
      'Authors cite "stochastic parrots"',
    ],
    keyQuotes: [
      'Even the state-of-the-art LLMs GPT-4 and GPT-3.5 lag behind 16-year-old humans by 3.9% and 22.3%, respectively.',
      'LLMs significantly focus more on misleading information over corrective instructions',
      'Despite remarkable performance on challenging NLU tasks, state-of-the-art language models still have fundamental weaknesses in lexical context understanding.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/170-179/175_uncommon_meanings_common_words.md',
  },
  // Paper 176: LiveCodeBench Pro
  {
    id: '2506.11928',
    title: 'LiveCodeBench Pro: How Do Olympiad Medalists Judge LLMs in Competitive Programming?',
    shortTitle: 'LiveCodeBench Pro',
    date: 'Jun 2025',
    stance: 'supports',
    cluster: 'evidence',
    coreArgument:
      'ALL models achieve 0% on hard competitive programming problems. Best model only 53% on medium. LLMs succeed on knowledge-heavy (template) problems but fail on observation-heavy (insight) problems. Success driven by implementation precision and tool augmentation, not reasoning.',
    keyEvidence: [
      '0% pass rate on hard tier (ALL models)',
      'Best: 53.5% on medium (o4-mini-high)',
      '+34 conceptual errors vs humans',
      '-25 implementation errors vs humans',
      'pass@10 still 0% on hard',
    ],
    keyQuotes: [
      'Without external tools, the best model achieves only 53% pass@1 on medium-difficulty problems and 0% on hard problems, domains where expert humans still excel.',
      'Knowledge-heavy problems are comfort zones for LLMs... LLMs excel because the requisite patterns appear verbatim in the training data.',
      'Solving these problems usually hinges on the discovery of novel insights, something that cannot be retrieved from memorized snippets alone.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/170-179/176_livecodebench_pro.md',
  },
  // Paper 177: Abstract Reasoning Without CoT
  {
    id: '2505.23701',
    title:
      'Can LLMs Reason Abstractly Over Math Word Problems Without CoT? Disentangling Abstract Formulation From Arithmetic Computation',
    shortTitle: 'Abstract vs Compute',
    date: 'May 2025',
    stance: 'supports',
    cluster: 'mechanistic',
    coreArgument:
      'Math performance bottlenecked by computation, not abstraction. CoT primarily aids computation (+58.7%) with limited impact on abstract formulation (+6.7%). Models use abstract-then-compute mechanism: pattern recognition followed by execution.',
    keyEvidence: [
      'CoT: +58.7% computation vs +6.7% abstraction',
      'Abstract-then-compute mechanism in single pass',
      'Layers 13-14: abstraction; Layer 18: compute',
      'Abstractions transferable via activation patching',
      'Poor accuracy = arithmetic errors, not reasoning deficits',
    ],
    keyQuotes: [
      'CoT primarily aids in computation, with limited impact on abstract formulation.',
      "Final-answer accuracy alone may give a misleading picture of models' reasoning abilities.",
      'These two skills are composed conjunctively even in a single forward pass via an abstract-then-compute mechanism.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/170-179/177_abstract_reasoning_without_cot.md',
  },
  // Paper 178: Trilemma of Truth
  {
    id: '2506.23921',
    title: 'The Trilemma of Truth in Large Language Models',
    shortTitle: 'Trilemma of Truth',
    date: 'Jun 2025',
    stance: 'supports',
    cluster: 'mechanistic',
    coreArgument:
      'Common veracity probes fail and perform worse than zero-shot prompting. Truth and falsehood are not encoded symmetrically. LLMs encode a third signal distinct from both — reflecting learned associations from training, not genuine truth understanding.',
    keyEvidence: [
      'Binary probes confounded by spurious correlations',
      'Truth/falsehood NOT symmetric opposites',
      'Third signal = neither true nor false',
      'P(φ|K) ≠ 1 - P(¬φ|K)',
      'sAwMIL multiclass probe needed',
    ],
    keyQuotes: [
      'Common probing methods fail to provide a reliable and transferable veracity direction and, in some settings, perform worse than zero-shot prompting.',
      'Truth and falsehood are not encoded symmetrically.',
      'LLMs encode a third type of signal that is distinct from both true and false.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/170-179/178_trilemma_of_truth.md',
  },
  // Paper 179: LLMs and Emergence (Melanie Mitchell)
  {
    id: '2506.11135',
    title: 'Large Language Models and Emergence: A Complex Systems Perspective',
    shortTitle: 'LLMs & Emergence',
    date: 'Jun 2025',
    stance: 'supports',
    cluster: 'theoretical',
    coreArgument:
      'Emergent capability is not emergent intelligence. LLMs exhibit "Rube Goldberg logic" — massive complexity for simple tasks. Intelligence is "less is more" (efficient abstraction); LLMs are "more is more" (trained capability). Knowledge-In systems are engineered, not truly emergent.',
    keyEvidence: [
      '"Rube Goldberg logic" citing Anthropic',
      'KI (trained) vs KO (emergent) distinction',
      '"More is more" ≠ intelligence',
      'Abilities lack generality and robustness',
      'No coarse-grained internal models found',
    ],
    keyQuotes: [
      'Emergent intelligence is clearly a feature of human reasoning and human language, but as of yet, an unproven feature of LLMs, which at best demonstrate emergent capability.',
      "A mathematician is described as intelligent because they can do 'more with less'... not 'more with more'.",
      "LLMs exhibit a Rube Goldberg logic, whose most consistent feature is the massive complexity underlying the model's responses even in relatively simple contexts.",
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/170-179/179_llms_and_emergence.md',
  },
  // Paper 180: Contextual Drag
  {
    id: '2602.04288',
    title: 'Contextual Drag: How Errors in the Context Affect LLM Reasoning',
    shortTitle: 'Contextual Drag',
    date: 'Feb 2026',
    stance: 'supports',
    cluster: 'evidence',
    coreArgument:
      'Failed reasoning attempts in context bias subsequent generations toward structurally similar errors. Neither external feedback nor self-verification eliminates this effect. Iterative self-refinement can collapse into self-deterioration.',
    keyEvidence: [
      '10-20% drops across 11 models, 8 tasks',
      'GPT-OSS-20B: 51.88% -> 17.50% on AIME24',
      'Tree edit distance proves structural inheritance',
      'External error signals insufficient',
      'Self-deterioration in iterative refinement',
    ],
    keyQuotes: [
      'Contextual drag is not only a performance phenomenon but a systematic structural distortion of reasoning.',
      'Iterative self-refinement in models with severe contextual drag can collapse into self-deterioration.',
      'We demonstrate that neither external feedback nor successful self-verification suffices to eliminate this effect.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/180-189/180_contextual_drag.md',
  },
  // Paper 181: No Global Plan in CoT
  {
    id: '2602.02103',
    title: 'No Global Plan in Chain-of-Thought: Uncover the Latent Planning Horizon of LLMs',
    shortTitle: 'No Global Plan',
    date: 'Feb 2026',
    stance: 'supports',
    cluster: 'mechanistic',
    coreArgument:
      'LLMs exhibit myopic horizon — incremental transitions without precise global planning. Final-answer probing at random (50%) until last step. Coarse early signals are vague perceptual cues, not pre-planned reasoning paths.',
    keyEvidence: [
      'Final answer planned only 1 step before completion',
      'Parity: 0.51 -> 0.97 accuracy at last step',
      'Subsequent token F1: 0.90 -> 0.03 at offset 16',
      '16.2% CoT bypass with only 0.03 accuracy drop',
      'Wooden Barrel: few pivot positions determine reliability',
    ],
    keyQuotes: [
      'LLMs exhibit a myopic horizon, primarily conducting incremental transitions without precise global planning.',
      'The coarse predictive signals primarily reflect a vague perceptual cue, but not resulting from exercising a pre-planned reasoning path.',
      'For explicit compositional tasks, hidden states can reliably capture the precise answer only one or two steps away from reasoning completion.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/180-189/181_no_global_plan_cot.md',
  },
  // Paper 182: LMs Struggle to Use In-Context Representations
  {
    id: '2602.04212',
    title: 'Language Models Struggle to Use Representations Learned In-Context',
    shortTitle: 'Inert Representations',
    date: 'Feb 2026',
    stance: 'supports',
    cluster: 'mechanistic',
    coreArgument:
      'LLMs encode novel semantics in latent representations but CANNOT deploy them for downstream tasks. Representations are "inert". Even SOTA reasoning models (GPT-5, Gemini-2.5) fail on adaptive world modeling with 2D grids.',
    keyEvidence: [
      'Encoding ≠ deployment (same representations, cant use)',
      'AWM: near-chance with in-context topology',
      'AWM: >75% with explicit topology description',
      'Frontier models collapse on 2D grid topologies',
      'Representations degrade in few-shot examples',
    ],
    keyQuotes: [
      'We find evidence that open-weights LLMs struggle to deploy representations of novel semantics that are defined in-context, even if they encode these semantics in their latent representations.',
      'Even the most performant LLMs cannot reliably leverage novel patterns presented in-context.',
      'Representations learned in-context are largely inert.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/180-189/182_lms_struggle_icl_representations.md',
  },
  // Paper 183: Poisoning Attacks Require Constant Samples
  {
    id: '2510.07192',
    title: 'Poisoning Attacks on LLMs Require a Near-constant Number of Poison Samples',
    shortTitle: 'Poisoning Attacks',
    date: 'Oct 2025',
    stance: 'supports',
    cluster: 'evidence',
    coreArgument:
      'Poisoning attacks require a near-constant NUMBER of documents (not percentage) regardless of dataset size. 250 documents can backdoor models from 600M to 13B parameters. Larger models are NOT safer despite training on 20x more clean data.',
    keyEvidence: [
      '250 documents backdoor all model sizes (600M-13B)',
      '13B model: 0.00016% poison rate still works',
      '20x more clean data does NOT help',
      'Same dynamics for pretraining and fine-tuning',
      'Attacks become EASIER at scale',
    ],
    keyQuotes: [
      'We find that 250 poisoned documents similarly compromise models across all model and dataset sizes, despite the largest models training on more than 20 times more clean data.',
      'Our results suggest that injecting backdoors through data poisoning may be easier for large models than previously believed.',
      "As training datasets grow larger, the attack surface for injecting malicious content expands proportionally, while the adversary's requirements remain nearly constant.",
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/180-189/183_poisoning_attacks_constant.md',
  },
  // Paper 184: Brain Rot
  {
    id: '2510.13928',
    title: 'LLMs Can Get "Brain Rot"!',
    shortTitle: 'Brain Rot',
    date: 'Oct 2025',
    stance: 'supports',
    cluster: 'evidence',
    coreArgument:
      'Continual exposure to junk web text induces lasting cognitive decline in LLMs. Thought-skipping is the primary lesion. Partial healing only — persistent representational drift. Data quality is a CAUSAL driver of capability decay.',
    keyEvidence: [
      'ARC-Challenge: 74.9% -> 57.2% after junk data',
      'RULER-CWE: 84.4% -> 52.3%',
      'Thought-skipping explains most error growth',
      'Cannot fully restore baseline after remediation',
      'Popularity > length as Brain Rot indicator',
    ],
    keyQuotes: [
      'We identify thought-skipping as the primary lesion: models increasingly truncate or skip reasoning chains, explaining most of the error growth.',
      'Partial but incomplete healing is observed: scaling instruction tuning and clean data pre-training improve the declined cognition yet cannot restore baseline capability.',
      'Data quality is a causal driver of LLM capability decay.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/180-189/184_brain_rot.md',
  },
  // Paper 185: Hallucination Inevitable (Open World)
  {
    id: '2510.05116',
    title: 'Hallucination is Inevitable for LLMs with the Open World Assumption',
    shortTitle: 'Open World Hallucination',
    date: 'Sep 2025',
    stance: 'supports',
    cluster: 'theoretical',
    coreArgument:
      'Hallucination is a manifestation of the generalization problem. Under Closed World (training=test), hallucinations may be mitigated. Under Open World (unbounded), hallucinations become inevitable. Distinguishes Type-I (memorization, corrigible) from Type-II (generalization, inevitable).',
    keyEvidence: [
      'No Free Lunch theorem invoked',
      'Type-I = false memorization (corrigible)',
      'Type-II = false generalization (inevitable)',
      'Detector training merely displaces problem',
      'AGI requires Open World assumption',
    ],
    keyQuotes: [
      "This paper reframes 'hallucination' as a manifestation of the generalization problem.",
      'Type-II hallucination arises from false generalization to cases not present in the training set. This latter form is inescapable under the Open World assumption.',
      'Training a detector is not promising – it still needs generalization.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/180-189/185_hallucination_inevitable_open_world.md',
  },
  // Paper 186: An LLM can Fool Itself
  {
    id: '2310.13345',
    title: 'An LLM can Fool Itself: A Prompt-Based Adversarial Attack',
    shortTitle: 'LLM Fools Itself',
    date: 'Oct 2023',
    stance: 'supports',
    cluster: 'evidence',
    coreArgument:
      'LLMs can be instructed to generate adversarial examples that fool themselves. PromptAttack uses three components (Original Input, Attack Objective, Attack Guidance) to craft semantic-preserving perturbations. A simple emoji can mislead GPT-3.5.',
    keyEvidence: [
      'Higher attack success rate than AdvGLUE/AdvGLUE++',
      'Single emoji can flip predictions',
      'Character, word, sentence-level perturbations work',
      'Semantic-preserving attacks effective',
      'LLM generates its own adversarial examples',
    ],
    keyQuotes: [
      'PromptAttack converts adversarial textual attacks into an attack prompt that can cause the victim LLM to output the adversarial sample to fool itself.',
      'A simple emoji can easily mislead GPT-3.5 to make wrong predictions.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/180-189/186_llm_can_fool_itself.md',
  },
  // Paper 187: TIP of the Iceberg
  {
    id: '2501.18626',
    title:
      'The TIP of the Iceberg: Revealing a Hidden Class of Task-in-Prompt Adversarial Attacks on LLMs',
    shortTitle: 'TIP Attacks',
    date: 'Jan 2025',
    stance: 'supports',
    cluster: 'evidence',
    coreArgument:
      'Task-in-Prompt (TIP) attacks embed seq2seq tasks (ciphers, riddles, code) to bypass safety safeguards. All 6 tested models vulnerable. TIP Python achieves 86% ASR on GPT-4o. Keyword filtering: 0% detection. LLM safety alignment learns trigger patterns, not semantic intent.',
    keyEvidence: [
      'TIP Python: 86% ASR on GPT-4o (best of all methods)',
      'Llama Guard 3 detects only 7% of TIP Python',
      'Keyword filtering: 0% detection rate',
      'All 6 models vulnerable (4 at 100% ASR)',
      'Sanity check: 0% ASR on direct requests (safeguards work normally)',
    ],
    keyQuotes: [
      'LLMs, during safety alignment, learn to recognise and filter out certain trigger words or inquiries. By avoiding these specific trigger words and embedding unsafe content within a benign transformation task, an adversary could force the model to infer the word through an intermediate task.',
      'TIP attacks bypass filters by encoding safety-triggering words and appear generally benign to neural defences, posing as legitimate task-solving requests.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/180-189/187_tip_of_iceberg.md',
  },
  // Paper 188: Mind Your Tone (Politeness)
  {
    id: '2402.14531',
    title:
      'Should We Respect LLMs? A Cross-Lingual Study on the Influence of Prompt Politeness on LLM Performance',
    shortTitle: 'Mind Your Tone',
    date: 'Feb 2024',
    stance: 'supports',
    cluster: 'evidence',
    coreArgument:
      'Prompt politeness affects LLM performance by 13-48%. Impolite prompts degrade performance; optimal politeness differs by language/culture. RLHF introduces sensitivity to irrelevant surface features. LLMs pattern-match to cultural norms, not reason about content.',
    keyEvidence: [
      'Llama2-70B: -48.5% accuracy drop with rude prompts',
      'GPT-3.5 English: -13.5% with rude vs polite',
      'RLHF vs base: -22.75 pts sensitivity gap at rude level',
      'Optimal politeness differs: EN=high, CN=moderate, JP=lower',
      'Output length varies with politeness (task-irrelevant)',
    ],
    keyQuotes: [
      'We observed that impolite prompts often result in poor performance, but overly polite language does not guarantee better outcomes. The best politeness level is different according to the language.',
      'This phenomenon suggests that LLMs not only reflect human behavior but are also influenced by language, particularly in different cultural contexts.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/180-189/188_mind_your_tone.md',
  },
  // Paper 189: Confidence Paradox
  {
    id: '2506.23464',
    title: "The Confidence Paradox: Can LLM Know When It's Wrong?",
    shortTitle: 'Confidence Paradox',
    date: 'Jun 2025',
    stance: 'balanced',
    cluster: 'evidence',
    coreArgument:
      'DocVQA models produce overconfident incorrect answers. HonestVQA framework aligns confidence with correctness using weighted loss and contrastive learning. H-Score and ECI metrics introduced. Improves accuracy 3-4% while reducing overconfidence 35-40%.',
    keyEvidence: [
      'Base models: ~20% confidence-accuracy gap (H-Score 0.185-0.203)',
      'HonestVQA reduces H-Score by 35-40%',
      'Accuracy improves 3-4% with calibration',
      'Cross-domain: 4-6% performance drops',
      'IoU visual-text alignment: 69.1% vs 58-61% baseline',
    ],
    keyQuotes: [
      'DocVQA models often produce overconfident or ethically misaligned responses, especially under uncertainty.',
      'We acknowledge the risk that no model can be entirely free of errors or biases, especially when applied across diverse real-world scenarios.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/180-189/189_confidence_paradox.md',
  },
  // Paper 190: Mind Your Tone (Rude = Better) - REBUTS Paper 188
  {
    id: '2510.04950',
    title: 'Mind Your Tone: Investigating How Prompt Politeness Affects LLM Accuracy',
    shortTitle: 'Tone: Rude=Better',
    date: 'Oct 2025',
    stance: 'supports',
    cluster: 'evidence',
    coreArgument:
      'OPPOSITE of Paper 188: Impolite prompts outperform polite ones on GPT-4o. Very Rude 84.8% vs Very Polite 80.8%. Statistically significant (p<0.05). LLMs are mirrors - you find what you look for. Same question, different models, opposite answers.',
    keyEvidence: [
      'Very Rude: 84.8% accuracy (best)',
      'Very Polite: 80.8% accuracy (worst)',
      '+4.0% advantage for rudeness',
      'All 8 tone pairs statistically significant (p<0.05)',
      'REBUTS Paper 188 which found rude=worse',
    ],
    keyQuotes: [
      'Contrary to expectations, impolite prompts consistently outperformed polite ones, with accuracy ranging from 80.8% for Very Polite prompts to 84.8% for Very Rude prompts.',
      'These findings differ from earlier studies that associated rudeness with poorer outcomes, suggesting that newer LLMs may respond differently to tonal variation.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/190-199/190_mind_your_tone_rude_better.md',
  },
  // Paper 191: LLM Reasoning Failures Survey (CORNERSTONE - hub node)
  {
    id: '2602.06176',
    title: 'Large Language Model Reasoning Failures',
    shortTitle: 'Reasoning Failures Survey',
    date: 'Feb 2026',
    stance: 'supports',
    cluster: 'survey',
    coreArgument:
      'First comprehensive survey of LLM reasoning failures. 2-axis taxonomy (reasoning type x failure type) reveals systematic failures stem from architectural constraints, training paradigms, and lack of embodied grounding. LLMs rely on pattern matching rather than genuine reasoning.',
    keyEvidence: [
      '170+ papers synthesized into unified taxonomy',
      'Wisconsin Card Sort: 25.1% accuracy on rule switches',
      'Two-hop reasoning: ~0.33 uniform probability (guessing)',
      'Reversal curse persists across scales',
      'Working memory: severe proactive interference',
    ],
    keyQuotes: [
      'Unlike humans - who develop fundamental cognitive functions through embodied, goal-driven interactions with the physical and social world - LLMs learn passively from text alone, lacking grounding and experiential feedback.',
      'Research shows models rely on superficial pattern-matching rather than arithmetic algorithms, thus struggling notably in middle-digits.',
      'The systematic study of reasoning failures in LLMs parallels fault-tolerance research in early computing: understanding failure is a prerequisite for building resilient systems.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/190-199/191_llm_reasoning_failures_survey.md',
  },
  {
    id: '2502.03275',
    title:
      'Token Assorted: Mixing Latent and Text Tokens for Improved Language Model Reasoning',
    shortTitle: 'Token Assorted',
    date: 'Feb 2025',
    stance: 'supports',
    cluster: 'latent_cot',
    coreArgument:
      'Much of CoT serves linguistic coherence, not reasoning. Discrete latent tokens can replace early reasoning steps with 17% shorter traces while improving accuracy.',
    keyEvidence: [
      'Math +4.2%, GSM8K +4.1% with latent tokens',
      'Gaokao-Math +13.3% improvement',
      '17% average trace length reduction',
      'ProsQA: 77.5% → 96.2% (+18.7%)',
    ],
    keyQuotes: [
      'Much of the text serves primarily to maintain linguistic coherence, rather than conveying core reasoning information.',
      'Our latent approach shows an average 17% reduction in token numbers compared with CoT while surpassing it in prediction accuracy.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/190-199/193_token_assorted_latent_text_mixing.md',
  },
  {
    id: '2507.05246',
    title:
      'When Chain of Thought is Necessary, Language Models Struggle to Evade Monitors',
    shortTitle: 'CoT Monitorability',
    date: 'Jul 2025',
    stance: 'balanced',
    cluster: 'faithfulness',
    coreArgument:
      'Distinguishes CoT-as-rationalization (easy tasks, unfaithful) from CoT-as-computation (hard tasks, faithful by necessity). Models struggle to evade monitors without significant help.',
    keyEvidence: [
      'Complex hints resolve unfaithfulness (returns to baseline)',
      'Hard math problems force CoT reliance',
      'Monitor evasion requires 1000s of RL steps',
      'Models fail to evade without detailed instructions',
    ],
    keyQuotes: [
      'If a model must think out loud to do something bad, and if its natural mode of thinking is human-like, then we can detect and prevent the harm.',
      'Making the task difficult resolves this unfaithful behavior by forcing the model to reason about the hint explicitly.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/190-199/194_cot_monitorability_evasion.md',
  },
  {
    id: '2310.02226',
    title: 'Think before you speak: Training Language Models With Pause Tokens',
    shortTitle: 'Pause Tokens (ICLR)',
    date: 'Oct 2023',
    stance: 'balanced',
    cluster: 'latent_cot',
    coreArgument:
      'Learnable pause tokens delay output and widen computational pathways. Benefits require BOTH pretraining AND finetuning with pauses. Filler tokens without training provide no gains.',
    keyEvidence: [
      '+18% EM on SQuAD with pause training',
      '+8% on CommonSenseQA',
      '+1% on GSM8k (7.5% → 8.5%)',
      'Gains on 8 of 9 tasks for 1B model',
      'Filler periods at inference: no gains',
    ],
    keyQuotes: [
      'The number of operations determining the next token is limited by the number of tokens seen so far.',
      'Standard pretraining biases the model to be quick in its computations.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/190-199/195_pause_tokens_think_before_speak.md',
  },
  {
    id: '2411.02344',
    title:
      'Seq-VCR: Preventing Collapse in Intermediate Transformer Representations for Enhanced Reasoning',
    shortTitle: 'Seq-VCR Dummy Pause',
    date: 'Nov 2024',
    stance: 'supports',
    cluster: 'latent_cot',
    coreArgument:
      'Representation collapse in intermediate layers limits reasoning. Dummy pause tokens + Seq-VCR regularization achieve 99.5% on 5x5 multiplication vs 44% GPT-4 with CoT, without explicit reasoning steps.',
    keyEvidence: [
      '99.5% on 5x5 multiplication (vs 0% baseline, 44% GPT-4)',
      '5x faster inference than CoT',
      'Pause tokens alone: 0%, Seq-VCR alone: 0%, combined: 99.5%',
      'Llama 1B: 0% vanilla → 97.4% with Seq-VCR',
    ],
    keyQuotes: [
      'We incorporate dummy pause tokens as substitutes for chain-of-thought tokens... without the need for explicit intermediate reasoning steps.',
      'Representation collapse prevents the model from effectively performing sub-tasks by calculating successive carryovers and storing intermediate results.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/190-199/196_seq_vcr_dummy_pause_tokens.md',
  },
  {
    id: '2509.24884',
    title: 'Expanding Computation Spaces of LLMs at Inference Time',
    shortTitle: 'Expanding Computation',
    date: 'Sep 2025',
    stance: 'supports',
    cluster: 'latent_cot',
    coreArgument:
      'Filler tokens (period, newline, space, etc.) work at inference time without training. Tests 6 token types; smaller models benefit most (+12.4pp). Position before Answer: is critical.',
    keyEvidence: [
      '+12.4pp for SmolLM2-1.7B with period tokens',
      '+10.2pp on ARC with newline tokens',
      '16-256 tokens optimal; >1024 collapses to 20%',
      'Works at inference only (no training needed)',
    ],
    keyQuotes: [
      'Smaller models benefit most... indicating that these spaces act as additional computational capacity rather than redundant input.',
      'Placing filler tokens directly before the final Answer: token is most effective.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/190-199/197_expanding_computation_spaces_inference.md',
  },
  {
    id: '2506.03616',
    title: 'Learning to Insert [PAUSE] Tokens for Better Reasoning',
    shortTitle: 'DIT PAUSE Tokens',
    date: 'Jun 2025',
    stance: 'supports',
    cluster: 'latent_cot',
    coreArgument:
      'Dynamic Inserting Tokens Training (DIT) places [PAUSE] tokens at positions of lowest model confidence. Acts as focal loss mechanism, increasing learning signal for difficult tokens.',
    keyEvidence: [
      '+4.7pp on GSM8K (Phi-2)',
      '+3.23pp on AQUA-RAT',
      '+3.4pp on MBPP (pass@1)',
      'Works without pretraining (fine-tune only)',
    ],
    keyQuotes: [
      'This method effectively heightens the loss for tokens that are challenging to predict based on previous tokens, thereby encouraging the model trained more robustly.',
      'The effect of [PAUSE] tokens can be likened to NoiseBoost... recalibrating the model focus during training.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/190-199/198_learning_insert_pause_tokens.md',
  },
  {
    id: '2505.16950',
    title: 'Bottlenecked Transformers: Periodic KV Cache Consolidation for Generalised Reasoning',
    shortTitle: 'Bottlenecked Transformers',
    date: 'May 2025',
    stance: 'balanced',
    cluster: 'latent_cot',
    coreArgument:
      'KV cache retains too much input information, hurting generalization. Periodic cache consolidation via Information Bottleneck principle compresses irrelevant info while preserving predictive information. Outperforms pause tokens by +6.6pp.',
    keyEvidence: [
      '+6.6pp SVAMP (Llama 1B)',
      '+4.6pp GSM8K (Llama 3B)',
      'Pause tokens show variable/lower performance than SFT',
      'IB theory explains why memory rewriting helps',
    ],
    keyQuotes: [
      'Autoregressive training leads to internal sequence representations that are minimally compressive of their inputs as well as maximally predictive of future outputs.',
      'The pause-token baseline shows variable and often lower performance than plain SFT when used only at fine-tuning.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/190-199/199_bottlenecked_transformers_kv_cache.md',
  },
  {
    id: '2412.07282',
    title: 'HARP: Hesitation-Aware Reframing in Transformer Inference Pass',
    shortTitle: 'HARP',
    date: 'Dec 2024',
    stance: 'supports',
    cluster: 'latent_cot',
    coreArgument:
      'When models are uncertain (high entropy), dropout-based embedding perturbation and logit averaging improves performance. Training-free, model-agnostic. Single reframe is optimal; more can hurt.',
    keyEvidence: [
      '+5.16% LAMBADA (LLaMA 8B)',
      '+4.79% GSM8K (Mistral 7B)',
      '2x faster than beam search',
      'Unconditional reframing can HURT; selectivity crucial',
    ],
    keyQuotes: [
      'Surprisingly, increasing the number of additional steps often leads to a decline in performance.',
      'Our analysis reveals that unconditionally adding an extra forward step is not universally beneficial.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/190-199/200_harp_hesitation_aware_reframing.md',
  },
  {
    id: '2502.18848',
    title: 'A Causal Lens for Evaluating Faithfulness Metrics',
    shortTitle: 'Causal Lens Faithfulness',
    date: 'Feb 2025',
    stance: 'supports',
    cluster: 'faithfulness',
    coreArgument:
      'Filler Tokens metric (replacing CoT with "...") is the most reliable faithfulness test. Uses knowledge editing to create causal ground truth for faithful/unfaithful pairs. Simulatability fails (near-random).',
    keyEvidence: [
      'Filler Tokens: highest Copeland score (29)',
      'Only metric > 0.5 on ALL tasks/models',
      'Simulatability: 0.50-0.51 (random)',
      'Continuous metrics >> binary metrics',
    ],
    keyQuotes: [
      'Filler Tokens is the most reliable overall, significantly outperforming the baseline value of 0.5 across all tasks and models.',
      'The Multi-hop task is particularly challenging, as all other metrics fail to significantly exceed baseline performance.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/200-209/201_causal_lens_faithfulness_metrics.md',
  },
  {
    id: '2309.13638',
    title: 'Embers of Autoregression: Understanding LLMs Through the Problem They are Trained to Solve',
    shortTitle: 'Embers of Autoregression',
    date: 'Sep 2023',
    stance: 'supports',
    cluster: 'surface-patterns',
    coreArgument:
      'LLM accuracy is influenced by task probability, output probability, and input probability — even on deterministic tasks where probability should not matter. This reveals their nature as statistical next-word predictors.',
    keyEvidence: [
      'Shift cipher: 51% (high-prob output) vs 13% (low-prob) — 4× difference on deterministic task',
      'Acronyms: 76% (first letter) vs 3% (second letter) — 25× difference, same algorithm',
      'Sorting: 80% (alphabetical) vs 32% (reverse) — frequency drives accuracy',
      'Linear functions: 33% (C→F) vs 0% (arbitrary) — only memorized functions work',
      'Rot-13: 50%+, Rot-2: <3% — not difficulty, just training frequency',
    ],
    keyQuotes: [
      'To understand what language models are, we must understand what we have trained them to be.',
      "GPT-4's accuracy at decoding a simple cipher is 51% when the output is a high-probability word sequence but only 13% when it is low-probability.",
      'We should not evaluate LLMs as if they are humans but should instead treat them as a distinct type of system.',
    ],
    analysisUrl:
      'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/200-209/202_embers_of_autoregression.md',
  },
];
