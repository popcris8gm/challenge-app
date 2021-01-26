import { Component, Input } from '@angular/core';
import { ConfirmationWindowService } from '../../services/confirmation-window.service';

@Component({
  selector: 'confirmation-window[message]',
  templateUrl: 'confirmation-window.component.html',
  styleUrls: ['confirmation-window.component.scss']
})
export class ConfirmationWindowComponent {
  @Input() message: string;

  constructor(private confirmationWindowService: ConfirmationWindowService) {
  }

  confirm(): void {
    this.confirmationWindowService.confirm();
  }

  cancel(): void {
    this.confirmationWindowService.cancel();
  }
}
