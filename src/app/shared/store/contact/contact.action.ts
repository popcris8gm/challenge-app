import { Contact } from '../../models/contact.model';

export class GetAllContacts {
  static readonly type = '[Contact] GetAll';

  constructor() {
  }
}

export class CreateContact {
  static readonly type = '[Contact] Create new contact';

  constructor(public contact: Contact) {
  }
}

export class DeleteContact {
  static readonly type = '[Contact] Delete contact';

  constructor(public id: string) {
  }
}
