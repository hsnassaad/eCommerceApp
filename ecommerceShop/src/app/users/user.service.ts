import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.apiUrl + 'users';

  constructor(private http: HttpClient) { }


  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  updatedUser(updateModel: any, userId: string) {
    return this.http.put(this.baseUrl + '/' + userId, updateModel);
  }

  changePassword(newPassword: string) {
    return this.http.put(this.baseUrl + '/changePassword', {newPassword});
  }

  deleteUser(userId: string) {
    return this.http.delete(this.baseUrl + '/' + userId);
  }

}
