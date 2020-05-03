import { Component, OnInit } from '@angular/core';
import { ReviewService } from 'src/app/shared/review.service';
import { Review } from '../review-element/Review.model';

@Component({
  selector: 'app-full-list',
  templateUrl: './full-list.component.html',
  styleUrls: ['./full-list.component.scss']
})
export class FullListComponent implements OnInit {
  public listOfReviews: Review[] = [];

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.reviewService.getReviews().subscribe((response: any) => {
      this.listOfReviews = response.map(e => {
        return { data: e.payload.doc.data(), id: e.payload.doc.id };
      });
    });
  }
}
