import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Items } from '../models/item.model';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private items = new BehaviorSubject<Items[]>([]);
  public getItems = this.items.asObservable();
  public setItems(items: Items[]) {
    return this.items.next(items);
  }
  public _items = new BehaviorSubject<Items[]>([]);
  public get_items = this._items.asObservable();
  constructor(private httpClient: HttpClient) { }

  public filterCategories(category: string) {
    if (category === 'All') return this.setItems(this._items.value);

    return this.setItems(
      this._items.value.filter((item) => item.category === category)
    );
  }

  public searchItems(searchWords: string) {
    const regex = new RegExp(searchWords, 'gi');
    return this.setItems(
      this._items.value.filter((item) => item.productName?.match(regex))
    );
  }

  public getCategories(): Observable<string[]> {
    return this.httpClient.get<string[]>(
      `${environment.baseUrl}/api/items/categories`
    );
  }

  public getAllItems(): Observable<Items[]> {
    return this.httpClient.get<Items[]>(
      `${environment.baseUrl}/api/items/allItems`
    );
  }

  public addItem(item: FormData): Observable<Items> {
    return this.httpClient.post<Items>(
      `${environment.baseUrl}/api/items/addItem`,
      item
    );
  }

  public editItem(item: Items): Observable<Items> {
    return this.httpClient.put<Items>(`${environment.baseUrl}/api/items/editItem`, item)
  }


}
