import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CustomHeaderComponent } from './custom-header/custom-header.component';
import { SideMenuComponent } from './side-menu/side-menu.component';

@NgModule({
  declarations: [
    DashboardComponent,
    CustomHeaderComponent,
    SideMenuComponent
  ],
  imports: [
    DashboardRoutingModule,
    SharedModule,
  ],
})
export class DashboardModule {
}
