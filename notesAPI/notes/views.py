from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Notes
from .serializers import NotesSerializer

class NotesListAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        notes = Notes.objects.filter(user=request.user.id)
        serializer = NotesSerializer(notes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class CreateNoteAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data.copy()
        data["user"] = request.user.id
        serializer = NotesSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Note created successfully!", "note": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdateNoteAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        try:
            note = Notes.objects.get(pk=pk, user=request.user)
        except Notes.DoesNotExist:
            return Response({"error": "Note not found"}, status=status.HTTP_404_NOT_FOUND)

        data = request.data.copy()
        serializer = NotesSerializer(note, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Note updated successfully", "note": serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DeleteNoteAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        try:
            note = Notes.objects.get(pk=pk, user=request.user)
        except Notes.DoesNotExist:
            return Response({"error": "Note not found"}, status=status.HTTP_404_NOT_FOUND)

        note.delete()
        return Response({"message": "Note deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
