
from rest_framework import serializers
from .models import Genero, Filme, Avaliacao

class GeneroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genero
        fields = '__all__' # Traduz todos os campos (id, nome, ativo, datas...)

class FilmeSerializer(serializers.ModelSerializer):

    # Isso resolve a EXIBIÇÃO (GET)
    genero = GeneroSerializer(read_only=True)
    
    # Isso resolve o CADASTRO (POST)
    # Ele permite que você envie o ID do gênero
    genero_id = serializers.PrimaryKeyRelatedField(
        queryset=Genero.objects.all(), 
        source='genero', 
        write_only=True
    )

    class Meta:
        model = Filme
        fields = ['id', 'titulo', 'ano_lancamento', 'genero', 'genero_id']

class AvaliacaoSerializer(serializers.ModelSerializer):

    usuario = serializers.ReadOnlyField(source='usuario.username')

    class Meta:
        model = Avaliacao
        fields = '__all__'
