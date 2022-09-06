const { JsonWebTokenError } = require("jsonwebtoken");
require("dotenv").config();
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const S_KEY = process.env.S_KEY;

const signup = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ username: username });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "user exists try with different name" });
    }
    const hashedPwd = await bcrypt.hash(password, 10);
    const result = await userModel.create({
      username: username,
      password: hashedPwd,
    });
    const tokens = jwt.sign(
      { username: result.username, id: result._id },
      S_KEY
    );
    res.json({ user: result });
  } catch (error) {
    res.json({ message: "error error" });
  }
};

const signin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ username: username });
    if (!existingUser) {
      return res.status(400).json({
        message: "user doesnt exists / not found, try with different name",
      });
    }
    const matchedpwd = await bcrypt.compare(password, existingUser.password);
    if (!matchedpwd) {
      return res.json({
        message: "INVALID ! INVALID ! WRONG PASSWORD, TRY AGAIN",
      });
    }
    const tokens = jwt.sign(
        { username: existingUser.username, id: existingUser._id },
        S_KEY
      );
      res.json({ user: existingUser, tokens: tokens });
  } catch (error) {
    res.json({ message: "error error" });
  }
};

module.exports = { signup, signin };
