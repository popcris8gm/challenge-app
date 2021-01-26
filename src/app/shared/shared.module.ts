import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';
import { PhoneNumberPipe } from './pipes/phone-number.pipe';
import { SearchByPipe } from './pipes/search-by.pipe';
import { ConfirmationWindowComponent } from './components/confirmation-window/confirmation-window.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    AuthGuard,
  ],
  declarations: [
    PhoneNumberPipe,
    SearchByPipe,
    ConfirmationWindowComponent
  ],
  exports: [
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    PhoneNumberPipe,
    SearchByPipe,
    ConfirmationWindowComponent
  ]
})
export class SharedModule {
}
