import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-book-list',
  templateUrl:'./book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  category: string | any;
  categoryName: string | any;

  searchText: string | any;
  sort: string = "relevance";
  page: number = 1;

  constructor(private _bookService: BookService, private activatedRoute: ActivatedRoute, private _catService: CategoryService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.category = params['category'];
      this.getBooks();
      this.getCategory(this.category)
    });

    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.searchText = queryParams['name'];
      this.getBooks();
    });
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
      this._bookService.getBooks(this.sort).subscribe((data) => {
        this.books = data;
      });
    }
  }

  getCategory(id: number) {
    this._catService.getOne(id).subscribe((data) => {
      this.categoryName = data.name
    })
  }

  changeOrderBy() {
    this.getBooks();
  }
}


