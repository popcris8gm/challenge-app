import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private subject: Subject<boolean> = new Subject<boolean>();

  loadingObservable: Observable<boolean> = this.subject.asObservable();
  counter = 0;

  increase(): void {
    if (++this.counter === 1) {
      this.subject.next(true);
    }
  }

  decrease(): void {
    if (--this.counter === 0) {
      this.subject.next(false);
    }
  }

}
