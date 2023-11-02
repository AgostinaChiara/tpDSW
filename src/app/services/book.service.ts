import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
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

  getBooks(order: string): Observable<Book[]> {
    return this.http.get<Book[]>(`http://localhost:3000/books?orderBy=${order}`)
  }

  getCategoryBooks(name:string): Observable<Book[]> {
    return this.http.get<Book[]>(`http://localhost:3000/books/categories/${name}`)
  }

  getSearchedBooks(searchedTxt: string) {
    return this.http.get<Book[]>(`http://localhost:3000/books?keyword=${searchedTxt}`);
  }

  getFeaturedBooks(): Observable<Book[]> {
    return this.http.get<Book[]>('http://localhost:3000/books?limit=4').pipe(
      map(books => books.map(each => ({...each, description: each.description.slice(0,200)})))
    )
  }

  getOne(isbn: string): Observable<Book> {
    return this.http.get<Book>(`http://localhost:3000/books/${isbn}`);
  }

  createBook(book: any): Observable<Book> {
    return this.http.post<Book>(`http://localhost:3000/books/`, book);
  }

  deleteBook(isbn: string): Observable<Book> {
    return this.http.delete<Book>(`http://localhost:3000/books/${isbn}`);
  }

  updateBook(isbn: string, data: any): Observable<Book> {
    return this.http.patch<Book>(`http://localhost:3000/books/${isbn}`, data);
  }

}
