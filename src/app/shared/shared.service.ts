import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public publishLoginModalState: Subject<any> = new Subject<any>();
  constructor() {}

  emitLoginModalState(value: boolean) {
    this.publishLoginModalState.next(value);
  }
}
