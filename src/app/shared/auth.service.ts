import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { ToastrService } from 'ngx-toastr';
import { Subject, BehaviorSubject, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: User;
  publishEmail: Subject<any> = new Subject<any>();

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    private toastr: ToastrService
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
    this.toastr.info('User signed out!');
  }

  async signUp(email: string, password: string) {
    await this.afAuth.createUserWithEmailAndPassword(email, password);
    this.sendConfirmationEmail();
    this.toastr.info('User created!');
  }

  // async authStateTrack() {
  //   let result: any;
  //   await this.afAuth.onAuthStateChanged((user) => {
  //     if (user) {
  //       result = true;
  //     } else {
  //       result = false;
  //     }
  //   });
  //   return result;
  // }

  async authStateTrack() {
    let result: any;
    await this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        if (user.emailVerified) {
          result = { logged: true, verified: true };
        } else {
          result = { logged: true, verified: false };
          console.log('SHTO TI E FUNNY BUNNY?>!?!?');
          this.sendConfirmationEmail();
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
}
