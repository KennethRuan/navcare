from django.shortcuts import render
from rest_framework import viewsets, generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
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

        return ScheduleItem.objects.filter(psw__name=self.request.GET.get('user','')).order_by('start_time')

    def post(self, request):
        print(request.data)

        # schedule_item = {}
        # schedule_item["cli_name"] = request.cli_name
        # schedule_item["cli_lat"]
        # schedule_item["cli_lon"]
        # schedule_item["cli_notes"]
        # schedule_item["date"]
        # schedule_item["start_time"]
        # schedule_item["end_time"]
        # schedule_item["apmt_desc"]

        # schedule(schedule_item)

        return Response({}, status=status.HTTP_200_OK)    

def main(request):
    # schedule()
    return HttpResponse("Processed the closest PSWs")

