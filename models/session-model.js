const {Schema, model} = require('mongoose');
const {hallOne, hallTwo} = require('../hallsSeatsSimilarity')

const SessionSchema = new Schema({
        hallNumber: {type: String, require: true},
        seatsInfo: {
            type: [{position: String, available: Boolean}],
            default: function () {
                if (this.hallNumber === "1") {
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
            },
            require: true
        },
        sessionTime: {type: [Date], require: true},
        sessionPrice: {type: Number, require: true}
    }
)

module.exports = model('Session', SessionSchema);