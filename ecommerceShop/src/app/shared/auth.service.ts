import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

private baseUrl = environment.apiUrl + 'authentication/';
private jwtHelper = new JwtHelperService();
decodedToken: any;
currentUser: User;

constructor(private http: HttpClient) { }

  signIn(loginModel: any) {
    return this.http.post(this.baseUrl + 'login', loginModel).pipe(
      map((response: any) => {
        const data = response;
        if (data) {

          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          this.currentUser = data.user;
          this.decodedToken = this.jwtHelper.decodeToken(data.token);
        }
      })
    );
  }

  register(registerModel: User) {
    return this.http.post(this.baseUrl + 'register', registerModel);
  }

  isLogIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  getRoles() {
    let roles = [];
    if (this.decodedToken.role instanceof Array) {
      for (let index = 0; index < this.decodedToken.role.length; index++) {
        roles.push(this.decodedToken.role[index]);
      }
    } else {
      roles.push(this.decodedToken.role);
    }
    return roles;
  }

  isAdmin() {
    if (this.decodedToken.role instanceof Array) {
      for (let index = 0; index < this.decodedToken.role.length; index++) {
        if (this.decodedToken.role[index] === 'Admin') {
          return true;
        }
    }
  } else {
      return this.decodedToken.role === 'Admin';
    }
    return false;
  }
}
