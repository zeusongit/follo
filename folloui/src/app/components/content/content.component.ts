import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  currentDiscoverPage: number = 1;
  currentPersonalPage: number = 0;
  discoverPosts: Array<Post> = [];
  personalPosts: Array<Post> = [];
  viewToDisplay: string = 'discover'

  constructor(private userService: UserService) { }

  ngOnInit() { 
    this.fetchDiscoverPosts();
  }


  fetchDiscoverPosts() {
     console.log('fetching with offset' +this.currentDiscoverPage);
     this.userService.getDiscoverPosts(this.currentDiscoverPage)
     .then(res => {
       console.log('discovered posts');
       
       console.log(res.body.posts);
       if (res.body.posts.length > 0){
        this.currentDiscoverPage += this.currentDiscoverPage + 1;
       }

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
