import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { State, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';

export interface AuthStateModel {
  currentUser: User;
}

const defaults: AuthStateModel = {
  currentUser: undefined
};

@State<AuthStateModel>({
  name: 'auth',
  defaults: defaults
})
@Injectable()
export class AuthState {
  constructor(private store: Store, private userService: UserService) {
  }

}

