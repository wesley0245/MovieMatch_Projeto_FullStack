# Create your models here.

from django.db import models
import uuid # Para IDs universais (UUID) 
from django.contrib.auth.models import User 

class BaseModel(models.Model):

    # ID UUID: Em vez de 1, 2, 3, será algo como 'a1b2-c3d4...' (Mais seguro para API)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    criado_em = models.DateTimeField(auto_now_add=True) 
    atualizado_em = models.DateTimeField(auto_now=True) 
    
    # Campo para o Soft Delete (Se False, consideramos deletado)
    ativo = models.BooleanField(default=True)

    class Meta:
        abstract = True


    #Soft Delete
    def delete(self, using=None, keep_parents=False):
        
        #Sobrescreve o método delete padrão. Ao invés de apagar do banco, apenas marca como inativo.
        
        self.ativo = False
        self.save()


class Genero(BaseModel):
    nome = models.CharField(max_length=100)

    def _str_(self):
        return self.nome

class Filme(BaseModel):
    titulo = models.CharField(max_length=200)
    ano_lancamento = models.IntegerField()
    sinopse = models.TextField(blank=True, null=True)
    
    # Relacionamento: Um filme tem um gênero
    genero = models.ForeignKey(Genero, on_delete=models.CASCADE, related_name='filmes')

    def _str_(self):
        return f"{self.titulo} ({self.ano_lancamento})"

class Avaliacao(BaseModel):
    filme = models.ForeignKey(Filme, on_delete=models.CASCADE, related_name='avaliacoes')
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='avaliacoes')
    
    comentario = models.TextField()
    
    # Nota de 1 a 5
    nota = models.IntegerField(choices=[(i, str(i)) for i in range(1, 6)])

    def _str_(self):
        return f"{self.usuario.username} avaliou {self.filme.titulo} com nota {self.nota}"