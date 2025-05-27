
// import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
// import { MatButtonModule } from '@angular/material/button';
// import { MatInputModule } from '@angular/material/input';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
// import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AuthService } from '../../services/auth/auth.service';

// @Component({
//   selector: 'login-dialog',
//   standalone: true,
//   templateUrl: './login-dialog.component.html',
//   imports: [MatDialogModule ,MatButtonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule],
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class LoginDialogComponent {
//   readonly dialogRef = inject(MatDialogRef<LoginDialogComponent>);
//   private authService = inject(AuthService);
  
//   loginForm: FormGroup;

//   constructor(private fb: FormBuilder) {
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required]]
//     });
//   }

//   onSubmit(): void {
//     if (this.loginForm.valid) {
//       const { email, password } = this.loginForm.value;
//       this.authService.login(email, password).subscribe(response => {
//         console.log('Login successful', response);

//         // this.userService.setUserDetails().subscribe(
//         //   (token: any) => {
//         //     sessionStorage.setItem('token', JSON.stringify(token));
//         //   },
//         //   (error) => {
//         //     alert('Failed to get user details');
//         //   }
//         // );
//         sessionStorage.setItem('token',response.token);
//         this.close(); 
//       }, error => {
//         alert('Login failed');
//       });
//     }
//   }

//   close(): void {
//     this.dialogRef.close();
//   }
// }



import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent {
  credentials = {
    email: '',
    password: ''
  };
  errorMessage = '';
  isLoading = false;

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    private authService: AuthService
  ) {}

  onSubmit(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'גישה מותרת רק למנהלים';
        console.error('Login error:', error);
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}