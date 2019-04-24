import { CommunityService } from './../../services/community.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-search-result',
  templateUrl: './view-search-result.component.html',
  styleUrls: ['./view-search-result.component.scss']
})
export class ViewSearchResultComponent implements OnInit {


  searchKey: string;
  communities: any;
  isCommunities: boolean;
  posts: any;
  constructor(private route: ActivatedRoute, private commService: CommunityService) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.communities = [];
      this.searchKey = p.searchkey;
      this.isCommunities = true;
      this.getCommunitySearchResult();
      this.getPostSearchResult();
    });
  }


  getCommunitySearchResult() {
    this.commService.getCommunitySearchResult(this.searchKey).toPromise()
      .then(res => {
        if (res.status === 200) {
          console.log("SUCCESS GET COMM SEARCH RESULT", res.body);
          this.communities = res.body;
        }
      }).catch(err => {
        console.log("ERROR GETTING SEARCH RESULT", err);
      });
  }

  getPostSearchResult() {
    this.commService.getPostSearchResult(this.searchKey).toPromise()
      .then(res => {
        if (res.status === 200) {
          console.log("SUCCESS GET POST SEARCH RESULT", res.body.community);
          this.posts = res.body;
        }
      }).catch(err => {
        console.log("ERROR GETTING SEARCH RESULT", err);
      });
  }

  submit(value: string) {
    if (value === 'communities') {
      this.isCommunities = true;
    }
    else {
      this.isCommunities = false;
    }
  }
}
