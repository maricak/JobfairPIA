import { User } from './user';

export interface Company extends User{
    _id : string
    // username: string,
    // password: string,
    name: string,
    city: string,
    address: string,
    pib: string,
    numberOfEmployees: number,
    email: string,
    website: string,
    workField: string,
    specialty: string,
}