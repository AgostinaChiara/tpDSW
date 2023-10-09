import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Bookprueba } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-book-detail',
  templateUrl:'./book-detail.html',
  styleUrls: ['./book-detail.css']
})

export class BookDetailComponent implements OnInit {
  bookData: Bookprueba | any = {};
  isbn: string = '';

  constructor(private route: ActivatedRoute, private _bookService: BookService, private cartService: StoreService) {  }

  ngOnInit(): void {
    this.isbn = this.route.snapshot.params['isbn'];
    this.getBook();
  }

  getBook() {
    this._bookService.getOne(this.isbn).subscribe((data) => {
      this.bookData = data;
    });
  }

  addToCart(book: Bookprueba) {
    this.cartService.addToCart(book);
    console.log(book);
  }
}
