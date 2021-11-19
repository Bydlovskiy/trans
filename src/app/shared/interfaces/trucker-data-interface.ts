import { ICar } from "./car-interface";
import { ICompany } from "./company-interface";
import { IUser } from "./user-interface";

export interface ITrucker {
    company : ICompany,
    email : string,
    id : string ,
    phoneNumber : string,
    role : string, 
    user : IUser,
    cars : ICar
}