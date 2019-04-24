import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {


  discoverPosts: Array<Post>;
  personalPosts: Array<Post>
  constructor() { }

  ngOnInit() {
  }

}
