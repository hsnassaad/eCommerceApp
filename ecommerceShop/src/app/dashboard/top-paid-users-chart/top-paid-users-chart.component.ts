import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-top-paid-users-chart',
  templateUrl: './top-paid-users-chart.component.html',
  styleUrls: ['./top-paid-users-chart.component.css']
})
export class TopPaidUsersChartComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
    title: {
      display: true,
      text: 'Top Paid Users'
    }
  };
  public barChartLabels: Label[];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[];

  private users: any;
  public show = false;

  constructor(private adminService: AdminService) { }

  ngOnInit() {

    this.adminService.startConnection();
    this.adminService.getTopFivePaidCustomers().subscribe(data => {
      this.users = data;
    }, error => {
      console.log(error);
    }, () => {
      this.buildChart();
      this.show = true;
    } );

    this.adminService.hubConnection.on('updateDashboard', (data) => {
      this.users = data.usersData;
      this.buildChart();
    });
  }

  buildChart() {
   const total = [];
   const emails = [];
   this.users.forEach(element => {
      emails.push(element.email);
      total.push(element.totalPrice.toFixed(2));
    });
   this.barChartLabels = emails;
   this.barChartData = [
      {
        data: total,
        label: 'Total Price',
        backgroundColor: '#F15854',
        borderColor: 'black',
        hoverBackgroundColor: '#F15854',
      }
    ];
    }
}
