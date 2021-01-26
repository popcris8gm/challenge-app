import { SideMenuSection } from '../../shared/enums/side-menu-section.enum';
import { AppStaticRoutes } from '../../shared/enums/app-static-routes.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  APP_STATIC_ROUTES = AppStaticRoutes;
  SIDE_MENU_SECTIONS = SideMenuSection;
  selectedSection: SideMenuSection;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.setSelectedSection();
  }

  private setSelectedSection(): void {
    this.selectedSection = this.activatedRoute?.firstChild?.snapshot.data.section;
  }

  navigateTo(path: string): void {
    this.router.navigateByUrl(path).then(() => {
      this.setSelectedSection();
    });
  }
}
