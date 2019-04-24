import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  getUserDetail(authToken: string, email: string) {
    const data = {
      // tslint:disable-next-line:object-literal-key-quotes
      'email': email
    };
    return this.http.post<any>('http://localhost:3000/user/me', JSON.stringify(data), {
      headers: {
        // tslint:disable-next-line:object-literal-key-quotes
        'Authorization': 'Bearer ' + authToken,
        'Content-Type': 'application/json'
      },
      observe: 'response',
    });
  }

  getDiscoverPosts(page: Number): Promise<any> {
    let url = `http://localhost:3000/user/post/discover/${page}`;
    return this.http.get(url,{observe: 'response'}).toPromise();
  }
}
