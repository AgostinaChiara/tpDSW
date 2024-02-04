import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompleteOrder } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-finish-order',
  templateUrl: './finish-order.component.html',
  styleUrls: ['./finish-order.component.css']
})

export class FinishOrderComponent implements OnInit {
  order: any;
  orderId: number = 0;

  constructor (private router: Router, private route: ActivatedRoute, private orderService: OrderService) {}
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.orderId = params['id']
    })

    this.getOrder();
  }

  getOrder() {
    this.orderService.getOrderById(this.orderId).subscribe((data) => {
      this.order = data
    })
  }

  onHomePage() {
    this.router.navigate(['/']);
  }
}
