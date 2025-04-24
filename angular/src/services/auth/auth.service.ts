import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { response } from 'express';
import { jwtDecode } from 'jwt-decode';
import { log } from 'console';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7143/api/User';

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  getUserId(): number | null {
    const userJson = localStorage.getItem('user'); // שליפת ה-JSON מה-session storage
  
    if (userJson) {
      const user = JSON.parse(userJson); // המרת ה-JSON לאובייקט
      const userId = user.id; // שליפת ה-ID של המשתמש
      return userId;
  }
  return null;
}
  

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (token) return true;
    return false;
  }


  getToken(): any {
    return localStorage.getItem('authToken');
  }
  
  

  updateToken(response: any): void {
    const token = response.token;
    if (token) {
      localStorage.setItem('authToken', token);
    }
  }


  login(Email: string, Password: string): Observable<any> {
    return this.http
      .post(
        `${this.apiUrl}/login`,
        { Email, Password },
        { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
      )
      .pipe(
        tap((response: any) => {
          this.updateToken(response);
        })
      );
  }

  register(
    UserId:string,
    Name: string,
    Email: string,
    PasswordHash: string,
  ): Observable<any> {
    return this.http
      .post(
        `${this.apiUrl}/register`,
        { UserId,Name, Email, PasswordHash },
        { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
      )
      .pipe(
        tap((response: any) => {
          this.updateToken(response);
        })
      );
  }

  logout(): void {
     localStorage.removeItem('authToken');
  }
}
