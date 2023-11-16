import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationComponent } from './configuration.component';

describe('ConfigurationComponent', () => {
  let component: ConfigurationComponent;
  let fixture: ComponentFixture<ConfigurationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigurationComponent]
    });
    fixture = TestBed.createComponent(ConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an initial title', () => {
    const title = fixture.nativeElement.querySelector('h1');
    expect(title.textContent).toContain('Configuration Settings');
  });

  it('should have a form with input fields', () => {
    const form = fixture.nativeElement.querySelector('form');
    expect(form).toBeTruthy();

    const inputFields = fixture.nativeElement.querySelectorAll('input');
    expect(inputFields.length).toBeGreaterThan(0);
  });

  it('should update input values when user interacts', () => {
    const inputField = fixture.nativeElement.querySelector('input[type="text"]');
    inputField.value = 'New Value';
    inputField.dispatchEvent(new Event('input'));

    // After the input event, check if the component's data has updated
    fixture.detectChanges();

  });

  it('should submit the form', () => {
    const form = fixture.nativeElement.querySelector('form');

    // Simulate form submission
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    // Add expectations for what should happen when the form is submitted
    // For example, you can check if a service method is called.
  });
});
