const {Schema, model, SchemaTypes} = require('mongoose');

const MovieSchema = new Schema({
    imdbID: {type: String, unique: true, require: true},
    poster: {type: String, require: true},
    title: {type: String, require: true},
    genre: {type: String, require: true},
    trailer: {type: String, require: true},
    runtime: {type: String}
})

module.exports = model('Movie', MovieSchema);