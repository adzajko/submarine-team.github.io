import { Component, OnInit } from '@angular/core';
import { ReviewService } from 'src/app/shared/review.service';
import { Review } from '../review-element/Review.model';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-full-list',
  templateUrl: './full-list.component.html',
  styleUrls: ['./full-list.component.scss']
})
export class FullListComponent implements OnInit {
  public options = ['Best Rated', 'Worst Rated', 'Oldest', 'Newest'];
  public listOfReviews: Review[] = [];
  reviewFilterGroup: FormGroup;
  private currentUser: string;

  constructor(
    private reviewService: ReviewService,
    private toastr: ToastrService,
    private authService: AuthService
  ) {
    this.reviewFilterGroup = new FormGroup({
      sortOption: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.reviewService.getReviews().subscribe((response: any) => {
      this.listOfReviews = response.map(e => {
        return { data: e.payload.doc.data(), id: e.payload.doc.id };
      });
    });
    this.authService.afAuth.user.subscribe(res => {
      this.currentUser = res.email;
      if (res !== null) {
        this.options.push('Your Reviews');
      }
    });
  }

  orderReviews() {
    const param = this.reviewFilterGroup.value.sortOption;
    switch (param) {
      case 'Worst Rated': {
        this.reviewService.filterReviewsByRating().subscribe(
          res => {
            const ratingFilterArray = [];
            res.docs.forEach(e => {
              ratingFilterArray.push({ data: e.data(), id: e.data().id });
            });
            this.listOfReviews = ratingFilterArray;
          },
          err => {
            this.toastr.error(err.message);
          }
        );
        break;
      }
      case 'Oldest': {
        this.reviewService.filterReviewsByDate().subscribe(
          res => {
            const timeStampFilterArray = [];
            res.docs.forEach(e => {
              timeStampFilterArray.push({ data: e.data(), id: e.data().id });
            });
            this.listOfReviews = timeStampFilterArray;
          },
          err => {
            this.toastr.error(err.message);
          }
        );
        break;
      }
      case 'Newest': {
        this.reviewService.filterNewest().subscribe(
          res => {
            const timeStampFilterArray = [];
            res.docs.forEach(e => {
              timeStampFilterArray.push({ data: e.data(), id: e.data().id });
            });
            this.listOfReviews = timeStampFilterArray;
          },
          err => {
            this.toastr.error(err.message);
          }
        );
        break;
      }
      case 'Best Rated': {
        this.reviewService.filterBestReviewed().subscribe(
          res => {
            const bestRatings = [];
            res.docs.forEach(e => {
              bestRatings.push({ data: e.data(), id: e.data().id });
            });
            this.listOfReviews = bestRatings;
          },
          err => {
            this.toastr.error(err.message);
          }
        );
        break;
      }
      case 'Your Reviews': {
        this.listOfReviews = this.listOfReviews.filter(
          (e: any) => e.data.userName === this.currentUser
        );
        break;
      }
    }
  }
}
