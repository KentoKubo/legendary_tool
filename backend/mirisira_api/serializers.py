from dataclasses import field
from rest_framework import serializers

from .models import Target, Question, Answer


class TargetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Target
        fields = ["id", "name"]


class QuestionSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source="target_id")
    question = serializers.CharField(source="question_text")

    class Meta:
        model = Question
        fields = ["id", "question", "picture"]


class AnswerSerializer(serializers.ModelSerializer):
    question_id = serializers.IntegerField()
    answer = serializers.CharField(source="answer_text")

    class Meta:
        model = Answer
        fields = ["question_id", "answer"]
