import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import {
  MatDialogActions,
  MatDialogClose, 
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';



@Component({
  selector: 'register-dialog',
  standalone: true,
  templateUrl: './register-dialog.component.html',
  imports: [MatButtonModule, MatDialogClose, MatDialogTitle, MatDialogContent, 
    MatButtonModule, MatInputModule,MatFormFieldModule,FormsModule,MatSelectModule,MatOptionModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterDialogComponent {
  readonly dialogRef = inject(MatDialogRef<RegisterDialogComponent>);
  private authService = inject(AuthService);
  
  TZ:string='';
  name:string='';
  email: string='';
  password: string='';
  
  onSubmit(): void {
    this.authService.register(this.TZ,this.name,this.email, this.password).subscribe(response => {
      console.log('Register successful', response);

      // this.userService.setUserDetails().subscribe(
      //   (user: User) => {
      //     localStorage.setItem('user', JSON.stringify(user));
      //   },
      //   (error) => {
      //     alert('Failed to add user');
      //   }
      // );

      sessionStorage.setItem('token',response.token);

      this.close(); 
    }, error => {
      alert('Register failed');
    });
  }
  close(): void {
    this.dialogRef.close();
  }
}