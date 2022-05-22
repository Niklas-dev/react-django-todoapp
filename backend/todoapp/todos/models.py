from django.db import models


# Create your models here.


class Todo(models.Model):
    title = models.CharField(max_length=50, unique=True, blank=False)
    content = models.CharField(max_length=200, blank=False)
    done = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    done_at = models.DateTimeField(null=True)


class ArchivedTodo(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=50, unique=False, blank=False)
    content = models.CharField(max_length=200, blank=False)
    done = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    done_at = models.DateTimeField(null=True)
    archived_at = models.DateTimeField(auto_now_add=True)
