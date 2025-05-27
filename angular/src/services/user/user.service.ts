// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { User } from '../../models/user';


// @Injectable({ providedIn: 'root' })
// export class UserService {
//   private apiUrl = 'https://yourapi.com/api/users';

//   constructor(private http: HttpClient) {}

//   getAllUsers(): Observable<User[]> {
//     return this.http.get<User[]>(this.apiUrl);
//   }

//   deleteUser(id: string): Observable<any> {
//     return this.http.delete(`${this.apiUrl}/${id}`);
//   }
// }




import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/api/user` ;

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/userId/${id}`);
  }

  getUserByEmail(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/userEmail/${email}`);
  }

  updateUser(id: number, userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, userData);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}