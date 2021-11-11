import { Timestamp } from "@firebase/firestore";
import { ICar } from "./car-interface";

export interface ITruckerOffer {
    loadingCountry: String,
    loadingCity: String,
    loadingDate: Date,
    unloadingCountry:String,
    unloadingCity: String,
    unloadingDate: Date,
    car: ICar,
    date : Timestamp,
    price: String,
    userId : String,
    id : string,
    status : String,
    respondedUsersId : String[]
}