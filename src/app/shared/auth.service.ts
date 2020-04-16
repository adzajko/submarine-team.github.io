import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private fireStore: AngularFirestore) {}

  signIn() {}

  signOut() {}

  signUp() {}

  authStateTrack() {}
}
