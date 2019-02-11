const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const cvSchema = require('./cv');
const v = require('./validators');

const applicationSchema = new Schema({
    studentId: {
        type: String,
        required: v.data.studentId.required
    },
    cv: {
        type: cvSchema,
        //required: v.data.cv.required, 
        //default: {}
    },
    coverLetter: {
        type: String,
        // required: v.data.coverLetter.require,
        minlength: v.data.coverLetter.minlength,
        maxlength: v.data.coverLetter.maxlength
    },
    coverLetterIsFile: {
        type: Boolean,
        default: false
    },
    accepted: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        min: v.data.rating.min,
        max: v.data.rating.max
    }
})

const openingSchema = new Schema({
    companyId: {
        type: String,
        required: v.data.companyId.required
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
    files: {
        type: [String]
    },
    applications: {
        type: [applicationSchema],
        default: []
    }
});

module.exports = mongoose.model('opening', openingSchema);