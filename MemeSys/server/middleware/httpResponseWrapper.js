module.exports = (req, res, next) => {
    res.success = httpSuccessResponse;
    res.error = httpErrorResponse;

    next();
};

function httpSuccessResponse(data, message) {
    return this.status(200).json({
        success: true,
        statusCode: 200,
        data,
        message
    });
}

function httpErrorResponse(error, statusCode, errors) {
    return this.status(statusCode || 404).json({
        success: false,
        statusCode: statusCode || 404,
        message: error.message || error,
        errors
    });
}