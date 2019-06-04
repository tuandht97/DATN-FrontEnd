import { Injectable } from '@angular/core';
import { Transaction } from '../_models/transaction';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Org } from '../_enum/org.enum';


@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  currentRole: string;

  constructor(
    public http: HttpClient,
    private auth: AuthService
  ) {
    this.currentRole = this.auth.getCurrentUserRole;
  }

  getAll(): Observable<any> {
    this.currentRole = this.auth.getCurrentUserRole;
    if (this.currentRole == Org.User)
      return this.http.get<any>(`/api/trader/list-transfer-contract`);
    if (this.currentRole == Org.Seller)
      return this.http.get<any>(`/api/realestate/list-transfer-contract`);
  }

  getBuy(username: string) {
    this.currentRole = this.auth.getCurrentUserRole;
    if (this.currentRole == Org.User)
      return this.http.post(`/api/trader/list-transfer-contract-by-buyer`, { username });
    if (this.currentRole == Org.Seller)
      return this.http.post(`/api/realestate/list-transfer-contract-by-buyer`, { username });
  }

  getSell(username: string) {
    this.currentRole = this.auth.getCurrentUserRole;
    if (this.currentRole == Org.User)
      return this.http.post(`/api/trader/list-transfer-contract-by-seller`, { username });
    if (this.currentRole == Org.Seller)
      return this.http.post(`/api/realestate/list-transfer-contract-by-seller`, { username });
  }

  create(idItem: string, amount: number) {
    if (this.currentRole == Org.User)
      return this.http.post(`/api/trader/create-transfer-contract-for-buyer`, { sellTritAdvertisingContractId: idItem, amount });
  }
}

