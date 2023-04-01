import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Appointment } from '../_models/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAppointmentsForUser(id: number): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.baseUrl + 'appointments/' + id);
  }

  addAppointment(appointment: Appointment): Observable<Appointment>{
    return this.http.post<Appointment>(this.baseUrl + 'appointments/', appointment);
  }

  getCheckAppointment(pacientId: number, doctorId: number): Observable<Appointment>{
    return this.http.get<Appointment>(this.baseUrl + 'appointments/' + pacientId + '/' + doctorId);
  }
}
