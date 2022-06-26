# for answer serializer

from dataclasses import field
from rest_framework import serializers

from mirisira_api.models import Question, Picture, Answer, OneCharacterAnswer

# class Hoge(serializers.ModelSerializer):


class OneCharacterAnswerSerializer(serializers.ModelSerializer):
    picture_id = serializers.IntegerField()

    class Meta:
        model = OneCharacterAnswer
        fields = ["picture_id", "character_name", "character_explanation"]


class AnswerSerializer(serializers.ModelSerializer):
    characters = OneCharacterAnswerSerializer(many=True, read_only=True)

    class Meta:
        model = Answer
        fields = ["characters"]


class AnswerGetSerializer(serializers.ModelSerializer):
    answer_id = serializers.IntegerField(source="id", read_only=True)

    class Meta:
        model = Answer
        fields = ["answer_id", "answerer_name", "create_at"]


class AnswerPostSerializer(serializers.ModelSerializer):
    question_id = serializers.IntegerField()
    characters = OneCharacterAnswerSerializer(many=True)

    class Meta:
        model = Answer
        fields = ["question_id", "answerer_name", "characters"]

    def create(self, validated_data):
        one_character_answers_data = validated_data.pop("characters")
        answer = Answer.objects.create(**validated_data)
        for one_character_answer in one_character_answers_data:
            OneCharacterAnswer.objects.create(
                answer=answer, **one_character_answer)
        return answer
