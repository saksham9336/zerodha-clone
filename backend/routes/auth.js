const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();
const User = require("../model/UserModel");

router.post("/signup", async (req, res) => {
  try {
    let { email, password } = req.body;

    password = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password });
    await newUser.save();

    res.json({ msg: "Signup successful" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Signup failed" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Wrong password" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ msg: "Login successful", token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Login error" });
  }
});

module.exports = router;
