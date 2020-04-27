import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private firestore: AngularFirestore) {}

  postComment(comment) {
    return this.firestore.collection('comments').add(comment);
  }
}
