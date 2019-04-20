import { HttpClient } from '@angular/common/http';
import { Community } from './../models/community';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {

  constructor(private http: HttpClient) { }

  createCommunity(community: Community, commImage: File) {
    const formData = new FormData();
    formData.append('commImage', commImage, commImage.name);
    formData.append('commName', community.communityName);
    formData.append('commDesc', community.commDesc);
    // return this.http.post('', formData, { observe: 'response' });
  }

  getAllCommunities() {
    return this.http.get('/getAllCommunities', { observe: 'response' });
  }

  getAllCommunitiesForUser(username: string) {
    return this.http.get(username + '/getAllCommunitiesForUser', { observe: 'response' });
  }
}
