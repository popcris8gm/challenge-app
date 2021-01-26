import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from './services/user.service';
import { HttpService } from './services/http.service';
import { HttpClientModule } from '@angular/common/http';
import { LoadingService } from './services/loading.service';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    UserService,
    HttpService,
    LoadingService,
    AuthGuard
  ],
  exports: [
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
  ]
})
export class SharedModule {
}
