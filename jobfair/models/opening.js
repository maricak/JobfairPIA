const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt-nodejs');

const v = require('./validators');

const openingSchema = new Schema({
    companyUsername: {
        type: String,
        unique: true,
        required: v.data.username.required,
        minlength: v.data.username.minlength,
        maxlength: v.data.username.maxlength
    },
    companyName: {
        type: String,
        required: v.data.name.required,
        minlength: v.data.name.minlength,
        maxlength: v.data.name.maxlength
    },
    type: {
        type: String,
        enum: {
            values: ['job', 'internship'],
            message: "Opening type must be 'job' or 'internship'"
        }
    },
    name: {
        type: String,
        required: v.data.name.required,
        minlength: v.data.name.minlength,
        maxlength: v.data.name.maxlength
    },
    text: {
        type: String,
        required: v.data.text.required,
        minlength: v.data.text.minlength,
        maxlength: v.data.text.maxlength
    },
    deadline: {
        type: Date,
        required: v.data.deadline.required
    },
    //fajlovi
});

module.exports = mongoose.model('opening', openingSchema);