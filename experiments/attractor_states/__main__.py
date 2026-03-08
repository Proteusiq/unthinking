#!/usr/bin/env python3
"""
Attractor States Experiment: Distribution Chaos

Test whether LLMs have "attractor states" - characteristic patterns they
converge to during extended self-conversation without human steering.
"""

from pathlib import Path
from typing import Annotated

import typer
from rich.console import Console
from rich.panel import Panel

from models import ExperimentResult
from conversation import run_experiment
from classify import classify_conversation
from output import save_results, print_summary

app = typer.Typer(
    name="attractor",
    help="Test LLMs for attractor states via self-conversation.",
    no_args_is_help=True,
)
console = Console()


@app.command()
def run(
    model: Annotated[
        str | None,
        typer.Option("--model", "-m", help="Model to test (talks to itself)"),
    ] = None,
    model_a: Annotated[
        str | None,
        typer.Option("--model-a", help="First model for cross-model conversation"),
    ] = None,
    model_b: Annotated[
        str | None,
        typer.Option("--model-b", help="Second model for cross-model conversation"),
    ] = None,
    turns: Annotated[
        int,
        typer.Option("--turns", "-t", help="Number of conversation turns"),
    ] = 30,
    output: Annotated[
        Path,
        typer.Option("--output", "-o", help="Output directory"),
    ] = Path("results"),
) -> None:
    """Run attractor states experiment.
    
    Examples:
    
        # Same model talking to itself
        
        attractor run --model gpt-4o-mini
        
        # Cross-model conversation
        
        attractor run --model-a gpt-4o-mini --model-b claude-3-haiku-20240307
    
    LiteLLM model formats:
    
        OpenAI:    gpt-4o, gpt-4o-mini
        Anthropic: claude-3-5-sonnet-20241022
        Google:    gemini/gemini-1.5-flash
        Groq:      groq/llama-3.1-70b-versatile
    """
    # Validate arguments
    if model and (model_a or model_b):
        console.print(
            "[red]Error:[/red] Use --model for self-conversation "
            "OR --model-a/--model-b for cross-model"
        )
        raise typer.Exit(1)

    if model:
        a, b = model, model
        model_name = model
    elif model_a and model_b:
        a, b = model_a, model_b
        model_name = f"{model_a} × {model_b}"
    else:
        console.print("[red]Error:[/red] Provide --model or both --model-a and --model-b")
        raise typer.Exit(1)

    # Show config
    console.print(
        Panel(
            f"[bold]Model A:[/bold] {a}\n"
            f"[bold]Model B:[/bold] {b}\n"
            f"[bold]Turns:[/bold] {turns}",
            title="Attractor States Experiment",
            border_style="blue",
        )
    )

    # Run conversations
    conversations = run_experiment(a, b, turns)

    # Classify each conversation
    results = []
    for conv in conversations:
        classification = classify_conversation(conv)
        results.append(ExperimentResult(conversation=conv, classification=classification))

    # Print summary
    print_summary(results, model_name)

    # Save results
    filepath = save_results(results, output, model_name.replace(" × ", "_x_"))
    console.print(f"[green]Results saved to:[/green] {filepath}")


if __name__ == "__main__":
    app()
