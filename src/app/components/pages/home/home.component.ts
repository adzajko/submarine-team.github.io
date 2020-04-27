import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../shared/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Review } from '../../reviews/review-element/Review.model';
import { ReviewService } from '../../../shared/review.service';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  authForm: FormGroup;
  listOfReviews: any[];
  loggedIn = false;
  reviewList: any;

  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private reviewService: ReviewService
  ) {
    this.authForm = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  ngOnInit(): void {
    this.reviewService.getReviews().subscribe((data) => {
      this.reviewList = data.map((e) => e.payload.doc.data());
      this.reviewList = this.reviewList.sort(
        (f, s) => s.timeStamp - f.timeStamp
      );
      this.render(this.reviewList);
    });
  }

  async checkIfLoggedIn() {
    this.loggedIn = await this.auth.authStateTrack();
  }

  onSubmit(authData) {
    this.auth.signUp(authData.email, authData.password);
    this.authForm.reset();
  }

  render(revs) {
    revs.map((item) => {
      item.timeStamp = item.timeStamp.toDate();
      item.timeStamp = moment(item.timeStamp).format('Do MMMM YY');
    });
    this.listOfReviews = revs;
  }
}
