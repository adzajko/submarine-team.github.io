import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { ToastrService } from 'ngx-toastr';
import { Subject, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: User;
  publishEmail: Subject<any> = new Subject<any>();
  triggerLoadingScreen: Subject<boolean> = new Subject<boolean>();

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    private toastr: ToastrService,
    private firestore: AngularFirestore
  ) {
    this.afAuth.onAuthStateChanged((user) => {
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
    this.toastr.success('User signed out!');
  }

  async signUp(email: string, password: string) {
    await this.afAuth.createUserWithEmailAndPassword(email, password);
    this.sendConfirmationEmail();
    this.toastr.success('User created!');
  }

  async authStateTrack() {
    let result: any;
    await this.afAuth.onAuthStateChanged((user) => {
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

  resetPassword(email: string) {
    return from(
      this.afAuth
        .sendPasswordResetEmail(email)
        .then(() => {
          this.toastr.success('Password successfully changed!', 'Success!');
        })
        .catch((err) => {
          this.toastr.success(err.message, 'Error!');
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
