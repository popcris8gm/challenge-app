import { CreateContact, GetContactById, UpdateContact } from '../../../shared/store/contact/contact.action';
import { phoneNumberValidator } from '../../../shared/validators/phone-number.validator';
import { AppStaticRoutes } from '../../../shared/enums/app-static-routes.enum';
import { ContactState } from '../../../shared/store/contact/contact.state';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Contact } from '../../../shared/interfaces/contact.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.scss']
})
export class ContactModalComponent implements OnInit {
  @Select(ContactState.fetchContact)
  private contact$: Observable<Contact>;

  form: FormGroup;
  isEditMode: boolean;
  contact: Contact = {} as Contact;

  constructor(private store: Store, private router: Router, private  activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.initForm();
    this.checkEditMode();
  }

  private checkEditMode(): void {
    this.isEditMode = this.activatedRoute.snapshot.data.isEditMode;
    if (this.isEditMode) {
      this.store.dispatch(new GetContactById(this.activatedRoute.snapshot.params.id));

      this.contact$.pipe(take(1)).subscribe((contact: Contact) => {
        if (contact) {
          this.contact = { ...contact };
          this.populateForm(contact);
        }
      });
    }
  }

  private initForm(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, phoneNumberValidator()])
    });
  }

  populateForm(contact: Contact): void {
    this.email.setValue(contact.email);
    this.phone.setValue(contact.phone);
    this.name.setValue(contact.name);
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.contact.email = this.email.value;
      this.contact.name = this.name.value;
      this.contact.phone = this.phone.value;

      if (this.isEditMode) {
        this.store.dispatch(new UpdateContact(this.contact, this.contact.id));
      } else {
        this.store.dispatch(new CreateContact(this.form.value));
      }
      this.router.navigateByUrl(AppStaticRoutes.CONTACTS);
    }
  }

  close(): void {
    this.router.navigateByUrl(AppStaticRoutes.CONTACTS);
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
