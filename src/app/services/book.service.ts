import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Bookprueba } from '../models/book.model';

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

  getBooks(): Observable<Bookprueba[]> {
    // return this.http.get<Bookprueba[]>(`${this.myAppUrl}${this.myApiUrl}`)
    return this.http.get<Bookprueba[]>(`http://localhost:3000/books/`)
  }

  getFeaturedBooks(): Observable<Bookprueba[]> {
    return this.http.get<Bookprueba[]>('http://localhost:3000/books?limit=4')
  }

  getOne(isbn: string): Observable<Bookprueba> {
    return this.http.get<Bookprueba>(`http://localhost:3000/books/${isbn}`);
  }

}
