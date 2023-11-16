import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillingService {

  private baseUrl = 'http://localhost:8080/api'; // Your base URL
  private billingEndpoint = '/billing'; // Modify this to match your actual endpoint

  constructor(private http: HttpClient) {}

  getBillingData(): Observable<any> {
    const url = this.baseUrl + this.billingEndpoint;
    return this.http.get(url);
  }

  saveBilling(billingData: any) {
    const url = this.baseUrl + this.billingEndpoint;
    return this.http.post(url, billingData);
  }
}
