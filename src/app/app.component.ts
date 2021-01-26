import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoadingService } from './shared/services/loading.service';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from './shared/abstract/base.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.scss',
    './shared/styles/main.scss',
    './shared/styles/color.scss',
    './shared/styles/form.scss',
    './shared/styles/button.scss',
    './shared/styles/table.scss',
  ],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent extends BaseComponent implements OnInit {
  showLoading: boolean;

  constructor(private loadingService: LoadingService) {
    super();
  }

  ngOnInit(): void {
    this.watchLoadingStatus();
    setInterval(() => {
      // console.log('Loading status: ', this.showLoading);
    }, 2000);
  }

  private watchLoadingStatus(): void {
    this.loadingService.loadingObservable.pipe(takeUntil(this.destroy$)).subscribe((value: boolean) => {
      setTimeout(() => {
        this.showLoading = value;
      });
    });
  }
}
