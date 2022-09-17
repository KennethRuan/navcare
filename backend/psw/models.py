from tkinter import CASCADE
from django.db import models
from django.core.validators import MaxValueValidator

# Create your models here.

class Client(models.Model):
    name = models.CharField(max_length=120)
    address = models.TextField()
    description = models.TextField()

    def __str__(self):
        return self.name

# Right now it only stores one longitude and latitude, but ideally it should have diff values depending on the time
class PSW(models.Model):
    name = models.CharField(max_length=120, unique=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)

    def __str__(self):
        return self.name

class ScheduleItem(models.Model):
    psw = models.ForeignKey(PSW, db_index=True, on_delete=models.CASCADE)
    date = models.CharField(max_length = 8)
    client = models.ForeignKey('Client', on_delete=models.CASCADE)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)

    # Date is subdivided into 96, 15 minute intervals
    start_time = models.PositiveSmallIntegerField(validators=[MaxValueValidator(96)])
    end_time = models.PositiveSmallIntegerField(validators=[MaxValueValidator(96)])

    def __str__(self):
        return str(self.client) + "_" + str(self.date)



