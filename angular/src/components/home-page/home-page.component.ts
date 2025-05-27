// import { Component, inject } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { AuthService } from '../../services/auth/auth.service';
// import { MatButton } from '@angular/material/button';
// import { MatDialog } from '@angular/material/dialog';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
// import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';
// import { Router, RouterModule, RouterOutlet } from '@angular/router';
// import { ChallengeListComponent } from "../challenge-list/challenge-list.component";

// @Component({
//   selector: 'app-home-page',
//   standalone: true,
//   imports: [
//     CommonModule,
//     MatToolbarModule,
//     RouterModule,
//     ChallengeListComponent
// ],
//   templateUrl: './home-page.component.html',
//   styleUrl: './home-page.component.css',
// })
// export class HomePageComponent {
//   readonly loginDialog = inject(MatDialog);
//   readonly registerDialog = inject(MatDialog);

//   constructor(private authService: AuthService, private router: Router) {}
//   isLoggedIn(): boolean {
//     return this.authService.isLoggedIn();
//   }

// }




import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router
  ) {}

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && this.authService.isLoggedIn()) {
        // Navigate to challenges page after successful login
        this.router.navigate(['/challenges']);
      }
    });
  }
}