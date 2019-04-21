import { CommunityService } from './../../services/community.service';
import { Community } from './../../models/community';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store'

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss']
})
export class LeftSidebarComponent implements OnInit {

  favCommunities: Community[];
  user: any;
  constructor(private comService: CommunityService, private activatedRoute: ActivatedRoute, private store: Store<any>) {
    store.select('userAuth').subscribe((userAuth) => {
      console.log(`RIGHT BAR: ${userAuth}`);
      console.log(userAuth);
      this.user = userAuth;
    });
   }

  ngOnInit() {

    const c = new Community();
    c.commDesc = 'Hello';
    c.communityName = 'Testing Comm';
    this.favCommunities = [c];
  }
}
