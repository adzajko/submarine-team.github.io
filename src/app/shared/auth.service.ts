import { Injectable } from '@angular/core';
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

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    private toastr: ToastrService,
    private translateService: TranslateService
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

  async authStateTrack() {
    let result: any;
    await this.afAuth.onAuthStateChanged(user => {
      if (user) {
        if (user.emailVerified) {
          result = { logged: true, verified: true };
        } else {
          result = { logged: true, verified: false };
        }
      } else {
        result = { logged: false, verified: false };
      }
    });
    return result;
  }

  async sendConfirmationEmail() {
    (await this.afAuth.currentUser).sendEmailVerification();
    this.router.navigate(['/']);
  }

  // Get the User
  getUsername() {
    return from(this.afAuth.currentUser);
  }

  showHTTPLoader(value: boolean) {
    this.triggerLoadingScreen.next(value);
  }
}
