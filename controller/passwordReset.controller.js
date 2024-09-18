import otpGenerator from "otp-generator";
import mailSender from '../helper/sendMail.js'
import User from '../model/user.model.js'

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
            to: user.email,
            subject: "Reset Password",
            text: `You otp is ${otp}.`
        }

        let mailSend = await mailSender(mailOptions);
        await User.findByIdAndUpdate(user._id,
            {
                $set:
                {
                    otp: otp,
                    otpExpiry: Date.now() + 60 * 5 * 1000
                }
            });

        return res.status(200).send({ suceess: true, message: "Otp Send successfully." })
    } catch (error) {
        return res.status(500).send({ suceess: false, error: error.message })
    }
}