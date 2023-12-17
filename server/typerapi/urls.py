from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('snippets/', views.snippet_list, name='snippet_list'),
    path('stats/', views.StatList.as_view(), name='stat_list'),
    path('options/', views.OptionDetail.as_view(), name='option_detail'),
    path('scores/', views.TopScoreList.as_view(), name='score_list'),
]
