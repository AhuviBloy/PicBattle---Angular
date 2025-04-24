import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ChallengeListComponent } from "../challenge-list/challenge-list.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    RouterModule,
    ChallengeListComponent
],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  readonly loginDialog = inject(MatDialog);
  readonly registerDialog = inject(MatDialog);

  constructor(private authService: AuthService, private router: Router) {}
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

}
