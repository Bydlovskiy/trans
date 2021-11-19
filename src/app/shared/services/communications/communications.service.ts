import { Injectable } from '@angular/core';
import { addDoc, collection, doc, DocumentData, DocumentSnapshot, Firestore, getDocs, query, QuerySnapshot, updateDoc, where } from '@angular/fire/firestore';
import { getDoc } from '@firebase/firestore';
import { IOfferResponde } from '../../interfaces/IOffer-respond';

@Injectable({
  providedIn: 'root'
})
export class CommunicationsService {

  constructor(private firestore : Firestore) { }


  saveOffer(offerRespond: IOfferResponde ): Promise<void> {
    return addDoc(collection(this.firestore, "communications"), offerRespond).then(data => {
      updateDoc(doc(this.firestore, "communications", data.id), {
        id: data.id
      })
    })
  }

  getNotificationsforCustomerUser(customerId : string) : Promise<QuerySnapshot<DocumentData>>{
    return getDocs(query(collection(this.firestore, "communications"), where("customerId", "==", customerId)));
  }

  getNotificationsforPerformerUser(performerId : string) : Promise<QuerySnapshot<DocumentData>>{
    return getDocs(query(collection(this.firestore, "communications"), where("performerId", "==", performerId)));
  }

  getUserFromId(userId : String) : Promise<QuerySnapshot<DocumentData>> {
    return getDocs(query(collection(this.firestore, "users"), where("id", "==", userId)));
  }
  

  getTruckerOfferFromId(offerId : string) : Promise<DocumentSnapshot<DocumentData>> {
    return getDoc(doc(this.firestore,'trucker-offers',offerId))
  } 

  getConsignorOfferFromId(offerId : string) : Promise<DocumentSnapshot<DocumentData>> {
    return getDoc(doc(this.firestore,'consignor-offers',offerId))
  } 


  changeNotificationStatus(notificationId : string,status : string,chat : any[]) : Promise<any> {
    return updateDoc(doc(this.firestore, "communications", notificationId), {
      status : status,
      message : chat
    })
  } 
  
  changeConsignorOfferStatus(offerId : string,status : string,chat : any[]) : Promise<any> {
    return updateDoc(doc(this.firestore, "consignor-offers", offerId), {
      status : status,
      date : new Date
    })
  }

  changeTruckerOfferStatus(offerId : string,status : string) : Promise<any> {
    return updateDoc(doc(this.firestore, "trucker-offers", offerId), {
      status : status,
      date : new Date
    })
  }
}
