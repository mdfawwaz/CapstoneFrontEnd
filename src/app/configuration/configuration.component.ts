import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from '../location.service';
import { ProductService } from '../product.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  dataService: any;

onChangeLocation(event: any) {
  this.selectedLocation = event.target.value;
}
onChangeProduct(event: any) {
  this.selectedProduct = event.target.value;
}
  selectedLocation: any;
  changedPrice: any;
  selectedProduct: any;
  selectedQuantity: number = 1; // Add this line
  products: any[] = [];
  price: number = 0;
  selectedPrice:number | undefined; // Add this line  details:any;
  productEnabled: boolean = false;
  locations: any[] = [];
  productQuantities: number[] = [];
  availableQuantity: any; // New property to track available quantity
  onChangeQuantity() {
    this.changedPrice = this.selectedQuantity * this.price;
  }

  constructor(
    private router: Router,
    private locationService: LocationService,
    private productService: ProductService,
    private authService: AuthService,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.selectedProduct = params['name'];
      this.availableQuantity = params['maxProductsPerLocation'];
      this.price = params['price'];
    });
    this.loadLocations();
    this.loadProducts();
  }

  loadLocations() {
    this.locationService.getLocations().subscribe(
      (locations) => {
        this.locations = locations;
      },
      (error) => {
        console.error('Error loading locations:', error);
      }
    );
  }

  loadProducts() {
    this.productService.getProducts().subscribe(
      (products) => {
        this.products = products;
      },
      (error) => {
        console.error('Error loading products:', error);
      }
    );
  }

  updateAvailableQuantity() {
    if (this.selectedProduct && this.selectedLocation) {
      this.availableQuantity = this.selectedProduct.maxProductsPerLocation;
    }
  }

  reduceAvailableQuantity() {
    if (this.availableQuantity > 0) {
      this.availableQuantity--;
    }
  }

  enableProduct() {
    this.productEnabled = true;
  }

  saveConfiguration() {
    if (this.selectedProduct && this.selectedLocation) {
      const billingData = {
        productName: this.selectedProduct + '|' + this.price + '|' + this.availableQuantity,
        location: this.selectedLocation,
      };

      console.log(billingData);

      this.http.post<any>(`http://localhost:8080/api/billing`, billingData).subscribe(
        (response: any) => {
          console.log('Billing data saved successfully:', response);
        }
      );
    } else {
      console.error('Please select a product and a location before saving.');
    }
  }
  

  loadProductQuantities() {
    this.http.get<number[]>('http://localhost:8080/api/productQuantities').subscribe(
      (quantities) => {
        this.productQuantities = quantities; // Update the productQuantities array
      },
      (error) => {
        console.error('Error loading product quantities:', error);
      }
    );
  }
  

}
