const {Router} = require('express');
const userController = require("../controllers/user-controller");
const movieController = require("../controllers/movie-controller");
const hallController = require("../controllers/hall-controller");
const sessionController = require("../controllers/session-controller");
const {body} = require("express-validator");
const authMiddleware = require('../middlewares/auth-middleware');
const permissionMiddleware = require('../middlewares/permission-middleware');

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
router.get('/users', authMiddleware, permissionMiddleware, userController.getUsers);
router.get('/user/:id', authMiddleware, userController.getUser);
router.put('/updateUser/:id', authMiddleware, userController.updateUser);
router.delete('/deleteUser/:id', authMiddleware, permissionMiddleware, userController.deleteUser);

//movieController
router.get('/movies', movieController.getAllMovies);
router.get('/moviesOnDay/:date', movieController.getMoviesOnDay);
router.post('/createMovie', authMiddleware, permissionMiddleware, movieController.createMovie);
router.put('/updateMovie/:id', authMiddleware, permissionMiddleware, movieController.updateMovie);
router.delete('/deleteMovie/:id', authMiddleware, permissionMiddleware, movieController.deleteMovie);

//hallController
router.get('/halls', authMiddleware, permissionMiddleware, hallController.getHalls);
router.post('/createHall', authMiddleware, permissionMiddleware, hallController.createHall);
router.put('/updateHall/:id', authMiddleware, permissionMiddleware, hallController.updateHall);
router.delete('/deleteHall/:id', authMiddleware, permissionMiddleware, hallController.deleteHall);

//sessionController
router.get('/session/:id', sessionController.getSession);
router.post('/createSession', authMiddleware, permissionMiddleware, sessionController.createSession);
router.put('/updateSeats/:id', sessionController.updateSeats);
router.delete('/deleteSession/:id', authMiddleware, permissionMiddleware, sessionController.deleteSession);

module.exports = router