import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DestinationService } from '../../services/destination.service';
import { Destination } from '../../models';

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.css']
})
export class DestinationsComponent implements OnInit {
  destinations: Destination[] = [];
  regions: string[] = [];
  loading: boolean = false;
  error: string = '';
  searchForm!: FormGroup;

  constructor(
    private destService: DestinationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadDestinations();
    this.loadRegions();
  }

  initializeForm(): void {
    this.searchForm = this.formBuilder.group({
      searchTerm: [''],
      region: ['All Regions']
    });
  }

  loadDestinations(): void {
    this.loading = true;
    this.error = '';
    this.destService.getDestinations().subscribe({
      next: (data) => {
        this.destinations = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load destinations. Please try again.';
        this.loading = false;
      }
    });
  }

  loadRegions(): void {
    this.destService.getRegions().subscribe({
      next: (data) => {
        this.regions = ['All Regions', ...data];
      }
    });
  }

  onSearch(): void {
    const searchTerm = this.searchForm.get('searchTerm')?.value;
    const region = this.searchForm.get('region')?.value;

    this.loading = true;
    this.error = '';
    this.destService.getDestinations(region, searchTerm).subscribe({
      next: (data) => {
        this.destinations = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Search failed. Please try again.';
        this.loading = false;
      }
    });
  }

  viewDetails(destinationId: number): void {
    this.router.navigate(['/destinations', destinationId]);
  }
}
