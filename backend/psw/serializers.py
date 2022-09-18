from rest_framework import serializers
from django.http import HttpResponse
from .models import Client, ScheduleItem

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ('id', 'name', 'address', 'description', 'completed')

class AppointmentSerializer(serializers.ModelSerializer):
    client_name = serializers.ReadOnlyField(source='client.name')
    client_notes = serializers.ReadOnlyField(source='client.notes')

    class Meta:
        model = ScheduleItem
        fields=('psw',
        'client', 
        'client_name',
        'client_notes',
        'appointment_desc',
        'latitude',
        'longitude',
        'start_time',
        'end_time')

