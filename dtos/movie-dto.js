module.exports = class MovieDto {
    id;
    imdbID;
    poster;
    title;
    genre;
    trailer;
    runtime;
    sessionsDetails;

    constructor(model) {
        this.id = model._id;
        this.imdbID = model.imdbID;
        this.poster = model.poster;
        this.title = model.title;
        this.genre = model.genre;
        this.trailer = model.trailer;
        this.runtime = model.runtime;
        this.sessionsDetails = model.sessionsDetails;
    }
}