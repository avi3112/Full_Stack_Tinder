const express = require("express");
// order of writing the route a matter a alot
const app = express();


// app.get("/user", (req, res) => {
//   console.log(req.query);

//   res.send({ firstname: "avinabh", lastname: "kumar" });
// });
app.get("/user/:userID/:name/:password", (req, res) => {
  // console.log(req.query);
  console.log(req.params);

  res.send({ firstname: "avinabh", lastname: "kumar" });
});


app.listen(7777, () => {
  console.log("server running on 7777");
});
