from django.shortcuts import render
from rest_framework import viewsets, generics
from .serializers import ClientSerializer, AppointmentSerializer
from .models import Client, ScheduleItem
from .helper import schedule
from django.http import HttpResponse


# Create your views here.

class ClientView(viewsets.ModelViewSet):
    serializer_class = ClientSerializer
    queryset = Client.objects.all()

class AppointmentView(generics.ListAPIView):
    serializer_class = AppointmentSerializer
    
    def get_queryset(self):
        """
        This view should return a list of all the appointments
        for the currently authenticated user.
        """
        print(self.request.user)
        print(self.request.GET.get('user',''))
        # print(user)

        return ScheduleItem.objects.filter(psw__name=self.request.GET.get('user',''))

def main(request):
    schedule()
    return HttpResponse("Processed the closest PSWs")

