import { Injectable } from '@angular/core';
import { addDoc, arrayUnion, collection, collectionData, deleteDoc, doc, DocumentData, DocumentReference, Firestore, getDocs, query, QuerySnapshot, setDoc, updateDoc } from '@angular/fire/firestore';
import { where } from '@firebase/firestore';
import { ICar } from 'src/app/shared/interfaces/car-interface';

@Injectable({
  providedIn: 'root'
})
export class CarsSettingsService {
  constructor(private firestore: Firestore) { }
  getCars(userId: string): Promise<QuerySnapshot<DocumentData>> {
    return getDocs(query(collection(this.firestore, "cars"), where("userid", "==", userId)));
  }

  setCar(car: ICar): Promise<void> {
    return addDoc(collection(this.firestore, "cars"), car).then(data => {
      updateDoc(doc(this.firestore, 'cars', data.id), {
        id: data.id
      })
    })
  }

  updateCar(car: ICar) {
    return setDoc(doc(this.firestore, "cars", car.id), car);
  }

  deleteCar(id: string): Promise<void> {
    return deleteDoc(doc(this.firestore, "cars", id));
  }
}
