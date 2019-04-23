import { HttpClient } from '@angular/common/http';
import { Post } from './../models/post';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  createPost(post: Post, commName: string, token: string) {
    return this.http.post<any>('http://localhost:3000/community/' + commName + '/', post, {
      headers:
      {
        'Content- Type': 'application/ json',
        // tslint:disable-next-line:object-literal-key-quotes
        'Authorization': 'Bearer ' + token
      },
      observe: 'response'
    });
  }
}