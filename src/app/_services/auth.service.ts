import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../_models/user';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private currentUserRole: BehaviorSubject<string>;
  public role: Observable<string>;
  private currentUser: BehaviorSubject<string>;
  public user: Observable<string>;

  constructor(private http: HttpClient) {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.getItem('access_token'));
    if (decodedToken) {
      this.currentUserRole = new BehaviorSubject<string>(decodedToken.mspid);
      this.role = this.currentUserRole.asObservable();
      this.currentUser = new BehaviorSubject<string>(decodedToken.name);
      this.user = this.currentUser.asObservable();
    } else {
      this.currentUserRole = new BehaviorSubject<string>('');
      this.role = this.currentUserRole.asObservable();
      this.currentUser = new BehaviorSubject<string>('');
      this.user = this.currentUser.asObservable();
    }
  }

  public get getCurrentUserRole(): string {
    if (this.currentUserRole)
      return this.currentUserRole.value;
    return null;
  }

  public get getCurrentUser(): string {
    if (this.currentUser)
      return this.currentUser.value;
    return null;
  }

  login(formData: FormData): Observable<boolean> {
    return this.http.post<{ token: string, status: number, message: string }>('/api/auth/login', formData)
      .pipe(
        map(result => {
          if (result.token) {
            const helper = new JwtHelperService();
            const decodedToken = helper.decodeToken(result.token);
            this.currentUserRole.next(decodedToken.mspid);
            this.currentUser.next(decodedToken.name)
            localStorage.setItem('access_token', result.token);
          }
          return true;
        })
      );
  }

  logout() {
    localStorage.removeItem('access_token');
    this.currentUserRole.next(null);
    this.currentUser.next(null);
  }

  public getToken(): string {
    return localStorage.getItem('access_token');
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }
}
