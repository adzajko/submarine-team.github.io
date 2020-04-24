import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: User;
  publishEmail: Subject<any>;

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
    this.toastr.info('User created!');
  }

  async authStateTrack() {
    let result: boolean;
    await this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        result = true;
      } else {
        result = false;
      }
    });
    return result;
  }

  // Get the User

  async getUsername() {
    const response = (await this.afAuth.currentUser).providerData;
    const email = response.map((profile) => profile.email);
    this.publishEmail.next(email);
  }
}
