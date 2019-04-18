import { CommunityService } from './../../services/community.service';
import { Store } from '@ngrx/store';
import { AppState } from './../../app.state';
import { Community } from './../../models/community';
import { Component, OnInit } from '@angular/core';
import { NavTabService } from 'src/app/services/main-content.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLoggedIn: boolean;
  isDiscover: boolean;
  private communities: Community[];
  createCommunity: string;
  constructor(private navTabService: NavTabService, private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select('isLoggedIn').subscribe((status) => { this.isLoggedIn = status; });
    if (!this.isLoggedIn) {
      this.populateMainContent('discover');
    } else {
      this.populateMainContent('personal');
    }
  }

  populateMainContent(path: string) {
    console.log('REDIRECTING');
    if (path === 'discover') {
      this.isDiscover = true;
      this.communities = [
        new Community({ communityName: 'Travel', commDesc: 'Travel' }),
        new Community({ communityName: 'Adventure', commDesc: 'Adventure' }),
        new Community({ communityName: 'Sports', commDesc: 'Sports' })
      ];
      // this.commService.getAllCommunities().toPromise().then(res => {
      //   if (res.status === 200) {
      //     this.communities = res.body;
      //   }
      // });
    } else {
      this.isDiscover = false;
      this.communities = [];
    }
    // this.commService.getAllCommunitiesForUser('username').toPromise().then(res => {
    //   if (res.status === 200) {
    //     this.communities = res.body;
    //   }
    // });
    this.navTabService.changeCommunityTab(this.communities);
  }
}
