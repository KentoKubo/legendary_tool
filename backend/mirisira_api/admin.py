from django.contrib import admin

# Register your models here.

from .models import *

admin.site.register(Question)
admin.site.register(Picture)
admin.site.register(Answer)
admin.site.register(OneCharacterAnswer)

#TODO: update admin site like https://docs.djangoproject.com/ja/4.0/intro/tutorial07/
