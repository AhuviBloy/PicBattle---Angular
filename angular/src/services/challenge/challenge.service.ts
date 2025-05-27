

// import { HttpClient } from "@angular/common/http";
// import { Injectable } from "@angular/core";
// import { Observable } from "rxjs";
// import { Challenge } from "../../models/challenge";

// @Injectable({
//   providedIn: 'root'
// })
// export class ChallengeService {

//   private apiUrl = 'https://localhost:7143/api/challenge';

//   constructor(private http: HttpClient) { }

//   getAllChallenge(): Observable<any> {
//     return this.http.get(this.apiUrl);
//   }

//   addChallenge( challenge: any): Observable<any> {
//     return this.http.post(`${this.apiUrl}`, challenge);
//   }


//   deleteCourse(courseId: number): Observable<any> {
//     return this.http.delete(`${this.apiUrl}/${courseId}`);
//   }

//   enrollInCourse(courseId: number, userId: number): Observable<any> {
//     return this.http.post(`${this.apiUrl}/${courseId}/enroll`, { userId });
//   }

//   unenrollFromCourse(courseId: number, userId: number): Observable<any> {
//     return this.http.delete(`${this.apiUrl}/${courseId}/unenroll`, { body: { userId } });
//   }

//   getCoursesByStudentId(studentId: number): Observable<any> {
//     return this.http.get(`${this.apiUrl}/student/${studentId}`);
//   }

// }




// // @Injectable({ providedIn: 'root' })
// // export class ChallengeService {
// //   private apiUrl = 'https://localhost:7143/api/challenge';

// //   constructor(private http: HttpClient) {}

// //   getChallenges(): Observable<Challenge[]> {
// //     return this.http.get<Challenge[]>(this.apiUrl);
// //   }

// //   addChallenge(challenge: any): Observable<any> {
// //     return this.http.post(this.apiUrl, challenge);
// //   }
// // }











// Add these methods to your existing ChallengeService

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {
  private apiUrl = `${environment.apiUrl}/api/challenge` ; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  // Get all challenges
  getAllChallenge(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  // Get active challenges
  getActiveChallenges(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/active`);
  }

  // Get previous challenges
  getPreviousChallenges(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/previous`);
  }

  // Get creations for a specific challenge
  getCreationsForChallenge(challengeId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/creations-for-challenge/${challengeId}`);
  }

  // Get challenge by ID
  getChallengeById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Get winning creation for challenge
  getWinCreation(challengeId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/winner/${challengeId}`);
  }

  // Create new challenge
  addChallenge(challenge: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, challenge);
  }

  // Update challenge
  updateChallenge(id: number, challenge: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, challenge);
  }

  // Delete challenge
  deleteChallenge(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // Enroll in course (if this functionality exists)
  enrollInCourse(courseId: number, userId: number): Observable<any> {
    // This might need to be implemented in your backend
    return this.http.post<any>(`${this.apiUrl}/${courseId}/enroll`, { userId });
  }

  // Unenroll from course (if this functionality exists)
  unenrollFromCourse(courseId: number, userId: number): Observable<any> {
    // This might need to be implemented in your backend
    return this.http.post<any>(`${this.apiUrl}/${courseId}/unenroll`, { userId });
  }

  
}