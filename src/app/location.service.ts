// location.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private apiUrl = 'http://localhost:8080/api/location';

  constructor(private http: HttpClient) {}

  saveLocation(locationData: any): Observable<any> {    
    return this.http.post(`${this.apiUrl}/save`, locationData);
  }

  getLocations(): Observable<any> {
    return this.http.get(`${this.apiUrl}/get`);
  }
}

  
    // Use JSON.stringify with the plain object
    //return this.http.post<any>('http://localhost:8080/api/location', JSON.stringify(plainLocation));

