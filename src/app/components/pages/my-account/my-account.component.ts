import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../../shared/review.service';
import { CompanyService } from 'src/app/shared/company.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
  companies = [];
  inputForm: FormGroup;
  accountChangesForm: FormGroup;

  constructor(
    private reviewService: ReviewService,
    private companyService: CompanyService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.companyService.getCompanies().subscribe(data => {
      data.map(e => {
        this.companies.push(e.payload.doc.data());
      });
    });

    this.initForms();
  }
  create() {
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
          this.toastr.success('Review submitted.', 'Success!');
        })
        .catch(errorRes => {
          this.toastr.error(errorRes.message, 'An Error occurred.');
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
      multipleCompanies: new FormControl(multipleCompanies),
    });
  }
}
