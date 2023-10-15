const ApiError = require("../exceptions/api-error");
module.exports = function (req, res, next) {
    try {
        const userData = req.user

        if (!userData) {
            return next(ApiError.BadRequest("Bad request"));
        }

        if (!userData.role || userData.role !== 'ADMIN') {
            return res
                .status(403)
                .json({message: 'Only admins can perform this action'})
        }

        next()
    } catch (e) {
        return next(ApiError.UnauthorizedError());
    }
}