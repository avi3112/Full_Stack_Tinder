//understand ref and populate

const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const userRouter = express.Router();

// get all the pending connection request for the loggedIn user
userRouter.get("/user/request/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", "firstName lastName about photoUrl");
    // }).populate("fromUserId", ["firstName", "lastName"]);

    res.json({ message: "data sent", data: connectionRequest });
  } catch (error) {
    res.status(400).send("error" + error);
  }
});
module.exports = userRouter;
