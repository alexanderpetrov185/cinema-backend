const MoviesModel = require("../models/movie-model");
const HallModel = require("../models/hall-model");
const SessionModel = require("../models/session-model");
const ApiError = require("../exceptions/api-error");
const MovieDto = require("../dtos/movie-dto");

class MovieService {
    async createMovie(data) {
        const imdbID = data.imdbID
        const movieCandidate = await MoviesModel.findOne({imdbID})
        if (movieCandidate) {
            throw ApiError.BadRequest(`This movie is already exist`)
        }

        //создаем фильм
        const movie = await MoviesModel.create(data)
        const movieDto = new MovieDto(movie)

        for (const details of data.sessionsDetails) {
            const endOfSession = new Date(details.date)
            endOfSession.setMinutes(endOfSession.getMinutes() + data.runtime + 10) //10 минут уборка зала

            //Добавляем временные промежутки когда зал занят
            await HallModel.updateOne(
                {hallNumber: details.hallNumber},
                {
                    $push: {
                        reservedDates: [details.date, endOfSession]
                    },
                }
            )

            await SessionModel.create({hallNumber: details.hallNumber, date: details.date, movieId: movieDto.id}) //Создаем сессию
        }


        // await Promise.all(sessionDetails.map(async (detail) => {
        //     const endOfSession = new Date(detail.date)
        //     endOfSession.setMinutes(endOfSession.getMinutes() + data.runtime + 10) //10 минут уборка зала
        //
        //     //Добавляем временные промежутки когда зал занят
        //     await HallModel.updateOne(
        //         {hallNumber: detail.hallNumber},
        //         {
        //             $push: {
        //                 reservedDates: [detail.date, endOfSession]
        //             },
        //         }
        //     )
        //
        //     await SessionModel.create({hallNumber: detail.hallNumber, date: detail.date, movieId: movieDto.id}) //Создаем сессию
        // }))

        // const movieSchedule = data.schedule && await Promise.all(data.schedule.map(async (daySchedule) => {
        //         const dayExist = await ScheduleModel.findOne({day: daySchedule.day})
        //         if (!dayExist) {
        //             return await scheduleService.createSchedule(movieDto.id, daySchedule)
        //         } else {
        //             return await scheduleService.updateSchedule(movieDto.id, daySchedule)
        //         }
        //     }
        // ))

        return {
            movie: movieDto,
        }
    }

    // async updateMovie(movieId, data) {
    //     const movie = await MoviesModel.findByIdAndUpdate(movieId)
    //     const movieDto = new MovieDto(movie)
    //
    //     const movieSchedule = data.schedule && await scheduleService.updateSchedule(movieDto.id, data.schedule)
    //
    //     return {
    //         movie: movieDto,
    //         movieSchedule: movieSchedule
    //     }
    // }

    //
    // async deleteMovie(data) {
    //     await MoviesModel.findByIdAndDelete(data.params.id)
    //     return "movie deleted successfully"
    // }

    async getMovies() {
        return MoviesModel.find();
    }

    async moviesOnDay(date) {
        return MoviesModel.find({
            sessionsDetails: {
                $elemMatch: {
                    date: {
                        $gte: new Date(`${date}T00:00:00.000Z`),
                        $lt: new Date(`${date}T23:59:59.000Z`)
                    }
                }
            }
        });
    }

    // async getDateMovies(date) {
    //
    //     return ScheduleModel.find({
    //         sessionsDetails: {
    //             $elemMatch: {
    //                 sessionTime: {
    //                     $gte: new Date(`${date}T00:00:00.000Z`),
    //                     $lt: new Date(`${date}T23:59:59.000Z`)
    //                 }
    //             }
    //         }
    //     });
    // }
}

module.exports = new MovieService();