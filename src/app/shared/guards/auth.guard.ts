import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { Store } from '@ngxs/store';
import { AppStaticRoutes } from '../enums/app-static-routes.enum';
import { UserState } from '../store/user/user.state';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {
  }

  canActivate() {
    const user: User = this.store.selectSnapshot(UserState).currentUser;
    console.log(user);

    if (user?.id) {
      return true;
    } else {
      this.router.navigateByUrl(AppStaticRoutes.LOGIN);
      return false;
    }
  }
}
