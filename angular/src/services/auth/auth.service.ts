// import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable, tap } from 'rxjs';
// import { response } from 'express';
// import { jwtDecode } from 'jwt-decode';
// import { log } from 'console';
// import { isPlatformBrowser } from '@angular/common';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private apiUrl = 'https://localhost:7143/api/auth';

//   constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

//   getUserId(): number | null {
//     const userJson = sessionStorage.getItem('user'); // שליפת ה-JSON מה-session storage
  
//     if (userJson) {
//       const user = JSON.parse(userJson); // המרת ה-JSON לאובייקט
//       const userId = user.id; // שליפת ה-ID של המשתמש
//       return userId;
//   }
//   return null;
// }
  

//   isLoggedIn(): boolean {
//     const token = this.getToken();
//     if (token) return true;
//     return false;
//   }


//   getToken(): any {
//     return sessionStorage.getItem('authToken');
//   }
  
  

//   updateToken(response: any): void {
//     const token = response.token;
//     if (token) {
//       sessionStorage.setItem('authToken', token);
//     }
//   }


//   login(Email: string, Password: string): Observable<any> {
//     return this.http
//       .post(
//         `${this.apiUrl}/login`,
//         { Email, Password },
//         { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
//       )
//       .pipe(
//         tap((response: any) => {
//           this.updateToken(response);
//         })
//       );
//   }

//   register(
//     UserId:string,
//     Name: string,
//     Email: string,
//     PasswordHash: string,
//   ): Observable<any> {
//     return this.http
//       .post(
//         `${this.apiUrl}/register`,
//         { UserId,Name, Email, PasswordHash },
//         { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
//       )
//       .pipe(
//         tap((response: any) => {
//           this.updateToken(response);
//         })
//       );
//   }

//   logout(): void {
//      sessionStorage.removeItem('authToken');
//   }
// }


interface JwtPayload {
  email: string;
  role: number;
  name: string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string;
}

import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Add an event emitter to notify components of login status changes
  loginStatusChanged = new EventEmitter<boolean>();
  
  private apiUrl =  `${environment.apiUrl}/api/auth` // Adjust this URL to your auth endpoint

  constructor(private http: HttpClient) {}

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      mergeMap((response: any) => {
        const decoded = jwtDecode<JwtPayload>(response.token);
        const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        console.log("======================");
        
        console.log('Decoded JWT:', decoded);
        console.log('User role:', role);


        
        if (role === 'Admin') {
          sessionStorage.setItem('admin', JSON.stringify(decoded));
          this.loginStatusChanged.emit(true);
          return of(response); // מחזיר את התגובה הרגילה
        } else {
          console.log("errorrrrrrrrrrr");
          
          return throwError(() => new Error('גישה מותרת למנהלים בלבד'));
        }
      })
    );
  }

  logout(): void {
    // Remove user data from session storage
    sessionStorage.removeItem('admin');
    // Emit login status change
    this.loginStatusChanged.emit(false);
  }

  isLoggedIn(): boolean {
    // Check if user data exists in session storage
    return sessionStorage.getItem('admin') !== null;
  }

  getUserId(): number | null {
    const userJson = sessionStorage.getItem('admin');
    if (userJson) {
      const user = JSON.parse(userJson);
      return user.id;
    }
    return null;
  }

    getToken(): any {
    return sessionStorage.getItem('authToken');
  }


  isAdmin(): boolean {
    // החזר true אם המשתמש הוא מנהל
    // return this.currentUser?.role === 'admin' || false;
    return true;
  }
}