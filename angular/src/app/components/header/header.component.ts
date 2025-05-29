import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';
import { AuthService } from '../../shared/services/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone:true,
  imports: [CommonModule,
    MatButton,
    MatToolbarModule,
    RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  readonly loginDialog = inject(MatDialog);
  readonly registerDialog = inject(MatDialog);

  constructor(private authService: AuthService, private router: Router) {}
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  openLoginDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.loginDialog.open(LoginDialogComponent, {
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openRegisterDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.registerDialog.open(RegisterDialogComponent, {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  
  
}
