
function emailVerification(req,res ,next)  {
    const otp = req.query.otp;
    if(otp = req.secretData){
    res.json({Msg : "Email Verification Successfull"}) 
    next();
    }else{
      res.json({Msg : "Email Verification Failed"});
    }
  }

  module.exports = emailVerification;