import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-doctor-card',
  templateUrl: './doctor-card.component.html',
  styleUrls: ['./doctor-card.component.css']
})
export class DoctorCardComponent implements OnInit{
  @Input() doctor!: User | null;

  constructor(private route: Router) {}

  ngOnInit(): void { }

  bookAppointment(){
    this.route.navigateByUrl('/appointments/make-appointment');
  }

}
