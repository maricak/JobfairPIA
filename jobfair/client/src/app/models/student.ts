import { CV } from './cv';

export interface Student {
    username: string,
    name: string,
    surname: string,
    telephone: string,
    email: string,
    currentYear: number,
    graduated: boolean,
    cv: CV
}
