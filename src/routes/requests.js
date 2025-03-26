const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");
const ConnectionRequest = require("../models/connectionRequest");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({ message: "user not avaibale" });
      }
      const allowedStatus = ["ignore", "interested"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          message: "invalid status type" + status,
        });
      }

      //if there is existing connection request
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          {
            fromUserId: toUserId,
            toUserId: fromUserId,
          },
        ],
      });
      if (existingConnectionRequest) {
        return res.send("connection already exits");
      }
      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      const data = await connectionRequest.save();
      res.json({
        message: req.user.firstName + "is" + status + "in" + toUserId.firstName,
        data,
      });
    } catch (error) {
      res.status(400).send("errror" + error.message);
    }
  }
);

module.exports = requestRouter;
