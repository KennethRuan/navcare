from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ClientSerializer
from .models import Client
from .helper import schedule
from django.http import HttpResponse


# Create your views here.

class ClientView(viewsets.ModelViewSet):
    serializer_class = ClientSerializer
    queryset = Client.objects.all()

def main(request):

    schedule()
    
    return HttpResponse("Processed the closest PSWs")