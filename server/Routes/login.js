const jwt = require("jsonwebtoken");
const {jwtPassword} = require("../lib/helper.js");
const { User } = require("../lib/database.js");

async function loginRoute(req, res) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).json({
      msg: "No token provided",
    });
  }
  try {
    const decoded = jwt.verify(token, jwtPassword);
    const email = decoded.email;
    res.json(await User.findOne({ email: email }));
    // return a list of users other than this email
  } catch (err) {
    return res.status(401).json({
      msg: "Invalid token",
    });
  }
}

module.exports = loginRoute;
