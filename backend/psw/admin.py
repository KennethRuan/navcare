from django.contrib import admin
from .models import Client, PSW, ScheduleItem

class ClientAdmin(admin.ModelAdmin):
    list_display = ('name', 'latitude', 'longitude', 'notes')

class PSWAdmin(admin.ModelAdmin):
    list_display = ('name', 'latitude', 'longitude')

class ScheduleItemAdmin(admin.ModelAdmin):
    list_display = ('psw', 'date', 'client', 'appointment_desc', 'latitude', 'longitude', 'start_time', 'end_time')


# Register your models here.

admin.site.register(Client, ClientAdmin)
admin.site.register(PSW, PSWAdmin)
admin.site.register(ScheduleItem, ScheduleItemAdmin)




