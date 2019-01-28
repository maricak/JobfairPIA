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
        minlength: v.data.position.minlength,
        maxlength: v.data.position.maxlength
    },
    employer: {
        type: String,
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
        minlength: v.data.qualification.minlength,
        maxlength: v.data.qualification.maxlength
    },
    institution: {
        type: String,
        minlength: v.data.institution.minlength,
        maxlength: v.data.institution.maxlength
    },
    subjects: {
        type: String,
        minlength: v.data.subjects.minlength,
        maxlength: v.data.subjects.maxlength
    }
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
    languages: [{
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
    }],
    communicationSkills: {
        type: String,
        minlength: v.data.skill.minlength,
        maxlength: v.data.skill.maxlength
    },
    organisationslSkills: {
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


const studentSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: v.data.username.required,
        minlength: v.data.username.minlength,
        maxlength: v.data.username.maxlength
    },
    password: {
        type: String,
        required: v.data.password.required,
        minlength: v.data.password.minlength,
        maxlength: v.data.password.maxlength,
        match: v.data.password.pattern
    },
    name: {
        type: String,
        required: v.data.name.required,
        minlength: v.data.name.minlength,
        maxlength: v.data.name.maxlength
    },
    surname: {
        type: String,
        required: v.data.surname.required,
        minlength: v.data.surname.minlength,
        maxlength: v.data.surname.maxlength
    },
    telephone: {
        type: String,
        required: v.data.telephone.required,
        minlength: v.data.telephone.minlength,
        maxlength: v.data.telephone.maxlength,
        match: v.data.telephone.pattern
    },
    email: {
        type: String,
        unique: true,
        required: v.data.email.required,
        maxlength: v.data.email.maxlength,
        match: v.data.email.pattern
    },
    currentYear: {
        type: Number,
        required: v.data.currentYear.required,
        min: v.data.currentYear.min,
        max: v.data.currentYear.max
    },
    graduated: {
        type: Boolean,
        required: v.data.graduated.required
    },
    cv: cvSchema
});

studentSchema.pre('save', function (next) {
    if (!this.isModified('password'))
        return next();
    bcrypt.hash(this.password, null, null, (err, hash) => {
        if (err) {
            return next(err);
        }
        this.password = hash;
        next();
    });
});

studentSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('student', studentSchema);