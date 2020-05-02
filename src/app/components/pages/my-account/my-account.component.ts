import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../../shared/review.service';
import { CompanyService } from 'src/app/shared/company.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/auth.service';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'],
})
export class MyAccountComponent implements OnInit {
  companies = [];
  inputForm: FormGroup;
  accountChangesForm: FormGroup;

  constructor(
    public dialog: MatDialog,
    private reviewService: ReviewService,
    private companyService: CompanyService,
    private authService: AuthService,
    private toastr: ToastrService,
    private af: AngularFirestore
  ) {}

  ngOnInit() {
    this.authService.showHTTPLoader(true);
    this.companyService.getCompanies().subscribe(
      (data) => {
        this.authService.showHTTPLoader(false);
        data.map((e) => {
          this.companies.push(e.payload.doc.data());
        });
      },
      (errorRes) => {
        this.authService.showHTTPLoader(false);
        this.toastr.error(errorRes, 'Error.');
      }
    );

    this.initForms();
  }

  // <Create new review>
  create() {
    this.authService.showHTTPLoader(true);
    const review = this.inputForm.value;
    this.inputForm.reset();
    review.timeStamp = new Date();

    this.companies.forEach((c) => {
      if (c.name === review.companyName) {
        review.imagePath = c.logo;
      }
    });
    this.authService.getUsername().subscribe((e) => {
      review.userName = e.email;
      this.reviewService
        .postReview(review)
        .then((response) => {
          this.reviewService.upvoteReview(response.id, 0, '');
          this.authService.showHTTPLoader(false);
          this.toastr.success('Review submitted.', 'Success!');
        })
        .catch((errorRes) => {
          this.authService.showHTTPLoader(false);
          this.toastr.error(errorRes.message, 'An Error occurred.');
        });
    });
  }
  // </Create new review>

  requestVerification() {
    if (this.accountChangesForm.value.linkedInAccount) {
      this.authService.getUsername().subscribe((e) => {
        this.af.collection('verifications').add({
          email: e.email,
          linkedin: this.accountChangesForm.value.linkedInAccount,
        });
      });
      this.toastr.success('Verification request sent!', 'Thank You!');
    } else {
      this.toastr.error('You need to input your linkedin account!', 'Oops!');
    }
  }

  changeEmail() {
    this.toastr.info('Feature not yet implemented :(', 'Oops!');
  }

  resetPassword() {}

  forgotPasswordDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '450px',
      height: '175px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.authService.getUsername().subscribe((user) => {
          this.authService.resetPassword(user.email);
        });
      }
    });
  }

  updatePassword() {
    if (
      this.accountChangesForm.value.newPassword &&
      this.accountChangesForm.value.newPasswordConfirm
    ) {
      if (
        this.accountChangesForm.value.newPassword ===
        this.accountChangesForm.value.newPasswordConfirm
      ) {
        this.authService.getUsername().subscribe((e) => {
          e.updatePassword(this.accountChangesForm.value.newPassword)
            .then(() => {
              this.toastr.success(
                `Your password has been updated!`,
                'Success!'
              );
            })
            .catch((err) => {
              this.toastr.error(err.message, 'Error!');
            });
        });
      } else {
        this.toastr.error(
          'Password and confirmed password need to match!',
          'Error'
        );
      }
    } else {
      this.toastr.error('You need to fill out both password fields!', 'Error');
    }
  }

  initForms() {
    // Review Input Form
    const companyName = '';
    const rating = '';
    const textExcerpt = '';

    this.inputForm = new FormGroup({
      companyName: new FormControl(companyName),
      rating: new FormControl(rating, Validators.required),
      textExcerpt: new FormControl(textExcerpt, Validators.required),
    });

    // Account Changes Form

    const linkedInAccount = '';
    const changeEmailInput = '';
    const newPassword = '';
    const newPasswordConfirm = '';
    const companyAddedNotification = '';
    const myCompanyNotifications = '';
    const multipleCompanies = '';

    this.accountChangesForm = new FormGroup({
      linkedInAccount: new FormControl(linkedInAccount),
      changeEmailInput: new FormControl(changeEmailInput, Validators.email),
      newPassword: new FormControl(newPassword),
      newPasswordConfirm: new FormControl(newPasswordConfirm),
      companyAddedNotification: new FormControl(companyAddedNotification),
      myCompanyNotifications: new FormControl(myCompanyNotifications),
      multipleCompanies: new FormControl(multipleCompanies),
    });
  }
}
