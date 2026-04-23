import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Destination, Trip } from '../models';
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class DestinationService {
  private apiUrl = 'http://localhost:8000/api';
  constructor(private http: HttpClient) {}


  getDestinations(region?: string, searchTerm?: string): Observable<Destination[]> {
    return this.http.get<Destination[]>(`${this.apiUrl}/destinations`, {
      params: {
        region: region || '',
        search: searchTerm || ''
      }
    });
  }

  getDestinationById(id: number): Observable<Destination> {
    return this.http.get<Destination>(`${this.apiUrl}/destinations/${id}`);
  }

  getRegions(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/regions`);
  }

  createTrip(destinationId: number, startDate: string, endDate: string) {
    return this.http.post<Trip>(`${this.apiUrl}/my-trips`, {
      destination: destinationId,
      start_date: startDate,
      end_date: endDate
    });
  }

  getMyTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.apiUrl}/my-trips`);
  }

  deleteTrip(id: number) {
    return this.http.delete(`${this.apiUrl}/my-trips/${id}`);
  }


  updateTrip(id: number, data: any): Observable<Trip> {
    return this.http.put<Trip>(`${this.apiUrl}/my-trips/${id}`, data);
  }
}
