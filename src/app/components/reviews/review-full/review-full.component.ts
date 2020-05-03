import { Component, OnInit, Input } from '@angular/core';
import { Review } from '../review-element/Review.model';

@Component({
  selector: 'app-review-full',
  templateUrl: './review-full.component.html',
  styleUrls: ['./review-full.component.scss']
})
export class ReviewFullComponent implements OnInit {
  @Input() route: string;
  @Input() revEl: Review;
  constructor() {}

  ngOnInit(): void {}
}
