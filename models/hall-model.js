const {Schema, model} = require('mongoose');

const HallSchema = new Schema({
        hallNumber: {type: Number, require: true, unique: true},
        reservedDates: {type: [Date]},
    }
)

module.exports = model('Hall', HallSchema);