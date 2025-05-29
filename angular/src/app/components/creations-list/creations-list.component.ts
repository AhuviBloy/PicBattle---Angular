import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../shared/services/auth/auth.service';
import { ChallengeService } from '../../shared/services/challenge/challenge.service';
import { CreationService } from '../../shared/services/creation/creation.service';

@Component({
  selector: 'app-creations-list',
  standalone: true,
  templateUrl: './creations-list.component.html',
  styleUrl: './creations-list.component.css',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule
  ]
})
export class CreationsListComponent implements OnInit {
  creations: any[] = [];
  challengeId: number = 0;
  challengeTitle: string = '';
  loading: boolean = true;
  isAdmin: boolean = false;
  editingDescription: { [key: number]: boolean } = {};
  tempDescriptions: { [key: number]: string } = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private creationService: CreationService,
    private challengeService: ChallengeService,
    private authService: AuthService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.checkAdminStatus();
    this.route.params.subscribe(params => {
      this.challengeId = +params['challengeId'];
      if (this.challengeId) {
        this.loadChallenge();
        this.loadCreations();
      }
    });
  }

  private checkAdminStatus(): void {
    // Assuming you have a method to check if user is admin
    this.isAdmin = this.authService.isAdmin();
  }

  private loadChallenge(): void {
    this.challengeService.getChallengeById(this.challengeId).subscribe({
      next: (challenge: any) => {
        this.challengeTitle = challenge.title;
      },
      error: (error) => {
        console.error('Error fetching challenge:', error);
        this.showMessage('Error loading challenge details', 'error');
      }
    });
  }

  private loadCreations(): void {
    this.loading = true;
    this.creationService.getAllCreationsWithCreator(this.challengeId).subscribe({
      next: (data: any[]) => {
        this.creations = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching creations:', error);
        this.loading = false;
        this.loadCreationsForChallenge();
      }
    });
  }

  private loadCreationsForChallenge(): void {
    this.challengeService.getCreationsForChallenge(this.challengeId).subscribe({
      next: (data: any[]) => {
        this.creations = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching creations for challenge:', error);
        this.creations = [];
        this.loading = false;
        this.showMessage('Error loading creations', 'error');
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  // openAddCreationDialog(): void {
  //   this.router.navigate(['/add-creation', this.challengeId]);
  // }

  // voteForCreation(creationId: number): void {
  //   this.creationService.voteForCreation(creationId).subscribe({
  //     next: (response: any) => {
  //       console.log('Vote added successfully:', response);
  //       this.loadCreations();
  //       this.showMessage('Vote added successfully!', 'success');
  //     },
  //     error: (error: any) => {
  //       console.error('Error voting for creation:', error);
  //       this.showMessage('Error voting for creation', 'error');
  //     }
  //   });
  // }

  // viewCreationDetails(creationId: number): void {
  //   this.router.navigate(['/creation-details', creationId]);
  // }

  deleteCreation(creationId: number, creationTitle: string): void {
    if (confirm(`Are you sure you want to delete "${creationTitle}"?`)) {
      this.creationService.deleteCreation(creationId).subscribe({
        next: () => {
          this.showMessage('Creation deleted successfully!', 'success');
          this.loadCreations();
        },
        error: (error) => {
          console.error('Error deleting creation:', error);
          this.showMessage('Error deleting creation', 'error');
        }
      });
    }
  }

  startEditDescription(creationId: number, currentDescription: string): void {
    this.editingDescription[creationId] = true;
    this.tempDescriptions[creationId] = currentDescription || '';
  }

  cancelEditDescription(creationId: number): void {
    this.editingDescription[creationId] = false;
    delete this.tempDescriptions[creationId];
  }

  saveDescription(creationId: number): void {
    const newDescription = this.tempDescriptions[creationId];
    const creation = this.creations.find(c => c.id === creationId);
    
    if (creation) {
      this.creationService.updateCreationDescription(creationId, newDescription).subscribe({
        next: () => {
          creation.description = newDescription;
          this.editingDescription[creationId] = false;
          delete this.tempDescriptions[creationId];
          this.showMessage('Description updated successfully!', 'success');
        },
        error: (error) => {
          console.error('Error updating description:', error);
          this.showMessage('Error updating description', 'error');
        }
      });
    }
  }

  private showMessage(message: string, type: 'success' | 'error'): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: type === 'success' ? 'success-snackbar' : 'error-snackbar'
    });
  }
}