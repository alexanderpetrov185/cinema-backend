const scheduleService = require("../service/schedule-service");

class scheduleController {
    async createSchedule(req, res, next) {
        try {
            const schedule = await scheduleService.createSchedule(req.body)
            return res.json(schedule)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new scheduleController()