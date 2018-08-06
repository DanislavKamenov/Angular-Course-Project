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

function httpErrorResponse(statusCode, error, errors) {
    return this.status(statusCode).json({
        success: false,
        statusCode,
        message: error.message || error,
        errors
    });
}