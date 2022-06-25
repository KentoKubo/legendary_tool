from xml.etree.ElementTree import PI
from django.db import models

# Create your models here.

class Question(models.Model):
    title = models.CharField(max_length=31)
    creator_name = models.CharField(max_length=31)
    create_at = models.DateTimeField(auto_now_add=True)


class Picture(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    file_path = models.CharField(max_length=255) # TODO: survey how to save pictures


class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    answerer_name = models.CharField(max_length=31)
    create_at = models.DateTimeField(auto_now_add=True)


class OneCharacterAnswer(models.Model):
    picture = models.ForeignKey(Picture, on_delete=models.CASCADE)
    answer = models.ForeignKey(Answer, on_delete=models.CASCADE)
    character_name = models.CharField(max_length=31)
    character_explanation = models.TextField()


# feat/2/define-model
# class Target(models.Model):
    # name = models.CharField(max_length=32)
    # picture = models.CharField(max_length=200, null=True)  # TODO: 仮のフィールド


# class Question(models.Model):
    # target = models.ForeignKey(Target, on_delete=models.CASCADE)
    # question_text = models.CharField(max_length=200)


# class Answer(models.Model):
    # question = models.ForeignKey(Question, on_delete=models.CASCADE)
    # answer_text = models.CharField(max_length=200)
