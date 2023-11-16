import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-select-page',
  templateUrl: './select-page.component.html',
  styleUrls: ['./select-page.component.css']
})
export class SelectPageComponent implements OnInit {
  quotes: any[] = []; 
  myForm: FormGroup;

  constructor(private dataService: DataService, private http: HttpClient,private authService:AuthService) {
    this.myForm = new FormGroup({
      customerName: new FormControl('', Validators.required),
      accountStatus: new FormControl('', Validators.required),
      quoteName: new FormControl('', Validators.required),
      quoteOwner: new FormControl('', Validators.required)
  });
  }

  ngOnInit() {
    this.dataService.getData().subscribe(
      (response: any) => {
          this.quotes = response.map((quote: any) => ({
              ...quote,
              userName: quote.userName ? quote.userName : 'Unknown User'
          }));
      }
  );
  }


  customerName: string = '';
  accountStatus: string = 'New';
  quoteName: string = '';
  quoteOwner: string = '';

  generateUniqueQuoteId(): string {
    const timestamp: number = Date.now();
    const randomNumber: number = Math.floor(Math.random() * 10000); 
    const quoteId: string = `Q${timestamp}-${randomNumber}`;
    return quoteId;
  }

  onSubmit() {
    const uniqueQuoteId = this.generateUniqueQuoteId();
    const data = {
      customerName: this.customerName,
      accountStatus: this.accountStatus,
      quoteName: this.quoteName,
      quoteOwner: this.quoteOwner,
      quoteId: uniqueQuoteId, 
      userName : this.authService.getUsername()
    };

    this.http.post('http://localhost:8080/api/selectpage', data).subscribe(
      (response: any) => {
        console.log('Data saved successfully', response);
      }
    );
    this.ngOnInit();
  }
}
