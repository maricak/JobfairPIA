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
    applications: Application[]
}

interface Application {
    companyId: string,
    packages: string[], // ids
    approved: boolean
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