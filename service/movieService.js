const MoviesModel = require("../models/movie-model");
const ApiError = require("../exceptions/api-error");
const mailService = require("./mail-service");
const tokenService = require("./token-service");
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

    async getAllMovies() {
        return MoviesModel.find();
    }
}

module.exports = new MovieService();