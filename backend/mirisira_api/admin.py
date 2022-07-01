from email.errors import ObsoleteHeaderDefect
from django.contrib import admin

# Register your models here.

from .models import *

class PictureInline(admin.StackedInline):
    model = Picture
    extra = 5

class QuestionAdmin(admin.ModelAdmin):
    inlines = [PictureInline]

class OneCharacterAnswerInline(admin.StackedInline):
    model = OneCharacterAnswer
    extra = 5

class AnswerAdmin(admin.ModelAdmin):
    inlines = [OneCharacterAnswerInline]

admin.site.register(Question, QuestionAdmin)
admin.site.register(Picture)
admin.site.register(Answer, AnswerAdmin)
admin.site.register(OneCharacterAnswer)

#TODO: update admin site like https://docs.djangoproject.com/ja/4.0/intro/tutorial07/
