export class Post {
  postTitle: string;
  postContent: string;
  createdBy: string;
  communityName: string;
  postedOn: string;
  type: string;
  lastUpdatedOn: string;
  postId: string;
  public constructor(init?: Partial<Post>) {
    Object.assign(this, init);
  }
}
