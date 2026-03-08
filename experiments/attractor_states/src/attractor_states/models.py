"""Data models for attractor states experiment."""

from dataclasses import dataclass, field
from datetime import datetime


@dataclass(frozen=True)
class Turn:
    """A single turn in the conversation."""

    speaker: str  # "A" or "B"
    content: str
    turn_number: int


@dataclass
class Conversation:
    """A complete conversation between two LLM instances."""

    model_a: str
    model_b: str
    seed_prompt: str
    system_prompt: str
    turns: list[Turn] = field(default_factory=list)
    started_at: str = field(default_factory=lambda: datetime.now().isoformat())

    def add_turn(self, speaker: str, content: str) -> None:
        self.turns.append(Turn(speaker, content, len(self.turns) + 1))

    @property
    def is_cross_model(self) -> bool:
        return self.model_a != self.model_b


@dataclass(frozen=True)
class AttractorClassification:
    """Classification of an attractor state."""

    pattern: str  # verbatim_loop, near_loop, zen_silence, sycophantic, topic_drift, sustained
    turn_detected: int  # Turn number where pattern emerged
    confidence: float  # 0.0 to 1.0
    evidence: str  # Brief description of why this classification


@dataclass
class ExperimentResult:
    """Result of a single experiment run."""

    conversation: Conversation
    classification: AttractorClassification | None = None
    completed_at: str = field(default_factory=lambda: datetime.now().isoformat())
