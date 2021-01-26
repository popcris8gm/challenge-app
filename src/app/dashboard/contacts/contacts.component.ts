import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { BaseComponent } from '../../shared/abstract/base.component';
import { Observable } from 'rxjs';
import { ContactState } from '../../shared/store/contact/contact.state';
import { Contact } from '../../shared/models/contact.model';
import { takeUntil } from 'rxjs/operators';
import { DeleteContact, GetAllContacts } from '../../shared/store/contact/contact.action';
import { AddFavoriteContact, RemoveFavoriteContact } from '../../shared/store/user/user.action';

@Component({
  selector: 'contacts',
  templateUrl: 'contacts.component.html',
  styleUrls: ['contacts.component.scss']
})
export class ContactsComponent extends BaseComponent implements OnInit {
  @Select(ContactState.fetchContacts)
  private contacts$: Observable<Array<Contact>>;

  contacts: Array<Contact> = new Array<Contact>();

  constructor(private store: Store) {
    super();
  }

  ngOnInit(): void {
    this.fetchContacts();
    this.watchContacts();
  }

  private fetchContacts(): void {
    this.store.dispatch(new GetAllContacts());
  }

  private watchContacts(): void {
    this.contacts$.pipe(takeUntil(this.destroy$)).subscribe((contacts: Array<Contact>) => {
      if (contacts) {
        this.contacts = contacts;
      }
    });
  }

  toggleFavorite(contact: Contact): void {
    if (!contact.isFavorite) {
      this.store.dispatch(new AddFavoriteContact(contact.id));
    } else {
      this.store.dispatch(new RemoveFavoriteContact(contact.id));
    }
  }

  delete(contact: Contact): void {
    this.store.dispatch(new DeleteContact(contact.id));
  }
}
