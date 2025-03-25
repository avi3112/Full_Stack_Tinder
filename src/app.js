const express = require("express");

const app = express();
app.use("/", (req, res) => {
  res.send("this is from home route");
});

app.use("/test", (req, res) => {
  res.send("this is from test route");
});

app.use("/hellow", (req, res) => {
  console.log("heelo");
  res.send("this is from hellow route");
});

app.listen(3000, () => {
  console.log("server running on 3000");
});
