// // Add these methods to your existing CreationService

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class CreationService {
//   private apiUrl = 'https://localhost:7143/api/creation'; // Replace with your actual API URL

//   constructor(private http: HttpClient) { }

//   // Get all creations with creator information for a specific challenge
//   getAllCreationsWithCreator(challengeId: number): Observable<any[]> {
//     return this.http.get<any[]>(`${this.apiUrl}/${challengeId}/with-creator`);
//   }

//   // Get all creations
//   getAllCreations(): Observable<any[]> {
//     return this.http.get<any[]>(`${this.apiUrl}`);
//   }

//   // Get creation by ID
//   getCreationById(id: number): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}/${id}`);
//   }

//   // Create new creation
//   createCreation(creation: any): Observable<any> {
//     return this.http.post<any>(`${this.apiUrl}`, creation);
//   }

//   // Update creation
//   updateCreation(id: number, creation: any): Observable<any> {
//     return this.http.put<any>(`${this.apiUrl}/${id}`, creation);
//   }

//   // Vote for creation
//   voteForCreation(id: number): Observable<any> {
//     return this.http.patch<any>(`${this.apiUrl}/vote/${id}`, {});
//   }

//   // Delete creation
//   deleteCreation(id: number): Observable<any> {
//     return this.http.delete<any>(`${this.apiUrl}/${id}`);
//   }

//   // Get creator name
//   getCreatorName(creationId: number): Observable<string> {
//     return this.http.get<string>(`${this.apiUrl}/${creationId}/creator-name`);
//   }

//   // Get creation description
//   getCreationDescription(creationId: number): Observable<string> {
//     return this.http.get<string>(`${this.apiUrl}/${creationId}/description`);
//   }

//   // Get upload URL for S3
//   getUploadUrl(fileName: string, contentType: string): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}/upload-url?fileName=${fileName}&contentType=${contentType}`);
//   }

//   // Get download URL from S3
//   getDownloadUrl(fileName: string): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}/download-url/${fileName}`);
//   }
// }





import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreationService {
  private apiUrl = `${environment.apiUrl}/api/creation` ; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  // Get all creations with creator information for a specific challenge
  getAllCreationsWithCreator(challengeId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${challengeId}/with-creator`);
  }

  // Get all creations
  getAllCreations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  // Get creation by ID
  getCreationById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Create new creation
  createCreation(creation: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, creation);
  }

  // Update creation - Enhanced for description updates
  updateCreation(id: number, creation: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, creation);
  }

  // Update only description - Specific method for description updates
  updateCreationDescription(id: number, description: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}/description`, { description });
  }

  // Vote for creation
  voteForCreation(id: number): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/vote/${id}`, {});
  }

  // Delete creation - Enhanced with better error handling
  deleteCreation(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // Get creator name
  getCreatorName(creationId: number): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/${creationId}/creator-name`);
  }

  // Get creation description
  getCreationDescription(creationId: number): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/${creationId}/description`);
  }

  // Get upload URL for S3
  getUploadUrl(fileName: string, contentType: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/upload-url?fileName=${fileName}&contentType=${contentType}`);
  }

  // Get download URL from S3
  getDownloadUrl(fileName: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/download-url/${fileName}`);
  }

  // Additional methods for admin functionality

  // Bulk delete creations
  bulkDeleteCreations(creationIds: number[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/bulk-delete`, { ids: creationIds });
  }

  // Get creations by status (for admin filtering)
  getCreationsByStatus(status: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/by-status/${status}`);
  }

  // Update creation status (for moderation)
  updateCreationStatus(id: number, status: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}/status`, { status });
  }

  // Get creation statistics for a challenge
  getCreationStats(challengeId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/stats/${challengeId}`);
  }
}