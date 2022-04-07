from django.db import models


# Create your models here.


class Todo(models.Model):
    title = models.CharField(max_length=150, unique=True, blank=False)
    content = models.CharField(max_length=255, blank=False)
    done = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now=True)
    done_at = models.DateTimeField(null=True)
