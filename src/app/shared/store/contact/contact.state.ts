import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { GetAllContacts } from './contact.action';
import { ContactService } from '../../services/contact.service';

export interface ContactStateModel {
  contacts: Array<Contact> | undefined;
}

const defaults: ContactStateModel = {
  contacts: [],
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

}

