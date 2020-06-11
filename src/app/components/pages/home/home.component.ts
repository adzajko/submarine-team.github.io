import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../shared/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReviewService } from '../../../shared/review.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { CompanyService } from 'src/app/shared/company.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

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
  paginatedReviewList: any;
  topThreeCompanies = [];
  featuredCompany: any;
  lastVisible: any;

  // Owl Carousel settings

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplaySpeed: 2000,
    dotsData: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    center: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      940: {
        items: 1
      },
      1200: {
        items: 1
      }
    },
    nav: true
  };

  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private reviewService: ReviewService,
    private companiesService: CompanyService,
    private afAuth: AngularFireAuth
  ) {
    this.authForm = this.formBuilder.group({
      email: '',
      password: ''
    });
  }

  ngOnInit(): void {
    // HTTP Loader
    this.auth.showHTTPLoader(true);

    // GET Featured Company
    this.companiesService.getFeaturedCompany().subscribe(res => {
      res.forEach(
        element => {
          this.auth.showHTTPLoader(false);
          this.featuredCompany = element.payload.doc.data();
        },
        catchErr => {
          this.auth.showHTTPLoader(false);
          this.toastr.error(catchErr.message);
        }
      );
    });

    // GET Top Three Companies
    this.companiesService.getTopThreeCompanies().subscribe(
      res => {
        res.forEach(element => {
          this.topThreeCompanies.push(element.payload.doc.data());
        });
        this.auth.showHTTPLoader(false);
      },
      catchErr => {
        this.auth.showHTTPLoader(false);
        this.toastr.error(catchErr.message);
      }
    );

    // Get Initial Three Reviews
    this.reviewService.getInitialReviewPage().subscribe(
      data => {
        this.auth.showHTTPLoader(false);
        this.paginatedReviewList = data.map(e => {
          this.lastVisible = e.payload.doc;
          return { data: e.payload.doc.data(), id: e.payload.doc.id };
        });
        this.listOfReviews = this.paginatedReviewList;
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

  nextReviewPage() {
    this.reviewService.getNextReviewPage(this.lastVisible).subscribe(data => {
      data.map(e => {
        this.lastVisible = e.payload.doc;
        this.listOfReviews.push({
          data: e.payload.doc.data(),
          id: e.payload.doc.id
        });
      });
    });
  }
}
