import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReviewService } from 'src/app/shared/review.service';
import { AuthService } from 'src/app/shared/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Review } from '../review-element/Review.model';
import { trigger, transition, style, animate } from '@angular/animations';

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
  constructor(
    private router: Router,
    private reviewService: ReviewService,
    private auth: AuthService,
    private toastr: ToastrService
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
    return transformedArray;
  }

  openReviewDialog() {
    this.reportReview = !this.reportReview;
  }

  sendReport() {
    this.toastr.success('Review Reported.', 'Success!');
    this.openReviewDialog();
  }
}
