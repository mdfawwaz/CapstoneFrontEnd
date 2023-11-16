import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css'],
})
export class BillingComponent implements OnInit {
  productName: string|undefined;
  location: string | undefined;
  productId: string | undefined;
  productPrice: string | undefined;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.productName = params['productName'];
      this.location = params['location'];
      this.productId = params['productId'];
    });

    console.log('productName:', this.productName);
console.log('location:', this.location);
console.log('productId:', this.productId);
console.log('productPrice:', this.productPrice);

  }

  makePayment() {
    console.log('Payment logic goes here');
  }
}
