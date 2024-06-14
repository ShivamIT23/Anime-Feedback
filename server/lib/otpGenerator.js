const crypto = require("crypto");
const { authenticator } = require("otplib");

// Securely generate a secret key
const generateSecretKey = () => {
  return crypto.randomBytes(20).toString("hex"); // Generate a 20-byte secret key
};

// Generate OTP using the secret key
const generateOTP = (secret) => {
  authenticator.options = { crypto }; // Use the built-in crypto module
  return authenticator.generate(secret);
};

// Example usage

function otpGenerator() {
  const secret = generateSecretKey();
  const otp = generateOTP(secret);

  return otp;
}

module.exports = otpGenerator;
