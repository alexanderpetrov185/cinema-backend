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

    // async updateHall(data, sessionId) {
    //     return HallModel.findByIdAndUpdate(
    //         sessionId,
    //         {$set: data},
    //         {new: true}
    //     );
    // }
}

module.exports = new HallService();
