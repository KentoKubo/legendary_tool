# for answer view

from rest_framework import generics
from rest_framework.response import Response

from mirisira_api.models import Answer
from mirisira_api.serializers.answer_serializers import AnswerSerializer, AnswerGetSerializer, AnswerPostSerializer


class AnswerList(generics.ListCreateAPIView):
    def get_queryset(self):
        question_id = self.request.query_params["question_id"]
        return Answer.objects.filter(question_id=question_id)

    def get_serializer_class(self):
        if self.request.method == "GET":
            return AnswerGetSerializer
        return AnswerPostSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response({"answers": serializer.data})

        serializer = self.get_serializer(queryset, many=True)
        return Response({"answers": serializer.data})


class AnswerRetrieve(generics.RetrieveAPIView):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
