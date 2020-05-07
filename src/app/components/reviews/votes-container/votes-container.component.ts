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
  upvoteList: any[] = [];
  downvoteList: any[] = [];
  upvoteBlocked = false;
  downvoteBlocked = false;
  loggedUser = '';
  constructor(private rs: ReviewService, private as: AuthService) {}

  ngOnInit(): void {
    this.renderUpvotes();
    this.renderDownvotes();
  }

  renderUpvotes() {
    this.rs.getUpvotes(this.id).subscribe((e) => {
      this.upvoteList = e.map((item) => item.payload.doc.data());
      this.as.afAuth.user.subscribe((user) => {
        this.loggedUser = user.email;
        this.controlButton(this.loggedUser);
      });
    });
  }

  renderDownvotes() {
    this.rs.getDownvotes(this.id).subscribe((e) => {
      this.downvoteList = e.map((item) => item.payload.doc.data());
      this.as.afAuth.user.subscribe((user) => {
        this.loggedUser = user.email;
        this.controlButton(this.loggedUser);
      });
    });
  }

  upvoteBtn() {
    this.as.getUsername().subscribe((e) => {
      this.rs.upvoteReview(this.id, 1, e.email);
      this.renderUpvotes();
      this.controlButton(this.loggedUser);
    });
  }

  downvoteBtn() {
    this.as.getUsername().subscribe((e) => {
      this.rs.upvoteReview(this.id, -1, e.email);
      this.renderDownvotes();
      this.controlButton(this.loggedUser);
    });
  }

  controlButton(mail) {
    this.upvoteList.forEach((item) => {
      if (item.username === mail) {
        this.upvoteBlocked = true;
        this.downvoteBlocked = true;
      }
    });
    this.downvoteList.forEach((item) => {
      if (item.username === mail) {
        this.upvoteBlocked = true;
        this.downvoteBlocked = true;
      }
    });
  }
}
