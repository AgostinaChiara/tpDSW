import { Component } from '@angular/core';
import { Bookprueba } from 'src/app/models/book.model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  items = this.cartService.getItems();
  

  constructor(private cartService: StoreService) {

  }

  ngOnInit() {
    console.log(this.items);
  }
}
