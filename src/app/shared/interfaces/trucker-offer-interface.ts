import { Time } from "@angular/common";
import { Timestamp } from "@firebase/firestore";
import { ICar } from "./car-interface";

export interface ITruckerOffer {
    loadingCountry: String,
    loadingCity: String,
    loadingStreet: String,
    loadingDate: Date,
    loadingTime: Time,
    unloadingCountry:String,
    unloadingCity: String,
    unloadingStreet: String,
    unloadingDate: String,
    uploadingTime: String,
    car: ICar,
    date : Timestamp,
    price: String,
    userId : String,
    id : String,
    status : String
}