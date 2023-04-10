import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AccountService } from '../_services/account.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

    constructor(private accountService: AccountService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
      const roles = route.data['roles'] as string[];
    
      return this.accountService.currentUser$.pipe(
        take(1),
        map(user => {
          if (user && user.roles && roles) {
            const hasRequiredRole = user.roles.some(role => roles.includes(role));
            if (hasRequiredRole) {
              return true;
            }
          }
          this.router.navigate(['/login']);
          return false; // Add this line to return false if user does not have required role
        })
      );
    }
  
}
