import { Community } from './../../models/community';
import { Component, OnInit } from '@angular/core';
import { NavTabService } from 'src/app/services/main-content.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  private communities: Community[];
  private isDiscover: boolean;
  private isPersonal: boolean;
  constructor(private navTabService: NavTabService) { }

  ngOnInit() {
    this.isDiscover = true;
    this.isPersonal = false;
    this.communities = [
      new Community('Travel'),
      new Community('Adventure'),
      new Community('Houses')
    ];
    this.navTabService.changeCommunityTab(this.communities);
    // this.navTabService.currentTab.subscribe(com => this.communities = com);
  }

  personal() {
    this.isPersonal = true;
    this.isDiscover = false;
    this.communities = [];
    this.navTabService.changeCommunityTab(this.communities);
  }

  discover() {
    this.isDiscover = true;
    this.isPersonal = false;
    this.communities = [
      new Community('Travel'),
      new Community('Adventure'),
      new Community('Houses')
    ];
    this.navTabService.changeCommunityTab(this.communities);
  }

}
