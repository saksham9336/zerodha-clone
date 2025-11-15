const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    const token = req.headers["authorization"];

    if (!token) return res.status(403).json({ msg: "Token missing" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;

    next();
  } catch (e) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};
