import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, of } from 'rxjs';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {}

  constructor(public accountService: AccountService, 
    private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {
  }
 
  login() {
    this.accountService.login(this.model)
      .subscribe(
        response => {
          if (response) {
            this.router.navigateByUrl('/members');
          } else {
            this.toastr.error('Invalid username or password');
          }
        },
        error => {
          console.error(error);
          this.toastr.error(error.error);
        }
      );
  }

  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
