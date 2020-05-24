import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  constructor(private firestore: AngularFirestore) {}
  getCompanies() {
    return this.firestore.collection('companies').snapshotChanges();
  }

  getCompanyByName(name: string) {
    return this.firestore
      .collection('companies', ref => ref.where('name', '==', name))
      .snapshotChanges();
  }

  getTopThreeCompanies() {
    return this.firestore
      .collection('companies', ref => ref.orderBy('name', 'desc').limit(3))
      .snapshotChanges();
  }
}
