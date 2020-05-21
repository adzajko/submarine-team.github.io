import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Review } from '../components/reviews/review-element/Review.model';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  constructor(private firestore: AngularFirestore, private ts: ToastrService) {}

  getReviews() {
    return this.firestore
      .collection('reviews', revs => revs.orderBy('timeStamp', 'desc'))
      .snapshotChanges();
  }

  getReviewById(id: string) {
    return this.firestore
      .collection('reviews')
      .doc(id)
      .snapshotChanges();
  }

  getReviewsForCompany(companyName: string) {
    return this.firestore
      .collection('reviews', ref => ref.where('companyName', '==', companyName))
      .snapshotChanges();
  }

  postReview(review: Review) {
    return this.firestore.collection('reviews').add(review);
  }

  updateReview(review: Review) {}

  upvoteReview(reviewId: string, value: number, user: string) {
    this.firestore
      .collection(`reviews/${reviewId}/upvotes`)
      .add({ username: user, upvote: value })
      .catch(error => {
        this.ts.error(error.message, 'Error:');
      });
  }

  getUpvotes(reviewId: string) {
    return this.firestore
      .collection(`reviews/${reviewId}/upvotes`, ref =>
        ref.where('upvote', '==', 1)
      )
      .snapshotChanges();
  }

  getDownvotes(reviewId: string) {
    return this.firestore
      .collection(`reviews/${reviewId}/upvotes`, ref =>
        ref.where('upvote', '==', -1)
      )
      .snapshotChanges();
  }

  deleteReview(reviewId: string) {
    this.firestore.doc('reviews/' + reviewId).delete();
  }

  resolvePayload(e: any) {
    return e[0].payload.doc.data();
  }

  formatDate(element) {
    element = element.data.timeStamp.toDate();
    return moment(element).format('DD. MM. YYYY');
  }
}
