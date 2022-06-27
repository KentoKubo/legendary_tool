# for question view

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
        
        data = list()
        for question in queryset:
            pictures = Picture.objects.filter(question_id=question.id)
            data.append({'question_id':question.id,'title':question.title,'pictures':pictures,'creator_name':question.creator_name,'create_at':question.create_at})

        serializer = self.get_serializer(data,many=True)
        return Response({"questions": serializer.data})



    def post(self, request, *args, **kwargs):
        pictures = request.data.pop('pictures')
        question_serializer = QuestionPostSerializer(data=request.data)
        with transaction.atomic():
            if question_serializer.is_valid():
                data = question_serializer.create(request.data)

            pictures_serializer = PictureSerializer(data=[{'question':data,'picture':picture} for picture in pictures],many=True)
            if pictures_serializer.is_valid():
                pictures_serializer.create([{'question':data,'picture':picture} for picture in pictures])

        return JsonResponse({}, status=status.HTTP_201_CREATED)


