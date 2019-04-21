import { CommunityService } from './../../services/community.service';
import { Community } from './../../models/community';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss']
})
export class LeftSidebarComponent implements OnInit {

  favCommunities: Community[];
  constructor(private comService: CommunityService, private activatedRoute: ActivatedRoute) {
   }

  ngOnInit() {
    // Call community service to get all fav communities
    // this.comService.getAllCommunitiesForUser('username').toPromise().then(res => {
    //   if (res.status === 200) {
    //     this.favCommunities = res.body;
    //   }
    // });
    const c = new Community();
    c.commDesc = 'Hello';
    c.communityName = 'Testing Comm';
    this.favCommunities = [c];
  }
}
