import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Company } from '../components/pages/companies/Company.model';
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
}
