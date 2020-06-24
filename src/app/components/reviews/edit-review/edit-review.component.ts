import { OnInit, Component, Input } from '@angular/core';
import { Review } from '../review-element/Review.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared/shared.service';
import { ReviewService } from 'src/app/shared/review.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-review',
  templateUrl: './edit-review.component.html',
  styleUrls: ['./edit-review.component.scss']
})
export class EditReviewComponent implements OnInit {
  @Input() reviewData: Review;
  @Input() reviewId: string;
  editWindowForm: FormGroup;
  constructor(
    private sharedService: SharedService,
    private reviewService: ReviewService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  submitEditReviewForm() {
    this.reviewService
      .updateReview(this.reviewId, this.editWindowForm.value as Review)
      .then(res => {
        this.toastr.success('Review successfully updated.', 'Success!');
        this.sharedService.nextEditModalState(false);
      })
      .catch(err => {
        this.toastr.error(err.message, err.error);
      });
  }

  discardWindow() {
    this.sharedService.nextEditModalState(false);
  }

  initForm() {
    this.editWindowForm = new FormGroup({
      rating: new FormControl(this.reviewData.rating, Validators.required),
      textExcerpt: new FormControl(
        this.reviewData.textExcerpt,
        Validators.required
      ),
      reviewPros: new FormControl(
        this.reviewData.reviewPros,
        Validators.required
      ),
      reviewCons: new FormControl(
        this.reviewData.reviewCons,
        Validators.required
      )
    });
  }
}
