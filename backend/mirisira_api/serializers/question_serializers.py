# for question serializer

from dataclasses import field
from rest_framework import serializers

from mirisira_api.models import Question, Picture
from drf_extra_fields.fields import Base64ImageField

class PictureSerializer(serializers.ModelSerializer):
    picture_id = serializers.IntegerField(source="id", read_only=True)
    picture = Base64ImageField(source="file_path",represent_in_base64=True,read_only=True)
    class Meta:
        model = Picture
        fields = ["picture_id","picture"]

    def create(self, validated_data):
        file_path = Base64ImageField().to_internal_value(validated_data.pop('picture'))
        Picture.objects.create(question=validated_data.pop('question'),file_path= file_path)
        # return image
class QuestionGetSerializer(serializers.Serializer):
    question_id = serializers.IntegerField()
    title = serializers.CharField(max_length=31)
    pictures = PictureSerializer(many=True)
    creator_name = serializers.CharField(max_length=31)
    create_at = serializers.DateTimeField()

class QuestionPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ["title","creator_name","create_at"]
