const ScheduleModel = require("../models/schedule-model");
const hallModel = require("../models/hall-model");

class ScheduleService {
    async createSchedule(data) {
        for (const movie of data.movies) {
            for (const session of movie.sessionsDetails) {
                const sessionTimeEnd = new Date(session.sessionTime);
                sessionTimeEnd.setMinutes(sessionTimeEnd.getMinutes() + session.runtime)

                await hallModel.create(
                    {
                        hallNumber: session.hallNumber,
                        price: session.price,
                        unavailableTime: [session.sessionTime, sessionTimeEnd],
                        movieId: movie.movieId
                    }
                )
            }
        }

        return ScheduleModel.create(data);
    }

    // async updateSchedule(movieId, daySchedule) {
    //     return ScheduleModel.findByIdAndUpdate({
    //         day: daySchedule.day,
    //         movies: {movieId, sessionsDetails: daySchedule.sessionsDetails}
    //     });
    // }


    // async createSchedule(data) {
    //     await data.movies.forEach(async (movie) => {
    //         await movie.sessionsDetails.forEach(async (session) => {
    //                 await hallModel.create(
    //                     {
    //                         hallNumber: session.hallNumber,
    //                         price: session.price,
    //                         unavailableTime: [session.sessionTime],
    //                         // unavailableTime: [session.sessionTime, session.sessionTime + session.runtime],
    //                         movieId: movie.movieId
    //                     }
    //                 )
    //             }
    //         )
    //     })
    //     return ScheduleModel.create(data);
    // }
}


module.exports = new ScheduleService();