import { LoginService } from './../../services/login.service';
import { Community } from './../../models/community';
import { Router, ActivatedRoute } from '@angular/router';
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
  private isPersonal: boolean;
  private communities: Community[];
  createCommunity: string;
  constructor(private navTabService: NavTabService, private ls: LoginService) { }

  ngOnInit() {
    this.ls.loginStatus.subscribe(status => this.isLoggedIn = status);
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
      this.isPersonal = false;
      this.communities = [
        new Community({ communityName: 'Travel', commDesc: 'Travel' }),
        new Community({ communityName: 'Adventure', commDesc: 'Adventure' }),
        new Community({ communityName: 'Sports', commDesc: 'Sports' })
      ];
    } else {
      this.isDiscover = false;
      this.isPersonal = true;
      this.communities = [];
    }
    this.navTabService.changeCommunityTab(this.communities);
  }
}
