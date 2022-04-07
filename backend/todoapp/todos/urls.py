from .views import *
from django.urls import path, include

urlpatterns = [
    path('create-todo', CreateTodoView.as_view()),
    path('get-todos', GetTodosView.as_view()),
    path('update-todo', UpdateTodoView.as_view()),
path('delete-todo', DeleteTodoView.as_view())

]
