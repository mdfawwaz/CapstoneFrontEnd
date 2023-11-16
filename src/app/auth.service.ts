import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    authService: any;
    isLoggedInUser(): boolean {
      return this.isLoggedIn;
    }
   

    private apiUrl = 'http://localhost:8080/api/auth/token'; 

    constructor(private http: HttpClient,private router:Router) { }
    login(username: string, password: string): Observable<any> {
        const body = { username, password };
        return this.http.post<any>(`${this.apiUrl}`, body);
      }
    
      logout() {
        localStorage.removeItem('token');
        this.authService.isLoggedIn = false; 
        this.authService.username = undefined; 
        this.router.navigate(['/login']);
      }
      
    
      setToken(token: string): void {
        localStorage.setItem('token', token);
      }
    
      getToken(): string | null {
        return localStorage.getItem('token');
      }
    
      getHeaders(): HttpHeaders {
        const token = this.getToken();
    
        return new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        });
      }
    
      getUserScope(): string | null {
        const token = this.getToken();
    
        if (token) {
          const decodedToken = JSON.parse(atob(token.split('.')[1]));
          return decodedToken.scope;
        }
    
        return null;
      }

    get isLoggedIn(): boolean {

        let authToken = localStorage.getItem('token');

        return authToken !== null ? true : false;

    }
    getUsername(): string | undefined {
        const token = this.getToken();
        if (token) {
        
          const decodedToken = JSON.parse(atob(token.split('.')[1]));
          console.log(decodedToken);
          return decodedToken.sub;
        }
        return undefined;
      }
      
    }