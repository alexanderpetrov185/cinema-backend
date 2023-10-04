const movieService = require("../service/movieService");

class MovieController {
    async createMovie(req, res, next) {
        try {
            const data = req.body
            if (data.dates) {
                data.dates = await data.dates.map((date) => ISODate(date))
                // data.dates = await data.dates.map((date) => new Date(date))
            }
            const savedMovie = await movieService.createMovie(data)
            return res.json(savedMovie)
        } catch (e) {
            next(e)
        }
    }

    async updateMovie(req, res, next) {
        try {
            const updatedMovie = await movieService.updateMovie(req.body)
            return res.json(updatedMovie)
        } catch (e) {
            next(e)
        }
    }

    async deleteMovie(req, res, next) {
        try {
            const deleteMovie = await movieService.deleteMovie(req.body)
            return res.json(deleteMovie)
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

    async getMoviesOnDate(req, res, next) {
        try {
            // const date = await new Date(req.params.date)
            const movies = await movieService.getDateMovies(req.params.date)
            return res.json(movies)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new MovieController()