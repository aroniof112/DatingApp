import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { Buffer } from 'buffer';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User | null>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((response) => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
          return true;
        } else {
          return false;
        }
      }),
      catchError((error) => {
        console.error(error);
        return of(false);
      })
    );
  }

  register(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map(user => {
        if (user) {
          this.setCurrentUser(user);
        }
        return user;
      })
    )
  }

  setCurrentUser(user: User | null) {
    user!.roles = [];
    const roles = this.getDecodedToken(user!.token).role;
    Array.isArray(roles) ? user!.roles = roles : user?.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  getDecodedToken(token: string) {          //the signature of token is crypted, we gonna get the payload
    const tokenParts = token.split('.');
    const encodedPayload = tokenParts[1];
    const decodedPayload = Buffer.from(encodedPayload, 'base64').toString('utf-8');
    return JSON.parse(decodedPayload);  
  }
}
