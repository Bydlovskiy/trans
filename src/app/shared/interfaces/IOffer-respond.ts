import { Timestamp } from "@firebase/firestore";

export interface IOfferResponde {
    customerId: string,
    performerId: string,
    offerId: string,
    message: IMessageCustomer[] | IMessagePerformer[]
    date : Timestamp,
    id : string,
    status : string
}

export interface IMessageCustomer {
    customerMessage : String,
}

export interface IMessagePerformer {
    performerMessage : String,
}

