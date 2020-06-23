import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Review } from '../components/reviews/review-element/Review.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public publishLoginModalState: Subject<any> = new Subject<any>();
  public editWindowSubject = new BehaviorSubject<boolean>(false);
  public editWindowData = new BehaviorSubject<any[]>(null);
  constructor() {}

  emitLoginModalState(value: boolean) {
    this.publishLoginModalState.next(value);
  }

  nextEditModalState(value: boolean) {
    this.editWindowSubject.next(value);
  }

  nextReviewData(review: Review, reviewId: string) {
    this.editWindowData.next([review, reviewId]);
  }
}
