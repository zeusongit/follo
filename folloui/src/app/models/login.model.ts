export class Login {
  public constructor(init?: Partial<Login>) {
    Object.assign(this, init);
  }
  username: string;
  password: string;
}
