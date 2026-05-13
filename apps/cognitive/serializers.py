from rest_framework import serializers
from .models import CognitiveNode, CognitiveEdge


class CognitiveNodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CognitiveNode
        fields = [
            "id", "subject", "topic", "parent_topic",
            "mastery_score", "is_weak", "color", "updated_at",
        ]
        read_only_fields = ["id", "is_weak", "updated_at"]


class UpdateNodeSerializer(serializers.Serializer):
    node_id = serializers.IntegerField()
    mastery_score = serializers.FloatField(min_value=0, max_value=100)


class InitializeSubjectSerializer(serializers.Serializer):
    subject = serializers.CharField(max_length=100)
