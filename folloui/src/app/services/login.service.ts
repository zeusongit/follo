import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../models/login.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLoggedIn: boolean;
  private loginSource = new BehaviorSubject(this.isLoggedIn);
  loginStatus = this.loginSource.asObservable();

  constructor(private http: HttpClient) { }
  httpHeaders = new HttpHeaders({
    'content-type': 'application/x-www-form-urlencoded',
    'Cache-Control': 'no-cache'
  });
  loginService(loginData: Login) {
    console.log('Inside Service', loginData);
    // return this.http.post<string>('http://localhost:3000/api/login', loginData, { headers: this.httpHeaders });
  }

  loggedInStatus(isLoggedIn: boolean) {
    this.loginSource.next(isLoggedIn);
  }

}
