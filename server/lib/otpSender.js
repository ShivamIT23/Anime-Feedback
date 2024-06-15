const nodemailer = require("nodemailer");
const otpGenerator = require("./otpGenerator");
const schema = require("../Schema/schema");
const { text } = require("express");

const transporter = nodemailer.createTransport({
  host: "smtp.elasticemail.com", // Replace with your SMTP server
  port: 2525, // Typically 587 for secure connections, 25 for non-secure
  secure: false, // True for port 465, false for other ports
  auth: {
    user: "windforce2311@gmail.com", // Your email address
    pass: `D17A0D11FB60AF373CEC640F80CAC1C61907`, // Your email password or app-specific password
  },
});

function otpSender(req, res,next) {
  const { email } = req.body;
  const emailResult = schema.shape.email.safeParse(email);
  if (!emailResult.success) {
    return res.status(400).json({ error: "Invalid Email" });
  }
  console.log(email)

  const otp = otpGenerator();

  try {
    const mailOptions = {
      from: "AnimeFeedback <windforce2311@gmail.com>", // Sender address
      to: `${email}`, // List of recipients
      subject: "OTP", // Subject line
      Body: `Your One-Time-Password(OTP) is ${otp}`,
      text : `Your One-Time-Password(OTP) is ${otp}`
    };
    //Send Email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return alert("Error occurred: ", error.message);
        console.log("error");
      }
      console.log("Info: %s", info);
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      req.secretData = otp;
      next();
    });
  } catch (err) {
    res.status(401).json({
      message: "Error Occured in sending otp please try again",
    });
  }
}

module.exports = otpSender;
