import { Injectable } from '@angular/core';
import {  doc, DocumentData, DocumentSnapshot, Firestore, getDoc,  updateDoc,} from '@angular/fire/firestore';
import { IUser } from 'src/app/shared/interfaces/user-interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileSettingsService {

  constructor(private firestore: Firestore) { }


  setUserData(user: IUser, id: string): Promise<void> {
    return updateDoc(doc(this.firestore, "users", id), {
      user: user
    });
  }

  getCompanyData(userId: string): Promise<DocumentSnapshot<DocumentData>> {
    return getDoc(doc(this.firestore , 'users', userId))
  }
  
}
