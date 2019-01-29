export interface Experience {
    startDate: Date,
    endDate: Date,
    position: string,
    employer: string,
    activities: string
}

export interface Education {
    startDate: Date,
    endDate: Date,
    qualification: string,
    institution: string,
    subjects: string
}

export interface Language {
    language: string,
    listenig: string,
    reading: string,
    writing: string,
    speaking: string
}
export interface CV {
    name: string,
    surname: string,
    address: string,
    telephone: string,
    email: string,
    website: string,
    imAccount: string,
    sex: string,
    dateOfBirth: Date,
    nationality: string,
    personalStatement: string,
    experience: Experience[],
    education: Education[],
    motherTongue: string,
    languages: Language[],
    communicationSkills: string,
    organisationalSkills: string,
    jobRelatedSkills: string,
    digitalSkills: string,
    otherSkills: string,
    drivingLicence: string,
    additionalInformation: string
}