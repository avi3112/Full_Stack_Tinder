const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateProfileEditData } = require("../utils/validation");

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateProfileEditData(req)) {
      throw new Error("invalid edit request");
    }
    const logdedInUser = req.user;
    Object.keys(req.body).forEach((key) => {
      logdedInUser[key] = req.body[key];
    });
    await logdedInUser.save();
    // user.firstName = req.body.firstName;
    res.send(logdedInUser);
  } catch (error) {
    res.status(400).send("error" + error.message);
  }
});

// need to build for forgot password api
module.exports = profileRouter;
