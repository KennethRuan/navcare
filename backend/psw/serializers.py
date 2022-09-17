from rest_framework import serializers
from django.http import HttpResponse
from .models import Client, ScheduleItem

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ('id', 'name', 'address', 'description', 'completed')

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScheduleItem
        fields=('psw','date','client','latitude','longitude','start_time','end_time')

