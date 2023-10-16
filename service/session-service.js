const SessionModel = require("../models/session-model");
const ApiError = require("../exceptions/api-error");

class SessionService {
    async createSession(hallNumber, sessionTime, movieId) {
        const sessionCandidate = await SessionModel.findOne({
            hallNumber: hallNumber,
            sessionTime: sessionTime
        })

        if (sessionCandidate) {
            throw ApiError.BadRequest(`Hall №${hallNumber} for this date ${sessionTime} is already reserved`)
        }
        return SessionModel.create({hallNumber, sessionTime, movieId});
    }

    async getSession(sessionId) {
        return SessionModel.findById(sessionId)
    }

    async updateSession(sessionId, data) {
        return SessionModel.findByIdAndUpdate(sessionId, {$set: {"seatsInfo.$[el].available": data.available}}, {arrayFilters: [{'el._id': data.seatId}]})
    }

    async deleteSession(sessionId) {
        return SessionModel.findByIdAndDelete(sessionId)
    }

}

module.exports = new SessionService();
