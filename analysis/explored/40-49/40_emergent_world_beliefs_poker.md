# Paper Analysis: Emergent World Beliefs: Exploring Transformers in Stochastic Games

## Metadata
- **arXiv ID**: 2512.23722
- **Title**: Emergent World Beliefs: Exploring Transformers in Stochastic Games
- **Authors**: Adam Kamel, Tanish Rastogi, Michael Ma, Kailash Ranganathan, Kevin Zhu
- **Date**: December 2025
- **Venue**: arXiv (Algoverse AI Research)

---

## Core Claims

1. **GPT-style model trained on poker develops internal "world model"** — represents both deterministic (hand rank) and stochastic (equity) features
2. **Representations emerge without explicit instruction** — learned from next-token prediction alone
3. **Linear/MLP probes can decode internal states** — hand rank (~98% MLP accuracy), equity (r=0.59 correlation)
4. **Model encodes "belief states" for POMDP** — internal representations correlate with theoretical belief states
5. **Extends Othello/Chess world model findings to incomplete information games**

---

## Methodology

### Setup
- **Model**: GPT-2 base (87M params, 12 attention heads, 768 hidden dim)
- **Training data**: 2M+ synthetic poker trajectories in Poker Hand History (PHH) format
- **Game**: 6-player No-Limit Texas Hold'em

### Data Generation (CRITICAL)
- Agents use **simulation-based equity estimates** to make decisions
- Agent behavior driven by: propensity to raise, tightness to equity, bluff frequency, etc.
- **Equity information is encoded in agent behavior** — not purely emergent

### Probing
- Linear classifier probe: W·x
- Two-layer MLP probe: W₁·ReLU(W₂·x)
- Targets: hand rank (deterministic), equity (stochastic)

---

## Key Evidence

### Deterministic World Model (Hand Rank)

| Probe Type | Accuracy | Notes |
|------------|----------|-------|
| Linear probe | ~80% | Decent but not perfect |
| MLP probe | ~98% | High accuracy with nonlinearity |

### Stochastic World Model (Equity)

| Metric | Value | Notes |
|--------|-------|-------|
| Correlation coefficient | **r = 0.59** | Moderate correlation |
| R² across layers | Highest in layers 0-4, decreases deeper | Information bottleneck pattern |

### Activation Maps
- t-SNE/UMAP show distinct clusters by hand rank
- Multiple clusters per rank (e.g., different types of pairs)
- Suggests internal organization by rank/strength

---

## Critical Assessment

### Strengths
1. Novel extension to incomplete information games (POMDP)
2. Shows *some* internal structure correlated with game state
3. Probing methodology is standard and reasonable

### Weaknesses (CRITICAL)

1. **Equity was in training signal**
   - Agents were driven by "simulation equity estimates"
   - Model learned to predict actions *conditioned on equity*
   - Not truly emergent — information was in the data

2. **Small model, constrained domain**
   - GPT-2 base (87M) — not LLM-scale
   - Poker is highly structured with known optimal strategies
   - Cannot generalize to open-ended reasoning

3. **r=0.59 is moderate, not strong**
   - 35% of variance explained
   - Far from "accurate world model"
   - Could be spurious correlations

4. **No OOD generalization tested**
   - All evaluation in-distribution
   - No test of novel scenarios or rule changes
   - No compositional generalization

5. **Synthetic data only**
   - Authors: "no large and complete poker hand datasets available"
   - Training data may have artifacts from generation process

6. **Linear probe caveat**
   - Linear probes can find spurious correlations
   - High probe accuracy ≠ model uses that information causally
   - No causal intervention experiments shown

### Authors' Own Limitations
> "No guarantees that current results regarding LLM beliefs of the Poker POMDP are able to be extended... to novel domains."

> "Dataset size remains a core limitation"

> "The process for generating data may be overly simplified"

---

## Relationship to Other Papers

### Potentially Supports
- **Othello/Chess world model papers**: Extends paradigm to POMDP
- **Emergent Symbolic Mechanisms (2502.20332)**: Evidence for internal representations

### Challenged By
- **Planning Gap (2601.14456)**: World models don't transfer OOD
- **OMEGA (2506.18880)**: Compositional generalization fails
- **Faith and Fate (2305.18654)**: Probed features may not be causally used

### Key Difference from the Thesis
This paper shows models can learn **statistical correlations** within a domain. The thesis doesn't deny this — it claims:
1. These correlations are from training distribution (✓ confirmed — equity was in training)
2. They don't generalize compositionally (not tested here)
3. Pattern matching is sufficient explanation (not rebutted)

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
- No direct rebuttals found (recent paper)
- Othello world model work has been challenged on causal validity

### Potential Counter-Arguments

1. **Probe-training confound**: High probe accuracy may reflect probe capacity, not model understanding
2. **Training data leakage**: Equity was in the training signal via agent behavior — not emergent
3. **Domain specificity**: Poker has known structure; doesn't generalize to unstructured reasoning
4. **No causal evidence**: Paper doesn't show model *uses* these representations causally

### Limitations (Authors Acknowledge)
- Dataset size
- Synthetic data artifacts
- Limited to poker domain
- No extension guarantees

---

## Key Quotes

> "Our results demonstrate that the model learns both deterministic structure, such as hand ranks, and stochastic features, such as equity, without explicit instruction."

> "We were able to achieve a correlation coefficient of 0.59 on our test dataset predictions"

> "There are no guarantees that current results regarding LLM beliefs of the Poker POMDP are able to be extended to analysis of new stochastic poker variables, or to novel domains."

> "Dataset size remains a core limitation... The size of our dataset impacts the model accuracy on its task as well as results obtained from probes."

---

## Relevance to Thesis

**BALANCED — Does not rebut thesis**

This paper shows:
1. ✓ Models can learn correlations within structured domain — we don't deny this
2. ✗ Equity was in training data (agent behavior) — not truly emergent
3. ✗ No OOD/compositional generalization tested
4. ✗ r=0.59 is moderate, not proof of world model
5. ✗ Small model, constrained domain, synthetic data

**Key point**: The thesis claims LLM reasoning is "predictive from training distribution" — this paper provides evidence *consistent* with that view:
- Model learned to predict in-distribution poker outcomes
- No evidence it would generalize to novel poker variants or other domains
- Equity information was embedded in training data via agent behavior

This is a well-executed probing study, but it doesn't challenge the core thesis. It shows statistical learning within a domain, which is expected and consistent with pattern matching.

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] **Rebuttals checked**
- [x] Paper graph updated

---

## Verdict: BALANCED (does not rebut thesis)
