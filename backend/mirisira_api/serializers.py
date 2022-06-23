from dataclasses import field
from rest_framework import serializers

from .models import Target, Question, Answer


class TargetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Target
        fields = ["id", "name", "picture"]


class QuestionSerializer(serializers.ModelSerializer):
    target_id = serializers.IntegerField()
    question = serializers.CharField(source="question_text")

    class Meta:
        model = Question
        fields = ["id", "target_id", "question"]


class AnswerSerializer(serializers.ModelSerializer):
    question_id = serializers.IntegerField()
    answer = serializers.CharField(source="answer_text")

    class Meta:
        model = Answer
        fields = ["id", "question_id", "answer"]
