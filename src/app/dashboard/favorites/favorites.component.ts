import { Component, OnInit } from '@angular/core';
import { Contact } from '../../shared/interfaces/contact.interface';
import { Select, Store } from '@ngxs/store';
import { BaseComponent } from '../../shared/abstract/base.component';
import { GetAllContacts } from '../../shared/store/contact/contact.action';
import { takeUntil } from 'rxjs/operators';
import { ContactState } from '../../shared/store/contact/contact.state';
import { Observable } from 'rxjs';
import { RemoveFavoriteContact } from '../../shared/store/user/user.action';

@Component({
  selector: 'favorites',
  templateUrl: 'favorites.component.html',
  styleUrls: ['favorites.component.scss']
})
export class FavoritesComponent extends BaseComponent implements OnInit {
  @Select(ContactState.fetchContacts)
  private contacts$: Observable<Array<Contact>>;

  contacts: Array<Contact> = new Array<Contact>();
  searchByModel: Contact = {} as Contact;

  constructor(private store: Store) {
    super();
  }

  ngOnInit(): void {
    this.fetchContacts();
    this.watchContacts();
  }

  searchByModelChanged(): void {
    this.searchByModel = { ...this.searchByModel };
  }

  private fetchContacts(): void {
    this.store.dispatch(new GetAllContacts());
  }

  private watchContacts(): void {
    this.contacts$.pipe(takeUntil(this.destroy$)).subscribe((contacts: Array<Contact>) => {
      if (contacts) {
        this.contacts = contacts.filter((c: Contact) => c.isFavorite);
      }
    });
  }

  public removeFromFavorites(contact: any) {
    this.store.dispatch(new RemoveFavoriteContact(contact.id));
  }
}
