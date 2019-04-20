export class Community {
  communityName: string;
  commDesc: string;
  public constructor(init?: Partial<Community>) {
    Object.assign(this, init);
  }
}
