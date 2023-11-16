import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registrationpage.component.html',
  styleUrls: ['./registrationpage.component.css']
})
export class RegistrationPageComponent {
email: any;
emailError: string = ''; 


  constructor(private _http: HttpClient, private router: Router) { } 
  name: string = '';
  userpassword: string = ''
  confirmPassword: string = '';


  onSubmit() {
    const userData = {
      name: this.name,
      password: this.userpassword,
      repeatPassword: this.confirmPassword
    };

    const url = `http://localhost:8080/api/register`;
    if (this.userpassword !== this.confirmPassword) {

      alert("Passwords do not match. Please try again.");

      return;

    }

    this._http.post(url, userData, { responseType: 'text' }).subscribe({
      next: (response) => {
        console.log(userData.name);
        console.log('User registered successfully:', response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error registering user:', error);
      }
    });
    

  }

  register() {
    if (!this.isEmailValid(this.email)) {
      this.emailError = 'Invalid email format';
      return; 
    }
      if (this.userpassword !== this.confirmPassword) {
        this.emailError = 'Passwords do not match.';
      } else {
        this.emailError = ''; 
      }
    }  

  isEmailValid(email: string): boolean {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(email);
  }

  clearEmailError() {
    this.emailError = '';
  }
}

 
