"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = require("express-rate-limit");
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
//otp rate limiter
const OtpRateLimiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 15 * 60 * 1000, //15 minutes
    max: 3, //limit each IP to 3 requests per windowMs
    message: "Too many requests,please try again after 15 minutes",
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
const passwordResetRateLimiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 15 * 60 * 1000, //15 minutes
    max: 5, //limit each IP to 1 requests per windowMs
    message: "Too many requests,please try again after 15 minutes",
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
//storing otp in simple in memory object
const otpStore = {};
//Endpoint to generate and log OTP
app.post('/generate-otp', OtpRateLimiter, (req, res) => {
    const email = req.body.email;
    if (!email) {
        return res.status(400).json({ message: "email is required" });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); //generates a 6 digit otp
    otpStore[email] = otp;
    console.log(`OTP for ${email}:${otp}`); //Logs the OTP to console
    return res.status(200).json({ message: "OTP generated and logged successfully" });
});
//Endpoint to reset password
app.post("/reset-password", passwordResetRateLimiter, (req, res) => {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
        return res.status(400).json({ message: "Email,OTP and new password are reqiured" });
    }
    if (otpStore[email] === otp) {
        console.log(`Password for ${email} has been reset to ${newPassword}`);
        delete otpStore[email]; //Clearing the otp after use
        res.status(200).json({ message: "password reset successfully" });
    }
    else {
        res.status(401).json({ message: "Invalid OTP" });
    }
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
