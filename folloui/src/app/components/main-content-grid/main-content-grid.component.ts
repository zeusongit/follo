import { LoginService } from './../../services/login.service';
import { Community } from './../../models/community';
import { Component, OnInit, Input } from '@angular/core';
import { NavTabService } from 'src/app/services/main-content.service';
@Component({
  selector: 'app-main-content-grid',
  templateUrl: './main-content-grid.component.html',
  styleUrls: ['./main-content-grid.component.scss']
})
export class MainContentGridComponent implements OnInit {

  isLoggedIn: boolean;
  communities: Community[];
  @Input() isDiscover: boolean;

  constructor(private navTabService: NavTabService, private ls: LoginService) { }

  ngOnInit() {
    this.navTabService.currentTab.subscribe(com => this.communities = com);
    this.ls.loginStatus.subscribe(status => this.isLoggedIn = status);
  }

}
