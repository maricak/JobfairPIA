const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt-nodejs');

const v = require('./validators');


const packageSchema = new Schema({
    title: {
        type: String,
        require: v.data.title.required,
        minlength: v.data.title.minlength,
        maxlength: v.data.title.maxlength
    },
    content: {
        type: [{
            type: String,
            minlength: v.data.content.minlength,
            maxlength: v.data.content.maxlength
        }]
    },
    videoPromotion: {
        type: Number,
        min: v.data.videoPromotion.min
    },
    noLessons: {
        type: Number,
        min: v.data.noLessons.min
    },
    noWorkshops: {
        type: Number,
        min: v.data.noWorkshops.min
    },
    noPresentations: {
        type: Number,
        min: v.data.noPresentations.min
    },
    price: {
        type: Number,
        required: v.data.price.required,
        min: v.data.price.min
    },
    maxCompanies: {
        type: Number,
        min: v.data.maxCompanies.min
    }
});

const fairSchema = new Schema({
    finished: {
        type: Boolean,
        default: false
    },
    applyDeadline: {
        type: Date,
        required: v.data.name.required    
    },
    cvDeadline: {
        type: Date,
        required: v.data.name.required
    },
    name: {
        type: String,
        unique: true,
        required: v.data.name.required,
        minlength: v.data.name.minlength,
        maxlength: v.data.name.maxlength
    },
    startDate: {
        type: Date,
        required: v.data.fairStartDate.required
    },
    endDate: {
        type: Date,
        required: v.data.fairEndDate.required
    },
    place: {
        type: String,
        required: v.data.place.required,
        minlength: v.data.place.minlength,
        maxlength: v.data.place.maxlength
    },
    about: {
        type: String,
        required: v.data.about.required,
        minlength: v.data.about.minlength,
        maxlength: v.data.about.maxlength
    },
    locations: {
        type: [{
            type : String, 
            required: v.data.location.required,
            minlength: v.data.location.minlength,
            maxlength: v.data.location.maxlength
        }],
        required: v.data.locations.required
    },
    packages: {
        type: [packageSchema],
        required: v.data.packages.required
    },
    additional: {
        type: [packageSchema],
        required: v.data.additional.required
    }
});

// adminSchema.pre('save', function (next) {
//     if (!this.isModified('password'))
//         return next();
//     bcrypt.hash(this.password, null, null, (err, hash) => {
//         if (err) {
//             return next(err);
//         }
//         this.password = hash;
//         next();
//     });
// });

// adminSchema.methods.comparePassword = function (password) {
//     return bcrypt.compareSync(password, this.password);
// };

module.exports = mongoose.model('fair', fairSchema);