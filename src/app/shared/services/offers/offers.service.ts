import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, DocumentData, DocumentSnapshot, Firestore, getDoc, getDocs, query, QuerySnapshot, updateDoc, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IConsignorOffer } from '../../interfaces/consignor-offer-interface';


@Injectable({
  providedIn: 'root'
})
export class OffersService {

  constructor(private firestore: Firestore) { }

  // CREATE

  saveOffer(offer: IConsignorOffer, role: string): Promise<void> {
    return addDoc(collection(this.firestore, `${role}-offers`), offer).then(data => {
      updateDoc(doc(this.firestore, `${role}-offers`, data.id), {
        id: data.id
      })
    })
  }

  // ACTIVE

  getAllforCurrentUser(userId: string, role: string): Promise<QuerySnapshot<DocumentData>> {
    return getDocs(query(collection(this.firestore, `${role}-offers`), where("userId", "==", userId)));
  }

  changeOfferStatus(offerId: string, role: string): Promise<void> {
    return updateDoc(doc(this.firestore, `${role}-offers`, offerId), { status: 'archive' })
  }


  // Exchanges

  getOffers(role: string): Observable<DocumentData[]> {
    return collectionData(collection(this.firestore, `${role}-offers`))
  }

  getOfferById(offerId: string, role: string): Promise<DocumentSnapshot<DocumentData>> {
    return getDoc(doc(this.firestore, `${role}-offers`, offerId));
  }

  getUserFromId(userId: string): Promise<DocumentSnapshot<DocumentData>> {
    return getDoc(doc(this.firestore, "users", userId));
  }

  updateResponsedUser(offerId: string, respondedUsersId: String[], role: string): Promise<void> {
    return updateDoc(doc(this.firestore, `${role}-offers`, offerId), { respondedUsersId: respondedUsersId })
  }
}
