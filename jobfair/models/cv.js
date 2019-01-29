const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt-nodejs');

const v = require('./validators');

const experienceSchema = new Schema({
    startDate: {
        type: Date,
        required: v.data.expStartDate.required
    },
    endDate: Date,
    position: {
        type: String,
        required: v.data.position.required,
        minlength: v.data.position.minlength,
        maxlength: v.data.position.maxlength
    },
    employer: {
        type: String,
        required: v.data.employer.required,
        minlength: v.data.employer.minlength,
        maxlength: v.data.employer.maxlength
    },
    activities: {
        type: String,
        minlength: v.data.activities.minlength,
        maxlength: v.data.activities.maxlength
    }
});

const educationSchema = new Schema({
    startDate: {
        type: Date,
        required: v.data.eduStartDate.required
    },
    endDate: Date,

    qualification: {
        type: String,
        required: v.data.qualification.required,
        minlength: v.data.qualification.minlength,
        maxlength: v.data.qualification.maxlength
    },
    institution: {
        type: String,
        required: v.data.institution.required,
        minlength: v.data.institution.minlength,
        maxlength: v.data.institution.maxlength
    },
    subjects: {
        type: String,
        minlength: v.data.subjects.minlength,
        maxlength: v.data.subjects.maxlength
    }
});

const languageSchema = new Schema({
    language: {
        type: String,
        required: v.data.language.required,
        minlength: v.data.language.minlength,
        maxlength: v.data.language.maxlength,
    },
    listenig: {
        type: String,
        enum: {
            values: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
            message: "Listenig must be 'A1', 'A2', 'B1', 'B2', 'C1' or 'C2"
        }
    },
    reading: {
        type: String,
        enum: {
            values: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
            message: "Reading must be 'A1', 'A2', 'B1', 'B2', 'C1' or 'C2"
        }
    },
    writing: {
        type: String,
        enum: {
            values: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
            message: "Writing must be 'A1', 'A2', 'B1', 'B2', 'C1' or 'C2"
        }
    },
    speaking: {
        type: String,
        enum: {
            values: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
            message: "Speaking must be 'A1', 'A2', 'B1', 'B2', 'C1' or 'C2"
        }
    },
});

const cvSchema = new Schema({
    name: {
        type: String,
        minlength: v.data.name.minlength,
        maxlength: v.data.name.maxlength
    },
    surname: {
        type: String,
        minlength: v.data.surname.minlength,
        maxlength: v.data.surname.maxlength
    },
    address: {
        type: String,
        minlength: v.data.address.minlength,
        maxlength: v.data.address.maxlength
    },
    telephone: {
        type: String,
        minlength: v.data.telephone.minlength,
        maxlength: v.data.telephone.maxlength,
        match: v.data.telephone.pattern
    },
    email: {
        type: String,
        maxlength: v.data.email.maxlength,
        match: v.data.email.pattern
    },
    website: {
        type: String,
        minlength: v.data.website.minlength,
        maxlength: v.data.website.maxlength,
        match: v.data.website.pattern
    },
    imAccount: {
        type: String,
        minlength: v.data.imAccount.minlength,
        maxlength: v.data.imAccount.maxlength,
    },
    sex: {
        type: String,
        enum: {
            values: ['male', 'female'],
            message: "Sex must be 'male' or 'female'"
        }
    },
    dateOfBirth: {
        type: Date,
        max: v.data.dateOfBirth.max
    },
    nationality: {
        type: String,
        minlength: v.data.nationality.minlength,
        maxlength: v.data.nationality.maxlength,
    },
    personalStatement: {
        type: String,
        minlength: v.data.personalStatement.minlength,
        maxlength: v.data.personalStatement.maxlength,
    },
    experience: {
        type: [experienceSchema],
        validate: v.experienceValidators
    },
    education: {
        type: [educationSchema],
        validate: v.educationValidators
    },
    motherTongue: {
        type: String,
        minlength: v.data.motherTongue.minlength,
        maxlength: v.data.motherTongue.maxlength,
    },
    languages: {
        type: [languageSchema]
    },
    communicationSkills: {
        type: String,
        minlength: v.data.skill.minlength,
        maxlength: v.data.skill.maxlength
    },
    organisationalSkills: {
        type: String,
        minlength: v.data.skill.minlength,
        maxlength: v.data.skill.maxlength
    },
    jobRelatedSkills: {
        type: String,
        minlength: v.data.skill.minlength,
        maxlength: v.data.skill.maxlength
    },
    digitalSkills: {
        type: String,
        minlength: v.data.skill.minlength,
        maxlength: v.data.skill.maxlength
    },
    otherSkills: {
        type: String,
        minlength: v.data.skill.minlength,
        maxlength: v.data.skill.maxlength
    },
    drivingLicence: Boolean,
    additionalInformation: {
        type: String,
        minlength: v.data.additionalInformation.minlength,
        maxlength: v.data.additionalInformation.maxlength
    }
});

module.exports = cvSchema;
