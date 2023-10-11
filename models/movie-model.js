const {Schema, model, SchemaTypes} = require('mongoose');

const MovieSchema = new Schema({
    imdbID: {type: String, unique: true, require: true},
    poster: {type: String, require: true},
    title: {type: String, require: true},
    genre: {type: String, require: true},
    trailer: {type: String, require: true},
    _id: SchemaTypes.ObjectId
})

module.exports = model('Movie', MovieSchema);