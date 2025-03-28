// authRouter
// -POST /signup
// -POST /login
// -POST /logout

const express = require("express");
const authRouter = express.Router();
const { validateSignUpdata } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const { userAuth } = require("../middlewares/auth");

authRouter.post("/signup", async (req, res) => {
  try {
    // validateSignUpdata(req);
    const { firstName, lastName, emailID, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailID,
      password: passwordHash,
    });
    await user.save();
    res.send("user added succefully");
  } catch (err) {
    res.status(400).send("error saving the user" + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailID, password } = req.body;
    const user = await User.findOne({ emailID: emailID });
    if (!user) {
      throw new Error("email id is not prenset in db");
    }
    const isPassworValid = await bcrypt.compare(password, user.password);
    if (isPassworValid) {
      const token = await jwt.sign(
        { _id: user._id },
        "qwertyuioplkjhgfdsazxcvbnm",
        { expiresIn: "2d" }
      );
      res.cookie("token", token);
      return res.send(user);
    } else {
      res.send("invalid credential");
    }
  } catch (error) {
    return res.status(401).json({ error: "Invalid password" });
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("you account has been logout sucessfully");
});

module.exports = authRouter;
