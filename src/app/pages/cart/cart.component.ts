import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Cart = { items: [] }
  dataSource: Array<CartItem> = []

  constructor(private cartService: CartService) {
  }

  ngOnInit() {
   this.dataSource = this.cart.items;
   this.cartService.cart.subscribe((_cart: Cart) => {
    this.cart = _cart;
    this.dataSource = this.cart.items;
   })
  }

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items)
  }

}
