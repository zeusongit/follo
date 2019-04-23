import { Observable } from 'rxjs';
import { UserService } from './../../services/user.service';
import { Store } from '@ngrx/store';
import { CommunityService } from './../../services/community.service';
import { Post } from './../../models/post';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-community-detail',
  templateUrl: './view-community-detail.component.html',
  styleUrls: ['./view-community-detail.component.scss']
})
export class ViewCommunityDetailComponent implements OnInit {

  posts: any;
  communityName: string;
  authToken: string;
  community: any;
  currentUserName: Observable<string>;
  followingCommunities: any;
  authUser: any;
  canFollow: boolean;
  commPicture: string;
  // tslint:disable-next-line:max-line-length
  constructor(private route: ActivatedRoute, private userService: UserService, private commService: CommunityService, private store: Store<any>) { }

  ngOnInit() {

    this.canFollow = false;
    this.route.params.subscribe(name => {
      console.log('INSIDE VIEW DETAILS', name);
      this.community = [];
      this.posts = [];
      this.communityName = name.cname;
      this.viewCommunityDetails();
    });
  }

  getUserDetails() {
    if (this.authToken != null) {

      this.userService.getUserDetail(this.authUser.token, this.authUser.email).toPromise()
        .then(res => {
          if (res.status === 200) {
            this.followingCommunities = res.body.followingCommunities;
          }
        }).catch(err => {
          console.log('ERROR GETTING USER DATA', err);
        });
    }
  }

  viewCommunityDetails() {
    this.store.select('userAuth').subscribe((userAuth) => {
      console.log(`TOKENS STATUS CHANGED IN VIEW COMMUNITY: ${userAuth}`);
      console.log(userAuth);
      this.authUser = userAuth;
      this.authToken = userAuth.token;
      this.currentUserName = userAuth.username;
    });

    this.commService.getCommunityDetails(this.communityName, this.authToken).toPromise()
      .then(res => {
        if (res.status === 200) {
          console.log('RESPONSE FOR GET COMM DETAILS ', res);
          this.community = res.body;
          this.canFollow = this.community.createdBy.user.username === this.currentUserName ? false : true;
          this.commPicture = (this.community.communityPicture != null) ?
            this.community.communityPicture : '../../../assets/images/create-community-header.png';
        }
      }).catch(err => {
        console.log('ERROR GETTING COMMUNITY DETAILS', err);
      });

    this.commService.getCommunityPostsByCommName(this.communityName, this.authToken).toPromise()
      .then(res => {
        if (res.status === 200) {
          console.log(res);
          this.posts = res.body;
        }
      }).catch(err => {
        console.log('Error viewing community details', err);
      });
  }
}
