const MoviesModel = require("../models/movie-model");
const ApiError = require("../exceptions/api-error");
const MovieDto = require("../dtos/movie-dto");

class MovieService {
    async createMovie(data) {
        const imdbID = data.imdbID
        const movieCandidate = await MoviesModel.findOne({imdbID})
        if (movieCandidate) {
            throw ApiError.BadRequest(`This movie is already exist`)
        }
        const movie = await MoviesModel.create(data)

        const movieDto = new MovieDto(movie)
        return {
            movie: movieDto
        }
    }

    async updateMovie(data) {
        const updatedHotel = await MoviesModel.findByIdAndUpdate(
            data.params.id,
            {$set: data.body},
            {new: true}
        )
        const movieDto = new MovieDto(updatedHotel)
        return {
            updatedHotel: movieDto
        }
    }

    async deleteMovie(data) {
        await MoviesModel.findByIdAndDelete(data.params.id)
        return "movie deleted successfully"
    }

    async getMovies() {
        return MoviesModel.find();
    }

    async getDateMovies(date) {
        return MoviesModel.find({
            dates: {
                daysDates: date
            }
        });
    }
}

module.exports = new MovieService();