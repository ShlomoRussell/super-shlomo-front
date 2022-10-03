import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import OrderModel from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private httpClient: HttpClient) {}

  public checkout(order: OrderModel): Observable<OrderModel> {
    return this.httpClient.post<OrderModel>("/api/order",order);
  }
}
