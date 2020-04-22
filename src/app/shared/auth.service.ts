import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: User;
  constructor(public afAuth: AngularFireAuth, public router: Router) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    });

    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        console.log('Logged In!');
      } else {
        console.log('Logged Out!');
      }
    });
  }

  async signIn(email: string, password: string) {
    const result = await this.afAuth.signInWithEmailAndPassword(
      email,
      password
    );
    console.log(result);
  }

  async signOut() {
    await this.afAuth.signOut();
    localStorage.removeItem('user');
  }

  async signUp(email: string, password: string) {
    const result = await this.afAuth.createUserWithEmailAndPassword(
      email,
      password
    );
    console.log(result);
  }

  async authStateTrack() {
    await this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        console.log('Logged In!');
      } else {
        console.log('Logged Out!');
      }
    });
  }
}
