from django.urls import path
from .views import NotesListAPIView, CreateNoteAPIView, UpdateNoteAPIView, DeleteNoteAPIView

urlpatterns = [
    path("notes/", NotesListAPIView.as_view(), name="notes-list"),
    path("notes/create/", CreateNoteAPIView.as_view(), name="create-note"),
    path('notes/update/<int:pk>/', UpdateNoteAPIView.as_view(), name='note-update'),
    path('notes/delete/<int:pk>/', DeleteNoteAPIView.as_view(), name='note-delete'),
]