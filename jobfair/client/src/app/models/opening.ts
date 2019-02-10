import { CV } from './cv';

export interface Opening {
    _id: string,
    companyId: string,
    companyName: string,
    type: string,
    name: string,
    text: string,
    deadline: Date
    files: [string],
    applications: [Application]
}

export interface Application {
    studentId: string,
    cv: CV,
    coverLetter: string,
    coverLetterIsFile: boolean,
    accepted: boolean
}