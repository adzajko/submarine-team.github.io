import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../../shared/review.service';
import { CompanyService } from 'src/app/shared/company.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/auth.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'],
})
export class MyAccountComponent implements OnInit {
  companies = [];
  inputForm: FormGroup;

  constructor(
    private reviewService: ReviewService,
    private companyService: CompanyService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.companyService.getCompanies().subscribe((data) => {
      data.map((e) => {
        this.companies.push(e.payload.doc.data());
      });
    });

    this.initInputForm();
  }
  create() {
    const review = this.inputForm.value;
    review.timeStamp = new Date();

    this.companies.forEach((c) => {
      if (c.name === review.companyName) {
        review.imagePath = c.logo;
      }
    });
    this.authService.getUsername().subscribe((e) => {
      review.userName = e.email;
      this.reviewService.postReview(review).then((response) => {
        console.log(response);
      });
    });
  }

  initInputForm() {
    const companyName = '';
    const rating = '';
    const textExcerpt = '';

    this.inputForm = new FormGroup({
      companyName: new FormControl(companyName),
      rating: new FormControl(rating, Validators.required),
      textExcerpt: new FormControl(textExcerpt, Validators.required),
    });
  }
}
