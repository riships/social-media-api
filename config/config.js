import { configDotenv } from "dotenv";
configDotenv();

export const myConfig = {
    PORT: process.env.PORT,
    DBURI: process.env.DBURI,
    SECRETKEY: process.env.SECRETKEY,  // Corrected typo here
    GMAILPASS: process.env.GMAILPASS
};
