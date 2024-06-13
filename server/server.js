const express = require("express");
const signupRoute = require("./Routes/signup.js");
const signinRoute = require("./Routes/signin.js");
const loginRoute = require("./Routes/login.js")
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ Msg: "Welcome to my API" });
});

app.post("/signup", signupRoute);

app.post("/signin", signinRoute);

app.post("/login", loginRoute);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: "Internal server error!" });
});

app.listen(3000);

module.exports = app;