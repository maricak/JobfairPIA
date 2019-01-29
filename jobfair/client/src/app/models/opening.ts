import { CV } from './cv';

export interface Opening {
    _id: string,
    companyId: string,
    companyUSername: string,
    type: string,
    name: string,
    text: string,
    deadline: Date
    //fajlovi
    applications: [Application]
}

export interface Application {
    studentId: string,
    cv: CV, 
    coverLetter: string, 
    coverLetterIsFile: boolean,
    accepted : boolean
}