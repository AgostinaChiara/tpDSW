import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, take } from 'rxjs';
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
    this.myApiUrl = 'api/books/'
  }

  getBooks(sort: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.myAppUrl}${this.myApiUrl}`, {
      params: { orderBy: sort }, 
    })
  }

  getSearchedBooks(searchedTxt: string) {
    return this.http.get<Book[]>(`${this.myAppUrl}api/books`, {
      params: { name: searchedTxt }, 
    });
  }

  getOne(isbn: string): Observable<Book> {
    return this.http.get<Book>(`${this.myAppUrl}${this.myApiUrl}${isbn}`);
  }

  getCategoryBooks(id:string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.myAppUrl}${this.myApiUrl}categories/${id}`)
  }

  deleteBook(isbn: string): Observable<Book> {
    return this.http.delete<Book>(`${this.myAppUrl}${this.myApiUrl}${isbn}`);
  }

  updateBook(isbn: string, data: any): Observable<Book> {
    return this.http.patch<Book>(`${this.myAppUrl}${this.myApiUrl}${isbn}`, data);
  }

  getFeaturedBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.myAppUrl}${this.myApiUrl}`, {
      params: { limit: '4' }, 
    })
  }

  getHomeBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.myAppUrl}${this.myApiUrl}`, {
      params: { limit: '18' }, 
    })
  }

  createBook(book: any): Observable<Book> {
    return this.http.post<Book>(`${this.myAppUrl}${this.myApiUrl}`, book);
  }
}
