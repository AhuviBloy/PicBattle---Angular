// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { MatCardModule } from '@angular/material/card';
// import { MatButtonModule } from '@angular/material/button';
// import { MatInputModule } from '@angular/material/input';
// import { UserService } from '../../services/user/user.service';

// @Component({
//   selector: 'app-user-list',
//   standalone: true,
//   templateUrl: './user-list.component.html',
//   styleUrls: ['./user-list.component.css'],
//   imports: [CommonModule, MatCardModule, MatButtonModule, MatInputModule]
// })
// export class UserListComponent implements OnInit {
//   users: any[] = [];

//   constructor(private userService: UserService) { }

//   ngOnInit(): void {
//     this.loadUsers();
//   }

//   loadUsers(): void {
//     this.userService.getAllUsers().subscribe(
//       (data: any[]) => {
//         this.users = data;
//       },
//       (error) => {
//         alert('Error fetching users');
//       }
//     );
//   }
// }




import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { UserService } from '../../services/user/user.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  imports: [
    CommonModule, 
    MatCardModule, 
    MatButtonModule, 
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatChipsModule
  ]
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  loading: boolean = true;
  isAdmin: boolean = false;
  currentUserId: number = 0;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.checkAdminStatus();
    this.getCurrentUserId();
    this.loadUsers();
  }

  private checkAdminStatus(): void {
    this.isAdmin = this.authService.isAdmin();
  }

  private getCurrentUserId(): void {
    // Get current user ID to prevent self-deletion
    this.currentUserId = this.authService.getUserId() || 0;
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getAllUsers().subscribe({
      next: (data: any[]) => {
        this.users = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
        this.showMessage('שגיאה בטעינת רשימת המשתמשים', 'error');
        this.loading = false;
      }
    });
  }

  deleteUser(userId: number, userName: string): void {
    
    if (userId === this.currentUserId) {
      this.showMessage('לא ניתן למחוק את המשתמש הנוכחי', 'error');
      return;
    }

    if (confirm(`האם אתה בטוח שברצונך למחוק את המשתמש "${userName}"?`)) {
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          this.showMessage('המשתמש נמחק בהצלחה', 'success');
          this.loadUsers(); // Refresh the list
        },
        error: (error) => {
          console.error('Error deleting user:', error);
          this.showMessage('שגיאה במחיקת המשתמש', 'error');
        }
      });
    }
  }

  getRoleColor(role: string): string {
    switch (role?.toLowerCase()) {
      case '1':
        return 'primary';
      default:
        return '';
    }
  }

  getRoleIcon(role: string): string {
    switch (role?.toLowerCase()) {
      case '0':
        return 'admin_panel_settings';
      default:
        return 'person';
    }
  }

  private showMessage(message: string, type: 'success' | 'error'): void {
    this.snackBar.open(message, 'סגור', {
      duration: 3000,
      panelClass: type === 'success' ? 'success-snackbar' : 'error-snackbar'
    });
  }
}