import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Post } from './../../models/post';
import { Component, OnInit } from '@angular/core';
import { NavTabService } from 'src/app/services/main-content.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  private post: Post;
  createPostForm: FormGroup;
  constructor(private navTabService: NavTabService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.createPostForm = this.fb.group({
      posttitle: [null, Validators.required],
      postdesc: [null, Validators.required]
    });
  }
  addPost() {
    if (this.createPostForm.valid) {
      this.post = new Post(this.createPostForm.value);
      const currentPosts = [this.post];
      //this.navTabService.changeCommunityTab(currentPosts);    redirect to community view
      this.router.navigate(['']);
    }
  }
}
