const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "shivam2311";
const z = require("zod");
const mongoose = require("mongoose");

const schema = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Must be 8 or more characters long" }),
});

mongoose.connect(
  "mongodb+srv://loginpurposeonly23mongodb:p7KaM9CvKtBID3k3@cluster0.sl7alfc.mongodb.net/Users_Anime_Feedback"
);

const User = mongoose.model("Users", {
  name: String,
  email: String,
  password: String,
});

// const Initialuser = new User({ name: "shivam" , email : "shivam.123@gmail.com" , password : "121212"});
// Initialuser.save();

async function userExists(email, password) {
  try {
    const user = await User.findOne({ email: email, password: password });
    if (user) return true;
    else return false;
  } catch (err) {
    throw err;
  }
}

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ Msg: "Welcome to my API" });
});



app.post("/signup", async (req, res) => {
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
    const user = new User({ name, email, password });
    if (! await userExists(email, password)) {
      let data = await user.save();
      res.json(data);
    } else res.json({ msg: "user exists" });
  } catch (err) {
    res.json({ message: err });
  }
});


app.post("/signin", function (req, res) {

    const {email,  password} = req.body;
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
        console.log("hiii")
        var token = jwt.sign({email:email }, jwtPassword);
        console.log("hiii")
        res.json({
            "token" : token
        })
      return res.json({
        msg : "SignIn Sucessfully",
        token,
      });
    }
  });



app.post("/login",async function (req, res) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(403).json({
            msg: "No token provided",
        })
    }
    try {
      const decoded = jwt.verify(token, jwtPassword);
      const email = decoded.email;
      res.json(await User.findOne(
          { email:  email }
        ),);
      // return a list of users other than this email
    } catch (err) {
      return res.status(401).json({
        msg: "Invalid token",
      });
    }
});





app.use((err,req,res,next)=>{
  console.log(err);
  res.status(500).json({msg:"Internal server error!"});
})

app.listen(3000);
