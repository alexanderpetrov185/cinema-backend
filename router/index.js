const {Router} = require('express');
const userController = require("../controllers/user-controller");
const movieController = require("../controllers/movie-controller");
const scheduleController = require("../controllers/schedule-controller");
const hallController = require("../controllers/hall-controller");
const {body} = require("express-validator");
const authMiddleware = require('../middlewares/auth-middleware')

const router = new Router();

router.post("/registration", body('email').isEmail(), body('password').isLength({
    min: 7,
    max: 32
}), userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);

router.post('/createMovie', movieController.createMovie);
router.get('/movies', movieController.getAllMovies);
router.get('/schedule/:date', movieController.scheduleOnDay);
router.post('/createSchedule', scheduleController.createSchedule);
router.post('/createHall', hallController.createHall);
// router.put("/updateMovie/:id", movieController.updateMovie);
// router.delete("/deleteMovie/:id", movieController.deleteMovie);

module.exports = router