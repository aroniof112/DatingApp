import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, of, take } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @Input() appHasPatientRole!: boolean;
  model: any = {}
  user!: User | null;

  constructor(public accountService: AccountService,
    private router: Router, private toastr: ToastrService) {
    }

    ngOnInit(): void {
      this.accountService.currentUser$.subscribe(user => {
        this.user = user;
      });
    }
 
  login() {
    this.accountService.login(this.model).subscribe(() => {
      if(this.isUserMember())
      {
        this.router.navigateByUrl('/doctors');
      }
      else {
        this.router.navigateByUrl('/members');
      }
      
    });
  }

  isUserMember(): boolean {
    return this.user?.roles.includes('Member') ?? false;
  }

  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
