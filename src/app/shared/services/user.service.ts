import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { delay, tap } from 'rxjs/operators';
import { LoadingService } from './loading.service';
import { mockUser } from '../mocks/mock-user';

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
