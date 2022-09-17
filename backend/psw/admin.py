from django.contrib import admin
from .models import Client

class ClientAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'completed')

# Register your models here.

admin.site.register(Client, ClientAdmin)


