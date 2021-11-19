import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, DocumentData, DocumentReference, DocumentSnapshot, Firestore, getDocs, onSnapshot, query, QuerySnapshot, serverTimestamp, updateDoc, where } from '@angular/fire/firestore';
import { setDoc } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { IConsignorOffer } from '../../interfaces/consignor-offer-interface';
import { ITruckerOffer } from '../../interfaces/trucker-offer-interface';

@Injectable({
  providedIn: 'root'
})
export class TruckerOffersService {

  constructor(private firestore: Firestore) { }

  getAllforCurrentUser(userId: string): Promise<QuerySnapshot<DocumentData>> {
    return getDocs(query(collection(this.firestore, "trucker-offers"), where("userId", "==", userId)));
  }

  saveOffer(offer: ITruckerOffer): Promise<void> {
    return addDoc(collection(this.firestore, "trucker-offers"), offer).then(data => {
      updateDoc(doc(this.firestore, "trucker-offers", data.id), {
        id: data.id
      })
    })
  }

  getConsignorOfferById(offerId: String): Promise<QuerySnapshot<DocumentData>> {
    return getDocs(query(collection(this.firestore, "consignor-offers"), where("id", "==", offerId)));
  }

  updateResponsedUser(offerId: string, respondedUsersId: IConsignorOffer): Promise<void> {
    return updateDoc(doc(this.firestore, "consignor-offers", offerId), { respondedUsersId: respondedUsersId })
  }

  getConsignorOffers(): Observable<DocumentData[]> {
    return collectionData(collection(this.firestore, "consignor-offers"))
  }

  getUserFromId(userId: String): Promise<QuerySnapshot<DocumentData>> {
    return getDocs(query(collection(this.firestore, "users"), where("id", "==", userId)));
  }

  changeOfferStatus(offerId: string): Promise<void> {
    return updateDoc(doc(this.firestore, "trucker-offers", offerId), { status: 'archive' })
  }
}

