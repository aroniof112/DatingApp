import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'DatingApp';
  users: any;

  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    this.http.get('https://localhost:7071/api/users')
    .pipe(
      catchError(error => {
        console.error(error);
        return of([]);
      }),
    )
    .subscribe(
      response => {this.users = response;},
    )
  }
}
