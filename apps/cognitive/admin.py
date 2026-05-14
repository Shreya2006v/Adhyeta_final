from django.contrib import admin
from .models import CognitiveNode, CognitiveEdge


@admin.register(CognitiveNode)
class CognitiveNodeAdmin(admin.ModelAdmin):
    list_display = ["user", "subject", "topic", "mastery_score", "is_weak"]
    list_filter = ["subject", "is_weak"]
    search_fields = ["user__email", "topic"]


@admin.register(CognitiveEdge)
class CognitiveEdgeAdmin(admin.ModelAdmin):
    list_display = ["user", "source_node", "target_node", "relationship_type"]
    list_filter = ["relationship_type"]
