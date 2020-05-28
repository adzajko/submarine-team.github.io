import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/shared/company.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ReviewService } from 'src/app/shared/review.service';

@Component({
  selector: 'app-company-full-page',
  templateUrl: './company-full-page.component.html',
  styleUrls: ['./company-full-page.component.scss']
})
export class CompanyFullPageComponent implements OnInit {
  currentCompany: any = {};
  currentCompanyName = '';
  reviews = [];
  canLoadReviews = false;

  constructor(
    private companyService: CompanyService,
    private router: Router,
    private auth: AuthService,
    private toastr: ToastrService,
    private reviewService: ReviewService
  ) {
    this.currentCompanyName = router.url.slice(11);
  }

  ngOnInit(): void {
    this.auth.showHTTPLoader(true);
    this.companyService.getCompanyByName(this.currentCompanyName).subscribe(
      res => {
        this.auth.showHTTPLoader(false);
        if (res.length < 1) {
          this.router.navigate(['/404']);
          return;
        }
        res.forEach(element => {
          this.currentCompany = element.payload.doc.data();
        });
      },
      errorRes => {
        this.auth.showHTTPLoader(false);
        this.toastr.error(errorRes.message);
      }
    );
  }

  loadReviews() {
    this.auth.showHTTPLoader(true);
    this.reviewService.getReviewsForCompany(this.currentCompanyName).subscribe(
      res => {
        this.canLoadReviews = true;

        this.auth.showHTTPLoader(false);
        res.forEach(element => {
          this.reviews.push(element.payload.doc.data());
        });
      },
      err => {
        this.auth.showHTTPLoader(false);
        this.toastr.error(err.message);
      }
    );
  }
}
