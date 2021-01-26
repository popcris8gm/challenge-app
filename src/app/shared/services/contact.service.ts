import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, share, tap } from 'rxjs/operators';
import { LoadingService } from './loading.service';
import { Contact } from '../models/contact.model';
import { mockContacts } from '../mocks/mock-contacts';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private loadingService: LoadingService) {
  }

  getAll(): Observable<Array<Contact>> {
    this.loadingService.increase();

    return of(mockContacts).pipe(delay(500), tap(() => {
      this.loadingService.decrease();
    }));
  }

}
