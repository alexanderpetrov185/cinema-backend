const {Schema, model} = require('mongoose');

const MovieSchema = new Schema({
    imdbID: {type: String, require: true},
    poster: {type: String, require: true},
    title: {type: String, require: true},
    genre: {type: String, require: true},
    trailer: {type: String, require: true},
    details: {
        type: [{sessionTime: Date, accessible: Boolean, price: Number, hallInfoId: String}]
    },
})

module.exports = model('Movie', MovieSchema);