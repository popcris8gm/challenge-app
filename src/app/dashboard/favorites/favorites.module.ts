import { NgModule } from '@angular/core';
import { FavoritesComponent } from './favorites.component';
import { FavoritesRoutingModule } from './favorites-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    FavoritesComponent
  ],
  imports: [
    FavoritesRoutingModule,
    SharedModule
  ],
})
export class FavoritesModule {
}
