from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class User(AbstractUser):
    email = models.EmailField(unique=True)


class Stat(models.Model):
    speed = models.FloatField()
    accuracy = models.FloatField()
    score = models.IntegerField()
    user = models.ForeignKey(
        User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.score}"


class Option(models.Model):
    TEXT_CURSOR_LINE = 'L'
    TEXT_CURSOR_UNDERLINE = 'U'

    TEXT_CURSOR_CHOICES = [
        (TEXT_CURSOR_LINE, 'Line'),
        (TEXT_CURSOR_UNDERLINE, 'Underline'),
    ]
    underline = models.CharField(
        max_length=1, choices=TEXT_CURSOR_CHOICES, default=TEXT_CURSOR_LINE)
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.underline


class Snippet(models.Model):
    text = models.TextField(max_length=1000)
    word_count = models.IntegerField()

    def __str__(self):
        return self.text
