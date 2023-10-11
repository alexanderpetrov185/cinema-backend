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

    // async updateMovie(data) {
    //     const updatedHotel = await MoviesModel.findByIdAndUpdate(
    //         data.params.id,
    //         {$set: data.body},
    //         {new: true}
    //     )
    //     const movieDto = new MovieDto(updatedHotel)
    //     return {
    //         updatedHotel: movieDto
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

    async getDateMovies(date) {

        return MoviesModel.find({
            details: {
                $elemMatch: {
                    sessionTime: {
                        $gte: new Date(`${date}T00:00:00.000Z`),
                        $lt: new Date(`${date}T23:59:59.000Z`)
                    }
                }
            }
        });
    }
}

module.exports = new MovieService();