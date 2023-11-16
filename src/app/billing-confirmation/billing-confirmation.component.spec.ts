import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingConfirmationComponent } from './billing-confirmation.component';

describe('BillingConfirmationComponent', () => {
  let component: BillingConfirmationComponent;
  let fixture: ComponentFixture<BillingConfirmationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BillingConfirmationComponent]
    });
    fixture = TestBed.createComponent(BillingConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
