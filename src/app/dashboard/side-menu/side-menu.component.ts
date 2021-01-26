import { Component, OnInit } from '@angular/core';
import { AppStaticRoutes } from '../../shared/enums/app-static-routes.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent {
  APP_STATIC_ROUTES = AppStaticRoutes;

  constructor(private router: Router) {
  }

  navigateTo(path: string): void {
    this.router.navigateByUrl(path);
  }
}
