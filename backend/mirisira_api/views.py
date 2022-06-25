from rest_framework.views import APIView
from django.http import JsonResponse
from rest_framework import generics, status
from rest_framework.response import Response






# feat/2/define-model
# from .models import Target, Question, Answer
# from .serializers import TargetSerializer, QuestionSerializer, AnswerSerializer

# class APITestView(APIView):
    # def get(self, request, **kwargs):
        # return JsonResponse({"data": "get request"})

# class TargetList(generics.ListAPIView):
    # queryset = Target.objects.all()
    # serializer_class = TargetSerializer

# class QuestionList(generics.ListAPIView):
    # serializer_class = QuestionSerializer

    # def get_queryset(self):
        # target_id = self.request.query_params["id"]
        # return Question.objects.filter(target_id=target_id)

# class AnswerList(generics.ListCreateAPIView):
    # serializer_class = AnswerSerializer

    # def get_queryset(self):
        # question_id = self.request.query_params["question_id"]
        # return Answer.objects.filter(question_id=question_id)

    # def create(self, request, *args, **kwargs):
        # serializer = self.get_serializer(
            # data=request.data["QAList"], many=True)
        # serializer.is_valid(raise_exception=True)
        # self.perform_create(serializer)
        # headers = self.get_success_headers(serializer.data)
        # return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
