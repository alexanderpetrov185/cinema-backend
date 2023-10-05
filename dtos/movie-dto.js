module.exports = class MovieDto {
    imdbID;
    poster;
    title;
    genre;
    trailer;
    details;
    hall;

    constructor(model) {
        this.imdbID = model.imdbID;
        this.poster = model.poster;
        this.title = model.title;
        this.genre = model.genre;
        this.trailer = model.trailer;
        this.hall = model.hall;
        this.details = model.details;
    }
}