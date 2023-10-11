const ScheduleModel = require("../models/schedule-model");
const ApiError = require("../exceptions/api-error");
const MoviesModel = require("../models/movie-model");
const MovieDto = require('../dtos/movie-dto')

class ScheduleService {
    async createSchedule(data) {
        const schedule = await ScheduleModel.findOne({movie: data.imdbId})
        console.log(schedule)
        // if (schedule) {
        //     throw ApiError.BadRequest(`Schedule for: ${movie.title} is already exist`)
        // }
        // const movieDto = new MovieDto(movie);
        // return ScheduleModel.create({movie: movieDto, data})
    }
}

module.exports = new ScheduleService();