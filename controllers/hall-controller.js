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

    async getHalls(req, res, next) {
        try {
            const savedHalls = await hallService.getHalls()
            return res.json(savedHalls)
        } catch (e) {
            next(e)
        }
    }

    async updateHall(req, res, next) {
        try {
            await hallService.updateHall(req.params.id, req.body)
            return res.json("hall updated successfully")
        } catch (e) {
            next(e)
        }
    }

    async deleteHall(req, res, next) {
        try {
            await hallService.deleteHall(req.params.id)
            return res.json("hall deleted successfully")
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new HallController()