import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/user.model';
import { Select, Store } from '@ngxs/store';
import { Login } from '../../shared/store/auth/auth.action';
import { AuthState } from '../../shared/store/auth/auth.state';
import { Observable } from 'rxjs';
import { BaseComponent } from '../../shared/abstract/base.component';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AppStaticRoutes } from '../../shared/enums/app-static-routes.enum';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {
  @Select(AuthState.fetchLogin)
  private currentUser$: Observable<User>;
  @Select(AuthState.fetchLoginError)
  private loginError$: Observable<string>;

  form: FormGroup;
  errorMessage: string;
  isLoginPending: boolean;

  constructor(private store: Store, private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
    this.watchLoginActions();
  }

  private initForm(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  private watchLoginActions(): void {
    /* Success case */
    this.currentUser$.pipe(takeUntil(this.destroy$)).subscribe((user: User) => {
      if (user?.id) {
        this.router.navigateByUrl(AppStaticRoutes.DASHBOARD);
      }
    });

    /* Error case */
    this.loginError$.pipe(takeUntil(this.destroy$)).subscribe((error: string) => {
      if (error) {
        this.errorMessage = error;
      }
    });
  }

  login(): void {
    if (this.form.valid && !this.isLoginPending) {
      this.isLoginPending = true;
      this.store.dispatch(new Login(this.form.value));
    }
  }

  get email(): FormControl {
    return this.form.controls.email as FormControl;
  }

  get password(): FormControl {
    return this.form.controls.password as FormControl;
  }
}
