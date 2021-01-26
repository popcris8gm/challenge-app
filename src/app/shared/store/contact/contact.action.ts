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

export class UpdateContact {
  static readonly type = '[Contact] Update contact by id';

  constructor(public contact: Contact, public id: string) {
  }
}

export class DeleteContact {
  static readonly type = '[Contact] Delete contact';

  constructor(public id: string) {
  }
}

export class RefreshContacts {
  static readonly type = '[Contact] Refresh contacts';

  constructor() {
  }
}

export class GetContactById {
  static readonly type = '[Contact] Get one contact based on ID';

  constructor(public id: string) {
  }
}
