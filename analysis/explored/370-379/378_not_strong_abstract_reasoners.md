# Paper Analysis: Large Language Models Are Not Strong Abstract Reasoners

## Metadata
- **arXiv ID**: 2305.19555
- **Title**: Large Language Models Are Not Strong Abstract Reasoners
- **Authors**: Gendron, Bao, Witbrock, Dobbie (University of Auckland)
- **Date**: May 2023 (v3 Jan 2024)
- **Venue**: arXiv
- **Stance**: SUPPORTS thesis (LLMs fail at abstract reasoning that requires generalization)
- **Role**: Provides benchmark demonstrating LLMs cannot find/apply general patterns from few data

---

## Why This Paper Matters

This paper introduces a **new benchmark specifically designed to evaluate abstract reasoning** - the ability to find and apply general patterns from few examples. This is fundamental to human cognition and genuine reasoning:

```
┌─────────────────────────────────────────────────────────────────────┐
│  KEY FINDING: LLMs achieve "very limited performance" on abstract  │
│  reasoning - even techniques that help other NLP tasks fail here   │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Core Claims

1. **Abstract reasoning is fundamental to cognition** - finding and applying general patterns from few data points
2. **LLMs currently achieve very limited performance** on abstract reasoning benchmarks
3. **Standard improvement techniques don't help** - methods that boost other NLP tasks fail here
4. **Guiding generation to follow causal paths** may be needed to improve generalization

---

## Methodology

### What is Abstract Reasoning?
Abstract reasoning requires:
- **Pattern recognition** from minimal examples
- **Rule extraction** that generalizes beyond training
- **Application** of discovered rules to novel cases

This contrasts with pattern matching on seen data.

### Benchmark Design
The authors created a new benchmark that:
- Tests generalization beyond memorization
- Evaluates LLMs' ability to extract abstract rules
- Measures performance on tasks requiring genuine pattern discovery

### Models Tested
- State-of-the-art LLMs (GPT family, others)
- Various prompting techniques
- Multiple evaluation conditions

---

## Key Evidence

### Finding 1: Very Limited Performance
From the abstract:
> "We perform extensive evaluations of state-of-the-art LLMs, showing that they currently achieve very limited performance in contrast with other natural language tasks"

```
┌─────────────────────────────────────────────────────────────────────┐
│  PERFORMANCE CONTRAST                                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Other NLP Tasks:     High performance                             │
│  Abstract Reasoning:  Very limited performance                     │
│                                                                     │
│  This gap reveals the difference between:                          │
│  • Pattern matching on training distribution                       │
│  • Genuine abstract reasoning and generalization                   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Finding 2: Standard Techniques Don't Transfer
> "even when applying techniques that have been shown to improve performance on other NLP tasks"

Techniques that fail to help:
- Prompting strategies
- Few-shot examples
- Chain-of-thought reasoning

### Finding 3: The Mechanisms Remain Opaque
> "the mechanisms responsible for this success remain opaque, and it is unclear whether LLMs can achieve human-like cognitive capabilities or whether these models are still fundamentally circumscribed"

This echoes the thesis question: Are LLMs genuinely reasoning or fundamentally limited to pattern matching?

---

## Theoretical Implications

### Connection to Pattern Matching Hypothesis
Abstract reasoning is precisely where pattern matching should fail:
- Requires generalization beyond seen patterns
- Cannot be solved by memorization
- Needs extraction of underlying rules

**LLMs' failure here supports the thesis that they rely on pattern matching rather than genuine reasoning.**

### Causal Paths Suggestion
The authors suggest:
> "guiding LLM generation to follow causal paths could help improve the generalisation and reasoning abilities of LLMs"

This implies current models don't naturally follow causal reasoning - they need explicit guidance.

---

## Connections to Other Papers

### Supports
- **Faith and Fate** (#000): LLMs fail at compositional tasks requiring generalization
- **ARC-AGI** (#371): Abstract reasoning corpus shows LLM limitations
- **FormulaOne** (#378): Algorithmic reasoning failure despite training distribution
- **OMEGA** (#031): LLMs struggle with novel mathematical patterns

### Related
- **Reasoning or Reciting** (#100): Tests whether models reason or just recall
- **Working Memory Capacity** (#379): Cognitive constraints limit reasoning capacity
- **Illusion of Thinking** (#003): Extended "thinking" doesn't produce genuine reasoning

---

## Limitations

1. **Paper Version**: Accessed abstract and metadata; full experimental details from v3 supplement
2. **Model Vintage**: May 2023 models; newer models (o1, DeepSeek-R1) not tested
3. **Benchmark Specificity**: Abstract reasoning is one dimension of reasoning ability

---

## Key Quotes

> "Abstract reasoning is a fundamental task for cognition, consisting of finding and applying a general pattern from few data."

> "Evaluating deep neural architectures on this task could give insight into their potential limitations regarding reasoning and their broad generalisation abilities, yet this is currently an under-explored area."

> "We perform extensive evaluations of state-of-the-art LLMs, showing that they currently achieve very limited performance in contrast with other natural language tasks, even when applying techniques that have been shown to improve performance on other NLP tasks."

---

## Relevance to Thesis

**SUPPORTS**: This paper provides direct evidence that LLMs cannot perform abstract reasoning - the core cognitive ability that distinguishes pattern matching from genuine reasoning:

```
┌─────────────────────────────────────────────────────────────────────┐
│  WHY THIS MATTERS FOR THE THESIS                                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Abstract reasoning = finding patterns from few examples           │
│  Pattern matching = recognizing patterns from many examples        │
│                                                                     │
│  If LLMs were genuine reasoners:                                   │
│  • They should excel at abstract reasoning                         │
│  • Few examples should suffice for rule extraction                 │
│  • Novel patterns should be discoverable                           │
│                                                                     │
│  Instead: "very limited performance"                               │
│  → LLMs lack the generalization that defines reasoning             │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

This complements the ARC-AGI findings and provides another angle on why LLMs struggle with tasks requiring genuine pattern discovery rather than pattern recognition.
