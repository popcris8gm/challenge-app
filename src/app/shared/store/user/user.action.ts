import { User } from '../../interfaces/user.interface';

export class Login {
  static readonly type = '[User] Login';

  constructor(public user: User) {
  }
}

export class Logout {
  static readonly type = '[User] Logout';

  constructor() {
  }
}

export class AddFavoriteContact {
  static readonly type = '[User] Add favorite contact to logged in user';

  constructor(public contactId: string) {
  }
}

export class RemoveFavoriteContact {
  static readonly type = '[User] Remove favorite contact to logged in user';

  constructor(public contactId: string) {
  }
}
