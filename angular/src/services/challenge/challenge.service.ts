import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {

  private apiUrl = 'https://localhost:7143/api/Challenge';

  constructor(private http: HttpClient) { }

  getAllChallenge(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addChallenge( challenge: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, challenge);
  }


  deleteCourse(courseId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${courseId}`);
  }

  enrollInCourse(courseId: number, userId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${courseId}/enroll`, { userId });
  }

  unenrollFromCourse(courseId: number, userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${courseId}/unenroll`, { body: { userId } });
  }

  getCoursesByStudentId(studentId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/student/${studentId}`);
  }

}
