import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { AuthService } from './shared/services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SideMenuComponent, HomePageComponent, CommonModule],
  template: `
    @if(isLoggedIn) {
    <app-side-menu></app-side-menu>
    } @else {
    <app-home-page></app-home-page>
    }
  `,
})
export class AppComponent implements OnInit {
  isLoggedIn = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Check initial login status
    this.isLoggedIn = this.authService.isLoggedIn();

    // Subscribe to login status changes
    this.authService.loginStatusChanged.subscribe((status: boolean) => {
      this.isLoggedIn = status;
    });
  }
}
