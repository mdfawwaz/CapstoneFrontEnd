import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductSelectionComponent } from './product-selection/product-selection.component';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
   
  private baseUrl = 'http://localhost:8080/api/selection';
  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }
  getProductDetails(productId: number): Observable<ProductSelectionComponent[]> {
    return this.http.get<ProductSelectionComponent[]>(`${this.baseUrl}/${productId}/details`);
  }
  getProductFeatures(productId: number): Observable<ProductSelectionComponent[]> {
    return this.http.get<ProductSelectionComponent[]>(`${this.baseUrl}/${productId}/features`);
  }
  getProductQuantities(productId:number): Observable<ProductSelectionComponent[]> {
    return this.http.get<ProductSelectionComponent[]>(`${this.baseUrl}/${productId}`);
  }
}
