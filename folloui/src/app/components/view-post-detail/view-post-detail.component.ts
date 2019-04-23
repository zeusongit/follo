import { ActivatedRoute } from '@angular/router';
import { PostService } from './../../services/post.service';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-post-detail',
  templateUrl: './view-post-detail.component.html',
  styleUrls: ['./view-post-detail.component.scss']
})
export class ViewPostDetailComponent implements OnInit {

  authUser: any;
  postTitle: string;
  comments: any;
  postId: number;
  cname: string;
  postCreatedBy: string;
  postPostedOn: string;
  upVotes: number;
  downVotes: number;
  constructor(private store: Store<any>, private postService: PostService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.store.select('userAuth').subscribe((userAuth) => {
      console.log(`TOKENS STATUS CHANGED IN VIEW POST: ${userAuth}`);
      console.log(userAuth);
      this.authUser = userAuth;
    });

    this.route.params.subscribe((name) => {
      console.log("COMM NAME", name);
      this.cname = name.cname;
      this.postId = name.postId;
      this.getPostDetail();
    })
  }

  getPostDetail() {

    this.postService.getPostById(this.authUser.token, this.postId, this.cname).toPromise()
      .then(res => {
        if (res.status === 200) {
          console.log("POST DATA SUCCESS");
          this.postTitle = res.body.title;
          this.comments = res.body.comments;
          this.postCreatedBy = res.body.created_by.username;
          this.postPostedOn = res.body.posted_on;
          this.upVotes = res.body.upvotes;
          this.downVotes = res.body.downvotes;
        }
      }).catch(err => {
        console.log("POST DATA FAILED", err);
      });
  }

  addComment(comment: string) {
    console.log('COMMENT TEXT', comment);
    this.postService.addCommentToPost(this.authUser.token, this.postId, this.cname, comment).toPromise()
      .then(res => {
        if (res.status === 200) {
          console.log("COMMENT ADDED SUCCESS");
          this.postTitle = res.body.title;
          this.comments = res.body.comments;
          this.postCreatedBy = res.body.created_by.username;
          this.postPostedOn = res.body.posted_on;
          this.upVotes = res.body.upvotes;
          this.downVotes = res.body.downvotes;
        }
      }).catch(err => {
        console.log("COMMENT ADDED FAILED");
      });
  }

  upVote() {
    this.postService.getUpVotes(this.authUser.token, this.postId, this.cname).toPromise()
      .then(res => {
        if (res.status === 200) {
          console.log('UPVOTES SUCCESS');
          this.upVotes = res.body.upvotes;
        }
      }).catch(err => {
        console.log("UVOTES FAILED", err);
      });
  }

  downVote() {
    this.postService.getUpVotes(this.authUser.token, this.postId, this.cname).toPromise()
      .then(res => {
        if (res.status === 200) {
          console.log('UPVOTES SUCCESS');
          this.downVotes = res.body.downvotes;
        }
      }).catch(err => {
        console.log("UVOTES FAILED", err);
      });
  }

  deleteComment(commentId: string) {
    this.postService.deleteComment(this.authUser.token, this.postId, commentId).toPromise()
      .then(res => {
        if (res.status === 200) {
          console.log("DELETE COMMENT SUCCESS");
        }
      }).catch(err => {
        console.log("ERROR DELETING COMMENT", err);
      })
  }
}
