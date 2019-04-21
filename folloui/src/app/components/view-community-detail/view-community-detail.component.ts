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
  constructor(private route: ActivatedRoute, private commService: CommunityService, private store: Store<any>) { }

  ngOnInit() {
    this.route.params.subscribe(name => {
      this.communityName = name.commname;
    });

    this.store.select('userAuth').subscribe((userAuth) => {
      console.log(`TOKENS STATUS CHANGED IN VIEW COMMUNITY: ${userAuth}`);
      console.log(userAuth);
      this.authToken = userAuth.token;
    });

    this.commService.getCommunityDetails('carr1', this.authToken).toPromise()
      .then(res => {
        if (res.status === 200) {
          console.log('RESPONSE FOR GET COMM DETAILS ', res);
          this.community = res.body;
        }
      }).catch(err => {
        console.log('ERROR GETTING COMMUNITY DETAILS', err);
      });

    this.commService.getCommunityPostsByCommName('carr1', this.authToken).toPromise()
      .then(res => {
        // console.log('RESPONSE FOR GET COMM DETAILS ', res);
        if (res.status === 200) {
          console.log(res);
          this.posts = res.body;
        }
      }).catch(err => {
        console.log('Error viewing community details', err);
      });
  }
}
