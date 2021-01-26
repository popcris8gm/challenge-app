import { NgModule } from '@angular/core';
import { ContactsComponent } from './contacts.component';
import { ContactsRoutingModule } from './contacts-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    ContactsComponent
  ],
  imports: [
    ContactsRoutingModule,
    SharedModule
  ],
})
export class ContactsModule {
}
