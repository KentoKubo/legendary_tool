# for question view
from rest_framework.exceptions import ValidationError
from rest_framework.views import APIView
from django.http import JsonResponse
from django.db import transaction  
from rest_framework import generics, status
from rest_framework.response import Response

from mirisira_api.models import Question, Picture
from mirisira_api.serializers.question_serializers import *

class APITestView(APIView):
    def get(self, request, **kwargs):
        return JsonResponse({"data": "get request"})

class QuestionList(generics.ListCreateAPIView):
    def get_queryset(self):
        if "title" in self.request.query_params.keys():
            title = self.request.query_params["title"]
            return Question.objects.filter(title__icontains=title)
        else:
            return Question.objects.all()

    def get_serializer_class(self):
        if self.request.method == "GET":
            return QuestionGetSerializer
        return QuestionPostSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response({"questions": serializer.data})



    def post(self, request, *args, **kwargs):
        if request.content_type == 'application/json':
            pictures = request.data.pop('pictures')
            question_info = request.data
            question_serializer = QuestionPostSerializer(data=question_info)
        else:
            question_info = {
                'title':request.POST.get('title',None),
                'creator_name':request.POST.get('creator_name',None),
            }
            pictures = request.FILES.getlist('pictures',None)
            ALLOW_CONTENT_TYPE = ['image/png','image/jpeg','image/gif']
            for picture in pictures:
                if (picture.content_type in ALLOW_CONTENT_TYPE)  == False:
                    return JsonResponse({"message": "Only image files can be uploaded"}, status=status.HTTP_400_BAD_REQUEST)

            question_serializer = QuestionPostSerializer(data=question_info)

        if len(pictures) < 1:
            # raise ValidationError('Image file is missing')
            return JsonResponse({"message": "Image file is missing."}, status=status.HTTP_400_BAD_REQUEST)
        elif len(pictures) > 10:
            return JsonResponse({"message": "Image files should be less than 10."}, status=status.HTTP_400_BAD_REQUEST)

        with transaction.atomic():
            if question_serializer.is_valid(raise_exception=True):
                data = question_serializer.create(question_info)

            pictures_serializer = PictureSerializer(data=[{'question':data,'picture':picture} for picture in pictures],many=True)
            if pictures_serializer.is_valid(raise_exception=True):
                pictures_serializer.create([{'question':data,'picture':picture} for picture in pictures])

        return JsonResponse({"question_id": data.id}, status=status.HTTP_201_CREATED)


