const {Router} = require('express');
const userController = require("../controllers/user-controller");
const movieController = require("../controllers/movie-controller");
const hallController = require("../controllers/hall-controller");
const {body} = require("express-validator");
const authMiddleware = require('../middlewares/auth-middleware')

const router = new Router();

//userController
router.post("/registration", body('email').isEmail(), body('password').isLength({
    min: 7,
    max: 32
}), userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);
router.put("/updateUser/:id", userController.updateUser);
router.delete("/deleteUser/:id", userController.deleteUser);

//movieController
router.get('/movies', movieController.getAllMovies);
router.get('/moviesOnDay/:date', movieController.getMoviesOnDay);
router.post('/createMovie', movieController.createMovie);
router.put("/updateMovie/:id", movieController.updateMovie);
router.delete("/deleteMovie/:id", movieController.deleteMovie);

//hallController
router.post('/createHall', hallController.createHall);
router.put("/updateHall/:id", hallController.updateHall);
router.delete("/deleteMovie/:id", hallController.deleteHall);

module.exports = router