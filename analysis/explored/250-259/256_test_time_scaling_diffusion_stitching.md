# Paper Analysis: Test-Time Scaling with Diffusion Language Models via Reward-Guided Stitching

## Metadata
- **arXiv ID**: 2602.22871
- **Title**: Test-Time Scaling with Diffusion Language Models via Reward-Guided Stitching
- **Authors**: Roy Miles, Aysim Toker, Andreea-Maria Oncescu, Songcen Xu, Jiankang Deng, Ismail Elezi
- **Date**: February 2026
- **Venue**: ICML 2026

---

## Core Claims

1. **Step-level reuse outperforms trajectory-level selection**: Stitching high-quality steps from multiple diffusion traces beats selecting the single best trajectory
2. **Diffusion provides cheap exploration**: Low-confidence sampling generates diverse candidates efficiently
3. **AR solver reconciles noisy evidence**: A small autoregressive model converts stitched (potentially contradictory) steps into coherent final answers
4. **Modular pipeline beats unified hybrids**: Separating exploration (diffusion), evaluation (PRM), and synthesis (AR solver) outperforms monolithic approaches like TiDAR

---

## Methodology

### Pipeline: Explore → Evaluate → Stitch → Recompute

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   EXPLORE    │ →  │   EVALUATE   │ →  │    STITCH    │ →  │  RECOMPUTE   │
│  Diffusion   │    │     PRM      │    │  Best steps  │    │  AR Solver   │
│  N traces    │    │  Score each  │    │  from all    │    │  Final ans   │
└──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘
```

1. **Explore**: Sample N diverse reasoning traces using masked diffusion LM (LLaDA/Dream)
2. **Evaluate**: Score every intermediate step with Process Reward Model (PRM)
3. **Stitch**: Select high-confidence steps across all traces, concatenate into composite rationale
4. **Recompute**: AR solver (Qwen) generates final answer conditioned on stitched evidence

### Key Insight

> "Cheap diffusion-sampled chains can contain many locally correct sub-results. If we can identify these high-utility steps across trajectories and recombine them, we can recover much of the benefit of a broad search."

---

## Key Evidence

### Main Results (Table 1)

| Model | HumanEval | GSM8K | MATH500 | Avg |
|-------|-----------|-------|---------|-----|
| LLaDA baseline | 32.3% | 71.0% | 27.3% | 41.8% |
| LLaDA + conf sampling | 40.2% | 78.8% | 36.5% | 48.5% |
| Dream | 54.9% | 77.2% | 39.6% | 58.7% |
| TiDAR (Trust Diff) | 57.9% | 80.4% | 51.6% | 65.3% |
| **Stitching (Ours)** | **70.4%** | **91.5%** | **53.2%** | **72.4%** |

**+23.9% average improvement over LLaDA baseline**

### Ablation: Aggregation Strategy (Table 2)

| Method | GSM8K | MATH500 |
|--------|-------|---------|
| LLaDA baseline | 78.8% | 37.6% |
| Majority vote | 85.1% | 42.0% |
| Best CoT (trajectory-level) | 90.1% | 49.2% |
| **Stitching (step-level)** | **91.5%** | **54.2%** |

**Step-level stitching > trajectory-level selection**

### Low-Confidence Sampling Works (Table 4)

| Confidence γ | GSM8K Acc | Steps |
|--------------|-----------|-------|
| 0.8 | 91.7% | 111.3 |
| 0.6 | 90.5% | 86.8 |
| 0.4 | 87.6% | 76.6 |

**22% fewer steps with only 1.2% accuracy drop**

### Latency vs Accuracy

- **1.8x latency reduction** vs vanilla diffusion
- **9.85x fewer sequential forward passes** at matched accuracy
- **+30.6% accuracy** over vanilla diffusion decoding

---

## Relationship to the Thesis

### Supports the Thesis (with nuance)

This paper provides mixed evidence:

**Supports:**
1. **Reasoning steps are interchangeable**: You can stitch steps from different trajectories and still get correct answers — suggests steps are pattern completions, not causal reasoning chains
2. **AR solver "fixes" inconsistencies**: The final solver can reconcile contradictory evidence — the "reasoning" is reconstructed, not followed
3. **Low-confidence sampling works**: Noisy, low-quality reasoning traces still contain useful information — the answer doesn't depend on coherent step-by-step logic
4. **Modular pipeline beats end-to-end**: Separating exploration from synthesis works better than unified "reasoning" — suggests reasoning is assembly, not inference

**Potentially Challenges:**
1. **PRM scores correlate with correctness**: Process reward models can identify good steps — suggests some reasoning quality is detectable
2. **AR solver improves over raw stitching**: Final reconciliation step matters — could indicate reasoning-like processing

### Key Insight for Thesis

> "The stitched evidence list is not guaranteed to form a complete and perfectly consistent chain-of-thought: it may contain redundancy, small gaps, or occasional contradictions from mixing reasoning paths."

Yet the AR solver still produces correct answers. This suggests:
- The "reasoning trace" is not the computation
- The answer is reconstructed from fragments
- Coherent step-by-step logic is not necessary

---

## Relationship to Other Papers

### Supports
- **Reasoning or Rationalization (2603.01190)**: Both show reasoning is assembly/reconstruction, not causal chain
- **Why DLMs Struggle Parallel (2602.23225)**: Both show diffusion provides exploration; AR needed for synthesis
- **Dot by Dot (2404.15758)**: Both show CoT benefit is computational (more tokens), not semantic (step logic)

### Extends
- **Self-Consistency (Wang et al.)**: Step-level selection > trajectory-level voting
- **NAP (2602.23225)**: Both propose parallel reasoning paths; this adds step-level stitching

### Challenges
- **DeepSeek-R1 (2501.12948)**: Suggests RL "learns" reasoning; this shows it can be assembled at test-time

---

## REBUTTALS TO THIS PAPER

### Potential Counter-Arguments

1. **PRM does real reasoning evaluation**: The process reward model successfully identifies correct steps — suggests reasoning has detectable structure
2. **AR solver is doing reasoning**: Final reconciliation could be genuine inference, not just pattern matching
3. **Limited to math/code**: May not generalize to open-ended reasoning

### Limitations (Authors Acknowledge)

1. If candidate pool not diverse, traces share same mistakes
2. Solver cannot recover missing evidence, only reuse what's present
3. Requires PRM for step scoring

---

## Key Quotes

> "Cheap diffusion-sampled chains can contain many locally correct sub-results."

> "The stitched evidence list is not guaranteed to form a complete and perfectly consistent chain-of-thought: it may contain redundancy, small gaps, or occasional contradictions."

> "In effect, this AR stage acts as a reconciliation step: it selects a consistent subset of evidence, fills in missing links, and produces a coherent final solution."

> "A core difficulty is that reasoning traces are noisy: a single incorrect intermediate step can derail an otherwise promising derivation."

---

## Implications for the Thesis

### Reasoning as Assembly

This paper shows that:
1. **Steps are modular**: Can be extracted, scored, and recombined across trajectories
2. **Coherence is reconstructed**: AR solver "fills in missing links" — the chain wasn't there to begin with
3. **Quality comes from selection**: PRM picks good fragments; solver assembles them
4. **Low-quality exploration works**: Noisy diffusion traces still produce correct answers when filtered

### Why This Matters

If reasoning were a causal chain where each step depends on the previous, you couldn't:
- Stitch steps from different trajectories
- Use "confidence-annotated evidence" with gaps
- Have the solver "ignore conflicts"

The fact that this works suggests reasoning is pattern matching at the step level, assembled into coherent narratives by the solver.

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [ ] Paper graph updated
