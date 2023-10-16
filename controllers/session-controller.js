const sessionService = require("../service/session-service");

class SessionController {
    async createSession(req, res, next) {
        try {
            const savedSession = await sessionService.createSession(req.body)
            return res.json(savedSession)
        } catch (e) {
            next(e)
        }
    }

    async getSession(req, res, next) {
        try {
            const session = await sessionService.getSession(req.params.id)
            return res.json(session)
        } catch (e) {
            next(e)
        }
    }

    async updateSession(req, res, next) {
        try {
            await sessionService.updateSession(req.params.id, req.body)
            return res.json("session updated successfully")
        } catch (e) {
            next(e)
        }
    }

    async deleteSession(req, res, next) {
        try {
            await sessionService.deleteSession(req.params.id)
            return res.json("session deleted successfully")
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new SessionController()