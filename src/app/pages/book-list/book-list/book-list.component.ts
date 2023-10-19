import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import  { filter } from 'rxjs/operators';

import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl:'./book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent {
  books: Book[] | any;
  category: string | any;
  searchText: string | any;
  sort: string | any;

  constructor(private _bookService: BookService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.searchText = this.activatedRoute.snapshot.queryParamMap.get('keywords');
    this.category = this.activatedRoute.snapshot.params['category']

    this.getBooks();
  }

  getBooks() {
    if(this.searchText) {
      this._bookService.getSearchedBooks(this.searchText).subscribe((data) => {
        this.books = data;
      })
    } else if(this.category) {
      this._bookService.getCategoryBooks(this.category).subscribe((data) => {
        this.books = data;
      });
    } else {
      this._bookService.getBooks().subscribe((data) => {
        this.books = data;
      });
    }
  }
}


