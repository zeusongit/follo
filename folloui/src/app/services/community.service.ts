import { Post } from './../models/post';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Community } from './../models/community';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {

  constructor(private http: HttpClient) { }

  createCommunity(community: Community, commImage: File, token: string) {
    const formData = new FormData();
    formData.append('commImage', commImage, commImage.name);
    formData.append('commName', community.communityName);
    formData.append('commDesc', community.commDesc);
    return this.http.post<any>('http:.//localhost:3000/community', formData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }, observe: 'response'
    });
  }

  getAllCommunities() {
    return this.http.get('http://localhost:3000/community', { observe: 'response' });
  }

  getAllCommunitiesForUser(username: string) {
    return this.http.get('http://localhost:3000/' + username + '/community', { observe: 'response' });
  }

  getCommunityPostsByCommName(commName: string, token: string) {
    return this.http.get('http://localhost:3000/community/' + commName + '/post/', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }, observe: 'response'
    });
  }

  getCommunityDetails(commName: string, token: string) {
    return this.http.get('http://localhost:3000/community/' + commName, {
      headers: {
        'Content-Type': 'application/json',
        // tslint:disable-next-line:object-literal-key-quotes
        'Authorization': 'Bearer ' + token
      }, observe: 'response'
    });
  }


  getCommunitySearchResult(cname: string) {
    return this.http.get('http://localhost:3000/community/?key=' + cname, {
      observe: 'response'
    })
  }
}
