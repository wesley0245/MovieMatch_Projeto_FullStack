
from rest_framework import serializers
from .models import Genero, Filme, Avaliacao

class GeneroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genero
        fields = '__all__' # Traduz todos os campos (id, nome, ativo, datas...)

class FilmeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Filme
        fields = '__all__'

class AvaliacaoSerializer(serializers.ModelSerializer):

    usuario = serializers.ReadOnlyField(source='usuario.username')

    class Meta:
        model = Avaliacao
        fields = '__all__'
