import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Appointment } from '../_models/appointment';
import { AppointmentForAddingDto } from '../_models/appointmentForAddingDto';


@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  baseUrl = environment.apiUrl;
  appointment!: Appointment;

  constructor(private http: HttpClient) { }

  getAppointmentsForUser(id: number): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.baseUrl + 'appointments/' + id);
  }

  addAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(this.baseUrl + 'appointments/add', appointment);
  }

  checkAppointment(pacientId: number, doctorId: number): Observable<boolean>{
    return this.http.get<boolean>(this.baseUrl + 'appointments/check-appointment/' + pacientId + '/' + doctorId);
  }

  updateAppointment(appointment: Appointment): Observable<void>{
    return this.http.put<void>(this.baseUrl + 'appointments/update', appointment);
  }

  deleteAppointment(appointment: Appointment): Observable<void>{
    return this.http.delete<void>(this.baseUrl + 'appointments/delete/' + appointment.pacientId + '/' + appointment.doctorId);
  }

  setAppointment(appointment: Appointment) {
    this.appointment = appointment;
  }
}
