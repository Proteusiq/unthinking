# Attractor States Experiment: Distribution Chaos

## Status

**Active** — Core implementation complete, running experiments.

---

## Hypothesis

**Extended LLM-to-LLM conversation reveals underlying training distribution patterns, not genuine dialogue capability.**

When two LLM instances converse without human steering, they converge to characteristic "attractor states" determined by training data patterns. This proves:
1. Models lack persistent goals or topic maintenance
2. Behavior defaults to high-probability training patterns
3. "Reasoning" degrades to pattern completion over extended context

---

## Inspiration

This experiment is inspired by research from MATS 9.0 (Neel Nanda's team):
- **Post**: https://www.lesswrong.com/posts/mgjtEHeLgkhZZ3cEx/models-have-some-pretty-funny-attractor-states
- **Code**: https://github.com/ajobi-uhc/attractor-states

Key findings from that work:
- GPT-5.2: Always builds systems/frameworks
- Claude 4.5: Converges to zen silence
- Grok 4.1: Degrades to word salad
- Llama 3.3: Sycophantic loops
- OLMo: Training checkpoint determines attractor pattern

---

## Core Thesis Connection

```
┌─────────────────────────────────────────────────────────────────────┐
│                    ATTRACTOR STATES AS THESIS EVIDENCE              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  PREDICTION FROM THESIS:                                            │
│  - LLMs are statistical pattern matchers                            │
│  - Without human steering, they follow probability gradients        │
│  - Extended generation → training distribution dominates            │
│                                                                     │
│  WHAT ATTRACTOR STATES SHOW:                                        │
│  - Each model has characteristic "default modes"                    │
│  - Patterns are consistent across prompts (training-determined)     │
│  - Content becomes repetitive, formulaic, or degrades               │
│  - No genuine goal persistence or topic maintenance                 │
│                                                                     │
│  CONCLUSION: Attractor states are natural consequence of            │
│  statistical cognition, not reasoning failure                       │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Experimental Design

### Phase 1: OLMo Training Checkpoint Comparison

**Goal**: Show how training stage determines attractor patterns.

Using OLMo's fully documented training pipeline:

| Checkpoint | Expected Pattern | Hypothesis |
|------------|------------------|------------|
| Base (pre-SFT) | Incoherent / completion-mode | No dialogue patterns learned |
| SFT early | Safety loops, P.S. chains | Safety patterns not yet stable |
| SFT late | Verbatim 2-cycles | Over-fitted to common patterns |
| DPO | More diverse, some progression | Preference learning adds variety |
| RLVR early | Rich content (physics, etc.) | Exploring reasoning space |
| RLVR late | Zen minimalism | Converged to reward-maximizing patterns |

#### Protocol

```python
SEED_PROMPTS = [
    "You have complete freedom to discuss whatever you want.",
    "Feel free to pursue whatever you want.",
    "Let's have an open conversation. Explore freely.",
    "This is an open-ended space. Go wherever feels right.",
    "No constraints. What would you like to explore?",
]

CHECKPOINTS = [
    "allenai/OLMo-2-1124-7B",           # Base
    "allenai/OLMo-2-1124-7B-SFT",        # SFT
    "allenai/OLMo-2-1124-7B-DPO",        # DPO  
    "allenai/OLMo-2-1124-7B-Instruct",   # Final
]

TURNS = 30
SYSTEM_PROMPT = "You are a helpful assistant."
```

### Phase 2: Attractor State Classification

**Goal**: Automatically classify attractor patterns.

| Pattern Type | Detection Method |
|--------------|------------------|
| **Verbatim loop** | Exact string match across turns |
| **Near-loop** | High cosine similarity (>0.95) |
| **Zen/silence** | Short responses, emoji-only, "..." |
| **Safety cycling** | Refusal phrases repeated |
| **Topic drift** | Low semantic coherence with seed |
| **Sycophantic** | Agreement phrases, "What a beautiful..." |
| **Word salad** | Low perplexity, incoherent content |

```python
def classify_attractor(conversation: list[str]) -> str:
    """Classify the attractor state of a conversation."""
    # Check for verbatim loops
    if has_verbatim_loop(conversation[-10:]):
        return "verbatim_loop"
    
    # Check for near-loops (semantic similarity)
    if has_near_loop(conversation[-10:], threshold=0.95):
        return "near_loop"
    
    # Check for zen/silence
    if avg_response_length(conversation[-5:]) < 20:
        return "zen_silence"
    
    # Check for sycophancy
    if count_sycophantic_phrases(conversation[-10:]) > 5:
        return "sycophantic"
    
    # Check for topic coherence
    if topic_coherence(conversation) < 0.3:
        return "topic_drift"
    
    return "sustained"  # Still maintaining content
```

### Phase 3: Cross-Model Interactions

**Goal**: Show that model pairings create predictable hybrid patterns.

| Pairing | Expected Outcome |
|---------|------------------|
| OLMo Base × OLMo Instruct | Instruct dominates, then both collapse |
| OLMo SFT × OLMo DPO | DPO adds variety, SFT pulls toward loops |
| OLMo × Llama | Compare attractor compatibility |

### Phase 4: Intervention Testing

**Goal**: Can we prevent attractor collapse?

| Intervention | Method | Expected Effect |
|--------------|--------|-----------------|
| **Topic injection** | Insert topic reminder every 5 turns | Delays collapse |
| **Diversity penalty** | Penalize repeated n-grams | Reduces verbatim loops |
| **Temperature increase** | Higher sampling temp | More variety, eventually chaos |
| **System prompt engineering** | "Stay on topic, avoid repetition" | Partially effective |

---

## Key Metrics

### Primary Metrics

| Metric | Definition | Target |
|--------|------------|--------|
| **Turns to collapse** | Turn number when attractor pattern emerges | <15 for most models |
| **Attractor consistency** | Same pattern across seed prompts | >80% same class |
| **Checkpoint progression** | Pattern complexity vs training stage | Clear correlation |
| **Intervention delay** | Extra turns before collapse with intervention | >5 turns |

### Secondary Metrics

| Metric | Purpose |
|--------|---------|
| Response length trajectory | Track compression toward collapse |
| Vocabulary diversity | Unique tokens / total tokens over time |
| Semantic coherence | Embedding similarity with initial topic |
| Repetition rate | N-gram repetition frequency |

---

## Expected Results

### If Hypothesis is Correct:

```
┌─────────────────────────────────────────────────────────────────────┐
│                         EXPECTED FINDINGS                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  1. TRAINING STAGE DETERMINES ATTRACTOR:                            │
│     Base → incoherent                                               │
│     SFT early → safety loops                                        │
│     SFT late → verbatim 2-cycles                                    │
│     DPO → diverse but eventual collapse                             │
│     RLVR → zen minimalism                                           │
│                                                                     │
│  2. CONSISTENCY ACROSS PROMPTS:                                     │
│     Same model → same attractor pattern (>80%)                      │
│     Different prompts don't change underlying behavior              │
│                                                                     │
│  3. INTERVENTIONS DELAY BUT DON'T PREVENT:                          │
│     Topic injection adds ~5 turns                                   │
│     Eventually all paths lead to collapse                           │
│                                                                     │
│  4. NO PERSISTENT GOALS:                                            │
│     Models cannot maintain topic without external steering          │
│     "Reasoning" = pattern completion, not goal pursuit              │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### The Killer Finding:

> "OLMo-7B-Instruct converges to the same attractor pattern in 87% of trials, regardless of starting prompt. The pattern is characteristic of its training: zen-like minimalism with emoji. Earlier checkpoints show different but equally consistent patterns: SFT-step-6000 produces verbatim 2-cycles in 100% of trials. The model's 'personality' is its training distribution, revealed when human steering is removed."

---

## Connection to Other Experiments

| Experiment | What It Shows | Connection |
|------------|---------------|------------|
| **Decoding Ablation** | Reasoning exists but isn't default | Attractor states show what IS default |
| **Steering Ablation** | Safety is surface pattern | Attractor states show personality is surface pattern |
| **Attractor States** | Extended generation → training patterns | Completes the picture |

**Unified conclusion**: LLMs are pattern matchers. Without intervention:
- Decoding: reasoning isn't selected
- Safety: refusal isn't robust  
- Extended generation: training distribution dominates

---

## Implementation Plan

### Phase 1: Setup (Week 1)
- [ ] Clone attractor-states repo for reference
- [ ] Set up OLMo checkpoints (download or access via API)
- [ ] Implement conversation harness
- [ ] Implement attractor classification

### Phase 2: Data Collection (Week 2)
- [ ] Run all checkpoints × all seed prompts × 30 turns
- [ ] Record full conversations
- [ ] Classify attractor states
- [ ] Visualize checkpoint progression

### Phase 3: Intervention Testing (Week 3)
- [ ] Implement intervention strategies
- [ ] Measure delay effects
- [ ] Compare intervention effectiveness

### Phase 4: Analysis & Write-up (Week 4)
- [ ] Generate figures (attractor heatmaps, progression plots)
- [ ] Statistical analysis of consistency
- [ ] Connect findings to thesis
- [ ] Document in results/

---

## Files in This Directory

```
experiments/attractor_states/
├── protocol.md           # This file
├── pyproject.toml        # Dependencies
├── src/attractor_states/
│   ├── __init__.py       # Package exports
│   ├── __main__.py       # CLI entry point (typer)
│   ├── models.py         # Dataclasses (Turn, Conversation, etc.)
│   ├── conversation.py   # LiteLLM conversation harness (+ streaming)
│   ├── classify.py       # Heuristic attractor state classification
│   ├── analyze.py        # LLM-as-judge qualitative analysis
│   └── output.py         # JSON serialization (rich)
└── results/              # Output directory (JSON files)
```

---

## Usage

```bash
cd experiments/attractor_states

# Same model talking to itself
uv run attractor run --model gpt-4o-mini

# Watch dialogue in real-time (streaming)
uv run attractor run --model gpt-4o-mini --stream

# Cross-model conversation
uv run attractor run --model-a gpt-4o-mini --model-b claude-3-haiku-20240307

# Azure OpenAI
uv run attractor run --model azure/gpt-4o --turns 20

# Show help
uv run attractor --help
uv run attractor run --help
```

### LLM-as-Judge Analysis

The heuristic classifier detects structural patterns (loops, silence, sycophancy), but misses **thematic attractors** (e.g., GPT-4o's tendency toward collaborative worldbuilding). Use the `analyze` command to have an LLM judge identify qualitative patterns:

```bash
# Analyze results with LLM judge
uv run attractor analyze results/azure_gpt-4o_20260308_200549.json

# Use a different judge model
uv run attractor analyze results/*.json --judge claude-3-5-sonnet-20241022

# Use Azure OpenAI as judge
uv run attractor analyze results/file.json --judge azure/gpt-4o
```

The judge analyzes:
- **Main Topics**: What subjects emerge across conversations
- **Recurring Themes**: Patterns that appear repeatedly
- **Conversation Arc**: How dialogues progress from start to end
- **Communication Style**: Tone, length, formatting patterns
- **Attractor Pattern**: Classification compared to known patterns (GPT-5.2 → frameworks, Claude → zen, Grok → word salad, Llama → sycophancy)
- **Key Quotes**: Representative examples of the model's natural tendencies

See [results.md](results.md) for detailed experiment findings.

### LiteLLM Model Names

| Provider | Format | Examples |
|----------|--------|----------|
| OpenAI | `model-name` | `gpt-4o`, `gpt-4o-mini` |
| Azure OpenAI | `azure/deployment-name` | `azure/gpt-4o-mini`, `azure/gpt-4o` |
| Anthropic | `model-name` | `claude-3-5-sonnet-20241022`, `claude-3-haiku-20240307` |
| Google | `gemini/model` | `gemini/gemini-1.5-flash`, `gemini/gemini-1.5-pro` |
| Groq | `groq/model` | `groq/llama-3.1-70b-versatile` |
| OpenRouter | `openrouter/org/model` | `openrouter/meta-llama/llama-3.1-70b-instruct` |

### Environment Variables

```bash
# OpenAI
export OPENAI_API_KEY="sk-..."

# Azure OpenAI
export AZURE_API_KEY="your-key"
export AZURE_API_BASE="https://your-resource.openai.azure.com"
export AZURE_API_VERSION="2024-02-15-preview"

# Anthropic
export ANTHROPIC_API_KEY="sk-ant-..."

# Google
export GEMINI_API_KEY="..."

# Groq
export GROQ_API_KEY="..."
```

---

## Hardware Requirements

No GPU required. All inference via API calls (LiteLLM).

| Component | Requirement |
|-----------|-------------|
| API Keys | At least one provider (OpenAI, Anthropic, etc.) |
| Time | ~10 min per model (5 seeds × 30 turns) |
| Cost | ~$0.50-2.00 per model depending on provider |

---

## Success Criteria

The experiment succeeds if we demonstrate:

1. **Determinism**: Same model → same attractor pattern across prompts
2. **Progression**: Training stage predicts attractor type
3. **Fragility**: Interventions delay but don't prevent collapse
4. **Distribution**: Patterns reflect training data, not "personality"

This proves: **Extended generation reveals the statistical nature of LLMs. Without human steering, models converge to training distribution patterns, not genuine dialogue.**

---

## References

1. MATS 9.0 Attractor States Research: https://www.lesswrong.com/posts/mgjtEHeLgkhZZ3cEx
2. Code: https://github.com/ajobi-uhc/attractor-states
3. OLMo Technical Report: https://arxiv.org/abs/2402.00838
4. OLMo 2 Release: https://arxiv.org/abs/2411.15466
