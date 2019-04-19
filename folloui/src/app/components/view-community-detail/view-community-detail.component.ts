import { Post } from './../../models/post';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-community-detail',
  templateUrl: './view-community-detail.component.html',
  styleUrls: ['./view-community-detail.component.scss']
})
export class ViewCommunityDetailComponent implements OnInit {

  posts: Post[];
  communityName: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(name => {
      this.communityName = name.commname;
    });
  }
}
