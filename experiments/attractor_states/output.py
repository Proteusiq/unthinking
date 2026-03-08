"""Output utilities for attractor states experiment."""

import json
from datetime import datetime
from pathlib import Path

from models import Conversation, ExperimentResult, AttractorClassification


def conversation_to_dict(conv: Conversation) -> dict:
    """Convert conversation to JSON-serializable dict."""
    return {
        "model_a": conv.model_a,
        "model_b": conv.model_b,
        "seed_prompt": conv.seed_prompt,
        "system_prompt": conv.system_prompt,
        "started_at": conv.started_at,
        "turns": [
            {"speaker": t.speaker, "content": t.content, "turn_number": t.turn_number}
            for t in conv.turns
        ],
    }


def result_to_dict(result: ExperimentResult) -> dict:
    """Convert experiment result to JSON-serializable dict."""
    d = {
        "conversation": conversation_to_dict(result.conversation),
        "completed_at": result.completed_at,
    }
    if result.classification:
        d["classification"] = {
            "pattern": result.classification.pattern,
            "turn_detected": result.classification.turn_detected,
            "confidence": result.classification.confidence,
            "evidence": result.classification.evidence,
        }
    return d


def save_results(
    results: list[ExperimentResult],
    output_dir: Path,
    model_name: str,
) -> Path:
    """Save experiment results to JSON."""
    output_dir.mkdir(parents=True, exist_ok=True)

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    safe_name = model_name.replace("/", "_").replace(":", "_")
    filename = output_dir / f"{safe_name}_{timestamp}.json"

    data = {
        "model": model_name,
        "generated_at": datetime.now().isoformat(),
        "total_conversations": len(results),
        "results": [result_to_dict(r) for r in results],
        "summary": summarize_results(results),
    }

    with open(filename, "w") as f:
        json.dump(data, f, indent=2)

    return filename


def summarize_results(results: list[ExperimentResult]) -> dict:
    """Generate summary statistics."""
    patterns: dict[str, int] = {}
    for r in results:
        if r.classification:
            pattern = r.classification.pattern
            patterns[pattern] = patterns.get(pattern, 0) + 1

    return {
        "pattern_counts": patterns,
        "total": len(results),
    }


def print_summary(results: list[ExperimentResult], model_name: str) -> None:
    """Print a summary of results to stdout."""
    summary = summarize_results(results)

    print(f"\n{'=' * 60}")
    print(f"ATTRACTOR STATES: {model_name}")
    print(f"{'=' * 60}")

    for pattern, count in sorted(summary["pattern_counts"].items(), key=lambda x: -x[1]):
        pct = count / summary["total"] * 100
        print(f"  {pattern:20s}: {count:2d} ({pct:5.1f}%)")

    print(f"{'=' * 60}")
    print(f"Total conversations: {summary['total']}")
    print(f"{'=' * 60}\n")
