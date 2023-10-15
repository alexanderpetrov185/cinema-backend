const movieService = require("../service/movie-service");

class MovieController {
    async createMovie(req, res, next) {
        try {
            const savedMovie = await movieService.createMovie(req.body)
            return res.json(savedMovie)
        } catch (e) {
            next(e)
        }
    }

    async getAllMovies(req, res, next) {
        try {
            const movies = await movieService.getMovies()
            return res.json(movies)
        } catch (e) {
            next(e)
        }
    }

    async getMoviesOnDay(req, res, next) {
        try {
            const movies = await movieService.moviesOnDay(req.params.date)
            return res.json(movies)
        } catch (e) {
            next(e)
        }
    }

    async updateMovie(req, res, next) {
        try {
            await movieService.updateMovie(req.params.id, req.body)
            return res.json("movie updated successfully")
        } catch (e) {
            next(e)
        }
    }

    async deleteMovie(req, res, next) {
        try {
            await movieService.deleteMovie(req.params.id)
            return res.json("movie deleted successfully")
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new MovieController()