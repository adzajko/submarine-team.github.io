import { Component, OnInit, Input } from '@angular/core';
import { ReviewService } from '../../../shared/review.service';
import { AuthService } from '../../../shared/auth.service';

@Component({
  selector: 'app-votes-container',
  templateUrl: './votes-container.component.html',
  styleUrls: ['./votes-container.component.scss'],
})
export class VotesContainerComponent implements OnInit {
  @Input() id: string; // ReviewID
  @Input() username: string;
  kosovoContainer: any;
  constructor(private rs: ReviewService, private as: AuthService) {}

  ngOnInit(): void {}

  upvoteBtn() {
    this.as.getUsername().subscribe((e) => {
      this.rs.upvoteReview(this.id, 1, e.email);
    });
  }

  downvoteBtn() {
    this.as.getUsername().subscribe((e) => {
      this.rs.upvoteReview(this.id, -1, e.email);
    });
  }
}
