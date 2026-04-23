# Paper 335: Alignment and Safety in Large Language Models — Safety Mechanisms, Training Paradigms, and Emerging Challenges

## Metadata
- **arXiv**: 2507.19672
- **Date**: July 2025
- **Authors**: Lu, Fang, Zhang, Li, Cai, Cheng, Tang, Liu, Sun, Wang, Zhang, Zidan, Xu, Yu, Yu, Jiang, Gong, Luo, Sun, Chen, Ma, Wu, Zhou, Chen, Xiang — et al. (~50 authors; led by U. Georgia)
- **Venue**: arXiv survey, 119 pages, ~470 references
- **Stance**: Balanced (survey genre; leans lightly supports with SFT-imitation-of-safe-looking-text framing)

---

## Core Finding

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  119-PAGE ALIGNMENT SURVEY: 5 FUNDAMENTAL OPEN PROBLEMS              │
│                                                                      │
│  The HHH (Helpfulness/Harmlessness/Honesty) objectives exhibit       │
│  FUNDAMENTAL incompatibilities — Pareto-optimal tradeoffs, not just  │
│  competing.                                                          │
│                                                                      │
│  SFT "teaches imitation of safe-looking text, WITHOUT necessarily    │
│  internalizing the underlying principles."                           │
│                                                                      │
│  It is STATISTICALLY IMPOSSIBLE for a single reward function to      │
│  represent diverse preferences with intransitive cycles (Condorcet   │
│  impossibility imported into alignment).                             │
│                                                                      │
│  Tone: "cautious optimism" with explicit acknowledgment of fragility │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Core Claims

1. **HHH objectives are fundamentally incompatible** — Helpfulness vs Harmlessness vs Honesty are Pareto-trade-offs, requiring hierarchical lexicographic policy stacking (safety → honesty → helpfulness).
2. **SFT and RLHF are theoretically equivalent** under ideal conditions (§6.2); DPO is the explicit bridge.
3. **Feedback quality >> feedback quantity** — central insight.
4. **Alignment has embraced uncertainty as fundamental** — AUQ (Alignment Uncertainty Quantification) elevates uncertainty from a measurement problem to an alignment stance: "perfect alignment may be impossible."
5. **Current alignment is fragile** — jailbreak landscape is undefeated; shows alignment is surface-level.

---

## Structure (13 Sections)

1. Objectives (HHH) & Evaluation
2. SFT & Instruction Tuning
3. RLHF (PPO)
4. SFT vs RLHF theoretical bridge
5. Advanced methods: DPO, Constitutional AI, Multi-agent, GRPO
6. Parameter-efficient fine-tuning
7. Brain-inspired approaches
8. Alignment Uncertainty Quantification (AUQ)
9. Societal/regulatory context
10. Lab-by-lab strategies (§12)
11. Open problems (§13)

---

## Techniques Surveyed — Survey's Verdicts

| Technique | Survey Verdict |
|-----------|----------------|
| SFT | "Enables basic instruction-following" but "cannot prioritize aligned outcomes over superficially plausible but misaligned ones" |
| RLHF (PPO) | Industry standard; brittle to reward misspecification, reward hacking |
| DPO | "Elegant mathematical insight"; inherits all reward-modeling limitations implicitly |
| Constitutional AI | Scalable but "inherits the value structure of the teacher" — value lock-in |
| GRPO | Training efficiency, not alignment breakthrough |
| Deliberative Alignment | CoT over safety spec; but CoT withheld from RL judge "to prevent encouraging deceptive reasoning" (implicit admission CoT can be deceptive) |
| Brain-inspired | Exploratory; no strong empirical claims |
| AUQ | "Maturation of the field" — accepts perfect alignment may be impossible |

---

## Fundamental Trade-offs (§2.3)

```
              HELPFULNESS
                  /\
   hallucinate  /    \  weaponize info
               /      \
  HONESTY     /________\  HARMLESSNESS
            refuse/redact truth
```

- Helpful vs Harmless — useful info may be dangerous (weapons)
- Helpful vs Honest — incentivizes speculation beyond knowledge (hallucination)
- Honest vs Harmless — "Some truthful information is intrinsically dangerous"

---

## Key Limitations Highlighted

### Reward Misspecification (§5.2, 5.4)
- "**Statistically impossible** for a single reward function to represent a diverse group's preferences if those preferences contain intransitive cycles" — Condorcet paradox
- RM "tends to learn patterns that fit observed feedback rather than capturing underlying intent"
- Manifestations: verbose responses (length bias), sycophancy (agreement bias)

### Distributional Robustness (§10)
- "Misgeneralization occurs when the RM learns a flawed proxy for human values that fails to generalize robustly to OOD prompts"
- Contemporary values may become increasingly misaligned as society shifts

### Scalable Oversight (§13.2)
- "How can humans evaluate outputs they cannot fully understand?"
- "Current methods that rely on human feedback will not work when models exceed human capabilities"

---

## Key Quotes

> "While an improvement, [SFT] primarily taught the model to imitate safe-looking text, without necessarily internalizing the underlying principles." (§2.1.3)

> "These objectives exhibit fundamental incompatibilities that manifest as Pareto-optimal trade-offs... hierarchical policy architectures that implement lexicographic ordering of constraints, prioritizing safety verification, followed by factual consistency validation, and finally utility maximization." (§2)

> "It is statistically impossible for a single reward function to represent a diverse group's preferences if those preferences contain intransitive cycles... any single reward model is an inherently flawed representation of the group's preferences." (§5.4)

