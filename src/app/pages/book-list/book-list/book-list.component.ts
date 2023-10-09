import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private _bookService: BookService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.category = this.activatedRoute.snapshot.params['category']
    this.getBooks();
  }

  getBooks() {
    this._bookService.getBooks().subscribe((data) => {
      this.books = data;
    });
  }
}
