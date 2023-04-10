import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Appointment } from 'src/app/_models/appointment';
import { AppointmentForAddingDto } from 'src/app/_models/appointmentForAddingDto';
import { User } from 'src/app/_models/user';
import { UserParams } from 'src/app/_models/userParams';
import { AccountService } from 'src/app/_services/account.service';
import { AppointmentService } from 'src/app/_services/appointment.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-make-appointment',
  templateUrl: './make-appointment.component.html',
  styleUrls: ['./make-appointment.component.css']
})
export class MakeAppointmentComponent implements OnInit{
  locationOptions = ['Targu Mures, Regina Maria', 'Targu Mures, Spitalul Central'];
  specializationOptions = ['Cardiologie', 'Ginecologie'];
  doctors: User[] = [];
  appointment: Appointment = {
    appointmentTime: new Date('2023-03-31'),
    location: '',
    specialization: '',
    pacientId: 0,
    doctorId: 0, 
  };
  currentUser!: User | null;

  constructor(private router: Router, private appointmentService: AppointmentService, 
    private accountService: AccountService, private toastr: ToastrService, private memberService: MembersService) { }

  ngOnInit(): void {
    this.memberService.getDoctors().subscribe(doctors => {
      this.doctors = doctors;
    });
  }

  onSubmit() {
    this.accountService.currentUserID$.subscribe(userId =>{
      this.appointment.pacientId = userId ?? 0;
    })

    this.checkAppointment();
  }

  checkAppointment()
  {
    this.appointmentService.checkAppointment(this.appointment.pacientId, this.appointment.doctorId)
      .subscribe(result => {
        // Handle the result here
        if (result === true)
        {
          this.toastr.error("You already have an appointment to this doctor");
          this.router.navigateByUrl("/appointments");
        } else{
          this.appointmentService.addAppointment(this.appointment).subscribe(response => {
            this.toastr.info("Appointment added");
            this.router.navigateByUrl("/appointments");
          })
        }
      }, error => {
        // Handle errors here
        this.toastr.error("Error in adding the appointment");
      });
  }

  loadDoctors() {
    this.memberService.getDoctors().subscribe(doctors => {
      this.doctors = doctors;
    });
  }

  cancel(){
    this.router.navigateByUrl("/appointments");
  }

  getCurrentDateTimeString(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();
  
    // Pad single-digit values with a leading zero
    const pad = (value: number) => value.toString().padStart(2, '0');
  
    return `${year}-${pad(month)}-${pad(day)}T${pad(hour)}:${pad(minute)}}`;
  }

}
