const ScheduleModel = require("../models/schedule-model");
const MoviesModel = require("../models/movie-model");
const ApiError = require("../exceptions/api-error");
const MovieDto = require("../dtos/movie-dto");
const scheduleService = require("../service/schedule-service")

class MovieService {
    async createMovie(data) {
        const imdbID = data.imdbID
        const movieCandidate = await MoviesModel.findOne({imdbID})
        if (movieCandidate) {
            throw ApiError.BadRequest(`This movie is already exist`)
        }
        const movie = await MoviesModel.create(data)
        const movieDto = new MovieDto(movie)

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
            // movieSchedule: movieSchedule
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

    async scheduleOnDay(date) {
        return ScheduleModel.find({
            day: {
                $gte: new Date(`${date}T00:00:00.000Z`),
                $lt: new Date(`${date}T23:59:59.000Z`)
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