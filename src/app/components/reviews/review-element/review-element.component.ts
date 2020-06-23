import { Component, OnInit, Input } from '@angular/core';
import { ReviewService } from '../../../shared/review.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { AuthService } from 'src/app/shared/auth.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-review-element',
  templateUrl: './review-element.component.html',
  styleUrls: ['./review-element.component.scss'],
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
export class ReviewElementComponent implements OnInit {
  formattedDate = '';
  public showDialog = false;
  @Input() reviewElement: any;
  public currentRate: number[];
  public reviewId: string;
  public reviewReported = false;
  public isCurrentUserOwner = false;
  public showDeleteDialog = false;

  constructor(
    private reviewService: ReviewService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private authService: AuthService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.formattedDate = this.reviewService.formatDate(this.reviewElement);
    this.currentRate = this.transformIntoArray(this.reviewElement.data.rating);
    this.authService.afAuth.user.subscribe(res => {
      if (res !== null) {
        if (res.email === this.reviewElement.data.userName) {
          this.isCurrentUserOwner = true;
        } else {
          this.isCurrentUserOwner = false;
        }
      }
    });
  }

  openReportDialog() {
    this.showDialog = !this.showDialog;
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

  sendReport(id: string) {
    this.reviewReported = true;
    this.reviewService
      .reportReview(id)
      .then(res => {
        this.translate.get('TOASTR').subscribe(response => {
          this.toastr.success(response.REPORTED, response.SUCCESS_TITLE);
          this.openReportDialog();
        });
      })
      .catch(err => {
        this.toastr.error(err.message);
        this.openReportDialog();
      });
  }

  editReview() {
    this.sharedService.nextEditModalState(true);
    this.sharedService.nextReviewData(
      this.reviewElement.data,
      this.reviewElement.id
    );
  }

  deleteReviewDialog() {
    this.showDeleteDialog = !this.showDeleteDialog;
  }

  deleteReview() {
    this.reviewService
      .deleteReview(this.reviewElement.id)
      .then(res => {
        this.toastr.success('Review deleted!', 'Success.');
      })
      .catch(err => {
        this.toastr.error(err.message, err.error);
      });
    this.showDeleteDialog = !this.showDeleteDialog;
  }
}
