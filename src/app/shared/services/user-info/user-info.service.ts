import { Injectable } from '@angular/core';
import { collection, DocumentData, Firestore, getDocs, query, QuerySnapshot, where } from '@angular/fire/firestore';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  constructor(private firestore : Firestore) { }
  getUserInfo (userId : string) : Promise<QuerySnapshot<DocumentData>>{
    return getDocs(query(collection(this.firestore, "users"), where("id", "==", userId)));
  }
}
