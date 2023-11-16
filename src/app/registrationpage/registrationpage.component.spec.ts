import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationPageComponent } from './registrationpage.component';

describe('RegistrationpageComponent', () => {
  let component: RegistrationPageComponent;
  let fixture: ComponentFixture<RegistrationPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationPageComponent]
    });
    fixture = TestBed.createComponent(RegistrationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
