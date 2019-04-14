import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Signup } from '../models/signup.model';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }
  httpHeaders = new HttpHeaders({
    'content-type': 'application/x-www-form-urlencoded',
    'Cache-Control': 'no-cache'
  });
  signupService(signupData: Signup) {
    console.log('Inside Service', signupData);
    // return this.http.post<string>('http://localhost:3000/api/signup', SignupData, { headers: this.httpHeaders });
  }
}
