import express from 'express';
import cookieParser from 'cookie-parser';
import cors from "cors";
import { myConfig } from './config/config.js';
import connectMongoDb from './config/db.js';
import userRouter from './routes/route.user.js'

const app = express()
connectMongoDb()
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors({
    origin: "*",
    optionsSuccessStatus: 200
}))

app.use('/api/users', userRouter)



const port = myConfig.PORT
app.listen(port, () => console.log(`Example app listening on port ${port}!`))