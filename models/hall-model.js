const {Schema, model} = require('mongoose');
const {hallOne, hallTwo} = require('../hallsSeatsSimilarity')

const HallSchema = new Schema({
        hallNumber: {type: Number, require: true, unique: true},
        seatsInfo: {
            type: [{position: String, available: Boolean}],
            default: function () {
                if (this.hallNumber === 1) {
                    return hallOne.map((seat) => {
                        return {
                            position: seat,
                            available: true,
                        }
                    })
                } else {
                    return hallTwo.map((seat) => {
                        return {
                            position: seat,
                            available: true,
                        }
                    })
                }
            }
        },
        price: {type: Number},
        unavailableTime: [{type: [Date]}],
        movieId: {type: Schema.ObjectId, ref: "Movie", require: true},
    }
)

// const HallSchema = new Schema({
//         hallTitle: {type: String, require: true, unique: true},
//         seatsInfo: [{position: String, available: Boolean, price: Number}],
//         unavailableTime: [{type: [Date]}],
//         movieId: {type: Schema.ObjectId, ref: "Movie", require: true},
//     }
// )

module.exports = model('Hall', HallSchema);