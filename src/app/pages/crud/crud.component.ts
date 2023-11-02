import { Component, OnInit } from '@angular/core';

import { Book } from 'src/app/models/book.model';
import { Category } from 'src/app/models/category.model';
import { BookService } from 'src/app/services/book.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-crud',
  templateUrl: `./crud.component.html`,
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {
  books: Book[] | any;
  selectedBook: Book | any;
  categories: Category[] | any;
  page: number = 1;

  constructor(private _bookService: BookService, private _catService: CategoryService) {
  }

  ngOnInit(): void {
    this.getBooks();
    this.getCategories();
  }

  getBooks() {
    this._bookService.getBooks("relevance").subscribe((data) => {
      this.books = data;
    });
  }

  getBook(isbn: string) {
    this._bookService.getOne(isbn).subscribe((data) => {
      this.selectedBook = data
    })
  }

  getCategories() {
    this._catService.getCategory().subscribe((data) => {
      this.categories = data;
    })
  }

  onDeleteBook(isbn: string) {
    if(confirm('Are you sure?')) {
      this._bookService.deleteBook(isbn).subscribe(res => {
        console.log(`Book with ISBN ${isbn} has been deleted.`);
        this.books = this.books.filter((book: Book) => book.isbn !== isbn);
      })
    }
  }
}