import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AnonymousGuard implements CanActivate {

 constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authService.isLogIn()) {
      return true;
    }

    this.snackBar.open('You are already log in', 'cancel', {
      duration: 5000 ,
    });
    this.router.navigate(['main/orders']);
  }
}
