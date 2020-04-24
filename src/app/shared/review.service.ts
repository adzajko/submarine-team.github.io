import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Review } from '../components/reviews/review-element/Review.model';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private firestore: AngularFirestore) {}

  getReviews() {
    return this.firestore.collection('reviews').snapshotChanges();
  }

  postReview(review: Review) {
    return this.firestore.collection('reviews').add(review);
  }

  updatePolicy(review: Review) {}

  deleteReview(reviewId: string) {
    this.firestore.doc('reviews/' + reviewId).delete();
  }
}
