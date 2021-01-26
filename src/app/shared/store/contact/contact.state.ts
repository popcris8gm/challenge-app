import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { CreateContact, DeleteContact, GetAllContacts } from './contact.action';
import { ContactService } from '../../services/contact.service';
import { UserState } from '../user/user.state';

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
      patchState({
        contacts: contacts
      });
    });
  }

  @Action(CreateContact)
  createContact({ patchState }: StateContext<ContactStateModel>, action: CreateContact) {
    const contacts: Array<Contact> = this.store.selectSnapshot(ContactState).contacts || [];
    contacts.push(action.contact);

    patchState({
      contacts: { ...contacts }
    });
  }

  @Action(DeleteContact)
  deleteContact({ patchState }: StateContext<ContactStateModel>, action: DeleteContact) {
    const contacts: Array<Contact> = this.store.selectSnapshot(ContactState).contacts || [];

    const newContacts: Array<Contact> = contacts.filter((contact: Contact) => contact.id !== action.id).map((contact: Contact) => contact);

    patchState({
      contacts: newContacts
    });
  }

}

