import { Injectable } from '@angular/core';
import { arrayUnion, collection, collectionData, doc, DocumentData, DocumentReference, Firestore, getDocs, query, QuerySnapshot, setDoc ,updateDoc} from '@angular/fire/firestore';
import { where } from '@firebase/firestore';
import { Observable, Subject } from 'rxjs';
import { ICar } from 'src/app/shared/interfaces/car-interface';

@Injectable({
  providedIn: 'root'
})
export class CarsSettingsService {
  editCar = new Subject();
  public editIndex !: number;
  constructor(private firestore: Firestore) { }

  getCars( userId :any) : Promise<QuerySnapshot<DocumentData>> {
  const q = query(collection(this.firestore, "users") , where("id", "==", userId));  
  return getDocs(q);
  } 

  setCar(car: any, id: string): Promise<void> {
    return updateDoc(doc(this.firestore, 'users', id),{cars : arrayUnion(car)})
  }

  saveEditIndex(index : number) : void {
    this.editIndex = index;
  }

  updateCar(car : ICar,carsList : ICar[],id : string)  {
    let UpdateCarList = carsList
    carsList.splice(this.editIndex,1,car);    
    UpdateCarList.splice(this.editIndex,1,car);
    this.setCarsList(id,UpdateCarList)
  
  }

  setCarsList(id : string,UpdateCarList : ICar[]) : Promise<any> {
    return updateDoc(doc(this.firestore,'users',id),{cars : UpdateCarList})
  }
}
