const SessionModel = require("../models/session-model");
const ApiError = require("../exceptions/api-error");

class SessionService {
    async createSession(data) {
        const sessionCandidate = await SessionModel.findOne({hallNumber: data.hallNumber, date: data.date})
        if (sessionCandidate) {
            throw ApiError.BadRequest(`Hall with this title is already exist`)
        }
        return SessionModel.create(data);
    }

    async getSession(sessionId) {
        return SessionModel.findById(sessionId)
    }

    async updateSession(sessionId, data) {
        return SessionModel.findByIdAndUpdate(sessionId, {$set: {data}})
    }

    async deleteSession(sessionId) {
        return SessionModel.findByIdAndDelete(sessionId)
    }

}

module.exports = new SessionService();
