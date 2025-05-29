
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';

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