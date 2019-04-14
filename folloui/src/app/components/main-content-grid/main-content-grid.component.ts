import { Community } from './../../models/community';
import { Component, OnInit } from '@angular/core';
import { NavTabService } from 'src/app/services/main-content.service';
@Component({
  selector: 'app-main-content-grid',
  templateUrl: './main-content-grid.component.html',
  styleUrls: ['./main-content-grid.component.scss']
})
export class MainContentGridComponent implements OnInit {

  // community: Community;
  communities: Community[];

  constructor(private navTabService: NavTabService) { }

  ngOnInit() {
    this.navTabService.currentTab.subscribe(com => this.communities = com);
  }

}
