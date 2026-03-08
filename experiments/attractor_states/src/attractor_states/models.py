"""Data models for attractor states experiment."""

from dataclasses import dataclass, field
from datetime import datetime


@dataclass(frozen=True)
class Turn:
    speaker: str
    content: str
    turn_number: int


@dataclass(frozen=True)
class Conversation:
    model_a: str
    model_b: str
    seed_prompt: str
    system_prompt: str
    turns: tuple[Turn, ...] = ()
    started_at: str = field(default_factory=lambda: datetime.now().isoformat())

    @property
    def is_cross_model(self) -> bool:
        return self.model_a != self.model_b


def add_turn(conv: Conversation, speaker: str, content: str) -> Conversation:
    new_turn = Turn(speaker, content, len(conv.turns) + 1)
    return Conversation(
        model_a=conv.model_a,
        model_b=conv.model_b,
        seed_prompt=conv.seed_prompt,
        system_prompt=conv.system_prompt,
        turns=conv.turns + (new_turn,),
        started_at=conv.started_at,
    )


@dataclass(frozen=True)
class AttractorClassification:
    pattern: str
    turn_detected: int
    confidence: float
    evidence: str


@dataclass(frozen=True)
class ExperimentResult:
    conversation: Conversation
    classification: AttractorClassification | None = None
    completed_at: str = field(default_factory=lambda: datetime.now().isoformat())
