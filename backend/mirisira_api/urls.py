# -*- coding: utf-8 -*-
from django.conf.urls import url
from django.urls import path
from django.conf import settings #画像参照のため追加
from django.contrib.staticfiles.urls import static #画像参照のため追加
from django.contrib.staticfiles.urls import staticfiles_urlpatterns #画像参照のため追加

from mirisira_api.views.question_views import *
from mirisira_api.views.answer_views import *

urlpatterns = [
    url(r'^test/$', APITestView.as_view()),

    #TODO: add url patterns from each view


    # feat/2/define-model
    # url('targets/', TargetList.as_view()),
    # url('questions/', QuestionList.as_view()),
    path('answers/', AnswerList.as_view()),
    path('answers/<int:pk>/', AnswerRetrieve.as_view()),
    path('questions/',QuestionList.as_view()),
]
urlpatterns += staticfiles_urlpatterns()
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)