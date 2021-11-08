import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, DocumentData, DocumentReference, DocumentSnapshot, Firestore, getDocs, onSnapshot, query, QuerySnapshot, serverTimestamp, updateDoc, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ITruckerOffer } from '../../interfaces/trucker-offer-interface';

@Injectable({
  providedIn: 'root'
})
export class TruckerOffersService {

  constructor(private firestore: Firestore) { }


  getAllforCurrentUser(userId : string) : Promise<QuerySnapshot<DocumentData>>{
    return getDocs(query(collection(this.firestore, "trucker-offers"), where("userId", "==", userId)));
  }

  saveOffer(offer: ITruckerOffer): Promise<void> {
    return addDoc(collection(this.firestore, "trucker-offers"), offer).then(data => {
      updateDoc(doc(this.firestore, "trucker-offers", data.id), {
        id: data.id
      })
    })
  }

  getConsignorOffers() : Observable<DocumentData[]> {
    return collectionData(collection(this.firestore, "consignor-offers"))
  }


}

