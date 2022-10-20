import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import OrderModel from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private httpClient: HttpClient) { }

  public checkout(order: OrderModel): Observable<OrderModel> {
    return this.httpClient.post<OrderModel>(
      `${environment.baseUrl}/api/order`,
      order
    );
  }

  public getLatestOrder(): Observable<OrderModel> {
    return this.httpClient.get<OrderModel>(`${environment.baseUrl}/api/order/lastPurchase`)
  }

  public getCountOfOrders(): Observable<number> {
    return this.httpClient.get<number>(`${environment.baseUrl}/api/order/count`)
  }
}
