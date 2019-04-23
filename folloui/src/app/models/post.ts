export class Post {
  postTitle: string;
  postContent: string;
  type: string;
  post_media: string[];
  public constructor(init?: Partial<Post>) {
    Object.assign(this, init);
  }
}
