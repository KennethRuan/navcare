from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ClientSerializer
from .models import Client

# Create your views here.

class ClientView(viewsets.ModelViewSet):
    serializer_class = ClientSerializer
    queryset = Client.objects.all()