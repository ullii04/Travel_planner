import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../models';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  currentUser$: Observable<User | null>;
  isAuthenticated: boolean = false;
  private authSubscription: Subscription | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.currentUser$ = this.authService.currentUser;
  }

  ngOnInit(): void {
    // Подписываемся в ngOnInit, чтобы Angular корректно отслеживал изменения
    this.authSubscription = this.authService.currentUser.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy(): void {
    // Отписываемся при уничтожении компонента, чтобы избежать утечек памяти
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  navigateHome(): void {
    this.router.navigate(['/home']);
  }

  navigateDestinations(): void {
    this.router.navigate(['/destinations']);
  }

  navigateTrips(): void {
    this.router.navigate(['/my-trips']);
  }

  navigateLogin(): void {
    this.router.navigate(['/login']);
  }

  navigateRegister(): void {
    this.router.navigate(['/register']);
  }

  navigateProfile(): void {
    this.router.navigate(['/profile']);
  }
}
