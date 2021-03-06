from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json
from datetime import datetime
from django.utils import timezone

import todos.models
from .models import Todo, ArchivedTodo
from .serializers import *


# Create your views here.



class CreateTodoView(APIView):

    def post(self, request):
        serializer = CreateTodoSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({"Success": {"TODO": serializer.data}}, status=status.HTTP_200_OK)
        return Response({"Test": "false"}, status=status.HTTP_400_BAD_REQUEST)

class GetTodosView(APIView):
    def get(self, request):
        pk = request.GET.get('pk')
        if pk is not None:
            try:
                todo = Todo.objects.get(pk=pk).__dict__

            except :
                return Response({"Bad Request": "Query does not exist"}, status=status.HTTP_400_BAD_REQUEST)

            serializer = GetTodoSerializer(data=todo, many=False)
            if serializer.is_valid(raise_exception=True):
                return Response({"Success": {"TODO": serializer.data}}, status=status.HTTP_200_OK)
        else:
            queryset = Todo.objects.all()
            todo_list = queryset[::1]
            new_todo_list = []
            for todo in todo_list:
                dict_todo = todo.__dict__
                new_todo_list.append(dict_todo)

            serializer = GetTodoSerializer(data=new_todo_list, many=True)
            if serializer.is_valid(raise_exception=True):
                return Response({"Todos": serializer.data}, status=status.HTTP_200_OK)

        return Response({"Bad Request": "Can't get Todos"}, status=status.HTTP_400_BAD_REQUEST)

class UpdateTodoView(APIView):
    def patch(self, request):

        serializers = UpdateTodoSerializer(data=json.loads(request.body))
        if serializers.is_valid(raise_exception=True):
            todos_with_title = Todo.objects.filter(title=serializers.data['title'])
            print(todos_with_title.count())
            title_in_use = todos_with_title.count() >= 1
            is_title_update = serializers.data['title_update']

            if title_in_use and is_title_update:
                return Response({"Bad Request": "Title already exists"}, status=status.HTTP_400_BAD_REQUEST)
            todo = Todo.objects.get(title=serializers.data['old_title'])
            todo.title = serializers.data['title']
            todo.content = serializers.data['content']
            todo.done = serializers.data['done']

            allow_done_at_change = serializers.data['done'] and serializers.data['old_title'] == serializers.data['title'] and serializers.data['old_content'] == serializers.data['content']

            if allow_done_at_change:

                todo.done_at = timezone.now()

            todo.save()

            return Response({"Success": "Updated"}, status=status.HTTP_200_OK)
        return Response({"Bad Request": "Failed"}, status=status.HTTP_400_BAD_REQUEST)

class DeleteTodoView(APIView):
    def delete(self, request):
        serializer = DeleteTodoSerializer(data=json.loads(request.body))
        if serializer.is_valid(raise_exception=True):
            todo = Todo.objects.get(title=serializer.data['title'])
            todo.delete()
            return Response({"Success": "Deleted"}, status=status.HTTP_200_OK)
        return Response({"Bad Request": "You need to provide a key"}, status=status.HTTP_400_BAD_REQUEST)

class ArchiveTodoView(APIView):
    def patch(self, request):
        serializer = ArchiveTodoSerializer(data=json.loads(request.body))
        if serializer.is_valid(raise_exception=True):
            todo = Todo.objects.get(title=serializer.data['title'])
            archived_todo = ArchivedTodo.objects.create(title=todo.title, content=todo.content, done=todo.done, created_at=todo.created_at, done_at=todo.done_at)



            todo.delete()
            return Response({"Success": "Archived  and removed from Todo Table"}, status=status.HTTP_200_OK)
        return Response({"Bad Request": "You need to provide a title"}, status=status.HTTP_400_BAD_REQUEST)
class GetArchivedTodosView(APIView):
    def get(self, request):
        pk = request.GET.get('pk')
        if pk is not None:
            try:
                todo = ArchivedTodo.objects.get(pk=pk).__dict__

            except :
                return Response({"Bad Request": "Query does not exist"}, status=status.HTTP_400_BAD_REQUEST)

            serializer = GetTodoSerializer(data=todo, many=False)
            if serializer.is_valid(raise_exception=True):
                return Response({"Success": {"TODO": serializer.data}}, status=status.HTTP_200_OK)
        else:
            queryset = ArchivedTodo.objects.all()
            todo_list = queryset[::1]
            new_todo_list = []
            for todo in todo_list:
                dict_todo = todo.__dict__
                new_todo_list.append(dict_todo)

            serializer = GetArchivedTodoSerializer(data=new_todo_list, many=True)
            if serializer.is_valid(raise_exception=True):
                return Response({"Todos": serializer.data}, status=status.HTTP_200_OK)

        return Response({"Bad Request": "Can't get Todos"}, status=status.HTTP_400_BAD_REQUEST)

class DeleteArchivedTodosView(APIView):
    def delete(self, request):
        todos = ArchivedTodo.objects.all()
        todo_count = 0
        for todo in todos:
            todo.delete()
            todo_count += 1

        return Response({"Success": f"Deleted {todo_count} Todos"}, status=status.HTTP_400_BAD_REQUEST)