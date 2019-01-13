const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt-nodejs');

const validators = require('./validators');

const openingSchema = new Schema({
    companyUsername: { type: String, required: true },
    companyName: { type: String, required: true },
    type: { type: String, enum: ['job', 'internship'] },
    name: { type: String, required: true },
    text: { type: String, required: true },
    deadline: { type: Date, required: true },
    //fajlovi
});

module.exports = mongoose.model('opening', openingSchema);