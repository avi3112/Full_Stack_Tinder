//validation isssue
const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpdata } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");
app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    // validateSignUpdata(req);
    const { firstName, lastName, emailID, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);
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

app.post("/login", async (req, res) => {
  try {
    const { emailID, password } = req.body;
    const user = await User.findOne({ emailID: emailID });
    console.log(user);
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
      console.log(token);
      res.cookie("token", token);
      res.send("user login succesfully");
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});
app.get("/user", userAuth, async (req, res) => {
  const userEmail = req.body.emailID;
  try {
    const users = await User.findOne({ emailID: userEmail });
    if (!users) {
      res.status(404).send("user not found");
    } else {
      res.send(users);
    }
  } catch (error) {
    res.status(400).send("somthing went wrong");
  }
});
app.get("/feed", userAuth, async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(400).send("somthing went wrong");
  }
});
// delete the user from database
app.delete("/user", userAuth, async (req, res) => {
  const userID = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userID);
    res.send("user delted succefully");
  } catch (error) {
    res.status(400).send("somthing went wrong");
  }
});
/// update data of the user

app.patch("/user/:userId", userAuth, async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const Allowed_updated = ["lastName"];
    const isUpdateAllowed = Object.keys(data).every((k) => {
      return Allowed_updated.includes(k);
    });
    if (!isUpdateAllowed) {
      throw new Error("update is not allowed");
    }
    //  const user=await User.findByIdAndUpdate({_id:userId},data,{returnDocument:"before"});
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      runValidators: true,
    });
    res.send("updated now");
  } catch (err) {
    console.log(err.message);
    res.send("update failed" + err.message);
  }
});

app.post("/sendConnectionRequest", userAuth, (req, res) => {
  const user = req.user;
  console.log("sending a connection");
  res.send(user.firstName + " sent a request");
});
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
