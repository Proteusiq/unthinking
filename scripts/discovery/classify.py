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

REASONING_KEYWORDS = frozenset(
    ["reasoning", "chain of thought", "cot", "thinking", "inference"]
)
LLM_KEYWORDS = frozenset(
    ["llm", "large language model", "language model", "gpt", "transformer"]
)
SUPPORT_KEYWORDS = frozenset(
    ["limitation", "failure", "illusion", "pattern matching", "memorization"]
)
CHALLENGE_KEYWORDS = frozenset(
    ["genuine reasoning", "emergence", "breakthrough", "capability"]
)

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

    has_reasoning = any(kw in text for kw in REASONING_KEYWORDS)
    has_llm = any(kw in text for kw in LLM_KEYWORDS)
    relevant = has_reasoning and has_llm

    supports = sum(1 for kw in SUPPORT_KEYWORDS if kw in text)
    challenges = sum(1 for kw in CHALLENGE_KEYWORDS if kw in text)

    if supports > challenges:
        stance = "SUPPORTS"
    elif challenges > supports:
        stance = "CHALLENGES"
    else:
        stance = "BALANCED"

    priority = min(supports + challenges + (2 if relevant else 0), 10)

    return Classification(
        relevant=relevant,
        stance=stance,
        priority=priority,
        why_read="General reasoning paper (keyword match)",
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
