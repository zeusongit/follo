import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../models/login.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(private http: HttpClient) { }

  doLogin(loginData: Login): Observable<any> {
    const httpHeaders = new HttpHeaders({
      'content-type': 'application/json',
      'Cache-Control': 'no-cache'
    });
    return this.http.post<string>('http://localhost:3000/user/login/', loginData, { headers: httpHeaders, observe: 'response' });
  }


  doLogout(token: string) {
    const httpHeaders = new HttpHeaders({
      'content-type': 'application/json',
      Authorization: 'Bearer ' + token
    });
    return this.http.post<string>('http://localhost:3000/user/logout', null, { headers: httpHeaders, observe: 'response' });
  }
}
