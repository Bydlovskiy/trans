import { Timestamp } from "@angular/fire/firestore";

export interface  IConsignorOffer {
    loadingCountry: String,
    loadingCity: String,
    loadingDate: Date,
    unloadingCountry:String,
    unloadingCity: String,
    unloadingDate: Date,
    weight : Number,
    cargo : String,
    date : Timestamp,
    price: String,
    userId : String,
    id : String,
    status : String
}