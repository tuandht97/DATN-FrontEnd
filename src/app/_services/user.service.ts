import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models/user';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { Org } from '../_enum/org.enum';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentRole: string;

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {
    this.currentRole = this.auth.getCurrentUserRole;
  }

  register(user: User) {
    return this.http.post(`/api/auth/register`, user);
  }

  createRegulator(user: User) {
    return this.http.post(`/api/regulator/create-publisher`, user);
  }

  getAsset(username: string): Observable<any> {
    this.currentRole = this.auth.getCurrentUserRole;
    if (this.currentRole == Org.Seller) {
      return this.http.post(`/api/realestate/get-shareholder`, { username });
    }
    if (this.currentRole == Org.User) {
      return this.http.post(`/api/trader/get-shareholder`, { username });
    }
  }

  buyCoin(amount: number) {
    return this.http.post(`/api/trader/payin-by-shareholder`, { amount });
  }

  getAllUser(): Observable<any> {
    return this.http.get<any>(`/api/regulator/list-shareholder`);
  }

  async getById(username: string) {
    let result: any;
    result = await this.http.post(`/api/regulator/get-shareholder`, { username }).toPromise();
    return result;
  }


}
