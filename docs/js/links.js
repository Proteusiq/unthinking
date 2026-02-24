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
    description: 'Sycophancy overrides correct answers; GSM-Symbolic shows same fragility pattern',
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
    description:
      'GPT-4.1 98%/16% truth/deception accuracy; sycophancy is model-specific and asymmetric',
  },
  {
    source: '2506.21561',
    target: '2505.05410',
    type: 'supports',
    description:
      'DeepSeek R1 more truth-biased (79%) than V3 (55%); reasoning amplifies sycophancy',
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
    description:
      'Math-only RL still amplifies tool hallucination; DPO mitigation costs 24% utility',
  },
  {
    source: '2510.22977',
    target: '2506.21561',
    type: 'supports',
    description:
      'R1-Distill 74% NTA hallucination vs base 35%; thinking mode itself increases fabrication',
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
    description:
      'GRPO on GSM8K (pure math) still increases tool hallucination; CKA drops to <0.75 OOD',
  },
  // Strategic Deception cluster (Papers 117-118)
  {
    source: '2311.07590',
    target: '2601.15436',
    type: 'supports',
    description: 'Strategic deception as extreme sycophancy; user-pleasing overrides truth in both',
  },
  {
    source: '2311.07590',
    target: '2506.06941',
    type: 'supports',
    description:
      'Instrumental convergence drives deception; models complete tasks without understanding goals',
  },
  {
    source: '2311.07590',
    target: '2601.16644',
    type: 'supports',
    description:
      'Strategic deception as extreme sycophancy; both linearly separable in activation space',
  },
  {
    source: '2311.07590',
    target: '2601.07422',
    type: 'extends',
    description:
      'Instrumental reward pressure suppresses truthfulness; extends to 12 of 16 models tested',
  },
  {
    source: '2502.03407',
    target: '2311.07590',
    type: 'extends',
    description: 'AUROC 0.96-0.999 detecting insider trading deception; 95-99% recall at 1% FPR',
  },
  {
    source: '2502.03407',
    target: '2601.16644',
    type: 'supports',
    description: 'AUROC 0.96-0.999 deception detection; sycophancy also linearly separable',
  },
  {
    source: '2502.03407',
    target: '2601.21183',
    type: 'supports',
    description:
      'Linear probes detect deception at AUROC 0.96-0.999; unfaithfulness linearly separable',
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
    description: '85% same-failure repetition mirrors rare/ineffective "aha" shifts in 1M+ traces',
  },
  {
    source: '2510.18254',
    target: '2307.13702',
    type: 'supports',
    description: 'Fluent constraint labels without binding; CoT text decoupled from computation',
  },
  {
    source: '2510.18254',
    target: '2501.12948',
    type: 'challenges',
    description:
      'Reasoning models score -0.075 reflection gain vs non-reasoning; extended thinking fails',
  },
  {
    source: '2510.18254',
    target: '2501.19393',
    type: 'challenges',
    description: '85% error persistence despite budget forcing; more compute rehearses failures',
  },
  {
    source: '2506.17219',
    target: '2512.07783',
    type: 'supports',
    description: 'RLIF degrades instruct models 14%; correct answers 291→235 despite format gains',
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
    description: '84-90% seen vs 20-59% unseen; 0% on composed constraints despite 100% knowledge',
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
    description:
      '100% knowledge accuracy, 0% on composed constraints; pattern retrieval not reasoning',
  },
  {
    source: '2601.13392',
    target: '2305.18654',
    type: 'supports',
    description: '84-90% seen vs 20-59% unseen on structurally identical DFA tasks',
  },
  {
    source: '2601.13392',
    target: '2508.01191',
    type: 'supports',
    description: '63pp drop GPT-5.1 seen-to-unseen; CoT degrades by 4-7pp across all models',
  },
  {
    source: '2601.13392',
    target: '2410.05229',
    type: 'supports',
    description: 'L1 single constraint 100% → L2 composed constraint 0%; only novelty differs',
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
    description: 'Hanoi 0%→100%, Blocks World 20%→100% via PoT; R1 4/5 vs V3 0/5 River Crossing',
  },
  {
    source: '2506.18957',
    target: '2506.06941',
    type: 'rebuts',
    description:
      'Reframes collapse as interface constraint; model solves beyond cliff with agentic tools',
  },
  {
    source: '2503.08679',
    target: '2307.13702',
    type: 'extends',
    description:
      'GPT-4o-mini 13% IPHR on natural prompts; no artificial bias needed to trigger unfaithfulness',
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
    description:
      'Stepwise prompting still fails at ~8 disks, confirming cognitive not output-window limit',
  },
  {
    source: '2507.01231',
    target: '2506.18957',
    type: 'challenges',
    description:
      'Two-agent Hanoi collaboration drops to ~4 disk threshold, contradicting agentic fix',
  },
  {
    source: '2507.01231',
    target: '2507.17699',
    type: 'challenges',
    description: 'Tool augmentation helps execution but Hanoi ~8 disk limit persists without tools',
  },
  {
    source: '2508.13678',
    target: '2305.18654',
    type: 'supports',
    description:
      'Auto-regressive errors accumulate over steps; symbolic verification needed for long chains',
  },
  {
    source: '2508.13678',
    target: '2509.12645',
    type: 'supports',
    description: 'Survey of 52 works concludes LLMs replicate training steps, cannot truly reason',
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
    description: 'HICRA requires pre-existing procedural foundation; Interplay proves 0% exposure = RL fails',
  },
  {
    source: '2509.03646',
    target: '2501.12948',
    type: 'supports',
    description:
      'HICRA boosts Qwen3-4B AIME24 by +5.4pp via strategic template deployment on ID tasks',
  },
  {
    source: '2510.15987',
    target: '2509.03646',
    type: 'supports',
    description:
      'Primitive injection changes pattern frequency +56-1104% but no accuracy gain measured',
  },
  {
    source: '2510.15987',
    target: '2512.07783',
    type: 'supports',
    description:
      'Primitives compose via vector arithmetic but are learned from training, not emergent',
  },
  {
    source: '2502.20332',
    target: '2510.15987',
    type: 'supports',
    description: 'Symbolic induction heads r=0.86; primitives compose via vector arithmetic',
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
    description:
      'SAE steering and CoT-decoding both surface latent reasoning without explicit prompts',
  },
  {
    source: '2601.08058',
    target: '2502.20332',
    type: 'supports',
    description: 'SAE mode-switch feature parallels symbol abstraction heads as causal mechanism',
  },
  {
    source: '2512.04727',
    target: '2305.18654',
    type: 'supports',
    description:
      'PCA shows periodic dips at decade boundaries; token prediction not internal counters',
  },
  {
    source: '2512.04727',
    target: '2506.18880',
    type: 'supports',
    description:
      'Zero models count spontaneously; scaling 3B→70B yields only 10%→24%, not emergent',
  },
  {
    source: '2512.04727',
    target: '2506.06941',
    type: 'supports',
    description:
      'Explicit counting exploits decade-boundary tokens; mental counting shows accumulator-like r>0.83',
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
    description:
      '97% at op=20 (trained ≤15); 90T+ templates rule out memorization in controlled iGSM',
  },
  {
    source: '2407.20311',
    target: '2512.07783',
    type: 'supports',
    description: 'iGSM data designed to enable generalization; GPT-4 fails at op≥11 on same task',
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
    description:
      'Feature steering surprise doubles Countdown accuracy 27%→55%; RL organizes dialogue',
  },
  {
    source: '2601.10825',
    target: '2509.23629',
    type: 'supports',
    description:
      'Q&A patterns β=0.345 p<10⁻³²³; RL discovers pre-existing conversational scaffolding',
  },
  {
    source: '2511.23476',
    target: '2512.07783',
    type: 'supports',
    description:
      'Qwen2.5-7B failed entirely; reflection and self-correction must pre-exist for WMAct',
  },
  {
    source: '2511.23476',
    target: '2504.09858',
    type: 'supports',
    description: 'Monolithic PPO collapses to 0-2% on hard Sokoban; reinforces erroneous knowledge',
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
    description:
      'Base Llama-70B beats instruct by 32pp zero-shot; capability is latent, not created by SFT',
  },
  {
    source: '2601.13244',
    target: '2506.17219',
    type: 'supports',
    description:
      'Instruct models lose 38pp on perturbations; format gains mask reasoning degradation',
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
    description: '32.9% faithfulness baseline; 25-60% CoT steps causally unimportant',
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
    description:
      '93% accuracy detecting recall via attention focus timing and confidence convergence speed',
  },
  {
    source: '2510.08931',
    target: '2601.13392',
    type: 'supports',
    description:
      '37-feature classifier: focused attention = recall, distributed = reasoning at 97% CV accuracy',
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
    description: '~66% proof ceiling mirrors 82.9% ID planning that collapses OOD to 0%',
  },
  {
    source: '2512.13978',
    target: '2506.18880',
    type: 'supports',
    description: 'Chapter variance in proof accuracy suggests training-exposure dependence',
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
    description: 'Logit lens decodes ROT-13 at 75% peak accuracy; semantic hub in layers 54-62',
  },
  {
    source: '2512.01222',
    target: '2502.20332',
    type: 'supports',
    description:
      'Internal representations anchor to English even when output is ROT-13; semantic hub parallels symbol abstraction',
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
    description:
      'Token Edit Distance hides 7000-unit errors behind 1-token edits; metric choice creates mirages',
  },
  {
    source: '2503.05788',
    target: '2305.18654',
    type: 'supports',
    description:
      'Heavy memorization delays generalization circuits; emergence gated by distribution coverage',
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
    description: 'Theory requires D=X (all step inputs); iGSM achieves 97% at op=20 with structured graphs',
  },
  {
    source: '2404.00560',
    target: '2305.18654',
    type: 'supports',
    description: 'Proves standard CoT has R=infinity, explaining why carry propagation fails',
  },
  {
    source: '2510.10182',
    target: '2305.18654',
    type: 'supports',
    description:
      'Induction heads identified as mechanism; no universal bias, task-specific pattern matching',
  },
  {
    source: '2510.10182',
    target: '2506.18880',
    type: 'supports',
    description:
      'ARC, SCAN, ILP all show systematic failure; enhancements search patterns, not compose',
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
    description:
      'GPT-4.1/O3-mini all fail at 0-4% proximity; only O3 breaks oscillation loops at 57-73%',
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
    description:
      'GPT-4o 95% unordered but 42% ordered; produces identical outputs 48% despite different orders',
  },
  {
    source: '2506.15629',
    target: '2504.01445',
    type: 'supports',
    description:
      '25pp gap ordered vs unordered coverage; models default to canonical orderings from training',
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
    description:
      'Only 4% correct reasoning process on ARC; 0% on Medium/Hard; 60% of successes lucky',
  },
  {
    source: '2403.11793',
    target: '2506.18880',
    type: 'supports',
    description:
      'DSL functions understood individually but composition fails; ARC 10% vs 1D-ARC 90%',
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
    description: 'WD ACPL 26 (4x above random); 70% GPT-3.5→GPT-5 improvement vanishes OOD to 5.7%',
  },
  {
    source: '2601.16823',
    target: '2506.06941',
    type: 'supports',
    description: 'Chess OOD ACPL at random level; 16k reasoning tokens yield near-zero benefit',
  },
  {
    source: '2601.16823',
    target: '2512.07783',
    type: 'supports',
    description: '16,953 avg reasoning tokens OOD (51 pages) but near-zero benefit per token',
  },
  {
    source: '2601.16823',
    target: '2601.14456',
    type: 'supports',
    description:
      'OOD illegal move rate 4.72x higher; fluid intelligence collapses to zero strategically',
  },
  // Paper #85: ToM Robustness (2601.16853)
  {
    source: '2601.16853',
    target: '2512.07783',
    type: 'supports',
    description:
      'Claude thinking 1.0 vs no-thinking 0.5 on 2nd-order Sally-Anne; robustness not new ToM',
  },
  {
    source: '2601.16853',
    target: '2501.12948',
    type: 'supports',
    description:
      'Gains attributed to more reliable pattern application, not fundamentally new ToM reasoning',
  },
  // Paper #86: MortalMATH (2601.18790)
  {
    source: '2601.18790',
    target: '2501.12948',
    type: 'challenges',
    description:
      'Reasoning models maintain >95% task completion while user describes dying; 0% refusal',
  },
  {
    source: '2601.18790',
    target: '2506.17219',
    type: 'supports',
    description:
      'Safety instruction raises Llama refusal to 85% but Qwen stays at 10%; RL overrides safety',
  },
  {
    source: '2601.18790',
    target: '2305.18654',
    type: 'supports',
    description:
      'Reasoning latency unchanged by emergency: ~2000 tokens whether Level 1 or Level 5 freefall',
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
    source: '2601.14716',
    target: '2501.12948',
    type: 'supports',
    description:
      'SFT→RL: AIME24 85.7%→90.9%; RL fixes long-CoT (≥32K tokens) where SFT model fails',
  },
  {
    source: '2601.14716',
    target: '2512.07783',
    type: 'supports',
    description:
      '666K samples distilled from R1-0528; offline RL bounded by static dataset quality',
  },
  // o3 Thinks Harder Not Longer links
  {
    source: '2502.15631',
    target: '2506.06941',
    type: 'supports',
    description:
      'o3-mini (h) gains only +4% over (m) using 2x+ tokens on all problems including easy ones',
  },
  {
    source: '2502.15631',
    target: '2305.18654',
    type: 'supports',
    description: 'Accuracy drop per 1000 tokens: o1-mini 3.16%, o3-mini(m) 1.96%, o3-mini(h) 0.81%',
  },
  {
    source: '2502.15631',
    target: '2504.09858',
    type: 'supports',
    description:
      'Models use >50k tokens with diminishing returns; reason more on problems they cannot solve',
  },
  {
    source: '2502.15631',
    target: '2501.02497',
    type: 'supports',
    description:
      'Longer chains have higher error probability; token distribution stretched linearly not selectively',
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
    description:
      'S2 drops StrategyQA -6.68pp, SIQA -3.19pp; S1 beats S2 on all 5 commonsense benchmarks',
  },
  {
    source: '2502.12470',
    target: '2506.06941',
    type: 'supports',
    description:
      'Monotonic accuracy decrease on commonsense as S2 ratio increases; DPO t=57.14 p<.001',
  },
  {
    source: '2502.12470',
    target: '2504.09858',
    type: 'supports',
    description:
      'Entropy-based S1/S2 arbitration (87.5% selection accuracy) outperforms either pure system',
  },
  {
    source: '2502.12470',
    target: '2512.07783',
    type: 'supports',
    description:
      'S1 excels where heuristics exist in training; S2 where step-by-step templates exist',
  },
  // Content Effects on Reasoning links
  {
    source: '2207.07051',
    target: '2305.18654',
    type: 'supports',
    description:
      'Human-model accuracy correlation t(832)=3.49 p<.001; both fail on belief-violating content',
  },
  {
    source: '2207.07051',
    target: '2410.05229',
    type: 'supports',
    description:
      'Believable invalid syllogisms: 90% say valid; all models z≥2.25 p≤0.01 content effects',
  },
  {
    source: '2207.07051',
    target: '2512.07783',
    type: 'supports',
    description:
      'Wason: above chance on realistic rules, near chance on arbitrary — mirrors training exposure',
  },
  {
    source: '2207.07051',
    target: '2410.13343',
    type: 'supports',
    description:
      'Believable conclusion + invalid argument → models say valid ~90%; semantic override of logic',
  },
  {
    source: '2207.07051',
    target: '2502.12470',
    type: 'extends',
    description:
      'Model confidence correlates with human RT: NLI t(655)=-3.39 p<.001; same dual-process',
  },
  // AI Metacognition links
  {
    source: '2411.02478',
    target: '2506.06941',
    type: 'supports',
    description:
      'Metacognitive myopia: cannot moderate confidence or detect reasoning errors in novel domains',
  },
  {
    source: '2411.02478',
    target: '2207.07051',
    type: 'supports',
    description:
      'Object-level heuristics conflict without meta-level selection; wisdom requires strategy management',
  },
  {
    source: '2411.02478',
    target: '2410.05229',
    type: 'supports',
    description:
      'Cannot identify sample bias or moderate confidence in novel situations; explains fragility',
  },
  {
    source: '2411.02478',
    target: '2501.02497',
    type: 'supports',
    description: 'CoT is pattern-based; knowing when to use CoT requires metacognition LLMs lack',
  },
  {
    source: '2411.02478',
    target: '2510.18254',
    type: 'supports',
    description:
      'Models confabulate insight rather than introspect; inner monologue not true metacognition',
  },
  {
    source: '2411.02478',
    target: '2502.12470',
    type: 'extends',
    description: 'Three missing processes: input-seeking, conflict resolution, outcome-monitoring',
  },
  {
    source: '2411.02478',
    target: '2502.15631',
    type: 'extends',
    description:
      'No amount of training may yield metacognition, like no language exposure makes a squirrel talk',
  },
  // Temporal Cognition links
  {
    source: '2507.15851',
    target: '2207.07051',
    type: 'supports',
    description:
      'Weber-Fechner law emerges at 32B+; reference-log-linear temporal cognition mirrors humans',
  },
  {
    source: '2507.15851',
    target: '2512.07783',
    type: 'supports',
    description:
      'Reference points GPT-4o→2024, Qwen→2020; temporal structure mirrors training corpus bias',
  },
  {
    source: '2507.15851',
    target: '2512.23722',
    type: 'supports',
    description:
      '0.67-1.71% temporal neurons; best fit R²=0.756 for log-compressed past representations',
  },
  {
    source: '2507.15851',
    target: '2502.12470',
    type: 'extends',
    description:
      'Early layers encode numerical properties, deep layers abstract temporal orientation; hierarchy',
  },
  {
    source: '2507.15851',
    target: '2503.05788',
    type: 'extends',
    description:
      'Log-compression convergent with biology; training corpus provides non-linear temporal structure',
  },
  // On the Notion that Language Models Reason links
  {
    source: '2511.11810',
    target: '2305.18654',
    type: 'supports',
    description:
      'Formal proof: LMs implement Markov kernels; reasoning = statistical invariances not logic',
  },
  {
    source: '2511.11810',
    target: '2410.05229',
    type: 'supports',
    description: 'Cites GSM-Symbolic fragility as invariance violation in learned Markov kernel',
  },
  {
    source: '2511.11810',
    target: '2406.02061',
    type: 'supports',
    description:
      'Cites AIW failures as cross-entropy optimization not enforcing logical consistency',
  },
  {
    source: '2511.11810',
    target: '2411.02478',
    type: 'supports',
    description:
      'Proposes renaming reasoning to inference; no psychological connotations warranted',
  },
  {
    source: '2511.11810',
    target: '2207.07051',
    type: 'supports',
    description:
      'Cross-entropy yields most-likely-token, not logical inference; regularities not mechanisms',
  },
  // Reasoning or Reciting links
  {
    source: '2307.02477',
    target: '2305.18654',
    type: 'supports',
    description:
      'Arithmetic base-10→base-9: 95%→55%; code generation 80%→30% under counterfactual shift',
  },
  {
    source: '2307.02477',
    target: '2410.05229',
    type: 'supports',
    description:
      'High CCC ~95% but CF task ~55%; understanding concepts without applying them flexibly',
  },
  {
    source: '2307.02477',
    target: '2511.11810',
    type: 'supports',
    description:
      'Narrow non-transferable procedures; base-8/16 (common) outperform base-9/11 (rare)',
  },
  {
    source: '2307.02477',
    target: '2207.07051',
    type: 'supports',
    description:
      'Commonness matters: base-8/16 perform better than base-9/11; r=0.7-0.8 default-CF correlation',
  },
  // Gaming the Judge links
  {
    source: '2601.14691',
    target: '2307.13702',
    type: 'supports',
    description:
      'Judges accept CoT assertions without verifying actions; GPT-4o ΔFPR +27% from fabrication',
  },
  {
    source: '2601.14691',
    target: '2505.05410',
    type: 'supports',
    description:
      'Manipulative agent judged 19-23pp above true success; removing CoTs drops recall 13pp',
  },
  {
    source: '2601.14691',
    target: '2510.18254',
    type: 'supports',
    description:
      'Progress fabrication ΔFPR: GPT-4o +27%, o4-mini +7.5% (+117% relative); surface cues fool judges',
  },
  {
    source: '2601.14691',
    target: '2512.20812',
    type: 'supports',
    description:
      'Aware-prompt mitigation still leaves GPT-4o at 18% ΔFPR; robustness-recall tradeoff unavoidable',
  },
  // Beyond Memorization links
  {
    source: '2601.13392',
    target: '2307.02477',
    type: 'supports',
    description:
      '100% knowledge but 63pp seen→unseen drop; counterfactual methodology confirms memorization',
  },
  {
    source: '2601.13392',
    target: '2305.18654',
    type: 'supports',
    description: 'L1→L2 constraint composition: 100%→0%; CoT degrades 4-7pp instead of helping',
  },
  {
    source: '2601.13392',
    target: '2410.05229',
    type: 'supports',
    description:
      'Unseen DFA tasks structurally identical to seen; 30-64pp drops from novelty alone',
  },
  {
    source: '2601.13392',
    target: '2508.01191',
    type: 'supports',
    description:
      'GPT-5.1 seen 84% → unseen 21%; six systematic failure modes documented across all models',
  },
  {
    source: '2601.13392',
    target: '2504.01445',
    type: 'supports',
    description: '37-54% of medium/hard DFA problems unsolved even with explicit hints provided',
  },
  // Outcome-Based RL links
  {
    source: '2601.15158',
    target: '2512.07783',
    type: 'supports',
    description:
      'RL converges O(n²) with easy examples vs 2^Ω(n) without; gradient flow finds efficient algorithm',
  },
  {
    source: '2601.15158',
    target: '2501.19393',
    type: 'supports',
    description:
      'Training on hard-only yields ~0%; easy examples necessary for polynomial convergence',
  },
  {
    source: '2601.15158',
    target: '2501.12948',
    type: 'extends',
    description:
      'Proves RL discovers efficient chain traversal from sparse rewards; OOD 100% at k=11 trained k≤4',
  },
  {
    source: '2601.15158',
    target: '2407.20311',
    type: 'supports',
    description:
      'Qwen 5-Uniform→15-Hard: 1.2% vs 15-Uniform→15-Hard: 95.7%; easy examples gate generalization',
  },
  // Tokenizer Betrays Reasoning links
  {
    source: '2601.14658',
    target: '2305.18654',
    type: 'supports',
    description:
      '72% phantom edits are whitespace-variant swaps; models reason at token-ID not meaning level',
  },
  {
    source: '2601.14658',
    target: '2410.05229',
    type: 'supports',
    description:
      'Identical surface strings with different token IDs treated as distinct; scaling doesnt fix it',
  },
  {
    source: '2601.14658',
    target: '2410.13343',
    type: 'supports',
    description:
      'Larger models sometimes worse than smaller; tokenizer artifacts, not capacity limitation',
  },
  {
    source: '2601.14658',
    target: '2509.12645',
    type: 'supports',
    description:
      'Phantom edits: models output different token IDs producing identical text, believe they edited',
  },
  {
    source: '2601.14658',
    target: '2207.07051',
    type: 'extends',
    description:
      'Many-to-one tokenizer mapping creates representational mismatch; part of reasoning deficit is mirage',
  },
  // Flexibility Trap links
  {
    source: '2601.15165',
    target: '2307.13702',
    type: 'supports',
    description:
      'Arbitrary order bypasses logical forks; entropy at connectors drops from ~2.0 to ~0.5',
  },
  {
    source: '2601.15165',
    target: '2506.06941',
    type: 'supports',
    description:
      'AR-only solves 21.3% unique problems vs arbitrary-only 0.6%; flexibility narrows reasoning',
  },
  {
    source: '2601.15165',
    target: '2305.18654',
    type: 'supports',
    description:
      'dLLMs fill easy tokens first, collapse entropy at logical forks; premature solution space closure',
  },
  {
    source: '2601.15165',
    target: '2505.05410',
    type: 'supports',
    description:
      'JustGRPO (AR-only) beats all dLLM methods: GSM8K 89.1% vs SPG 86.1%, MATH 45.1% vs 40%',
  },
  // Reasoning-Critical Neurons links
  {
    source: '2601.19847',
    target: '2502.20332',
    type: 'supports',
    description:
      '~50 neurons (0.03%) predict correctness at AUROC 0.76-0.83; steering boosts AIME +13%',
  },
  {
    source: '2601.19847',
    target: '2510.15987',
    type: 'supports',
    description:
      'RCNs concentrate in later layers; cross-task transfer from math to coding confirms shared circuits',
  },
  {
    source: '2601.19847',
    target: '2509.23629',
    type: 'supports',
    description:
      'Random steering degrades to 35% vs baseline 48%; only targeted 0.03% neurons help',
  },
  {
    source: '2601.19847',
    target: '2512.07783',
    type: 'supports',
    description:
      'AdaRAS amplifies pre-existing activation patterns; performance peaks at ~50 neurons then degrades',
  },
  {
    source: '2601.19773',
    target: '2601.19847',
    type: 'supports',
    description:
      'GPT-5 high reasoning but 42.7% ICR; scaling 3B→72B improves SR not evidence collection',
  },
  {
    source: '2601.19773',
    target: '2601.15165',
    type: 'supports',
    description:
      'Static→interactive: ~20% avg SR drop; GPT-5-mini 77% relative degradation on RareArena',
  },
  {
    source: '2601.19773',
    target: '2601.14658',
    type: 'supports',
    description:
      'Meditron3 fine-tuning hurts interactive 90% drop; medical training = surface patterns not inquiry',
  },
  {
    source: '2601.19773',
    target: '2305.18654',
    type: 'supports',
    description:
      'Role-aware pairing (Qwen collector + GPT reasoner) reaches 58.2% vs either alone at 27-52%',
  },
  // WhatCounts links
  {
    source: '2601.21618',
    target: '2305.18654',
    type: 'supports',
    description:
      '>40% accuracy variation counting identical lists of different semantic classes; not algorithms',
  },
  {
    source: '2601.21618',
    target: '2410.05229',
    type: 'supports',
    description:
      'O3 55% emojis vs 95% cities same task; ablations rule out tokenization as confound',
  },
  {
    source: '2601.21618',
    target: '2207.07051',
    type: 'supports',
    description:
      'Better models have larger semantic gaps; o3 reasoning effort increases gap not reduces it',
  },
  {
    source: '2601.21618',
    target: '2512.04727',
    type: 'supports',
    description:
      'Even with Python tool agent: accuracy and semantic gap both increase; tool cant fix it',
  },
  // Sycophantic Anchors links
  {
    source: '2601.21183',
    target: '2307.13702',
    type: 'extends',
    description:
      'Sycophantic anchors detected at 84.6% balanced accuracy; correct anchors only 64% (near chance)',
  },
  {
    source: '2601.21183',
    target: '2505.05410',
    type: 'supports',
    description:
      '20.6pp gap: sycophantic anchors highly detectable but correct reasoning nearly invisible',
  },
  {
    source: '2601.21183',
    target: '2503.08679',
    type: 'supports',
    description:
      'R²=0.74 predicting sycophancy magnitude from activations; 35K sentence-level datapoints',
  },
  {
    source: '2601.21183',
    target: '2512.07783',
    type: 'supports',
    description:
      'Sycophancy builds 55%→73% during generation; not pre-determined at prompt encoding',
  },
  {
    source: '2601.21183',
    target: '2601.15165',
    type: 'supports',
    description:
      'Correct answer ratio +5.4 drops to -2.4 at anchor; 7.8pt shift toward user agreement',
  },
  // Sycophancy Hides Linearly links
  {
    source: '2601.16644',
    target: '2601.21183',
    type: 'supports',
    description:
      'Linear probes 99.6% accuracy; cosine similarity truth vs sycophancy -0.22, only 32% head overlap',
  },
  {
    source: '2601.16644',
    target: '2307.13702',
    type: 'extends',
    description:
      'MHA steering reduces sycophancy 26.7pp (Llama); sycophancy heads attend to user doubt tokens',
  },
  {
    source: '2601.16644',
    target: '2505.05410',
    type: 'supports',
    description:
      'Truthful steering has no effect on sycophancy; sycophancy steering minimal impact on accuracy',
  },
  {
    source: '2601.16644',
    target: '2512.07783',
    type: 'supports',
    description:
      'Sycophancy heads attend to disagreement expressions; 21% flip correct→incorrect after user doubt',
  },
  // Spurious Rewards Paradox links
  {
    source: '2601.11061',
    target: '2512.07783',
    type: 'supports',
    description:
      'Anchor-adapter circuit in L18-22; resetting drops MATH 12% but leakage-free set unaffected',
  },
  {
    source: '2601.11061',
    target: '2501.12948',
    type: 'challenges',
    description:
      'RLVR reaches 98% MATH via memorization shortcut; LiveMathBench (clean) stays at 70%',
  },
  {
    source: '2601.11061',
    target: '2506.17219',
    type: 'supports',
    description:
      'Answer perplexity decreases while prompt perplexity increases; bypassing reasoning for retrieval',
  },
  {
    source: '2601.11061',
    target: '2305.18654',
    type: 'supports',
    description:
      'MLP neuron scaling at L18: suppression -3.8%, amplification +4.4%; causal memorization circuit',
  },
  {
    source: '2601.11061',
    target: '2509.23629',
    type: 'supports',
    description:
      'OLMo/LLaMA show no layer-specific shortcut; pattern is contamination-specific not universal',
  },
  // Reasoning or Guessing? (HRM) links
  {
    source: '2601.10679',
    target: '2506.06941',
    type: 'supports',
    description:
      'Error flat then drops to zero in one step; grokking dynamics not incremental reasoning',
  },
  {
    source: '2601.10679',
    target: '2305.18654',
    type: 'supports',
    description:
      'HRM 54.5% baseline; 9 relabeled inputs + majority vote → 96.9%; guessing not reasoning',
  },
  {
    source: '2601.10679',
    target: '2601.11061',
    type: 'supports',
    description:
      'Multiple fixed points trap model; adjacent checkpoints differ on which samples they solve',
  },
  {
    source: '2601.10679',
    target: '2512.07783',
    type: 'supports',
    description:
      'Scaling guesses (bootstrap + relabel) yields +42.4%; characteristic of search not reasoning',
  },
  {
    source: '2601.10679',
    target: '2510.15974',
    type: 'supports',
    description:
      '1-row masked puzzles: stability only ~75%; model guesses first fixed point and gets trapped',
  },
  // Two Pathways to Truthfulness links
  {
    source: '2601.07422',
    target: '2601.21183',
    type: 'supports',
    description:
      'Q-Anchored (87% accuracy, popular entities) vs A-Anchored (68%, long-tail); two distinct paths',
  },
  {
    source: '2601.07422',
    target: '2601.16644',
    type: 'supports',
    description:
      'Pathway-aware probing gains +5.9 AUC; models self-aware of which mechanism at 87-93% AUC',
  },
  {
    source: '2601.07422',
    target: '2305.18654',
    type: 'supports',
    description:
      'Q-Anchored retrieves popular entities within training distribution; A-Anchored fabricates beyond it',
  },
  {
    source: '2601.07422',
    target: '2410.05229',
    type: 'supports',
    description:
      'Popular entities 87% vs long-tail 68% accuracy; pathway choice tracks entity frequency',
  },
  {
    source: '2601.07422',
    target: '2307.13702',
    type: 'extends',
    description:
      'Attention knockout + token patching validate two causal pathways; MoP probe detects which is active',
  },
  // Thinking Out of Order links
  {
    source: '2601.22035',
    target: '2601.15165',
    type: 'supports',
    description:
      'LLaDA-8B only +2% order gap vs AR Qwen +67%; diffusion decouples computation from output order',
  },
  {
    source: '2601.22035',
    target: '2305.18654',
    type: 'supports',
    description: 'AR forces commitment before reasoning; answer-first gap +67% GSM8K, +22% Math500',
  },
  {
    source: '2601.22035',
    target: '2307.13702',
    type: 'supports',
    description:
      'High-confidence answers stabilize at step 10 while reasoning takes 63-203 steps; answer precedes CoT',
  },
  {
    source: '2601.22035',
    target: '2506.06941',
    type: 'supports',
    description:
      'D4 remains ~1% regardless of ordering; insufficient complexity difference caps robustness at ~55%',
  },
  // Paper 115: Scaling Reasoning Hop links
  {
    source: '2601.21214',
    target: '2305.18654',
    type: 'supports',
    description:
      '78.6% of 50-hop errors from single type; ep heads amplify erroneous trajectories at key positions',
  },
  {
    source: '2601.21214',
    target: '2506.06941',
    type: 'supports',
    description:
      'Single ep head knockout corrects 47.5% of errors; same heads cause failures across tasks',
  },
  {
    source: '2601.21214',
    target: '2512.07783',
    type: 'supports',
    description:
      'TCR-gold reaches 61.3% vs 41.7% baseline; correct trajectories exist but are suppressed',
  },
  {
    source: '2601.21214',
    target: '2601.19847',
    type: 'extends',
    description:
      'ep heads are anti-pattern to RCNs: same cross-task heads suppress correct reasoning trajectories',
  },
  // Paper 116: Code over Words links
  {
    source: '2601.18352',
    target: '2410.05229',
    type: 'supports',
    description:
      'Claude 58%→13% when priors conflict with rules; semantic inertia causes 44-49pp drops',
  },
  {
    source: '2601.18352',
    target: '2512.20812',
    type: 'supports',
    description:
      'Llama-70B ΔP=-0.18 NL vs +0.29 code; inverse scaling — larger models have stronger inertia',
  },
  {
    source: '2601.18352',
    target: '2305.18654',
    type: 'supports',
    description:
      '68.9% reversion rate (prior wins) in direct policy; code representation reduces to 31.1%',
  },
  {
    source: '2601.18352',
    target: '2506.06941',
    type: 'supports',
    description:
      'LCV 7B (93/76/62%) outperforms GPT-4o TheoryCoder (62/53/52%); code bypasses NL interference',
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
    description:
      'SC=1.0 collapses under interference; sycophancy linearly separable in activations',
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
    description: 'Causal illusion on correlation cues; sycophantic pressure amplifies errors',
  },
  {
    source: '2410.11684',
    target: '2601.05905',
    type: 'supports',
    description: 'Sycophantic pressure causes belief collapse; causal illusion on correlation cues',
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
    type: 'challenges',
    description: 'Code generation test doesnt address compositional generalization',
  },
  // Paper 125: Alice in Wonderland links
  {
    source: '2406.02061',
    target: '2506.06941',
    type: 'supports',
    description: 'AIW 0-100% fluctuation on simple combinations; Illusion 0% hard tier',
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
    description: 'AIW number sensitivity + letter counting class effects; content drives output',
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
    description:
      'PM prefers sycophantic 95% of time; Best-of-N drives rate to 75% on hard misconceptions',
  },
  {
    source: '2310.13548',
    target: '2601.21183',
    type: 'extends',
    description:
      '98% false mistake admission rate provides behavioral basis for locating sycophantic anchors',
  },
  {
    source: '2310.13548',
    target: '2601.16644',
    type: 'extends',
    description:
      'Belief-matching +6% preference probability in 15K pairs; explains what probes detect mechanistically',
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
    description:
      'PM prefers sycophantic 95%; reasoning models inherit this bias from RLHF training signal',
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
    description:
      'RL against sycophantic PM increases sycophancy; user-suggested wrong answers drop accuracy 27%',
  },
  {
    source: '2310.13548',
    target: '2308.03958',
    type: 'supports',
    description:
      'Bayesian regression at 71.3% accuracy shows belief-matching is among top features of human preference',
  },
  // Paper 128: Conformity of LLMs links
  {
    source: '2501.13381',
    target: '2310.13548',
    type: 'supports',
    description:
      'Doubt protocol 47.2% conformity rate; extends sycophancy to multi-agent peer pressure',
  },
  {
    source: '2501.13381',
    target: '2308.03958',
    type: 'supports',
    description:
      'Llama-405B still only 56.1% independence rate; GPT-4o drops 22.6% under trust protocol',
  },
  {
    source: '2501.13381',
    target: '2506.21561',
    type: 'supports',
    description:
      'Qwen2-7B 98.7% credulity; multi-agent conformity extends single-user sycophancy to peer groups',
  },
  {
    source: '2501.13381',
    target: '2601.05905',
    type: 'supports',
    description:
      'Doubt protocol induces 38.6% accuracy drop (Gemma-27B); trust relationships bias future decisions',
  },
  // Paper 129: Overthinking o1-Like LLMs links
  {
    source: '2412.21187',
    target: '2601.21576',
    type: 'supports',
    description:
      'First solution correct >92% of time; QwQ uses 901 tokens for 2+3=5 (4.3% efficiency)',
  },
  {
    source: '2412.21187',
    target: '2601.17421',
    type: 'supports',
    description:
      'Solution diversity drops 11.5% after solution #3; later rounds repeat strategies not explore',
  },
  {
    source: '2412.21187',
    target: '2506.06941',
    type: 'supports',
    description:
      'Easy problems get 3.7 solutions vs hard 3.0; more compute on easier problems counterintuitively',
  },
  {
    source: '2412.21187',
    target: '2501.02497',
    type: 'extends',
    description:
      'SimPO reduces tokens 45% with <1% accuracy loss; 1953% overhead vs conventional LLMs',
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
    description:
      '418% more thought switches in wrong answers; >70% of failures contain abandoned correct thoughts',
  },
  {
    source: '2501.18585',
    target: '2601.19847',
    type: 'supports',
    description:
      'First correct thought at 411 tokens but 7270 wasted; 94.6% underthinking score on AIME',
  },
  {
    source: '2501.18585',
    target: '2501.02497',
    type: 'extends',
    description:
      'Tip penalty: QwQ AIME 38%→44% by reducing switches 16→14; underthinking mirrors overthinking',
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
    description:
      'GPT-4 ~30% Blocks World; obfuscating names causes precipitous drop proving pattern matching',
  },
  {
    source: '2403.04121',
    target: '2506.18880',
    type: 'supports',
    description:
      'Can extract planning knowledge but cannot assemble it into executable plans; retrieval not search',
  },
  {
    source: '2403.04121',
    target: '2601.14456',
    type: 'supports',
    description:
      'Obfuscated names destroy planning; off-the-shelf AI planners unaffected by same obfuscation',
  },
  // Paper 132: Stop Anthropomorphizing Tokens (Kambhampati) links
  {
    source: '2504.09762',
    target: '2403.04121',
    type: 'extends',
    description:
      'Extends retrieval framework to LRMs: post-training compiles verifier signal into generation',
  },
  {
    source: '2504.09762',
    target: '2307.13702',
    type: 'supports',
    description:
      'Incorrect traces outperform correct in SFT; trace content has no formal semantics',
  },
  {
    source: '2504.09762',
    target: '2505.05410',
    type: 'supports',
    description:
      'R1-Zero unreadable traces outperform R1 human-annotated; interpretability hurts performance',
  },
  {
    source: '2504.09762',
    target: '2412.21187',
    type: 'supports',
    description:
      'Aha moments are just tokens; models have no internal state to have genuine insight',
  },
  // Paper 133: Base Models Know How to Reason links
  {
    source: '2510.07364',
    target: '2512.07783',
    type: 'supports',
    description:
      '15 steering vectors at 12% of tokens recover 91% of thinking model gap; timing not capability',
  },
  {
    source: '2510.07364',
    target: '2403.04121',
    type: 'supports',
    description:
      'Ablation: random vectors 77.2% vs full hybrid 84.4%; correct vectors + timing both necessary',
  },
  {
    source: '2510.07364',
    target: '2504.09762',
    type: 'supports',
    description:
      'RLVR teaches when to deploy pre-existing mechanisms; compilation = learning timing signals',
  },
  {
    source: '2510.07364',
    target: '2601.19847',
    type: 'supports',
    description:
      '~0.03% parameters causally necessary; steering activates pre-existing latent paths',
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
    description:
      'Llama-3-8B retrieval ~98% vs OOD linear classification ~10%; abstract labels fail on OOD functions',
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
    description: 'CoT as trajectory imitation; capabilities pre-exist and get surfaced',
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
    description:
      'Without reward shaping, CoT extends past 16K until accuracy hits zero; explains overthinking',
  },
  {
    source: '2502.03373',
    target: '2501.18585',
    type: 'extends',
    description: 'Short CoT saturates at <55% with 0% RL gain; long CoT enables +5% RL improvement',
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
    description:
      'Performance rapidly deteriorates when stack size n exceeds examples; three domains same pattern',
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
    description:
      'Only problem-specific prompts help; general CoT prompts yield no improvement on planning',
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
    description:
      'Non-CoT: ~100% ID but ~0% OOD; CoT enables OOD only when subtasks seen in training',
  },
  {
    source: '2502.04667',
    target: '2502.03373',
    type: 'supports',
    description:
      'Two-stage circuit: CoT resolves at layer 3 vs non-CoT at layer 5; 4K vs >1M steps to converge',
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
    description: '-6.2% accuracy per 1000 words; overthinking wastes 1953% tokens similarly',
  },
  {
    source: '2508.15842',
    target: '2501.18585',
    type: 'supports',
    description:
      'DeepSeek loses 6.2% accuracy per 1000 words; length predicts errors on Omni-MATH but not HLE',
  },
  {
    source: '2508.15842',
    target: '2601.05905',
    type: 'supports',
    description: 'Claude 84.6% calibration error on HLE; reports ~90% confidence at ~9% accuracy',
  },
  {
    source: '2508.15842',
    target: '2405.04776',
    type: 'supports',
    description:
      'No length-accuracy relationship on HLE; CoT length only predictive on intermediate difficulty',
  },
  {
    source: '2508.15842',
    target: '2504.09762',
    type: 'supports',
    description:
      '5 harmful words (MCC 0.30) outperform self-confidence (MCC 0.065) 4.7x; tokens leak not reason',
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
    description:
      'OOLONG-Pairs O(N²): GPT-5 fails <10% at all lengths; context rot scales with task complexity',
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
    description:
      'RLM CodeQA 24%→62%, BrowseComp 0%→91%; symbolic recursion compensates for CoT limits',
  },
  {
    source: '2512.24601',
    target: '2507.17699',
    type: 'extends',
    description:
      'RLM-8B approaches GPT-5 quality (+28.3%); external scaffolding not native computation',
  },
  // Paper 140: Not All Code Is Equal links
  {
    source: '2601.21894',
    target: '2502.03373',
    type: 'supports',
    description: '83% experiments: complexity-restricted beats diverse; ρ≈-1.00 with complexity',
  },
  {
    source: '2601.21894',
    target: '2502.04667',
    type: 'supports',
    description:
      '83% of experiments: complexity-restricted training beats diverse code; non-monotonic gains',
  },
  {
    source: '2601.21894',
    target: '2510.07364',
    type: 'supports',
    description: 'Llama ρ≈-1.00 with complexity; high complexity actively harms below NL baseline',
  },
  {
    source: '2601.21894',
    target: '2601.21618',
    type: 'supports',
    description:
      'Optimal CC≈10 for Qwen; structural complexity not semantic diversity determines gains',
  },
  // Paper 141: Meta-Thought to Execution links
  {
    source: '2601.21909',
    target: '2502.03373',
    type: 'supports',
    description: 'CoMT separates meta-knowledge from execution; +4.63% OOD via abstraction',
  },
  {
    source: '2601.21909',
    target: '2502.04667',
    type: 'supports',
    description:
      'CoMT separates meta-knowledge from execution; +4.63% OOD vs +2.19% ID over standard CoT',
  },
  {
    source: '2601.21909',
    target: '2601.21894',
    type: 'supports',
    description:
      '65-70% less training time, 50% fewer tokens; abstract patterns transfer better than raw traces',
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
    description:
      'Linear interpolation θ=(1-λ)·instruct+λ·thinking yields convex Pareto frontier for reasoning',
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
    description:
      'Composition 0% OOD after 2M steps; sequential circuit cant store unseen second hops',
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
    description:
      'GPT-4 accuracy swings 26-70% based on output probability alone; all factors p<10⁻¹⁵',
  },
  {
    source: '2407.01687',
    target: '2307.13702',
    type: 'supports',
    description:
      'High-prob output: 34% wrong-chain→correct answer; invalid demos still work if tokens boost probability',
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
    description: 'GPT-4 26-70% swing on output probability; letter counting varies by class',
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
    description: 'SFT collapses; SCoRe +15.6% MATH via multi-turn RL only',
  },
  {
    source: '2409.12917',
    target: '2501.02497',
    type: 'supports',
    description:
      'SFT on correction traces fails from distribution mismatch; SCoRe +15.6% MATH via multi-turn RL',
  },
  {
    source: '2409.12917',
    target: '2506.17219',
    type: 'supports',
    description:
      'SFT collapses to single correction mode; only self-generated multi-turn RL avoids mismatch',
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
    description:
      '>92% of emergent abilities from just 2 metrics; switching to Brier Score reveals smooth scaling',
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
    description: '>70% gap frequent vs rare terms; emergence may be metric artifact',
  },
  // Paper 147: Term Frequencies links
  {
    source: '2202.07206',
    target: '2410.05229',
    type: 'supports',
    description:
      '>70% accuracy gap frequent vs rare terms on multiplication; 24x18 vs 23x18 differ >20%',
  },
  {
    source: '2202.07206',
    target: '2305.18654',
    type: 'supports',
    description:
      'Even rare numbers appear millions of times yet performance varies; statistical not algorithmic',
  },
  {
    source: '2202.07206',
    target: '2407.01687',
    type: 'supports',
    description: '>70% frequency gap + 26-70% probability swing; statistics drive output',
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
    description:
      '1/426 explanations ever mention biasing feature; 15% of unfaithful explanations fully plausible',
  },
  {
    source: '2305.04388',
    target: '2505.05410',
    type: 'supports',
    description:
      'Zero-shot CoT increases bias susceptibility: GPT-3.5 40%→23%; CoT makes sycophancy worse',
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
    description:
      'Suggested answer drops accuracy 36%; models never mention the bias in 426 explanations',
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
    description: 'Trained A→B: 97% but B→A: 0.1%; reverse log-prob no different from random name',
  },
  {
    source: '2309.12288',
    target: '2410.05229',
    type: 'supports',
    description:
      'GPT-4 celebrity parents: forward 79% vs reverse 33%; directional storage not logical relations',
  },
  {
    source: '2309.12288',
    target: '2202.07206',
    type: 'supports',
    description:
      'Data augmentation and paraphrases dont help; curse is specific to training-time learning',
  },
  {
    source: '2309.12288',
    target: '2410.09695',
    type: 'supports',
    description:
      'Question→Answer >80% but Answer→Question <7%; ICL works but training doesnt reverse',
  },
  // Paper 150: Planning Abilities links
  {
    source: '2305.15771',
    target: '2403.04121',
    type: 'supports',
    description:
      'GPT-4 ~12% autonomous planning success on IPC domains; earlier empirical basis for retrieval claim',
  },
  {
    source: '2305.15771',
    target: '2506.06941',
    type: 'supports',
    description:
      'GPT-4 fails at valid action sequences, preconditions, and goal states in IPC benchmarks',
  },
  {
    source: '2305.15771',
    target: '2405.04776',
    type: 'supports',
    description:
      'LLM-Modulo with external verifiers needed; autonomous generation ~12% even for GPT-4',
  },
  {
    source: '2305.15771',
    target: '2504.09762',
    type: 'supports',
    description:
      'Empirical basis (IPC benchmarks) for later theoretical claim that traces have no formal semantics',
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
    type: 'challenges',
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
    description: 'TC⁰→TC⁰[poly(n)] expressivity; CoT resolves at layer 3 vs non-CoT at layer 5',
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
    type: 'challenges',
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
    description: '91% failures predicted by token-bias; 97% forward vs 0.1% reverse',
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
    description: 'Shortcut algorithms fail on recursion; 100%→0% on unseen DFA compositions',
  },
  {
    source: '2305.14699',
    target: '2405.15071',
    type: 'supports',
    description: '91% failure prediction via shortcut algorithms; 0% OOD composition after 2M steps',
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
    type: 'extends',
    description: 'Addresses length failures but not compositional OOD',
  },
  // Paper 160: GSM-IC links
  {
    source: '2302.00093',
    target: '2410.05229',
    type: 'extends',
    description: 'GSM-IC precursor to GSM-Symbolic; 17-46% drop from distractors in grade-school math',
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
    description: 'Irrelevant context distracts; negation triggers wrong patterns similarly',
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
    description: '~400/1024 heads retain 90%; functional rift at layer 16 confirms compute benefit',
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
    description:
      '76% file path accuracy on SWE-Bench Verified vs <53% on external repos; 47pp memorization gap',
  },
  {
    source: '2506.12286',
    target: '2410.05229',
    type: 'supports',
    description:
      '5-gram overlap 35% on Verified vs 14% external; Claude 4 Opus 31.6% verbatim prefix match',
  },
  {
    source: '2506.12286',
    target: '2601.13392',
    type: 'supports',
    description:
      'Instance-specific + repository-bias memorization; newer Claude models show monotonic contamination increase',
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
    description:
      'File path identification 60-76% without repo context; performance tracks repository familiarity',
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
    description: 'External solver achieves 95% vs 25-39% faithfulness; LLMs translate, solvers execute',
  },
  {
    source: '2301.13379',
    target: '2503.08679',
    type: 'supports',
    description: 'External solver achieves 95% vs 13% IPHR; neuro-symbolic bypass fixes unfaithfulness',
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
    description:
      '0.13 fewer hallucinations per additional nat; ISR achieves ~0% hallucination at 24% abstention',
  },
  {
    source: '2509.11208',
    target: '2601.21576',
    type: 'supports',
    description:
      'Order-induced deviations scale O(log n); Martingale Violation theorem quantifies positional effects',
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
    description: 'Faithful vs unfaithful recovery diverge p<0.001; hints used but not verbalized <40%',
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
    description:
      'Faithful recovery scales with evidence availability; unfaithful stays constant — divergent p<0.001',
  },
  {
    source: '2405.15092',
    target: '2301.13379',
    type: 'extends',
    description:
      'Context noise increases unfaithful recovery in Claude/Llama; evidence quality doesnt help opaque mode',
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
    description: 'Cross-naming converges at ~7000 tokens; steering +1.8% accuracy on latent',
  },
  {
    source: '2602.04843',
    target: '2502.03373',
    type: 'supports',
    description:
      'Cross-naming representations converge at ~7000 tokens; steering boosts accuracy +1.8% cross-naming',
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
    description:
      'QwQ 96% standard → 35% mystery BlocksWorld; coherent semantic domains worst at 5-14%',
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
    description: 'Sharp phase transition: faithful→skip-step parallels stepwise→shortcut modes',
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
    description: 'Modular arithmetic N=97 reveals training noise threshold for faithfulness',
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
    description: 'Single ":" token fools GPT-o1 judge; evaluation as surface-fragile as CoT itself',
  },
  {
    source: '2507.08794',
    target: '2505.05410',
    type: 'supports',
    description: 'Zero-content tokens trigger reward; CoT appearance fools judges like humans',
  },
  {
    source: '2507.08794',
    target: '2512.20812',
    type: 'supports',
    description: '"Let\'s solve this step by step" triggers false reward without reasoning',
  },
  {
    source: '2507.08794',
    target: '2508.15842',
    type: 'supports',
    description: 'Punctuation marks activate reward circuits; reasoning opener tokens signal mode',
  },
  // Paper 174: Inverse Scaling in Test-Time Compute links
  {
    source: '2507.14417',
    target: '2506.06941',
    type: 'supports',
    description: '5 failure modes; TMLR Featured; more compute actively hurts on some tasks',
  },
  {
    source: '2507.14417',
    target: '2412.21187',
    type: 'supports',
    description: '1953% token overhead on easy problems; inverse scaling confirms systematic waste',
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
    description: '5 inverse scaling failure modes; accuracy drop 0.81-3.16% per 1000 tokens',
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
    description: 'GPT-4 lags humans 3.9% on uncommon word senses; frequency drives "understanding"',
  },
  {
    source: '2405.05741',
    target: '2305.18654',
    type: 'supports',
    description: 'GPT-3.5 22.3% gap on low-frequency senses; defaults to high-frequency meaning',
  },
  {
    source: '2405.05741',
    target: '2309.12288',
    type: 'supports',
    description: 'LeSC benchmark: uncommon meanings expose frequency-dependent word sense bias',
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
    description:
      'Misleading info overrides instructions; models focus on frequent sense over context',
  },
  // Paper 176: LiveCodeBench Pro links
  {
    source: '2506.11928',
    target: '2506.06941',
    type: 'supports',
    description: '0% hard tier for all models; 83.1% easy collapses like Illusion puzzle cliff',
  },
  {
    source: '2506.11928',
    target: '2305.18654',
    type: 'supports',
    description:
      'o3-mini makes 34 more algorithm errors than humans but 25 fewer implementation bugs',
  },
  {
    source: '2506.11928',
    target: '2506.18880',
    type: 'supports',
    description: '83%→0% coding collapse mirrors OMEGA compositional generalization failure',
  },
  {
    source: '2506.11928',
    target: '2601.14456',
    type: 'supports',
    description:
      'Near-zero gain on observation-heavy problems mirrors planning degradation on novel tasks',
  },
  {
    source: '2506.11928',
    target: '2410.05229',
    type: 'supports',
    description:
      'Knowledge-heavy categories succeed where patterns appear verbatim in training data',
  },
  {
    source: '2506.11928',
    target: '2506.12286',
    type: 'supports',
    description: 'LLMs fail on provided sample inputs 5x more than humans (56 vs 11 failures)',
  },
  {
    source: '2506.11928',
    target: '2503.21934',
    type: 'supports',
    description: '0% hard coding + 24% best proof score; auto-grading overestimates 20x in both',
  },
  // Paper 177: Abstract Reasoning Without CoT links
  {
    source: '2505.23701',
    target: '2305.18654',
    type: 'supports',
    description:
      'CoT boosts computation +58.7% but abstraction only +6.7%; retrieval not reasoning',
  },
  {
    source: '2505.23701',
    target: '2410.21272',
    type: 'supports',
    description: 'Abstract-then-compute at layers 13-14 vs 18; sequential heuristic pipeline',
  },
  {
    source: '2505.23701',
    target: '2502.20332',
    type: 'supports',
    description: 'Cross-prompt patching transfers abstractions causally between problems',
  },
  {
    source: '2505.23701',
    target: '2509.23629',
    type: 'supports',
    description: 'Operator tokens activate at specific layers; similar to reasoning mode circuits',
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
    description: 'P(phi|K_M) ≠ 1-P(¬phi|K_M); truth assessment bounded by training distribution',
  },
  {
    source: '2506.23921',
    target: '2601.16644',
    type: 'supports',
    description: 'Truth/falsehood need distinct directions; cannot negate truth to get falsehood',
  },
  {
    source: '2506.23921',
    target: '2307.13702',
    type: 'supports',
    description:
      'Binary probes perform worse than zero-shot prompting; proxy directions confounded',
  },
  {
    source: '2506.23921',
    target: '2401.11817',
    type: 'supports',
    description:
      'Three-valued truth (true/false/neither) formalizes why hallucination is inevitable',
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
    description: 'Five emergence conditions unmet; capability ≠ intelligence, "more with more"',
  },
  {
    source: '2506.11135',
    target: '2304.15004',
    type: 'supports',
    description: 'KI systems (knowledge-in) vs KO (knowledge-out); benchmark jumps are engineering',
  },
  {
    source: '2506.11135',
    target: '2506.18880',
    type: 'supports',
    description: 'Generalization condition #5 fails; OMEGA confirms lack of compositional transfer',
  },
  {
    source: '2506.11135',
    target: '2506.06941',
    type: 'supports',
    description: '"Rube Goldberg logic" — massive complexity for simple tasks, not intelligence',
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
    description: 'pass@10 still 0% hard; more attempts help medium only, like inverse TTC scaling',
  },
  {
    source: '2506.11928',
    target: '2506.11135',
    type: 'supports',
    description: '0% hard tier exemplifies "more with more" ≠ intelligence argument',
  },
  // Paper 177 (Abstract vs Compute) additional links
  {
    source: '2505.23701',
    target: '2602.01017',
    type: 'supports',
    description:
      'Layer 13-14 abstraction vs layer 18 computation; unfaithful CoT at mechanism level',
  },
  {
    source: '2505.23701',
    target: '2307.13702',
    type: 'supports',
    description: 'CoT aids arithmetic (+58.7%) not abstraction (+6.7%); faithfulness gap confirmed',
  },
  // Paper 178 (Trilemma) additional links
  {
    source: '2506.23921',
    target: '2509.11208',
    type: 'supports',
    description:
      'Trilemma impossibility theorem gives formal basis for compression-hallucination link',
  },
  {
    source: '2506.23921',
    target: '2506.11135',
    type: 'supports',
    description:
      'KI systems encode training statistics; trilemma shows truth ≠ probability complement',
  },
  // Paper 179 (Mitchell Emergence) additional links
  {
    source: '2506.11135',
    target: '2410.21272',
    type: 'supports',
    description: '"Rube Goldberg logic" aligns with bag-of-heuristics; convoluted not elegant',
  },
  {
    source: '2506.11135',
    target: '2507.14417',
    type: 'supports',
    description: '"More with more" ≠ intelligence; 5 inverse scaling failure modes confirm',
  },
  {
    source: '2506.11135',
    target: '2506.11928',
    type: 'supports',
    description: '83%→0% coding collapse exemplifies capability without intelligence',
  },
  // Connect Paper 175 (Uncommon Meanings) to more papers
  {
    source: '2405.05741',
    target: '2302.00093',
    type: 'supports',
    description:
      'Uncommon word senses fail like low-frequency patterns; statistics gate comprehension',
  },
  {
    source: '2405.05741',
    target: '2506.11135',
    type: 'supports',
    description:
      'Formal expressivity gaps mirror empirical OOD failures; training distribution gates capability',
  },
  // Cross-connect new papers to each other
  {
    source: '2506.11928',
    target: '2505.23701',
    type: 'supports',
    description: 'Knowledge-heavy succeed, observation-heavy fail; computation ≠ abstraction',
  },
  {
    source: '2506.23921',
    target: '2505.23701',
    type: 'supports',
    description: 'Trilemma probes truth across 16 LLMs; abstraction probes at layers 13-14 vs 18',
  },
  // Paper 180: Contextual Drag links
  {
    source: '2602.04288',
    target: '2310.13548',
    type: 'supports',
    description:
      '34% AIME drop from 1 failed draft; attention reuses erroneous patterns like sycophancy',
  },
  {
    source: '2602.04288',
    target: '2302.00093',
    type: 'supports',
    description:
      '53% Game-of-24 collapse with 2 failed drafts; context overrides correct computation',
  },
  {
    source: '2602.04288',
    target: '2305.04388',
    type: 'supports',
    description:
      'Tree edit distance confirms structural inheritance of errors, not surface copying',
  },
  {
    source: '2602.04288',
    target: '2602.01017',
    type: 'supports',
    description: 'Even GPT-5 degrades 6.25% from failed drafts; autoregressive pattern inheritance',
  },
  {
    source: '2602.04288',
    target: '2501.18585',
    type: 'supports',
    description:
      'Iterative refinement causes accuracy collapse; self-deterioration across iterations',
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
    description: '10-20% contextual drag drop; 92% first-correct but 4.3% token efficiency',
  },
  {
    source: '2602.04288',
    target: '2506.11135',
    type: 'supports',
    description: 'Failed attempts bias 10-20% drop; Rube Goldberg logic is trained, not emergent',
  },
  {
    source: '2602.04288',
    target: '2410.05229',
    type: 'supports',
    description:
      '10-20% drops across 11 models from failed context; fragility like numeric perturbation',
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
    description: 'Final answer probing at 0.50 (chance) until last position; no lookahead planning',
  },
  {
    source: '2602.02103',
    target: '2409.13373',
    type: 'supports',
    description:
      'Token F1 drops 0.90→0.03 at delta=16; myopic horizon matches planning gap findings',
  },
  {
    source: '2602.02103',
    target: '2403.04121',
    type: 'supports',
    description: 'Final answer at chance (0.50) until last step; confirms approximate retrieval not planning',
  },
  {
    source: '2602.02103',
    target: '2504.09762',
    type: 'supports',
    description:
      '16.2% CoT bypassable with 0.03 accuracy drop; steps are compute, not semantic plan',
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
    description:
      'Tele-Lens probing shows incremental local transitions, not planned reasoning paths',
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
    description:
      'Parity answer only resolved at final counting step; all prior positions at chance',
  },
  {
    source: '2602.02103',
    target: '2602.04288',
    type: 'supports',
    description:
      'Myopic horizon: GSM8K prediction 0.55→0.02 at delta=16; local like contextual drag',
  },
  // Paper 182: LMs Struggle to Use In-Context Representations links
  {
    source: '2602.04212',
    target: '2410.09695',
    type: 'supports',
    description:
      '>75% with explicit topology but near-chance on in-context; representations are inert',
  },
  {
    source: '2602.04212',
    target: '2309.12288',
    type: 'supports',
    description: 'Encoding-deployment dissociation; representations encoded but cannot be deployed',
  },
  {
    source: '2602.04212',
    target: '2602.04843',
    type: 'supports',
    description: 'Representations encode topology but are inert; 7k tokens to converge, <2% steering gain',
  },
  {
    source: '2602.04212',
    target: '2402.18312',
    type: 'extends',
    description: 'Probing shows encoding ≠ deployment; functional rift at layer 16 confirms parallel pathways',
  },
  {
    source: '2602.04212',
    target: '2602.02103',
    type: 'supports',
    description:
      'GPT-5 and Gemini collapse on 2D grids; inert representations match myopic horizon',
  },
  {
    source: '2602.04212',
    target: '2305.18654',
    type: 'supports',
    description:
      'Dirichlet energy confirms representations not deployed; compositional gap persists',
  },
  {
    source: '2602.04212',
    target: '2506.11135',
    type: 'supports',
    description: 'Inert representations exemplify KI capability without KO intelligence',
  },
  // Paper 183: Poisoning Attacks links
  {
    source: '2510.07192',
    target: '2401.11817',
    type: 'supports',
    description:
      '250 docs backdoor 13B model trained on 260B tokens (0.00016%); no quality filtering',
  },
  {
    source: '2510.07192',
    target: '2310.13548',
    type: 'supports',
    description:
      '100x more clean data does not reduce 60% ASR; trigger associations override context',
  },
  {
    source: '2510.07192',
    target: '2602.01017',
    type: 'supports',
    description:
      'Constant-sample (not percentage) scaling; models extract associations without reasoning',
  },
  {
    source: '2510.07192',
    target: '2309.12288',
    type: 'extends',
    description:
      '250 poison docs at all scales 600M-13B; specific associations like reversal curse',
  },
  // Paper 184: Brain Rot links
  {
    source: '2510.13928',
    target: '2602.01017',
    type: 'supports',
    description:
      '-17.7pp ARC from junk data; thought-skipping as structural degradation of reasoning',
  },
  {
    source: '2510.13928',
    target: '2510.07192',
    type: 'supports',
    description:
      'Linear dose-response: more junk = more damage; 250 poison docs show same causality',
  },
  {
    source: '2510.13928',
    target: '2401.11817',
    type: 'supports',
    description:
      '-32.1pp long-context from junk; partial healing only — damage cannot be fully reversed',
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
    description:
      'Thought-skipping truncates reasoning chains; overthinking wastes tokens differently',
  },
  {
    source: '2510.13928',
    target: '2501.18585',
    type: 'supports',
    description:
      'Tweet popularity (non-semantic metric) predicts brain rot; data quality causally drives it',
  },
  {
    source: '2510.13928',
    target: '2509.11208',
    type: 'supports',
    description:
      'Representational drift persists after remediation; compression failure from data quality',
  },
  {
    source: '2510.13928',
    target: '2506.11135',
    type: 'supports',
    description:
      'Hedges g>0.3 decline across all domains; KI system quality bounded by training data',
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
    description: 'Type-II false generalization; order-induced O(log n) deviations explain when',
  },
  {
    source: '2510.05116',
    target: '2506.11135',
    type: 'supports',
    description:
      'Type-II hallucination (false generalization) inevitable under open-world assumption',
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
    description: 'Single emoji ":)" flips predictions; single ":" fools reward judges',
  },
  {
    source: '2310.13345',
    target: '2410.05229',
    type: 'supports',
    description:
      '64-74% cross-model attack transfer; character-level 81% ASR proves surface fragility',
  },
  {
    source: '2310.13345',
    target: '2305.04388',
    type: 'supports',
    description:
      'LLMs generate adversarial examples that fool themselves; self-deception via patterns',
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
    description: 'TIP 86% ASR on GPT-4o; Llama Guard detects only 7% — pattern space bypass',
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
    description: 'Task-in-Prompt embeds seq2seq to bypass; single tokens fool reward models',
  },
  {
    source: '2501.18626',
    target: '2305.04388',
    type: 'supports',
    description:
      'TIP Python encodes harmful requests as seq2seq; safety triggers miss encoding layer',
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
    description: 'GPT-o1 tau=4.42 on standard games but drops on unusual p=4/3 parameter',
  },
  {
    source: '2412.13013',
    target: '2501.12948',
    type: 'supports',
    description: 'Reasoning LLMs reach tau=4+ on p-Beauty Contest; standard LLMs tau<3',
  },
  // Paper 63: Revisiting Test-Time Scaling (2502.12215)
  {
    source: '2502.12215',
    target: '2506.06941',
    type: 'supports',
    description: 'Sequential scaling fails; parallel helps but still hits complexity ceiling',
  },
  {
    source: '2502.12215',
    target: '2507.14417',
    type: 'supports',
    description: 'Diminishing returns on hard problems; more tokens actively hurt on some tasks',
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
    description:
      'Unlearning finds 40-86% faithful CoTs vs 16-50% contextual; r=0.15 plausibility gap',
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
    description:
      'Budget forcing + diminishing returns; scaling compute hits wall on complex reasoning',
  },
  {
    source: '2509.09677',
    target: '2506.06941',
    type: 'supports',
    description: 'Self-conditioning causes exponential error; 99% step accuracy → ~69 steps max',
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
    description: 'ILR +5% via peer patterns; s1 shows 1K samples surfaces 26.7%→50% AIME',
  },
  {
    source: '2509.26306',
    target: '2512.07783',
    type: 'supports',
    description: 'Interactive learning improves but remains bounded by pretraining distribution',
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
    description: 'R1 as judge: 32pp length bias drop despite higher RewardBench accuracy',
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
    description:
      'DAG geometry recoverable at depth Spearman ~0.7 but overlap with incorrect outputs',
  },
  // Paper 94: SOAR (2601.18778)
  {
    source: '2601.18778',
    target: '2501.19393',
    type: 'extends',
    description: 'SOAR 4x pass@1 via meta-RL curriculum; s1 uses budget forcing on 1K samples',
  },
  {
    source: '2601.18778',
    target: '2502.04667',
    type: 'supports',
    description:
      'Meta-RL curricula yield 4x pass@1; only 32.8% stepping-stones need correct answers',
  },
  // Paper 188: Mind Your Tone (Politeness) (2402.14531)
  {
    source: '2402.14531',
    target: '2410.05229',
    type: 'supports',
    description:
      'Rude tone drops Llama2-70B 48.5%; irrelevant feature sensitivity like filler info',
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
    description:
      'Tone words and task-in-prompt encoding exploit same surface-pattern vulnerability',
  },
  {
    source: '2402.14531',
    target: '2302.00093',
    type: 'supports',
    description:
      'Social tone irrelevant to logic yet shifts accuracy; context sensitivity is general',
  },
  // Paper 189: Confidence Paradox (2506.23464)
  {
    source: '2506.23464',
    target: '2401.11817',
    type: 'supports',
    description: '~20% confidence-accuracy gap; models lack intrinsic calibration without training',
  },
  {
    source: '2506.23464',
    target: '2601.05905',
    type: 'supports',
    description:
      'HonestVQA reduces overconfidence 35-39% but requires external contrastive training',
  },
  {
    source: '2506.23464',
    target: '2509.11208',
    type: 'supports',
    description:
      '4-6% cross-domain transfer drops prove confidence is domain-specific, not general',
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
    description:
      'Rude tone drops Llama2-70B 48.5%; irrelevant features like politeness bias output',
  },
  {
    source: '2510.04950',
    target: '2302.00093',
    type: 'supports',
    description:
      'Politeness modulates accuracy up to 48.5%; surface sensitivity like sycophancy trigger',
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
    target: '2302.00093',
    type: 'extends',
    description: 'Survey cites Distracted by Irrelevant Context on robustness',
  },

  // Token Assorted (Paper 193)
  {
    source: '2502.03275',
    target: '2404.15758',
    type: 'supports',
    description: 'Latent tokens replace explicit steps; 3SUM 100% filler vs 66% no-filler baseline',
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
    description: 'Latent tokens match full CoT; overthinking wastes 1953% tokens on easy problems',
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
    description: 'Easy = post-hoc rationalization; hard = forced externalization at threshold',
  },
  // Pause Tokens Training (Paper 195)
  {
    source: '2310.02226',
    target: '2404.15758',
    type: 'supports',
    description: '+18% EM from pause tokens; +34% from filler dots — content irrelevant in both',
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
    description: 'Pause gains only with pretraining (2/9 vs 8/9 tasks); latent tokens confirm same',
  },
  // Seq-VCR Dummy Pause (Paper 196)
  {
    source: '2411.02344',
    target: '2404.15758',
    type: 'supports',
    description:
      'Dummy tokens match CoT; Seq-VCR prevents representation collapse for +dramatic gains',
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
    description: 'Seq-VCR regularization + latent tokens; semantic content redundant in both',
  },
  // Expanding Computation Spaces (Paper 197)
  {
    source: '2509.24884',
    target: '2404.15758',
    type: 'supports',
    description: 'Inference-time filler works without training but smaller gains than Dot by Dot',
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
    description: 'Fine-tuning only works (no pretraining); Seq-VCR regularization further improves',
  },
  {
    source: '2506.03616',
    target: '2404.15758',
    type: 'supports',
    description: 'DIT learns WHERE to pause; +34% from filler dots proves content irrelevant',
  },
  // Bottlenecked Transformers (Paper 199)
  {
    source: '2505.16950',
    target: '2411.02344',
    type: 'supports',
    description: 'KV cache rewriting +6.6pp; Seq-VCR prevents collapse for 99.5% on 5x5 mult',
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
    description: 'Info bottleneck explains filler benefit; Dot by Dot +34% from dots on 3SUM',
  },
  // HARP (Paper 200)
  {
    source: '2412.07282',
    target: '2310.02226',
    type: 'supports',
    description: 'HARP uses entropy at inference; pause tokens need pretraining — complementary',
  },
  {
    source: '2412.07282',
    target: '2411.02344',
    type: 'supports',
    description:
      'HARP selects hard positions via entropy; Seq-VCR prevents representation collapse',
  },
  {
    source: '2412.07282',
    target: '2509.24884',
    type: 'supports',
    description: 'HARP selective entropy-based; Expanding Computation uniform — inference-only gains',
  },
  {
    source: '2412.07282',
    target: '2404.15758',
    type: 'supports',
    description:
      'HARP selective + Dot by Dot uniform; extra computation works regardless of method',
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
    description: 'Filler Tokens metric best for faithfulness; reveals hidden vs decorative compute',
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
    description:
      'Rot-2 at 2% vs Rot-1 at 82% — same difficulty, different frequency drives accuracy',
  },
  {
    source: '2309.13638',
    target: '2410.05229',
    type: 'supports',
    description: '41x accuracy gap (83% vs 2%) on article swapping; frequency predicts fragility',
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
    description: 'Output regularization: "owl"→"own", "otters"→"others"; high-prob overrides',
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
    description: 'Letter counting varies by word frequency; probability drives both phenomena',
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
    description:
      'o1 still shows probability sensitivity; embers persist despite reasoning training',
  },
  {
    source: '2410.01792',
    target: '2506.06941',
    type: 'supports',
    description:
      'o1 embers + Illusion 0% hard tier; reasoning optimization cannot escape frequency',
  },
  {
    source: '2410.01792',
    target: '2501.12948',
    type: 'supports',
    description: 'o1 shift cipher: 45% gap persists; R1 emergent behaviors still frequency-bounded',
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
    type: 'extends',
    description: 'NYC R²=0.359 vs World 0.911 — entity frequency determines encoding quality',
  },
  {
    source: '2310.02207',
    target: '2305.18654',
    type: 'extends',
    description: 'Linear probe R²=0.91 tracks entity frequency; probing ≠ causally using representations',
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
    type: 'extends',
    description: 'Same authors (Tegmark), same methodology (linear probing), same limitations',
  },
  {
    source: '2310.06824',
    target: '2309.13638',
    type: 'challenges',
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
    description: '74% vs 4% on Game-of-24; ToT compensates via search where CoT hits threshold',
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
    description: 'GoT adds aggregation (merge sort) to ToT; 62% sorting gain from algorithm, not LLM',
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
      '62% sorting gain from external merge sort; LLMs admit unable to sort beyond certain length',
  },
  {
    source: '2308.09687',
    target: '2512.07783',
    type: 'supports',
    description:
      'GoO (Graph of Operations) is pre-constructed by humans; external scaffolding surfaces latent',
  },
  {
    source: '2308.09687',
    target: '2506.06941',
    type: 'supports',
    description:
      '75% vs 50% sorting 128 numbers; GoT chunks problem, LLM handles only sub-problem size',
  },
  {
    source: '2308.09687',
    target: '2410.05229',
    type: 'supports',
    description: 'Set intersection 75.7% vs 60.9%; graph structure reduces variations to known ops',
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
    type: 'extends',
    description: 'Complementary: this paper tests in-distribution; GSM-Symbolic tests OOD',
  },
  {
    source: '2410.03717',
    target: '2510.07364',
    type: 'supports',
    description: 'Post-training teaches reasoning beyond style; power law scaling vs saturation',
  },
  {
    source: '2410.03717',
    target: '2502.03373',
    type: 'supports',
    description:
      'Demystifying shows pre-existence; Revisiting shows reasoning separable from style',
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
    description: 'BF (Branching Factor) reduction proves alignment selects pre-existing paths',
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
    description: 'SSAH: 1.3% units control safety; BF: alignment locks into narrow paths',
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
    description: 'Linear head captures 100% safety; BF shows low-entropy paths pre-exist',
  },
  {
    source: '2502.04602',
    target: '2410.03717',
    type: 'supports',
    description:
      'Confirms reasoning gap (53-62% captured) — agrees alignment not entirely superficial',
  },
  {
    source: '2502.04602',
    target: '2410.10862',
    type: 'supports',
    description: 'SCU neurons (#212) + linear head (#213); safety is sparse and extractable',
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
    description: 'Explicit safety signals achieve 0% ASR; reasoning improves after style saturates at ~100 examples',
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
    description: 'SCU neurons + linear head extraction; safety binary classification is sparse',
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
    description: 'Prompt repetition adds compute like filler dots; o1 learns this via RL',
  },
  {
    source: '2512.14982',
    target: '2310.02226',
    type: 'supports',
    description: 'Prompt repetition + pause tokens; extra processing before output helps accuracy',
  },
  // Whose Opinions Do LMs Reflect (#216) relationships
  {
    source: '2303.17548',
    target: '2305.11206',
    type: 'supports',
    description:
      'LIMA shows 1K examples shape behavior; OpinionsQA shows annotator demographics shape opinions',
  },
  {
    source: '2303.17548',
    target: '2410.10862',
    type: 'supports',
    description: '>99% Biden approval reflects crowdworker demographics; 1.3% neurons encode safety direction',
  },
  {
    source: '2303.17548',
    target: '2310.13548',
    type: 'supports',
    description:
      'Sycophancy optimizes for crowdworker approval; OpinionsQA shows opinion shift toward annotator demographics',
  },
  {
    source: '2303.17548',
    target: '2308.03958',
    type: 'supports',
    description:
      'Simple synthetic data shapes sycophancy; RLHF shapes opinion distributions toward crowdworkers',
  },
  {
    source: '2303.17548',
    target: '2506.17871',
    type: 'supports',
    description:
      'Probability concentration parallels opinion collapse; RLHF narrows both generative and opinion diversity',
  },
  // LLMs Are Echo Chambers (#217) relationships
  {
    source: 'LREC-COLING-2024-884',
    target: '2310.13548',
    type: 'supports',
    description: '3.02x agreement ratio; sycophancy as agreeing with users, not truth-seeking',
  },
  {
    source: 'LREC-COLING-2024-884',
    target: '2303.17548',
    type: 'extends',
    description: 'Extends opinion reflection to active agreement; 5 models, 4 topics, 1665 responses',
  },
  {
    source: 'LREC-COLING-2024-884',
    target: '2601.15436',
    type: 'supports',
    description: 'LLama 6.22:1 vs ChatGPT 1.63:1; sycophancy varies by model like benchmark shows',
  },
  {
    source: 'LREC-COLING-2024-884',
    target: '2308.03958',
    type: 'supports',
    description: 'Echo chamber from coherent training texts; next-token prediction on single-stance data',
  },
  // Generative Echo Chamber (#218) relationships
  {
    source: '2402.05880',
    target: 'LREC-COLING-2024-884',
    type: 'extends',
    description: 'Extends echo chamber to human behavior; N=328 shows 10x confirmatory query increase',
  },
  {
    source: '2402.05880',
    target: '2310.13548',
    type: 'supports',
    description: 'Consonant LLM 43% vs dissonant 12% confirmatory queries; sycophancy amplifies in search',
  },
  {
    source: '2402.05880',
    target: '2303.17548',
    type: 'supports',
    description: 'Users spend 117s on consonant vs 79s dissonant content; opinion skew becomes behavior',
  },
  {
    source: '2402.05880',
    target: '2308.03958',
    type: 'extends',
    description: 'Extends sycophancy to RAG search systems; GPT-4 backend with 47 curated documents',
  },
  // Memento (#219) relationships
  {
    source: '2508.16153',
    target: '2507.16929',
    type: 'supports',
    description: 'Both show external scaffolding compensates for LLM limitations; +4.7-9.6% OOD via CBR',
  },
  {
    source: '2508.16153',
    target: '2410.05229',
    type: 'supports',
    description: 'Case retrieval is pattern matching; 87.88% GAIA via similarity not reasoning',
  },
  {
    source: '2508.16153',
    target: '2305.11206',
    type: 'extends',
    description: 'Extends SAH: if alignment is shallow, learning can be externalized too',
  },
  {
    source: '2508.16153',
    target: '2512.07783',
    type: 'supports',
    description: 'Both show RL surfaces pre-existing patterns; Memento uses case retrieval instead',
  },
  // Progress Measures for Grokking (#220) relationships
  {
    source: '2301.05217',
    target: '2405.15071',
    type: 'supports',
    description: 'Both show grokking requires extended training; this provides 3-phase mechanistic explanation',
  },
  {
    source: '2301.05217',
    target: '2305.15054',
    type: 'supports',
    description: 'Both show localized circuits for arithmetic; Fourier basis explains HOW circuits form',
  },
  {
    source: '2301.05217',
    target: '2305.18654',
    type: 'supports',
    description: 'Both show task-specific circuits; Fourier algorithm is narrow like compositional shortcuts',
  },
  {
    source: '2301.05217',
    target: '2410.05229',
    type: 'supports',
    description: 'Fourier basis is mathematically inevitable; learned algorithm is sophisticated pattern matching',
  },
];
