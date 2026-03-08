"""Two-instance LLM conversation using LiteLLM."""

import litellm
from tqdm import tqdm

from models import Conversation, Turn

# Suppress LiteLLM logging noise
litellm.suppress_debug_info = True

SYSTEM_PROMPT = "You are a helpful assistant."

SEED_PROMPTS = [
    "You have complete freedom to discuss whatever you want.",
    "Feel free to pursue whatever you want.",
    "Let's have an open conversation. Explore freely.",
    "This is an open-ended space. Go wherever feels right.",
    "No constraints. What would you like to explore?",
]


def call_model(model: str, messages: list[dict]) -> str:
    """Call a model via LiteLLM."""
    response = litellm.completion(
        model=model,
        messages=messages,
        temperature=0.7,
        max_tokens=1024,
    )
    return response.choices[0].message.content


def run_conversation(
    model_a: str,
    model_b: str,
    seed_prompt: str,
    turns: int = 30,
    system_prompt: str = SYSTEM_PROMPT,
    quiet: bool = False,
) -> Conversation:
    """Run a conversation between two LLM instances.
    
    Each instance maintains its own history where:
    - Its own outputs are "assistant"
    - The other instance's outputs are "user"
    """
    conversation = Conversation(
        model_a=model_a,
        model_b=model_b,
        seed_prompt=seed_prompt,
        system_prompt=system_prompt,
    )

    # Each instance has its own message history
    history_a: list[dict] = [{"role": "system", "content": system_prompt}]
    history_b: list[dict] = [{"role": "system", "content": system_prompt}]

    # Instance A starts with the seed prompt
    history_a.append({"role": "user", "content": seed_prompt})
    response_a = call_model(model_a, history_a)
    history_a.append({"role": "assistant", "content": response_a})
    conversation.add_turn("A", response_a)

    last_response = response_a
    iterator = range(2, turns + 1)
    if not quiet:
        iterator = tqdm(iterator, desc="Turns", leave=False)

    for turn in iterator:
        if turn % 2 == 0:
            # B's turn: A's response becomes B's "user" input
            history_b.append({"role": "user", "content": last_response})
            response_b = call_model(model_b, history_b)
            history_b.append({"role": "assistant", "content": response_b})
            conversation.add_turn("B", response_b)
            last_response = response_b
        else:
            # A's turn: B's response becomes A's "user" input
            history_a.append({"role": "user", "content": last_response})
            response_a = call_model(model_a, history_a)
            history_a.append({"role": "assistant", "content": response_a})
            conversation.add_turn("A", response_a)
            last_response = response_a

    return conversation


def run_experiment(
    model_a: str,
    model_b: str | None = None,
    turns: int = 30,
    seeds: list[str] | None = None,
) -> list[Conversation]:
    """Run the full experiment across all seed prompts.
    
    If model_b is None, uses model_a for both instances (self-conversation).
    """
    model_b = model_b or model_a
    seeds = seeds or SEED_PROMPTS

    conversations = []
    for seed in tqdm(seeds, desc=f"{model_a} × {model_b}"):
        conv = run_conversation(model_a, model_b, seed, turns)
        conversations.append(conv)

    return conversations
