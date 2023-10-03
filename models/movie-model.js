const {Schema, model} = require('mongoose');

const MovieSchema = new Schema({
    imdbID: {type: String, require: true},
    poster: {type: String, require: true},
    title: {type: String, require: true},
    genre: {type: String, require: true},
    trailer: {type: String, require: true},
    // seats: {type: [String], require: true}
})

module.exports = model('Movie', MovieSchema);