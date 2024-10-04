const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
};
const authenticate = (request, response, next) => {
  const authHearder = request.headers.authorization;
  if (!authHearder) {
    return response.status(401).json({ error: "User is not authenticated" });
  }
  const token = authHearder.split(" ")[1];

  const payload = verifyToken(token);
  if (!payload) {
    return response.status(401).json({ error: "Invalid token" });
  }
  request.user = payload;
  next();
};
module.exports = authenticate;