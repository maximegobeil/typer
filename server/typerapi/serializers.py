from rest_framework import serializers
from .models import Snippet, Stat


class SnippetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Snippet
        fields = ('id', 'text')


class StatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stat
        fields = ('id', 'speed', 'accuracy', 'score', 'user')
