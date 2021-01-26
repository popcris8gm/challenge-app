import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Login, Logout } from './auth.action';

export interface AuthStateModel {
  currentUser: User | undefined;
  authError: string;
}

const defaults: AuthStateModel = {
  currentUser: undefined,
  authError: undefined
};

@State<AuthStateModel>({
  name: 'auth',
  defaults: defaults
})
@Injectable()
export class AuthState {
  constructor(private store: Store, private userService: UserService) {
  }

  /* Auth State Selectors */
  @Selector()
  static fetchLogin(state: AuthStateModel) {
    return state.currentUser;
  }

  @Selector()
  static fetchLoginError(state: AuthStateModel) {
    return state.authError;
  }

  /* Auth State Actions */
  @Action(Login)
  login({ patchState }: StateContext<AuthStateModel>, action: Login) {
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
  logout({ patchState }: StateContext<AuthStateModel>) {
    patchState({
      currentUser: undefined
    });
  }

}

