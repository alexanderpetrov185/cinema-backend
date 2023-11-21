const MoviesModel = require("../models/movie-model");
const ApiError = require("../exceptions/api-error");
const MovieDto = require("../dtos/movie-dto");
const sessionService = require("../service/session-service");
const hallService = require("../service/hall-service");

class MovieService {
  async createMovie(data) {
    const movieData = data;
    const imdbID = movieData.imdbID;
    const movieCandidate = await MoviesModel.findOne({ imdbID });
    if (movieCandidate) {
      throw ApiError.BadRequest(`This movie is already exist`);
    }

    movieData.sessionsDetails = await Promise.all(
      movieData.sessionsDetails.map(async (details) => {
        const startOfSession = new Date(details.date);
        const endOfSession = new Date(details.date);
        endOfSession.setMinutes(
          endOfSession.getMinutes() + movieData.runtime + 10,
        ); //10 минут уборка зала
        const sessionTime = [startOfSession, endOfSession];

        //Создаем сессию
        const session = await sessionService.createSession(
          details.hallNumber,
          startOfSession,
          details.price,
        );

        //!!! ДОБАВИТЬ ПРОВЕРКУ НА СУЩЕСТВОВАНИЕ ЗАЛА НА СТОРОНЕ ФРОНТА

        //Обновляем значения когда зал занят
        await hallService.updateHallAvailability(
          details.hallNumber,
          sessionTime,
          session._id,
        );
        details.sessionId = session._id;
        return details;
      }),
    );

    //создаем фильм
    const movie = await MoviesModel.create(movieData);
    const movieDto = new MovieDto(movie);

    return {
      movie: movieDto,
    };
  }

  async getMovies() {
    return MoviesModel.find();
  }

  async moviesOnDay(date) {
    const gte = new Date(`${date}T00:00:00.000Z`);
    const lt = new Date(`${date}T23:59:59.000Z`);
    console.log("gte:", gte, "lt: ", lt);

    return MoviesModel.aggregate([
      {
        $project: {
          imdbID: 1,
          poster: 1,
          title: 1,
          genre: 1,
          trailer: 1,
          runtime: 1,
          sessionsDetails: {
            $filter: {
              input: "$sessionsDetails",
              as: "detail",
              cond: {
                $and: [
                  { $gte: ["$$detail.date", gte] },
                  { $lt: ["$$detail.date", lt] },
                ],
              },
            },
          },
        },
      },
      {
        $project: {
          imdbID: 1,
          poster: 1,
          title: 1,
          genre: 1,
          trailer: 1,
          runtime: 1,
          sessionsDetails: {
            $sortArray: {
              input: "$sessionsDetails",
              sortBy: { date: 1 },
            },
          },
        },
      },
      {
        $match: {
          sessionsDetails: { $ne: [] },
        },
      },
    ]);
  }

  async updateMovie(movieId, data) {
    return MoviesModel.findByIdAndUpdate(movieId, { $set: { data } });
  }

  async deleteMovie(movieId) {
    return MoviesModel.findByIdAndDelete(movieId);
  }
}

module.exports = new MovieService();
