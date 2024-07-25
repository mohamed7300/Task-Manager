const errorHandlerMiddleware = (err, req, res, next) => {
    return res.status(err.status).json({ message: { msg: err.message, status: err.status } });
};

module.exports = errorHandlerMiddleware;