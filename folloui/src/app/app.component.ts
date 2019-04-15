import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'follo-ing';
  createCommunity: string;

  constructor(private route: ActivatedRoute) {
  }
  ngOnInit() {
    // this.createCommunity = '';
    // this.route.queryParams.subscribe(params => {
    //   this.createCommunity = params.create;
    // });
    // if (this.createCommunity === undefined) {
    //   this.createCommunity = 'false';
    // }
    // console.log('IN APP COMP ', this.createCommunity);
  }
}
