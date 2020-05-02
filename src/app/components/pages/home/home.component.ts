import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../shared/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Review } from '../../reviews/review-element/Review.model';
import { ReviewService } from '../../../shared/review.service';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  authForm: FormGroup;
  listOfReviews: any[] = [];
  loggedIn = false;
  reviewList: any;

  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private reviewService: ReviewService,
    private translateService: TranslateService,
    private afAuth: AngularFireAuth
  ) {
    this.authForm = this.formBuilder.group({
      email: '',
      password: ''
    });
  }

  ngOnInit(): void {
    this.auth.showHTTPLoader(true);
    this.reviewService.getReviews().subscribe(
      data => {
        this.auth.showHTTPLoader(false);
        this.reviewList = data.map(e => {
          return { data: e.payload.doc.data(), id: e.payload.doc.id };
        });
        this.render(this.reviewList);
      },
      errorRes => {
        this.toastr.error(errorRes.message, 'Error.');
        this.auth.showHTTPLoader(false);
      }
    );
  }

  checkIfLoggedIn() {
    this.afAuth.onAuthStateChanged(user => {
      if (user) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    });
  }

  onSubmit(authData) {
    this.auth.signUp(authData.email, authData.password);
    this.authForm.reset();
  }

  render(revs) {
    revs.forEach(e => {
      e.data.timeStamp = e.data.timeStamp.toDate();
      e.data.timeStamp = moment(e.data.timeStamp).format('Do MMMM YY');
      this.listOfReviews.push(e);
    });
  }
}
