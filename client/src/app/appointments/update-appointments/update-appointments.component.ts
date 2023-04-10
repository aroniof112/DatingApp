import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Appointment } from 'src/app/_models/appointment';
import { AppointmentService } from 'src/app/_services/appointment.service';

@Component({
  selector: 'app-update-appointments',
  templateUrl: './update-appointments.component.html',
  styleUrls: ['./update-appointments.component.css']
})
export class UpdateAppointmentsComponent implements OnInit{
  appointment!: Appointment;

  constructor(
    private appointmentService: AppointmentService,
    private toastr: ToastrService,
    private router: Router) 
    { }

  ngOnInit(): void {
    this.appointment = this.appointmentService.appointment;
  }

  updateAppointment(): void {
    this.appointmentService.
      updateAppointment(this.appointment)
      .subscribe(response => {
        // Handle the response here
        this.toastr.success('Appointment updated successfully');
        this.cancelButton();

      }, error => {
        // Handle errors here
        this.toastr.error('Error updating appointment');
        this.cancelButton();
      });
  }

  cancelButton()
  {
    this.router.navigate(['appointments']);
  }
}
