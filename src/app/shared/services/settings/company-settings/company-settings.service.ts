import { Injectable } from '@angular/core';
import { doc, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';
import { ICompanyRequest } from 'src/app/shared/interfaces/company-interface';

@Injectable({
  providedIn: 'root'
})
export class CompanySettingsService {
  constructor( private firestore: Firestore) { }


  setcompanyData(company:ICompanyRequest , id: string): Promise<void> {
    return updateDoc(doc(this.firestore, "users", id), {company : company});
  }


}
