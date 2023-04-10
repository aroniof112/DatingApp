import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/user';
import { PresenceService } from 'src/app/_services/presence.service';

@Component({
  selector: 'app-doctor-card',
  templateUrl: './doctor-card.component.html',
  styleUrls: ['./doctor-card.component.css']
})
export class DoctorCardComponent implements OnInit{
  @Input() doctor!: User | null;

  constructor(private route: Router, public presence: PresenceService) {}

  ngOnInit(): void { }

  bookAppointment(){
    this.route.navigateByUrl('/appointments/make-appointment');
  }

}
