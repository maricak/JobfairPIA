const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt-nodejs');

const validators = require('./validators');

const studentSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, validate: validators.passwordValidators },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    telephone: { type: String, required: true, validate: validators.telephoneValidators },
    email: { type: String, required: true, unique: true, validate: validators.emailValidators },
    currentYear: { type: Number, required: true, validate: validators.yearValidators },
    graduated: { type: Boolean, required: true },
    cv: {
        name: String,
        surname: String,
        address: String,
        telephone: { type: String, validate: validators.telephoneValidators },
        email: { type: String, validate: validators.emailValidators },
        website: { type: String, validate: validators.webSiteValidators },
        imAccount: String,
        sex: { type: String, enum: ['male', 'female'] },
        dateOfBirth: Date,
        nationality: String,
        personalStatement: String,
        experience: [{
            startDate: Date,
            endDate: Date,
            position: String,
            employer: String,
            activities: String
        }],
        education: [{
            startDate: Date,
            endDate: Date,
            qualification: String,
            institution: String,
            subjects: String
        }],
        motherTongue: String,
        languagues: [{
            language: String,
            listenig: String,
            reading: String,
            writing: String,
            speaking: String
        }],
        communicationSkills: String,
        organisationslSkills: String,
        jobRelatedSkills: String,
        digitalSkills: String,
        otherSkills: String,
        drivingLicence: String,
        additionalInformation: String
    }
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