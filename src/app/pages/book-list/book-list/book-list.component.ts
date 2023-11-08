import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import  { filter } from 'rxjs/operators';

import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl:'./book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] | any;
  category: string | any;

  searchText: string | any;
  sort: string = "relevance";
  page: number = 1;

  constructor(private _bookService: BookService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.category = params['category'];
      this.getBooks();
    });

    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.searchText = queryParams['name'];
      this.getBooks();
    });
  }


  getBooks() {
    if(this.searchText) {
      console.log('buscando libros por nombre')
      console.log(this.searchText)
      this._bookService.getSearchedBooks(this.searchText).subscribe((data) => {
        
        this.books = data;
      })
    } else if(this.category) {
      this._bookService.getCategoryBooks(this.category).subscribe((data) => {
        this.books = data;
      });
    } else {
      this._bookService.getBooks(this.sort).subscribe((data) => {
        this.books = data;
      });
    }
  }

  changeOrderBy() {
    this.getBooks();
  }
}


