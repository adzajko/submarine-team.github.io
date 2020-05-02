import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../../shared/review.service';
import { CompanyService } from 'src/app/shared/company.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
  companies = [];
  inputForm: FormGroup;
  accountChangesForm: FormGroup;
  private toastrMessages;

  constructor(
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
        this.toastr.error(errorRes.message, this.toastrMessages.ERROR_TITLE);
      }
    );

    this.initForms();
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
      review.userName = e.email;
      this.reviewService
        .postReview(review)
        .then(response => {
          this.authService.showHTTPLoader(false);
          this.toastr.success(
            this.toastrMessages.SUBMITTED_REVIEW,
            this.toastrMessages.SUCCESS_TITLE
          );
        })
        .catch(errorRes => {
          this.authService.showHTTPLoader(false);
          this.toastr.error(errorRes.message, this.toastrMessages.ERROR_TITLE);
        });
    });
  }

  initForms() {
    // Review Input Form
    const companyName = '';
    const rating = '';
    const textExcerpt = '';

    this.inputForm = new FormGroup({
      companyName: new FormControl(companyName),
      rating: new FormControl(rating, Validators.required),
      textExcerpt: new FormControl(textExcerpt, Validators.required)
    });

    // Account Changes Form

    const linkedInAccount = '';
    const changeEmailInput = '';
    const oldPassword = '';
    const newPassword = '';
    const companyAddedNotification = '';
    const myCompanyNotifications = '';
    const multipleCompanies = '';

    this.accountChangesForm = new FormGroup({
      linkedInAccount: new FormControl(linkedInAccount),
      changeEmailInput: new FormControl(changeEmailInput, Validators.email),
      oldPassword: new FormControl(oldPassword),
      newPassword: new FormControl(newPassword),
      companyAddedNotification: new FormControl(companyAddedNotification),
      myCompanyNotifications: new FormControl(myCompanyNotifications),
      multipleCompanies: new FormControl(multipleCompanies)
    });
  }
}
