import express from 'express';
import cookieParser from 'cookie-parser';
import cors from "cors";
import { myConfig } from './config/config.js';
import connectMongoDb from './config/db.js';
import userRouter from './routes/users.routes.js'
import postRouter from './routes/posts.routes.js'
import expressUseragent from 'express-useragent';

const app = express()
connectMongoDb()
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors({
    origin: "*",
}))
app.use(expressUseragent.express())

app.use('/api/users', userRouter)

app.use('/api/posts', postRouter)


const port = myConfig.PORT
app.listen(port, () => console.log(`Example app listening on port ${port}!`))