import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, take, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { Book, BookWithCategoryName } from '../models/book.model';
import { ToastrService } from 'ngx-toastr';

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

  getBooksWithCategoryName(sort: string): Observable<BookWithCategoryName[]> {
  return this.http.get<BookWithCategoryName[]>(`${this.myAppUrl}${this.myApiUrl}`, {
    params: { orderBy: sort }, 
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

  createBook(formData: FormData): Observable<Book> {
    return this.http.post<Book>(`${this.myAppUrl}${this.myApiUrl}`, formData)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if(error.status === 400) {
            console.log("El ISBN ingresado se encuentra en uso.", "Error")
          }

          return throwError("")
        })
      )
  }
}
