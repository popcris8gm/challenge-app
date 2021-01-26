import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { AuthState } from '../store/auth/auth.state';
import { Store } from '@ngxs/store';
import { AppStaticRoutes } from '../enums/app-static-routes.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {
  }

  canActivate() {
    const user: User = this.store.selectSnapshot(AuthState).currentUser;

    if (user?.id) {
      return true;
    } else {
      this.router.navigateByUrl(AppStaticRoutes.LOGIN);
      return false;
    }
  }
}
