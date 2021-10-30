import { Injectable } from '@angular/core';
import { collection, collectionData, doc, DocumentData, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IuserRequest } from '../../../interfaces/user-interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileSettingsService {

  constructor( private firestore: Firestore) { }
  

  setUserData(user:IuserRequest , id: string): Promise<void> {
    return updateDoc(doc(this.firestore, "users", id), {
      user: user
    });
  }
}
