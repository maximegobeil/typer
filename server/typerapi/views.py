from django.shortcuts import render, HttpResponse, get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .models import Snippet, Stat
from .serializers import SnippetSerializer, StatSerializer

# Create your views here.


def home(request):
    return HttpResponse("You're at the typerapi index.")


@api_view(['GET'])
def snippet_list(request):
    try:
        snippets = Snippet.objects.all()
        serializer = SnippetSerializer(snippets, many=True)
        return Response(serializer.data)
    except Snippet.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


class StatList(APIView):
    def get(self, request):
        try:
            stats = Stat.objects.all()
            serializer = StatSerializer(stats, many=True)
            return Response(serializer.data)
        except Stat.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        serializer = StatSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
