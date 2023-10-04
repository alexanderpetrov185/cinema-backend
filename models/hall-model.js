const {Schema, model} = require('mongoose');

const HallSchema = new Schema({
        title: {type: String, require: true},
        genre: {type: String, require: true},
        trailer: {type: String, require: true},
        dates: {
            type: [{
                daysDate: Date,
                daySchedule: [Date],
            }]
        },
    },
    {timestamps: true}
)

module.exports = model('Hall', HallSchema);