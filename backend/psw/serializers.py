from rest_framework import serializers
from django.http import HttpResponse
from .models import Client, ScheduleItem

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ('id', 'name', 'address', 'description', 'completed')

def displayAppointments(name):
    data = ScheduleItem.objects.filter(psw__name=name)
    post_list = serializers.serialize('json', list(data), fields=('psw','date','client','latitude','longitude','start_time','end_time'))

    return HttpResponse(post_list)

