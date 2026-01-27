import json

import httpx

from discovery.models import Classification

THESIS = """LLM reasoning is practical but fundamentally predictive (pattern matching from 
training distributions), not genuinely generative. RL and test-time compute surface 
pre-existing capabilities rather than creating new reasoning abilities."""

CLASSIFICATION_PROMPT = """You are classifying academic papers for a literature review.

THESIS: {thesis}

Given this paper's title and abstract, provide a JSON response with:
- "relevant": boolean - Is this paper relevant to studying LLM reasoning capabilities?
- "stance": "SUPPORTS" | "CHALLENGES" | "BALANCED"
  - SUPPORTS = paper shows LLMs have limitations, fail at reasoning, or rely on pattern matching (supports thesis)
  - CHALLENGES = paper shows LLMs have genuine reasoning capabilities (challenges/rebuts thesis)
  - BALANCED = paper has mixed evidence or is neutral
- "priority": 1-10 - How important is this paper for the literature review?
- "why_read": string - One sentence explaining why this paper matters

PAPER TITLE: {title}

ABSTRACT: {abstract}

Respond with only valid JSON, no markdown."""

# Core reasoning keywords - must match at least one
REASONING_KEYWORDS = frozenset([
    "reasoning capability", "reasoning ability", "reasoning limitation",
    "chain of thought", "chain-of-thought", "cot faithfulness",
    "llm reasoning", "reasoning model", "test-time compute",
    "emergent reasoning", "compositional reasoning", "multi-step reasoning",
    "reasoning failure", "reasoning benchmark", "symbolic reasoning",
])

# LLM keywords - must match at least one
LLM_KEYWORDS = frozenset([
    "llm", "large language model", "language model", "gpt", "transformer",
    "reasoning model", "llama", "qwen", "deepseek",
])

# Keywords suggesting paper SUPPORTS thesis (LLMs have limitations)
SUPPORT_KEYWORDS = frozenset([
    "limitation", "failure", "illusion", "pattern matching", "memorization",
    "unfaithful", "hallucination", "brittleness", "fragility", "collapse",
    "out-of-distribution", "ood", "generalization failure",
])

# Keywords suggesting paper CHALLENGES thesis (LLMs can reason)
CHALLENGE_KEYWORDS = frozenset([
    "genuine reasoning", "emergent", "breakthrough", "novel capability",
    "true reasoning", "systematic generalization",
])

# Exclusion keywords - domain-specific applications that don't study reasoning
# Only exclude if paper is purely about applying LLMs to a domain
EXCLUDE_KEYWORDS = frozenset([
    "patient diagnosis", "clinical decision", "medical imaging",
    "legal retrieval", "statute retrieval", "court prediction",
    "stock prediction", "financial forecast", "trading strategy",
    "drug design", "molecule generation", "protein folding",
    "deepfake detection", "fake news detection",
    "autonomous driving", "uav navigation", "robot control",
    "emotion recognition", "sentiment analysis", "empathy dialogue",
    "data visualization", "dashboard generation",
])

API_URL = "https://models.github.ai/inference/chat/completions"


def classify_with_llm(
    client: httpx.Client, title: str, abstract: str, token: str
) -> Classification | None:
    prompt = CLASSIFICATION_PROMPT.format(thesis=THESIS, title=title, abstract=abstract)

    try:
        response = client.post(
            API_URL,
            headers={
                "Authorization": f"Bearer {token}",
                "Content-Type": "application/json",
            },
            json={
                "model": "openai/gpt-4.1-nano",
                "messages": [{"role": "user", "content": prompt}],
                "temperature": 0.1,
            },
        )
        response.raise_for_status()
        content = response.json()["choices"][0]["message"]["content"]
        content = content.strip().removeprefix("```json").removesuffix("```").strip()
        data = json.loads(content)

        return Classification(
            relevant=data.get("relevant", False),
            stance=data.get("stance", "BALANCED"),
            priority=min(max(data.get("priority", 5), 1), 10),
            why_read=data.get("why_read", ""),
            classified_by="llm",
        )
    except (httpx.HTTPError, json.JSONDecodeError, KeyError):
        return None


def classify_with_keywords(title: str, abstract: str) -> Classification:
    text = f"{title} {abstract}".lower()

    # Check for exclusion keywords first - domain-specific papers are not relevant
    has_exclusion = any(kw in text for kw in EXCLUDE_KEYWORDS)
    if has_exclusion:
        return Classification(
            relevant=False,
            stance="BALANCED",
            priority=1,
            why_read="Domain-specific application (excluded)",
            classified_by="keyword",
        )

    # Must have BOTH core reasoning keywords AND LLM keywords
    has_reasoning = any(kw in text for kw in REASONING_KEYWORDS)
    has_llm = any(kw in text for kw in LLM_KEYWORDS)
    relevant = has_reasoning and has_llm

    if not relevant:
        return Classification(
            relevant=False,
            stance="BALANCED",
            priority=1,
            why_read="Not directly about LLM reasoning capabilities",
            classified_by="keyword",
        )

    # Determine stance based on support/challenge keywords
    supports = sum(1 for kw in SUPPORT_KEYWORDS if kw in text)
    challenges = sum(1 for kw in CHALLENGE_KEYWORDS if kw in text)

    if supports > challenges:
        stance = "SUPPORTS"
    elif challenges > supports:
        stance = "CHALLENGES"
    else:
        stance = "BALANCED"

    # Lower priority for keyword matches (LLM classification is more reliable)
    priority = min(supports + challenges + 2, 5)

    return Classification(
        relevant=relevant,
        stance=stance,
        priority=priority,
        why_read="LLM reasoning paper (keyword match - verify relevance)",
        classified_by="keyword",
    )


def classify_paper(
    title: str, abstract: str, token: str | None, client: httpx.Client | None = None
) -> Classification:
    if token and client:
        result = classify_with_llm(client, title, abstract, token)
        if result:
            return result
    return classify_with_keywords(title, abstract)
