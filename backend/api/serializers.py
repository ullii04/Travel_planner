from rest_framework import serializers
from .models import Destination, Trip
from django.contrib.auth import authenticate
from rest_framework import serializers
from django.contrib.auth.models import User

class DestinationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Destination
        fields = '__all__'


class TripSerializer(serializers.ModelSerializer):
    destination = serializers.PrimaryKeyRelatedField(queryset=Destination.objects.all())
    class Meta:
        model = Trip
        fields = ['id', 'destination', 'start_date', 'end_date', 'status']

    def to_representation(self, instance):
        """
        This method handles the 'Read' part.
        It transforms the destination ID into the full object for Angular.
        """
        representation = super().to_representation(instance)
        representation['destination'] = DestinationSerializer(instance.destination).data
        return representation



class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        try:
            user = User.objects.filter(email=data['email']).first()
        except User.DoesNotExist:
            raise serializers.ValidationError("User not found")

        user = authenticate(username=user.username, password=data['password'])
        if not user:
            raise serializers.ValidationError("Invalid credentials")

        data['user'] = user
        return data


class RegisterSerializer(serializers.Serializer):
    name = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField()

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['email'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data['name']
        )
        return user