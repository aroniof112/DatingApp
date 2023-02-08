import { Component, OnInit } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {}

  constructor(public accountService: AccountService) {}

  ngOnInit(): void {
  }
 
  login(){
    this.accountService.login(this.model)
    .pipe(
      catchError(error => {
        console.error(error);
        return of([]);
      }),
    )
    .subscribe(
      response => {
        console.log(response)
      },
    )
  }

  logout(){
    this.accountService.logout();
  }
}
