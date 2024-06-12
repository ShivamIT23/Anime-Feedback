const schema = require("../Schema/schema.js");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(14);
const { User, userExists } = require("../lib/database");



async function signupRoute (req, res) {
    try {
      const body = req.body;
      const result = schema.safeParse(body);
      if (!result.success) {
        res.status(411).json({
          msg: "invalid input",
        });
        return;
      }
      const { name, email, password } = body;
      const hash = await bcrypt.hash(password, salt);
      const user = new User({ name, email, password: hash });
      if (!(await userExists(email, password))) {
        let data = await user.save();
        res.json(data);
      } else res.json({ msg: "user exists" });
    } catch (err) {
      res.json({ message: "error found" });
    }
  }



module.exports = signupRoute;