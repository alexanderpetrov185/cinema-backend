const {Schema, model} = require('mongoose');

const HallSchema = new Schema({
        hallNumber: {type: Number, require: true, unique: true},
        reservedSessions: {
            type: [{
                sessionTime: {type: [Date], require: true},
                sessionId: {type: Schema.ObjectId, ref: "Session", require: true}
            }]
        },
        available: {type: Boolean, Default: true}
    }
)

module.exports = model('Hall', HallSchema);