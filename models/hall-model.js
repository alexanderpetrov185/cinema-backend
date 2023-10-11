const {Schema, model} = require('mongoose');

const HallSchema = new Schema({
        title: {type: String, require: true},
        seatInfo: [{position: String, available: Boolean}],
    }
)

module.exports = model('Hall', HallSchema);