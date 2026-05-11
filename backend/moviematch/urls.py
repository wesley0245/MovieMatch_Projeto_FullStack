from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import GeneroViewSet, FilmeViewSet, AvaliacaoViewSet

router = DefaultRouter()
router.register(r'generos', GeneroViewSet)
router.register(r'filmes', FilmeViewSet)
router.register(r'avaliacoes', AvaliacaoViewSet)

urlpatterns = [
    path('', include(router.urls)), # Mude a linha 10 para isso
]