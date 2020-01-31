import { Injectable } from '@angular/core';
import {HubConnection, HubConnectionBuilder} from '@aspnet/signalr';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as signalR from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = environment.apiUrl + 'admin/dashboard/';
  public hubConnection: HubConnection;

  constructor(private http: HttpClient) { }

  startConnection() {
    this.hubConnection = new HubConnectionBuilder()
                        .withUrl('https://localhost:44351/charts', {
                          skipNegotiation: true,
                          transport: signalR.HttpTransportType.WebSockets
                        })
                        .build();

    this.hubConnection
    .start()
    .then(() => console.log('Connection started'))
    .catch(err => console.log('Error while starting connection: ' + err));
  }

  getTopFivePaidCustomers() {
   return this.http.get(this.baseUrl + 'customers');
  }

  getTopFiveRequestedProducts() {
    return this.http.get(this.baseUrl + 'products');
  }
}
