import { NgModule } from '@angular/core';
import { ContactsComponent } from './contacts.component';
import { ContactsRoutingModule } from './contacts-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ContactModalComponent } from './contact-modal/contact-modal.component';

@NgModule({
  declarations: [
    ContactsComponent,
    ContactModalComponent
  ],
  imports: [
    ContactsRoutingModule,
    SharedModule
  ],
})
export class ContactsModule {
}
