import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.scss',
    './shared/styles/main.scss',
    './shared/styles/color.scss',
    './shared/styles/form.scss',
    './shared/styles/button.scss',
  ],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
}
