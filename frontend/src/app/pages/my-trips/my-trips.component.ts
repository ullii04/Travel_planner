import { Component, OnInit, OnDestroy } from '@angular/core';
import { DestinationService } from '../../services/destination.service';
import { AuthService } from '../../services/auth.service';
import { Trip } from '../../models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-trips',
  templateUrl: './my-trips.component.html',
  styleUrls: ['./my-trips.component.css']
})
export class MyTripsComponent implements OnInit, OnDestroy {
  trips: Trip[] = [];
  loading = false;
  isAuthenticated = false;
  private authSub: Subscription | null = null;

  editModalOpen = false;
  editingTrip: Trip | null = null;
  editForm = { status: 'planned' as Trip['status'], start_date: '', end_date: '' };

  deleteModalOpen = false;
  deletingTrip: Trip | null = null;

  constructor(
    private destService: DestinationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authSub = this.authService.currentUser.subscribe(user => {
      this.isAuthenticated = !!user;
      if (this.isAuthenticated) this.loadTrips();
    });
  }

  ngOnDestroy(): void { this.authSub?.unsubscribe(); }

  loadTrips(): void {
  this.loading = true;

  this.destService.getMyTrips().subscribe({
    next: (data: Trip[]) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      this.trips = data.map(trip => {
        const returnDate = new Date(trip.end_date);

        if (returnDate < today && trip.status !== 'completed') {
          return { ...trip, status: 'completed' as const };
        }
        return trip;
      });

      this.saveStoredTrips(this.trips);
      this.loading = false;
    },
    error: (err) => {
      console.error('API failed', err);
      this.trips = this.getStoredTrips();
      this.loading = false;
    }
  });
}

  getStatusBadgeClass(status: string): string {
    return `badge badge-${status}`;
  }

  openEditModal(trip: Trip): void {
    this.editingTrip = trip;
    this.editForm = {
      status: trip.status,
      start_date: trip.start_date,
      end_date: trip.end_date
    };
    this.editModalOpen = true;
  }

  closeModal(): void {
    this.editModalOpen = false;
    this.editingTrip = null;
  }

  saveEdit(): void {
  if (!this.editingTrip) return;

  const updatedData = {
    status: this.editForm.status,
    start_date: this.editForm.start_date,
    end_date: this.editForm.end_date,
    destination: this.editingTrip.destination.id
  };

  this.destService.updateTrip(this.editingTrip.id, updatedData).subscribe({
    next: (updatedTripFromBackend: Trip) => {
      this.trips = this.trips.map(t =>
        t.id === updatedTripFromBackend.id ? updatedTripFromBackend : t
      );

      this.saveStoredTrips(this.trips);
      this.closeModal();
    },
    error: (err) => {
      console.error("Save failed:", err);
      alert("Could not save changes to the server.");
    }
  });
}

  confirmDelete(trip: Trip): void {
    this.deletingTrip = trip;
    this.deleteModalOpen = true;
  }

  closeDeleteModal(): void {
    this.deleteModalOpen = false;
    this.deletingTrip = null;
  }

  deleteTrip(): void {
  if (!this.deletingTrip) return;

  this.destService.deleteTrip(this.deletingTrip.id).subscribe({
    next: () => {
      this.trips = this.trips.filter(t => t.id !== this.deletingTrip!.id);
      this.closeDeleteModal();
    },
    error: () => {
      alert("Delete failed");
    }
  });
}

  private getStoredTrips(): Trip[] {
    try {
      const raw = localStorage.getItem('myTrips');
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  }

  private saveStoredTrips(trips: Trip[]): void {
    localStorage.setItem('myTrips', JSON.stringify(trips));
  }
}
