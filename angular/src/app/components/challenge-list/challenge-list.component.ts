
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { AddChallengeDialogComponent } from '../add-challenge-dialog/add-challenge-dialog.component';
import { AuthService } from '../../shared/services/auth/auth.service';
import { ChallengeService } from '../../shared/services/challenge/challenge.service';

@Component({
  selector: 'app-challenge-list',
  standalone: true,
  templateUrl: './challenge-list.component.html',
  styleUrl: './challenge-list.component.css',
  imports: [
    CommonModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule,
    MatInputModule
  ]
})
export class ChallengeListComponent implements OnInit {
  challenges: any[] = [];
  
  constructor(
    private challengeService: ChallengeService,
    public dialog: MatDialog,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadChallenges();
  }

  private loadChallenges(): void {
    if (this.authService.isLoggedIn()) {
      this.challengeService.getAllChallenge().subscribe({
        next: (data: any[]) => {
          this.challenges = data;
        },
        error: (error) => {
          console.error('Error fetching challenges:', error);
          alert('Error fetching challenges');
        }
      });
    }
  }

  openAddChallengeDialog(): void {
    const dialogRef = this.dialog.open(AddChallengeDialogComponent, {
      width: '500px',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.challengeService.addChallenge(result).subscribe({
          next: (response: any) => {
            console.log('Challenge added successfully:', response);
            this.loadChallenges(); // Refresh the list
            alert('Challenge added successfully!');
          },
          error: (error: any) => {
            console.error('Error adding challenge:', error);
            alert('Error adding challenge');
          },
        });
      }
    });
  }

  viewCreations(challengeId: number): void {
    // Navigate to creations view for this challenge
    console.log("=======================================");
    console.log(`Navigating to creations for challenge ID: ${challengeId}`);
    this.router.navigate(['/creations', challengeId]);
  }

  // viewChallengeDetails(challengeId: number): void {
  //   // Navigate to challenge details or open details modal
  //   this.router.navigate(['/challenge-details', challengeId]);
  // }
  
}