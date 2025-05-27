// import { Component } from '@angular/core';
// import { MatInputModule } from '@angular/material/input';
// import { HeaderComponent } from "../components/header/header.component";
// import { RouterOutlet } from '@angular/router';
// import { ReactiveFormsModule } from '@angular/forms';
// import { SideMenuComponent } from '../components/side-menu/side-menu.component';


// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [MatInputModule, HeaderComponent,RouterOutlet,ReactiveFormsModule,SideMenuComponent],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css'
// })
// export class AppComponent {
//   title = 'challenge-management-system';
// }




import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CommonModule } from '@angular/common';
import { HomePageComponent } from '../components/home-page/home-page.component';
import { SideMenuComponent } from '../components/side-menu/side-menu.component';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ SideMenuComponent, HomePageComponent, CommonModule],
  template: `
    @if(isLoggedIn) {
      <app-side-menu></app-side-menu>
    } @else {
      <app-home-page></app-home-page>
    }
  `
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