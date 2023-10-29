import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'books/'
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`http://localhost:3000/books/`)
  }

  getCategoryBooks(name:string): Observable<Book[]> {
    return this.http.get<Book[]>(`http://localhost:3000/books/categories/${name}`)
  }

  getSearchedBooks(searchedTxt: string) {
    return this.http.get<Book[]>(`http://localhost:3000/books?keyword=${searchedTxt}`);
  }

  getFeaturedBooks(): Observable<Book[]> {
    return this.http.get<Book[]>('http://localhost:3000/books?limit=4')
  }

  getOne(isbn: string): Observable<Book> {
    return this.http.get<Book>(`http://localhost:3000/books/${isbn}`);
  }

  createBook(book: any): Observable<Book> {
    return this.http.post<Book>(`http://localhost:3000/books/`, book);
  }

  deleteProduct(isbn: number): Observable<Book> {
    return this.http.delete<Book>(`http://localhost:3000/books/${isbn}`);
  }

}
