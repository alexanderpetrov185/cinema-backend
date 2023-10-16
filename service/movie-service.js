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
            
            const session = await SessionModel.create({
                hallNumber: details.hallNumber,
                date: details.date,
                movieId: movieDto.id
            }) //Создаем сессию

            //!!! ДОБАВИТЬ ПРОВЕРКУ НА СУЩЕСТВОВАНИЕ ЗАЛА НА СТОРОНЕ ФРОНТА

            //Добавляем временные промежутки когда зал занят
            await HallModel.updateOne(
                {hallNumber: details.hallNumber},
                {
                    $push: {
                        reservedSessions: [{
                            sessionTime: [details.date, endOfSession],
                            sessionId: session._id
                        }]
                    },
                }
            )
        }

        return {
            movie: movieDto,
        }
    }

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

    async updateMovie(movieId, data) {
        return MoviesModel.findByIdAndUpdate(movieId, {$set: {data}})
    }

    async deleteMovie(movieId) {
        return MoviesModel.findByIdAndDelete(movieId)
    }
}

module.exports = new MovieService();