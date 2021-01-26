import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Contact } from '../../interfaces/contact.interface';
import {
  CreateContact,
  DeleteContact,
  GetAllContacts,
  GetContactById,
  RefreshContacts,
  UpdateContact
} from './contact.action';
import { ContactService } from '../../services/contact.service';
import { UserState } from '../user/user.state';
import { User } from '../../interfaces/user.interface';
import { RandomUUIDService } from '../../services/random-uuid.service';

export interface ContactStateModel {
  contacts: Array<Contact> | undefined;
  contact: Contact | undefined;
}

const defaults: ContactStateModel = {
  contacts: undefined,
  contact: undefined,
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

  @Selector()
  static fetchContact(state: ContactStateModel) {
    return state.contact;
  }

  /* Contact State Actions */
  @Action(GetAllContacts)
  getAll({ patchState }: StateContext<ContactStateModel>) {
    const contacts: Array<Contact> = this.store.selectSnapshot(ContactState).contacts;

    if (contacts) {
      const parsedContacts: Array<Contact> = JSON.parse(JSON.stringify(contacts));
      patchState({
        contacts: parsedContacts
      });
    } else {
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

  @Action(UpdateContact)
  updateContact({ patchState }: StateContext<ContactStateModel>, action: UpdateContact) {
    const contacts: Array<Contact> = this.store.selectSnapshot(ContactState).contacts || [];
    const existingContacts: Array<Contact> = JSON.parse(JSON.stringify(contacts));

    existingContacts.forEach((c: Contact) => {
      if (c.id === action.id) {
        c.email = action.contact.email;
        c.name = action.contact.name;
        c.phone = action.contact.phone;
        c.isFavorite = action.contact.isFavorite;
      }
    });

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

  @Action(GetContactById)
  getContactById({ patchState }: StateContext<ContactStateModel>, action: GetContactById) {
    const contacts: Array<Contact> = this.store.selectSnapshot(ContactState).contacts || [];
    const contact: Contact = contacts.find((c: Contact) => c.id === action.id);

    patchState({
      contact: { ...contact }
    });
  }

}

