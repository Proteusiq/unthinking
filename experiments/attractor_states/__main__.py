#!/usr/bin/env python3
"""
Attractor States Experiment: Distribution Chaos

Test whether LLMs have "attractor states" - characteristic patterns they
converge to during extended self-conversation without human steering.

Usage:
    # Same model talking to itself
    uv run python -m attractor_states --model gpt-4o-mini

    # Cross-model conversation  
    uv run python -m attractor_states --model-a gpt-4o-mini --model-b claude-3-haiku-20240307

    # Custom turns and output
    uv run python -m attractor_states --model gpt-4o-mini --turns 20 --output results/

LiteLLM model names:
    OpenAI:    gpt-4o, gpt-4o-mini, gpt-4-turbo
    Anthropic: claude-3-5-sonnet-20241022, claude-3-haiku-20240307
    Google:    gemini/gemini-1.5-flash, gemini/gemini-1.5-pro
    Groq:      groq/llama-3.1-70b-versatile, groq/mixtral-8x7b-32768
    OpenRouter: openrouter/meta-llama/llama-3.1-70b-instruct
"""

import argparse
from pathlib import Path

from models import ExperimentResult
from conversation import run_experiment
from classify import classify_conversation
from output import save_results, print_summary


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Test LLMs for attractor states via self-conversation",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    parser.add_argument(
        "--model",
        type=str,
        help="Model to test (talks to itself). Use LiteLLM format.",
    )
    parser.add_argument(
        "--model-a",
        type=str,
        help="First model for cross-model conversation",
    )
    parser.add_argument(
        "--model-b",
        type=str,
        help="Second model for cross-model conversation",
    )
    parser.add_argument(
        "--turns",
        type=int,
        default=30,
        help="Number of conversation turns (default: 30)",
    )
    parser.add_argument(
        "--output",
        type=str,
        default="results",
        help="Output directory (default: results/)",
    )
    args = parser.parse_args()

    # Validate arguments
    if args.model and (args.model_a or args.model_b):
        parser.error("Use --model for self-conversation OR --model-a/--model-b for cross-model")

    if args.model:
        model_a = args.model
        model_b = args.model
        model_name = args.model
    elif args.model_a and args.model_b:
        model_a = args.model_a
        model_b = args.model_b
        model_name = f"{model_a}_x_{model_b}"
    else:
        parser.error("Provide --model or both --model-a and --model-b")

    print(f"Running attractor states experiment...")
    print(f"  Model A: {model_a}")
    print(f"  Model B: {model_b}")
    print(f"  Turns: {args.turns}")
    print()

    # Run conversations
    conversations = run_experiment(model_a, model_b, args.turns)

    # Classify each conversation
    results = []
    for conv in conversations:
        classification = classify_conversation(conv)
        results.append(ExperimentResult(conversation=conv, classification=classification))

    # Print summary
    print_summary(results, model_name)

    # Save results
    output_dir = Path(args.output)
    filepath = save_results(results, output_dir, model_name)
    print(f"Results saved to: {filepath}")


if __name__ == "__main__":
    main()
