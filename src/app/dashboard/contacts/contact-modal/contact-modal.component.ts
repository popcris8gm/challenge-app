import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { CreateContact } from '../../../shared/store/contact/contact.action';
import { Router } from '@angular/router';
import { AppStaticRoutes } from '../../../shared/enums/app-static-routes.enum';

@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.scss']
})
export class ContactModalComponent implements OnInit {
  form: FormGroup;

  constructor(private store: Store, private router: Router) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.maxLength(10),
        Validators.minLength(10), Validators.pattern(/^-?(0|[1-9]\d*)?$/)])
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.store.dispatch(new CreateContact(this.form.value));
      this.router.navigateByUrl(AppStaticRoutes.CONTACTS);
    }
  }

  get email(): FormControl {
    return this.form.controls.email as FormControl;
  }

  get name(): FormControl {
    return this.form.controls.name as FormControl;
  }

  get phone(): FormControl {
    return this.form.controls.phone as FormControl;
  }

}
