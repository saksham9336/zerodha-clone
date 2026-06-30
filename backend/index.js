require("dotenv").config();

const fundsRoutes = require("./routes/funds");  
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");

const authRoutes = require("./routes/auth");
const authMiddleware = require("./middleware/authMiddleware");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URI;

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Auth Routes
app.use("/auth", authRoutes);

app.use("/funds", fundsRoutes);

// Holdings
app.get("/allHoldings", async (req, res) => {
  let allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

// Positions
app.get("/allPositions", async (req, res) => {
  let allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

// New Order
app.post("/newOrder", authMiddleware, async (req, res) => {
  let newOrder = new OrdersModel({
    userId: req.userId,
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    mode: req.body.mode,
  });

  await newOrder.save();
  res.json({ success: true, msg: "Order saved!" });
});

// Get all orders for logged-in user
app.get("/allOrders", authMiddleware, async (req, res) => {
  let allOrders = await OrdersModel.find({ userId: req.userId });
  res.json(allOrders);
});

// DB + Server Start
mongoose.connect(uri)
  .then(() => {
    console.log("DB started!");
    app.listen(PORT, () => {
      console.log("App started on port", PORT);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });