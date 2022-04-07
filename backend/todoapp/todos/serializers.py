from rest_framework.serializers import ModelSerializer, Serializer
from rest_framework import serializers
from .models import Todo


class CreateTodoSerializer(ModelSerializer):
    class Meta:
        model = Todo
        fields = '__all__'

class GetTodoSerializer(Serializer):
    title = serializers.CharField(max_length=150)
    content = serializers.CharField(max_length=255)

    done = serializers.BooleanField()
    created_at = serializers.DateTimeField()
    done_at = serializers.DateTimeField(allow_null=True)

class UpdateTodoSerializer(Serializer):
    old_title = serializers.CharField(max_length=150, allow_null=True)
    title = serializers.CharField(max_length=150, allow_null=True)
    content = serializers.CharField(max_length=255, allow_null=True)

    done = serializers.BooleanField(allow_null=True)

class DeleteTodoSerializer(Serializer):
    title = serializers.CharField()



