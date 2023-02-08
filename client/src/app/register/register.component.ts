import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { catchError, of } from 'rxjs';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  @Output() cancelREgister = new EventEmitter();
  model: any = {};

  constructor(private accountService: AccountService) {}
  
  ngOnInit(): void {
    
  }

  register(){
    this.accountService.register(this.model).pipe(
          catchError(error => {
            console.error(error);
            return of([]);
          }),
        )
        .subscribe(response => {
          console.log(response)
          this.cancel();
        });
  }

  cancel(){
    this.cancelREgister.emit(false);
  }
}
