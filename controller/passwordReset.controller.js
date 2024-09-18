import otpGenerator from "otp-generator";
import mailSender from '../helper/sendMail.js'
import User from '../model/user.model.js'
import bcrypt from "bcryptjs";

export const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(500).send({
                suceess: false,
                message: `Provide email!`
            })
        }
        const otp = otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
        const user = await User.find({ email: email });

        if (!user || user.length <= 0) {
            return res.status(404).send({
                suceess: false,
                message: `${email} not registered with us!`
            })
        }

        const mailOptions = {
            from: "otpsend.rishi@gmail.com",
            to: user[0].email,
            subject: "Reset Password",
            text: `You otp is ${otp}.`
        }

        let mailSend = await mailSender(mailOptions);
        await User.findByIdAndUpdate(user[0]._id,
            {
                $set:
                {
                    otp: otp,
                    otpExpiry: Date.now() + 60 * 5 * 1000
                }
            });
        if (mailSend.response) {
            return res.status(200).send({ suceess: true, message: "Otp Send successfully." })
        } else {
            return res.status(500).send({ suceess: false, error: mailSend })
        }

    } catch (error) {
        return res.status(500).send({ suceess: false, error: error.message })
    }
}

export const otpVeify = async (req, res) => {
    try {
        const { email, otp } = req.body
        const user = await User.find({ email: email });

        if (!user || user.length <= 0) {
            return res.status(404).send({
                suceess: false,
                message: `${email} not registered with us!`
            })
        }

        if (user[0].otp === otp.toString() && new Date(user[0].otpExpiry) > new Date()) {
            return res.status(200).send({ suceess: true, message: "Otp Verified successfully." })
        }
        else {
            return res.status(400).send({ suceess: false, message: "The OTP has expired." })
        }

    } catch (error) {
        return res.status(500).send({
            suceess: false,
            error: error.message
        })
    }
}


export const resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword, confirmPassword } = req.body
        const user = await User.find({ email: email });
        if (!user || user.length <= 0) {
            return res.status(404).send({
                suceess: false,
                message: `${email} not registered with us!`
            })
        }
        if (newPassword !== confirmPassword) {
            return res.status(404).send({
                suceess: false,
                message: `Password and Confirm Password are not same!`
            })
        }

        let isVerified = false


        if (user[0].otp === otp.toString() && new Date(user[0].otpExpiry) > new Date()) {
            isVerified = true
        }
        if (isVerified) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            await User.findByIdAndUpdate(user[0]._id, { password: hashedPassword })

        } else {
            return res.status(400).send({ suceess: false, message: "The OTP has expired." })
        }

        return res.status(201).send({
            suceess: true,
            message: `Password updated Successfully.`
        })


    } catch (error) {
        return res.status(500).send({
            suceess: false,
            error: error.message
        })
    }
}