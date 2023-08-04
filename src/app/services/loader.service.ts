import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  isLoadingSubject: BehaviorSubject<boolean>;
  isLoading$: Observable<boolean>;

  get currentUserValue(): boolean {
    return this.isLoadingSubject.value;
  }

  constructor() {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  start() {
    this.isLoadingSubject.next(true);
  }

  stop() {
    this.isLoadingSubject.next(false);
  }
}
