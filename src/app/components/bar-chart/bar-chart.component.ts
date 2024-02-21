import { Component, OnInit } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { OrdersByMonth } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-bar-chart',
  template: `
    <canvas
      baseChart
      class="chart"
      [data]="barChartData"
      [type]="barChartType"
    >
    </canvas>
  `,
  styles: [
  ]
})
export class BarChartComponent implements OnInit {
  public barChartType: ChartType = 'bar';

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [],
  };

  ordersByMonth: OrdersByMonth | any;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getOrderByMonth().subscribe(data => {
      this.ordersByMonth = data;
      this.renderChart()
    })
  }

  renderChart(): void {
    const labels = this.ordersByMonth.map((order: any) => this.getMonthName(order.month));
    const data = this.ordersByMonth.map((order: any) => order.orderCount);

    this.barChartData = {
      labels: labels,
      datasets: [
        {
          data: data,
          label: 'Cantidad de Órdenes'
        }
      ]
    };
  }

  getMonthName(monthNumber: number): string {
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    return monthNames[monthNumber - 1]; // Restar 1 porque los meses comienzan en 1 en los datos de la API
  }
}
