import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Book } from '../models/book.model';
import { Cart, CartItem } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = new BehaviorSubject<Cart>({ items: []});

  constructor() { }
  
  addToCart(item: CartItem) {
  console.log("Cart service.. agregando...")

  const items = [...this.cart.value.items];

  const itemInCart = items.find((_item) => _item.id == item.id)
    
  if(itemInCart) {
    itemInCart.quantity += 1;
  } else {
    items.push(item);
  }

  this.cart.next({ items });
  console.log(this.cart);
  }

  getTotal(items: Array<CartItem>): number {
    return items
      .map((item) => item.price * item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }
}
