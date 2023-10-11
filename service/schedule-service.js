const ScheduleModel = require("../models/schedule-model");

class ScheduleService {
    async createSchedule(movieId, daySchedule) {
        return await ScheduleModel.create({
            day: daySchedule.day,
            movies: {movieId, sessionsDetails: daySchedule.sessionsDetails}
        })
    }

    async updateSchedule(movieId, daySchedule) {
        return ScheduleModel.findByIdAndUpdate({
            day: daySchedule.day,
            movies: {movieId, sessionsDetails: daySchedule.sessionsDetails}
        });
    }
}


module.exports = new ScheduleService();