import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.apiUrl + 'users';

  constructor(private http: HttpClient) { }


  updatedUser(updateModel: any, userId: string) {
    return this.http.put(this.baseUrl + '/' + userId, updateModel);
  }

  changePassword(newPassword: string) {
    return this.http.put(this.baseUrl + '/changePassword', {newPassword});
  }

}
