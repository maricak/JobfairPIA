export interface Fair {
    _id: string,
    finished: boolean,
    applyDeadline: Date,
    cvDeadline: Date,
    name: string,
    startDate: Date,
    endDate: Date,
    place: string,
    about: string,
    locations: string[],
    packages: Package[],
    additional: Additional[],
    applications: Application[],
    periods: Period[],
    files: any[]
}

export interface Period {
    _id: string,
    startDate: Date,
    endDate: Date,
    location: string,
    type: string,
    companyId: string
    companyName: string,
}
export interface Application {
    _id: string,
    companyId: string,
    companyName: string,
    packages: (Package | Additional)[],
    approved: boolean,
    reason: string
}

export interface Package {
    _id: string,
    title: string,
    content: string[],
    videoPromotion: number,
    noLessons: number,
    noWorkshops: number,
    noPresentations: number,
    price: number,
    maxCompanies: number,
    companiesLeft: number
}

export interface Additional {
    _id: string,
    title: string,
    price: number
}