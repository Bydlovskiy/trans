import { Timestamp } from "@firebase/firestore";

export interface IOfferResponde {
    customerId: String,
    performerId: String,
    offerId: String,
    message: IMessageCustomer[] | IMessagePerformer[]
    date : Timestamp,
    id : String,
    status : String
}

export interface IMessageCustomer {
    customerMessage : String,
}

export interface IMessagePerformer {
    performerMessage : String,
}

