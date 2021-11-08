import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, DocumentData, Firestore, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IConsignorOffer } from '../../interfaces/consignor-offer-interface';

@Injectable({
  providedIn: 'root'
})
export class ConsignorOffersService {

  constructor(private firestore: Firestore) { }

  saveOffer(offer: IConsignorOffer): Promise<void> {
    return addDoc(collection(this.firestore, "consignor-offers"), offer).then(data => {
      updateDoc(doc(this.firestore, "consignor-offers", data.id), {
        id: data.id
      })
    })
  }
  getTruckerOffers() : Observable<DocumentData[]> {
    return collectionData(collection(this.firestore, "trucker-offers"))
  }
}
