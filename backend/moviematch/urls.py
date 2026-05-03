
from rest_framework.routers import DefaultRouter
from .views import GeneroViewSet, FilmeViewSet, AvaliacaoViewSet

router = DefaultRouter()
router.register(r'generos', GeneroViewSet)
router.register(r'filmes', FilmeViewSet)
router.register(r'avaliacoes', AvaliacaoViewSet)

urlpatterns = router.urls