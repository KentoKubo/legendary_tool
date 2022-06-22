# -*- coding: utf-8 -*-
from django.conf.urls import url

from mirisira_api.views import *

urlpatterns = [
    url(r'^test$', APITestView.as_view()),
    url('targets/', TargetList.as_view()),
    url('questions/', QuestionList.as_view()),
    url('answers/', AnswerList.as_view()),
]
