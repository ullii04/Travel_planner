import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DestinationService } from '../../services/destination.service';
import { AuthService } from '../../services/auth.service';
import { Destination } from '../../models';

@Component({
  selector: 'app-destination-detail',
  templateUrl: './destination-detail.component.html',
  styleUrls: ['./destination-detail.component.css']
})
export class DestinationDetailComponent implements OnInit {
  destination: Destination | null = null;
  tripForm!: FormGroup;
  loading: boolean = false;
  error: string = '';
  successMessage: string = '';
  isAuthenticated: boolean = false;

  starsArray = [0, 1, 2, 3, 4];   
  userRating  = 0;                
  hoverRating = 0;
  justRated   = false;             
  baseRating  = 0;                
  totalVotes  = 0;                 
  ratingSum   = 0;                 
  get displayRating(): number {
    return this.totalVotes > 0
      ? Math.round((this.ratingSum / this.totalVotes) * 10) / 10
      : this.baseRating;
  }

  get fullStars(): number {
    return Math.floor(this.displayRating);
  }

  get hasHalfStar(): boolean {
    return this.displayRating - this.fullStars >= 0.5;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private destService: DestinationService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadDestination();
  }

  initializeForm(): void {
    this.tripForm = this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate:   ['', Validators.required]
    });
  }

  loadDestination(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { this.error = 'Destination not found'; return; }

    this.destService.getDestinationById(Number(id)).subscribe({
      next: (data) => {
        this.destination = data;
        this.baseRating  = data.rating;

        const saved = localStorage.getItem(`rating_${data.id}`);
        if (saved) {
          const parsed = JSON.parse(saved);
          this.totalVotes = parsed.totalVotes;
          this.ratingSum  = parsed.ratingSum;
          this.userRating = parsed.userRating;
        } else {
          this.totalVotes = 500;
          this.ratingSum  = Math.round(data.rating * 500 * 10) / 10;
        }
      },
      error: () => { this.error = 'Failed to load destination details'; }
    });
  }

  submitRating(stars: number): void {
    if (!this.destination) return;

    if (this.userRating > 0) {
      this.ratingSum -= this.userRating;
      this.totalVotes--;
    }

    this.userRating  = stars;
    this.ratingSum  += stars;
    this.totalVotes++;

    this.justRated = true;
    setTimeout(() => this.justRated = false, 600);

    this.saveRating();
  }

  resetRating(): void {
    if (!this.destination || this.userRating === 0) return;
    this.ratingSum  -= this.userRating;
    this.totalVotes--;
    this.userRating  = 0;
    this.saveRating();
  }

  private saveRating(): void {
    if (!this.destination) return;
    localStorage.setItem(`rating_${this.destination.id}`, JSON.stringify({
      totalVotes: this.totalVotes,
      ratingSum:  this.ratingSum,
      userRating: this.userRating
    }));
  }

  onCreateTrip(): void {
    if (!this.isAuthenticated) { this.router.navigate(['/login']); return; }
    if (this.tripForm.invalid || !this.destination) {
      this.error = 'Please fill in all required fields'; return;
    }

    this.loading = true;
    this.error = '';
    this.successMessage = '';

    const { startDate, endDate } = this.tripForm.value;
    this.destService.createTrip(this.destination.id, startDate, endDate).subscribe({
      next: () => {
        this.loading = false;
        this.successMessage = 'Trip created successfully!';
        this.tripForm.reset();
        setTimeout(() => this.router.navigate(['/my-trips']), 2000);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Failed to create trip';
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/destinations']);
  }
}