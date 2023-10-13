const hallService = require("../service/hall-service");

class HallController {
    async createHall(req, res, next) {
        try {
            const savedHall = await hallService.createHall(req.body)
            return res.json(savedHall)
        } catch (e) {
            next(e)
        }
    }

    // async updateHall(req, res, next) {
    //     try {
    //         const sessionId = req.params.sessionId;
    //         const data = req.body
    //         const savedHall = await hallService.updateHall(data, sessionId)
    //         return res.json(savedHall)
    //     } catch (e) {
    //         next(e)
    //     }
    // }
}

module.exports = new HallController()