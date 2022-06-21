# -*- coding: utf-8 -*-
from django.conf.urls import url
from mirisira_api.views import *

urlpatterns = [
    url(r'^test$', APITestView.as_view()),
]
