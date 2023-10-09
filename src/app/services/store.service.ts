import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Bookprueba } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  items: Bookprueba[] = [];

  constructor() { }
  
  addToCart(book: Bookprueba) {
    this.items.push(book);
    console.log("items:" + this.items )
  }

  getItems() {
    return this.items;
  }

  cleanCart() {
    this.items = [];
    return this.items;
  }
}
