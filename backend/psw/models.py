from django.db import models

# Create your models here.

class Client(models.Model):
    name = models.CharField(max_length=120)
    address = models.TextField()
    description = models.TextField()
    completed = models.BooleanField(default=False)

    def _str_(self):
        return self.name