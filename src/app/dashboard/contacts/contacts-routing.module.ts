import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactsComponent } from './contacts.component';
import { ContactModalComponent } from './contact-modal/contact-modal.component';

const routes: Routes = [{
  path: '',
  component: ContactsComponent,
  children: [{
    path: 'new',
    component: ContactModalComponent,
    data: { isEditMode: true }
  }, {
    path: 'edit/:id',
    component: ContactModalComponent,
    data: { isEditMode: false }
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule {
}
