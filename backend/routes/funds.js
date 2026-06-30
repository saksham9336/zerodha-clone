const express = require("express");
const router = express.Router();
const { FundsModel } = require("../model/FundsModel");
const authMiddleware = require("../middleware/authMiddleware");

// Get funds (agar nahi hai to nayi entry bana do)
router.get("/", authMiddleware, async (req, res) => {
  try {
    let funds = await FundsModel.findOne({ userId: req.userId });
    if (!funds) {
      funds = await FundsModel.create({ userId: req.userId, availableMargin: 0, usedMargin: 0 });
    }
    res.json(funds);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching funds" });
  }
});

// Add funds
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, msg: "Invalid amount" });
    }

    let funds = await FundsModel.findOne({ userId: req.userId });
    if (!funds) {
      funds = await FundsModel.create({ userId: req.userId, availableMargin: 0, usedMargin: 0 });
    }

    funds.availableMargin += Number(amount);
    await funds.save();

    res.json({ success: true, funds });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Error adding funds" });
  }
});

// Withdraw funds
router.post("/withdraw", authMiddleware, async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, msg: "Invalid amount" });
    }

    let funds = await FundsModel.findOne({ userId: req.userId });
    if (!funds || funds.availableMargin < amount) {
      return res.status(400).json({ success: false, msg: "Insufficient balance" });
    }

    funds.availableMargin -= Number(amount);
    await funds.save();

    res.json({ success: true, funds });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Error withdrawing funds" });
  }
});

module.exports = router;