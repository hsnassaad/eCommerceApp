import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-top-requested-products-chart',
  templateUrl: './top-requested-products-chart.component.html',
  styleUrls: ['./top-requested-products-chart.component.css']
})
export class TopRequestedProductsChartComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
    title: {
      display: true,
      text: 'Top Requested Products'
    }
  };
  public barChartLabels: Label[];
  public barChartType: ChartType = 'pie';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[];

  private products: any;
  public show = false;
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getTopFiveRequestedProducts().subscribe(data => {
      this.products = data;
    }, error => {
      console.log(error);
    }, () => {
      this.buildChart();
      this.show = true;
    });
  }

  buildChart() {
    const total = [];
    const titles = [];
    this.products.forEach(element => {
      titles.push(element.title);
      total.push(element.totalQuantity.toFixed(2));
     });
    this.barChartLabels = titles;
    this.barChartData = [
       {
         data: total,
         label: 'Total Price',
         backgroundColor: ['#F15854', '#DECF3F', '#5DA5DA', '#FAA43A', '#60BD68'],
         borderColor: 'black',
         hoverBackgroundColor: ['#F15854', '#DECF3F', '#5DA5DA', '#FAA43A', '#60BD68'],
       }
     ];
     }

}
