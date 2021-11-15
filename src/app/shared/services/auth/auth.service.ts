import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, UserCredential } from '@angular/fire/auth';
import { doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private auth: Auth,
    private router: Router,
    private firestore : Firestore
  ) { }

  logOut(): Promise<void> {
    return signOut(this.auth)
  }

  logIn(email : string , password :string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  getUserData(uId : string) {
    return getDoc(doc(this.firestore , 'users', uId))
  }

  setUserData (uId : string , user : any) : Promise<void> {
    return  setDoc(doc(this.firestore, "users", uId), user)
  }

  register(email : string , password : string) : Promise<UserCredential> {
   return createUserWithEmailAndPassword(this.auth, email, password)
  }
}
