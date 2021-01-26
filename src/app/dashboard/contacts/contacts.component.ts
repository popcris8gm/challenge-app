import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { BaseComponent } from '../../shared/abstract/base.component';
import { Observable } from 'rxjs';
import { ContactState } from '../../shared/store/contact/contact.state';
import { Contact } from '../../shared/models/contact.model';
import { takeUntil } from 'rxjs/operators';
import { GetAllContacts } from '../../shared/store/contact/contact.action';

@Component({
  selector: 'contacts',
  templateUrl: 'contacts.component.html',
  styleUrls: ['contacts.component.scss']
})
export class ContactsComponent extends BaseComponent implements OnInit {
  @Select(ContactState.fetchContacts)
  private contacts$: Observable<Array<Contact>>;

  contacts: Array<Contact>;

  constructor(private store: Store) {
    super();
  }

  ngOnInit(): void {
    this.store.dispatch(new GetAllContacts());
    this.watchContacts();
  }

  private watchContacts(): void {
    this.contacts$.pipe(takeUntil(this.destroy$)).subscribe((contacts: Array<Contact>) => {
      this.contacts = contacts;
    });
  }

}
