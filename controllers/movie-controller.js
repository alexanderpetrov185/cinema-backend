const movieService = require("../service/movieService");
const {validationResult} = require("express-validator");
const ApiError = require("../exceptions/api-error");
const userService = require("../service/user-service");

class MovieController {
    async createMovie(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('validation error', errors.array()))
            }
            const savedMovie = await movieService.createMovie(req.body)
            return res.json(savedMovie)
        } catch (e) {
            next(e)
        }
    }

    async getMovies(req, res, next) {
        try {
            const movies = await movieService.getAllMovies()
            return res.json(movies)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new MovieController()