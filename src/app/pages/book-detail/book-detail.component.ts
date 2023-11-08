import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-book-detail',
  templateUrl:'./book-detail.html',
  styleUrls: ['./book-detail.css']
})

export class BookDetailComponent implements OnInit {
  bookData: Book | any = {};
  selectedQuantity: number = 1;
  isbn: string = '';

  constructor(private route: ActivatedRoute, private _bookService: BookService, private cartService: CartService) { }

  ngOnInit(): void {
    this.isbn = this.route.snapshot.params['isbn'];
    this.getBook();
  }

  getBook() {
    this._bookService.getOne(this.isbn).subscribe((data) => {
      this.bookData = data;
    });
  }

  onAddToCart(book: Book) {
    this.cartService.addToCart({
      product: book.image,
      name: book.title,
      price: book.price,
      quantity: this.selectedQuantity,
      id: book.isbn,
      stock: book.stock
    })
   }
}
