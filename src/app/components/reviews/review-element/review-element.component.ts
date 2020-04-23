import { Component, OnInit, Input } from '@angular/core';
import { Review } from './Review.model';

@Component({
  selector: 'app-review-element',
  templateUrl: './review-element.component.html',
  styleUrls: ['./review-element.component.scss']
})
export class ReviewElementComponent implements OnInit {
  @Input() reviewElement: Review;

  constructor() {}

  ngOnInit(): void {}
}
