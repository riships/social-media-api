import nodemailer from 'nodemailer';
import { myConfig } from '../config/config.js';


const mailSender = async (mailOptions) => {
    try {

        const transporter = nodemailer.createTransport({
            service: "Gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "avviare.rishi@gmail.com",
                pass: myConfig.GMAILPASS
            }
        });

        const info = await transporter.sendMail(mailOptions);
        return info;
    } catch (error) {
        return error.message;
    }
}

export default mailSender;