import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { CompleteOrder, Order } from '../models/order.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/orders/'
  }

  createOrder(order: any): Observable<Order> {
    return this.http.post<Order>(`${this.myAppUrl}${this.myApiUrl}`, order)
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.myAppUrl}${this.myApiUrl}`)
  }

  gettAllUserOrders(userId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.myAppUrl}${this.myApiUrl}user/${userId}`)
  }

  getOrderById(id: number): Observable<CompleteOrder> {
    return this.http.get<CompleteOrder>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }
}
