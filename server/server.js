const express = require("express");
const signupRoute = require("./Routes/signup.js");
const signinRoute = require("./Routes/signin.js");
const loginRoute = require("./Routes/login.js");
const otpSender = require("./lib/otpSender.js");
const emailVerification = require("./Routes/emailVerification.js");
const cors = require("cors");

const app = express();

let isEmailVerified = false;
let isOtpSend = false;

function OtpValidation() {
  if (isOtpSend) {
    return true;
  } else {
    return false;
  }
}

function checkVerification() {
  if (isEmailVerified) return true;
  else return false;
}

let secretData = Math.random() * 100;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ Msg: "Welcome to my API" });
});

app.post("/otpSender", otpSender, (req, res) => {
  secretData = req.secretData;
  isOtpSend = true;
});

app.use(OtpValidation);

app.get(
  "/emailVerification",
  (req, res, next) => {
    req.secretData = secretData;
    next();
  },
  emailVerification,
  (req, res) => {
    isEmailVerified = true;
  }
);

app.use(isEmailVerified);

app.post("/signup", signupRoute);

app.post("/signin", signinRoute);

app.post("/login", loginRoute);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: "Internal server error!" });
});

app.listen(3000);

module.exports = app;
