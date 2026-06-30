const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/UserModel");

const router = express.Router();

// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ success: false, msg: "Email already registered" });
    }

    const hashed = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashed });

    res.json({ success: true, msg: "Account created successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: "Signup failed" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, msg: "Wrong password" });

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ success: true, token, email: user.email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: "Login error" });
  }
});

module.exports = router;

// Reset Password
router.post("/reset-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({ success: false, msg: "Email and new password required" });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, msg: "Password must be at least 6 characters" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, msg: "No account found with this email" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    res.json({ success: true, msg: "Password reset successful!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: "Something went wrong" });
  }
});