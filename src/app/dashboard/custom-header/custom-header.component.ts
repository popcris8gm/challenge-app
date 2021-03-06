import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { User } from '../../shared/interfaces/user.interface';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AppStaticRoutes } from '../../shared/enums/app-static-routes.enum';
import { UserState } from '../../shared/store/user/user.state';
import { Logout } from '../../shared/store/user/user.action';

@Component({
  selector: 'custom-header',
  templateUrl: './custom-header.component.html',
  styleUrls: ['./custom-header.component.scss']
})
export class CustomHeaderComponent {
  @Select(UserState.fetchLogin)
  private currentUser$: Observable<User>;

  constructor(private store: Store, private router: Router) {
  }

  logout(): void {
    this.store.dispatch(new Logout());
    this.currentUser$.pipe(take(1)).subscribe((user: User | undefined) => {
      if (!user) {
        this.router.navigateByUrl(AppStaticRoutes.LOGIN);
      }
    });
  }
}
