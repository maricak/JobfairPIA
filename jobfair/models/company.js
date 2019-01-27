const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt-nodejs');

const v = require('./validators');

const companySchema = new Schema({
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
    city: {
        type: String,
        required: v.data.city.required,
        minlength: v.data.city.minlength,
        maxlength: v.data.city.maxlength,
    },
    address: {
        type: String,
        required: v.data.address.required,
        minlength: v.data.address.minlength,
        maxlength: v.data.address.maxlength,
    },
    pib: {
        type: String,
        required: v.data.pib.required,
        minlength: v.data.pib.minlength,
        maxlength: v.data.pib.maxlength,
        match: v.data.pib.pattern
    },
    numberOfEmployees: {
        type: Number,
        required: v.data.numberOfEmployees.required,
        min: v.data.numberOfEmployees.min
    },
    email: {
        type: String,
        unique: true,
        required: v.data.email.required,
        match: v.data.email.pattern
    },
    website: {
        type: String,
        required: v.data.website.required,
        minlength: v.data.website.minlength,
        maxlength: v.data.website.maxlength,
        match: v.data.website.pattern
    },
    workField: {
        type: String,
        required: v.data.workField.required,
        minlength: v.data.workField.minlength,
        maxlength: v.data.workField.maxlength,
    },
    specialty: {
        type: String,
        required: v.data.specialty.required,
        minlength: v.data.specialty.minlength,
        maxlength: v.data.specialty.maxlength,
    }
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