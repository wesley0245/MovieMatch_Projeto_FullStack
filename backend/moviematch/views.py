from django.shortcuts import render

# Create your views here.

from rest_framework import viewsets
from .models import Genero, Filme, Avaliacao
from .serializers import GeneroSerializer, FilmeSerializer, AvaliacaoSerializer

class GeneroViewSet(viewsets.ModelViewSet):
    queryset = Genero.objects.filter(ativo=True)
    serializer_class = GeneroSerializer

class FilmeViewSet(viewsets.ModelViewSet):
    queryset = Filme.objects.filter(ativo=True)
    serializer_class = FilmeSerializer

class AvaliacaoViewSet(viewsets.ModelViewSet):
    queryset = Avaliacao.objects.filter(ativo=True)
    serializer_class = AvaliacaoSerializer

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)