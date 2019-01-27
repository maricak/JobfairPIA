import { CV } from './cv';
import { User } from './user';

export interface Student extends User{
    // username: string,
    // password: string,
    name: string,
    surname: string,
    telephone: string,
    email: string,
    currentYear: number,
    graduated: boolean,
    cv: CV
}
