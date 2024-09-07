import { configDotenv } from "dotenv";
configDotenv();


export const myConfig = {
    PORT: process.env.PORT || 4000,
    DBURI: process.env.DBURI || "mongodb://localhost:27017/Social-Media",
    SECREKEY:process.env.SECREKEY || ''
}