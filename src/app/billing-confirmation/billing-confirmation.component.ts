import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-billing-confirmation',
  templateUrl: './billing-confirmation.component.html',
  styleUrls: ['./billing-confirmation.component.css']
})
export class BillingConfirmationComponent implements OnInit {
  productName: string = '';
  location: string = '';
  user: any = { name: '' }; // Replace this with your actual user data structure

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.productName = params['productName'];
      this.location = params['location'];
      // You should retrieve user information here as well
      // Example: this.user = params.user;
    });
  }
}
