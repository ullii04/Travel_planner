import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IMAGES } from '../../assets/images';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  readonly heroImage = IMAGES.hero;
  readonly ctaImage  = IMAGES.cta;

  readonly featuredImages = {
    paris:     IMAGES.paris,
    santorini: IMAGES.santorini,
    london:    IMAGES.london,
    rome:      IMAGES.rome,
  };

  constructor(private router: Router) {}

  exploreDestinations(): void {
    this.router.navigate(['/destinations']);
  }
}
