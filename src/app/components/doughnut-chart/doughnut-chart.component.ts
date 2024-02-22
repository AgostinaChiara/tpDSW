import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: [],
})
export class DoughnutChartComponent implements OnInit {
  public doughnutChartLabels: string[] = [];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: [],
  };
  public doughnutChartType: ChartType = 'doughnut';

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getAllOrders().subscribe(data => {
        const categoryCounts = this.calculateCategoryCounts(data);
        this.doughnutChartLabels = Object.keys(categoryCounts);
        this.doughnutChartData = {
        labels: this.doughnutChartLabels,
        datasets: [{ data: Object.values(categoryCounts) }],
      };
    });
  }

  calculateCategoryCounts(orders: any[]): { [category: string]: number } {
    const categoryCounts: { [category: string]: number } = {};

    orders.forEach(order => {
      order.books.forEach((book: { category: { name: any; }; }) => {
        const categoryName = book.category.name;
        if (categoryCounts[categoryName]) {
          categoryCounts[categoryName]++;
        } else {
          categoryCounts[categoryName] = 1;
        }
      });
    });

    return categoryCounts;
  }

  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }
}