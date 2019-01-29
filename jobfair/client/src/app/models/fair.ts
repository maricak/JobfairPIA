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
    additional: Additional[]
}
export interface Package {
    title: string,
    content: string[],
    videoPromotion: number,
    noLessons: number,
    noWorkshops: number,
    noPresentations: number,
    price: number,
    maxCompanies: number
}

export interface Additional {
    title : string, 
    price : number
}