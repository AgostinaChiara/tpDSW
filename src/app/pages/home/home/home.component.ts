import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-home',
  templateUrl: `./home.component.html`,
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  books: Book[] | any;
  featuredBooks: Book[] | any;

  constructor(private _bookService: BookService) {}

  ngOnInit(): void {
    this.getBooks();
    this.getFeaturedBook();
  }
 
  getBooks() {
    this._bookService.getBooks("relevance").subscribe((data) => {
      this.books = data;
    });
  }

  getFeaturedBook() {
    this._bookService.getFeaturedBooks().subscribe((data) => {
      this.featuredBooks = data;
    });
  }
}
