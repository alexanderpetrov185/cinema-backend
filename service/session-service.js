const SessionModel = require("../models/session-model");
const ApiError = require("../exceptions/api-error");

class SessionService {
    async createSession(hallNumber, sessionTime, price) {
        const sessionCandidate = await SessionModel.findOne({
            hallNumber: hallNumber,
            sessionTime: sessionTime,
            price: price
        })

        if (sessionCandidate) {
            throw ApiError.BadRequest(`Hall №${hallNumber} for this date ${sessionTime} is already reserved`)
        }
        return SessionModel.create({hallNumber, sessionTime, price});
    }

    async getSession(sessionId) {
        return SessionModel.findById(sessionId)
    }

    async updateSeats({seatsIds}) {
        return SessionModel.updateMany(
            {
                "seatsInfo._id": {
                    $in: seatsIds
                }
            },
            {$set: {"seatsInfo.$[element].available": false}},
            {
                "arrayFilters": [{
                    "element._id": {
                        $in: seatsIds
                    }
                }], "multi": true
            },
        );
    }

    async deleteSession(sessionId) {
        return SessionModel.findByIdAndDelete(sessionId)
    }

}

module.exports = new SessionService();


// ,
// {
//     "arrayFilters": [{
//     "elem._id": {
//         $in: seatsId
//     }
// }], "multi": true
// }