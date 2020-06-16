import { Component, OnInit, Input } from '@angular/core';
import { ReviewService } from '../../../shared/review.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { trigger, transition, style, animate } from '@angular/animations';

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
  constructor(
    private reviewService: ReviewService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.formattedDate = this.reviewService.formatDate(this.reviewElement);
    this.currentRate = this.transformIntoArray(this.reviewElement.data.rating);
  }

  openReportDialog() {
    this.showDialog = !this.showDialog;
  }

  transformIntoArray(value: number) {
    const transformedArray = [];
    for (let i = 1; i <= value; i++) {
      transformedArray.push(i);
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
}
