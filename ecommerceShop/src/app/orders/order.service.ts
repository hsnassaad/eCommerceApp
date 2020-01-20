import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Order } from '../models/order';
import { map } from 'rxjs/operators';

const httpOptions = new HttpHeaders({
  'Content-Type': 'application/json'
});

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = environment.apiUrl + 'orders';

constructor(private http: HttpClient) { }

getOrders() {
  return this.http.get(this.baseUrl);
}

getOrder(id: number): Observable<Order>  {
  return this.http.get<Order>(this.baseUrl + '/' + id);
}
AddOrderProducts() {
  let orderProducts = JSON.parse(localStorage.getItem('orderProducts'));
  orderProducts = JSON.stringify({orderProducts});
  return this.http.post(this.baseUrl, orderProducts, {headers: httpOptions} );
}

}
