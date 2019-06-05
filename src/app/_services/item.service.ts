import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Item } from '../_models/item';
import { HttpClient } from '@angular/common/http';
import { Org } from '../_enum/org.enum';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  currentRole: string;

  private currentItem: BehaviorSubject<any>;

  constructor(
    public http: HttpClient,
    private auth: AuthService
  ) {
    this.currentRole = this.auth.getCurrentUserRole;
    this.currentItem = new BehaviorSubject<any>(null);
  }

  // getAll(): Observable<Item[]> {
  //   return this.http.get<Item[]>(`/api/items`);
  // }

  getAll(): Observable<any> {
      return this.http.get<any>(`/api/auth/exchange`);
  }

  getByUser(): Observable<any> {
    this.currentRole = this.auth.getCurrentUserRole;
    if (this.currentRole == Org.Seller)
      return this.http.get<any>(`/api/realestate/list-advertising`);
    if (this.currentRole == Org.User)
      return this.http.get<any>(`/api/trader/list-advertising`);
  }

  getById(id: string): Observable<Item> {
    return this.http.get<Item>(`/api/items/` + id);
  }

  create(item: Item) {
    return this.http.post(`/api/realestate/create-advertising`, item);
  }

  delete(id: string) {
    return this.http.post(`/api/realestate/delete-advertising`, { id });
  }

  public get getCurrentItem(): any {
    if (this.currentItem)
      return this.currentItem.value;
    return null;
  }

  setCurrentItem(item) {
    this.currentItem.next(item);
  }
}
