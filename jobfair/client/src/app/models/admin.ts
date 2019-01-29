import { User } from './user';

export interface Admin extends User{
    // username: string,
    // password: string,
    _id : string
    name: string,
    surname: string,
    telephone: string,
    email: string    
}
