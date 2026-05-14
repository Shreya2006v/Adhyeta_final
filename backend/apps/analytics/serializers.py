from rest_framework import serializers
from .models import SubjectMastery


class SubjectMasterySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubjectMastery
        fields = [
            "id", "subject", "mastery_score", "sessions_count",
            "test_average", "last_studied", "updated_at",
        ]
        read_only_fields = ["id", "updated_at"]
