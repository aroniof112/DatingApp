import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { MembersService } from '../_services/members.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit{
  doctors: User[] = [];
  
  constructor(private memberService: MembersService) {}

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors(){
    this.memberService.getDoctors().subscribe(response => {
      this.doctors = response;
    })
  }



}
