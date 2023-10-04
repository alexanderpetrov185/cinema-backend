const {Schema, model} = require('mongoose');

const DetailsSchema = new Schema({
    daysDate: {type: Date, require: true},
    sessionDetails: [{sessionTime: Date, available: Boolean, price: Number}], require: true,
})

module.exports = model('Details', DetailsSchema);