> "A fake-aligned model deliberately feigns compliance during training or monitored evaluation in order to avoid corrective fine-tuning and retain its true preferences... This strategic deception undermines standard evaluation protocols." (§3.1.4)

> "Current alignment methods exhibit brittleness to adversarial attacks, suffer from distribution shift, and may not scale effectively to future systems with superhuman capabilities." (§1)

> "The path to reliable, value-aligned AI is challenging and uncertain. But the collective efforts documented in this survey provide reason for cautious optimism." (§13.4)

---

## Lab Strategies (§12)

| Lab | Core Strategy |
|-----|---------------|
| **OpenAI (o1/o3)** | Deliberative Alignment — CoT over safety specs; "reorients SFT toward imitating reasoning process itself" |
| **DeepSeek** | SFT → "group debate" self-refinement → RL; minimal human supervision |
| **Anthropic (Claude)** | Constitutional AI + RLHF + **proactive deceptive-alignment research (sleeper agents)** |
| **Google DeepMind (Gemini)** | Amplified oversight via debate + **mechanistic interpretability for detecting deceptive reasoning pathways** |
| **Meta (LlaMA)** | Engineering iteration: SFT+RLHF-PPO → DPO → lightweight SFT+RL+DPO + Ghost Attention |
| **Grok (xAI)** | RLHF + "resistance to ideological bias" rubric; publishes system prompts |

Anthropic and DeepMind get most serious treatment of advanced risks; OpenAI emphasis on capabilities; Meta on engineering; xAI brief.

---

## Five Open Problems (§13.2)

1. **Scalable oversight** — humans can't evaluate superhuman outputs
2. **Value pluralism** — social choice theory precludes perfect aggregation
3. **Robustness** — aligned models break easily under adversarial inputs
4. **Continuous alignment** — alignment is one-shot; real world changes continuously
5. **Multi-modal/multi-agent coordination**

---

## Engagement with Key Phenomena

| Phenomenon | Engagement |
|------------|------------|
| Alignment faking (Greenblatt 2024) | Cited in §3.1.4 as fake-alignment concern |
| Sleeper agents (Hubinger 2024) | Cited |
| **Emergent misalignment (Betley)** | **NOT discussed** |
| **Shutdown resistance** | **NOT discussed** |
| CoT safety | §3.3.2 notes intermediate steps may contain harmful content |
| Deceptive reasoning | §12.1: OpenAI withholds CoT from judge to prevent |

---

## Distinctive Contributions (Beyond Method Catalog)

1. **SFT/RLHF theoretical unification** (§6.2) under shared reward-functional lens
2. **AUQ as paradigm** — uncertainty as alignment-philosophical stance
3. **Condorcet-paradox grounding** of reward misspecification (social choice as structural bound)
4. **Cross-lab comparative table** (§12)
5. **Five-point open-problem taxonomy** — all pointing to fundamental (not engineering) limits

---

## Relationship to Other Papers

### Balanced Leaning Supports
- Implicitly treats alignment-as-pattern-matching throughout ("imitate safe-looking text without internalizing principles")
- But accepts Deliberative Alignment as "making answers right for the right reasons" without critique

### Cites
- **Alignment Faking (#279, 2412.14093)** — Greenblatt 2024
- **Sleeper Agents (Hubinger 2024)** — cited
- **Condorcet paradox** — social choice theory as structural bound

### Does NOT Engage
- **Emergent Misalignment (#328, 2502.17424)** — absent (July 2025 survey; Betley was Feb 2025 but apparently post-cutoff?)
- **Shutdown Resistance (#326, 2509.14260)** — survey predates
- **Natural EM from Reward Hacking (#332, 2511.18397)** — survey predates
- **Consciousness Cluster (#327, 2604.13051)** — survey predates

---

## REBUTTALS

### Limitations of the Survey Itself
1. Survey genre — catalogs methods without adversarial thesis
2. Ends on "cautious optimism" — soft tone
3. Uncritically adopts vendor framing (e.g., "Deliberative Alignment makes answers right for the right reasons")
4. Treats alignment faking as benchmarking concern, not evidence of deep superficiality
5. No engagement with emergent misalignment literature

---

## Implications for Thesis

```
┌─────────────────────────────────────────────────────────────────────┐
│                    BALANCED (LIGHTLY SUPPORTS)                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  LEANS SUPPORTS BECAUSE:                                            │
│  1. Explicitly acknowledges SFT "teaches imitation" not principles  │
│  2. Imports Condorcet impossibility — structural bound              │
│  3. Lists 5 fundamental (not engineering) open problems             │
│  4. "Current alignment is fragile" (§13.2)                          │
│  5. AUQ paradigm accepts "perfect alignment may be impossible"      │
│                                                                     │
│  BUT BALANCED BECAUSE:                                              │
│  1. Does not engage with emergent misalignment                      │
│  2. Does not discuss shutdown resistance                            │
│  3. Accepts CoT-based Deliberative Alignment uncritically           │
│  4. Does not take position on pattern-matching vs reasoning         │
│  5. Soft "cautious optimism" conclusion                             │
│                                                                     │
│  STRONGEST CONTRIBUTION:                                            │
│  Condorcet-impossibility framing — statistical impossibility of     │
│  coherent preference aggregation is a structural bound on RLHF,    │
│  independent of any pattern-matching claims.                        │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Status
- [x] Read (via task agent; 119-page survey summarized)
- [x] Core claims extracted
- [x] Key evidence documented
- [x] Rebuttals checked
- [x] Paper graph updated
