# for question serializer

from dataclasses import field
from django.core.files.storage import get_storage_class
from rest_framework import serializers
import requests
import base64

from mirisira_api.models import Question, Picture
from drf_extra_fields.fields import Base64ImageField

class PictureSerializer(serializers.ModelSerializer):
    picture_id = serializers.IntegerField(source="id", read_only=True)
    # picture = Base64ImageField(source="file_path",represent_in_base64=True,read_only=True)
    picture = serializers.SerializerMethodField(source="file_path")
    picture_url = serializers.ImageField(source="file_path",read_only=True)
    class Meta:
        model = Picture
        fields = ["picture_id","picture","picture_url"]

    def get_picture(self,instance):
        # instance of the current storage class
        media_storage = get_storage_class()()
        url = media_storage.url(instance.__dict__["file_path"])
        print(url)
        picture_data = base64.b64encode(requests.get(url).content)
        return picture_data
    
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
