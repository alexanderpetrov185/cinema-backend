const scheduleService = require("../service/schedule-service");

class scheduleController {
    async createSchedule(req, res, next) {
        try {
            const data = req.body
            console.log(data)
            const schedule = await scheduleService.createSchedule(data)
            return res.json(schedule)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new scheduleController()