# for question view

from rest_framework.views import APIView
from django.http import JsonResponse
from rest_framework import generics, status
from rest_framework.response import Response

# from mirisira_api.models import Question, Picture, Answer, OneCharacterAnswer
# from mirisira_api.serializers.question_serializers import *

class APITestView(APIView):
    def get(self, request, **kwargs):
        return JsonResponse({"data": "get request"})

# class Fuga(piyo):
