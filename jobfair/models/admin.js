const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt-nodejs');

const validators = require('./validators');

const adminSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, validate: validators.passwordValidators },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    telephone: { type: String, required: true, validate: validators.telephoneValidators },
    email: { type: String, required: true, unique: true, validate: validators.emailValidators }
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

adminSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('admin', adminSchema);