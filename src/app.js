const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signup",async (req, res) => {
  const user = new User({
    firstName: "rock",
    lastName: "kumar",
    emailID: "test@saini.com",
    password: "avinabh@123",
  });
  try {
    await user.save()
    res.send("user added succefully")
  } catch (err) {
    res.status(400).send("error saving the user"+err.message)
  }

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
