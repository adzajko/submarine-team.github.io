import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReviewService } from 'src/app/shared/review.service';
import { AuthService } from 'src/app/shared/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-review-full',
  templateUrl: './review-full.component.html',
  styleUrls: ['./review-full.component.scss']
})
export class ReviewFullComponent implements OnInit {
  activeReview: any;
  currentReviewId = '';
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
        this.activeReview = res.payload.data();
        console.log(this.activeReview);
      },
      errorRes => {
        this.auth.showHTTPLoader(false);
        this.toastr.error(errorRes.message);
      }
    );
  }
}
