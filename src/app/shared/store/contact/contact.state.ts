import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { CreateContact, DeleteContact, GetAllContacts, RefreshContacts } from './contact.action';
import { ContactService } from '../../services/contact.service';
import { UserState } from '../user/user.state';
import { User } from '../../models/user.model';
import { RandomUUIDService } from '../../services/random-uuid.service';

export interface ContactStateModel {
  contacts: Array<Contact> | undefined;
}

const defaults: ContactStateModel = {
  contacts: undefined,
};

@State<ContactStateModel>({
  name: 'contacts',
  defaults: defaults
})
@Injectable()
export class ContactState {
  constructor(private store: Store, private contactService: ContactService) {
  }

  /* Contact State Selectors */
  @Selector()
  static fetchContacts(state: ContactStateModel) {
    return state.contacts;
  }

  /* Contact State Actions */
  @Action(GetAllContacts)
  getAll({ patchState }: StateContext<ContactStateModel>) {
    this.contactService.getAll().subscribe((contacts: Array<Contact>) => {
      const user: User = this.store.selectSnapshot(UserState).currentUser || {};
      const parsedContacts: Array<Contact> = JSON.parse(JSON.stringify(contacts));

      if (user?.favorites?.length) {
        parsedContacts.forEach((contact: Contact) => {
          const parsedContact: Contact = { ...contact };
          contact.isFavorite = user.favorites.some((e => e === parsedContact.id)) || false;

          return parsedContact;
        });
      } else {
        parsedContacts.forEach((contact: Contact) => contact.isFavorite = false);
      }

      patchState({
        contacts: parsedContacts
      });
    });
  }

  @Action(RefreshContacts)
  refreshAll({ patchState }: StateContext<ContactStateModel>) {
    const contacts: Array<Contact> = this.store.selectSnapshot(ContactState).contacts || [];
    const existingContacts: Array<Contact> = JSON.parse(JSON.stringify(contacts));
    const user: User = this.store.selectSnapshot(UserState).currentUser || {};

    if (user?.favorites?.length) {
      existingContacts.forEach((contact: Contact) => {
        const parsedContact: Contact = { ...contact };
        contact.isFavorite = user.favorites.some((e => e === parsedContact.id)) || false;

        return parsedContact;
      });
    } else {
      existingContacts.forEach((contact: Contact) => contact.isFavorite = false);
    }

    patchState({
      contacts: existingContacts
    });
  }

  @Action(CreateContact)
  createContact({ patchState }: StateContext<ContactStateModel>, action: CreateContact) {
    const contacts: Array<Contact> = this.store.selectSnapshot(ContactState).contacts || [];
    const existingContacts: Array<Contact> = JSON.parse(JSON.stringify(contacts));

    const contactToAdd: Contact = action.contact;
    contactToAdd.id = RandomUUIDService.getUUID(10);
    existingContacts.push(contactToAdd);

    patchState({
      contacts: existingContacts
    });
  }

  @Action(DeleteContact)
  deleteContact({ patchState }: StateContext<ContactStateModel>, action: DeleteContact) {
    const contacts: Array<Contact> = this.store.selectSnapshot(ContactState).contacts || [];
    let existingContacts: Array<Contact> = JSON.parse(JSON.stringify(contacts));

    existingContacts = existingContacts.filter((contact: Contact) => contact.id !== action.id).map((contact: Contact) => contact);

    patchState({
      contacts: existingContacts
    });
  }

}

