import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  currentDiscoverPage: number = 0;
  currentPersonalPage: number = 0;
  discoverPosts: Array<Post> = [];
  personalPosts: Array<Post> = [];
  viewToDisplay: string = 'discover'

  constructor(private userService: UserService) { }

  ngOnInit() { 
    this.fetchDiscoverPosts();
  }


  fetchDiscoverPosts() {
     this.userService.getDiscoverPosts(this.currentDiscoverPage)
     .then(res => {
       console.log('discovered posts');
       this.currentDiscoverPage += this.currentDiscoverPage + 1;
       console.log(res.body.posts);
       this.discoverPosts = [...this.discoverPosts,...res.body.posts];
     })
     .catch(err => {
       console.log(err);
     })
  }

  fetchPersonalPosts() {

  }

  setView(view: string) { 
    this.viewToDisplay = view;
  }

}
