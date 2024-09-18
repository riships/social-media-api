import express from 'express';
import cookieParser from 'cookie-parser';
import cors from "cors";
import { myConfig } from './config/config.js';
import connectMongoDb from './config/db.js';
import userRouter from './routes/users.routes.js'
import postRouter from './routes/posts.routes.js'
import likeRouter from './routes/likes.routes.js'
import friendshipRouter from './routes/friendship.routes.js'
import commentsRouter from './routes/comments.routes.js'
import otpVerification from './routes/passReset.routes.js'
import expressUseragent from 'express-useragent';
import ErrorHandler from './utils/errorHandler.js';
import logger from './middlewares/logger.middelware.js';

const app = express()
connectMongoDb()
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors({
    origin: "*",
}))
app.use(expressUseragent.express())

app.use('/api/users', userRouter);

app.use('/api/posts', postRouter);

app.use('/api/likes', likeRouter);

app.use('/api/friends', friendshipRouter);

app.use('/api/comments', commentsRouter);

app.use('/api/otp', otpVerification);


// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection:', {
        reason: reason.message,
        promise: promise.resolve,
        timestamp: new Date().toISOString()
    });

    process.exit(1); // Exit the process with failure code
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    logger.error('Uncaught Exception:', {
        message: err.message,
        stack: err.stack,
        timestamp: new Date().toISOString()
    });
    process.exit(1); // Exit the process with failure code
});



// custom error handler
app.use(ErrorHandler);


const port = myConfig.PORT
app.listen(port, () => console.log(`Example app listening on port ${port}!`))