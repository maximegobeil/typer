from django.shortcuts import render, HttpResponse, get_object_or_404
from django.db.models import Avg
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status, serializers
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import Snippet, Stat, Option
from .serializers import SnippetSerializer, StatSerializer, OptionSerializer, TopScoreListSerializer

# Create your views here.


def home(request):
    return HttpResponse("You're at the typerapi index.")


@api_view(['GET'])
def snippet_list(request):
    try:
        snippet = Snippet.objects.order_by('?').first()
        serializer = SnippetSerializer(snippet)
        return Response(serializer.data)
    except Snippet.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


class StatList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            stats = Stat.objects.filter(user=request.user).aggregate(
                avg_speed=Avg('speed'), avg_accuracy=Avg('accuracy'), avg_score=Avg('score')
            )
            result = {
                'avg_speed': round(stats.get('avg_speed', 0), 2),
                'avg_accuracy': round(stats.get('avg_accuracy', 0), 2),
                'avg_score': round(stats.get('avg_score', 0), 2)
            }

            return Response(result)
        except Stat.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        request.data['user'] = request.user.id

        serializer = StatSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class OptionDetail(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            option = Option.objects.get(user=request.user)
            serializer = OptionSerializer(option)
            return Response(serializer.data)
        except Option.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def put(self, request):
        option = Option.objects.get(user=request.user)
        request.data['user'] = request.user.id
        serializer = OptionSerializer(option, data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        except serializers.ValidationError as err:
            return Response(err.detail, status=status.HTTP_400_BAD_REQUEST)


class TopScoreList(APIView):
    def get(self, request):
        try:
            stats = Stat.objects.values('user__username').annotate(
                avg_speed=Avg('speed'), avg_accuracy=Avg(
                    'accuracy'), avg_score=Avg('score')).order_by('-avg_score')[:5]
            serializer = TopScoreListSerializer(stats, many=True)
            return Response(serializer.data)
        except Stat.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
