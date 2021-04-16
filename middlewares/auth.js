// Middleware for auth

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  //get token from header
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No token, Authorization denied" });
  }

  //Verify token
  try {
    console.log("auth");
    const decoded = jwt.verify(token, "longer-secret-is-better");

    req.user = decoded.user;
    console.log(decoded);
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Token is not valid" });
  }
};
