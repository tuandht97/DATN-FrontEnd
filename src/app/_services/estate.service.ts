import { Injectable } from '@angular/core';
import { Estate } from '../_models/estate';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Org } from '../_enum/org.enum';

@Injectable({
  providedIn: 'root'
})
export class EstateService {

  currentRole: string;

  constructor(
    public http: HttpClient,
    public auth: AuthService
  ) {
    this.currentRole = this.auth.getCurrentUserRole;
  }

  getEstateUser(): Observable<any> {
    return this.http.get(`/api/realestate/list-own-real-estate`);
  }

  getAll(): Observable<any> {
    return this.http.get(`/api/regulator/list-new-real-estate`);
  }

  create(formData: FormData) {
    return this.http.post(`/api/realestate/create-real-estate`, formData);
  }

  update(formData: FormData) {
    return this.http.put(`/api/realestate/edit-real-estate`, formData);
  }

  async getById(id: string) {
    console.log(this.currentRole)
    if (this.currentRole == Org.Admin)
      return this.http.get(`/api/regulator/get-real-estate/` + id);
    if (this.currentRole == Org.Seller) {
      let result: any;
      result = await this.http.get(`/api/realestate/get-real-estate/` + id).toPromise();
      return result;
    }
  }

  delete(id: string) {
    return this.http.delete(`/api/estates/` + id);
  }
}
