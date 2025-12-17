const errorMiddleware = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    console.error(err);

    // CastError (invalid Mongo ID)
    if (err.name === 'CastError') {
        error.message = 'Resource not found';
        error.statusCode = 404;
    }

    // Duplicate key error
    if (err.code === 11000) {
        error.message = 'Duplicate field value';
        error.statusCode = 400;
    }

    // Validation error
    if (err.name === 'ValidationError') {
        error.message = Object.values(err.errors)
            .map(val => val.message)
            .join(', ');
        error.statusCode = 400;
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Something went wrong',
    });
};

export default errorMiddleware;
