import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationWindowService {
  private confirmationMessageSubject: Subject<string> = new Subject<string>();
  confirmationMessageObservable$: Observable<string> = this.confirmationMessageSubject.asObservable();

  private confirmationAnswerSubject: Subject<boolean> = new Subject<boolean>();
  confirmationAnswerObservable$: Observable<boolean> = this.confirmationAnswerSubject.asObservable();

  public openConfirmationWindow(message: string): void {
    this.confirmationMessageSubject.next(message);
  }

  public confirm(): void {
    this.confirmationAnswerSubject.next(true);
    this.confirmationMessageSubject.next(null);
  }

  public cancel(): void {
    this.confirmationAnswerSubject.next(false);
    this.confirmationMessageSubject.next(null);
  }
}
