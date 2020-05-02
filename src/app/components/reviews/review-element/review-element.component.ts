import { Component, OnInit, Input } from '@angular/core';
import { Review } from './Review.model';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ReviewService } from '../../../shared/review.service';

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
    `,
  ],
})
export class ReviewElementComponent implements OnInit {
  @Input() reviewElement: any;
  public currentRate: number;
  public reviewId: string;
  constructor(config: NgbRatingConfig, reviewService: ReviewService) {
    config.readonly = true;
  }

  ngOnInit(): void {
    this.currentRate = this.reviewElement.data.rating;
  }
}
