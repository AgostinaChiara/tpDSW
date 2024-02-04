import { Component } from '@angular/core';

@Component({
  selector: 'app-order-charts',
  templateUrl: './order-charts.component.html',
  styles: [
      `.container {
    padding-top: 150px;
    padding-bottom: 100px;
  }
  
  .chart-container {
  max-width: 450px; 
  margin: auto;
}

@media (max-width: 768px) {
  .chart-container {
    max-width: 300px;
  }
}`
  ]
})
export class OrderChartsComponent {

}
