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
  constructor(private route: ActivatedRoute, private commService: CommunityService) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.communities = [{
        cname: p.searchkey,
        description: 'BUY' + p.searchkey
      }];
      this.searchKey = p.searchkey;
    });
  }


  getCommunitySearchResult() {
    this.commService.getCommunitySearchResult(this.searchKey).toPromise()
      .then(res => {
        if (res.status === 200) {
          console.log("SUCCESS GET COMM SEARCH RESULT");
          this.communities = res.body;
        }
      }).catch(err => {
        console.log("ERROR GETTING SEARCH RESULT", err);
      })
  }
}
