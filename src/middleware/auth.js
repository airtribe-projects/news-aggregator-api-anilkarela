const jwt = require("jsonwebtoken");
const config = require('../config/config');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Access token required" });

  jwt.verify(token, config.auth.jwtSecret, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user;
    next();
  });
};

const jwtSign = (data, options = {}) => {
  if (!options?.expiresIn) {
    options.expiresIn = config.auth.jwtExpiresIn;
  }
  const token = jwt.sign(data, config.auth.jwtSecret, options);
  return token;
};

module.exports = { authenticateToken, jwtSign };
