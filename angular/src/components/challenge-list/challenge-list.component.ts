import { Component, OnInit } from '@angular/core';
import { ChallengeService } from '../../services/challenge/challenge.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth/auth.service';
import { AddChallengeDialogComponent } from '../add-challenge-dialog/add-challenge-dialog.component';

@Component({
  selector: 'app-challenge-list',
  standalone: true,
  templateUrl: './challenge-list.component.html',
  styleUrl:'./challenge-list.component.css',
  imports: [CommonModule, MatCardModule, MatButton,MatInputModule]
})
export class ChallengeListComponent implements OnInit {
  challenges: any[] = [];
  showLessons: number |null = null;
  constructor(
    private challengeService: ChallengeService,
    public dialog: MatDialog,
    private authService:AuthService) { }

  ngOnInit(): void {
    if( this.authService.isLoggedIn()){
      this.challengeService.getAllChallenge().subscribe(
        (data: any[]) => {
          this.challenges = data;
        },
        (error) => {
          // console.error('Error fetching courses:', error);
          alert('Error fetching courses');
        }
      );
    }
   
  }

  openAddChallengeDialog() {
    const dialogRef = this.dialog.open(AddChallengeDialogComponent, {
      // data: { course: courseData }, // ודא שאתה מעביר את הנתונים כראוי
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.challengeService.addChallenge(result).subscribe({
          next: (response:any) => {
            console.log('Challenge updated successfully:', response);
          },
          error: (error:any) => {
            alert('Error add challenge');
          },
        });
      }
    });
  }



  showLessonsForCourse(courseId: number): void {
    this.showLessons = this.showLessons == courseId ? null : courseId;
  }
  
  join(courseId: number): void {
    const userJson = localStorage.getItem('user'); // שליפת ה-JSON מה-session storage
  
    
      const userId = this.authService.getUserId();
      if(userId){
      this.challengeService.enrollInCourse(courseId, userId).subscribe(
        (response) => {
          console.log('Successfully enrolled in course:', response);
          alert('Successfully enrolled in course');
        },
        (error) => {
          // console.error('Error enrolling in course:', error);
          alert('Error enrolling in course');
        }
      );
    } else {
      // console.error('User not found in session storage. Please log in first.');
      alert('User not found in session storage. Please log in first.');
    }
  }
 

  leave(courseId: number): void {
    const userJson = localStorage.getItem('user');
    const user = userJson ? JSON.parse(userJson) : null;
    const userId = user.id; 
    this.challengeService.unenrollFromCourse(courseId, userId).subscribe(
      (response) => {
        console.log('Successfully unenrolled from course:', response);
        alert('Successfully unenrolled from course');
      },
      (error) => {
        // console.error('Error unenrolling from course:', error);
        alert('Error unenrolling from course');
      }
    );
  }
  
  
}
