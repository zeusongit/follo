import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  httpHeaders = new HttpHeaders({
    'content-type': 'application/x-www-form-urlencoded',
    'Cache-Control': 'no-cache'
  });
  loginService(loginData: Login) {
    console.log('Inside Service', loginData);
    // return this.http.post<string>('http://localhost:3000/api/login', loginData, { headers: this.httpHeaders });
  }

}
