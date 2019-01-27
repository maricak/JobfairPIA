const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt-nodejs');

const v = require('./validators');

const adminSchema = new Schema({
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
        match: v.data.email.pattern
    }
});

adminSchema.pre('save', function (next) {
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

adminSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('admin', adminSchema);