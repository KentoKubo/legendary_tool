from django.db import models

# Create your models here.


class Target(models.Model):
    name = models.CharField(max_length=32)
    picture = models.CharField(max_length=200, null=True)  # TODO: 仮のフィールド


class Question(models.Model):
    target = models.ForeignKey(Target, on_delete=models.CASCADE)
    question_text = models.CharField(max_length=200)


class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    answer_text = models.CharField(max_length=200)
