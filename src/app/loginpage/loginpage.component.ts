import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginPageComponent {
  username: string = '';
  password: string = '';
  email: any;
  emailError: string = ''; 

  constructor(private authService: AuthService, private router: Router) { }
  login(): void {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        const token = response.token; 
        this.authService.setToken(token); 
        this.router.navigate(['/selectpage']);
        alert('You have successfully logged in!');
      },
      (error) => {
        console.error('Login failed:', error);
      }
    );
  }
  register() {
    
    if (!this.isEmailValid(this.email)) {
      this.emailError = 'Invalid email format';
      return; 
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

