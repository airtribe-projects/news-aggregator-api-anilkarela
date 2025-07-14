const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!token) return res.status(401).json({ error: "Access token required" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user;
    next();
  });
};

const jwtSign = (data, options = {}) => {
  if (!options?.expiresIn) {
    options.expiresIn = process.env.JWT_TOKEN_EXPIRES_AFTER;
  }
  const secret = process.env.JWT_SECRET;
  const token = jwt.sign(data, secret, options);
  return token;
};

module.exports = { authenticateToken, jwtSign };
