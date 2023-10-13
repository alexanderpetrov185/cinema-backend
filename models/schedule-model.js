const {Schema, model} = require('mongoose');

const ScheduleSchema = new Schema({
        day: {type: Date, unique: true, require: true},
        movies: {
            type: [{
                movieId: {type: Schema.ObjectId, ref: "Movie", require: true},
                sessionsDetails: {
                    type: [{
                        sessionTime: Date,
                        runtime: Number,
                        available: Boolean,
                        price: Number,
                        hallNumber: Number
                    }]
                }
            }]
        }
    }
)

module.exports = model('Schedule', ScheduleSchema);