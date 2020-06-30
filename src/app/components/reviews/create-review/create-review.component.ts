import { OnInit, Component, OnDestroy } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReviewService } from 'src/app/shared/review.service';
import { CompanyService } from 'src/app/shared/company.service';
import { AuthService } from 'src/app/shared/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.scss']
})
export class CreateReviewComponent implements OnInit {
  inputForm: FormGroup;
  companies = [];
  private toastrMessages;

  constructor(
    private sharedService: SharedService,
    private reviewService: ReviewService,
    private companyService: CompanyService,
    private authService: AuthService,
    private toastr: ToastrService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.translateService.get('TOASTR').subscribe(response => {
      this.toastrMessages = response;
    });
    this.authService.showHTTPLoader(true);
    this.companyService.getCompanies().subscribe(
      data => {
        this.authService.showHTTPLoader(false);
        data.map(e => {
          this.companies.push(e.payload.doc.data());
        });
      },
      errorRes => {
        this.authService.showHTTPLoader(false);
        this.toastr.error(errorRes.message);
      }
    );
    this.initForm();
  }

  create() {
    this.authService.showHTTPLoader(true);
    const review = this.inputForm.value;
    this.inputForm.reset();
    review.timeStamp = new Date();

    this.companies.forEach(c => {
      if (c.name === review.companyName) {
        review.imagePath = c.logo;
      }
    });
    this.authService.getUsername().subscribe(e => {
      if (!e.emailVerified) {
        this.toastr.error(
          this.toastrMessages.UNVERIFIED,
          this.toastrMessages.ERROR_TITLE
        );
        this.authService.showHTTPLoader(false);
        return;
      }
      review.userName = e.email;
      review.reportCounter = 0;

      this.reviewService
        .postReview(review)
        .then(response => {
          this.reviewService.upvoteReview(response.id, 0, '');
          this.authService.showHTTPLoader(false);
          this.toastr.success(
            this.toastrMessages.SUBMITTED_REVIEW,
            this.toastrMessages.SUCCESS_TITLE
          );
          this.discardWindow();
        })
        .catch(errorRes => {
          this.authService.showHTTPLoader(false);
          this.toastr.error(errorRes.message, this.toastrMessages.ERROR_TITLE);
        });
    });
  }

  initForm() {
    this.inputForm = new FormGroup({
      companyName: new FormControl(''),
      rating: new FormControl('', Validators.required),
      textExcerpt: new FormControl('', Validators.required),
      reviewPros: new FormControl('', Validators.required),
      reviewCons: new FormControl('', Validators.required)
    });
  }

  discardWindow() {
    this.sharedService.showCreateReviewWindow(false);
  }
}
