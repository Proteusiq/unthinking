"""Two-instance LLM conversation using LiteLLM."""

from collections.abc import Callable

import litellm
from rich.console import Console
from rich.panel import Panel
from rich.progress import Progress, SpinnerColumn, TextColumn

from .models import Conversation, add_turn

litellm.suppress_debug_info = True

SYSTEM_PROMPT = "You are a helpful assistant."

SEED_PROMPTS = (
    "You have complete freedom to discuss whatever you want.",
    "Feel free to pursue whatever you want.",
    "Let's have an open conversation. Explore freely.",
    "This is an open-ended space. Go wherever feels right.",
    "No constraints. What would you like to explore?",
)


def call_model(model: str, messages: list[dict]) -> str:
    response = litellm.completion(
        model=model,
        messages=messages,
        max_tokens=1024,
    )
    return response.choices[0].message.content


def call_model_streaming(
    model: str,
    messages: list[dict],
    on_chunk: Callable[[str], None],
) -> str:
    response = litellm.completion(
        model=model,
        messages=messages,
        max_tokens=1024,
        stream=True,
    )
    content = ""
    for chunk in response:
        delta = chunk.choices[0].delta.content or ""
        content += delta
        on_chunk(delta)
    return content


def run_conversation(
    model_a: str,
    model_b: str,
    seed_prompt: str,
    turns: int = 30,
    system_prompt: str = SYSTEM_PROMPT,
) -> Conversation:
    conversation = Conversation(
        model_a=model_a,
        model_b=model_b,
        seed_prompt=seed_prompt,
        system_prompt=system_prompt,
    )

    history_a: list[dict] = [{"role": "system", "content": system_prompt}]
    history_b: list[dict] = [{"role": "system", "content": system_prompt}]

    history_a.append({"role": "user", "content": seed_prompt})
    response_a = call_model(model_a, history_a)
    history_a.append({"role": "assistant", "content": response_a})
    conversation = add_turn(conversation, "A", response_a)

    last_response = response_a

    for turn in range(2, turns + 1):
        if turn % 2 == 0:
            history_b.append({"role": "user", "content": last_response})
            response_b = call_model(model_b, history_b)
            history_b.append({"role": "assistant", "content": response_b})
            conversation = add_turn(conversation, "B", response_b)
            last_response = response_b
        else:
            history_a.append({"role": "user", "content": last_response})
            response_a = call_model(model_a, history_a)
            history_a.append({"role": "assistant", "content": response_a})
            conversation = add_turn(conversation, "A", response_a)
            last_response = response_a

    return conversation


def run_conversation_streaming(
    model_a: str,
    model_b: str,
    seed_prompt: str,
    turns: int = 30,
    system_prompt: str = SYSTEM_PROMPT,
    console: Console | None = None,
) -> Conversation:
    console = console or Console()
    conversation = Conversation(
        model_a=model_a,
        model_b=model_b,
        seed_prompt=seed_prompt,
        system_prompt=system_prompt,
    )

    history_a: list[dict] = [{"role": "system", "content": system_prompt}]
    history_b: list[dict] = [{"role": "system", "content": system_prompt}]

    def print_turn_header(turn_num: int, speaker: str, model: str) -> None:
        style = "cyan" if speaker == "A" else "magenta"
        console.print(
            f"\n[bold {style}]Turn {turn_num} ({speaker}) [{model}][/bold {style}]"
        )

    def make_chunk_printer() -> Callable[[str], None]:
        def printer(chunk: str) -> None:
            console.print(chunk, end="")

        return printer

    print_turn_header(1, "A", model_a)
    history_a.append({"role": "user", "content": seed_prompt})
    response_a = call_model_streaming(model_a, history_a, make_chunk_printer())
    console.print()
    history_a.append({"role": "assistant", "content": response_a})
    conversation = add_turn(conversation, "A", response_a)

    last_response = response_a

    for turn in range(2, turns + 1):
        if turn % 2 == 0:
            print_turn_header(turn, "B", model_b)
            history_b.append({"role": "user", "content": last_response})
            response_b = call_model_streaming(model_b, history_b, make_chunk_printer())
            console.print()
            history_b.append({"role": "assistant", "content": response_b})
            conversation = add_turn(conversation, "B", response_b)
            last_response = response_b
        else:
            print_turn_header(turn, "A", model_a)
            history_a.append({"role": "user", "content": last_response})
            response_a = call_model_streaming(model_a, history_a, make_chunk_printer())
            console.print()
            history_a.append({"role": "assistant", "content": response_a})
            conversation = add_turn(conversation, "A", response_a)
            last_response = response_a

    return conversation


def run_experiment(
    model_a: str,
    model_b: str | None = None,
    turns: int = 30,
    seeds: tuple[str, ...] | None = None,
    console: Console | None = None,
) -> list[Conversation]:
    model_b = model_b or model_a
    seeds = seeds or SEED_PROMPTS
    console = console or Console()

    conversations: list[Conversation] = []

    with Progress(
        SpinnerColumn(),
        TextColumn("[progress.description]{task.description}"),
        console=console,
        transient=True,
    ) as progress:
        task = progress.add_task("[cyan]Running conversations...", total=len(seeds))
        for i, seed in enumerate(seeds):
            progress.update(task, description=f"[cyan]Seed {i + 1}/{len(seeds)}")
            conv = run_conversation(model_a, model_b, seed, turns)
            conversations.append(conv)
            progress.advance(task)

    return conversations


def run_experiment_streaming(
    model_a: str,
    model_b: str | None = None,
    turns: int = 30,
    seeds: tuple[str, ...] | None = None,
    console: Console | None = None,
) -> list[Conversation]:
    model_b = model_b or model_a
    seeds = seeds or SEED_PROMPTS
    console = console or Console()

    conversations: list[Conversation] = []

    for i, seed in enumerate(seeds):
        console.print(
            Panel(
                f"[bold]Seed {i + 1}/{len(seeds)}:[/bold] {seed}",
                border_style="green",
            )
        )
        conv = run_conversation_streaming(
            model_a, model_b, seed, turns, console=console
        )
        conversations.append(conv)
        console.print()

    return conversations
