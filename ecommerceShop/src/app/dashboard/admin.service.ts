import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = environment.apiUrl + 'admin/dashboard/';


  constructor(private http: HttpClient) { }

  getTopFivePaidCustomers() {
    return this.http.get(this.baseUrl + 'customers');
  }

  getTopFiveRequestedProducts() {
    return this.http.get(this.baseUrl + 'products');
  }
}
