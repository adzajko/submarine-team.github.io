import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ReviewService } from '../review.service';

@Component({
  selector: 'app-component-list-item',
  templateUrl: './component-list-item.component.html',
  styleUrls: ['./component-list-item.component.scss'],
})
export class ComponentListItemComponent implements OnInit {
  @Input() ComponentListItem: any;
  reviews: any[] = [];
  numberOfReviews: number;
  constructor(
    private translateService: TranslateService,
    public reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    this.getNumberOfReviews();
  }

  getNumberOfReviews() {
    this.reviewService
      .getReviewsForCompany(this.ComponentListItem.name)
      .subscribe((item) => {
        item.map((rev) => {
          this.reviews.push(rev.payload.doc.data());
        });
        this.numberOfReviews = this.reviews.length;
      });
  }
}
