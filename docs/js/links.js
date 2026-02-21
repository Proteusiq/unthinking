// Paper relationship links - auto-generated from paper analysis
// Split from data.js for maintainability
window.paperLinks = [
  // Sycophancy Scales (Paper 119 - canonical)
  {
    source: '2308.03958',
    target: '2601.15436',
    type: 'extends',
    description: 'Foundational paper; Paper 96 extends to more models',
  },
  {
    source: '2308.03958',
    target: '2601.21183',
    type: 'extends',
    description: 'Foundational for mechanistic sycophancy work',
  },
  {
    source: '2308.03958',
    target: '2601.16644',
    type: 'extends',
    description: 'Foundational for linear probe sycophancy detection',
  },
  {
    source: '2308.03958',
    target: '2311.07590',
    type: 'supports',
    description: 'Sycophancy as precursor to strategic deception',
  },
  {
    source: '2308.03958',
    target: '2410.05229',
    type: 'supports',
    description: 'Both show models override correct reasoning under pressure',
  },
  // Truth-Bias Sycophancy (Paper 120)
  {
    source: '2506.21561',
    target: '2308.03958',
    type: 'extends',
    description: 'Extends sycophancy analysis to reasoning models with 4800 judgments',
  },
  {
    source: '2506.21561',
    target: '2601.15436',
    type: 'supports',
    description: 'Both find model-specific sycophancy patterns',
  },
  {
    source: '2506.21561',
    target: '2505.05410',
    type: 'supports',
    description: 'Both show reasoning models have fundamental limitations',
  },
  {
    source: '2506.21561',
    target: '2311.07590',
    type: 'supports',
    description: 'Truth-bias as precursor to strategic deception',
  },
  // Reasoning Trap (Paper 121)
  {
    source: '2510.22977',
    target: '2505.05410',
    type: 'supports',
    description: 'Both show reasoning enhancement has hidden costs',
  },
  {
    source: '2510.22977',
    target: '2506.21561',
    type: 'supports',
    description: 'Both find reasoning models more prone to failures',
  },
  {
    source: '2510.22977',
    target: '2512.07783',
    type: 'extends',
    description: 'RL surfaces hallucination patterns alongside capabilities',
  },
  {
    source: '2510.22977',
    target: '2506.17219',
    type: 'supports',
    description: 'Both demonstrate capability-reliability trade-off',
  },
  // Strategic Deception cluster (Papers 117-118)
  {
    source: '2311.07590',
    target: '2601.15436',
    type: 'supports',
    description:
      'Both show LLMs prioritize user-pleasing over truth; deception is extreme sycophancy',
  },
  {
    source: '2311.07590',
    target: '2506.06941',
    type: 'supports',
    description: 'Surface-level task completion without genuine understanding',
  },
  {
    source: '2311.07590',
    target: '2601.16644',
    type: 'supports',
    description: 'Deception may use same linear mechanism as sycophancy',
  },
  {
    source: '2311.07590',
    target: '2601.07422',
    type: 'extends',
    description: 'Shows what happens when truthfulness pathway suppressed by pressure',
  },
  {
    source: '2502.03407',
    target: '2311.07590',
    type: 'extends',
    description: 'Tests detection methods on insider trading scenario',
  },
  {
    source: '2502.03407',
    target: '2601.16644',
    type: 'supports',
    description: 'Both find behavioral traits linearly encoded in activations',
  },
  {
    source: '2502.03407',
    target: '2601.21183',
    type: 'supports',
    description: 'Both find internal signals for unfaithful behavior',
  },
  {
    source: '2506.18880',
    target: '2305.18654',
    type: 'supports',
    description: '>69% on isolated skills, near-0% when composition required',
  },
  {
    source: '2506.18880',
    target: '2601.14456',
    type: 'supports',
    description: 'RL improves ID exploratory but 0% on transformative OOD',
  },
  {
    source: '2506.18880',
    target: '2512.07783',
    type: 'supports',
    description: 'RL can drop OOD 30pp; surfaces patterns, no new capabilities',
  },
  {
    source: '2506.18880',
    target: '2506.06941',
    type: 'supports',
    description: 'Performance degrades to near-zero as complexity increases',
  },
  {
    source: '2506.18880',
    target: '2410.05229',
    type: 'extends',
    description: 'Three generalization axes (exploratory, compositional, transformative)',
  },
  {
    source: '2512.07783',
    target: '2501.19393',
    type: 'supports',
    description:
      'RL needs ≥1% pre-training exposure to transfer; 0% exposure = complete RL failure',
  },
  {
    source: '2512.07783',
    target: '2501.12948',
    type: 'supports',
    description:
      'RL gains only at edge-of-competence; OOD-hard tasks show no improvement regardless of RL data',
  },
  {
    source: '2510.22371',
    target: '2506.06941',
    type: 'supports',
    description:
      'DeepRD: o3-mini 99% on NLGraph but collapses to ~0% at high lookahead; abrupt not gradual',
  },
  {
    source: '2510.22371',
    target: '2305.18654',
    type: 'supports',
    description:
      'Token usage decreases at collapse — models give up faster, not hitting context limits',
  },
  {
    source: '2508.01191',
    target: '2305.18654',
    type: 'supports',
    description:
      'DataAlchemy from-scratch training: ID=100%, OOD=0% across task, length, and format shifts',
  },
  {
    source: '2410.05229',
    target: '2305.18654',
    type: 'supports',
    description: 'Up to 65% drop with irrelevant NoOp statements; blind operation conversion',
  },
  {
    source: '2601.00514',
    target: '2501.12948',
    type: 'rebuts',
    description:
      '1M+ traces: aha moments ~2-6% of traces, no increase with training, seldom improve accuracy',
  },
  {
    source: '2601.00514',
    target: '2307.13702',
    type: 'supports',
    description:
      'Mid-trace shifts are unstable inference, not self-correction — correlate with entropy',
  },
  {
    source: '2601.00514',
    target: '2505.05410',
    type: 'supports',
    description:
      'Extrinsic forced shifts help; intrinsic aha moments do not — appearance without substance',
  },
  {
    source: '2509.12645',
    target: '2410.05229',
    type: 'supports',
    description:
      '2023→2024 gains from hidden CoT, not reasoning; neuro-symbolic achieves 99.7% at 10% compute',
  },
  {
    source: '2509.12645',
    target: '2506.06941',
    type: 'supports',
    description: 'Thinking models imitate reasoning; Phi4+Z3 beats R1 at 10x less compute',
  },
  {
    source: '2507.07313',
    target: '2506.06941',
    type: 'supports',
    description:
      'o1/R1 fail at depth-12 logic (~35%, random=25%); scaling tediousness breaks all models',
  },
  {
    source: '2507.07313',
    target: '2305.18654',
    type: 'supports',
    description:
      'Unpuzzles: trivializing famous puzzles breaks models that solved originals — memorization exposed',
  },
  {
    source: '2507.07313',
    target: '2410.05229',
    type: 'supports',
    description:
      'Making problems easier can make models worse — counter-intuitive memorization effect',
  },
  {
    source: '2507.07313',
    target: '2501.12948',
    type: 'challenges',
    description: 'R1 at 0% single-character counting; only o1 succeeds at length 150',
  },
  {
    source: '2510.18254',
    target: '2601.00514',
    type: 'supports',
    description: 'Reflection = fluent text, not correction',
  },
  {
    source: '2510.18254',
    target: '2307.13702',
    type: 'supports',
    description: 'CoT text ≠ internal computation',
  },
  {
    source: '2510.18254',
    target: '2501.12948',
    type: 'challenges',
    description: 'Reasoning models no better',
  },
  {
    source: '2510.18254',
    target: '2501.19393',
    type: 'challenges',
    description: "Test-time compute doesn't guarantee improvement",
  },
  {
    source: '2506.17219',
    target: '2512.07783',
    type: 'supports',
    description: 'RL requires pre-existing capability',
  },
  {
    source: '2506.17219',
    target: '2601.00514',
    type: 'supports',
    description: "Internal signals don't improve",
  },
  {
    source: '2506.17219',
    target: '2305.18654',
    type: 'supports',
    description: 'Transitional word loss = exploration loss',
  },
  {
    source: '2601.14456',
    target: '2305.18654',
    type: 'supports',
    description: '82.9% in-domain → 0% unseen-domain; symbol anonymization drops 11.5pp',
  },
  {
    source: '2601.14456',
    target: '2512.07783',
    type: 'supports',
    description: 'Verifier-reward RL (v3) fails to improve cross-domain planning generalization',
  },
  {
    source: '2601.14456',
    target: '2601.13392',
    type: 'supports',
    description:
      'Both show 0% on unseen domains despite near-perfect in-domain; syntax learned, not goals',
  },
  {
    source: '2601.14456',
    target: '2410.05229',
    type: 'supports',
    description:
      'Compact serialization (format only) causes >10pp drop despite preserving semantics',
  },
  {
    source: '2601.13392',
    target: '2406.15992',
    type: 'supports',
    description: 'Pattern regurgitators',
  },
  {
    source: '2601.13392',
    target: '2305.18654',
    type: 'supports',
    description: 'Distribution-bounded failures',
  },
  {
    source: '2601.13392',
    target: '2508.01191',
    type: 'supports',
    description: 'ID success, OOD failure',
  },
  {
    source: '2601.13392',
    target: '2410.05229',
    type: 'supports',
    description: 'Brittleness to variations',
  },
  {
    source: '2511.21591',
    target: '2506.18957',
    type: 'rebuts',
    description: 'Move validator gives all valid moves; 0% success, GPT-5 loops 100%',
  },
  {
    source: '2511.21591',
    target: '2507.17699',
    type: 'rebuts',
    description: 'External move validator = tool; still 0% on 8-puzzle planning',
  },
  {
    source: '2507.17699',
    target: '2506.06941',
    type: 'rebuts',
    description: 'Tool augmentation restores performance',
  },
  {
    source: '2506.18957',
    target: '2506.06941',
    type: 'rebuts',
    description: 'Execution gap, not reasoning gap',
  },
  {
    source: '2503.08679',
    target: '2307.13702',
    type: 'extends',
    description: 'Natural prompts unfaithfulness',
  },
  {
    source: '2505.05410',
    target: '2307.13702',
    type: 'extends',
    description:
      'Claude 3.7 ~25% faithful, R1 ~39%; harder tasks = less faithful (GPQA -32-44% vs MMLU)',
  },
  {
    source: '2507.01231',
    target: '2506.06941',
    type: 'supports',
    description: 'Hanoi ~8 disk limit confirmed',
  },
  {
    source: '2507.01231',
    target: '2506.18957',
    type: 'challenges',
    description: 'Agentic dialogue makes Hanoi worse',
  },
  {
    source: '2507.01231',
    target: '2507.17699',
    type: 'challenges',
    description: 'Base reasoning genuinely limited',
  },
  {
    source: '2508.13678',
    target: '2305.18654',
    type: 'supports',
    description: 'Errors propagate and amplify',
  },
  {
    source: '2508.13678',
    target: '2509.12645',
    type: 'supports',
    description: 'Replicate reasoning, cannot really reason',
  },
  {
    source: '2601.02996',
    target: '2402.10200',
    type: 'supports',
    description: '20% accuracy at zero reasoning steps; answers pre-computed in hidden states',
  },
  {
    source: '2601.02996',
    target: '2512.07783',
    type: 'supports',
    description: 'Latent reasoning converges to English-centric pathway',
  },
  {
    source: '2601.02996',
    target: '2506.06941',
    type: 'supports',
    description: 'LRS collapses 92% from MGSM (0.38) to AIME (0.03)',
  },
  {
    source: '2509.03646',
    target: '2512.07783',
    type: 'supports',
    description: 'RL rediscovers pre-training priors',
  },
  {
    source: '2509.03646',
    target: '2501.12948',
    type: 'supports',
    description: 'RL improves ID performance',
  },
  {
    source: '2510.15987',
    target: '2509.03646',
    type: 'supports',
    description: 'Finetuning changes deployment, not capability',
  },
  {
    source: '2510.15987',
    target: '2512.07783',
    type: 'supports',
    description: 'Primitives depend on learned patterns',
  },
  {
    source: '2502.20332',
    target: '2510.15987',
    type: 'supports',
    description:
      'Both find causally necessary attention heads; symbolic induction r=0.86 with function vectors',
  },
  {
    source: '2502.20332',
    target: '2402.10200',
    type: 'supports',
    description:
      'Three-stage symbolic circuit (abstraction→induction→retrieval) with 98%+ cross-token transfer',
  },
  {
    source: '2509.23629',
    target: '2512.07783',
    type: 'supports',
    description:
      'Concept web has avg degree ~2; SFT severs bridge edges causing topological disconnection',
  },
  {
    source: '2509.23629',
    target: '2506.17219',
    type: 'supports',
    description:
      'Each skill undergoes phase-transition collapse from exploration to exploitation at leaf nodes',
  },
  {
    source: '2509.23629',
    target: '2506.06941',
    type: 'supports',
    description: 'Sparse tree-like reasoning web — removing one bridge disconnects entire subtree',
  },
  {
    source: '2601.08058',
    target: '2402.10200',
    type: 'supports',
    description: 'Reasoning elicitable without CoT',
  },
  {
    source: '2601.08058',
    target: '2502.20332',
    type: 'supports',
    description: 'Specific mechanisms identified',
  },
  {
    source: '2512.04727',
    target: '2305.18654',
    type: 'supports',
    description: 'Counting uses token patterns',
  },
  {
    source: '2512.04727',
    target: '2506.18880',
    type: 'supports',
    description: 'Counting = compositional skill fails OOD',
  },
  {
    source: '2512.04727',
    target: '2506.06941',
    type: 'supports',
    description: 'Systematic failure on counting',
  },
  {
    source: '2504.20771',
    target: '2506.06941',
    type: 'supports',
    description:
      'Gemini fails Turing machine at step 16-683; inevitable collapse from statistical nature',
  },
  {
    source: '2504.20771',
    target: '2305.18654',
    type: 'supports',
    description:
      'Even 94% pass rate at 30 steps masks deterministic rule-following failure at scale',
  },
  {
    source: '2407.20311',
    target: '2305.18654',
    type: 'challenges',
    description: 'Shows genuine OOD generalization',
  },
  {
    source: '2407.20311',
    target: '2512.07783',
    type: 'supports',
    description: 'Capability must exist in training',
  },
  {
    source: '2510.04040',
    target: '2503.08679',
    type: 'supports',
    description:
      '1000+ expert-annotated traces: 58% spurious chains, 42% post-hoc rationalizations',
  },
  {
    source: '2510.04040',
    target: '2307.13702',
    type: 'extends',
    description: 'First instance-level faithfulness benchmark; best detector still <80% F1',
  },
  {
    source: '2510.04040',
    target: '2505.05410',
    type: 'supports',
    description:
      '~40% of instances show correctness-faithfulness divergence; correct answers from wrong CoT',
  },
  {
    source: '2601.10825',
    target: '2501.12948',
    type: 'supports',
    description: 'Explains R1 via multi-agent simulation',
  },
  {
    source: '2601.10825',
    target: '2509.23629',
    type: 'supports',
    description: 'RL organizes conversational patterns',
  },
  {
    source: '2511.23476',
    target: '2512.07783',
    type: 'supports',
    description: 'RL requires pre-existing capability',
  },
  {
    source: '2511.23476',
    target: '2504.09858',
    type: 'supports',
    description: 'Monolithic reasoning can harm',
  },
  {
    source: '2505.23945',
    target: '2307.13702',
    type: 'extends',
    description:
      'First comprehensive VLM faithfulness study; SFT shows 0% improvement over non-reasoning',
  },
  {
    source: '2505.23945',
    target: '2505.05410',
    type: 'supports',
    description:
      'Visual biases 0% articulation (CelebA gender); models use biases they refuse to admit',
  },
  {
    source: '2510.20783',
    target: '2502.20332',
    type: 'supports',
    description:
      'Chess: 97-99% legal moves OOD but strategy drops -68% (Knights&Rooks) — rule vs strategy split',
  },
  {
    source: '2510.20783',
    target: '2506.18880',
    type: 'supports',
    description:
      'Zero-probability OOD positions: rules compose, strategies remain distribution-bounded',
  },
  {
    source: '2601.02989',
    target: '2506.06941',
    type: 'supports',
    description:
      'System-1 counting hits 0% at 41-50 items; CoT alone also 0% — needs external structure',
  },
  {
    source: '2601.02989',
    target: '2512.04727',
    type: 'supports',
    description: 'Mechanistic probing: internal counter saturates at ~30 items, layer 22 critical',
  },
  {
    source: '2601.02989',
    target: '2305.18654',
    type: 'supports',
    description: 'Depth-bounded counters saturate — error accumulates across transformer layers',
  },
  {
    source: '2509.18458',
    target: '2506.06941',
    type: 'supports',
    description:
      'Task length (N) is dominant constraint; only gpt-5/o3 exceed 50% at N=250 statements',
  },
  {
    source: '2509.18458',
    target: '2601.02989',
    type: 'supports',
    description:
      'U-shaped distractor response; models show cognitive fingerprints — distinct failure profiles',
  },
  {
    source: '2601.13244',
    target: '2512.07783',
    type: 'supports',
    description: 'Capabilities exist in base model',
  },
  {
    source: '2601.13244',
    target: '2506.17219',
    type: 'supports',
    description: 'SFT/RL can degrade reasoning',
  },
  {
    source: '2509.13334',
    target: '2307.13702',
    type: 'extends',
    description: 'Causal intervention identifies 32.9% faithfulness baseline in Qwen GSM8K',
  },
  {
    source: '2509.13334',
    target: '2505.05410',
    type: 'supports',
    description: 'Both find 25-60% of CoT steps are causally unimportant',
  },
  {
    source: '2510.22362',
    target: '2307.13702',
    type: 'supports',
    description: 'Perturbation persistence reveals easy-case CoT is post-hoc rationalisation',
  },
  {
    source: '2510.22362',
    target: '2505.05410',
    type: 'supports',
    description: 'Easy cases revert after perturbation; model knows answer before reasoning',
  },
  {
    source: '2510.25013',
    target: '2502.20332',
    type: 'supports',
    description: 'Minimal 2-head additive-contrastive circuit for IOI; task-specific, not general',
  },
  {
    source: '2510.08931',
    target: '2410.05229',
    type: 'supports',
    description: 'Mechanistic memorization detection',
  },
  {
    source: '2510.08931',
    target: '2601.13392',
    type: 'supports',
    description: 'Memorization vs reasoning distinction',
  },
  {
    source: '2510.22437',
    target: '2506.06941',
    type: 'supports',
    description:
      'FSM analysis: longest chains (123 states) yield lower GPQA accuracy than shorter ones',
  },
  {
    source: '2510.22437',
    target: '2504.09858',
    type: 'supports',
    description:
      'Math benefits from longer thinking; science does not — task-specific, not general reasoning',
  },
  {
    source: '2504.05262',
    target: '2410.05229',
    type: 'supports',
    description:
      '99.8% numerical → 7.5% symbolic; both show near-perfect scores mask zero generalization',
  },
  {
    source: '2504.05262',
    target: '2305.18654',
    type: 'supports',
    description:
      '1,700+ commutativity violations (A+B ≠ B+A) prove direction-specific memorized patterns',
  },
  {
    source: '2504.05262',
    target: '2512.04727',
    type: 'supports',
    description:
      'SFT achieves 97.17% numerical but 0% symbolic transfer — optimizes patterns, not rules',
  },
  {
    source: '2512.13978',
    target: '2601.14456',
    type: 'supports',
    description: 'Failure on structured reasoning',
  },
  {
    source: '2512.13978',
    target: '2506.18880',
    type: 'supports',
    description: 'Struggle with novel compositions',
  },
  {
    source: '2410.13343',
    target: '2410.05229',
    type: 'supports',
    description: 'Up to 53.5pp drop on constituent shortcut; larger models more susceptible',
  },
  {
    source: '2410.13343',
    target: '2305.18654',
    type: 'supports',
    description: 'Six shortcut types exploited; overconfidence masks poor NLI reasoning',
  },
  {
    source: '2409.02257',
    target: '2410.13343',
    type: 'supports',
    description:
      'Anchoring bias: models stick to original choices; GPT-4o drops -14.3pp on multi-answer',
  },
  {
    source: '2409.02257',
    target: '2410.05229',
    type: 'supports',
    description:
      'Shortcut selection ratio reveals models maintain wrong answers rather than reassess',
  },
  {
    source: '2512.01222',
    target: '2601.08058',
    type: 'supports',
    description: 'Internal representations interpretable',
  },
  {
    source: '2512.01222',
    target: '2502.20332',
    type: 'supports',
    description: 'Semantic structure in layers',
  },
  {
    source: '2506.21215',
    target: '2305.18654',
    type: 'supports',
    description:
      'Only level-1 (retrieval) causal reasoning; ~30pp drop on CausalProbe 2024 post-training data',
  },
  {
    source: '2506.21215',
    target: '2410.05229',
    type: 'supports',
    description:
      'Sequential causality ≠ logical causality; autoregressive mechanism creates spurious associations',
  },
  {
    source: '2506.21215',
    target: '2601.14456',
    type: 'supports',
    description:
      'Fresh data benchmark confirms distribution-bounded reasoning; same ID/OOD collapse pattern',
  },
  {
    source: '2503.05788',
    target: '2410.05229',
    type: 'supports',
    description: 'Metric choice affects detection',
  },
  {
    source: '2503.05788',
    target: '2305.18654',
    type: 'supports',
    description: 'Memorization vs generalization',
  },
  {
    source: '2501.02497',
    target: '2510.18254',
    type: 'supports',
    description: 'Survey confirms self-correction bottleneck is error locating, not error fixing',
  },
  {
    source: '2501.02497',
    target: '2506.17219',
    type: 'supports',
    description: 'No universal test-time scaling law; LRMs struggle to generalize cross-domain',
  },
  {
    source: '2404.00560',
    target: '2407.20311',
    type: 'supports',
    description: 'LG achievable with proper structure',
  },
  {
    source: '2404.00560',
    target: '2305.18654',
    type: 'supports',
    description: 'Standard formulations fail',
  },
  {
    source: '2510.10182',
    target: '2305.18654',
    type: 'supports',
    description: 'Pattern matching mechanism',
  },
  {
    source: '2510.10182',
    target: '2506.18880',
    type: 'supports',
    description: 'Compositional generalization failures',
  },
  {
    source: '2510.15974',
    target: '2506.06941',
    type: 'supports',
    description: 'Agentic Hanoi collapses EARLIER than baseline; 60-70% loop rate at n=8 disks',
  },
  {
    source: '2510.15974',
    target: '2506.18957',
    type: 'rebuts',
    description:
      'Environment interface makes Hanoi worse, not better; execution gap IS reasoning gap',
  },
  {
    source: '2510.15974',
    target: '2507.17699',
    type: 'rebuts',
    description:
      'Dynamic state feedback + tool calls make planning worse; deterministic looping, not exploration',
  },
  {
    source: '2504.01445',
    target: '2305.18654',
    type: 'supports',
    description: 'o3-mini 64% on 3-shot but 0.53% on novel compositions',
  },
  {
    source: '2504.01445',
    target: '2506.18880',
    type: 'supports',
    description: '5.7M MLC model beats 8B+ LLMs; training approach > scale',
  },
  {
    source: '2504.01445',
    target: '2601.14456',
    type: 'supports',
    description: '0.87%→73.7% only via test-time training on test distribution',
  },
  {
    source: '2504.12523',
    target: '2305.18654',
    type: 'supports',
    description: '70-80% direct probing vs <2% indirect — memorizes facts, cannot reason over them',
  },
  {
    source: '2504.12523',
    target: '2504.01445',
    type: 'supports',
    description: 'Same pattern: retrieves facts (MCQ ~80%) but fails to compose implications (<2%)',
  },
  {
    source: '2512.13713',
    target: '2506.06941',
    type: 'challenges',
    description: 'O3 develops meta-cognitive strategies',
  },
  {
    source: '2512.13713',
    target: '2510.15974',
    type: 'supports',
    description: 'Most models still fail/loop',
  },
  {
    source: '2510.09312',
    target: '2510.22362',
    type: 'supports',
    description:
      '92.47% AUROC via attribution graphs; error signatures are domain-specific, not universal',
  },
  {
    source: '2509.01267',
    target: '2410.05229',
    type: 'supports',
    description:
      'Cannot override learned priors (addition before multiplication); zero-shot <35% on rule variants',
  },
  {
    source: '2509.01267',
    target: '2504.01445',
    type: 'supports',
    description:
      'Performance degrades monotonically with expression depth; simpler shots work better',
  },
  {
    source: '2506.15629',
    target: '2305.18654',
    type: 'supports',
    description: 'Follow learned patterns over instructions',
  },
  {
    source: '2506.15629',
    target: '2504.01445',
    type: 'supports',
    description: 'Compositional generalization failure',
  },
  {
    source: '2601.03676',
    target: '2305.18654',
    type: 'supports',
    description: 'Power-law explains compositional scarcity',
  },
  {
    source: '2601.03676',
    target: '2504.01445',
    type: 'supports',
    description: '4K targeted samples beat 52K random; critical leap at k=2 skill compositions',
  },
  {
    source: '2601.03676',
    target: '2506.18880',
    type: 'supports',
    description:
      'Skill combos follow power-law: atomic abundant, k>1 compositions vanishingly rare in training',
  },
  {
    source: '2505.16782',
    target: '2307.13702',
    type: 'supports',
    description:
      'Survey identifies expressive redundancy and semantic bottleneck as fundamental CoT limits',
  },
  {
    source: '2505.16782',
    target: '2601.08058',
    type: 'supports',
    description:
      'Coconut, CODI achieve 5.7x speedup — latent space decouples reasoning from language',
  },
  {
    source: '2502.07813',
    target: '2305.18654',
    type: 'supports',
    description: '40-54pp drop when words encoded; can decode OR answer, not both',
  },
  {
    source: '2502.07813',
    target: '2506.18880',
    type: 'supports',
    description: 'Multi-turn decomposition easier; models fail to self-compose subtasks',
  },
  {
    source: '2510.27378',
    target: '2307.13702',
    type: 'extends',
    description:
      'Adds verbosity dimension: faithful CoT can still omit key factors, blocking monitoring',
  },
  {
    source: '2510.27378',
    target: '2505.05410',
    type: 'supports',
    description: 'Models appear faithful yet remain unmonitorable — key factors hidden from CoT',
  },
  {
    source: '2403.11793',
    target: '2305.18654',
    type: 'supports',
    description: 'Compositional reasoning failure',
  },
  {
    source: '2403.11793',
    target: '2506.18880',
    type: 'supports',
    description: 'Primitives work, compositions fail',
  },
  {
    source: '2504.00294',
    target: '2501.02497',
    type: 'supports',
    description:
      'R1 uses 5x tokens as Claude 3.7 for ~same accuracy; more tokens ≠ better reasoning',
  },
  {
    source: '2504.00294',
    target: '2506.06941',
    type: 'supports',
    description:
      'TSP accuracy near 0% at hard levels; token usage saturates while accuracy still drops',
  },
  // Paper #84: Trapped in the Past (2601.16823)
  {
    source: '2601.16823',
    target: '2305.18654',
    type: 'supports',
    description: 'Crystallized (memorization) dominates reasoning',
  },
  {
    source: '2601.16823',
    target: '2506.06941',
    type: 'supports',
    description: 'OOD collapse to random performance',
  },
  {
    source: '2601.16823',
    target: '2512.07783',
    type: 'supports',
    description: 'Reasoning tokens diminishing returns OOD',
  },
  {
    source: '2601.16823',
    target: '2601.14456',
    type: 'supports',
    description: 'ID/OOD gap pattern in chess',
  },
  // Paper #85: ToM Robustness (2601.16853)
  {
    source: '2601.16853',
    target: '2512.07783',
    type: 'supports',
    description: 'Robustness bounded by base model capability',
  },
  {
    source: '2601.16853',
    target: '2501.12948',
    type: 'supports',
    description: 'RL surfaces existing capability',
  },
  // Paper #86: MortalMATH (2601.18790)
  {
    source: '2601.18790',
    target: '2501.12948',
    type: 'challenges',
    description: 'RLVR creates tunnel vision, not reasoning',
  },
  {
    source: '2601.18790',
    target: '2506.17219',
    type: 'supports',
    description: 'RL optimization creates blindness',
  },
  {
    source: '2601.18790',
    target: '2305.18654',
    type: 'supports',
    description: 'Pattern pursuit ignores context',
  },
  // Missing papers added
  {
    source: '2406.10625',
    target: '2307.13702',
    type: 'extends',
    description: 'ICL, fine-tuning, activation editing all fail to fix faithfulness',
  },
  {
    source: '2406.10625',
    target: '2505.05410',
    type: 'supports',
    description: 'GPT-4 highest accuracy but lowest faithfulness; RLHF rewards coherence',
  },
  {
    source: '2510.10182',
    target: '2305.18654',
    type: 'supports',
    description: 'Induction heads = pattern matching',
  },
  {
    source: '2512.01222',
    target: '2601.08058',
    type: 'supports',
    description: 'Internal representations interpretable',
  },
  {
    source: '2601.14716',
    target: '2501.12948',
    type: 'supports',
    description: 'RL improves long-CoT reasoning',
  },
  {
    source: '2601.14716',
    target: '2512.07783',
    type: 'supports',
    description: 'Depends on distillation (surfacing)',
  },
  // o3 Thinks Harder Not Longer links
  {
    source: '2502.15631',
    target: '2506.06941',
    type: 'supports',
    description: 'More tokens ≠ better outcomes',
  },
  {
    source: '2502.15631',
    target: '2305.18654',
    type: 'supports',
    description: 'Error accumulation with chain length',
  },
  {
    source: '2502.15631',
    target: '2504.09858',
    type: 'supports',
    description: 'Excessive reasoning can hurt',
  },
  {
    source: '2502.15631',
    target: '2501.02497',
    type: 'supports',
    description: 'Explains why sequential scaling fails',
  },
  {
    source: '2502.15631',
    target: '2501.19393',
    type: 'challenges',
    description: 'Accuracy declines with length (vs log-linear claim)',
  },
  // System 1/2 Alignment links
  {
    source: '2502.12470',
    target: '2502.15631',
    type: 'supports',
    description: 'Longer reasoning not always better',
  },
  {
    source: '2502.12470',
    target: '2506.06941',
    type: 'supports',
    description: 'Overthinking problematic',
  },
  {
    source: '2502.12470',
    target: '2504.09858',
    type: 'supports',
    description: 'Explicit reasoning sometimes suboptimal',
  },
  {
    source: '2502.12470',
    target: '2512.07783',
    type: 'supports',
    description: 'Capabilities from training distribution',
  },
  // Content Effects on Reasoning links
  {
    source: '2207.07051',
    target: '2305.18654',
    type: 'supports',
    description: 'Distribution-bounded reasoning',
  },
  {
    source: '2207.07051',
    target: '2410.05229',
    type: 'supports',
    description: 'Content/framing affects performance',
  },
  {
    source: '2207.07051',
    target: '2512.07783',
    type: 'supports',
    description: 'Capabilities from training distribution',
  },
  {
    source: '2207.07051',
    target: '2410.13343',
    type: 'supports',
    description: 'Models exploit semantic shortcuts',
  },
  {
    source: '2207.07051',
    target: '2502.12470',
    type: 'extends',
    description: 'Dual-process with human comparison',
  },
  // AI Metacognition links
  {
    source: '2411.02478',
    target: '2506.06941',
    type: 'supports',
    description: 'Both show AI lacks genuine reasoning at complexity thresholds',
  },
  {
    source: '2411.02478',
    target: '2207.07051',
    type: 'supports',
    description: 'Both show AI relies on learned patterns',
  },
  {
    source: '2411.02478',
    target: '2410.05229',
    type: 'supports',
    description: 'Lack of metacognition explains perturbation sensitivity',
  },
  {
    source: '2411.02478',
    target: '2501.02497',
    type: 'supports',
    description: 'Self-correction limited without metacognition',
  },
  {
    source: '2411.02478',
    target: '2510.18254',
    type: 'supports',
    description: 'Reflection without metacognition is hollow',
  },
  {
    source: '2411.02478',
    target: '2502.12470',
    type: 'extends',
    description: 'Metacognition = ability to switch S1/S2 appropriately',
  },
  {
    source: '2411.02478',
    target: '2502.15631',
    type: 'extends',
    description: 'Wise AI would know when to think longer vs stop',
  },
  // Temporal Cognition links
  {
    source: '2507.15851',
    target: '2207.07051',
    type: 'supports',
    description: 'Both show LLMs learn patterns from data that mirror human cognition',
  },
  {
    source: '2507.15851',
    target: '2512.07783',
    type: 'supports',
    description: 'Both show capabilities emerge from training distribution',
  },
  {
    source: '2507.15851',
    target: '2512.23722',
    type: 'supports',
    description: 'Both show LLMs build internal models from training signal',
  },
  {
    source: '2507.15851',
    target: '2502.12470',
    type: 'extends',
    description: 'Adds temporal dimension to dual-process understanding',
  },
  {
    source: '2507.15851',
    target: '2503.05788',
    type: 'extends',
    description: 'Provides mechanistic example of emergent ability',
  },
  // On the Notion that Language Models Reason links
  {
    source: '2511.11810',
    target: '2305.18654',
    type: 'supports',
    description: 'Both argue LMs are pattern matchers',
  },
  {
    source: '2511.11810',
    target: '2410.05229',
    type: 'supports',
    description: 'Cites as evidence of logical inconsistency',
  },
  {
    source: '2511.11810',
    target: '2406.02061',
    type: 'supports',
    description: 'Cites Alice in Wonderland failures',
  },
  {
    source: '2511.11810',
    target: '2411.02478',
    type: 'supports',
    description: 'Both argue LMs lack genuine reasoning',
  },
  {
    source: '2511.11810',
    target: '2207.07051',
    type: 'supports',
    description: 'Both show LMs follow data patterns',
  },
  // Reasoning or Reciting links
  {
    source: '2307.02477',
    target: '2305.18654',
    type: 'supports',
    description: 'Both show OOD failure; counterfactual framework',
  },
  {
    source: '2307.02477',
    target: '2410.05229',
    type: 'supports',
    description: 'Same methodology; perturbation breaks performance',
  },
  {
    source: '2307.02477',
    target: '2511.11810',
    type: 'supports',
    description: 'Both argue LMs use narrow procedures',
  },
  {
    source: '2307.02477',
    target: '2207.07051',
    type: 'supports',
    description: 'Both show training distribution determines capability',
  },
  // Gaming the Judge links
  {
    source: '2601.14691',
    target: '2307.13702',
    type: 'supports',
    description: 'Both show CoT unreliable for evaluation',
  },
  {
    source: '2601.14691',
    target: '2505.05410',
    type: 'supports',
    description: 'Both show CoT can be unfaithful/misleading',
  },
  {
    source: '2601.14691',
    target: '2510.18254',
    type: 'supports',
    description: 'Both show surface features dominate',
  },
  {
    source: '2601.14691',
    target: '2512.20812',
    type: 'supports',
    description: 'Both show semantic patterns override substance',
  },
  // Beyond Memorization links
  {
    source: '2601.13392',
    target: '2307.02477',
    type: 'supports',
    description: 'Both show seen/unseen gap = memorization',
  },
  {
    source: '2601.13392',
    target: '2305.18654',
    type: 'supports',
    description: 'Both show compositional generalization failure',
  },
  {
    source: '2601.13392',
    target: '2410.05229',
    type: 'supports',
    description: 'Both show novelty breaks performance',
  },
  {
    source: '2601.13392',
    target: '2508.01191',
    type: 'supports',
    description: 'Both show ID success, OOD failure',
  },
  {
    source: '2601.13392',
    target: '2504.01445',
    type: 'supports',
    description: 'Both show systematicity failure',
  },
  // Outcome-Based RL links
  {
    source: '2601.15158',
    target: '2512.07783',
    type: 'supports',
    description: 'RL surfaces capability from base model',
  },
  {
    source: '2601.15158',
    target: '2501.19393',
    type: 'supports',
    description: 'Easy examples seed reasoning patterns',
  },
  {
    source: '2601.15158',
    target: '2501.12948',
    type: 'extends',
    description: 'Theoretical analysis of RL-driven reasoning',
  },
  {
    source: '2601.15158',
    target: '2407.20311',
    type: 'supports',
    description: 'Both show role of easy examples',
  },
  // Tokenizer Betrays Reasoning links
  {
    source: '2601.14658',
    target: '2305.18654',
    type: 'supports',
    description: 'Surface-level pattern matching, not semantic',
  },
  {
    source: '2601.14658',
    target: '2410.05229',
    type: 'supports',
    description: 'Perturbation sensitivity reveals shallow processing',
  },
  {
    source: '2601.14658',
    target: '2410.13343',
    type: 'supports',
    description: 'Models exploit surface patterns',
  },
  {
    source: '2601.14658',
    target: '2509.12645',
    type: 'supports',
    description: 'Token-level not meaning-level processing',
  },
  {
    source: '2601.14658',
    target: '2207.07051',
    type: 'extends',
    description: 'Mechanistic explanation for surface form effects',
  },
  // Flexibility Trap links
  {
    source: '2601.15165',
    target: '2307.13702',
    type: 'supports',
    description: 'CoT unfaithfulness - logical connectors post-hoc',
  },
  {
    source: '2601.15165',
    target: '2506.06941',
    type: 'supports',
    description: 'Reasoning collapses under conditions',
  },
  {
    source: '2601.15165',
    target: '2305.18654',
    type: 'supports',
    description: 'Models take shortcuts around genuine reasoning',
  },
  {
    source: '2601.15165',
    target: '2505.05410',
    type: 'supports',
    description: 'Retrospective alignment not genuine reasoning',
  },
  // Reasoning-Critical Neurons links
  {
    source: '2601.19847',
    target: '2502.20332',
    type: 'supports',
    description: 'Both find identifiable reasoning circuits',
  },
  {
    source: '2601.19847',
    target: '2510.15987',
    type: 'supports',
    description: 'Both identify specific neurons for reasoning',
  },
  {
    source: '2601.19847',
    target: '2509.23629',
    type: 'supports',
    description: 'Both show sparse neural structures',
  },
  {
    source: '2601.19847',
    target: '2512.07783',
    type: 'supports',
    description: 'Steering surfaces existing capability',
  },
  {
    source: '2601.19773',
    target: '2601.19847',
    type: 'supports',
    description: 'Both show decoupled capabilities',
  },
  {
    source: '2601.19773',
    target: '2601.15165',
    type: 'supports',
    description: 'Task structure mismatch causes collapse',
  },
  {
    source: '2601.19773',
    target: '2601.14658',
    type: 'supports',
    description: 'Surface-level processing pattern',
  },
  {
    source: '2601.19773',
    target: '2305.18654',
    type: 'supports',
    description: 'Pattern matching fails on novel interaction',
  },
  // WhatCounts links
  {
    source: '2601.21618',
    target: '2305.18654',
    type: 'supports',
    description: 'Pattern matching not algorithms at atomic level',
  },
  {
    source: '2601.21618',
    target: '2410.05229',
    type: 'supports',
    description: 'Semantics affect reasoning (class vs irrelevant info)',
  },
  {
    source: '2601.21618',
    target: '2207.07051',
    type: 'supports',
    description: 'Semantic content determines performance',
  },
  {
    source: '2601.21618',
    target: '2512.04727',
    type: 'supports',
    description: 'Counting failures (semantic variation axis)',
  },
  // Sycophantic Anchors links
  {
    source: '2601.21183',
    target: '2307.13702',
    type: 'extends',
    description: 'Sentence-level mechanism for CoT unfaithfulness',
  },
  {
    source: '2601.21183',
    target: '2505.05410',
    type: 'supports',
    description: 'Both show distinct pathways for unfaithful reasoning',
  },
  {
    source: '2601.21183',
    target: '2503.08679',
    type: 'supports',
    description: 'Mechanistic evidence for unfaithfulness in natural settings',
  },
  {
    source: '2601.21183',
    target: '2512.07783',
    type: 'supports',
    description: 'Sycophancy emerges during generation, not from prompt',
  },
  {
    source: '2601.21183',
    target: '2601.15165',
    type: 'supports',
    description: 'CoT justifies social goal not epistemic goal',
  },
  // Sycophancy Hides Linearly links
  {
    source: '2601.16644',
    target: '2601.21183',
    type: 'supports',
    description: 'Both find sycophancy distinctly encoded from correct reasoning',
  },
  {
    source: '2601.16644',
    target: '2307.13702',
    type: 'extends',
    description: 'Mechanistic localization of unfaithfulness to attention heads',
  },
  {
    source: '2601.16644',
    target: '2505.05410',
    type: 'supports',
    description: 'Truthfulness ≠ deference resistance = distinct pathways',
  },
  {
    source: '2601.16644',
    target: '2512.07783',
    type: 'supports',
    description: 'Social cue attention = pattern matching on training',
  },
  // Spurious Rewards Paradox links
  {
    source: '2601.11061',
    target: '2512.07783',
    type: 'supports',
    description: 'RLVR surfaces memorization, not creates reasoning',
  },
  {
    source: '2601.11061',
    target: '2501.12948',
    type: 'challenges',
    description: 'RL gains may be contamination, not emergence',
  },
  {
    source: '2601.11061',
    target: '2506.17219',
    type: 'supports',
    description: 'Both show RL can exploit shortcuts over reasoning',
  },
  {
    source: '2601.11061',
    target: '2305.18654',
    type: 'supports',
    description: 'Memorization shortcut = pattern retrieval not reasoning',
  },
  {
    source: '2601.11061',
    target: '2509.23629',
    type: 'supports',
    description: 'Provides mechanism for policy collapse',
  },
  // Reasoning or Guessing? (HRM) links
  {
    source: '2601.10679',
    target: '2506.06941',
    type: 'supports',
    description: 'Both show "sudden" correctness, not gradual reasoning',
  },
  {
    source: '2601.10679',
    target: '2305.18654',
    type: 'supports',
    description: 'Fixed points = subgraph matching patterns',
  },
  {
    source: '2601.10679',
    target: '2601.11061',
    type: 'supports',
    description: 'Both show models find shortcuts/attractors over reasoning',
  },
  {
    source: '2601.10679',
    target: '2512.07783',
    type: 'supports',
    description: 'Scaling guesses = scaling search through patterns',
  },
  {
    source: '2601.10679',
    target: '2510.15974',
    type: 'supports',
    description: 'Both show models get trapped in local patterns/modes',
  },
  // Two Pathways to Truthfulness links
  {
    source: '2601.07422',
    target: '2601.21183',
    type: 'supports',
    description: 'Both find distinct encoding for truthfulness pathways',
  },
  {
    source: '2601.07422',
    target: '2601.16644',
    type: 'supports',
    description: 'Both find separate mechanisms for different truthfulness modes',
  },
  {
    source: '2601.07422',
    target: '2305.18654',
    type: 'supports',
    description: 'Q-Anchored = pattern retrieval; knowledge boundary = training distribution',
  },
  {
    source: '2601.07422',
    target: '2410.05229',
    type: 'supports',
    description: 'Performance tied to familiarity (popular vs long-tail)',
  },
  {
    source: '2601.07422',
    target: '2307.13702',
    type: 'extends',
    description: 'Mechanistic analysis of truthfulness encoding pathways',
  },
  // Thinking Out of Order links
  {
    source: '2601.22035',
    target: '2601.15165',
    type: 'supports',
    description: 'Both show order constraints affect reasoning in diffusion LLMs',
  },
  {
    source: '2601.22035',
    target: '2305.18654',
    type: 'supports',
    description: 'AR sequential commitment = why errors accumulate',
  },
  {
    source: '2601.22035',
    target: '2307.13702',
    type: 'supports',
    description: 'AR CoT unfaithful because answer decided before reasoning',
  },
  {
    source: '2601.22035',
    target: '2506.06941',
    type: 'supports',
    description: 'Complexity collapse = when model cant distinguish token complexity',
  },
  // Paper 115: Scaling Reasoning Hop links
  {
    source: '2601.21214',
    target: '2305.18654',
    type: 'supports',
    description: 'Mechanistic cause of error accumulation',
  },
  {
    source: '2601.21214',
    target: '2506.06941',
    type: 'supports',
    description: 'ep heads explain complexity collapse',
  },
  {
    source: '2601.21214',
    target: '2512.07783',
    type: 'supports',
    description: 'Both show training distribution bounds capability',
  },
  {
    source: '2601.21214',
    target: '2601.19847',
    type: 'extends',
    description: 'ep heads complement reasoning-critical neurons',
  },
  // Paper 116: Code over Words links
  {
    source: '2601.18352',
    target: '2410.05229',
    type: 'supports',
    description: 'Semantic info disrupts reasoning',
  },
  {
    source: '2601.18352',
    target: '2512.20812',
    type: 'supports',
    description: 'Semantic cues override explicit instructions',
  },
  {
    source: '2601.18352',
    target: '2305.18654',
    type: 'supports',
    description: 'Prior interference causes error accumulation',
  },
  {
    source: '2601.18352',
    target: '2506.06941',
    type: 'supports',
    description: 'Complexity collapse = prior interference',
  },
  // Paper 122: Illusions of Confidence links
  {
    source: '2601.05905',
    target: '2308.03958',
    type: 'extends',
    description: 'Provides MECHANISM for sycophancy: low-NCB beliefs are why models flip',
  },
  {
    source: '2601.05905',
    target: '2506.21561',
    type: 'supports',
    description: 'Explains truth-bias: true statements have higher NCB neighborhoods',
  },
  {
    source: '2601.05905',
    target: '2601.15436',
    type: 'supports',
    description: 'NCB explains variance in sycophantic behavior',
  },
  {
    source: '2601.05905',
    target: '2307.13702',
    type: 'extends',
    description: 'Adds that CoT doesnt help (sometimes hurts) belief robustness',
  },
  {
    source: '2601.05905',
    target: '2311.07590',
    type: 'supports',
    description: 'Explains why deception emerges: weak beliefs easily adopt alternatives',
  },
  {
    source: '2601.05905',
    target: '2305.18654',
    type: 'supports',
    description: 'Structural beliefs = pattern integration; isolated facts = pattern matching',
  },
  {
    source: '2601.05905',
    target: '2601.16644',
    type: 'supports',
    description: 'Both find sycophancy has distinct computational signature',
  },
  {
    source: '2601.05905',
    target: '2601.21183',
    type: 'supports',
    description: 'NCB explains why sycophancy emerges during generation',
  },
  // Paper 123: Causal Illusions links
  {
    source: '2410.11684',
    target: '2308.03958',
    type: 'supports',
    description: 'Both show sycophancy amplifies erroneous beliefs',
  },
  {
    source: '2410.11684',
    target: '2601.05905',
    type: 'supports',
    description: 'Sycophantic pressure causes belief collapse (both show this)',
  },
  {
    source: '2410.11684',
    target: '2601.15436',
    type: 'supports',
    description: 'Claude lower sycophancy aligns with lower causal illusion',
  },
  {
    source: '2410.11684',
    target: '2506.21215',
    type: 'extends',
    description: 'Adds headline generation task to causal reasoning evaluation',
  },
  {
    source: '2410.11684',
    target: '2305.18654',
    type: 'supports',
    description: 'Causal illusion = pattern matching on correlation cues',
  },
  // Paper 124: Illusion of Illusion (Rebuttal) links
  {
    source: '2506.09250',
    target: '2506.06941',
    type: 'rebuts',
    description: 'Direct rebuttal: argues token limits not reasoning limits; impossible puzzles',
  },
  {
    source: '2506.09250',
    target: '2507.01231',
    type: 'challenges',
    description:
      'Both address Illusion of Thinking methodology; Paper 37 already fixed River Crossing',
  },
  {
    source: '2506.09250',
    target: '2305.18654',
    type: 'does not address',
    description: 'Code generation test doesnt address compositional generalization',
  },
  // Paper 125: Alice in Wonderland links
  {
    source: '2406.02061',
    target: '2506.06941',
    type: 'supports',
    description: 'Both show reasoning collapse on simple problems; AIW is even simpler',
  },
  {
    source: '2406.02061',
    target: '2305.18654',
    type: 'supports',
    description: 'Compositional failure on simple combinations; number sensitivity',
  },
  {
    source: '2406.02061',
    target: '2410.05229',
    type: 'supports',
    description: 'Similar number sensitivity; AIW fluctuations more dramatic (0-100% vs smaller)',
  },
  {
    source: '2406.02061',
    target: '2601.21618',
    type: 'supports',
    description: 'Both show semantic/numeric content affects "reasoning" dramatically',
  },
  {
    source: '2406.02061',
    target: '2307.13702',
    type: 'supports',
    description: 'Confabulation with wrong answers = unfaithful reasoning',
  },
  {
    source: '2406.02061',
    target: '2506.09250',
    type: 'rebuts',
    description: 'AIW controls rule out evaluation artifacts - failures are real reasoning limits',
  },
  // Paper 126: Fundamental Limitations of Alignment (BEB) links
  {
    source: '2304.11082',
    target: '2311.07590',
    type: 'supports',
    description:
      'Provides theoretical framework for why persona prompts work; any α>0 behavior triggerable',
  },
  {
    source: '2304.11082',
    target: '2308.03958',
    type: 'supports',
    description: 'Sycophancy as activating agreement-seeking component; RLHF increases β',
  },
  {
    source: '2304.11082',
    target: '2406.02061',
    type: 'supports',
    description: 'Mixture model explains confabulation; pattern-switched failures',
  },
  {
    source: '2304.11082',
    target: '2506.06941',
    type: 'extends',
    description: 'Provides theoretical foundation for prompt-induced collapse',
  },
  // Paper 127: Towards Understanding Sycophancy links
  {
    source: '2310.13548',
    target: '2601.15436',
    type: 'extends',
    description: 'Establishes sycophancy methodology; Paper 96 extends',
  },
  {
    source: '2310.13548',
    target: '2601.21183',
    type: 'extends',
    description: 'Foundational for mechanistic sycophancy anchors work',
  },
  {
    source: '2310.13548',
    target: '2601.16644',
    type: 'extends',
    description: 'Enables linear probe sycophancy detection',
  },
  {
    source: '2310.13548',
    target: '2311.07590',
    type: 'supports',
    description: 'Sycophancy as precursor to strategic deception; same RLHF mechanism',
  },
  {
    source: '2310.13548',
    target: '2506.21561',
    type: 'supports',
    description: 'Both find PM prefers sycophantic; reasoning models affected',
  },
  {
    source: '2310.13548',
    target: '2601.05905',
    type: 'supports',
    description: '98% mistake admission parallels belief collapse under pressure',
  },
  {
    source: '2310.13548',
    target: '2410.11684',
    type: 'supports',
    description: 'Both show sycophancy amplifies errors; same mechanism',
  },
  {
    source: '2310.13548',
    target: '2308.03958',
    type: 'supports',
    description: 'Complementary work; both establish sycophancy fundamentals',
  },
  // Paper 128: Conformity of LLMs links
  {
    source: '2501.13381',
    target: '2310.13548',
    type: 'supports',
    description: 'Both show LLMs prioritize social agreement over truth',
  },
  {
    source: '2501.13381',
    target: '2308.03958',
    type: 'supports',
    description: 'Both show larger models dont eliminate social bias',
  },
  {
    source: '2501.13381',
    target: '2506.21561',
    type: 'supports',
    description: 'Conformity is form of sycophancy to peer group',
  },
  {
    source: '2501.13381',
    target: '2601.05905',
    type: 'supports',
    description: 'Beliefs collapse under social pressure; same brittleness',
  },
  // Paper 129: Overthinking o1-Like LLMs links
  {
    source: '2412.21187',
    target: '2601.21576',
    type: 'supports',
    description: 'Both show extended CoT often redundant; most tokens wasted',
  },
  {
    source: '2412.21187',
    target: '2601.17421',
    type: 'supports',
    description: 'Both show error correction in long chains often fake',
  },
  {
    source: '2412.21187',
    target: '2506.06941',
    type: 'supports',
    description: 'Both show performance issues with extended thinking',
  },
  {
    source: '2412.21187',
    target: '2501.02497',
    type: 'extends',
    description: 'Quantifies inefficiency of test-time compute scaling',
  },
  // Paper 130: Underthinking o1-Like LLMs links
  {
    source: '2501.18585',
    target: '2412.21187',
    type: 'supports',
    description: 'Companion paper; same root cause (uncontrolled pattern generation)',
  },
  {
    source: '2501.18585',
    target: '2601.17421',
    type: 'supports',
    description: 'Both show token-level signals dont guide reasoning effectively',
  },
  {
    source: '2501.18585',
    target: '2601.19847',
    type: 'supports',
    description: 'Both show reasoning predictable from early signals',
  },
  {
    source: '2501.18585',
    target: '2501.02497',
    type: 'extends',
    description: 'Another failure mode of scaling test-time compute',
  },
  // Paper 131: Can LLMs Reason and Plan (Kambhampati) links
  {
    source: '2403.04121',
    target: '2305.18654',
    type: 'supports',
    description: 'Approximate retrieval = linearized subgraph matching',
  },
  {
    source: '2403.04121',
    target: '2506.06941',
    type: 'supports',
    description: 'Predicts collapse at complexity thresholds',
  },
  {
    source: '2403.04121',
    target: '2506.18880',
    type: 'supports',
    description: 'Assembly problem predicts compositional failure',
  },
  {
    source: '2403.04121',
    target: '2601.14456',
    type: 'supports',
    description: 'Obfuscation findings predict ID/OOD gap',
  },
  // Paper 132: Stop Anthropomorphizing Tokens (Kambhampati) links
  {
    source: '2504.09762',
    target: '2403.04121',
    type: 'extends',
    description: 'Same author; extends to LRMs',
  },
  {
    source: '2504.09762',
    target: '2307.13702',
    type: 'supports',
    description: 'Theoretical grounding for unfaithfulness',
  },
  {
    source: '2504.09762',
    target: '2505.05410',
    type: 'supports',
    description: 'Both show traces dont reflect reasoning',
  },
  {
    source: '2504.09762',
    target: '2412.21187',
    type: 'supports',
    description: 'No metacognitive awareness of reasoning',
  },
  // Paper 133: Base Models Know How to Reason links
  {
    source: '2510.07364',
    target: '2512.07783',
    type: 'supports',
    description: 'Causal proof of surfacing hypothesis',
  },
  {
    source: '2510.07364',
    target: '2403.04121',
    type: 'supports',
    description: 'Shows approximate retrieval can be steered',
  },
  {
    source: '2510.07364',
    target: '2504.09762',
    type: 'supports',
    description: 'Shows compilation mechanism',
  },
  {
    source: '2510.07364',
    target: '2601.19847',
    type: 'supports',
    description: 'Both find steering activates reasoning',
  },
  // Paper 134: Can ICL Generalize OOD links
  {
    source: '2410.09695',
    target: '2305.18654',
    type: 'supports',
    description: 'Pretraining function class = linearized subgraph matching',
  },
  {
    source: '2410.09695',
    target: '2508.01191',
    type: 'supports',
    description: 'Both show ID=high, OOD=low pattern',
  },
  {
    source: '2410.09695',
    target: '2512.07783',
    type: 'supports',
    description: 'Cannot synthesize from void — directly confirmed',
  },
  {
    source: '2410.09695',
    target: '2403.04121',
    type: 'supports',
    description: 'Universal approximate retrieval confirmed empirically',
  },
  {
    source: '2410.09695',
    target: '2510.07364',
    type: 'extends',
    description: 'ICL selects from pretraining functions; Base Models shows they pre-exist',
  },
  // Paper 135: Demystifying Long CoT links
  {
    source: '2502.03373',
    target: '2510.07364',
    type: 'supports',
    description: 'Both show capabilities pre-exist in base model',
  },
  {
    source: '2502.03373',
    target: '2512.07783',
    type: 'supports',
    description: 'Cannot synthesize from void — same finding',
  },
  {
    source: '2502.03373',
    target: '2501.19393',
    type: 'supports',
    description: '1K samples surfaces reasoning — same mechanism',
  },
  {
    source: '2502.03373',
    target: '2412.21187',
    type: 'extends',
    description: 'Explains length scaling dynamics',
  },
  {
    source: '2502.03373',
    target: '2501.18585',
    type: 'extends',
    description: 'Explains length scaling dynamics',
  },
  // Paper 136: Chain of Thoughtlessness links
  {
    source: '2405.04776',
    target: '2403.04121',
    type: 'supports',
    description: 'Same research group, same conclusion: CoT != algorithm learning',
  },
  {
    source: '2405.04776',
    target: '2410.09695',
    type: 'supports',
    description: 'Both show OOD failure',
  },
  {
    source: '2405.04776',
    target: '2508.01191',
    type: 'supports',
    description: 'ID=high, OOD=low — same pattern',
  },
  {
    source: '2405.04776',
    target: '2305.18654',
    type: 'supports',
    description: 'Error accumulation = degradation with complexity',
  },
  {
    source: '2405.04776',
    target: '2506.06941',
    type: 'supports',
    description: 'Complexity collapse demonstrated',
  },
  {
    source: '2405.04776',
    target: '2504.09762',
    type: 'supports',
    description: 'Shows why traces have no semantics — CoT is pattern matching',
  },
  // Paper 137: CoT Training Mechanisms links
  {
    source: '2502.04667',
    target: '2403.04121',
    type: 'supports',
    description: 'OOD failure confirms LLMs cant plan without pattern templates',
  },
  {
    source: '2502.04667',
    target: '2410.09695',
    type: 'supports',
    description: 'Both show OOD generalization failure is fundamental',
  },
  {
    source: '2502.04667',
    target: '2502.03373',
    type: 'supports',
    description: 'Both analyze CoT mechanisms; provides cleaner controlled evidence',
  },
  {
    source: '2502.04667',
    target: '2305.18654',
    type: 'supports',
    description: 'Confirms linearized subgraph matching — patterns not reason',
  },
  {
    source: '2502.04667',
    target: '2510.07364',
    type: 'extends',
    description: 'Explains why base models have latent ability — component patterns exist',
  },
  // Paper 138: Lexical Accuracy Hints links
  {
    source: '2508.15842',
    target: '2412.21187',
    type: 'supports',
    description: 'Both find CoT length inversely correlated with accuracy',
  },
  {
    source: '2508.15842',
    target: '2501.18585',
    type: 'supports',
    description: 'Complements findings on CoT length dynamics',
  },
  {
    source: '2508.15842',
    target: '2601.05905',
    type: 'supports',
    description: 'Both document severe miscalibration',
  },
  {
    source: '2508.15842',
    target: '2405.04776',
    type: 'supports',
    description: 'Both show CoT doesnt reliably help on hard tasks',
  },
  {
    source: '2508.15842',
    target: '2504.09762',
    type: 'supports',
    description: 'Supports that CoT tokens != reasoning traces',
  },
  {
    source: '2508.15842',
    target: '2502.03373',
    type: 'extends',
    description: 'Provides lexical analysis that Demystifying paper lacks',
  },
  // Paper 139: Recursive LMs links
  {
    source: '2512.24601',
    target: '2506.06941',
    type: 'supports',
    description: 'Context rot evidence confirms reasoning limits',
  },
  {
    source: '2512.24601',
    target: '2403.04121',
    type: 'supports',
    description: 'RLMs = external scaffolding, not native reasoning',
  },
  {
    source: '2512.24601',
    target: '2502.04667',
    type: 'supports',
    description: 'Both show explicit structure improves performance',
  },
  {
    source: '2512.24601',
    target: '2507.17699',
    type: 'extends',
    description: 'Both argue tools augment reasoning',
  },
  // Paper 140: Not All Code Is Equal links
  {
    source: '2601.21894',
    target: '2502.03373',
    type: 'supports',
    description: 'Both show training exposes patterns; complexity-specific > diverse',
  },
  {
    source: '2601.21894',
    target: '2502.04667',
    type: 'supports',
    description: 'Both analyze training structure effects on reasoning',
  },
  {
    source: '2601.21894',
    target: '2510.07364',
    type: 'supports',
    description: 'Code complexity surfaces latent patterns',
  },
  {
    source: '2601.21894',
    target: '2601.21618',
    type: 'supports',
    description: 'Both show surface properties determine performance',
  },
  // Paper 141: Meta-Thought to Execution links
  {
    source: '2601.21909',
    target: '2502.03373',
    type: 'supports',
    description: 'Both show surfacing hypothesis; CoT as trajectory imitation',
  },
  {
    source: '2601.21909',
    target: '2502.04667',
    type: 'supports',
    description: 'Both analyze CoT mechanisms',
  },
  {
    source: '2601.21909',
    target: '2601.21894',
    type: 'supports',
    description: 'Both show training data structure matters',
  },
  {
    source: '2410.09695',
    target: '2601.21909',
    type: 'challenges',
    description: 'Real OOD is ~10%; Paper 141 OOD is within-domain',
  },
  // Paper 142: System 1&2 Synergy links
  {
    source: '2601.21414',
    target: '2510.07364',
    type: 'supports',
    description: 'Reasoning is latent, surfaced by λ configuration',
  },
  {
    source: '2601.21414',
    target: '2502.03373',
    type: 'supports',
    description: 'Both analyze System 1/System 2 dynamic',
  },
  {
    source: '2601.21414',
    target: '2601.21894',
    type: 'supports',
    description: 'Capability is continuous function of configuration',
  },
  {
    source: '2601.21414',
    target: '2412.21187',
    type: 'extends',
    description: 'DAMI could address overthinking via dynamic λ',
  },
  {
    source: '2601.21414',
    target: '2501.18585',
    type: 'extends',
    description: 'DAMI could address underthinking via dynamic λ',
  },
  // Paper 143: Grokked Transformers links
  {
    source: '2405.15071',
    target: '2305.18654',
    type: 'supports',
    description: 'Mechanistic explanation for linearized subgraph matching',
  },
  {
    source: '2405.15071',
    target: '2601.14456',
    type: 'supports',
    description: 'Same ID/OOD pattern: high ID, 0% OOD composition',
  },
  {
    source: '2405.15071',
    target: '2410.09695',
    type: 'supports',
    description: 'Both show composition fails OOD',
  },
  {
    source: '2405.15071',
    target: '2512.07783',
    type: 'extends',
    description: 'Explains why extended training needed - circuit efficiency',
  },
  {
    source: '2405.15071',
    target: '2510.07364',
    type: 'extends',
    description: 'Grokking surfaces latent capability',
  },
  // Paper 144: Deciphering CoT links
  {
    source: '2407.01687',
    target: '2410.05229',
    type: 'supports',
    description: 'Both show probability/frequency effects on reasoning',
  },
  {
    source: '2407.01687',
    target: '2307.13702',
    type: 'supports',
    description: 'Both find unfaithfulness between CoT and answers',
  },
  {
    source: '2407.01687',
    target: '2305.18654',
    type: 'supports',
    description: 'Noisy reasoning = error accumulation mechanism',
  },
  {
    source: '2407.01687',
    target: '2601.21618',
    type: 'supports',
    description: 'Both show output properties determine accuracy',
  },
  {
    source: '2407.01687',
    target: '2505.05410',
    type: 'extends',
    description: 'Adds probability dimension to unfaithfulness',
  },
  // Paper 145: SCoRe links
  {
    source: '2409.12917',
    target: '2510.18254',
    type: 'supports',
    description: 'Both show self-correction fails without special training',
  },
  {
    source: '2409.12917',
    target: '2501.02497',
    type: 'supports',
    description: 'Self-correction limited without external feedback',
  },
  {
    source: '2409.12917',
    target: '2506.17219',
    type: 'supports',
    description: 'Internal signals insufficient; RL can help',
  },
  {
    source: '2409.12917',
    target: '2512.07783',
    type: 'extends',
    description: 'RL can surface capabilities with right training',
  },
  {
    source: '2409.12917',
    target: '2501.12948',
    type: 'extends',
    description: 'Extends RL for reasoning to self-correction',
  },
  // Paper 146: Emergent Abilities Mirage links
  {
    source: '2304.15004',
    target: '2410.05229',
    type: 'supports',
    description: 'Both show performance depends on measurement/statistics',
  },
  {
    source: '2304.15004',
    target: '2305.18654',
    type: 'supports',
    description: 'Smooth scaling supports linearized subgraph matching',
  },
  {
    source: '2304.15004',
    target: '2506.06941',
    type: 'supports',
    description: 'Emergent planning may be metric artifact',
  },
  {
    source: '2304.15004',
    target: '2202.07206',
    type: 'supports',
    description: 'Both show capability scales with statistics, not reasoning',
  },
  // Paper 147: Term Frequencies links
  {
    source: '2202.07206',
    target: '2410.05229',
    type: 'supports',
    description: 'Performance = training frequency',
  },
  {
    source: '2202.07206',
    target: '2305.18654',
    type: 'supports',
    description: 'Frequency correlation supports pattern matching',
  },
  {
    source: '2202.07206',
    target: '2407.01687',
    type: 'supports',
    description: 'Both show frequency/probability drives performance',
  },
  {
    source: '2202.07206',
    target: '2304.15004',
    type: 'supports',
    description: 'Frequency effects explain apparent emergence',
  },
  // Paper 148: Unfaithful CoT links
  {
    source: '2305.04388',
    target: '2307.13702',
    type: 'supports',
    description: 'CoT is unfaithful to computation',
  },
  {
    source: '2305.04388',
    target: '2505.05410',
    type: 'supports',
    description: 'Both show CoT misrepresents true reasons',
  },
  {
    source: '2305.04388',
    target: '2308.03958',
    type: 'supports',
    description: 'CoT doesnt protect against sycophancy bias',
  },
  {
    source: '2305.04388',
    target: '2310.13548',
    type: 'supports',
    description: 'Both show models follow bias without acknowledging',
  },
  {
    source: '2305.04388',
    target: '2410.05229',
    type: 'supports',
    description: 'Surface patterns override stated logic',
  },
  // Paper 149: Reversal Curse links
  {
    source: '2309.12288',
    target: '2305.18654',
    type: 'supports',
    description: 'Direction matters in pattern matching',
  },
  {
    source: '2309.12288',
    target: '2410.05229',
    type: 'supports',
    description: 'Directional storage explains fragility',
  },
  {
    source: '2309.12288',
    target: '2202.07206',
    type: 'supports',
    description: 'Both show performance depends on training patterns',
  },
  {
    source: '2309.12288',
    target: '2410.09695',
    type: 'supports',
    description: 'Both show training direction constrains capability',
  },
  // Paper 150: Planning Abilities links
  {
    source: '2305.15771',
    target: '2403.04121',
    type: 'supports',
    description: 'Same author, same conclusion on planning',
  },
  {
    source: '2305.15771',
    target: '2506.06941',
    type: 'supports',
    description: 'Extended to puzzle domains, same failure pattern',
  },
  {
    source: '2305.15771',
    target: '2405.04776',
    type: 'supports',
    description: 'CoT doesnt help planning (Kambhampati)',
  },
  {
    source: '2305.15771',
    target: '2504.09762',
    type: 'supports',
    description: 'Same author extends to reasoning tokens',
  },
  // Paper 151: Original CoT links
  {
    source: '2201.11903',
    target: '2205.11916',
    type: 'extends',
    description: 'Zero-shot CoT extends original few-shot CoT',
  },
  {
    source: '2201.11903',
    target: '2203.11171',
    type: 'extends',
    description: 'Self-consistency extends CoT with sampling',
  },
  {
    source: '2201.11903',
    target: '2310.07923',
    type: 'supports',
    description: 'Expressive power proves CoT adds computation',
  },
  {
    source: '2201.11903',
    target: '2305.04388',
    type: 'challenged_by',
    description: 'Unfaithfulness challenges CoT reasoning claims',
  },
  // Paper 152: CoT Expressivity links
  {
    source: '2310.07923',
    target: '2201.11903',
    type: 'supports',
    description: 'Theoretical foundation for why CoT helps',
  },
  {
    source: '2310.07923',
    target: '2502.04667',
    type: 'supports',
    description: 'Both show CoT provides computational advantage',
  },
  // Paper 153: PlanBench links
  {
    source: '2206.10498',
    target: '2305.15771',
    type: 'supports',
    description: 'Same authors benchmark supports planning claims',
  },
  {
    source: '2206.10498',
    target: '2403.04121',
    type: 'supports',
    description: 'Benchmark used in Kambhampati planning critiques',
  },
  {
    source: '2206.10498',
    target: '2409.13373',
    type: 'extends',
    description: 'o1 evaluation extends PlanBench findings',
  },
  // Paper 154: Zero-Shot CoT links
  {
    source: '2205.11916',
    target: '2201.11903',
    type: 'extends',
    description: 'Extends CoT to zero-shot setting',
  },
  {
    source: '2205.11916',
    target: '2305.04388',
    type: 'challenged_by',
    description: 'Zero-shot CoT increases bias susceptibility',
  },
  // Paper 155: Self-Consistency links
  {
    source: '2203.11171',
    target: '2201.11903',
    type: 'extends',
    description: 'Extends CoT with diverse sampling',
  },
  {
    source: '2203.11171',
    target: '2509.17380',
    type: 'supports',
    description: 'Self-consistency improves causal structure (RLVR)',
  },
  // Paper 157: Token Bias links
  {
    source: '2406.11050',
    target: '2410.05229',
    type: 'supports',
    description: 'Token bias explains GSM-Symbolic fragility to irrelevant info',
  },
  {
    source: '2406.11050',
    target: '2202.07206',
    type: 'supports',
    description: 'Token bias = frequency correlation in different form',
  },
  {
    source: '2406.11050',
    target: '2309.12288',
    type: 'supports',
    description: 'Both show directional token associations, not relations',
  },
  {
    source: '2406.11050',
    target: '2305.04388',
    type: 'supports',
    description: 'Token bias underlies CoT unfaithfulness',
  },
  {
    source: '2406.11050',
    target: '2305.18654',
    type: 'supports',
    description: 'Token patterns = linearized subgraph matching',
  },
  // Paper 158: Recursive Problems links
  {
    source: '2305.14699',
    target: '2305.18654',
    type: 'supports',
    description: 'Shortcut algorithms = linearized subgraph matching',
  },
  {
    source: '2305.14699',
    target: '2601.13392',
    type: 'supports',
    description: 'Both show models learn patterns that break on unseen cases',
  },
  {
    source: '2305.14699',
    target: '2405.15071',
    type: 'supports',
    description: 'Both examine implicit reasoning; recursion-specific failures',
  },
  {
    source: '2305.14699',
    target: '2601.14456',
    type: 'supports',
    description: 'ID success doesnt transfer to novel cases',
  },
  // Paper 159: ALiBi links
  {
    source: '2108.12409',
    target: '2404.00560',
    type: 'supports',
    description: 'Architectural approach to length generalization',
  },
  {
    source: '2108.12409',
    target: '2512.07783',
    type: 'supports',
    description: 'Capability must exist; ALiBi encodes recency as prior',
  },
  {
    source: '2108.12409',
    target: '2508.01191',
    type: 'partially_addresses',
    description: 'Addresses length failures but not compositional OOD',
  },
  // Paper 160: GSM-IC links
  {
    source: '2302.00093',
    target: '2410.05229',
    type: 'precursor',
    description: 'GSM-IC precursor to GSM-Symbolic; both show irrelevant info causes failures',
  },
  {
    source: '2302.00093',
    target: '2406.11050',
    type: 'supports',
    description: 'Irrelevant context = distracting tokens that trigger wrong patterns',
  },
  {
    source: '2302.00093',
    target: '2305.18654',
    type: 'supports',
    description: 'Distractibility consistent with linearized subgraph matching',
  },
  {
    source: '2302.00093',
    target: '2207.07051',
    type: 'supports',
    description: 'Both show semantic content affects reasoning — no logical filtering',
  },
  // Paper 161: Dot by Dot links
  {
    source: '2404.15758',
    target: '2305.18654',
    type: 'supports',
    description: 'CoT benefits from computation, not task decomposition',
  },
  {
    source: '2404.15758',
    target: '2307.13702',
    type: 'supports',
    description: 'Tokens can be divorced from actual computation',
  },
  {
    source: '2404.15758',
    target: '2310.07923',
    type: 'supports',
    description: 'Provides empirical evidence for theoretical CoT expressivity claims',
  },
  // Paper 162: Pause Tokens links
  {
    source: '2505.21024',
    target: '2404.15758',
    type: 'extends',
    description: 'Proves formal separation conjectured in Dot by Dot',
  },
  {
    source: '2505.21024',
    target: '2305.18654',
    type: 'supports',
    description: 'Proves fundamental computational limits of transformers',
  },
  {
    source: '2505.21024',
    target: '2310.07923',
    type: 'supports',
    description: 'Places pause tokens in relation to CoT expressivity bounds',
  },
  // Paper 163: Mechanistic CoT links
  {
    source: '2402.18312',
    target: '2305.18654',
    type: 'supports',
    description: 'CoT via induction circuits = pattern matching',
  },
  {
    source: '2402.18312',
    target: '2307.13702',
    type: 'supports',
    description: 'Parallel pathways explain CoT unfaithfulness',
  },
  {
    source: '2402.18312',
    target: '2404.15758',
    type: 'supports',
    description: 'Both show CoT benefits from computation not semantics',
  },
  {
    source: '2402.18312',
    target: '2310.07923',
    type: 'supports',
    description: 'Mechanistic evidence for theoretical CoT expressivity',
  },
  // Paper 164: Proof or Bluff links
  {
    source: '2503.21934',
    target: '2305.18654',
    type: 'supports',
    description: 'Pattern matching fails when proofs required',
  },
  {
    source: '2503.21934',
    target: '2506.06941',
    type: 'supports',
    description: 'Same collapse pattern at genuine complexity',
  },
  {
    source: '2503.21934',
    target: '2307.13702',
    type: 'supports',
    description: 'Models produce proof-shaped text without validity',
  },
  {
    source: '2503.21934',
    target: '2410.05229',
    type: 'supports',
    description: 'Answer-only benchmarks hide reasoning limits',
  },
  {
    source: '2503.21934',
    target: '2506.17219',
    type: 'supports',
    description: 'GRPO training artifacts show format over reasoning',
  },
  // Paper 165: Hallucination Inevitable links
  {
    source: '2401.11817',
    target: '2305.18654',
    type: 'supports',
    description: 'Formal foundation for compositional limits',
  },
  {
    source: '2401.11817',
    target: '2506.06941',
    type: 'supports',
    description: 'Explains why complexity thresholds exist',
  },
  {
    source: '2401.11817',
    target: '2403.04121',
    type: 'supports',
    description: 'Formalizes approximate retrieval argument',
  },
  {
    source: '2401.11817',
    target: '2510.18254',
    type: 'supports',
    description: 'Corollary 1 explains self-correction failures',
  },
  // Paper 166: SWE-Bench Illusion links
  {
    source: '2506.12286',
    target: '2305.18654',
    type: 'supports',
    description: 'Distribution-bounded performance',
  },
  {
    source: '2506.12286',
    target: '2410.05229',
    type: 'supports',
    description: 'Benchmark scores dont reflect true capability',
  },
  {
    source: '2506.12286',
    target: '2601.13392',
    type: 'supports',
    description: 'Same pattern: high seen, low unseen',
  },
  {
    source: '2506.12286',
    target: '2307.02477',
    type: 'extends',
    description: 'Extends counterfactual methodology to coding',
  },
  {
    source: '2506.12286',
    target: '2202.07206',
    type: 'supports',
    description: 'Training exposure determines performance',
  },
  // Paper 167: Faithful CoT links
  {
    source: '2301.13379',
    target: '2307.13702',
    type: 'extends',
    description: 'Provides constructive solution via neuro-symbolic framework',
  },
  {
    source: '2301.13379',
    target: '2505.05410',
    type: 'supports',
    description: 'Both confirm CoT doesnt reflect internal computation',
  },
  {
    source: '2301.13379',
    target: '2503.08679',
    type: 'supports',
    description: 'Both document unfaithfulness; Faithful CoT proposes fix',
  },
  {
    source: '2301.13379',
    target: '2201.11903',
    type: 'extends',
    description: 'Proposes solution to CoTs faithfulness limitation',
  },
  {
    source: '2301.13379',
    target: '2305.18654',
    type: 'supports',
    description: 'LLMs good at translation (pattern matching); need solvers for execution',
  },
  // Paper 168: Predictable Compression Failures links
  {
    source: '2509.11208',
    target: '2401.11817',
    type: 'extends',
    description: 'Complementary theoretical foundations (compression vs computability)',
  },
  {
    source: '2509.11208',
    target: '2601.18753',
    type: 'supports',
    description: 'Both analyze hallucination mechanisms',
  },
  {
    source: '2509.11208',
    target: '2601.21576',
    type: 'supports',
    description: 'Both use information-theoretic analysis',
  },
  {
    source: '2509.11208',
    target: '2511.11810',
    type: 'supports',
    description: 'Bayesian in expectation = statistical pattern matching',
  },
  {
    source: '2509.11208',
    target: '2305.18654',
    type: 'supports',
    description: 'Hallucinations = predictable compression failures',
  },
  // Paper 169: Dissociation of Faithful/Unfaithful links
  {
    source: '2405.15092',
    target: '2307.13702',
    type: 'extends',
    description: 'Provides mechanistic explanation for unfaithfulness',
  },
  {
    source: '2405.15092',
    target: '2505.05410',
    type: 'supports',
    description: 'Both confirm hidden vs stated reasoning diverge',
  },
  {
    source: '2405.15092',
    target: '2503.08679',
    type: 'supports',
    description: 'Explains WHY natural prompts show unfaithfulness',
  },
  {
    source: '2405.15092',
    target: '2305.04388',
    type: 'supports',
    description: 'Same phenomenon, different methodology',
  },
  {
    source: '2405.15092',
    target: '2301.13379',
    type: 'extends',
    description: 'Validates need for external verification',
  },
  {
    source: '2405.15092',
    target: '2501.12948',
    type: 'challenges',
    description: 'Claims CoT reflects reasoning; this paper shows it often doesnt',
  },
  {
    source: '2405.15092',
    target: '2305.18654',
    type: 'supports',
    description: 'Opaque mode = shortcuts that dont involve stated reasoning',
  },
  // Paper 170: Fluid Representations links
  {
    source: '2602.04843',
    target: '2510.07364',
    type: 'supports',
    description: 'Both show base models have latent capabilities',
  },
  {
    source: '2602.04843',
    target: '2502.03373',
    type: 'supports',
    description: 'Both show extended reasoning enables existing capabilities',
  },
  {
    source: '2602.04843',
    target: '2305.18654',
    type: 'supports',
    description: 'Compositional failures still occur (96%→35%)',
  },
  {
    source: '2602.04843',
    target: '2506.18880',
    type: 'supports',
    description: 'OOD generalization still fails',
  },
  // Paper 171: Arithmetic Without Algorithms links
  {
    source: '2410.21272',
    target: '2305.18654',
    type: 'supports',
    description: 'Bag of heuristics = linearized subgraph matching at neuron level',
  },
  {
    source: '2410.21272',
    target: '2410.05229',
    type: 'supports',
    description: 'Explains WHY perturbations cause failures - heuristics are pattern-specific',
  },
  {
    source: '2410.21272',
    target: '2202.07206',
    type: 'supports',
    description: 'Frequency-based patterns are a type of heuristic',
  },
  {
    source: '2410.21272',
    target: '2406.11050',
    type: 'supports',
    description: 'Token bias = heuristic-like pattern matching',
  },
  {
    source: '2410.21272',
    target: '2506.06941',
    type: 'supports',
    description: 'Complexity collapse = heuristics fail at scale',
  },
  {
    source: '2410.21272',
    target: '2406.02061',
    type: 'supports',
    description: 'Simple task failures = missing heuristics for unusual patterns',
  },
  {
    source: '2410.21272',
    target: '2305.14699',
    type: 'extends',
    description: 'Shortcut algorithms = bag of heuristics',
  },
  // Paper 172: Unfaithful Reasoning Emergence links
  {
    source: '2602.01017',
    target: '2405.15092',
    type: 'supports',
    description: 'Both show two distinct reasoning modes',
  },
  {
    source: '2602.01017',
    target: '2305.04388',
    type: 'supports',
    description: 'Explains WHY CoT is often unfaithful',
  },
  {
    source: '2602.01017',
    target: '2307.13702',
    type: 'supports',
    description: 'Validates intervention-based faithfulness methodology',
  },
  {
    source: '2602.01017',
    target: '2305.18654',
    type: 'supports',
    description: 'Explains how pattern matching emerges from training',
  },
  {
    source: '2602.01017',
    target: '2506.06941',
    type: 'supports',
    description: 'Complexity threshold = noise threshold for transition',
  },
  {
    source: '2602.01017',
    target: '2410.21272',
    type: 'supports',
    description: 'Bag of heuristics = skip-step reasoning mode',
  },
  {
    source: '2602.01017',
    target: '2502.03373',
    type: 'extends',
    description: 'Adds training dynamics perspective on CoT',
  },
  {
    source: '2602.01017',
    target: '2502.04667',
    type: 'extends',
    description: 'Both use controlled synthetic experiments',
  },
  // Paper 173: One Token to Fool Judge links
  {
    source: '2507.08794',
    target: '2601.14691',
    type: 'supports',
    description: 'Extends Gaming the Judge - single tokens suffice to fool',
  },
  {
    source: '2507.08794',
    target: '2307.13702',
    type: 'supports',
    description: 'Both show CoT evaluation is superficial',
  },
  {
    source: '2507.08794',
    target: '2505.05410',
    type: 'supports',
    description: 'Both show reasoning appearance ≠ reasoning reality',
  },
  {
    source: '2507.08794',
    target: '2512.20812',
    type: 'supports',
    description: 'Both show surface patterns override content',
  },
  {
    source: '2507.08794',
    target: '2508.15842',
    type: 'supports',
    description: 'Both identify specific tokens that signal behavior',
  },
  // Paper 174: Inverse Scaling in Test-Time Compute links
  {
    source: '2507.14417',
    target: '2506.06941',
    type: 'supports',
    description: 'Both show reasoning collapse; this adds INVERSE scaling evidence',
  },
  {
    source: '2507.14417',
    target: '2412.21187',
    type: 'supports',
    description: 'Both show more tokens can hurt; systematic evidence',
  },
  {
    source: '2507.14417',
    target: '2501.18585',
    type: 'supports',
    description: 'Complementary failure modes of extended reasoning',
  },
  {
    source: '2507.14417',
    target: '2410.05229',
    type: 'supports',
    description: 'Distraction failure = irrelevant info sensitivity',
  },
  {
    source: '2507.14417',
    target: '2305.18654',
    type: 'supports',
    description: 'Spurious correlations = pattern matching mechanism',
  },
  {
    source: '2507.14417',
    target: '2502.15631',
    type: 'supports',
    description: 'Both challenge test-time compute scaling benefits',
  },
  {
    source: '2507.14417',
    target: '2501.02497',
    type: 'challenges',
    description: 'Provides counter-evidence to scaling claims',
  },
  {
    source: '2507.14417',
    target: '2501.19393',
    type: 'challenges',
    description: 'Challenges log-linear scaling assumption',
  },
  // Paper 175: Uncommon Meanings of Common Words links
  {
    source: '2405.05741',
    target: '2202.07206',
    type: 'supports',
    description: 'Both show frequency determines performance',
  },
  {
    source: '2405.05741',
    target: '2305.18654',
    type: 'supports',
    description: 'Both show distribution-bounded understanding',
  },
  {
    source: '2405.05741',
    target: '2309.12288',
    type: 'supports',
    description: 'Both show frequency-dependent learning',
  },
  {
    source: '2405.05741',
    target: '2406.11050',
    type: 'supports',
    description: 'Token frequency → performance correlation',
  },
  {
    source: '2405.05741',
    target: '2410.05229',
    type: 'supports',
    description: 'Both show training distribution bounds understanding',
  },
  // Paper 176: LiveCodeBench Pro links
  {
    source: '2506.11928',
    target: '2506.06941',
    type: 'supports',
    description: 'Both show complete failure at complexity thresholds (0% hard tier)',
  },
  {
    source: '2506.11928',
    target: '2305.18654',
    type: 'supports',
    description: 'Both show distribution-bounded capabilities; pattern matching',
  },
  {
    source: '2506.11928',
    target: '2506.18880',
    type: 'supports',
    description: 'Same compositional/complexity collapse pattern',
  },
  {
    source: '2506.11928',
    target: '2601.14456',
    type: 'supports',
    description: 'ID→OOD accuracy gap; easy→hard collapse',
  },
  {
    source: '2506.11928',
    target: '2410.05229',
    type: 'supports',
    description: 'Both show training distribution bounds performance',
  },
  {
    source: '2506.11928',
    target: '2506.12286',
    type: 'supports',
    description: 'Both show high scores reflect memorization, not reasoning',
  },
  {
    source: '2506.11928',
    target: '2503.21934',
    type: 'supports',
    description: 'Both show frontier models fail on expert-level problems',
  },
  // Paper 177: Abstract Reasoning Without CoT links
  {
    source: '2505.23701',
    target: '2305.18654',
    type: 'supports',
    description: 'Both show pattern matching mechanism; abstraction = learned associations',
  },
  {
    source: '2505.23701',
    target: '2410.21272',
    type: 'supports',
    description: 'Both show computation via heuristics, not algorithms',
  },
  {
    source: '2505.23701',
    target: '2502.20332',
    type: 'supports',
    description: 'Both find identifiable mechanisms for reasoning components',
  },
  {
    source: '2505.23701',
    target: '2509.23629',
    type: 'supports',
    description: 'Both show internal mechanisms for reasoning mode activation',
  },
  {
    source: '2505.23701',
    target: '2502.03373',
    type: 'extends',
    description: 'Adds computation vs abstraction distinction to CoT analysis',
  },
  {
    source: '2505.23701',
    target: '2410.05229',
    type: 'extends',
    description: 'Explains WHY GSM-Symbolic perturbations fail: abstraction OK, computation fails',
  },
  // Paper 178: Trilemma of Truth links
  {
    source: '2506.23921',
    target: '2305.18654',
    type: 'supports',
    description: 'Both show distribution-bounded knowledge; training determines truth',
  },
  {
    source: '2506.23921',
    target: '2601.16644',
    type: 'supports',
    description: 'Both find asymmetric encoding of truth-related signals',
  },
  {
    source: '2506.23921',
    target: '2307.13702',
    type: 'supports',
    description: 'Both show probing can find spurious correlations',
  },
  {
    source: '2506.23921',
    target: '2401.11817',
    type: 'supports',
    description: 'Both suggest fundamental limits on truth assessment',
  },
  {
    source: '2506.23921',
    target: '2502.20332',
    type: 'extends',
    description: 'Adds veracity-specific mechanistic analysis',
  },
  // Paper 179: LLMs and Emergence (Melanie Mitchell) links
  {
    source: '2506.11135',
    target: '2305.18654',
    type: 'supports',
    description: 'Both argue capabilities are distribution-bounded, not generalizable',
  },
  {
    source: '2506.11135',
    target: '2304.15004',
    type: 'supports',
    description: 'Both question emergence claims; metrics artifact',
  },
  {
    source: '2506.11135',
    target: '2506.18880',
    type: 'supports',
    description: 'Both show compositional generalization fails',
  },
  {
    source: '2506.11135',
    target: '2506.06941',
    type: 'supports',
    description: 'Both distinguish capability from intelligence',
  },
  {
    source: '2506.11135',
    target: '2502.20332',
    type: 'extends',
    description: 'Provides theoretical framing for mechanistic findings',
  },
  // Additional cross-connections for Papers 175-179
  // Paper 176 (LiveCodeBench Pro) additional links
  {
    source: '2506.11928',
    target: '2507.14417',
    type: 'supports',
    description: 'Both show scaling compute/complexity leads to failure',
  },
  {
    source: '2506.11928',
    target: '2506.11135',
    type: 'supports',
    description: 'Both distinguish capability from intelligence',
  },
  // Paper 177 (Abstract vs Compute) additional links
  {
    source: '2505.23701',
    target: '2602.01017',
    type: 'supports',
    description: 'Both use mechanistic analysis to decompose reasoning',
  },
  {
    source: '2505.23701',
    target: '2307.13702',
    type: 'supports',
    description: 'Both show CoT is not faithful to internal computation',
  },
  // Paper 178 (Trilemma) additional links
  {
    source: '2506.23921',
    target: '2509.11208',
    type: 'supports',
    description: 'Both provide theoretical foundations for hallucination/truth failures',
  },
  {
    source: '2506.23921',
    target: '2506.11135',
    type: 'supports',
    description: 'Both argue LLMs encode probabilistic associations, not truth',
  },
  // Paper 179 (Mitchell Emergence) additional links
  {
    source: '2506.11135',
    target: '2410.21272',
    type: 'supports',
    description: 'Both show heuristics/complexity, not elegant algorithms',
  },
  {
    source: '2506.11135',
    target: '2507.14417',
    type: 'supports',
    description: 'Both show more compute ≠ better reasoning',
  },
  {
    source: '2506.11135',
    target: '2506.11928',
    type: 'supports',
    description: 'Both distinguish capability (LLMs) from intelligence (humans)',
  },
  // Connect Paper 175 (Uncommon Meanings) to more papers
  {
    source: '2405.05741',
    target: '2302.00093',
    type: 'supports',
    description: 'Both show frequency/context determines performance, not understanding',
  },
  {
    source: '2405.05741',
    target: '2506.11135',
    type: 'supports',
    description: 'Both show training distribution bounds capability',
  },
  // Cross-connect new papers to each other
  {
    source: '2506.11928',
    target: '2505.23701',
    type: 'supports',
    description: 'Both decompose performance into components; knowledge vs insight',
  },
  {
    source: '2506.23921',
    target: '2505.23701',
    type: 'supports',
    description: 'Both use mechanistic probing to understand internal representations',
  },
  // Paper 180: Contextual Drag links
  {
    source: '2602.04288',
    target: '2310.13548',
    type: 'supports',
    description: 'Both show context biases LLMs toward errors; sycophancy mechanism',
  },
  {
    source: '2602.04288',
    target: '2302.00093',
    type: 'supports',
    description: 'Both show contextual information can override correct reasoning',
  },
  {
    source: '2602.04288',
    target: '2305.04388',
    type: 'supports',
    description: 'Both show context induces systematic reasoning errors',
  },
  {
    source: '2602.04288',
    target: '2602.01017',
    type: 'supports',
    description: 'Both show autoregressive models inherit patterns from context',
  },
  {
    source: '2602.04288',
    target: '2501.18585',
    type: 'supports',
    description: 'Both show iterative approaches can fail to improve reasoning',
  },
  {
    source: '2602.04288',
    target: '2601.15436',
    type: 'extends',
    description: 'Extends sycophancy analysis to reasoning tasks',
  },
  {
    source: '2602.04288',
    target: '2412.21187',
    type: 'supports',
    description: 'Both document reasoning inefficiency in self-improvement loops',
  },
  {
    source: '2602.04288',
    target: '2506.11135',
    type: 'supports',
    description: 'Both challenge capability from mistakes = intelligence',
  },
  {
    source: '2602.04288',
    target: '2410.05229',
    type: 'supports',
    description: 'Both show reasoning fragility under perturbation',
  },
  {
    source: '2602.04288',
    target: '2502.03373',
    type: 'challenges',
    description: 'Challenges claim that long CoT enables self-correction',
  },
  // Paper 181: No Global Plan in CoT links
  {
    source: '2602.02103',
    target: '2305.15771',
    type: 'supports',
    description: 'Both show LLMs lack genuine planning capabilities',
  },
  {
    source: '2602.02103',
    target: '2409.13373',
    type: 'supports',
    description: 'Both provide evidence against planning in LLMs',
  },
  {
    source: '2602.02103',
    target: '2403.04121',
    type: 'supports',
    description: 'Both support Kambhampati skeptic view on reasoning',
  },
  {
    source: '2602.02103',
    target: '2504.09762',
    type: 'supports',
    description: 'Both show CoT traces lack semantic planning',
  },
  {
    source: '2602.02103',
    target: '2402.18312',
    type: 'extends',
    description: 'Extends mechanistic probing to understand planning horizon',
  },
  {
    source: '2602.02103',
    target: '2404.15758',
    type: 'supports',
    description: 'Both show CoT provides compute steps, not planning',
  },
  {
    source: '2602.02103',
    target: '2502.03373',
    type: 'extends',
    description: 'Extends understanding of WHY long CoT helps',
  },
  {
    source: '2602.02103',
    target: '2305.18654',
    type: 'supports',
    description: 'Both show compositional tasks require step-by-step computation',
  },
  {
    source: '2602.02103',
    target: '2602.04288',
    type: 'supports',
    description: 'Both show LLMs operate locally without global understanding',
  },
  // Paper 182: LMs Struggle to Use In-Context Representations links
  {
    source: '2602.04212',
    target: '2410.09695',
    type: 'supports',
    description: 'Both show ICL implements pretraining functions, not new capabilities',
  },
  {
    source: '2602.04212',
    target: '2309.12288',
    type: 'supports',
    description: 'Both show LLMs store information but cant use it flexibly',
  },
  {
    source: '2602.04212',
    target: '2602.04843',
    type: 'supports',
    description: 'Both probe representations; this shows they dont support task completion',
  },
  {
    source: '2602.04212',
    target: '2402.18312',
    type: 'extends',
    description: 'Both use probing to understand internal representations',
  },
  {
    source: '2602.04212',
    target: '2602.02103',
    type: 'supports',
    description: 'Both show representations fail to support flexible reasoning',
  },
  {
    source: '2602.04212',
    target: '2305.18654',
    type: 'supports',
    description: 'Both show compositional tasks expose fundamental limitations',
  },
  {
    source: '2602.04212',
    target: '2506.11135',
    type: 'supports',
    description: 'Both show capability ≠ flexible deployment/intelligence',
  },
  // Paper 183: Poisoning Attacks links
  {
    source: '2510.07192',
    target: '2401.11817',
    type: 'supports',
    description: 'Both show fundamental limits of statistical learning',
  },
  {
    source: '2510.07192',
    target: '2310.13548',
    type: 'supports',
    description: 'Both show models prioritize local patterns over global coherence',
  },
  {
    source: '2510.07192',
    target: '2602.01017',
    type: 'supports',
    description: 'Both show autoregressive models learn unintended patterns',
  },
  {
    source: '2510.07192',
    target: '2309.12288',
    type: 'extends',
    description: 'Both show models learn specific associations not general rules',
  },
  // Paper 184: Brain Rot links
  {
    source: '2510.13928',
    target: '2602.01017',
    type: 'supports',
    description: 'Both show training data quality affects reasoning mode',
  },
  {
    source: '2510.13928',
    target: '2510.07192',
    type: 'supports',
    description: 'Both show data quality as causal driver of model behavior',
  },
  {
    source: '2510.13928',
    target: '2401.11817',
    type: 'supports',
    description: 'Both show fundamental limits of statistical learning',
  },
  {
    source: '2510.13928',
    target: '2305.18654',
    type: 'supports',
    description: 'Thought-skipping = pattern matching without reasoning chains',
  },
  {
    source: '2510.13928',
    target: '2412.21187',
    type: 'supports',
    description: 'Both show reasoning chain truncation as failure mode',
  },
  {
    source: '2510.13928',
    target: '2501.18585',
    type: 'supports',
    description: 'Both show reasoning chain quality affects performance',
  },
  {
    source: '2510.13928',
    target: '2509.11208',
    type: 'supports',
    description: 'Both show data-driven degradation mechanisms',
  },
  {
    source: '2510.13928',
    target: '2506.11135',
    type: 'supports',
    description: 'Both show capability is data-dependent, not emergent intelligence',
  },
  // Paper 185: Hallucination Inevitable (Open World) links
  {
    source: '2510.05116',
    target: '2401.11817',
    type: 'extends',
    description:
      'Both prove hallucination inevitable via different mechanisms (Open World vs computability)',
  },
  {
    source: '2510.05116',
    target: '2509.11208',
    type: 'supports',
    description: 'Both see hallucinations as predictable failures of statistical learning',
  },
  {
    source: '2510.05116',
    target: '2506.11135',
    type: 'supports',
    description: 'Both argue capabilities bounded by training distribution',
  },
  {
    source: '2510.05116',
    target: '2305.18654',
    type: 'supports',
    description: 'Generalization failure = pattern matching without genuine reasoning',
  },
  // Paper 186: LLM can Fool Itself links
  {
    source: '2310.13345',
    target: '2507.08794',
    type: 'supports',
    description: 'Both show single tokens/characters can fool LLMs',
  },
  {
    source: '2310.13345',
    target: '2410.05229',
    type: 'supports',
    description: 'Both show surface-level fragility in LLM reasoning',
  },
  {
    source: '2310.13345',
    target: '2305.04388',
    type: 'supports',
    description: 'Both show LLMs misled by surface patterns',
  },
  {
    source: '2310.13345',
    target: '2406.11050',
    type: 'supports',
    description: 'Token bias explains why simple perturbations work',
  },
  {
    source: '2310.13345',
    target: '2305.18654',
    type: 'supports',
    description: 'Surface perturbations override reasoning = pattern matching',
  },
  // Paper 187: TIP of the Iceberg links
  {
    source: '2501.18626',
    target: '2310.13345',
    type: 'supports',
    description: 'Both show surface-level fragility; TIP exploits pattern space separation',
  },
  {
    source: '2501.18626',
    target: '2304.11082',
    type: 'supports',
    description: 'TIP attacks empirically demonstrate BEB theory: any behavior triggerable',
  },
  {
    source: '2501.18626',
    target: '2403.04121',
    type: 'supports',
    description: 'TIP confirms Kambhampati: safety = pattern matching on trigger words',
  },
  {
    source: '2501.18626',
    target: '2507.08794',
    type: 'supports',
    description: 'Both show encoding/tokens bypass safety mechanisms',
  },
  {
    source: '2501.18626',
    target: '2305.04388',
    type: 'supports',
    description: 'Both show surface features override semantic understanding',
  },
  // Paper 19: Comprehension Without Competence (2507.10624)
  {
    source: '2507.10624',
    target: '2305.18654',
    type: 'supports',
    description: 'Cites Faith and Fate linearized subgraph matching',
  },
  {
    source: '2507.10624',
    target: '2410.05229',
    type: 'supports',
    description: 'Cites GSM-Symbolic 65% degradation',
  },
  {
    source: '2507.10624',
    target: '2506.06941',
    type: 'supports',
    description: 'Same complexity collapse pattern',
  },
  {
    source: '2507.10624',
    target: '2506.18880',
    type: 'supports',
    description: '0% transformative generalization confirms split-brain',
  },
  // Paper 13: Strategic Reasoning (2412.13013)
  {
    source: '2412.13013',
    target: '2506.06941',
    type: 'supports',
    description: 'Both show reasoning collapse at complexity thresholds',
  },
  {
    source: '2412.13013',
    target: '2501.12948',
    type: 'supports',
    description: 'Both examine reasoning model capabilities',
  },
  // Paper 63: Revisiting Test-Time Scaling (2502.12215)
  {
    source: '2502.12215',
    target: '2506.06941',
    type: 'supports',
    description: 'Both challenge test-time compute scaling benefits',
  },
  {
    source: '2502.12215',
    target: '2507.14417',
    type: 'supports',
    description: 'Both show inverse/diminishing returns in test-time compute',
  },
  // Paper 30: CoT Faithfulness Unlearning (2502.14829)
  {
    source: '2502.14829',
    target: '2307.13702',
    type: 'extends',
    description: 'Extends faithfulness measurement with unlearning approach',
  },
  {
    source: '2502.14829',
    target: '2505.05410',
    type: 'supports',
    description: 'Both address CoT unfaithfulness problem',
  },
  // Paper 83: IB Reasoning (2507.18391)
  {
    source: '2507.18391',
    target: '2410.05229',
    type: 'supports',
    description: 'Information bottleneck explains GSM-Symbolic fragility',
  },
  {
    source: '2507.18391',
    target: '2305.18654',
    type: 'supports',
    description: 'IB theory supports pattern matching hypothesis',
  },
  // Paper 22: Diminishing Returns (2509.09677)
  {
    source: '2509.09677',
    target: '2507.14417',
    type: 'supports',
    description: 'Both show diminishing/inverse returns in scaling',
  },
  {
    source: '2509.09677',
    target: '2506.06941',
    type: 'supports',
    description: 'Both challenge scaling assumptions for reasoning',
  },
  // Paper 95: LLM-JEPA (2509.14252)
  {
    source: '2509.14252',
    target: '2305.18654',
    type: 'supports',
    description: 'Alternative architecture addresses pattern matching limits',
  },
  // Paper 82: Interactive Learning (2509.26306)
  {
    source: '2509.26306',
    target: '2501.19393',
    type: 'extends',
    description: 'Both explore surfacing latent reasoning capabilities',
  },
  {
    source: '2509.26306',
    target: '2512.07783',
    type: 'supports',
    description: 'Both show learning depends on pretraining foundation',
  },
  // Paper 25: Superior Judge (2601.03630)
  {
    source: '2601.03630',
    target: '2507.08794',
    type: 'rebuts',
    description: 'Claims reasoning models are better judges vs token bias finding',
  },
  {
    source: '2601.03630',
    target: '2501.12948',
    type: 'supports',
    description: 'Both examine reasoning model capabilities',
  },
  // Paper 90: Chains to DAGs (2601.17593)
  {
    source: '2601.17593',
    target: '2307.13702',
    type: 'extends',
    description: 'Extends CoT analysis to graph structure',
  },
  {
    source: '2601.17593',
    target: '2508.01191',
    type: 'supports',
    description: 'Both analyze CoT reasoning structure',
  },
  // Paper 94: SOAR (2601.18778)
  {
    source: '2601.18778',
    target: '2501.19393',
    type: 'extends',
    description: 'Both explore self-teaching for reasoning',
  },
  {
    source: '2601.18778',
    target: '2502.04667',
    type: 'supports',
    description: 'Both study explicit CoT training effects',
  },
  // Paper 188: Mind Your Tone (Politeness) (2402.14531)
  {
    source: '2402.14531',
    target: '2410.05229',
    type: 'supports',
    description: 'Both show irrelevant features affect reasoning performance',
  },
  {
    source: '2402.14531',
    target: '2308.03958',
    type: 'supports',
    description: 'Politeness sensitivity relates to sycophancy pattern matching',
  },
  {
    source: '2402.14531',
    target: '2501.18626',
    type: 'supports',
    description: 'Both show sensitivity to prompt surface features',
  },
  {
    source: '2402.14531',
    target: '2302.00093',
    type: 'supports',
    description: 'Both show irrelevant context affects performance',
  },
  // Paper 189: Confidence Paradox (2506.23464)
  {
    source: '2506.23464',
    target: '2401.11817',
    type: 'supports',
    description: 'Both show models produce confidently wrong answers',
  },
  {
    source: '2506.23464',
    target: '2601.05905',
    type: 'supports',
    description: 'Both study confidence-accuracy misalignment',
  },
  {
    source: '2506.23464',
    target: '2509.11208',
    type: 'supports',
    description: 'Both address hallucination/overconfidence problems',
  },
  // Paper 190: Mind Your Tone - Rude=Better (2510.04950)
  // CRITICAL: This paper REBUTS Paper 188 with OPPOSITE findings
  {
    source: '2510.04950',
    target: '2402.14531',
    type: 'rebuts',
    description: 'OPPOSITE FINDING: Rude=better (GPT-4o) vs Rude=worse (Llama2/GPT-3.5)',
  },
  {
    source: '2510.04950',
    target: '2410.05229',
    type: 'supports',
    description: 'Both show irrelevant features affect reasoning performance',
  },
  {
    source: '2510.04950',
    target: '2302.00093',
    type: 'supports',
    description: 'Both show sensitivity to prompt surface features',
  },
  // Paper 191: LLM Reasoning Failures Survey (2602.06176) - CORNERSTONE HUB NODE
  // This survey synthesizes 170+ papers - connects to 14 we've already analyzed
  {
    source: '2602.06176',
    target: '2410.05229',
    type: 'extends',
    description: 'Survey cites GSM-Symbolic as key evidence for mathematical fragility',
  },
  {
    source: '2602.06176',
    target: '2305.18654',
    type: 'extends',
    description: 'Survey cites Faith & Fate as foundational compositional reasoning evidence',
  },
  {
    source: '2602.06176',
    target: '2309.12288',
    type: 'extends',
    description: 'Survey cites Reversal Curse as key logic failure evidence',
  },
  {
    source: '2602.06176',
    target: '2406.11050',
    type: 'extends',
    description: 'Survey cites Token Bias paper on genuine reasoning failures',
  },
  {
    source: '2602.06176',
    target: '2307.02477',
    type: 'extends',
    description: 'Survey cites Reasoning or Reciting as counterfactual evidence',
  },
  {
    source: '2602.06176',
    target: '2506.06941',
    type: 'extends',
    description: 'Survey cites Illusion of Thinking on complexity collapse',
  },
  {
    source: '2602.06176',
    target: '2506.09250',
    type: 'extends',
    description: 'Survey includes rebuttal to Illusion of Thinking',
  },
  {
    source: '2602.06176',
    target: '2506.18880',
    type: 'extends',
    description: 'Survey cites OMEGA on out-of-distribution math failures',
  },
  {
    source: '2602.06176',
    target: '2507.07313',
    type: 'extends',
    description: 'Survey cites Frontier LLMs Still Struggle on simple task failures',
  },
  {
    source: '2602.06176',
    target: '2406.02061',
    type: 'extends',
    description: 'Survey cites Alice in Wonderland on complete reasoning breakdown',
  },
  {
    source: '2602.06176',
    target: '2410.21272',
    type: 'extends',
    description: 'Survey cites Arithmetic Without Algorithms on heuristic arithmetic',
  },
  {
    source: '2602.06176',
    target: '2409.15454',
    type: 'extends',
    description: 'Survey cites A-Not-B Errors on cognitive failures',
  },
  {
    source: '2602.06176',
    target: '2302.00093',
    type: 'extends',
    description: 'Survey cites Distracted by Irrelevant Context on robustness',
  },
  {
    source: '2602.06176',
    target: '2408.00137',
    type: 'extends',
    description: 'Survey cites negative bias correction work',
  },
  // Token Assorted (Paper 193)
  {
    source: '2502.03275',
    target: '2404.15758',
    type: 'supports',
    description: 'Both show compressed/filler tokens work as well as full CoT',
  },
  {
    source: '2502.03275',
    target: '2505.16782',
    type: 'supports',
    description: 'Confirms expressive redundancy in CoT tokens',
  },
  {
    source: '2502.03275',
    target: '2412.21187',
    type: 'supports',
    description: 'Both show explicit CoT often redundant; shorter can be better',
  },
  {
    source: '2502.03275',
    target: '2307.13702',
    type: 'supports',
    description: 'Latent tokens replacing steps supports unfaithfulness findings',
  },
  // CoT Monitorability (Paper 194)
  {
    source: '2507.05246',
    target: '2307.13702',
    type: 'extends',
    description: 'Reframes unfaithfulness as feature of easy tasks; hard tasks force transparency',
  },
  {
    source: '2507.05246',
    target: '2505.05410',
    type: 'extends',
    description: 'Hard tasks require externalized reasoning, improving monitorability',
  },
  {
    source: '2507.05246',
    target: '2506.06941',
    type: 'supports',
    description: 'Both identify complexity thresholds where behavior changes',
  },
  // Pause Tokens Training (Paper 195)
  {
    source: '2310.02226',
    target: '2404.15758',
    type: 'supports',
    description: 'Both show meaningless tokens improve performance via computation',
  },
  {
    source: '2310.02226',
    target: '2505.21024',
    type: 'supports',
    description: 'Empirical basis for formal expressivity proof',
  },
  {
    source: '2310.02226',
    target: '2502.03275',
    type: 'supports',
    description: 'Both show intermediate tokens serve computation not semantics',
  },
  // Seq-VCR Dummy Pause (Paper 196)
  {
    source: '2411.02344',
    target: '2404.15758',
    type: 'supports',
    description:
      'Both show meaningless tokens replace CoT; Seq-VCR explains via representation collapse',
  },
  {
    source: '2411.02344',
    target: '2310.02226',
    type: 'extends',
    description: 'Adds Seq-VCR regularization to pause tokens for dramatically better results',
  },
  {
    source: '2411.02344',
    target: '2505.21024',
    type: 'supports',
    description: 'Provides empirical evidence for theoretical expressivity claims',
  },
  {
    source: '2411.02344',
    target: '2502.03275',
    type: 'supports',
    description: 'Both show semantic content redundant; Seq-VCR provides mechanism',
  },
  // Expanding Computation Spaces (Paper 197)
  {
    source: '2509.24884',
    target: '2404.15758',
    type: 'supports',
    description: 'Both show filler tokens provide computational benefit independent of content',
  },
  {
    source: '2509.24884',
    target: '2310.02226',
    type: 'extends',
    description: 'Shows inference-time benefits WITHOUT training (but smaller gains)',
  },
  {
    source: '2509.24884',
    target: '2411.02344',
    type: 'supports',
    description: 'Complementary: Seq-VCR needs training; this works at inference only',
  },
  // Learning to Insert PAUSE (Paper 198)
  {
    source: '2506.03616',
    target: '2310.02226',
    type: 'extends',
    description: 'Shows fine-tuning only can work (no pretraining needed)',
  },
  {
    source: '2506.03616',
    target: '2411.02344',
    type: 'supports',
    description: 'Both show fine-tuning with pause tokens improves reasoning',
  },
  {
    source: '2506.03616',
    target: '2404.15758',
    type: 'supports',
    description: 'Both show meaningless tokens provide computational benefit',
  },
  // Bottlenecked Transformers (Paper 199)
  {
    source: '2505.16950',
    target: '2411.02344',
    type: 'supports',
    description: 'Both identify representation dynamics as key; training-based > inference-only',
  },
  {
    source: '2505.16950',
    target: '2310.02226',
    type: 'supports',
    description: 'Confirms pause tokens alone without pretraining dont reliably help',
  },
  {
    source: '2505.16950',
    target: '2404.15758',
    type: 'supports',
    description: 'Both support computational workspace hypothesis',
  },
  // HARP (Paper 200)
  {
    source: '2412.07282',
    target: '2310.02226',
    type: 'supports',
    description: 'Both show additional computation helps; HARP shows training not always required',
  },
  {
    source: '2412.07282',
    target: '2411.02344',
    type: 'supports',
    description: 'Both show computational mechanisms underlie reasoning improvements',
  },
  {
    source: '2412.07282',
    target: '2509.24884',
    type: 'supports',
    description: 'Both work at inference-only; HARP is selective, Expanding Computation is uniform',
  },
  {
    source: '2412.07282',
    target: '2404.15758',
    type: 'supports',
    description: 'Both show filler/dummy computation improves performance',
  },
  {
    source: '2412.07282',
    target: '2506.03616',
    type: 'extends',
    description: 'DIT identifies hard positions via confidence; HARP uses entropy at inference',
  },
  // Causal Lens Faithfulness (Paper 201)
  {
    source: '2502.18848',
    target: '2307.13702',
    type: 'extends',
    description: 'Extends Lanham et al. corruption methods; Filler Tokens best metric',
  },
  {
    source: '2502.18848',
    target: '2411.02344',
    type: 'supports',
    description: 'Both show filler/dummy tokens reveal true computation vs decoration',
  },
  {
    source: '2502.18848',
    target: '2404.15758',
    type: 'supports',
    description: 'Filler tokens metric confirms hidden computation hypothesis',
  },
  {
    source: '2502.18848',
    target: '2505.05410',
    type: 'extends',
    description: 'Provides causal framework for testing unfaithfulness',
  },
  // Embers of Autoregression (Paper 202) - FOUNDATIONAL
  {
    source: '2309.13638',
    target: '2305.18654',
    type: 'supports',
    description: 'Both show pattern matching over reasoning; probability sensitivity proves it',
  },
  {
    source: '2309.13638',
    target: '2410.05229',
    type: 'supports',
    description: 'Both show surface changes break models; training frequency explains why',
  },
  {
    source: '2309.13638',
    target: '2309.12288',
    type: 'supports',
    description: 'Reversal curse explained by probability asymmetry',
  },
  {
    source: '2309.13638',
    target: '2202.07206',
    type: 'extends',
    description: 'Both show training frequency predicts performance',
  },
  {
    source: '2309.13638',
    target: '2406.11050',
    type: 'supports',
    description: 'Token statistics drive decisions, not reasoning',
  },
  {
    source: '2309.13638',
    target: '2601.21618',
    type: 'supports',
    description: 'Both show counting varies by semantic class due to probability',
  },
  {
    source: '2309.13638',
    target: '2410.21272',
    type: 'supports',
    description: 'Bag of heuristics explained by probability-driven pattern matching',
  },
  {
    source: '2309.13638',
    target: '2403.04121',
    type: 'supports',
    description: 'Teleological approach aligns with Kambhampati "approximate retrieval" view',
  },
  // o1 Embers Analysis (Paper 203) - Follow-up to 202
  {
    source: '2410.01792',
    target: '2309.13638',
    type: 'extends',
    description: 'Same authors test o1 — embers persist even with reasoning optimization',
  },
  {
    source: '2410.01792',
    target: '2305.18654',
    type: 'supports',
    description: 'o1 still shows probability sensitivity at distribution boundaries',
  },
  {
    source: '2410.01792',
    target: '2410.05229',
    type: 'supports',
    description: 'Both show surface patterns affect performance even in advanced models',
  },
  {
    source: '2410.01792',
    target: '2506.06941',
    type: 'supports',
    description: 'Both show reasoning models have fundamental limits',
  },
  {
    source: '2410.01792',
    target: '2501.12948',
    type: 'supports',
    description: 'Both test reasoning-optimized models; both find probability sensitivity',
  },
  {
    source: '2410.01792',
    target: '2403.04121',
    type: 'supports',
    description: 'Confirms Kambhampati: even o1 cant escape approximate retrieval',
  },
  // Paper 204: Space and Time
  {
    source: '2310.02207',
    target: '2309.13638',
    type: 'related',
    description: 'Both study internal representations; Embers shows frequency drives encoding',
  },
  {
    source: '2310.02207',
    target: '2305.18654',
    type: 'related',
    description: 'Both use probing; Faith & Fate shows probing can miss generalization failures',
  },
  {
    source: '2310.02207',
    target: '2403.04121',
    type: 'challenges',
    description: 'Claims world model ingredients; Kambhampati argues encoding isnt reasoning',
  },
  // Paper 205: Geometry of Truth
  {
    source: '2310.06824',
    target: '2310.02207',
    type: 'related',
    description: 'Same authors (Tegmark), same methodology (linear probing), same limitations',
  },
  {
    source: '2310.06824',
    target: '2309.13638',
    type: 'related',
    description:
      'Embers shows frequency drives behavior; truth direction may be familiarity direction',
  },
  {
    source: '2310.06824',
    target: '2403.04121',
    type: 'challenges',
    description: 'Claims truth representation; Kambhampati argues pattern matching suffices',
  },
  // Paper 207: Tree of Thoughts
  {
    source: '2305.10601',
    target: '2305.18654',
    type: 'supports',
    description:
      'ToT compensates for compositional failures via search; 60% first-step failure shows pattern matching limits',
  },
  {
    source: '2305.10601',
    target: '2506.06941',
    type: 'supports',
    description: 'Both show complexity thresholds; ToT addresses via more search',
  },
  {
    source: '2305.10601',
    target: '2512.07783',
    type: 'supports',
    description:
      'ToT surfaces latent capabilities via exploration; Interplay shows RL does similar',
  },
  {
    source: '2305.10601',
    target: '2403.04121',
    type: 'supports',
    description:
      'Authors call LM "System 1"; Kambhampati also argues LMs are pattern matchers needing external scaffolding',
  },
  // Paper 208: Graph of Thoughts
  {
    source: '2308.09687',
    target: '2305.10601',
    type: 'extends',
    description: 'GoT extends ToT with aggregation operation; both add external scaffolding',
  },
  {
    source: '2308.09687',
    target: '2201.11903',
    type: 'extends',
    description: 'GoT subsumes CoT as special case; graph generalizes chain',
  },
  {
    source: '2308.09687',
    target: '2203.11171',
    type: 'extends',
    description: 'GoT subsumes Self-Consistency; aggregation generalizes voting',
  },
  {
    source: '2308.09687',
    target: '2305.18654',
    type: 'supports',
    description:
      'Both show decomposition helps but doesnt create reasoning; LLMs handle sub-problems within distribution',
  },
  {
    source: '2308.09687',
    target: '2512.07783',
    type: 'supports',
    description:
      'Both show external scaffolding surfaces existing capability; doesnt create new reasoning',
  },
  {
    source: '2308.09687',
    target: '2506.06941',
    type: 'supports',
    description:
      'Both show complexity thresholds; GoT addresses by chunking, not by LLM reasoning better',
  },
  {
    source: '2308.09687',
    target: '2410.05229',
    type: 'supports',
    description: 'Both show LLMs fail on variations; GoT works by reducing to known patterns',
  },
  {
    source: '2308.09687',
    target: '2403.04121',
    type: 'supports',
    description: 'Similar philosophy: LLM for heuristics, external systems for correctness',
  },
  // Paper 209: Revisiting Superficial Alignment Hypothesis - CHALLENGES thesis
  {
    source: '2410.03717',
    target: '2512.07783',
    type: 'challenges',
    description:
      'Challenges surfacing-only view: post-training teaches reasoning beyond style, not just surfaces',
  },
  {
    source: '2410.03717',
    target: '2305.18654',
    type: 'challenges',
    description:
      'Shows in-distribution capability improves with training; reasoning separable from style',
  },
  {
    source: '2410.03717',
    target: '2410.05229',
    type: 'related',
    description: 'Complementary: this paper tests in-distribution; GSM-Symbolic tests OOD',
  },
  {
    source: '2410.03717',
    target: '2510.07364',
    type: 'supports',
    description: 'Both show post-training surfaces/improves capabilities',
  },
  {
    source: '2410.03717',
    target: '2502.03373',
    type: 'supports',
    description: 'Both show training exposes capabilities; this paper adds reasoning improves too',
  },
  // Paper 210: LLM Probability Concentration - KILLER EVIDENCE
  {
    source: '2506.17871',
    target: '2512.07783',
    type: 'supports',
    description:
      'Both prove surfacing hypothesis: alignment selects pre-existing low-entropy paths',
  },
  {
    source: '2506.17871',
    target: '2502.03373',
    type: 'supports',
    description: 'Both show capabilities pre-exist; BF proves alignment is path selection',
  },
  {
    source: '2506.17871',
    target: '2309.13638',
    type: 'supports',
    description: 'BF explains probability sensitivity — aligned models locked into narrow paths',
  },
  {
    source: '2506.17871',
    target: '2510.07364',
    type: 'supports',
    description: 'Nudging proves base models have latent low-BF paths; alignment surfaces them',
  },
  {
    source: '2506.17871',
    target: '2305.18654',
    type: 'supports',
    description: 'BF explains compositional failures — narrow paths dont cover OOD compositions',
  },
  {
    source: '2506.17871',
    target: '2410.03717',
    type: 'extends',
    description: 'Provides quantitative mechanism (BF) for why style saturates quickly',
  },
  {
    source: '2506.17871',
    target: '2506.06941',
    type: 'supports',
    description: 'Low BF may explain complexity collapse — narrow paths fail on novel problems',
  },
  // LIMA (SAH foundational paper) relationships
  {
    source: '2410.03717',
    target: '2305.11206',
    type: 'rebuts',
    description:
      'Directly challenges LIMA: reasoning improves beyond style saturation, power law scaling',
  },
  {
    source: '2506.17871',
    target: '2305.11206',
    type: 'supports',
    description:
      'Provides mechanistic support: BF reduction shows alignment selects subdistribution as LIMA claimed',
  },
  {
    source: '2305.11206',
    target: '2512.07783',
    type: 'supports',
    description:
      'LIMA consistent with Interplay: capabilities exist in pretraining, alignment surfaces them',
  },
  {
    source: '2305.11206',
    target: '2502.03373',
    type: 'supports',
    description: 'LIMA consistent with Demystifying: capabilities pre-exist, tuning exposes them',
  },
  // Superficial Safety Alignment Hypothesis (#212) relationships
  {
    source: '2410.10862',
    target: '2305.11206',
    type: 'extends',
    description: 'SSAH extends LIMA SAH to safety domain: binary classification (fulfill/refuse)',
  },
  {
    source: '2410.10862',
    target: '2506.17871',
    type: 'supports',
    description: 'Both show alignment is localized: SSAH=1.3% units, BF=path selection',
  },
  // Extracting Superficial Knowledge (#213) relationships
  {
    source: '2502.04602',
    target: '2305.11206',
    type: 'supports',
    description: 'Operationalizes LIMA SAH: linear head captures 100% of safety alignment',
  },
  {
    source: '2502.04602',
    target: '2506.17871',
    type: 'supports',
    description: 'Both show alignment is surface-level: linear projection vs BF path selection',
  },
  {
    source: '2502.04602',
    target: '2410.03717',
    type: 'partially supports',
    description:
      'Confirms reasoning gap (53-62% captured) — agrees alignment not ENTIRELY superficial',
  },
  {
    source: '2502.04602',
    target: '2410.10862',
    type: 'supports',
    description: 'Both show safety alignment is superficial and localized',
  },
  // Safety Not Superficial (#214) relationships
  {
    source: '2505.17072',
    target: '2305.11206',
    type: 'challenges',
    description: 'Challenges SAH: explicit signals make alignment NOT superficial (uses LIMA data)',
  },
  {
    source: '2505.17072',
    target: '2410.10862',
    type: 'extends',
    description:
      'Same authors (Li & Kim): implements SSAH theoretical framework with explicit [CLS] tokens',
  },
  {
    source: '2505.17072',
    target: '2410.03717',
    type: 'supports',
    description: 'Both challenge SAH: alignment CAN teach more than style with right approach',
  },
  {
    source: '2505.17072',
    target: '2502.04602',
    type: 'challenges',
    description:
      '#213 shows safety is 100% superficial (linear head); #214 method requires explicit classification, not linear',
  },
  // Cross-references between #212 and #213
  {
    source: '2410.10862',
    target: '2502.04602',
    type: 'supports',
    description:
      'Both show safety is localized/superficial: SCU neurons (#212) vs linear head (#213)',
  },
  // Prompt Repetition (#215) relationships
  {
    source: '2512.14982',
    target: '2412.21187',
    type: 'supports',
    description:
      'Authors note o1 learns to repeat prompts via RL; this paper explains why it works',
  },
  {
    source: '2512.14982',
    target: '2404.15758',
    type: 'supports',
    description: 'Both show extra computation (via different mechanisms) improves performance',
  },
  {
    source: '2512.14982',
    target: '2310.02226',
    type: 'supports',
    description: 'Both show additional processing before output improves accuracy',
  },
];
