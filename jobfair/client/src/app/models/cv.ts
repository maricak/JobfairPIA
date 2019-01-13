export interface CV {
    name: string,
    surname: string,
    address: string,
    telephone: string,
    email: string,
    webSite: string,
    imAccount: string,
    sex: string,
    dateOfBirth: Date,
    nationality: string,
    personalStatement: string,
    experience: {
        startDate: Date,
        endDate: Date,
        position: string,
        employer: string,
        activities: string
    }[],
    education: {
        startDate: Date,
        endDate: Date,
        qualification: string,
        institution: string,
        subjects: string
    }[],
    motherTongue: string,
    languagues: {
        language: string,
        listenig: string,
        reading: string,
        writing: string,
        speaking: string
    }[],
    communicationSkills: string,
    organisationslSkills: string,
    jobRelatedSkills: string,
    digitalSkills: string,
    otherSkills: string,
    drivingLicence: string,
    additionalInformation: string
}