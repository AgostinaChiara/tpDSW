import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book.model';

@Component({
  selector: 'app-home',
  templateUrl: `./home.component.html`,
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  books: Book[] | any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Book[]>('assets/books.json').subscribe(data => {
      this.books = data;
    })
  }
 
}
