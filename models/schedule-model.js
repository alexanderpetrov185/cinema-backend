const {Schema, model} = require('mongoose');

const ScheduleSchema = new Schema({
        movie: {type: Schema.ObjectId, require: true, ref: "Movie"},
        sessionsDetails: {
            type: [{sessionTime: Date, accessible: Boolean, price: Number, hallId: String}]
        }
    }
)

module.exports = model('Schedule', ScheduleSchema);