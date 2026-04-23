import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User, Trip } from '../../models';
import {DestinationService} from "../../services/destination.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  currentUser$: Observable<User | null>;
  isAuthenticated = false;
  tripCount = 0;
  destinationsCount = 0;
  completedCount = 0;
  private sub: Subscription | null = null;

  constructor(private authService: AuthService, private router: Router, private destService: DestinationService) {
    this.currentUser$ = this.authService.currentUser;
  }

  ngOnInit(): void {
    this.sub = this.authService.currentUser.subscribe(user => {
      this.isAuthenticated = !!user;
      if (this.isAuthenticated) this.loadStats();
    });
  }

  ngOnDestroy(): void { this.sub?.unsubscribe(); }

  loadStats(): void {
  // Fetch fresh data from the API
  this.destService.getMyTrips().subscribe({
    next: (trips: Trip[]) => {
      // 1. Total Trips
      this.tripCount = trips.length;

      // 2. Unique Destinations (using optional chaining for safety)
      this.destinationsCount = new Set(
        trips.map(t => t.destination?.id).filter(id => id !== undefined)
      ).size;

      // 3. Completed Trips
      // We calculate completion the same way as the MyTrips page
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      this.completedCount = trips.filter(t => {
        const returnDate = new Date(t.end_date);
        // Count it if it's explicitly marked 'completed' OR if the date has passed
        return t.status === 'completed' || returnDate < today;
      }).length;
    },
    error: (err) => {
      console.error("Could not load stats from API", err);
      // Fallback to local storage if API fails
      const raw = localStorage.getItem('myTrips');
      const trips: Trip[] = raw ? JSON.parse(raw) : [];
      this.tripCount = trips.length;
      this.completedCount = trips.filter(t => t.status === 'completed').length;
    }
  });
}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
