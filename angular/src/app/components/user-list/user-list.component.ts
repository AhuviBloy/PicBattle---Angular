import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../shared/services/auth/auth.service';
import { UserService } from '../../shared/services/user/user.service';
import { TableFilterPipe } from '../../shared/pipes/table-filter.pipe';

interface User {
  id: number;
  name?: string;
  username: string;
  email: string;
  role: number;
  createdDate?: Date;
  lastLogin?: Date;
}

@Component({
  selector: 'app-user-list',
  standalone: true,
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatChipsModule,
    MatSelectModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
})
export class UserListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'createdDate',
    'actions',
  ];
  dataSource = new MatTableDataSource<User>();

  loading: boolean = true;
  isAdmin: boolean = false;
  currentUserId: number = 0;
  searchControl = new FormControl('');


  roleOptions = [
    { value: 'all', label: 'כל התפקידים' },
    { value: '1', label: 'משתמש רגיל' },
    { value: '2', label: 'מנהל' },
  ];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.checkAdminStatus();
    this.getCurrentUserId();
    this.loadUsers();
  }

  private checkAdminStatus(): void {
    this.isAdmin = this.authService.isAdmin();
  }

  private getCurrentUserId(): void {
    this.currentUserId = this.authService.getUserId() || 0;
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getAllUsers().subscribe({
      next: (data: User[]) => {
        // סינון משתמשי מנהל ראשי (role 0)
        this.dataSource.data = data.filter((user) => user.role !== 0);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
        this.showMessage('שגיאה בטעינת רשימת המשתמשים', 'error');
        this.loading = false;
      },
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
          this.loadUsers();
        },
        error: (error) => {
          console.error('Error deleting user:', error);
          this.showMessage('שגיאה במחיקת המשתמש', 'error');
        },
      });
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchControl.setValue(filterValue); // עדכן גם את FormControl
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  clearFilters(): void {
    this.searchControl.setValue('');
    this.dataSource.filter = '';
  }
  

  exportData(): void {
    const csvData = this.dataSource.filteredData.map((user) => ({
      מזהה: user.id,
      שם: user.name || user.username,
      אימייל: user.email,
      'תאריך הצטרפות': user.createdDate
        ? new Date(user.createdDate).toLocaleDateString('he-IL')
        : '',
      'כניסה אחרונה': user.lastLogin
        ? new Date(user.lastLogin).toLocaleDateString('he-IL')
        : '',
    }));

    if (csvData.length === 0) {
      this.showMessage('אין נתונים לייצוא', 'error');
      return;
    }

    const csvContent = this.convertToCSV(csvData);
    this.downloadCSV(
      csvContent,
      `users-list-${new Date().toISOString().split('T')[0]}.csv`
    );
    this.showMessage(`${csvData.length} רשומות יוצאו בהצלחה`, 'success');
  }

  private convertToCSV(data: any[]): string {
    if (data.length === 0) return '';

    // הוספת BOM לתמיכה בעברית
    const BOM = '\uFEFF';

    // יצירת כותרות
    const headers = Object.keys(data[0]);
    const headerRow = headers.map((header) => `"${header}"`).join(',');

    // יצירת שורות הנתונים
    const rows = data.map((row) =>
      headers
        .map((header) => {
          const value = row[header] || '';
          // עטיפה במרכאות כדי להתמודד עם פסיקים ועברית
          return `"${value.toString().replace(/"/g, '""')}"`;
        })
        .join(',')
    );

    return BOM + [headerRow, ...rows].join('\n');
  }

  private downloadCSV(content: string, filename: string): void {
    // יצירת Blob עם קידוד UTF-8
    const blob = new Blob([content], {
      type: 'text/csv;charset=utf-8;',
    });

    const link = document.createElement('a');

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // ניקוי הזיכרון
      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 100);
    }
  }

  private showMessage(message: string, type: 'success' | 'error'): void {
    this.snackBar.open(message, 'סגור', {
      duration: 3000,
      panelClass: type === 'success' ? 'success-snackbar' : 'error-snackbar',
      direction: 'rtl', // תמיכה בעברית
    });
  }
}
