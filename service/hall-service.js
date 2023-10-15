const HallModel = require("../models/hall-model");
const ApiError = require("../exceptions/api-error");

class HallService {
    async createHall(data) {
        const hallNumber = data.hallNumber
        const hallCandidate = await HallModel.findOne({hallNumber})
        if (hallCandidate) {
            throw ApiError.BadRequest(`Hall with this title is already exist`)
        }
        return HallModel.create(data);
    }

    async getHalls() {
        return HallModel.find({})
    }

    async updateHall(hallId, data) {
        return HallModel.findByIdAndUpdate(hallId, {$set: {data}})
    }

    async deleteHall(hallId) {
        return HallModel.findByIdAndDelete(hallId)
    }

}

module.exports = new HallService();
