import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, DocumentData, DocumentReference, DocumentSnapshot, Firestore, onSnapshot, serverTimestamp, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ITruckerOffer } from '../../interfaces/trucker-offer-interface';

@Injectable({
  providedIn: 'root'
})
export class TruckerOffersService {

  constructor(private firestore: Firestore) { }


  getAllFB(): Observable<DocumentData[]> {
    return collectionData(collection(this.firestore, "trucker-offers"), { idField: 'id' });
  }

  saveOffer(offer: ITruckerOffer): Promise<DocumentReference<DocumentData>> {
    return addDoc(collection(this.firestore, "trucker-offers"), offer);
  }


}

