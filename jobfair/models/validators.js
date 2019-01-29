module.exports.data = {
    ['username']: {
        ['required']: [true, 'Username is required'],
        ['minlength']: [5, 'Username min length is 5'],
        ['maxlength']: [25, 'Username max length is 25']
    },
    ['password']: {
        ['required']: [true, 'Password is required'],
        ['minlength']: [8, 'Password min length is 8'],
        ['maxlength']: [12, 'Password max length is 12'],
        ['pattern']: [new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,12}$/), 'Password must have at least one uppercase, lowercase, special character, and number']
    },
    ['newPassword']: {
        ['required']: [true, 'New password is required'],
        ['minlength']: [8, 'New Password min length is 8'],
        ['maxlength']: [12, 'New Password max length is 12'],
        ['pattern']: [new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,12}$/), 'Password must have at least one uppercase, lowercase, special character, and number']
    },
    ['name']: {
        ['required']: [true, 'Name is required'],
        ['minlength']: [1, 'Name min length is 1'],
        ['maxlength']: [35, 'Name max length is 35']
    },
    ['surname']: {
        ['required']: [true, 'Surname is required'],
        ['minlength']: [1, 'surname min length is 1'],
        ['maxlength']: [35, 'Surname max length is 35']
    },
    ['telephone']: {
        ['required']: [true, 'Telephone is required'],
        ['minlength']: [5, 'Telephone min length is 5'],
        ['maxlength']: [20, 'Telephone max length is 20'],
        ['pattern']: [new RegExp(/^[0-9]*$/), 'Telephone can containt only digits']
    },
    ['email']: {
        ['required']: [true, 'Email is required'],
        ['maxlength']: [40, 'Email max length is 40'],
        ['pattern']: [new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/), 'Must be a valid email']
    },
    ['currentYear']: {
        ['required']: [true, 'Current year is required'],
        ['min']: [1, 'Current year must be at least 1'],
        ['max']: [5, 'Current year cannot be bigger than 5']
    },
    ['graduated']: {
        ['required']: [true, 'You must provide graduation information']
    },
    ['city']: {
        ['required']: [true, 'City is required'],
        ['minlength']: [5, 'City min length is 5'],
        ['maxlength']: [50, 'City max length is 50']
    },
    ['address']: {
        ['required']: [true, 'Address is required'],
        ['minlength']: [5, 'Address min length is 5'],
        ['maxlength']: [100, 'Address max length is 100']
    },
    ['website']: {
        ['required']: [true, 'Web site is required'],
        ['minlength']: [5, 'Web site min length is 5'],
        ['maxlength']: [100, 'Web site max length is 100'],
        ['pattern']: [new RegExp(/^w{3}[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/), 'Must be a valid web site address']
    },
    ['imAccount']: {
        ['minlength']: [5, 'IM account site min length is 5'],
        ['maxlength']: [40, 'IM account site max length is 40']
    },
    ['dateOfBirth']: {
        ['max']: [Date.now, "Date of birth must be in the past"]
    },
    ['nationality']: {
        ['minlength']: [5, 'Nationality min length is 5'],
        ['maxlength']: [50, 'Nationality max length is 50']
    },
    ['personalStatement']: {
        ['minlength']: [5, 'Personal statement min length is 5'],
        ['maxlength']: [50, 'Personal statement max length is 50']
    },
    ['expStartDate']: {
        ['required']: [true, 'Experience start date is required']
    },
    ['position']: {
        ['required']: [true, 'Position name is required'],
        ['minlength']: [5, 'Position min length is 5'],
        ['maxlength']: [50, 'Position max length is 50']
    },
    ['employer']: {
        ['required']: [true, 'Employer name is required'],
        ['minlength']: [5, 'Employer min length is 5'],
        ['maxlength']: [50, 'Employer max length is 50']
    },
    ['activities']: {
        ['minlength']: [5, 'Activities min length is 5'],
        ['maxlength']: [200, 'Activities max length is 200']
    },
    ['eduStartDate']: {
        ['required']: [true, 'Education start date is required'],
    },
    ['qualification']: {
        ['required']: [true, 'Qualification name is required'],
        ['minlength']: [5, 'Qualification min length is 5'],
        ['maxlength']: [200, 'Qualification max length is 200']
    },
    ['institution']: {
        ['required']: [true, 'Institution name is required'],
        ['minlength']: [5, 'Institution min length is 5'],
        ['maxlength']: [200, 'Institution max length is 200']
    },
    ['subjects']: {
        ['minlength']: [5, 'Subjects min length is 5'],
        ['maxlength']: [300, 'Subjects max length is 300']
    },
    ['motherTongue']: {
        ['minlength']: [5, 'Mother tongue min length is 5'],
        ['maxlength']: [50, 'Mother tongue max length is 50']
    },
    ['language']: {
        ['required']: [true, 'Language name is required'],
        ['minlength']: [5, 'Language min length is 5'],
        ['maxlength']: [50, 'Language max length is 50']
    },
    ['skill']: {
        ['minlength']: [5, 'Skill min length is 5'],
        ['maxlength']: [200, 'Skill max length is 200']
    },
    ['additionalInformation']: {
        ['minlength']: [5, 'Additional information min length is 5'],
        ['maxlength']: [300, 'Additional information max length is 300']
    },
    ['pib']: {
        ['required']: [true, 'PIB is required'],
        ['minlength']: [8, 'PIB length is 8'],
        ['maxlength']: [8, 'PIB length is 8'],
        ['pattern']: [new RegExp(/^[0-9]{8}$/), 'PIB must have 8 digits']
    },
    ['numberOfEmployees']: {
        ['required']: [true, 'Number of employees is required'],
        ['min']: [1, 'Number of employees must be positive'],
    },
    ['workField']: {
        ['required']: [true, 'Work filed is required'],
        ['minlength']: [2, 'Work field min length is 2'],
        ['maxlength']: [50, 'Work field max length is 50']
    },
    ['specialty']: {
        ['required']: [true, 'Specialty name is required'],
        ['minlength']: [2, 'Specialty min length is 2'],
        ['maxlength']: [50, 'Specialty max length is 50']
    },
    ['text']: {
        ['required']: [true, 'Opening description name is required'],
        ['minlength']: [5, 'Opening description min length is 5'],
        ['maxlength']: [200, 'Opening description max length is 200']
    },
    ['deadline']: {
        ['required']: [true, 'Deadline is required'],
    },
    ['companyId']: {
        ['required']: [true, 'Company id is required'],
    },
    ['studentId']: {
        ['required']: [true, 'Student id is required'],
    },
    ['cv']: {
        ['required']: [true, 'CV id is required'],
    },
    ['coverLetter']: {
        ['required']: [true, 'Cover letter is required'],
        ['minlength']: [5, 'Cover letter min length is 5'],
        ['maxlength']: [1000, 'Cover letter max length is 1000']
    },
    ['fairStartDate']: {
        ['required']: [true, 'Fair start date is required'],
    },
    ['fairEndDate']: {
        ['required']: [true, 'Fair enr date is required'],
    },
    ['place']: {
        ['required']: [true, 'Place is required'],
        ['minlength']: [5, 'Place min length is 5'],
        ['maxlength']: [200, 'Place max length is 200']
    },
    ['about']: {
        ['required']: [true, 'Fair description is required is required'],
        ['minlength']: [5, 'Fair description min length is 5'],
        ['maxlength']: [1000, 'Fair description max length is 1000']
    },
    ['locations']: {
        ['required']: [true, 'Locations are required'],
    },
    ['location']: {
        ['required']: [true, 'Location is required'],
        ['minlength']: [5, 'Location min length is 5'],
        ['maxlength']: [150, 'Location max length is 150']
    },
    ['title']: {
        ['required']: [true, 'Package title is required'],
        ['minlength']: [2, 'Package title min length is 2'],
        ['maxlength']: [50, 'Package title max length is 50']
    },
    ['content']: {
        ['minlength']: [2, 'Content title min length is 2'],
        ['maxlength']: [100, 'Content title max length is 100']
    },
    ['videoPromotion']: {
        ['min']: [0, 'Video promotion cannot be negative'],
    },
    ['noLessons']: {
        ['min']: [0, 'Number of lessons cannot be negative'],
    },
    ['noWorkshops']: {
        ['min']: [0, 'Number of workshops cannot be negative'],
    },
    ['noPresentations']: {
        ['min']: [0, 'Number of presentations  cannot be negative'],
    },
    ['price']: {
        ['required']: [true, 'Price is required'],
        ['min']: [0, 'Price cannot be negative'],
    },
    ['maxCompanies']: {
        ['min']: [-1, 'Max companies cannot be less than -1'],
    },
    ['additional']: {
        ['required']: [true, 'Additional packages are required']
    },
    ['packages']: {
        ['required']: [true, 'Packages are required']
    },
    ['applyDeadline']: {
        ['required']: [true, 'Apply deadline is required']
    },
    ['cvDeadline']: {
        ['required']: [true, 'CV deadline is required']   
    }
};

//date of birth
// let validDateOfBirth = function (date) {
//     var today = new Date();
//     return date < today;
// }
// module.exports.dateOfBirthValidator = [
//     { validator: validDateOfBirth, message: 'Date of birth must be in the past' }
// ]

let checkDates = function (expEdus) {
    expEdus.forEach(e => {
        if (e.endDate && e.endData < e.startDate) {
            return false;
        }
    });
    return true;
}
// experiences
module.exports.experienceValidators = [
    { validator: checkDates, message: "Experience start date must be before experience end date" }
]
module.exports.educationValidators = [
    { validator: checkDates, message: "Education start date must be before education end date" }
]



