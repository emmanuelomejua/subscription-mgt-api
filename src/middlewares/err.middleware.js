const errorMiddleware = (err, req, res, next) => {
    try {
        let error = { ...err };

        error.message = err.message

        console.error(err)

        if(err.name === 'CastError'){
            const message = 'Resource not found!';
            error = new Error(message);
            error.statusCode = 404
        }

        // Mongoose duplicate key
        if(err.statusCode = 11000){
            const message = 'Duplicate field value';
            error = new Error(message);
            error.statusCode = 400
        }

        // Validation Error
        if(err.name === 'ValidationError'){
            const message = Object.values(err.errors).map((val) => val.message);
            error = new Error(message.join(', '));
            error.statusCode = 400
        }

        res.status(error.statusCode || 500).json({success: false, error: error.message || 'Something went wrong'})
    } catch (error) {
        next(error)
    }
}


export default errorMiddleware
