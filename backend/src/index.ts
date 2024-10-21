import express from "express"
import {rateLimit} from "express-rate-limit";

const app=express();
const PORT=3000;

app.use(express.json())


//otp rate limiter
const OtpRateLimiter=rateLimit({
    windowMs:15*60*1000, //15 minutes
    max:3, //limit each IP to 3 requests per windowMs
    message:"Too many requests,please try again after 15 minutes",
    standardHeaders:true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders:false, // Disable the `X-RateLimit-*` headers
})

const passwordResetRateLimiter=rateLimit({
    windowMs:15*60*1000, //15 minutes
    max:5, //limit each IP to 1 requests per windowMs
    message:"Too many requests,please try again after 15 minutes",
    standardHeaders:true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders:false, // Disable the `X-RateLimit-*` headers
})


//storing otp in simple in memory object
const otpStore:Record<string,string>={};

//Endpoint to generate and log OTP
app.post('/generate-otp',OtpRateLimiter,(req:any,res:any)=>{
    const email=req.body.email;
    if(!email){
        return res.status(400).json({message:"email is required"})
    }
    const otp=Math.floor(100000 + Math.random() * 900000).toString();//generates a 6 digit otp
    otpStore[email]=otp;

    console.log(`OTP for ${email}:${otp}`); //Logs the OTP to console
    return res.status(200).json({message:"OTP generated and logged successfully"});
})

//Endpoint to reset password

app.post("/reset-password",passwordResetRateLimiter,(req:any,res:any)=>{
    const {email,otp,newPassword}=req.body;
    if(!email || !otp ||!newPassword){
      
        return res.status(400).json({message:"Email,OTP and new password are reqiured"})
    }
    if(otpStore[email]===otp){
        console.log(`Password for ${email} has been reset to ${newPassword}`);
        delete otpStore[email]; //Clearing the otp after use
        res.status(200).json({message:"password reset successfully"});
    } else {
        res.status(401).json({message:"Invalid OTP"});
    }
})

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));