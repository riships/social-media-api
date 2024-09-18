import logger from '../middlewares/logger.middelware.js'; // Assuming logger is already configured in logger.js

const ErrorHandler = (err, req, res, next) => {
    const errStatus = err.statusCode || 500;
    const errMsg = err.message || 'Something went wrong';

    // Log the error using Winston
    logger.error({
        message: errMsg,
        status: errStatus,
        stack: err.stack,  // Include the stack trace for debugging
        url: req.url,      // Log the request URL
        method: req.method, // Log the request method
        body: req.body     // Include the request body for context
    });

    // Send error response
    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
    });
};

export default ErrorHandler;
