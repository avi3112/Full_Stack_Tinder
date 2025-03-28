//validation isssue
const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/user");

app.use("/", authRouter, profileRouter, requestRouter, userRouter);
// app.get("/user", userAuth, async (req, res) => {
//   const userEmail = req.body.emailID;
//   try {
//     const users = await User.findOne({ emailID: userEmail });
//     if (!users) {
//       res.status(404).send("user not found");
//     } else {
//       res.send(users);
//     }
//   } catch (error) {
//     res.status(400).send("somthing went wrong");
//   }
// });
// app.get("/feed", userAuth, async (req, res) => {
//   try {
//     const users = await User.find();
//     res.send(users);
//   } catch (error) {
//     res.status(400).send("somthing went wrong");
//   }
// });
// // delete the user from database
// app.delete("/user", userAuth, async (req, res) => {
//   const userID = req.body.userId;
//   try {
//     const user = await User.findByIdAndDelete(userID);
//     res.send("user delted succefully");
//   } catch (error) {
//     res.status(400).send("somthing went wrong");
//   }
// });
// /// update data of the user

// app.patch("/user/:userId", userAuth, async (req, res) => {
//   const userId = req.params?.userId;
//   const data = req.body;
//   try {
//     const Allowed_updated = ["lastName"];
//     const isUpdateAllowed = Object.keys(data).every((k) => {
//       return Allowed_updated.includes(k);
//     });
//     if (!isUpdateAllowed) {
//       throw new Error("update is not allowed");
//     }
//     //  const user=await User.findByIdAndUpdate({_id:userId},data,{returnDocument:"before"});
//     const user = await User.findByIdAndUpdate({ _id: userId }, data, {
//       runValidators: true,
//     });
//     res.send("updated now");
//   } catch (err) {
//     console.log(err.message);
//     res.send("update failed" + err.message);
//   }
// });

connectDB()
  .then(() => {
    console.log("database connected succefully");
    app.listen(7777, () => {
      console.log("server running on 7777");
    });
  })
  .catch((err) => {
    console.log("database cant be connected");
  });
