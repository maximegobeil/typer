from rest_framework import serializers
from .models import Snippet, Stat, Option


class SnippetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Snippet
        fields = ('id', 'text')


class StatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stat
        fields = ('id', 'speed', 'accuracy', 'score', 'user')


class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ('id', 'underline', 'user')

    def validate_underline(self, value):
        if value not in ['L', 'U']:
            raise serializers.ValidationError(
                "Invalid value for 'underline'. Please provide either 'L' or 'U'.")
        return value


class TopScoreListSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user__username')
    speed = serializers.FloatField(source='avg_speed')
    accuracy = serializers.FloatField(source='avg_accuracy')
    score = serializers.FloatField(source='avg_score')

    class Meta:
        model = Stat
        fields = ('username', 'speed', 'accuracy', 'score')
