import { Component, OnInit } from '@angular/core';
import { Appointment } from '../_models/appointment';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { AppointmentService } from '../_services/appointment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit{
  appointments!: Appointment[];

  constructor(private router: Router, private appointmentService: AppointmentService, private accountService: AccountService) { }

  ngOnInit(): void {
    this.getAppointmentsForCurrentUser();

  }

  getAppointmentsForCurrentUser()
  {
    this.accountService.currentUserID$.subscribe(userId => {
      if (userId) {
        this.appointmentService.getAppointmentsForUser(userId)
          .subscribe(appointments => this.appointments = appointments);
      }
    });
  }

  onMakeAppointment(){
    this.router.navigate(['make-appointment']);
  }

}
