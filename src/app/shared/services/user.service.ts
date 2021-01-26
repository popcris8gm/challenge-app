import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';
import { delay, tap } from 'rxjs/operators';
import { LoadingService } from './loading.service';

const mockUser: User = {
  password: 'parola',
  email: 'email@gmail.com',
  id: 'nd29178db12hdapon892',
  name: 'Cris'
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private loadingService: LoadingService) {
  }

  public login(email: string, password: string): Observable<User | undefined> {
    this.loadingService.increase();
    let observable: Observable<User | undefined>;

    if (mockUser.email === email && mockUser.password === password) {
      observable = of(mockUser);
    } else {
      observable = of(undefined);
    }

    return observable.pipe(delay(1500), tap(() => {
      this.loadingService.decrease();
    }));
  }

}
