const mongoose = require("mongoose");
const bcrypt = require('bcrypt');


async function connectToDatabase(){
  try{
    mongoose.connect(process.env.MONGODB_URP,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  }catch(err){
    console.log("Error connecting to MongoDB: "+err);
  }
}
connectToDatabase();

const User = mongoose.model("Users", {
  name: String,
  email: String,
  password: String,
});

// const Initialuser = new User({ name: "shivam" , email : "shivam.123@gmail.com" , password : "121212"});
// Initialuser.save();

async function userExists(email, password) {
  try {
    const user = await User.findOne({ email: email });
    if (user){
        console.log(password , user.password);
        const isPasswordMatch = bcrypt.compare(password , user.password);
        if(isPasswordMatch){
            return true;
        }
        else{
            return false;
        }
    }
    else return false;
  } catch (err) {
    throw err;
  }
}

module.exports = {User , userExists};