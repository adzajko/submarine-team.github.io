import { Component, OnInit, Input } from '@angular/core';
import { Review } from './Review.model';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ReviewService } from '../../../shared/review.service';
import * as moment from 'moment';

@Component({
  selector: 'app-review-element',
  providers: [NgbRatingConfig],
  templateUrl: './review-element.component.html',
  styleUrls: ['./review-element.component.scss'],
  styles: [
    `
      .star {
        font-size: 1.5rem;
        color: #b0c4de;
      }
      .filled {
        color: #1e90ff;
      }
      .bad {
        color: #deb0b0;
      }
      .filled.bad {
        color: #ff1e1e;
      }
    `
  ]
})
export class ReviewElementComponent implements OnInit {
  formattedDate = '';
  @Input() reviewElement: any;
  public currentRate: number;
  public reviewId: string;
  constructor(config: NgbRatingConfig, private reviewService: ReviewService) {
    config.readonly = true;
  }

  ngOnInit(): void {
    this.formattedDate = this.reviewService.formatDate(this.reviewElement);
    this.currentRate = this.reviewElement.data.rating;
  }
}
