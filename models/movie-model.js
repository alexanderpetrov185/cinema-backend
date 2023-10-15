const {Schema, model, SchemaTypes} = require('mongoose');

const MovieSchema = new Schema({
    imdbID: {type: String, unique: true, require: true},
    poster: {type: String, require: true},
    title: {type: String, require: true},
    genre: {type: String, require: true},
    trailer: {type: String, require: true},
    runtime: {type: Number, require: true},
    sessionsDetails: {
        type: [{
            hallNumber: {type: Number, require: true},
            date: {type: Date, require: true},
            price: {type: Number, require: true},
            sessionId: {type: Schema.ObjectId, ref: "Session", require: true}
        }]
    }
})

module.exports = model('Movie', MovieSchema);