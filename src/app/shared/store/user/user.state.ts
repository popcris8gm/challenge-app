import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { AddFavoriteContact, Login, Logout, RemoveFavoriteContact } from './user.action';
import { GetAllContacts, RefreshContacts } from '../contact/contact.action';
import { mockUser } from '../../mocks/mock-user';

export interface UserStateModel {
  currentUser: User | undefined;
  authError: string;
}

const defaults: UserStateModel = {
  currentUser: undefined,
  authError: undefined
};

@State<UserStateModel>({
  name: 'auth',
  defaults: defaults
})

@Injectable()
export class UserState {
  constructor(private store: Store, private userService: UserService) {
  }

  /* Auth State Selectors */
  @Selector()
  static fetchLogin(state: UserStateModel) {
    return state.currentUser;
  }

  @Selector()
  static fetchLoginError(state: UserStateModel) {
    return state.authError;
  }

  /* Auth State Actions */
  @Action(Login)
  login({ patchState }: StateContext<UserStateModel>, action: Login) {
    this.userService.login(action?.user?.email, action?.user?.password).subscribe((loggedInUser: User | undefined) => {
      if (loggedInUser?.id) {
        patchState({
          currentUser: loggedInUser
        });
      } else {
        patchState({
          currentUser: undefined,
          authError: 'Invalid Credentials'
        });
      }
    });
  }

  @Action(Logout)
  logout({ patchState }: StateContext<UserStateModel>) {
    patchState({
      currentUser: undefined
    });
  }

  @Action(AddFavoriteContact)
  addFavoriteContact({ patchState }: StateContext<UserStateModel>, action: AddFavoriteContact) {
    const storedUser: User = this.store.selectSnapshot(UserState).currentUser;
    const user: User = JSON.parse(JSON.stringify(storedUser));

    if (user) {
      let found: boolean;

      found = user.favorites.some((value) => value === action.contactId);

      if (!found) {
        user.favorites = user.favorites || [];
        user.favorites.push(action.contactId);

        patchState({
          currentUser: user
        });
        setTimeout(() => {
          this.store.dispatch(new RefreshContacts());
        });
      }
    }
  }

  @Action(RemoveFavoriteContact)
  removeFavoriteContact({ patchState }: StateContext<UserStateModel>, action: RemoveFavoriteContact) {
    const storedUser: User = this.store.selectSnapshot(UserState).currentUser;
    const user: User = JSON.parse(JSON.stringify(storedUser));

    if (user) {
      user.favorites = user.favorites.filter((value) => value !== action.contactId);

      patchState({
        currentUser: user
      });

      setTimeout(() => {
        this.store.dispatch(new RefreshContacts());
      });
    }
  }

}

