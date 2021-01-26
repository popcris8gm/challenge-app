import { User } from '../../models/user.model';

export class Login {
  static readonly type = '[Auth] Login';

  constructor(public user: User) {
  }
}
