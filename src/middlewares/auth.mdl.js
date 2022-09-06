const jwt = require("jsonwebtoken");
require("dotenv").config();
const S_KEY = process.env.S_KEY;
const auth = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      let user = jwt.verify(token, S_KEY);
      req.userID = user.id;
    } else {
      res.status(404).json({ message: "unauthorized user detected" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "unauthorized user detected " });
  }
};
module.exports = auth;
