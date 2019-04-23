import { HttpClient } from '@angular/common/http';
import { Post } from './../models/post';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  createPost(post: Post, commName: string, token: string) {
    console.log('post from component');
    console.log(post);
    let headers;
    const formData = new FormData();
    formData.append('type', post.type);
    formData.append('title', post.title);
    formData.append('content', post.content);
    if (post.type === 'image') {
      // handle adding of image in formData here
    }

    switch(post.type){
      case 'text': 
        headers = {
          'Authorization': 'Bearer ' + token
        }
        break;
      
      default: 
        headers = {
          'Authorization': 'Bearer ' + token
        }  
    }
    console.log('sending post');
    console.log(post)
    return this.http.post<any>('http://localhost:3000/community/' + commName + '/post/', formData, {
      headers: headers,
      observe: 'response'
    });
  }
}
