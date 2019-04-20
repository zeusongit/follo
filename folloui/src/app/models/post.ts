export class Post {
    postTitle: string;
    postDesc: string;
    public constructor(init?: Partial<Post>) {
      Object.assign(this, init);
    }
  }
  