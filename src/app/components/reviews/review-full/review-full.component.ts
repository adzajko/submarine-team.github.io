import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReviewService } from 'src/app/shared/review.service';
import { AuthService } from 'src/app/shared/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Review } from '../review-element/Review.model';
import { trigger, transition, style, animate } from '@angular/animations';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-review-full',
  templateUrl: './review-full.component.html',
  styleUrls: ['./review-full.component.scss'],
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('200ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class ReviewFullComponent implements OnInit {
  activeReview: Review;
  currentReviewId = '';
  starRating: number[] = [];
  transformedTimeStamp: string;
  reportReview = false;
  showDeleteDialog = false;
  isCurrentUserOwner = false;
  constructor(
    private router: Router,
    private reviewService: ReviewService,
    private auth: AuthService,
    private toastr: ToastrService,
    private sharedService: SharedService
  ) {
    this.currentReviewId = this.router.url.slice(9);
  }

  ngOnInit(): void {
    this.auth.showHTTPLoader(true);
    this.reviewService.getReviewById(this.currentReviewId).subscribe(
      res => {
        this.auth.showHTTPLoader(false);
        if (!res.payload.data()) {
          this.router.navigate(['/404']);
          return;
        }
        this.activeReview = res.payload.data() as Review;
        this.starRating = this.transformIntoArray(this.activeReview.rating);
        this.transformedTimeStamp = this.reviewService.formatDate(
          this.activeReview.timeStamp
        );
        this.checkIfOwner();
      },
      errorRes => {
        this.auth.showHTTPLoader(false);
        this.toastr.error(errorRes.message);
      }
    );
  }

  transformIntoArray(value: number) {
    const transformedArray = [];
    for (let i = 1; i <= value; i++) {
      transformedArray.push(i);
    }
    while (transformedArray.length < 10) {
      transformedArray.push(11);
    }
    return transformedArray;
  }

  openReviewDialog() {
    this.reportReview = !this.reportReview;
  }

  sendReport() {
    this.toastr.success('Review Reported.', 'Success!');
    this.openReviewDialog();
  }

  openDeleteDialog() {
    this.showDeleteDialog = !this.showDeleteDialog;
  }

  openEditWindow() {
    this.sharedService.nextEditModalState(true);
    this.sharedService.nextReviewData(this.activeReview, this.currentReviewId);
  }

  deleteReview() {
    this.reviewService
      .deleteReview(this.currentReviewId)
      .then(res => {
        this.toastr.success('Review deleted.', 'Success!');
        this.openDeleteDialog();
      })
      .catch(err => {
        this.toastr.error(err.message, err.error);
      });
  }

  checkIfOwner() {
    this.auth.afAuth.user.subscribe(res => {
      if (res !== null) {
        if (this.activeReview.userName === res.email) {
          this.isCurrentUserOwner = true;
        } else {
          this.isCurrentUserOwner = false;
        }
      }
    });
  }
}
