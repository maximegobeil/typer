from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('snippets/', views.snippet_list, name='snippet_list'),
    path('stats/', views.StatList.as_view(), name='stat_list'),
]
