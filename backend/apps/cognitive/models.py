"""Cognitive map models — knowledge graph nodes and edges."""
from django.db import models
from django.conf import settings
from core.mixins import TimestampMixin


class CognitiveNode(TimestampMixin):
    """A concept/topic node in the knowledge graph."""
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="cognitive_nodes",
    )
    subject = models.CharField(max_length=100)
    topic = models.CharField(max_length=200)
    parent_topic = models.CharField(max_length=200, blank=True)
    mastery_score = models.FloatField(default=0.0)  # 0–100
    is_weak = models.BooleanField(default=False)
    color = models.CharField(max_length=20, default="#6366f1")  # for frontend

    class Meta:
        unique_together = ("user", "subject", "topic")
        ordering = ["subject", "topic"]

    def __str__(self):
        return f"{self.subject}/{self.topic} ({self.mastery_score}%)"

    def save(self, *args, **kwargs):
        self.is_weak = self.mastery_score < 50
        super().save(*args, **kwargs)


class CognitiveEdge(TimestampMixin):
    """Directed edge between two knowledge nodes."""
    RELATIONSHIP_CHOICES = [
        ("prerequisite", "Prerequisite"),
        ("related", "Related"),
        ("extension", "Extension"),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="cognitive_edges",
    )
    source_node = models.ForeignKey(
        CognitiveNode,
        on_delete=models.CASCADE,
        related_name="outgoing_edges",
    )
    target_node = models.ForeignKey(
        CognitiveNode,
        on_delete=models.CASCADE,
        related_name="incoming_edges",
    )
    relationship_type = models.CharField(
        max_length=20, choices=RELATIONSHIP_CHOICES, default="related"
    )
    weight = models.FloatField(default=1.0)

    class Meta:
        unique_together = ("user", "source_node", "target_node")
