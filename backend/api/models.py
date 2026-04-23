from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Destination(models.Model):
    name = models.CharField(max_length=200)
    country = models.CharField(max_length=200)
    image = models.CharField(max_length=255, null=True, blank=True)
    region = models.CharField(max_length=200)
    description = models.TextField()
    short_description = models.TextField()
    rating = models.FloatField()

    def __str__(self):
        return self.name

class Trip(models.Model):
    STATUS_CHOICES = [
        ('planned','Planned'),
        ('ongoing','Ongoing'),
        ('completed','Completed'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    destination = models.ForeignKey(Destination, on_delete=models.CASCADE)
    start_date=models.DateField()
    end_date=models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='planned')

    def __str__(self):
        return self.user.username

class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    destination = models.ForeignKey(Destination, on_delete=models.CASCADE)
    rating = models.FloatField()
    comment = models.TextField()

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True)