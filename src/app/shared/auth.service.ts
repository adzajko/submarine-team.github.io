import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { ToastrService } from 'ngx-toastr';
import { Subject, from } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  publishEmail: Subject<any> = new Subject<any>();
  triggerLoadingScreen: Subject<boolean> = new Subject<boolean>();
  publishAuthState: Subject<any> = new Subject<any>();

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    private toastr: ToastrService,
    private translateService: TranslateService,
    private firestore: AngularFirestore
  ) {
    this.afAuth.onAuthStateChanged(user => {
      if (user) {
        console.log('Logged In!');
      } else {
        console.log('Logged Out!');
      }
    });
  }

  // User Management Methods (Sign In / Sign Out / Sign Up)
  async signIn(email: string, password: string) {
    await this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async signOut() {
    await this.afAuth.signOut();
    this.router.navigate(['/']);
    this.translateService.get('TOASTR').subscribe(response => {
      this.toastr.success(response.SIGNED_OUT, response.SUCCESS_TITLE);
    });
  }

  async signUp(email: string, password: string) {
    await this.afAuth.createUserWithEmailAndPassword(email, password);
    this.sendConfirmationEmail();
    this.translateService.get('TOASTR').subscribe(response => {
      this.toastr.success(response.USER_CREATED, response.SUCCESS_TITLE);
    });
  }

  async sendConfirmationEmail() {
    (await this.afAuth.currentUser).sendEmailVerification();
    this.router.navigate(['/']);
  }

  resetPassword(email: string) {
    return from(
      this.afAuth
        .sendPasswordResetEmail(email)
        .then(() => {
          this.showHTTPLoader(false);
          this.translateService.get('TOASTR').subscribe(response => {
            this.toastr.success(response.PASS_RESET, response.SUCCESS_TITLE);
          });
        })
        .catch(err => {
          this.showHTTPLoader(false);
          this.translateService.get('TOASTR').subscribe(response => {
            this.toastr.success(err.message, response.ERROR_TITLE);
          });
        })
    );
  }

  // Get the User
  getUsername() {
    return from(this.afAuth.currentUser);
  }

  showHTTPLoader(value: boolean) {
    this.triggerLoadingScreen.next(value);
  }
}
