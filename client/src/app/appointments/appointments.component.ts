import { Component, OnInit, ViewChild } from '@angular/core';
import { Appointment } from '../_models/appointment';
import { AccountService } from '../_services/account.service';
import { AppointmentService } from '../_services/appointment.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit{
  appointments!: Appointment[];

  constructor(
    private router: Router, 
    private appointmentService: AppointmentService, 
    private accountService: AccountService,
    private toastr: ToastrService)
    { }

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

  onDeleteAppointment(appointment: Appointment){
    this.appointmentService.deleteAppointment(appointment).subscribe(() => {
      this.getAppointmentsForCurrentUser();
      this.toastr.success("Appointment deleted successfully!");
    }, error => {
      this.toastr.error(error);
    })
  }

  onUpdateAppointment(appointment: Appointment) {
    this.appointmentService.setAppointment(appointment);
  }

  onMakeAppointment(){
    this.router.navigate(['make-appointment']);
  }

}
