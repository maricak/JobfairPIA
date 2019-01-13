const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt-nodejs');

const validators = require('./validators');

const companySchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, validate: validators.passwordValidators },
    name: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    pib: { type: String, required: true, validate: validators.pibValidators },
    numberOfEmployees: { type: Number, required: true, min: [1, "Number of employees must be positive"] },
    email: { type: String, required: true, unique: true, validate: validators.emailValidators },
    webSite: { type: String, required: true, unique: true, validate: validators.webSiteValidators },
    workField: { type: String, required: true },
    specialty: { type: String, required: true },
});

companySchema.pre('save', function (next) {
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

companySchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('company', companySchema);