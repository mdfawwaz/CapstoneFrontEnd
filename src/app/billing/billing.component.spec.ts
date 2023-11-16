// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { BillingComponent } from './billing.component';

// describe('BillingComponent', () => {
//   let component: BillingComponent;
//   let fixture: ComponentFixture<BillingComponent>;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [BillingComponent]
//     });
//     fixture = TestBed.createComponent(BillingComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should have a title', () => {
//     const title = fixture.nativeElement.querySelector('h3');
//     expect(title.textContent).toContain('Billing Page');
//   });

//   it('should display product name', () => {
//     component.billingData = { name: 'Sample Product' };
//     fixture.detectChanges();
//     const productName = fixture.nativeElement.querySelector('p strong:contains("Product Name:")');
//     expect(productName.nextSibling.textContent.trim()).toBe('Sample Product');
//   });

//   it('should display product details', () => {
//     component.billingData = { productDetails: 'Sample Product Description' };
//     fixture.detectChanges();
//     const productDetails = fixture.nativeElement.querySelector('p strong:contains("Product Details:")');
//     expect(productDetails.nextSibling.textContent.trim()).toBe('Sample Product Description');
//   });

//   it('should display the price', () => {
//     component.billingData = { price: 99.99 };
//     fixture.detectChanges();
//     const price = fixture.nativeElement.querySelector('p strong:contains("Price:")');
//     expect(price.nextSibling.textContent.trim()).toBe('$99.99');
//   });

//   it('should display the location', () => {
//     component.billingData = { location: 'Your Location' };
//     fixture.detectChanges();
//     const location = fixture.nativeElement.querySelector('p strong:contains("Location:")');
//     expect(location.nextSibling.textContent.trim()).toBe('Your Location');
//   });
// });