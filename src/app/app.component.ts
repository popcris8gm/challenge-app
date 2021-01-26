import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoadingService } from './shared/services/loading.service';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from './shared/abstract/base.component';
import { ConfirmationWindowService } from './shared/services/confirmation-window.service';

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
  confirmationWindowMessage: string;

  constructor(private loadingService: LoadingService, private confirmationWindowService: ConfirmationWindowService) {
    super();
  }

  ngOnInit(): void {
    this.watchConfirmationWindowStatus();
    this.watchLoadingStatus();
    setInterval(() => {
      // console.log('Loading status: ', this.showLoading);
    }, 200);
  }

  private watchLoadingStatus(): void {
    this.loadingService.loadingObservable.pipe(takeUntil(this.destroy$)).subscribe((value: boolean) => {
      setTimeout(() => {
        this.showLoading = value;
      });
    });
  }

  private watchConfirmationWindowStatus(): void {
    this.confirmationWindowService.confirmationMessageObservable$.pipe(takeUntil(this.destroy$))
      .subscribe((message: string) => {
        this.confirmationWindowMessage = message;
      });
  }
}
