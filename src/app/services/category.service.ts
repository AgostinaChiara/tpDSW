import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/categories/'
  }

  getCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  getOne(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  deleteCategory(id: number): Observable<Category> {
    return this.http.delete<Category>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  updateCategory(id: number, data: any): Observable<Category> {
    return this.http.patch<Category>(`${this.myAppUrl}${this.myApiUrl}${id}`, data);
  }

  createCategory(cat: any): Observable<Category> {
    return this.http.post<Category>(`${this.myAppUrl}${this.myApiUrl}`, cat);
  }
}

