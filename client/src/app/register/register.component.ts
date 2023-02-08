import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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

  constructor(private accountService: AccountService, private toastr: ToastrService) {}
  
  ngOnInit(): void {
    
  }

  register() {
    this.accountService.register(this.model).subscribe(response =>{
      console.log(response);
      this.cancel();
    }, error =>{
      console.log(error);
      this.toastr.error("Please enter a valid username and password");
    })
  }

  cancel(){
    this.cancelREgister.emit(false);
  }
}
