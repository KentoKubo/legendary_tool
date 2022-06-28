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
        picture = validated_data.pop('picture')
        if type(picture) is str:
            picture = Base64ImageField().to_internal_value(picture)

        Picture.objects.create(question=validated_data.pop('question'),file_path= picture)
        # return image
class QuestionGetSerializer(serializers.ModelSerializer):
    question_id = serializers.IntegerField(source="id")
    pictures = PictureSerializer(source="picture_set", many=True)

    class Meta:
        model = Question
        fields = ["question_id", "title", "pictures", "creator_name", "create_at"]
class QuestionPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ["title","creator_name","create_at"]
