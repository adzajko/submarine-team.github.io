import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CompanyService } from 'src/app/shared/company.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ReviewService } from 'src/app/shared/review.service';
import { Company } from './Company.model';

@Component({
  selector: 'app-company-full-page',
  templateUrl: './company-full-page.component.html',
  styleUrls: ['./company-full-page.component.scss']
})
export class CompanyFullPageComponent implements OnInit {
  currentCompany: any = {};
  currentCompanyName = '';
  reviews: Company[] = [];
  canLoadReviews = false;
  disableLoadReviewsButton = false;

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

  loadReviews(el?: HTMLElement) {
    if (!this.disableLoadReviewsButton) {
      this.auth.showHTTPLoader(true);
      this.reviewService
        .getReviewsForCompany(this.currentCompanyName)
        .subscribe(
          res => {
            this.canLoadReviews = true;
            this.disableLoadReviewsButton = true;
            this.auth.showHTTPLoader(false);
            this.scrollIntoView(el);
            res.forEach(element => {
              const ele: Company = element.payload.doc.data() as Company;
              this.reviews.push({
                id: element.payload.doc.id,
                companyName: ele.companyName,
                imagePath: ele.imagePath,
                rating: ele.rating,
                textExcerpt: ele.textExcerpt,
                timeStamp: this.reviewService.formatDate(ele.timeStamp),
                userName: ele.userName
              });
            });
          },
          err => {
            this.auth.showHTTPLoader(false);
            this.toastr.error(err.message);
          }
        );
    } else {
      this.reviews = [];
      this.disableLoadReviewsButton = false;
    }
  }

  scrollIntoView(el: HTMLElement) {
    el.scrollIntoView(true);
  }
}
