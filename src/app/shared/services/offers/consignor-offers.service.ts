import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, DocumentData, Firestore, getDocs, query, QuerySnapshot, updateDoc, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IConsignorOffer } from '../../interfaces/consignor-offer-interface';
import { ITruckerOffer } from '../../interfaces/trucker-offer-interface';

@Injectable({
  providedIn: 'root'
})
export class ConsignorOffersService {

  constructor(private firestore: Firestore) { }

// CREATE

  getAllforCurrentUser(userId : string) : Promise<QuerySnapshot<DocumentData>>{
    return getDocs(query(collection(this.firestore, "consignor-offers"), where("userId", "==", userId)));
  }
  
  saveOffer(offer: IConsignorOffer, role : string): Promise<void> {
    return addDoc(collection(this.firestore, `${role}-offers`), offer).then(data => {
      updateDoc(doc(this.firestore, `${role}-offers`, data.id), {
        id: data.id
      })
    })
  }




  getTruckerOfferById (offerId : String) : Promise<QuerySnapshot<DocumentData>> {
    return getDocs(query(collection(this.firestore, "trucker-offers"), where("id", "==", offerId)));
  }

  updateResponsedUser(offerId : string,respondedUsersId : ITruckerOffer):Promise<void>{
    return updateDoc(doc(this.firestore, "trucker-offers", offerId),{ respondedUsersId : respondedUsersId })
  }
  
  getTruckerOffers() : Observable<DocumentData[]> {
    return collectionData(collection(this.firestore, "trucker-offers"))
  }

  getUserFromId(userId : String) : Promise<QuerySnapshot<DocumentData>> {
    return getDocs(query(collection(this.firestore, "users"), where("id", "==", userId)));
  }

  changeOfferStatus(offerId : string) : Promise<void> {
    return updateDoc(doc(this.firestore, "consignor-offers", offerId),{ status :  'archive' })
  }
}
