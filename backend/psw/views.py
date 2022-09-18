from django.shortcuts import render
from rest_framework import viewsets, generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import ClientSerializer, AppointmentSerializer
from .models import Client, ScheduleItem
from .helper import schedule
from datetime import datetime
from django.http import HttpResponse
from django.utils.decorators import method_decorator

from django.views.decorators.csrf import csrf_exempt


# Create your views here.

class ClientView(viewsets.ModelViewSet):
    serializer_class = ClientSerializer
    queryset = Client.objects.all()

@method_decorator(csrf_exempt, name='dispatch')
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

        data = request.data['data']

        print(data)

        schedule_item = {}
        schedule_item["cli_name"] = data['name']
        schedule_item["cli_lat"] = data['lat']
        schedule_item["cli_lon"] = data['long']
        schedule_item["cli_notes"] = data['extraInfo']
        schedule_item["date"] = datetime.today().strftime('%Y%m%d')
        schedule_item["start_time"] = int(data['hour']) + int(data['minute'])
        schedule_item["end_time"] = int(schedule_item["start_time"]) + int(data['endTime'])
        schedule_item["apmt_desc"] = data['description']

        # print(schedule_item)
        schedule(schedule_item)

        return Response({}, status=status.HTTP_200_OK)    

def main(request):
    # schedule()
    return HttpResponse("Processed the closest PSWs")

