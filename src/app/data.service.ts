import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getData() :Observable<any>{
    return this.http.get('http://localhost:8080/api/selectpage'); // Replace with your actual API endpoint
  }

  private billingData: any;

  setBillingData(data: any) {
    this.billingData = data;
  }

  getBillingData() {
    return this.billingData;
  }
}
