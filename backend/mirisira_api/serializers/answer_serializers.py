# for answer serializer

from rest_framework import serializers

from mirisira_api.models import Answer, OneCharacterAnswer


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
    answer_id = serializers.IntegerField(source="id", read_only=True)
    question_id = serializers.IntegerField(write_only=True)
    answerer_name = serializers.CharField(max_length=15, write_only=True)
    characters = OneCharacterAnswerSerializer(many=True, write_only=True)

    class Meta:
        model = Answer
        fields = ["answer_id", "question_id", "answerer_name", "characters"]

    def create(self, validated_data):
        one_character_answers_data = validated_data.pop("characters")
        answer = Answer.objects.create(**validated_data)
        for one_character_answer in one_character_answers_data:
            OneCharacterAnswer.objects.create(
                answer=answer, **one_character_answer)
        return answer
