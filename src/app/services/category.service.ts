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
    this.myApiUrl = 'category/'
  }

  getCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(`http://localhost:3000/category/`);
  }

  getOne(id: string): Observable<Category> {
    return this.http.get<Category>(`http://localhost:3000/category/${id}`);
  }
}

