from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny
from rest_framework.response import Response
from api.models import Destination, Trip
from api.serializers import DestinationSerializer, TripSerializer
from rest_framework.permissions import IsAuthenticated

class DestinationList(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request):
        region = request.GET.get('region')
        search = request.GET.get('search')

        qs = Destination.objects.all()

        if region:
            qs = qs.filter(region=region)

        if search:
            qs = qs.filter(name__icontains=search)

        serializer = DestinationSerializer(qs, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = DestinationSerializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class DestinationDetail(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, pk):
        destination = Destination.objects.get(pk=pk)
        serializer = DestinationSerializer(destination)
        return Response(serializer.data)

    def put(self, request, pk):
        destination = Destination.objects.get(pk=pk)
        serializer = DestinationSerializer(destination, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self, request, pk):
        destination = Destination.objects.get(pk=pk)
        destination.delete()
        return Response({"message": "Deleted"})



class TripListCreate(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        trips = Trip.objects.filter(user=request.user)
        serializer = TripSerializer(trips, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TripSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user,status='planned')
        return Response(serializer.data)

class TripDetail(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        trip = Trip.objects.get(pk=pk, user=request.user)
        serializer = TripSerializer(trip, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self, request, pk):
        trip = Trip.objects.get(pk=pk, user=request.user)
        trip.delete()
        return Response({"message": "Deleted"})