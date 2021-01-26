import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Login, Logout } from './user.action';

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

}

