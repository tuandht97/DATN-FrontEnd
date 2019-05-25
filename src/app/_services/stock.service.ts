import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stock } from '../_models/stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(public http: HttpClient) { }

  getStockByCode(code: string): Observable<Stock> {
    return this.http.get<Stock>(`/api/stocks/` + code);
  }

  getAll(): Observable<any> {
    return this.http.get<any>(`/api/regulator/list-code`);
  }

  create(estateId: string) {
    return this.http.post(`/api/regulator/create-publish-contract`, { id: estateId });
  }
}
