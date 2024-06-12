const schema = require("../Schema/schema.js")
const jwt = require("jsonwebtoken");
const {jwtPassword} = require("../lib/helper.js");
const {userExists} = require("../lib/database.js");

function signinRoute (req, res) {
    const { email, password } = req.body;
    // Validate email
    const emailResult = schema.shape.email.safeParse(email);
    if (!emailResult.success) {
      return res.status(400).json({ error: "Invalid Email" });
    }
  
    // Validate password
    const passwordResult = schema.shape.password.safeParse(password);
    if (!passwordResult.success) {
      return res.status(400).json({ error: "Invalid Password" });
    }
  
    if (!userExists(email, password)) {
      return res.status(403).json({
        msg: "User doesn't exist",
      });
    } else {
      var token = jwt.sign({ email: email }, jwtPassword, {expiresIn : "24h"});
      return res.json({
        msg: "SignIn Successfully",
        token: token,
      });
    }
  }

  module.exports = signinRoute;